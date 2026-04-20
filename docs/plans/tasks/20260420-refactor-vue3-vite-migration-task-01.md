# Task: Phase 1 — Vite Scaffold, CI Hardening, Bootstrap 5, Node 22 Upgrade

Metadata:
- Phase: 1 of 4
- PR: PR 1
- Dependencies: none (foundational task)
- Provides: working `pnpm run build` and `pnpm run dev` under Vite; `vite.config.js`; updated
  `package.json` scripts; Bootstrap 5 Sass import paths in `_v2.scss`; Node 22 in `.nvmrc`;
  updated GitHub Actions workflow files
- Size: Medium (8 files changed, 3 deleted, 1 new)
- Estimated line count: ~80–120 lines changed

## Implementation Content

Replace `@vue/cli-service` (Webpack) with Vite as the build tool. Upgrade Node runtime to 22
LTS. Update GitHub Actions workflows to current action versions. Upgrade Bootstrap from v4 to v5
at the package and Sass import level. Delete obsolete config files (`vue.config.js`,
`babel.config.js`, `volar.config.js`). jQuery and Vue 2 source remain untouched in this PR —
the build must succeed with existing jQuery code still present.

This is the early verification point for the entire migration. Every subsequent phase depends on
`pnpm run build` passing under Vite.

## Target Files

- [x] `package.json` — add Vite deps; remove Vue CLI deps; update scripts
- [x] `vite.config.js` — NEW: Vite config with `@vitejs/plugin-vue`, `vite-plugin-pwa`, Sass options
- [x] `vue.config.js` — DELETE
- [x] `babel.config.js` — DELETE
- [x] `volar.config.js` — DELETE
- [x] `src/assets/scss/vendors/_v2.scss` — update Bootstrap and dialog-polyfill import paths
- [x] `.nvmrc` — change from `v16.17.0` to `22`
- [x] `.github/workflows/gh-pages.yml` — Node matrix 18.x → 20.x; update action versions
- [x] `.github/workflows/default.yml` — update action versions; verify Node matrix includes 22.x
- [x] `public/index.html` — add `<script type="module" src="/src/main.js">` entry point if missing

## Investigation Targets

Files to read before starting:
- `package.json` — current deps, scripts, eslintConfig inline block; understand what to remove vs keep
- `vue.config.js` — current Webpack config; extract any aliases or publicPath needed in vite.config.js
- `src/assets/scss/vendors/_v2.scss` — identify exact Bootstrap and dialog-polyfill import lines
- `.github/workflows/gh-pages.yml` — current Node matrix and action versions
- `.github/workflows/default.yml` — current Node matrix (already 18/20/22?) and action versions
- `public/index.html` — check if it has Webpack-injected script tags that must be replaced with Vite entry point
- `.npmrc` — confirm `shamefully-hoist=true` is present (required for Vite to resolve node_modules)
- `docs/design/vue3-vite-migration.md` (§ vite.config.js component, § Bootstrap Sass Import Path Change) — exact config to create

## Implementation Steps (TDD: Red-Green-Refactor)

### 1. Red Phase

- [x] Read all Investigation Targets above and record:
  - List of deps to add and remove in `package.json`
  - Whether `vue.config.js` has any non-default aliases (if yes, translate to `vite.config.js resolve.alias`)
  - Exact current lines in `_v2.scss` for Bootstrap and dialog-polyfill imports
  - Current action version strings in both workflow files
  - Whether `public/index.html` has a `<script src="/js/app.js">` or similar Webpack artifact
- [x] Confirm the build currently fails by attempting `pnpm run build` before any changes
  (expected: build uses `@vue/cli-service` which will be removed; verifies the baseline)

### 2. Green Phase

- [x] Update `package.json`:
  - Add to `dependencies`: `vue@^3.4`
  - Add to `devDependencies`: `vite@^5`, `@vitejs/plugin-vue@^5`, `vite-plugin-pwa@^0.20`,
    `bootstrap@^5.3`, `sass`
  - Remove from `devDependencies`: `@vue/cli-service`, `@vue/cli-plugin-babel`,
    `@vue/cli-plugin-eslint`, `@vue/cli-plugin-pwa`, `@babel/eslint-parser`, `@babel/core`,
    `@vue/babel-preset-app`, `sass-loader`, `volar-service-vetur`
  - Update `scripts`:
    ```json
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src/"
    ```
  - Do NOT remove `jquery` or `@types/jquery` yet (Phase 2 Task 1)
  - Run `pnpm install` to regenerate `pnpm-lock.yaml`
- [x] Create `vite.config.js` at project root:
  ```js
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import { VitePWA } from 'vite-plugin-pwa'

  export default defineConfig({
    base: '/',
    plugins: [
      vue(),
      VitePWA({ registerType: 'autoUpdate' })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true
        }
      }
    }
  })
  ```
