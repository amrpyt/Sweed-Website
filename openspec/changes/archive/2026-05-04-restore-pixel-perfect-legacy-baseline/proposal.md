## Why

The current typed component migration is not pixel-perfect against the accepted legacy SWEED pages. Pixel-perfect visual fidelity is now the highest priority; if componentization cannot preserve it, active rendering must return to the legacy implementation until visual parity gates exist.

## What Changes

- Restore the accepted `site/` HTML/CSS rendering as the active public-site baseline.
- Keep the typed component work as inactive migration groundwork, not as the active visual source.
- Reintroduce the legacy renderer only as the pixel-perfect runtime baseline.
- Add a strict visual-parity migration rule: future component conversion must be page/component-by-component and screenshot-diff gated.
- Keep Next.js, Bun, clean routes, shared header fixes, and current functional smoke coverage.

## Capabilities

### New Capabilities
- `pixel-perfect-legacy-baseline`: Active public pages render from the accepted legacy visual source until component parity is proven.
- `visual-diff-migration-gate`: Future typed component migration requires Playwright screenshot comparisons against legacy baselines.

### Modified Capabilities
- `typed-page-composition`: Typed composition is no longer allowed to replace active public rendering unless it passes pixel-perfect visual parity gates.

## Impact

- Affected code: `src/app/**`, `src/features/legacy-site/**`, `tests/**`, `openspec/changes/**`.
- Public URLs remain unchanged.
- The website becomes visually safe immediately.
- Full TypeScript componentization becomes a gated migration path, not a blind rewrite.
