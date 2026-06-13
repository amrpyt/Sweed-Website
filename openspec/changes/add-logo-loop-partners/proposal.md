# Add Logo Loop Partners Strip

## Summary

Replace homepage partners strip with a reusable React `LogoLoop` component based on the attached React Bits source.

## Scope

- Add modular `LogoLoop` under `apps/web/src/components/motion`.
- Apply it to `شركاء نجاح اشتغلوا معانا`.
- Use fake abstract SVG logo marks, not text labels or boxed chips.
- Preserve RTL page layout while loop moves right-to-left visually.
- Respect reduced-motion.

## Success Criteria

- Partners appear in one continuous horizontal loop.
- Hover slows the loop without layout shift.
- No horizontal page overflow.
- Typecheck, lint, build, and browser checks pass.
