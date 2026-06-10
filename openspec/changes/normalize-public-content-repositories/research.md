# Research Brief

## Scope

Research the safest way to normalize feature-owned public-site content repositories and page-composer boundaries so SWEED can migrate public routes off `LegacyPage` without mixing content logic into route files or reintroducing raw HTML dependence.

## Research Questions

- What is the correct ownership boundary between `src/app`, `src/features/public-site`, and shared content modules for a large Next.js marketing site?
- How should typed page models be shaped so simple routes like about/contact/faq and richer routes like services/articles can share stable contracts?
- Which existing repo assets should be reused instead of creating a second parallel content system?
- What test split is appropriate for repository and page-composer logic before any public route activation changes?

## Sources Reviewed

| Source | Type | URL | Used For | Confidence |
|---|---|---|---|---|
| Next.js Project Structure (accessed 2026-06-09) | Official docs | https://nextjs.org/docs/app/getting-started/project-structure | Feature ownership, route groups, private folders, colocation rules | High |
| Next.js Server and Client Components (accessed 2026-06-09) | Official docs | https://nextjs.org/docs/app/getting-started/server-and-client-components | Server-first page composition and client-island boundaries | High |
| Next.js Testing guide (accessed 2026-06-09) | Official docs | https://nextjs.org/docs/app/guides/testing | Test split for route behavior vs unit-safe domain logic | High |
| Bun test docs (accessed 2026-06-09) | Official docs | https://bun.sh/docs/test | Fast TypeScript test runner support for repository/composer behavior | High |
| SWEED parent modernization research | Repository evidence | D:\Busniss\SWEED-Website\openspec\changes\plan-modular-site-modernization\research.md | Existing source-backed migration direction and child-change order | High |
| SWEED repo inspection (accessed 2026-06-09) | Repository evidence | D:\Busniss\SWEED-Website\src | Existing content contracts, legacy runtime, typed-site draft, and route ownership | High |

## Official Documentation Findings

- Next.js supports route groups like `(marketing)` and private folders like `_components` and `_lib` to organize large apps without changing public URLs. That supports keeping `src/app` thin while moving actual public-site ownership into feature modules.
- Next.js pages and layouts are Server Components by default. Client Components should be introduced only for interactivity, browser APIs, or lifecycle logic. Pure content repositories and page composers should therefore remain server-safe or environment-neutral modules.
- Next.js testing guidance separates test types by behavior. Repository and page-composer assembly logic fit fast unit/domain tests, while eventual route activation off `LegacyPage` still needs browser proof before rollout.
- Bun test supports direct TypeScript execution and is a good fit for repository and page-model checks already covered by the project's `bun run unit` workflow.

## GitHub / Ecosystem Evidence

- SWEED already has useful typed contracts in `src/content/types.ts`, plus navigation constants in `src/content/navigation.ts`.
- SWEED already has entity repositories in `src/lib/content/repositories.ts`, but they are not owned under `src/features/public-site` and they do not expose route-level page models.
- SWEED already has a draft typed-page attempt in `src/features/typed-site`, but it is not active and should be treated as seed material, not as a drop-in runtime.
- SWEED active public routes still resolve through `src/features/public-site/routes/index.tsx` to `LegacyPage`, so this child change should stop at normalized content/page-model boundaries and avoid route activation.

## Reuse-First Options

| Option | Source | Fit | Tradeoffs | Decision |
|---|---|---|---|---|
| Reuse `src/content/types.ts` as the base vocabulary | Local repo | Keeps existing contracts and avoids duplicate model systems | Some route-level models still need extension | Use |
| Reuse `src/content/navigation.ts` and `src/lib/content/repositories.ts` as seed inputs | Local repo | Fastest path to normalized feature-owned repositories | Current ownership location is not ideal | Use |
| Reuse `src/features/typed-site` directly as runtime | Local repo | Contains useful content ideas | Not active, includes stale structure risk, and should not be activated blindly | Reject |
| Add a CMS now | Parent research, local repo | Possible future path | Wrong timing for this child; adds runtime/integration complexity before route migration proof | Reject |

## Capability Map And Change Decomposition

| Capability | Suggested Change Name | Depends On | Why Separate | Verification Target |
|---|---|---|---|---|
| Feature-owned page-model boundaries | normalize-public-content-repositories | group-marketing-routes-and-module-boundaries | Needed before route migration so pages stop owning content assembly | Bun tests, typecheck, build |
| First simple route activation | migrate-simple-public-pages-to-typed-composition | normalize-public-content-repositories | Route activation risk is higher than repository normalization | Route-level Playwright parity |

## Recommended Execution Order

1. Normalize shared shell/page-model repository boundaries under `src/features/public-site`.
2. Add RED-first Bun coverage for repository output and page-composer assembly.
3. Keep active routes on `LegacyPage` in this child.
4. Use the normalized boundaries in the next child when migrating `/about`, `/faq`, and `/contact`.

## Best Practices

- Keep `src/app` route files as thin entrypoints only.
- Keep public-site content assembly in feature-owned repositories and page composers, not inside route files.
- Keep page models typed and UTF-8 source backed.
- Reuse entity repositories and navigation constants rather than creating a second unrelated data layer.
- Add route-independent Bun tests before browser-level route activation work.

## Common Pitfalls And Mitigations

| Pitfall | Why It Matters | Mitigation | Source |
|---|---|---|---|
| Mixing content assembly into route files | Makes later route migrations noisy and hard to test | Move route-level model assembly into feature-owned composers | Next.js Project Structure, local repo |
| Creating a second disconnected content model tree | Increases maintenance cost and confusion | Extend existing `src/content` contracts and repository inputs | Local repo |
| Activating typed routes before repository boundaries stabilize | Couples content normalization with UI parity risk | Keep active routes on `LegacyPage` in this child | Parent modernization research |
| Relying only on browser smoke for pure data logic | Slower feedback and weaker RED-first proof | Add Bun tests for repositories and composers first | Next.js Testing, Bun test docs |

## Production Readiness Checklist

- [x] Security concerns identified
- [x] Accessibility concerns identified
- [x] Performance concerns identified
- [x] Error/loading/empty states identified
- [x] i18n/RTL concerns identified
- [x] Deployment/rollback concerns identified
- [x] Testing strategy identified

## Recommended Direction

- Build feature-owned public-site repositories and page-composer helpers under `src/features/public-site`.
- Reuse current content contracts and entity repositories as inputs, but stop treating `src/lib/content` as the long-term public-site ownership boundary.
- Add Bun tests for repository/composer behavior now, and postpone route activation to the next child change.

## Open Questions

- Should the future localized content split stay under `src/content/public-site/<locale>` or move directly to a repository adapter interface when bilingual routing begins?
