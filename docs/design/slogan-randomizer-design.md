# Slogan Randomizer Design Document

## Overview

This document covers the design for a slogan randomizer feature that displays
dynamic text below the profile logo. The feature shows a default slogan on first
visit, then randomly selects from an enabled pool on subsequent page reloads.
State persistence is handled via localStorage following the existing theme.js
pattern. The implementation includes a typed data store, TypeScript interfaces,
component integration, and comprehensive test coverage.

## Design Summary (Meta)

```yaml
design_type: 'new_feature'
risk_level: 'low'
complexity_level: 'low'
complexity_rationale: |
  (1) Requirements/ACs: Straightforward data structure, simple randomization logic,
  localStorage persistence following existing patterns, static display without animation.
  (2) Constraints/Risks: Must maintain 100% test coverage, integrate with existing
  ProfileComponent.vue structure, follow established data store patterns.
main_constraints:
  - '100% Vitest coverage floor must not regress (100%
    lines/branches/functions/statements)'
  - 'Must follow existing data store pattern (typed array export with spec
    tests)'
  - 'Must use theme.js pattern for localStorage persistence'
  - 'Static display only — no animation per user constraint'
  - 'Exactly one default slogan must exist in the dataset'
  - 'CSS container: min-width 320px, max-width 400px'
  - 'Display below logo in ProfileComponent (revamp profile-list class)'
biggest_risks:
  - 'Default slogan uniqueness validation — must enforce exactly one default:
    true'
  - 'Japanese text rendering — must ensure proper UTF-8 encoding and font
    support'
  - 'Long lyrics display — must handle text overflow gracefully within container
    bounds'
unknowns:
  - 'Optimal container padding for mixed Japanese/English text lengths'
  - 'Browser behavior for localStorage in private browsing mode'
```

## Background and Context

### Prerequisite ADRs

- `docs/adr/ADR-0001-vue3-vite-migration.md` — Establishes Vite as the build
  tool, Vitest v2 as test runner, Vue 3 as frontend framework, and the component
  architecture patterns. This Design Doc inherits those toolchain decisions.

No common ADR exists for data store patterns or localStorage state management in
this project. The feature follows existing patterns observed in careers.ts and
projects.ts data stores.

### Agreement Checklist

#### Scope

- [x] Create `src/data/slogans.ts` — new slogan data store with 7 entries
- [x] Create `src/types/index.ts` — add Slogan interface and DefaultSlogan
      validation type
- [x] Create `src/tests/slogans.spec.js` — unit tests for slogan data and
      selection logic
- [x] Modify `src/components/ProfileComponent.vue` — integrate slogan display
      below logo
- [x] Modify `src/assets/scss/layout/_nes.scss` — add slogan container styles

#### Non-Scope (Explicitly not changing)

- [x] No animation effects — excluded per user constraint (static display only)
- [x] No changes to existing dialog components (CareersComponent,
      ProjectsComponent, etc.)
- [x] No changes to existing theme dark/light toggle (unchanged)
- [x] No changes to vite.config.js (no build config changes required)
- [x] No changes to package.json (no dependency changes required)
- [x] No external API calls — slogans are static data only
- [x] No admin interface for slogan management

#### Constraints

- [x] Parallel operation: Not applicable (additive feature, no existing slogan
      system)
- [x] Backward compatibility: Required — feature defaults to showing default
      slogan, no breaking changes to existing visual behavior
- [x] Performance measurement: Not required (static data, no computational
      complexity)
- [x] Accessibility: Noted — static text display, no motion or interaction
      required

#### Applicable Standards

- [x] Data store files placed in `src/data/` with typed array export
      `[explicit]`
  - Source: `src/data/careers.ts:1-57`, `src/data/projects.ts:1-235` — both
    export typed arrays
  - Confirmed: Yes — `src/data/slogans.ts` will follow this pattern
- [x] TypeScript interfaces defined in `src/types/index.ts` `[explicit]`
  - Source: `src/types/index.ts:1-83` — Career, Project, Skill interfaces
  - Confirmed: Yes — Slogan interface will be added
- [x] Test files in `src/tests/` with `.spec.js` suffix `[explicit]`
  - Source: `src/tests/careers.spec.js`, `src/tests/projects.spec.js`
  - Confirmed: Yes — `src/tests/slogans.spec.js` follows this pattern
- [x] Data store spec tests validate array structure, field types, and
      relationships `[implicit]`
  - Evidence: `src/tests/careers.spec.js:1-58`,
    `src/tests/projects.spec.js:1-113`
  - Confirmed: Yes — slogans.spec.js will validate slogan structure and default
    uniqueness
- [x] Vue components use Options API with data() and methods `[implicit]`
  - Evidence: `src/components/ProfileComponent.vue:1-133`
  - Confirmed: Yes — ProfileComponent will use existing Options API pattern
