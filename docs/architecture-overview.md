# Software Delivery Planner — Architecture Overview v0

## 1. Purpose

This document describes the initial technical architecture of the Software Delivery Planner.

The goal is to define a pragmatic, maintainable and portfolio-ready full-stack architecture based on React, Node.js and TypeScript.

The architecture should support:

* clear separation between frontend, backend and shared contracts;
* feature-based development;
* API-first thinking;
* automated testing;
* AI-assisted implementation through small and reviewable tasks;
* future extensibility without unnecessary complexity.

---

## 2. Architecture Principles

The project will follow these principles:

1. **Feature-first development**
   The application will be implemented by vertical slices based on features and use cases, not by isolated UI components.

2. **API-first approach**
   Backend endpoints should be documented through OpenAPI/Swagger so that frontend and backend contracts remain explicit and easy to validate.

3. **TypeScript everywhere**
   Both frontend and backend will use TypeScript to reduce ambiguity, improve maintainability and make AI-assisted coding safer.

4. **Small, reviewable changes**
   Each implementation task should be limited in scope, easy to review and covered by tests where meaningful.

5. **Shared contracts where useful**
   Common types, DTOs or validation schemas may be placed in a shared package to reduce duplication between frontend and backend.

6. **Testing as part of delivery**
   Unit, integration and end-to-end tests are part of the delivery process, not an optional late-stage activity.

7. **Simple before complex**
   The architecture should remain intentionally simple for v1. The project should not introduce microservices, complex cloud infrastructure or advanced abstractions unless they solve a clear problem.

---

## 3. High-Level Architecture

The application will be structured as a monorepo.

Initial structure:

```text
software-delivery-planner/
├── apps/
│   ├── web/
│   │   └── React + TypeScript frontend
│   └── api/
│       └── Node.js + TypeScript backend API
├── packages/
│   └── shared/
│       └── shared types, DTOs and validation schemas
├── docs/
│   ├── project-brief.md
│   ├── feature-map.md
│   ├── mvp-scope.md
│   ├── architecture-overview.md
│   └── method/
├── tests/
│   └── e2e/
│       └── Playwright tests
└── .github/
    └── workflows/
        └── CI workflows
```

---

## 4. Frontend Architecture

### Technology

The frontend will use:

* React;
* TypeScript;
* Vite;
* React Router;
* a component library or utility-first CSS framework;
* charting library for KPI visualization;
* frontend testing tools.

### Initial UI Scope

The frontend should include:

* project overview page;
* feature list and form;
* task list and form;
* sprint/phase planning section;
* risk register section;
* KPI dashboard;
* layout/navigation.

### State Management

For v1, the frontend should avoid unnecessary global state complexity.

Preferred approach:

* local component state for simple UI state;
* custom hooks for feature-specific behavior;
* server-state management through API hooks or a lightweight data-fetching approach;
* global state only if a real need emerges.

Redux should not be introduced by default unless the application state becomes complex enough to justify it.

### Suggested Frontend Structure

```text
apps/web/src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   └── layout/
├── features/
│   ├── projects/
│   ├── features/
│   ├── tasks/
│   ├── sprints/
│   ├── risks/
│   └── dashboard/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── api/
│   ├── utils/
│   └── types/
└── main.tsx
```

### Frontend Development Rule

Frontend components should not contain direct low-level API logic.

Preferred flow:

```text
UI component
→ feature hook/service
→ API client
→ backend endpoint
```

---

## 5. Backend Architecture

### Technology

The backend will use:

* Node.js;
* TypeScript;
* Fastify or Express;
* validation layer;
* REST API;
* OpenAPI/Swagger documentation;
* lightweight persistence;
* backend tests.

Fastify is preferred for v1 because it is modern, performant and works well with schema-driven APIs. Express remains a valid alternative if simplicity becomes more important than schema integration.

### Backend Responsibilities

The backend should manage:

* project data;
* feature data;
* task data;
* sprint/phase data;
* risk data;
* KPI calculation logic;
* validation;
* API responses;
* OpenAPI documentation.

### Suggested Backend Structure

```text
apps/api/src/
├── app.ts
├── server.ts
├── config/
├── modules/
│   ├── projects/
│   ├── features/
│   ├── tasks/
│   ├── sprints/
│   ├── risks/
│   └── dashboard/
├── shared/
│   ├── errors/
│   ├── validation/
│   ├── utils/
│   └── types/
└── tests/
```

Each module should preferably contain:

```text
module/
├── routes.ts
├── service.ts
├── schema.ts
├── repository.ts
└── tests/
```

