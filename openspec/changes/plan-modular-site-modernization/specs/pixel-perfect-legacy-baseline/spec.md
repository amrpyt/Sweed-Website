## ADDED Requirements

### Requirement: Incremental typed-page activation

Typed replacements for legacy public routes SHALL be activated one route slice at a time and SHALL preserve an easy rollback path until route-level parity is proven.

#### Scenario: Typed route is not yet proven

- **GIVEN** a route has a new typed implementation but parity is not fully proven
- **WHEN** the route is evaluated for activation
- **THEN** the active visitor path MUST continue using the legacy baseline for that route

#### Scenario: Typed route is proven

- **GIVEN** a route-specific typed implementation has passed its parity and regression checks
- **WHEN** maintainers activate the typed route
- **THEN** that route MAY stop using legacy runtime body rendering without forcing unrelated routes to migrate at the same time

## MODIFIED Requirements

### Requirement: No non-gated component replacement

The system SHALL NOT replace page-specific legacy bodies with typed compositions or visually different React sections unless visual parity and regression checks are proven for that route.

#### Scenario: Typed page implementation is incomplete

- **WHEN** a typed page implementation does not match the legacy screenshot or route-behavior baseline
- **THEN** it MUST remain inactive and the route MUST use the legacy visual body baseline

#### Scenario: Typed page implementation is ready

- **WHEN** a typed page implementation matches the accepted baseline and passes route-level regression checks
- **THEN** the route MAY activate the typed implementation for that route only
