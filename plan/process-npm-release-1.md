---
goal: Publish parasol-es v2.0.0 to npm with safe, modernized dependencies
version: 1.1
date_created: 2026-06-09
last_updated: 2026-06-11
owner: Joseph Kasprzyk (@jrkasprzyk)
status: 'In progress'
tags: [process, upgrade, release, security]
---

# Introduction

![Status: In progress](https://img.shields.io/badge/status-In%20progress-yellow)

This plan tracks the release of parasol-es v2.0.0 to the npm registry. The `modernization` branch (HEAD: `c565384`) contains the completed modernization work: d3 v5→v7, rollup 0.62→4, Babel 6→7, a rebuilt standalone bundle (previously stale since 2019), GitHub Actions CI, and a clean `npm audit`. Update 2026-06-11: the parcoords fork is now published to npm as `@jrkasprzyk/parcoord-es@3.0.0` and the git dependency has been replaced with it (commit `c565384`), eliminating the consumer-install friction originally deferred to Phase 4. Remaining work is the merge-and-publish sequence.

## 1. Requirements & Constraints

- **REQ-001**: Published package must report 0 vulnerabilities via `npm audit` at publish time.
- **REQ-002**: All three bundles (`dist/parasol.js` UMD, `dist/parasol.esm.js` ESM, `dist/parasol.standalone.js` fully-bundled UMD) must be built from current `src/` by `npm run build` before publish. The `prepublishOnly` script in `package.json` enforces this automatically.
- **REQ-003**: Version must be `2.0.0` (already set in `package.json`). Major bump justified by d3 v5→v7 upgrade and swap of `parcoord-es` to the modernized fork — both breaking for downstream consumers.
- **REQ-004**: CI (`.github/workflows/ci.yml`) must pass (lint + build on Node 18, 20, 22) before merging to `master`.
- **SEC-001**: Publish must be performed by an npm account with publish rights on the `parasol-es` package (original publisher: Josh Jacobson; verify access with `npm owner ls parasol-es` before attempting).
- **CON-001**: Repository has no automated test suite. Verification is limited to lint, build, `npm pack` clean-room install, and manual/jsdom smoke tests of demo pages.
- **CON-002**: ~~`parcoord-es` is a git dependency (`github:jrkasprzyk/parcoords-es#bb2c964`). Its `prepare` script runs build + mocha on every consumer install (~45 s, requires git on the consumer machine).~~ Resolved 2026-06-11: the fork was published to npm as `@jrkasprzyk/parcoord-es@3.0.0` and this repo now depends on it (`^3.0.0`, commit `c565384`). Consumer installs no longer run a `prepare` build or require git.
- **CON-003**: CI workflow triggers only on `pull_request` and pushes to `master` — pushes to `modernization` do NOT trigger CI. A PR must be opened to get a CI run.
- **GUD-001**: `dist/` is committed to git. Any change to `src/` must be followed by `npm run build` and committing the regenerated `dist/` files.
- **PAT-001**: Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`, etc.) as established in recent history.

## 2. Implementation Steps

### Implementation Phase 1: Modernization branch release-readiness

- GOAL-001: Make the `modernization` branch technically ready for an npm publish (completed 2026-06-09, commit `a18ecf7`).

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | Rebuild `dist/parasol.standalone.js` (stale since 2019, contained bundled d3 v5); add standalone output as second config in `rollup.config.mjs` so `npm run build` produces all bundles | ✅ | 2026-06-09 |
| TASK-002 | Fix postcss `extract` path (`'dist/parcoords.css'` → `'parcoords.css'`) that wrote a nested `dist/dist/parcoords.css`; delete the nested directory | ✅ | 2026-06-09 |
| TASK-003 | Bump `package.json` version to `2.0.0`, engines to `node >=18`, add `"prepublishOnly": "npm run build"` | ✅ | 2026-06-09 |
| TASK-004 | Run `npm audit fix` (resolved GHSA-fv7c-fp4j-7gwp in `@babel/plugin-transform-modules-systemjs`); remove stale `serialize-javascript` override; drop unused devDeps mocha/nyc/cross-env/@babel/register | ✅ | 2026-06-09 |
| TASK-005 | Normalize line endings: add `.gitattributes` (`* text=auto eol=lf`), `git add --renormalize`, `npm run lint:fix`; set eslint `no-unused-vars` to `{ "args": "none" }`; fix real unused vars (`sortdir` in `src/api/attachGrid.js`, `events` in `src/index.js`); delete dead `src/bindEvents.js` | ✅ | 2026-06-09 |
| TASK-006 | Replace dead `.travis.yml` with `.github/workflows/ci.yml` (lint + build, Node 18/20/22 matrix); delete legacy `rollup.config.js` and `rollup.config.dev.js` | ✅ | 2026-06-09 |
| TASK-007 | Verify: `npm pack` → install tarball in clean temp project (git dep `prepare` succeeds); load `dist/parasol.standalone.js` in jsdom and confirm `window.Parasol` is a function | ✅ | 2026-06-09 |
| TASK-008 | Commit (`a18ecf7`) and push `modernization` to origin | ✅ | 2026-06-09 |

### Implementation Phase 2: Merge to master

- GOAL-002: Land the modernization work on `master` with a passing CI run.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-009 | Open PR `modernization` → `master` on github.com/ParasolJS/parasol-es (e.g., `gh pr create --base master --head modernization`). This triggers the first CI run (see CON-003) | |  |
| TASK-010 | Confirm CI green on all three Node versions (18, 20, 22); fix any failures on the `modernization` branch and re-push | |  |
| TASK-011 | Merge the PR into `master` | |  |

### Implementation Phase 3: Publish v2.0.0 to npm

- GOAL-003: Publish the package and verify the published artifact installs and works for consumers.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-012 | Verify npm publish rights: `npm whoami` and `npm owner ls parasol-es` (see SEC-001). Verified 2026-06-11: sole owner is `joshhjacobson`; `jrkasprzyk` is logged in but NOT an owner — publish would 403. Next: ask Josh to run `npm owner add jrkasprzyk parasol-es`; fallback per RISK-001 is a scoped package | |  |
| TASK-013 | From an up-to-date `master` checkout: `git tag v2.0.0 && git push origin v2.0.0` | |  |
| TASK-014 | `npm publish` (runs `prepublishOnly` build automatically). Use `npm publish --dry-run` first to confirm the file list matches the 55 files / ~805 kB tarball verified on 2026-06-09 | |  |
| TASK-015 | Post-publish verification: in a clean temp dir, `npm install parasol-es@2.0.0`, confirm install succeeds and `dist/parasol.standalone.js` loads in jsdom with `typeof window.Parasol === 'function'` | |  |
| TASK-016 | Create a GitHub Release for tag `v2.0.0` summarizing breaking changes (d3 v7, Node >=18, parcoords dep is now `@jrkasprzyk/parcoord-es`) and security fixes (link `vulnerability-fixes.md`) | |  |

### Implementation Phase 4: Follow-ups (post-release hardening)

- GOAL-004: Remove the git-dependency friction and improve consumer confidence. (Git-dependency removal completed early — before the v2.0.0 publish — so no `2.0.1` patch release is needed for it.)

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-017 | Publish the parcoords fork (github.com/jrkasprzyk/parcoords-es) to npm as a scoped package — published as `@jrkasprzyk/parcoord-es@3.0.0` | ✅ | 2026-06-11 |
| TASK-018 | Update parasol-es `package.json` dependency to the scoped npm package (`@jrkasprzyk/parcoord-es@^3.0.0`, commit `c565384`). Done pre-release, so it ships in `2.0.0` itself — no `2.0.1` required | ✅ | 2026-06-11 |
| TASK-019 | Manually verify demo pages (`npm run dev`, opens localhost:3004): `basic.html`, `grid.html`, `cluster.html`, `linked.html` render and brush correctly with the rebuilt standalone bundle | |  |
| TASK-020 | Add a minimal automated smoke test (jsdom script from TASK-007) as `npm test` and wire it into `.github/workflows/ci.yml`, replacing the deleted mocha setup | |  |
| TASK-021 | Update `README.md`: installation section (Node >=18, v2.0.0 breaking changes), fix the `parasol.css` reference (shipped file is `dist/parcoords.css`) | ✅ | 2026-06-11 |
| TASK-022 | Modernize demo pages' page-level scripting: swap `demo/lib/d3.v5.min.js` for d3 v7 and replace the 13 `d3.keys()` calls (removed in d3 v6) with `Object.keys()`. Keep `legacy.html` on d3 v3 (intentionally historical) and keep `demo/parasol.css` (contains grid/page styles beyond the shipped `dist/parcoords.css`). Not a release blocker: demos already work because `parasol.standalone.js` bundles its own d3 v7. Tracked as a GitHub issue | |  |

## 3. Alternatives

- **ALT-001**: Publish v2.0.0 with `parcoord-es` already moved to a scoped npm package (do Phase 4 first). Originally rejected to avoid blocking the release — but the fork publish landed on 2026-06-11 before v2.0.0 shipped, so this alternative ended up being taken (see TASK-017/TASK-018).
- **ALT-002**: Keep version at 1.x (e.g., 1.1.0). Rejected: d3 v5→v7 and Node >=18 are breaking for existing consumers; semver requires a major bump.
- **ALT-003**: Stop committing `dist/` to git and rely solely on `prepublishOnly`. Rejected for now: demo pages and existing documentation load `dist/parasol.standalone.js` directly from the repo checkout.
- **ALT-004**: Upstream the d3 v7 changes to BigFatDog/parcoords-es instead of maintaining a fork. Worth attempting long-term, but upstream has been inactive; the fork unblocks the release today.

## 4. Dependencies

- **DEP-001**: `@jrkasprzyk/parcoord-es@^3.0.0` — npm-published modernized fork (d3 v7-compatible) of `parcoord-es` 2.2.10. Replaced the former git dependency `github:jrkasprzyk/parcoords-es#bb2c964` on 2026-06-11.
- **DEP-002**: npm account with publish rights on `parasol-es` (currently owned by Josh Jacobson's account; access unverified — see TASK-012).
- **DEP-003**: GitHub repository `ParasolJS/parasol-es` — push/merge rights on `master` and ability to create releases.
- **DEP-004**: Node.js >=18 and git on any machine performing the publish.

## 5. Files

- **FILE-001**: `package.json` — version, engines, scripts (`prepublishOnly`), dependency spec for `@jrkasprzyk/parcoord-es`.
- **FILE-002**: `rollup.config.mjs` — two-config build (library external-deps + standalone bundled); source of truth for `dist/` outputs.
- **FILE-003**: `.github/workflows/ci.yml` — CI definition; extended in TASK-020.
- **FILE-004**: `dist/parasol.js`, `dist/parasol.esm.js`, `dist/parasol.standalone.js`, `dist/parcoords.css` — committed build artifacts shipped to npm.
- **FILE-005**: `vulnerability-fixes.md` — security fix history; linked from the GitHub Release (TASK-016).
- **FILE-006**: `README.md` — consumer-facing docs; updated in TASK-021.
- **FILE-007**: `demo/*.html` — manual verification surface (TASK-019); all load `./parasol.standalone.js`.

## 6. Testing

- **TEST-001**: CI gate — `npm ci && npm run lint && npm run build` passes on Node 18, 20, 22 (executed by TASK-009/TASK-010).
- **TEST-002**: Clean-room install — `npm pack`, install tarball in an empty temp project, assert exit code 0 and `node_modules/@jrkasprzyk/parcoord-es/dist/parcoords.js` exists (validates the registry dep resolves with prebuilt `dist/`).
- **TEST-003**: Bundle smoke test — load `dist/parasol.standalone.js` into a jsdom window (`runScripts: 'outside-only'`), assert `typeof window.Parasol === 'function'` (formalized as `npm test` in TASK-020).
- **TEST-004**: Post-publish install — `npm install parasol-es@2.0.0` from the public registry in a clean dir, repeat TEST-003 against the installed copy (TASK-015).
- **TEST-005**: Manual demo verification — render and brush `basic.html`, `grid.html`, `cluster.html`, `linked.html` via `npm run dev` (TASK-019).

## 7. Risks & Assumptions

- **RISK-001**: npm publish rights on `parasol-es` may be unavailable (original publisher inactive). Mitigation: verify first (TASK-012); fallback is publishing under a new scoped name and deprecating guidance in the README.
- **RISK-002**: ~~Consumer installs fail if the fork's `prepare` (build + mocha) breaks in their environment or git is unavailable.~~ Resolved 2026-06-11 by TASK-017/TASK-018 — registry package ships prebuilt, no install-time build.
- **RISK-003**: No test suite means a runtime regression in the d3 v7 / forked-parcoords stack could ship undetected. Mitigation: TASK-019 manual demo pass before announcing the release; TASK-020 adds an automated floor.
- **RISK-004**: ~~The fork pins a SHA; future fixes to the fork require updating the SHA in `package.json` and re-releasing parasol-es.~~ Superseded 2026-06-11: dependency is now the semver range `^3.0.0`, so fork patch/minor releases reach consumers without a parasol-es re-release. Residual risk: a bad fork release within `^3.0.0` propagates automatically.
- **ASSUMPTION-001**: User has merge rights on `ParasolJS/parasol-es` `master` (acting as sole maintainer).
- **ASSUMPTION-002**: The published 1.0.2 consumers tolerate a breaking 2.0.0; no 1.x maintenance line is planned.
- **ASSUMPTION-003**: GitHub Actions is available/enabled on the `ParasolJS` organization repository.

## 8. Related Specifications / Further Reading

- [vulnerability-fixes.md](../vulnerability-fixes.md) — dependency vulnerability fix history (2026-04-13, updated 2026-06-09)
- [Modernized parcoords fork](https://github.com/jrkasprzyk/parcoords-es)
- [Upstream parcoords-es](https://github.com/BigFatDog/parcoords-es)
- [@jrkasprzyk/parcoord-es on npm](https://www.npmjs.com/package/@jrkasprzyk/parcoord-es)
- [npm docs: git dependencies and `prepare`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#git-urls-as-dependencies) (historical — git dep removed 2026-06-11)
- [GHSA-fv7c-fp4j-7gwp](https://github.com/advisories/GHSA-fv7c-fp4j-7gwp) — babel advisory fixed in this release cycle