### Backend Development Rule

Routes should remain thin.

Preferred flow:

```text
route/controller
→ validation
→ service/business logic
→ repository/persistence
→ response
```

---

## 6. Shared Package

The shared package may contain common definitions used by both frontend and backend.

Suggested structure:

```text
packages/shared/src/
├── dto/
├── schemas/
├── types/
└── constants/
```

Possible shared items:

* Project DTOs;
* Feature DTOs;
* Task DTOs;
* Sprint DTOs;
* Risk DTOs;
* enum-like constants;
* validation schemas where useful.

The shared package should remain small. It should not become a dumping ground for unrelated logic.

---

## 7. API Design

The API will follow REST principles.

Initial endpoint candidates:

```text
GET    /health

GET    /projects
POST   /projects
GET    /projects/:projectId
PATCH  /projects/:projectId

GET    /projects/:projectId/features
POST   /projects/:projectId/features
PATCH  /features/:featureId

GET    /projects/:projectId/tasks
POST   /projects/:projectId/tasks
PATCH  /tasks/:taskId

GET    /projects/:projectId/sprints
POST   /projects/:projectId/sprints
PATCH  /sprints/:sprintId

GET    /projects/:projectId/risks
POST   /projects/:projectId/risks
PATCH  /risks/:riskId

GET    /projects/:projectId/kpis
```

The API should be documented through OpenAPI/Swagger.

The API should be designed around resources and use cases, not around frontend components.

---

## 8. Persistence Strategy

For v1, persistence should remain lightweight.

Possible options:

1. in-memory persistence for the first walking skeleton;
2. JSON file persistence for a simple demo;
3. SQLite for a more realistic local persistence layer.

Preferred approach:

* start with in-memory persistence for the earliest slices;
* move to SQLite when the API and data model stabilize.

This allows fast development without blocking the early architecture on database details.

---

## 9. Testing Strategy

The project should include different levels of testing.

### Backend Testing

Backend tests should cover:

* validation;
* service logic;
* API endpoints;
* KPI calculation logic.

### Frontend Testing

Frontend tests should cover:

* key components;
* forms;
* user interactions;
* dashboard rendering.

### End-to-End Testing

Playwright should cover the main user journey:

1. view or create a project;
2. create a feature;
3. create a task;
4. add estimated and actual hours;
5. view updated KPI dashboard.

### CI

GitHub Actions should run:

* install;
* typecheck;
* lint if configured;
* tests;
* Playwright tests when stable.

---

## 10. AI-Assisted Development Constraints

The project will be developed with AI assistance, but the AI should operate under strict scope control.

Rules:

* do not generate the whole project in one pass;
* work by feature slices;
* modify only files relevant to the current task;
* do not inspect the whole repository unless explicitly requested;
* ask for clarification when architecture boundaries are unclear;
* add or update tests for behavior changes;
* summarize modified files after each task;
* stop after the requested step;
* avoid introducing new dependencies without explanation.

---

## 11. Security Considerations

Authentication and authorization are out of scope for v1 implementation.

However, the architecture should keep future production needs in mind.

Future security concerns:

* authentication;
* role-based access control;
* secure token/session handling;
* input validation;
* output sanitization;
* environment variables and secrets;
* CORS configuration;
* audit logging;
* rate limiting;
* secure deployment configuration.

For v1, validation and safe handling of input data should still be implemented.

---

## 12. Deployment Considerations

Deployment is not a core requirement for the first implementation phase.

Possible future deployment options:

* frontend deployed on Vercel, Netlify or GitHub Pages;
* backend deployed on Render, Railway, Fly.io or similar;
* database hosted separately if SQLite is replaced;
* CI/CD pipeline expanded after MVP completion.

For v1, local development and CI validation are the priority.

---

## 13. Initial Technical Decisions

| Area                 | Initial Decision                       |
| -------------------- | -------------------------------------- |
| Repository structure | Monorepo                               |
| Package manager      | pnpm                                   |
| Frontend             | React + TypeScript + Vite              |
| Backend              | Node.js + TypeScript                   |
| API style            | REST                                   |
| API documentation    | OpenAPI/Swagger                        |
| Validation           | Schema-based validation                |
| State management     | Start simple; avoid Redux by default   |
| Persistence          | Start in-memory, then SQLite if useful |
| Testing              | Unit/integration + Playwright E2E      |
| CI                   | GitHub Actions                         |
| Documentation        | Markdown in `/docs`                    |

---

## 14. Next Step

The next document should define the initial backlog.

File:

`docs/backlog-v0.md`