- [x] Delete `vue.config.js`, `babel.config.js`, `volar.config.js`
- [x] Update `src/assets/scss/vendors/_v2.scss`:
  - Change `@import "/node_modules/bootstrap/scss/bootstrap"` to `@import "bootstrap/scss/bootstrap"`
  - Change `@import "/node_modules/dialog-polyfill/dialog-polyfill"` to `@import "dialog-polyfill/dialog-polyfill"`
- [x] Update `.nvmrc`: replace `v16.17.0` with `22`
- [x] Update `.github/workflows/gh-pages.yml`:
  - Node matrix: change `[18.x]` to `[20.x]`
  - Update `actions/checkout` to `v4`
  - Update `actions/setup-node` to `v4`
  - Update `JamesIves/github-pages-deploy-action` to `v4`
- [x] Update `.github/workflows/default.yml`:
  - Update `actions/checkout` to `v4`
  - Update `actions/setup-node` to `v4`
  - Verify Node matrix already contains `22.x`; retain it
- [x] Update `public/index.html` if it contains Webpack-injected script tags:
  - Remove any `<script src="/js/app.js">` or `defer src` Webpack artifacts
  - Add `<script type="module" src="/src/main.js"></script>` if missing
- [x] Run `pnpm install`
- [x] Run `pnpm run build` — fix any Sass path errors before continuing

### 3. Refactor Phase

- [x] If `pnpm run build` produced Sass deprecation warnings (not errors), confirm they are
  suppressed by `quietDeps: true`; if not, add explicit `additionalData` to silence them
- [x] Compare `dist/index.html` to ensure `<div id="app">` is present and CSS/JS bundles are linked
- [ ] Confirm `pnpm run dev` starts at `http://localhost:5173` and the portfolio loads visually

## Quality Assurance Mechanisms

- Build success gate (`pnpm run build`) — Enforces: compilable Vite output — Config: `vite.config.js` (created in this task)
- GitHub Actions matrix (Node 18.x, 20.x, 22.x) — Enforces: Node version compatibility — Config: `.github/workflows/default.yml`
- depcheck (`pnpx depcheck`) — Enforces: no unused dependencies — Config: `.depcheckrc` (update ignore list if `vite-plugin-pwa` is flagged as unused; it is registered in `vite.config.js` not `package.json` imports)

## Operation Verification Methods

This task is the **early verification point** for the entire migration.

- **Verification method**: Run `pnpm run build` and confirm `dist/index.html` exists. Run
  `pnpm run dev` and open `http://localhost:5173` in a browser; confirm the portfolio loads with
  existing Vue 2 + jQuery code (jQuery removal is Phase 2). Check GitHub Actions `Build Test`
  workflow passes on all Node versions after pushing the branch.
- **Success criteria**:
  - `dist/index.html` exists after `pnpm run build`
  - `pnpm run build` exits with code 0 and zero Sass errors
  - `pnpm run dev` serves the app at `http://localhost:5173` with no terminal errors
  - GitHub Actions `Build Test` workflow passes on all three Node versions in the matrix
  - `grep -c "jQuery" dist/assets/*.js` may return > 0 at this stage (jQuery removal is Phase 2)
- **Failure response**: If `pnpm run build` fails due to Sass import path issues in `_v2.scss`,
  fix the Sass paths before committing. Do not proceed to Phase 2 until the Vite build is green.
  If `vite-plugin-pwa` causes a build error, check `vite-plugin-pwa` documentation for correct
  `registerType` option syntax in the version being installed.
- **Verification level**: L3 (build succeeds) + L1 (dev server serves the app)

## Completion Criteria

- [x] `vite.config.js` exists at project root with `@vitejs/plugin-vue` and `vite-plugin-pwa`
- [x] `vue.config.js`, `babel.config.js`, `volar.config.js` deleted
- [x] `_v2.scss` import paths updated (no `/node_modules/` prefix)
- [x] `.nvmrc` contains `22`
- [x] `.github/workflows/gh-pages.yml` Node matrix = `[20.x]`; action versions current
- [x] `.github/workflows/default.yml` action versions current; Node matrix includes 22.x
- [x] `pnpm run build` exits 0; `dist/index.html` exists; no Sass errors
- [ ] `pnpm run dev` serves the app at `http://localhost:5173`
- [ ] GitHub Actions CI passes on all Node versions in the matrix
- [x] `pnpm install` completed without error; `pnpm-lock.yaml` updated

## Notes

- Impact scope: `package.json`, `pnpm-lock.yaml`, `vite.config.js`, three deleted config files,
  `_v2.scss`, `.nvmrc`, two workflow files, `public/index.html`
- Scope boundary: `src/**/*.js` and `src/**/*.vue` — do NOT modify any source files in this task
  (Vue 2 + jQuery code remains; Phase 2 handles source changes). The only `src/` file touched is
  `src/assets/scss/vendors/_v2.scss` for import paths.
- jQuery deferral: `jquery` and `@types/jquery` remain in `package.json` through this PR. Their
  removal in Phase 2 Task 1 is gated on the Vite build being confirmed green here.
- `shamefully-hoist=true` in `.npmrc` must be preserved; Vite requires it for `node_modules`
  resolution in this project.
