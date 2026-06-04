# Design Notes

## Motion Rules
- Use short transitions around 160-240ms.
- Animate only `transform` and `opacity` where possible.
- Avoid looping motion except the existing typing indicator and a very subtle online dot pulse.
- Disable non-essential motion under `prefers-reduced-motion`.

## Non-Goals
- No Framer Motion dependency.
- No large page-level animation.
- No change to AI response behavior.
