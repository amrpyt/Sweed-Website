# Design

## Overview

This change uses two implementation paths:

1. A native support drawer based on `<details>/<summary>` for the shared fixed support surface.
2. A homepage-only runtime fallback script that patches the shipped legacy DOM after the page renders.

## Why This Design

- The homepage already ships large legacy HTML blobs and some client-only enhancements were not applying consistently in browser runtime.
- The support drawer needed a reliable interaction path that does not depend on React state or hydration timing.
- The remaining homepage fixes are DOM-level adjustments, so a focused runtime patch is smaller and safer than replatforming the page.

## Components

### Support Drawer

- Replace the prior stateful launcher/panel flow with native `<details>/<summary>`.
- Keep the floating WhatsApp button.
- Keep support tools visible inside the panel:
  - AI chat entry link
  - knowledge base link
  - direct WhatsApp link
  - support ticket form

### Homepage Runtime Fallback

- Render a real `<script>` element on the homepage route.
- The script:
  - converts the help service select into horizontal multi-select cards
  - assigns stable IDs to quick-help inputs
  - routes the quick-help CTA to `/contact` with prefilled query params
  - rewrites homepage service links to `/services`
  - updates the services subtitle copy
  - turns the partner list into an auto-moving single-row marquee
  - re-triggers the existing popup after the requested timing

## Boundaries

- Homepage-only runtime logic stays in the legacy page shell.
- Shared support UI remains in the AI advisor feature folder.
- No new backend APIs or schema changes.

## Verification Strategy

- TypeScript pass.
- Browser proof on `/` for:
  - support drawer opens
  - quick-help cards render
  - service links point to `/services`
  - partner marquee track exists
  - popup becomes active after ~30 seconds
