# Phase 2 Completion Checklist

Phase: 2 — Dead Code Deletion + jQuery Removal (PR 2)
Tasks covered: Task 1, Task 2, Task 3, Task 4, Task 5

## All Task Completion Checks

- [ ] Task 1 completed: `src/http.js` and `src/components/UpdatesComponent.vue` deleted; `jquery` removed from `package.json`
- [ ] Task 2 completed: `main.js` uses `createApp`; `ProfileComponent` and `ProjectsComponent` use `window.open`; `registerServiceWorker.js` uses `import.meta.env`
- [ ] Task 3 completed: `theme.js` and `visualizer.js` use native `classList`; no jQuery imports
- [ ] Task 4 completed: `.eslintrc.json` in place; `pnpm run lint` exits 0 with zero errors
- [ ] Task 5 completed: Bootstrap 4 utility class audit clean

## Phase 2 Acceptance Gate

Run each check before marking Phase 2 complete and raising PR 2 for review.

### Dead Code Verification

```bash
ls src/http.js
# Expected: No such file or directory

ls src/components/UpdatesComponent.vue
# Expected: No such file or directory
```

### jQuery Removal Verification

```bash
grep -r "from 'jquery'\|import \$" src/
# Expected: no output

grep -c "jQuery" dist/assets/*.js
# Expected: 0 on every file
```

### process.env Removal

```bash
grep -r "process\.env" src/
# Expected: no output
```

### Build and Lint

```bash
pnpm run lint
# Expected: exits 0, zero errors

pnpm run build
# Expected: exits 0, no Sass errors, dist/index.html exists
```

### Bootstrap 4 Class Audit

```bash
grep -rn "mr-\|ml-\|float-left\|float-right\|text-left\|text-right\|sr-only" src/**/*.vue
# Expected: no output
```

### Security Checks

```bash
grep -r "innerHTML" src/
# Expected: no output

grep -r "window.open" src/
# Check every match includes 'noopener,noreferrer' as third argument
```

### Visual Browser Check

Open `pnpm run dev` and verify:
- [ ] Profile card renders correctly
- [ ] No Vue warnings in browser console
- [ ] "Music" button opens Spotify `<dialog>`
- [ ] "Careers" button opens Projects `<dialog>`
- [ ] Dialogs can be closed (Escape key or close button)
- [ ] External link buttons open in a new tab
- [ ] Dark theme applies when `prefers-color-scheme: dark` is set

## Gate Decision

All checks above must pass before Phase 3 begins. If `grep -c "jQuery" dist/assets/*.js` returns
non-zero, trace the remaining jQuery reference to its source and remove it.
