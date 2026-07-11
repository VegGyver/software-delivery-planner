# Software Delivery Planner — Definition of Done v0

## 1. Purpose

This document defines when a backlog item, feature slice or technical task can be considered done.

The goal is to avoid incomplete work, uncontrolled AI-generated changes, missing tests, unclear documentation and untracked effort.

A task is not done only because the code was written.
A task is done when it is implemented, verified, reviewed and traceable.

---

## 2. Core Rule

A backlog item is considered done only when:

```text
The requested scope is complete,
the implementation is tested,
the change is reviewed,
the repository remains coherent,
and the result is documented or tracked where needed.
```

---

## 3. General Definition of Done

For every backlog item, check the following:

```text
- The requested task has been completed.
- The implementation matches the acceptance criteria.
- No unrelated feature has been added.
- No unrelated file has been modified.
- No unnecessary dependency has been introduced.
- Existing architecture decisions have been respected.
- Code is readable and consistently named.
- TypeScript types are coherent.
- Validation is handled where needed.
- Error and empty states are considered where relevant.
- Tests have been added or updated when behavior changed.
- Relevant tests pass locally.
- Typecheck passes where available.
- Documentation has been updated if the task changes behavior, setup, API or architecture.
- The estimation log is updated when the task is meaningful enough to track.
- The change is ready for commit.
```

---

## 4. Documentation Tasks

A documentation task is done when:

```text
- The document exists in the expected location.
- The document has a clear purpose.
- The document is useful for implementation, estimation or portfolio review.
- The document is not unnecessarily theoretical.
- The document is consistent with existing project scope.
- Open questions and assumptions are clearly marked.
- The document does not introduce unapproved scope.
- Related documents are updated if needed.
```

Examples:

```text
docs/project-brief.md
docs/feature-map.md
docs/mvp-scope.md
docs/architecture-overview.md
docs/backlog-v0.md
docs/method/ai-assisted-workflow.md
docs/method/definition-of-done.md
docs/method/estimation-log.md
```

---

## 5. Backend Tasks

A backend task is done when:

```text
- The relevant domain model, DTO or schema is defined.
- Request validation is implemented where needed.
- Routes/controllers remain thin.
- Business logic is placed in services.
- Persistence logic is placed in repositories or equivalent data-access layer.
- API responses are predictable and consistent.
- Error cases are handled.
- Backend tests cover the main successful path.
- Backend tests cover relevant validation or error cases.
- API contract or OpenAPI documentation is updated where relevant.
- No unrelated backend module has been modified.
```

Backend flow:

```text
domain model / DTO
→ validation schema
→ route
→ service
→ repository
→ tests
→ API documentation
```

---

## 6. Frontend Tasks

A frontend task is done when:

```text
- The required route, page or feature UI exists.
- UI components are readable and focused.
- Low-level API logic is not placed directly inside UI components.
- API calls are handled through a feature API client, hook or service layer.
- Loading states are handled where relevant.
- Error states are handled where relevant.
- Empty states are handled where relevant.
- Forms include basic validation or validation feedback where needed.
- Frontend tests are added or updated for meaningful behavior.
- The UI remains consistent with the MVP scope.
- No unnecessary global state solution has been introduced.
```

Frontend flow:

```text
route/page
→ feature API client
→ feature hook/service
→ form/list/detail component
→ loading/error/empty states
→ tests
```

---

## 7. Shared Package Tasks

A shared package task is done when:

```text
- Shared types, DTOs, schemas or constants are actually reused by more than one layer or are expected to be reused soon.
- Naming is clear and domain-oriented.
- The shared package does not become a dumping ground.
- No frontend-specific logic is added to shared code.
- No backend-specific infrastructure logic is added to shared code.
- Imports from frontend and backend remain clean.
- Build/typecheck passes.
```

Shared code should remain small and intentional.

---

## 8. API Contract Tasks

An API contract task is done when:

```text
- The endpoint purpose is clear.
- The endpoint is resource-oriented or use-case-oriented.
- Request DTOs are defined.
- Response DTOs are defined.
- Validation rules are clear.
- Error responses are predictable.
- Endpoint naming is consistent with the rest of the API.
- The API is not designed around frontend components.
- OpenAPI/Swagger documentation is added or prepared.
```

API design should follow this principle:

```text
Do not create one endpoint per UI component.
Create endpoints around domain resources and use cases.
```

---

## 9. Testing Tasks

A testing task is done when:

```text
- The test covers observable behavior, not irrelevant implementation details.
- The test is deterministic.
- The test can run locally.
- The test does not depend on hidden state.
- The test name clearly describes the expected behavior.
- Existing tests still pass.
- Tests are not weakened only to make the build pass.
- Broken functionality is fixed rather than bypassed.
```

Backend tests should prioritize:

```text
- successful API behavior;
- validation failures;
- missing records;
- service logic;
- KPI calculations.
```

Frontend tests should prioritize:

```text
- form behavior;
- user interactions;
- rendering of important values;
- loading states;
- error states;
- empty states.
```

