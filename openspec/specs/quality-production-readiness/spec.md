# quality-production-readiness Specification

## Purpose
TBD - created by archiving change rebuild-enterprise-nextjs-site. Update Purpose after archive.
## Requirements
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

The system SHALL verify key pages at representative desktop and mobile viewport sizes, and the baseline smoke cases SHALL use stable user-facing selectors and runtime-safe assertions.

#### Scenario: Smoke tests run

- **WHEN** browser smoke tests run
- **THEN** they MUST cover home, services, offers, articles, contact, mobile navigation, real AI advisor entry points, and real AI demo entry points

#### Scenario: Advisor panel is asserted

- **WHEN** a smoke test verifies advisor output
- **THEN** the assertion MUST target the real advisor surface instead of a broad selector that can match unrelated layout elements

### Requirement: Server-only AI secrets

The system SHALL keep AI provider configuration and credentials server-only.

#### Scenario: Public browser bundle is inspected

- **WHEN** public client code is built
- **THEN** AI provider keys and non-public proxy configuration MUST NOT be exposed through `NEXT_PUBLIC_*` variables or client component props

### Requirement: Stable public smoke baseline

The system SHALL keep the public-site smoke suite green enough to serve as the activation gate for future public-route migration work.

#### Scenario: Public smoke suite is used as a migration gate

- **GIVEN** a future child change wants to activate a migrated public route
- **WHEN** maintainers use the smoke suite as release proof
- **THEN** the suite MUST not already be red from unrelated known baseline failures

