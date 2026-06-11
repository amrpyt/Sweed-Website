## Why

The public site is still routed from the top level of `src/app` with repeated page wrappers, which makes future migration harder and leaves route ownership mixed with admin and API surfaces. Research shows Next.js route groups and server-only boundaries are the cleanest native way to fix this without changing visitor URLs.

## What Changes

Create a dedicated `(marketing)` route group for public pages, move public page composition into feature-owned route modules, and protect filesystem-backed route helpers with server-only boundaries. Keep the current `LegacyPage` runtime for now so this child stays structural, not visual.

## Capabilities

### New Capabilities

- `public-route-module-boundaries`: Define feature-owned public route modules that app entry files can re-export.

### Modified Capabilities

- `nextjs-enterprise-platform`: Refine modular App Router organization to require a marketing route group and server-only route boundaries.
- `legacy-route-refactor`: Refine shared legacy route rendering so app route files stay thin and reuse feature-owned route modules.

## Research Basis

- Next.js official docs support route groups for organization without URL changes and private folders for non-routable internals.
- Next.js official docs say pages are Server Components by default and recommend `server-only` to protect server-only modules from accidental client imports.
- Next.js testing guidance plus Playwright guidance confirm that this kind of route move needs build and browser proof, not only unit checks.
- Local repo evidence shows public routes are still repeated top-level wrappers and `server-only` is already available in the dependency set.

## Out of Scope

- Replacing `LegacyPage` with typed content composition.
- Changing public URLs, metadata semantics, or visual layout.
- Refactoring admin, API, or AI advisor backend behavior.
- CMS integration or bilingual routing work.

## Assumptions

- Current green smoke baseline from the archived stabilization child remains the acceptance gate for this change.
- Re-export-based route entry files are acceptable in this Next.js repo because the behavior stays server-first and build-backed.
- `src/features/public-site` is the right ownership area for new public route modules because typed page migration will build on it later.

## Impact

- Affected code: `src/app/**`, new `src/features/public-site/routes/**`, and server-only route helpers.
- Security: stronger server/client boundary around filesystem-backed route helpers.
- Performance: neutral or slightly better maintainability; no intentional runtime behavior change.
- Accessibility: unchanged visitor behavior, but smoke verification remains in place.
- Localization/RTL: unchanged output because `LegacyPage` remains active.
- Deployment: low risk because URLs stay the same and build/smoke remain hard gates.
