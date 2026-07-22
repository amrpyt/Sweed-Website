# SWEED Mobile Problems and Navigation Adaptation

ID: PLAN-SWEED-011
Created: 2026-07-23
Updated: 2026-07-23T02:43:33+03:00
Status: completed
Related task: SWEED-011

## Goal

Recompose the homepage problem diagnostic and public navigation specifically for phone use instead of shrinking the desktop layouts.

## Current Evidence

- At 390x844, the problems section is about 1287px tall.
- Six separate problem cards consume about 516px before the result appears.
- The direction dial/result occupies about 416px by itself on mobile.
- The mobile menu is a generic below-header dropdown with seven full-width card-like links and a detached CTA.
- There is no horizontal overflow, so the issue is hierarchy, density, and mobile composition rather than a width bug.

## Mobile Direction

### Problems diagnostic

- Put a compact direction/result module first so the user understands the interaction before choosing.
- Keep the dial functional, but reduce it to a supporting 108–120px visual beside the live result.
- Present all six problems inside one bordered diagnostic list instead of six independent cards.
- Keep complete approved problem statements and exact problem/service/source mappings.
- Use full-row touch targets, separators, clear selected state, and a compact CTA.

### Navigation

- Use a 64px compact header on phones.
- Keep the logo and one clear menu trigger in the closed state.
- Open a full-height sheet below the header, not a side drawer.
- Add a short menu introduction, numbered route rows, clear active route, and a strong bottom CTA.
- Lock background scrolling while the sheet is open.
- Preserve Escape close, outside/state cleanup, focus restoration, route structure, and desktop navigation.

## Scope

- `apps/web/src/features/homepage/home-problems-compass-section.tsx`
- `apps/web/src/features/homepage/home-problems-compass-section.module.css`
- `apps/web/src/features/legacy-site/legacy-header.tsx`
- `apps/web/src/features/legacy-site/legacy-header.module.css`
- Focused project memory and verification.

## Non-Goals

- Changing desktop problem layout or desktop inline navigation.
- Changing approved homepage copy, service mappings, or public routes.
- Replacing the direction-dial metaphor.
- Adding a side drawer, bottom app navigation, or a new component library.
- Pushing to GitHub.

## Acceptance Criteria

- [x] Phone problem experience shows the compact direction/result module before the choices.
- [x] Six choices render as one coherent touch list with complete copy and 44px+ targets.
- [x] Selected problem updates the dial, service, solution, CTA, and conversion context.
- [x] Phone problems section is materially shorter than 1287px without hiding core content.
- [x] Mobile header is compact and the open menu reads as one intentional full-height sheet.
- [x] Menu has seven routes, visible active state, primary CTA, Escape close, focus restoration, and contained background scrolling.
- [x] 320px, 360px, 390px, mobile landscape, 768px, 1024px, and desktop layouts have no overflow or clipping.
- [x] Reduced motion keeps all controls and content visible.
- [x] Check, build, service, public HTTP, browser console/error, and interaction QA pass.

## Completion Evidence

- Application commit: `77692c6 fix: adapt navigation and problems for mobile`.
- 390px problems section: about `910px`, down from about `1287px`.
- 390px dial/result: about `146px`, down from about `416px`.
- Phone choice list: six 70px rows inside one 422px surface with no clipped text.
- 320x700 navigation: all seven routes and the 54px CTA fit without menu scrolling.
- 844x390 navigation: two-column route grid fits without menu scrolling.
- 844x390 problems: two-column choice list and section height about `716px`.
- Same-page `خدماتنا` navigation closes the menu and positions the section at `top=65px`.
- Escape closes the menu and restores focus to the menu trigger.
- Problem 01/06, conversion CTA, reduced motion, desktop regression, lazy images, console, errors, build, service, and HTTP checks passed.

## Verification

- `PATH=/home/amr/.bun/bin:$PATH bun run check`
- `PATH=/home/amr/.bun/bin:$PATH bun run build`
- Restart `sweed-demo.service`, poll local HTTP 200, then verify public HTTP 200.
- Browser screenshots and geometry at 320x700, 360x800, 390x844, 844x390, 768x900, 1024x768, and desktop.
- Open/close menu by click and Escape; verify focus and background scroll lock.
- Select first and sixth problems; verify dial angle, service mapping, CTA, and contact context.
- Verify reduced motion, console, errors, broken images, and horizontal overflow.

## Rollback

- Revert the focused application commit.
- Rebuild and restart the demo service.
- Preserve the prior desktop direction dial and standard desktop navigation behavior.
