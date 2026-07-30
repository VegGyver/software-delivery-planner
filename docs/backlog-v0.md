# Backlog

# Software Delivery Planner — Backlog v0

## 1. Purpose

This document defines the initial implementation backlog for the Software Delivery Planner.

The backlog is organized around **features and vertical slices**, not isolated UI components. Each slice should produce a small, reviewable and testable increment of the application.

The purpose of this backlog is to support:

* structured implementation;
* AI-assisted development through scoped tasks;
* future estimation of effort;
* sprint planning depending on available team capacity;
* clear separation between backend, frontend, testing and documentation work.

This document does not yet contain final time estimates. Estimation will be tracked later in the estimation log.

---

## 2. Backlog Method

Each implementation item should follow this workflow:

```text
Feature brief
→ data model
→ API contract
→ backend implementation
→ backend tests
→ frontend route/page
→ frontend feature UI
→ frontend API integration
→ frontend tests
→ E2E test where relevant
→ documentation update
→ review/refactor
```

The project should be developed through **vertical slices**.

A vertical slice means that a small feature is implemented end-to-end across:

* shared types / DTOs;
* backend API;
* validation;
* persistence;
* frontend UI;
* tests;
* documentation.

---

## 3. Backlog Item Format

Each backlog item should eventually include:

```text
ID:
Title:
Feature area:
Type:
Layer:
Priority:
Dependency:
Estimated effort:
Actual effort:
Status:
Acceptance criteria:
Notes:
```

### Type values

```text
setup
documentation
backend
frontend
testing
e2e
refactor
ci
delivery
```

### Layer values

```text
repo
docs
shared
api
web
tests
ci
cross-cutting
```

### Priority values

```text
must
should
could
```

### Status values

```text
todo
in progress
done
blocked
deferred
```

---

## 4. Implementation Phases

The implementation is divided into logical phases.

Actual sprint planning will depend on:

* number of developers involved;
* daily capacity;
* desired delivery pace;
* complexity discovered during implementation;
* technical issues or refactoring needs.

Initial logical phases:

1. Repository and documentation foundation
2. Technical walking skeleton
3. Project Setup vertical slice
4. Feature Management vertical slice
5. Task Management vertical slice
6. KPI Dashboard vertical slice
7. Sprint / Phase Planning vertical slice
8. Risk Register vertical slice
9. Testing, CI and portfolio refinement

---

# Phase 1 — Repository and Documentation Foundation

## B-001 — Create initial project documentation

**Feature area:** Delivery Documentation
**Type:** documentation
**Layer:** docs
**Priority:** must
**Dependency:** none
**Status:** done

### Scope

Create the initial project documentation.

Required files:

* `docs/project-brief.md`
* `docs/feature-map.md`
* `docs/mvp-scope.md`
* `docs/architecture-overview.md`
* `docs/backlog-v0.md`

### Acceptance criteria

* The project purpose is documented.
* MVP scope is documented.
* Main feature areas are documented.
* Initial architecture is documented.
* Initial backlog is documented.

---

## B-002 — Define AI-assisted development workflow

**Feature area:** Delivery Documentation
**Type:** documentation
**Layer:** docs
**Priority:** must
**Dependency:** B-001
**Status:** done

### Scope

Create the first version of the AI-assisted development workflow.

Suggested file:

* `docs/method/ai-assisted-workflow.md`

The document should define:

* how to use AI inside the IDE;
* how to scope each AI task;
* how to avoid asking the AI to inspect the whole repository;
* how to ask for implementation plans;
* how to review code before moving to the next task;
* how to handle refactoring;
* how to limit token usage;
* how to document estimate vs actual effort.

### Acceptance criteria

* The workflow is clear enough to be used inside VS Code/Codex.
* The workflow supports small, reviewable tasks.
* The workflow includes explicit “do not” rules.
* The workflow can be reused for future projects.

---

## B-003 — Define Definition of Done

**Feature area:** Delivery Documentation
**Type:** documentation
**Layer:** docs
**Priority:** must
**Dependency:** B-001
**Status:** done

### Scope

Create the initial Definition of Done.

Suggested file:

* `docs/method/definition-of-done.md`

The Definition of Done should include:

* code implemented;
* validation added;
* tests added or updated;
* no unrelated files changed;
* documentation updated when needed;
* lint/typecheck passing;
* review completed;
* estimate vs actual recorded.

### Acceptance criteria

* Every future feature slice can be checked against this document.
* The document supports technical and delivery quality.

---

## B-004 — Create estimation log structure

