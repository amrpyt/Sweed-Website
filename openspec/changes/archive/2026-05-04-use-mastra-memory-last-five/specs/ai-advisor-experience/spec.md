## MODIFIED Requirements

### Requirement: Mastra server adapter boundary

The AI advisor SHALL isolate Mastra/model/provider behavior behind a server-side adapter boundary and SHALL use Mastra Memory for conversation context.

#### Scenario: Visitor continues a conversation

- **WHEN** a visitor sends a follow-up message in the same advisor conversation
- **THEN** the server MUST call the Mastra agent with a stable `threadId` and `resourceId`
- **AND** the agent MUST receive the last 5 stored messages as memory context
- **AND** the browser MUST NOT be the authoritative memory store

#### Scenario: New conversation starts

- **WHEN** a visitor starts a new advisor conversation
- **THEN** the system MUST create a new `threadId`
- **AND** it SHOULD keep the same visitor `resourceId` where local visitor identity is available

#### Scenario: Memory is unavailable

- **WHEN** Mastra storage or memory is unavailable
- **THEN** the advisor MUST fail gracefully to the existing fallback behavior
- **AND** it MUST NOT expose storage errors to the visitor
