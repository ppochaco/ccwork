---
name: tdd-refacor
description: Refactor production code changed for one issue while preserving passing tests. Use when the user invokes /tdd-refacor or asks for the TDD Refactor step after tests are green, especially for src/ files changed on the current branch relative to main and an optional docs/features/*/issue-{N}.md issue document.
---

# TDD Refactor

Use this skill after the TDD green step is complete. The goal is to improve production-code structure while keeping the test suite green and without changing behavior.

## Input

Accept an optional issue number, usually from:

```text
/tdd-refacor 2
```

Treat the issue number as `$ARGUMENTS`.

## Required Context

1. Read `AGENT.md` to understand project conventions for naming, patterns, styling, and workflow.
2. If `$ARGUMENTS` is present, find `docs/features/*/issue-{N}.md` for that issue number and read its requirements plus completed scenario scope.
3. Run `npm test` before refactoring. Start only if the full test suite passes.
4. Identify candidate production files with:

```bash
git diff main...HEAD --name-only -- src/
```

5. Exclude test files such as `*.test.ts` and `*.test.tsx`.
6. Review only the remaining files against the refactor criteria below.

## Refactor Criteria

Look for small, behavior-preserving improvements:

- Remove duplicated production logic.
- Improve names that do not reveal intent.
- Split functions or components that have taken on multiple responsibilities.
- Reduce unnecessary complexity, including magic numbers, excessive nesting, or abstractions that do not earn their cost.
- Align code with `AGENT.md` and existing project patterns.

## Approval Gate

Before editing, report the refactor target list to the developer and wait for approval.

For each target, include:

- file path
- issue-related reason for considering it
- proposed refactor type
- expected behavior impact, which should be none

## Refactor Loop

Apply one behavior-preserving change at a time.

1. Make one focused refactor.
2. Run `npm test`.
3. If tests pass, continue to the next approved change.
4. If tests fail, revert only the refactor change you just made.
5. Do not revert existing user changes or any changes that predate the current refactor attempt.
6. Try a different approach only if it still fits the approved scope and constraints.

## Constraints

- Do not add new features.
- Do not edit test files.
- Do not edit files outside `src/`.
- Do not edit files outside the `git diff main...HEAD --name-only -- src/` result.
- Do not change public behavior, scenario coverage, or issue requirements.
- Do not update issue scenario checkboxes; this skill is only for the refactor phase.

## Final Report

Report:

- issue document used, if any
- production files refactored
- summary of before and after structure
- commands run
- whether `npm test` passed after each change
- any approved targets intentionally skipped and why
