## ADDED Requirements

### Requirement: Section dwell offer trigger

The system SHALL trigger a section-specific offer popup when a visitor stays engaged with the same tracked section for at least 60 seconds.

#### Scenario: Visitor stays 60 seconds in one section

- **GIVEN** a visitor remains on a tracked section while the page is visible
- **WHEN** the dwell threshold reaches 60 seconds
- **THEN** the system SHALL show an offer popup mentioning a 48-hour discount of 10% for that context

### Requirement: Site-wide dwell offer trigger

The system SHALL trigger a stronger sales-funnel popup when a visitor stays on the site for at least 90 seconds.

#### Scenario: Visitor stays 90 seconds on the site

- **GIVEN** a visitor remains active on the website across one or more tracked sections
- **WHEN** total active site dwell reaches 90 seconds
- **THEN** the system SHALL show a stronger offer popup tied to the visitor's current interest area

### Requirement: Popup frequency guard

The system SHALL prevent repeated aggressive popup spam for the same visitor within the configured cooldown window.

#### Scenario: Visitor already saw an offer popup recently

- **WHEN** the same visitor returns within the active cooldown window
- **THEN** the system SHALL suppress duplicate timed offers unless explicitly re-armed by business rules

## MODIFIED Requirements

### Requirement: Conversion-oriented navigation
The system SHALL provide clear desktop and mobile navigation with visible routes and primary contact actions, and timed conversion popups SHALL support the same conversion goals without replacing core navigation access.

#### Scenario: Popup is dismissed
- **WHEN** a visitor dismisses a timed popup
- **THEN** the page navigation and content flow MUST remain usable without hidden overlays or broken focus behavior

## REMOVED Requirements
