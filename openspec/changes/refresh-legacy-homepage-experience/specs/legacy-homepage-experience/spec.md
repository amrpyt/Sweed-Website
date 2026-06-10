## ADDED Requirements

### Requirement: Sticky public chrome
The homepage SHALL keep the top bar and main header visible while users scroll.

#### Scenario: Visitor scrolls down the homepage
- **WHEN** the visitor scrolls past the hero section
- **THEN** the top bar and main header MUST remain visible.

### Requirement: Official brand logo
The homepage SHALL use the official SWEED Color 1 SVG logo from the brand assets.

#### Scenario: Homepage header is rendered
- **WHEN** the visitor opens the homepage
- **THEN** the header MUST display the official SWEED color logo instead of text-only branding.

### Requirement: Readable shared Arabic chrome
The shared legacy header and breadcrumb SHALL render readable Arabic labels without encoding corruption.

#### Scenario: Visitor opens a public legacy page
- **WHEN** the shared header or breadcrumb is rendered
- **THEN** menu labels, helper labels, and CTA copy MUST appear as readable Arabic text.

### Requirement: Business hero visual
The homepage hero SHALL use the brand color gradient and two smooth rotating business image backgrounds.

#### Scenario: Homepage hero is visible
- **WHEN** the visitor views the first screen
- **THEN** the hero MUST show business imagery under a light blur and brand-colored overlay.

### Requirement: Compact homepage sections
The homepage SHALL reduce visual crowding by using compact horizontal experiences for problems, portfolio, and services.

#### Scenario: Visitor reaches the problems section
- **WHEN** the problems section is shown
- **THEN** it MUST show a compact row of problem cards instead of a long dense grid.

#### Scenario: Visitor reaches the portfolio section
- **WHEN** the portfolio section is shown
- **THEN** it MUST show four portfolio cards with navigation arrows and a "مشاهدة المزيد" action.

#### Scenario: Visitor reaches the services section
- **WHEN** the services section is shown
- **THEN** it MUST show six services in a carousel-ready layout with navigation controls and a "مشاهدة المزيد" action.

### Requirement: Quick CTA to contact prefill
The homepage quick CTA SHALL pass the selected service to the contact page, and the contact form SHALL support multiple selected services.

#### Scenario: Visitor submits the quick CTA
- **WHEN** the visitor chooses a service and starts the success journey
- **THEN** the contact page MUST open with that service pre-selected in the multi-select service field.

### Requirement: Static how-we-work section
The homepage SHALL show a four-step "كيف نعمل معك" section in SWEED brand colors without automatic movement.

#### Scenario: Visitor reaches the how-we-work section
- **WHEN** the visitor scrolls to the process section
- **THEN** the section MUST show four visible step cards in a fixed layout.
- **AND** it MUST NOT auto-scroll or auto-rotate on its own.
