## 1. Research Confirmation

- [x] 1.1 Confirm the current admin/API repo pattern is still the right fit for this control surface.
- [x] 1.2 Confirm route handlers and client runtime boundaries from the official Next.js docs are still current.

## 2. TDD Red

- [x] 2.1 Add failing unit tests for the settings contract defaults and validation rules.
- [x] 2.2 Add a failing unit test for WhatsApp link generation with section-aware templates.
- [x] 2.3 Add a failing server-store test for persisted settings read/write behavior.

## 3. Implementation

- [x] 3.1 Add the offer funnel settings contract and pure helper functions.
- [x] 3.2 Add the server-side settings store and admin API route.
- [x] 3.3 Add the internal admin control page and simple form UI.
- [x] 3.4 Add the shared public runtime controller and popup UI.
- [x] 3.5 Inject the controller into `LegacyPage`.

## 4. Verification

- [x] 4.1 Re-run the new unit tests and confirm GREEN.
- [x] 4.2 Run `bun run unit`.
- [x] 4.3 Run `bun run typecheck`.
- [x] 4.4 Run `bun run lint`.
- [x] 4.5 Run `bun run build`.
- [ ] 4.6 Run `bun run smoke`.
- [x] 4.7 Run `openspec validate implement-offer-trigger-and-whatsapp-controls --type change --strict`.
- [x] 4.8 Run `openspec validate --all --strict`.
