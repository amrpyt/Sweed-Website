## MODIFIED Requirements

### Requirement: Admin-configurable WhatsApp funnel

The system SHALL allow an operator to configure WhatsApp funnel settings from an internal admin page.

#### Scenario: Egyptian phone input

- **GIVEN** the operator enters `01068274662`
- **WHEN** a visitor clicks the WhatsApp CTA
- **THEN** the generated WhatsApp link SHALL use `201068274662`

#### Scenario: Protected admin surface

- **GIVEN** admin credentials are configured in environment variables
- **WHEN** a request reaches `/admin/offer-funnel` or `/api/admin/offer-funnel`
- **THEN** the request SHALL require Basic Auth credentials before returning admin data
