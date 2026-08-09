# SWEED Homepage Better Layout Plan

## Goal

Apply the `better-layout` principles to the existing homepage without changing information architecture, copy, brand, or backend behavior.

## Baseline evidence

Desktop section containers currently vary across roughly 1040px, 1220px, 1240px, 1280px, 1320px, and 1360px. Portfolio and Articles introductions use a different alignment axis from the rest of the homepage. On 390px the longest repeated sections are Services (~3333px), Offers (~2038px), and Articles (~2031px).

## Phase 1 - Alignment and grouping

1. Define one inherited homepage shell width for major content sections.
2. Preserve narrower reading measures inside the shell.
3. Center Portfolio and Articles section introductions.
4. Remove header separator lines where spacing is sufficient.
5. Replace the Why-SWEED rule grid with whitespace-driven grouping.

Gate: headings share a common center axis, major shells use one max width, no horizontal overflow.

## Phase 2 - Mobile progressive disclosure

1. Services: keep all text/actions, but deprioritize repeated imagery on narrow screens; restore image-led rows when the content can fit.
2. Offers: use a horizontal snap track on narrow screens with a visible next-card peek; restore three columns at a content-fit breakpoint.
3. Articles: use the same discoverable horizontal pattern on narrow screens; restore three columns only when cards have enough width.
4. Remove fixed text-height assumptions from offer summaries/cards.

Gate: all content remains reachable in DOM/keyboard reading order; no autoplay; next content is visibly hinted; 320px and 390px remain overflow-free.

## Phase 3 - Verification

1. `bun run check`.
2. `bun run build`.
3. Focused Playwright tests for centered headings and mobile horizontal disclosure.
4. Browser matrix at 1440x900, 1024x768, 390x844, and 320x568.
5. 200% zoom stress and reduced-motion check.
6. Restart `sweed-demo.service` and verify public HTTPS.

## Non-goals

- No new libraries.
- No content rewrite.
- No route changes.
- No new animation system.
- No Git push.