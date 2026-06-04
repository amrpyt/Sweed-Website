# Design Notes

## UX References
- Intercom mobile Messenger uses a native-feeling bottom sheet so users keep context and can still understand where they are in the app.
- Intercom web customization emphasizes brand logo, primary action color, launcher position, and a consistent branded header.
- W3C WCAG 2.2 target-size guidance requires pointer targets to meet at least 24x24 CSS pixels or have sufficient spacing.
- Material accessibility guidance recommends larger 48x48 dp touch targets for comfortable mobile interaction.

## Decisions
- Use a bottom-sheet-like panel on mobile and a contained corner messenger on desktop.
- Hide the launcher while the panel is open to avoid duplicate actions and visual clutter.
- Keep message content concise and readable with dedicated markdown spacing for paragraphs, lists, and links.
- Preserve the SWEED magenta/purple brand while adding neutral surfaces for message legibility.

## Non-Goals
- No new AI tools.
- No lead capture form.
- No Mastra memory or provider changes.