**Feature area:** Delivery Documentation
**Type:** documentation
**Layer:** docs
**Priority:** must
**Dependency:** B-001
**Status:** done

### Scope

Create an estimation log template.

Suggested file:

* `docs/method/estimation-log.md`

The estimation log should track:

* backlog item ID;
* estimated effort;
* actual effort;
* variance;
* reason for variance;
* AI assistance used;
* rework required;
* lessons learned.

### Acceptance criteria

* The log can be used to improve future estimates.
* The log is simple enough to maintain during development.

---

# Phase 2 — Technical Walking Skeleton

## B-005 — Initialize monorepo

**Feature area:** Technical Foundation
**Type:** setup
**Layer:** repo
**Priority:** must
**Dependency:** B-001
**Status:** done

### Scope

Initialize the repository as a pnpm monorepo.

Expected structure:

```text
apps/
  web/
  api/
packages/
  shared/
docs/
tests/
  e2e/
.github/
  workflows/
```

### Acceptance criteria

* The repository has a clear monorepo structure.
* `apps/web`, `apps/api` and `packages/shared` are created.
* Basic package scripts are available.
* The structure matches the architecture overview.

---

## B-006 — Setup backend application

**Feature area:** Technical Foundation
**Type:** backend
**Layer:** api
**Priority:** must
**Dependency:** B-005
**Status:** done

### Scope

Create the initial Node.js + TypeScript backend application.

Preferred framework:

* Fastify

Initial backend should include:

* application bootstrap;
* server entry point;
* configuration structure;
* `/health` endpoint;
* basic error handling;
* test setup.

### Acceptance criteria

* The API starts locally.
* `GET /health` returns a successful response.
* The backend has TypeScript enabled.
* At least one backend test validates the health endpoint.

---

## B-007 — Setup frontend application

**Feature area:** Technical Foundation
**Type:** frontend
**Layer:** web
**Priority:** must
**Dependency:** B-005
**Status:** done

### Scope

Create the initial React + TypeScript frontend application.

Expected tools:

* React;
* TypeScript;
* Vite;
* routing setup;
* base layout.

Initial frontend should include:

* main app entry;
* router;
* base layout;
* placeholder pages;
* API connectivity check.

### Acceptance criteria

* The frontend starts locally.
* The app has a working router.
* A base layout is visible.
* The frontend can call the backend health endpoint.

---

## B-008 — Setup shared package

**Feature area:** Technical Foundation
**Type:** setup
**Layer:** shared
**Priority:** must
**Dependency:** B-005
**Status:** done

### Scope

Create the initial shared package.

The shared package should be prepared to contain:

* DTOs;
* common types;
* constants;
* validation schemas where useful.

### Acceptance criteria

* `packages/shared` builds correctly.
* Both frontend and backend can import from the shared package.
* No unnecessary logic is added.

---

## B-009 — Setup initial CI

**Feature area:** Technical Foundation
**Type:** ci
**Layer:** ci
**Priority:** should
**Dependency:** B-005, B-006, B-007
**Status:** done

### Scope

Create the first GitHub Actions workflow.

Initial CI should run:

* install;
* typecheck;
* backend tests;
* frontend tests if available.

### Acceptance criteria

* CI workflow exists.
* CI can be expanded later with lint and Playwright.
* CI reflects the local development workflow.

---

# Phase 3 — Project Setup Vertical Slice

## B-010 — Define Project domain model

**Feature area:** Project Setup
**Type:** backend
**Layer:** shared / api
**Priority:** must
**Dependency:** B-008
**Status:** done

### Scope

Define the Project entity and related DTOs.

Project fields:

* id;
* name;
* description;
* businessGoal;
* startDate;
* targetEndDate;
* teamSize;
* estimatedTotalEffort;
* status;
* createdAt;
* updatedAt.

### Acceptance criteria

* Project type is defined.
* Create/update DTOs are defined.
* Project status values are defined.
* Types are reusable by API and frontend where useful.

---

## B-011 — Implement Project API contract

**Feature area:** Project Setup
**Type:** backend
**Layer:** api
**Priority:** must
**Dependency:** B-010
**Status:** done

### Scope

Define initial Project REST endpoints.

Endpoints:

```text
GET    /projects
POST   /projects
GET    /projects/:projectId
PATCH  /projects/:projectId
```

### Acceptance criteria

* Endpoints are defined in the API layer.
* Request and response shapes are clear.
* OpenAPI/Swagger documentation is updated or prepared.
* API is designed around Project resource, not frontend components.

