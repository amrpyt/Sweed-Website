## MODIFIED Requirements

### Requirement: Responsive smoke coverage

The system SHALL verify key pages at representative desktop and mobile viewport sizes and SHALL include fast unit tests for server-side advisor contracts before full browser smoke tests.

#### Scenario: Unit tests run

- **WHEN** unit tests run
- **THEN** they MUST cover AI advisor request validation
- **AND** they MUST cover server-only AI configuration behavior that affects runtime calls
- **AND** they MUST cover sensitive-data guardrails before model calls

#### Scenario: Smoke tests run

- **WHEN** browser smoke tests run
- **THEN** they MUST cover home, services, offers, articles, contact, mobile navigation, real AI advisor entry points, and real AI demo entry points
