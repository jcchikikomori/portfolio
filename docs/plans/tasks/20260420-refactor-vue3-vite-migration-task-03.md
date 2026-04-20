# Task: Phase 2 — Task 2: Rewrite main.js, ProfileComponent, ProjectsComponent, registerServiceWorker

Metadata:
- Phase: 2 of 4, Task 2 of 5
- PR: PR 2
- Dependencies: Phase 2 Task 1 (UpdatesComponent.vue deleted; jquery package removed)
- Provides: Vue 3 `createApp` app mount; `window.open` navigation replacing jQuery `goToUrl`;
  `dialogPolyfill.registerDialog` calls removed; `import.meta.env` replacing `process.env`
- Size: Medium (4 files updated)
- Covers: AC-VUE-01, AC-VUE-02, AC-VUE-03, AC-VUE-04, AC-VUE-05, AC-VUE-06, AC-JQUERY-01,
  AC-DELETE-03, AC-SEC-04

## Implementation Content

Rewrite `src/main.js` from Vue 2 `new Vue()` instantiation to Vue 3 `createApp`. Remove all
jQuery imports and the `window.onload` jQuery DOM call from `main.js`. Replace the jQuery-based
`goToUrl` helper in `ProfileComponent.vue` and `ProjectsComponent.vue` with `window.open`. Remove
`dialogPolyfill.registerDialog` calls (keep `showModal`). Update `registerServiceWorker.js` to use
`import.meta.env` (Vite convention) instead of `process.env` (Webpack/Node convention).

## Target Files

- [x] `src/main.js` — rewrite to Vue 3 `createApp`; remove jQuery import and `window.onload` call
- [x] `src/components/ProfileComponent.vue` — remove jQuery import; remove UpdatesComponent import
  and usage; replace `goToUrl`; remove `dialogPolyfill.registerDialog` calls
- [x] `src/components/ProjectsComponent.vue` — remove jQuery import; replace `goToUrl`
- [x] `src/registerServiceWorker.js` — replace `process.env.NODE_ENV` and `process.env.BASE_URL`
  with `import.meta.env.MODE` and `import.meta.env.BASE_URL`

## Investigation Targets

Files to read before starting:
- `src/main.js` — identify all jQuery imports and uses; identify Vue 2 `new Vue()` call; note
  `window.onload` jQuery DOM call (`$("#profile-container").show()`)
- `src/components/ProfileComponent.vue` — locate `import $ from 'jquery'`; locate
  `import UpdatesComponent`; locate `goToUrl` method body (jQuery `#redirect` pattern); locate
  `dialogPolyfill.registerDialog` calls; locate `<UpdatesComponent />` in template; note
  `includeTarget` parameter usage
- `src/components/ProjectsComponent.vue` — locate `import $ from 'jquery'`; locate `goToUrl`
  method body; note `includeTarget` parameter usage
- `src/registerServiceWorker.js` — identify all `process.env.NODE_ENV` and `process.env.BASE_URL`
  occurrences
- `docs/design/vue3-vite-migration.md` (§ Interface Change Matrix, § ProfileComponent.vue
  contract definition for `goToUrl`) — confirms `includeTarget` parameter is removed; all callers
  pass only one argument

## Implementation Steps (TDD: Red-Green-Refactor)

### 1. Red Phase

- [x] Read all Investigation Targets
- [x] Confirm `pnpm run build` exits 0 after Phase 2 Task 1 (deleted files are gone; build clean)
- [x] Run search to confirm remaining jQuery imports before this task:
  ```bash
  grep -rn "from 'jquery'\|import \$\|process\.env" src/
  ```
  Record all occurrences — this task must clear all of them

### 2. Green Phase

**`src/main.js`**
- [x] Remove `import $ from 'jquery'` (or equivalent jQuery import line)
- [x] Remove `Vue.config.productionTip = false` (no Vue 3 equivalent)
- [x] Remove the `window.onload` callback that calls `$("#profile-container").show()`
- [x] Replace `new Vue({ render: h => h(App) }).$mount('#app')` with:
  ```js
  import { createApp } from 'vue'
  import App from './App.vue'
  createApp(App).mount('#app')
  ```
- [x] Retain existing `import` statements for `theme.js`, `visualizer.js`, `registerServiceWorker`

**`src/components/ProfileComponent.vue`**
- [x] Remove `import $ from 'jquery'`
- [x] Remove `import UpdatesComponent from './UpdatesComponent.vue'` (file deleted in Task 1)
- [x] Remove `UpdatesComponent` from the `components` registration object
- [x] Remove `<UpdatesComponent />` from the template
- [x] Replace the `goToUrl(url, includeTarget = true)` method body with:
  ```js
  goToUrl(url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  ```
  Remove the `includeTarget` parameter entirely.
