# Change: Redesign AI chat widget UI

## Why
The current AI advisor works, but the popup visual design still feels heavy and unpolished. The header takes too much visual attention, quick prompts feel cramped, and the mobile layout does not yet match the cleaner messenger patterns users expect from products like Intercom and Zendesk.

## What Changes
- Redesign the AI advisor as a polished messenger surface with a calmer header, clearer assistant identity, lighter message bubbles, and stronger mobile ergonomics.
- Keep the same API, Mastra adapter, prompt behavior, memory/history contract, and markdown rendering.
- Preserve SWEED brand colors while reducing the saturated gradient-heavy look.

## Impact
- Affects `src/features/ai-advisor/ai-advisor-widget.tsx`.
- Affects `src/features/ai-advisor/ai-advisor.module.css`.
- No provider, deployment, or data-model changes.
