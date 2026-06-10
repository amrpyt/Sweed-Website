# Research

## Source

- Next.js font docs: `next/font/google` loads and self-hosts Google fonts for performance and privacy.

## Decisions

- Use `Tajawal` from `next/font/google` on the offer funnel admin page only.
- Simplify the admin UI into a single-column control panel with short helper comments beside fields.
- Replace corrupted Arabic strings in source files.
- Repair persisted `???` offer copy by falling back to clean defaults for known text fields.
