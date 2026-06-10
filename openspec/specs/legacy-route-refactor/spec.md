# legacy-route-refactor Specification

## Purpose
TBD - created by archiving change preserve-vite-design-nextjs-refactor. Update Purpose after archive.
## Requirements
### Requirement: Clean Next.js route mapping
The system SHALL expose old static pages through clean App Router routes.

#### Scenario: Old about page route
- **WHEN** a visitor opens `/about`
- **THEN** the system MUST render `site/pages/about.html`

#### Scenario: Old article listing route
- **WHEN** a visitor opens `/articles`
- **THEN** the system MUST render `site/pages/blog.html`

### Requirement: Legacy link rewriting
The system SHALL rewrite known `.html` navigation links to clean Next.js routes.

#### Scenario: Visitor clicks old services link
- **WHEN** a rendered legacy page contains a link to `services.html` or `pages/services.html`
- **THEN** the link target MUST resolve to `/services`

### Requirement: Shared rendering boundary
The system SHALL use shared legacy rendering utilities and feature-owned route modules instead of duplicating parsing or route composition logic in every page route.

#### Scenario: Adding another legacy route
- **WHEN** a developer adds a new legacy-backed route
- **THEN** they MUST reuse the shared legacy renderer functions and the feature-owned public route module pattern

#### Scenario: Reorganizing public routes
- **WHEN** public routes are moved into a route group or another routing boundary
- **THEN** the shared feature-owned route modules MUST continue to provide the route's metadata and page implementation without changing the public URL

### Requirement: Feature-owned public route modules

The system SHALL expose legacy-backed public routes through shared feature-owned route modules so route entrypoints can be moved or migrated without duplicating route wiring.

#### Scenario: Public route entry file renders a legacy-backed page

- **WHEN** a public route such as `/about` or `/services` is rendered
- **THEN** the route entry file SHALL reuse a feature-owned route module that provides metadata and page composition for that route

