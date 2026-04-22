# Portfolio Project — Agent Instructions

## Stack (Mandatory)

- **Build tool:** Vite (not Vue CLI)
- **Test runner:** Vitest v2 (not Jest) — compatible with Vite v5
- **Node target:** 22 LTS minimum (Node 20 EOL 2026-04-30)
- **CSS framework:** Bootstrap 5
- **Package manager:** pnpm (never npm or yarn)

## Dependency Removal Order (Mandatory)

Before running `pnpm remove <package>`, grep all source files and confirm zero
remaining imports. Premature package removal breaks the Vite build at dev-server
startup. Order: migrate every file first, then remove the package.

## jQuery Migration Rules (Mandatory)

jQuery has been fully removed from this project. Do not re-introduce it.

When removing a jQuery `.show()`, `.hide()`, or `.toggle()` call from any file,
search SCSS/CSS for a corresponding `display: none` or `display: block` on the
same selector and update it in the same commit. Failure to do so produces a
blank page that is only caught at UI QA.

## Dialog Animation Rules

`showModal()` natively sets `[open]` on the `<dialog>` element. Target it with
CSS directly — do not add or remove a JS class to trigger animations:

```css
/* correct */
dialog.nes-dialog[open] {
  animation: nes-open 0.4s steps(8) forwards;
}

/* wrong — unnecessary JS coupling */
/* dialog.nes-dialog.is-open { ... } */
```

CSS-only animation changes do not affect Vitest JS coverage. Verify dialog
animations in the browser via DevTools (check `animationName`, duration, and
timing function).

## Environment Variables (Mandatory)

This project uses Vite. Do not use `process.env` anywhere in source files:

| Wrong (webpack/Vue CLI) | Correct (Vite)             |
| ----------------------- | -------------------------- |
| `process.env.NODE_ENV`  | `import.meta.env.MODE`     |
| `process.env.BASE_URL`  | `import.meta.env.BASE_URL` |
| `process.env.VUE_APP_*` | `import.meta.env.VITE_*`   |

## ESLint Config

The project uses `.eslintrc.json` (legacy flat config format). The correct
extends identifier for `eslint-plugin-security` v3 is:

```json
"extends": ["plugin:security/recommended-legacy"]
```

Do not use `plugin:security/recommended` — that targets the new flat config API.

## PWA / vite-plugin-pwa

`<link rel="manifest">` is not injected during `vite dev`. This is expected
behavior. Only verify manifest injection against a production build
(`vite build`) or `vite preview`.

## Sass Build Warnings

Bootstrap SCSS ships legacy `@import` syntax. The resulting Sass deprecation
warnings in build output are non-blocking.
`css.preprocessorOptions.scss.quietDeps: true` in `vite.config.js` suppresses
them. Do not treat these warnings as failures.

## Test Coverage Floor

Baseline: 37 tests, 100% line/branch/function/statement coverage (Vitest v2). Do
not ship changes that regress coverage below 100%.

### Vue Component Coverage Patterns

To achieve 100% coverage on Vue components, test these commonly missed branches:

1. **Template @error handlers:** Trigger with `await img.trigger('error')`
2. **v-else branches:** Mount with empty/null data to trigger else conditions
3. **Method fallbacks:** Pass unknown/empty values to exercise default cases
4. **Optional chaining:** Test with null/undefined nested objects
5. **Event emissions:** Verify with `wrapper.emitted('eventName')`

Example test structure:

```javascript
// Test error handler
const img = wrapper.find('img');
await img.trigger('error');
expect(wrapper.vm.imageError).toBe(true);

// Test v-else branch
const wrapper = mount(Component, { props: { items: [] } });
expect(wrapper.find('.empty-state').exists()).toBe(true);

// Test method fallback
expect(wrapper.vm.getLabel('UNKNOWN')).toBe('Unknown');

// Test event emission
await button.trigger('click');
expect(wrapper.emitted('close')).toHaveLength(1);
```

## Package Manager Commands

**Always use pnpm** — never npm or yarn:

| npm command        | pnpm equivalent     |
| ------------------ | ------------------- |
| `npm install`      | `pnpm install`      |
| `npm run test`     | `pnpm run test`     |
| `npm run dev`      | `pnpm run dev`      |
| `npm run build`    | `pnpm run build`    |
| `npm add <pkg>`    | `pnpm add <pkg>`    |
| `npm remove <pkg>` | `pnpm remove <pkg>` |

## Git Rules (Mandatory)

- Never run `git commit` or `git push` — commits require GPG signing by the user
- Only stage changes with `git add`; user commits manually in their own terminal
- Branch flow: feature/\* → develop → master
