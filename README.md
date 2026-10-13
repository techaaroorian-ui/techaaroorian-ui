# TechAaroorian UI

Aar Loom is a CSS-only design and adaptive layout language built around flat colored paper, readable ink, and purposeful motion. Use it with plain HTML, your own components, or any framework. Custom theme colors and optional Magic Art expression are supported; headless packages and Tailwind are optional.

## Packages

| Package | Purpose | Integration |
| --- | --- | --- |
| [aar-loom](./packages/aar-loom/README.md) | CSS themes, controls, responsive layouts and navigation | Any framework or HTML |
| [contextual-empty](./packages/contextual-empty/README.md) | Empty-state messaging and recovery | React |
| [ordered-collection](./packages/ordered-collection/README.md) | Selection, insertion, duplication and reordering | Core + optional React |
| [file-intake](./packages/file-intake/README.md) | File batch validation and drop handling | Core + optional React |
| [dialog](./packages/dialog/README.md) | Native modal dialogs and sheets | Browser + optional React |
| [collection-picker](./packages/collection-picker/README.md) | Filtering, typeahead and single selection | Core + optional React |
| [pan-zoom](./packages/pan-zoom/README.md) | Canvas fitting, zoom and viewport calculations | Core + optional React |
| [share-state](./packages/share-state/README.md) | Compressed state in shareable URLs | Browser + optional React |

The root workspace is private. Each package publishes independently. Alpha manifests describe prepared versions; verify npm availability before installing. Repeatable Sections and Asset Gallery are planned, not implemented packages.

## Documentation and AI agents

Start with the [package-selection and integration guide](./docs/ai-integration.md), [Aar Loom design rules](./docs/design-rules.md), and each package README for complete examples. The [llms.txt index](./llms.txt) links to plain-text documentation that agents can read without executing the docs application. Every package includes AI.md with public import paths and integration boundaries.

Run `npm run dev --workspace apps/docs` and open the Vite URL. Dedicated routes include `#/aar-loom`, `#/contextual-empty`, `#/headless`, and the philosophy, icons and versioning guides. The server also serves `llms.txt`, `llms-full.txt` and Markdown under `ai/`.

Run `npm run docs:ai` to regenerate discovery files from package manifests, READMEs and design guides. Docs development/build does this automatically; `npm run docs:ai:check` checks freshness. See [release policy](./docs/versioning.md) and the [initial alpha checklist](./docs/initial-alpha-release.md) before publication.

## Development

This monorepo uses npm workspaces. Run `npm ci`, `npm run build:packages`, and `npm run release:check`. With the docs server running, `npm run test:visual --workspace apps/docs` checks browser behavior and captures review screenshots. Screenshots are review artifacts, not approved regression baselines.

CSS supplies presentation; native controls, application logic, or optional adapters supply behavior. Consumer applications remain responsible for correct semantics, custom-color contrast, preference persistence, and device/accessibility verification. Lucide is an optional icon integration documented in the docs; Aar Loom ships no icon dependency.

See [contributing](./CONTRIBUTING.md), [project migration](./docs/project-migration.md), and the [roadmap](./docs/roadmap.md).

## License

[MIT](./LICENSE) — Janarthanan Soundararajan
