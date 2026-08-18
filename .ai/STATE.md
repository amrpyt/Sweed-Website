# Current State

Updated: 2026-08-18T16:36:00+03:00
Git branch: main
Git HEAD: `a9297d0cad7276f659b4e4db711306cbf6e9fcb4`
Application commit: `fix: unify homepage control geometry`
Active Task: None
Active Plan: None
Status: SWEED-039 homepage visual consistency pass completed, deployed, and verified

## Current Goal

Close the remaining homepage/header control-shape drift and preserve individual rounded Problem Selector cards on mobile while keeping the existing layout, content, interactions, and reference-page fidelity boundary intact.

## In Progress

None.

## Completed Recently

- Normalized remaining homepage CTA-style actions and shared header CTAs to the 48px `--shape-control` geometry and strong SWEED type weight.
- Preserved semantic pills while removing unrelated full-pill/10px CTA radii from the About, Offers, Blog, and Contact actions.
- Kept mobile Problem Selector choices as separated rounded cards with a clear SWEED pink selected state instead of square table rows.
- Removed the homepage focus rule that visually overrode component-specific control radii.
- Scoped the mobile touch-target floor with zero-specificity selectors so component control geometry remains authoritative.
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

- SWEED-039 focused homepage/fidelity/reference suite: 18 passed, 0 failed.
- `bun run check`: 117/117 unit tests plus TypeScript, ESLint, spacing, and mobile-first guards passed.
- Production build: passed with 29 routes.
- Browser QA: 1440×900, 1024×768, 390×844, and 320×568 passed with no horizontal overflow or page/console errors.
- Header/About/services/blog CTA measurements: 48px height, 16px shared control radius, 700 strong weight where applicable.
- Mobile Problem Selector cards: 12px card radius with 1px border; selected state uses SWEED pink border/background and `aria-pressed=true`.
- Reduced-motion media leaves all six Problem Selector options visible; reference reveal content also remains visible.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual-checkpoint skip.
- `sweed-demo.service`: active; `/`, `/services`, `/portfolio`, and `/offers` return HTTP 200 locally and publicly.
- Final reference motion lifecycle remains Services 76 / Portfolio 71 / Offers 42 ScrollTriggers at desktop and mobile widths.
- Deployment note: stop `sweed-demo.service` before rebuilding `.next`, then start it after `BUILD_ID` exists. Building while the running Next 16 process is serving the same `.next` can race with systemd restarts and leave an incomplete production build.
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

Preserve the unified homepage/header control hierarchy and reference-page fidelity boundary. The next visual pass should target mobile page density/performance rather than introducing new control variants.
