# Software Delivery Planner

Software Delivery Planner is a work-in-progress full-stack portfolio project for
planning and monitoring a small software delivery initiative. It connects
project structure, delivery documentation, estimation, risks and KPIs in one
intentionally lightweight application.

## Current status

The repository currently contains:

- a working Project vertical slice with shared contracts, a Fastify REST API,
  in-memory persistence, a React project page and automated tests;
- shared Feature domain types and request/response contracts;
- OpenAPI documentation for the implemented API;
- a documented backlog and AI-assisted delivery method.

Feature API behavior and UI, task management, KPI dashboards, sprint planning,
risk management and E2E coverage are planned but not yet implemented. The next
planned item is **B-016 — Implement Feature API and backend logic**.

## Architecture and stack

This pnpm workspace uses:

- React, React Router, Vite and TypeScript for the web application;
- Fastify, JSON Schema, OpenAPI/Swagger and TypeScript for the API;
- shared TypeScript contracts for cross-layer request, response and domain
  types;
- Vitest and Testing Library for the current automated checks;
- GitHub Actions for continuous integration.

The implemented Project flow is:

```text
React UI → frontend API client → Fastify route/schema
→ service validation → in-memory repository → response
```

## Workspace

```text
apps/web          React frontend
apps/api          Fastify API
packages/shared   Shared TypeScript contracts
docs              Product, architecture, backlog and delivery documentation
tests/e2e         Reserved for the planned Playwright suite
```

## Local setup

Requirements:

- Node.js 22
- pnpm 11

```bash
pnpm install
pnpm --filter @software-delivery-planner/shared build
pnpm dev
```

The web application runs at `http://127.0.0.1:5173`. The API runs at
`http://127.0.0.1:3001`, with Swagger UI at
`http://127.0.0.1:3001/docs`.

## Available checks

```bash
pnpm typecheck
pnpm test
pnpm build
```

Smaller package-level checks are also available, for example:

```bash
pnpm --filter @software-delivery-planner/shared typecheck
pnpm --filter @software-delivery-planner/api test
pnpm --filter @software-delivery-planner/web test
```

See the [architecture overview](docs/architecture-overview.md),
[MVP scope](docs/mvp-scope.md), [backlog](docs/backlog-v0.md) and
[delivery method](docs/method/ai-assisted-workflow.md) for the canonical project
direction and roadmap.

## License

This project is licensed under the [MIT License](LICENSE).
