## ADDED Requirements

### Requirement: Internal offer control page

The system SHALL provide an internal page where the SWEED team can edit the timed offer and WhatsApp CTA settings without changing code.

#### Scenario: Team updates popup settings

- **WHEN** an internal user changes popup thresholds, text, or WhatsApp settings and saves
- **THEN** the system SHALL validate and persist the new settings for future public visitors

### Requirement: Shared public runtime controller

The system SHALL apply the saved offer and WhatsApp settings across public marketing pages through one shared runtime controller.

#### Scenario: Visitor reaches a dwell threshold

- **GIVEN** the feature is enabled
- **WHEN** a visitor reaches the configured section or site dwell threshold
- **THEN** the system SHALL show the configured popup and CTA content

### Requirement: Pseudonymous visitor state

The system SHALL manage popup cooldowns and visitor state using pseudonymous client-side identifiers instead of raw IP.

#### Scenario: Returning visitor has already seen the popup

- **WHEN** the same pseudonymous visitor returns within the configured cooldown window
- **THEN** the system SHALL respect the saved cooldown rule before showing the same offer again

## MODIFIED Requirements

### Requirement: Section dwell offer trigger

The system SHALL trigger a section-specific offer popup when a visitor stays engaged with the same tracked section for at least the configured threshold, and the threshold SHALL be editable from the control surface.

#### Scenario: Operator changes the threshold

- **WHEN** the team saves a new section dwell threshold
- **THEN** future popup triggers MUST use the new saved threshold

### Requirement: Site-wide dwell offer trigger

The system SHALL trigger a stronger sales-funnel popup when a visitor stays on the site for at least the configured total active threshold, and the threshold SHALL be editable from the control surface.

#### Scenario: Operator disables the site-wide popup

- **WHEN** the team disables the site-wide popup in the control surface
- **THEN** the 90-second style site-wide popup MUST stop triggering for future visitors

### Requirement: WhatsApp CTA with contextual message

The system SHALL generate a WhatsApp click-to-chat CTA with a prefilled message that includes the current section or offer context, and the phone number, CTA label, and message template SHALL be editable from the control surface.

#### Scenario: Team changes the WhatsApp text template

- **WHEN** the team saves a new WhatsApp template
- **THEN** future CTA links MUST use the saved template

## REMOVED Requirements
