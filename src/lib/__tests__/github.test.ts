/**
 * Comprehensive tests for GitHub API utilities
 */

import {
  fetchGitHubStats,
  calculateYearsExperience,
  formatStarCount,
  formatRepoCount,
} from "../github";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("fetchGitHubStats", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe("successful responses", () => {
    it("should fetch and return user stats correctly", async () => {
      // Mock user response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Map([["x-ratelimit-remaining", "60"]]),
        json: async () => ({ public_repos: 25 }),
      });

      // Mock repos response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { stargazers_count: 100, fork: false },
          { stargazers_count: 50, fork: false },
          { stargazers_count: 30, fork: true }, // Should be excluded
        ],
      });

      const result = await fetchGitHubStats("testuser");

      expect(result.isError).toBe(false);
      expect(result.publicRepos).toBe(25);
      expect(result.totalStars).toBe(150); // 100 + 50, excludes forked repo
    });

    it("should handle zero repos correctly", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Map([["x-ratelimit-remaining", "60"]]),
        json: async () => ({ public_repos: 0 }),
      });

      const result = await fetchGitHubStats("testuser");

      expect(result.isError).toBe(false);
      expect(result.publicRepos).toBe(0);
      expect(result.totalStars).toBe(0);
    });

    it("should handle pagination for many repos", async () => {
      // Mock user with 150 repos (2 pages)
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Map([["x-ratelimit-remaining", "60"]]),
        json: async () => ({ public_repos: 150 }),
      });

      // Mock page 1 (100 repos)
      const page1Repos = Array.from({ length: 100 }, () => ({
        stargazers_count: 1,
        fork: false,
      }));
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => page1Repos,
      });

      // Mock page 2 (50 repos)
      const page2Repos = Array.from({ length: 50 }, () => ({
        stargazers_count: 2,
        fork: false,
      }));
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => page2Repos,
      });

      const result = await fetchGitHubStats("testuser");

      expect(result.isError).toBe(false);
      expect(result.publicRepos).toBe(150);
      expect(result.totalStars).toBe(200); // 100*1 + 50*2
    });

    it("should filter out forked repositories from star count", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Map([["x-ratelimit-remaining", "60"]]),
        json: async () => ({ public_repos: 5 }),
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { stargazers_count: 100, fork: false },
          { stargazers_count: 200, fork: true }, // Excluded
          { stargazers_count: 50, fork: false },
          { stargazers_count: 300, fork: true }, // Excluded
          { stargazers_count: 25, fork: false },
        ],
      });

      const result = await fetchGitHubStats("testuser");

      expect(result.totalStars).toBe(175); // 100 + 50 + 25
    });

    it("should handle zero stars correctly", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Map([["x-ratelimit-remaining", "60"]]),
        json: async () => ({ public_repos: 3 }),
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { stargazers_count: 0, fork: false },
          { stargazers_count: 0, fork: false },
          { stargazers_count: 0, fork: false },
        ],
      });

      const result = await fetchGitHubStats("testuser");

      expect(result.isError).toBe(false);
      expect(result.totalStars).toBe(0);
    });
  });

  describe("error handling", () => {
    it("should return error for invalid username", async () => {
      const result = await fetchGitHubStats("");

      expect(result.isError).toBe(true);
      expect(result.publicRepos).toBeNull();
      expect(result.totalStars).toBeNull();
      expect(result.errorMessage).toBe("Invalid username provided");
    });

    it("should return error for whitespace-only username", async () => {
      const result = await fetchGitHubStats("   ");

      expect(result.isError).toBe(true);
      expect(result.errorMessage).toBe("Invalid username provided");
    });

    it("should handle 404 user not found", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
        headers: new Map([["x-ratelimit-remaining", "60"]]),
      });

      const result = await fetchGitHubStats("nonexistent");

      expect(result.isError).toBe(true);
      expect(result.errorMessage).toContain("404");
    });

    it("should handle 500 server error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        headers: new Map([["x-ratelimit-remaining", "60"]]),
      });

      const result = await fetchGitHubStats("testuser");

      expect(result.isError).toBe(true);
      expect(result.errorMessage).toContain("500");
    });

    it("should handle rate limit exhaustion", async () => {
      const resetTime = Math.floor(Date.now() / 1000) + 3600;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Map([
          ["x-ratelimit-remaining", "2"],
          ["x-ratelimit-reset", String(resetTime)],
        ]),
        json: async () => ({ public_repos: 10 }),
      });

      const result = await fetchGitHubStats("testuser");

      expect(result.isError).toBe(true);
      expect(result.errorMessage).toContain("rate limit");
    });

    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await fetchGitHubStats("testuser");

      expect(result.isError).toBe(true);
      expect(result.errorMessage).toBe("Network error");
    });

    it("should log error in development mode for network errors", async () => {
      // Arrange
      const originalEnv = process.env.NODE_ENV;
      // @ts-expect-error - NODE_ENV is read-only
      process.env.NODE_ENV = "development";
      const consoleSpy = vi.spyOn(console, "error").mockImplementation();
      mockFetch.mockRejectedValueOnce(new Error("Dev network error"));

      // Act
      await fetchGitHubStats("testuser");

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching GitHub stats:",
        "Dev network error"
      );

      // Cleanup
      consoleSpy.mockRestore();
      // @ts-expect-error - NODE_ENV is read-only
      process.env.NODE_ENV = originalEnv;
    });

    it("should handle timeout errors", async () => {
      const abortError = new Error("Aborted");
      abortError.name = "AbortError";
      mockFetch.mockRejectedValueOnce(abortError);

      const result = await fetchGitHubStats("testuser");

      expect(result.isError).toBe(true);
      expect(result.errorMessage).toContain("timed out");
    });

    it("should handle malformed user response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Map([["x-ratelimit-remaining", "60"]]),
        json: async () => ({ invalid: "data" }), // Missing public_repos
      });

      const result = await fetchGitHubStats("testuser");

      expect(result.isError).toBe(true);
      expect(result.errorMessage).toContain("Invalid GitHub user response");
    });

    it("should handle malformed repos response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Map([["x-ratelimit-remaining", "60"]]),
        json: async () => ({ public_repos: 5 }),
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { invalid: "data" }, // Missing required fields
        ],
      });

      const result = await fetchGitHubStats("testuser");

      expect(result.isError).toBe(true);
      expect(result.errorMessage).toContain("Invalid repos response");
    });

    it("should handle failed page fetch", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Map([["x-ratelimit-remaining", "60"]]),
        json: async () => ({ public_repos: 5 }),
      });

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Server Error",
      });

      const result = await fetchGitHubStats("testuser");

      expect(result.isError).toBe(true);
      expect(result.errorMessage).toContain("Failed to fetch repos page");
    });
  });

  describe("edge cases", () => {
    it("should encode special characters in username", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Map([["x-ratelimit-remaining", "60"]]),
        json: async () => ({ public_repos: 0 }),
      });

      await fetchGitHubStats("user@name");

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("user%40name"),
        expect.any(Object)
      );
    });

    it("should handle all forked repos", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Map([["x-ratelimit-remaining", "60"]]),
        json: async () => ({ public_repos: 3 }),
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { stargazers_count: 100, fork: true },
          { stargazers_count: 200, fork: true },
          { stargazers_count: 300, fork: true },
        ],
      });

      const result = await fetchGitHubStats("testuser");

      expect(result.totalStars).toBe(0); // All forked
    });

    it("should handle non-Error thrown objects", async () => {
      mockFetch.mockRejectedValueOnce("string error");

      const result = await fetchGitHubStats("testuser");

      expect(result.isError).toBe(true);
      expect(result.errorMessage).toBe("Unknown error occurred while fetching GitHub stats");
    });
  });
});

