# Replace Navbar With Arabic Staggered Menu

## Summary

Replace the current desktop navigation and separate mobile drawer with one Arabic-first staggered menu based on the supplied React Bits interaction.

## Reason

The existing header is functional but visually generic and uses two separate navigation implementations. SWEED needs a stronger agency-grade navigation moment that keeps the Arabic experience, brand identity, and route structure consistent across screen sizes.

## Scope

- Add a reusable client-side staggered menu component under `apps/web/src/components/layout`.
- Use the existing SWEED logo, Cairo typography, pink `#ed2062`, and deep purple `#261b3e`.
- Render the existing Arabic navigation content and contact route.
- Support keyboard operation, Escape-to-close, click-away close, route-change close, body scroll locking, and reduced motion.
- Replace the current desktop navigation and mobile drawer in the active `Header` component.
- Keep the existing routes and public-site shell unchanged.

## Success Criteria

- One responsive navigation implementation works on desktop, tablet, and mobile.
- Menu labels and accessible names are Arabic and render in RTL correctly.
- The panel uses the SWEED brand palette and existing Cairo font tokens.
- Internal links use Next.js navigation and close the panel after selection.
- Focus returns to the trigger after closing with Escape.
- `bun run check` and `bun run build` pass.
- The touched public pages are reviewed in a browser at desktop and mobile widths.
