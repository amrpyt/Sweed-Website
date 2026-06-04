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
The system SHALL use shared legacy rendering utilities instead of duplicating parsing logic in every page route.

#### Scenario: Adding another legacy route
- **WHEN** a developer adds a new legacy-backed route
- **THEN** they MUST reuse the shared legacy renderer functions

