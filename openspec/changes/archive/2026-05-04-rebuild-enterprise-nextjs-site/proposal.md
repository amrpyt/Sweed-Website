## Why

The current SWEED website is a fragile Vite/React scratch build with duplicated static HTML drafts, unclear ownership boundaries, and weak production readiness. We need a clean rebuild on the latest documented Next.js App Router model so v1 can ship as a strong marketing website while leaving obvious future slots for Sanity CMS and Mastra-powered AI experiences.

## What Changes

- **BREAKING**: Replace the current Vite application surface with a Next.js 16 App Router application managed with Bun.
- Introduce a modular enterprise architecture with route-level composition, feature modules, shared UI primitives, typed content contracts, and clear server/client boundaries.
- Rebuild the public marketing pages for home, about, services, service details, offers/packages, products, portfolio, articles/news, FAQ, and contact.
- Add CMS-ready content modeling for articles/news, services, offers, products, FAQs, portfolio items, and reusable page sections without integrating Sanity in v1.
- Add a mocked AI advisor popup that can guide visitors, recommend a package, and collect lead intent without requiring real Mastra runtime behavior in v1.
- Add a mocked interactive AI/automation demo section inside services to impress clients while staying explicit that it is presentation-grade for v1.
- Add production-quality foundations: SEO metadata, structured data readiness, responsive RTL-friendly layout, accessibility, performance budgets, testing gates, and deployment-safe configuration.

## Capabilities

### New Capabilities

- `nextjs-enterprise-platform`: Next.js 16 App Router platform, project structure, SOLID-inspired module boundaries, routing, rendering, caching, and deployment foundations.
- `marketing-site-experience`: Public website pages, navigation, content sections, conversion flows, and responsive visual experience.
- `cms-ready-content`: Typed content contracts and repository boundaries prepared for future Sanity integration without coupling v1 to Sanity.
- `ai-advisor-experience`: Mocked AI advisor popup and AI/automation demo surfaces prepared for future Mastra integration.
- `quality-production-readiness`: Testing, accessibility, SEO, performance, security headers, and verification gates required before implementation is considered complete.

### Modified Capabilities

- None. There are no existing OpenSpec capabilities in `openspec/specs/`.

## Impact

- Affected application stack: `package.json`, build scripts, TypeScript config, Next.js config, app routing, styling, component architecture, assets, and public pages.
- Existing static references under `site/`, `v2/`, and `v3/` become design/content references, not the runtime architecture.
- New dependencies will likely include `next@latest`, React compatible with the latest Next.js version, lint/test tooling, Bun lockfile/package workflows, and later extension seams for Sanity and Mastra.
- v1 will not include live Sanity CMS publishing or real Mastra agent execution; it will include typed boundaries and polished mock experiences so those integrations can be added safely later.
