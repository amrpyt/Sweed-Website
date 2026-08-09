# Handoff

Updated: 2026-08-09T02:49:00+03:00

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

- `bun run check`: passed with 95 tests plus TypeScript, ESLint, spacing, and mobile-first checks.
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

Open the deployed homepage for stakeholder feedback. Preserve the manual carousel, single-line slogan, homepage-local spacing cadence, and modular oversized footer. For future changes, rerun `bun run check`, `bun run build`, focused Playwright, and public browser QA before deployment.
