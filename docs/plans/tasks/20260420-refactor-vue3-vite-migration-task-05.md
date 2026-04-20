# Task: Phase 2 — Task 4: Update ESLint Config to Vue 3 + Security Rules

Metadata:
- Phase: 2 of 4, Task 4 of 5
- PR: PR 2
- Dependencies: Phase 2 Tasks 2 and 3 (Vue 3 source in place; all jQuery removed from src/)
- Provides: `.eslintrc.json` extending `plugin:vue/vue3-recommended` and
  `plugin:security/recommended`; `pnpm run lint` exits 0 with zero violations
- Size: Small (1 file created, 1 file updated)
- Covers: AC-BUILD-03, AC-SEC-02, AC-SEC-03

## Implementation Content

Extract the inline `eslintConfig` from `package.json` into a standalone `.eslintrc.json` at
project root. Update the ESLint extends list from `plugin:vue/essential` (Vue 2) to
`plugin:vue/vue3-recommended` and add `plugin:security/recommended`. Remove the deprecated
`@babel/eslint-parser` parser and `"jquery": true` from the `env` block. Install
`eslint-plugin-security@^3`. Fix any Vue 3 rule violations surfaced by the updated config.

This task must run after Tasks 2 and 3 so that the Vue 3 source is in place; running
`vue3-recommended` against Vue 2 patterns would generate misleading violations.

## Target Files

- [ ] `.eslintrc.json` — NEW: standalone ESLint config file
- [ ] `package.json` — remove `eslintConfig` inline block; add `eslint-plugin-security` to
  `devDependencies`

## Investigation Targets

Files to read before starting:
- `package.json` (§ `eslintConfig` block) — record the current extends, parser, env, and rules
  to understand what is being replaced
- `src/components/SpotifyComponent.vue` — likely source of vue3-recommended violations; check
  component structure
- `src/components/LoaderComponent.vue` — check for any Vue 2-only patterns
- `src/App.vue` — check for any Vue 2-only patterns
- `docs/design/vue3-vite-migration.md` (§ Security Considerations / eslint-plugin-security) —
  exact ESLint config JSON to create

## Implementation Steps (TDD: Red-Green-Refactor)

### 1. Red Phase

- [ ] Read all Investigation Targets
- [ ] Run current lint to see baseline violation count:
  ```bash
  pnpm run lint
  ```
  Record any existing violations — these must all be zero after this task
- [ ] Install `eslint-plugin-security@^3`:
  ```bash
  pnpm add -D eslint-plugin-security@^3
  ```

### 2. Green Phase

- [ ] Create `.eslintrc.json` at project root:
  ```json
  {
    "root": true,
    "env": { "node": true, "browser": true },
    "extends": [
      "plugin:vue/vue3-recommended",
      "plugin:security/recommended"
    ],
    "rules": {},
    "parserOptions": {
      "ecmaVersion": 2022,
      "sourceType": "module"
    }
  }
  ```
  Note: `"jquery": true` is NOT included in `env` (jQuery removed); `@babel/eslint-parser` is
  NOT set as parser (not needed with Vite/esbuild).
- [ ] Remove the `"eslintConfig"` key and its entire value from `package.json`
- [ ] Run `pnpm run lint`:
  ```bash
  pnpm run lint
  ```
- [ ] For each violation reported:
  - Vue 3 template violations (e.g., `vue/no-deprecated-*`, `vue/multi-word-component-names`):
    fix in the relevant `.vue` file
  - Security violations: fix the flagged pattern in the relevant file
  - Do NOT add `// eslint-disable` comments to suppress violations

### 3. Refactor Phase

- [ ] Run `pnpm run lint` a final time and confirm exit code 0 with zero errors
- [ ] Run `pnpm run build` to confirm lint config changes did not break the build
- [ ] Confirm no `// eslint-disable` lines were added to any production file:
  ```bash
  grep -r "eslint-disable" src/
  ```
  Expected: no output (or only pre-existing disable comments that were already present before
  this task — if any are found that were added in this task, remove them and fix the underlying issue)

## Quality Assurance Mechanisms

- ESLint (`pnpm run lint`) — Enforces: `plugin:vue/vue3-recommended` + `plugin:security/recommended` — Config: `.eslintrc.json` (created in this task)
- Build success gate (`pnpm run build`) — Enforces: compilable Vite output — Config: `vite.config.js`

## Operation Verification Methods

- **Verification method**: Run `pnpm run lint` and confirm it exits 0 with zero errors and zero
  warnings. Run `grep -r "eslint-disable" src/` and confirm no suppressions were added.
- **Success criteria**:
  - `.eslintrc.json` exists; extends `plugin:vue/vue3-recommended` and `plugin:security/recommended`
  - `pnpm run lint` exits 0 with zero errors
  - No `// eslint-disable` suppressions in any `src/` file
  - `eslint-plugin-security` is listed in `devDependencies` in `package.json`
  - `package.json` has no `eslintConfig` inline block
- **Failure response**: If a security rule violation cannot be fixed without adding a suppression,
  escalate to the user — the Design Doc requires zero suppressed violations in production code
  (AC-SEC-02). If `vue/multi-word-component-names` fires for single-word components, add the
  component name to the `rules` block as an exception (not a disable comment).
- **Verification level**: L3 (lint exits 0) and confirms prior L1 work (app still renders after config change)

## Completion Criteria

- [ ] `.eslintrc.json` exists at project root with correct extends
- [ ] `eslint-plugin-security@^3` in `devDependencies`
- [ ] `package.json` has no `eslintConfig` block
- [ ] `pnpm run lint` exits 0 with zero errors
- [ ] No `// eslint-disable` lines added to production code
- [ ] `pnpm run build` still exits 0

## Notes

- Impact scope: `.eslintrc.json` (new), `package.json`, potentially minor fixes in
  `SpotifyComponent.vue`, `LoaderComponent.vue`, or `App.vue`
- Scope boundary: Do NOT change the logic or template structure of any component beyond the
  minimum required to satisfy `vue3-recommended` rules.
- `vue/multi-word-component-names` may fire for component names. If so, the preferred fix is to
  add the component names to the rule's `ignores` array in `.eslintrc.json` rather than renaming
  the files (renaming is a separate refactor, out of scope).
