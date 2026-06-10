## Why

SWEED already has typed content seeds, but active public routes still do not consume feature-owned page models. Before any route leaves `LegacyPage`, the repo needs a clean public-site repository and page-composer layer that is easy to test, reuse, and swap later.

## What Changes

- Normalize route-level page-model assembly under `src/features/public-site`.
- Reuse existing typed content contracts, navigation data, and entity repositories as inputs instead of creating a parallel content system.
- Add Bun coverage for repository output, metadata readiness, and page-model assembly before any route activation work.
- Keep active public routes on `LegacyPage` during this child change.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `nextjs-enterprise-platform`: Public-site page-model ownership moves fully into feature-owned repository/composer modules instead of route files or legacy-only helpers.
- `cms-ready-content`: Typed content contracts are extended to include route-level page models and locale-ready public-page source modules.
- `quality-production-readiness`: Public-site repository and page-composer behavior gains RED-first Bun verification as a migration gate.

## Research Basis

- Next.js route-group and colocation guidance supports keeping route files thin while moving implementation ownership into feature modules.
- Next.js Server Component guidance supports server-first page composition with small client islands, which makes repository/page-composer normalization the right next step.
- Bun test is already part of the SWEED workflow and is a good fit for fast typed repository/page-model checks.
- Local repo evidence shows reusable contracts already exist in `src/content` and `src/lib/content`, so the change should extend and relocate ownership rather than invent a second model stack.

## Out of Scope

- Migrating any active public route away from `LegacyPage`.
- Visual redesign of public pages.
- CMS runtime integration.
- Homepage section URL synchronization behavior.

## Assumptions

- The existing local-content records remain the v1 source of truth for migrated routes until a later CMS adapter exists.
- Route migration will happen in a later child change once repository and page-model contracts are proven.
- Existing typed-site draft files are safe only as reference material, not as direct runtime dependencies.

## Impact

- Affected code: `src/features/public-site/**`, `src/content/**`, existing repository helpers, and new Bun tests.
- No public URL or active rendering-path change in this child.
- Security/performance risk stays low because the change is repository/composer focused and does not activate new client runtime code.
- This child improves future localization, metadata, and rollback safety by standardizing route-level page models before route activation.
