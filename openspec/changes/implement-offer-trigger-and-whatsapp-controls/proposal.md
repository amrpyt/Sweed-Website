## Why

SWEED needs the timed offer and WhatsApp flow now, and the team also needs a simple place to control it without touching code. The smallest reliable path is a simple internal control page plus one shared runtime controller across the public site.

## What Changes

Add a validated settings model, a durable server-side settings store, an admin control page, an admin JSON API, and a shared public runtime controller that uses the saved settings for section dwell and site dwell popups.

## Capabilities

### New Capabilities

- `offer-funnel-control-surface`: Internal page and API to manage offer and WhatsApp settings.

### Modified Capabilities

- `conversion-trigger-popups`: Make popup behavior operator-controlled through saved settings.
- `whatsapp-intent-funnel`: Make WhatsApp CTA content and routing operator-controlled through saved settings.
- `marketing-site-experience`: Add reusable timed offer runtime behavior on public pages.

## Research Basis

- Next.js official docs support route handlers for JSON endpoints and client components for timer/browser logic.
- The current repo already has matching admin/API patterns we can reuse.
- Earlier analytics planning already established pseudonymous visitor identity and WhatsApp click intent semantics.

## Out of Scope

- Full analytics dashboard.
- OpenReplay/PostHog integration.
- Auth system for the admin page.
- Confirming inbound WhatsApp messages automatically.

## Assumptions

- A file-backed settings store is acceptable for the first production slice.
- Public pages will continue to render through `LegacyPage` during this phase.

## Impact

- Affected areas: new feature module for offer funnel logic, `LegacyPage`, admin routes, and smoke/unit tests.
- Main risk: file-backed settings are not ideal for multi-instance hosting later, but are acceptable for this first control-first slice.
