# Phase 4 Completion Checklist

Phase: 4 — Quality Assurance Final Gate
Tasks covered: Phase 4 QA task

## All Task Completion Checks

- [ ] All Phase 1 checks passed (see phase1-completion.md)
- [ ] All Phase 2 checks passed (see phase2-completion.md)
- [ ] All Phase 3 checks passed (see phase3-completion.md)
- [ ] Phase 4 QA task completed: all ACs verified

## Final Acceptance Gate — Design Doc AC Checklist

### AC-BUILD

- [ ] AC-BUILD-01: `pnpm run dev` starts without errors; serves at `http://localhost:5173`
- [ ] AC-BUILD-02: `pnpm run build` produces `dist/` with `index.html` and hashed assets; no Webpack/Babel in deps
- [ ] AC-BUILD-03: `pnpm run lint` exits 0; zero errors under `vue3-recommended` + `plugin:security/recommended`
- [ ] AC-BUILD-04: `pnpm run test` exits 0; all tests pass; coverage >= 95%
- [ ] AC-BUILD-05: GitHub Actions `Build and Deploy` workflow passes on push to `master`

### AC-VUE

- [ ] AC-VUE-01: Vue 3 app mounts at `#app`; no Vue warnings in browser console
- [ ] AC-VUE-02: All four components render without errors
- [ ] AC-VUE-03: "Music" button opens Spotify `<dialog>`
- [ ] AC-VUE-04: "Careers" button opens Projects `<dialog>`
- [ ] AC-VUE-05: External link buttons open in new tab without jQuery
- [ ] AC-VUE-06: All `goToUrl` calls pass exactly one argument

### AC-JQUERY

- [ ] AC-JQUERY-01: Zero jQuery import statements in `src/`
- [ ] AC-JQUERY-02: `package.json` has no `jquery` or `@types/jquery` entry
- [ ] AC-JQUERY-03: `grep -c "jQuery" dist/assets/*.js` returns 0

### AC-DELETE

- [ ] AC-DELETE-01: `src/http.js` does not exist
- [ ] AC-DELETE-02: `src/components/UpdatesComponent.vue` does not exist
- [ ] AC-DELETE-03: `ProfileComponent.vue` does not import or reference `UpdatesComponent`

### AC-THEME

- [ ] AC-THEME-01: `prefers-color-scheme: dark` → body gets `dark` class; logo src = white variant
- [ ] AC-THEME-02: Runtime toggle → `dark` class and logo update without page reload
- [ ] AC-THEME-03: Audio `play` event → body gets `breathing-visualizer` class

### AC-BS

- [ ] AC-BS-01: Bootstrap 5 CSS applied; no Bootstrap 4 classes in Sass vendor layer
- [ ] AC-BS-02: `pnpm run build` produces no Sass deprecation errors
- [ ] AC-BS-03: Zero Bootstrap 4-exclusive utility class strings in `src/**/*.vue`

### AC-SEC

- [ ] AC-SEC-01: `src/http.js` does not exist (XSS sink eliminated)
- [ ] AC-SEC-02: `pnpm run lint` passes with zero security-rule violations
- [ ] AC-SEC-03: No `innerHTML` assignments in any `src/` file
- [ ] AC-SEC-04: All `window.open` calls include `'noopener,noreferrer'` as third argument

### AC-TEST

- [ ] AC-TEST-01: Unit tests exist for all six targets (App, Profile, Projects, Spotify, theme, visualizer)
- [ ] AC-TEST-02: Vitest coverage >= 95% lines and >= 95% branches
- [ ] AC-TEST-03: All tests pass in CI without network access

## Final Commands

```bash
pnpm run lint && pnpm run build && pnpm run test
# All three must exit 0
```

```bash
grep -c "jQuery" dist/assets/*.js
# Must return 0 for every file
```

```bash
pnpx depcheck
# No unused dependencies
```

## Release Decision

When all ACs above are checked, raise the release PR from `develop` to `master` to trigger the
`gh-pages.yml` deploy workflow and publish the migrated portfolio to GitHub Pages.
