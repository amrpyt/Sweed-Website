## ADDED Requirements

### Requirement: Active pages use accepted visual baseline
The system SHALL render public pages from the accepted legacy `site/` HTML/CSS visual source until typed components pass visual parity.

#### Scenario: About page is opened
- **WHEN** a visitor opens `/about`
- **THEN** the page MUST visually match the accepted legacy about page source

### Requirement: No non-gated component replacement
The system SHALL NOT replace active public pages with typed summaries or visually different React sections.

#### Scenario: Typed page implementation is incomplete
- **WHEN** a typed page implementation does not match the legacy screenshot baseline
- **THEN** it MUST remain inactive and the route MUST use the legacy visual baseline

