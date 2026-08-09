# Current State

Updated: 2026-08-09T02:49:00+03:00
Git branch: main
Git HEAD: be91ab1
Active Task: None
Active Plan: None
Status: SWEED-025 homepage visual polish completed and deployed to demo

## Current Goal

Keep the rebuilt public pages and homepage on the SWEED visual system, Carbon spacing contract, mobile-first implementation rules, and the tighter homepage rhythm established by SWEED-025.

## In Progress

None.

## Completed Recently

- Removed the diagonal hero beam that crossed the building artwork.
- Tightened homepage-only macro spacing using the existing Carbon token scale.
- Converted homepage selected work into a manual, accessible horizontal carousel with scroll snap and no autoplay.
- Rebuilt the slogan as one horizontal statement at 320px and above.
- Tightened the homepage article-heading composition.
- Rebuilt the shared public footer as a CSS Module with an oversized English SWEED wordmark at the bottom.
- Rebuilt `/services` as a six-service decision journey from the approved executive brief.
- Added canonical `/services/software-development` and a real HTTP 308 redirect from `/services/development`.
- Rebuilt `/portfolio` as a proof-led narrative with explicit verified/pending proof states.
- Rebuilt `/offers` with a three-question needs selector, integrated packages, service package groups, and an accessible comparison dialog.
- Rebuilt `/articles` as a searchable knowledge center using only typed published articles.
- Upgraded `/articles/[slug]` to a readable 65ch article layout with related paths and guarded Article JSON-LD.
- Rebuilt `/contact` with verified contact details, query-context prefill, real `/api/contact-leads` submission, validation, server-error, honeypot, and success states.
- Added shared public-page hero, sticky chip strip, proof state, and canonical service-route helpers.
- Fixed the unit test command so `bun run check` executes the full source test suite.
- Updated the sitemap and canonical metadata for the rebuilt public routes.
- Fast-forwarded the verified isolated worktree into `main` without pushing.
- Built and deployed the exact `main` checkout to `sweed-demo.service`.

## Remaining

- Stakeholder visual/content review on the public demo.
- Replace any pending proof with verified outcomes only after documented approval.
- Add future articles, office address, working hours, or timed offers only when the source data is verified.
- Push to GitHub only when explicitly requested.

## Blockers

None.

## Verification

- `bun run check`: passed with 95 tests, TypeScript, ESLint, spacing guard, and mobile-first guard.
- Homepage focused Playwright contract: 2/2 passed on desktop and mobile.
- Homepage portfolio desktop height reduced from 1948px to 965px.
- Homepage slogan desktop height reduced from 534px to 279px and remains a single line at 320px.
- Public homepage at 1440px and 320px: zero horizontal overflow, broken images, hero beams, undersized footer links, console errors, or page errors.
- Production readiness after shared-footer change: 11 passed, 1 intentional mobile visual skip.
- `bun run build`: passed; 29 routes generated after removing the legacy Development static param.
- Rebuilt-route Playwright regression: 20/20 passed across desktop and mobile projects.
- Production readiness against `https://sweed-demo.coderaai.com`: 11 passed, 1 intentional mobile visual skip.
- Public HTTP checks: all rebuilt routes and `/sitemap.xml` return 200.
- `/services/development` returns HTTP 308 to `/services/software-development`.
- Public visual matrix at 1440x900 and 320x568 on seven rebuilt routes: zero horizontal overflow, zero broken images, one main, one H1, zero visible controls below 44px, and zero visible text below 14px.
- Public browser console and page-error checks are empty.
- `sweed-demo.service`: active.

## Next Exact Action

Review the deployed homepage visually. Preserve the manual-carousel, single-line slogan, shared modular footer, and homepage-local spacing cadence in future edits. Do not push until explicitly requested.
