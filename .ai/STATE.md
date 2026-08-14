# Current State

Updated: 2026-08-14T17:50:25+03:00
Git branch: main
Application commit: `fix: optically center Arabic button labels`
Active Task: None
Active Plan: None
Status: SWEED-038 Arabic button optical-centering fix completed, deployed, and verified

## Current Goal

Preserve the unified SWEED identity and optically centered Arabic control typography across the homepage and reference pages without changing the approved reference HTML structure, motion, or interactions.

## In Progress

None.

## Completed Recently

- Added semantic control typography tokens for `line-height: 1` and a measured 3px Arabic optical correction.
- Reference CTAs and compact choice controls now use asymmetric semantic block padding so visible Arabic glyphs sit at the visual center of their 48px/44px controls.
- Shared `BrandActionButton` keeps its icon geometrically centered while shifting only the Arabic label optically upward.
- Fixed compact/mobile brand-action geometry so the 28px icon and label stay fully inside the 48px control.
- Added a scoped reference button Theme Bridge derived from the homepage `BrandActionButton` language.
- Unified primary CTAs to purple base / white text / pink interaction accent with 48px minimum height and shared `--shape-control` radius.
- Unified secondary/ghost controls without flattening dark-context hierarchy.
- Unified filters, tabs, chips, quiz options, drawers, skip controls, and comparison close controls with 44px minimum targets and consistent selected/focus states.
- Preserved reference HTML bytes, layout, SVGs, GSAP choreography, and all existing interaction code.
- Added a runtime-only SWEED theme bridge to the reference presentation.
- Preserved exact uploaded source bytes and SHA-256 fidelity checks.
- Replaced runtime Cairo/IBM Plex reference typography with the same `SWEED Helvetica Arabic` stack used by the homepage.
- Normalized reference purple, pink, muted, line, and surface roles to the current homepage identity.
- Removed reference Google Fonts links so unused Cairo/IBM assets are not requested.
- Applied the same palette normalization to inline SVG and GSAP animation color literals.
- Ensured headings inherit section color so dark reference heroes keep white H1 text while light sections keep SWEED dark-purple text.
- Kept all reference layout, SVG geometry, GSAP choreography, ScrollTrigger behavior, filters, tabs, quiz, drawers, comparison overlay, and responsive structure unchanged.

## Verification

- Browser pixel measurement: Services CTA `+0.5px` and homepage primary CTA `-0.5px` from geometric center, improved from the previously observed ~`+4.5px` and ~`+7px` visual offsets.
- Homepage 320px: 48px action button, 28px icon fully contained, label fully contained, zero horizontal overflow.
- Services 320px: 48px CTA with `16px` line-height and `5px/11px` optical block padding; zero overflow.
- Portfolio/Offers 390px: 44px choice controls with `14px` line-height and `5px/11px` optical block padding; zero overflow at 390px and 320px.
- Exact source hashes still pass for Services, Portfolio, and Offers.
- Focused optical/fidelity/reference tests: 14 passed.
- `bun run check`: 113/113 unit tests plus TypeScript, ESLint, spacing, and mobile-first guards passed.
- Production build: passed with 29 routes.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual-checkpoint skip.
- Homepage and reference-page controls compute the same SWEED typography, 16px control radius, purple base, and pink interaction language.
- Reference primary CTAs compute at 48px minimum; choice controls compute at 44px minimum.
- Browser QA passed at 1440×900, 390×844, and 320×568 with zero horizontal overflow.
- Services sticky navigation, Portfolio filter/tab/chip interactions, and Offers quiz/comparison/tab/drawer/package/form interactions passed.
- Reference Google Fonts requests: 0.
- Motion lifecycle remains Services 76, Portfolio 71, Offers 42 ScrollTriggers.
- No page or console errors in final reference-page checks.
- Reduced motion leaves no hidden `.reveal` content.
- `sweed-demo.service`: active; `/`, `/services`, `/portfolio`, and `/offers` return HTTP 200.

## Remaining

- `/articles` remains outside HTML-level fidelity because no executable Articles HTML reference was supplied in the relevant batch.
- Push to GitHub only when explicitly requested.

## Blockers

None.

## Next Exact Action

Preserve the reference-page fidelity boundary and the shared optical-centering tokens. Future visual changes to these routes should stay in runtime integration/theme layers unless the user explicitly approves a source/layout change.
