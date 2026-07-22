# DEC-007 — Use the SWEED compass as diagnostic UI, not decoration

Date: 2026-07-23
Status: accepted
Related task: SWEED-010

## Context

The homepage problems section used a detailed traditional compass image between six selectable customer-problem cards. The image reinforced SWEED’s direction metaphor, but it behaved as decoration and visually conflicted with the surrounding modern interface. The cards also repeated several choice indicators: number, icon, radio-like empty circle, and selected checkmark.

## Decision

- Replace the traditional compass image with a custom inline SVG `SWEED Direction Dial`.
- Map the six approved problem statements to six stable dial nodes and six needle angles.
- Keep the SVG decorative while exposing the selected service and solution in a polite live region.
- Treat the center as a diagnostic result hub: no CTA is available before selection; after selection it preserves the approved problem-to-service conversion context.
- Communicate selected card state through the full card surface, icon treatment, and a textual `اختيارك` badge instead of radio/check duplication.
- Keep the dial motion short, transform-only, and disabled under reduced motion.

## Alternatives Considered

### Keep the existing compass and only refine spacing

Rejected. It would preserve the main visual mismatch and leave the center decorative rather than useful.

### Replace the compass with a static modern icon

Rejected. It would improve style but not create a stronger decision experience or justify the central position.

### Use a radar chart or route map

Not selected. Both could work, but the direction dial preserves SWEED’s established compass metaphor while creating a more ownable brand object.

## Consequences

- The section now gives immediate feedback and recommended direction instead of only recording a choice.
- The dial becomes a reusable SWEED visual motif rather than a generic stock compass.
- The result and CTA stay tied to existing conversion data, so no backend or content-model migration is required.
- Future problem additions require an intentional node/angle update; the current six-node contract is explicit.

## Verification

- The old compass image is absent from the problems section DOM.
- Right-side and left-side selections produced distinct `54deg` and `-126deg` needle transforms.
- Selected service, problem, and source remained correct in conversion state and contact context.
- Desktop, tablet, mobile, keyboard focus, reduced motion, console, and overflow checks passed.

## Revisit Trigger

Revisit if the problem list changes from six items, the homepage conversion model changes, or SWEED supplies an approved final brand symbol that should replace the central `S` mark.
