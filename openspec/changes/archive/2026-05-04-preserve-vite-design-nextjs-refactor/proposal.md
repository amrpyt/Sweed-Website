## Why

The Next.js rebuild changed the visual design, but the intended scope is to preserve the existing Vite/static website exactly while improving the infrastructure and component boundaries. This change corrects the scope: `site/` is the only visual/content source of truth, and `v2/` plus `v3/` are ignored.

## What Changes

- **BREAKING**: Replace the redesigned Next.js page UI with a faithful rendering of the existing `site/` HTML pages.
- Keep the current old-site colors, typography, layout, spacing, sections, and visual behavior.
- Use Next.js routes and shared components/utilities to render legacy pages without changing their appearance.
- Map old `.html` links to clean Next.js routes where possible.
- Keep Bun as the package manager and Next.js App Router as the runtime.

## Capabilities

### New Capabilities

- `legacy-design-preservation`: The Next.js app renders the existing `site/` pages with the same appearance and behavior as the old Vite/static website.
- `legacy-route-refactor`: Old static HTML routes are exposed as clean Next.js routes while preserving old navigation intent.

### Modified Capabilities

- None. This correction is a new OpenSpec change on top of the previous rebuild work.

## Impact

- Affected runtime code: `src/app/**`, `src/features/legacy-site/**`, route metadata, and smoke tests.
- Source of truth: `site/index.html` and `site/pages/*.html` only.
- Explicitly ignored: `v2/` and `v3/`.
- The AI/Sanity future architecture can remain as later infrastructure, but it must not alter the old design in this correction.
