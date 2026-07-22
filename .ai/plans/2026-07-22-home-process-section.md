# Homepage Process Section

ID: PLAN-SWEED-002
Created: 2026-07-22
Updated: 2026-07-22T03:10:00+03:00
Status: completed
Related tasks: SWEED-002

## Goal

Turn the abandoned Process Curtain experiment into a production-ready homepage process section that explains how SWEED works without breaking the light visual system or slowing the page.

## Current System Evidence

- Two untracked files defined a GSAP curtain section but were not imported into the homepage.
- The prior design flipped from light to deep purple, pinned the viewport, and used four similar glass cards.
- `DESIGN.md` specifies a light-default page and rejects unplanned dark/light section flips.
- The process content already existed in `apps/web/src/content/homepage.ts`.
- The live homepage previously moved directly from services to outcome metrics.

## Intended Behavior

- Add a clear process section between services and outcome metrics.
- Keep the section light, readable, RTL, and visually distinct without a sudden theme flip.
- Use a sticky introduction and sequential step list rather than a uniform card grid.
- Keep motion subtle, scroll-triggered, transform-based, and reduced-motion safe.
- Preserve all current conversion paths and content.

## Scope

- Rewrote the existing Process Curtain TSX and CSS files.
- Imported and rendered the section in `home-public-page.tsx`.
- Ran checks, build, browser desktop/mobile QA, deployed, and committed.

## Non-Goals

- Changing the process content model.
- Adding a new CTA or form.
- Reordering other homepage sections beyond inserting this section.
- Redesigning unrelated homepage modules.

## File and System Map

- Rewritten: `apps/web/src/features/homepage/home-process-curtain-section.tsx`.
- Rewritten: `apps/web/src/features/homepage/home-process-curtain-section.module.css`.
- Modified: `apps/web/src/features/homepage/home-public-page.tsx`.
- Runtime: `sweed-demo.service` and public demo.

## Implementation Stages

### Stage 1 — Replace abandoned design

Status: completed

1. Removed curtain, pinning, progress bar, and dark-mode transition.
2. Built a light sticky-intro plus ordered process list.
3. Added restrained GSAP reveal and reduced-motion behavior.

### Stage 2 — Integrate and verify

Status: completed

1. Inserted the section after services.
2. `bun run check` and `bun run build` passed.
3. Deployed and verified desktop/mobile content, console, overflow, and reduced-motion behavior.

### Stage 3 — Commit and handoff

Status: completed

1. Committed feature as `885103f feat: add homepage process section`.
2. Updated task evidence, state, and handoff.

## Acceptance Criteria

- [x] Process section appears after services on the live homepage.
- [x] All four process steps and durations are visible.
- [x] No dark section flip or long pinned-scroll behavior remains.
- [x] Desktop and mobile layouts have no horizontal overflow.
- [x] Reduced-motion mode keeps all content visible.
- [x] `bun run check` and `bun run build` pass.
- [x] Demo service and public URL return HTTP 200.
- [x] Browser console has no new errors.

## Risks

- Sticky positioning is disabled below tablet width to avoid mobile scroll friction.
- Existing Next.js workspace-root and NFT trace warnings remain unrelated to this task.

## Verification

- `bun run check` — passed; 0 errors, 6 existing warnings.
- `bun run build` — passed.
- Service readiness polling — local HTTP 200 on second attempt.
- Public URL — HTTP 200.
- Desktop section — all four steps visible, no overflow, no console errors.
- Mobile 390x844 — step width 355px inside 390px viewport, sticky disabled, no overflow.
- Reduced motion — all intro/step nodes opacity 1, transform none, visible.
- Screenshots saved under `/var/tmp/agent-browser/artifacts/sweed/` on the VPS.

## Rollback and Recovery

- Revert commit `885103f`.
- Rebuild and restart the demo service.
- Removing the import restores the previous homepage flow.
