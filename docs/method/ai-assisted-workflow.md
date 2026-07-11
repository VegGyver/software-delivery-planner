# Software Delivery Planner — AI-Assisted Development Workflow v0

## 1. Purpose

This document defines the AI-assisted development workflow used to build the Software Delivery Planner.

The goal is to use AI as a controlled implementation assistant, not as an uncontrolled project generator.

The AI should help with:

* implementing small and well-scoped tasks;
* generating or updating code based on existing architecture;
* writing tests;
* reviewing specific files;
* suggesting refactors;
* explaining errors;
* improving documentation.

The AI should not be used to generate the whole project in one pass or to make broad architectural decisions without human review.

---

## 2. Core Principle

The core principle of this workflow is:

> One task, one scope, one reviewable change.

Each AI-assisted task must have:

* a clear goal;
* a limited scope;
* explicit files or folders involved;
* clear acceptance criteria;
* explicit boundaries;
* expected tests;
* a stop condition.

The AI should work on the smallest useful context, not on the entire repository by default.

---

## 3. Role of the Human Developer

The human developer is responsible for:

* defining the product scope;
* deciding architecture boundaries;
* validating AI output;
* reviewing code before committing;
* running tests;
* accepting or rejecting changes;
* deciding when refactoring is needed;
* updating the estimation log;
* keeping the repository coherent.

The AI can assist, but the human developer remains accountable for technical quality and delivery decisions.

---

## 4. Role of the AI Assistant

The AI assistant may be used to:

* propose an implementation plan;
* create or update files for a specific task;
* generate tests for a defined behavior;
* explain failing tests or TypeScript errors;
* suggest small refactors;
* improve naming and structure;
* update documentation;
* summarize changes.

The AI assistant should not:

* rewrite large parts of the repository without permission;
* introduce new dependencies without explanation;
* change unrelated files;
* silently modify architecture decisions;
* remove tests to make the build pass;
* ignore acceptance criteria;
* inspect the whole repository unless explicitly requested.

---

## 5. Context Control Rules

To reduce token usage and avoid unnecessary analysis, the AI should receive only the context required for the current task.

### Preferred Context

Before asking the AI to work, provide or open only:

* the current backlog item;
* related feature documentation;
* relevant existing files;
* related tests;
* relevant error logs if debugging;
* architecture notes only if needed.

### Avoid by Default

Do not ask the AI to:

* read the entire repository;
* analyze all files;
* redesign the whole application;
* fix everything at once;
* infer missing requirements from unrelated files.

### Recommended Instruction

Use this instruction often:

```text
Use only the files currently open or the files explicitly mentioned in this task.
Do not inspect the whole repository unless you explain why it is necessary first.
```

---

## 6. Standard AI Task Template

Every AI task should follow this structure.

```text
Task ID:
Task title:

Goal:
[Describe the specific outcome expected from this task.]

Scope:
[Allowed files or folders.]

Context:
[Relevant backlog item, feature brief, API contract, error message or existing pattern.]

Acceptance criteria:
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]

Do not:
- Do not modify unrelated files.
- Do not introduce new dependencies unless strictly necessary.
- Do not change existing architecture decisions.
- Do not implement future features.
- Do not inspect the whole repository unless needed and explained.

Tests:
[Describe which tests to add, update or run.]

Stop condition:
Stop after completing this task and summarize the modified files.
```

---

## 7. Planning-First Prompt

For medium or complex tasks, ask the AI for a plan before allowing code changes.

Use this prompt:

```text
Before modifying any code, propose a short implementation plan.

Limit the plan to maximum 5 steps.

Include:
- files you expect to create or modify;
- dependencies or assumptions;
- tests you expect to add or update;
- possible risks.

Do not modify any files yet.
```

Proceed only after reviewing the plan.

If the plan is too broad, reduce the scope before implementation.

---

## 8. Implementation Prompt

After approving the plan, use a focused implementation prompt.

