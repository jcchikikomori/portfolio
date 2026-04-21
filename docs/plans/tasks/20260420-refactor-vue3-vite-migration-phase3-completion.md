# Phase 3 Completion Checklist

Phase: 3 — Tests + Coverage (PR 3)
Tasks covered: Task 1, Task 2

## All Task Completion Checks

- [ ] Task 1 completed: Vitest scaffold, `src/tests/setup.js`, `pnpm run test` script, CI test step
- [ ] Task 2 completed: Six test files in `src/tests/`; all tests pass; coverage >= 95%

## Phase 3 Acceptance Gate

Run each check before marking Phase 3 complete and raising PR 3 for review.

### Test Run

```bash
pnpm run test
# Expected: exits 0; all tests pass; coverage text shows Lines >= 95% and Branches >= 95%
```

### Test Files Existence

```bash
ls src/tests/
# Expected: App.spec.js  ProfileComponent.spec.js  ProjectsComponent.spec.js
#           SpotifyComponent.spec.js  setup.js  theme.spec.js  visualizer.spec.js
```

### Coverage Threshold

Inspect the coverage table output from `pnpm run test`:
- [ ] `Lines` column for `src/` total >= 95%
- [ ] `Branches` column for `src/` total >= 95%

### No vi.mock Suppression

```bash
grep -rn "vi.mock" src/tests/
# Review each match — no mock should hide a testable code path in production source
```

### Security Assertions (AC-SEC-04)

```bash
grep -n "noopener,noreferrer" src/tests/*.spec.js
# Expected: at least two matches (ProfileComponent and ProjectsComponent tests)
```

### CI Integration

- [ ] Push branch; confirm `.github/workflows/default.yml` `Test` step passes on all Node versions

### Build and Lint Still Pass

```bash
pnpm run lint
# Expected: exits 0, zero errors

pnpm run build
# Expected: exits 0, no Sass errors
```

## Gate Decision

All checks above must pass before Phase 4 (QA gate) begins. If coverage is below 95%,
add targeted test cases to reach the threshold before raising PR 3.
