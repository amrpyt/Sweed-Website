## MODIFIED Requirements

### Requirement: Mastra server adapter boundary

The AI advisor SHALL isolate Mastra/model/provider behavior behind a server-side adapter boundary and SHALL allow the operator to control the advisor business prompt through Mastra Studio.

#### Scenario: Operator edits prompt in dashboard

- **WHEN** the operator edits and publishes the advisor instructions in Mastra Studio
- **THEN** future advisor responses MUST use the published prompt version
- **AND** no code change or site redeploy SHOULD be required for ordinary prompt wording changes

#### Scenario: Prompt version rollback

- **WHEN** the operator rolls back to a previous published prompt version
- **THEN** future advisor calls MUST use that restored version
- **AND** the previous version history MUST remain inspectable in Studio

#### Scenario: Runtime safety is not prompt-dependent

- **WHEN** a visitor sends sensitive data or unsafe content
- **THEN** server-side safety checks MUST still run even if the dashboard prompt is edited incorrectly
