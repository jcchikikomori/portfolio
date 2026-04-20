# Task: Phase 4 — Full Quality Assurance Gate

Metadata:
- Phase: 4 of 4
- PR: none (verification only; may produce a fix commit if a gap is found)
- Dependencies: Phase 3 Task 2 merged to `develop` (all three PRs merged)
- Provides: all Design Doc acceptance criteria verified as met; migration declared complete
- Size: Small (0 new files; 0–1 fix files if a gap is found)
- Covers: All AC-BUILD-01–05, AC-VUE-01–06, AC-JQUERY-01–03, AC-DELETE-01–03, AC-THEME-01–03,
  AC-BS-01–03, AC-SEC-01–04, AC-TEST-01–03

## Implementation Content

Cross-cutting verification pass. Run all quality checks in sequence; verify every acceptance
criterion from the Design Doc. This phase produces no new feature code. If any check fails, a
single fix commit closes the gap. The phase ends when all ACs are green and the migration is
ready for the `develop` → `master` release PR.

## Target Files

- None (verification only)
- Fix files if a gap is discovered: the specific file(s) that fail the check

## Investigation Targets

Files to read before starting:
- `docs/design/vue3-vite-migration.md` (§ Acceptance Criteria) — the full AC list to verify
- `docs/plans/tasks/20260420-refactor-vue3-vite-migration-phase2-completion.md` — Phase 2 gate
  checks; confirm all were previously passed
- `docs/plans/tasks/20260420-refactor-vue3-vite-migration-phase3-completion.md` — Phase 3 gate
  checks; confirm all were previously passed

## Implementation Steps

### 1. Run Full Quality Check Suite

Execute in this order; each command must exit 0 before proceeding to the next:

```bash
pnpm run lint
# AC-BUILD-03: exits 0, zero errors under vue3-recommended + security rules
```

```bash
pnpm run build
# AC-BUILD-02: exits 0, dist/index.html exists, no Sass errors
```

```bash
pnpm run test
# AC-BUILD-04: exits 0, all tests pass, coverage >= 95% lines and branches
```

```bash
grep -c "jQuery" dist/assets/*.js
# AC-JQUERY-03: must return 0 on every file in dist/assets/
```

### 2. Security Review

```bash
grep -r "innerHTML" src/
# AC-SEC-03: must return no results
```

```bash
grep -r "window.open" src/
# AC-SEC-04: every match must include 'noopener,noreferrer' as third argument; review each line
```

```bash
ls src/http.js
# AC-SEC-01 / AC-DELETE-01: must return "No such file or directory"
```

```bash
pnpm run lint
# AC-SEC-02: zero security/ rule violations — already confirmed above; re-run if fixes were made
```

### 3. Dead Code and jQuery Removal Verification

```bash
ls src/http.js
# AC-DELETE-01: file must not exist

ls src/components/UpdatesComponent.vue
# AC-DELETE-02: file must not exist

grep -r "UpdatesComponent" src/
# AC-DELETE-03: no references in any file

grep -r "from 'jquery'\|import \$" src/
# AC-JQUERY-01: no results

grep "jquery\|@types/jquery" package.json
# AC-JQUERY-02: no results
```

### 4. Vue 3 Correctness Verification

```bash
pnpm run dev
# Open http://localhost:5173 in browser:
# AC-VUE-01: Vue app mounts at #app; no Vue warnings in console
# AC-VUE-02: ProfileComponent, ProjectsComponent, SpotifyComponent, LoaderComponent render
# AC-VUE-03: click "Music" button → Spotify <dialog> opens
# AC-VUE-04: click "Careers" button → Projects <dialog> opens
# AC-VUE-05: click LinkedIn/GitHub/Blog link → new tab opens; no jQuery
# AC-VUE-06: goToUrl calls pass exactly one argument (confirmed by grep below)
```

```bash
grep -rn "goToUrl(" src/
# AC-VUE-06: every call must pass exactly one argument (no second argument)
```

### 5. Theme and Visualizer Verification

```bash
# In browser with DevTools open:
# AC-THEME-01: enable prefers-color-scheme: dark → body.classList contains 'dark'; logo src is white variant
# AC-THEME-02: toggle prefers-color-scheme → class and logo src update without page reload
# AC-THEME-03: audio play event → body.classList contains 'breathing-visualizer'
```

### 6. Bootstrap Upgrade Verification

```bash
grep -rn "mr-\|ml-\|float-left\|float-right\|text-left\|text-right\|sr-only" src/**/*.vue
# AC-BS-03: no results
```

