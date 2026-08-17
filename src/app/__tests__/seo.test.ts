import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { metadata as rootMetadata } from "@/app/layout";
import sitemap from "@/app/sitemap";
import { ventures } from "@/data/ventures";
import { PAGE_SEO, SITE_URL } from "@/lib/seo";

type PageSeo = (typeof PAGE_SEO)[keyof typeof PAGE_SEO];

const indexableRoutes: ReadonlyArray<PageSeo> = Object.values(PAGE_SEO);

function readPublicFile(fileName: string): string {
  return readFileSync(join(process.cwd(), "public", fileName), "utf8");
}

describe("search indexing signals", () => {
  describe("metadata", () => {
    it("metadataBase_whenRootMetadataIsBuilt_thenUsesFinalWwwOrigin", () => {
      // Arrange
      const expectedMetadataBase = `${SITE_URL}/`;

      // Act
      const actualMetadataBase = rootMetadata.metadataBase?.href;

      // Assert
      expect(actualMetadataBase).toBe(expectedMetadataBase);
    });

    it.each(indexableRoutes)(
      "robotsMetadata_whenMetadataIsBuiltFor$path_thenPermitsIndexing",
      ({ metadata }) => {
        // Arrange
        const expectedIndexPermission = true;

        // Act
        const actualIndexPermission =
          typeof metadata.robots === "object" && metadata.robots !== null
            ? metadata.robots.index
            : undefined;

        // Assert
        expect(actualIndexPermission).toBe(expectedIndexPermission);
      },
    );

    it.each(indexableRoutes)(
      "robotsMetadata_whenMetadataIsBuiltFor$path_thenPermitsFollowing",
      ({ metadata }) => {
        // Arrange
        const expectedFollowPermission = true;

        // Act
        const actualFollowPermission =
          typeof metadata.robots === "object" && metadata.robots !== null
            ? metadata.robots.follow
            : undefined;

        // Assert
        expect(actualFollowPermission).toBe(expectedFollowPermission);
      },
    );

    it.each(indexableRoutes)(
      "alternatesCanonical_whenMetadataIsBuiltFor$path_thenUsesSelfReference",
      ({ path, metadata }) => {
        // Arrange
        const expectedCanonical = path;

        // Act
        const actualCanonical = metadata.alternates?.canonical;

        // Assert
        expect(actualCanonical).toBe(expectedCanonical);
      },
    );

    it.each(indexableRoutes)(
      "openGraphUrl_whenMetadataIsBuiltFor$path_thenUsesSelfReference",
      ({ path, metadata }) => {
        // Arrange
        const expectedOpenGraphUrl = path;

        // Act
        const actualOpenGraphUrl = metadata.openGraph?.url;

        // Assert
        expect(actualOpenGraphUrl).toBe(expectedOpenGraphUrl);
      },
    );
  });

  describe("sitemap.xml", () => {
    it("sitemap_whenGenerated_thenContainsOnlyIndexableRoutes", () => {
      // Arrange
      const expectedLocations = [
        `${SITE_URL}/`,
        `${SITE_URL}/journey/`,
        `${SITE_URL}/ventures/`,
        `${SITE_URL}/experience/`,
        `${SITE_URL}/projects/`,
        `${SITE_URL}/achievements/`,
        `${SITE_URL}/recommendations/`,
        `${SITE_URL}/education/`,
      ];

      // Act
      const actualLocations = sitemap().map(({ url }) => url);

      // Assert
      expect(actualLocations).toEqual(expectedLocations);
    });

    it("sitemap_whenGenerated_thenUsesNormalizedCanonicalUrls", () => {
      // Arrange
      const sitemapEntries = sitemap();

      // Act
      const canonicalLocations = sitemapEntries.map(({ url }) => {
        const parsedUrl = new URL(url);
        return new URL(parsedUrl.pathname, `${SITE_URL}/`).toString();
      });
      const actualLocations = sitemapEntries.map(({ url }) => url);

      // Assert
      expect(actualLocations).toEqual(canonicalLocations);
    });

    it("sitemap_whenGenerated_thenOmitsFabricatedFreshnessSignals", () => {
      // Arrange
      const expectedEntryKeys = ["url"];

      // Act
      const actualEntryKeys = sitemap().map((entry) => Object.keys(entry));

      // Assert
      actualEntryKeys.forEach((entryKeys) => {
        expect(entryKeys).toEqual(expectedEntryKeys);
      });
    });
  });

  describe("robots.txt", () => {
    it("robotsTxt_whenGlobalCrawlerGroupIsRead_thenPermitsCrawling", () => {
      // Arrange
      const robotsSource = readPublicFile("robots.txt");
      const expectedCrawlDirectives = ["Allow: /"];

      // Act
      const globalCrawlerGroup = robotsSource
        .split(/\r?\n\r?\n/)
        .find((group) => /^User-agent:\s*\*$/m.test(group));
      const actualCrawlDirectives = globalCrawlerGroup
        ?.split(/\r?\n/)
        .filter((line) => /^(?:Allow|Disallow):/i.test(line));

      // Assert
      expect(actualCrawlDirectives).toEqual(expectedCrawlDirectives);
    });

    it("robotsTxt_whenSitemapDirectivesAreRead_thenDeclaresOnlyCanonicalSitemap", () => {
      // Arrange
      const robotsSource = readPublicFile("robots.txt");
      const expectedDirectives = [`Sitemap: ${SITE_URL}/sitemap.xml`];

      // Act
      const actualDirectives = robotsSource
        .split(/\r?\n/)
        .filter((line) => line.startsWith("Sitemap:"));

      // Assert
      expect(actualDirectives).toEqual(expectedDirectives);
    });

    it("robotsTxt_whenUserAgentDirectivesAreRead_thenUsesOnlyGlobalPolicy", () => {
      // Arrange
      const robotsSource = readPublicFile("robots.txt");
      const expectedUserAgents = ["User-agent: *"];

      // Act
      const actualUserAgents = robotsSource
        .split(/\r?\n/)
        .filter((line) => line.startsWith("User-agent:"));

      // Assert
      expect(actualUserAgents).toEqual(expectedUserAgents);
      expect(robotsSource).not.toMatch(/^Crawl-delay:/im);
    });
  });

  describe("hosting security headers", () => {
    it("strictTransportSecurity_whenHeadersArePublished_thenProtectsEveryRoute", () => {
      // Arrange
      const expectedPolicy = "max-age=31536000";
      const headersSource = readPublicFile("_headers");

      // Act
      const actualPolicy = headersSource.match(
        /^\s+Strict-Transport-Security:\s*(.+)$/m,
      )?.[1];

      // Assert
      expect(actualPolicy).toBe(expectedPolicy);
    });
  });

  describe("AI supply artifacts", () => {
    it("llmsTxt_whenTransactionScaleIsRead_thenUsesDailyTransactions", () => {
      // Arrange
      const expectedTransactionScale = /300K\+\s+daily transactions/i;
      const aiSource = readPublicFile("llms.txt");

      // Act
      const usesTransactionsPerSecond = /300K\+ TPS/i.test(aiSource);
      const usesDailyTransactions = expectedTransactionScale.test(aiSource);

      // Assert
      expect(usesTransactionsPerSecond).toBe(false);
      expect(usesDailyTransactions).toBe(true);
    });

    it("llmsTxt_whenVentureCountIsRead_thenMatchesPortfolioData", () => {
      // Arrange
      const expectedVentureCount = ventures.length;
      const aiSource = readPublicFile("llms.txt");

      // Act
      const hasExpectedCount = aiSource.includes(
        `${expectedVentureCount} ventures`,
      );
      const hasStaleCount = /\b5 ventures?\b/i.test(aiSource);

      // Assert
      expect(hasExpectedCount).toBe(true);
      expect(hasStaleCount).toBe(false);
    });

    it("llmsTxt_whenContactMethodIsRead_thenUsesPublishedEmail", () => {
      // Arrange
      const expectedEmail = "dhiman.seal@hotmail.com";
      const aiSource = readPublicFile("llms.txt");

      // Act
      const hasEmail = aiSource.includes(expectedEmail);
      const hasNonexistentForm = /contact form/i.test(aiSource);

      // Assert
      expect(hasEmail).toBe(true);
      expect(hasNonexistentForm).toBe(false);
    });

    it("llmsTxt_whenPackagePublisherIsRead_thenUsesVerifiedPublisher", () => {
      // Arrange
      const expectedPublisher =
        "https://pub.dev/publishers/dhi13man.com/packages";
      const aiSource = readPublicFile("llms.txt");

      // Act
      const hasVerifiedPublisher = aiSource.includes(expectedPublisher);
      const hasRetiredPublisher = aiSource.includes("dhimanseal.dev");

      // Assert
      expect(hasVerifiedPublisher).toBe(true);
      expect(hasRetiredPublisher).toBe(false);
    });

    it("llmsFull_whenPortfolioPagesAreCanonical_thenIsNotDuplicated", () => {
      // Arrange
      const llmsFullPath = join(process.cwd(), "public", "llms-full.txt");

      // Act
      const llmsFullExists = existsSync(llmsFullPath);

      // Assert
      expect(llmsFullExists).toBe(false);
    });

    it("agentCard_whenA2AServiceIsAbsent_thenIsNotPublished", () => {
      // Arrange
      const agentCardPath = join(
        process.cwd(),
        "public",
        ".well-known",
        "agent-card.json",
      );

      // Act
      const agentCardExists = existsSync(agentCardPath);

      // Assert
      expect(agentCardExists).toBe(false);
    });
  });
});
