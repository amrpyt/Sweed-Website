# SWEED Problems Direction Dial

ID: PLAN-SWEED-010
Created: 2026-07-23
Updated: 2026-07-23T01:59:08+03:00
Status: completed
Related task: SWEED-010

## Goal

Replace the generic traditional compass artwork in the homepage problems section with a distinctive interactive SWEED direction dial that turns the section into a small diagnostic experience while preserving the approved customer statements and contact-conversion mappings.

## Confirmed Direction

- Keep the problems section and its six approved statements.
- Replace the detailed nautical compass image with a custom minimal direction dial built from SWEED brand geometry and a central `S` mark.
- Rotate a single needle toward the selected problem.
- Show the recommended service and solution as the live result.
- Remove redundant radio-circle/check controls and communicate selection through the full card state.
- Replace the wide bottom bar with a compact result/action panel tied visually to the dial.

## Current Evidence

- Existing compass artwork reads as a detailed legacy/clipart object beside a modern card system.
- Each problem card currently carries number, icon, radio-like circle, and check state, creating redundant choice signals.
- The CTA spans a large width and feels detached from the center diagnostic visual.
- Existing problem-to-service mappings already work and must be preserved.

## Scope

- `apps/web/src/features/homepage/home-problems-compass-section.tsx`
- `apps/web/src/features/homepage/home-problems-compass-section.module.css`
- Focused homepage content tests only if the interaction contract changes.
- Desktop, tablet, mobile, keyboard, and reduced-motion browser verification.

## Non-Goals

- Changing approved problem statements.
- Changing service mappings or contact submission behavior.
- Redesigning other homepage sections.
- Adding a new animation library or raster artwork.
- Pushing to GitHub.

## Implementation Stages

### Stage 1 — Build the diagnostic dial

Status: completed

1. Replace the imported compass image with an inline semantic result hub and decorative SVG dial.
2. Map the six problems to six stable needle angles and dial nodes.
3. Display selected service and solution through a polite live region.

### Stage 2 — Recompose choice and result states

Status: completed

1. Simplify card selection affordances and strengthen selected-state hierarchy.
2. Move the CTA into a compact result panel attached to the hub.
3. Keep disabled/default, hover, focus-visible, selected, and reduced-motion states complete.

### Stage 3 — Responsive QA and delivery

Status: completed

1. Run check and production build.
2. Deploy to `sweed-demo.service` and wait for HTTP readiness.
3. Inspect desktop, tablet, mobile, selected, keyboard, and reduced-motion states.
4. Capture and inspect screenshots before committing.
5. Commit the focused application change and update project memory.

## Acceptance Criteria

- [x] Traditional compass image is absent from the section.
- [x] Custom SWEED dial renders with six nodes and a central brand mark.
- [x] Selecting each problem rotates the needle to a distinct matching direction.
- [x] Selected service and solution update visibly and through `aria-live`.
- [x] Problem-to-service conversion state remains correct.
- [x] CTA is disabled until a problem is selected and then focuses contact with the same mapping.
- [x] No redundant empty radio circle remains in cards.
- [x] Desktop, tablet, and mobile have no overlap, clipping, or horizontal overflow.
- [x] Reduced-motion mode removes rotation/transition while keeping the final selected state visible.
- [x] `bun run check`, `bun run build`, service health, and public HTTP checks pass.

## Completion Evidence

- Application commit: `0fcd911 feat: add interactive SWEED direction dial`.
- Old compass image count inside `#problems`: `0`.
- Default result shows `بوصلة سويد` and keeps the CTA disabled.
- Problem 01 produced dial angle `54` and recommended `الاستشارات الإدارية`.
- Problem 06 produced dial angle `-126` and recommended `البرمجة والتطوير`.
- Contact CTA preserved the exact selected problem, service, and source, then focused `#contact`.
- 1440px desktop: no overflow; selected dial and cards fit in a 938px section.
- 1024px tablet: two aligned card columns, dial hub above, zero clipped cards, no overflow.
- 390px mobile: six cards remain full width, dial/result follows the choices, client/scroll width remain equal.
- Reduced-motion mode showed the final selected angle and service with transition duration effectively zero and no hidden cards.
- Browser console/errors: none.
- `bun run check`, `bun run build`, service readiness polling, and public HTTP 200 passed.

## Risks

- SVG transform origins can differ across browsers; verify actual needle rotation in Chromium at all viewports.
- Long Arabic service names can overflow the compact result panel; use balanced wrapping and responsive sizing.
- The center hub can become too visually dominant; keep contrast and scale subordinate to the section heading.

## Verification

- `PATH=/home/amr/.bun/bin:$PATH bun run check`
- `PATH=/home/amr/.bun/bin:$PATH bun run build`
- Restart and poll `http://127.0.0.1:3010/` until HTTP 200.
- Verify public `https://sweed-demo.coderaai.com/` returns HTTP 200.
- Agent-browser screenshots and DOM checks at 1440x900, 1024x768, and 390x844.
- Select at least one problem from each side and assert needle angle/result/mapping.
- Verify keyboard focus and reduced-motion behavior.

## Rollback

- Revert the focused application commit.
- Rebuild and restart the demo service.
- The prior compass image remains available under `apps/web/public/images/homepage/compass-problems.png` if rollback is required.
