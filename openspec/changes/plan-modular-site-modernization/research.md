# Research Brief

## Scope

Research the safest and most maintainable path to turn SWEED's current public site from legacy HTML body rendering into a modular, typed, professional Next.js codebase without breaking the accepted visual baseline.

This research must answer four decisions before implementation:

- Should the project stay on Next.js or be rewritten to SvelteKit?
- How should the codebase be organized so routes, features, content, and backend logic stay modular?
- How should Bun fit into a professional workflow?
- What TDD strategy gives real proof while matching current Next.js and Playwright guidance?

## Research Questions

- Should SWEED keep the current Next.js App Router foundation or rewrite to SvelteKit?
- What folder and ownership model fits a marketing-heavy website with future backend and CMS growth?
- How should Bun be used without fighting Next.js testing guidance?
- What is the right TDD split between unit, integration, and browser-level checks for this project?
- How should this large modernization be decomposed into small child changes with rollback safety?

## Sources Reviewed

| Source | Type | URL | Used For | Confidence |
|---|---|---|---|---|
| Next.js App Router docs (accessed 2026-06-07) | Official docs | https://nextjs.org/docs/app | Confirm current router direction and React feature model | High |
| Next.js Project Structure (accessed 2026-06-07) | Official docs | https://nextjs.org/docs/app/getting-started/project-structure | Folder strategy, colocation, private folders, route groups | High |
| Next.js Server and Client Components (accessed 2026-06-07) | Official docs | https://nextjs.org/docs/app/getting-started/server-and-client-components | Server-first rendering guidance and client boundary rules | High |
| Next.js Testing guide (accessed 2026-06-07) | Official docs | https://nextjs.org/docs/app/guides/testing | Test type guidance and async Server Component advice | High |
| Next.js Production guide (accessed 2026-06-07) | Official docs | https://nextjs.org/docs/app/guides/production-checklist | Production-readiness checklist for routing, errors, SEO, security, performance | High |
| Next.js Internationalization guide (accessed 2026-06-07) | Official docs | https://nextjs.org/docs/app/guides/internationalization | Locale routing and server-side translation loading for Arabic readiness | High |
| Next.js Route Groups reference (accessed 2026-06-07) | Official docs | https://nextjs.org/docs/app/api-reference/file-conventions/route-groups | Clean URL organization and layout segmentation caveats | High |
| Bun docs overview (accessed 2026-06-07) | Official docs | https://bun.sh/docs | Bun as package manager, script runner, and existing Node.js workflow fit | High |
| Bun test runner docs (accessed 2026-06-07) | Official docs | https://bun.sh/docs/test | Bun test capabilities, mocks, CI, and test execution model | High |
| Bun mocks docs (accessed 2026-06-07) | Official docs | https://bun.sh/docs/test/mocks | Mock and spy support for strict TDD | High |
| Playwright best practices (accessed 2026-06-07) | Official docs | https://playwright.dev/docs/best-practices | User-visible assertions, isolation, resilient locators | High |
| SvelteKit routing docs (accessed 2026-06-07) | Official docs | https://svelte.dev/docs/kit/routing | Evaluate SvelteKit routing model and migration impact | High |
| SvelteKit project structure docs (accessed 2026-06-07) | Official docs | https://svelte.dev/docs/kit/project-structure | Evaluate SvelteKit modular structure quality | High |
| SvelteKit adapter-node docs (accessed 2026-06-07) | Official docs | https://svelte.dev/docs/kit/adapter-node | Evaluate Node deployment/runtime path for SvelteKit | High |
| Vercel Commerce repository (accessed 2026-06-07) | GitHub | https://github.com/vercel/commerce | Real-world App Router modular structure from a mature Next.js codebase | High |

## Official Documentation Findings

- Next.js App Router is current primary direction. Official docs describe it as the router built around Server Components, Suspense, and Server Functions, which matches SWEED's need for fast public pages and selective interactivity.
- Next.js pages and layouts are Server Components by default. Official guidance says Client Components should be used only when state, event handlers, lifecycle APIs, or browser APIs are needed. That strongly favors server-first public pages with small client islands for mobile menu, AI advisor, sliders, and form interaction.
- Next.js project structure is intentionally flexible, but the docs explicitly support route groups like `(marketing)` and private folders like `_components` and `_lib` to organize code without changing URLs. This is a direct fit for separating public-site routes from admin/debug surfaces.
- Next.js testing guidance says different test types have different roles, and specifically recommends E2E testing over unit testing for async Server Components. This means public route migration should not rely only on component unit tests.
- Next.js production guidance recommends custom error and not-found surfaces, Metadata API, sitemap/robots generation, intentional request-time API use, server-side data access, build/start verification, Lighthouse, and bundle analysis. These are necessary for a professional marketing site, not optional polish.
- Next.js internationalization guidance supports locale-aware routing and server-loaded dictionaries inside App Router. Because layouts and pages are Server Components by default, translation dictionaries do not have to inflate client bundles. This makes Arabic-first today and bilingual later a safe path.
- Bun docs position Bun as a Node.js-compatible package manager, script runner, and test runner that can be used in existing projects with little change. Bun test supports TypeScript, mocks, reporters, preload hooks, CI output, and DOM-testing-library-compatible workflows.
- Playwright best practices recommend testing user-visible behavior, keeping tests isolated, using resilient locators, and preferring web-first assertions. That fits parity verification better than checking implementation details during migration.
- SvelteKit has a clean filesystem router, strong project structure, and a valid Node deployment path. But its docs confirm a different routing model (`src/routes`, `+page`, `+layout`, adapters), which would require SWEED to replace its current routes, metadata model, AI integrations, test setup, and deployment assumptions.

