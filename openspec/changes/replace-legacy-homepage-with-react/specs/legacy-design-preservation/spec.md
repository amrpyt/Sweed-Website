## MODIFIED Requirements

### Requirement: Legacy visual source for non-migrated pages

The system SHALL render non-migrated public pages from the existing `site/pages/` HTML files without using `v2/` or `v3/` as visual sources.

#### Scenario: Home page is migrated

- **WHEN** a visitor opens `/`
- **THEN** the page MUST render from modular React homepage components

#### Scenario: Internal page renders legacy design

- **WHEN** a visitor opens an internal route such as `/offers`
- **THEN** the page MUST render content, colors, styles, and sections from the matching `site/pages/*.html` file.
