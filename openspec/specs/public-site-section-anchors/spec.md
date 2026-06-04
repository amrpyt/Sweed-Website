# public-site-section-anchors Specification

## Purpose
TBD - created by archiving change add-legacy-section-anchors. Update Purpose after archive.
## Requirements
### Requirement: Stable section anchors

Public legacy-backed pages SHALL expose stable URL hash anchors for important sections without changing their visual layout.

#### Scenario: Homepage section is linked directly

- **WHEN** a visitor opens `/#expertise`
- **THEN** the expertise section SHALL exist with `id="expertise"`

#### Scenario: Inner page section is linked directly

- **WHEN** a visitor opens `/about#story`
- **THEN** the relevant section SHALL exist with `id="story"`

#### Scenario: Existing anchors are preserved

- **WHEN** a legacy section already has an `id`
- **THEN** the renderer SHALL keep that existing ID

