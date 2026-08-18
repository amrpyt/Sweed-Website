# Homepage Services → Why gap fix

Status: completed

## Problem

The five-dot divider introduced in `a3d519f` sits between two sections that each already own 96px desktop edge padding. The result is an oversized empty band around the divider after the Services CTA.

## Fix

1. Add a regression contract for the Services → Why transition.
2. Remove the standalone decorative divider row.
3. Compact only the touching section edges to `--stack-xl`, preserving normal spacing on the outer edges of both sections.
4. Verify the live transition visually on desktop and mobile, then run focused/full checks, build, deploy, and public QA.

## Acceptance

- [x] No five-dot divider remains between Services and Why.
- [x] The visual gap from the Services CTA to the Why heading is reduced to 64px without collapsing either section.
- [x] Other section spacing remains unchanged.
- [x] No horizontal overflow or browser errors at desktop/mobile widths.
