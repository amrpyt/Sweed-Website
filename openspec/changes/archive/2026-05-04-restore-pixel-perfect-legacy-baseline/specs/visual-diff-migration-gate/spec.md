## ADDED Requirements

### Requirement: Screenshot parity gate
Future componentized pages SHALL pass Playwright visual comparisons against captured legacy baselines before becoming active.

#### Scenario: Componentized page is proposed for activation
- **WHEN** a route is switched from legacy baseline to typed components
- **THEN** the route MUST pass screenshot comparison for desktop and mobile viewports

### Requirement: Baseline capture is deterministic
Visual baseline tests SHALL use fixed viewports and stable local content.

#### Scenario: Visual tests run
- **WHEN** screenshot tests run
- **THEN** they MUST use deterministic viewport sizes and avoid dynamic external content where practical

