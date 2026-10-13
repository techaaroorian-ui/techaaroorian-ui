# TechAaroorian UI integration guide for agents

TechAaroorian UI provides Aar Loom, a CSS-only design and layout language, and independently usable behavior packages. Start with the smallest package that solves the requested task. The root workspace is private; it is not an installable umbrella package.

## Find the right package

| Task | Package | Runtime |
| --- | --- | --- |
| Theme, flat paper surfaces, responsive layout, tabs, headers and side navigation | `@techaaroorian-ui/aar-loom` | CSS only, any framework or plain HTML |
| Contextual empty-state messaging and recovery actions | `@techaaroorian-ui/contextual-empty` | React 18+ |
| Insert, duplicate, reorder and select ordered items | `@techaaroorian-ui/ordered-collection` | Framework-independent core; optional `/react` |
| Validate file batches and handle browser drops | `@techaaroorian-ui/file-intake` | Framework-independent validation; optional `/react` |
| Native modal dialog and sheet dismissal | `@techaaroorian-ui/dialog` | Browser DOM; optional `/react` |
| Filter, navigate and select a collection | `@techaaroorian-ui/collection-picker` | Framework-independent core; optional `/react` |
| Canvas viewport calculations, fit, pan and zoom | `@techaaroorian-ui/pan-zoom` | Framework-independent core; optional `/react` |
| Compress state into shareable URL fragments | `@techaaroorian-ui/share-state` | Browser APIs; optional `/react` |

Repeatable Sections and Asset Gallery are planned, not available APIs. Aar Loom does not require the behavior packages. Behavior packages do not require Aar Loom or Tailwind. Contextual Empty offers its own optional stylesheet; other headless packages leave rendering and styling to the consumer.

## Use the actual installed contract

Read the chosen package's README.md, AI.md, package.json exports and TypeScript declarations before writing code. Import only public package paths; never import monorepo source paths or assume an unexported helper exists. Check browser requirements and cleanup responsibilities in the package guide. Only the six packages marked with optional `/react` above expose that adapter path; Contextual Empty exports React components at its root.

These packages are in alpha. Prepared manifest versions do not prove npm publication. Check the registry before installation; after publication, use `@alpha` to select the prerelease channel and pin the resolved version for reproducible adoption. Avoid promising production readiness, complete accessibility certification, SSR compatibility or VR support without verifying the relevant contract.

## Build in the Aar Loom language

Paper groups content. Ink communicates. Motion explains change.

- Import `@techaaroorian-ui/aar-loom/index.css` once. Use ordinary semantic HTML or the application's existing components with documented `aar-` classes.
- Use a scoped `aar-root`, `data-theme="light|dark|system"` and `data-density="comfortable|compact"`. Preference persistence belongs to the application.
- Use stacks, clusters, adaptive grids and documented workspace regions. Preserve reading order; let long labels wrap; review narrow layouts and zoom before adding fixed widths.
- Group content with flat paper fills and spacing. Avoid nested borders, decorative gradients or textures behind text. Use boundaries for inputs and overlapping surfaces, and distinct selection and keyboard focus states.
- Brand colors override semantic tokens such as `--aar-primary`, `--aar-on-primary` and `--aar-focus`. Check contrast in both appearances. Paper colors are regional grouping choices, not status signals or extra theme modes.
- Keep Magic Art opt-in. Respect reduced motion. CSS supplies presentation; applications or native controls supply tab keyboard behavior, uploads, validation, persistence and asynchronous state.
- Prefer existing public classes. If a reusable layout primitive is missing, propose adding it to Aar Loom rather than inventing an undocumented framework class. Product-specific styles remain the consumer's choice.

Read [design rules](./design-rules.md), [adaptive layout](./adaptive-layout.md), [styling boundaries](./styling-boundaries.md) and the selected package README for complete examples.

## Discover documentation without executing JavaScript

The docs build generates `llms.txt`, `llms-full.txt`, and `ai/` Markdown guides from repository sources. `llms.txt` is an optional discovery convention, not a guarantee of indexing or agent support. Package tarballs include AI.md and their README; public manifests provide searchable keywords and repository links.

Run `npm run docs:ai` after updating guides or versions. `npm run docs:ai:check` detects stale generated content. Public hosting and npm publication are still needed for external discovery; local files alone are not visible to remote agents.
