# Issue #41: My Career History Re-design Design Document

## Overview

Redesign the career history section to improve visual presentation by replacing card background images with company logos, adding platform/language technology icons, implementing flexbox layout, and ensuring WCAG 2 AA accessibility compliance.

### Referenced Documents

- ADR: [docs/adr/ADR-0002-career-history-redesign.md](../adr/ADR-0002-career-history-redesign.md)
- Work Plan: [docs/plans/20260421-feature-career-history-redesign.md](../plans/20260421-feature-career-history-redesign.md)
- Related Issue: GitHub Issue #41

## Design Summary (Meta)

```yaml
design_type: "extension"
risk_level: "low"
complexity_level: "medium"
complexity_rationale: "(1) Requirements: Multiple UI changes (flexbox layout, logo placement, icon integration), (2) Constraints: WCAG 2 AA compliance requires dual logo variants, test coverage must remain at 100%"
main_constraints:
  - "WCAG 2 AA compliance for logos (light & dark mode variants required)"
  - "100% test coverage floor (37 tests baseline)"
  - "No jQuery - vanilla JS only"
  - "Bootstrap Icons already integrated (per ADR-0002)"
biggest_risks:
  - "Logo image 404 errors (mitigated by @error handler)"
  - "Flexbox layout breaking at certain viewports"
  - "Dark mode logo visibility issues"
unknowns:
  - "Exact platform/language icons needed per career entry"
  - "Logo file availability and quality from external sources"
```

## Background and Context

### Prerequisite ADRs

- [ADR-0002-career-history-redesign.md](../adr/ADR-0002-career-history-redesign.md): Decisions on icon system (Bootstrap Icons), dialog pattern (peer dialogs), data extraction to `careers.js`, dual logo variants for WCAG AA
- [ADR-0001-vue3-vite-migration.md](../adr/ADR-0001-vue3-vite-migration.md): Migration to Vue 3 + Vite stack

### Agreement Checklist

#### Scope
- [x] Replace card-img-top background images with company logos
- [x] Add platform/language icons below job titles
- [x] Keep Screenshots button but replace preview area with company logo
- [x] Implement flexbox layout for career list
- [x] Ensure WCAG 2 AA compliance for logos (light & dark mode)

