---
name: tdd-red
description: 'Write scenario-coverage tests from approved issue requirements. Use when the user invokes /tdd-red or asks to convert docs/features/{name}/issue-{N}.md test contracts and scenarios, or docs/features/{name}/issues.md Acceptance Criteria into Vitest and React Testing Library tests, recording whether each scenario currently fails or passes, and allowing only minimal function/component/hook signature scaffolding needed to avoid import or call-signature errors.'
---

# TDD Red

Use this skill for the test-writing step before implementation: turn approved issue requirements into scenario-covering tests. The goal is to cover every approved scenario in executable tests and record whether each test currently fails or already passes.

Do not implement production behavior while using this skill.

## Input

Require one github issue number, usually from:

```text
/tdd-red 2
```

Treat the issue number as `$ARGUMENTS`.

## Required Context

Before writing tests:

1. Prefer `docs/features/{name}/issue-{N}.md` when it exists.
2. If `issue-{N}.md` exists, read the approved test contracts, initial expected states, error cases, test scenarios, and AC coverage from it.
3. If `issue-{N}.md` does not exist, read the approved issue from `docs/features/{name}/issues.md` and derive test scenarios from its Acceptance Criteria.
4. Read `docs/features/{name}/prd.md` only to resolve already-confirmed public contracts, glossary terms, and ADR decisions needed to interpret the AC. Do not use the PRD to add new scope.
5. For every target file named by the issue document or derived AC, check whether the file exists before writing tests.
6. Inspect existing target source files only to understand imports, exported names, component props, and local testing patterns.
7. If a target callable file or export does not exist, create only the minimal callable stub allowed by the Minimal Contract Exception before writing the test. Do not create non-callable type/data-model stubs.
8. Inspect the project test setup, package scripts, and existing tests when present.
9. If `{name}` cannot be inferred from the issue document, branch name, or feature docs, ask only for the missing feature folder name.

When deriving scenarios from `issues.md`:

- Treat each Given-When-Then AC as the source for one or more test scenarios.
- Derive only public signatures needed by the tests from existing code, confirmed PRD/ADR contracts, or the AC itself.
- Do not invent product behavior, validation rules, UI placement, copy, or persistence semantics that are not stated in the approved issue or confirmed PRD/ADR.
- If an AC is too vague to test without a new product decision, stop and report the missing decision instead of writing speculative tests.
- Use scenario titles in this format:

```text
[정상|경계|오류|접근성|회귀] Target - should [기대 동작] when [조건]
```

When `issue-{N}.md` contains approved test contracts:

- Write tests against the approved public contracts and approved scenarios.
- It is valid for contracts to be missing, incomplete, or already satisfied.
- Confirm each scenario's result after writing the test: failing, passing, skipped, or blocked.
- If a contract already satisfies the scenario, keep the passing test when it covers an approved scenario and report it as already satisfied.

## File Rules

Modify test files by default.

### Minimal Contract Exception

If a scenario test cannot compile or import because an approved callable contract is missing, make the smallest possible production-code change needed to expose that callable signature before or alongside the test.

Allowed minimal contract changes:

- add or adjust function signatures so tests can import and call an approved public API
- add or adjust component or hook signatures only when the test target is a component or hook and the call surface itself is missing
- add or export an empty function, component, or hook stub only when the target callable export does not exist
- add placeholder return values only if needed to satisfy the callable signature, and only when the placeholder does not implement the approved behavior

Forbidden behavior changes:

- add or change TypeScript interfaces, type aliases, enum/string-union types, required fields, data model shapes, or domain type contracts
- implement validation, normalization, persistence, network handling, DOM rendering, state transitions, business rules, or user-visible behavior
- add CSS or visual styling to satisfy UI expectations
- add fixtures, seed data, package configuration, or test setup unless the scenario explicitly identifies that file as the target or testing cannot run without it
- broaden production refactors beyond the approved callable signature needed by the tests

Do not fix type errors by changing production domain types during this step. Instead, write tests so the missing type or data contract is visible, use runtime data-contract tests when possible, or stop and report that the approved scenario requires a non-callable contract change before behavior tests can run.

