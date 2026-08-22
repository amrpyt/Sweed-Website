# SWEED Navbar Primary CTA Regression

Goal: restore the approved shared navbar balance and primary CTA without reverting later navigation-behavior fixes.

## Scope

1. Reproduce the visual regression against the current production header.
2. Compare shared header code with the last approved navbar state.
3. Restore the approved `احجز استشارتك المجانية` primary CTA on desktop and mobile.
4. Keep later section-navigation behavior and the catalog asset available outside the navbar.
5. Verify focused tests, TypeScript, ESLint, production build, desktop/mobile navbar geometry, menu open/close, then deploy and verify production.

## Acceptance

- Desktop header uses the approved consultation CTA and keeps logo-left/action-right placement.
- Mobile header keeps a 44px menu control and the panel closed by default.
- Primary navbar CTA keeps the canonical purple/white 48px/16px SWEED action style.
- No catalog CTA remains in the shared header.
- Existing later navigation behavior is not reverted.
