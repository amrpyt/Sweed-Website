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

### Requirement: Mastra server adapter boundary

The AI advisor SHALL isolate Mastra/model/provider behavior behind a server-side adapter boundary.

#### Scenario: Model provider changes

- **WHEN** developers replace the Rork OpenAI-compatible proxy with another provider
- **THEN** they MUST be able to update the server adapter without rewriting the popup UI

### Requirement: Services AI demo section

The services experience SHALL include an interactive AI/automation demo section powered by the same server-side advisor boundary.

#### Scenario: Visitor interacts with AI demo

- **WHEN** a visitor selects or submits a demo scenario inside services
- **THEN** the section MUST call the server advisor boundary
- **AND** it MUST show AI-generated staged output, status changes, and a relevant call-to-action

### Requirement: Safe AI fallback

The AI surfaces SHALL fail gracefully when server AI configuration or provider calls fail.

#### Scenario: AI provider is unavailable

- **WHEN** the Mastra/provider call fails or times out
- **THEN** the advisor and demo MUST show a helpful contact-oriented fallback
- **AND** the page MUST not crash

### Requirement: Advisor guardrails

The advisor SHALL stay scoped to SWEED services and avoid unsafe data collection or unsupported claims.

#### Scenario: Visitor asks unrelated or sensitive questions

- **WHEN** a visitor asks outside SWEED scope or provides sensitive data
- **THEN** the advisor MUST redirect to SWEED-relevant help or contact
- **AND** it MUST not ask for passwords, payment details, national IDs, or sensitive legal/medical data
- **AND** it MUST not claim that external actions were completed
