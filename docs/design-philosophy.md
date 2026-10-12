# Aar Loom philosophy

**Make possibilities visible. Make change understandable.**

The [alpha design rules](design-rules.md) turn this philosophy into measurable implementation and review decisions: paper groups content, ink communicates, and motion explains change.

Aar Loom supplies a language, not a mandatory component library. Build with ordinary HTML, your own components, or another framework. Headless packages add behavior only when useful. CSS cannot supply application drawing, uploads, state machines, or backend processing.

## Five principles

1. Purpose leads: give the main task the strongest region, with support nearby.
2. Reveal possibilities: expose relevant tools without hiding the only route to an action.
3. States tell the truth: distinguish pending, selected, success, and failure in text as well as color.
4. Change stays connected: short transitions explain relationships; reduced motion preserves every state.
5. Adapt without losing context: reorganize by available space while preserving task state and reachable actions.

## Four independent choices

Borders serve interaction rather than decorating every region. Colored paper sections use fill and spacing for separation. Controls and overlapping menus retain clear boundaries; selected paper regions and keyboard focus retain visible outlines.

The surface language draws on smooth colored craft paper. Warm neutral sheets and muted regional accents organize content; ink-like text and crisp edges keep it readable. Color is a supporting cue, never the only indication of state. Use the public `aar-paper` class with `data-paper="sage|clay|lavender|ochre|brand"` on ordinary HTML. Brand sheets use the application's primary color. These are surface choices within the existing appearance model, not five new themes. Overlapping menus use a small offset edge shadow rather than a broad floating blur.

Core uses flat, solid surfaces. Hierarchy comes from spacing, typography, surface contrast, and thin borders rather than stacked shadows. Modest corner radii keep dense interfaces clear. Hover changes color or border without lifting cards; selection uses a tinted surface and distinct border. Focus retains an explicit outline, and short transitions connect states. A small shadow distinguishes menus and dialogs that overlap other content.

Appearance is Light, Dark, or System. Brand identity is Default or user-supplied semantic colors. Expression is Core or optional Magic Art. Density is Comfortable or Compact. Named palette variants are removed; parchment and night remain visual inspirations rather than additional theme modes.

Magic Art expresses discovery and transformation through geometry and purposeful motion. Decorative particles remain optional and require an application event handler. Familiar labels and readable content are the foundation for every expression.

## Documentation as a consumer

The entire documentation application imports Aar Loom package CSS. Public page shells, knowledge-portal layouts, source frames, compositions, and utilities replace private stylesheets. Displayed example source uses the same classes as its preview. Brand token overrides and runtime canvas dimensions are explicit CSS custom-property inputs.

See [adaptive layout](adaptive-layout.md) for Focus, Split, Studio, Wide, and prospective Spatial modes. An ordinary responsive page is not immersive VR support.
