# SWEED Visual System v2

This file is the project-level visual contract. The website is Arabic-first, RTL, brand-led, and responsive by default.

## Product Read

SWEED is a marketing and consulting agency website for Egyptian and Arab business owners. The interface must communicate trust, direction, clarity, and execution without looking like a generic SaaS template.

## Foundation

- React and Next.js remain the implementation layer.
- Existing accessible UI primitives remain in place.
- SWEED semantic tokens in `apps/web/src/styles/tokens.css` are the source of truth.
- IBM Carbon's open 2x Grid is the spatial backbone; SWEED keeps its own brand, components, typography, and interaction language.
- Do not add Carbon components or another full visual theme merely to obtain spacing.
- Other systems may be used as references, not as competing runtime themes.

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

The raw spatial scale is IBM Carbon's 2x Grid:

`2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160px`

Raw scale tokens are `--cds-spacing-01` through `--cds-spacing-13`. Components should consume semantic roles instead of raw values:

- `--stack-2xs` through `--stack-2xl`: vertical relationships.
- `--inline-xs` through `--inline-lg`: horizontal relationships.
- `--card-padding` and `--panel-padding`: component-owned internal space.
- `--content-gap-tight/default/loose`: content grouping.
- `--section-space-compact/default/feature`: page rhythm.
- `--section-header-gap` and `--section-description-gap`: heading relationships.
- `--section-content-gap`: header-to-main-content separation.
- `--control-*` and `--tooltip-*`: controls and floating UI.

Parent layouts own gaps between components. Components own only their internal padding. Sections must not all use the same vertical padding; compact, default, and feature spacing create rhythm without arbitrary values.

Section rhythm is mobile-first and snaps to the 8px grid rather than producing arbitrary fluid values. `--section-space-compact/default/feature` represent each section's **edge contribution**, so the visible content-to-content gap is the sum of the two adjacent section edges.

| Viewport | Compact edge | Default edge | Feature edge |
| --- | ---: | ---: | ---: |
| Mobile (<768px) | 48px | 64px | 80px |
| Tablet (>=768px) | 64px | 80px | 96px |
| Desktop (>=1200px) | 80px | 96px | 128px |

Typical adjacent gaps therefore land around `112–144px` on mobile, `144–176px` on tablet, and `176–224px` on desktop for the normal compact/default/feature combinations used by SWEED. This is the public-site breathing-room baseline: major marketing sections should read as distinct moments rather than one dense continuous block.

Use `compact` only for short transitional bands, `default` for normal content sections, and `feature` for major narrative/CTA moments. A section that is `default` or `feature` must not be downgraded to `compact` only because the viewport is narrow; responsive spacing is already encoded in the tokens. The eyebrow/title/description stack uses 24px semantic spacing, with 16px for closely related description relationships. Major section headers must hand off to their primary content with `--section-content-gap`, now `48–96px` (`clamp(48px, 6vw, 96px)`). Repeated marketing cards/rows should normally use `24–32px` group gaps instead of UI-dense 8–16px spacing; smaller gaps remain appropriate only inside one tightly related card/content cluster. Do not add extra inter-section margins on top of these tiers.

## Containers and Responsive Layout

- Mobile-first is mandatory: base CSS targets 320–390px layouts; larger layouts are progressive enhancements.
- New responsive rules use `@media (min-width: ...)` or container queries. Do not add new `max-width` breakpoints.
- Page gutters use `--page-gutter`.
- Reading copy should stay within `--measure-body`.
- Lead copy should stay within `--measure-lead`.
- Major headings should stay within `--measure-heading` where composition allows.
- Use container queries for reusable components whose layout depends on available component width.
- Use viewport breakpoints for page-level structural changes.
- Components must remain in normal document flow; badges, labels, and metadata must not be positioned over headings.
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

Fine-grained values are allowed for illustrations, motion geometry, and optical corrections when they do not define reusable UI structure. Any margin, padding, or gap exception requires an inline `spacing-exception:` comment explaining the reason.

`bun run design:spacing` enforces the Carbon scale across public CSS. It intentionally excludes the isolated `midu-clone` experiment and the private offer-funnel admin settings surface.

## Verification

Every visual-system change must pass:

1. `bun run design:spacing`
2. `bun run design:mobile-first`
3. `bun run check`
4. `bun run build`
5. Desktop review at 1440×900
6. Tablet review at 1024×768
7. Mobile review at 390×844 and 320×568
8. Overflow, clipping, focus, console, and reduced-motion checks
9. Visual comparison for affected sections
