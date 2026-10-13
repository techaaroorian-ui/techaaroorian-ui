# Aar Loom design rules

Status: alpha design contract. These rules guide applications built with ordinary HTML, custom components, or optional headless packages. They do not require a particular JavaScript framework.

**Paper groups content. Ink communicates. Motion explains change.**

“Implemented” means the public CSS supplies a foundation, not that every consumer automatically satisfies the rule. “Application guidance” requires product decisions, markup, or behavior. Spatial UI remains future work.

## 1. Give the task a clear hierarchy

Make the current task the strongest region. Give each task region one visually dominant action; secondary actions use outlined or quiet controls. Separate navigation from task commands. Group by purpose before adding a container.

Application guidance. Review: without reading every label, can someone locate the current task and its next action? Avoid several equally prominent primary actions in the same region.

## 2. Use paper as a surface, not a decoration

Start with a warm neutral workspace and solid sheets. Use a colored sheet when it helps group a related task, collection, or explanation. Prefer one accent per task region; a catalog may use several to distinguish groups. Do not wrap every nested element in another colored card. Do not put grain, textures, gradients, or transparent layers behind reading content in Core.

Implemented foundation: `aar-paper` with `data-paper="sage|clay|lavender|ochre|brand"`. The four named accents are regional surface colors, not themes or status meanings. Brand sheets derive from `--aar-primary`; applications may override the paper tokens. Never communicate success through sage or failure through clay alone.

Review: remove the accent temporarily. Grouping and meaning must survive through headings, spacing, and labels.

## 3. Use borders where a boundary matters

Large paper regions are borderless. Inputs and outlined controls retain a thin boundary; quiet actions may rely on their label and interaction feedback. Menus and dialogs retain boundaries because they overlap content. Use dividers to separate adjacent rows only when spacing is insufficient. Avoid framing a section and every child inside it.

Implemented foundation: borderless paper, panels, metric cards, empty-state regions, and documentation specimens; bordered form controls; visible selected-card outlines; and bounded overlays. Add an explicit divider or control boundary only when the task needs one. Keyboard focus is an explicit outline without a Core glow halo. Selection and focus are different states.

Review: each visible border should identify a control, overlap, separation, or state.

## 4. Keep the geometry consistent

Core controls, paper sheets, and general panels use 4 CSS px corners at the default 16px root size. Larger compositions may use 8px. Circular geometry is for avatars, swatches, handles, and genuinely round controls. Do not mix arbitrary corner shapes in one application region.

Implemented tokens: `--aar-radius-sm`, `--aar-radius-md`, `--aar-radius-lg`. Values remain rem-based and scale with root text size.

## 5. Let spacing show relationships

Use a 4px base rhythm: 4 / 8 / 12 / 16 / 24 / 32 at the default root size. Labels and inputs typically use 8; peer controls 8–12; content within a group 16; separate groups 24–32. Default panel padding is 24, compact is 16. These are starting values, not a reason to compress long labels or translations.

Implemented tokens: `--aar-space-*`, `--aar-panel-padding`; compositions: `aar-stack`, `aar-cluster`, `aar-grid`, `aar-split`. Application guidance: choose gaps based on relationship and available space. Avoid accumulated padding from unnecessary nested panels.

## 6. Establish readable ink hierarchy

Use one sans-serif family for interface content and monospace for code or data that benefits from alignment. Start with 16px body text and 1.5 line height; compact controls and supporting labels may use 14px. Use 20px / 600 section headings and responsive page titles. Keep extended prose around 45–75 characters per line. Do not reduce text size to solve an overcrowded layout.

Implemented foundation: font tokens, `aar-heading`, `aar-title`, and scoped `aar-root` typography. Body sizing and prose width remain application guidance; the framework does not impose a global browser font-size reset. Some existing small metadata styles still need review against the 14px guidance.

Review: inspect actual content at 200% browser zoom, with long labels, and at 320px width. Essential information must remain reachable. Aim for at least 4.5:1 contrast for ordinary reading text and 3:1 for essential non-text state indicators. Consumer-supplied colors must be checked again; default contrast checks do not certify a custom theme or the whole application.

## 7. Keep appearance, brand, density, and expression separate

