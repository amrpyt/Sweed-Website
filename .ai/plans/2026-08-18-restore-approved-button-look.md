# Restore Approved Button Look

ID: SWEED-045
Created: 2026-08-18
Status: active

## Goal

Restore the approved pre-v4 button appearance while preserving the shared hero-style fill mechanism, optical Arabic centering, accessibility states, and site-wide component reuse.

## Root Cause

- Commit `999fd13` at 2026-08-18T18:49:07+03:00 changed the canonical `BrandActionButton` from purple primary / white secondary to pink primary / transparent secondary and reduced its prior shadows.
- The current uncommitted `reference-button-theme.ts` then propagated the same newer palette into reference-page CTAs.
- The shared interaction mechanism itself is not the regression and should remain.

## Scope

- Restore the canonical button visual values from immediately before `999fd13`.
- Restore reference-page button-theme visual values to the committed purple/white baseline.
- Add a regression assertion for the approved primary/secondary hierarchy.
- Preserve unrelated SWEED-042/SWEED-044 dirty work.

## Verification

- Observe the focused button/reference test fail before the fix.
- Re-run focused tests after the fix.
- Run `bun run check` and `bun run build`.
- Deploy safely and verify the public demo.
- Use managed `agent-browser` on desktop and mobile, including hover/focus and overflow/error checks.

## Rollback

Revert only the SWEED-045 commit; do not revert the site-wide button mechanism commits.
