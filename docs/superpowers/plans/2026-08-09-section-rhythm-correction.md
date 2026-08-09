# SWEED Section Rhythm Correction

## Problem

The previous section-rhythm pass treated the desired inter-section distance as full padding on both the top and bottom of every section. Adjacent sections therefore doubled the intended whitespace (for example, two default desktop sections could create roughly 256px between their content groups).

## Research correction

- Carbon 2x Grid describes vertical rhythm as applying a fixed spacing value to the top **or** bottom of a box, not duplicating the full target on both edges.
- Atlassian uses an 8px base unit and reserves its largest spacing tokens for page/layout relationships.
- SWEED should therefore model a target **content-to-content section gap**, while each adjacent section owns only its share of that gap.

## Target content-to-content rhythm

| Viewport | Compact | Default | Feature |
| --- | ---: | ---: | ---: |
| Mobile (<768px) | 64px | 80px | 96px |
| Tablet (>=768px) | 80px | 96px | 128px |
| Desktop (>=1200px) | 96px | 128px | 160px |

Per-edge section padding becomes approximately half of the target:

| Viewport | Compact edge | Default edge | Feature edge |
| --- | ---: | ---: | ---: |
| Mobile | 32px | 40px | 48px |
| Tablet | 40px | 48px | 64px |
| Desktop | 48px | 64px | 80px |

Adjacent mixed tiers naturally land between those targets (for example compact + default desktop = 112px).

## Implementation

1. Keep the existing semantic names so components do not need local patches.
2. Change `--section-space-compact/default/feature` to per-edge values above.
3. Update `DESIGN.md` so section tokens are explicitly documented as per-edge contributions to a total inter-section rhythm.
4. Update the Playwright contract to test the per-edge values and a real content-to-content gap range.
5. Build and visually verify 1440, 1024, 390, and 320 widths plus representative internal routes.
6. Commit every checkpoint before deployment.