```text
Proceed with the approved plan.

Implement only the current task.

Respect these constraints:
- modify only the files listed in the plan unless strictly necessary;
- keep routes/controllers thin;
- keep business logic in services;
- keep API access out of UI components;
- add or update tests where relevant;
- do not implement unrelated features;
- stop after this task.

At the end, summarize:
- files changed;
- behavior added;
- tests added or updated;
- anything left intentionally out of scope.
```

---

## 9. Backend Task Rules

Backend tasks should follow this flow:

```text
domain model / DTO
→ validation schema
→ route
→ service
→ repository
→ tests
→ OpenAPI documentation
```

### Backend Rules

* Routes should remain thin.
* Validation should happen before business logic.
* Business logic should live in services.
* Persistence logic should live in repositories.
* DTOs and schemas should be reusable where practical.
* Tests should cover successful and invalid cases.
* API responses should be predictable and consistent.

### Backend Prompt Example

```text
Task ID: B-012
Task title: Implement Project backend logic

Goal:
Implement the Project backend module.

Scope:
apps/api/src/modules/projects
packages/shared/src

Context:
Use the Project model and DTOs already defined.
Follow the backend architecture described in docs/architecture-overview.md.

Acceptance criteria:
- Project can be created.
- Project can be listed.
- Project can be read by ID.
- Project can be updated.
- Validation is applied.
- Backend tests cover core behavior.

Do not:
- Do not implement frontend UI.
- Do not implement Feature or Task modules.
- Do not introduce authentication.
- Do not modify unrelated modules.
- Do not inspect the whole repository unless needed and explained.

Tests:
Add or update backend tests for project creation, listing, reading and updating.

Stop condition:
Stop after Project backend tests pass and summarize modified files.
```

---

## 10. Frontend Task Rules

Frontend tasks should follow this flow:

```text
route/page
→ feature API client
→ feature hook/service
→ form/list component
→ loading/error states
→ tests
```

### Frontend Rules

* UI components should not contain low-level API logic.
* API calls should be placed in a feature service or API client.
* Pages should compose feature components.
* Components should stay small and readable.
* Loading, empty and error states should be handled.
* Frontend state should remain simple unless complexity justifies otherwise.
* Redux should not be introduced in this project by default.

### Frontend Prompt Example

```text
Task ID: B-013
Task title: Implement Project frontend route and page

Goal:
Create the Project page and allow the user to create or update project information.

Scope:
apps/web/src/features/projects
apps/web/src/app/router.tsx
apps/web/src/shared/api if needed

Context:
Use the existing Project API.
Follow the frontend architecture described in docs/architecture-overview.md.

Acceptance criteria:
- User can view project information.
- User can create or update a project from the UI.
- UI uses API client or feature hook layer.
- Components do not contain low-level API logic.
- Basic loading and error states are handled.

Do not:
- Do not implement Feature Management.
- Do not implement Task Management.
- Do not add Redux.
- Do not modify backend files unless an API mismatch is found and explained first.
- Do not inspect the whole repository unless needed and explained.

Tests:
Add or update frontend tests for the Project page and form.

Stop condition:
Stop after the Project page works and related tests pass.
```

---

## 11. API-First Rules

API design should be based on resources and use cases, not on frontend components.

Preferred API design flow:

```text
define resource
→ define endpoint
→ define request DTO
→ define response DTO
→ define validation schema
→ document with OpenAPI
→ implement backend
→ integrate frontend
```

### API Design Rules

* Do not create one endpoint per UI component.
* Endpoints should represent domain resources or use cases.
* Request and response formats should be explicit.
* Validation errors should be predictable.
* API contracts should be stable before frontend integration.

### API Prompt Example

```text
Define the API contract for the Task Management feature.

Scope:
Only define endpoints, DTOs and validation expectations.
Do not implement backend logic yet.
Do not implement frontend UI.

The API should support:
- listing tasks by project;
- creating a task;
- updating task status;
- updating estimated and actual hours.

Return:
- endpoint list;
- request DTOs;
- response DTOs;
- validation rules;
- edge cases.
```

