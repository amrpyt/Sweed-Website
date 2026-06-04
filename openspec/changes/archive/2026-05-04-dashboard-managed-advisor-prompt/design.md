## Context

SWEED's advisor started with code-owned instructions so the first real AI path could ship quickly. The operator now needs the business prompt to be editable from Mastra Studio without a code change or redeploy.

Mastra Editor supports draft/publish versioning for agent configuration. Runtime code can request the published agent with `mastra.getAgentById("sweed-advisor", { status: "published" })`, while keeping the code-defined agent as a first-run fallback when no published version exists.

## Goals / Non-Goals

**Goals:**

- Make the published Mastra Studio agent instructions the runtime source of truth.
- Keep code instructions as a safe seed/fallback for local first run.
- Keep sensitive-data and external-action guardrails enforced in server code before model calls.
- Preserve operator rollback through Studio version history.

**Non-Goals:**

- Build a custom prompt CMS.
- Add lead-generation tools in this change.
- Replace Mastra Studio with the local `/admin/ai-debug` page.
- Move provider secrets or runtime wiring into editable prompts.

## Decisions

1. Use Mastra Editor as the prompt control plane.
   - Rationale: it already provides Studio editing, draft/publish, version snapshots, and rollback behavior.
   - Alternative considered: store prompts in local JSON or database rows. Rejected because it duplicates Studio and adds a second operator surface.

2. Resolve the published agent first and fall back to the code agent.
   - Rationale: production behavior follows the operator-published prompt, while local/dev still works before the first publish.
   - Alternative considered: always use the code agent. Rejected because it makes Studio edits cosmetic.

3. Keep safety checks outside the prompt.
   - Rationale: prompts are editable by operators and should not be the only protection for sensitive-data handling or unsupported external-action claims.
   - Alternative considered: include all guardrails in Studio instructions only. Rejected because prompt edits could accidentally weaken hard safety behavior.

## Risks / Trade-offs

- [Risk] Studio storage is not durable in the target deployment. -> Mitigation: keep LibSQL storage configured locally and require deployment storage selection before production Studio rollout.
- [Risk] Published prompt omits critical SWEED scope rules. -> Mitigation: keep a code seed and server-side request guardrails, and verify published prompt behavior with tests/smoke checks.
- [Risk] Rollback is operator-driven and not covered by automated UI tests. -> Mitigation: document the Studio version flow and keep code fallback available.

## Migration Plan

1. Enable `@mastra/editor` in the Mastra instance.
2. Publish the SWEED advisor instructions from Studio.
3. Update server runtime to request the published agent first.
4. Run unit/type/lint/build checks and a Studio chat smoke test.
5. If the published version breaks behavior, roll back in Studio or temporarily fall back to the code agent.

## Open Questions

- Which durable Studio storage target should be used for production deployment?
- Who will own prompt publishing permissions when Studio Auth is enabled?
