# Plan — iOS-style top-sheet navigation

Date: 2026-07-23
Task: SWEED-012
Status: completed

## Goal

Replace the current heavy full-screen mobile menu with a polished iOS-inspired top sheet, fix the menu/close icon, and add verified quick-contact/social channels without inventing public profiles.

## Current Evidence

- The phone trigger was a purple rounded square built from three CSS spans; on iOS the open-state transforms read as a malformed arrow.
- The old menu occupied the entire viewport below the header and left a large empty area.
- Navigation and same-page anchor behavior were already correct and had to be preserved.
- Verified public channels in the content model are WhatsApp, phone, and email. No official Instagram/Facebook/TikTok URLs exist in the repository.

## Intended Behavior

- Use free Font Awesome `bars` and `xmark` icons already loaded by the site.
- Open a floating top sheet below the 64px header with a dim/blur backdrop, rounded sheet, grab handle, compact navigation, and deliberate iOS-like entrance.
- Keep seven navigation destinations, active state, same-page header offset, Escape close, outside-tap close, and focus restoration.
- Add a verified quick-contact row for WhatsApp, phone, and email.
- Render future social profiles from `siteSettings.socialLinks` only when official URLs are supplied.
- Keep desktop navigation unchanged.

## Files

- `apps/web/src/features/legacy-site/legacy-header.tsx`
- `apps/web/src/features/legacy-site/legacy-header.module.css`

## Acceptance Criteria

- [x] Menu trigger displays a centered professional bars icon and changes to a centered X icon.
- [x] Mobile menu is a bounded top sheet rather than a full-height white page.
- [x] Backdrop closes the sheet and does not cover the fixed header.
- [x] All navigation links and the CTA are visible or internally scrollable on short screens.
- [x] WhatsApp, phone, and email actions use verified values.
- [x] No fake social URL is introduced.
- [x] 320, 390, and 844×390 views have no overflow or clipped controls.
- [x] Escape restores focus; same-page links position targets below the fixed header.
- [x] Reduced motion, check, build, deployment, browser errors, and console checks pass.

## Completion Evidence

- Application commit: `091685e feat: add iOS-style mobile top sheet`.
- 390×844: sheet `359×600px`; backdrop covers `375×779px`; no page overflow.
- 320×700: sheet `294×576px`; all content fits without internal scrolling.
- 844×390: sheet uses internal scrolling and two navigation columns without horizontal overflow.
- Trigger uses Font Awesome Free `fa-bars` and `fa-xmark` centered inside a 44px touch target.
- Quick actions use verified WhatsApp, `tel:+201068274662`, and `mailto:info@sweed.com` values.
- Backdrop click and Escape close passed; Escape restores focus to the trigger.
- Tab order moves from the trigger to the first navigation link and Shift+Tab returns to the trigger.
- `#services` navigation closed the sheet and positioned the target at approximately `68px` below the viewport top.
- Desktop trigger remains hidden and inline navigation is unchanged.
- Reduced motion reports effectively zero icon/sheet transition duration.
- Browser console and error logs are empty.

## Risks Resolved

- Backdrop receives a full explicit `100dvh`-based height because the transformed fixed header creates a containing block.
- Short landscape screens use an internally scrollable sheet and two-column navigation.
- The backdrop is removed from keyboard tab order; focus cycles between the trigger and sheet links.

## Verification

- `bun run check` passed with 0 errors and 6 pre-existing warnings.
- `bun run build` passed.
- `sweed-demo.service` is active after HTTP readiness polling.
- Public HTTPS homepage returns HTTP 200.
- Responsive, interaction, reduced-motion, console, and browser-error checks passed.

## Rollback

Revert `091685e` to restore the previous full-height mobile menu and CSS-span trigger.
