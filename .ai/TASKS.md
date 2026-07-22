# Tasks

Updated: 2026-07-22T18:44:13+03:00

## Active

- None.

## Completed

### SWEED-005 — Restore navbar and rebuild services section

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-22-navbar-and-services-overhaul.md`
Commits: `3402671`, `022c87d`

#### Acceptance Criteria

- [x] Desktop navigation is visible inline without a drawer.
- [x] Mobile navigation opens below the header instead of from the side.
- [x] Mobile menu supports Escape, focus return, active states, and 44px touch targets.
- [x] All six services render in normal document flow.
- [x] Services use no pinned scroll, absolute panel stack, or horizontal carousel.
- [x] No duplicate services heading remains.
- [x] No overflow at desktop, tablet, and mobile widths.
- [x] Reduced-motion mode keeps all content visible.
- [x] Check/build/deployment/browser verification passed.
- [x] Main branch delivery is included in the requested push operation.

#### Evidence

- Audit score improved from `9/20` to `19/20`.
- Desktop services height reduced from about `2489px` to `1361px`.
- Desktop list is `730/730px` client/scroll width; mobile is `353/353px`.
- All six service panels use `position: static`.
- Mobile navigation links are full-width `366px` with `48px` height at a 390px viewport.
- Escape closes the menu and returns focus to the trigger.
- Homepage and internal services route have no horizontal overflow or browser errors.
- Check and build pass; demo service is active; public URL returns HTTP 200.

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
