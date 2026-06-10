## MODIFIED Requirements

### Requirement: Admin-configurable WhatsApp funnel

The system SHALL render the offer funnel admin page with readable Arabic labels and helper text.

#### Scenario: Corrupted stored copy

- **GIVEN** persisted offer settings contain replacement question-mark text
- **WHEN** the admin page loads
- **THEN** the page SHALL show clean Arabic defaults instead of question marks

#### Scenario: Admin typography

- **GIVEN** the operator opens the offer funnel admin page
- **WHEN** the page renders
- **THEN** the dashboard SHALL use Tajawal typography
