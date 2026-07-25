# DEC-011 — Responsive methodology scroll story

Date: 2026-07-25
Status: accepted
Related task: SWEED-019

## Context

The About-page methodology already used a scrubbed GSAP timeline, but its unpinned trigger interval was too short. All five stages appeared almost simultaneously, so the ordered process was not communicated clearly.

A full pinned experience on every viewport would create a second problem: the vertical phone layout is taller than the viewport and pinning it would hide content or feel like scroll trapping.

## Decision

Use three responsive motion strategies through `gsap.matchMedia`:

1. **Desktop and large tablet** — pin the viewport-fit inner methodology stage beneath the fixed header. Allocate measured scroll distance across five timeline positions, synchronize the path, progress indicator, current/completed/future states, and release after stage five has a visible hold.
2. **Phone** — keep the semantic five-step list in natural document flow. Scrub the vertical path and activate each step as it crosses the reading zone; do not pin.
3. **Short landscape/compact viewport** — show the complete methodology statically with no pin or decorative progress control.
4. **Reduced motion** — disable pinning and animation entirely; expose all content and full paths immediately.

Stage semantics are derived from the scrubbed GSAP timeline playhead rather than raw wheel events or unsmoothed trigger progress.

## Alternatives Considered

### Pin the complete section on every viewport

Rejected. The mobile list exceeds the viewport height and would make content inaccessible or create scroll trapping.

### Keep the original unpinned reveal and increase duration

Rejected. Duration does not create usable scroll distance; the five stages would still compete within one short section interval.

### Use scroll snap between stages

Rejected. Snap changes user scroll behavior and is unnecessary for communicating this sequence.

### Build a custom wheel/touch controller

Rejected. It would duplicate browser scrolling, conflict with Lenis, and create accessibility and maintenance risk.

## Rationale

- The pinned desktop stage fits within the verified viewport and gives each ordered step enough attention.
- Natural-flow mobile preserves readability and native touch scrolling.
- Existing Lenis already synchronizes with ScrollTrigger; no second ticker or scroller proxy is needed.
- `gsap.context`, `gsap.matchMedia`, `ScrollTrigger.saveStyles`, and cleanup prevent duplicate triggers and pin spacers across responsive changes and route transitions.
- Semantic ordered-list content remains present before animation and in all fallback modes.

## Consequences

- The desktop About page becomes longer by roughly four viewport heights while the methodology is active.
- The interaction differs intentionally by viewport capability.
- Future methodology content changes must preserve five timeline positions or update the stage-position model and QA samples.
- The fixed header offset remains part of the pinned layout contract.

## Verification

- Desktop stage samples progressed 01→05 at measured scroll fractions and reversed correctly.
- Pin released before `#numbers`, with stage five visibly active beforehand.
- Tablet content remained fully inside the viewport.
- Phone and short-landscape modes created no pin spacer.
- Desktop→mobile→desktop resize produced pin-spacer counts 1→0→1.
- Reduced motion exposed all steps and full paths with no pin.
- CLS remained `0`; no console/browser errors or horizontal overflow were found.

## Revisit Trigger

Revisit if the number of stages changes, the fixed-header height changes, or mobile content is redesigned into a viewport-fit single-stage presentation.
