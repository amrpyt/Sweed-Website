## ADDED Requirements

### Requirement: Visitor interest analytics

The system SHALL track which page section a visitor is currently engaged with, how long they stay there, and whether they progress into offer or WhatsApp conversion events.

#### Scenario: Visitor stays in a section

- **GIVEN** a visitor is viewing a tracked public page section
- **WHEN** the visitor remains actively engaged with that section
- **THEN** the system SHALL record section identity, dwell duration, session identity, and related conversion events in the analytics platform

### Requirement: Visitor drill-down dashboard

The system SHALL provide an internal dashboard where the team can inspect visitor sessions, interest areas, drop-offs, and conversion actions.

#### Scenario: Team reviews a high-intent visitor path

- **WHEN** an internal user opens the analytics dashboard
- **THEN** they SHALL be able to review the visitor's session, visited sections, dwell timings, and whether the visitor clicked the offer CTA or WhatsApp CTA

### Requirement: Pseudonymous primary identity

The system SHALL use a pseudonymous visitor/session identity as the primary analytics key and SHALL NOT rely on raw IP address as the main visitor identifier.

#### Scenario: Multiple visitors share the same network

- **WHEN** multiple visitors access the website from the same IP range or shared IP
- **THEN** the analytics model SHALL still distinguish sessions without depending on raw IP as the main identity

## MODIFIED Requirements

### Requirement: Responsive visual quality
The system SHALL render professionally across mobile, tablet, and desktop without text overflow, incoherent overlap, or broken RTL/LTR mixed content, and analytics or popup instrumentation SHALL NOT break the usability of the public experience.

#### Scenario: Timed popup appears on mobile
- **WHEN** a timed popup is triggered on a mobile viewport
- **THEN** the popup MUST remain readable, dismissible, and not block the page permanently

## REMOVED Requirements
