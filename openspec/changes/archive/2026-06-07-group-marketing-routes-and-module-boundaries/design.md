## Context

SWEED now has a green smoke baseline after archiving `stabilize-public-site-test-foundation`, but public routes still live directly under `src/app` and each page file manually wires `LegacyPage`. Parent research and current official Next.js docs both say route groups and server-only boundaries are the correct next step before typed page migration.

## Goals / Non-Goals

**Goals:**

- Move public pages into a dedicated `(marketing)` route group without changing URLs.
- Keep `src/app` public route files thin and move route ownership into feature modules.
- Protect filesystem-backed route helpers with `server-only`.
- Keep build and smoke as the acceptance truth for the structure move.

**Non-Goals:**

- Rebuild public pages into typed sections.
- Change content, layout, or CTA behavior.
- Move admin, API, or debug routes into the marketing group.
- Introduce a CMS or data repository migration in this child.

## Source-Grounded Decisions

| Decision | Rationale | Alternatives Considered | Sources |
|---|---|---|---|
| Use `src/app/(marketing)` for public pages | Native Next.js organization without URL changes | Keep public pages at top-level `src/app`; multiple mixed groups | Next.js project structure docs |
| Keep public page files as thin re-exports | Makes route entrypoints stable while feature ownership moves elsewhere | Keep repeated inline wrappers in every page file | Next.js project structure docs, local repo evidence |
| Add `server-only` to filesystem-backed route helpers | Prevents accidental client imports with build-time protection | Rely on convention only | Next.js Server and Client Components docs |
| Keep `LegacyPage` active during this child | Isolates architecture move from content rewrite risk | Combine route grouping with typed page migration | Parent roadmap, local repo state |
| Use Bun unit tests plus build/smoke proof | Structural move needs fast RED/ GREEN signal and real browser verification | Typecheck-only or smoke-only verification | Next.js testing docs, Playwright docs |

## Reuse / Library Strategy

- Reuse Next.js native route groups instead of inventing custom URL mapping.
- Reuse existing `server-only` dependency already present in `package.json`.
- Reuse the current `LegacyPage` and `getLegacyMetadata` flow instead of rewriting page content in this child.
- Reuse existing smoke tests as regression truth after the route move.

## Architecture / Data Flow

1. Public route entry files move from `src/app/*` to `src/app/(marketing)/*`.
2. Each public route entry file becomes a thin re-export of a feature-owned route module.
3. Feature-owned route modules live under `src/features/public-site/routes`.
4. Shared route factory logic lives in one server-only helper under that feature folder.
5. The route helper reuses `LegacyPage` and `getLegacyMetadata`.
6. `legacy-html.ts` gains a `server-only` guard because it reads files from `site/`.

Planned ownership split:

- `src/app/(marketing)/**/page.tsx`: route entrypoints only
- `src/features/public-site/routes/**`: route metadata + route composition ownership
- `src/features/legacy-site/**`: existing legacy runtime and shared chrome
- `src/app/admin/**` and `src/app/api/**`: stay outside marketing boundary

## Production Readiness

- Security: `server-only` reduces accidental client imports of filesystem-backed helpers.
- Accessibility: no intended visitor-visible markup change; smoke remains active for public navigation and advisor flows.
- Performance: neutral runtime behavior because route logic still resolves through existing server-first `LegacyPage`.
- Error handling: existing `src/app/error.tsx`, `src/app/not-found.tsx`, and route handlers remain untouched.
- Deployment: low-risk file-structure move backed by build and smoke proof.
- Rollback: revert the route move and feature route modules; no content migration coupling.
- Maintainability: future typed page changes can replace individual feature route modules without rewriting route entry files again.

## Risks / Trade-offs

- Risk: duplicate public paths during route-group move -> Mitigation: move source files atomically and remove old root public pages in the same patch.
- Risk: thin re-export files still feel repetitive -> Mitigation: accept tiny entrypoints now because they preserve clear App Router ownership and keep bigger logic out of `src/app`.
- Risk: structure tests become too implementation-specific -> Mitigation: keep the RED test focused on route placement and thin ownership, then rely on build/smoke for behavior truth.
- Risk: future contributors bypass feature-owned route modules -> Mitigation: add a simple route registry/factory pattern and keep the structure test in place.

## Verification Strategy

- Run the new RED-first Bun test for public route boundaries.
- Run `bun run unit`.
- Run `bun run typecheck`.
- Run `bun run lint`.
- Run `bun run build`.
- Run `bun run smoke`.
- Run `openspec validate --all --strict`.
- Run the equivalent `/opsx:verify` review against this child's artifacts, code, and verification evidence before archive.