- [x] localStorage key naming follows existing pattern `[implicit]`
  - Evidence: `src/theme.js:21` — `const CRT_STORAGE_KEY = 'crt-enabled';`
  - Confirmed: Yes — will use `slogan-initialized` key following same convention
- [x] SCSS layout styles placed in `src/assets/scss/layout/_nes.scss`
      `[explicit]`
  - Source: `src/assets/scss/layout/_nes.scss:1-28`
  - Confirmed: Yes — slogan styles will be added to existing \_nes.scss

#### Quality Assurance Mechanisms

- [x] **Vitest v2** — Enforces: unit test suite (100% coverage) — Config:
      `vite.config.js:51-62` — Covers: `src/**/*.{js,vue}` — Status: `adopted`
      (run as `pnpm test`; must pass before merge)
- [x] **ESLint** (`plugin:vue/vue3-recommended` +
      `plugin:security/recommended-legacy`) — Enforces: Vue 3 template rules and
      Node.js security patterns — Config: `.eslintrc.json` — Covers:
      `src/**/*.{js,vue}` — Status: `adopted` (must pass with `pnpm run lint`)
- [x] **Prettier** — Enforces: code formatting consistency — Config:
      `.prettierrc.json` — Covers: `src/**/*.{js,vue,scss,css,json,md}` —
      Status: `adopted` (run as `pnpm run format:check`)
- [x] **Stylelint** — Enforces: SCSS/CSS standards — Config: `.stylelintrc.json`
      — Covers: `src/**/*.{scss,css}` — Status: `adopted` (SCSS changes must
      pass stylelint)
- [x] **Vite build** — Enforces: module graph correctness, SCSS compilation,
      asset bundling — Config: `vite.config.js` — Covers: entire `src/` tree —
      Status: `adopted` (run as `pnpm build`; must exit 0)
- [x] **Coverage thresholds** (`lines/branches/functions: 95`) — Config:
      `vite.config.js:58` — Covers: `src/**/*.{js,vue}` — Status: `adopted`
      (target is 100%; must verify with `pnpm test`)
- [x] **Default slogan uniqueness constraint** — Enforces: exactly one slogan
      has `default: true` — Source: Design Doc requirements — Covers:
      `src/data/slogans.ts` — Status: `adopted` (enforced via spec test)

### Problem to Solve

The profile section currently displays static placeholder text below the logo.
This creates a monotonous experience for returning visitors. The portfolio needs
dynamic, personality-driven content that reflects the developer's character and
cultural background (Japanese text inclusion). The feature should surprise and
engage users with varied content while maintaining a consistent first
impression.

### Current Challenges

- The profile-list class currently contains hardcoded static text
- No existing mechanism for rotating content based on visit state
- Need to balance first-visit experience (default) vs. returning visitor
  experience (randomized)
- Must handle mixed Japanese and English text with varying lengths
- Need to filter out disabled slogans from the randomization pool
- Must ensure exactly one default slogan exists for predictable first-visit
  behavior

### Requirements

#### Functional Requirements

- FR-1: The system shall display a default slogan on first visit (no
  localStorage state).
- FR-2: The system shall randomly select a slogan from the enabled pool on page
  reloads after the first visit.
- FR-3: The system shall persist the "initialized" state via localStorage to
  distinguish first visit from subsequent visits.
- FR-4: The system shall exclude slogans with `enabled: false` from the
  randomization pool.
- FR-5: The system shall respect the `randomize` per-slogan flag — only slogans
  with `randomize: true` are eligible for random selection.
- FR-6: The default slogan must be unique — exactly one slogan in the dataset
  shall have `default: true`.
- FR-7: The slogan display shall be static — no animation, fade, or transition
  effects.
- FR-8: The slogan container shall have min-width 320px and max-width 400px.
- FR-9: The slogan shall display below the logo in ProfileComponent, replacing
  the current profile-list content.

#### Non-Functional Requirements

- **Performance**: Static data file, no API calls; slogan selection is O(n)
  where n=7, negligible impact on render time.
- **Maintainability**: Data-driven approach allows adding/modifying slogans
  without component changes; clear TypeScript interfaces.
- **Reliability**: Graceful fallback to default slogan if localStorage is
  unavailable; validation ensures data integrity (default uniqueness).
- **Accessibility**: Static text display; no motion or flashing content; proper
  contrast maintained via existing theme system.
- **Compatibility**: Works across all browsers supporting localStorage and CSS
  viewport units (IE11+ baseline, but project targets evergreen browsers).

## Acceptance Criteria (AC) - EARS Format

### Slogan Display

- [ ] **When** the user visits the page for the first time (no localStorage
      state), the system shall display the default slogan:
      "こんにちは！サイです！よろしく お願いします!"
- [ ] **When** the user reloads the page after the first visit, the system shall
      display a randomly selected slogan from the enabled, randomize-eligible
      pool.
