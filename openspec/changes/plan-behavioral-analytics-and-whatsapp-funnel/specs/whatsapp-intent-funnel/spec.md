## ADDED Requirements

### Requirement: WhatsApp CTA with contextual message

The system SHALL generate a WhatsApp click-to-chat CTA with a prefilled message that includes the section or offer context the visitor was interested in.

#### Scenario: Visitor clicks WhatsApp CTA from an offer popup

- **GIVEN** a visitor clicks the popup CTA
- **WHEN** the WhatsApp redirect is opened
- **THEN** the prefilled message SHALL include the relevant section or interest context

### Requirement: Separate click intent from confirmed conversation

The system SHALL distinguish between a WhatsApp CTA click and a confirmed inbound WhatsApp message.

#### Scenario: Visitor opens WhatsApp but does not send

- **WHEN** a visitor clicks the CTA and WhatsApp opens but no conversation is actually sent
- **THEN** the system SHALL record this as click intent, not as a confirmed captured lead

### Requirement: Track WhatsApp funnel events

The system SHALL record the major conversion states around WhatsApp intent.

#### Scenario: WhatsApp funnel is analyzed

- **WHEN** the team reviews the analytics funnel
- **THEN** the system SHALL expose at least popup shown, popup dismissed, CTA clicked, and WhatsApp redirect opened as distinct events

## MODIFIED Requirements

### Requirement: Visitor wants to contact SWEED
The system SHALL provide clear contact actions from any major page, and WhatsApp conversion flows SHALL preserve context about the visitor's currently viewed offer or section.

#### Scenario: Visitor contacts from a high-intent section
- **WHEN** a visitor opens contact through the contextual WhatsApp CTA
- **THEN** the outbound message MUST reflect the section or offer that triggered the CTA

## REMOVED Requirements
