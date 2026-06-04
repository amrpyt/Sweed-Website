## 1. Correct Scope

- [x] 1.1 Document that `site/` is the only visual source and `v2/`/`v3/` are ignored
- [x] 1.2 Remove the redesigned marketing page rendering from active routes

## 2. Legacy Renderer

- [x] 2.1 Implement shared legacy HTML loader/parser utilities
- [x] 2.2 Implement shared legacy page renderer component
- [x] 2.3 Implement centralized old `.html` link to clean Next route mapping

## 3. Route Replacement

- [x] 3.1 Replace `/` with `site/index.html`
- [x] 3.2 Replace `/about` with `site/pages/about.html`
- [x] 3.3 Replace `/services` and `/services/[slug]` with old services pages
- [x] 3.4 Replace `/offers`, `/products`, `/portfolio`, `/articles`, `/articles/[slug]`, `/faq`, and `/contact`

## 4. Verification

- [x] 4.1 Update smoke tests to assert legacy page markers from `site/`
- [x] 4.2 Run `bun run typecheck`
- [x] 4.3 Run `bun run lint`
- [x] 4.4 Run `bun run build`
- [x] 4.5 Run `bun run smoke`

## 5. Shared Legacy Chrome Fixes

- [x] 5.1 Replace duplicated per-page legacy headers with one shared `LegacyHeader` component
- [x] 5.2 Normalize the SWEED logo and top navigation across all legacy-backed routes
- [x] 5.3 Lock the mobile sidebar as a fixed drawer and keep body scroll locked while open
- [x] 5.4 Verify shared header/logo/sidebar behavior with smoke tests
- [x] 5.5 Keep mobile sidebar links clickable above the overlay layer
- [x] 5.6 Verify mobile sidebar link click behavior with smoke tests
- [x] 5.7 Add a shared legacy breadcrumb fallback for inner pages missing the old breadcrumb block
- [x] 5.8 Verify every inner legacy page exposes a breadcrumb trail
- [x] 5.9 Keep the shared mobile sidebar polished while preventing layout drift
- [x] 5.10 Verify the polished mobile sidebar decorations stay intentional and bounded
- [x] 5.11 Keep legacy scroll scripts from moving the open shared mobile sidebar
- [x] 5.12 Allow the contact page Google Maps iframe in the CSP
- [x] 5.13 Stop loading the obsolete legacy mobile polish script after replacing the header
