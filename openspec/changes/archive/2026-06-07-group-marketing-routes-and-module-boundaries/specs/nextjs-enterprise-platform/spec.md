## ADDED Requirements

### Requirement: Marketing route group organization

The system SHALL organize public marketing routes under a dedicated App Router route group without changing public URL paths.

#### Scenario: Visitor opens a public page after the route move

- **WHEN** a visitor opens `/`, `/about`, `/services`, `/offers`, `/products`, `/portfolio`, `/articles`, `/faq`, or `/contact`
- **THEN** the URL path MUST remain unchanged even though the route files live under a marketing route group

### Requirement: Server-only route helper boundaries

The system SHALL protect filesystem-backed public route helpers from accidental Client Component imports.

#### Scenario: A developer imports a filesystem-backed helper into a Client Component

- **WHEN** a server-only public route helper is imported into a Client Component
- **THEN** the build MUST fail with a server-only boundary error instead of silently bundling the wrong module

## MODIFIED Requirements

### Requirement: Modular project boundaries
The system SHALL separate route composition, feature modules, shared UI primitives, content contracts, and utility libraries into clear folders, and public route entry files under `src/app` SHALL stay thin by delegating composition ownership to feature-owned modules.

#### Scenario: Adding a new marketing section
- **WHEN** a developer adds a new website section
- **THEN** the implementation MUST live in the relevant feature module or shared primitive folder, not as unrelated page-level duplication

#### Scenario: Editing a public route entrypoint
- **WHEN** a developer edits a public page route file under `src/app`
- **THEN** that file MUST remain an entrypoint that reuses feature-owned route composition instead of owning the full page implementation inline

## REMOVED Requirements
