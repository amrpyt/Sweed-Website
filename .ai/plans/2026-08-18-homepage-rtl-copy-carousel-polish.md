# Homepage RTL, Copy Width, and Carousel Controls

ID: SWEED-047
Created: 2026-08-18
Status: active

## Goal

Correct the homepage navigation direction, restore the approved six-point `ليه تختار سويد؟` content, widen compressed section copy, simplify the Selected Work controls, and remove redundant FAQ/contact actions without disturbing the concurrent SWEED-042 reference-service work.

## Scope

- Header: keep Arabic navigation content RTL while placing the logo at the physical left and the consultation/menu action at the physical right on desktop and mobile.
- Why SWEED: restore the two approved points removed in `999fd13` so the original six-point set is visible again.
- Selected Work: widen heading/description measure, remove the visible autoplay toggle, and use Embla's official previous/next API for explicit left/right arrow controls while keeping autoplay, hover/focus pause, looping, and reduced-motion manual scrolling.
- Offers: widen the heading/intro composition so desktop copy reads horizontally rather than as a narrow stack.
- FAQ: widen the heading/intro composition and remove the `شاهد كل الأسئلة` CTA.
- Contact: remove the phone/WhatsApp method rows and widen the heading/supporting copy while preserving the contact form and conversion context.

## Verification

- TDD: add contract tests and observe them fail before production changes.
- Run focused homepage/header tests, Impeccable detector, `bun run check`, and `bun run build`.
- Deploy with the service stopped during the `.next` build/copy window, restore `amr:amr` ownership, start the service, and poll HTTP readiness.
- Managed `agent-browser` QA at 1440×900, 1024×768, 390×844, and 320×568; inspect screenshots visually, verify RTL physical placement, text wrapping, six Why points, carousel arrows/autoplay/hover/focus/reduced-motion behavior, no removed controls, no overflow, broken loaded images, or browser errors.

## External Component Reference

- Use the official Embla Carousel previous/next guidance already compatible with the installed carousel runtime; do not add a second carousel library.

## Rollback

Revert only the SWEED-047 commits. Do not revert or include the unrelated SWEED-042 dirty reference-service files.
