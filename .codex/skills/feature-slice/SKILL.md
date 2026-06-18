---
name: feature-slice
description: Split an oversized feature-planning result into multiple independent feature sprint folders after feature-planner, when docs/features/{name}/prd.md and issues.md are still too broad and need to become separate docs/features/{sprint-name}/ packages with their own spec-original.md, spec-fixed.md, prd.md, and issues.md.
---

# Feature Slice

Use this skill when `feature-planner` has already produced a feature plan, but the scope is still too large for one development sprint and must be divided into multiple feature sprint folders. When invoked, immediately inspect the source feature docs and propose split candidates; do not ask the user to pre-review the scope first.

Follow `docs/features/feature-sprint-splitting-conditions.md` when it exists in the repository. Treat it as the source of truth for this workflow.

## Core Rule

Do not split only `issues.md`.
Split the sprint itself.

Each resulting sprint must have its own `docs/features/{sprint-name}/` directory and its own `spec-original.md`, `spec-fixed.md`, `prd.md`, and `issues.md`.

## Workflow

1. Automatically read the original feature's `spec-original.md`, `spec-fixed.md`, `prd.md`, `issues.md`, and `design.md` if present, plus the relevant codebase.
2. Identify where the original feature is too broad and which user-visible slices can become independent sprint folders.
3. Propose at least two sprint-split candidates.
4. Include for each candidate:
   - sprint name
   - new folder path
   - included requirements
   - excluded requirements
   - dependency on other sprints
   - scope removed from the source feature
   - recommendation and reason
5. Stop for user confirmation before creating any new feature folder.
6. After approval, create the new `docs/features/{sprint-name}/` folders.
7. Write each sprint's `spec-original.md`, `spec-fixed.md`, `prd.md`, and `issues.md` from scratch for that sprint.
8. Add `design.md` only when the sprint has UI-specific behavior that needs it.
9. Keep the source feature's `prd.md` and `issues.md` aligned with the split, and preserve `spec-original.md` unless the user explicitly requests otherwise.
10. Split technical decisions by topic when the new sprint needs its own ADRs. Do not collapse unrelated decisions into one block.
11. Stop again after the updated source feature scope is ready and wait for user confirmation.
12. Compare all sprint docs for duplicate requirements, duplicate ACs, and dependency order before finishing.

## Split Criteria

Split by user value, not by implementation layer.

Good split boundaries:

- base feature vs. advanced feature
- read flow vs. write flow
- search, filter, save, share, automation, or another user-visible capability
- prerequisite sprint vs. dependent follow-up sprint
- same data model, different completion criteria

Bad split boundaries:

- hook, component, utility, or API layer only
- test-only, refactor-only, or type-only work
- invisible internal prep work
- new requirements that were not in the original PRD
- anything already excluded by Out of Scope unless the user explicitly approves a new sprint

## Output Rules

- Write all documents in Korean.
- Keep documents structured so the user can see scope quickly.
- Keep `prd.md` and `issues.md` in the same scope.
- Make every issue a vertical user-visible slice that can fit a half-day to one-day Red -> Green -> Refactor cycle.
- Keep Out of Scope concrete and specific.
- Ask for ADR confirmation one topic at a time when a sprint needs new technical decisions.

## Completion Check

Before finishing, verify that:

- each new sprint has its own feature folder and document set
- the source feature's scope reflects the split
- no duplicate requirements or ACs exist across sprint docs
- dependencies between sprints are clear
- no unconfirmed requirement or ADR slipped in