- [ ] **While** the slogan container is displayed, the system shall constrain
      its width between 320px (min) and 400px (max).
- [ ] **While** a slogan has `enabled: false`, the system shall exclude it from
      the randomization pool.
- [ ] **While** a slogan has `randomize: false`, the system shall exclude it
      from the randomization pool (but it may still be the default).
- [ ] **When** localStorage is unavailable (private browsing, quota exceeded),
      the system shall gracefully show the default slogan on every visit.

### Data Integrity

- [ ] **Given** the slogans data file, **when** validation runs, the system
      shall verify that exactly one slogan has `default: true`.
- [ ] **Given** the slogans data file, **when** validation runs, the system
      shall verify that every slogan has required fields (message, randomize,
      enabled, default).
- [ ] **Given** the slogans data file, **when** validation runs, the system
      shall verify that message fields are non-empty strings.

### Visual Design

- [ ] **While** the slogan is displayed, the system shall render it below the
      logo within the ProfileComponent.
- [ ] **While** the slogan is displayed, the system shall not apply any
      animation, fade, or transition effects.
- [ ] **While** the slogan container is rendered, the system shall apply
      appropriate padding and text alignment for readability.

## Existing Codebase Analysis

### Implementation Path Mapping

| Type                 | Path                                  | Description                                                       |
| -------------------- | ------------------------------------- | ----------------------------------------------------------------- |
| New (create)         | `src/data/slogans.ts`                 | New slogan data store with 7 typed entries                        |
| New (create)         | `src/tests/slogans.spec.js`           | Unit tests for slogan data structure and selection logic          |
| Modify               | `src/types/index.ts:1-83`             | Add Slogan interface and DefaultSlogan validation type            |
| Modify               | `src/components/ProfileComponent.vue` | Add slogan display logic below logo, replace profile-list content |
| Modify               | `src/assets/scss/layout/_nes.scss`    | Add slogan container styles (min/max width, padding, alignment)   |
| Existing (read-only) | `src/data/careers.ts`                 | Reference for data store pattern (typed array export)             |
| Existing (read-only) | `src/data/projects.ts`                | Reference for data store pattern (typed array export)             |
| Existing (read-only) | `src/tests/careers.spec.js`           | Reference for spec test patterns                                  |
| Existing (read-only) | `src/tests/projects.spec.js`          | Reference for spec test patterns                                  |
| Existing (read-only) | `src/theme.js:21-31`                  | Reference for localStorage key naming pattern                     |

### Integration Points

- **Integration Target**: ProfileComponent.vue — display location below logo
- **Invocation Method**: ProfileComponent data() method returns selected slogan;
  mounted() hook checks localStorage and selects appropriate slogan
- **Integration Target**: localStorage API — state persistence
- **Invocation Method**: localStorage.getItem('slogan-initialized') on mount;
  localStorage.setItem('slogan-initialized', 'true') after first display

### Code Inspection Evidence

| File                                  | Line(s) | Relevance                                                                    |
| ------------------------------------- | ------- | ---------------------------------------------------------------------------- |
| `src/data/careers.ts`                 | 1-57    | Data store pattern reference: typed array export, JSDoc header               |
| `src/data/projects.ts`                | 1-235   | Data store pattern reference: typed array export, import from types          |
| `src/types/index.ts`                  | 1-83    | Target file for Slogan interface addition                                    |
| `src/components/ProfileComponent.vue` | 54-133  | Target template for slogan integration; profile-list class to revamp         |
| `src/assets/scss/layout/_nes.scss`    | 1-28    | Target file for slogan container styles                                      |
| `src/tests/careers.spec.js`           | 1-58    | Spec test pattern: data validation, type checking, relationship verification |
| `src/tests/projects.spec.js`          | 1-113   | Spec test pattern: count assertions, industry/category validation            |
| `src/tests/ProfileComponent.spec.js`  | 1-148   | Component test pattern: mounting, DOM queries, event handling                |
| `src/theme.js`                        | 21-31   | localStorage pattern reference: key naming, getItem/setItem usage            |
| `src/tests/theme.spec.js`             | 1-131   | localStorage test pattern: mocking, state verification                       |

### Fact Disposition Table

No Codebase Analysis input (`focusAreas`) was provided for this session. The
table below is populated from the manual investigation above as a completeness
record.

