---
name: skill-review
description: 'Review one completed issue after refactor and before commit by collecting TypeScript errors, npm audit vulnerabilities, and src/ environment variable exposure candidates. Use when the user invokes /skill-review or asks Codex to run a pre-commit skill review for a GitHub issue, classify findings, request item-by-item approval, and fix only approved immediate-risk items.'
---

# Skill Review

Use this skill after refactor is complete and before committing issue work. The goal is to find type failures and security risks, classify them clearly, and fix only the immediate-risk findings that the developer approves item by item.

## Input

Require one issue number, usually from:

```text
/skill-review 2
```

Treat the issue number as `$ARGUMENTS`.

## Required Context

1. Find exactly one issue document matching `docs/features/**/issue-${ARGUMENTS}.md`.
2. If no issue document is found, stop and ask the developer to confirm the issue number or feature folder.
3. If multiple issue documents match, stop and ask the developer to choose the correct document.
4. Read the issue document before scanning. Use it to understand the feature scope and target files.
5. Prioritize issue-related target files when interpreting findings, but run the pre-commit scan commands against the current project as specified below.

## Scan Commands

Run these commands in order from the repository root:

```bash
npx tsc --noEmit
npm audit
rg -n "process\.env|import\.meta\.env|NEXT_PUBLIC_|VITE_" src
```

Collect command output without fixing anything during the scan phase.

- If `npx tsc --noEmit` reports type errors, collect file paths, line numbers, and concise error summaries.
- If `npm audit` reports vulnerabilities, collect package name, severity, affected range, vulnerable path, and recommended non-force fix when available.
- If the environment-variable search reports matches, collect file paths, line numbers, variable names or prefixes, and the visible usage context.
- Do not add package-manager detection or environment fallback logic. This skill is only for the current project.

## Classification

Classify every collected finding into exactly one category:

- `즉시 수정 필요`: Security risk or build-failing issue. Include type errors that block compilation, high/critical audit findings, secret exposure risks, and environment-variable usage that can leak private values to client-facing code.
- `권장 수정`: Quality, maintainability, or lower-severity dependency issues that do not block the current commit and do not create a clear security risk.
- `무시 가능`: False positive, intended pattern, or finding outside the issue scope with no actionable risk.

For `src/` environment-variable usage, collect all `process.env`, `import.meta.env`, `NEXT_PUBLIC_`, and `VITE_` matches first. Classify after reviewing context; do not assume public prefixes are safe or unsafe without checking how they are used.

## Approval Gate

Before editing files, report the findings grouped by category and request item-by-item approval for each `즉시 수정 필요` item.

The approval request must include:

- item id
- category
- file or package
- risk summary
- proposed fix
- expected files to edit

Do not fix `권장 수정` or `무시 가능` items in this skill run.

If the developer approves only some `즉시 수정 필요` items, fix only the approved items. If the developer does not approve any item, stop after reporting.

## Fix Rules

- Modify only files required for developer-approved `즉시 수정 필요` items.
- Do not modify tests:
  - `*.test.*`
  - `*.spec.*`
  - files under `__tests__/`
  - files under `__mocks__/`
  - snapshot files
- Do not run `npm audit fix --force`.
- Do not fix unrelated failures.
- Do not perform broad refactors.
- If a finding needs judgment during implementation, stop and ask for developer approval before continuing.

## Rescan

After fixing approved items, rerun only the scans needed to verify those items:

- Rerun `npx tsc --noEmit` after type fixes.
- Rerun `npm audit` after dependency or package-lock changes.
- Rerun the `rg` environment-variable scan after exposure fixes.

Confirm whether every approved item is clean. If an approved item remains unresolved, report the blocker and do not expand the fix scope without new approval.

## Final Report

Report:

- issue document used
- commands run
- findings by category
- approved items fixed
- files modified
- rescan results
- remaining unapproved or unresolved items
- confirmation that test files, mocks, and snapshots were not modified
