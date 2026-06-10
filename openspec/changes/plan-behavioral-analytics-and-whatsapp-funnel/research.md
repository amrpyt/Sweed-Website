# Research Brief

## Scope

Research the best way to add visitor-behavior analytics, section dwell tracking, time-based conversion popups, WhatsApp click-to-chat conversion, and an internal analytics dashboard to the SWEED marketing site without inventing a full analytics stack from scratch.

This research must answer two big questions before any code starts:

- Which open-source or open-core product can cover most of the analytics and dashboard needs?
- Which parts are still worth building as small SWEED-specific logic instead of forcing a third-party tool to do everything?

## Research Questions

- What open-source stack best fits section-level dwell tracking, funnels, dashboards, and session-level drill-down for a Next.js site?
- Can we rely on IP address as the main visitor identity?
- Can an off-the-shelf tool handle the popups and WhatsApp CTA flow, or should that stay as lightweight custom site logic?
- What privacy and consent risks appear when tracking visitors at session or IP level?

## Sources Reviewed

| Source | Type | URL | Used For | Confidence |
|---|---|---|---|---|
| OpenReplay GitHub repository (accessed 2026-06-09) | GitHub | https://github.com/openreplay/openreplay | Confirm open-source/self-host product scope | High |
| OpenReplay Next.js docs (accessed 2026-06-09) | Official docs | https://docs.openreplay.com/en/using-or/next/ | Confirm Next.js integration path | High |
| OpenReplay Custom Events docs (accessed 2026-06-09) | Official docs | https://docs.openreplay.com/en/product-analytics/custom-events/ | Confirm custom event capture for section dwell and popup triggers | High |
| OpenReplay Data Management docs (accessed 2026-06-09) | Official docs | https://docs.openreplay.com/en/product-analytics/data-management/ | Confirm event and property management for analytics | High |
| OpenReplay Funnels docs (accessed 2026-06-09) | Official docs | https://docs.openreplay.com/en/product-analytics/funnels | Confirm funnel analysis support | High |
| OpenReplay Dashboards docs (accessed 2026-06-09) | Official docs | https://docs.openreplay.com/zh/v1.22.0/product-analytics/dashboards/ | Confirm custom dashboard support | Medium |
| OpenReplay Heatmaps docs (accessed 2026-06-09) | Official docs | https://docs.openreplay.com/en/product-analytics/heatmaps/ | Confirm page/section visual behavior analysis | High |
| OpenReplay anonymous ID docs (accessed 2026-06-09) | Official docs | https://docs.openreplay.com/en/sdk/set-user-anonymous-id/ | Confirm pseudonymous visitor identity support | High |
| PostHog GitHub repository (accessed 2026-06-09) | GitHub | https://github.com/posthog/PostHog | Confirm open-source/open-core breadth: analytics, web analytics, replay, feature flags, surveys | High |
| Matomo heartbeat timer FAQ (accessed 2026-06-09) | Official docs | https://matomo.org/faq/how-to/faq_21824/ | Confirm time-on-page measurement concepts | High |
| Matomo visitor IP FAQ (accessed 2026-06-09) | Official docs | https://matomo.org/faq/how-to/faq_150/ | Confirm IP-based visitor views are possible | High |
| Matomo privacy settings FAQ (accessed 2026-06-09) | Official docs | https://matomo.org/faq/general/configure-privacy-settings-in-matomo/ | Confirm privacy implications of IP and visitor-level tracking | High |

## Official Documentation Findings

- OpenReplay is self-hosted and open-source, and its official docs show direct Next.js integration guidance. This fits SWEED's current Next.js architecture well.
- OpenReplay supports custom events, user properties, funnels, dashboards, heatmaps, and session replay. That means most analytics and dashboard needs already exist without building a custom analytics product.
- OpenReplay supports anonymous user IDs. This is a better primary identity than raw IP addresses for a marketing website.
- PostHog's official GitHub/readme positioning is broader than OpenReplay: analytics, web analytics, session replay, feature flags, experiments, and surveys. This makes it stronger for in-product campaigns and growth tooling, but its open-source/self-host story is more open-core and more product-platform-heavy.
- Matomo documents heartbeat timers, visitor IP reports, visitor profiles, and privacy controls very clearly. It is strong for classic web analytics and compliance-aware visitor reporting.
- Matomo's own privacy guidance makes an important point: IP addresses are personal data in many contexts, masked IPs may still be personal data, and using full IPs for analytics may require consent depending on jurisdiction and setup.

## GitHub / Ecosystem Evidence

- OpenReplay's GitHub repo describes itself as session replay, product analytics, and cobrowsing that you can self-host. This is a strong fit for SWEED because the user asked for open-source and wants per-visitor journey understanding.
- PostHog's GitHub repo describes itself as open-source and lists product analytics, web analytics, session replays, feature flags, and surveys. This is attractive if SWEED later wants growth experiments and in-product messaging from one platform.
- SWEED's current repo is a Next.js 16 App Router site with Bun, Playwright smoke tests, and modular route work already in progress. That means adding a client tracker plus lightweight server enrichment is feasible without changing the core stack.

## Reuse-First Options

