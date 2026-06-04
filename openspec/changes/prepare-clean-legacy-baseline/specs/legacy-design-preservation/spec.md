## MODIFIED Requirements

### Requirement: Exact legacy visual source
The system SHALL render public pages from the existing `site/` HTML files without using `v2/` or `v3/` as visual sources, and repository cleanup SHALL NOT replace that active legacy structure or visual baseline.

#### Scenario: Home page renders legacy design
- **WHEN** a visitor opens `/`
- **THEN** the page MUST render content, colors, styles, and sections from `site/index.html`

#### Scenario: Internal page renders legacy design
- **WHEN** a visitor opens an internal route such as `/services`
- **THEN** the page MUST render content, colors, styles, and sections from the matching `site/pages/*.html` file

#### Scenario: Baseline cleanup is performed
- **WHEN** repository hygiene work is completed before large future changes
- **THEN** the active public routes MUST still use the preserved legacy renderer and `site/` HTML visual source
