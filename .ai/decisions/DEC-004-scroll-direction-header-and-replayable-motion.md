# DEC-004 — Scroll-direction header and replayable motion

Date: 2026-07-22
Status: accepted

## Context

The public header used `position: sticky`, but browser verification showed it moving to `top=-2500` at `scrollY=2500`, so it did not remain recoverable. A fixed GradualBlur overlay occupied the top 88px, the progress bar visually competed with the header, and multiple reveal systems permanently stopped after their first viewport entry.

## Decision

- Use a fixed header with an explicit responsive spacer.
- Hide/reveal the header from scroll direction using accumulated-distance hysteresis and a throttled passive scroll listener.
- Animate header visibility with `transform` only.
- Keep the header visible while navigation is open or keyboard focus is inside it.
- Keep the progress indicator independent, fixed at the viewport top, and above the header.
- Use a CSS Scroll Progress Timeline for the visual indicator with an imperative transform fallback and throttled ARIA updates.
- Remove the global top GradualBlur overlay entirely.
- Make viewport reveal systems replayable by default.
- Use GSAP `toggleActions: "restart none restart reset"` for non-scrub ScrollTriggers.
- Reset/replay metric counters on IntersectionObserver exit/re-entry.
- Preserve fully visible, non-animated content for reduced-motion users.

## Alternatives Considered

### Keep `position: sticky`

Rejected because the current runtime demonstrated that the header left the viewport under the existing page/smooth-scroll environment.

### Use an always-visible fixed header

Rejected because it permanently consumes vertical space and conflicts with the user's desired hide-on-down/show-on-up behavior.

### Drive all scroll behavior through GSAP

Rejected for the header and progress indicator. Navigation visibility should remain independent from the page animation library, and CSS Scroll Timelines provide a lower-overhead progress path.

### Replay every hero page-load animation

Rejected. The initial hero choreography remains a page-load signature; replay applies to viewport-triggered section motion.

## Rationale

This separates three responsibilities: navigation state, reading progress, and section animation. Each system can be verified and maintained independently, while transform/opacity-based motion avoids layout changes during scroll.

## Consequences

- Header behavior is deterministic on desktop and mobile.
- Progress stays visible even while the header is hidden.
- Scroll animations can replay frequently, so thresholds and durations must remain restrained.
- The CSS timeline needs a fallback for browsers without support.
- Fixed header height changes must also update the spacer breakpoint values.

## Revisit Trigger

Revisit if the site removes Lenis, adopts native CSS view timelines for all reveals, changes header height, or introduces an application shell with a different navigation model.
