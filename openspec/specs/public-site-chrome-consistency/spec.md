# public-site-chrome-consistency Specification

## Purpose
TBD - created by archiving change unify-public-site-chrome. Update Purpose after archive.
## Requirements
### Requirement: Shared top bar and header
The system SHALL render the same top bar, header, logo, desktop navigation, and mobile drawer across all public routes.

#### Scenario: Public routes are inspected
- **WHEN** a visitor opens any public route
- **THEN** exactly one shared top bar and exactly one shared header MUST be rendered

### Requirement: Shared footer
The system SHALL render the same footer across all public routes instead of route-specific legacy footers.

#### Scenario: Footer is inspected
- **WHEN** a visitor opens any public route
- **THEN** exactly one shared footer MUST be rendered with consistent brand, quick links, and contact information

### Requirement: Legacy body chrome stripping
The system SHALL remove duplicated legacy top bars, headers, mobile overlays, footers, and floating buttons from legacy page bodies before rendering.

#### Scenario: Legacy page body is rendered
- **WHEN** a legacy HTML page contains its own header/footer chrome
- **THEN** those duplicated chrome elements MUST NOT render in addition to the shared chrome

