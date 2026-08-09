# Current State

Updated: 2026-08-09T03:26:00+03:00
Git branch: main
Git HEAD: 7ff3569
Active Task: None
Active Plan: None
Status: SWEED-026 better-layout homepage pass completed and deployed to demo

## Current Goal

Keep the rebuilt public pages and homepage on the SWEED visual system, Carbon spacing contract, mobile-first rules, and the shared alignment/progressive-disclosure system established by SWEED-026.

## In Progress

None.

## Completed Recently

- Applied `/better-layout` to homepage grouping, shared alignment, mobile content priority, responsive disclosure, and RTL-safe breakpoints.
- Standardized major homepage content shells around one 77.5rem alignment system.
- Re-centered Services, Why SWEED, Portfolio, Offers, and Articles headings on one page axis.
- Removed decorative separator rules where spacing carries the hierarchy better.
- Reduced mobile Services depth by removing repeated secondary imagery below its content-fit breakpoint while preserving all six service texts/actions.
- Converted Offers and Articles into mobile horizontal snap tracks with a visible ~24px next-item peek and desktop multi-column restoration.
- Removed fixed summary/card height assumptions from the repeated offer/article layouts.
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

- `bun run check`: passed with 95 tests, TypeScript, ESLint, spacing guard, and mobile-first guard; legacy max-width query count improved from 38 to 35.
- `/better-layout` focused Playwright contracts: 4/4 passed across desktop and mobile.
- Public HTTPS at 1440, 1024, 390, and 320: audited section heading centers have 0px alignment delta; zero page overflow and broken images.
- At 390px, Services reduced from ~3333px to 2000px, Offers from ~2038px to 1018px, Articles from ~2031px to 842px.
- Offers and Articles expose ~24px next-item peeking on narrow screens and restore non-scrolling 3-column layouts on desktop.
- Effective 200% zoom-width stress: no horizontal overflow; service/offer/article DOM reading order preserved.
- Reduced-motion stress: all reveal content visible and scrollers remain usable.
- Production readiness after deployment: 11 passed, 1 intentional mobile visual checkpoint skip.
- Known test debt: the broad legacy homepage Playwright subset contains stale assertions from earlier rebuilds; current changed-surface regression is green.
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

Review the deployed homepage visually. Preserve the shared 77.5rem alignment axis, mobile content-priority rules, discoverable horizontal tracks, manual portfolio carousel, and modular footer. Do not push until explicitly requested.
