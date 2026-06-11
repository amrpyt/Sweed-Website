## ADDED Requirements

### Requirement: Shared chrome does not duplicate during hydration

The system SHALL avoid legacy normalization output that causes shared chrome to duplicate or destabilize during client hydration.

#### Scenario: Shared footer is rendered on mobile

- **GIVEN** a visitor opens a public route on a mobile viewport
- **WHEN** the page hydrates
- **THEN** the shared footer SHALL remain a single consistent footer instance
