## 1. Baseline And Migration Setup

- [x] 1.1 Audit current runtime files, static drafts, assets, and routes to decide what becomes reference content versus active app code
- [x] 1.2 Migrate package scripts and dependencies from Vite to latest Next.js App Router using official Next.js Vite migration guidance and Bun package workflows
- [x] 1.3 Create `next.config.ts`, TypeScript config, app root layout, app entry page, and global style entry points
- [x] 1.4 Configure module aliases and folder structure for `src/app`, `src/features`, `src/components`, `src/content`, `src/lib`, and `src/styles`
- [x] 1.5 Verify the empty Next.js shell starts in development and builds in production

## 2. Enterprise Architecture Foundation

- [x] 2.1 Implement shared layout shell with header, footer, mobile navigation, route data, and primary contact action
- [x] 2.2 Implement UI primitives for buttons, links, cards, section wrappers, typography, form fields, tabs/accordions, and badges
- [x] 2.3 Add SEO helpers for static metadata, dynamic metadata, canonical URL construction, and Open Graph defaults
- [x] 2.4 Add production header configuration and remove unnecessary framework disclosure where supported
- [x] 2.5 Add loading, error, and not-found boundaries for public routes

## 3. CMS-Ready Content Layer

- [x] 3.1 Define TypeScript content models for services, offers, products, portfolio items, articles, FAQs, navigation, and reusable sections
- [x] 3.2 Create local content records for v1 using existing `site/`, `v2/`, and `v3/` drafts as references
- [x] 3.3 Implement content repository functions for navigation, services, offers, products, portfolio, articles, FAQs, and site settings
- [x] 3.4 Ensure content models include stable slugs, SEO metadata, summaries, media references, tags/categories, and ordering fields
- [x] 3.5 Add comments or adapter boundaries showing where future Sanity repository functions will attach

## 4. Public Page Rebuild

- [x] 4.1 Rebuild home page with hero, service summary, proof, offers/package path, AI advisor entry, and contact action
- [x] 4.2 Rebuild about page with company story, values, process, proof points, and conversion section
- [x] 4.3 Rebuild services listing page with categories, benefits, process, AI demo section, and service detail links
- [x] 4.4 Rebuild service detail route with slug-based content, related services, proof, FAQ, and contact action
- [x] 4.5 Rebuild offers/packages page with package comparison, recommendation path, objections handling, and contact action
- [x] 4.6 Rebuild products page with product cards, benefits, status, and lead action
- [x] 4.7 Rebuild portfolio page with filter-ready project cards and case-study-ready content shape
- [x] 4.8 Rebuild articles/news listing and article detail routes with metadata and related navigation
- [x] 4.9 Rebuild FAQ page with accessible accordion behavior and grouped questions
- [x] 4.10 Rebuild contact page with form UI, contact channels, location/availability content, and validation-ready structure

## 5. AI Advisor And Demo Mock

- [x] 5.1 Implement AI advisor client island with open/close behavior, prompt choices, conversation state, and package recommendation output
- [x] 5.2 Implement deterministic advisor logic behind an adapter function prepared for future Mastra replacement
- [x] 5.3 Add lead-intent capture UI inside the advisor without requiring a live backend in v1
- [x] 5.4 Implement services AI/automation demo with scenario selection, staged output, status transitions, and call-to-action
- [x] 5.5 Verify advisor and demo work without AI or Mastra environment variables

## 6. Responsive UI And Accessibility

- [x] 6.1 Tune global design tokens, spacing, typography, colors, and light-mode visual direction for a coherent enterprise marketing site
- [x] 6.2 Verify Arabic/RTL and mixed English technical labels wrap correctly across mobile, tablet, and desktop
- [x] 6.3 Ensure keyboard focus, semantic landmarks, accessible labels, and button/link roles are correct
- [x] 6.4 Verify mobile navigation, advisor popup, accordions, forms, and demo controls do not overlap or overflow
- [x] 6.5 Add image/media handling through Next.js-supported patterns and responsive sizing

## 7. Quality Gates And Production Readiness

- [x] 7.1 Add or update Bun-runnable scripts for `dev`, `build`, `start`, `typecheck`, `lint`, and browser smoke tests
- [x] 7.2 Add Playwright smoke tests for home, services, offers, articles, contact, mobile menu, AI advisor, and AI demo
- [x] 7.3 Add sitemap and robots support for public routes
- [x] 7.4 Run typecheck, lint, production build, and smoke tests; fix all current-run failures
- [x] 7.5 Capture final verification notes, known non-goals, and next-step hooks for Sanity and Mastra v2 work
