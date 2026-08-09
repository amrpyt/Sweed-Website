# Handoff

Updated: 2026-08-09T13:02:00+03:00

## Read First

- `.ai/PROJECT.md`
- `.ai/STATE.md`
- `.ai/TASKS.md`
- `docs/superpowers/specs/2026-08-04-public-page-executive-rebuild-design.md`
- `docs/superpowers/plans/2026-08-08-public-page-executive-rebuild.md`
- `openspec/changes/rebuild-public-pages-from-executive-briefs/`
- `DESIGN.md`
- `AGENTS.md`

## What Changed

- SWEED-028 homepage spacing/slogan regression fix is complete and deployed.
- Removed the homepage-only compressed spacing overrides; homepage sections inherit the shared Carbon compact/default/feature spacing tiers again.
- Restored the direction slogan to the previous fluid one-line composition and isolated its nowrap behavior from the global balanced-heading rule without `!important`.
- SWEED-027 `/better-typography` public UI pass is complete and deployed.
- Homepage readable type variants dropped from 15 desktop / 17 mobile to seven-or-fewer semantic sizes at each audited width.
- Readable mobile copy now has a 14px floor and visible editable fields use 16px.
- H1/H2 hierarchy is stable through 320px; body measure is 65ch with normalized semantic leading.
- Headings use balanced wrapping, paragraphs use pretty wrapping, and long labels can break safely under text enlargement.
- The homepage slogan remains one line at normal 320px but reflows safely at enlarged user text sizes.
- The Helvetica Arabic local font is confirmed static Regular and its `@font-face` metadata no longer advertises an invalid 400–900 range.
- Root font smoothing, selection styling, and underline metrics were added.
- SWEED-026 `/better-layout` homepage structure pass is complete and deployed.
- Major homepage sections now share one 77.5rem content shell and centered heading axis.
- Decorative header/section lines were removed where whitespace already communicates grouping.
- Services is mobile-first: six service texts/actions stay visible while repeated images/indices appear only from the content-fit breakpoint upward.
- Offers and Articles use discoverable mobile horizontal snap tracks with about 24px of the next item visible, then restore three columns on wide layouts.
- Fixed summary/card height assumptions were removed from Offers and Articles.
- Why SWEED points now group primarily through whitespace instead of a rule-heavy table grid.
- SWEED-025 homepage visual polish is complete and deployed.
- Removed the stray diagonal beam over the homepage building image.
- Tightened homepage-only macro spacing with the existing Carbon scale.
- Homepage selected work is now a manual horizontal scroll-snap carousel with accessible previous/next controls and no autoplay.
- The SWEED slogan is one horizontal band from 320px upward.
- The homepage article heading is more compact.
- The shared public footer is now a CSS Module and ends with an oversized English SWEED wordmark.
- SWEED-024 is complete.
- `/services` now follows the approved six-service decision journey.
- `/services/software-development` is the canonical development route.
- `/services/development` returns HTTP 308 to the canonical route.
- `/portfolio` is a proof-led narrative with verified/pending proof states.
- `/offers` includes a three-question needs selector and an accessible comparison dialog.
- `/articles` is a searchable knowledge center backed only by typed published articles.
- `/articles/[slug]` uses a reading-first layout with related paths and guarded Article JSON-LD.
- `/contact` submits to the real lead API, preserves query context, and handles validation, server errors, honeypot, and success states.
- Shared public-page hero, sticky chip strip, proof label, and canonical service-route helpers were added.
- `bun run unit` now runs the complete source test suite instead of the old shallow shell glob.
- Sitemap and canonical metadata were updated.
- The verified isolated worktree was fast-forwarded into `main`.
- The public demo was rebuilt and deployed.

## Verification

