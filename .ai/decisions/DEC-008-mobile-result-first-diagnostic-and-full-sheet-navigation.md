# DEC-008 — Mobile result-first diagnostic and full-sheet navigation

Date: 2026-07-23
Status: accepted
Related task: SWEED-011

## Context

The desktop problem diagnostic and inline navigation worked, but their scaled-down phone versions were visually heavy:

- The 390px problem section was about 1287px tall.
- Six independent cards appeared before a 416px dial/result block.
- The mobile menu was a generic dropdown list without a clear mobile composition.

The phone context needs quick scanning, 44px+ touch targets, progressive disclosure, and minimal vertical waste. The user explicitly rejected the existing mobile visual quality.

## Decision

### Problems diagnostic

- Preserve the six approved statements and direction-dial behavior.
- Reorder the phone composition so the direction/result module appears before the choices.
- Compress the dial and live result into one horizontal deep-purple module.
- Render the six choices inside one bordered diagnostic list with neutral separators instead of six floating cards.
- Use a compact selected state and retain the exact problem/service/source conversion mapping.
- Use two columns in phone landscape to avoid a needlessly long single-column list.

### Navigation

- Preserve inline navigation on desktop.
- Use a 64px phone header with a single clear menu trigger.
- Open a full-height sheet below the header, not a side drawer.
- Present numbered route rows, a clear active state, and a bottom primary CTA.
- Use `overscroll-behavior: contain` rather than mutating `document.body.style`.
- Handle same-page hash links explicitly so the menu closes and the destination is positioned below the fixed header.

## Alternatives Considered

### Keep six independent cards and only shrink the dial

Rejected. It reduced one large element but preserved card soup and the wrong information order.

### Hide most problems behind a carousel or accordion

Rejected. It would conceal core diagnostic choices and introduce unnecessary interaction cost.

### Use a side drawer for navigation

Rejected. The user already requested conventional non-side navigation, and a full-width sheet better matches the mobile context.

### Lock body scrolling by mutating inline overflow

Rejected after implementation testing. It interfered with same-page anchor navigation and violated the project lint rule. Full-screen containment provides the required behavior without global style mutation.

## Consequences

- The 390px problems section dropped from about 1287px to about 910px while preserving all six choices.
- The dial/result block dropped from about 416px to about 146px.
- Phone landscape uses two columns and reduced the section to about 716px.
- The mobile menu fits without scrolling at 320x700 and in 844x390 landscape.
- Same-page navigation now closes the sheet and scrolls the target to approximately the 65px header offset.
- Desktop layouts and route structure remain unchanged.

## Verification

- 320, 360, 390, 844x390, 768, 1024, and 1440 viewports passed without horizontal overflow or clipped problem copy.
- Problem 01 and problem 06 retained their expected angles, services, and conversion context.
- Menu click, Escape close, focus restoration, active route, and same-page destination behavior passed.
- Reduced motion kept all content visible and disabled needle animation.
- Check, build, service health, public HTTP, browser errors, console, and image checks passed.

## Revisit Trigger

Revisit if the problem count changes, the mobile navigation information architecture changes, or real-device testing identifies a platform-specific issue not reproduced by browser emulation.
