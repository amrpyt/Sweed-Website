## ADDED Requirements

### Requirement: Feature-owned public page composers

The system SHALL assemble public-route page models through feature-owned public-site composer modules instead of placing route-level content assembly inside `src/app` entry files or legacy HTML helpers.

#### Scenario: A developer adds a new public page model

- **GIVEN** a public route such as `/about`, `/services`, or `/articles`
- **WHEN** the route needs metadata, section models, or CTA data
- **THEN** the page model MUST come from a composer under `src/features/public-site` rather than from inline route-file logic

## MODIFIED Requirements

### Requirement: Modular project boundaries
The system SHALL separate route composition, feature modules, shared UI primitives, content contracts, utility libraries, and route-level public page-model assembly into clear folders, and public route entry files under `src/app` SHALL stay thin by delegating composition ownership to feature-owned modules.

#### Scenario: Adding a new marketing section
- **WHEN** a developer adds a new website section
- **THEN** the implementation MUST live in the relevant feature module or shared primitive folder, not as unrelated page-level duplication

#### Scenario: Editing a public route entrypoint
- **WHEN** a developer edits a public page route file under `src/app`
- **THEN** that file MUST remain an entrypoint that reuses feature-owned route composition instead of owning the full page implementation inline

#### Scenario: Assembling a public page model
- **WHEN** a developer prepares data for a public route
- **THEN** the route MUST read that model from feature-owned repository/composer boundaries instead of from inline hardcoded objects or legacy body parsing logic
