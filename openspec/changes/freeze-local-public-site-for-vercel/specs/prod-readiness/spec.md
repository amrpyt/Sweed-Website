## MODIFIED Requirements

### Requirement: Production deploy source consistency

The project SHALL deploy the same tracked runtime snapshot that was verified locally.

#### Scenario: Local public site freeze

- **GIVEN** public site changes exist locally
- **WHEN** the site is deployed to Vercel
- **THEN** the deployed app SHALL be built from a tracked snapshot that includes the public routes, content, legacy adapters, admin funnel, and backend integration files
