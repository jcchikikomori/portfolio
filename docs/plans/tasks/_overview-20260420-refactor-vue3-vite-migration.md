# Overall Design Document: Vue 3 + Vite Migration

Generation Date: 2026-04-20
Target Plan Document: 20260420-refactor-vue3-vite-migration.md

## Project Overview

### Purpose and Goals

Migrate the personal portfolio from Vue 2 + Webpack + jQuery + Bootstrap 4 to Vue 3 + Vite +
Bootstrap 5, eliminate all jQuery, remove dead code (including the confirmed XSS sink in
`src/http.js`), introduce a Vitest unit test suite targeting >= 95% coverage, and advance the
Node runtime to 22 LTS — while keeping each PR at or below 200 lines.

### Background and Context

Vue 2 and Node 16 are both EOL. The codebase ships with an active XSS sink (`src/http.js:43`),
dead backend code (`UpdatesComponent.vue`), and a dual-mutation architecture (Vue 2 virtual DOM +
jQuery direct DOM writes). Three sequential PRs achieve the migration; each PR is independently
reviewable and deployable.

## Task Division Design

### Division Policy

Tasks follow a **Vertical Slice** strategy (one concern unit = one PR) as specified in the Design
Doc. Tasks within each PR are sequenced to minimise intra-PR breakage:

- Deletions before rewrites (cannot import a file you just deleted).
- jQuery package removal after all jQuery call sites are cleared.
- ESLint update after Vue 3 source is in place (to avoid false positives from Vue 2 patterns).
- Vitest scaffold before tests are written (tests require setup file and coverage config to exist).

Verifiability levels applied:
- Phase 1 tasks — L3 (build succeeds) + L1 (dev server serves app).
- Phase 2 tasks — L1 (portfolio renders in browser; dialogs open; lint passes) + L3.
- Phase 3 tasks — L2 (all tests pass; coverage >= 95%).
- Phase 4 — L1 + L2 + L3 (full gate: all QA mechanisms pass).

### Inter-task Relationship Map

```
Phase 1 — Task 1 (Vite scaffold, CI, BS5, Node 22)
  Provides: working vite build; updated package.json; vite.config.js; _v2.scss import paths fixed
  ↓
Phase 2 — Task 1 (Delete http.js, UpdatesComponent, remove jquery pkg)
  Provides: src/http.js and UpdatesComponent.vue deleted; jquery removed from package.json
  ↓
Phase 2 — Task 2 (Rewrite main.js, ProfileComponent, ProjectsComponent, registerServiceWorker)
  Depends on: Phase 2 Task 1 (UpdatesComponent must be deleted before its import is removed)
  Provides: Vue 3 createApp; window.open navigation; import.meta.env
  ↓
Phase 2 — Task 3 (Remove jQuery from theme.js, visualizer.js)
  Depends on: Phase 2 Task 1 (jquery package removed; build must not reference jquery)
  Provides: native classList in theme.js and visualizer.js
  ↓
Phase 2 — Task 4 (ESLint config update to Vue 3 + security rules)
  Depends on: Phase 2 Tasks 2 and 3 (Vue 3 source in place before running vue3-recommended)
  Provides: .eslintrc.json; zero lint violations
  ↓
Phase 2 — Task 5 (Bootstrap 5 utility class audit in SFC templates)
  Depends on: Phase 2 Task 4 (lint must pass before this task closes PR 2)
  Provides: zero Bootstrap 4-exclusive class strings in src/**/*.vue
  ↓
Phase 3 — Task 1 (Vitest scaffold, setup file, CI test step)
  Depends on: Phase 2 fully merged (Vue 3 SFCs must be in place)
  Provides: vite.config.js test block; src/tests/setup.js; pnpm run test script
  ↓
Phase 3 — Task 2 (Unit tests for all components and utilities — >= 95% coverage)
  Depends on: Phase 3 Task 1 (setup.js and coverage config must exist)
  Provides: six test files in src/tests/
  ↓
Phase 4 (Full QA gate — no new code; verification only)
  Depends on: Phase 3 Task 2
```

### Interface Change Impact Analysis

