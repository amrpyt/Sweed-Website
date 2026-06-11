# SWEED Static Site

This folder is the deployable website source.

## Structure

- `index.html` - Homepage.
- `pages/` - Internal website pages.
- `../public/` - Shared public assets copied by Vite.
- `../dist/` - Generated production build output.

## Routing

The homepage links to internal pages with `pages/*.html`.
Internal pages link back to the homepage with `../index.html` and to sibling pages with `*.html`.

## Source References

Original design/source material is kept outside this folder so the deployable site stays clean.
