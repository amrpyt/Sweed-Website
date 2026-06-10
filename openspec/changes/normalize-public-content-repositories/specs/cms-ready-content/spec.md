## ADDED Requirements

### Requirement: Locale-ready public page source modules

The system SHALL keep route-level public-page source content in typed UTF-8 modules that remain ready for future locale-aware adapters without rewriting page-composer contracts.

#### Scenario: A developer edits public-page source copy

- **GIVEN** route-level copy for pages such as about, services, or articles
- **WHEN** the content source is updated
- **THEN** the copy MUST remain in typed modules instead of opaque HTML strings or route-file literals

## MODIFIED Requirements

### Requirement: Typed content contracts
The system SHALL define typed content models for services, offers, products, portfolio items, articles, FAQs, navigation, reusable page sections, shared shell data, and route-level page models used by public-site page-composer boundaries.

#### Scenario: Developer edits local content
- **WHEN** a developer updates local content records
- **THEN** TypeScript MUST validate the required fields used by pages, metadata, navigation, and sections

#### Scenario: Route-level page model is introduced
- **WHEN** a developer creates a page-model result for a public route
- **THEN** the result MUST be expressed through a typed contract rather than an untyped object or HTML string

### Requirement: Repository boundary for content
Pages and feature modules SHALL read content through repository functions or page-composer service boundaries, not through scattered hardcoded imports inside UI components, route files, or active legacy HTML body parsing.

#### Scenario: Future Sanity adapter is added
- **WHEN** a Sanity-backed content adapter is introduced after v1
- **THEN** public pages MUST be able to keep their rendering contracts with minimal page-level changes

#### Scenario: Public route leaves legacy body rendering
- **WHEN** a public route is migrated away from `LegacyPage`
- **THEN** the route MUST source its content through typed repository or composer boundaries instead of consuming raw page HTML
