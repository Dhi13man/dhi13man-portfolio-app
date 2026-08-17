# Discoverability hardening plan

<!-- markdownlint-disable MD013 -->

This change removes misleading legacy discovery artifacts, fixes verified rendering and document-outline defects, and makes exported crawl signals fail closed during the build.

## Status

- Owner: Dhiman Seal
- Branch: `codex/discoverability-hardening`
- Base: `origin/main` at `a74ca6c`
- State: implementation approved by the user request
- Scope: portfolio application, exported machine-readable files, and regression gates

## Evidence summary

- All eight canonical routes return indexable initial HTML with matching canonical and Open Graph URLs.
- Six collection routes render their page title as `h2` and contain no `h1`.
- The journey route crashes after a desktop-to-mobile breakpoint resize while fresh desktop and mobile loads pass.
- The bare production `robots.txt` remains an old Cloudflare cache hit while a query-busted response contains the current file.
- Mutable, unhashed files receive long-lived custom cache headers in `public/_headers`.
- The crawler-specific blocks in `robots.txt` repeat the global allow policy and include an unsupported `Crawl-delay` directive.
- The published A2A well-known card describes no real A2A service and does not satisfy the current AgentCard contract.
- The AI-facing text says `300K+ TPS`, advertises a nonexistent contact form, and reports five ventures although the source data contains six.
- Both exported 404 representations currently agree, but the build verifies only one of them.
- Route lists are duplicated, so a newly exported route can be omitted from the sitemap without failing the build.

## Outcome contract

- Every indexable exported route has exactly one `h1` and no skipped heading level.
- Responsive journey content survives a desktop-to-mobile resize without replacing the page with the error boundary.
- Mutable public artifacts use Cloudflare Pages revalidation behavior instead of long-lived immutable or stale-while-revalidate rules.
- `robots.txt` expresses one global allow policy and one canonical sitemap directive.
- No standardized well-known endpoint advertises a service the site does not implement.
- AI-facing facts match the portfolio source data and real contact surface.
- The sitemap is generated from the application route manifest.
- The build discovers exported routes and rejects route, sitemap, heading, 404, robots, or cache-policy drift.

## In scope

- Introduce one typed route manifest for navigation, metadata paths, and sitemap generation.
- Replace the hand-maintained sitemap file with a Next.js metadata route.
- Add semantic heading-level support to shared heading components.
- Apply page-appropriate heading levels to all indexable collection routes and nested content.
- Add accessible names to icon-only education and venture links.
- Repair the journey animation lifecycle at the responsive breakpoint.
- Remove the invalid A2A agent card.
- Correct factual drift in `llms.txt` and remove the manually maintained
  `llms-full.txt` duplicate.
- Replace the stale AI-maintenance guide with a concise source-of-truth workflow.
- Simplify `robots.txt` to its effective standards-compatible policy.
- Remove custom caching for mutable, non-fingerprinted public files.
- Extend unit and exported-build verification with independent behavioral oracles.

## Out of scope

- New portfolio claims that are not supported by repository data.
- Speculative schema types or rich-result markup without visible page content.
- Fabricated sitemap `lastmod`, `priority`, or `changefreq` values.
- A new A2A server solely to preserve the old agent card.
- Search-engine inclusion guarantees; sitemap submission and structured data remain eligibility signals.
- Cloudflare dashboard cache rules, edge purge, deployment, or Search Console monitoring after the PR.

## Dependency-ordered implementation

| Order | Change | Depends on | Verification |
| ---: | --- | --- | --- |
| 1 | Add typed route manifest | None | Type check and route-manifest unit tests |
| 2 | Generate sitemap from manifest | 1 | Sitemap unit test and exported XML validation |
| 3 | Consume manifest in metadata and navigation | 1 | Metadata and header tests |
| 4 | Repair heading component APIs and page outlines | 1 | Role-based component tests and exported outline checks |
| 5 | Repair journey responsive animation cleanup | None | Focused unit test plus real-browser resize probe |
| 6 | Remove obsolete crawler and A2A artifacts | None | Robots and absence assertions |
| 7 | Correct AI-supply facts and maintenance guidance | 1, 6 | Cross-file content assertions and markdown lint |
| 8 | Remove unsafe mutable cache overrides | 6 | Exported `_headers` policy assertion |
| 9 | Expand build verifier to discover routes and both 404 files | 2, 4, 6, 8 | Production build |
| 10 | Run review, lint, test, build, and live-shape audits | 1-9 | Final verification gate |

## Test design

- Use Arrange, Act, Assert sections in every new or modified test.
- Use structured names in the form `unit_whenCondition_thenOutcome`.
- Query headings and links by accessible role and name.
- Keep source-level unit tests separate from exported-HTML verification.
- Make the exported build the independent oracle for route discovery and final HTML shape.
- Reproduce the journey regression across the same `1024px` breakpoint that triggered the crash.
- Verify both `out/404.html` and `out/404/index.html` independently.
- Assert that mutable cache policies are absent instead of snapshotting comments or formatting.
- Assert the effective robots directives instead of crawler-brand inventories.

## Risk controls

- Preserve existing canonical URLs, trailing slashes, index/follow directives, and homepage-only ProfilePage schema.
- Keep immutable caching only for content-addressed Next.js static assets.
- Do not infer Cloudflare dashboard state from repository headers.
- Avoid a route manifest that imports server-only metadata into client navigation code.
- Keep responsive animation teardown scoped to the journey chapter that owns the pinned DOM.
- Avoid broad formatting changes in legacy test files; touch only tests required for changed behavior.

## Rollback

- Revert the implementation commit to restore the previous exported behavior.
- The route-manifest and sitemap changes are atomic so the static sitemap can be restored together if needed.
- The journey repair is isolated from canonical and machine-readable signal changes.
- Removing the invalid agent card is safe because no A2A service consumes or implements it.

## Exit criteria

- Focused tests pass for every changed component and discovery artifact.
- The full Vitest suite and configured coverage thresholds pass.
- ESLint and TypeScript report no errors.
- The production export completes and the indexing verifier passes.
- Markdown lint reports zero errors for all modified Markdown files.
- The final export contains eight canonical routes, one valid sitemap, one minimal robots policy, and two non-indexable 404 artifacts.
- A real browser completes the journey desktop-to-mobile resize without console or page errors.
- Independent code, test, accessibility, and discoverability reviews have no unresolved actionable findings.
- The verification gate records tested, grounded, and residual evidence before the branch is pushed.

## Primary references

- [Cloudflare Pages headers](https://developers.cloudflare.com/pages/configuration/headers/)
- [Cloudflare Pages serving behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Google title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html)
- [A2A protocol AgentCard contract](https://a2a-protocol.org/latest/specification/)
