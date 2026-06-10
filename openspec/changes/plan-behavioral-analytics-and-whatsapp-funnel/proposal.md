## Why

SWEED wants to understand exactly where visitors spend time, trigger smart offers based on interest, and push high-intent traffic into WhatsApp without building a whole analytics platform from zero. Research shows we can reuse a serious open-source analytics stack for most of the problem and keep only the business-specific popup and WhatsApp flow custom.

## What Changes

This change plans the analytics architecture, identity model, popup trigger model, WhatsApp conversion model, and dashboard strategy for the marketing site. It does not implement code yet.

## Capabilities

### New Capabilities

- `behavioral-analytics-dashboard`: Track visitor interest, dwell time, funnels, and session drill-down in an analytics platform dashboard.
- `conversion-trigger-popups`: Trigger section-based and site-wide timed offers using SWEED business rules.
- `whatsapp-intent-funnel`: Convert high-intent visitors into WhatsApp conversations with prefilled section-aware messages.

### Modified Capabilities

- `marketing-site-experience`: Add visitor-behavior-driven conversion surfaces to public pages.
- `prod-readiness`: Extend production readiness to include analytics privacy, retention, and consent decisions.

## Research Basis

- OpenReplay covers most of the needed analytics surface already: Next.js integration, session replay, funnels, heatmaps, custom events, and dashboards.
- PostHog is a strong future alternative if SWEED later wants feature flags, surveys, and experimentation from one growth platform.
- Matomo proves that IP-level and time-on-page analytics are possible, but its privacy guidance also shows why IP should not be our primary identity model.

## Out of Scope

- Coding the tracker integration in this change.
- Building a custom in-house dashboard UI.
- Automating inbound WhatsApp processing after the visitor lands in WhatsApp.
- Legal sign-off itself.

## Assumptions

- SWEED wants visitor-level analytics and funnels for internal team use only.
- The current Next.js/Bun/Playwright stack remains the base for future implementation.
- A lightweight first-party cookie or local storage ID is acceptable for anonymous visitor tracking if consent/legal setup allows it.

## Impact

- Affected future areas: `src/app/layout.tsx`, client analytics provider, popup components, CTA components, server-side enrichment routes if needed, and OpenSpec production/privacy documentation.
- Security/privacy impact is high enough to require explicit design before rollout.
- UX impact is meaningful because timed popups and strong CTAs can improve or hurt conversion depending on how aggressively we trigger them.
