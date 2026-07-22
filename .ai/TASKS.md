# Tasks

Updated: 2026-07-22T03:10:00+03:00

## Active

- None.

## Completed

### SWEED-002 — Rebuild and integrate homepage process section

Status: completed
Priority: high
Plan: `.ai/plans/2026-07-22-home-process-section.md`
Commit: `885103f feat: add homepage process section`

#### Acceptance Criteria

- [x] Process section appears after services on the live homepage.
- [x] All four process steps and durations are visible.
- [x] No dark section flip or long pinned-scroll behavior remains.
- [x] Desktop/mobile layouts have no horizontal overflow.
- [x] Reduced-motion mode keeps all content visible.
- [x] `bun run check` and `bun run build` pass.
- [x] Demo service and public URL return HTTP 200.
- [x] Browser console has no new errors.

#### Evidence

- Section is rendered between services and outcome metrics.
- Desktop and mobile browser QA passed.
- Mobile sticky behavior is disabled and all step widths fit the viewport.
- Reduced-motion nodes remain fully visible with no transforms.
- Check/build/service/public route verification passed.

### SWEED-001 — Restore browser brand identity

Status: completed
Plan: `.ai/plans/2026-07-22-brand-assets-and-favicon.md`
Commits: `6265594`, `32122d0`

- Root favicon metadata, checks, build, deployment, and desktop/mobile verification completed.

## Backlog

### SWEED-003 — Replace final placeholder content and media

Status: not-started

### SWEED-004 — Provide approved square app icon

Status: not-started
