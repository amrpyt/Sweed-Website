## 1. Research Confirmation

- [x] 1.1 Confirm official docs and primary sources in `research.md` are current.
- [x] 1.2 Confirm selected library/component/service options are compatible with this project.
- [x] 1.3 Confirm common pitfalls and production-readiness concerns have task coverage.

## 2. Implementation

- [x] 2.1 Replace the shared support launcher with a native disclosure-based drawer in `src/features/ai-advisor/ai-advisor-widget.tsx` and related styles.
- [x] 2.2 Add homepage-only runtime fallback behavior in `src/features/legacy-site/legacy-page.tsx` for quick-help cards, service links, partner marquee, and popup timing.
- [x] 2.3 Align legacy homepage enhancement helpers with the current runtime DOM in `src/features/legacy-site/legacy-enhancements.tsx`.
- [x] 2.4 Restore the two business imagery layers behind the legacy homepage hero gradient.
- [x] 2.5 Make the support drawer a visitor choice between AI chat and ticket/WhatsApp support.

## 3. Verification

- [x] 3.1 Run targeted checks for the changed behavior.
- [x] 3.2 Run `bun run lint`.
- [x] 3.3 Run `bun run build`.
- [x] 3.4 Run browser/runtime verification when UI or integration behavior changes.
- [x] 3.5 Run `openspec validate --all --strict`.
- [ ] 3.6 Run `/opsx:verify close-homepage-brief-gaps`.
- [ ] 3.7 Archive the change after verification.
