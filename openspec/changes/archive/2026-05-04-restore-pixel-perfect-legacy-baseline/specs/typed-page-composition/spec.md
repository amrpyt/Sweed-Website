## MODIFIED Requirements

### Requirement: Typed route page composition
Each public route SHALL render from typed React/TypeScript page compositions only after those compositions pass visual parity against the accepted legacy source. Until then, the route SHALL use the legacy baseline renderer.

#### Scenario: Public route source is inspected before visual parity
- **WHEN** a componentized route has not passed screenshot parity
- **THEN** the route MUST render through the legacy baseline renderer

#### Scenario: Public route source is inspected after visual parity
- **WHEN** a componentized route passes screenshot parity
- **THEN** the route MAY render through typed React components and MUST preserve the accepted visual experience

