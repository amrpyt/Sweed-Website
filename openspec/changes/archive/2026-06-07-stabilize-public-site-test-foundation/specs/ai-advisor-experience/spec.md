## ADDED Requirements

### Requirement: Advisor smoke proof targets the advisor surface

Smoke verification for the public AI advisor SHALL target the advisor panel itself rather than an ambiguous layout element.

#### Scenario: Advisor reply is asserted

- **GIVEN** a smoke test opens the public advisor and sends a mocked request
- **WHEN** the response is rendered
- **THEN** the test SHALL assert the named advisor panel content instead of using a broad structural selector that can match unrelated `aside` elements