---

## 12. Testing Rules

Tests are part of the delivery workflow.

Each meaningful behavior change should include or update tests.

### Backend Testing

Backend tests should cover:

* successful requests;
* validation failures;
* missing records;
* service logic;
* KPI calculations.

### Frontend Testing

Frontend tests should cover:

* form rendering;
* user input;
* submit behavior;
* loading state;
* error state;
* main dashboard values.

### E2E Testing

Playwright should cover only essential flows.

Initial E2E flow:

```text
create project
→ create feature
→ create task
→ add estimated and actual hours
→ view updated KPI dashboard
```

### Testing Prompt Example

```text
Task ID: B-014
Task title: Add Project Setup tests

Goal:
Add tests for the Project Setup vertical slice.

Scope:
apps/api/src/modules/projects/tests
apps/web/src/features/projects

Acceptance criteria:
- Backend tests cover project creation and validation.
- Frontend tests cover project form behavior.
- Tests are focused on behavior, not implementation details.
- No unrelated code is changed.

Do not:
- Do not refactor the whole Project module.
- Do not weaken validation to make tests pass.
- Do not remove existing tests.

Stop condition:
Stop after adding tests and summarize what is covered.
```

---

## 13. Debugging Workflow

When something fails, do not ask the AI to inspect the entire project.

Use this process:

```text
1. Run the failing command locally.
2. Copy only the relevant error output.
3. Provide the related file or test.
4. Ask for a diagnosis.
5. Ask for a minimal fix.
6. Run the test again.
7. Commit only after the fix is verified.
```

### Debugging Prompt Example

```text
This test is failing.

Command:
pnpm test

Error:
[paste relevant error only]

Relevant files:
- apps/api/src/modules/projects/service.ts
- apps/api/src/modules/projects/tests/projects.test.ts

Goal:
Identify the likely cause and propose a minimal fix.

Do not:
- Do not refactor unrelated code.
- Do not modify test expectations unless the expectation is clearly wrong.
- Do not inspect the whole repository.

First explain the cause briefly, then propose the smallest code change.
```

---

## 14. Refactoring Workflow

Refactoring should be explicit and separated from feature implementation when possible.

A refactor task should define:

* what problem is being solved;
* what files are in scope;
* what behavior must remain unchanged;
* what tests must still pass.

### Refactor Prompt Example

```text
Task title: Refactor Project service validation flow

Goal:
Improve readability of the Project service without changing behavior.

Scope:
apps/api/src/modules/projects/service.ts
apps/api/src/modules/projects/schema.ts
apps/api/src/modules/projects/tests

Acceptance criteria:
- Existing behavior remains unchanged.
- Tests still pass.
- Validation remains explicit.
- No new features are added.

Do not:
- Do not change API response shapes.
- Do not modify frontend files.
- Do not introduce new dependencies.
- Do not inspect unrelated modules.

Stop condition:
Stop after refactor and summarize behavior-preserving changes.
```

---

## 15. Documentation Update Rules

Documentation should evolve with the project.

Update documentation when:

* scope changes;
* architecture changes;
* API contracts change;
* backlog items are completed;
* estimation lessons are learned;
* setup instructions change.

Documentation should remain practical and concise.

Do not create large theoretical documents that are not useful for development or portfolio review.

---

## 16. Estimation Tracking Rules

After each meaningful backlog item, update the estimation log.

Track:

* backlog item ID;
* initial estimate;
* actual effort;
* variance;
* reason for variance;
* whether AI was used;
* whether rework was needed;
* lesson learned.

The goal is not perfect estimation. The goal is to improve estimation quality through evidence.

---

## 17. Token Optimization Rules

AI usage should be optimized to avoid unnecessary token consumption.

### Rules

