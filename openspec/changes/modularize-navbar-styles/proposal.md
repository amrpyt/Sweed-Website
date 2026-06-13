# Modularize Navbar Styles

## Summary

Move the active navbar styling out of the React render path and into a focused CSS module.

## Reason

The active header still depended on a large inline CSS string rendered with `dangerouslySetInnerHTML`. That keeps the navbar in legacy migration debt and makes future accessibility, responsive, and design updates risky.

## Scope

- Extract the existing header styles into `legacy-header.module.css`.
- Import the CSS module from the active `LegacyHeader` component.
- Remove the runtime `<style>` injection from the header render.
- Preserve current header behavior and visual structure.

## Success Criteria

- `LegacyHeader` no longer renders inline style tags.
- Header CSS lives in a focused module file.
- Typecheck, lint, build, and browser smoke checks pass on port 3000.
