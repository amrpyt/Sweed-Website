## Context

The user wants the timed offer and WhatsApp flow now and also wants full operator control, even if the control UI is simple. The current SWEED repo already has a lightweight admin/debug pattern and a shared public-page runtime boundary through `LegacyPage`, so the smallest reliable design is to reuse both.

## Goals / Non-Goals

**Goals:**

- Give the team one simple internal page to control timed popup and WhatsApp behavior.
- Persist settings durably enough for current hosting.
- Apply settings across all public pages from one shared runtime.
- Keep the code modular and testable.

**Non-Goals:**

- Full analytics or dashboards.
- Lead confirmation automation from WhatsApp replies.
- Production-grade auth hardening in this same slice.

## Source-Grounded Decisions

| Decision | Rationale | Alternatives Considered | Sources |
|---|---|---|---|
| Reuse admin page + API route pattern | Keeps the implementation consistent with repo patterns | Build a separate mini app or raw HTML file | Local repo evidence |
| Use a file-backed settings store under `.mastra-data` | Smallest durable option with no DB migration today | Add DB tables now, use only localStorage | Local repo context |
| Load settings on server and run timers in a client component | Matches Next.js server/client best practices | Fetch everything from client only | Next.js Server and Client Components docs |
| Inject runtime through `LegacyPage` | One shared point for all public pages | Duplicate the controller on every route | Local repo architecture |

## Reuse / Library Strategy

- Reuse `zod` already in the repo for settings validation.
- Reuse the `admin/ai-debug` route pattern for the control surface and JSON API.
- Reuse `localStorage` and `sessionStorage` for pseudonymous visitor state and cooldowns.

## Architecture / Data Flow

1. Server reads settings from `.mastra-data/offer-funnel-settings.json`.
2. Admin page loads current settings and exposes a simple form.
3. Admin form submits JSON to `/api/admin/offer-funnel`.
4. Route handler validates payload with Zod and persists the new settings.
5. Public `LegacyPage` loads the saved settings and passes them to a client controller.
6. Client controller:
   - creates or reuses `visitor_id`
   - creates `session_id`
   - detects active section
   - counts active visible time
   - applies cooldown logic
   - renders popup UI
   - builds WhatsApp deep link with section context

## Production Readiness

- Security: page is internal-purpose only and should be protected later; for now keep robots off and call out the risk.
- Accessibility: popup must be dismissible and keyboard reachable.
- Performance: use a single observer + one interval tick, not per-section timers.
- Rollback: disable feature from the saved settings if needed.
- Maintainability: separate modules for contracts, server store, client controller, and WhatsApp helpers.

## Risks / Trade-offs

- Risk: file-backed store is weak for multi-instance scale -> Mitigation: isolate storage layer so it can move to DB later.
- Risk: no auth yet on admin page -> Mitigation: clearly mark as internal and add env gate later if needed.
- Risk: false active-time counting on background tabs -> Mitigation: pause timers when `document.visibilityState !== "visible"`.

## Verification Strategy

- RED-first unit tests for settings schema and WhatsApp link builder.
- Add server-store tests for read/write/default behavior.
- Add smoke test for the admin control page and public popup shell behavior.
- Run `bun run unit`, `bun run typecheck`, `bun run lint`, `bun run build`, `bun run smoke`, and OpenSpec validation.
