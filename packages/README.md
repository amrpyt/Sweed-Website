# Packages

Shared internal packages live here.

Package rules:

- Extract only code with a clear reusable owner.
- Do not create packages just to move files around.
- Keep feature-specific logic inside the app until multiple consumers exist.

Current packages:

- `brand` - stable brand primitives and metadata.
- `content` - shared public-site navigation and shell content.
- `ui` - framework-neutral UI utilities. React components stay app-local until reuse is proven.
- `config` - shared tooling config for workspace packages.
