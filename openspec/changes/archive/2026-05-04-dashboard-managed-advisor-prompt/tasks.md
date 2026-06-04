## 1. Prompt Source Of Truth

- [x] 1.1 Confirm the current Mastra Editor storage is durable for local and deployment environments
- [x] 1.2 Move the advisor business instructions into a Studio-managed published draft
- [x] 1.3 Update runtime resolution so published Editor instructions override the code seed
- [x] 1.4 Keep the code prompt as first-run fallback only
- [x] 1.5 Document which guardrails remain code-enforced and not prompt-owned

## 2. Verification

- [x] 2.1 Test changing instructions in Studio and publishing them
- [x] 2.2 Verify the next advisor call uses the published prompt
- [x] 2.3 Verify rollback to an older prompt version works
- [x] 2.4 Run `bun run unit`
- [x] 2.5 Run `bun run typecheck`
- [x] 2.6 Run `bun run lint`
- [x] 2.7 Validate OpenSpec change
