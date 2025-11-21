/**
 * Utility functions for fetching GitHub statistics
 */

interface GitHubUserStats {
  publicRepos: number;
  totalStars: number;
}

interface GitHubRepo {
  stargazers_count: number;
  fork: boolean;
}

/** Cache duration: 24 hours in seconds */
const CACHE_DURATION = 86400;

/**
 * Fetches GitHub user statistics including public repos and total stars
 * Uses GitHub's public API (no authentication required for public data)
 * Implements parallel pagination for faster builds
 */
export async function fetchGitHubStats(
  username: string
): Promise<GitHubUserStats> {
  try {
    // Fetch user data to get public repos count
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        next: { revalidate: CACHE_DURATION },
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    const publicRepos = userData.public_repos;

    // Calculate number of pages needed (100 repos per page)
    const totalPages = Math.ceil(publicRepos / 100);

    // Fetch all pages in parallel for faster builds
    const pagePromises = Array.from({ length: totalPages }, (_, i) =>
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${i + 1}&type=owner`,
        {
          next: { revalidate: CACHE_DURATION },
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      ).then(async (response) => {
        if (!response.ok) {
          console.error(`Failed to fetch repos page ${i + 1}: ${response.status}`);
          return [];
        }
        return response.json() as Promise<GitHubRepo[]>;
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
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    // Return fallback values if fetch fails
    return {
      publicRepos: 20,
      totalStars: 1500,
    };
  }
}

/**
 * Calculate years of experience since a start year
 */
export function calculateYearsExperience(startYear: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
}
