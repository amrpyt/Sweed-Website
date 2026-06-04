## MODIFIED Requirements

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
