# @techaaroorian-ui/aar-loom: agent integration

Aar Loom: a themeable, CSS-only design language for tools and workspaces.

Prepared version: 0.2.0-alpha.3. Verify registry availability before installation; this manifest is not proof of publication.

Read the included README.md for examples and limitations. Use only these public import paths:

- `@techaaroorian-ui/aar-loom`
- `@techaaroorian-ui/aar-loom/index.css`
- `@techaaroorian-ui/aar-loom/tokens.css`
- `@techaaroorian-ui/aar-loom/components.css`
- `@techaaroorian-ui/aar-loom/tailwind-v3.css`
- `@techaaroorian-ui/aar-loom/layouts.css`
- `@techaaroorian-ui/aar-loom/navigation.css`
- `@techaaroorian-ui/aar-loom/workspace.css`
- `@techaaroorian-ui/aar-loom/canvas.css`
- `@techaaroorian-ui/aar-loom/utilities.css`
- `@techaaroorian-ui/aar-loom/compositions.css`
- `@techaaroorian-ui/aar-loom/expression.css`
- `@techaaroorian-ui/aar-loom/code.css`
- `@techaaroorian-ui/aar-loom/magic-art.css`
- `@techaaroorian-ui/aar-loom/button-groups.css`
- `@techaaroorian-ui/aar-loom/studio.css`
- `@techaaroorian-ui/aar-loom/application-utilities.css`
- `@techaaroorian-ui/aar-loom/codemirror.css`

Read package.json and bundled type declarations where supplied before implementing an API. Do not import workspace source files.

