## MODIFIED Requirements

### Requirement: Responsive smoke coverage

The system SHALL verify key pages at representative desktop and mobile viewport sizes.

#### Scenario: Smoke tests run

- **WHEN** browser smoke tests run
- **THEN** they MUST cover home, services, offers, articles, contact, mobile navigation, real AI advisor entry points, and real AI demo entry points

### Requirement: Server-only AI secrets

The system SHALL keep AI provider configuration and credentials server-only.

#### Scenario: Public browser bundle is inspected

- **WHEN** public client code is built
- **THEN** AI provider keys and non-public proxy configuration MUST NOT be exposed through `NEXT_PUBLIC_*` variables or client component props