---

## B-012 — Implement Project backend logic

**Feature area:** Project Setup
**Type:** backend
**Layer:** api
**Priority:** must
**Dependency:** B-011
**Status:** done

### Scope

Implement Project backend module.

Expected module structure:

```text
projects/
  routes.ts
  service.ts
  repository.ts
  schema.ts
  tests/
```

### Acceptance criteria

* Project can be created.
* Project can be listed.
* Project can be read by ID.
* Project can be updated.
* Validation is applied.
* Backend tests cover core behavior.

---

## B-013 — Implement Project frontend route and page

**Feature area:** Project Setup
**Type:** frontend
**Layer:** web
**Priority:** must
**Dependency:** B-012
**Status:** done

### Scope

Create the frontend Project page.

Expected UI:

* project overview page;
* project form;
* project details display;
* basic loading/error states.

### Acceptance criteria

* User can view project information.
* User can create or update a project from the UI.
* UI uses API client/hook/service layer.
* Components do not contain low-level API logic.

---

## B-014 — Add Project Setup tests

**Feature area:** Project Setup
**Type:** testing
**Layer:** tests
**Priority:** must
**Dependency:** B-012, B-013
**Status:** done

### Scope

Add tests for the Project Setup vertical slice.

Testing scope:

* backend tests for Project API;
* frontend tests for Project form/page;
* optional initial E2E smoke test.

### Acceptance criteria

* Project creation behavior is covered.
* Project validation behavior is covered.
* Tests run locally.
* Tests can be executed through CI when available.

---

# Phase 4 — Feature Management Vertical Slice

## B-015 — Define Feature domain model

**Feature area:** Feature Management
**Type:** backend
**Layer:** shared / api
**Priority:** must
**Dependency:** B-010
**Status:** done

### Scope

Define the Feature entity and related DTOs.

Feature fields:

* id;
* projectId;
* title;
* description;
* businessValue;
* priority;
* status;
* isMvp;
* createdAt;
* updatedAt.

### Acceptance criteria

* Feature type is defined.
* Create/update DTOs are defined.
* Priority and status values are defined.
* Feature belongs to a Project.

---

## B-016 — Implement Feature API and backend logic

**Feature area:** Feature Management
**Type:** backend
**Layer:** api
**Priority:** must
**Dependency:** B-015
**Status:** todo

### Scope

Implement Feature backend module.

Endpoints:

```text
GET    /projects/:projectId/features
POST   /projects/:projectId/features
PATCH  /features/:featureId
```

### Acceptance criteria

* Features can be created for a project.
* Features can be listed by project.
* Feature priority and status can be updated.
* Backend tests cover core behavior.

---

## B-017 — Implement Feature frontend UI

**Feature area:** Feature Management
**Type:** frontend
**Layer:** web
**Priority:** must
**Dependency:** B-016
**Status:** todo

### Scope

Create frontend feature management UI.

Expected UI:

* feature list;
* feature form;
* priority/status controls;
* MVP flag display.

### Acceptance criteria

* User can create a feature.
* User can list project features.
* User can update priority/status.
* UI uses feature-level API layer.

---

## B-018 — Add Feature Management tests

**Feature area:** Feature Management
**Type:** testing
**Layer:** tests
**Priority:** must
**Dependency:** B-016, B-017
**Status:** todo

### Scope

Add tests for the Feature Management vertical slice.

Testing scope:

* backend tests;
* frontend tests;
* optional E2E extension.

### Acceptance criteria

* Feature creation is covered.
* Feature list rendering is covered.
* Feature update behavior is covered.

---

# Phase 5 — Task Management Vertical Slice

## B-019 — Define Task domain model

**Feature area:** Task Management
**Type:** backend
**Layer:** shared / api
**Priority:** must
**Dependency:** B-015
**Status:** todo

### Scope

Define the Task entity and related DTOs.

Task fields:

* id;
* projectId;
* featureId;
* sprintId;
* title;
* description;
* type;
* priority;
* estimatedHours;
* actualHours;
* status;
* notes;
* createdAt;
* updatedAt.

### Acceptance criteria

* Task type is defined.
* Create/update DTOs are defined.
* Task belongs to Project and optionally Feature/Sprint.
* Estimated and actual effort fields are included.

---

## B-020 — Implement Task API and backend logic

**Feature area:** Task Management
**Type:** backend
**Layer:** api
**Priority:** must
**Dependency:** B-019
**Status:** todo

### Scope

Implement Task backend module.

