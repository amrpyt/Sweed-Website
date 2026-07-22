# DEC-006 — Publish only verified case-study results

Date: 2026-07-23
Status: accepted
Related task: SWEED-009

## Context

The approved final homepage content contains a full portfolio table, but explicitly states that only the first case-study result is documented. The remaining project names, narratives, and numerical outcomes are examples of the intended final format and must not be presented as verified facts.

SWEED’s approved brand language also rejects absolute promises, fabricated performance claims, and numbers that cannot be evidenced.

## Decision

- Publish the documented `مصنع النخبة للصناعات الغذائية` case with its approved result: a 22% reduction in operating costs over six months.
- Represent additional homepage portfolio slots as clearly labeled `قيد التوثيق` case-study templates.
- Do not show client names or numerical outcomes for pending cases.
- Add an automated homepage-content test that enforces exactly one verified case in the current dataset and prevents pending cards from carrying numerical results.
- Replace pending cards only after their source, client approval, narrative, and measurable outcome are documented.

## Alternatives Considered

### Publish all supplied examples as real work

Rejected. The source explicitly says their numbers are not verified, and publishing them would contradict SWEED’s own content policy.

### Remove the extra cards entirely

Rejected for now. The approved section design expects multiple examples, and clearly labeled pending templates communicate the final format without misrepresenting evidence.

### Publish examples without a status label

Rejected. Visitors could reasonably interpret them as completed client projects.

## Consequences

- The homepage remains visually complete without inventing proof.
- The portfolio section is honest about its current evidence level.
- Additional case studies require a small content replacement rather than a redesign.
- The pending labels may reduce short-term social proof, but preserve long-term trust and legal safety.

## Verification

- `homepage-content.test.ts` confirms one verified case.
- The verified result contains `22%`.
- Every pending case carries `النتيجة الرقمية قيد التوثيق`.
- Browser QA confirmed one verified card and two visibly pending cards.

## Revisit Trigger

Revisit when a new case study has a verified client identity, approved narrative, timeframe, and measurable result.
