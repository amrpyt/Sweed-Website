# Section Inventory

This inventory maps accepted legacy pages under `site/` to reusable component families for the TypeScript migration. `v2/` and `v3/` are not design sources.

## Shared Families

- `SiteChrome`: top bar, header, mobile drawer, footer, WhatsApp/contact floating actions.
- `Breadcrumb`: home link plus current route trail.
- `Hero`: home hero, inner page hero, service hero, article hero, contact hero.
- `SectionHeader`: eyebrow/badge, title, subtitle.
- `CardGrid`: service cards, product cards, offer cards, portfolio cards, article cards, value cards.
- `StatsStrip`: numeric proof points and counters.
- `CtaSection`: consultation/contact CTA, sticky mobile CTA, WhatsApp CTA.
- `FilterTabs`: services/products/portfolio/articles filters.
- `AccordionGroup`: FAQ pages and quick FAQ sections.
- `FormPanel`: contact form and newsletter form.
- `MediaPanel`: map iframe, social links, article image, portfolio media.
- `ProcessTimeline`: story timeline, workflow/process steps, how-we-help blocks.

## Route Map

### `/`

Source: `site/index.html`

- Popup modal
- WhatsApp button
- Top bar and header
- Hero
- Problems
- Stats
- Help request
- Why choose us
- Expertise
- Partners
- Portfolio
- Process
- Testimonials
- Packages
- Services
- Products
- About teaser
- Blog teaser
- FAQ teaser
- CTA

### `/about`

Source: `site/pages/about.html`

- Top bar and header
- Breadcrumb
- About hero
- Company intro
- CEO message
- Story timeline
- Vision and mission
- Values
- Commitment
- Team: leadership, departments, consultants
- Partners: technical and strategic
- Footer
- WhatsApp button

### `/services`

Source: `site/pages/services.html`

- Top bar and header
- Services hero
- Breadcrumb
- Services grid
- CTA
- Footer
- WhatsApp button

### `/services/[slug]`

Source: `site/pages/service-detail.html`

- Top bar and header
- Service hero
- Breadcrumb
- Service intro
- Secondary services
- How we can help
- CTA
- Footer
- WhatsApp button

### `/offers`

Source: `site/pages/offers.html`

- Top bar and header
- Offers hero
- Quick package finder
- Comprehensive packages
- Specialized packages with tabs
- Promotional offers
- Comparison table
- FAQ
- CTA
- Footer
- Mobile sticky CTA
- WhatsApp button

### `/products`

Source: `site/pages/products.html`

- Top bar and header
- Products hero
- Category tabs
- Featured products
- Help section
- Printing products tab
- Marketing packages tab
- Digital products tab
- Special offers
- Products by industry
- Footer
- WhatsApp button

### `/portfolio`

Source: `site/pages/portfolio.html`

- Top bar and header
- Portfolio hero
- Filters
- Portfolio grid by category
- Success stories
- Stats
- CTA
- WhatsApp button

### `/articles`

Source: `site/pages/blog.html`

- Top bar and header
- Blog hero
- Blog stats
- Filters
- Featured article
- Medium/small article grids
- Pagination
- Sidebar search/categories/popular posts/tags
- Newsletter
- Footer
- WhatsApp button

### `/articles/[slug]`

Source: `site/pages/article.html`

- Top bar and header
- Breadcrumb
- Article hero
- Featured image
- Article content
- Article tags
- Author bio
- Sidebar
- Related articles
- Newsletter CTA
- Footer
- WhatsApp button

### `/faq`

Source: `site/pages/faq.html`

- Top bar and header
- FAQ hero
- Search box
- Stats
- Sidebar categories
- FAQ groups: general, services/packages, contract/payment, refund/exchange, delivery/receipt, support/warranties, security/privacy, communication
- Contact CTA
- Footer
- WhatsApp button

### `/contact`

Source: `site/pages/contact.html`

- Top bar and header
- Contact hero
- Main contact section
- Contact info card
- Contact form card
- Map and social section
- Quick FAQ
- CTA
- Footer
- WhatsApp button

## Migration Notes

- Migrate `/contact`, `/faq`, and `/about` first because they prove forms, accordions, and long static content with lower listing complexity.
- Migrate listing pages next because they exercise typed collections.
- Migrate detail pages after listing content contracts are stable.
- Migrate `/` last because it combines nearly every section family.
