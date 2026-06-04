## MODIFIED Requirements

### Requirement: Real AI advisor popup

The system SHALL provide a polished AI advisor popup backed by a server-side Mastra agent that helps visitors understand needs, compare services/packages, and choose a recommended next action.

#### Scenario: Visitor opens advisor

- **WHEN** a visitor opens the AI advisor popup
- **THEN** the advisor MUST show a conversational interface with suggested prompts or choices
- **AND** it MUST clearly behave as a real interactive assistant, not a static mock

#### Scenario: Visitor asks for package recommendation

- **WHEN** a visitor asks for a package or service recommendation
- **THEN** the server-side advisor MUST answer from SWEED website knowledge
- **AND** it MUST return a plausible recommendation and contact action
- **AND** it MUST not require the browser to know model provider secrets

#### Scenario: Advisor renders formatted response

- **WHEN** the model returns Markdown such as bold text, lists, or internal links
- **THEN** the advisor popup MUST render it as polished chat content
- **AND** it MUST not show raw Markdown syntax or malformed internal-link markup to visitors

