## Context

The app currently runs on Next.js App Router with Bun and route-level smoke tests. The public pages preserve the accepted legacy SWEED design by parsing and rendering HTML from `site/`, with shared React chrome for header, mobile drawer, and breadcrumbs.

The requested target is stricter: all public page bodies should become modular, typed React/TypeScript components while preserving the accepted visual result. The legacy `site/` files are now reference fixtures, not the desired runtime architecture.

Current constraints:
- Do not use `v2/` or `v3/` as design sources.
- Do not redesign the website.
- Keep clean public URLs.
- Keep Bun scripts and Next.js latest App Router patterns.
- Prepare content boundaries for future Sanity CMS, but do not add Sanity runtime in this change.
- Keep future Mastra/AI surfaces as feature boundaries only.

## Goals / Non-Goals

**Goals:**
- Convert every active public route from legacy HTML body rendering to typed React/TypeScript page composition.
- Extract shared UI primitives and section components from repeated legacy patterns.
- Move content into typed local content repositories that can later be backed by Sanity.
- Keep visual parity through page-by-page smoke and targeted visual checks.
- Remove active dependence on `dangerouslySetInnerHTML` for page bodies after migration.

**Non-Goals:**
- No new visual redesign.
- No Sanity CMS runtime integration.
- No Mastra implementation beyond keeping AI/automation feature boundaries compatible.
- No backend/API buildout.
- No cleanup of unrelated dirty worktree files.

## Decisions

### Decision: Migrate page-by-page, not big-bang

Convert one route group at a time and keep the current legacy renderer available as a fallback/reference until the final route is migrated.

Rationale:
- The legacy HTML is large and inconsistent across pages.
- Page-by-page migration gives a clear rollback: point the route back to `LegacyPage`.
- Visual regressions are easier to isolate.

Alternatives considered:
- Big-bang conversion: faster on paper, but high risk for visual regressions.
- Keep HTML renderer permanently: preserves visuals, but fails the modular TypeScript goal.

### Decision: Server Components by default

Static marketing sections should be Server Components. Client Components are reserved for mobile drawer, accordions, filters, forms, AI widget, and browser-only interactions.

Rationale:
- Matches current Next.js App Router guidance.
- Reduces client bundle size.
- Keeps static marketing pages fast and easier to test.

Alternatives considered:
- Mark entire page trees `"use client"`: simpler during conversion, but worse performance and weaker architecture.

### Decision: Typed content first, component extraction second

For each page, extract content records and section models before writing JSX.

Rationale:
- This makes future Sanity migration a repository swap, not a page rewrite.
- It keeps components reusable and testable.

Alternatives considered:
- Hardcode all text inside components: faster initially, but not CMS-ready.

### Decision: CSS Modules plus shared tokens

Use existing `src/styles/tokens.css` and component-scoped CSS Modules for migrated sections. Avoid global legacy CSS except during migration compatibility.

Rationale:
- CSS Modules keep styles bounded.
- Tokens preserve SWEED colors and spacing consistently.
- It prevents page CSS from leaking into shared components.

Alternatives considered:
- Tailwind migration: useful for a new app, but unnecessary churn for strict visual parity.
- One giant global CSS file: close to the current problem.

### Decision: Keep legacy files as fixtures until parity is proven

Do not delete `site/` during the migration. Use it as a visual/content reference and test fixture. Remove active runtime reliance only after all routes are migrated.

Rationale:
- The old files are the accepted visual truth.
- They help compare content and behavior while converting.

## Proposed Structure

```text
src/
  app/
    page.tsx
    about/page.tsx
    services/page.tsx
    services/[slug]/page.tsx
    offers/page.tsx
    products/page.tsx
    portfolio/page.tsx
    articles/page.tsx
    articles/[slug]/page.tsx
    faq/page.tsx
    contact/page.tsx
  components/
    layout/
    ui/
    sections/
  content/
    repositories/
    schemas/
    pages/
  features/
    ai-advisor/
    marketing/
    legacy-site/
  styles/
    tokens.css
```

## Migration Plan

1. Create typed content contracts and local repository helpers.
2. Create shared layout/chrome components that preserve the accepted header, drawer, breadcrumbs, footer, and CTA behavior.
3. Migrate low-risk pages first: `/contact`, `/faq`, `/about`.
4. Migrate listing/grid pages: `/services`, `/offers`, `/products`, `/portfolio`, `/articles`.
5. Migrate detail pages: `/services/[slug]`, `/articles/[slug]`.
6. Migrate `/` last because it has the largest visual surface.
7. Remove `LegacyPage` usage from active routes.
8. Keep `site/` as reference fixtures unless a later cleanup change removes them.

## Verification Strategy

- `bun run typecheck`
- `bun run lint`
- `bun run build`
- `bun run smoke`
- Add route-specific smoke assertions for each migrated page.
- Add mobile drawer tests for fixed positioning, clickability, and polished styling.
- Add console check for known CSP/preload issues on `/contact`.

## Risks / Trade-offs

- [Risk] Visual parity drift while converting large legacy pages → Mitigation: migrate one route at a time and add route-specific assertions before moving on.
- [Risk] Content duplication during migration → Mitigation: extract typed content records before JSX composition.
- [Risk] Over-clienting the app → Mitigation: Server Components by default; isolate `"use client"` only where needed.
- [Risk] CSS leakage from legacy styles → Mitigation: CSS Modules for migrated components and staged removal of legacy runtime CSS.
- [Risk] Future Sanity shape mismatch → Mitigation: use repository interfaces and stable content contracts now.

## Open Questions

- Should `site/` remain permanently as visual fixtures after full migration, or be archived in a later cleanup?
- Should visual screenshot diffing be added as a separate test gate after the component migration reaches parity?