describe("calculateYearsExperience", () => {
  const currentYear = new Date().getFullYear();

  it("should calculate years correctly", () => {
    expect(calculateYearsExperience(2019)).toBe(currentYear - 2019);
    expect(calculateYearsExperience(2000)).toBe(currentYear - 2000);
  });

  it("should return 0 for current year", () => {
    expect(calculateYearsExperience(currentYear)).toBe(0);
  });

  it("should throw for non-integer input", () => {
    expect(() => calculateYearsExperience(2019.5)).toThrow("must be an integer");
  });

  it("should throw for year before minimum", () => {
    expect(() => calculateYearsExperience(1900)).toThrow("must be at least 1950");
  });

  it("should throw for future year", () => {
    expect(() => calculateYearsExperience(currentYear + 1)).toThrow(
      "cannot be in the future"
    );
  });

  it("should accept boundary values", () => {
    expect(calculateYearsExperience(1950)).toBe(currentYear - 1950);
    expect(calculateYearsExperience(currentYear)).toBe(0);
  });
});

describe("formatStarCount", () => {
  it("should format thousands correctly", () => {
    expect(formatStarCount(1000)).toBe("1.0K+");
    expect(formatStarCount(1500)).toBe("1.5K+");
    expect(formatStarCount(10000)).toBe("10.0K+");
    expect(formatStarCount(1234)).toBe("1.2K+");
  });

  it("should format hundreds correctly", () => {
    expect(formatStarCount(0)).toBe("0+");
    expect(formatStarCount(500)).toBe("500+");
    expect(formatStarCount(999)).toBe("999+");
  });

  it("should handle null", () => {
    expect(formatStarCount(null)).toBe("—");
  });

  it("should handle edge cases", () => {
    expect(formatStarCount(NaN)).toBe("—");
    expect(formatStarCount(Infinity)).toBe("—");
  });

  it("should handle boundary value 1000", () => {
    expect(formatStarCount(999)).toBe("999+");
    expect(formatStarCount(1000)).toBe("1.0K+");
    expect(formatStarCount(1001)).toBe("1.0K+");
  });
});

describe("formatRepoCount", () => {
  it("should format count correctly", () => {
    expect(formatRepoCount(0)).toBe("0+");
    expect(formatRepoCount(25)).toBe("25+");
    expect(formatRepoCount(100)).toBe("100+");
  });

  it("should handle null", () => {
    expect(formatRepoCount(null)).toBe("—");
  });

  it("should handle edge cases", () => {
    expect(formatRepoCount(NaN)).toBe("—");
    expect(formatRepoCount(Infinity)).toBe("—");
  });
});
