## Why

The current Next.js application still depends on large legacy HTML/CSS documents under `site/` for most page bodies. This preserves the old visual design, but it is not the enterprise modular TypeScript architecture requested for long-term maintenance, Sanity CMS readiness, and AI/automation feature growth.

This change converts the preserved legacy visual experience into typed React/TypeScript modules without redesigning the site.

## What Changes

- Replace legacy HTML body rendering with first-class React/TypeScript page compositions.
- Preserve the current accepted SWEED visual design, colors, spacing, RTL behavior, and page content while migrating implementation internals.
- Split repeated UI into shared components: page shell, header, mobile drawer, breadcrumb, hero blocks, cards, section layouts, forms, article lists, offer grids, FAQ groups, contact/map blocks, footer, and CTA surfaces.
- Move page content into typed data modules that can later be replaced by Sanity repositories without route/page rewrites.
- Keep AI-advisor and automation-demo surfaces as modular feature boundaries, but do not implement full Mastra behavior in this change.
- Remove active dependency on `dangerouslySetInnerHTML` legacy page bodies once equivalent typed pages are implemented and verified.
- Add visual/behavior smoke coverage so each migrated page remains route-compatible and visually stable.

## Capabilities

### New Capabilities
- `typed-page-composition`: Public pages are composed from typed React components instead of legacy HTML injection.
- `cms-ready-content-model`: Page, article, offer, service, product, FAQ, portfolio, and contact content is represented through typed content contracts ready for a future Sanity adapter.
- `visual-parity-migration`: Migrated pages preserve the accepted legacy look and behavior with route-level smoke coverage and targeted visual checks.

### Modified Capabilities
- `legacy-design-preservation`: Expand the requirement from preserving legacy HTML output to preserving the same visual experience through modular TypeScript components.
- `legacy-route-refactor`: Replace legacy renderer internals with typed route components while keeping the same public URLs and navigation behavior.

## Impact

- Affected code: `src/app/**`, `src/components/**`, `src/features/**`, `src/content/**`, `src/styles/**`, `tests/**`.
- Legacy source files under `site/` remain as reference fixtures during migration, then stop being the runtime page source.
- No breaking public URL changes.
- No Sanity or Mastra runtime integration is required in this change; only boundaries and contracts should be prepared.