| Fact ID | Focus Area                          | Disposition | Rationale                                                 | Evidence                                    |
| ------- | ----------------------------------- | ----------- | --------------------------------------------------------- | ------------------------------------------- |
| FA-001  | `ProfileComponent.vue` profile-list | transform   | Replace static content with dynamic slogan display        | `src/components/ProfileComponent.vue:67-70` |
| FA-002  | Data store pattern (careers.ts)     | preserve    | Follow existing typed array export pattern for slogans.ts | `src/data/careers.ts:10`                    |
| FA-003  | Type definitions (types/index.ts)   | transform   | Add Slogan interface to existing type definitions         | `src/types/index.ts:1-83`                   |
| FA-004  | localStorage usage (theme.js)       | preserve    | Use same key naming and API pattern for slogan state      | `src/theme.js:21-31`                        |
| FA-005  | Test coverage 100%                  | preserve    | All new code must have 100% test coverage                 | `vite.config.js:58`                         |
| FA-006  | NES.css integration                 | preserve    | Slogan styling follows existing NES.css patterns          | `src/assets/scss/layout/_nes.scss:1-28`     |

## Design

### Change Impact Map

```yaml
Change Target: Slogan Randomizer Feature
Direct Impact:
  - src/data/slogans.ts (new file — slogan data store with 7 entries)
  - src/types/index.ts (add Slogan interface and DefaultSlogan type)
  - src/components/ProfileComponent.vue (add slogan display logic, replace
    profile-list)
  - src/assets/scss/layout/_nes.scss (add slogan container styles)
  - src/tests/slogans.spec.js (new file — slogan data and logic tests)
  - src/tests/ProfileComponent.spec.js (update tests for new slogan display)
Indirect Impact:
  - ProfileComponent template structure changes (profile-list class revamp)
  - First visit vs. returning visitor experience differentiation
No Ripple Effect:
  - CareersComponent.vue (no changes required)
  - ProjectsComponent.vue (no changes required)
  - SpotifyComponent.vue (no changes required)
  - CareerDetailsComponent.vue (no changes required)
  - ProjectDetailsComponent.vue (no changes required)
  - Existing dialog animations (nes-open, breathing-visualizer unchanged)
  - Existing theme dark/light toggle (unchanged)
  - vite.config.js (no build config changes required)
  - package.json (no dependency changes required)
```

### Interface Change Matrix

| Existing Operation          | New Operation            | Conversion Required | Adapter Required | Compatibility Method                                                |
| --------------------------- | ------------------------ | ------------------- | ---------------- | ------------------------------------------------------------------- |
| Static profile-list content | Dynamic slogan display   | No                  | Not Required     | Replace template content with dynamic binding                       |
| No localStorage for slogans | localStorage persistence | No                  | Not Required     | New localStorage key `slogan-initialized`; defaults to show default |
| No slogan data store        | slogans.ts data module   | No                  | Not Required     | New module following existing data store pattern                    |

### Architecture Overview

```mermaid
graph TD
    A["Page Load"] -->{"localStorage check"}
    B["First Visit"] -->|"show default"| C["Default Slogan<br/>こんにちは！サイです！"]
    D["Returning Visit"] -->|"random selection"| E["Random Slogan<br/>from enabled pool"]
    E --> F["Filter: enabled=true"]
    F --> G["Filter: randomize=true"]
    G --> H["Random selection"]
    C --> I["Display in<br/>ProfileComponent"]
    H --> I
    I --> J["localStorage.setItem<br/>slogan-initialized"]

    style C fill:#1a1a2e,color:#fff
    style I fill:#16213e,color:#fff
```

The slogan randomizer uses a simple state machine: first visit shows the
default, subsequent visits show a random selection from the enabled pool. State
is managed via localStorage, and the display is integrated into ProfileComponent
below the logo.

### Data Flow

```
Page Load
  → ProfileComponent mounted hook
    → Check localStorage.getItem('slogan-initialized')
      → If null: select default slogan (default: true)
        → Display default slogan
        → localStorage.setItem('slogan-initialized', 'true')
      → If exists: select random slogan
        → Filter slogans: enabled === true && randomize === true
        → Random selection from filtered pool
        → Display selected slogan

Data Store (slogans.ts)
  → Export typed array: Slogan[]
  → Structure: { message, randomize, enabled, default }
  → Validation: exactly one default: true

Component Display
  → ProfileComponent template
    → Replace profile-list content
    → Apply slogan container CSS
    → Render static text (no animation)
```

### Integration Points List

| Integration Point       | Location                       | Old Implementation  | New Implementation      | Switching Method       | Verification Method                               |
| ----------------------- | ------------------------------ | ------------------- | ----------------------- | ---------------------- | ------------------------------------------------- |
| Slogan display location | `ProfileComponent.vue`         | Static profile-list | Dynamic slogan binding  | Template replacement   | Visual QA: verify slogan appears below logo       |
| First visit detection   | `ProfileComponent.vue mounted` | None                | localStorage key check  | localStorage API       | Clear localStorage, reload, verify default shown  |
| Random selection        | `ProfileComponent.vue methods` | None                | Filter + Math.random()  | Method call            | Multiple reloads, verify different slogans appear |
| Data store              | `src/data/slogans.ts`          | None                | Typed array export      | ES module import       | Import in component, verify data structure        |
| Type definitions        | `src/types/index.ts`           | None                | Slogan interface        | TypeScript compilation | `pnpm build` exits 0, no type errors              |
| Container styling       | `_nes.scss`                    | profile-list styles | Slogan container styles | CSS class addition     | Visual QA: verify min/max width constraints       |

