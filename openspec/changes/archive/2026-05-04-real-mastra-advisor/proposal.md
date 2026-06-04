## Why

SWEED needs a real AI advisor that visitors can try, not only a mock. The advisor should answer from SWEED website knowledge, recommend services/packages, and support an impressive services automation demo while keeping API keys server-only.

## What Changes

- Replace the current mock-only advisor contract with a Mastra-backed server advisor.
- Add a server API boundary for chat/advisor requests so the browser never talks directly to the model proxy.
- Use the OpenAI-compatible Rork proxy:
  - `OPENAI_BASE_URL=https://rork-openai-proxy-v2.amremaad11.workers.dev/v1`
  - `AI_MODEL=gpt-4o-mini`
  - `OPENAI_API_KEY` server-only, dummy-compatible if the proxy accepts it.
- Ground answers in SWEED website knowledge: services, packages, FAQ, contact details, and relevant section links.
- Add guardrails for scope, pricing uncertainty, sensitive data, and escalation to contact.
- Add a real AI-powered services automation demo that calls the same server boundary with scenario-specific prompts.

## Non-Goals

- Do not let the AI send messages, create bookings, charge money, or mutate external systems in this phase.
- Do not expose provider keys or proxy URLs to the browser.
- Do not add Sanity CMS in this change.
- Do not build long-term persisted user memory until storage/privacy policy is defined.

## Impact

- Affected specs: `ai-advisor-experience`, `quality-production-readiness`.
- Affected code areas after approval: `src/features/ai-advisor`, new server API route, new server-side Mastra/knowledge modules, tests, environment docs.
