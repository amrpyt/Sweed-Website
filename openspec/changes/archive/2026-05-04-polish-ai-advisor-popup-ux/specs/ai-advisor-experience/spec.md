# ai-advisor-experience Delta

## MODIFIED Requirements

### Requirement: Real AI advisor popup

The system SHALL provide a polished AI advisor popup backed by a server-side Mastra agent that helps visitors understand needs, compare services/packages, and choose a recommended next action.

#### Scenario: Visitor opens advisor

- **WHEN** a visitor opens the AI advisor popup
- **THEN** the advisor MUST show a conversational interface with suggested prompts or choices
- **AND** it MUST clearly behave as a real interactive assistant, not a static mock
- **AND** the open popup MUST present a branded, readable messenger layout without showing a duplicate launcher beneath it

#### Scenario: Visitor opens advisor on mobile

- **WHEN** a visitor opens the AI advisor popup on a narrow viewport
- **THEN** the advisor MUST use a mobile-friendly bottom-sheet layout
- **AND** primary controls MUST remain easy to tap and visible above the safe area

#### Scenario: Visitor asks for package recommendation

- **WHEN** a visitor asks for a package or service recommendation
- **THEN** the server-side advisor MUST answer from SWEED website knowledge
- **AND** it MUST return a plausible recommendation and contact action
- **AND** it MUST not require the browser to know model provider secrets
