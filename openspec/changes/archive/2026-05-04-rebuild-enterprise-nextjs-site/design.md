## Context

SWEED currently has a Vite/React root app plus multiple static HTML design drafts under `site/`, `v2/`, and `v3/`. Those files are useful as content/design references, but they are not a reliable production architecture.

The rebuild will target the latest official Next.js App Router documentation reviewed on 2026-05-04. The current docs list Next.js `16.2.2` as latest and describe the App Router as the primary model using React Server Components, Suspense, and Server Functions. The official Vite migration guide says a Vite React app is typically client-side only and should be moved through explicit Next config, app layout, entry page, environment variable, and script migration steps. Package installation and scripts will use Bun.

Key docs used:

- https://nextjs.org/docs/app
- https://nextjs.org/docs/app/guides/upgrading/version-16
- https://nextjs.org/docs/app/guides/migrating/from-vite
- https://nextjs.org/docs/app/getting-started/server-and-client-components
- https://nextjs.org/docs/app/getting-started/caching
- https://nextjs.org/docs/app/getting-started/project-structure
- https://nextjs.org/docs/app/guides/testing/playwright
- https://nextjs.org/docs/app/guides/content-security-policy
- https://bun.sh/docs/cli/install
- https://bun.sh/docs/cli/run

## Goals / Non-Goals

**Goals:**

- Rebuild the public website using Next.js 16 App Router with TypeScript and Bun-managed dependencies/scripts.
- Keep pages and sections modular enough for enterprise maintenance and future CMS-driven content.
- Prefer Server Components for static/content-heavy sections and Client Components only where interactivity is required.
- Create typed content contracts so v1 can use local data while v2 can swap to Sanity repositories.
- Include polished mocked AI advisor and AI automation demo experiences, prepared for future Mastra integration.
- Add quality gates for typecheck, lint, build, accessibility-sensitive UI, responsive behavior, and key user journeys.

**Non-Goals:**

- Do not integrate live Sanity CMS in v1.
- Do not integrate live Mastra agents in v1.
- Do not preserve the current Vite runtime architecture.
- Do not build private dashboards, auth, payments, or admin publishing workflows in this change.

## Decisions

### Decision 1: Rebuild as Next.js App Router, not patch Vite

Use `app/` routing, layouts, metadata APIs, route groups, and Server Components as the primary architecture.

Rationale:

- Official Next.js docs position App Router as the current model for Server Components, Suspense, and Server Functions.
- SWEED is a marketing site, so server-rendered static and cached content should give better first-load behavior than a purely client-side Vite SPA.
- A clean rebuild removes duplicated scratch structure instead of carrying fragile coupling forward.

Alternatives considered:

- Patch the Vite app: lower short-term effort, but keeps weak SEO/rendering foundations.
- Use Pages Router: stable, but not aligned with current App Router direction.

### Decision 1.1: Use Bun as the package manager and script runner

Use `bun install` for dependency installation, `bun.lock` for lockfile state, and `bun run <script>` for project scripts.

Rationale:

- The project owner explicitly requested Bun.
- Official Next.js installation docs include Bun as a supported package-manager path.
- Bun docs describe `bun install` as a package manager for existing Node.js projects and `bun run` as the way to execute package scripts.

Alternatives considered:

- Keep npm and `package-lock.json`: conflicts with the requested workflow.
- Use pnpm: strong option, but not the requested tool for this project.

### Decision 2: Use vertical feature modules plus shared primitives

Organize code by responsibility:

- `src/app`: route composition, layouts, metadata, loading/error boundaries.
- `src/features/marketing`: homepage, services, offers, portfolio, contact, FAQ, and article section orchestration.
- `src/features/ai-advisor`: advisor popup and interactive AI demo mock.
- `src/content`: local typed content records for v1.
- `src/lib/content`: content repository interfaces and local adapters, later replaced or extended by Sanity adapters.
- `src/components/ui`: reusable primitives only.
- `src/components/layout`: shell, header, footer, mobile navigation.
- `src/styles`: global tokens and Tailwind/theme entry points.

Rationale:

- This keeps SOLID simple: pages depend on contracts, content sources hide behind repositories, and UI primitives stay reusable.
- Future Sanity work should change adapters and schemas, not every page.

Alternatives considered:

