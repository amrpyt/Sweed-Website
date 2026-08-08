# Polish homepage rhythm, portfolio carousel, slogan band, and footer

## Why

The homepage is structurally sound, but several visual relationships are uncomfortable at real viewport sizes: the hero contains a decorative diagonal beam that reads as a rendering defect, page sections use an overly wide spread between default and feature spacing, the portfolio section becomes unnecessarily tall, the slogan composition stacks more than the brief requires, the blog header carries too much empty space, and the public footer ends as a conventional link grid rather than a strong SWEED brand moment.

## What changes

- Remove the decorative hero beam that crosses the building artwork.
- Introduce a homepage-local macro spacing cadence using the existing Carbon token scale instead of changing global site tokens.
- Rebuild homepage portfolio projects as one horizontal, manually controlled, scroll-snapped carousel with keyboard-accessible previous/next controls and no autoplay.
- Recompose the SWEED slogan as one horizontal brand band: `نحدد لك الاتجاه` + north mark + `ونلتزم معك بالوصول`.
- Tighten the homepage blog heading composition to remove the oversized empty header block.
- Refactor the shared public footer out of inline CSS and add an oversized English `SWEED` wordmark as the final visual element.
- Preserve routes, content claims, proof states, conversion behavior, and accessibility contracts.

## Boundaries

- Keep the existing Next.js, React, CSS Modules, GSAP, and Carbon-spacing foundation.
- Do not add a new carousel or animation dependency.
- Do not autoplay the portfolio carousel.
- Do not change public URL structure or navigation labels.
- Do not publish new claims or case-study numbers.
- Do not change global spacing tokens to solve a homepage-only composition problem.
- Do not push without explicit approval.

## Outcome

The homepage has a calmer page rhythm, shorter portfolio journey, one-line brand statement, cleaner article transition, and a distinctive brand-led footer that remains accessible and responsive from 320px upward.
