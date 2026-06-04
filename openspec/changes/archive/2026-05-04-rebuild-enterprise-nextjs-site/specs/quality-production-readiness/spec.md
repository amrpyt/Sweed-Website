## ADDED Requirements

### Requirement: Verification scripts
The system SHALL provide Bun-runnable scripts for typecheck, lint, production build, and browser smoke testing.

#### Scenario: Developer runs quality gates
- **WHEN** a developer runs the documented verification commands
- **THEN** typecheck, lint, build, and smoke tests MUST be available through `bun run` package scripts

### Requirement: SEO and metadata foundation
The system SHALL provide page-level metadata, canonical route readiness, Open Graph readiness, robots, and sitemap support for public pages.

#### Scenario: Search crawler reads public page
- **WHEN** a crawler reads a public page
- **THEN** the page MUST expose meaningful title, description, and indexable content

### Requirement: Accessibility baseline
The system SHALL implement accessible navigation, buttons, forms, landmarks, focus states, and semantic structure.

#### Scenario: Keyboard user navigates
- **WHEN** a visitor uses keyboard navigation
- **THEN** primary navigation, advisor controls, forms, and calls-to-action MUST be reachable and visibly focused

### Requirement: Security and production headers
The system SHALL include a production-safe header strategy covering at least content security posture, referrer policy, frame protection, and unnecessary framework disclosure.

#### Scenario: Production response is served
- **WHEN** the website serves a public route in production mode
- **THEN** the response MUST include configured security-minded headers where supported by the deployment target

### Requirement: Responsive smoke coverage
The system SHALL verify key pages at representative desktop and mobile viewport sizes.

#### Scenario: Smoke tests run
- **WHEN** browser smoke tests run
- **THEN** they MUST cover home, services, offers, articles, contact, mobile navigation, AI advisor, and AI demo entry points