## GitHub / Ecosystem Evidence

- Vercel Commerce is a mature App Router repository with clear top-level separation between `app`, `components`, and `lib`. It also uses provider-style boundaries so integrations can change without rewriting the whole UI. That is the kind of modularity SWEED should copy, even though SWEED is a marketing site, not commerce.
- Local repo evidence shows the current public app is already on Next.js and Bun, so rewriting frameworks now would throw away working foundations:
  - Public routes like `src/app/page.tsx`, `src/app/about/page.tsx`, and `src/app/services/page.tsx` still point to `LegacyPage`.
  - `src/features/legacy-site/legacy-page.tsx` injects `document.headHtml` and `document.bodyHtml` via `dangerouslySetInnerHTML`, which is the main modularity bottleneck.
  - `src/content/types.ts` already contains useful typed content contracts for services, offers, products, portfolio, articles, FAQ, and site settings.
  - `src/components/sections/section-blocks.tsx` already contains reusable section primitives that can seed a full typed public-site system.
  - `src/features/typed-site/typed-site-page.tsx` shows an earlier typed-page attempt, but it is not active and source inspection shows apparent text-encoding drift risk in that path.
- Current testing is uneven:
  - `bun test` currently covers only `src/features/ai-advisor/**`.
  - Playwright smoke coverage exists for public routes and mobile behavior under `tests/smoke`.
  - There is almost no unit or integration coverage for future public-site content repositories, page composers, or route activation rules.
  - Runtime verification on 2026-06-07 showed `bun run smoke` is not fully green yet. The current failures include AI advisor locator/click instability, duplicate mobile footer rendering, missing `#expertise` anchor proof, and hydration-mismatch noise on legacy-rendered routes. This means the first child change must stabilize the baseline before expanding migration scope.
- Prior archived OpenSpec design in `openspec/changes/archive/2026-05-04-modularize-legacy-site-components/design.md` already reached the correct high-level conclusion: page-by-page migration is safer than a big-bang rewrite, and `site/` should remain a reference fixture until parity is proven.

## Reuse-First Options

| Option | Source | Fit | Tradeoffs | Decision |
|---|---|---|---|---|
| Incremental Next.js App Router migration using current repo foundations | Next.js docs, local repo, archived modularization design | Highest fit because app already runs on Next.js 16, Bun, and Playwright | Requires staged migration discipline instead of a dramatic rewrite | Use |
| Full SvelteKit rewrite | SvelteKit docs | Technically valid, but poor fit for current repo state | Replaces routes, metadata, tests, deployment assumptions, and existing feature work | Reject |
| Keep legacy HTML runtime permanently | Local repo | Lowest effort short term | Fails modularity, typed content, maintainability, and backend readiness goals | Reject |
| Bun plus Playwright as primary TDD toolchain | Bun docs, Next.js testing docs, Playwright docs | Strong fit for repo and user preference | Async Server Component unit coverage remains limited, so browser tests stay essential | Use |
| Add Vitest immediately for all public-site tests | Next.js testing docs | Useful later for client-only or sync component tests | Adds another runner before current repository/content test gaps are solved | Investigate later |
| Route groups and private folders for public/admin split | Next.js project structure and route groups docs | High fit, keeps clean URLs and better ownership | Must avoid duplicate route paths and unnecessary multiple root layouts | Use |

## Capability Map And Change Decomposition

