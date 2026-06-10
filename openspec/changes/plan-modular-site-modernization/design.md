## Context

SWEED already completed the risky framework move from Vite to Next.js. The current problem is now narrower and more important: the public site still renders page bodies through `LegacyPage`, which reads HTML from `site/` and injects it at runtime. That keeps the visual baseline alive, but it also keeps the codebase hard to evolve.

Current repo facts that shape this design:

- Public routes under `src/app` still point to `LegacyPage`.
- `src/features/legacy-site/legacy-page.tsx` injects page `headHtml` and `bodyHtml` with `dangerouslySetInnerHTML`.
- `src/content/types.ts` and `src/components/sections/section-blocks.tsx` already provide useful typed-content and reusable-section seeds.
- `tests/smoke` already gives route-level browser proof, but `bun test` coverage is concentrated in `src/features/ai-advisor`.
- `bun run smoke` is currently red on five cases, with failures around AI advisor locator stability, mobile footer duplication, missing section-anchor proof, and hydration mismatch noise on legacy routes.
- The archived modularization design already proved that page-by-page migration is safer than a big-bang rewrite.

Research findings that matter most:

- Next.js App Router is already the correct runtime for this repo and should remain the foundation.
- Server Components should remain the default for public pages.
- Route groups and private folders are the official way to organize without changing URLs.
- Async Server Components should be verified at browser level, not only by unit tests.
- Bun is a valid package/script/test tool here, but it should not replace browser truth for route activation.

## Goals / Non-Goals

**Goals:**

- Keep Next.js App Router and Bun as the core platform.
- Replace public-site legacy body rendering with typed, modular page composition over time.
- Introduce clear ownership boundaries for routes, public-site features, content repositories, shared UI, and server-only logic.
- Make strict TDD the default execution style for future public-site migration changes.
- Preserve visual parity and maintain rollback safety during the migration.

**Non-Goals:**

- No SvelteKit rewrite.
- No visual redesign.
- No live CMS runtime integration in this planning change.
- No large backend product buildout in this planning change.
- No deletion of `site/` fixtures before typed routes prove parity.

## Source-Grounded Decisions

| Decision | Rationale | Alternatives Considered | Sources |
|---|---|---|---|
| Keep Next.js App Router instead of rewriting to SvelteKit | Repo already runs on Next.js 16 and Bun; official Next.js docs match needed routing, server rendering, and production features | SvelteKit rewrite; permanent legacy runtime | Next.js App Router docs, SvelteKit docs, local repo state |
| Use route groups for public/admin separation | Official route groups keep clean URLs while improving organization and layout ownership | Flat `app` tree only; separate app roots without grouping | Next.js project structure, Route Groups |
| Keep public pages server-first with small client islands | Official Next.js guidance defaults pages/layouts to Server Components and limits client code to interactive islands | Large `"use client"` page trees | Next.js Server and Client Components, Production guide |
| Use feature-owned page composers and repositories | Current repo already has typed content and reusable sections; page composers make migration testable and CMS-ready | Hardcoded page data in route files; direct HTML-driven page composition | Next.js project structure, local repo state, existing content contracts |
| Use Bun plus Playwright as the main migration test stack | Bun matches repo preference and existing scripts; Playwright gives user-visible proof for async routes | Add Vitest immediately for everything; rely on smoke only | Bun docs, Next.js Testing guide, Playwright best practices |
| Migrate route-by-route with fallback | Lowest regression risk and aligns with archived repo design evidence | Big-bang activation; permanent dual runtime | Archived modularization design, local repo state |
| Make OpenSpec `research` the repo default | Project rules require research-first work on non-trivial changes; config should match actual workflow | Keep `spec-driven` default and rely on manual discipline | Project AGENTS rules, current repo workflow |

## Reuse / Library Strategy

- Reuse current Next.js App Router runtime instead of changing frameworks.
- Reuse Bun for package management, scripts, and domain/repository tests.
- Reuse Playwright smoke infrastructure and extend it route-by-route.
- Reuse `src/content/types.ts` as the base contract vocabulary rather than inventing a second content-model system.
- Reuse `src/components/sections/section-blocks.tsx` as a seed for typed public-site sections.
- Reuse `src/features/ai-advisor` as a separate feature boundary instead of mixing AI behavior into public-page code.
- Reuse `site/` as visual and content fixtures during migration, but stop using it as the long-term runtime once a route is proven.
- Do not add SvelteKit, a second router, or a second major app shell.
- Do not add Vitest in the first planning wave unless a later child change proves Bun-based component/domain coverage is insufficient.

## Architecture / Data Flow

### Target ownership model

- `src/app`
  - Route entry only.
  - Owns layouts, metadata entrypoints, loading/error/not-found boundaries, and URL structure.
  - Should not own large page content constants or HTML parsing rules.
- `src/features/public-site`
  - Owns public marketing chrome, page composers, repositories, section assemblers, and route-specific view models.
  - Becomes the real home of public-site behavior.
- `src/features/ai-advisor`
  - Stays isolated for advisor UI, server helpers, and future AI integration work.
- `src/components`
  - Shared primitives only.
  - No public-site business/content ownership.
- `src/content`
  - Can remain as a compatibility path at first, but should evolve into typed public-site datasets and repository inputs rather than page-owned content blobs.
- `src/lib`
  - Shared helpers such as SEO, testing utilities, or small utilities with no feature ownership.
