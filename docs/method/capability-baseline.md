# Capability Baseline

| Capability | Status | Evidence / limits |
|---|---|---|
| Frameworks | Available | Fastify + TypeScript API in `apps/api`; React + TypeScript + Vite frontend in `apps/web`; shared TypeScript contracts in `packages/shared` |
| Package manager/scripts | Available with limits | pnpm workspace with root build, typecheck and test orchestration; root formatting references undeclared Prettier |
| Tests | Available with limits | Vitest API tests and Vitest/Testing Library frontend tests; no implemented Playwright E2E suite |
| Typecheck/lint/build | Available with limits | Build and typecheck scripts exist; API/web have no lint scripts and shared lint is a placeholder |
| API/client pattern | Available | Fastify routes and JSON schemas, service/repository separation for Projects, Swagger/OpenAPI, and frontend API client modules |
| State/forms/validation | Available with limits | React local state and HTML form constraints; Fastify JSON Schema plus Project date-range validation; Project UI supports create/list but not update |
| Database/ORM | Not available | Project repository uses an in-memory `Map`; no database or ORM dependency is configured |
| Auth | Not available | Authentication and authorization are explicitly out of scope for v1 and are not implemented |
| UI libraries | Not available | No component, CSS utility or charting library is configured |
| CI/CD | Available with limits | GitHub Actions installs dependencies, builds/typechecks shared, typechecks/tests API, and typechecks/builds web; frontend tests are not run |

## Observed local standards

| Area | Observed pattern | Evidence paths | Scope / limits | Classification |
|---|---|---|---|---|
| Project structure | pnpm monorepo split into API, web and shared-contract packages | `pnpm-workspace.yaml`, `apps/api/package.json`, `apps/web/package.json`, `packages/shared/package.json` | Established across the current workspace | Established |
| Naming / organization | Backend resource module uses routes, schema, service and repository; frontend uses pages plus shared API clients | `apps/api/src/modules/projects/`, `apps/web/src/pages/ProjectsPage.tsx`, `apps/web/src/shared/api/projectsApi.ts` | Demonstrated by the first implemented resource slice | Localized |
| Data / API / validation | Shared TypeScript contracts feed Fastify schemas and frontend clients; business validation remains in the service | `packages/shared/src/types/project.ts`, `apps/api/src/modules/projects/schema.ts`, `apps/api/src/modules/projects/service.ts`, `apps/web/src/shared/api/projectsApi.ts` | Established for Health and Project contracts; resource layering is demonstrated only by Projects | Established |
| Tests / checks | API tests use Fastify injection; frontend tests use Testing Library with mocked fetch; CI runs a subset of package checks | `apps/api/src/tests/`, `apps/web/src/pages/ProjectsPage.test.tsx`, `apps/web/vite.config.ts`, `.github/workflows/ci.yml` | No E2E suite; CI omits frontend tests | Established |
| Package-manager version | Repository and CI declare different pnpm 11 versions | `package.json`, `.github/workflows/ci.yml` | `packageManager` uses 11.11.0 while CI uses 11.5.2; adoption does not resolve the conflict | Conflicting |

Classifications: `Established`, `Localized`, `Conflicting`, `Unclear`.

Statuses: `Available`, `Available with limits`, `Not available`, `Unclear`.

Rules:
- Classify only from verified current-project evidence.
- Planned or documented functionality is not an available capability.
- Use `Not available` only when exclusion or inspected absence is verified;
  otherwise use `Unclear`.
- Record representative evidence; do not scan every occurrence by default.
- Do not turn a one-off implementation into a project-wide standard.
- Keep conflicting patterns visible and propose cleanup only as a separate task.
