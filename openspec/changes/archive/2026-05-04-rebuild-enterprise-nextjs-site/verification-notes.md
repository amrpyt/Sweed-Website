## Verification Notes

Date: 2026-05-04

## Implemented Scope

- Replaced the root Vite runtime with a Bun-managed Next.js App Router foundation.
- Added modular `src/` structure for app routes, layout components, UI primitives, content, feature modules, and libraries.
- Added CMS-ready local content contracts and repository boundaries for future Sanity integration.
- Rebuilt public pages:
  - `/`
  - `/about`
  - `/services`
  - `/services/[slug]`
  - `/offers`
  - `/products`
  - `/portfolio`
  - `/articles`
  - `/articles/[slug]`
  - `/faq`
  - `/contact`
- Added mocked AI advisor popup with deterministic package recommendation logic.
- Added mocked interactive AI automation demo on `/services`.
- Added SEO helpers, route metadata foundation, sitemap, robots, and production-minded headers.
- Added Playwright smoke tests for key desktop/mobile routes and interactive UI.

## Verified Commands

- `bun run typecheck`: passed
- `bun run lint`: passed
- `bun run build`: passed
- `bun run smoke`: passed with 15 passed and 1 expected desktop skip for the mobile-navigation-only test

## Current Runtime

- Package manager: Bun
- Installed Next.js: `16.2.4`
- Installed React: `19.2.5`
- Lockfile: `bun.lock`
- Removed root Vite runtime config and npm lockfile.
- Removed unused scratch-era dependencies after the final smoke pass, keeping the runtime dependency set focused on Next.js, React, and the UI icon package currently used by the app.

## Non-Goals Confirmed

- Sanity CMS is not integrated in v1.
- Mastra runtime is not integrated in v1.
- Contact form submission is UI-only in v1.
- The AI advisor and automation demo are deterministic mocks in v1.

## Future Hooks

- Replace `src/lib/content/repositories.ts` with a Sanity-backed adapter while preserving current function contracts.
- Replace `src/features/ai-advisor/advisor-adapter.ts` with a Mastra-backed advisor service while preserving current UI contracts.
- Add real lead capture destination once the preferred channel is selected.