- Flat `components/` folder: fast at first, then becomes hard to reason about.
- Fully layered enterprise architecture: too heavy for v1 marketing site.

### Decision 3: Server-first rendering with small client islands

Default to Server Components for page sections, content lookup, metadata, and static rendering. Use Client Components only for:

- AI advisor popup.
- Interactive AI/automation service demo.
- Mobile menu and any local interaction.
- Animation that needs browser APIs.

Rationale:

- Official docs state pages/layouts are Server Components by default and Client Components are for state, effects, event handlers, or browser APIs.
- This reduces JavaScript shipped to visitors and improves maintainability.

Alternatives considered:

- Mark whole pages with `"use client"`: simpler for animations, but worse for performance and future data boundaries.

### Decision 4: CMS-ready content contracts without Sanity runtime

Create domain content types such as `Service`, `Offer`, `Article`, `FAQ`, `PortfolioItem`, and `SiteNavigation`. v1 data will live in local TypeScript modules. Access will happen through repository functions, not direct imports from pages.

Rationale:

- Future Sanity integration needs stable content shapes and slugs.
- Local content is enough for v1 and avoids CMS setup risk.

Alternatives considered:

- Hardcode content inside components: fastest, but blocks CMS migration.
- Add Sanity now: unnecessary scope and operational risk for v1.

### Decision 5: AI experiences are mocked but architected as replaceable

The AI advisor and service demo will use local scripted flows and deterministic recommendation rules. The UI copy should feel like an intelligent assistant, but the implementation must avoid pretending that live Mastra execution exists.

Rationale:

- The client-facing demo needs impact now.
- Future Mastra integration should replace the advisor service layer, not the whole UI.

Alternatives considered:

- Build live Mastra in v1: too much scope.
- Static screenshots only: less impressive and less useful for conversion.

### Decision 6: Quality gates are part of the build, not optional polish

Implementation must leave the project with runnable scripts for typecheck, lint, build, and Playwright-based smoke checks across desktop and mobile. SEO metadata, sitemap/robots readiness, accessible navigation, and basic security headers must be planned in the app structure.

Rationale:

- The user asked for enterprise quality and best practices.
- A rebuild without verification can look good while still being broken.

Alternatives considered:

- Manual visual QA only: too risky for a full rebuild.

## Risks / Trade-offs

- [Risk] Scope is large for one change -> Mitigation: implement in phases inside `tasks.md`, starting with platform shell and content contracts before full page polish.
- [Risk] Visual drafts conflict with each other -> Mitigation: treat old `site/`, `v2/`, and `v3/` as references, then choose one coherent design system.
- [Risk] Over-engineering slows v1 -> Mitigation: use simple interfaces and local adapters, not complex infrastructure.
- [Risk] AI mock overpromises live functionality -> Mitigation: keep architecture replaceable and copy honest enough for a demo.
- [Risk] Next.js 16 caching behavior differs from older assumptions -> Mitigation: follow current docs: explicit caching choices, server-first rendering, and no stale training-data assumptions.
- [Risk] Arabic/RTL content and English technical terms can break layout -> Mitigation: test mobile and desktop, use logical CSS properties, and keep text wrapping constraints in UI components.

## Migration Plan

1. Freeze existing folders as references and avoid deleting them until the Next.js app is proven.
2. Install/upgrade to Next.js latest using official migration guidance from Vite and Bun commands.
3. Create the App Router shell, root layout, metadata, global styles, and route map.
4. Build typed local content contracts and repository functions.
5. Rebuild pages from highest conversion priority: home, services, offers, contact, portfolio, articles/FAQ.
6. Add AI advisor popup and service AI demo mock as client islands.
7. Add quality gates, smoke tests, responsive checks, SEO files, and production configuration.
8. Only after the new app passes gates, remove or archive obsolete runtime files if needed.

Rollback strategy: keep the current Vite/static artifacts untouched until the Next.js build is complete and verified. If the rebuild fails mid-way, the old app remains recoverable from git.

## Open Questions

- Final brand direction: choose the winning visual direction from `site/`, `v2/`, `v3/`, or create a new merged design.
- Deployment target: Vercel is the default fit for Next.js, but this needs confirmation before deployment-specific config.
- Content language strategy: Arabic-first, bilingual, or Arabic with selected English technical labels.
- Lead capture destination: form-only mock in v1, email endpoint, CRM, WhatsApp, or another channel.