```bash
pnpm run build
# AC-BS-01: Bootstrap 5 CSS applied; no Bootstrap 4 classes in Sass vendor layer
# AC-BS-02: no Sass deprecation errors in build output
```

### 7. Test Coverage Verification

```bash
pnpm run test
# AC-TEST-02: coverage report shows >= 95% lines and >= 95% branches
# AC-TEST-03: all tests pass without network access
```

```bash
# Inspect coverage output:
# AC-TEST-01: confirm all six targets covered: App.vue, ProfileComponent.vue,
#             ProjectsComponent.vue, SpotifyComponent.vue, theme.js, visualizer.js
```

### 8. Process.env Removal Verification

```bash
grep -r "process\.env" src/
# Must return no results (interface change: process.env → import.meta.env)
```

### 9. depcheck Verification

```bash
pnpx depcheck
# AC-BUILD-04 (indirect): confirm no unused dependencies remain in package.json
# Update .depcheckrc ignore list for false positives if needed (e.g., vite-plugin-pwa
# registered in vite.config.js may not be detected by depcheck)
```

### 10. Visual Parity Check

```bash
pnpm run preview
# Open in browser and verify at mobile (375px), tablet (768px), desktop (1280px):
# - Profile card renders correctly
# - Button group layout unchanged
# - "Music" and "Careers" dialogs open and close
# - Dark theme applies
# - No Vue warnings in browser console
```

### 11. GitHub Actions Verification

- [ ] Confirm the last CI run on `develop` passed all steps: lint, build, test on Node 18.x,
  20.x, 22.x

## Quality Assurance Mechanisms

All mechanisms from the work plan header apply to this phase:

- ESLint (`pnpm run lint`) — `plugin:vue/vue3-recommended` + `plugin:security/recommended` — Config: `.eslintrc.json`
- depcheck (`pnpx depcheck`) — no unused dependencies — Config: `.depcheckrc`
- Build success gate (`pnpm run build`) — compilable Vite output — Config: `vite.config.js`
- Vitest coverage (`pnpm run test`) — >= 95% line and branch coverage — Config: `vite.config.js > test.coverage`
- GitHub Actions matrix (Node 18.x, 20.x, 22.x) — Node version compatibility — Config: `.github/workflows/default.yml`

## Operation Verification Methods

- **Verification method**: Run the full quality check suite in Steps 1–11 above. For each AC,
  record the check result (pass/fail). If any check fails, implement the fix, re-run the affected
  checks, and confirm they now pass.
- **Success criteria**: Every AC in AC-BUILD-01–05, AC-VUE-01–06, AC-JQUERY-01–03, AC-DELETE-01–03,
  AC-THEME-01–03, AC-BS-01–03, AC-SEC-01–04, AC-TEST-01–03 is verified as met. All commands
  above exit 0 or return expected grep results.
- **Failure response**: For each failing AC, trace to the task responsible and apply a targeted fix.
  After any fix, re-run the relevant quality commands to confirm the fix does not break other ACs.
- **Verification level**: L1 (visual parity; all interactions work) + L2 (all tests pass; coverage >= 95%) + L3 (lint + build exit 0)

## Completion Criteria

- [ ] `pnpm run lint` exits 0 with zero errors
- [ ] `pnpm run build` exits 0 with zero Sass errors; `dist/index.html` exists
- [ ] `pnpm run test` exits 0; all tests pass; coverage >= 95% lines and branches
- [ ] `grep -c "jQuery" dist/assets/*.js` returns 0
- [ ] `src/http.js` does not exist
- [ ] `src/components/UpdatesComponent.vue` does not exist
- [ ] `grep -r "from 'jquery'\|import \$" src/` returns no results
- [ ] `grep -r "process\.env" src/` returns no results
- [ ] `grep -r "innerHTML" src/` returns no results
- [ ] All `window.open` calls include `'noopener,noreferrer'`
- [ ] Bootstrap 4-exclusive class audit clean
- [ ] Visual parity confirmed across mobile, tablet, desktop
- [ ] No Vue warnings in browser console on first load
- [ ] `pnpx depcheck` reports no unused dependencies
- [ ] GitHub Actions CI passes all steps on all Node versions

## Notes

- This phase produces no new feature code. If a fix commit is needed, it must be targeted and
  minimal — do not bundle unrelated changes into the fix.
- After this phase is complete, raise the release PR from `develop` to `master` to trigger
  the `gh-pages.yml` deploy workflow.
- Bootstrap 3 glyphicon fonts in `public/fonts/` can be removed as a clean-up if `pnpx depcheck`
  flags them, but this is not blocking for the migration declaration.
