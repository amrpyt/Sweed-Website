## ADDED Requirements

### Requirement: No-hydration support drawer fallback
The fixed support surface SHALL remain usable even when client hydration is weak on legacy pages.

#### Scenario: Visitor opens the support surface
- **WHEN** the visitor activates the support launcher
- **THEN** the panel MUST open using native browser behavior without requiring React state.
- **AND** it MUST let the visitor choose between direct AI chat and support/ticket/WhatsApp paths.
- **AND** direct AI chat MUST send visitor questions to the advisor API when hydration is available.
- **AND** it MUST show direct WhatsApp access, knowledge base access, and a support ticket form.
