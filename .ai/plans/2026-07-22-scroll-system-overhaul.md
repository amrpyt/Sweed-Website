# SWEED Scroll System Overhaul

ID: PLAN-SWEED-004
Created: 2026-07-22
Updated: 2026-07-22T19:41:50+03:00
Status: completed
Related tasks: SWEED-006

## Goal

Rebuild the homepage scroll interaction system so the header hides while scrolling down and returns while scrolling up, the reading progress indicator remains visible above the interface, the top blur overlay is removed, and viewport-triggered animations replay whenever their sections re-enter the viewport.

## Current System Evidence

- Live header uses `position: sticky`, but browser inspection at `scrollY=2500` reports the header at `top=-2500`, so it leaves the viewport permanently.
- A fixed `GradualBlur` page-header overlay covers the top `88px` with z-index `180`.
- The progress indicator is fixed at the top but uses React state on every scroll event and a transition that visually lags behind actual scroll.
- `Reveal` defaults to `once=true` and unobserves after the first entry.
- `TextSignalReveal`, the process section, the problems compass, and metrics use one-shot ScrollTrigger/IntersectionObserver behavior.
- Public technical references support:
  - Passive/throttled scroll direction handling for high-frequency scroll events.
  - CSS Scroll Progress Timelines for a compositor-driven reading indicator with a JavaScript fallback.
  - IntersectionObserver for asynchronous viewport entry/exit detection.
  - ScrollTrigger `toggleActions`/callbacks for replaying animations on enter and enter-back.
  - Transform/opacity animation for compositor-friendly movement.

## Intended Behavior

- Header is fixed and always recoverable.
- Header stays visible near page top.
- Scrolling down past the threshold hides the header using `transform` only.
- Scrolling upward reveals it quickly, regardless of current page depth.
- Opening/focusing the navigation keeps the header visible.
- The progress bar remains at the viewport top and above the header.
- Progress tracks document scroll precisely without a delayed transition.
- No global blur overlay exists above the page.
- Scroll-triggered reveals replay on every viewport re-entry in either direction.
- Reduced-motion users receive fully visible content without reveal movement.

## Scope

- `LegacyHeader` scroll-direction state and fixed positioning.
- `useScrollHeaderVisibility` hysteresis/throttling.
- Reading progress component and styles.
- Global page scroll effects.
- Shared Reveal and TextSignalReveal behavior.
- Homepage process, problems compass, and metric animations.
- Desktop/mobile/reduced-motion browser verification.

## Non-Goals

- Replacing Lenis smooth scrolling.
- Replaying the initial hero page-load choreography on every scroll.
- Redesigning section layouts or content.
- Introducing another animation library.

## File and System Map

- Modify: `apps/web/src/features/legacy-site/legacy-header.tsx`
- Modify: `apps/web/src/features/legacy-site/legacy-header.module.css`
- Modify: `apps/web/src/features/legacy-site/use-scroll-header-visibility.ts`
- Modify: `apps/web/src/components/ui/progress-indicator.tsx`
- Modify: `apps/web/src/components/ui/progress-indicator.module.css`
- Modify: `apps/web/src/components/motion/page-scroll-effects.tsx`
- Modify: `apps/web/src/components/motion/reveal.tsx`
- Modify: `apps/web/src/components/motion/text-signal-reveal.tsx`
- Modify: `apps/web/src/components/motion/gsap-provider.tsx`
- Modify: `apps/web/src/features/homepage/home-process-curtain-section.tsx`
- Modify: `apps/web/src/features/homepage/home-problems-compass-section.tsx`
- Modify: `apps/web/src/features/homepage/home-why-metrics-section.tsx`
- Runtime: `sweed-demo.service`

## Implementation Stages

### Stage 1 — Header and progress architecture

Status: completed

1. Upgrade scroll-direction hook with direction hysteresis and throttled passive events.
2. Change header from sticky to fixed and reserve its layout space explicitly.
3. Add transform-only hidden/visible states and focus/menu visibility safeguards.
4. Rebuild the progress indicator with a CSS Scroll Timeline and imperative fallback.
5. Remove the global top blur overlay.

### Stage 2 — Replayable viewport animation system

Status: completed

1. Change shared `Reveal` default to replay on intersection changes.
2. Configure `TextSignalReveal` and optional GSAP heading provider for restart/reset behavior.
3. Replace one-shot ScrollTriggers in process and problems sections.
4. Reset and replay metric counters on viewport re-entry.
5. Preserve reduced-motion behavior.

### Stage 3 — Verification and delivery

Status: completed

1. Run check and build.
2. Restart service and poll local readiness.
3. Verify header down/up direction behavior at multiple depths.
4. Verify progress position/value and absence of the top blur overlay.
5. Verify animations replay after exit/re-entry on desktop and mobile.
6. Verify reduced-motion content remains visible.
7. Commit and push after successful browser QA.

## Acceptance Criteria

- [x] Header is fixed at the viewport top when visible.
- [x] Header hides on sustained downward scrolling past the threshold.
- [x] Header returns after upward scrolling at any page depth.
- [x] Header stays visible while mobile menu is open or keyboard focus is inside it.
- [x] Progress bar is visible at the viewport top above the header.
- [x] Progress bar reaches 0%, intermediate values, and 100% correctly.
- [x] Global top blur overlay is absent.
- [x] Shared and custom homepage scroll animations replay after leaving and re-entering.
- [x] Reduced-motion mode keeps all content visible and usable.
- [x] No horizontal overflow or console errors on desktop/mobile.
- [x] `bun run check` and `bun run build` pass.
- [x] Local/public URLs return HTTP 200 after deployment.

## Risks

- Fixed header can cause content overlap; mitigate with an explicit responsive spacer.
- Rapid direction changes can make the header flicker; mitigate with accumulated-distance hysteresis.
- Replayable animation observers can trigger too often near thresholds; use meaningful thresholds/root margins and cancel existing animation frames.
- CSS Scroll Timeline support varies; provide an imperative transform fallback.
- Repeated metric animation can create concurrent RAF loops; cancel old frames before restart/reset.

## Verification

- `bun run check` passed with 0 errors and 6 pre-existing warnings.
- `bun run build` passed with the documented workspace-root/NFT warnings.
- Header at top: fixed, `top=0`, z-index `1100`.
- At `scrollY=1800`, downward scroll hid the header to `top=-81`; a 280px upward scroll restored `top=0`.
- Mobile at 390px reproduced the same hide/reveal behavior without overflow.
- Open mobile navigation remained visible while the page scrolled; Escape closed it and restored focus.
- Progress remained fixed at `top=0`, z-index `1201`, tracked intermediate progress, and reached `100%` at document end.
- GradualBlur overlay count is `0`.
- Shared Reveal state cycled `true → false → true` across exit/re-entry.
- Process step reset to opacity `0.64` / x `28`, replayed through an intermediate state, and completed at opacity `1` / x `0`.
- Metrics completed, reset to `0` offscreen, replayed through intermediate values, and completed again.
- Reduced-motion mode showed final metric values and visible process/reveal content with no console errors.
- Local and public routes returned HTTP 200 after readiness polling.

## Rollback and Recovery

- Revert the focused scroll-system commit.
- Rebuild and restart `sweed-demo.service`.
- Restore the previous sticky header and one-shot animation configuration if necessary.