Endpoints:

```text
GET    /projects/:projectId/tasks
POST   /projects/:projectId/tasks
PATCH  /tasks/:taskId
```

### Acceptance criteria

* Tasks can be created.
* Tasks can be listed by project.
* Tasks can be filtered or grouped by feature where practical.
* Task status can be updated.
* Estimated and actual hours can be updated.
* Backend tests cover core behavior.

---

## B-021 — Implement Task frontend UI

**Feature area:** Task Management
**Type:** frontend
**Layer:** web
**Priority:** must
**Dependency:** B-020
**Status:** todo

### Scope

Create task management UI.

Expected UI:

* task list/table;
* task form;
* status selector;
* estimated hours field;
* actual hours field;
* task type display;
* priority display.

### Acceptance criteria

* User can create a task.
* User can update task status.
* User can enter estimated and actual hours.
* User can see task list grouped or associated with features.
* UI remains simple and readable.

---

## B-022 — Add Task Management tests

**Feature area:** Task Management
**Type:** testing
**Layer:** tests
**Priority:** must
**Dependency:** B-020, B-021
**Status:** todo

### Scope

Add tests for the Task Management vertical slice.

Testing scope:

* backend task API tests;
* task form tests;
* task table/list tests.

### Acceptance criteria

* Task creation is covered.
* Task update is covered.
* Estimated vs actual fields are covered.

---

# Phase 6 — KPI Dashboard Vertical Slice

## B-023 — Define KPI calculation rules

**Feature area:** KPI Dashboard
**Type:** backend
**Layer:** api / docs
**Priority:** must
**Dependency:** B-019
**Status:** todo

### Scope

Define KPI calculation logic.

Initial KPIs:

* total estimated hours;
* total actual hours;
* effort variance;
* effort variance percentage;
* task completion rate;
* task distribution by type;
* open risks by severity;
* sprint capacity usage.

### Acceptance criteria

* KPI formulas are documented.
* KPI input data is clear.
* KPI edge cases are considered.

---

## B-024 — Implement KPI backend endpoint

**Feature area:** KPI Dashboard
**Type:** backend
**Layer:** api
**Priority:** must
**Dependency:** B-020, B-023
**Status:** todo

### Scope

Implement KPI backend logic and endpoint.

Endpoint:

```text
GET /projects/:projectId/kpis
```

### Acceptance criteria

* KPI endpoint returns calculated values.
* KPI calculations use project tasks, risks and sprint data where available.
* Backend tests cover calculation logic.
* Edge cases are handled.

---

## B-025 — Implement KPI Dashboard frontend

**Feature area:** KPI Dashboard
**Type:** frontend
**Layer:** web
**Priority:** must
**Dependency:** B-024
**Status:** todo

### Scope

Create KPI dashboard UI.

Expected UI:

* summary cards;
* estimated vs actual display;
* effort variance display;
* completion rate display;
* task distribution chart;
* risk summary section.

### Acceptance criteria

* Dashboard displays values returned by API.
* At least one chart is visible.
* Dashboard updates when source data changes.
* Empty states are handled.

---

## B-026 — Add KPI Dashboard tests

**Feature area:** KPI Dashboard
**Type:** testing
**Layer:** tests
**Priority:** must
**Dependency:** B-024, B-025
**Status:** todo

### Scope

Add tests for KPI calculation and rendering.

Testing scope:

* backend KPI calculation tests;
* frontend dashboard rendering tests;
* chart data preparation tests where practical.

### Acceptance criteria

* KPI calculations are tested.
* Dashboard renders main values.
* Empty or incomplete data does not break the UI.

---

# Phase 7 — Sprint / Phase Planning Vertical Slice

## B-027 — Define Sprint / Phase domain model

**Feature area:** Sprint / Phase Planning
**Type:** backend
**Layer:** shared / api
**Priority:** should
**Dependency:** B-019
**Status:** todo

### Scope

Define Sprint or Phase entity.

Fields:

* id;
* projectId;
* name;
* goal;
* startDate;
* endDate;
* availableCapacityHours;
* status;
* createdAt;
* updatedAt.

### Acceptance criteria

* Sprint/Phase type is defined.
* Create/update DTOs are defined.
* Status values are defined.

---

## B-028 — Implement Sprint / Phase API and backend logic

**Feature area:** Sprint / Phase Planning
**Type:** backend
**Layer:** api
**Priority:** should
**Dependency:** B-027
**Status:** todo

### Scope

Implement Sprint / Phase backend module.

Endpoints:

