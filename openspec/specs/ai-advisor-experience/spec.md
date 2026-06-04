# ai-advisor-experience Specification

## Purpose
Defines the SWEED public AI advisor, services AI demo, Mastra runtime boundary, operator visibility, memory behavior, and guardrails.
## Requirements
### Requirement: Real AI advisor popup

The system SHALL provide a polished AI advisor popup backed by a server-side Mastra agent that helps visitors understand needs, compare services/packages, and choose a recommended next action.

#### Scenario: Visitor opens advisor

- **WHEN** a visitor opens the AI advisor popup
- **THEN** the advisor MUST show a conversational interface with suggested prompts or choices
- **AND** it MUST clearly behave as a real interactive assistant, not a static mock
- **AND** the open popup MUST present a branded, readable messenger layout without showing a duplicate launcher beneath it
- **AND** the initial state MUST feel like a simple polished support messenger rather than a crowded card stack
- **AND** UI motion MUST provide subtle feedback without distracting from the conversation

#### Scenario: Visitor opens advisor on mobile

- **WHEN** a visitor opens the AI advisor popup on a narrow viewport
- **THEN** the advisor MUST use a mobile-friendly bottom-sheet layout
- **AND** primary controls MUST remain easy to tap and visible above the safe area

#### Scenario: Visitor asks for package recommendation

- **WHEN** a visitor asks for a package or service recommendation
- **THEN** the server-side advisor MUST answer from SWEED website knowledge
- **AND** it MUST return a plausible recommendation and contact action
- **AND** it MUST not require the browser to know model provider secrets

#### Scenario: Visitor asks advisor on production

- **WHEN** the production deployment receives a valid advisor request
- **THEN** the server-side advisor MUST have access to the required provider environment configuration
- **AND** it MUST return a real advisor response instead of the provider-missing fallback

### Requirement: Mastra server adapter boundary

The AI advisor SHALL isolate Mastra/model/provider behavior behind a server-side adapter boundary and SHALL expose local Studio diagnostics required for operator inspection.

#### Scenario: Operator opens Mastra Studio locally

- **WHEN** an operator runs the Mastra development server
- **THEN** Mastra Studio MUST expose the SWEED advisor agent
- **AND** the operator MUST be able to inspect agent metadata, system prompt, logs, traces, and metrics surfaces where the configured local providers support them

#### Scenario: Operator opens local logs

- **WHEN** an operator opens the Studio Logs page in local development
- **THEN** the runtime MUST use a queryable logging transport
- **AND** the page MUST NOT fail because the storage provider cannot list logs

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

