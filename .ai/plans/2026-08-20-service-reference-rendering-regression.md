# SWEED Service Reference Rendering Regression

Date: 2026-08-20
Task: SWEED-051

## Goal

Restore `/services/branding` and `/services/digital-marketing` after the shared reference theme made parts of the approved HTML render incorrectly, without editing or redesigning the approved service source documents.

## Root causes

1. The reference font replacement injected a quoted font stack inside quoted inline `onerror` markup. That terminated the HTML attribute early and caused the browser parser to re-parent Branding card content outside its `.wcard` containers.
2. The shared CTA bridge changed prototype `.btn` elements from intrinsic `inline-block` behavior to block-level `grid`. Buttons inside normal block parents therefore stretched to the full container width, producing 740–1265px white action bars.
3. The About-specific CTA specificity repair was implemented too broadly with `!important`; it needed to be scoped to the About CTA rather than every reference page.

## Repair

- Use an unquoted but CSS-valid SWEED font stack when replacing inline `font-family:` declarations so quoted HTML/JS attributes stay syntactically valid.
- Render reference CTA controls as `inline-grid`, preserving the canonical icon/label grid internally while keeping the prototype's intrinsic inline sizing.
- Remove the broad reference-button `!important` paint overrides.
- Keep the About secondary CTA correction behind an About-only reference override.
- Add regression coverage for quote-safe inline font replacement, intrinsic reference button display, and About-only CTA scoping.

## Verification

- Focused reference/button/service tests pass.
- TypeScript and ESLint pass.
- Production build passes.
- Branding keeps all four `.wcard` items and has no CTA wider than 500px on desktop or 360px on mobile.
- Digital Marketing has no CTA wider than 500px on desktop or 360px on mobile.
- Both routes have zero horizontal overflow, zero broken loaded images, and no browser errors at desktop and 390px mobile widths.
- About keeps the white-secondary/purple-label CTA and remains free of the AI advisor.
