## 1. Architecture Foundation

- [x] 1.1 Inventory all active legacy page sections and map them to reusable component families
- [x] 1.2 Define typed content contracts for pages, sections, cards, services, offers, products, articles, FAQs, portfolio items, contact data, CTAs, and SEO
- [x] 1.3 Create local content repository modules that return typed records and hide the future Sanity adapter boundary
- [x] 1.4 Create shared section/layout components and CSS Module conventions using existing SWEED tokens
- [x] 1.5 Add a migration parity helper/test pattern for migrated routes

## 2. Shared Chrome And Core Sections

- [x] 2.1 Convert accepted header/mobile drawer into final typed shared components without legacy HTML dependencies
- [x] 2.2 Convert breadcrumb behavior into a typed shared component
- [x] 2.3 Convert footer and global CTA surfaces into typed shared components
- [x] 2.4 Convert common hero, stats, card grid, feature list, process/timeline, testimonial, and FAQ section patterns
- [x] 2.5 Keep AI advisor widget and automation demo as typed feature boundaries without adding Mastra runtime

## 3. Low-Risk Page Migration

- [x] 3.1 Migrate `/contact` to typed components and local typed content
- [x] 3.2 Add `/contact` smoke coverage for form surface, map, contact blocks, breadcrumb, and console-clean checks
- [x] 3.3 Migrate `/faq` to typed components and local typed content
- [x] 3.4 Add `/faq` smoke coverage for FAQ groups and accordion behavior
- [x] 3.5 Migrate `/about` to typed components and local typed content
- [x] 3.6 Add `/about` smoke coverage for key story, values, team/process, and CTA sections

## 4. Listing And Grid Page Migration

- [x] 4.1 Migrate `/services` to typed components and local typed service content
- [x] 4.2 Migrate `/offers` to typed components and local typed offer content
- [x] 4.3 Migrate `/products` to typed components and local typed product content
- [x] 4.4 Migrate `/portfolio` to typed components and local typed portfolio content
- [x] 4.5 Migrate `/articles` to typed components and local typed article content
- [x] 4.6 Add route-specific smoke coverage for every migrated listing/grid page

## 5. Detail Page Migration

- [x] 5.1 Migrate `/services/[slug]` to typed components and stable service slug content
- [x] 5.2 Migrate `/articles/[slug]` to typed components and stable article slug content
- [x] 5.3 Add smoke coverage for service detail and article detail routes
- [x] 5.4 Ensure metadata generation uses typed content contracts

## 6. Home Page Migration

- [x] 6.1 Migrate `/` to typed components and local typed home page content
- [x] 6.2 Add home page smoke coverage for hero, services teaser, offers/products/portfolio/articles teasers, AI surfaces, CTA, and footer
- [x] 6.3 Verify mobile behavior on home page after legacy body removal

## 7. Legacy Runtime Removal

- [x] 7.1 Remove active `LegacyPage` usage from all public App Router routes
- [x] 7.2 Remove full-page legacy HTML body parsing from runtime code
- [x] 7.3 Keep or relocate `site/` as reference fixtures without serving page bodies from it
- [x] 7.4 Remove obsolete legacy asset routes/scripts that are no longer needed
- [x] 7.5 Update tests to fail if active routes reintroduce full-page `dangerouslySetInnerHTML`

## 8. Final Verification

- [x] 8.1 Run `bun run typecheck`
- [x] 8.2 Run `bun run lint`
- [x] 8.3 Run `bun run build`
- [x] 8.4 Run `bun run smoke`
- [x] 8.5 Run OpenSpec verification for `modularize-legacy-site-components`
- [x] 8.6 Document residual visual parity risks, if any