| Option | Source | Fit | Tradeoffs | Decision |
|---|---|---|---|---|
| OpenReplay as primary analytics platform | OpenReplay docs + GitHub | Best fit for self-hosted open-source analytics, session replay, funnels, dashboards, custom events | Popup engine still needs SWEED-specific frontend logic | Use |
| PostHog as primary platform | PostHog GitHub/readme | Strong fit if we want surveys/flags/experiments in one stack | More open-core/platform-heavy; self-hosting and edition tradeoffs need deeper follow-up | Investigate later |
| Matomo as primary platform | Matomo docs | Strong fit for classic visitor analytics, IP/location reporting, and privacy controls | Less naturally aligned with session replay + on-site conversion nudges | Backup option |
| Full custom analytics/dashboard in SWEED app | Local repo only | Maximum flexibility | Reinvents ingestion, storage, dashboards, filters, funnels, and visitor drill-down | Reject |
| Hybrid: OpenReplay + lightweight SWEED popup engine + WhatsApp deep links | OpenReplay docs + local repo | Best balance of reuse and custom business logic | Needs small custom tracking and popup UI work | Use |

## Capability Map And Change Decomposition

| Capability | Suggested Change Name | Depends On | Why Separate | Verification Target |
|---|---|---|---|---|
| Analytics vendor decision and data model | `choose-analytics-stack-and-visitor-identity` | None | Locks architecture before tracking code | OpenSpec review + source-backed decision |
| Tracker integration and event schema | `integrate-openreplay-and-core-events` | Vendor decision | Adds base SDK, session identity, section events | Build, smoke, event proof |
| Section dwell + popup triggers | `implement-section-dwell-and-offer-triggers` | Tracker integration | Adds the business rules for 60s/90s triggers | Unit tests + browser proof |
| WhatsApp conversion funnel | `wire-whatsapp-cta-and-prefilled-messages` | Tracker integration, popup triggers | Adds CTA behavior and conversion events | Browser proof + event proof |
| Internal analytics dashboards | `configure-visitor-funnel-and-interest-dashboards` | Tracker integration | Mostly platform configuration plus saved views | Dashboard screenshots/manual review |
| Privacy, consent, and data retention | `harden-analytics-privacy-and-retention` | Vendor decision | Needed before production rollout | Config review + legal checklist |

## Recommended Execution Order

1. `choose-analytics-stack-and-visitor-identity`
2. `integrate-openreplay-and-core-events`
3. `implement-section-dwell-and-offer-triggers`
4. `wire-whatsapp-cta-and-prefilled-messages`
5. `configure-visitor-funnel-and-interest-dashboards`
6. `harden-analytics-privacy-and-retention`

## Best Practices

- Do not use raw IP as the primary visitor identity. Use anonymous visitor ID plus session ID as the main key, and keep IP only as optional server-side enrichment.
- Keep analytics event names explicit and stable, for example `section_view_started`, `section_dwell_60s`, `site_dwell_90s`, `offer_popup_shown`, `offer_popup_cta_clicked`, `whatsapp_redirect_opened`.
- Treat popup rules as product logic inside SWEED, not as analytics-vendor logic, because the rules are specific to this business.
- Save dashboards in the analytics platform instead of rebuilding a full dashboard UI inside the SWEED app unless there is a strong business reason.
- Respect privacy from day one: consent, masking, retention, and data minimization must be designed up front if visitor-level drill-down is enabled.

## Common Pitfalls And Mitigations

| Pitfall | Why It Matters | Mitigation | Source |
|---|---|---|---|
| Using IP as the main customer identifier | Many users can share IPs, and one user can change IPs often; privacy risk is high | Use anonymous visitor ID + session ID, keep IP as metadata only | Matomo privacy docs, OpenReplay anonymous ID docs |
| Assuming WhatsApp click equals captured lead | A click only opens chat; the visitor still needs to press send | Track click separately from confirmed inbound WhatsApp message | Product flow reasoning |
| Building custom dashboards too early | Reinvents charts, filters, retention, funnels, and drill-down | Use OpenReplay or Matomo dashboards first | OpenReplay dashboard/funnel docs |
| Overtracking sensitive data | Visitor-level tools can capture more than intended | Use privacy controls, sanitization, and strict event payload schema | OpenReplay sanitize docs, Matomo privacy docs |
| Mixing popup logic with analytics SDK logic | Hard to test and maintain | Keep analytics capture layer separate from popup decision engine | Modular design best practice |

## Production Readiness Checklist

- [x] Security concerns identified
- [x] Accessibility concerns identified
- [x] Performance concerns identified
- [x] Error/loading/empty states identified
- [x] i18n/RTL concerns identified
- [x] Deployment/rollback concerns identified
- [x] Testing strategy identified

## Recommended Direction

- Use OpenReplay as the primary open-source analytics stack for SWEED.
- Do not build a full analytics backend or dashboard from scratch.
- Build only three custom layers in SWEED:
  1. section dwell detector,
  2. popup/offer decision engine,
  3. WhatsApp CTA message builder.
- Use anonymous visitor/session identity as the main model.
- Treat raw IP as secondary metadata only, not the core identifier.
- If later SWEED wants no-code growth experiments, surveys, and richer feature-flag-driven campaigns, evaluate PostHog as a second-phase alternative.

## Open Questions

- Does SWEED want to self-host analytics on its own VPS, or is managed hosting acceptable if the platform is still open-source/open-core?
- Is legal/privacy review needed before enabling visitor-level session replay in production?
