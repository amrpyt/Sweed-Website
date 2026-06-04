## Why

The legacy SWEED pages use different top bars, headers, logos, navigation, breadcrumbs, and footers across routes. This makes the website feel inconsistent even when each individual page looks acceptable.

## What Changes

- Keep legacy page body designs as the active visual source.
- Centralize shared public-site chrome into one source of truth: top bar, header, logo, mobile drawer, breadcrumb fallback, footer, and floating contact surfaces.
- Strip duplicated legacy chrome from each legacy page body before rendering.
- Add tests that verify shared chrome appears consistently across public routes.

## Capabilities

### New Capabilities
- `public-site-chrome-consistency`: Shared public-site chrome is consistent across all active routes.

### Modified Capabilities
- `pixel-perfect-legacy-baseline`: Page-specific legacy body content remains the visual baseline, but shared chrome is normalized through shared React components.

## Impact

- Affected code: `src/features/legacy-site/**`, `tests/smoke/**`, `openspec/changes/**`.
- No public URL changes.
- No full page redesign.