E2E tests should prioritize:

```text
- the main user journey;
- critical portfolio demo flow;
- integration between frontend and backend.
```

---

## 10. E2E Task Definition of Done

An end-to-end task is done when:

```text
- The tested flow represents a real user journey.
- The test is stable enough to run repeatedly.
- Test setup is documented.
- The test does not rely on fragile timing where avoidable.
- The test verifies meaningful user-visible outcomes.
- The test can be integrated into CI later if not immediately.
```

Initial main E2E flow:

```text
create project
→ create feature
→ create task
→ add estimated and actual hours
→ view updated KPI dashboard
```

---

## 11. Refactor Tasks

A refactor task is done when:

```text
- The reason for the refactor is clear.
- The scope is limited.
- Behavior remains unchanged unless explicitly requested.
- Existing tests still pass.
- Code readability or maintainability is improved.
- No new feature is introduced.
- No API contract is changed unless explicitly approved.
- The refactor does not hide or remove known issues.
```

A refactor should not be mixed with unrelated feature work unless the change is very small and necessary.

---

## 12. Bug Fix Tasks

A bug fix is done when:

```text
- The bug is reproduced or clearly understood.
- The root cause is identified.
- The smallest reasonable fix is applied.
- A regression test is added where practical.
- Existing behavior is not broken.
- The fix is verified locally.
- The cause and fix are summarized briefly.
```

Do not solve bugs by removing validation, weakening tests or bypassing errors without understanding them.

---

## 13. CI Tasks

A CI task is done when:

```text
- The workflow file exists in the expected location.
- The workflow matches local development commands.
- Install, typecheck and tests run where configured.
- The CI setup is simple and understandable.
- Secrets are not hardcoded.
- Future expansion points are clear.
```

Initial CI should prioritize:

```text
install
typecheck
backend tests
frontend tests
```

Playwright can be added to CI when the E2E flow becomes stable.

---

## 14. AI-Assisted Task Rules

An AI-assisted task is done only when the human developer has reviewed the result.

The AI output must be checked for:

```text
- requested scope respected;
- no unrelated files modified;
- no hidden architecture changes;
- no unnecessary dependencies;
- tests added or updated where needed;
- naming and structure consistent;
- generated code understood by the developer;
- no suspicious shortcuts;
- no deleted tests unless explicitly justified.
```

The AI should not be treated as the final reviewer.

---

## 15. Token and Context Discipline

A task is not well-scoped if it requires the AI to inspect the entire repository by default.

Before asking AI to implement, the task should specify:

```text
- allowed files or folders;
- relevant backlog item;
- acceptance criteria;
- tests expected;
- stop condition;
- what not to modify.
```

Preferred instruction:

```text
Use only the files currently open or explicitly mentioned.
Do not inspect the whole repository unless you explain why it is necessary first.
```

---

## 16. Estimation Tracking

For meaningful backlog items, update the estimation log.

Track:

```text
- backlog item ID;
- task title;
- estimated effort;
- actual effort;
- variance;
- reason for variance;
- AI assistance used;
- rework required;
- lesson learned.
```

The goal is not to create perfect estimates immediately.
The goal is to collect evidence and improve future estimates.

---

## 17. Commit Readiness Checklist

Before committing, check:

```text
- Is the task complete?
- Are acceptance criteria satisfied?
- Did I review the diff?
- Are unrelated changes excluded?
- Do tests/typecheck pass where available?
- Is documentation updated if needed?
- Is estimation tracking updated if needed?
- Is the commit focused on one coherent unit of work?
```

Recommended commit examples:

```text
docs: add definition of done
setup: initialize pnpm monorepo
feat(api): add project creation endpoint
feat(web): add project setup page
test(api): cover project validation
ci: add initial GitHub Actions workflow
refactor(api): simplify project service validation
```

---

## 18. When a Task Is Not Done

A task is not done if:

```text
- code was generated but not reviewed;
- tests are missing for meaningful behavior;
- validation is incomplete;
- TypeScript errors remain;
- unrelated files were changed;
- the AI introduced unapproved dependencies;
- the implementation includes future scope;
- documentation contradicts the current implementation;
- the feature works only in the happy path and obvious errors are ignored;
- the task cannot be explained clearly.
```

---

## 19. Definition of Done by Backlog Level

### Microtask

A microtask is done when the requested small change is complete, reviewed and verified.

Examples:

```text
define DTO
create route placeholder
add validation schema
add frontend form component
add one test case
```

### Backlog Item

A backlog item is done when all its acceptance criteria are satisfied and any required tests/documentation are updated.

### Vertical Slice

A vertical slice is done when the feature works end-to-end across backend, frontend and tests.

Example:

```text
Project Setup is done when the user can create/view/update a project through the UI, using the backend API, with validation and tests in place.
```

### MVP

The MVP is done when the must-have scope works, core tests pass, documentation is coherent and the repository is ready for portfolio review.

---

## 20. Current Status

Status: initial Definition of Done.

This document should be reviewed after the first completed vertical slice and improved based on practical experience.
