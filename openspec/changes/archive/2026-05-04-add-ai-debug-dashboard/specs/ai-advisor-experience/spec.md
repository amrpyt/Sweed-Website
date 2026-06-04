## MODIFIED Requirements

### Requirement: Mastra server adapter boundary

The AI advisor SHALL isolate Mastra/model/provider behavior behind a server-side adapter boundary and expose local debug visibility for runtime behavior.

#### Scenario: Model provider changes

- **WHEN** developers replace the Rork OpenAI-compatible proxy with another provider
- **THEN** they MUST be able to update the server adapter without rewriting the popup UI

#### Scenario: Operator inspects advisor behavior locally

- **WHEN** an operator opens the local AI debug dashboard
- **THEN** they MUST see recent advisor questions, responses, fallback status, duration, runtime model status, system prompt, and current curated knowledge
- **AND** the dashboard MUST not be indexed by search engines
- **AND** production exposure MUST require an explicit enablement flag until authentication is added

