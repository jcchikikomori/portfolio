# Task: Phase 2 — Task 3: Remove jQuery from theme.js and visualizer.js

Metadata:
- Phase: 2 of 4, Task 3 of 5
- PR: PR 2
- Dependencies: Phase 2 Task 1 (jquery package removed from package.json)
- Provides: `theme.js` and `visualizer.js` with zero jQuery; native `classList` and DOM APIs used
- Size: Small (2 files updated)
- Covers: AC-JQUERY-01, AC-THEME-01, AC-THEME-02, AC-THEME-03

## Implementation Content

Replace all jQuery DOM manipulation in `src/theme.js` and `src/visualizer.js` with native
browser equivalents. Function signatures (`darkMode(): void`, `normalTheme(): void`,
`handlePlayback(): void`) remain unchanged — only the internals change. These utility modules
operate on `<body>` outside the Vue app root; they stay as module-level functions (not converted
to Vue composables).

## Target Files

- [x] `src/theme.js` — remove jQuery import; replace all `$()` calls with native DOM equivalents
- [x] `src/visualizer.js` — remove jQuery import; replace all `$()` calls with native DOM equivalents

## Investigation Targets

Files to read before starting:
- `src/theme.js` — identify all jQuery imports and every `$()` call site; note exact element
  selectors used (`body`, `#profile-logo`, `.nes-container`, `.nes-dialog`); understand the
  `each()` loop pattern over multiple class-named elements
- `src/visualizer.js` — identify jQuery import and the two `$("body").addClass/removeClass` calls
  inside `handlePlayback`
- `docs/design/vue3-vite-migration.md` (§ theme.js component, § visualizer.js component) —
  confirms replacement patterns; `.nes-container`/`.nes-dialog` each() → `querySelectorAll().forEach()`

## Implementation Steps (TDD: Red-Green-Refactor)

### 1. Red Phase

- [x] Read all Investigation Targets
- [x] Run grep to document every jQuery call in these two files:
  ```bash
  grep -n "jquery\|\$(" src/theme.js src/visualizer.js
  ```
  Record each line — verify the replacement pattern before writing code
- [x] Confirm both function signatures remain unchanged after reading the files

### 2. Green Phase

**`src/theme.js`**
- [x] Remove `import $ from 'jquery'`
- [x] In `darkMode()`, replace:
  - `$("body").addClass("dark")` → `document.body.classList.add("dark")`
  - `$("#profile-logo").attr("src", v)` → `document.getElementById("profile-logo").setAttribute("src", v)`
    (where `v` is the white logo path, e.g., `img/jcc_logo_w.png`)
  - jQuery `.each()` loop over `.nes-container` elements:
    ```js
    document.querySelectorAll(".nes-container").forEach(el => el.classList.add("dark"))
    ```
  - jQuery `.each()` loop over `.nes-dialog` elements:
    ```js
    document.querySelectorAll(".nes-dialog").forEach(el => el.classList.add("dark"))
    ```
- [x] In `normalTheme()`, replace:
  - `$("body").removeClass("dark")` → `document.body.classList.remove("dark")`
  - `$("#profile-logo").attr("src", v)` → `document.getElementById("profile-logo").setAttribute("src", v)`
    (where `v` is the default logo path)
  - jQuery `.each()` loops → `document.querySelectorAll(".nes-container").forEach(el => el.classList.remove("dark"))`
    and `document.querySelectorAll(".nes-dialog").forEach(el => el.classList.remove("dark"))`

**`src/visualizer.js`**
- [x] Remove `import $ from 'jquery'`
- [x] In `handlePlayback()`, replace:
  - `$("body").addClass("breathing-visualizer")` → `document.body.classList.add("breathing-visualizer")`
  - `$("body").removeClass("breathing-visualizer")` → `document.body.classList.remove("breathing-visualizer")`
- [x] Run `pnpm run build` — must exit 0

### 3. Refactor Phase

- [x] Run grep to confirm zero jQuery references remain:
  ```bash
  grep -r "from 'jquery'\|import \$" src/theme.js src/visualizer.js
  ```
  Expected: no output
- [ ] Manually verify dark theme behavior:
  - Open `pnpm run dev` in a browser with `prefers-color-scheme: dark` enabled (via DevTools
    media emulation or OS setting)
  - Confirm `dark` class appears on `<body>`
  - Confirm profile logo src changes to the white variant
  - Confirm `.nes-container` and `.nes-dialog` elements have the `dark` class

## Quality Assurance Mechanisms

- ESLint (`pnpm run lint`) — Enforces: Vue 3 + JS style rules — Config: current inline config
  (will be replaced in Task 4; run now to catch syntax errors only)
- Build success gate (`pnpm run build`) — Enforces: compilable Vite output — Config: `vite.config.js`

## Operation Verification Methods

- **Verification method**: Run `grep -r "from 'jquery'\|import \$" src/theme.js src/visualizer.js`
  and confirm no results. Run `pnpm run build` and confirm exit 0. Open the dev server and enable
  `prefers-color-scheme: dark` in browser DevTools; confirm `dark` class on `<body>` and logo
  src change. Open the Spotify dialog, play audio from it if possible, and confirm
  `breathing-visualizer` class appears on `<body>` (or dispatch a `play` event manually in DevTools).
- **Success criteria**:
  - `grep` returns no results
  - `pnpm run build` exits 0
  - Dark theme applies (body.classList contains `dark`; logo src is white variant)
  - `breathing-visualizer` class toggles on audio play/pause
- **Failure response**: If dark theme does not apply, check that `darkMode()` is still called from
  `main.js` at app init (call site is preserved in `main.js`; only internals of `theme.js` change).
  If selectors differ from expected, re-read `src/theme.js` carefully before adjusting.
- **Verification level**: L1 (theme applies in browser; visualizer class toggles) + L3 (build passes)

## Completion Criteria

- [x] `theme.js`: no jQuery import; all `$()` calls replaced with native DOM equivalents
- [x] `visualizer.js`: no jQuery import; all `$("body").addClass/removeClass` calls replaced
- [x] Function signatures `darkMode()`, `normalTheme()`, `handlePlayback()` unchanged
- [x] `grep -r "from 'jquery'\|import \$" src/theme.js src/visualizer.js` returns no results
- [x] `pnpm run build` exits 0
- [ ] Dark theme applies in browser (manual check)

## Notes

- Impact scope: `src/theme.js`, `src/visualizer.js`
- Scope boundary: Do NOT modify `src/main.js` call sites for `darkMode()`/`normalTheme()` or the
  `handlePlayback` event listener — those call sites are preserved from Task 2.
- `theme.js` and `visualizer.js` operate on `<body>`, which is outside the Vue app root. They
  remain module-level functions as mandated by ADR-0001 and the Design Doc.
