# Plan — Homepage rhythm and video cleanup

Date: 2026-07-23
Task: SWEED-014
Status: completed

## Goal

Remove the hero video interaction, eliminate the duplicated about-video play affordance, refine the “مين سويد؟” heading scale, and establish a consistent, comfortable visual gap between homepage sections.

## Current Evidence

- The hero building image is wrapped by `HomeVideoDialog`, so a large play badge and label sit over the main hero artwork.
- The about media includes a custom pink play circle while `HomeVideoDialog` also renders its own play badge and label, producing two visible play controls.
- The about heading reaches up to `6.2rem`, which dominates the section and creates an awkward visual jump at wide viewports.
- Homepage sections own internal padding independently but have no shared inter-section separation, so transitions can feel abrupt despite large internal content blocks.

## Intended Behavior

- Hero keeps the building artwork and decorative motion but becomes a non-interactive image with no play badge, label, or video dialog.
- About video keeps one clear play affordance only.
- “مين سويد؟” remains prominent but uses a more controlled scale and line-height.
- Direct homepage sections receive a shared fluid separation token, with smaller but still visible spacing on mobile.
- Existing content order, hero motion, about video dialog, anchors, and conversion behavior remain unchanged.

## Scope

- `apps/web/src/features/homepage/home-public-page.tsx`
- `apps/web/src/features/homepage/home-public-page.module.css`
- `apps/web/src/features/homepage/home-blit-scroll-section.tsx`
- `apps/web/src/features/homepage/home-blit-scroll-section.module.css`
- Project memory files

## Non-goals

- Rewriting homepage copy.
- Removing the about-section video.
- Redesigning unrelated sections.
- Changing navigation, contact flows, or services interactions.

## Acceptance Criteria

- [x] Hero contains no video trigger or play control.
- [x] Hero building image and existing decorative scroll motion remain visible.
- [x] About media exposes exactly one play affordance.
- [x] About title scale feels balanced at 1700/1440 widths and does not clip on mobile.
- [x] Direct homepage sections have a visible, consistent fluid separation.
- [x] No new horizontal overflow, broken images, clipped user-visible text, or console/browser errors.
- [x] Reduced motion keeps all content visible.
- [x] Check, build, service readiness, public HTTP, desktop/mobile screenshots, and primary video interaction pass.

## Completion Evidence

- Application commit: `8e5122d fix: clean homepage video and section rhythm`.
- Hero video trigger count is zero; hero play-icon count is zero.
- Hero building artwork remains loaded and its GSAP scroll transform changes from scale `1` to `1.028` with upward movement.
- About section exposes one video trigger and one visible play icon; the native dialog opens the approved MP4.
- About title renders at `83.2px` on 1700px, `53.248px` on 1024px, `50.7px` on 390px, and `41.6px` on 320px without overflow.
- Inter-section separation is `85px` at 1700px, `51px` at 1024px, and `28px` on phone widths.
- About play icon/label do not overlap the media-copy text on mobile.
- Full lazy-image pass at 1024px and 320px found no broken images.
- Reduced motion, browser errors, console, check, build, local readiness, and public HTTP passed.

## Risks

- Removing the hero dialog wrapper could affect BorderBeam sizing or the building scroll animation target.
- A global section gap could over-lengthen already spacious sections.
- Removing the custom about play circle could leave the shared play badge poorly positioned.

## Verification

- `bun run check`
- `bun run build`
- Restart `sweed-demo.service`, poll local HTTP 200, then public HTTPS 200
- Browser QA at 1700×900, 1440×900, 1024×768, 390×844, and 320×700
- Count hero/about video triggers and visible play controls
- Open about video dialog and verify source
- Inspect section-to-section geometry and full-page rhythm
- Reduced motion, overflow, broken images, console, and browser errors

## Rollback

Revert the application commit to restore the hero video trigger, previous about play treatment, and existing section spacing.
