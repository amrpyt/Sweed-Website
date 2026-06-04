## 1. Mastra Studio Project

- [x] 1.1 Research current Mastra Studio, Editor, Memory, storage, and cloud deployment docs
- [x] 1.2 Install Mastra CLI with Bun
- [x] 1.3 Initialize `src/mastra`
- [x] 1.4 Register `SWEED Advisor` in Mastra
- [x] 1.5 Add `mastra:dev`, `mastra:build`, `mastra:studio:deploy`, and `mastra:server:deploy` scripts

## 2. Operator Controls

- [x] 2.1 Add Mastra Editor for prompt management in Studio
- [x] 2.2 Add Mastra Memory with LibSQL-backed local storage
- [x] 2.3 Ignore generated Mastra build and local database artifacts
- [x] 2.4 Verify Studio exposes Prompts, Editor, Memory, Logs, Traces, and Metrics surfaces

## 3. Model Compatibility

- [x] 3.1 Use `@ai-sdk/openai-compatible` for the Rork proxy chat completions endpoint
- [x] 3.2 Verify Mastra agent API can generate through the Rork proxy
- [x] 3.3 Document that Studio's built-in OpenAI provider selector calls Responses API and is not compatible with the current Rork proxy

## 4. Verification

- [x] 4.1 Run `bun run unit`
- [x] 4.2 Run `bun run typecheck`
- [x] 4.3 Run `bun run mastra:build`
- [x] 4.4 Run `bun run lint`
- [x] 4.5 Run `bun run build`
- [x] 4.6 Validate OpenSpec change
