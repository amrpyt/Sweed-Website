# Design Notes

## Approach

Use a CSS/backdrop-filter based blur stack with multiple masked layers. Mount the component as fixed overlays at the top and bottom of the page so it adds depth while scrolling.

## Accessibility

The blur overlay must be `pointer-events: none` and `aria-hidden`.

Smooth scrolling must respect `prefers-reduced-motion: reduce`.

## Performance

The blur layers are fixed and few in number. Avoid scroll event loops and JavaScript scroll hijacking. Native browser scrolling remains the source of truth.
