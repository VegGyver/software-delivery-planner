# Software Delivery Planner — Estimation Log v0

## 1. Purpose

This document tracks estimated effort, actual effort, variance and lessons learned during the development of the Software Delivery Planner.

The goal is not to create perfect estimates from the beginning.

The goal is to collect evidence, compare expectations with reality and improve future estimation quality.

This log supports two purposes:

1. **Delivery control** — understand how much effort each backlog item actually requires.
2. **Future estimation** — build a reusable reference for similar projects, tasks and technology stacks.

---

## 2. How to Use This Log

Each meaningful backlog item should be tracked in this file.

A meaningful backlog item is any task that requires planning, implementation, review or testing effort.

Examples:

* setting up the monorepo;
* implementing a backend module;
* creating a frontend page;
* adding tests;
* configuring CI;
* creating an E2E flow;
* refactoring a module;
* preparing portfolio documentation.

Very small changes may be grouped together if tracking them individually would create unnecessary overhead.

---

## 3. Estimation Workflow

The recommended estimation workflow is:

```text id="nhkgc4"
1. Select backlog item.
2. Add initial estimate before starting.
3. Execute the task.
4. Track actual effort.
5. Record variance.
6. Identify reason for variance.
7. Record whether AI assistance was used.
8. Record rework, blockers or lessons learned.
9. Use the result to improve future estimates.
```

---

## 4. Effort Units

Effort should be tracked in hours.

Use decimal values if needed.

Examples:

```text id="jcggcl"
0.5h
1h
1.5h
2h
3.5h
```

For larger estimates, days may be noted separately, but the primary unit should remain hours.

Suggested conversion:

```text id="uqyity"
1 working day = 6 focused development hours
```

This avoids overestimating available time by assuming that an 8-hour day equals 8 hours of uninterrupted implementation.

---

## 5. Complexity Levels

Use these complexity levels as a qualitative companion to the numeric estimate.

```text id="o6gbie"
XS — very small change, low uncertainty
S  — small task, known pattern
M  — medium task, multiple files or some uncertainty
L  — large task, several moving parts
XL — too large, should probably be split
```

A task marked as `XL` should usually be broken down before implementation.

---

## 6. Risk Levels

Use these risk levels to track uncertainty.

```text id="s4z0lg"
Low    — well understood, few dependencies
Medium — some uncertainty or multiple layers involved
High   — unclear requirements, external dependency, architectural impact or likely rework
```

Risk is not the same as effort.

A small task may be high risk if it is unclear or affects architecture.

---

## 7. AI Assistance Levels

Track how much AI assistance was used.

```text id="kqw7jm"
None      — no AI used
Planning  — AI used only for planning or review
Partial   — AI helped with some implementation
Heavy     — AI generated most of the initial implementation
Debugging — AI used mainly to analyze or fix errors
```

This helps evaluate where AI actually saves time and where it creates rework.

---

## 8. Rework Levels

Track whether the task required rework.

```text id="fiy3vl"
None   — accepted after normal review
Minor  — small fixes needed
Medium — meaningful correction or restructuring needed
Major  — task had to be substantially redone
```

A high rework level may indicate:

* unclear task scope;
* weak acceptance criteria;
* insufficient context;
* AI modified too much;
* hidden complexity;
* wrong initial estimate.

---

## 9. Estimation Table

Use this table to track backlog items.

| ID    | Task                                      | Area          | Layer      | Complexity | Risk   | Estimate | Actual | Variance | AI Assistance | Rework | Status      | Notes                                                |
| ----- | ----------------------------------------- | ------------- | ---------- | ---------- | ------ | -------: | -----: | -------: | ------------- | ------ | ----------- | ---------------------------------------------------- |
| B-001 | Create initial project documentation      | Documentation | docs       | S          | Low    |      TBD |    TBD |      TBD | Partial       | None   | Done        | Initial docs created manually with AI support        |
| B-002 | Define AI-assisted development workflow   | Documentation | docs       | M          | Medium |      TBD |    TBD |      TBD | Heavy         | TBD    | Done        | Long document; should be reviewed after first slices |
| B-003 | Define Definition of Done                 | Documentation | docs       | S          | Low    |      TBD |    TBD |      TBD | Heavy         | TBD    | Done        | Checklist for task completion                        |
| B-004 | Create estimation log structure           | Documentation | docs       | S          | Low    |      TBD |    TBD |      TBD | Heavy         | TBD    | Done        | Current file                                         |
| B-005 | Initialize monorepo                       | Setup         | repo       | M          | Medium |      TBD |    TBD |      TBD | TBD           | TBD    | Done        | pnpm workspace setup                                 |
| B-006 | Setup backend application                 | Backend       | api        | M          | Medium |      TBD |    TBD |      TBD | TBD           | TBD    | Done        | Fastify + TypeScript + health endpoint               |
| B-007 | Setup frontend application                | Frontend      | web        | M          | Medium |      TBD |    TBD |      TBD | TBD           | TBD    | Done        | React + TypeScript + Vite + routing                  |
| B-008 | Setup shared package                      | Setup         | shared     | S          | Low    |      TBD |    TBD |      TBD | TBD           | TBD    | Done        | Shared DTO/types package                             |
| B-009 | Setup initial CI                          | CI            | ci         | S          | Medium |      TBD |    TBD |      TBD | TBD           | TBD    | Done        | GitHub Actions                                       |
| B-010 | Define Project domain model               | Backend       | shared/api | S          | Low    |      TBD |    TBD |      TBD | TBD           | TBD    | Done        | First domain model                                   |
| B-011 | Implement Project API contract            | Backend       | api        | M          | Medium |      TBD |    TBD |      TBD | TBD           | TBD    | Done        | REST endpoints + DTOs                                |
| B-012 | Implement Project backend logic           | Backend       | api        | M          | Medium |      TBD |    TBD |      TBD | TBD           | TBD    | Done        | Routes/service/repository/tests                      |
| B-013 | Implement Project frontend route and page | Frontend      | web        | M          | Medium |      TBD |    TBD |      TBD | TBD           | TBD    | Done        | Project UI and API integration                       |
| B-014 | Add Project Setup tests                   | Testing       | tests      | M          | Medium |      TBD |    TBD |      TBD | TBD           | TBD    | Done        | Backend + frontend tests                             |

