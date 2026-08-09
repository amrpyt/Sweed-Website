# Better Typography — Public UI Plan

1. Baseline the live computed type system at desktop/mobile.
2. Consolidate semantic sizes and line-height roles in `tokens.css`.
3. Apply root rendering details in `globals.css` without changing font family.
4. Migrate homepage copy/card/FAQ/article typography from one-off sizes to semantic roles.
5. Enforce the mobile readable-text and input-size floors.
6. Add focused Playwright contracts for typography hierarchy and mobile floors.
7. Run full code/build/browser gates, then deploy and verify HTTPS.

Acceptance: hierarchy remains descending, paragraphs stay readable with bounded measure, no changed readable text is below 14px, mobile editable controls are 16px+, no horizontal overflow, and reduced-motion/zoom remain stable.