- [x] For each dialog open call, replace:
  ```js
  dialogPolyfill.registerDialog(el); el.showModal()
  ```
  with:
  ```js
  el.showModal()
  ```
  (Keep `showModal()`; remove only the `dialogPolyfill.registerDialog` call)
- [x] Remove `dialogPolyfill` import if it exists in this file

**`src/components/ProjectsComponent.vue`**
- [x] Remove `import $ from 'jquery'`
- [x] Replace `goToUrl(url, includeTarget = true)` method body with:
  ```js
  goToUrl(url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  ```
  Remove the `includeTarget` parameter entirely.

**`src/registerServiceWorker.js`**
- [x] Replace all `process.env.NODE_ENV` occurrences with `import.meta.env.MODE`
- [x] Replace all `process.env.BASE_URL` occurrences with `import.meta.env.BASE_URL`

- [x] Run `pnpm run build` — must exit 0

### 3. Refactor Phase

- [x] Run verification grep:
  ```bash
  grep -r "from 'jquery'\|import \$\|process\.env" src/
  ```
  Expected: no results
- [x] Open `pnpm run dev` in browser; confirm:
  - Vue app mounts at `#app` with no Vue warnings in browser console
  - "Music" button opens Spotify `<dialog>`
  - "Careers" button opens Projects `<dialog>`
  - Clicking a link button opens a new tab

## Quality Assurance Mechanisms

- ESLint (`pnpm run lint`) — Enforces: Vue 3 style rules (will be updated in Task 4) — Config:
  `package.json > eslintConfig` (interim; will become `.eslintrc.json` in Task 4)
- Build success gate (`pnpm run build`) — Enforces: compilable Vite output — Config: `vite.config.js`

## Operation Verification Methods

- **Verification method**: After `pnpm run build` exits 0, run `pnpm run dev` and open the browser.
  Mount Vue app in devtools; confirm no Vue warnings (AC-VUE-01). Click "Music" button; confirm
  Spotify dialog opens (AC-VUE-03). Click "Careers" button; confirm Projects dialog opens
  (AC-VUE-04). Click a link button (LinkedIn or GitHub); confirm it opens a new tab with the
  correct URL (AC-VUE-05). Run `grep -r "from 'jquery'\|import \$\|process\.env" src/` and
  confirm no results.
- **Success criteria**:
  - `grep -r "from 'jquery'\|import \$\|process\.env" src/` returns no results
  - `pnpm run build` exits 0
  - Vue app mounts with no Vue warnings in browser console
  - Both dialogs open correctly
  - Link buttons open new tab with `noopener,noreferrer` (verify via devtools Network or source)
- **Failure response**: If `pnpm run build` fails with a missing module error, check that the
  `UpdatesComponent` import was fully removed from `ProfileComponent.vue`. If dialogs do not open,
  verify that `showModal()` is called on the correct element reference (check `document.getElementById`
  or `$refs` usage in the component).
- **Verification level**: L1 (Vue app mounts; dialogs open; navigation works) + L3 (build passes)

## Completion Criteria

- [x] `main.js` uses `createApp(App).mount('#app')`; no jQuery import; no `window.onload` jQuery call
- [x] `ProfileComponent.vue`: no jQuery import; no `UpdatesComponent` import or template usage;
  `goToUrl(url)` uses `window.open(url, '_blank', 'noopener,noreferrer')`; no `dialogPolyfill.registerDialog` calls
- [x] `ProjectsComponent.vue`: no jQuery import; `goToUrl(url)` uses `window.open`
- [x] `registerServiceWorker.js`: no `process.env` occurrences
- [x] `grep -r "from 'jquery'\|import \$\|process\.env" src/` returns no results
- [x] `pnpm run build` exits 0
- [ ] Browser check: Vue app mounts; dialogs open; links open in new tab

## Notes

- Impact scope: `src/main.js`, `src/components/ProfileComponent.vue`,
  `src/components/ProjectsComponent.vue`, `src/registerServiceWorker.js`
- Scope boundary: `src/theme.js`, `src/visualizer.js` — NOT modified in this task; their jQuery
  removal is Task 3. `src/App.vue` — NOT modified in this task; it requires only minor cleanup
  which can be done here or in Task 4 ESLint pass.
- `dialog-polyfill` CSS (`public/css/dialog-polyfill.css`) is retained in `public/`; only the
  JavaScript registration calls are removed. The Sass import path was already fixed in Phase 1.
- All `window.open` calls must pass exactly `'noopener,noreferrer'` as the third argument (AC-SEC-04).
- The `includeTarget` parameter on `goToUrl` is removed because zero callers pass a second argument
  (confirmed by call-site audit in Design Doc).
