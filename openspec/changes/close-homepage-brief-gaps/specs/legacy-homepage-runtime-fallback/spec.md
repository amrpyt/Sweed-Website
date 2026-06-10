## ADDED Requirements

### Requirement: Runtime-safe homepage brief completion
The legacy homepage SHALL apply the remaining approved brief behaviors in live browser runtime even if React hydration is delayed or unreliable.

#### Scenario: Visitor opens the homepage
- **WHEN** the homepage finishes rendering in the browser
- **THEN** the quick-help area MUST replace the service dropdown with horizontal multi-select service cards.
- **AND** the quick-help CTA MUST route to `/contact` with the chosen services and entered contact details.
- **AND** homepage service cards MUST link to `/services`.
- **AND** the services subtitle MUST show the approved expanded copy including business development.
- **AND** the hero gradient MUST include two business imagery layers behind the approved color overlay.

### Requirement: Moving success partners row
The homepage SHALL present success partners in one automatically moving row.

#### Scenario: Visitor reaches the partners section
- **WHEN** the partners section is visible
- **THEN** partner cards MUST render as a single moving track from right to left.

### Requirement: Timed homepage popup
The homepage SHALL show the approved popup timing using the existing popup surface.

#### Scenario: Visitor stays on the homepage
- **WHEN** the visitor remains on the page for about 30 seconds
- **THEN** the popup MUST become visible.
- **AND** after dismissal it MUST be eligible to appear again on the requested repeat timing.
