# DEC-010 — Keep About-page placeholders visibly outside the proof boundary

Date: 2026-07-23
Status: accepted
Related task: SWEED-017

## Context

The approved About-page delivery contains final narrative copy for SWEED’s story, promise, values, metrics, and methodology. It also contains temporary names, portraits, alliance identities, partner logos, and testimonial examples that must be replaced before production launch.

Rendering those temporary records like normal client proof would make unverified people, organizations, and quotes appear factual.

## Decision

- Store verification state explicitly in the About-page content model.
- Publish the two supplied leadership names as verified names while still marking their missing portraits as pending media.
- Replace the four temporary leadership names with neutral `الاسم قيد التسليم` records while preserving the approved role descriptions.
- Present alliances as capability slots with `الجهة قيد التوثيق`, not named organizations.
- Present partner-logo positions as numbered design slots with a clear notice that they are not client names.
- Present testimonial copy as structural examples labeled `نموذج غير منشور`, not as published customer endorsements.
- Add automated content tests that enforce the verified/placeholder counts and notices.

## Alternatives Considered

### Render every supplied placeholder name and quote as final content

Rejected. The source explicitly labels them temporary and requires written approval for real testimonials and logo publication.

### Remove all incomplete sections

Rejected. The approved page structure includes leadership, alliances, partners, and testimonials. Visible, honest placeholders let stakeholders review the final composition without inventing proof.

### Use generic stock portraits and fake logos

Rejected. This would make design assets look like real people or organizations and weaken trust.

## Consequences

- The full page can be reviewed now without false claims.
- The production replacement path is data-only for most pending records.
- Placeholder-heavy sections look intentionally provisional rather than deceptively finished.
- Official portraits, identities, logos, and written testimonial permissions remain launch dependencies.

## Verification

- Focused About-page tests enforce two verified leadership names, four placeholder leadership records, four placeholder alliances, and placeholder testimonials.
- Browser QA confirms visible placeholder labels across every unverified proof section.
- No unverified partner or alliance name is rendered as a factual customer relationship.

## Revisit Trigger

Revisit each record individually when SWEED supplies the official asset, identity, publication permission, and any required evidence.