* Use small tasks.
* Open or provide only relevant files.
* Avoid asking the AI to analyze the whole repository.
* Ask for a plan before multi-file changes.
* Reuse prompt templates.
* Provide error logs instead of asking the AI to rediscover errors.
* Ask for short summaries.
* Avoid repeated explanations of already documented architecture.
* Commit after validated slices to create stable checkpoints.

### Standard Token-Safe Instruction

```text
Use the smallest context necessary for this task.
Do not inspect the whole repository.
If you need additional files, ask for them or explain why they are required.
Keep the final summary under 5 bullet points.
```

---

## 18. Dependency Management Rules

New dependencies should be introduced carefully.

Before adding a dependency, the AI should explain:

* why it is needed;
* what problem it solves;
* why existing tools are not enough;
* whether it affects frontend, backend or shared packages;
* whether it adds maintenance cost.

### Dependency Prompt Constraint

```text
Do not add new dependencies unless strictly necessary.
If you believe a dependency is needed, explain why before modifying package files.
```

---

## 19. Commit Rules

Each commit should represent a coherent unit of work.

Preferred commit types:

```text
docs:
setup:
feat:
test:
refactor:
fix:
ci:
chore:
```

Examples:

```text
docs: add AI-assisted development workflow
setup: initialize pnpm monorepo
feat(api): add project creation endpoint
feat(web): add project setup page
test(api): cover project validation
ci: add initial GitHub Actions workflow
refactor(api): simplify project service validation
```

Avoid commits that mix unrelated work.

---

## 20. AI Task Review Checklist

Before accepting AI-generated changes, check:

```text
- Does the change match the requested task?
- Were unrelated files modified?
- Were new dependencies added?
- Are types still coherent?
- Are API contracts respected?
- Are tests added or updated?
- Do tests pass?
- Is the code readable?
- Is the architecture still consistent?
- Does documentation need to be updated?
- Should the estimation log be updated?
```

If the answer is unclear, do not commit yet.

---

## 21. Stop Conditions

The AI should stop after the requested scope is complete.

Common stop conditions:

```text
Stop after creating the file.
Stop after defining the DTOs.
Stop after implementing the backend endpoint.
Stop after adding tests.
Stop after fixing the failing test.
Stop after summarizing the plan.
Stop after updating the documentation.
```

Avoid open-ended instructions such as:

```text
Improve the project.
Clean everything.
Make it production ready.
Finish the whole feature.
```

These instructions are too broad and should be replaced with scoped tasks.

---

## 22. Example Full Microtask Prompt

```text
Task ID: B-011
Task title: Implement Project API contract

Goal:
Define the Project REST API contract.

Scope:
apps/api/src/modules/projects
packages/shared/src

Context:
Use the Project fields defined in docs/mvp-scope.md and docs/backlog-v0.md.
Follow the backend structure described in docs/architecture-overview.md.

Acceptance criteria:
- Define GET /projects.
- Define POST /projects.
- Define GET /projects/:projectId.
- Define PATCH /projects/:projectId.
- Define request and response DTOs.
- Prepare validation schemas.
- Prepare OpenAPI/Swagger documentation where appropriate.

Do not:
- Do not implement frontend UI.
- Do not implement Feature or Task APIs.
- Do not introduce authentication.
- Do not add persistence beyond what is required for the current contract.
- Do not inspect the whole repository unless needed and explained.

Tests:
Add or prepare backend tests for request validation if the test setup already exists.

Stop condition:
Stop after the Project API contract is defined and summarize modified files in maximum 5 bullet points.
```

---

## 23. Workflow Summary

The recommended workflow for each backlog item is:

```text
1. Read the backlog item.
2. Open only relevant files.
3. Ask AI for a short plan if the task touches multiple files.
4. Review the plan.
5. Ask AI to implement only the approved step.
6. Run typecheck/tests locally.
7. Ask AI for minimal fixes only if needed.
8. Review the diff.
9. Update documentation or estimation log if needed.
10. Commit the completed task.
```

---

## 24. Current Status

Status: initial workflow definition.

This document should be updated after the first implementation slices, based on what actually works during development.
