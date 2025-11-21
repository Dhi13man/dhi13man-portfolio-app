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

/**
 * Fetches GitHub user statistics including public repos and total stars
 * Uses GitHub's public API (no authentication required for public data)
 */
export async function fetchGitHubStats(
  username: string
): Promise<GitHubUserStats> {
  try {
    // Fetch user data to get public repos count
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        next: { revalidate: 86400 }, // Cache for 24 hours
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

    // Fetch all repositories to calculate total stars
    // GitHub API returns max 100 per page, so we need to paginate
    let totalStars = 0;
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&type=owner`,
        {
          next: { revalidate: 86400 },
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch repos: ${reposResponse.status}`);
      }

      const repos: GitHubRepo[] = await reposResponse.json();

      if (repos.length === 0) {
        hasMore = false;
      } else {
        // Sum stars from non-forked repos only
        totalStars += repos
          .filter((repo) => !repo.fork)
          .reduce((sum, repo) => sum + repo.stargazers_count, 0);
        page++;

        // Safety limit to prevent infinite loops
        if (page > 10) hasMore = false;
      }
    }

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
