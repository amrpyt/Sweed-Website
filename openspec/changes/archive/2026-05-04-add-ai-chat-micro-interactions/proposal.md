# Change: Add AI chat micro-interactions

## Why
The simplified AI advisor is now cleaner, but it feels static. The widget should provide small, responsive feedback when it opens, receives messages, and handles user actions without becoming busy again.

## What Changes
- Add subtle open, launcher, message, button, quick prompt, input focus, and typing micro-interactions.
- Keep motion short and mostly limited to `transform` and `opacity`.
- Respect `prefers-reduced-motion`.

## Impact
- Affects `src/features/ai-advisor/ai-advisor.module.css`.
- No chat logic, API, model, or deployment configuration changes.
