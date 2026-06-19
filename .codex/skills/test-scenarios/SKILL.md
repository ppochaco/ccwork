---
name: test-scenarios
description: 'Derive test-facing public context and Korean test scenarios for one GitHub issue before TDD. Use when the user invokes /test-scenarios or asks to process an issue number into confirmed signatures, API boundaries, component contracts, docs/features/{name}/issue-{N}.md updates, Acceptance Criteria coverage checks, and review gates without writing implementation or test code.'
---

# Test Scenarios

Use this skill to prepare one GitHub issue for TDD by first confirming the test-facing public context, then deriving reviewable test scenarios. Write all user-facing outputs and generated scenario text in Korean.

Never write implementation code or test code while using this skill.

## Input

Require one GitHub issue number, usually from:

```text
/test-scenarios 1
```

Treat the issue number as `$ARGUMENTS`.

## Required Context

Before proposing test context:

1. Run `gh issue view $ARGUMENTS` and read the issue body, especially Acceptance Criteria.
2. Identify the feature folder under `docs/features/{name}/`.
3. Read `docs/features/{name}/prd.md`.
4. Inspect relevant existing code and tests to match local naming, type, error, component, and documentation patterns.
5. If `{name}` cannot be inferred from the issue, PRD, branch, or nearby docs, ask only for the missing feature folder name.

## Test Context Gate

Derive test-facing public context from the issue, PRD, and existing codebase. Include only context needed to verify the issue scope.

Test context should explain the public boundaries that tests may exercise. Use clear sections that match the issue instead of forcing one table shape. Include only the sections that are relevant:

- signatures: exported function, hook, component, or type signatures
- API boundaries: request and response contracts, normalization rules, and failure behavior
- components: component Props, observable rendering, accessible names, roles, text, and user actions
- domain types: types used across module or API boundaries
- data boundaries: persistence, seed data, fixture, or migration contracts visible through public behavior
- error cases: when errors are thrown or surfaced

For each context item, include:

- target
- status: existing, existing extension, or new
- initial expected state, such as missing module/export, missing DOM output, missing behavior, wrong thrown error, missing data contract, or already satisfies context

Show the proposed test context to the user and stop.

```text
[GATE] Do not write docs/features/{name}/issue-{N}.md and do not derive scenarios until the user approves the test context.
```

## Record Approved Test Context

After approval, create or update `docs/features/{name}/issue-{N}.md`.

Record the approved test context at the top of the file under a clear heading such as:

```markdown
# Issue {N}: 테스트 시나리오

## 확정된 테스트 맥락

### 타입

### 시그니처

### API 경계

### 컴포넌트

### 데이터 경계

### 에러 케이스
```

Preserve useful existing content in the file unless it is stale signature or scenario content for the same issue.

## Scenario Derivation

Derive scenarios from the approved test context, PRD, issue body, Acceptance Criteria, and existing code patterns.

Classify every scenario as one of:

- 정상
- 경계
- 예외

Use exactly this scenario title format:

```text
[정상/경계/예외] 함수명 또는 컴포넌트명 - should [기대동작] when [조건]
```

Write scenarios in Korean. Do not write test code.

Append the scenarios near the bottom of `docs/features/{name}/issue-{N}.md` under a heading such as:

```markdown
## 테스트 시나리오
```

## Acceptance Criteria Coverage

After drafting scenarios:

1. Run `gh issue view $ARGUMENTS` again if the issue content may have changed or AC details were not already captured.
2. Compare every GitHub Issue AC item with the drafted scenarios.
3. If any AC item has no scenario, add at least one scenario that covers it.
4. Confirm that every AC item maps to one or more scenarios.
5. Add a concise AC coverage section to `docs/features/{name}/issue-{N}.md`, for example:

```markdown
## AC 커버리지

- AC1: [정상] ...
```

## Scenario Review Gate

Show the final scenarios and AC coverage summary to the user and stop.

```text
[GATE] Do not proceed beyond scenario review until the user approves the scenarios.
```

## Completion Checklist

Before finishing, verify:

- no implementation code was written
- no test code was written
- test context was approved before documentation updates
- `docs/features/{name}/issue-{N}.md` contains the approved test context
- scenarios are grouped or labeled as 정상, 경계, 예외
- scenario titles use the required `should ... when ...` format
- every GitHub Issue AC item has at least one scenario
