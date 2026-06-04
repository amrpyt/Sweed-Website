## 1. Knowledge Boundary

- [x] 1.1 Define a structured knowledge shape for services, offers, FAQs, CTAs, and qualification rules
- [x] 1.2 Create dashboard-managed prompt/knowledge blocks in Mastra Studio
- [x] 1.3 Replace hard-coded `buildSweedKnowledge()` as the primary runtime source
- [x] 1.4 Keep a safe first-run seed for local development only
- [x] 1.5 Add validation so missing required knowledge sections produce a clear operator error

## 2. Future CMS Compatibility

- [x] 2.1 Keep the knowledge boundary compatible with future Sanity CMS documents
- [x] 2.2 Document how Studio-managed knowledge maps to future CMS content types

## 3. Verification

- [x] 3.1 Test editing service/package knowledge in Studio
- [x] 3.2 Verify advisor answers change after publishing dashboard data
- [x] 3.3 Verify advisor refuses to invent prices when the published data does not include them
- [x] 3.4 Run `bun run unit`
- [x] 3.5 Run `bun run typecheck`
- [x] 3.6 Run `bun run lint`
- [x] 3.7 Validate OpenSpec change