[Shared package-selection and design guidance](https://github.com/techaaroorian-ui/techaaroorian-ui/blob/main/docs/ai-integration.md).
[Package source and README](https://github.com/techaaroorian-ui/techaaroorian-ui/blob/main/packages/aar-loom/README.md).

# Aar Loom

Install the alpha package:

```bash
npm install @techaaroorian-ui/aar-loom@alpha
```

A CSS-only design and layout language. Use plain HTML, your own components, or any application framework. Aar Loom does not require TechAaroorian UI headless packages or a component library.

## Start with HTML

For consumer adoption, use the [project migration map](https://github.com/techaaroorian-ui/techaaroorian-ui/blob/main/docs/project-migration.md). The exported `workspace.css` module adds `aar-workspace-body[data-layout="studio"]`, typed workspace regions, `aar-inspector-section`, metadata property rows, toolbar groups, scroll areas, and a status bar. Container-width transitions keep all regions reachable. It is included in `index.css` and the generated Tailwind v3 stylesheet. These are CSS foundations; resizing, persistence, validation, and file processing remain application or headless behavior.

Navigation patterns are public CSS: `aar-app-header` and `aar-app-header-actions` group identity and commands; `aar-app-shell` places `aar-sidenav` beside content and stacks below 54rem. Use `aar-sidenav-group`, `aar-sidenav-label`, and route anchors with `aar-sidenav-link` plus `aria-current="page"`. Native `details.aar-nav-disclosure` provides a collapsible navigation region. `aar-tabs` supports default underline, `data-variant="pills"`, or `data-variant="paper"`; `aar-tabpanel` respects `hidden`. Real tabs require application selection and keyboard behavior. Breadcrumbs use the existing `aar-breadcrumb-*` classes. The module is included by `index.css`; a selective `navigation.css` import also needs the token/base component foundations.

Read the [alpha design rules](https://github.com/techaaroorian-ui/techaaroorian-ui/blob/main/docs/design-rules.md) for typography, spacing, surface, state, motion, and adaptive-layout decisions. They distinguish implemented CSS foundations from application guidance and future spatial work.

Paper regions are borderless: their fill and spacing establish the boundary. Inputs, outlined buttons, and overlays retain borders. Selected paper regions receive an inset outline; keyboard focus retains its separate visible outline.

The core surface language is smooth colored paper: warm off-white sheets, muted sage/clay/lavender/ochre accents, and ink-like text. Add `aar-paper` to any region with `data-paper="sage"`, `"clay"`, `"lavender"`, `"ochre"`, or `"brand"`. Brand sheets derive from `--aar-primary`; surface tokens `--aar-paper-sage` and the corresponding color names can also be overridden. These are region colors, not additional theme modes. Light, Dark, and System remain the appearance choices. Dark appearance uses muted tinted sheets with light ink. Texture is omitted to keep small text clear.

Core styling is flat: solid surfaces, modest corners, subtle hairline borders, and background color stepping establish hierarchy. Drop shadows are completely eliminated; elements differentiate cleanly through background tones (`--aar-background`, `--aar-surface`, `--aar-surface-subtle`, `--aar-surface-raised`). Hover uses color and border feedback without lifting cards. Selected cards receive a subtle tint. Focus outlines remain visible, and overlays like menus and dialogs rely on surface color elevation and 1px hairline borders. Optional Magic Art can add expressive glow.

```css
@import "@techaaroorian-ui/aar-loom/index.css";
```

```html
<body class="aar-page-reset">
  <main class="aar-root" data-theme="system" data-density="comfortable">
    <section class="aar-container aar-stack aar-p-4" data-gap="6">
      <h1 class="aar-title">Your application</h1>
      <div class="aar-grid" data-min="18">
        <article class="aar-panel">Main work</article>
        <aside class="aar-panel">Supporting tools</aside>
      </div>
    </section>
  </main>
</body>
```

`aar-page-reset` is an explicit margin reset; the framework does not reset the global body. Applications own preference controls and persistence.

## Appearance, brand, expression, density

- `data-theme="light|dark|system"`: one default surface and text hierarchy for each appearance. System follows the browser preference.
- Brand identity: override semantic tokens such as `--aar-primary`, `--aar-on-primary`, and `--aar-focus`. There are no named palette variants. Give each appearance a readable foreground/background pair.
- `data-magic-art="true"`: optional expressive feedback. Core controls and layout work without it.
- `data-density="comfortable|compact"`: spacing and control density. Coarse pointers retain generous targets.

```css
[data-brand="your-brand"][data-theme="light"] {
  --aar-primary: #326954;
  --aar-on-primary: #ffffff;
  --aar-focus: #326954;
}
[data-brand="your-brand"][data-theme="dark"] {
  --aar-primary: #a8d6c4;
  --aar-on-primary: #142d25;
  --aar-focus: #a8d6c4;
}
```

Custom colors require contrast checks. Status roles remain distinct from brand accent. Nested explicit theme roots can choose independent appearances; ordinary markup inherits the surrounding tokens.

## Public layout classes

| Pattern | Classes / attributes |
| --- | --- |
| Application or documentation shell | `aar-site`, `aar-site-header`, `aar-site-footer` |
| Bounded content and reading measure | `aar-container`, `aar-prose`, `aar-section` |
| Vertical rhythm and wrapping peers | `aar-stack`, `aar-cluster`, `data-gap="1|2|3|4|6|8"` |
| Adaptive collection grid | `aar-grid`, `data-min="14|18|24"` |
| Work and supporting regions | `aar-split`, `aar-workspace`, `aar-workspace-main` |
| Knowledge portal navigation | `aar-guide-shell`, `aar-guide-sidebar`, `aar-guide-main` |
| Highlighted source frame | `aar-code`, `aar-code-toolbar`, `data-expanded="true"` |
| Spacing utilities | `aar-p-4`, `aar-mt-6`, `aar-gap-4` (quarter-rem scale) |

The default entry includes every public module. Advanced consumers can import `tokens.css`, `components.css`, `layouts.css`, `compositions.css`, `expression.css`, `code.css`, `magic-art.css`, and `utilities.css` separately. Use the default entry when composing modules to preserve layer order. The documentation uses only these package styles.

Runtime geometry uses documented CSS inputs rather than a private stylesheet: `--aar-grid-min`, `--aar-split-cols`, `--aar-order`, and `--aar-width`, `--aar-height`, `--aar-transform` with corresponding `aar-bind-*` classes. Consumers supply dimensions or transforms; CSS cannot calculate application state.

## Interaction boundaries

Component classes are convenient examples, not mandatory APIs. CSS supplies focus, selected-state appearance, responsive composition, and motion. Native HTML supplies button, select, and details behavior. Applications or headless adapters supply dialog dismissal, listbox navigation, uploads, drawing, and viewport state.

`aar-select-frame` wraps a native `select.aar-select` and an optional decorative `aar-select-chevron`. On fine-pointer devices, browsers supporting `appearance: base-select` get a themed option panel with a short fade and lift, selected checkmark, and rotating arrow. Touch devices and unsupported browsers retain their platform picker. Reduced motion disables the reveal transition.

Magic Art geometry and surface transitions use CSS/SVG. Star particle bursts need an application event handler; CSS classes alone cannot create particles. Respect reduced motion. The docs demonstrate an optional handler; Aar Loom ships no JavaScript runtime.

## Tailwind coexistence

The standard entry declares `theme, base, components, utilities`. Normal Tailwind utilities can override component-layer styles. Reduced-motion rules intentionally use `!important` to preserve the user's preference.

For Tailwind v3 import `@techaaroorian-ui/aar-loom/tailwind-v3.css`. The build includes all public modules under native `aar-theme`, `aar-components`, and `aar-utilities` layers; unlayered Tailwind utilities take precedence. Tailwind v4-specific token mapping is not shipped.

## Validate

From the repository root, run `npm run build --workspace packages/aar-loom`, `npm run build --workspace docs`, and `npm run test:visual --workspace docs` with the documentation dev server running. Review narrow layouts, both appearances, keyboard focus, custom colors, and reduced motion. The package is in alpha; release preparation uses Changesets and publishes on the alpha dist-tag.

## AI agent integration

See the included [AI.md](https://github.com/techaaroorian-ui/techaaroorian-ui/blob/main/packages/aar-loom/AI.md) for public import paths and integration guidance. Complete package examples remain in this README.

## Joined button groups (next alpha)

Use `aar-button-group` for commands acting on one value, such as zoom out / current zoom / zoom in / reset. Direct children use `aar-button`, `aar-icon-button`, or the noninteractive `aar-button-group-value`. Set `data-size="sm|xs"` on the group; omit it for default sizing. `data-orientation="vertical"` stacks the group. Logical seams support RTL, and keyboard focus remains visible. Coarse pointers retain at least 44px targets.

```html
<div class="aar-button-group" data-size="sm" role="group" aria-label="Canvas zoom">
  <button class="aar-icon-button" type="button" aria-label="Zoom out">−</button>
  <output class="aar-button-group-value" aria-label="Current zoom">100%</output>
  <button class="aar-icon-button" type="button" aria-label="Zoom in">+</button>
  <button class="aar-button" type="button">Reset</button>
</div>
```

Bind commands and values in the application. Prefer ordinary Tab navigation; `role="group"` does not implement a custom toolbar keyboard pattern. Keep joined labels short and place separate groups inside a wrapping `aar-toolbar-group`. Use `aar-segmented` for mode selection instead of treating every joined command as selected. This module is included by index.css and tailwind-v3.css; selective `button-groups.css` imports also need tokens.css and components.css. These additions are prepared for the next alpha and are not in 0.2.0-alpha.3.

## Local consumer development

Run `npm run dev:pack:loom` at the repository root to build a local tarball. Yuwbrndr can apply it with `npm run loom:local` without saving a local dependency path. See the [local integration workflow](https://github.com/techaaroorian-ui/techaaroorian-ui/blob/main/docs/local-consumer-development.md) for iteration, checks and publication order.