#### Non-Scope (Explicitly not changing)
- [x] Industries section (handled in issue #65)
- [x] Dialog animation patterns (CSS-only targeting dialog[open] preserved)
- [x] Data structure changes (careers.js schema already established in ADR-0002)
- [x] Bootstrap Icons dependency (already added in Phase 2)

#### Constraints
- [x] Parallel operation: No
- [x] Backward compatibility: Required (existing careers.js data format preserved)
- [x] Performance measurement: Not required

#### Applicable Standards

| Standard | Type | Source | Status |
|----------|------|--------|--------|
| Vue 3 Options API | `[explicit]` | All existing components use Options API | Confirmed |
| Bootstrap 5 CSS classes | `[explicit]` | Bootstrap CSS already imported | Confirmed |
| Bootstrap Icons CSS classes | `[explicit]` | ADR-0002, main.scss import | Confirmed |
| WCAG 2 AA contrast (3:1 for non-text) | `[explicit]` | web-accessibility skill requirement | Confirmed |
| 100% test coverage | `[explicit]` | vite.config.js:56-58 thresholds | Confirmed |
| CSS-only dialog animations | `[implicit]` | CLAUDE.md line: "CSS-only animation changes do not affect Vitest JS coverage" | Confirmed |
| Vite environment variables (import.meta.env) | `[explicit]` | CLAUDE.md: "Do not use process.env" | Confirmed |
| No jQuery | `[explicit]` | CLAUDE.md: "jQuery has been fully removed" | Confirmed |

#### Quality Assurance Mechanisms

| Mechanism | Enforces | Config | Coverage | Status |
|-----------|----------|--------|----------|--------|
| ESLint with vue3-recommended + security/recommended-legacy | Vue 3 best practices, security rules | `.eslintrc.json` | `src/**/*.{js,vue}` | adopted |
| Vitest v2 with 95% thresholds | Test coverage | `vite.config.js:51-62` | `src/**/*.{js,vue}` excluding tests | adopted |
| Autoprefixer | CSS vendor prefixes | `package.json` browserslist | All CSS output | noted (already configured) |

### Problem to Solve

The current career cards use CSS `background-image` screenshots as the card header, which:
1. Provides no clear company branding
2. Cannot adapt to light/dark mode for accessibility
3. Uses hardcoded CSS classes per career entry
4. Lacks technology context (platforms/languages used)

### Current Challenges

- Card layout uses `card-group` which doesn't center cards on wider screens
- No flexbox wrapping for responsive layout
- Logo support exists in data but needs visual placement optimization
- Platform icons array exists but is empty for all entries

### Requirements

#### Functional Requirements

1. **Logo Display**: Each career card displays company logo prominently (replacing card-img-top background)
2. **Platform Icons**: Technology stack icons displayed below job titles
3. **Screenshots Button**: Preserved but preview area now shows company logo
4. **Flexbox Layout**: Cards wrap and center using flexbox
5. **Accessibility**: WCAG 2 AA compliant logos for both themes

#### Non-Functional Requirements

- **Performance**: Logo images lazy-loaded via `<img>` native lazy loading
- **Maintainability**: Data-driven rendering (already in careers.js)
- **Accessibility**: Minimum 3:1 contrast for logo visibility (SC 1.4.11)

## Acceptance Criteria (AC) - EARS Format

### AC-1: Company Logo Display

- [x] **When** a career card is rendered, **if** `career.logo` is non-null, **then** the system shall display the company logo image
- [x] **When** the theme is dark mode, **if** `career.logoDark` is non-null, **then** the system shall display the dark mode logo variant
- [x] **When** a career card is rendered, **if** `career.logo` is null, **then** the system shall display the Bootstrap Icons placeholder (`bi-x-lg`)
- [x] **When** a logo image fails to load (`@error` event), **then** the system shall fall back to the placeholder icon

### AC-2: Platform/Language Icons

- [x] **When** a career card is rendered, **if** `career.platforms` array is non-empty, **then** the system shall display platform icons below the job title
- [x] **When** `career.platforms` is empty, **then** the system shall not render the platform icons row
- [x] **When** platform icons are displayed, **then** each icon shall use Bootstrap Icons CSS classes (`bi bi-{iconName}`)

### AC-3: Flexbox Layout

- [x] **While** the career list is displayed, the system shall use `display: flex` with `flex-wrap: wrap` and `justify-content: center`
- [x] **When** viewport width changes, **then** cards shall wrap responsively (3 columns desktop, 2 columns tablet, 1 column mobile)
- [x] **When** cards wrap to new rows, **then** the row shall be centered within the container

### AC-4: Screenshots Dialog

- [x] **When** user clicks the Screenshots button, **then** the system shall open the screenshot dialog showing company logo in the header
- [x] **When** screenshot dialog opens, **then** the system shall display all images from `career.screenshots` array
- [x] **When** `career.screenshots` is empty, **then** the system shall not render the Screenshots button

### AC-5: WCAG 2 AA Compliance

- [x] **When** logos are displayed, **then** non-text graphical elements shall meet minimum 3:1 contrast ratio against their background
- [x] **When** dark mode is active, **then** dark mode logo variants shall be displayed for optimal visibility

## Existing Codebase Analysis

### Implementation Path Mapping

| Type | Path | Description |
|------|------|-------------|
| Existing | `src/components/ProjectsComponent.vue` | Main component with career cards (lines 1-138) |
| Existing | `src/data/careers.js` | Data source with 6 career entries (lines 1-104) |
| Existing | `src/assets/scss/components/_projects.scss` | Component styling (lines 1-207) |
| Existing | `src/tests/ProjectsComponent.spec.js` | Test suite with 37 tests (lines 1-350) |
| Modify | `src/components/ProjectsComponent.vue` | Update template for flexbox layout, logo placement |
| Modify | `src/data/careers.js` | Populate `platforms` arrays with appropriate icons |
| Modify | `src/assets/scss/components/_projects.scss` | Replace card-group with flexbox layout |
| Modify | `src/tests/ProjectsComponent.spec.js` | Add tests for flexbox layout, platform icons |

### Code Inspection Evidence

| File/Function | Relevance |
|---------------|-----------|
| `ProjectsComponent.vue:27-37` | Logo rendering logic with light/dark variants and error handling |
| `ProjectsComponent.vue:42-51` | Platform icons row rendering (currently renders if platforms.length > 0) |
| `ProjectsComponent.vue:14-62` | Card template structure using v-for over careers |
| `careers.js:17-104` | Career data structure with logo, logoDark, platforms fields already defined |
| `_projects.scss:13-25` | Current card-group layout (needs replacement with flexbox) |
| `_projects.scss:82-118` | Logo and platform icon styling classes |
| `ProjectsComponent.spec.js:131-210` | Existing logo and platform icon tests |

### Fact Disposition Table

| Fact ID | Focus Area | Disposition | Rationale | Evidence |
|---------|------------|-------------|-----------|----------|
| N/A (no Codebase Analysis input provided) | N/A | N/A | N/A | N/A |

## Design

### Change Impact Map

```yaml
Change Target: ProjectsComponent.vue template + careers.js data + _projects.scss styles
Direct Impact:
  - src/components/ProjectsComponent.vue (template structure, card layout)
  - src/data/careers.js (platforms array population)
  - src/assets/scss/components/_projects.scss (card layout CSS)
  - src/tests/ProjectsComponent.spec.js (new test cases)
Indirect Impact:
  - Screenshot dialog header (now displays company logo)
  - Theme.js dark mode detection (already works via .is-dark class)
No Ripple Effect:
  - IndustriesComponent.vue (out of scope per agreement)
  - ProfileComponent.vue (no changes required)
  - Other dialog components (SpotifyComponent, etc.)
```

### Interface Change Matrix

| Existing | New | Conversion Required | Compatibility Method |
|----------|-----|--------------------|--------------------|
| `careers.platforms: []` | `careers.platforms: ['bi-globe', ...]` | No | Direct data population |
| `.card-group` CSS layout | `.career-list` flexbox layout | Yes | CSS class replacement |
| Card-img-top background image | Logo `<img>` in card body | Yes | Template restructure |

### Architecture Overview

The career history section is a Vue 3 Options API component that renders a dialog containing career cards. The redesign focuses on:

1. **Layout Layer**: Replace Bootstrap card-group with custom flexbox container
2. **Presentation Layer**: Promote logos from secondary to primary visual element
3. **Content Layer**: Populate platform icons based on known tech stacks

### Data Flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   careers.js    │────▶│  v-for directive │────▶│  Career cards   │
│  (data source)  │     │  (Vue template)  │     │   (rendered)    │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │                        │
         ▼                       ▼                        ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ platforms: []   │────▶│  bi-* classes    │────▶│  Icon row       │
│ logo: string    │     │  (Bootstrap)     │     │  (below title)  │
│ logoDark: string│     │                  │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

### Data Representation Decision

The `careers.js` data structure (already established in ADR-0002) will be **reused and extended**:

| Criterion | Assessment | Reason |
|-----------|-----------|--------|
| Semantic Fit | Yes | Structure already designed for career entries with logos |
| Responsibility Fit | Yes | Same bounded context (ProjectsComponent) |
| Lifecycle Fit | Yes | Data loaded at component initialization |
| Boundary/Interop Cost | Low | No cross-component data sharing required |

**Decision**: **Reuse existing** — The `careers.js` schema already supports all required fields (logo, logoDark, platforms). Only need to populate the `platforms` arrays.

### Contract Definitions

```javascript
// Career object shape (from careers.js)
{
  id: string,           // Unique identifier (kebab-case)
  company: string,      // Display name
  description: string,  // Role/project description
  dates: string,        // Date range
  url: string|null,     // External URL
  logo: string|null,    // Light mode logo path (relative to public/)
  logoDark: string|null,// Dark mode logo path
  platforms: string[],  // Bootstrap Icons class names (e.g., 'bi-globe')
  clickAction: 'url'|'alert',
  alertMsg: string|null,
  screenshots: string[] // Screenshot paths
}
```

### Field Propagation Map

| Field | Boundary | Status | Detail |
|-------|----------|--------|--------|
| career.platforms | careers.js → ProjectsComponent.vue | extended | Populated with appropriate tech stack icons |
| career.logo | careers.js → ProjectsComponent.vue | preserved | Used in card header (moved from secondary to primary) |
| career.screenshots | careers.js → dialog-screenshots | preserved | Screenshot dialog unchanged, header shows logo |

### Error Handling

| Error Category | Example | Detection | Recovery Strategy | User Impact |
|---------------|---------|-----------|-------------------|-------------|
| Logo 404 | Logo file missing | `<img @error>` event | Fallback to `bi-x-lg` placeholder | Placeholder icon displayed |
| Invalid platform icon | Typo in icon name | Visual QA during testing | Fix icon name in data | Icon missing (low impact) |
| Empty platforms | No tech stack defined | Data validation | Add appropriate icons | No platform row shown |

### UI Error State Design

| Component | Loading | Empty | Error | Partial |
|-----------|---------|-------|-------|---------|
| Career card logo | N/A (synchronous) | Placeholder `bi-x-lg` | Placeholder `bi-x-lg` (on @error) | N/A |
| Platform icons | N/A | Row hidden (platforms.length === 0) | N/A | Partial icons shown |

### Client State Design

| State Category | State | Management Method | Sync Strategy |
|---------------|-------|-------------------|---------------|
| Local UI state | Dark mode detection | DOM query (`document.getElementById`) | On each logo render via `logoSrc()` method |
| Local UI state | Logo error tracking | `logoErrors` data object | Updated via `@error` handler |
| Static data | Career entries | careers.js import | Synchronous at component load |

## Implementation Plan

### Implementation Approach

**Selected Approach**: **Vertical Slice** (Feature-driven)

**Selection Reason**: 
- The feature is self-contained within a single component
- Changes can be verified incrementally (layout → logos → icons)
- Existing data structure (careers.js) already supports the feature
- Minimal external dependencies

### Technical Dependencies and Implementation Order

1. **Update careers.js platforms data**
   - Technical Reason: Data must be populated before UI can display it
   - Dependent Elements: All platform icon rendering

2. **Update _projects.scss flexbox layout**
   - Technical Reason: CSS must be in place before template changes render correctly
   - Prerequisites: None (pure CSS change)

3. **Update ProjectsComponent.vue template**
   - Technical Reason: Template changes depend on CSS layout being ready
   - Prerequisites: Steps 1 and 2

4. **Update ProjectsComponent.spec.js**
   - Technical Reason: Tests validate the implementation
   - Prerequisites: Step 3

### Output Comparison

Since this is an **extension** (not replacement), output comparison focuses on:

- **Comparison input**: Same `careers.js` data
- **Expected output fields**: 
  - Card count (unchanged: 6 cards)
  - Card content (company names, descriptions, dates - unchanged)
  - New additions: Platform icons visible, flexbox layout centered
- **Diff method**: Visual comparison in browser + test assertions for platform icon presence
- **Transformation pipeline coverage**: 
  - Data → Template: Platform icons now rendered
  - Template → DOM: Flexbox layout replaces card-group

### Early Verification Point

- **First verification target**: Update one career entry (e.g., Accenture) with platforms array and verify it renders correctly
- **Success criteria**: 
  - Platform icons display below job title
  - Flexbox layout centers the card
  - Logo displays in card header
- **Failure response**: Rollback template changes, verify CSS is correctly applied

## Verification Strategy

### Correctness Proof Method

- **Correctness definition**: Career cards render with company logos, platform icons display below titles for careers with populated platforms array, and flexbox layout centers cards across all viewports
- **Verification method**: 
  1. Unit tests asserting platform icon presence for careers with platforms data
  2. Visual browser comparison of card layout (before/after screenshots)
  3. 100% test coverage maintained
- **Verification timing**: After template and CSS changes complete

### Early Verification Point

- **First verification target**: Single career entry (Accenture) with populated platforms array
- **Success criteria**: 
  - Platform icons render below title
  - Logo displays prominently in card
  - Card participates in flexbox layout
- **Failure response**: Debug CSS and template structure before populating remaining careers

## Security Considerations

- **External URLs**: All `window.open` calls already use `noopener,noreferrer` (verified in existing code)
- **Image sources**: Logo images served from local `/public/` directory (no external hotlinking)
- **No user input**: No new user input vectors introduced

## Test Boundaries

### Mock Boundary Decisions

| Component/Dependency | Mock? | Rationale |
|---------------------|-------|-----------|
| careers.js data | No | Real data used for integration-style testing |
| Bootstrap Icons CSS | No | CSS is static asset, tested via class assertions |
| Image loading | Yes (partial) | `@error` event can be triggered in tests |

### Data Layer Testing Strategy

- **Schema dependencies**: careers.js Career type definition
- **Test data approach**: Use actual careers.js data, override specific entries in tests
- **Mock limitations acknowledged**: Image loading is browser behavior; we test `@error` handler via event triggering

## Future Extensibility

- **Extension points**: 
  - `platforms` array can accept any Bootstrap Icons class
  - Logo paths can be updated without code changes
  - Flexbox layout accommodates additional cards automatically
- **Known future requirements**: Industries section (issue #65) will reference career IDs
- **Intentional limitations**: 
  - Logo sizing fixed at 32px (can be adjusted via CSS)
  - Platform icons limited to Bootstrap Icons set

## Risks and Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Logo 404 errors | Low | Medium | `@error` handler falls back to placeholder |
| Flexbox layout breaks at unusual viewports | Low | Low | Test across standard breakpoints (240px-1280px) |
| Platform icon names incorrect | Low | Low | Visual QA + spellcheck icon names |
| Dark mode logos not visible | Medium | Low | Source high-contrast logo variants |
| Test coverage drops below 100% | High | Low | Add tests for new functionality |

## References

- ADR-0002: [docs/adr/ADR-0002-career-history-redesign.md](../adr/ADR-0002-career-history-redesign.md)
- Bootstrap Icons: https://icons.getbootstrap.com/
- WCAG 2.1 SC 1.4.11 (Non-text Contrast): https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html
- GitHub Issue #41: Career History Re-design requirements
- CLAUDE.md: Project constraints (jQuery removal, Vite environment, CSS-only animations)

## Update History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-04-21 | 1.0 | Initial version for Issue #41 scope | Design Agent |
