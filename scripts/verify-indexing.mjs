import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { JSDOM } from "jsdom";

const SITE_URL = "https://www.dhimanseal.com";
const OUTPUT_DIRECTORY = "out";
const INDEXABLE_PATHS = Object.freeze([
  "/",
  "/journey/",
  "/experience/",
  "/projects/",
  "/ventures/",
  "/achievements/",
  "/recommendations/",
  "/education/",
]);

function readOutputFile(...segments) {
  return readFileSync(
    join(process.cwd(), OUTPUT_DIRECTORY, ...segments),
    "utf8",
  );
}

function getRouteDocument(path) {
  const segments =
    path === "/" ? ["index.html"] : [path.slice(1), "index.html"];
  return new JSDOM(readOutputFile(...segments)).window.document;
}

function verifyRoute(path) {
  const expectedUrl = new URL(path, SITE_URL).toString();
  const document = getRouteDocument(path);
  const canonicalElements = document.querySelectorAll('link[rel="canonical"]');
  const openGraphElements = document.querySelectorAll(
    'meta[property="og:url"]',
  );
  const robotsElements = document.querySelectorAll('meta[name="robots"]');
  const robotsContent = robotsElements[0]
    ?.getAttribute("content")
    ?.toLowerCase();
  const robotsDirectives = new Set(
    robotsContent?.split(",").map((directive) => directive.trim()),
  );

  assert.equal(
    canonicalElements.length,
    1,
    `${path} must emit exactly one canonical link`,
  );
  assert.equal(
    canonicalElements[0]?.getAttribute("href"),
    expectedUrl,
    `${path} must emit an absolute self-canonical URL`,
  );
  assert.equal(
    openGraphElements.length,
    1,
    `${path} must emit exactly one Open Graph URL`,
  );
  assert.equal(
    openGraphElements[0]?.getAttribute("content"),
    expectedUrl,
    `${path} must emit an absolute self-referencing Open Graph URL`,
  );
  assert.equal(
    robotsElements.length,
    1,
    `${path} must emit exactly one robots directive`,
  );
  assert.deepEqual(
    robotsDirectives,
    new Set(["index", "follow"]),
    `${path} must remain indexable and followable`,
  );
}

function verifySitemap() {
  const source = readOutputFile("sitemap.xml");
  const document = new JSDOM(source, { contentType: "application/xml" }).window
    .document;
  const actualLocations = Array.from(
    document.getElementsByTagName("loc"),
    (location) => location.textContent ?? "",
  );
  const expectedLocations = INDEXABLE_PATHS.map((path) =>
    new URL(path, SITE_URL).toString(),
  );

  assert.equal(document.documentElement.localName, "urlset");
  assert.equal(
    document.documentElement.namespaceURI,
    "http://www.sitemaps.org/schemas/sitemap/0.9",
  );
  assert.deepEqual(actualLocations, expectedLocations);
}

function verifyRobots() {
  const source = readOutputFile("robots.txt");
  const sitemapDirectives = source
    .split(/\r?\n/)
    .filter((line) => line.startsWith("Sitemap:"));
  const globalCrawlerGroup = source
    .split(/\r?\n\r?\n/)
    .find((group) => /^User-agent:\s*\*$/m.test(group));
  const crawlDirectives = globalCrawlerGroup
    ?.split(/\r?\n/)
    .filter((line) => /^(?:Allow|Disallow):/i.test(line));

  assert.deepEqual(crawlDirectives, ["Allow: /"]);
  assert.deepEqual(sitemapDirectives, [`Sitemap: ${SITE_URL}/sitemap.xml`]);
}

function verifyNotFoundPage() {
  const document = getRouteDocument("/404/");
  const canonicalElements = document.querySelectorAll('link[rel="canonical"]');
  const openGraphElements = document.querySelectorAll(
    'meta[property="og:url"]',
  );
  const robotsElements = document.querySelectorAll('meta[name="robots"]');

  assert.equal(
    canonicalElements.length,
    0,
    "404 output must not canonicalize to an indexable page",
  );
  assert.equal(
    openGraphElements.length,
    0,
    "404 output must not advertise an indexable Open Graph URL",
  );
  assert.equal(
    robotsElements.length,
    1,
    "404 output must emit exactly one robots directive",
  );
  assert.equal(
    robotsElements[0]?.getAttribute("content")?.toLowerCase(),
    "noindex",
    "404 output must remain explicitly non-indexable",
  );
}

function main() {
  INDEXABLE_PATHS.forEach(verifyRoute);
  verifySitemap();
  verifyRobots();
  verifyNotFoundPage();
  process.stdout.write(
    `Verified indexing signals for ${INDEXABLE_PATHS.length} exported routes.\n`,
  );
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Indexing verification failed: ${message}\n`);
  process.exitCode = 1;
}
