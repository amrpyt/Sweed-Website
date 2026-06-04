## ADDED Requirements

### Requirement: Typed content contracts
The system SHALL define typed content models for services, offers, products, portfolio items, articles, FAQs, navigation, and reusable page sections.

#### Scenario: Developer edits local content
- **WHEN** a developer updates local content records
- **THEN** TypeScript MUST validate the required fields used by pages and sections

### Requirement: Repository boundary for content
Pages and feature modules SHALL read content through repository functions or content service boundaries, not through scattered hardcoded imports inside UI components.

#### Scenario: Future Sanity adapter is added
- **WHEN** a Sanity-backed content adapter is introduced after v1
- **THEN** public pages MUST be able to keep their rendering contracts with minimal page-level changes

### Requirement: Slug and metadata readiness
Content models SHALL include stable slugs and metadata fields needed for routes, SEO, Open Graph, and sitemap generation.

#### Scenario: Article detail route generated
- **WHEN** an article has a slug and metadata
- **THEN** the article detail route MUST be able to generate page metadata and canonical routing data from the content contract

### Requirement: CMS integration excluded from v1 runtime
The v1 website SHALL NOT require live Sanity credentials, datasets, or network access to render public pages.

#### Scenario: Build runs without Sanity environment variables
- **WHEN** the production build runs with no Sanity environment variables
- **THEN** the website MUST still build using local content sources

