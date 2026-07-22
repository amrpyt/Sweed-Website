# Tasks

Updated: 2026-07-22T19:41:50+03:00

## Active

- None.

## Completed

### SWEED-006 — Rebuild header, progress, and replayable scroll motion

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-22-scroll-system-overhaul.md`
Commit: `685660d fix: rebuild scroll interaction system`

#### Acceptance Criteria

- [x] Fixed header hides on downward scrolling and returns on upward scrolling.
- [x] Header remains visible while navigation is open or focused.
- [x] Progress indicator is visible above the header and tracks the full document.
- [x] No fixed blur overlay remains at the top of the website.
- [x] Viewport-triggered animations replay after exit and re-entry.
- [x] Reduced-motion mode keeps content visible without animation.
- [x] Desktop/mobile browser checks show no overflow or console errors.
- [x] `bun run check` and `bun run build` pass.
- [x] Demo service and public URL return HTTP 200.

#### Evidence

- Header is fixed at z-index 1100 and reserves responsive layout space.
- Downward scroll hid the desktop header to `top=-81`; upward scroll restored `top=0`.
- Mobile reproduced the same behavior and kept the header visible while its menu was open.
- Progress sits at z-index 1201, reached intermediate values, and reached `100%` at document end.
- Global GradualBlur overlay count is zero.
- Reveal, process, text, and metric animations reset/replay on viewport re-entry.
- Reduced-motion mode displays all content and final metric values.
- Check/build/service/public/browser verification passed.

#### Blockers

- None.

#### Next Action

Select the next product or content task.

### SWEED-005 — Restore navbar and rebuild homepage services

Status: completed
Commits: `3402671`, `022c87d`, `e32d576`, `80f4a75`

### SWEED-002 — Rebuild and integrate homepage process section

Status: completed
Commit: `885103f`

### SWEED-001 — Restore browser brand identity

Status: completed
Commits: `6265594`, `32122d0`

## Backlog

### SWEED-003 — Replace final placeholder content and media

Status: not-started

### SWEED-004 — Provide approved square app icon

Status: not-started
