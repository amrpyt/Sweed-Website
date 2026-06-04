# Change: Simplify AI chat widget UI

## Why
The redesigned AI advisor is still visually busy. The presence card, repeated helper text, and always-visible quick prompts make the popup feel crowded, especially on mobile.

## What Changes
- Remove the extra presence card from the chat popup.
- Keep the header compact with a single status line.
- Show quick prompts only before the visitor sends the first message.
- Reduce spacing, shadows, and visual weight while preserving the existing API and AI behavior.

## Impact
- Affects `src/features/ai-advisor/ai-advisor-widget.tsx`.
- Affects `src/features/ai-advisor/ai-advisor.module.css`.
- No server, provider, memory, or deployment configuration changes.
