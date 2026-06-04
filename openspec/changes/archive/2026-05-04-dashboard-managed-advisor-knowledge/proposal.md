## Why

The operator wants to fully control the advisor's website knowledge/data from the dashboard. This is not model fine-tuning; it is the curated context the advisor uses when answering visitors.

## What Changes

- Move SWEED service, package, FAQ, offer, and CTA knowledge out of hard-coded server data.
- Use Studio-managed prompt blocks/knowledge blocks as the v1 dashboard-controlled source.
- Require the advisor to answer only from the published knowledge blocks.
- Keep the future Sanity CMS path open by treating knowledge as a structured content source, not random prompt text.

## Impact

- Business data can be updated from the dashboard.
- The advisor's answer source becomes visible and editable.
- Sanity can later replace or feed the same knowledge boundary without rewriting the chat UI.
