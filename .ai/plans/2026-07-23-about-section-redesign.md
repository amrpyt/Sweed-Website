# Plan — Redesign homepage “مين سويد؟” section

Date: 2026-07-23
Task: SWEED-013
Status: completed

## Goal

Rebuild the homepage about section so it uses the available desktop width, keeps the video visible, presents the story with strong hierarchy, and remains compact and readable on phones.

## Current Evidence

- User screenshot shows the section collapsed into a narrow centered text column with excessive empty space.
- The current design depends on a reveal-wrapped media column and a dense 2×2 ruled list.
- At 1700px the section is over 1200px tall and the story, principles, vision, and mission compete at nearly the same visual weight.
- All approved about copy and the existing video destination must be preserved.

## Intended Behavior

- Add a full-width section header with a strong title and concise lead.
- Use a balanced desktop composition: persistent video/story visual plus a structured copy column.
- Keep media visible by default rather than gating it behind clip reveal state.
- Turn the four principles into large readable proof rows/cards.
- Present vision and mission as distinct statements with clear labels.
- Preserve the existing CTA and video interaction.
- Recompose cleanly for tablet and mobile without horizontal overflow.

## Files

- `apps/web/src/features/homepage/home-blit-scroll-section.tsx`
- `apps/web/src/features/homepage/home-blit-scroll-section.module.css`

## Acceptance Criteria

- [x] Desktop section uses the 1320px container rather than a narrow central text block.
- [x] Video is visible and remains interactive.
- [x] About title, all four paragraphs, four principles, vision, mission, and CTA remain present.
- [x] Visual hierarchy clearly separates identity, story, principles, and direction.
- [x] 1440, 1024, 768, 390, and 320 widths show no clipping or overflow.
- [x] Reduced motion keeps all content visible.
- [x] Check, build, service, public HTTP, console, and browser QA pass.
- [x] All local commits, including the top-sheet work, are pushed to `origin/main` after verification.

## Completion Evidence

- Application commit: `2016dce refactor: rebuild homepage about section`.
- 1440px: 1320px content width, 666px visible media column, 567px copy column, no overflow.
- 1024px retains balanced two-column layout; 768px and below stack intentionally.
- 390px and 320px retain complete copy, media, principles, direction statements, and CTA without clipping.
- Native `<dialog>` video opens as `تعرف على SWEED` with the correct MP4 source.
- Reduced motion has no hidden content.
- Check/build/service/public HTTP and browser console/error checks passed.
- Normal push advanced `origin/main` from `409c591` to `0f17c31`; post-push divergence was `0/0` before the final delivery-record commit.

## Risks

- Sticky media may create awkward behavior on short viewports.
- Long Arabic paragraphs may create uneven column heights.
- Existing reveal wrappers may hide content in screenshots or on slow devices.

## Verification

- `bun run check`
- `bun run build`
- Service restart with HTTP readiness polling
- Browser screenshots and geometry at desktop/tablet/mobile
- Video trigger, CTA link, reduced motion, overflow, broken images, console/errors
- Fetch remote, verify divergence, normal push, confirm 0/0

## Rollback

Revert the about-section application commit while keeping the already approved top-sheet commits.