- Server-only code
  - Lives in feature `server/` folders, route handlers, or server action entrypoints.
  - Must not leak into client bundles.

### Target route structure

```text
src/
  app/
    (marketing)/
      layout.tsx
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
      _components/
    (admin)/
      admin/ai-debug/page.tsx
    api/
      ai/advisor/route.ts
  features/
    public-site/
      chrome/
      page-composers/
      repositories/
      mappers/
      sections/
      tests/
    ai-advisor/
      client/
      server/
      ui/
```

Notes:

- `_components` and `_lib` under route groups are allowed because Next.js private folders are non-routable.
- The route group name is internal only; URLs remain unchanged.
- The exact folder names can evolve, but ownership must not drift.

### Page composition flow

```text
route page.tsx
  -> page composer (feature-owned)
  -> repositories + local typed content
  -> mapped section view models
  -> shared/public-site sections
  -> optional client islands
```

Example flow for `/services`:

1. `src/app/(marketing)/services/page.tsx` requests metadata and page model.
2. `features/public-site/page-composers/get-services-page.ts` gathers navigation, hero, service cards, and CTA data.
3. `features/public-site/repositories/services-repository.ts` reads typed content sources.
4. Mapper helpers convert repository entities into section-friendly view models.
5. Server Components render the static page shell.
6. Client islands activate only where browser behavior is truly needed.

### Migration shape

- Keep current public routes functional through `LegacyPage` until a typed route is proven.
- Stabilize the current smoke baseline before treating route migration as a clean greenfield test lane.
- Migrate simple routes first (`/about`, `/faq`, `/contact`) to validate the folder and test model.
- Migrate collection/detail pages next so shared repository and section patterns mature.
- Migrate homepage last because it has the largest regression surface.
- Remove active page-body HTML injection only after the final public route no longer depends on it.

### TDD operating model

- Parent planning change:
  - TDD route is `skipped` because this stage is planning/config documentation, not production behavior code.
- Child implementation changes:
  - Default to TDD route `strict`.
  - For repository/mapping/composer logic:
    - RED with `bun test`.
    - GREEN with minimal implementation.
    - REFACTOR without breaking tests.
  - For async route activation and parity:
    - RED with route-level Playwright expectation or smoke case.
    - GREEN with minimal route activation.
    - Verify `bun run smoke` before removing fallback.

## Production Readiness

- Security:
  - Reduce reliance on runtime HTML body injection.
  - Keep server-only code behind explicit server boundaries.
  - Preserve and later harden CSP/header work as routes migrate.
- Accessibility:
  - Shared chrome should own semantic landmarks, keyboard navigation, focus states, and mobile drawer behavior once.
  - Migrated pages should keep meaningful heading order and CTA semantics.
- Performance:
  - Server Components by default.
  - Avoid broad `"use client"` boundaries.
  - Prefer `next/image` and Next font optimization as routes move off legacy HTML.
- Observability:
  - Use existing build/typecheck/lint/smoke gates.
  - Add route-specific verification evidence in each child change.
  - Later hardening can add bundle checks and Core Web Vitals measurement.
- Error handling:
  - Public site should converge on App Router error/loading/not-found surfaces rather than silent HTML failures.
- Deployment:
  - Every child change must remain buildable under `next build`.
  - Rollback remains simple while `LegacyPage` still exists route-by-route.
- RTL / localization:
  - Keep Arabic-first content typed and testable.
  - Preserve future path to `app/[lang]` if bilingual routing becomes necessary.
- Maintainability:
  - Route files stay thin.
  - Content and composition logic become independently testable.
  - Shared primitives stop absorbing business logic.

## Risks / Trade-offs

- Risk: Temporary duplication during migration -> Mitigation: accept short-term duplication but keep it bounded to one child change at a time and retire old path immediately after proof.
- Risk: Folder moves can create noisy diffs -> Mitigation: stage route grouping and ownership boundaries before large page rewrites.
- Risk: Bun does not mirror every official Next.js unit-test example -> Mitigation: use Bun where it already fits domain logic and rely on Playwright for async route truth.
- Risk: Existing typed-site attempt may hide stale patterns or encoding issues -> Mitigation: reuse the good contracts and section ideas, but do not activate that path blindly.
- Risk: Developers may slip logic back into route files -> Mitigation: specs and review rules should require thin routes and testable page-composer modules.
- Risk: Legacy fallback can linger forever -> Mitigation: child changes must include activation criteria and explicit retirement tasks.

## Verification Strategy

- Planning artifact verification:
  - `openspec validate plan-modular-site-modernization --type change --strict`
  - `openspec status --change "plan-modular-site-modernization"`
- Repo baseline verification before implementation child changes:
  - `bun run typecheck`
  - `bun run lint`
  - `bun run unit`
  - `bun run build`
  - `bun run smoke`
- Baseline repair expectation:
  - The first child change must either fix or explicitly quarantine the currently failing smoke cases before new public-route migrations stack on top of them.
- Child change implementation verification:
  - RED proof with failing Bun or Playwright test before production edits.
  - GREEN proof with the smallest passing implementation.
  - Full gate rerun on the affected route or repository slice.
- Browser/runtime proof:
  - Verify migrated public routes in Playwright on desktop and mobile projects.
  - Prefer user-visible assertions, not implementation-detail selectors.
- Rollback proof:
  - Until final retirement, each migrated route must be able to return to the legacy path without changing visitor URLs.
