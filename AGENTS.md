# AGENTS.md — pi-fabric

Vendored mirror of **monotykamary/pi-fabric** (npm `pi-fabric` 0.70.0) for the
opencharly org. It is a Pi extension, not a charly candy: a programmable tool
and agent runtime for [Pi](https://github.com/earendil-works/pi-coding-agent)
that composes core tools and MCP servers in one type-checked TypeScript program.
The source of truth is the upstream repo; this mirror tracks it.

Canonical files:

- `package.json` — the npm package (`pi-fabric`, version `0.70.0`) and the
  `typecheck` / `test` / `build` / `check` scripts.
- `src/` — the TypeScript source (built into `dist/` by `pnpm build`).
- `dist/` — the committed build output.
- `skills/` — the extension's own Pi skills (`fabric-exec` and the advanced
  patterns).
- `docs/` — configuration, interface, agents, providers, architecture, and
  speculation references.
- `THIRD_PARTY_NOTICES.md` + `LICENSE` — upstream attribution.
- `README.md` — user overview only; never agent guidance.

There is no `charly.yml`, no candy, and no `skill:` entity — this is a vendored
upstream mirror, so no owning `/charly-<family>:<name>` skill is projected into
the marketplace corpus.

## Load these skills first (R0)

- `/charly-internals:agents` — the closest charly skill: multi-agent support
  across harnesses (sub-agents, agent teams, fresh validator sessions) and the
  Pi harness relationship.
- `/charly-internals:git-workflow` — before any git/PR action.

There is no pi-family owning skill in the marketplace. The gap is recorded
against `opencharly/opencharly#291`; when one is authored, add it here.

## Build / validate / test

- `pnpm install` — install dependencies (Node.js 24+).
- `pnpm typecheck` — `tsc --noEmit`.
- `pnpm test` — `vitest run`.
- `pnpm build` — emit `dist/` (declarations + bundle) and assert build
  artifacts.
- `pnpm check` — the full local gate (`typecheck` + `build` + lazy-graph
  assertion + `test` + `lint:dead`).
- This mirror carries **no `.github/workflows`**; the merge gate is the
  **org-wide** `charly/pr-validator` (required check `validate / validate`,
  defined in `opencharly/.github`).

## Modify this repo

- This is a **vendored mirror** — prefer upstreaming a fix to
  `monotykamary/pi-fabric` and re-vendoring, rather than diverging here.
- Keep `dist/` in sync with `src/` (it is committed) and update `package.json`'s
  `version` when re-vendoring.
- Keep `THIRD_PARTY_NOTICES.md` current.

## Landing

Every change lands through a pull request gated by the org-required
`charly/pr-validator`. The landing mechanics — the `feat/` branch, the PR-only
rule, `CHANGELOG/` history, and the tag-on-merge CalVer — are owned by
`/charly-internals:git-workflow` and the umbrella `AGENTS.md` /
`charly/AGENTS.md`; this signpost points at them and does not restate them.
