## Context

SWEED wants aggressive but smart conversion behavior on the marketing site: section-level timing triggers, site-wide offer triggers, WhatsApp intent capture, and internal dashboards showing who cared about what. The key constraint is that this should not become a custom analytics platform project.

Research shows that OpenReplay already covers most of the heavy lifting: Next.js integration, session replay, event capture, funnels, dashboards, heatmaps, and self-hosting. The remaining custom logic is the actual business rule layer for dwell timing and popup decisions.

## Goals / Non-Goals

**Goals:**

- Reuse an open-source analytics platform instead of building event storage and dashboards from scratch.
- Use a privacy-safer pseudonymous visitor model instead of raw IP as the core identity.
- Separate analytics capture, popup decisions, and WhatsApp CTA generation into clean modules.
- Plan the implementation as small child changes.

**Non-Goals:**

- Implement the tracker in this planning change.
- Build a custom SWEED analytics admin app.
- Treat IP as a CRM-grade customer identifier.
- Guarantee lead capture before the visitor actually sends a WhatsApp message.

## Source-Grounded Decisions

| Decision | Rationale | Alternatives Considered | Sources |
|---|---|---|---|
| Choose OpenReplay as the primary stack | Best self-hosted open-source fit with replay, funnels, dashboards, heatmaps, custom events, and Next.js guidance | PostHog, Matomo, custom build | OpenReplay docs + GitHub |
| Keep popup engine custom to SWEED | Trigger rules are business-specific and small enough to own | Force the analytics platform to own campaign logic | OpenReplay docs, repo context |
| Use anonymous visitor/session ID as primary identity | More reliable and safer than IP for repeat and shared-network cases | Raw IP as primary key | OpenReplay anonymous ID docs, Matomo privacy docs |
| Treat WhatsApp click as intent, not guaranteed lead | Visitor still has to send the message in WhatsApp | Count every CTA click as captured lead | Product flow reasoning |
| Keep dashboards inside analytics platform first | Avoids rebuilding charts, filters, funnels, and drill-down | Custom internal dashboard in SWEED | OpenReplay dashboard/funnel docs |

## Reuse / Library Strategy

- Reuse OpenReplay for event collection, dashboards, funnels, replay, heatmaps, and visitor drill-down.
- Reuse OpenReplay custom events and properties for section identifiers, dwell milestones, offer IDs, and CTA states.
- Reuse WhatsApp click-to-chat deep links for the outbound conversation start.
- Reuse existing Next.js client/server boundaries in the SWEED codebase instead of adding a second frontend framework or custom analytics backend.

## Architecture / Data Flow

1. Client analytics provider initializes OpenReplay on public pages.
2. A small section observer module watches which section is dominant in the viewport.
3. A dwell timer module tracks active visible time per section and total active site time.
4. When thresholds hit 60s or 90s, the popup decision engine emits business events and opens the proper popup.
5. The popup CTA builder constructs a WhatsApp deep link with encoded section context.
6. Analytics capture emits events such as:
   - `section_view_started`
   - `section_dwell_60s`
   - `site_dwell_90s`
   - `offer_popup_shown`
   - `offer_popup_dismissed`
   - `offer_popup_cta_clicked`
   - `whatsapp_redirect_opened`
7. Internal teams view these inside OpenReplay dashboards and funnels.
8. Optional server enrichment can attach coarse geo or anti-abuse metadata from the request IP, but this must not replace pseudonymous visitor identity.

Suggested module split for later implementation:

- `src/features/analytics/client/*`
- `src/features/analytics/server/*`
- `src/features/analytics/contracts.ts`
- `src/features/offers/popup-engine/*`
- `src/features/offers/whatsapp/*`

## Production Readiness

- Privacy: visitor-level replay and IP enrichment require explicit retention and consent decisions.
- Accessibility: timed popups must be dismissible, keyboard reachable, and focus-safe.
- Performance: timers and observers must be lightweight and pause when tab visibility is lost.
- Accuracy: dwell timing should count active visible time, not just passive tab-open time.
- Analytics truth: the system must separate "popup seen", "CTA clicked", and "WhatsApp message actually arrived" because those are not the same business stage.
- Rollback: popup engine should be easy to turn off independently from core analytics tracking.

## Risks / Trade-offs

- Risk: aggressive popups hurt UX -> Mitigation: cooldown windows, one-popup-at-a-time policy, and A/B-ready trigger thresholds later.
- Risk: IP-based logic causes false identity merges -> Mitigation: anonymous visitor ID is the main key; IP is metadata only.
- Risk: session replay captures too much -> Mitigation: use sanitization/redaction and a strict data policy before production rollout.
- Risk: analytics platform lock-in -> Mitigation: keep a clean internal event schema and isolate vendor adapter code.
- Risk: WhatsApp click overstates lead count -> Mitigation: report click intent and confirmed inbound chat as separate funnel steps.

## Verification Strategy

- In future child changes, start with contract/unit tests for dwell timer logic and popup cooldown logic.
- Use Playwright browser tests to prove section timing, popup appearance, dismissal, and CTA redirect behavior.
- Verify analytics events arrive in the chosen platform with test sessions.
- Validate OpenSpec artifacts before each implementation phase and keep privacy decisions documented before production activation.
