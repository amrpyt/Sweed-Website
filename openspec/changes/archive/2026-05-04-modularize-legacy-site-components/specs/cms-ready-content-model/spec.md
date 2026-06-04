## ADDED Requirements

### Requirement: Typed content contracts
The system SHALL represent marketing content through typed contracts for pages, services, offers, products, portfolio items, articles, FAQs, contact data, CTAs, and navigation.

#### Scenario: Content is rendered by a component
- **WHEN** a component renders business content
- **THEN** the content MUST arrive through typed props or typed content records

### Requirement: Repository boundary
The system SHALL read content through repository functions or adapters instead of coupling route components directly to static arrays.

#### Scenario: Future Sanity integration is added
- **WHEN** Sanity CMS replaces local content in a later version
- **THEN** route components MUST keep the same component contracts and switch only the repository implementation

### Requirement: Stable slugs and route metadata
Content records that power routed pages SHALL include stable slug and metadata fields.

#### Scenario: Article detail content is migrated
- **WHEN** an article detail page is rendered
- **THEN** the article record MUST provide a slug, title, summary/description, body sections, and SEO metadata through a typed contract

### Requirement: No CMS runtime dependency in v1
This change SHALL NOT require Sanity runtime packages, Sanity environment variables, or network CMS fetching.

#### Scenario: Production build runs offline
- **WHEN** `bun run build` runs without Sanity configuration
- **THEN** all public pages MUST still build from local typed content
