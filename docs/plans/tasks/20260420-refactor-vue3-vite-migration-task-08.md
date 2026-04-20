# Task: Phase 3 — Task 2: Unit Tests for All Components and Utility Modules

Metadata:
- Phase: 3 of 4, Task 2 of 2
- PR: PR 3
- Dependencies: Phase 3 Task 1 (Vitest scaffold, `src/tests/setup.js`, `pnpm run test` script)
- Provides: six test files in `src/tests/`; `pnpm run test` exits 0 with >= 95% line and branch
  coverage over `src/`
- Size: Medium (6 new files)
- Covers: AC-TEST-01, AC-TEST-02, AC-TEST-03

## Implementation Content

Write unit tests for all six targets using Vitest and `@vue/test-utils`. Test observable
behaviour through public interfaces; do not test private method internals. Use the mocks set up
in `src/tests/setup.js` — do not add additional `vi.mock()` calls that would hide untested paths.
Coverage threshold is enforced by `vite.config.js > test.coverage.threshold` at 95% lines and
branches.

## Target Files (test files to create)

- [ ] `src/tests/App.spec.js`
- [ ] `src/tests/ProfileComponent.spec.js`
- [ ] `src/tests/ProjectsComponent.spec.js`
- [ ] `src/tests/SpotifyComponent.spec.js`
- [ ] `src/tests/theme.spec.js`
- [ ] `src/tests/visualizer.spec.js`

## Investigation Targets

Files to read before starting:
- `src/App.vue` — understand component structure; identify what to assert on mount
- `src/components/ProfileComponent.vue` — identify method names, button selectors, dialog IDs
  (`#dialog-spotify`, `#dialog-projects`), and link button selectors
- `src/components/ProjectsComponent.vue` — identify project card link button selector and `goToUrl` call
- `src/components/SpotifyComponent.vue` — identify close button selector and dialog close mechanism
- `src/theme.js` — understand `darkMode()` and `normalTheme()` function signatures and DOM
  elements they mutate (`body`, `#profile-logo`, `.nes-container`, `.nes-dialog`)
- `src/visualizer.js` — understand `handlePlayback()` and what triggers `breathing-visualizer` class
- `src/tests/setup.js` — understand which mocks are available globally; do not re-mock what is
  already mocked
- `docs/design/vue3-vite-migration.md` (§ Test Boundaries — Integration Verification Points) —
  confirms the six integration verification targets each test must cover

## Implementation Steps (TDD: Red-Green-Refactor)

### 1. Red Phase

- [ ] Read all Investigation Targets above
- [ ] Create all six empty test files (stubs) with `describe` blocks only; run `pnpm run test`
  and confirm it exits with a coverage failure (0% coverage, threshold not met) — this is the
  expected RED state

### 2. Green Phase

**`src/tests/App.spec.js`**
- [ ] Import `mount` from `@vue/test-utils` and `App` from `../App.vue`
- [ ] Before each test, spy on `console.warn` and `console.error` with `vi.spyOn`
- [ ] Test case 1: "mounts without Vue warnings" — mount `App`; assert `console.warn` not called;
  assert `console.error` not called
- [ ] Test case 2: "renders root element" — mount `App`; assert the wrapper contains a root element
  (e.g., `wrapper.find('#app')` or `wrapper.element` is truthy)

**`src/tests/ProfileComponent.spec.js`**
- [ ] Import `mount` and `ProfileComponent`
- [ ] Before each test, create a mock dialog element with `showModal` as a `vi.fn()` spy and
  inject it into jsdom: `document.body.innerHTML` can include `<dialog id="dialog-spotify">` and
  `<dialog id="dialog-projects">`; or use `document.createElement('dialog')` and
  `document.getElementById` mock
- [ ] Test case 1: "Music button opens Spotify dialog" — mount component; find the "Music" button
  and trigger a click; assert `document.getElementById("dialog-spotify").showModal` was called
- [ ] Test case 2: "Careers button opens Projects dialog" — same pattern for "Careers" button and
  `#dialog-projects`
- [ ] Test case 3: "link button calls window.open with noopener" — find a link button (LinkedIn,
  GitHub, or Blog); trigger a click; assert `window.open` was called; assert the call included
  `'noopener,noreferrer'` as the third argument

**`src/tests/ProjectsComponent.spec.js`**
- [ ] Import `mount` and `ProjectsComponent`
- [ ] Test case 1: "project link button calls window.open with noopener" — mount component; find
  a project card link button; trigger a click; assert `window.open` was called with
  `'noopener,noreferrer'`

**`src/tests/SpotifyComponent.spec.js`**
- [ ] Import `mount` and `SpotifyComponent`
- [ ] Test case 1: "renders without errors" — mount component; assert no errors; assert wrapper
  exists
- [ ] Test case 2: "close button triggers dialog close" — mount component; find the close button;
  trigger a click; assert the expected close method was called (inspect `SpotifyComponent.vue` to
  determine whether it calls `dialog.close()`, a custom method, or emits an event)

