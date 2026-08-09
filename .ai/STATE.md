# Current State

Updated: 2026-08-09T15:00:00+03:00
Git branch: main
Git HEAD: f8cf2b2
Active Task: None
Active Plan: None
Status: SWEED-032 typography rollback completed and deployed to demo

## Current Goal

Keep the rebuilt public pages and homepage on the SWEED visual system, Carbon spacing contract, mobile-first rules, shared alignment system, and the original SWEED Helvetica Arabic typography. Do not change the public font family without an explicit user request.

## In Progress

None.

## Completed Recently

- Rolled back the SWEED-027 better-typography implementation and all later font-family/weight experiments while preserving subsequent spacing/layout work.
- Restored `SWEED Helvetica Arabic` as both body and display family and restored the exact pre-typography component typography values for the files touched by `ce407ad`.
- Removed the typography Playwright contract that enforced the rejected semantic-scale/weight behavior; section-rhythm coverage remains intact.
- Agent-browser verified the deployed HTTPS homepage uses `SWEED Helvetica Arabic` for H1/H2/H3 on desktop/mobile with zero horizontal overflow.
- Used agent-browser screenshots on the live demo at desktop/mobile to verify the section rhythm visually instead of relying on token values alone.
- Increased semantic section edge contributions to 40/48/64px mobile, 48/64/80px tablet, and 64/80/96px desktop after the 32/40/48 and 48/64/80 edge sets still felt visually cramped around large Arabic headings.
- Public live content gaps now measure 144px for About→Slogan and Slogan→Services at 1440; 80px and 88px respectively at 390/320 with zero horizontal overflow.
- Corrected SWEED-029 after live visual review showed the target inter-section gap had been applied as full padding on both section edges, doubling whitespace between adjacent content groups.
- Section gap targets remain 64/80/96px mobile, 80/96/128px tablet, and 96/128/160px desktop, but each section now contributes roughly half per edge: 32/40/48px mobile, 40/48/64px tablet, 48/64/80px desktop.
- Public slogan-to-Services content gap now measures 112px at 1440 and 72px at 390/320 instead of roughly double those values.
- Reworked the public-site section rhythm from fluid clamps to exact 8px-grid semantic tiers researched against Carbon, Atlassian, Material 3, and Polaris layout guidance.
- Increased section heading-stack spacing to 24px and closely related description spacing to 16px.
- The global token change now drives homepage and rebuilt public routes without local inter-section margin patches.
- Added a Playwright contract that verifies compact/default/feature padding values and overflow across desktop/mobile projects.
- Restored the homepage direction slogan to the pre-typography fluid one-line composition and isolated its wrapping behavior from the global heading balance rule.
- Removed the homepage-only compressed section-spacing overrides so the homepage inherits the shared Carbon compact/default/feature tiers again.
- Verified public desktop spacing at 80px compact, 96px default, and 144px feature; mobile keeps the established 48/64/80 progression.
- Applied `/better-typography` to the public UI and homepage semantic type system.
- Reduced homepage readable computed font sizes from 15 desktop / 17 mobile variants to 7 desktop / 7-or-fewer mobile variants.
- Eliminated readable homepage text below 14px and kept all visible editable controls at 16px on mobile.
- Established semantic UI-title and statement roles plus normalized display/title/card/body/small line heights.
- Reduced body reading measure to 65ch and preserved `text-wrap: balance` for headings and `pretty` for paragraphs.
- Corrected the local Helvetica Arabic `@font-face` metadata from a fake `400–900` range to its verified static Regular weight.
- Added font smoothing, selection styling, underline metrics, and resize-safe long-label wrapping.
- Verified the homepage at 200% text size with zero clipped readable elements and zero horizontal page overflow.
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

- SWEED-029 code gates: 95/95 unit tests plus TypeScript, ESLint, spacing guard, and mobile-first guard passed; legacy max-width query count remains 34/40.
- SWEED-029 production build passed with 29 routes.
- Focused section-rhythm + better-layout Playwright: 4/4 passed across desktop and mobile.
- Public HTTPS section tiers resolve exactly to 96/128/160px at 1440, 80/96/128px at 1024, and 64/80/96px at 390/320.
- Representative public routes `/`, `/services`, `/portfolio`, `/articles`, and `/contact` have zero horizontal overflow at desktop/mobile audit widths.
- Production readiness after SWEED-029: 11 passed, 1 intentional mobile visual checkpoint skip; browser console/page errors are empty.
- SWEED-028 `bun run check`: passed with 95 tests, TypeScript, ESLint, spacing guard, and mobile-first guard.
- SWEED-028 production build: passed with 29 routes.
- Public HTTPS at 1440/390/320: slogan is `nowrap`, internal width equals available width, and page horizontal overflow is zero.
- Public HTTPS desktop: About and Services render 96px top/bottom padding; slogan renders 80px top/bottom padding; feature sections retain 144px rhythm.
- Production readiness after SWEED-028: 11 passed, 1 intentional mobile visual checkpoint skip.
- SWEED-027 `bun run check`: passed with 95 tests, TypeScript, ESLint, spacing guard, and mobile-first guard; legacy max-width query count is 34/40.
- SWEED-027 production build: passed with 29 routes.
- Better-typography + existing homepage focused Playwright: 6/6 passed across desktop and mobile.
- Public HTTPS typography: desktop readable sizes reduced to 7; 390px uses 7; 320px uses 7 including the fluid 14.24px statement size; no readable text below 14px.
- Public HTTPS hierarchy: H1 is 77.76px vs max H2 64px desktop, and 40px vs max H2 34px at 390/320.
- All visible homepage and Contact editable fields are 16px on mobile.
- Public 320px slogan remains one line with no internal/page overflow; at 200% text size it reflows safely.
- Public 200% text-size check at 390px: zero clipped readable elements and zero horizontal page overflow.
- Verified `SWEED Helvetica Arabic` is loaded; source font is a static Regular TrueType face and CSS metadata now reflects that.
- Public browser console and page-error logs are empty.
- Production readiness after SWEED-027: 11 passed, 1 intentional mobile visual checkpoint skip.
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

Review the deployed typography visually. Preserve the semantic type roles, 14px readable floor, 16px mobile editable-control floor, 65ch body measure, resize-safe wrapping, shared 77.5rem alignment axis, and mobile-first layout rules. Do not push until explicitly requested.
