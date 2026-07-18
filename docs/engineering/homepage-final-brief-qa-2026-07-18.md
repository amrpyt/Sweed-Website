# SWEED Homepage Final Brief QA

Date: 2026-07-18  
Environment: `https://sweed-demo.coderaai.com`  
Scope: approved July 2026 homepage brief, modular React/Next implementation

## Release result

The approved homepage order, navigation, conversion paths, media behavior, FAQ schema, dynamic articles, contact form, footer, and support widget flows are implemented and deployed to the public demo environment.

## Audit health score

| Dimension | Score | Key finding |
| --- | ---: | --- |
| Accessibility | 4/4 | One page H1, semantic section headings, labelled fields, keyboard-safe video dialogs, visible focus, 44px primary mobile header targets, reduced-motion handling |
| Performance | 3/4 | 16 of 17 homepage images are lazy; hero image is priority; videos have no `src` until their dialog opens and use `preload="none"`; one 9.2MB placeholder video remains on-demand |
| Responsive design | 4/4 | Verified at 1440×1000 and 390×844 with no horizontal overflow or broken images |
| Theming | 3/4 | Active homepage uses the approved purple, pink/red, gray, and white palette; some CSS remains literal rather than token-only |
| Anti-patterns | 4/4 | `bun run design:detect` completes with zero findings after removing layout-property transitions and generic decorative button content |
| **Total** | **18/20** | **Excellent — release-ready for the demo, with non-blocking operational/content follow-up** |

## Verified behavior

- Homepage navigation contains exactly seven items in the approved order and points to stable homepage anchors.
- Homepage section order is: hero, problems, about, slogan, services, why SWEED, portfolio, offers, FAQ, blog, contact.
- Hero exposes the approved primary and secondary CTAs.
- Hero and about videos open in accessible dialogs, do not autoplay sound, and are not requested before opening.
- Problem cards record the selected problem and mapped service before focusing contact.
- Services use six distinct images and service-specific destinations.
- Trust metrics count once on viewport entry and respect reduced-motion settings.
- Portfolio cards expose a fixed media ratio, service filter, and one numeric result each.
- Offer cards contain four inclusions; the growth offer is featured and carries its name to contact.
- FAQ keeps at most one answer open and publishes valid `FAQPage` JSON-LD.
- Homepage displays the latest three articles from the shared content source.
- Contact form validates fields, preserves problem/service/offer/source attribution, and shows real success/error states.
- Lead API applies body-size limits, per-IP request throttling, and a honeypot before writing to the local lead store.
- AI advisor returns a useful local recommendation when no external model provider is configured.
- Support tickets use the same contact endpoint; WhatsApp destinations are live.
- Footer has no empty social links and uses actionable phone/email links plus homepage anchors.
- Homepage publishes Arabic description, canonical URL, Open Graph metadata, and Twitter card metadata.

## Automated verification

- `bun run design:detect`: passed, zero findings.
- `bun run check`: passed; typecheck, lint, and unit tests completed.
- `bun run build`: passed; all production routes generated.
- AI advisor unit tests: 12 passed.
- Full Playwright suite for `public-site.spec.ts` and `ai-advisor.spec.ts`: 63 passed, 3 desktop skips for mobile-only scenarios, 0 failed.
- Post-polish focused regression: 7 passed, 3 expected desktop skips, 0 failed.
- Public demo: HTTP/2 200 after final restart.

## Browser QA evidence

Desktop full-page capture:

`/var/tmp/agent-browser/artifacts/sweed-homepage/final/home-desktop.png` — 1425×15151

Mobile full-page capture:

`/var/tmp/agent-browser/artifacts/sweed-homepage/final/home-mobile.png` — 375×15873

DOM and runtime checks on the public demo found:

- zero duplicate IDs;
- zero broken images;
- zero unlabeled controls;
- zero horizontal overflow;
- one H1;
- 16 lazy-loaded images out of 17 homepage images;
- no video source attached before opening a dialog;
- 44px mobile targets for logo, start CTA, menu toggle, and WhatsApp menu link;
- progress indicator updates through `transform: scaleX()` rather than animating width.

## Remaining non-blocking items

### P2 — existing lint warnings outside the new homepage work

Six warnings remain in older shared/legacy components: raw `<img>` usage, one hook dependency warning, and one unused error variable. They do not fail the build or current homepage tests but should be cleaned in a separate maintenance change.

### P2 — existing Next.js build warnings

Next.js reports workspace-root inference from multiple lockfiles and a broad NFT trace originating from the legacy asset route. The build succeeds, but deployment tracing should be narrowed in a dedicated infrastructure cleanup.

### P3 — final content and media handoff

The brief explicitly treats current copy, project numbers, article content, and most media as placeholders. Final assets should be delivered at the ratios already implemented, without changing the layout.

### P3 — lead delivery integration

Leads are stored locally at `~/.local/share/sweed/contact-leads.jsonl` with private permissions. Set `SWEED_CONTACT_WEBHOOK_URL` to forward each saved lead to the approved CRM, email automation, or Google Sheet endpoint while retaining local persistence.
