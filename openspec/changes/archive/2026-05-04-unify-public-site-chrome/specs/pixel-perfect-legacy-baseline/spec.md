## MODIFIED Requirements

### Requirement: Active pages use accepted visual baseline
The system SHALL render page-specific content from the accepted legacy `site/` HTML/CSS visual source while normalizing shared chrome through shared React components.

#### Scenario: About page is opened
- **WHEN** a visitor opens `/about`
- **THEN** the page body MUST visually match the accepted legacy about page source while the top bar, header, and footer match the shared site chrome

### Requirement: No non-gated component replacement
The system SHALL NOT replace page-specific legacy bodies with typed summaries or visually different React sections unless visual parity is proven.

#### Scenario: Typed page implementation is incomplete
- **WHEN** a typed page implementation does not match the legacy screenshot baseline
- **THEN** it MUST remain inactive and the route MUST use the legacy visual body baseline

