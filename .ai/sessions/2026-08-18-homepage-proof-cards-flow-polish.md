# SWEED-048 Session — Homepage proof cards and flow polish

Date: 2026-08-18
Implementation: `a3d519f fix: polish homepage proof cards and flow`

## Requested changes

- Remove the standalone direction/slogan section and reuse its message in the hero subtitle.
- Improve the restaurant proof presentation.
- Move `شاهد كل الأعمال` below the Selected Work cards.
- Refine Selected Work card presentation while preserving SWEED identity and proof-state truth.
- Add a decorative dotted separator between Services and Why.

## Implementation

- Hero subtitle changed to `نحدد لك الاتجاه، ونلتزم معك بالوصول — معًا ستصل.` and `HomeGapSection` is no longer rendered.
- Pending restaurant case title simplified to `قطاع المطاعم`.
- Portfolio CTA moved below the carousel.
- Portfolio cards use white proof surfaces, restrained elevation, category/status chips, and distinct verified/pending result styling.
- Added five alternating SWEED pink/purple dots between Services and Why.

## Verification

- TDD red state observed for the new hero-copy and CTA-order contracts.
- Focused homepage tests: 10 passed, 0 failed, 38 expectations.
- Full `bun run check`: 153 passed, 0 failed, 651 expectations; spacing, mobile-first, TypeScript, ESLint all green.
- Impeccable detector returned `[]`.
- Production build `6-l3XQ4eL9exGMJW596dw` deployed; `sweed-demo.service` active; local/public homepage HTTP 200.
- Managed browser checks confirmed new subtitle, absent `#slogan`, CTA below cards, restaurant title, five-dot divider, no broken images, and no horizontal overflow at 1440px/390px checks.

## Repository safety

- No push performed.
- Unrelated dirty reference-service files and existing `apps/web/public/__qa/` artifacts were not staged or modified by this task.
