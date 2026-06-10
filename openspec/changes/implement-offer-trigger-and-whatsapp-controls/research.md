# Research Brief

## Scope

Implement a simple internal control surface plus runtime behavior for timed section offers and WhatsApp CTA flows, using the existing SWEED Next.js architecture and the earlier analytics planning decisions.

## Research Questions

- What is the smallest safe control surface we can ship now?
- How should settings persist without introducing a full database migration?
- Where should runtime popup logic live so all marketing pages can reuse it?

## Sources Reviewed

| Source | Type | URL | Used For | Confidence |
|---|---|---|---|---|
| plan-behavioral-analytics-and-whatsapp-funnel research (accessed 2026-06-09) | Repo research | Local OpenSpec change | Reuse prior analytics and identity decisions | High |
| Next.js route handlers docs (accessed 2026-06-09) | Official docs | https://nextjs.org/docs/app/building-your-application/routing/router-handlers | Admin JSON save/load route | High |
| Next.js Server and Client Components docs (accessed 2026-06-09) | Official docs | https://nextjs.org/docs/app/getting-started/server-and-client-components | Keep settings load on server and timers in client | High |
| SWEED local repo patterns (accessed 2026-06-09) | Repository evidence | `src/app/admin/ai-debug`, `src/app/api/admin/ai-debug`, `src/features/legacy-site/legacy-page.tsx` | Reuse existing admin/debug and global-public-page patterns | High |

## Official Documentation Findings

- Route Handlers are a clean fit for JSON save/load endpoints inside `src/app/api`.
- Server Components should load server-side data, while Client Components should handle timers, state, and browser APIs such as `localStorage`, `sessionStorage`, and `IntersectionObserver`.

## GitHub / Ecosystem Evidence

- Current SWEED repo already has a working admin/debug page plus matching API route pattern, so we should copy that pattern for the offer/WhatsApp controls.
- Current public pages all pass through `LegacyPage`, making it the right shared runtime injection point for the popup controller.

## Reuse-First Options

| Option | Source | Fit | Tradeoffs | Decision |
|---|---|---|---|---|
| Reuse existing admin page + API pattern | Local repo | Best fit | Needs a small new feature module | Use |
| Persist settings in a lightweight JSON file under `.mastra-data` | Local repo + deployment constraints | Smallest working durable solution now | Not ideal for multi-instance/serverless scale later | Use now |
| Add a full DB-backed admin config system | General option | Stronger long-term | Bigger scope than needed now | Reject for now |

## Capability Map And Change Decomposition

| Capability | Suggested Change Name | Depends On | Why Separate | Verification Target |
|---|---|---|---|---|
| Timed offer control panel | `implement-offer-trigger-and-whatsapp-controls` | analytics planning change | Gives full operator control quickly | Unit + smoke + build |
| Analytics event capture later | `integrate-openreplay-and-core-events` | This change optional | Keep this slice focused on control and runtime | Future change |

## Recommended Execution Order

1. Add settings contract and pure helpers with RED tests.
2. Add server-side settings store and admin API.
3. Add admin control page.
4. Add shared runtime popup controller on marketing pages.
5. Verify unit, build, and smoke behavior.

## Best Practices

- Keep popup settings in one validated contract.
- Keep server persistence separate from client timer logic.
- Keep visitor identity pseudonymous with `visitor_id` and `session_id`.
- Keep WhatsApp link generation as a pure tested helper.

## Common Pitfalls And Mitigations

| Pitfall | Why It Matters | Mitigation | Source |
|---|---|---|---|
| Mixing storage and UI logic | Hard to test and maintain | Separate contracts, server store, client controller | Repo architecture |
| Treating click as confirmed lead | Inflated business numbers | Track click intent only in this phase | Prior analytics research |
| Shipping a control panel with no validation | Broken runtime from bad values | Use Zod schema for every save | Repo testing patterns |

## Production Readiness Checklist

- [x] Security concerns identified
- [x] Accessibility concerns identified
- [x] Performance concerns identified
- [x] Error/loading/empty states identified
- [x] i18n/RTL concerns identified
- [x] Deployment/rollback concerns identified
- [x] Testing strategy identified

## Recommended Direction

- Build a small internal control page backed by a validated JSON settings store.
- Inject one shared client controller into `LegacyPage` so all public routes inherit the feature automatically.
- Keep the design modular so later analytics integration can plug in without rewriting the popup engine.

## Open Questions

- None blocking implementation for this first slice.
