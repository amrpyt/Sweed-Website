## ADDED Requirements

### Requirement: Stable public smoke baseline

The system SHALL keep the public-site smoke suite green enough to serve as the activation gate for future public-route migration work.

#### Scenario: Public smoke suite is used as a migration gate

- **GIVEN** a future child change wants to activate a migrated public route
- **WHEN** maintainers use the smoke suite as release proof
- **THEN** the suite MUST not already be red from unrelated known baseline failures

## MODIFIED Requirements

### Requirement: Responsive smoke coverage

The system SHALL verify key pages at representative desktop and mobile viewport sizes, and the baseline smoke cases SHALL use stable user-facing selectors and runtime-safe assertions.

#### Scenario: Smoke tests run

- **WHEN** browser smoke tests run
- **THEN** they MUST cover home, services, offers, articles, contact, mobile navigation, real AI advisor entry points, and real AI demo entry points

#### Scenario: Advisor panel is asserted

- **WHEN** a smoke test verifies advisor output
- **THEN** the assertion MUST target the real advisor surface instead of a broad selector that can match unrelated layout elements
