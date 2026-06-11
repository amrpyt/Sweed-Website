# legacy-design-preservation Specification

## Purpose
TBD - created by archiving change preserve-vite-design-nextjs-refactor. Update Purpose after archive.
## Requirements
### Requirement: Legacy visual source for non-migrated pages
The system SHALL render non-migrated public pages from the existing `site/pages/` HTML files without using `v2/` or `v3/` as visual sources.

#### Scenario: Home page is migrated
- **WHEN** a visitor opens `/`
- **THEN** the page MUST render from modular React homepage components

#### Scenario: Internal page renders legacy design
- **WHEN** a visitor opens an internal route such as `/services`
- **THEN** the page MUST render content, colors, styles, and sections from the matching `site/pages/*.html` file

### Requirement: No redesign
The system SHALL NOT replace non-migrated legacy pages with new marketing cards, new colors, or new section order.

#### Scenario: Page source is inspected
- **WHEN** the route implementation is inspected
- **THEN** non-migrated pages MUST use the legacy renderer or legacy-derived components rather than redesigned page blocks

### Requirement: Next.js infrastructure remains
The system SHALL keep Next.js App Router and Bun while preserving the old visual design.

#### Scenario: Production build runs
- **WHEN** `bun run build` runs
- **THEN** the old visual pages MUST build through Next.js
