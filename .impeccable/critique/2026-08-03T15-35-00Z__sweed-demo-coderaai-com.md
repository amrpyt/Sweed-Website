---
target: "https://sweed-demo.coderaai.com"
total_score: 36
p0_count: 0
p1_count: 0
timestamp: 2026-08-03T15-35-00Z
slug: sweed-demo-coderaai-com
phase: post-polish-baseline
---

# SWEED public-site critique baseline

## Resolved

- Normalized homepage section-title hierarchy to one semantic scale.
- Reduced live homepage weights from fourteen variants to the approved five: 400, 500, 600, 700, and 800.
- Removed repeated pill-shaped section kickers where they were functioning as generic scaffolding.
- Raised readable public text to a 14px minimum on 390px and 320px viewports.
- Raised FAQ summaries and public interactive controls to a 44px minimum target.
- Applied the readability floor to legacy Portfolio, Articles, Offers, breadcrumbs, service details, and About-page metadata without expanding the legacy HTML architecture.

## Verification

- Twelve representative public routes tested at 1440×900, 390×844, and 320×568.
- Mobile results: zero horizontal overflow, zero visible readable text below 14px, zero visible controls below 44px, one H1, and one main landmark on every tested route.
- Homepage section H2 values are consistently 48.96px/800 on desktop and 34px/800 on mobile.
- `bun run check` passed, including spacing and mobile-first guards.
- Production build passed with 29 routes.
- Browser console and page errors are empty.

## Remaining low-priority debt

- Some specialized About-page display elements still use legacy intermediate weights internally; they do not create hierarchy or readability failures and can be normalized when those components are next redesigned.
- Legacy HTML pages remain temporary compatibility surfaces and should eventually be replaced by typed React pages rather than receiving structural redesigns in place.
