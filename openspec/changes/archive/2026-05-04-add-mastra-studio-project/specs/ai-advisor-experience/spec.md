## MODIFIED Requirements

### Requirement: Mastra server adapter boundary

The AI advisor SHALL isolate Mastra/model/provider behavior behind a server-side adapter boundary and SHALL expose the advisor through a real Mastra Studio project for local operator inspection.

#### Scenario: Model provider changes

- **WHEN** developers replace the Rork OpenAI-compatible proxy with another provider
- **THEN** they MUST be able to update the server adapter without rewriting the popup UI

#### Scenario: Operator opens Mastra Studio locally

- **WHEN** an operator runs the Mastra development server
- **THEN** Mastra Studio MUST expose the SWEED advisor agent
- **AND** the operator MUST be able to inspect agent metadata, system prompt, logs, traces, and metrics surfaces

#### Scenario: Operator edits prompt configuration

- **WHEN** the Mastra Editor is enabled
- **THEN** Studio MUST expose an Editor surface for the SWEED advisor
- **AND** prompt changes MUST use Mastra's draft/publish versioning model rather than direct code edits

#### Scenario: Operator reviews conversation history

- **WHEN** the SWEED advisor is called with memory thread and resource identifiers
- **THEN** Mastra MUST persist the conversation through configured storage
- **AND** Studio MUST show that memory is enabled for the agent

#### Scenario: Rork proxy compatibility

- **WHEN** the SWEED advisor calls the Rork OpenAI-compatible proxy
- **THEN** the server-side agent MUST use the chat completions-compatible model adapter
- **AND** it MUST NOT rely on the OpenAI Responses API until the proxy supports it
