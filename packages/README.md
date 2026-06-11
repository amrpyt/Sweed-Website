# Packages

Shared internal packages live here after ownership is stable.

Package rules:

- Extract only code with a clear reusable owner.
- Do not create packages just to move files around.
- Keep feature-specific logic inside the app until multiple consumers exist.

Planned packages:

- `brand` - design tokens, brand colors, fonts, and logo metadata.
- `content` - typed marketing content and page data.
- `ui` - reusable presentational components.
- `config` - shared tooling config when there is more than one app/package consumer.