- SWEED-028 full check: 95 tests plus TypeScript, ESLint, spacing, and mobile-first checks passed.
- SWEED-028 production build passed with 29 routes.
- Public HTTPS at 1440/390/320: slogan is nowrap, has no internal overflow, and page horizontal overflow is zero.
- Desktop spacing resolves to 80px compact, 96px default, and 144px feature tiers; mobile remains 48/64/80.
- Production readiness after SWEED-028: 11 passed, 1 intentional mobile visual checkpoint skip.
- SWEED-027 `bun run check`: passed with 95 tests plus TypeScript, ESLint, spacing, and mobile-first checks; legacy max-width query count is 34/40.
- SWEED-027 production build passed with 29 routes.
- Better-typography plus existing homepage focused Playwright: 6/6 passed across desktop and mobile.
- Public HTTPS: desktop readable type sizes = 7; 390px = 7; 320px = 7; readable text below 14px = 0.
- Public HTTPS hierarchy: H1 77.76px vs max H2 64px desktop; H1 40px vs max H2 34px at 390px/320px.
- All visible homepage and Contact editable controls are 16px on mobile.
- Normal 320px slogan is one line; 200% text-size check at 390px has zero clipped readable elements and zero page overflow.
- `document.fonts.check` confirms SWEED Helvetica Arabic is loaded.
- Production readiness after SWEED-027: 11 passed, 1 intentional mobile visual checkpoint skip.
- Public console and page-error logs are empty.
- `bun run check`: passed with 95 tests plus TypeScript, ESLint, spacing, and mobile-first checks; legacy max-width queries improved from 38 to 35.
- `/better-layout` focused changed-surface Playwright: 4/4 passed across desktop and mobile.
- On 390px, Services dropped from ~3333px to 2000px, Offers from ~2038px to 1018px, Articles from ~2031px to 842px.
- Public 1440/1024/390/320 checks: section heading center delta 0px, zero page overflow, zero broken images, empty console/page-error logs.
- Effective 200% zoom-width check preserves DOM reading order with no overflow; reduced-motion exposes all reveal content.
- Production readiness after SWEED-026: 11 passed, 1 intentional mobile visual checkpoint skip.
- Known test debt: the broad legacy homepage Playwright subset has stale pre-rebuild copy/selectors; the current layout-specific contracts are green.
- Homepage visual-contract Playwright: 2/2 passed across desktop and mobile.
- Portfolio desktop height dropped from 1948px to 965px; slogan desktop height dropped from 534px to 279px.
- Public homepage at 1440x900 and 320x568 has zero page overflow, broken images, hero beam remnants, undersized footer links, console errors, or page errors.
- Production readiness after the shared-footer change: 11 passed, 1 intentional mobile visual skip.
- `bun run build`: passed; 29 routes generated.
- Rebuilt-route Playwright: 20/20 passed across desktop and mobile.
- Production readiness on the public demo: 11 passed, 1 intentional mobile visual skip.
- Public HTTP: rebuilt routes and sitemap return 200.
- Public legacy Development path returns 308 to `/services/software-development`.
- Public visual QA at 1440x900 and 320x568 on seven rebuilt routes found zero overflow, broken images, small controls, small text, console errors, or page errors.
- `sweed-demo.service` is active.

## What Remains

- Stakeholder visual/content review on `https://sweed-demo.coderaai.com`.
- Replace pending portfolio proof only when documented verification exists.
- Add office address, working hours, timed promotions, or additional articles only from verified inputs.
- Push only when the user explicitly requests it.

## Warnings

- Do not copy the standalone reference HTML into runtime.
- Do not publish unverified prices, client identities, testimonials, metrics, or guarantees.
- Keep base CSS mobile-first and use `min-width` enhancements.
- Keep every public route passing the spacing and mobile-first guards.
- Keep the canonical development path `/services/software-development`.
- Do not push without explicit user approval.

## Resume From Here

Open the deployed public UI for stakeholder feedback. Preserve the semantic typography roles, 14px readable floor, 16px mobile editable-control floor, 65ch body measure, text-resize-safe wrapping, 77.5rem alignment axis, visible-peek disclosure, and modular footer. For future changes, rerun `bun run check`, `bun run build`, focused Playwright, text-resize QA, and public browser QA before deployment.
