# Task: Phase 3 — Task 1: Vitest Scaffold, Setup File, and CI Integration

Metadata:
- Phase: 3 of 4, Task 1 of 2
- PR: PR 3
- Dependencies: Phase 2 fully merged to `develop` (Vue 3 SFCs in place; jQuery removed)
- Provides: `vitest`, `@vue/test-utils@^2`, `jsdom`, `@vitest/coverage-v8` installed; `vite.config.js`
  `test` block configured; `src/tests/setup.js` with four global mocks; `pnpm run test` script;
  `default.yml` CI test step
- Size: Small (2 files updated, 1 new file)
- Covers: AC-BUILD-04, AC-TEST-03

## Implementation Content

Add the Vitest test framework and configure it for jsdom environment with coverage thresholds.
Create the `src/tests/setup.js` file that mocks the browser APIs that jsdom does not implement
(`window.matchMedia`, `window.AudioContext`, `window.open`, `register-service-worker`). Add
`pnpm run test` to the CI `default.yml` workflow. This task produces a working test runner with
zero test files — it is the foundation on which Task 2 writes the actual tests.

## Target Files

- [ ] `package.json` — add `vitest`, `@vue/test-utils@^2`, `jsdom`, `@vitest/coverage-v8` to
  `devDependencies`; add `"test": "vitest run --coverage"` script
- [ ] `vite.config.js` — add `test` configuration block
- [ ] `src/tests/setup.js` — NEW: global mock setup file for jsdom environment
- [ ] `.github/workflows/default.yml` — add `pnpm run test` step after build step

## Investigation Targets

Files to read before starting:
- `vite.config.js` — confirm current file content before adding the `test` block; avoid
  overwriting existing configuration
- `src/registerServiceWorker.js` — understand how `register-service-worker` is called so the
  mock in `setup.js` correctly stubs it
- `.github/workflows/default.yml` — identify where in the job steps to insert `pnpm run test`
  (after the build step, before any deploy step)
- `docs/design/vue3-vite-migration.md` (§ Test Boundaries — Mock Boundary Decisions) — confirms
  which four APIs must be mocked in `setup.js` and why

## Implementation Steps (TDD: Red-Green-Refactor)

### 1. Red Phase

- [ ] Read all Investigation Targets
- [ ] Confirm `pnpm run build` and `pnpm run lint` both exit 0 (Phase 2 gate passed)
- [ ] Confirm `pnpm run test` does not yet exist:
  ```bash
  pnpm run test
  # Expected: error — script not found
  ```

### 2. Green Phase

- [ ] Install Vitest dependencies:
  ```bash
  pnpm add -D vitest@^1 @vue/test-utils@^2 jsdom @vitest/coverage-v8
  ```
- [ ] Add `"test": "vitest run --coverage"` to `scripts` in `package.json`
- [ ] Add the `test` block to `vite.config.js`. Edit the file to append a `test` key inside
  `defineConfig({...})`:
  ```js
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      threshold: { lines: 95, branches: 95 },
      include: ['src/**/*.{js,vue}'],
      exclude: ['src/tests/**', 'src/registerServiceWorker.js']
    }
  }
  ```
- [ ] Create `src/tests/setup.js` with the following global mocks:
  ```js
  import { vi } from 'vitest'

  // jsdom does not implement matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })

  // jsdom does not implement Web Audio API
  Object.defineProperty(window, 'AudioContext', {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      createAnalyser: vi.fn(),
      createMediaElementSource: vi.fn()
    }))
  })

  // Spy on window.open so tests can assert navigation calls
  Object.defineProperty(window, 'open', {
    writable: true,
    value: vi.fn()
  })

  // Mock register-service-worker so SW registration does not run in tests
  vi.mock('register-service-worker', () => ({
    register: vi.fn()
  }))
  ```
- [ ] Create `src/tests/` directory if it does not exist (the setup.js creation above creates it)
- [ ] Update `.github/workflows/default.yml`: add a step after the build step:
  ```yaml
  - name: Test
    run: pnpm run test
  ```
- [ ] Run `pnpm run test`:
  ```bash
  pnpm run test
  ```
  Expected: exits 0 — zero test files found means zero failures; coverage report may show 0%
  (tests are written in Task 2; this confirms the runner works)

### 3. Refactor Phase

- [ ] Confirm `vite.config.js` still produces a valid Vite build:
  ```bash
  pnpm run build
  ```
  Expected: exits 0 (the `test` block in vite.config.js should not affect the build)
- [ ] Confirm `pnpm run lint` still exits 0
- [ ] Confirm `src/tests/setup.js` is excluded from the coverage report (via the `exclude` list)

## Quality Assurance Mechanisms

- Vitest coverage (`pnpm run test`) — Enforces: test runner works; coverage config active — Config: `vite.config.js > test.coverage`
- Build success gate (`pnpm run build`) — Enforces: vite.config.js `test` block does not break build — Config: `vite.config.js`
- GitHub Actions matrix (Node 18.x, 20.x, 22.x) — Enforces: test step passes on all Node versions — Config: `.github/workflows/default.yml`

## Operation Verification Methods

- **Verification method**: Run `pnpm run test` and confirm it exits 0 (no test files = no failures).
  Confirm `src/tests/setup.js` exists. Confirm `vite.config.js` contains a `test` block. Push the
  branch and confirm the GitHub Actions `default.yml` workflow includes and passes the `Test` step.
- **Success criteria**:
  - `pnpm run test` exits 0
  - `src/tests/setup.js` exists with all four mocks
  - `vite.config.js` has `test` block with coverage threshold at 95%
  - `pnpm run build` still exits 0
  - `default.yml` CI workflow includes `pnpm run test` step
- **Failure response**: If `pnpm run test` fails with a jsdom or module resolution error, check
  that `jsdom` is installed (`pnpm list jsdom`) and that the `environment: 'jsdom'` key is present
  in the `test` block. If `vi.mock('register-service-worker')` causes an error, check that the
  package exists in `dependencies` and the mock syntax is correct for Vitest's auto-mock.
- **Verification level**: L2 (test runner exits 0) + L3 (build still passes)

## Completion Criteria

- [ ] `vitest`, `@vue/test-utils@^2`, `jsdom`, `@vitest/coverage-v8` in `devDependencies`
- [ ] `package.json` scripts includes `"test": "vitest run --coverage"`
- [ ] `vite.config.js` contains `test` block with `environment: 'jsdom'`, `setupFiles`, and
  coverage threshold at 95%
- [ ] `src/tests/setup.js` exists with mocks for `window.matchMedia`, `window.AudioContext`,
  `window.open`, and `register-service-worker`
- [ ] `pnpm run test` exits 0
- [ ] `pnpm run build` exits 0
- [ ] `.github/workflows/default.yml` includes `pnpm run test` step

## Notes

- Impact scope: `package.json`, `pnpm-lock.yaml`, `vite.config.js`, `src/tests/setup.js`,
  `.github/workflows/default.yml`
- Scope boundary: Do NOT write any test files in this task — that is Task 2. This task only
  establishes the scaffold. Do NOT modify any `src/**/*.vue` or `src/**/*.js` files.
- `src/registerServiceWorker.js` is excluded from coverage because it requires a real service
  worker browser environment that jsdom cannot provide.
- `window.open` mock uses `vi.fn()` rather than `Object.defineProperty` if jsdom already defines
  it as a no-op — adjust the approach based on what jsdom version provides.
