# Task: Phase 2 — Task 5: Bootstrap 5 Utility Class Audit in SFC Templates

Metadata:
- Phase: 2 of 4, Task 5 of 5
- PR: PR 2
- Dependencies: Phase 2 Task 4 (lint passes; ESLint config updated)
- Provides: zero Bootstrap 4-exclusive utility class strings in `src/**/*.vue`
- Size: Small (0–4 files updated depending on audit results)
- Covers: AC-BS-01, AC-BS-02, AC-BS-03

## Implementation Content

Audit all Vue SFC templates for Bootstrap 4-exclusive utility class names that were renamed in
Bootstrap 5. Replace any found with their Bootstrap 5 equivalents. Run a visual check to confirm
layout is unchanged. This is the final task in PR 2 — it closes the Bootstrap 5 upgrade started
in Phase 1.

## Target Files

- [x] `src/components/ProfileComponent.vue` — audit template for Bootstrap 4 classes
- [x] `src/components/ProjectsComponent.vue` — audit template for Bootstrap 4 classes
- [x] `src/components/SpotifyComponent.vue` — audit template for Bootstrap 4 classes
- [x] `src/components/LoaderComponent.vue` — audit template for Bootstrap 4 classes
- [x] `src/App.vue` — audit template for Bootstrap 4 classes

## Investigation Targets

Files to read before starting:
- All five `.vue` files listed under Target Files — scan templates for Bootstrap class usage
- `docs/design/vue3-vite-migration.md` (§ Risks and Mitigation — Bootstrap 5 utility class renames) —
  confirms the specific classes to grep for and their replacements

## Bootstrap 4 → Bootstrap 5 Class Rename Reference

| Bootstrap 4 class | Bootstrap 5 replacement |
|-------------------|------------------------|
| `mr-{n}` | `me-{n}` |
| `ml-{n}` | `ms-{n}` |
| `pr-{n}` | `pe-{n}` |
| `pl-{n}` | `ps-{n}` |
| `float-left` | `float-start` |
| `float-right` | `float-end` |
| `text-left` | `text-start` |
| `text-right` | `text-end` |
| `font-weight-{v}` | `fw-{v}` |
| `font-italic` | `fst-italic` |
| `badge-{color}` | `bg-{color}` (on `<span class="badge">`) |
| `no-gutters` | `g-0` |
| `form-group` | (removed; use `mb-3`) |
| `form-row` | `row` |
| `form-inline` | (removed; use flexbox utilities) |
| `sr-only` | `visually-hidden` |

## Implementation Steps (TDD: Red-Green-Refactor)

### 1. Red Phase

- [x] Read all Investigation Targets
- [x] Run the grep audit to find all Bootstrap 4-exclusive classes in SFC templates:
  ```bash
  grep -rn "mr-\|ml-\|pr-\|pl-\|float-left\|float-right\|text-left\|text-right\|font-weight-\|font-italic\|badge-\|no-gutters\|form-group\|form-row\|form-inline\|sr-only" src/**/*.vue
  ```
  Record every match with file path and line number.
- [x] If the grep returns no results, this task has zero changes; proceed to Completion Criteria
  and mark complete.

### 2. Green Phase

- [x] For each match found in the grep audit, replace with the Bootstrap 5 equivalent from the
  reference table above.
- [x] Run `pnpm run build`:
  ```bash
  pnpm run build
  ```
  Must exit 0 with no Sass errors.

### 3. Refactor Phase

- [x] Re-run the grep audit to confirm zero matches remain:
  ```bash
  grep -rn "mr-\|ml-\|pr-\|pl-\|float-left\|float-right\|text-left\|text-right\|font-weight-\|font-italic\|badge-\|no-gutters\|form-group\|form-row\|form-inline\|sr-only" src/**/*.vue
  ```
  Expected: no output
- [x] Open `pnpm run preview` (after `pnpm run build`) and verify:
  - Layout is unchanged at mobile (< 768px), tablet (768–1024px), and desktop (> 1024px) widths
  - Profile card margins and spacing look correct
  - No visual regression from class renames
- [x] Run `pnpm run lint` — must still exit 0

## Quality Assurance Mechanisms

- ESLint (`pnpm run lint`) — Enforces: `plugin:vue/vue3-recommended` + `plugin:security/recommended` — Config: `.eslintrc.json`
- Build success gate (`pnpm run build`) — Enforces: compilable Vite output; no Sass errors — Config: `vite.config.js`

## Operation Verification Methods

- **Verification method**: Run the grep audit command above and confirm zero results. Run
  `pnpm run build` and confirm exit 0 with no Sass errors. Open `pnpm run preview` and visually
  check the portfolio layout at three viewport widths.
- **Success criteria**:
  - Grep returns zero matches for all Bootstrap 4-exclusive class patterns
  - `pnpm run build` exits 0; no Sass errors
  - Visual layout unchanged across mobile, tablet, desktop
- **Failure response**: If a class rename breaks layout (e.g., spacing changes), check Bootstrap 5
  migration docs at https://getbootstrap.com/docs/5.3/migration/ for the correct replacement. Do
  not revert to Bootstrap 4 classes.
- **Verification level**: L1 (visual layout check passes) + L3 (build passes; grep clean)

## Completion Criteria

- [x] Grep audit returns zero matches for Bootstrap 4-exclusive class patterns in `src/**/*.vue`
- [x] `pnpm run build` exits 0; no Sass errors
- [x] `pnpm run lint` exits 0
- [x] Visual check confirms layout unchanged across mobile, tablet, desktop

## Notes

- Impact scope: `src/components/ProfileComponent.vue`, `src/components/ProjectsComponent.vue`,
  `src/components/SpotifyComponent.vue`, `src/components/LoaderComponent.vue`, `src/App.vue`
  (only those that have matching classes; files with no matches are untouched)
- Scope boundary: Do NOT change layout, spacing values, or component structure — only rename
  deprecated utility classes to their Bootstrap 5 equivalents.
- If the grep returns no results, this task is complete with zero file changes. Commit with
  a note confirming the audit was clean.
