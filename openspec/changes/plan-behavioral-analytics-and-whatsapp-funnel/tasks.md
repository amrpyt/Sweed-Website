## 1. Research Confirmation

- [ ] 1.1 Confirm OpenReplay self-host and Next.js integration requirements are still current before implementation.
- [ ] 1.2 Confirm whether SWEED wants fully self-hosted analytics or accepts managed open-core tooling.
- [ ] 1.3 Confirm legal/privacy expectations around visitor replay, consent, and IP enrichment before production rollout.

## 2. Architecture Decision

- [ ] 2.1 Create child change `choose-analytics-stack-and-visitor-identity` and lock the primary platform decision.
- [ ] 2.2 Decide and document the canonical visitor identity model: anonymous visitor ID, session ID, and optional IP metadata.
- [ ] 2.3 Decide retention, masking, and sanitization policy before any production-grade event collection.

## 3. Implementation Planning

- [ ] 3.1 Create child change `integrate-openreplay-and-core-events`.
- [ ] 3.2 Create child change `implement-section-dwell-and-offer-triggers`.
- [ ] 3.3 Create child change `wire-whatsapp-cta-and-prefilled-messages`.
- [ ] 3.4 Create child change `configure-visitor-funnel-and-interest-dashboards`.
- [ ] 3.5 Create child change `harden-analytics-privacy-and-retention`.

## 4. Verification

- [ ] 4.1 Validate this planning change with `openspec validate plan-behavioral-analytics-and-whatsapp-funnel --type change --strict`.
- [ ] 4.2 Validate all OpenSpec items with `openspec validate --all --strict`.
- [ ] 4.3 Run `/opsx:verify plan-behavioral-analytics-and-whatsapp-funnel` before archiving or implementing child changes.
