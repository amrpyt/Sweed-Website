## ADDED Requirements

### Requirement: Page composition repositories

Public marketing routes SHALL read complete page models through typed repository or page-composer boundaries instead of combining scattered content imports inside route files or relying on raw legacy HTML bodies.

#### Scenario: Public page is composed

- **GIVEN** a route such as `/about`, `/services`, or `/articles`
- **WHEN** the route builds its page model
- **THEN** the route MUST read from a typed repository or composer function that returns the content needed for metadata, sections, navigation, and calls to action

### Requirement: UTF-8 and locale-ready content sources

The system SHALL store public-site source copy in typed UTF-8 modules and SHALL keep the content layer ready for later locale segmentation without requiring every component to be rewritten.

#### Scenario: Arabic copy is edited

- **GIVEN** a developer updates Arabic-first marketing content
- **WHEN** the source content is saved
- **THEN** the content MUST remain stored in typed source modules rather than opaque copied HTML fragments

#### Scenario: Locale-aware content is introduced later

- **GIVEN** the product later adds locale-aware routing or bilingual content
- **WHEN** a new locale source is added
- **THEN** the content layer MUST be able to supply that locale through repository boundaries without requiring route-level rewrites

## MODIFIED Requirements

### Requirement: Typed content contracts

The system SHALL define typed content models for services, offers, products, portfolio items, articles, FAQs, navigation, reusable page sections, and route-level page models used by page-composer boundaries.

#### Scenario: Developer edits local content

- **WHEN** a developer updates local content records
- **THEN** TypeScript MUST validate the required fields used by pages, metadata, navigation, and sections

#### Scenario: Route-level page model is introduced

- **WHEN** a developer creates a typed page-composer result for a public route
- **THEN** the result MUST be expressed through a typed contract rather than an untyped object or HTML string

### Requirement: Repository boundary for content

Pages and feature modules SHALL read content through repository functions or page-composer service boundaries, not through scattered hardcoded imports inside UI components or through active legacy HTML body parsing.

#### Scenario: Future Sanity adapter is added

- **WHEN** a Sanity-backed content adapter is introduced after v1
- **THEN** public pages MUST be able to keep their rendering contracts with minimal page-level changes

#### Scenario: Public route leaves legacy body rendering

- **WHEN** a public route is migrated away from `LegacyPage`
- **THEN** the route MUST source its content through typed repository or composer boundaries instead of consuming raw page HTML
