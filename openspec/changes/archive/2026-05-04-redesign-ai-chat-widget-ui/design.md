# Design Notes

## Research Signals
- Intercom treats the launcher, Messenger Home, branding, and conversation CTA as separate parts of the first customer experience.
- Zendesk mobile chat supports overlay mode so visitors can stay in the same tab instead of losing page context.
- Zendesk appearance guidance treats the chat widget as a brand touchpoint, including title, theme color, placement, and message style.
- Touch targets and controls should be easy to tap on mobile and should avoid covering primary page CTAs.

## Decisions
- Use a quiet white messenger shell with a thin brand-colored header instead of a large saturated header.
- Use a small assistant identity row and short expectation copy before the conversation.
- Keep quick prompts as horizontally scrollable chips on mobile and wrapped chips on desktop.
- Hide duplicate launcher while open.
- Keep mobile as an anchored bottom sheet with safe-area padding and a stable composer.

## Non-Goals
- No lead capture.
- No new AI tools.
- No prompt/data dashboard changes.
