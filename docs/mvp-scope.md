# Software Delivery Planner — MVP Scope v0

## 1. Purpose

This document defines the scope of the first public version of the Software Delivery Planner.

The goal of the MVP is to build a small but complete full-stack application that demonstrates:

* structured software project planning;
* feature and task breakdown;
* estimation and actual effort tracking;
* basic delivery KPIs;
* risk awareness;
* React, Node.js and TypeScript implementation;
* testing and AI-assisted development workflow.

The MVP should be intentionally limited. It is not intended to be a full project management platform or a Jira replacement.

---

## 2. MVP Goal

The MVP should allow a user to manage a single software delivery project from planning to basic monitoring.

The user should be able to:

1. create or load a project;
2. define project features;
3. break features into tasks;
4. estimate and track actual effort;
5. organize work into simple phases or sprints;
6. record project risks;
7. view delivery KPIs in a dashboard.

---

## 3. Core Scenario

The MVP will be demonstrated using a realistic demo project:

**Customer Portal Rebuild**

Scenario:

A company needs to rebuild an existing customer portal because the legacy version is difficult to maintain, has accumulated technical debt and makes future development slow and risky.

The new project aims to create a cleaner MVP with:

* clearer structure;
* better maintainability;
* more predictable delivery;
* task-level estimation;
* basic KPI tracking;
* risk visibility.

This demo scenario is designed to show how the application supports project planning and delivery monitoring.

---

## 4. Must Have Features

### 4.1 Project Setup

The application must allow the user to create and view a project.

Project fields:

* project name;
* description;
* business goal;
* start date;
* target end date;
* team size;
* estimated total effort;
* status.

Project statuses:

* draft;
* planned;
* in progress;
* completed;
* paused.

Acceptance criteria:

* the user can view the project overview;
* the user can create or edit basic project information;
* project data is validated;
* project data is available to related features.

---

### 4.2 Feature Management

The application must allow the user to define functional features within the project.

Feature fields:

* title;
* description;
* business value;
* priority;
* status;
* MVP flag;
* related project.

Feature priorities:

* low;
* medium;
* high.

Feature statuses:

* proposed;
* planned;
* in progress;
* done;
* deferred.

Acceptance criteria:

* the user can create a feature;
* the user can list project features;
* the user can mark whether a feature belongs to the MVP;
* the user can update feature priority and status.

---

### 4.3 Task Management

The application must allow the user to define tasks related to features.

Task fields:

* title;
* description;
* task type;
* priority;
* estimated hours;
* actual hours;
* status;
* related feature;
* related sprint or phase;
* notes.

Task types:

* analysis;
* frontend;
* backend;
* testing;
* documentation;
* bugfix;
* refactor;
* devops.

Task statuses:

* todo;
* in progress;
* blocked;
* done.

Acceptance criteria:

* the user can create tasks;
* the user can list tasks by project and feature;
* the user can update task status;
* the user can enter estimated and actual hours;
* task data can be used to calculate KPIs.

---

### 4.4 KPI Dashboard

The application must show basic delivery KPIs.

Initial KPIs:

* total estimated hours;
* total actual hours;
* effort variance;
* effort variance percentage;
* task completion rate;
* task distribution by type;
* open risks by severity;
* sprint or phase capacity usage.

Acceptance criteria:

* the dashboard shows summary cards;
* estimated and actual effort are compared;
* task completion rate is calculated;
* risks are grouped by severity;
* at least one basic chart is displayed;
* KPI values update when underlying data changes.

---

### 4.5 Delivery Documentation

The repository must include structured documentation.

Required documents:

* `docs/project-brief.md`;
* `docs/feature-map.md`;
* `docs/mvp-scope.md`;
* `docs/architecture-overview.md`;
* `docs/backlog-v0.md`;
* `docs/method/ai-assisted-workflow.md`;
* `docs/method/definition-of-done.md`;
* `docs/method/estimation-log.md`.

Acceptance criteria:

* documentation explains what the project does;
* documentation explains why the project exists;
* documentation explains the intended delivery method;
* documentation supports the portfolio narrative.

---

## 5. Should Have Features