```text
GET    /projects/:projectId/sprints
POST   /projects/:projectId/sprints
PATCH  /sprints/:sprintId
```

### Acceptance criteria

* Sprints/phases can be created.
* Sprints/phases can be listed by project.
* Sprint capacity can be stored.
* Backend tests cover core behavior.

---

## B-029 — Implement Sprint / Phase frontend UI

**Feature area:** Sprint / Phase Planning
**Type:** frontend
**Layer:** web
**Priority:** should
**Dependency:** B-028
**Status:** todo

### Scope

Create sprint/phase planning UI.

Expected UI:

* sprint/phase list;
* sprint/phase form;
* capacity field;
* status display;
* planned effort display if task assignment is available.

### Acceptance criteria

* User can create a sprint/phase.
* User can view sprint/phase capacity.
* UI remains simple and does not become a full Scrum board.

---

## B-030 — Connect tasks to sprints/phases

**Feature area:** Sprint / Phase Planning
**Type:** backend / frontend
**Layer:** api / web
**Priority:** should
**Dependency:** B-020, B-028, B-029
**Status:** todo

### Scope

Allow tasks to be assigned to a sprint or phase.

### Acceptance criteria

* Task can reference a sprint/phase.
* UI allows assigning a task to a sprint/phase.
* KPI dashboard can use sprint capacity data.

---

# Phase 8 — Risk Register Vertical Slice

## B-031 — Define Risk domain model

**Feature area:** Risk Register
**Type:** backend
**Layer:** shared / api
**Priority:** should
**Dependency:** B-010
**Status:** todo

### Scope

Define Risk entity and related DTOs.

Fields:

* id;
* projectId;
* title;
* description;
* probability;
* impact;
* mitigation;
* status;
* createdAt;
* updatedAt.

### Acceptance criteria

* Risk type is defined.
* Probability and impact values are defined.
* Risk status values are defined.
* Risk belongs to a Project.

---

## B-032 — Implement Risk API and backend logic

**Feature area:** Risk Register
**Type:** backend
**Layer:** api
**Priority:** should
**Dependency:** B-031
**Status:** todo

### Scope

Implement Risk backend module.

Endpoints:

```text
GET    /projects/:projectId/risks
POST   /projects/:projectId/risks
PATCH  /risks/:riskId
```

### Acceptance criteria

* Risks can be created.
* Risks can be listed by project.
* Risk status can be updated.
* Backend tests cover core behavior.

---

## B-033 — Implement Risk Register frontend UI

**Feature area:** Risk Register
**Type:** frontend
**Layer:** web
**Priority:** should
**Dependency:** B-032
**Status:** todo

### Scope

Create Risk Register UI.

Expected UI:

* risk list/table;
* risk form;
* probability and impact display;
* mitigation text;
* status selector.

### Acceptance criteria

* User can create risks.
* User can update risk status.
* Risks are displayed clearly.
* Risk data can support dashboard summaries.

---

## B-034 — Add Risk Register tests

**Feature area:** Risk Register
**Type:** testing
**Layer:** tests
**Priority:** should
**Dependency:** B-032, B-033
**Status:** todo

### Scope

Add tests for the Risk Register vertical slice.

### Acceptance criteria

* Risk creation is covered.
* Risk list rendering is covered.
* Risk status update is covered.

---

# Phase 9 — End-to-End Flow and Portfolio Refinement

## B-035 — Add Playwright E2E main flow

**Feature area:** Testing
**Type:** e2e
**Layer:** tests
**Priority:** must
**Dependency:** B-013, B-017, B-021, B-025
**Status:** todo

### Scope

Create the main Playwright test.

Main flow:

1. view or create a project;
2. create a feature;
3. create a task;
4. enter estimated and actual hours;
5. view updated KPI dashboard.

### Acceptance criteria

* E2E test runs locally.
* E2E test covers the core user journey.
* E2E test is documented.
* Test can later be integrated into CI.

---

## B-036 — Add demo dataset

**Feature area:** Portfolio / Demo
**Type:** setup
**Layer:** api / web
**Priority:** could
**Dependency:** B-020, B-024
**Status:** todo

### Scope

Add a demo dataset for the “Customer Portal Rebuild” scenario.

Demo data should include:

* one project;
* several features;
* tasks with estimated and actual hours;
* one or two sprints/phases;
* several risks;
* enough data to populate the KPI dashboard.

### Acceptance criteria

* Demo data can be loaded easily.
* Dashboard looks meaningful with demo data.
* Demo data supports the portfolio narrative.