**`src/tests/theme.spec.js`**
- [ ] Import `darkMode` and `normalTheme` from `../theme.js`
- [ ] Before each test:
  - Reset `document.body.className = ''`
  - Ensure `#profile-logo` exists in jsdom: append `<img id="profile-logo" src="">` to
    `document.body` if not already present; clean up in `afterEach`
- [ ] Test case 1: "darkMode adds dark class to body" — call `darkMode()`; assert
  `document.body.classList.contains('dark')` is `true`
- [ ] Test case 2: "normalTheme removes dark class from body" — call `darkMode()` then
  `normalTheme()`; assert `document.body.classList.contains('dark')` is `false`
- [ ] Test case 3: "darkMode sets logo to white variant" — call `darkMode()`; assert
  `document.getElementById("profile-logo").getAttribute("src")` contains `jcc_logo_w.png` or
  the white logo filename (read from actual `theme.js` source)
- [ ] Test case 4: "normalTheme sets logo to default variant" — call `darkMode()` then
  `normalTheme()`; assert `document.getElementById("profile-logo").getAttribute("src")` contains
  the default logo filename

**`src/tests/visualizer.spec.js`**
- [ ] Import `handlePlayback` from `../visualizer.js`
- [ ] Before each test: reset `document.body.className = ''`
- [ ] Understand how `handlePlayback` determines play vs pause — read `visualizer.js` to see if
  it uses `event.type` or checks a media element state; set up accordingly
- [ ] Test case 1: "play event adds breathing-visualizer class" — call `handlePlayback` or
  dispatch a `play` event as the function expects; assert
  `document.body.classList.contains('breathing-visualizer')` is `true`
- [ ] Test case 2: "pause event removes breathing-visualizer class" — after adding the class,
  trigger the pause equivalent; assert class is `false`
- [ ] Test case 3: "ended event removes breathing-visualizer class" — same as pause but with
  `ended` event

- [ ] Run `pnpm run test`:
  ```bash
  pnpm run test
  ```
  Expected: all tests pass AND coverage >= 95%

### 3. Refactor Phase

- [ ] If coverage is below 95%, identify which lines/branches are not covered and add targeted
  test cases
- [ ] Ensure no `vi.mock()` suppression is hiding untested code paths
- [ ] Run `pnpm run lint` — test files must also lint cleanly
- [ ] Run `pnpm run test` a final time — confirm all green and coverage threshold met

## Quality Assurance Mechanisms

- Vitest coverage (`pnpm run test`) — Enforces: >= 95% line and branch coverage over `src/` —
  Config: `vite.config.js > test.coverage.threshold`
- ESLint (`pnpm run lint`) — Enforces: `plugin:vue/vue3-recommended` + `plugin:security/recommended` — Config: `.eslintrc.json`

## Operation Verification Methods

- **Verification method**: Run `pnpm run test` and confirm all tests pass with zero failures.
  Inspect the coverage text output and confirm `Lines` and `Branches` columns show >= 95% for
  the `src/` total row. Run `grep -r "window.open" src/` and confirm every match in the source
  passes through a test that asserts `'noopener,noreferrer'` (AC-SEC-04 integration verification).
- **Success criteria**:
  - `pnpm run test` exits 0; all six test files have at least one passing test
  - Coverage report: `Lines >= 95%` and `Branches >= 95%` over `src/`
  - `window.open` spy confirms `'noopener,noreferrer'` is always passed (AC-SEC-04)
  - `document.body.classList` state verified through real jsdom (AC-THEME-01, AC-THEME-02,
    AC-THEME-03)
- **Failure response**: If coverage is below 95%, add targeted test cases for uncovered branches
  before committing. If a test fails due to a jsdom limitation (e.g., `showModal` not implemented),
  mock only the specific element method that jsdom lacks — do not mock the entire component.
- **Verification level**: L2 (all tests pass; coverage >= 95%)

## Completion Criteria

- [ ] Six test files created in `src/tests/`
- [ ] All tests pass (`pnpm run test` exits 0)
- [ ] Coverage report: >= 95% lines and >= 95% branches over `src/`
- [ ] `window.open` test cases assert `'noopener,noreferrer'` as the third argument
- [ ] `document.body.classList` state verified for `dark` and `breathing-visualizer` classes
- [ ] No `vi.mock()` suppressions hiding untested paths
- [ ] `pnpm run lint` exits 0 (test files lint cleanly)

## Notes

- Impact scope: `src/tests/` directory (six new test files only)
- Scope boundary: Do NOT modify any production source file (`src/**/*.vue`, `src/**/*.js`)
  during this task. If a component has a testability issue (e.g., an element ID mismatch),
  note it and fix the test to match the actual implementation — not the other way around.
- `src/registerServiceWorker.js` is excluded from coverage via the `exclude` list in
  `vite.config.js`; do not write tests for it.
- `window.open` is already mocked as `vi.fn()` in `setup.js`; call `window.open.mockClear()`
  in `beforeEach` to reset the call count between tests.
- jsdom does not implement `HTMLDialogElement.showModal()`; you must add `showModal` as a
  `vi.fn()` to the element before asserting it was called. Use `Object.defineProperty` or set
  the property directly on the element instance after `document.getElementById`.
