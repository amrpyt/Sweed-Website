# Change: Polish AI advisor popup UX

## Why
The SWEED AI advisor is functional, but the open popup still feels like a rough embedded card. On mobile the launcher remains visible under the panel, and on desktop the panel placement and controls compete with the hero content instead of feeling like a focused support messenger.

## What Changes
- Restyle the AI advisor as a compact branded messenger with clearer status, stronger visual hierarchy, and better markdown message readability.
- Treat small screens as a mobile-first bottom-sheet experience with safe-area spacing, comfortable touch targets, and no duplicate launcher while open.
- Keep the existing AI endpoint, memory payload, quick prompts, and markdown rendering behavior unchanged.

## Impact
- Affects `src/features/ai-advisor/ai-advisor-widget.tsx`.
- Affects `src/features/ai-advisor/ai-advisor.module.css`.
- No provider, Mastra, API, prompt, or data-model changes.
