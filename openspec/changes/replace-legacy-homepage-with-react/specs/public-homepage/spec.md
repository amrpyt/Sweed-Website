## ADDED Requirements

### Requirement: Modular React Homepage

The public homepage SHALL render from React modules instead of reading `site/index.html`.

#### Scenario: Homepage no longer uses the legacy HTML route

- **WHEN** the `/` route is loaded
- **THEN** it renders the React homepage component
- **AND** it does not use `publicLegacyRoutes.home`
- **AND** no runtime route reads `site/index.html`.

#### Scenario: Homepage preserves key public sections

- **WHEN** the `/` route is loaded
- **THEN** it exposes stable section anchors for `home`, `expertise`, `problems`, `offers`, `services`, `products`, `portfolio`, `blog`, `faq`, and `contact`
- **AND** it keeps the brand colors `#ed2062` and `#261b3e`
- **AND** it renders the "كيف نعمل معك خطوة بخطوة" process section.

#### Scenario: Homepage has visual regression coverage

- **WHEN** smoke tests run for desktop and mobile projects
- **THEN** the homepage is compared against committed screenshots
- **AND** pixel differences beyond the configured threshold fail the test.
