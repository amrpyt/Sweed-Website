# Proposal

## Problem

The offer funnel admin page looks visually rough, has broken Arabic copy, forces an unfriendly WhatsApp phone format, and has no protection for deployment on Vercel.

## Change

- Polish the admin page typography, spacing, layout, labels, and action placement.
- Fix Arabic copy in the admin UI and default offer strings.
- Accept Egyptian phone numbers in local form such as `01068274662`.
- Normalize WhatsApp phone numbers for `wa.me` links.
- Add simple environment-based Basic Auth for admin routes.

## Non-goals

- No full user account system.
- No database-backed sessions.
- No analytics dashboard work in this change.
