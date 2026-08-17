import { readFileSync } from "node:fs";
import { join } from "node:path";
import { metadata as rootMetadata } from "@/app/layout";
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
    it("sitemapXml_whenDocumentIsParsed_thenHasNoParserErrors", () => {
      // Arrange
      const sitemapSource = readPublicFile("sitemap.xml");

      // Act
      const sitemapDocument = new DOMParser().parseFromString(
        sitemapSource,
        "application/xml",
      );

      // Assert
      expect(sitemapDocument.querySelector("parsererror")).toBeNull();
    });

    it("sitemapXml_whenNamespaceIsRead_thenUsesSitemapProtocolNamespace", () => {
      // Arrange
      const sitemapSource = readPublicFile("sitemap.xml");
      const expectedNamespace = "http://www.sitemaps.org/schemas/sitemap/0.9";

      // Act
      const actualNamespace = new DOMParser().parseFromString(
        sitemapSource,
        "application/xml",
      ).documentElement.namespaceURI;

      // Assert
      expect(actualNamespace).toBe(expectedNamespace);
    });

    it("sitemapXml_whenRootElementIsRead_thenUsesUrlset", () => {
      // Arrange
      const sitemapSource = readPublicFile("sitemap.xml");
      const expectedRootElement = "urlset";

      // Act
      const actualRootElement = new DOMParser().parseFromString(
        sitemapSource,
        "application/xml",
      ).documentElement.localName;

      // Assert
      expect(actualRootElement).toBe(expectedRootElement);
    });

    it("sitemapXml_whenLocationsAreRead_thenContainsOnlyIndexableRoutes", () => {
      // Arrange
      const sitemapSource = readPublicFile("sitemap.xml");
      const expectedLocations = indexableRoutes.map(({ path }) =>
        new URL(path, SITE_URL).toString(),
      );

      // Act
      const sitemapDocument = new DOMParser().parseFromString(
        sitemapSource,
        "application/xml",
      );
      const actualLocations = Array.from(
        sitemapDocument.getElementsByTagName("loc"),
        (location) => location.textContent ?? "",
      );

      // Assert
      expect(actualLocations).toEqual(expectedLocations);
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
  });
});
