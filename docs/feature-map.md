# Software Delivery Planner — Feature Map v0

## 1. Purpose

This document breaks down the Software Delivery Planner into functional areas and implementation-ready features.

The goal is to define the application by **features and use cases**, not by isolated UI components. Each feature should later be implemented as a vertical slice including data model, API, frontend, tests and documentation.

---

## 2. Feature Areas

The MVP is divided into seven main feature areas:

1. Project Setup
2. Feature Management
3. Task Management
4. Sprint / Phase Planning
5. Risk Register
6. KPI Dashboard
7. Delivery Documentation

---

## 3. Feature Area: Project Setup

### Goal

Allow the user to create and view the main software project being planned and monitored.

### Main Use Cases

* Create a project.
* View project details.
* Edit basic project information.
* Track project status.

### Initial Data

A project should include:

* name;
* description;
* business goal;
* start date;
* target end date;
* team size;
* estimated total effort;
* status.

### MVP Priority

High.

### Notes

This should be the first vertical slice because most other features depend on the existence of a project.

---

## 4. Feature Area: Feature Management

### Goal

Allow the user to define the main functional features included in the project scope.

### Main Use Cases

* Create a feature.
* List project features.
* Assign priority and status.
* Mark a feature as part of the MVP or future scope.

### Initial Data

A feature should include:

* title;
* description;
* business value;
* priority;
* status;
* MVP flag;
* related project.

### MVP Priority

High.

### Notes

This feature connects the project brief with implementation planning. It helps show that the application is organized around features/use cases rather than isolated components.

---

## 5. Feature Area: Task Management

### Goal

Allow the user to break each feature into concrete tasks and track estimated effort versus actual effort.

### Main Use Cases

* Create a task.
* List tasks by project, feature or sprint.
* Update task status.
* Add estimated hours.
* Add actual hours.
* Assign task type and priority.

### Initial Data

A task should include:

* title;
* description;
* type;
* priority;
* estimated hours;
* actual hours;
* status;
* related feature;
* related sprint or phase;
* notes.

### MVP Priority

High.

### Notes

This is one of the core features of the application because it enables delivery tracking and KPI calculation.

---

## 6. Feature Area: Sprint / Phase Planning

### Goal

Allow the user to group work into sprints or delivery phases.

### Main Use Cases

* Create a sprint or phase.
* Define sprint goal.
* Set start and end date.
* Define available capacity.
* Assign tasks to sprint.
* Compare planned effort with available capacity.

### Initial Data

A sprint or phase should include:

* name;
* goal;
* start date;
* end date;
* available capacity in hours;
* planned effort;
* status.

### MVP Priority

Medium.

### Notes

For MVP, this does not need to be a full Scrum board. A simple sprint/phase planning model is enough.

---

## 7. Feature Area: Risk Register

### Goal

Allow the user to identify and track risks that may affect the delivery of the project.

### Main Use Cases

* Create a risk.
* List project risks.
* Assign probability and impact.
* Define mitigation.
* Update risk status.

### Initial Data

A risk should include:

* title;
* description;
* probability;
* impact;
* mitigation;
* status;
* related project.

### MVP Priority

Medium.

### Notes

This feature supports the delivery/PMO positioning of the project. It shows awareness of risk management beyond pure implementation.

---

## 8. Feature Area: KPI Dashboard

### Goal

Provide a simple visual overview of delivery performance.

### Main Use Cases

* Show estimated vs actual effort.
* Show task completion rate.
* Show sprint capacity usage.
* Show task distribution by type.
* Show open risks by severity.
* Show effort variance.

### Initial KPIs

The MVP dashboard should include:

* total estimated hours;
* total actual hours;
* effort variance percentage;
* completed tasks / total tasks;
* planned sprint capacity usage;
* tasks grouped by type;
* risks grouped by severity.

### MVP Priority

High.

### Notes

The KPI Dashboard is one of the most important portfolio elements because it connects technical implementation with delivery awareness.

---

## 9. Feature Area: Delivery Documentation

### Goal

Document the project planning and delivery method directly inside the repository.

### Main Use Cases

* Document the project brief.
* Document MVP scope.
* Document architecture decisions.
* Document delivery workflow.
* Document Definition of Done.
* Document AI-assisted development workflow.

### Initial Documents

The repository should include:

* project brief;
* feature map;
* MVP scope;
* architecture overview;
* backlog;
* risk register;
* AI-assisted workflow;
* Definition of Done;
* estimation log.

### MVP Priority

High.

### Notes

This feature is not part of the runtime application, but it is essential for the GitHub portfolio narrative.

---

## 10. Initial MVP Feature Priority

### Must Have

1. Project Setup
2. Feature Management
3. Task Management
4. KPI Dashboard
5. Delivery Documentation

### Should Have

6. Sprint / Phase Planning
7. Risk Register

### Could Have

8. Basic charts
9. Demo dataset
10. GitHub Pages documentation

### Won’t Have in v1

* authentication;
* user roles;
* real multi-user collaboration;
* drag-and-drop board;
* external integrations;
* AI-generated backlog;
* advanced budget management;
* mobile app.

---

## 11. Suggested Vertical Slice Order

The implementation should proceed through small vertical slices.

### Slice 1 — Project Setup

Create and view a project.

Includes:

* project data model;
* project validation;
* project API;
* project frontend page;
* project form;
* basic tests.

### Slice 2 — Feature Management

Create and list project features.

Includes:

* feature data model;
* feature API;
* feature frontend section;
* tests.

### Slice 3 — Task Management

Create, list and update tasks.

Includes:

* task data model;
* task API;
* task table;
* task form;
* estimated vs actual fields;
* tests.

### Slice 4 — KPI Dashboard

Calculate and display basic delivery KPIs.

Includes:

* KPI calculation logic;
* KPI API endpoint;
* frontend dashboard cards;
* basic charts;
* tests.

### Slice 5 — Sprint / Phase Planning

Group tasks into delivery phases or sprints.

Includes:

* sprint data model;
* sprint API;
* task assignment to sprint;
* capacity calculation;
* tests.

### Slice 6 — Risk Register

Create and track project risks.

Includes:

* risk data model;
* risk API;
* risk list/table;
* severity calculation;
* tests.

### Slice 7 — End-to-End Flow

Add a Playwright test covering the main user journey:

1. create project;
2. create feature;
3. create task;
4. add estimated and actual hours;
5. view KPI dashboard.

---

## 12. Next Step

The next document should define the MVP scope in more detail.

File:

`docs/mvp-scope.md`
