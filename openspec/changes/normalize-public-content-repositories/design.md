## Context

SWEED already moved public routes into a marketing route group, but those routes still activate through `LegacyPage`. The repo also already contains typed content contracts in `src/content/types.ts`, navigation constants in `src/content/navigation.ts`, local entity repositories in `src/lib/content/repositories.ts`, and an inactive typed-site draft in `src/features/typed-site`. The missing piece is a feature-owned public-site repository/composer layer that produces stable route-level page models before any route migration begins.

Relevant research findings:

- Next.js route groups and private folders support moving ownership out of route files without changing URLs.
- Next.js pages are Server Components by default, so page-model assembly should stay server-safe and route-thin.
- Bun test is appropriate for repository/composer behavior, while route activation remains a later browser-verification concern.

## Goals / Non-Goals

**Goals:**

- Create feature-owned public-site repository boundaries under `src/features/public-site`.
- Normalize route-level page models for about, services, articles, and shared shell data.
- Reuse existing content contracts and local entity data instead of creating a second disconnected model system.
- Add Bun coverage for repository output and page-composer assembly.

**Non-Goals:**

- No active public route migration in this child change.
- No visual redesign.
- No CMS runtime integration.
- No homepage scroll-hash runtime behavior yet.

## Source-Grounded Decisions

| Decision | Rationale | Alternatives Considered | Sources |
|---|---|---|---|
| Keep route files untouched in this child | Reduces risk by isolating content normalization from UI parity | Migrate `/about` immediately | Parent modernization research, Next.js testing guidance |
| Put page composers under `src/features/public-site` | Keeps `src/app` thin and aligns ownership with public-site behavior | Keep composers in `src/app` or `src/lib` | Next.js project structure docs, local repo state |
| Reuse `src/content/types.ts` and current local repositories as inputs | Avoids duplicate content systems and keeps migration incremental | Create new parallel model trees from scratch | Local repo state |
| Add Bun tests for repository/composer behavior now | Fast RED-first proof for pure TypeScript logic | Wait until route migration to test indirectly | Bun test docs, Next.js testing guidance |

## Reuse / Library Strategy

- Reuse `src/content/types.ts` as the base vocabulary.
- Reuse `src/content/navigation.ts` for shared navigation and contact CTA defaults.
- Reuse `src/lib/content/repositories.ts` as an input layer, but wrap it in feature-owned public-site repository helpers.
- Reuse `src/components/sections/section-blocks.tsx` only as a future rendering seed; do not couple this child to UI activation.
- Do not add a new library or CMS in this child.

## Architecture / Data Flow

This child introduces a public-site content normalization layer:

```text
src/content/public-site/*
  -> typed page-source modules for shell/about/services/articles
src/lib/content/repositories.ts
  -> existing entity repository input
src/features/public-site/repositories/*
  -> feature-owned adapters that merge local entities + page-source modules
src/features/public-site/page-composers/*
  -> route-level page models and metadata-friendly outputs
future src/app/(marketing)/* routes
  -> consume composers when route activation begins
```

Planned module boundaries:

- `src/content/public-site/*`
  - Own typed UTF-8 route-level content seeds and shared shell content.
- `src/features/public-site/repositories/*`
  - Own feature-facing repository contracts for shell, about, services, and articles.
- `src/features/public-site/page-composers/*`
  - Own route-level page models that combine repository outputs into stable contracts.
- `src/lib/content/repositories.ts`
  - Remains an implementation input for local entity records during v1.

## Production Readiness

- Security:
  - No new client bundle or secret exposure path is introduced.
- Accessibility:
  - Page models keep stable section ids and CTA metadata, which supports later accessible rendering and anchor behavior.
- Performance:
  - No route runtime expansion yet; work stays in pure server-safe modules.
- Observability:
  - Bun tests become an explicit migration gate for page-model behavior.
- Error handling:
  - Repository functions should return deterministic data shapes so route activation can later handle empty states cleanly.
- Deployment:
  - No URL or active rendering change, so rollback is trivial.
- i18n/RTL:
  - UTF-8 typed source modules prepare for Arabic-first maintenance and later locale adapters.
- Maintainability:
  - Public-site ownership moves away from route files and legacy-only helpers.

## Risks / Trade-offs

- Risk: Duplicate content can appear while migrating off legacy sources -> Mitigation: keep this child limited to normalized source modules and composers, not route activation.
- Risk: Existing typed-site draft may contain stale assumptions -> Mitigation: use it only as reference material, not as a runtime dependency.
- Risk: Developers may keep using `src/lib/content` directly in routes -> Mitigation: introduce public-site-specific repository/composer entrypoints and tests that make the preferred path obvious.

## Verification Strategy

- RED-first Bun tests for repository/composer behavior.
- `bun run unit`
- `bun run typecheck`
- `bun run lint`
- `bun run build`
- `openspec validate --all --strict`
- Change-focused verification review before route activation starts in the next child.