### Main Components

#### `slogans.ts` — Slogan Data Store

- **Responsibility**: Provides the dataset of slogans with metadata for
  selection logic.
- **Interface**:

  ```typescript
  import { Slogan } from '@/types/index.ts';

  export const slogans: Slogan[] = [
    {
      message: 'こんにちは！サイです！よろしく お願いします!',
      randomize: false,
      enabled: true,
      default: true,
    },
    // 6 additional slogans with varying randomize/enabled settings
  ];

  export const defaultSlogan = slogans.find((s) => s.default === true);

  export const getRandomizableSlogans = (): Slogan[] =>
    slogans.filter((s) => s.enabled === true && s.randomize === true);
  ```

- **Dependencies**: Slogan type from `src/types/index.ts`.

#### `types/index.ts` — Slogan Interface

- **Responsibility**: Defines the TypeScript interface for slogan data
  structure.
- **Interface**:

  ```typescript
  /** Slogan entry for profile display */
  export interface Slogan {
    /** Display text (supports Japanese, English, mixed content) */
    message: string;
    /** Whether this slogan participates in randomization */
    randomize: boolean;
    /** Whether this slogan is available for display */
    enabled: boolean;
    /** Whether this is the default (first-visit) slogan; exactly one must be true */
    default: boolean;
  }
  ```

- **Dependencies**: None (self-contained interface).

#### `ProfileComponent.vue` — Slogan Integration

- **Responsibility**: Displays the appropriate slogan based on visit state.
- **Interface**:

  ```vue
  <script>
    import {
      slogans,
      defaultSlogan,
      getRandomizableSlogans,
    } from '@/data/slogans';

    const SLOGAN_INITIALIZED_KEY = 'slogan-initialized';

    export default {
      name: 'ProfileComponent',
      // ... existing component registration
      data() {
        return {
          app_version: packageInfo.version,
          currentSlogan: '',
        };
      },
      mounted() {
        this.selectSlogan();
      },
      methods: {
        selectSlogan() {
          const initialized = localStorage.getItem(SLOGAN_INITIALIZED_KEY);
          if (!initialized) {
            // First visit: show default
            this.currentSlogan = defaultSlogan?.message || '';
            localStorage.setItem(SLOGAN_INITIALIZED_KEY, 'true');
          } else {
            // Returning visit: random selection
            const pool = getRandomizableSlogans();
            if (pool.length > 0) {
              const randomIndex = Math.floor(Math.random() * pool.length);
              this.currentSlogan = pool[randomIndex].message;
            } else {
              this.currentSlogan = defaultSlogan?.message || '';
            }
          }
        },
        // ... existing methods
      },
    };
  </script>

  <template>
    <!-- ... existing template ... -->
    <div class="slogan-container">
      {{ currentSlogan }}
    </div>
    <!-- ... rest of template ... -->
  </template>
  ```

- **Dependencies**: slogans data module, localStorage API.

#### `_nes.scss` — Slogan Container Styles

- **Responsibility**: Defines the visual appearance of the slogan container.
- **Interface**:

  ```scss
  .slogan-container {
    min-width: 320px;
    max-width: 400px;
    margin: 0 auto;
    padding: 0.5rem 1rem;
    text-align: center;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  // Dark mode support
  body.dark .slogan-container {
    color: var(--text-color-dark, #fff);
  }
  ```

- **Dependencies**: CSS custom properties from `_root.scss` for theming.

### Data Representation Decision

| Criterion             | Assessment | Reason                                                                               |
| --------------------- | ---------- | ------------------------------------------------------------------------------------ |
| Semantic Fit          | Yes        | Slogan is a distinct concept from Career/Project; dedicated interface is appropriate |
| Responsibility Fit    | Yes        | Slogan data is independent of other data stores                                      |
| Lifecycle Fit         | Yes        | Static data, no mutation during app lifecycle                                        |
| Boundary/Interop Cost | Low        | Single export, consumed only by ProfileComponent                                     |

**Decision**: New structure — Create dedicated Slogan interface rather than
extending existing types. The semantic meaning is distinct (personal branding
message vs. career/project history), and a dedicated type allows clear
validation rules (default uniqueness).

### Contract Definitions

```
Slogan Selection Contract:
  First Visit: localStorage.getItem('slogan-initialized') returns null
    → Display: slogan with default === true
    → Side Effect: localStorage.setItem('slogan-initialized', 'true')

  Returning Visit: localStorage.getItem('slogan-initialized') returns 'true'
    → Display: random selection from slogans where enabled === true AND randomize === true
    → Side Effect: None (state already initialized)

  Pool Exhaustion: If no slogans match enabled === true && randomize === true
    → Fallback: Display default slogan

  localStorage Unavailable: Graceful degradation to default slogan on every visit
```

