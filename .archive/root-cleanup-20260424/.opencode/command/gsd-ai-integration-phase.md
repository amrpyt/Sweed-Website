---
description: Generate AI design contract (AI-SPEC.md) for phases that involve building AI systems — framework selection, implementation guidance from official docs, and evaluation strategy
argument-hint: "[phase number]"
tools:
  read: true
  write: true
  bash: true
  glob: true
  grep: true
  task: true
  webfetch: true
  websearch: true
  question: true
  mcp__context7__*: true
---
<objective>
Create an AI design contract (AI-SPEC.md) for a phase involving AI system development.
Orchestrates gsd-framework-selector → gsd-ai-researcher → gsd-domain-researcher → gsd-eval-planner.
Flow: Select Framework → Research Docs → Research Domain → Design Eval Strategy → Done
</objective>

<execution_context>
@/media/amr/02D804FAD804EE2B/Busniss/SWEED-Website/.opencode/get-shit-done/workflows/ai-integration-phase.md
@/media/amr/02D804FAD804EE2B/Busniss/SWEED-Website/.opencode/get-shit-done/references/ai-frameworks.md
@/media/amr/02D804FAD804EE2B/Busniss/SWEED-Website/.opencode/get-shit-done/references/ai-evals.md
</execution_context>

<context>
Phase number: $ARGUMENTS — optional, auto-detects next unplanned phase if omitted.
</context>

<process>
Execute @/media/amr/02D804FAD804EE2B/Busniss/SWEED-Website/.opencode/get-shit-done/workflows/ai-integration-phase.md end-to-end.
Preserve all workflow gates.
</process>
