# Project Rules

## Scope

Use this document as the canonical tool-agnostic project rules source for the
Software Delivery Planner. Tool-specific files are compact adapters and do not
replace these rules.

## Source of truth

- Repository files and approved project documentation are authoritative.
- `docs/backlog-v0.md` is the operational source for backlog task states.
- Use the B-### task naming convention and the approved path mappings in
  `docs/method/project-manifest.md`.
- Do not create a parallel source for task status or project state.

## Working rules

- Work through small, reviewable tasks tied to one approved backlog item.
- Read and modify only task-relevant, explicitly authorized files.
- Preserve working code, existing behavior, historical documentation and
  uncommitted developer changes.
- Reuse existing functions, validations, guards, utilities and local patterns.
- Add or minimally adjust only what the approved task requires.
- Do not rewrite, merge, optimize, rename or restructure working logic unless
  authorized by an explicit `REFACTOR` task.
- If no local pattern answers the task, follow official documentation compatible
  with the versions used by the project.
- Use established ecosystem practice only when official guidance is insufficient.
- Report and stop on conflicts involving official security, compatibility or
  correctness requirements.
- Use only verified existing project capabilities. Planned or documented
  capabilities are not available without repository evidence.
- Suggest or run only the smallest one to three relevant checks allowed by the
  task. Developer verification remains required.

## Restrictions

- No implicit refactor, dependency, tooling, architecture, migration or status
  change.
- Do not scaffold or recreate the existing applications.
- Do not introduce NestJS, Next.js, Prisma, Docker, authentication or another
  architecture unless explicitly authorized.
- Preserve completed task titles, descriptions, scope, acceptance criteria,
  original dependencies and implementation notes.
- Stop after the approved step for developer review.
