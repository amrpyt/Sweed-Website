# DEC-003 — Standard Navigation and Natural Services Flow

Date: 2026-07-22
Status: accepted

## Context

The public site used a staggered side-opening menu for primary navigation and a GSAP-pinned stack for six homepage services. The interactions hid core navigation, inflated scroll distance, overlapped service panels, and forced mobile users into a wide horizontal carousel without clear controls.

## Decision

- Use a conventional sticky navigation bar with visible inline desktop links.
- Use a full-width dropdown below the header on mobile instead of a side drawer.
- Present services in normal document flow as a vertical semantic list.
- Keep a sticky contextual introduction on larger screens, but never pin or hide service content.
- Treat motion as optional enhancement; content must be fully available without JavaScript animation.

## Alternatives Considered

### Keep and polish StaggeredMenu

Rejected because the user explicitly wants normal navigation and because primary routes should not require an extra interaction on desktop.

### Keep the pinned service stack with adjusted timing

Rejected because the underlying architecture—not timing—caused artificial height, overlapping panels, poor scanning, and fragile responsive behavior.

### Replace services with a six-card grid

Rejected because six identical cards would repeat a generic marketing-page pattern and reduce hierarchy. A structured list supports comparison and natural reading better.

### Keep the mobile horizontal carousel with arrows

Rejected because all six core services should remain discoverable without requiring a hidden secondary gesture.

## Rationale

- Conventional navigation reduces interaction cost and improves route discoverability.
- Natural document flow is more robust for accessibility, responsive layout, reduced motion, browser rendering, and content scanning.
- The list-based service composition preserves imagery and hierarchy without producing six identical cards.
- Measured QA confirms the new structure eliminates overflow, overlap, and artificial scroll distance.

## Consequences

### Positive

- Desktop navigation is immediately visible.
- Mobile navigation remains compact but no longer enters from the side.
- Services can be scanned, linked, and read without scroll choreography.
- Services no longer require GSAP client runtime.
- CSS and component complexity are substantially lower.

### Tradeoffs

- The services section is less theatrical than a pinned animation.
- Mobile page length is naturally longer because all six services are visible vertically.
- A few component-local brand color values remain and may be promoted to shared tokens later.

## Verification or Revisit Trigger

Revisit only if user research shows a clear need for stronger service filtering/comparison, or if the navigation label count grows beyond the available desktop width. Do not reintroduce hidden desktop navigation or pinned content stacks without measured evidence.
