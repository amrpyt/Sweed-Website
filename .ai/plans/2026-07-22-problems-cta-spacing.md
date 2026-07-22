# Tighten Problems CTA Spacing

ID: PLAN-SWEED-007
Created: 2026-07-22
Updated: 2026-07-22T20:14:00+03:00
Status: completed
Related tasks: SWEED-007

## Goal

Remove the excessive empty area around the homepage problems-section CTA so the action reads as the natural conclusion of the compass interaction.

## Current System Evidence

At a 1400×1069 desktop viewport:

- Lowest problem card bottom: about 963px.
- CTA top: about 1064px.
- Gap from the lowest card to CTA: about 100px.
- CTA bottom to section bottom: 112px.
- The CTA therefore occupies a visually loose ending of roughly 286px from the last card to section end.
- Root cause: the desktop compass stage retains unused space beneath the last card, then flex gap + positive CTA margin are added, followed by symmetric 112px section padding.

## Intended Behavior

- CTA sits immediately below the compass boundary without touching the lowest card.
- Section ending has intentional breathing room, not a large empty block.
- Compass/card geometry and animation remain unchanged.
- Tablet and mobile natural-flow layouts remain unaffected.

## Scope

- Desktop CTA vertical placement.
- Problems-section bottom padding.
- Desktop/mobile visual and geometry verification.
- Build, deployment, commit, and project-memory checkpoint.

## Non-Goals

- Redesigning the compass, cards, CTA component, copy, or animation.
- Changing other homepage section spacing.
- Changing the header or global scroll system.

## File and System Map

- Modify: `apps/web/src/features/homepage/home-public-page.module.css`.
- Runtime: `sweed-demo.service`.
- Browser: public homepage at desktop, tablet, and mobile widths.

## Implementation Stages

### Stage 1 — Correct desktop rhythm

Status: completed

1. Use asymmetric problems-section padding with a tighter bottom value.
2. Pull the desktop CTA upward to meet the outer compass boundary.
3. Keep non-desktop CTA flow unchanged.

### Stage 2 — Verification

Status: completed

1. Run `bun run check` and `bun run build`.
2. Deploy and poll local HTTP readiness.
3. Measure last-card-to-CTA and CTA-to-section-bottom gaps.
4. Review desktop, tablet, and mobile screenshots.
5. Verify no overflow, broken images, or console errors.

### Stage 3 — Delivery

Status: completed

1. Commit the focused CSS change.
2. Update task/state/handoff/session evidence.
3. Push only if explicitly requested later.

## Acceptance Criteria

- [x] Desktop gap between lowest card and CTA is reduced from about 100px to 30–50px.
- [x] Desktop section bottom gap is reduced from 112px to roughly 48–72px.
- [x] CTA does not overlap the lowest problem card.
- [x] Tablet/mobile CTA remains in normal document flow.
- [x] No horizontal overflow, broken images, or browser errors.
- [x] `bun run check` and `bun run build` pass.
- [x] Demo service and public URL return HTTP 200.

## Risks

- A negative desktop margin could overlap content near the 1180px layout switch; contain it inside a `min-width: 1181px` media query.
- Changing shared section padding accidentally could affect other sections; override only `.problemsSection`.

## Verification

- Browser geometry at 1400px, 1180px, and 390px widths.
- Browser screenshots around the complete problems section.
- Check/build/service/local/public HTTP checks.

## Verification Evidence

- 1400px: last-card-to-CTA gap `41.2px`; section bottom gap `56px`.
- 1181px: last-card-to-CTA gap `33.7px`; no overlap at the desktop/grid breakpoint.
- 390px: natural grid flow retained; no overlap or horizontal overflow.
- Broken images: 0.
- Browser console/errors: none.
- `bun run check`: passed with 0 errors and 6 pre-existing warnings.
- `bun run build`: passed.
- Service: active; local/public HTTP 200.
- Application commit: `539cf22 fix: tighten problems CTA spacing`.

## Rollback and Recovery

- Revert commit `539cf22`.
- Rebuild and restart `sweed-demo.service`.
