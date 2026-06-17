---
name: feature-planner
description: Plan a feature from initial idea to implementation-ready issues using the required docs/features workflow. Use when the user asks to create, refine, or execute feature planning artifacts such as docs/features/{name}/spec-original.md, spec-fixed.md, prd.md, issues.md, PRD/ADR decisions, requirement interviews, architecture option comparison, vertical issue slicing, or GitHub issue creation for a feature.
---

# Feature Planner

Use this skill to transform one feature from an idea into development-ready, vertically sliced work. Treat the workflow as mandatory. Do not skip approval gates, do not invent decisions for the user, and do not continue past a `[GATE]` until the user explicitly confirms.

Write all documents and planning outputs produced by this skill in Korean.

Base the work on `docs/features/feature-planning-workflow.md` when it exists in the repository. This SKILL.md is the operational version of that workflow and must be followed even when the source file is absent.

## Pipeline

Follow this sequence exactly:

```text
spec-original.md
  -> Stage 1: Requirements interview
spec-fixed.md
  -> Stage 2: PRD + technical decision (ADR)
prd.md
  -> Stage 3: Issue decomposition
issues.md + GitHub Issues
```

Use `docs/features/{name}/` as the feature directory unless the user specifies a different path.

## Stage 1: Requirements Interview

Goal: remove ambiguity from the initial feature definition, discover edge cases, and fix shared terminology before implementation planning.

Inputs:

- `docs/features/{name}/spec-original.md`
- Existing codebase structure, patterns, data model, UI conventions, tests, and APIs

Process:

1. Read `spec-original.md` and inspect the relevant codebase before asking questions.
2. Act as an interviewer. Ask one question at a time.
3. For every question, include a recommended answer or direction and a concise reason.
4. Cover these areas before finalizing unless already answered by the source material:
   - Primary user
   - Three minimum working scenarios
   - Data storage and relationship to existing structures
   - Boundary conditions: max values, empty values, duplicates, concurrency
   - Error handling and user-facing failure states
   - Consistency with existing UI patterns and reusable components
   - Performance constraints: response time and data size limits
   - Future extensibility and impact on later features
5. Define Ubiquitous Language during the interview. Use the same terms in code, docs, and conversation.
6. Write `docs/features/{name}/spec-fixed.md` with a clear "용어 정의" section.

Required gate:

```text
[GATE] Stop after writing spec-fixed.md. Wait until the user reads and confirms it.
```

## Stage 2: PRD + Technical Decision

Goal: create one source of truth for requirements, design, scope, and architecture decisions.

Inputs:

- `docs/features/{name}/spec-fixed.md`
- `docs/features/{name}/design.md`, if present
- Existing codebase patterns

Process:

1. Draft `docs/features/{name}/prd.md` with this structure:
   - Overview: purpose and scope
   - User stories: user-facing flows
   - Technical decision: leave TODO until the architecture option gate completes
   - Out of Scope: explicit exclusions
   - Glossary: synchronized with `spec-fixed.md` Ubiquitous Language
2. Propose at least three architecture options.
3. Compare the options in a table using exactly these seven criteria:
   - Data structure
   - API layer change points
   - State management change points
   - Core behavior
   - Component structure
   - Consistency with existing patterns
   - Testability

Required gate after option comparison:

```text
[GATE] Stop and wait until the user selects one architecture option.
```

After the user selects an architecture option, identify the ADR topics that need confirmation, but do not finalize them yet. Cover multiple ADR topics when implementation requires separate decisions. Do not collapse unrelated concerns into one ADR; split decisions by subject such as data model, state ownership, persistence, UI behavior, validation, API contract, and testing boundaries.

Confirm ADRs one at a time, like the requirements interview. For each ADR topic:

1. Present only one ADR topic.
2. Show the implementation question being decided.
3. Show viable alternatives with pros and cons for each.
4. Show the recommended decision separately, with pros, cons, and a concise reason for recommending it.
5. Ask the user to choose the recommendation, choose an alternative, or request changes.
6. Wait for the user before presenting the next ADR.

Required gate after each ADR proposal:

```text
[GATE] Stop and wait until the user confirms this ADR decision before presenting the next ADR.
```

Only after the user confirms an ADR proposal, write that confirmed decision into the PRD technical decision section using this ADR shape:

```markdown
### Technical Decision Title

#### Context

Why this decision is needed and what problem it solves.

#### Decision

- What was selected.
- Key implementation constraints.

#### Alternatives

1. **Rejected option**
   - Benefit.
   - Rejection reason. Do not reject an alternative without a reason.

#### Consequences

- Benefit or expected outcome.
- Drawback or tradeoff.
```

When all ADRs are confirmed, remove temporary progress sections such as ADR queues, pending decision lists, and confirmation gates from the PRD. The final PRD must contain only confirmed ADR content under the technical decision section, using numbering like `### 3.1. ADR-1` and `#### 3.1.1. Context`.

Then write Out of Scope as concrete exclusions. Be specific enough to prevent scope expansion during implementation. Examples: tag color customization, automatic tag recommendation, tag-based search.

Required gate after Out of Scope:

```text
[GATE] Stop and wait until the user confirms Out of Scope.
```

## Stage 3: Issue Decomposition

Goal: convert the PRD into executable work units that can each complete a TDD cycle.

Inputs:

- `docs/features/{name}/prd.md`
- GitHub project board information, if GitHub issue creation is requested

Rules:

- Slice vertically. Each issue must produce user-visible behavior on its own.
- Do not slice horizontally by layer such as API -> Context -> UI.
- Size each issue for a half-day to one-day Red -> Green -> Refactor cycle.
- Order issues so each previous issue creates the input or foundation for the next.
- Do not plan reverse-direction development.
- Every issue must include Acceptance Criteria in Given-When-Then form.

Use this test for every issue:

```text
If only this issue is completed, is there user-visible behavior?
```

If the answer is no, merge it with another issue or reslice it.

Issue format:

```markdown
## Issue Title

Purpose and scope.

## Dependencies

- Previous issue or prerequisite, if any

## Acceptance Criteria

- [ ] Given [precondition], When [action], Then [expected result]
- [ ] Given [precondition], When [action], Then [expected result]
```

Write the issue list to `docs/features/{name}/issues.md`.

Required gate:

```text
[GATE] Stop and wait until the user confirms the issue list satisfies vertical slicing, concrete AC, and dependency order.
```

## GitHub Issue Creation

Only create GitHub issues after the Stage 3 gate is confirmed and the user wants GitHub registration. Use `gh` when available:

```bash
gh issue create --title "Issue title" --body "Description + AC + dependencies"
gh project item-add <PROJECT_NUMBER> --owner <OWNER> --url <ISSUE_URL>
```

If project board owner or project number is missing, ask for only the missing information. Place created issues in the Todo column when the project workflow supports it.

## Completion Checklist

Before finishing, verify:

- `spec-fixed.md` exists and has confirmed terminology.
- `prd.md` has overview, user stories, ADR-form technical decision, Out of Scope, and glossary.
- Architecture options were compared by all seven required criteria.
- Every `[GATE]` was honored.
- `issues.md` contains only vertical slices.
- Every issue has Given-When-Then Acceptance Criteria.
- GitHub issues were created only after user confirmation.
