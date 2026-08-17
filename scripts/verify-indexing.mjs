import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { JSDOM } from "jsdom";

const SITE_URL = "https://www.dhimanseal.com";
const OUTPUT_DIRECTORY = "out";
const NOT_FOUND_OUTPUTS = Object.freeze([["404.html"], ["404", "index.html"]]);

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

function discoverExportedPaths() {
  return readdirSync(join(process.cwd(), OUTPUT_DIRECTORY), {
    recursive: true,
  })
    .map((path) => path.replaceAll("\\", "/"))
    .filter((path) => path === "index.html" || path.endsWith("/index.html"))
    .filter((path) => path !== "404/index.html")
    .map((path) =>
      path === "index.html" ? "/" : `/${path.slice(0, -"index.html".length)}`,
    )
    .sort();
}

function verifyHeadingOutline(path, document) {
  const headings = Array.from(
    document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
  );
  const h1Elements = headings.filter((heading) => heading.localName === "h1");

  assert.equal(h1Elements.length, 1, `${path} must emit exactly one h1`);
  assert.equal(
    headings[0]?.localName,
    "h1",
    `${path} must begin its visible heading outline with h1`,
  );

  headings.reduce((previousLevel, heading) => {
    const currentLevel = Number(heading.localName.slice(1));
    assert.ok(
      currentLevel <= previousLevel + 1,
      `${path} skips from h${previousLevel} to h${currentLevel} at "${heading.textContent?.trim()}"`,
    );
    return currentLevel;
  }, 0);
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
  verifyHeadingOutline(path, document);
}

function verifySitemap() {
  const source = readOutputFile("sitemap.xml");
  const document = new JSDOM(source, { contentType: "application/xml" }).window
    .document;
  const actualLocations = Array.from(
    document.getElementsByTagName("loc"),
    (location) => location.textContent ?? "",
  );

  assert.equal(document.documentElement.localName, "urlset");
  assert.equal(
    document.documentElement.namespaceURI,
    "http://www.sitemaps.org/schemas/sitemap/0.9",
  );
  assert.equal(
    new Set(actualLocations).size,
    actualLocations.length,
    "sitemap.xml must not contain duplicate URLs",
  );

  return actualLocations.map((location) => {
    const url = new URL(location);
    const canonicalUrl = new URL(url.pathname, `${SITE_URL}/`).toString();

    assert.equal(
      location,
      url.toString(),
      "sitemap.xml URLs must already be normalized",
    );
    assert.equal(
      url.origin,
      SITE_URL,
      "sitemap.xml must contain only canonical-origin URLs",
    );
    assert.equal(
      location,
      canonicalUrl,
      "sitemap.xml must not contain credentials, ports, queries, or fragments",
    );
    return url.pathname;
  });
}

function verifyRobots() {
  const source = readOutputFile("robots.txt");
  const actualDirectives = source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));
  const expectedDirectives = [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ];

  assert.deepEqual(actualDirectives, expectedDirectives);
}

function verifyCachePolicy() {
  const source = readOutputFile("_headers");
  const cacheRules = [];
  let currentPath = null;

  source.split(/\r?\n/).forEach((line) => {
    if (line.startsWith("/")) {
      currentPath = line.trim();
      return;
    }

    const cacheControl = line.match(/^\s+Cache-Control:\s*(.+)$/i);
    if (cacheControl) {
      cacheRules.push({ path: currentPath, value: cacheControl[1] });
    }
  });

  assert.deepEqual(cacheRules, [
    {
      path: "/_next/static/*",
      value: "public, max-age=31536000, immutable",
    },
  ]);
}

function verifySecurityHeaders() {
  const source = readOutputFile("_headers");

  assert.match(
    source,
    /^\/\*[\s\S]*?^\s+Strict-Transport-Security:\s*max-age=31536000$/m,
    "all routes must receive the HSTS policy",
  );
}

function verifyAiSupply() {
  const source = readOutputFile("llms.txt");

  assert.doesNotMatch(source, /300K\+ TPS/i);
  assert.match(source, /300K\+\s+daily transactions/i);
  assert.doesNotMatch(source, /\b5 ventures?\b/i);
  assert.doesNotMatch(source, /contact form/i);
  assert.match(source, /\b6 ventures?\b/i);
  assert.match(source, /dhiman\.seal@hotmail\.com/i);
  assert.equal(
    existsSync(join(process.cwd(), OUTPUT_DIRECTORY, "llms-full.txt")),
    false,
    "A manually maintained llms-full.txt must not duplicate portfolio pages",
  );

  assert.equal(
    existsSync(
      join(process.cwd(), OUTPUT_DIRECTORY, ".well-known", "agent-card.json"),
    ),
    false,
    "A2A AgentCard must not be published without an A2A service",
  );
}

function verifyProfileLinks() {
  const document = getRouteDocument("/");
  const structuredData = Array.from(
    document.querySelectorAll('script[type="application/ld+json"]'),
    (script) => script.textContent ?? "",
  ).join("\n");

  assert.doesNotMatch(structuredData, /dhimanseal\.dev/i);
  assert.match(
    structuredData,
    /https:\/\/pub\.dev\/publishers\/dhi13man\.com\/packages/i,
  );
}

function verifyNotFoundOutput(segments) {
  const document = new JSDOM(readOutputFile(...segments)).window.document;
  const outputName = segments.join("/");
  const canonicalElements = document.querySelectorAll('link[rel="canonical"]');
  const openGraphElements = document.querySelectorAll(
    'meta[property="og:url"]',
  );
  const robotsElements = document.querySelectorAll('meta[name="robots"]');

  assert.equal(
    canonicalElements.length,
    0,
    `${outputName} must not canonicalize to an indexable page`,
  );
  assert.equal(
    openGraphElements.length,
    0,
    `${outputName} must not advertise an indexable Open Graph URL`,
  );
  assert.equal(
    robotsElements.length,
    1,
    `${outputName} must emit exactly one robots directive`,
  );
  assert.equal(
    robotsElements[0]?.getAttribute("content")?.toLowerCase(),
    "noindex",
    `${outputName} must remain explicitly non-indexable`,
  );
}

function main() {
  const sitemapPaths = verifySitemap();
  const exportedPaths = discoverExportedPaths();

  assert.deepEqual(
    [...sitemapPaths].sort(),
    exportedPaths,
    "sitemap.xml must enumerate every exported indexable route exactly once",
  );
  sitemapPaths.forEach(verifyRoute);
  verifyRobots();
  verifyCachePolicy();
  verifySecurityHeaders();
  verifyAiSupply();
  verifyProfileLinks();
  NOT_FOUND_OUTPUTS.forEach(verifyNotFoundOutput);
  process.stdout.write(
    `Verified discovery signals for ${sitemapPaths.length} exported routes.\n`,
  );
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Indexing verification failed: ${message}\n`);
  process.exitCode = 1;
}
