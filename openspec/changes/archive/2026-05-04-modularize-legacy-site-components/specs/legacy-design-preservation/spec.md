## MODIFIED Requirements

### Requirement: Exact legacy visual source
The system SHALL preserve the accepted legacy visual design while migrating runtime implementation from `site/` HTML files to typed React/TypeScript components. The `site/` HTML files SHALL be treated as visual reference fixtures during migration, and `v2/` or `v3/` SHALL NOT be used as visual sources.

#### Scenario: Home page renders legacy design
- **WHEN** a visitor opens `/`
- **THEN** the page MUST render content, colors, styles, and sections matching the accepted `site/index.html` experience

#### Scenario: Internal page renders legacy design
- **WHEN** a visitor opens an internal route such as `/services`
- **THEN** the page MUST render content, colors, styles, and sections matching the accepted matching `site/pages/*.html` experience

#### Scenario: Runtime implementation is inspected after migration
- **WHEN** a migrated public route implementation is inspected
- **THEN** it MUST use typed React components and typed content contracts rather than full-page legacy HTML injection

### Requirement: No redesign
The system SHALL NOT replace the accepted legacy layout with unrelated new marketing cards, new colors, or new section order during componentization.

#### Scenario: Page source is inspected
- **WHEN** the route implementation is inspected
- **THEN** it MUST use legacy-derived typed components rather than redesigned page blocks

### Requirement: Next.js infrastructure remains
The system SHALL keep Next.js App Router, TypeScript, and Bun while preserving the accepted visual design.

#### Scenario: Production build runs
- **WHEN** `bun run build` runs
- **THEN** the componentized public pages MUST build through Next.js
