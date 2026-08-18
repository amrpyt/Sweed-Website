# Restore Approved Button Look

ID: SWEED-045
Created: 2026-08-18
Status: completed

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

## Verification

- Regression test observed failing before the fix, then focused button/reference tests passed 15/15.
- Clean worktree `bun run check`: 134 passed, 0 failed plus spacing, mobile-first, typecheck, and lint guards.
- Clean production build completed successfully.
- Clean build ID `TZjk3K73aZ9mWKGXfKoXV` deployed with `amr:amr` ownership; `sweed-demo.service` active and public root/services/portfolio/offers returned 200.
- Agent-browser verified the approved purple primary, white secondary, pink expanding fill, 16px control radius, 3px focus outline, Arabic optical offset, zero horizontal document overflow, zero broken images, and zero browser errors on desktop and mobile.