### Data Contract

#### Slogan Selection (ProfileComponent.vue)

```yaml
Input:
  Type: 'localStorage state (string | null)'
  Preconditions: 'DOM must be ready; slogans data must be imported'
  Validation: 'None required — null check is sufficient'

Output:
  Type: 'string (selected slogan message)'
  Guarantees: |
    "First visit: returns default slogan message;
    Returning visit: returns random message from enabled, randomizable pool;
    Empty pool: falls back to default"
  On Error: |
    "localStorage unavailable: returns default slogan;
    Data error (no default): returns empty string"

Invariants:
  - 'Default slogan is always available (validated by spec tests)'
  - 'Random selection only from enabled && randomizable pool'
  - 'First visit always shows default, regardless of pool state'
```

### Field Propagation Map

| Field     | Boundary                              | Status      | Detail                                            |
| --------- | ------------------------------------- | ----------- | ------------------------------------------------- |
| message   | slogans.ts → ProfileComponent.vue     | preserved   | Direct string binding to template                 |
| randomize | slogans.ts → getRandomizableSlogans() | transformed | Used as filter predicate, not exposed to template |
| enabled   | slogans.ts → getRandomizableSlogans() | transformed | Used as filter predicate, not exposed to template |
| default   | slogans.ts → defaultSlogan            | transformed | Used to find default, only message is exposed     |

### State Transitions and Invariants

```yaml
State Definition:
  - uninitialized: localStorage key 'slogan-initialized' does not exist
  - initialized: localStorage key 'slogan-initialized' exists (value: 'true')

State Transitions:
  uninitialized → page load → display default → set localStorage → initialized
  initialized → page load → display random from pool → (no state change) → initialized

System Invariants:
  - 'Default slogan always exists and is unique (enforced by spec tests)'
  - 'Random selection only considers enabled && randomizable slogans'
  - 'First visit always shows default, never random selection'
  - 'localStorage state is write-once (never reset to uninitialized)'
```

### UI Error State Design

| Component      | Loading           | Empty                      | Error                      | Partial |
| -------------- | ----------------- | -------------------------- | -------------------------- | ------- |
| Slogan display | N/A (static data) | Show default if pool empty | Show default if data error | N/A     |

### Client State Design

| State Category  | State                                 | Management Method | Sync Strategy                                 |
| --------------- | ------------------------------------- | ----------------- | --------------------------------------------- |
| Visit state     | `slogan-initialized` localStorage key | localStorage API  | Set on first visit, read on subsequent visits |
| Selected slogan | `currentSlogan` component data        | Vue data()        | Computed on mounted, reactive to reloads      |

### Error Handling

| Error Category           | Example                                  | Detection               | Recovery Strategy                   | User Impact                                   |
| ------------------------ | ---------------------------------------- | ----------------------- | ----------------------------------- | --------------------------------------------- |
| localStorage unavailable | Private browsing, quota exceeded         | try/catch or null check | Graceful fallback to default slogan | Always sees default slogan (no randomization) |
| No default slogan        | Data error (should not happen)           | Spec test validation    | Fallback to empty string            | Empty slogan display (data bug)               |
| Empty randomization pool | All slogans disabled or non-randomizable | Pool length check       | Fallback to default slogan          | Sees default slogan instead of random         |
| Data import failure      | Module not found                         | Build error             | Build fails fast                    | Feature unavailable (caught at build time)    |

### Logging and Monitoring

Not applicable. Slogan randomizer is a client-side visual-only feature with no
server communication or analytics requirements.

## Implementation Plan

### Implementation Approach

**Selected Approach**: Vertical slice with dependency order — foundation
(types/data) → integration (component) → styling (SCSS) → verification (tests).

**Selection Reason**:

- The change has clear dependencies: types must exist before data store; data
  store must exist before component can import; component integration must exist
  before tests can verify.
- This is a new feature that adds capability rather than modifying existing
  complex logic, so a single vertical slice through all layers is appropriate.
- The horizontal slice approach (all types, then all data, then all components)
  would delay the first working integration point too long.

### Technical Dependencies and Implementation Order

#### Step 1: Add Slogan interface to `types/index.ts`

- **Technical Reason**: Type definition must exist before data store can use it.
- **Dependent Elements**: Step 2 (slogans.ts data store)
- **Deliverable**: Slogan interface with message, randomize, enabled, default
  fields

#### Step 2: Create `slogans.ts` data store with 7 entries

- **Technical Reason**: Data must exist before component can import and display.
- **Dependent Elements**: Step 3 (ProfileComponent integration), Step 4
  (slogans.spec.js)
