# DEC-005 — Controlled Cinematic Motion System

Date: 2026-07-22
Status: accepted

## Context

SWEED already used Lenis, GSAP, ScrollTrigger, and several isolated reveal components. The pieces worked independently but did not form a coherent motion direction. Public routes had no shared entrance, the hero used a manual scroll listener, timings/easings differed, and mobile/reduced-motion behavior was handled inconsistently across effects.

## Decision

Adopt **SWEED Controlled Cinematic Motion** as the public-site motion direction:

- Shared motion timing and easing tokens.
- Lenis inertia on desktop only; native scroll on mobile and reduced-motion environments.
- RequestAnimationFrame-throttled global scroll progress, velocity, and direction signals.
- One short route entrance through the App Router template.
- ScrollTrigger-scrubbed hero depth and mask choreography.
- CSS View Timeline motion only for ordered list content where motion supports reading flow.
- Transform, opacity, clip-path, and small bounded effects; no scroll hijacking or full-page pinned narratives.
- Global reduced-motion fallback that keeps all content visible.

## Alternatives Considered

### Add more isolated GSAP effects

Rejected. It would increase visual inconsistency and maintenance cost without creating a shared rhythm.

### Use WebGL, custom cursor, and aggressive Awwwards-style effects

Rejected. The performance and usability cost is not justified for SWEED's conversion-focused audience.

### Remove smooth scrolling and all advanced motion

Rejected. Existing desktop Lenis integration performs well, and restrained motion supports the agency's premium positioning.

### Use Framer Motion across the application

Rejected for now. GSAP and Lenis are already installed and integrated; adding another animation runtime would duplicate responsibility.

## Rationale

The system gives SWEED a premium Framer/Webflow-like feel while preserving discoverability, mobile-native behavior, accessibility, and performance. It centralizes the rules rather than making every section invent its own animation language.

## Consequences

- Public route templates remount with a 320–420ms entrance.
- Desktop scroll publishes CSS signals for future restrained motion work.
- Essential content remains in natural document flow.
- New motion should use the shared tokens and fit the defined budget.
- Admin/API routes remain outside the system.

## Verification

- `bun run check` and production build passed.
- Desktop, tablet, mobile, and reduced-motion browser QA passed.
- Desktop Lenis active; mobile/reduced-motion Lenis disabled.
- Hero elements showed distinct scrubbed transforms and mask progress.
- Service list uses supported View Timelines with visible fallback.
- Route entrance completes and veil becomes hidden.
- CLS measured `0`; LCP measured about `1.16s` in the browser test.
- No browser errors, broken images, or horizontal overflow.

## Revisit Trigger

Revisit if Core Web Vitals regress, users report motion discomfort, or the site moves to a different animation/runtime architecture.
