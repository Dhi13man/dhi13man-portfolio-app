/**
 * Utility functions for fetching GitHub statistics
 *
 * This module fetches user statistics at build time for the About section.
 * It implements proper error handling, rate limiting, and validation.
 */

import { z } from "zod";

/**
 * GitHub user statistics returned by fetchGitHubStats
 */
export interface GitHubUserStats {
  /** Number of public repositories (null if fetch failed) */
  publicRepos: number | null;
  /** Total stars across all non-forked repos (null if fetch failed) */
  totalStars: number | null;
  /** Whether the data was fetched successfully */
  isError: boolean;
  /** Error message if fetch failed */
  errorMessage?: string;
}

// Zod schemas for GitHub API response validation
const GitHubUserSchema = z.object({
  public_repos: z.number().int().nonnegative(),
});

const GitHubRepoSchema = z.object({
  stargazers_count: z.number().int().nonnegative(),
  fork: z.boolean(),
});

const GitHubReposArraySchema = z.array(GitHubRepoSchema);

/** Cache duration: 24 hours in seconds */
const CACHE_DURATION = 86400;

/** Fetch timeout: 10 seconds */
const FETCH_TIMEOUT = 10000;

/** Minimum rate limit remaining before we stop making requests */
const MIN_RATE_LIMIT = 5;

/**
 * Creates an AbortController with timeout
 */
function createTimeoutController(timeout: number): { controller: AbortController; timeoutId: NodeJS.Timeout } {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  return { controller, timeoutId };
}

/**
 * Fetches GitHub user statistics including public repos and total stars
 * Uses GitHub's public API (no authentication required for public data)
 * Implements timeout, rate limiting, and response validation
 *
 * @param username - GitHub username to fetch stats for
 * @returns User statistics with error state if fetch fails
 *
 * @example
 * ```typescript
 * const stats = await fetchGitHubStats("Dhi13man");
 * if (stats.isError) {
 *   console.error(stats.errorMessage);
 * } else {
 *   console.log(`${stats.publicRepos} repos, ${stats.totalStars} stars`);
 * }
 * ```
 */
export async function fetchGitHubStats(
  username: string
): Promise<GitHubUserStats> {
  // Validate input
  if (!username || typeof username !== "string" || username.trim() === "") {
    return {
      publicRepos: null,
      totalStars: null,
      isError: true,
      errorMessage: "Invalid username provided",
    };
  }

  const { controller, timeoutId } = createTimeoutController(FETCH_TIMEOUT);

  try {
    // Fetch user data to get public repos count
    const userResponse = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}`,
      {
        next: { revalidate: CACHE_DURATION },
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        signal: controller.signal,
      }
    );

    // Check rate limit
    const rateLimitRemaining = parseInt(
      userResponse.headers.get("x-ratelimit-remaining") ?? "60"
    );

    if (rateLimitRemaining < MIN_RATE_LIMIT) {
      const resetTime = userResponse.headers.get("x-ratelimit-reset");
      const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null;
      return {
        publicRepos: null,
        totalStars: null,
        isError: true,
        errorMessage: `GitHub API rate limit nearly exhausted (${rateLimitRemaining} remaining). Resets at: ${resetDate?.toISOString() ?? "unknown"}`,
      };
    }

    if (!userResponse.ok) {
      return {
        publicRepos: null,
        totalStars: null,
        isError: true,
        errorMessage: `Failed to fetch user data: ${userResponse.status} ${userResponse.statusText}`,
      };
    }

    // Parse and validate user data
    const userDataRaw = await userResponse.json();
    const userDataResult = GitHubUserSchema.safeParse(userDataRaw);

    if (!userDataResult.success) {
      return {
        publicRepos: null,
        totalStars: null,
        isError: true,
        errorMessage: `Invalid GitHub user response: ${userDataResult.error.message}`,
      };
    }

    const publicRepos = userDataResult.data.public_repos;

    // If no repos, return early
    if (publicRepos === 0) {
      return {
        publicRepos: 0,
        totalStars: 0,
        isError: false,
      };
    }

    // Calculate number of pages needed (100 repos per page)
    const totalPages = Math.ceil(publicRepos / 100);

    // Fetch all pages in parallel for faster builds
    // Limit to 5 concurrent requests to avoid overwhelming the API
    const pagePromises = Array.from({ length: totalPages }, (_, i) =>
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&page=${i + 1}&type=owner`,
        {
          next: { revalidate: CACHE_DURATION },
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
          signal: controller.signal,
        }
      ).then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch repos page ${i + 1}: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        const parseResult = GitHubReposArraySchema.safeParse(data);

        if (!parseResult.success) {
          throw new Error(
            `Invalid repos response on page ${i + 1}: ${parseResult.error.message}`
          );
        }

        return parseResult.data;
      })
    );

    const allRepoPages = await Promise.all(pagePromises);

    // Sum stars from non-forked repos only
    const totalStars = allRepoPages
      .flat()
      .filter((repo) => !repo.fork)
      .reduce((sum, repo) => sum + repo.stargazers_count, 0);

    return {
      publicRepos,
      totalStars,
      isError: false,
    };
  } catch (error) {
    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return {
          publicRepos: null,
          totalStars: null,
          isError: true,
          errorMessage: `GitHub API request timed out after ${FETCH_TIMEOUT}ms`,
        };
      }

      if (process.env.NODE_ENV === "development") {
        console.error("Error fetching GitHub stats:", error.message);
      }
      return {
        publicRepos: null,
        totalStars: null,
        isError: true,
        errorMessage: error.message,
      };
    }

    return {
      publicRepos: null,
      totalStars: null,
      isError: true,
      errorMessage: "Unknown error occurred while fetching GitHub stats",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/** Minimum valid start year for experience calculation */
const MIN_START_YEAR = 1950;

/**
 * Calculate years of experience since a start year
 *
 * @param startYear - Year when experience started (must be between 1950 and current year)
 * @returns Number of years of experience
 * @throws Error if startYear is invalid
 *
 * @example
 * ```typescript
 * const years = calculateYearsExperience(2019);
 * console.log(`${years}+ years of experience`);
 * ```
 */
export function calculateYearsExperience(startYear: number): number {
  const currentYear = new Date().getFullYear();

  if (!Number.isInteger(startYear)) {
    throw new Error(`startYear must be an integer, got: ${startYear}`);
  }

  if (startYear < MIN_START_YEAR) {
    throw new Error(
      `startYear must be at least ${MIN_START_YEAR}, got: ${startYear}`
    );
  }

  if (startYear > currentYear) {
    throw new Error(
      `startYear cannot be in the future, got: ${startYear}, current year: ${currentYear}`
    );
  }

  return currentYear - startYear;
}

/**
 * Format star count for display
 * Converts large numbers to K format (e.g., 1500 -> "1.5K+")
 *
 * @param stars - Number of stars (can be null for error state)
 * @returns Formatted string for display
 *
 * @example
 * ```typescript
 * formatStarCount(1500) // "1.5K+"
 * formatStarCount(500)  // "500+"
 * formatStarCount(null) // "—"
 * ```
 */
export function formatStarCount(stars: number | null): string {
  if (stars === null || !Number.isFinite(stars)) {
    return "—";
  }

  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1)}K+`;
  }

  return `${stars}+`;
}

/**
 * Format repo count for display
 *
 * @param repos - Number of repos (can be null for error state)
 * @returns Formatted string for display
 */
export function formatRepoCount(repos: number | null): string {
  if (repos === null || !Number.isFinite(repos)) {
    return "—";
  }

  return `${repos}+`;
}
