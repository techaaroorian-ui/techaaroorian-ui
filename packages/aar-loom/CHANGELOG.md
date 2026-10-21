# @techaaroorian-ui/aar-loom

## 0.2.0-alpha.4

### Minor Changes

- b852835: Add public joined button groups with optional value readouts, small/extra-small sizing, logical RTL seams, vertical orientation and visible keyboard focus. Document the distinction from segmented choices and wrapping toolbars with an interactive, copyable example.

  Fix tablet stacking in a two-region studio without navigation, allowing consumer applications to remove their local specificity workaround.

  Make documentation guide sidebar sticky and allow natural document flow in guide workspace, eliminating viewport height locks and blank overscroll.

## 0.2.0-alpha.3

### Minor Changes

- 84766b5: Make core surfaces flatter with modest corner radii, no card elevation or hover lift, tinted selection, and restrained overlay shadows. Preserve focus visibility and keep expressive elevation scoped to optional Magic Art.

  Introduce warm paper neutrals, adaptive colored surface tokens, and the public aar-paper utility with sage, clay, lavender, ochre, and custom-brand regional accents. Use a small offset edge shadow for overlapping core surfaces.

  Make paper regions borderless while preserving selected-state outlines, focus indicators, and control and overlay boundaries.

  Extend the flat reference across panels, metric cards, empty states, examples, source frames, and guide navigation. Standardize modest corners, remove Core glow halos and decorative frames, reduce nested specimen padding, and retain explicit selection and focus outlines.

- b6b2b30: Simplify appearance to Light, Dark, and System with semantic brand overrides and independent Magic Art expression and density. Remove named palette variants. Add public page, guide, source-frame, expressive composition, and utility CSS modules so the documentation and plain HTML examples need no private stylesheets. Include all modules in the Tailwind v3 build and retain reduced-motion behavior.
- 84766b5: Add public app-header, app-shell, side-navigation and disclosure patterns, paper tabs, and reachable tab sizing. Include the navigation module in the main CSS and Tailwind v3 build.
- 29dea68: Add container-responsive studio workspace regions, inspector/property anatomy, scroll areas, status bars and toolbar groups. Export the public workspace CSS module and include it in the main and Tailwind v3 builds, with plain HTML migration examples.

### Patch Changes

- Include package AI integration guidance and searchable discovery keywords for the initial alpha release.

- e85ea0d: Rename the design language and package to Aar Loom. Retain the aar- CSS prefix and existing CSS entry points. Update documentation, examples, and brand wordmark for the new identity.
- Prepare the public alpha release with canonical monorepo repository, source-directory, homepage, and issue metadata, explicit public publishing access, and alpha-tag installation instructions. Make packaged documentation links point to the repository's public guides.
- 84766b5: Use fixed icon, flexible wrapping label, and intrinsic badge columns for guide navigation rows. Add a public aar-nav-label helper and allow rows to grow without clipping labels or badges.
- bee05d8: Add public theme-aware package-symbol and brand preview classes for standalone SVG identities, with a documentation gallery for the collection and current and planned packages.

  Make text wordmarks the primary package identity, with theme-aware forest/lavender ink, paper surfaces and thin boundaries. Retain compact symbols as secondary identities and provide downloadable color and monochrome SVG wordmarks.

- 84766b5: Make range tracks visible on paper surfaces, provide a 44px interaction area, retain keyboard focus, and style Chromium/WebKit and Firefox tracks and thumbs consistently.
- 567844c: Add CSS option reveal and selection styling for customizable native selects on fine-pointer devices, retaining platform pickers elsewhere and honoring reduced motion. Align site header control rows and give wrapped desktop controls a dedicated aligned row.

## 0.2.0-alpha.2

### Patch Changes

- Add framework-independent file-only drop-zone binding and an optional React hook with nested drag tracking, validation, quota handling and native file selection. Add compact Aar Loom file-intake, drop-zone and file-row styles.

## 0.2.0-alpha.1

### Patch Changes

- Add native modal dialog/sheet behavior and a filtered single-selection picker with framework-independent APIs and optional React hooks. Add Aar Loom dialog, sheet, picker, and opt-in Contextual Empty styling so headless consumers need only the design language stylesheet.

## 0.2.0-alpha.0

### Minor Changes

- Introduce framework-independent ordered collections and atomic file intake validation with optional React hooks. Prepare the collection's first alpha release alongside Aar Loom and Contextual Empty.

### Patch Changes

- 0551f57: Include the package changelog in published artifacts so consumers can review release history.

## Unreleased

- Initial CSS language, semantic themes, component styles, and reduced-motion support.
- Explicit index.css export and optional Tailwind v3 compatibility entry.

Current manifest: 0.1.0. No publication date is recorded here.
