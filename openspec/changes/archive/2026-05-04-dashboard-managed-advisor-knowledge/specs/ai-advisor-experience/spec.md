## MODIFIED Requirements

### Requirement: Mastra server adapter boundary

The AI advisor SHALL isolate Mastra/model/provider behavior behind a server-side adapter boundary and SHALL use dashboard-managed knowledge as its primary answer source.

#### Scenario: Operator updates advisor knowledge

- **WHEN** the operator edits and publishes SWEED service, offer, FAQ, or CTA knowledge in the dashboard
- **THEN** future advisor responses MUST use the published knowledge
- **AND** ordinary business-data changes MUST NOT require code edits

#### Scenario: Knowledge is missing a fact

- **WHEN** the published knowledge does not include a requested price, feature, or policy
- **THEN** the advisor MUST say that the SWEED team should confirm it
- **AND** it MUST NOT invent details outside the published knowledge

#### Scenario: Future CMS source is introduced

- **WHEN** Sanity CMS is introduced later
- **THEN** it MUST be able to provide the same structured knowledge boundary
- **AND** the public advisor UI MUST NOT need to be rewritten
