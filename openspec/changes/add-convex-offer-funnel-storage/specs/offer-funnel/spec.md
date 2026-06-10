## MODIFIED Requirements

### Requirement: Admin-configurable WhatsApp funnel

The system SHALL persist offer funnel settings in a serverless production-safe backend.

#### Scenario: Production settings persistence

- **GIVEN** the site is deployed on Vercel
- **WHEN** an authenticated operator saves offer funnel settings
- **THEN** the settings SHALL be stored in Convex and returned on later public API requests
