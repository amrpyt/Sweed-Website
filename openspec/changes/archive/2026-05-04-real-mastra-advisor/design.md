## Context

The repo currently contains old typed AI surfaces under `src/features/ai-advisor`, but active pages render legacy-backed pages. The existing OpenSpec active spec still describes a mock advisor. The user now wants a real visitor-facing AI advisor using Mastra and an OpenAI-compatible Rork proxy.

Mastra is a TypeScript agent framework with agents, tools, workflows, memory, guardrails, tracing, and model-provider support. For this site, the first useful production slice is a constrained advisor agent, not a fully autonomous automation system.

## Architecture

```
Visitor Browser
  |
  | POST /api/ai/advisor
  v
Next.js Route Handler
  |
  | validates input, strips unsafe fields, rate-limits later
  v
SWEED Advisor Service
  |
  | builds website knowledge context
  v
Mastra Agent
  |
  | OpenAI-compatible model provider
  v
Rork OpenAI Proxy
```

## Components

### 1. UI Client Islands

- `AiAdvisorWidget`: floating popup, chat messages, quick prompts, loading/error states, recommendation CTA.
- `AutomationDemo`: services-page interactive demo. It sends a scenario and receives an AI-generated analysis, recommendation, and next step.

Both components call first-party API routes only.

### 2. Server API

- `POST /api/ai/advisor`
  - Input: visitor message, conversation snapshot, mode: `advisor | automation-demo`.
  - Output: assistant message, recommended service/package, CTA, grounded references.
  - Rejects oversized input.
  - Never accepts or returns secrets.

### 3. Knowledge Layer

Create a compact server-side knowledge builder from existing local content and legacy-safe config:

- Services and service details.
- Offers/packages.
- FAQ answers.
- Public contact info.
- Useful page/section URLs.

This is not vector RAG yet. It is deterministic curated context, which is enough for the current website size and safer for v1.

### 4. Mastra Agent Layer

The `sweedAdvisorAgent` instructions:

- Speak Arabic by default.
- Answer only about SWEED services, packages, website, automation demos, and contact paths.
- Recommend one clear next step.
- If pricing is missing, say it needs team confirmation.
- Do not claim that messages/bookings/payments were sent.
- Ask for only low-risk lead info: name, company, phone/email if the user voluntarily provides it.
- Do not request passwords, payment info, national IDs, or sensitive legal/medical data.

### 5. Environment

```env
OPENAI_BASE_URL="https://rork-openai-proxy-v2.amremaad11.workers.dev/v1"
OPENAI_API_KEY="sk-rorkproxy12345"
AI_MODEL="gpt-4o-mini"
```

All variables are server-only. They must not use `NEXT_PUBLIC_`.

## Fallback Behavior

If AI env vars are missing or the proxy fails, UI should not crash. It should show a graceful message:

"المساعد غير متاح الآن، تواصل معنا وسنرشح لك الباقة المناسبة."

This fallback is an error state, not the primary product behavior.

## Guardrails

- Scope guard: refuse unrelated topics and redirect to SWEED services.
- Grounding guard: answer from current site knowledge only.
- Sensitive-data guard: avoid collecting high-risk data.
- Action guard: no external side effects in this phase.
- Timeout guard: fail quickly and show contact CTA.

## Testing Strategy

- Unit tests for knowledge builder and request validation.
- API smoke test with mocked model provider if possible.
- Browser smoke for advisor open/send/reply state and automation-demo send/reply state.
- Build, lint, and typecheck gates.

## Open Questions

- Whether the Rork proxy accepts `sk-rorkproxy12345` universally or needs a different server-only key in deployment.
- Whether we deploy on Vercel or another host; env setup differs.
