# Discoverability maintenance

<!-- markdownlint-disable MD013 -->

Keep discovery surfaces derived from application data and verify the exported
site before publishing. Search engines and answer engines may choose not to
index, cite, or display an eligible page.

## Sources of truth

- `src/lib/routes.ts` owns canonical indexable paths and navigation labels.
- `src/lib/seo.ts` owns route metadata and canonical signals.
- `src/app/sitemap.ts` generates the sitemap from the route manifest.
- `src/data/` owns portfolio facts used by rendered pages.
- `public/llms.txt` is a concise index to canonical public evidence. Do not
  duplicate rendered page content in a manually maintained companion file.
- `public/robots.txt` owns the global crawl policy and sitemap declaration.
- `public/_headers` applies immutable caching only to fingerprinted assets.
- `scripts/verify-indexing.mjs` checks final exported behavior.

Do not publish an A2A AgentCard at `/.well-known/agent-card.json` unless the
site implements a real A2A server and the card validates against the current
protocol contract.

## Change workflow

1. Update the primary portfolio data or page content.
2. Update metadata only when the page purpose or visible content changed.
3. Update `public/llms.txt` when a material indexed fact changes.
4. Add a route once in `src/lib/routes.ts`; metadata, navigation, and sitemap
   consumers must use that manifest.
5. Run focused tests for changed behavior.
6. Run the full lint, type-check, test, build, and indexing verification gates.
7. Inspect exported HTML and machine-readable files, not only source modules.

## New route checklist

- Add the canonical trailing-slash path and navigation label to
  `src/lib/routes.ts`.
- Add unique metadata to `src/lib/seo.ts`.
- Render one descriptive `h1` with a logical subordinate heading outline.
- Keep material content in initial HTML.
- Add contextual internal links when they help a reader reach related evidence.
- Add or update tests with explicit Arrange, Act, and Assert phases.
- Confirm the generated sitemap contains the route.
- Confirm the exported route emits one self-canonical URL, one matching Open
  Graph URL, and `index, follow`.

## Fact-change checklist

- Treat `src/data/` and the rendered page as primary evidence.
- Preserve units exactly; daily transactions are not transactions per second.
- Remove stale claims instead of qualifying or hiding them.
- Avoid superlatives, compliance claims, response-time promises, and service
  capabilities without public evidence.
- Update the `Last updated` line only for material content changes.
- Link to the canonical page where a reader can verify the claim.

## Sitemap rules

- Use absolute canonical URLs from the route manifest.
- Do not add `priority` or `changefreq`; Google ignores them.
- Do not fabricate `lastmod`. Add it only when generated from a reliable record
  of significant page changes.
- A sitemap is a discovery hint, not an indexing guarantee.

## Robots rules

- Keep the 404 page crawlable so crawlers can observe its `noindex` directive.
- Use one global allow policy unless a verified consumer needs a distinct rule.
- Do not use `Crawl-delay`; it is outside RFC 9309 and unsupported by Google.
- Keep exactly one sitemap directive on the final `www` HTTPS origin.
- Verify the bare production URL after deployment because edge cache state can
  differ from the repository and query-busted origin response.

## Verification commands

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
npm run verify:indexing
```

After deployment, inspect the bare `robots.txt`, `sitemap.xml`, and canonical
page URLs without query strings. Record response status, cache headers, body,
and the deployed commit before changing Search Console state.

## Primary references

- [Cloudflare Pages headers](https://developers.cloudflare.com/pages/configuration/headers/)
- [Cloudflare Pages serving behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google title-link guidance](https://developers.google.com/search/docs/appearance/title-link)
- [OpenAI crawler roles](https://developers.openai.com/api/docs/bots)
- [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html)
- [A2A AgentCard contract](https://a2a-protocol.org/latest/specification/)
