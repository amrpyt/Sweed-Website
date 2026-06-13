# Improve Navbar Accessibility

## Summary

Improve the active site navbar so it follows modern navigation basics without redesigning the full header.

## Reason

The current homepage header works visually, but the mobile drawer is missing disclosure semantics and the desktop action buttons include non-functional controls. This creates accessibility and trust issues.

## Scope

- Add proper mobile menu disclosure attributes.
- Add Escape-to-close and focus return behavior.
- Label the primary navigation landmark.
- Replace dead search/catalog buttons with one real consultation CTA.
- Keep the existing brand identity and layout direction.

## Success Criteria

- Mobile menu button exposes open/closed state to assistive tech.
- Escape closes the menu and returns focus to the trigger.
- Header has a clear primary navigation landmark.
- Header contains no fake action buttons.
- Typecheck, lint, build, and browser smoke checks pass on port 3000.