After a minimal signature change, run the narrowest compile or test command that previously failed because of the missing callable contract. Continue only if the import/call-signature blocker is removed and the test now reaches assertions or passes without production behavior implementation.

When a command fails, classify the failure before deciding what to do next:

- Import/module-not-found/call-signature failure for an approved callable target: apply the Minimal Contract Exception, then rerun the narrowest command.
- Assertion failure, Testing Library query failure, thrown-error mismatch, or DOM/content mismatch: treat it as a current failing result when it matches the approved scenario or documented initial expected state, then proceed to the next scenario.
- Passing test: treat it as covered and already satisfied when it matches the approved scenario, then proceed to the next scenario.
- Type/domain-contract failure that would require changing production interfaces, type aliases, required fields, or data shapes: do not change production types; record it as the scenario result or report the non-callable contract blocker.

Use colocated test files:

- `src/api/tags.ts` -> `src/api/tags.test.ts`
- `src/components/TagInput.tsx` -> `src/components/TagInput.test.tsx`

Use these naming rules:

- TypeScript logic tests: `{file}.test.ts`
- React component tests: `{file}.test.tsx`

Do not modify:

- implementation files under `src/` except test files and the minimal callable signature exception above
- feature docs
- fixtures or seed data unless the scenario explicitly identifies them as test fixtures
- package configuration unless tests cannot run without a missing test setup change, and then stop to explain the blocker first

## Test Style

Use Vitest for all tests. Use React Testing Library for React components.

Write test code in Korean where it is project-authored prose, including comments, helper labels, and user-facing fixture names. Keep API names and scenario titles in their approved English `should ... when ...` format.

Use this test name format exactly:

```text
should [기대 동작] when [조건]
```

Group tests by target function or component:

```ts
describe('addTag', () => {
  it('should ... when ...', () => {});
});
```

## Coverage Workflow

For each approved scenario, or for each scenario derived from approved AC:

1. Identify the target function, component, API boundary, or data fixture.
2. Check that the target file exists. If an approved callable target file or export is missing, create only the minimal callable stub allowed by the Minimal Contract Exception.
3. If imports or call signatures make the test impossible to compile, apply only the minimal callable signature exception and verify the import/call blocker is removed.
4. Create or update the colocated test file for that target.
5. Write only enough test code to express the scenario.
6. Run the narrowest relevant test command immediately.
7. Record the test result for the scenario: failing for an expected reason, passing because the behavior already exists, skipped with explicit reason, or blocked by a non-callable contract issue.
8. If the failure is an assertion/query/DOM mismatch that matches the approved scenario, record it as the scenario's current failing result and proceed to the next scenario.
9. If the test passes, record it as covered and already satisfied, then proceed to the next scenario.
10. Move to the next scenario after the current scenario has a recorded result.

After all scenarios are written, run:

```bash
npm test
```

Run the final suite even if some scenario tests pass. The suite may pass or fail depending on current implementation; do not change production code to force either result.

## Failure Reporting

At the end, report:

- test files created or modified
- any minimal callable signature files modified and why each change was required to unblock imports or call signatures
- scenarios covered
- approved test contracts used, when present
- source used for each scenario: `issue-{N}.md` scenario or `issues.md` AC
- commands run
- per-scenario results: failing reason, passing/already satisfied, skipped reason, or blocker
- any scenarios not implemented as tests and why

## Completion Checklist

Before finishing, verify:

- every production-code change, if any, is limited to the minimal callable signature exception and does not change domain types or implement behavior
- every issue-named or AC-derived target file was checked for existence before writing its tests
- every approved or derived scenario has a corresponding test or an explicit reason for deferral
- every approved or derived scenario has a recorded result, including passing already-satisfied scenarios
- each test name uses `should ... when ...`
- function/component tests are grouped with `describe`
- Vitest and React Testing Library are used where appropriate
- each new test was run before moving on
- final `npm test` was run and the pass/fail result was reported