| Capability | Suggested Change Name | Depends On | Why Separate | Verification Target |
|---|---|---|---|---|
| Public-site TDD safety net | `stabilize-public-site-test-foundation` | None | Prevent risky route migration without repo/content/browser proof | `bun run unit`, targeted new Bun tests, `bun run smoke` |
| Route and ownership boundaries | `group-marketing-routes-and-module-boundaries` | `stabilize-public-site-test-foundation` | Cleanly separate public, admin, and server-only code before page migration | `bun run typecheck`, `bun run build`, representative smoke routes |
| Typed content normalization | `normalize-public-content-repositories` | `stabilize-public-site-test-foundation` | Make content swappable and testable before rewriting pages | Repository and metadata tests with Bun, plus build |
| Low-risk page migration | `migrate-simple-public-pages-to-typed-composition` | `group-marketing-routes-and-module-boundaries`, `normalize-public-content-repositories` | Convert about, faq, and contact first while risk is low | Route parity smoke checks and visual/manual review |
| Collection and detail route migration | `migrate-listing-and-detail-public-pages` | `migrate-simple-public-pages-to-typed-composition` | Convert services, offers, products, portfolio, articles, and detail pages with shared patterns | Bun tests for mappers plus Playwright route checks |
| Homepage migration and legacy retirement | `migrate-homepage-and-retire-legacy-runtime` | `migrate-listing-and-detail-public-pages` | Home has largest surface and should be last | Home parity smoke checks, no active `LegacyPage` for public routes |
| Production hardening | `harden-public-site-prod-ops` | Can start after first route migrations, completes after homepage migration | Capture headers, error UI, 404, metadata, bundle review, and deployment confidence | `bun run build`, `bun run smoke`, Lighthouse, header checks |

## Recommended Execution Order

1. `stabilize-public-site-test-foundation`
2. `group-marketing-routes-and-module-boundaries`
3. `normalize-public-content-repositories`
4. `migrate-simple-public-pages-to-typed-composition`
5. `migrate-listing-and-detail-public-pages`
6. `migrate-homepage-and-retire-legacy-runtime`
7. `harden-public-site-prod-ops`

## Best Practices

- Keep `src/app` thin. Routes should compose modules, not own big UI trees or raw HTML parsing.
- Use a route group such as `src/app/(marketing)` for public pages and keep clean URLs through Next.js route groups.
- Default to Server Components for public pages and move only interactive islands to Client Components.
- Keep backend-only code behind server-only module boundaries and never import those modules into client components.
- Read page data through typed repositories and page-composer helpers instead of hardcoding content inside page files.
- Preserve visual parity with page-by-page rollout and easy fallback until each route is proven.
- Use Bun for package management, script execution, and fast repository/domain tests where it already fits the repo.
- Use Playwright as the truth layer for migrated async pages, mobile behavior, and user-visible parity.
- Prefer shared primitives and section modules with clear ownership over giant one-file HTML or giant page components.
- Keep `site/` as reference fixtures until the last public route no longer depends on runtime HTML injection.

## Common Pitfalls And Mitigations

| Pitfall | Why It Matters | Mitigation | Source |
|---|---|---|---|
| Big-bang framework rewrite | High regression and delivery risk despite attractive "clean start" feeling | Keep Next.js and migrate one capability at a time | Next.js docs, SvelteKit docs, local repo state |
| Too many `"use client"` boundaries | Bloats client bundle and weakens server-first advantages | Keep client islands small and intentional | Next.js Server and Client Components, Production guide |
| Testing implementation details instead of user behavior | Creates brittle migration checks | Use Playwright locators and visible assertions | Playwright best practices |
| Unit-testing async public pages as primary proof | Tooling support is incomplete for async Server Components | Use E2E/browser proof for route activation, unit tests for repositories/mappers | Next.js Testing guide |
| Letting route files become feature owners | Creates tangled code and weak module boundaries | Keep route files thin and move logic to feature/page-composer modules | Next.js project structure guidance, local repo goals |
| Removing legacy runtime too early | Breaks rollback path and visual parity confidence | Retire `LegacyPage` only after route-by-route proof | Archived modularization design, local repo state |
| Duplicate paths across route groups | Causes routing conflicts | Use one clear public route group and avoid mirrored paths | Next.js Route Groups reference |
| Arabic content drift or encoding issues | Can silently break marketing copy and RTL quality | Keep typed UTF-8 content modules, add Arabic smoke checks, avoid opaque copied HTML strings | Local repo inspection, Next.js i18n guidance |

## Production Readiness Checklist

- [x] Security concerns identified
- [x] Accessibility concerns identified
- [x] Performance concerns identified
- [x] Error/loading/empty states identified
- [x] i18n/RTL concerns identified
- [x] Deployment/rollback concerns identified
- [x] Testing strategy identified

## Recommended Direction

- Keep Next.js 16 App Router. Do not rewrite to SvelteKit.
- Keep Bun as package manager and script runner, and use it first for pure TypeScript/domain tests that fit strict TDD.
- Keep Playwright as the user-truth gate for route migration, mobile behavior, parity, and async Server Component verification.
- Organize public pages as a feature-owned marketing system with thin routes, typed repositories, shared sections, and explicit server-only boundaries.
- Migrate incrementally, not all at once. Lowest-risk pages first, homepage last, legacy runtime retired only after proof.
- Change the repo OpenSpec default schema to `research` so future non-trivial changes start with live-source evidence instead of ad-hoc planning.

## Open Questions

- Will contact capture in the next phase use a Next.js Server Action, a route handler, or an external CRM/webhook adapter?
- Is bilingual routing a near-term requirement? If yes, add a future child change for `app/[lang]` before large content migration spreads.
