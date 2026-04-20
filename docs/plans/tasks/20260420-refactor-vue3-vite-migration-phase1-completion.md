# Phase 1 Completion Checklist

Phase: 1 — Build Tooling + Node Upgrade (PR 1)
Tasks covered: Task 1

## All Task Completion Checks

- [ ] Task 1 completed: Vite scaffold, CI hardening, Bootstrap 5, Node 22 upgrade

## Phase 1 Acceptance Gate

Run each check before marking Phase 1 complete and raising PR 1 for review.

### Build Verification

```bash
pnpm run build
# Expected: exits 0; dist/index.html exists; no Sass errors in output
```

```bash
pnpm run dev
# Expected: starts without errors; open http://localhost:5173 and confirm portfolio loads
```

### File Existence Checks

```bash
# Must exist
ls vite.config.js
ls .nvmrc

# Must NOT exist
ls vue.config.js   # should return: No such file
ls babel.config.js # should return: No such file
ls volar.config.js # should return: No such file
```

### .nvmrc Content

```bash
cat .nvmrc
# Expected output: 22
```

### Sass Import Path Verification

```bash
grep "node_modules" src/assets/scss/vendors/_v2.scss
# Expected: no output (all /node_modules/ prefixes removed)
```

### jQuery Still Present (expected at this phase)

```bash
grep -c "jQuery" dist/assets/*.js
# Expected: may return > 0 — jQuery removal is Phase 2
```

### GitHub Actions

- [ ] Push branch and confirm `Build Test` workflow in `.github/workflows/default.yml` passes on
  all three Node versions (18.x, 20.x, 22.x)
- [ ] Confirm `gh-pages.yml` Node matrix is `[20.x]`

### Visual Browser Check

- [ ] Open `http://localhost:5173` (or `pnpm run preview` after build)
- [ ] Profile card renders
- [ ] No terminal errors on `pnpm run dev`
- [ ] No build errors in browser console

## Gate Decision

All checks above must pass before Phase 2 begins. If `pnpm run build` fails, fix the Sass paths
before proceeding. Do not start Phase 2 until this gate is green.
