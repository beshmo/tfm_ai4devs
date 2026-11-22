# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This repository is at its initial stage: there is no application code yet (only `LICENSE` (GPL-3.0), `docs/`, and `openspec/`). Tooling (package manager, linting, formatting, git hooks) is already set up — see below. Once a tech stack is chosen, add its build/test commands here and fill in the `context:` field of `openspec/config.yaml`.

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
- **Language**:
  - Spanish: README, guides, ADRs, PRDs, backlog (and other human-facing docs).
  - English: source code, API specs and endpoints, data schemas and database names, config files and scripts, git commit messages, test names and descriptions.
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (e.g. `feat: ...`, `fix: ...`, `docs: ...`).
- **Branches**: [Conventional Branch](https://conventionalbranch.org/v1.1.0/) (e.g. `feature/...`, `bugfix/...`, `chore/...`). Never commit directly to `main` — a Claude Code hook blocks it (see **Tooling** above). Before committing, create a branch off `main` with one of these prefixes, e.g. `git checkout -b feature/<name>`, and commit there; open a PR back into `main` when the work is ready.
