# DEC-009 — Bounded top sheet and verified social links

Date: 2026-07-23
Status: accepted
Related task: SWEED-012

## Context

The mobile menu trigger used three transformed CSS spans. On iOS the open state visually collapsed into an arrow-like symbol instead of a clear close icon. The menu itself occupied the entire viewport below the header, leaving a large empty white surface and reading like a full page rather than a native mobile sheet.

The user requested an iPhone-style top sheet with social media. The repository currently contains verified WhatsApp, phone, and email values, but no official Instagram, Facebook, TikTok, LinkedIn, or YouTube profile URLs.

## Decision

- Replace the CSS-span trigger with the existing free Font Awesome `fa-bars` and `fa-xmark` icons.
- Open the mobile navigation as a bounded floating top sheet below the 64px header.
- Use a full below-header backdrop, rounded sheet, grab handle, compact navigation group, short entrance motion, and internal scrolling for short landscape screens.
- Keep the fixed header visible above the sheet.
- Show verified quick-contact actions for WhatsApp, phone, and email under `السوشيال والتواصل`.
- Render future public social profiles only from `siteSettings.socialLinks` when official URLs are supplied.
- Preserve seven routes, active state, same-page offset scrolling, backdrop close, Escape close, focus restoration, and desktop inline navigation.

## Alternatives Considered

### Keep the full-height white menu

Rejected. It wastes space, looks like a separate page, and does not match the requested native-app feel.

### Use another hand-built animated hamburger

Rejected. The previous geometry was the visible defect. The project already loads a professional free icon set.

### Add guessed Instagram/Facebook/TikTok URLs

Rejected. No official links exist in the repository, and inventing public profiles would violate the project’s verified-content rule.

### Display disabled social icons

Rejected. Disabled public profile buttons make the interface look unfinished and provide no user value.

## Consequences

- The phone menu is compact and visually distinct from the page behind it.
- The sheet fits portrait phones without internal scrolling and remains internally scrollable on short landscape screens.
- Social-profile rendering is ready, but only verified channels are public today.
- Font Awesome remains a runtime dependency for the menu and contact icons.

## Verification

- 390×844: sheet is approximately 600px tall, content fits without internal scrolling, backdrop covers the full below-header viewport.
- 320×700: sheet is approximately 576px tall, all navigation/contact actions fit without scrolling or clipping.
- 844×390: sheet scrolls internally and uses two navigation columns.
- Bars/X icons are centered at 22×22px inside a 44px touch target.
- Backdrop click closes the menu; Escape closes and restores focus.
- Tab and Shift+Tab cycle between the trigger and sheet links.
- `#services` navigation closes the sheet and positions the section below the fixed header.
- Desktop navigation remains inline and the trigger remains hidden.

## Revisit Trigger

Revisit when official SWEED social-profile URLs are delivered or when real iOS Safari testing reveals platform-specific sheet behavior.
