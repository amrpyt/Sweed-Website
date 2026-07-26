# SWEED Visual System v2

This file is the project-level visual contract. The website is Arabic-first, RTL, brand-led, and responsive by default.

## Product Read

SWEED is a marketing and consulting agency website for Egyptian and Arab business owners. The interface must communicate trust, direction, clarity, and execution without looking like a generic SaaS template.

## Foundation

- React and Next.js remain the implementation layer.
- Existing accessible UI primitives remain in place.
- SWEED semantic tokens in `apps/web/src/styles/tokens.css` are the source of truth.
- Do not add another full design system on top of the project.
- Open Props and Utopia may be used as references, not as competing runtime themes.

## Brand

- Accent: `#ed2062`
- Primary ink: `#261b3e`
- Neutral text: `#6d6e70`
- Surface: `#f7f8fb`
- Panel: `#ffffff`
- Typography: the existing SWEED Arabic family with Cairo fallback.
- Visual voice: direct, structured, confident, high-contrast, and distinctly SWEED.

## Typography Roles

Use semantic roles rather than arbitrary sizes:

- `--type-display-size`: homepage hero only.
- `--type-page-title-size`: standalone page titles.
- `--type-section-title-size`: major section headings.
- `--type-card-title-size`: cards and local content groups.
- `--type-lead-size`: section introductions and important supporting copy.
- `--type-body-size`: normal reading text.
- `--type-small-size`: metadata and secondary UI.
- `--type-label-size`: compact labels and intentional kickers.

Allowed weights:

- `--font-weight-regular`: body and long reading.
- `--font-weight-body`: normal UI/body emphasis.
- `--font-weight-medium`: hero or restrained heading emphasis.
- `--font-weight-strong`: labels, controls, and strong text.
- `--font-weight-display`: page and section headings.

Do not add fractional local weights such as `520`, `680`, `820`, or `850`.

## Spacing and Rhythm

The spacing foundation uses a 4pt scale. Prefer semantic roles:

- `--content-gap-tight`: closely related siblings.
- `--content-gap-default`: normal component internals.
- `--content-gap-loose`: separate groups inside one section.
- `--section-space-compact`: short supporting sections.
- `--section-space-default`: standard page sections.
- `--section-space-feature`: major narrative or conversion sections.
- `--section-header-gap`: title-to-description relationship.
- `--section-content-gap`: header-to-main-content separation.

Sections must not all use the same vertical padding. Rhythm comes from deliberate compact, default, and feature spacing.

## Containers and Responsive Layout

- Page gutters use `--page-gutter`.
- Reading copy should stay within `--measure-body`.
- Lead copy should stay within `--measure-lead`.
- Major headings should stay within `--measure-heading` where composition allows.
- Use container queries for reusable components whose layout depends on available component width.
- Use viewport breakpoints for page-level structural changes.
- Minimum interactive target: `44px × 44px`.
- No horizontal overflow at 320px and above.

## Shapes and Controls

- Standard controls: `--shape-control`.
- Standard cards: `--shape-card`.
- Feature cards: `--shape-feature`.
- Large panels and dialogs: `--shape-panel`.
- Pills are reserved for tags, status indicators, and intentionally pill-shaped controls.
- Do not use 24–32px radius on ordinary cards.

Buttons use shared control heights and inline padding tokens. Do not create one-off button sizing inside individual sections unless the interaction genuinely requires it.

## Component Rules

- Use shared `Section` and `SectionHeader` for standard marketing compositions.
- Keep custom section composition when the narrative requires it, but consume the same semantic typography, spacing, shape, and control tokens.
- Use Flexbox for one-dimensional groups and Grid for coordinated two-dimensional layouts.
- Use `gap` for sibling spacing; avoid margin chains.
- Cards are for distinct actionable content, not the default grouping mechanism.

## Accessibility

- Body text must meet WCAG AA contrast.
- Body text stays at `1rem` or larger.
- Every interaction must have visible keyboard focus.
- Reduced-motion mode must expose complete content.
- Heading hierarchy must follow document structure: one page `h1`, major sections `h2`, internal groups `h3`.
- Text must remain usable at 200% zoom.

## Enforcement

New page and component CSS must not introduce:

- arbitrary `font-size` values when a semantic role fits;
- fractional font weights outside the approved roles;
- new card radius values;
- new section-level vertical padding scales;
- page containers with hard-coded mobile gutters;
- interactive targets smaller than 44px.

Fine-grained values are allowed for illustrations, motion geometry, and optical corrections when they do not define reusable UI structure.

## Verification

Every visual-system change must pass:

1. `bun run check`
2. `bun run build`
3. Desktop review at 1440×900
4. Tablet review at 1024×768
5. Mobile review at 390×844 and 320×568
6. Overflow, clipping, focus, console, and reduced-motion checks
7. Visual comparison for affected sections
