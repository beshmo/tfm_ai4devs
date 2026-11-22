# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This repository is at its initial stage: there is no application code yet (only `LICENSE` (GPL-3.0), `docs/`, and `openspec/`). Tooling (package manager, linting, formatting, git hooks) is already set up — see below. The tech stack has been chosen (see **Tech stack** below and `docs/adr/0001-stack-tecnologico.md`), but the monorepo is not yet scaffolded. Once `apps/api` and `apps/web` exist, replace the placeholder `pnpm test` script with the real per-app build/test commands here.

## Tech stack

Decided in `docs/adr/0001-stack-tecnologico.md` (read it for rationale and alternatives considered):

- **Monorepo**: `pnpm` workspaces (`apps/api`, `apps/web`, a shared types/DTOs package) — no Nx/Turborepo.
- **Backend**: NestJS (TypeScript/Node.js), Prisma over PostgreSQL. Sequential per-user task IDs (RF-15) use an explicit transaction, not Prisma's `autoincrement()`. Sessions via `connect-pg-simple` on the same PostgreSQL database (no Redis).
- **Frontend**: React + Vite.
- **Tests**: Jest + supertest for backend contract/integration tests (idiomatic in Nest); Vitest + React Testing Library for frontend; Playwright for E2E.
- **Containers**: Docker images for `api` and `web`; `docker compose` for local development and for the external reviewer.
- **CI**: GitHub Actions builds and publishes the Docker images.
- **Cloud deployment**: Kubernetes on DOKS (managed control plane). PostgreSQL runs inside the cluster as a `StatefulSet` with a `PersistentVolumeClaim` (seed data only — the seed script must stay idempotent). Deploy to DOKS is manual (`kubectl apply`), not automated from CI.

## Tooling

- **Package manager**: `pnpm` (lockfile: `pnpm-lock.yaml`). Install with `pnpm install`.
- **Commands**:
  - `pnpm test` — runs the test suite (not configured yet; currently a no-op placeholder).
  - `pnpm eslint .` — lint with ESLint (`eslint.config.mts`).
  - `pnpm prettier --write .` — format with Prettier (`.prettierrc.json`, `.prettierignore`).
- **Git hooks** (Husky, `.husky/`, installed via the `prepare` script on `pnpm install`):
  - `pre-commit` — runs `pnpm test` then `pnpm lint-staged` (runs `eslint --fix` on staged `*.ts` files and `prettier --write` on staged `*.md` files, per `.lintstagedrc.json`).
  - `commit-msg` — rejects any commit whose message contains a `Co-Authored-By` trailer.
- **Claude Code hook** (`.claude/settings.json`, `PreToolUse`/`Bash`, script in `.claude/hooks/block-main-commit.js`): blocks any `git commit` run while on the `main` branch. Create and switch to a branch first — see **Branches** below.

## Development workflow: OpenSpec (spec-driven)

Work is organized with [OpenSpec](https://github.com/Fission-AI/OpenSpec) using the `spec-driven` schema (`openspec/config.yaml`):

- `openspec/specs/` — current, accepted specifications (source of truth for system behavior).
- `openspec/changes/<change>/` — in-progress change proposals (proposal, design, delta specs, tasks).
- `openspec/changes/archive/` — completed changes.

Lifecycle, via the slash commands in `.claude/commands/opsx/` (backed by skills in `.claude/skills/openspec-*`):

1. `/opsx:explore` — think through an idea before committing to a change.
2. `/opsx:propose` — create a change with all artifacts.
3. `/opsx:apply` — implement the change's tasks.
4. `/opsx:verify` — check the implementation matches the change artifacts.
5. `/opsx:sync` — merge delta specs into `openspec/specs/` (without archiving).
6. `/opsx:archive` — finalize and archive the change.

New features should go through a change proposal rather than being implemented ad hoc.

## Project standards (from `docs/base-standards.md`)

- **TDD**: write the tests first, confirm they fail, then write the code to make them pass.
- **Ask before assuming**: when something is unclear, ask the user instead of guessing.
- **Clean Architecture** (`apps/api`): domain and use-case logic never import `@nestjs/*` or `@prisma/client` — dependencies always point inward (infrastructure/interface depend on domain, never the reverse). See `docs/adr/0002-practicas-de-ingenieria.md` for the layering and how NestJS DI wires it.
- **OWASP Top 10 by default**: consider all ten categories when designing each feature, not as a separate audit at the end. See `docs/adr/0002-practicas-de-ingenieria.md` for the reading of each category applied to this product.
- **Language**:
  - Spanish: README, guides, ADRs, PRDs, backlog (and other human-facing docs).
  - English: source code, API specs and endpoints, data schemas and database names, config files and scripts, git commit messages, test names and descriptions.
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (e.g. `feat: ...`, `fix: ...`, `docs: ...`).
- **Branches**: [Conventional Branch](https://conventionalbranch.org/v1.1.0/) (e.g. `feature/...`, `bugfix/...`, `chore/...`). Never commit directly to `main` — a Claude Code hook blocks it (see **Tooling** above). Before committing, create a branch off `main` with one of these prefixes, e.g. `git checkout -b feature/<name>`, and commit there; open a PR back into `main` when the work is ready.
