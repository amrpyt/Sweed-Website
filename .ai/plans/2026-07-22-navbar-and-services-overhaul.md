# Navbar and Services Overhaul

ID: PLAN-SWEED-003
Created: 2026-07-22
Updated: 2026-07-22T18:47:36+03:00
Status: completed
Related tasks: SWEED-005

## Goal

Restore a conventional always-visible navigation bar and rebuild the homepage services section from the ground up so it is clear, responsive, accessible, visually premium, and structurally reliable.

## Before-Fix Audit

Audit health score: **9/20 — Poor**.

| Dimension | Score | Key finding |
|---|---:|---|
| Accessibility | 2/4 | Mobile services required horizontal swiping without an explicit control or progress cue; heading was duplicated. |
| Performance | 1/4 | GSAP pinned a six-panel absolute stack and expanded the section to about 2489px on a 577px viewport. |
| Responsive | 2/4 | Mobile services list measured 1892px inside a 355px viewport. |
| Theming | 2/4 | Cream gradient, glass effects, oversized shadows, and non-system radii conflicted with the design contract. |
| Anti-patterns | 2/4 | Side drawer navigation, stacked cards, duplicate heading, and forced scroll choreography looked template-driven. |

Verified before-fix evidence:

- Desktop services section height: approximately `2489px`.
- Service panels used `position: absolute`; later panels overlapped at the same coordinates.
- Mobile services list: `scrollWidth 1892px`, `clientWidth 355px`.
- Desktop primary navigation was hidden behind `StaggeredMenu`.

## Implemented Behavior

### Navbar

- Replaced `StaggeredMenu` with a semantic sticky `header/nav`.
- Desktop shows official logo, inline links, active state, and consultation CTA.
- Mobile menu opens as a full-width dropdown directly below the header, not from the side.
- Escape closes the menu and restores focus to the trigger.
- Clicking outside closes the menu.
- All menu targets are at least 44px; mobile links are 48px high and full width.

### Services

- Removed GSAP, ScrollTrigger, pinning, absolute panel stacking, and horizontal carousel behavior.
- Rebuilt the section as a two-column desktop composition with a sticky introduction and vertical service list.
- Mobile renders all six services in a natural vertical flow.
- Removed the duplicate heading.
- Added focused service imagery, clear title/summary hierarchy, visible action affordances, keyboard focus states, and AA-safe interactive colors.
- Removed 313 obsolete service CSS lines from the shared homepage module.

## Files Changed

- `apps/web/src/features/legacy-site/legacy-header.tsx`
- `apps/web/src/features/legacy-site/legacy-header.module.css`
- `apps/web/src/features/homepage/home-services-scroll-section.tsx`
- `apps/web/src/features/homepage/home-services-section.module.css`
- `apps/web/src/features/homepage/home-public-page.module.css`

## Commits

- `3402671 fix: restore standard responsive navbar`
- `022c87d refactor: rebuild homepage services section`

## After-Fix Audit

Audit health score: **19/20 — Excellent**.

| Dimension | Score | Evidence |
|---|---:|---|
| Accessibility | 4/4 | Semantic navigation, active state, focus-visible rings, Escape/focus return, 44–48px targets, image alt text, and no hidden service content. |
| Performance | 4/4 | Services component has no client runtime, GSAP, pinning, or absolute stack; images use Next Image and lazy loading. |
| Responsive | 4/4 | No overflow at 390, 768, 1024, or 1280 widths; mobile list width equals client width. |
| Theming | 3/4 | SWEED palette and restrained surfaces are consistent; a few component-local hard-coded brand shades remain. |
| Anti-patterns | 4/4 | No side drawer, duplicate heading, glass stack, forced horizontal carousel, or artificial scroll distance. |

Verified after-fix evidence:

- Desktop services section height: approximately `1361px`, matching natural content.
- All service links use `position: static`.
- Desktop service list: `730px / 730px` client/scroll width.
- Mobile service list: `353px / 353px` client/scroll width.
- All six panels visible in reduced-motion mode.
- Zero broken service images after lazy-load verification.
- Desktop homepage shows nine visible header links including logo/CTA; internal services page fits all navigation links inside the header.
- Mobile dropdown width: `390px`; every navigation link width: `366px`, height: `48px`.
- No console errors or horizontal page overflow.

## Acceptance Criteria

- [x] Desktop navigation links are visible without opening a drawer.
- [x] Mobile navigation opens below the header, not from the side.
- [x] Mobile menu supports Escape, focus return, and 44px touch targets.
- [x] Services section contains all six services in normal document flow.
- [x] Services section has no GSAP pin, absolute card stack, or horizontal carousel.
- [x] Desktop services height is proportionate to actual content.
- [x] No duplicate services heading.
- [x] No horizontal overflow at 390px, 768px, 1024px, or desktop widths.
- [x] Reduced-motion mode keeps all content visible.
- [x] Check/build/service/public/browser verification passed.
- [x] Main branch pushed and verified against `origin/main`.

## Verification

- `bun run check` — passed with zero errors and six unrelated pre-existing warnings.
- `bun run build` — passed with documented pre-existing workspace-root/NFT warnings.
- `sweed-demo.service` — active after HTTP readiness polling.
- Local/public homepage — HTTP 200.
- Desktop/mobile/tablet/internal-route browser QA — passed.
- `git push origin main` — succeeded.
- Post-push divergence — `0 0`; local and remote HEAD both `e32d576a0c78f03d5b1ace8802a99b5aee07da8e` before the final memory-sync commit.

## Rollback and Recovery

- Revert commits `022c87d` and `3402671` in reverse order.
- Rebuild and restart `sweed-demo.service`.
- Poll local HTTP readiness before public verification.