- **Deliverable**: 7 slogans with correct structure, exactly one default: true

#### Step 3: Integrate slogan display into `ProfileComponent.vue`

- **Technical Reason**: Component is the consumer; needs data and selection
  logic.
- **Dependent Elements**: Step 5 (ProfileComponent.spec.js updates)
- **Deliverable**: selectSlogan() method, currentSlogan data property, template
  binding

#### Step 4: Add slogan container styles to `_nes.scss`

- **Technical Reason**: Styles can be added independently but should be in place
  before visual verification.
- **Dependent Elements**: Step 6 (browser visual QA)
- **Deliverable**: .slogan-container with min/max width, padding, alignment

#### Step 5: Create `slogans.spec.js` unit tests

- **Technical Reason**: Data store validation must verify structure and
  constraints.
- **Dependent Elements**: Step 7 (test suite verification)
- **Deliverable**: Tests for structure, default uniqueness, filter functions

#### Step 6: Update `ProfileComponent.spec.js` tests

- **Technical Reason**: Component behavior changed; tests must verify new
  functionality.
- **Dependent Elements**: Step 7 (test suite verification)
- **Deliverable**: Tests for slogan display, localStorage interaction, selection
  logic

#### Step 7: Build verification (`pnpm build`)

- **Technical Reason**: Confirms TypeScript compiles and Vite bundles correctly.
- **Prerequisites**: Steps 1-4 complete.
- **Success Criteria**: Build exits 0, no TypeScript or SCSS errors

#### Step 8: Test suite verification (`pnpm test --coverage`)

- **Technical Reason**: Confirms 100% coverage maintained and all tests pass.
- **Prerequisites**: Steps 1-6 complete.
- **Success Criteria**: All tests pass, coverage thresholds met (100% target)

#### Step 9: Browser visual QA

- **Technical Reason**: Container sizing and text rendering can only be verified
  visually.
- **Prerequisites**: Steps 7-8 complete (working build and tests).
- **Success Criteria**:
  - Slogan displays below logo
  - Container respects min/max width constraints
  - Japanese text renders correctly
  - Long lyrics display without overflow issues

### Migration Strategy

Not applicable. This is an additive feature. The slogan display replaces static
content but does not alter existing behavior. No migration steps are required
for users.

## Security Considerations

- **Authentication & Authorization**: N/A — CSS/visual-only feature; no new
  entry points or resource access.
- **Input Validation**: N/A — no user-controlled input is processed; slogans are
  static data defined in source code.
- **Sensitive Data Handling**: N/A — no data is read from or written to
  sensitive sources. localStorage key `slogan-initialized` stores only a boolean
  flag (`'true'`), not user data or PII.

## Test Boundaries

### Mock Boundary Decisions

| Component/Dependency | Mock? | Rationale                                                                                                                             |
| -------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------- |
| localStorage         | Yes   | jsdom supports localStorage but should be isolated per test; mock to ensure clean state and test both available/unavailable scenarios |
| Math.random()        | Yes   | Must mock to make random selection deterministic for testing                                                                          |
| slogans data         | No    | Test actual data to validate real constraints (default uniqueness)                                                                    |
| DOM rendering        | No    | jsdom provides full DOM API; test actual template rendering                                                                           |

### Data Layer Testing Strategy

- **Schema dependencies**: Slogan interface in `src/types/index.ts`
- **Test data approach**: Use actual slogans array from `src/data/slogans.ts` to
  validate real constraints (default uniqueness, required fields)
- **Mock limitations acknowledged**: localStorage and Math.random must be mocked
  to test selection logic deterministically

### Integration Verification Points

- **Vitest suite** (all tests): Verify existing JS/Vue behavior is unbroken. Run
  with `pnpm test`.
- **Slogan-specific tests**: Verify data structure, default uniqueness, and
  selection logic. Run with `pnpm test src/tests/slogans.spec.js`.
- **Component tests**: Verify ProfileComponent displays slogan correctly and
  interacts with localStorage. Run with
  `pnpm test src/tests/ProfileComponent.spec.js`.
- **Vite build**: Verify TypeScript compiles and CSS is emitted. Run with
  `pnpm build`.
- **Browser visual QA** (Chromium + Firefox): Verify slogan displays correctly
  per AC-001 through AC-006.

## Verification Strategy

### Correctness Proof Method

- **Correctness definition**:
  - First visit displays the default slogan:
    "こんにちは！サイです！よろしく お願いします!"
  - Subsequent visits display a random slogan from the enabled, randomizable
    pool.
  - The state persists across page reloads via localStorage.
  - Exactly one slogan has `default: true` (validated by tests).
  - Container respects min-width 320px and max-width 400px.
  - All existing tests pass at 100% coverage; new tests achieve 100% coverage.
