## 1. Specification And Contracts

- [x] 1.1 Update `ai-advisor-experience` from mock-first to real Mastra-first behavior
- [x] 1.2 Define API request/response contracts for advisor and automation demo
- [x] 1.3 Document server-only environment variables in `.env.example`

## 2. Server AI Layer

- [x] 2.1 Add Mastra/OpenAI-compatible dependencies using Bun
- [x] 2.2 Create server-only SWEED knowledge builder from existing content
- [x] 2.3 Create `sweedAdvisorAgent` with guardrail-focused instructions
- [x] 2.4 Create advisor service wrapper with timeout and graceful fallback
- [x] 2.5 Add `POST /api/ai/advisor`

## 3. UI Integration

- [x] 3.1 Replace mock popup logic with real API-backed chat flow
- [x] 3.2 Add loading, error, retry, and contact CTA states
- [x] 3.3 Mount advisor popup on active legacy-backed public pages
- [x] 3.4 Add services automation demo section to the active services route without redesigning existing page body
- [x] 3.5 Ensure mobile popup and demo do not overlap the menu or page content

## 4. Tests And Verification

- [x] 4.1 Add tests for knowledge builder and validation
- [x] 4.2 Add smoke coverage for advisor open/send/reply path
- [x] 4.3 Add smoke coverage for automation demo AI path
- [x] 4.4 Run `bun run typecheck`
- [x] 4.5 Run `bun run lint`
- [x] 4.6 Run `bun run smoke`
- [x] 4.7 Run `bun run build`
- [x] 4.8 Verify OpenSpec status
