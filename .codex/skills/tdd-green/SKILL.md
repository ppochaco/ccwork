---
name: tdd-green
description: 'Implement the minimal production code needed to turn approved TDD red tests green for one GitHub issue. Use when the user invokes /tdd-green or asks to run the green step after /tdd-red for docs/features/{feature}/issue-{N}.md checkbox scenarios, updating only scenario completion checkboxes after verified passing tests.'
---

# TDD Green

Use this skill after `tdd-red` has written tests for approved issue scenarios. The goal is to make every unchecked scenario for one issue pass with the smallest production-code change, one scenario at a time.

Do not write or edit tests while using this skill.

## Input

Require one GitHub issue number, usually from:

```text
/tdd-green 2
```

Treat the issue number as `$ARGUMENTS`.

## Required Context

1. Find `docs/features/{feature}/issue-{N}.md` for the issue number.
2. If `{feature}` cannot be inferred from feature docs, branch name, or issue docs, ask only for the missing feature folder name.
3. Read the issue document's confirmed test context, target files, and `## 테스트 시나리오`.
4. Read `issues.md` and `prd.md` only when needed to interpret already-confirmed AC, public contracts, glossary terms, or ADRs.
5. For UI changes, read relevant `docs/design-system/` docs and `docs/features/{feature}/design.md` as needed. If an issue has a "디자인 참고" section, read it. Also follow `AGENT.md` styling conventions.

## Scenario Document Contract

Approved scenarios must live under `## 테스트 시나리오` using classification subheadings and checkbox items:

```markdown
### 정상

- [ ] Target - should [기대 동작] when [조건]
```

Allowed classification headings are `### 정상`, `### 경계`, `### 예외`, `### 접근성`, and `### 회귀`.

- Treat `[ ]` as not yet green.
- Treat `[x]` as the scenario's matching test has passed and green implementation verification is complete.
- Determine classification only from the subheading. If scenario text starts with labels such as `[정상]` or `[경계]`, stop and report that the issue document does not match the current project format.
- Match a scenario to a test by comparing the text after `Target - `, starting with `should ... when ...`, to the test name.

## Test Scope

Run only issue-related tests while working on scenarios.

- Use the target file and scenario name to identify the colocated test file.
- For a single scenario, run:

```bash
npm test -- {test-file-path} -t "should ... when ..."
```

- Run full `npm test` only after all issue scenarios are green.
- If the first pre-change scenario run fails before reaching assertions because of collect, import, test syntax, or test setup failure, do not edit tests. Report it as a red/test artifact problem and stop.

## Green Loop

Process scenarios in document order.

1. Skip checked scenarios.
2. For the first unchecked scenario, run the narrow scenario command.
3. If it already passes, update only that scenario checkbox to `[x]`, then move to the next unchecked scenario.
4. If it fails at assertion, Testing Library query, thrown-error mismatch, DOM/content mismatch, or equivalent behavior assertion, implement the smallest production-code change needed for that scenario.
5. Re-run the same narrow scenario command.
6. If the scenario still fails, inspect the error and revise production code. Retry at most 5 times.
7. If it still fails after 5 retries, stop and report the failure cause.
8. If green implementation introduces a new collect, import, test syntax, or test setup failure after code changes, treat it as a production-code regression from the current work and fix it within the same 5-retry limit.
9. Once the narrow scenario command passes, update only the scenario checkbox in `## 테스트 시나리오` from `[ ]` to `[x]`.
10. Leave failed or blocked scenarios unchecked and report why.
11. Continue with the next unchecked scenario.

## Implementation Rules

- Modify production code only. Do not modify test files.
- Do not implement behavior that is not covered by the approved scenario tests.
- Do not fix unrelated failures.
- Avoid unnecessary abstraction or refactors.
- For UI components, satisfy the tested behavior and apply relevant design-system or feature-design styling only within UI already being changed.
- Apply design docs through the project's existing CSS/Tailwind token mapping. Do not add visual elements that are not in the scenario or design docs.

## Final Verification

After all issue scenarios are checked:

1. Run `npm test`.
2. If full regression has failures unrelated to issue N, do not fix them. Report them separately.
3. Do not revert `[x]` checkboxes that were earned by passing narrow scenario tests because of unrelated full-regression failures.
4. If issue-related tests all pass and full regression does not fail for unrelated reasons, optionally run `npm run test:coverage` when that script exists.
5. Do not add tests only to improve coverage.

## Final Report

Report:

- issue document used
- scenarios changed from `[ ]` to `[x]`
- production files modified
- commands run
- remaining unchecked scenarios and why
- unrelated full-regression failures, if any
- whether coverage was run or skipped
