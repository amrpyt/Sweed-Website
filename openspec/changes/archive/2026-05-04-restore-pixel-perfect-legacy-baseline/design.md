## Context

The modular TypeScript migration reached structural completion but not pixel-perfect visual parity. The user explicitly requires 100% pixel-perfect output and prefers returning to the old code if that cannot be guaranteed.

## Goals / Non-Goals

**Goals:**
- Restore the legacy visual baseline as active rendering immediately.
- Keep the modular TypeScript work available for future gated migration.
- Add an OpenSpec rule that future activation requires visual diff gates.

**Non-Goals:**
- Do not continue visually divergent typed pages as active routes.
- Do not delete typed groundwork.
- Do not claim pixel-perfect parity without screenshot evidence.

## Decisions

- Use `site/` legacy HTML/CSS as the runtime baseline because it is the only currently proven pixel-perfect source.
- Reintroduce `LegacyPage` renderer for active public routes.
- Keep typed components inactive until visual comparisons are implemented and passed.
- Use Playwright visual comparisons (`toHaveScreenshot`) as the migration mechanism.

## Risks / Trade-offs

- [Risk] Active implementation is less modular right now -> Mitigation: pixel-perfect correctness is prioritized; typed migration continues behind visual gates.
- [Risk] Screenshot tests can be flaky -> Mitigation: fixed viewport, stable local data, and deterministic assets.