---

## 10. Detailed Entry Template

Use this template when a backlog item needs more detail than the table allows.

```text id="j9fj93"
## [Backlog ID] — [Task title]

Area:
Layer:
Complexity:
Risk:

Initial estimate:
Actual effort:
Variance:

AI assistance:
Rework level:
Status:

Scope:
[What was included.]

Acceptance criteria:
- 
- 
- 

What went as expected:
- 

What took longer than expected:
- 

Reason for variance:
- 

Lessons learned:
- 

Impact on future estimates:
- 
```

---

## 11. Example Entry

```text id="zef8vu"
## B-012 — Implement Project backend logic

Area: Project Setup
Layer: api
Complexity: M
Risk: Medium

Initial estimate: 3h
Actual effort: 4h
Variance: +1h

AI assistance: Partial
Rework level: Minor
Status: Done

Scope:
Implemented the Project backend module with routes, service, repository, validation and tests.

Acceptance criteria:
- Project can be created.
- Project can be listed.
- Project can be read by ID.
- Project can be updated.
- Validation is applied.
- Backend tests cover core behavior.

What went as expected:
- Module structure was clear.
- DTOs were reusable.
- Basic CRUD behavior was straightforward.

What took longer than expected:
- Validation edge cases.
- Test setup required small adjustments.

Reason for variance:
- Initial estimate did not fully account for validation and error response consistency.

Lessons learned:
- Backend CRUD modules with validation and tests should be estimated slightly higher than simple route-only tasks.

Impact on future estimates:
- Similar backend modules should be estimated at 3.5–4h instead of 3h.
```

---

## 12. Estimation Guidelines by Task Type

These are initial estimation guidelines. They should be adjusted after real data is collected.

| Task type               | Initial estimate range | Notes                             |
| ----------------------- | ---------------------: | --------------------------------- |
| Documentation file      |              0.5h – 2h | Depends on depth and review needs |
| Small DTO/schema task   |            0.5h – 1.5h | Low risk if model is clear        |
| Backend CRUD module     |                3h – 6h | Includes validation and tests     |
| Frontend page/form      |                3h – 6h | Depends on UI complexity          |
| API integration         |                1h – 3h | Depends on error/loading states   |
| Unit/integration tests  |                1h – 4h | Depends on setup maturity         |
| E2E flow                |                2h – 5h | Can be unstable early             |
| CI setup                |                1h – 3h | Depends on monorepo complexity    |
| Refactor                |                1h – 5h | Must be scoped carefully          |
| README/portfolio polish |                1h – 3h | Usually late-stage                |

These ranges are not final. They are starting assumptions.

---

## 13. Variance Categories

Use these categories to explain why actual effort differed from estimate.

```text id="8qryj5"
scope unclear
missing requirement
technical setup issue
dependency issue
test setup issue
validation complexity
frontend state complexity
API mismatch
AI over-generated
AI under-contextualized
manual review took longer
debugging took longer
documentation heavier than expected
```

Multiple categories may apply.

---

## 14. Lessons Learned Log

Use this section to collect cross-task lessons.

| Date | Backlog ID | Lesson | Future adjustment |
| ---- | ---------- | ------ | ----------------- |
| TBD  | TBD        | TBD    | TBD               |

Examples:

```text id="d76qqo"
- API contract should be defined before frontend UI.
- E2E tests should be added after the main flow stabilizes.
- AI tasks must explicitly list files that are allowed to change.
- Backend modules with validation require more time than simple endpoint setup.
```

---

## 15. Estimate Calibration

After each vertical slice, review estimates.

Questions:

```text id="uu7wys"
- Which tasks were underestimated?
- Which tasks were overestimated?
- Which task types caused the most variance?
- Did AI reduce time or increase rework?
- Were acceptance criteria clear enough?
- Did the task need more upfront analysis?
- Should future backlog items be split smaller?
```

Update future estimates based on evidence.

---

## 16. Suggested Review Moments

Review this log at these points:

```text id="05g862"
- after technical walking skeleton;
- after Project Setup vertical slice;
- after Feature Management vertical slice;
- after Task Management vertical slice;
- after KPI Dashboard vertical slice;
- before final README/portfolio polish;
- at project retrospective.
```

---

## 17. Link with Future Project Estimation

At the end of the project, this log should be used to improve the reusable project method.

Extract reusable information such as:

```text id="9pecsy"
- average effort for backend module;
- average effort for frontend feature page;
- average effort for tests;
- average effort for CI setup;
- average variance by task type;
- AI assistance impact;
- recurring risks;
- common causes of rework.
```

This information should inform future project estimates and prevent starting every new project from intuition alone.

---

## 18. Current Status

Status: initial estimation log structure.

This document should be updated continuously during implementation.
