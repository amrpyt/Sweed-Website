## Context

The advisor needs curated SWEED data: services, packages/offers, FAQs, CTAs, and qualification rules. In v1, the codebase still has a local seed for debug and fallback, but the operator wants the live answer source to be dashboard-managed.

Mastra Studio prompt blocks can hold operator-editable Markdown/context and can be published with the agent configuration. Future Sanity CMS can later feed the same knowledge boundary because the runtime UI only depends on the advisor server boundary, not the storage source.

## Goals / Non-Goals

**Goals:**

- Treat Studio-published knowledge/prompt blocks as the runtime knowledge source.
- Keep a safe local seed for first-run development and debug visibility.
- Keep the knowledge shape compatible with future Sanity documents.
- Prevent the advisor from inventing missing prices or unsupported details.

**Non-Goals:**

- Implement Sanity CMS in v1.
- Build a full knowledge editor inside the Next.js site.
- Add lead capture tools or spreadsheet writes in this change.
- Fine-tune a model.

## Decisions

1. Put live business knowledge in the published Studio-managed agent context.
   - Rationale: this gives the operator immediate dashboard control without changing website code.
   - Alternative considered: keep `buildSweedKnowledge()` as the primary source. Rejected because it requires code edits for business data changes.

2. Keep `buildSweedKnowledge()` as a first-run/debug seed only.
   - Rationale: local development and `/admin/ai-debug` still need visible baseline data when Studio has not been configured.
   - Alternative considered: delete all local knowledge. Rejected because it would make first-run setup brittle.

3. Model future CMS data as structured sections, even when the v1 source is Markdown.
   - Rationale: services, offers, FAQs, CTAs, and qualification rules map cleanly to future Sanity document types.
   - Alternative considered: one long unstructured prompt. Rejected because it is harder to validate and migrate.

4. Keep price honesty in the agent rules.
   - Rationale: if published knowledge has no price, the advisor must say SWEED team confirmation is required.
   - Alternative considered: infer likely prices from package names. Rejected because it creates sales risk.

## Risks / Trade-offs

- [Risk] Studio-managed text can drift from website content. -> Mitigation: future Sanity integration should become the shared source or feed Studio context.
- [Risk] Missing required sections produce vague answers. -> Mitigation: keep seed/debug visibility and add operator checklist before production publishing.
- [Risk] Operators paste too much content into prompt blocks. -> Mitigation: keep knowledge sectioned and concise, then move to CMS/RAG later if content grows.

## Migration Plan

1. Publish current SWEED services/offers/FAQs/CTAs into Studio-managed instructions or prompt blocks.
2. Keep local seed available for debug and first-run fallback.
3. Verify answer changes after Studio publish.
4. Verify price questions are answered honestly when price data is missing.
5. Later, map Sanity documents into the same sections and remove manual duplication.

## Open Questions

- Should production knowledge live only in Studio, or should Sanity become the canonical source and Studio only control behavior?
- What exact fields should the first Sanity schemas use for packages, service categories, FAQs, and CTAs?