### 5.1 Sprint / Phase Planning

The application should allow the user to group tasks into simple sprints or delivery phases.

Sprint / phase fields:

* name;
* goal;
* start date;
* end date;
* available capacity in hours;
* status.

Statuses:

* planned;
* active;
* completed.

Acceptance criteria:

* the user can create a sprint or phase;
* tasks can be assigned to a sprint or phase;
* planned effort can be compared with available capacity.

This feature should remain simple. It must not become a full Scrum board.

---

### 5.2 Risk Register

The application should allow the user to track basic project risks.

Risk fields:

* title;
* description;
* probability;
* impact;
* mitigation;
* status;
* related project.

Probability values:

* low;
* medium;
* high.

Impact values:

* low;
* medium;
* high.

Risk statuses:

* open;
* mitigated;
* closed.

Acceptance criteria:

* the user can create risks;
* the user can list risks;
* the user can update risk status;
* risks can be grouped by severity for KPI purposes.

---

## 6. Could Have Features

These items are useful but not required for the first MVP release:

* demo dataset preloaded at startup;
* GitHub Pages documentation;
* screenshots in the README;
* basic release notes;
* simple filters for task list;
* simple project status badge;
* basic CSV export;
* additional charts.

These should only be added if the core scope is already stable.

---

## 7. Won’t Have in v1

The MVP will not include:

* authentication;
* login;
* user registration;
* role-based access control;
* multi-user collaboration;
* real-time updates;
* drag-and-drop Kanban board;
* notifications;
* comments;
* file attachments;
* external integrations;
* AI-generated backlog;
* advanced budget management;
* invoice or cost tracking;
* advanced reporting;
* cloud infrastructure automation;
* mobile app;
* React Native app.

These items may be listed as future improvements.

---

## 8. Production Considerations

Some production-level concerns are intentionally excluded from the implementation scope of v1, but they should be acknowledged in the documentation.

Future production concerns include:

* authentication;
* authorization;
* role-based permissions;
* secure session or token management;
* input sanitization and security hardening;
* audit logging;
* cloud deployment;
* database backups;
* monitoring and observability;
* CI/CD release pipeline;
* environment management.

For the MVP, the focus is on demonstrating architecture, delivery awareness, testing and maintainable full-stack implementation.

---

## 9. Technical Boundaries

The MVP should use a pragmatic technical architecture.

Preferred boundaries:

* one frontend application;
* one backend API;
* shared TypeScript types where useful;
* clear separation between data model, API layer, business logic and UI;
* REST endpoints documented with OpenAPI;
* lightweight persistence;
* automated tests;
* end-to-end test for the main flow.

The project should avoid unnecessary architectural complexity.

The MVP should not include:

* microservices;
* event-driven architecture;
* complex cloud infrastructure;
* advanced caching;
* complex authorization;
* unnecessary abstractions.

---

## 10. Testing Scope

The MVP should include testing at different levels.

Required testing scope:

* backend unit or integration tests for core API behavior;
* frontend component or interaction tests for key UI elements;
* one Playwright end-to-end flow covering the main user journey;
* type checking;
* linting where practical;
* CI execution through GitHub Actions.

The main E2E flow should cover:

1. view or create a project;
2. create a feature;
3. create a task;
4. enter estimated and actual hours;
5. view updated KPI dashboard.

---

## 11. MVP Success Criteria

The MVP is successful if:

* the application runs locally with clear setup instructions;
* the user can manage a demo software project;
* features and tasks can be created and tracked;
* estimated and actual effort can be compared;
* delivery KPIs are visible;
* the repository includes clear documentation;
* automated tests are present;
* at least one E2E flow works;
* the project is suitable to be linked in a CV, cover letter or LinkedIn profile.

---

## 12. Portfolio Narrative

The MVP should communicate this message:

> This project demonstrates a structured approach to software delivery. It combines full-stack implementation with planning, estimation, risk tracking, KPI monitoring and controlled AI-assisted development.

The application should not only show technical execution, but also the ability to reason about how software projects should be planned, built, measured and improved.

---

## 13. Next Step

The next document should define the initial architecture.

File:

`docs/architecture-overview.md`
