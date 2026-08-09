# Apply better-layout to the homepage

## Why

The current homepage is functionally stable but still has layout drift: section headers do not all share one alignment axis, major content shells use several unrelated widths, separator lines are doing grouping work that spacing should do, and long repeated sections create excessive mobile scroll depth.

The `/better-layout` skill is the design basis for this pass. The relevant principles are:

- group with space before separator lines,
- align repeated content to shared edges or a shared center axis,
- order small-screen content by importance,
- reveal hidden horizontal content with an obvious cue,
- choose breakpoints from content fit,
- keep RTL direction logic in logical properties.

## What changes

- Normalize the homepage content shell around one primary max width while preserving intentional narrow reading measures.
- Re-center Portfolio and Articles section introductions so homepage headings follow the same center axis.
- Remove decorative header separator lines where whitespace already communicates grouping.
- Simplify the Why-SWEED point grid so whitespace carries grouping instead of a dense table of rules.
- Make Services, Offers, and Articles progressively compact on small screens: repeated media/cards become mobile-first horizontal or reduced-detail layouts, with visible next-item peeking where content scrolls horizontally.
- Remove fixed text-height assumptions from Offers so Arabic copy can grow safely.
- Keep existing routes, content, tracking hooks, accessibility behavior, and brand styling intact.

## Boundaries

- Do not change public copy or route structure.
- Do not add another CSS framework or design system.
- Do not remove required service/offer/article content from the DOM.
- Do not introduce autoplay carousels.
- Do not push to GitHub.

## Outcome

The homepage reads as one composition instead of independent blocks, mobile scroll depth is materially reduced, hidden content remains discoverable, and the layout remains robust across RTL, 320px, tablet, desktop, and zoom stress.