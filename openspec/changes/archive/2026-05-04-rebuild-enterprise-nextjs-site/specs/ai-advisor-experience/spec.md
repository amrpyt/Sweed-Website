## ADDED Requirements

### Requirement: Mock AI advisor popup
The system SHALL provide a polished AI advisor popup that helps visitors understand needs, compare packages, and reach a recommended next action using mocked deterministic logic in v1.

#### Scenario: Visitor opens advisor
- **WHEN** a visitor opens the AI advisor popup
- **THEN** the advisor MUST show a conversational interface with suggested prompts or choices

#### Scenario: Visitor asks for package recommendation
- **WHEN** a visitor answers package-related prompts
- **THEN** the advisor MUST return a plausible package recommendation and contact action without requiring a live AI backend

### Requirement: Future Mastra adapter boundary
The AI advisor SHALL isolate scripted v1 logic behind an adapter boundary that can later be replaced by a Mastra-powered implementation.

#### Scenario: Mastra integration is planned
- **WHEN** developers prepare a future Mastra integration
- **THEN** they MUST be able to replace the advisor response source without rewriting the popup UI

### Requirement: Services AI demo section
The services experience SHALL include an interactive AI/automation demo section that presents mocked automation behavior in a client-impressive way.

#### Scenario: Visitor interacts with AI demo
- **WHEN** a visitor selects a demo scenario inside services
- **THEN** the section MUST show staged AI/automation output, status changes, and a relevant call-to-action

### Requirement: Honest v1 behavior
The v1 AI surfaces SHALL avoid depending on real external AI services and SHALL not fail when API keys are absent.

#### Scenario: AI environment variables are missing
- **WHEN** no AI or Mastra environment variables exist
- **THEN** the advisor and demo MUST still render and operate as mocked experiences

