# Tasks

Updated: 2026-07-22T02:52:36+03:00

## Active

- None.

## Completed

### SWEED-001 — Restore browser brand identity

Status: completed
Priority: high
Plan: `.ai/plans/2026-07-22-brand-assets-and-favicon.md`
Commit: `6265594 fix: register SWEED browser icons`

#### Acceptance Criteria

- [x] Root document exposes valid SWEED favicon/icon metadata.
- [x] Referenced icon assets return HTTP 200.
- [x] `bun run check` passes.
- [x] `bun run build` passes.
- [x] Demo service is active and local/public URLs return HTTP 200.
- [x] Desktop and mobile browser checks have no new console errors or horizontal overflow.

#### Dependencies

- Existing official assets under `apps/web/public` — available and serving successfully.

#### Relevant Files and Systems

- `apps/web/src/app/layout.tsx`
- `apps/web/public/sweed-logo-official.svg`
- `apps/web/public/sweed-logo.png`
- `sweed-demo.service`
- `https://sweed-demo.coderaai.com`

#### Evidence

- Before implementation, browser DOM returned no `link[rel*=icon]` elements.
- After deployment, desktop/mobile DOM contains shortcut, SVG, PNG, and Apple touch icon links.
- SVG and PNG assets return HTTP 200.
- `bun run check` passed with zero errors; six existing warnings remain outside this task.
- `bun run build` passed.
- Service is active; local and public homepage checks return HTTP 200.
- Desktop/mobile browser checks show no console errors and no horizontal overflow.

#### Blockers

- None.

#### Next Action

Select the next product task; do not modify the unresolved Process Curtain files without deliberate review.

## Backlog

### SWEED-002 — Resolve unfinished Process Curtain experiment

Status: revisit

- Two untracked files from 2026-07-09 define a homepage process curtain section but are not imported into the live page.
- Preserve them until their design, copy, placement, performance, and mobile behavior are deliberately reviewed.

### SWEED-003 — Replace final placeholder content and media

Status: not-started

- Final official copy, projects, images, video, business numbers, email, and social accounts remain external content dependencies.

### SWEED-004 — Provide approved square app icon

Status: not-started

- Current browser favicon is the official SVG wordmark with the existing PNG fallback.
- Replace the Apple touch fallback with an approved square SWEED mark when a final brand asset is available.