| Existing Interface | New Interface | Conversion Required | Corresponding Task |
|-------------------|---------------|--------------------|--------------------|
| `vue-cli-service serve` | `vite` | Yes | Phase 1 Task 1 |
| `vue-cli-service build` | `vite build` | Yes | Phase 1 Task 1 |
| `vue-cli-service lint` | `eslint src/` | Yes | Phase 1 Task 1 |
| `@import "/node_modules/bootstrap/scss/bootstrap"` | `@import "bootstrap/scss/bootstrap"` | Yes | Phase 1 Task 1 |
| `new Vue({ render: h => h(App) }).$mount('#app')` | `createApp(App).mount('#app')` | Yes | Phase 2 Task 2 |
| `goToUrl(url, includeTarget)` (jQuery) | `goToUrl(url)` → `window.open(url, '_blank', 'noopener,noreferrer')` | Yes | Phase 2 Task 2 |
| `$("body").addClass("dark")` | `document.body.classList.add("dark")` | Yes | Phase 2 Task 3 |
| `$("body").addClass("breathing-visualizer")` | `document.body.classList.add("breathing-visualizer")` | Yes | Phase 2 Task 3 |
| `process.env.NODE_ENV` | `import.meta.env.MODE` | Yes | Phase 2 Task 2 |
| `process.env.BASE_URL` | `import.meta.env.BASE_URL` | Yes | Phase 2 Task 2 |
| `plugin:vue/essential` (ESLint) | `plugin:vue/vue3-recommended` + `plugin:security/recommended` | Yes | Phase 2 Task 4 |
| No test runner | `vitest run --coverage` | N/A (new) | Phase 3 Task 1 |

### Common Processing Points

- **pnpm only**: All dependency operations use `pnpm`; never `npm` or `yarn`.
- **PR size constraint**: Each phase = one PR at <= 200 lines. Phase 2 has the highest risk of
  exceeding this; Tasks 2 and 3 together must stay within budget.
- **jQuery deferral**: jQuery package is NOT removed in Phase 1; it is removed in Phase 2 Task 1
  only after the Vite build is confirmed working.
- **`dialog-polyfill`**: Registration calls removed in Phase 2 Task 2; CSS file kept unless visual
  regression is confirmed. Sass import path fixed in Phase 1 Task 1.

## Implementation Considerations

### Principles to Maintain Throughout

1. Delete `http.js` and `UpdatesComponent.vue` — do not patch or comment out.
2. Replace jQuery calls with the narrowest native equivalent (`classList`, `setAttribute`,
   `window.open`).
3. Keep `theme.js` and `visualizer.js` as module-level functions — do not convert to Vue composables.
4. Preserve the seven-layer SCSS architecture in `src/assets/scss/`.
5. All `window.open` calls must pass `'noopener,noreferrer'` as the third argument.
6. No `// eslint-disable` suppressions in production code.

### Risks and Countermeasures

- Risk: Vite cannot resolve Bootstrap 5 Sass import.
  Countermeasure: Fix `_v2.scss` path in Phase 1 Task 1; validate `pnpm run build` before finishing.
- Risk: Bootstrap 5 utility class renames break layout.
  Countermeasure: Run grep audit in Phase 2 Task 5 before merging PR 2.
- Risk: `vite-plugin-pwa` generates a different `sw.js` manifest.
  Countermeasure: Compare service worker registration in browser DevTools in Phase 1.
- Risk: Vitest coverage fails to reach 95% for utility modules.
  Countermeasure: Mock `window.matchMedia` and `window.AudioContext` in `setup.js` (Phase 3 Task 1).
- Risk: GitHub Actions deploy fails due to outdated action versions.
  Countermeasure: Update all action versions in Phase 1 Task 1 first.

### Impact Scope Management

- Allowed change scope per phase as defined in Design Doc Implementation Plan.
- Preserved areas: `src/assets/scss/` architecture (only vendor import paths change);
  `public/img/`, `public/fonts/` (static assets, untouched); `src/App.vue` (minor cleanup only);
  `src/components/SpotifyComponent.vue`, `src/components/LoaderComponent.vue` (no jQuery, no changes).
