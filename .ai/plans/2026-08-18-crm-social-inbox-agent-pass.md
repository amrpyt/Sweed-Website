# SWEED CRM Social Inbox + Agent Pass

Date: 2026-08-18
Task: SWEED-041

## Goal

Upgrade the standalone CRM demo so lead acquisition channels are immediately recognizable and the AI Agent visibly operates across social conversations instead of only analyzing CRM records.

## Scope

- Keep the demo frontend-only and deterministic.
- Replace generic channel affordances with mature icon-library visuals only; do not hand-build SVG artwork.
- Give every lead an explicit acquisition source such as Instagram, Facebook, TikTok, website, or referral.
- Surface the source both in the pipeline and the active lead view.
- Add a unified social conversation view in the AI panel.
- Let the AI Agent classify the active lead and generate/send a deterministic simulated reply to the latest inbound message.
- Preserve existing analysis, WhatsApp draft, pipeline movement, reset, responsive behavior, and reduced-motion support.

## Verification

- Add failing reducer tests for source metadata and AI social replies before implementation.
- Run focused CRM tests, spacing/mobile-first checks, full clean `bun run check`, and production build.
- Browser QA the public route at desktop and mobile, including source visibility and the AI reply interaction.
- Deploy only the clean committed CRM changes; preserve unrelated dirty work and do not push.
