# DEC-013 — Uploaded executive HTML is a fidelity source

Date: 2026-08-12
Status: accepted
Task: SWEED-035

## Context

Services, Portfolio, and Offers were previously rebuilt as new React compositions from executive briefs. The user clarified that the delivered HTML files were not loose inspiration: their page composition, CSS, SVGs, GSAP motion, and interactions were intended to be reproduced as-is.

The current site still needs one shared SWEED header, footer, AI advisor, routing layer, security policy, and deployment runtime.

## Decision

1. Treat an explicitly delivered executive HTML file as the visual, motion, and interaction source of truth for its route unless the user explicitly requests a redesign.
2. Preserve the uploaded source bytes and assert their SHA-256 fingerprints before runtime normalization.
3. Integrate the reference body inside the current Next.js shell instead of translating it into a new React design.
4. Strip only duplicate reference chrome such as its standalone navbar/footer.
5. Scope broad reference CSS to `.sweed-reference-page` so it cannot restyle the shared shell.
6. Load external reference libraries sequentially before executing the inline reference choreography. Wrap inline scripts in an IIFE so client-side route transitions cannot redeclare top-level `const` or `let` bindings.
7. Keep the old `apps/web/site/pages` files unchanged as a rollback/default legacy path.
8. Do not claim HTML-level fidelity for a route unless its executable HTML reference is available. A DOCX-only brief is not equivalent.

## Alternatives considered

- Rebuild the references as modular React components: rejected for these routes because visual and motion fidelity is the explicit product requirement.
- Replace the existing legacy HTML files directly: rejected because DevSpace cannot consume the uploaded sandbox files directly and the old sources are useful rollback assets.
- Use an iframe: rejected because ScrollTrigger and document-level scrolling would no longer match the page experience.
- Use Next `Script` with `beforeInteractive`: rejected after browser QA showed nondeterministic execution on page-level reference scripts.

## Consequences

- The three routes reproduce the supplied executable references instead of the previous interpretation.
- The shared shell remains consistent and isolated from reference CSS.
- Reference source storage is intentionally data-heavy but deterministic and hash-testable.
- Reference script integration requires a small lifecycle bridge for Next client navigation.
- Future redesign work on these routes requires explicit user approval rather than implicit modernization.

## Verification

- Exact source hashes pass for Services, Portfolio, and Offers.
- Fresh browser sessions register 76, 71, and 42 ScrollTriggers respectively.
- Offers → Portfolio → Services client navigation resets those counts to 42 → 71 → 76 with no runtime errors.
- Desktop/tablet/mobile and reduced-motion checks pass.

## Revisit trigger

Revisit when the user supplies a newer approved HTML reference, explicitly asks to migrate the reference into modular React while preserving pixel/motion fidelity, or retires the reference implementation.
