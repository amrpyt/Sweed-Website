## ADDED Requirements

### Requirement: Homepage V2 Preview

The system SHALL expose a second homepage design version without replacing the live homepage.

#### Scenario: Preview route renders

- **WHEN** a visitor opens `/homepage-v2`
- **THEN** the page renders a distinct React homepage preview
- **AND** it exposes anchors for `home`, `signals`, `offers`, `process`, `proof`, and `contact`
- **AND** the live `/` route remains unchanged.
