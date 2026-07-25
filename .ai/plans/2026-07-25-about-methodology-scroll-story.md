# Plan — About methodology scroll story

Updated: 2026-07-25T16:25:05+03:00
Status: completed
Task: SWEED-019

## Goal

Turn the `/about#methodology` section into a deliberate GSAP scroll-linked story: the desktop section pins beneath the fixed header, the five stages activate one by one across measured scroll distance, and normal document scrolling resumes only after stage five completes.

## Current Evidence

- The section already uses GSAP and `ScrollTrigger`, but its trigger runs from `top 70%` to `bottom 78%` without pinning.
- The complete five-stage timeline is compressed into a short viewport interval, so all cards appear almost at once.
- Global Lenis is already synchronized with `ScrollTrigger.update` and GSAP ticker.
- The header is 77px desktop and 64px mobile.
- The existing semantic ordered list, desktop horizontal path, mobile vertical path, and reduced-motion natural layout are suitable foundations.

## Intended Behavior

### Desktop and large tablet

- Pin the methodology stage beneath the fixed header.
- Allocate roughly one viewport segment per stage.
- Begin with stage 1 active and stages 2–5 subdued.
- As progress crosses each segment, advance the path, stage state, progress label, and copy emphasis.
- Completed stages remain readable; the current stage receives the strongest emphasis; future stages remain subdued.
- Release the pin after stage 5 is fully active and continue naturally into `#numbers`.

### Phone and short viewport

- Keep the five steps in natural vertical flow.
- Tie each step and the vertical path to scroll position with scrubbed activation.
- Do not pin a tall mobile list or create scroll trapping.

### Reduced motion

- No pin, scrub, transforms, opacity gating, or animated path.
- All five steps and the full path remain visible immediately.

## Scope

- `about-page-motion.tsx`
- `about-public-page.tsx`
- `about-public-page.module.css`
- Focused methodology tests or data attributes where useful.
- OpenSpec and project-memory records.

## Non-goals

- No content changes.
- No new animation dependency.
- No scroll snapping or forced wheel/touch hijacking.
- No change to other About sections.

## Implementation Stages

1. Add stable methodology pin/progress hooks and accessible progress copy.
2. Replace the compressed timeline with GSAP `matchMedia` strategies.
3. Desktop: pinned scrub timeline with viewport-derived end distance and clean stage state transitions.
4. Mobile/short viewport: natural-flow scrubbed step activation.
5. Add CSS states for current/completed/future stages without layout animation.
6. Verify reduced motion, reverse scrolling, resize refresh, desktop, tablet, mobile, short landscape, and transition to `#numbers`.
7. Build, deploy, browser QA, commit application code, then record evidence.

## Acceptance Criteria

- [x] Desktop methodology pins below the header and releases only after stage 5 completes.
- [x] Exactly one current stage is emphasized at each progress segment.
- [x] Path progress and stage indicator remain synchronized in forward and reverse scrolling.
- [x] Phone and short-height layouts remain natural-flow and do not trap scroll.
- [x] Reduced motion shows complete content with no pin or hidden stages.
- [x] Resizing/refreshing does not duplicate triggers or leave pin spacers.
- [x] The following `#numbers` section begins normally after the pinned sequence.
- [x] No horizontal overflow, clipped Arabic text, broken images, browser errors, or console errors.
- [x] Check, tests, build, service readiness, public HTTP, and browser QA pass.

## Completion Evidence

- Application commit: `091ecd9 feat: add methodology scroll story`.
- Desktop pin distance measured `3780px` at `1440×900`; pin remained at `top: 77px` while active.
- Stage samples after final deployment: 01 at 12%, 02 at 24%, 03 at 42%, 04 at 62%, and 05 from 78% through release.
- Reverse scrolling moved stage state correctly from 05 back through 03, 02, and 01.
- The fifth stage remains active with the path complete before pin release; after release the `#numbers` section enters normally.
- `1024×768` retained the pinned sequence with all cards and CTA inside the viewport.
- `390×844` used natural vertical flow with no pin spacer and activated stages 01→05 individually.
- `844×390` used the compact static fallback with no pin or hidden content.
- Reduced motion used no pin, hid the decorative progress control, and showed all five steps and full paths immediately.
- Resizing desktop→mobile→desktop produced exactly one, then zero, then exactly one methodology pin spacer.
- Browser QA found no overflow, browser errors, or console errors; Web Vitals smoke measured CLS `0`.
- Check, focused tests, production build, service readiness, and public HTTP 200 passed.

## Risks

- Pinning an element taller than the viewport can create inaccessible content; only enable it above a verified height threshold.
- Existing general About animations must not target methodology nodes concurrently.
- ScrollTrigger refresh must account for fonts, images, header offset, and responsive layout changes.
- Lenis synchronization already exists; do not add a duplicate ticker or scroller proxy.

## Rollback

Revert the methodology application commit; the existing semantic natural-flow section remains intact.