Appearance is Light / Dark / System. Brand overrides semantic roles such as primary and its foreground. Density is Comfortable / Compact. Expression is Core / optional Magic Art. Do not add theme modes merely to change a section's paper color. A dark appearance uses its own surfaces and ink; do not invert the page as an image.

Implemented foundation: theme and density attributes, semantic tokens, optional Magic Art. Custom foregrounds are an application responsibility. Changing appearance must not change task state or reading order.

## 8. Make every state tell the truth

Hover is temporary color or boundary feedback; Core cards do not lift. Selected is persistent: tint or inset outline plus a semantic selected/pressed state appropriate to the widget. Focus is a visible keyboard outline. Pressed may compress slightly without shifting neighboring content. Invalid combines a control cue with a specific explanation. Disabled remains distinguishable and must not be the only explanation for an unavailable action.

Pending means work is unresolved, not failed. Pair pending, success, and error with readable text. Announce meaningful asynchronous changes with appropriate live-region semantics. A timeout does not prove a payment or background operation failed.

Implemented visual foundation; application guidance supplies correct ARIA, validation, asynchronous state, and announcements. CSS cannot implement state machines or accessible custom widget behavior by itself.

## 9. Use motion to connect states

Use roughly 140ms for control feedback and 180–220ms for short reveals. Entrances may move up to 6px; Core hover must not move content. Keep controls usable during transitions. Avoid animation on every nested child, repeated attention-grabbing loops, and decorative typing of labels or placeholders.

Implemented tokens and select reveal: `--aar-duration`, `--aar-duration-enter`, `--aar-enter-offset`, `aar-enter`. With reduced motion, preserve the final state without movement. Optional Magic Art must not reduce text readability or replace feedback. Effects that use JavaScript must honor reduced motion in that code too.

## 10. Reserve depth for overlap

Core cards and grouped content stay flat. Menus and dialogs may use a small offset edge shadow so their relationship to the underlying sheet is clear. Do not assign elevation to every section or increase shadow on ordinary hover. Magic Art may introduce glow or expressive depth only when enabled.

Implemented shadow tokens; custom surfaces and decorations still require review.

## 11. Adapt to room and input

Begin with one main region (Focus). Add one supporting region when both fit comfortably (Split). Studio can show up to two supporting regions around the task; Wide gives extra room to the work rather than stretching reading lines. Collapse or move tools through reachable disclosure controls; never hide the only path to an action. Preserve task state and focus when presentation changes.

Implemented foundation: wrapping clusters, bounded grids, responsive split, guide and workbench layouts. Focus/Split/Studio/Wide application transitions are guidance, not a finished docking engine. The current `aar-split` breakpoint is 60rem; products should still evaluate their real content.

Start with 44px primary interaction targets. Compact desktop controls can use the 36px density token, but coarse-pointer targets must stay comfortable. The smallest control variants require product-level review; density does not shrink reading text. Test portrait, landscape, 320 / 768 / 1440px, zoom, keyboard, and long content. Spatial/VR layouts need separate prototypes and input research; a responsive web page is not VR support.

## 12. Prefer native semantics and clear behavior boundaries

Use native buttons, inputs, selects, headings, and dialogs where appropriate. Link labels and errors to their controls. Use icons with labels or accessible names; decoration is hidden from assistive technology. Custom widgets need their own keyboard, dismissal, and focus behavior, with or without the optional headless packages. CSS supplies appearance and layout rather than mandatory component ownership.

Application guidance. Review the same task with pointer, keyboard, and assistive technology. For example, a native select can use CSS option reveals where supported and retain a platform picker elsewhere.

## Review before shipping

Check a real task, not only isolated specimens: default, hover, focus, selected, disabled, invalid, pending, empty, and error states. Review light/dark/custom brand, narrow/wide space, comfortable/compact density, zoom, and reduced motion. Confirm that examples show working code and that the application uses public Aar Loom styles. Automated checks support this review; they do not replace it or certify accessibility.

The alpha docs still contain experimental compositions and small metadata styles. Treat them as examples under review, not exceptions that silently redefine these rules. Yuwbrndr is the next application where this contract should be validated.
