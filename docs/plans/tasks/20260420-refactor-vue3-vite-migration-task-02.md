# Task: Phase 2 — Task 1: Delete Dead Code and Remove jQuery Package

Metadata:
- Phase: 2 of 4, Task 1 of 5
- PR: PR 2
- Dependencies: Phase 1 Task 1 merged to `develop` (`pnpm run build` passes under Vite)
- Provides: `src/http.js` deleted; `src/components/UpdatesComponent.vue` deleted; `jquery` and
  `@types/jquery` removed from `package.json`; `pnpm-lock.yaml` updated
- Size: Small (2 files deleted, 1 file updated)
- Covers: AC-DELETE-01, AC-DELETE-02, AC-JQUERY-02, AC-SEC-01

## Implementation Content

Eliminate the confirmed XSS sink by deleting `src/http.js` in its entirety. Delete the dead
`UpdatesComponent.vue`. Remove `jquery` and `@types/jquery` from `package.json`. This task must
run before Task 2 in this phase, because Task 2 removes the `UpdatesComponent` import from
`ProfileComponent.vue` — the component must be gone before the import cleanup happens.

## Target Files

- [ ] `src/http.js` — DELETE
- [ ] `src/components/UpdatesComponent.vue` — DELETE
- [ ] `package.json` — remove `jquery` and `@types/jquery` entries; run `pnpm install`

## Investigation Targets

Files to read before starting:
- `src/http.js` — confirm it is dead (no exports called from outside; XSS sink at line 43)
- `src/components/UpdatesComponent.vue` — confirm it is only imported in `ProfileComponent.vue`
- `src/components/ProfileComponent.vue` — locate the `UpdatesComponent` import and usage; note
  the exact import line and template usage (removal handled in Task 2)
- `src/main.js` — confirm `http.js` is NOT imported here (it may be unused at import level already)
- `package.json` — locate exact `jquery` and `@types/jquery` entries to remove

## Implementation Steps (TDD: Red-Green-Refactor)

### 1. Red Phase

- [ ] Read all Investigation Targets
- [ ] Run grep to confirm all references to `http.js` and `UpdatesComponent`:
  ```bash
  grep -rn "http.js\|UpdatesComponent\|from 'jquery'\|import \$" src/
  ```
  Record every file path returned — these are the call sites that must be cleared before or after
  this deletion.
- [ ] Confirm `pnpm run build` currently exits 0 (Phase 1 gate passed)

### 2. Green Phase

- [ ] Delete `src/http.js`:
  ```bash
  rm src/http.js
  ```
- [ ] Delete `src/components/UpdatesComponent.vue`:
  ```bash
  rm src/components/UpdatesComponent.vue
  ```
- [ ] Remove `jquery` and `@types/jquery` from `package.json` (both `dependencies` and
  `devDependencies`):
  - Remove the `"jquery": "..."` line from `dependencies`
  - Remove the `"@types/jquery": "..."` line from `devDependencies`
- [ ] Run `pnpm install` to update `pnpm-lock.yaml`
- [ ] Run `pnpm run build`:
  - Expected: build exits 0 if `ProfileComponent.vue` still has the `UpdatesComponent` import
    but it will fail to resolve the deleted file. If the build fails here because
    `ProfileComponent.vue` still imports `UpdatesComponent`, that import MUST be removed in this
    task (do not wait for Task 2). Update Task 2 to skip the import removal step.
  - If the import in `ProfileComponent.vue` is the only reference, remove it now to unblock build.

### 3. Refactor Phase

- [ ] Verify no remaining references in `src/`:
  ```bash
  grep -r "http.js\|UpdatesComponent\|from 'jquery'\|import \$" src/
  ```
  Expected: no output
- [ ] Confirm `pnpm run build` exits 0 with no missing-module errors

## Quality Assurance Mechanisms

- Build success gate (`pnpm run build`) — Enforces: compilable Vite output — Config: `vite.config.js`
- depcheck (`pnpx depcheck`) — Enforces: no unused dependencies — Config: `.depcheckrc`

## Operation Verification Methods

- **Verification method**: Run `grep -r "http.js\|UpdatesComponent\|from 'jquery'\|import \$" src/`
  and confirm no results. Run `pnpm run build` and confirm it exits 0.
- **Success criteria**:
  - `src/http.js` does not exist
  - `src/components/UpdatesComponent.vue` does not exist
  - `package.json` has no `jquery` or `@types/jquery` entry
  - `pnpm run build` exits 0
  - `grep` above returns no results
- **Failure response**: If `pnpm run build` fails after deletion because of a remaining import in
  `ProfileComponent.vue`, remove that import in this task before committing. Do not commit a
  broken build.
- **Verification level**: L3 (build succeeds after deletions)

## Completion Criteria

- [ ] `src/http.js` does not exist
- [ ] `src/components/UpdatesComponent.vue` does not exist
- [ ] `package.json` has no `jquery` or `@types/jquery` entry in any section
- [ ] `pnpm install` completed; `pnpm-lock.yaml` updated
- [ ] `pnpm run build` exits 0
- [ ] `grep -r "http.js\|UpdatesComponent" src/` returns no results

## Notes

- Impact scope: `package.json`, `pnpm-lock.yaml`, `src/http.js` (deleted),
  `src/components/UpdatesComponent.vue` (deleted)
- Scope boundary: Do NOT modify `ProfileComponent.vue` in this task beyond what is required to
  make the build pass (removal of `UpdatesComponent` import + template tag if the build fails).
  All other `ProfileComponent.vue` changes (jQuery `goToUrl`, dialog polyfill) are Task 2.
- Deletion rationale: `http.js` contains an XSS sink at line 43 (`$.html()` with unsanitized
  server data). Deletion — not patching — is the correct fix. The backend is permanently offline.