- **Verification method**:
  1. `pnpm build` exits 0 (TypeScript and SCSS compile without error).
  2. `pnpm test --coverage` exits 0, all tests pass, coverage thresholds met.
  3. Browser QA: clear localStorage, verify default slogan; reload, verify
     random slogan; reload multiple times, verify different slogans appear.
- **Verification timing**: After all implementation steps complete, before
  raising a PR.

### Early Verification Point

- **First verification target**: `pnpm build` exits 0 after creating types,
  slogans.ts, and ProfileComponent modifications.
- **Success criteria**: No TypeScript compilation errors; Slogan interface is
  correctly imported and used.
- **Failure response**: Inspect type definitions — likely missing export or
  incorrect property types; fix and re-run build before proceeding.

### Output Comparison (When Replacing or Modifying Existing Behavior)

N/A — this design introduces entirely new behavior for the slogan display area.
The previous profile-list content was static and is being replaced; there is no
existing equivalent to compare against.

## Future Extensibility

- **Extension points**:
  - Slogan data structure can be extended with additional metadata (category,
    language) without breaking existing code.
  - Randomization algorithm can be enhanced (weighted selection, time-based
    rotation) by modifying getRandomizableSlogans() or adding new helper
    functions.
  - Container styles can be made theme-aware with CSS custom properties.
- **Known future requirements**: None identified.
- **Intentional limitations**:
  - No animation by design (static display requirement).
  - No user preference for slogan selection (randomized automatically).
  - No admin interface — slogans are code-defined, not user-managed.

## Alternative Solutions

### Alternative 1: Pinia Store for Slogan State

- **Overview**: Use Pinia store to manage slogan selection state reactively.
- **Advantages**: Centralized state management, reactive updates, easier testing
  with Pinia testing utilities.
- **Disadvantages**: Overkill for simple boolean state; adds dependency
  complexity; project doesn't currently use Pinia (only Vue Options API).
- **Reason for Rejection**: Simple component-level state is sufficient; follows
  existing codebase patterns (theme.js uses simple functions, not Pinia).

### Alternative 2: Session Storage Instead of localStorage

- **Overview**: Use sessionStorage instead of localStorage for visit tracking.
- **Advantages**: Automatically clears when tab closes; "first visit" per
  session.
- **Disadvantages**: User would see default slogan on every new tab/session,
  which contradicts the requirement to randomize on reloads.
- **Reason for Rejection**: localStorage is correct choice for persistent "first
  visit" detection across sessions.

### Alternative 3: Weighted Random Selection

- **Overview**: Add weight field to slogans for non-uniform random distribution.
- **Advantages**: Allows favoring certain slogans over others.
- **Disadvantages**: More complex algorithm; current requirement is uniform
  random; YAGNI.
- **Reason for Rejection**: Simple uniform random is sufficient for current
  scope.

### Alternative 4: Animation on Slogan Change

- **Overview**: Add fade or typewriter effect when slogan changes.
- **Advantages**: More visually engaging.
- **Disadvantages**: Explicitly excluded by user requirement ("Static display,
  no animation"); would require additional CSS and JS complexity.
- **Reason for Rejection**: User constraint explicitly requires static display.

## Risks and Mitigation

| Risk                           | Impact                                | Probability                             | Mitigation                                                             |
| ------------------------------ | ------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| Default slogan not unique      | High (broken first-visit experience)  | Low (enforced by spec test)             | Spec test validates exactly one default: true; build fails if violated |
| Japanese text rendering issues | Medium (poor UX for Japanese content) | Low (UTF-8 standard, tested fonts)      | Browser QA with Japanese text; verify font fallback                    |
| Long lyrics overflow           | Medium (layout breakage)              | Low (max-width constraint, line-height) | Visual QA with longest slogan; ensure text-wrap: break-word            |
| localStorage quota exceeded    | Low (randomization disabled)          | Very Low (single small key)             | Graceful fallback to default on every visit                            |
| Test coverage regression       | High (PR blocked)                     | Low (comprehensive test plan)           | Run `pnpm test --coverage` before each commit; CI enforcement          |

## References

- MDN Web Docs — Web Storage API (localStorage):
  https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- MDN Web Docs — Math.random():
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
- MDN Web Docs — CSS min/max width:
  https://developer.mozilla.org/en-US/docs/Web/CSS/min-width
- NES.css library — GitHub: https://github.com/nostalgic-css/NES.css
- `docs/adr/ADR-0001-vue3-vite-migration.md` — Toolchain decisions (Vite, Vitest
  v2, Vue 3, Node 22 LTS)
- `src/data/careers.ts` — Data store pattern reference
- `src/types/index.ts` — Type definition pattern reference
- `src/theme.js` — localStorage pattern reference

## Update History

| Date       | Version | Changes         | Author                 |
| ---------- | ------- | --------------- | ---------------------- |
| 2026-04-23 | 1.0     | Initial version | Technical Design Agent |
