# SWEED Brand Assets and Favicon

ID: PLAN-SWEED-001
Created: 2026-07-22
Updated: 2026-07-22T02:52:36+03:00
Status: completed
Related tasks: SWEED-001

## Goal

Make the SWEED browser identity load reliably by registering the existing official logo assets as favicon/app icons, while preserving all unrelated homepage work.

## Current System Evidence

- Public demo is active and returns HTTP 200 locally and publicly.
- Desktop and mobile browser checks show no console errors and no horizontal overflow.
- Before the change, the rendered document had no `link[rel*=icon]` entries.
- Existing official assets are available and return HTTP 200:
  - `/sweed-logo-official.svg`
  - `/sweed-logo.png`
- Two unrelated untracked homepage process-section files already exist and were not changed.

## Intended Behavior

- Browser document exposes valid icon metadata on all routes.
- SWEED official SVG is used for standard and shortcut browser icons.
- Existing PNG is available as a standard fallback and Apple touch icon.
- Typecheck, lint, unit tests, and build pass.
- Demo service remains healthy and public HTTPS returns 200 after deployment.

## Scope

- Root Next.js metadata/icon registration.
- Focused regression verification in browser on desktop and mobile.
- Project memory updates and atomic commit.

## Non-Goals

- Redesigning the logo.
- Editing the unfinished Process Curtain section.
- Replacing current homepage copy or imagery.
- Changing Caddy, service ports, or deployment architecture.
- Pushing commits to GitHub.

## File and System Map

- Modified: `apps/web/src/app/layout.tsx` — registered root metadata icons.
- Verified: `apps/web` typecheck/lint/unit/build.
- Runtime: `sweed-demo.service` and `https://sweed-demo.coderaai.com`.
- Browser: desktop and 390x844 mobile viewport.

## Implementation Stages

### Stage 1 — Register official icons

Status: completed

1. Added typed root metadata with SVG, PNG, shortcut, and Apple icon entries.
2. Confirmed homepage page-level metadata merges with root icons.
3. Static checks passed.

### Stage 2 — Full verification

Status: completed

1. `bun run check` passed with zero errors and six pre-existing warnings.
2. `bun run build` completed successfully with pre-existing workspace-root/NFT trace warnings.
3. Restarted `sweed-demo.service` and waited for readiness.
4. Confirmed local and public HTTP 200.
5. Confirmed all expected icon links render on desktop and mobile.

### Stage 3 — Delivery checkpoint

Status: completed

1. Committed the focused application change as `6265594 fix: register SWEED browser icons`.
2. Preserved unrelated untracked Process Curtain files.
3. Updated durable project memory and handoff evidence.

## Acceptance Criteria

- [x] Browser DOM includes SWEED icon links.
- [x] Referenced icon assets return HTTP 200.
- [x] `bun run check` passes.
- [x] `bun run build` passes.
- [x] `sweed-demo.service` is active after deployment.
- [x] Local and public homepage checks return HTTP 200.
- [x] No new console errors or horizontal overflow on desktop/mobile.

## Risks

- The existing PNG is a wide wordmark rather than a dedicated square Apple icon. It is a working fallback, but a future brand-asset task should create an approved square mark if SWEED provides one.
- Unrelated untracked Process Curtain files remain unresolved and must not be accidentally included in future commits.

## Verification

- `PATH=/home/amr/.bun/bin:$PATH bun run check` — passed; 0 errors, 6 existing warnings.
- `PATH=/home/amr/.bun/bin:$PATH bun run build` — passed.
- `systemctl is-active sweed-demo.service` — active.
- `http://127.0.0.1:3010/` — HTTP 200 after readiness retry.
- `https://sweed-demo.coderaai.com/` — HTTP 200.
- Browser desktop/mobile DOM — shortcut icon, SVG icon, PNG icon, and Apple touch icon present.
- Browser desktop/mobile console — no errors.
- Browser desktop/mobile horizontal overflow — false.

## Rollback and Recovery

- Revert commit `6265594` only.
- Rebuild and restart `sweed-demo.service`.
- Keep unrelated untracked process-section files untouched.