---

## B-037 — Finalize README

**Feature area:** Portfolio / Documentation
**Type:** documentation
**Layer:** docs
**Priority:** must
**Dependency:** core MVP completion
**Status:** todo

### Scope

Create a polished README.

README should include:

* project purpose;
* stack;
* architecture overview;
* setup instructions;
* testing instructions;
* screenshots;
* portfolio message;
* AI-assisted development method summary.

### Acceptance criteria

* README is clear for recruiters and technical reviewers.
* README explains both technical and delivery value.
* README links to key docs.

---

## B-038 — Add release notes

**Feature area:** Portfolio / Documentation
**Type:** documentation
**Layer:** docs
**Priority:** could
**Dependency:** MVP completion
**Status:** todo

### Scope

Create first release notes.

Suggested file:

* `docs/release-notes.md`

### Acceptance criteria

* Version 1.0 scope is summarized.
* Known limitations are documented.
* Future improvements are listed.

---

## B-039 — Review architecture and refactor

**Feature area:** Quality
**Type:** refactor
**Layer:** cross-cutting
**Priority:** should
**Dependency:** MVP completion
**Status:** todo

### Scope

Review the application after MVP implementation.

Review focus:

* duplicated code;
* unclear naming;
* overly coupled modules;
* reusable helpers/services;
* API consistency;
* test coverage gaps;
* documentation gaps.

### Acceptance criteria

* Refactor opportunities are documented.
* Critical cleanup is completed.
* No major regression is introduced.
* Tests still pass.

---

## B-040 — Prepare GitHub portfolio presentation

**Feature area:** Portfolio / Documentation
**Type:** documentation
**Layer:** docs
**Priority:** must
**Dependency:** MVP completion
**Status:** todo

### Scope

Prepare final GitHub presentation.

Tasks:

* add screenshots;
* add repository description;
* add topics/tags;
* pin repository if useful;
* prepare short LinkedIn description;
* prepare CV/cover reference sentence.

### Acceptance criteria

* The repository is understandable within 1–2 minutes.
* The project can be linked in job applications.
* The project clearly shows React, Node, testing and delivery method.

---

## B-041 — Prepare repository for initial public publication

**Feature area:** Portfolio / Documentation
**Type:** delivery
**Layer:** repo / docs
**Priority:** must
**Dependency:** B-015
**Status:** done

### Scope

Prepare the work-in-progress repository for its first public publication.

Tasks:

* add a concise current-state README;
* add the MIT license;
* complete generated-artifact and environment-file ignore coverage;
* audit the repository and rewritten public history before publication.

### Acceptance criteria

* Public documentation reflects only implemented behavior.
* Generated artifacts and private environment files are excluded.
* Publication checks pass without starting B-016.

---

# 5. Suggested Initial Work Order

The recommended first implementation order is:

```text
1. B-002 — Define AI-assisted development workflow
2. B-003 — Define Definition of Done
3. B-004 — Create estimation log structure
4. B-005 — Initialize monorepo
5. B-006 — Setup backend application
6. B-007 — Setup frontend application
7. B-008 — Setup shared package
8. B-009 — Setup initial CI
9. B-010 → B-014 — Project Setup vertical slice
10. B-015 → B-018 — Feature Management vertical slice
11. B-019 → B-022 — Task Management vertical slice
12. B-023 → B-026 — KPI Dashboard vertical slice
13. B-027 → B-030 — Sprint / Phase Planning vertical slice
14. B-031 → B-034 — Risk Register vertical slice
15. B-035 — Playwright E2E main flow
16. B-036 → B-040 — Demo, README, release and portfolio refinement
```

---

# 6. Notes on Sprint Planning

This backlog is not yet divided into fixed sprints.

Sprint planning should be done later based on:

* available working time;
* number of developers;
* desired sprint length;
* actual progress;
* dependencies discovered during development;
* variance between estimated and actual effort.

For a solo developer assisted by AI, a practical sprint may correspond to one or more vertical slices rather than a fixed two-week Scrum sprint.

Possible solo-dev delivery grouping:

```text
Sprint 0 — Documentation and technical foundation
Sprint 1 — Project Setup + Feature Management
Sprint 2 — Task Management + KPI Dashboard
Sprint 3 — Sprint/Risk features + E2E + README
```

This is only an initial hypothesis and should be adjusted after the first implementation tasks are measured.

---

# 7. Next Step

The next document should define the AI-assisted workflow.

File:

`docs/method/ai-assisted-workflow.md`
