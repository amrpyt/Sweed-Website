## 1. Memory Contract

- [x] 1.1 Add `threadId` and `resourceId` to the advisor request contract
- [x] 1.2 Persist/generate stable visitor and thread identifiers in the widget
- [x] 1.3 Pass identifiers to Mastra `generate`/`stream`
- [x] 1.4 Set Mastra Memory `lastMessages` to `5`
- [x] 1.5 Remove or reduce manual browser-sent history once Mastra memory is authoritative

## 2. Verification

- [x] 2.1 Add unit coverage for request contract limits and identifiers
- [x] 2.2 Add service test proving memory options use last 5 messages
- [x] 2.3 Smoke test a two-turn advisor conversation
- [x] 2.4 Run `bun run unit`
- [x] 2.5 Run `bun run typecheck`
- [x] 2.6 Run `bun run lint`
- [x] 2.7 Validate OpenSpec change
