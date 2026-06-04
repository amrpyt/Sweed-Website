## MODIFIED Requirements

### Requirement: Clean Next.js route mapping
The system SHALL expose the public marketing pages through clean App Router routes backed by typed React/TypeScript page compositions.

#### Scenario: Old about page route
- **WHEN** a visitor opens `/about`
- **THEN** the system MUST render the accepted about page experience through typed components

#### Scenario: Old article listing route
- **WHEN** a visitor opens `/articles`
- **THEN** the system MUST render the accepted blog listing experience through typed components

### Requirement: Legacy link rewriting
The system SHALL preserve known navigation targets as clean Next.js routes and remove the need for `.html` link rewriting once migrated routes no longer render legacy HTML bodies.

#### Scenario: Visitor clicks old services link equivalent
- **WHEN** a rendered public page contains a navigation link to services
- **THEN** the link target MUST resolve to `/services`

#### Scenario: Legacy renderer is retired
- **WHEN** all public routes are componentized
- **THEN** active navigation MUST use clean route hrefs directly rather than relying on legacy `.html` rewrite maps

### Requirement: Shared rendering boundary
The system SHALL use shared page composition utilities, content repositories, and UI components instead of duplicating page assembly logic in every route.

#### Scenario: Adding another public route
- **WHEN** a developer adds a new public marketing route
- **THEN** they MUST reuse the shared page shell, content contracts, and component primitives
