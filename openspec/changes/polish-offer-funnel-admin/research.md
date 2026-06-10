# Research

## Sources

- Material Design layout guidance: use consistent grids and 8dp spacing rhythm for balanced UI layouts.
- Carbon Design System spacing guidance: spacing should be systematic, with stack spacing separating related groups and sections.
- Carbon Design System form guidance: concise labels and section spacing improve form comprehension.
- Next.js middleware docs: middleware can run before matched routes and can protect route groups.
- Vercel environment variables docs: production secrets should be configured as environment variables.

## Decisions

- Keep the admin page as a focused internal tool, not a marketing hero.
- Use a denser two-column dashboard layout on desktop and a single-column layout on mobile.
- Use `8px`-based spacing tokens and smaller panel radii for a more professional control surface.
- Accept Egyptian mobile inputs as `010...`, `011...`, `012...`, `015...`, `20...`, or `+20...`.
- Store the value as the operator typed it, then normalize only when building the WhatsApp `wa.me` URL.
- Protect `/admin/*` and `/api/admin/*` with simple Basic Auth using `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
- In local development, if auth env vars are missing, allow access so the team is not locked out.
