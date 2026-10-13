# Project migration to Aar Loom

Status: CSS foundations and migration examples are available; this document does not claim that every project has been migrated or every headless controller exists. Publish and verify the alpha before changing consumer dependencies.

Import `@techaaroorian-ui/aar-loom/index.css` once. Scope the interface with `aar-root`; choose `data-theme="light|dark|system"`, optional `data-density="compact"`, and optional `data-magic-art="true"`. Root text resets use `aar-page-reset` only when the application opts in. Brand colors are semantic token overrides. Avoid loading another component's standalone stylesheet over the same Aar Loom anatomy.

## Public class coverage

| Need | Classes / contract | What the application owns |
| --- | --- | --- |
| Page and reading layout | `aar-site`, `aar-container`, `aar-prose`, `aar-section`, `aar-stack`, `aar-cluster`, `aar-grid`, `aar-split` | Routing, content and task priority |
| App navigation | `aar-app-header`, `aar-app-header-actions`, `aar-app-shell`, `aar-sidenav-*`, `aar-nav-disclosure`, `aar-tabs`, `aar-tab`, `aar-tabpanel`, `aar-breadcrumb-*` | Routes; custom-tab focus/selection; dismissal of any mobile overlay |
| Editor/reader workspace | `aar-workspace`, `aar-workspace-header`, `aar-workspace-body[data-layout="studio"]`, `aar-workspace-region[data-region="navigation|content|inspector"]` | Panel visibility, focus restoration, state persistence and resizing |
| Full-height or embedded workspace | `aar-workspace[data-size="viewport|embedded"]` | Choose bounded app shell or content-growing embed; do not combine viewport mode with multiple nested full-screen shells |
| Tools and status | `aar-toolbar`, `aar-toolbar-group`, `aar-statusbar`, `aar-scroll-area` | Commands and announcements; name keyboard-focusable scroll regions |
| Property inspector | `aar-inspector-section`, `aar-property-list`, `aar-property-row` | Use `dl`, `dt`, `dd` for metadata and labeled native controls for editing; parsing data is not a CSS responsibility |
| Flat colored regions | `aar-panel`, `aar-paper[data-paper="sage|clay|lavender|ochre|brand"]`, `aar-card`, `aar-stat-card` | State labels and semantic selection; custom-color contrast review |
| Forms and choices | `aar-field`, `aar-form-row`, `aar-input`, `aar-select`, `aar-select-frame`, `aar-textarea`, `aar-choice`, `aar-segmented` | Values, required/error associations, validation, submit and field-array behavior |
| Files and collections | `aar-file-intake`, `aar-dropzone`, `aar-file-list`, `aar-file-row`, `aar-picker`, `aar-picker-option`, `aar-slide-strip`, `aar-slide-thumb` | File validation, preview lifecycle, uploads, selection and reordering; optional headless packages cover some of this |
| Overlays and empty states | `aar-dialog`, dialog placement attributes, `aar-contextual-empty` | Focus/Escape/dismissal, recovery actions and meaningful copy |
| Data and source | `aar-table-*`, `aar-pagination-*`, `aar-code`, `aar-code-toolbar`, `aar-scroll-area` | Sorting/filtering/pagination, highlighting/editor engines, source copying |
| Feedback | `aar-callout`, `aar-badge`, `aar-toast`, `aar-progress`, `aar-skeleton`, `aar-range` | Truthful pending/success/failure, live announcements, processing or range value changes |

Wildcard entries above describe class families, not literal class names. Follow the demonstrated anatomy and state attributes in the docs; adding a class does not create a functioning custom widget.

## Responsive workspace contract

The studio composition uses the workspace's container width, not only the browser viewport. Above 72rem, navigation/content/inspector sit alongside one another. From 48rem to 72rem, the inspector stacks below. At 48rem and below all regions stack in source order. No breakpoint silently hides tools. A native navigation disclosure can collapse manually. Setting `hidden` removes a region; the application must first move focus out if appropriate.

Optional inputs are `--aar-navigation-width` (default 14rem), `--aar-inspector-width` (18rem), and `--aar-scroll-max-height` (28rem). Viewport mode bounds the shell to 100dvh and lets its body scroll. Embedded mode grows with content. Properties stack inside narrow inspector containers. These classes do not implement docking, drag handles, or persistent layout state.

## Project mapping

- **Yuwbrndr:** workspace regions, side navigation, inspector sections, toolbar groups, file rows, slide strip and export feedback. Keep canvas HTML/CSS, image exports and authored-design themes isolated from application styles.
- **PDFManager/Paprbndr:** workspace and scroll regions, reader toolbars, document properties, file intake, ordered cards and comparison range controls. Keep PDF parsing/rendering, markdown conversion and document storage in the app.
- **steprndr:** split editor/output, source frames, variable property lists, toolbar groups, buttons and notices. Keep tracing, execution timing and CodeMirror integration in the app.
- **SlotSyncro:** app shell/navigation, form rows, fields, selectable choices, progress and confirmation overlays. Keep booking, timezone, availability and validation rules in the app. Use adapters for existing calendar/form libraries; do not copy their runtime into Aar Loom.
- **prtotDom:** studio workspace, inspector, grouped alignment commands, dialogs and source frames. Keep DOM instrumentation, Monaco, canvas algorithms and export compilation in their packages.

## Migration checks

Map one real screen to the classes above, preserve its behavior, and remove legacy utility declarations only after the replacement is reviewed. Check 320/768/1440px, long labels, keyboard focus, light/dark/custom brand, and reduced motion. Test preview/export isolation for authored content. Custom responsive sheets, repeatable-row controllers, and asset processing queues need behavior work; their CSS foundations do not make those features complete.

The docs' **Project migration foundations** page shows a complete plain HTML workspace using only public CSS. `workspace.css` is exported independently and is included in both the main stylesheet and generated Tailwind v3 distribution; selective imports also need tokens and foundational components.
