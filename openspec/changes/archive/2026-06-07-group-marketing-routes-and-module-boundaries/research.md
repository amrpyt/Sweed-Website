# Research Brief

## Scope

Research the safest way to group SWEED's public App Router pages under a dedicated marketing route boundary, keep visitor URLs unchanged, and move public-route ownership out of `src/app` into modular feature files before any typed page migration begins.

## Research Questions

- How should Next.js App Router route groups and private folders be used for public-site organization?
- What is the best boundary between `src/app` route entry files and feature-owned route composition?
- How should server-only helpers be protected so filesystem and secret-aware code cannot leak into Client Components?
- What is the right TDD proof for an architecture-first route move that should not change URLs?

## Sources Reviewed

| Source | Type | URL | Used For | Confidence |
|---|---|---|---|---|
| Next.js Project Structure (accessed 2026-06-07) | Official docs | https://nextjs.org/docs/app/getting-started/project-structure | Route groups, private folders, colocation, thin routing organization | High |
| Next.js Server and Client Components (accessed 2026-06-07) | Official docs | https://nextjs.org/docs/app/getting-started/server-and-client-components | Server-first defaults and `server-only` boundary guidance | High |
| Next.js Testing guide (accessed 2026-06-07) | Official docs | https://nextjs.org/docs/app/guides/testing | E2E-first proof for async Server Component route behavior | High |
| Playwright Locators (accessed 2026-06-07) | Official docs | https://playwright.dev/docs/locators | User-facing browser assertions for representative route verification | High |
| Vercel Commerce repository (accessed 2026-06-07) | GitHub | https://github.com/vercel/commerce | Real App Router example with thin route ownership and separated modules | High |
| SWEED local repo inspection (accessed 2026-06-07) | Repository evidence | Local files under `src/app`, `src/features/legacy-site`, and `tests/smoke` | Current duplication, current legacy boundary, current smoke proof | High |

## Official Documentation Findings

- Next.js route groups like `app/(marketing)` organize routes without changing URL paths. This is the official fit for separating marketing pages from admin/debug routes.
- Next.js private folders like `_lib` and `_components` are safe for non-routable implementation details when code is colocated near routes.
- Pages and layouts are Server Components by default. This supports keeping public page composition server-first while leaving only small interactive islands as Client Components.
- Next.js explicitly recommends `server-only` for modules that should never be imported into Client Components, giving build-time protection against environment poisoning.
- Next.js testing guidance treats different layers differently, and async Server Component route changes still need browser or E2E proof instead of unit-only confidence.
- Playwright recommends resilient user-facing locators and web-first assertions, which matches representative public-route verification after the route move.

## GitHub / Ecosystem Evidence

- Vercel Commerce keeps route files under `app` but pushes reusable ownership into shared modules and utilities instead of letting route files grow into feature owners.
- SWEED currently has public routes directly under `src/app` with repeated wrappers like `src/app/about/page.tsx`, `src/app/services/page.tsx`, and `src/app/contact/page.tsx` that each manually wire `LegacyPage`.
- SWEED already has `server-only` in `package.json`, so server-only protection can be added immediately without introducing a new dependency decision.
- The archived child change `2026-06-07-stabilize-public-site-test-foundation` already restored a green smoke baseline, so this structural move can now rely on smoke as a real regression gate.

## Reuse-First Options

| Option | Source | Fit | Tradeoffs | Decision |
|---|---|---|---|---|
| Next.js `(marketing)` route group | Next.js project structure docs | Native fit for public/admin split without URL changes | Requires moving route files carefully to avoid duplicate paths | Use |
| Next.js private folders for route-local helpers | Next.js project structure docs | Good fit if route-local helpers are needed later | Not required for the first boundary move if feature modules live under `src/features` | Investigate later |
| `server-only` package already in repo | Next.js Server/Client docs, local `package.json` | Strong fit for filesystem-backed loaders and server-only route helpers | Protects boundaries but does not replace tests | Use |
| Existing `LegacyPage` runtime | Local repo | Best short-term reuse while modular boundaries are introduced | Does not solve typed-content migration by itself | Use for this child only |
| Full typed page migration now | Parent roadmap | Too broad for this child | Mixes architecture move with content rewrite risk | Reject |

## Capability Map And Change Decomposition

| Capability | Suggested Change Name | Depends On | Why Separate | Verification Target |
|---|---|---|---|---|
| Public route grouping | `group-marketing-routes-and-module-boundaries` | `stabilize-public-site-test-foundation` | Move public routes into a clean App Router section without mixing content migration | Bun structure test, build, smoke |
| Feature-owned route composition | `group-marketing-routes-and-module-boundaries` | Public route grouping | Make `src/app` thin before typed page work begins | Bun structure test, typecheck |
| Typed content repositories | `normalize-public-content-repositories` | This change | Separate data modeling from route/file movement | Bun repository tests |

## Recommended Execution Order

1. Add failing structure-oriented tests for route grouping and thin route ownership.
2. Introduce feature-owned public route modules and move public routes into `src/app/(marketing)`.
3. Add `server-only` guards to filesystem-backed public route helpers.
4. Prove unchanged URLs and representative routes with build and smoke checks.

## Best Practices

- Keep `src/app` route files as entrypoints, not feature owners.
- Use one public route group for marketing pages and keep admin/debug/API routes outside it.
- Keep server-first composition by default and protect server-only modules explicitly.
- Reuse the current `LegacyPage` renderer during structural migration instead of coupling this child to typed content work.
- Use a small testable route registry or route helper so future page migration can replace internals without rewriting app entry files again.

## Common Pitfalls And Mitigations

| Pitfall | Why It Matters | Mitigation | Source |
|---|---|---|---|
| Duplicate route paths during move | Build/runtime conflict | Move each public page from root `src/app` into `(marketing)` in the same slice | Next.js route groups docs |
| Letting route files keep composition logic | Weak modularity and repeated wrappers | Re-export feature-owned route modules from route entry files | Next.js project structure docs, local repo evidence |
| Importing filesystem helpers into client code later | Secret and environment poisoning risk | Add `import "server-only"` to filesystem-backed helpers and server-only route modules | Next.js Server/Client docs |
| Claiming success from typecheck alone | URLs could still break after file moves | Keep build and smoke as hard acceptance gates | Next.js testing docs, Playwright docs |

## Production Readiness Checklist

- [x] Security concerns identified
- [x] Accessibility concerns identified
- [x] Performance concerns identified
- [x] Error/loading/empty states identified
- [x] i18n/RTL concerns identified
- [x] Deployment/rollback concerns identified
- [x] Testing strategy identified

## Recommended Direction

- Use a single `src/app/(marketing)` route group for public pages.
- Move public route ownership into feature modules under `src/features/public-site/routes`.
- Keep route files as thin re-export entrypoints.
- Add `server-only` guards to filesystem-backed loaders and route-only server modules.
- Verify the architecture move with one RED-first Bun structure test, then build and smoke proof.

## Open Questions

- None for this child. The route grouping move is safe to begin from repo and doc evidence already available.
