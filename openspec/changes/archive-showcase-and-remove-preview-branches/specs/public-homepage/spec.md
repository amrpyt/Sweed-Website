## MODIFIED Requirements

### Requirement: Current Homepage Remains Primary
The public site SHALL keep the accepted homepage as the primary `/` experience.

#### Scenario: Rejected preview route is removed
- **WHEN** a visitor opens `/homepage-v2`
- **THEN** the app SHALL NOT serve the rejected experimental homepage preview
- **AND** the accepted homepage SHALL remain available at `/`

### Requirement: Showcase Concepts Are Archived
Rejected or non-client-approved homepage concepts that remain useful as portfolio/demo material SHALL be preserved outside active app routes.

#### Scenario: V3 showcase remains recoverable
- **WHEN** the V3 branch is deleted
- **THEN** its source SHALL remain available in `.archive/showcase/sweed-agency-v3-demo`
- **AND** the archive SHALL include instructions for running it locally
