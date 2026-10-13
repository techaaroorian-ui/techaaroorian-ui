import CodeBlock from "./CodeBlock";
import workspaceHtml from "./examples/aar-loom/workspace.html?raw";

const mappings = [
  ["Yuwbrndr", "Workspace, inspector, toolbars, gallery, slide strip, export feedback", "aar-workspace-*, aar-inspector-section, aar-toolbar-group, aar-grid, aar-slide-strip, aar-toast"],
  ["PDFManager / Paprbndr", "Document tools, reader regions, metadata, file intake, comparison controls", "aar-workspace-*, aar-property-*, aar-scroll-area, aar-file-intake, aar-range"],
  ["steprndr", "Editor/output split, variables, playback buttons, notices", "aar-split, aar-code, aar-property-*, aar-toolbar, aar-button, aar-callout"],
  ["SlotSyncro", "Dashboard shell, availability fields, voting choices, booking state", "aar-app-shell, aar-sidenav-*, aar-field, aar-form-row, aar-segmented, aar-progress"],
  ["prtotDom", "Editor/canvas/inspector, alignment toolbar, source exports", "aar-workspace-*, aar-inspector-section, aar-toolbar-group, aar-code, aar-dialog"],
];

export default function ProjectMigrationDocs() {
  return <section className="aar-guide-section aar-stack aar-gap-6">
    <h2 className="aar-heading">Project migration foundations</h2>
    <p>Import Aar Loom once and use its public classes with ordinary HTML or your own components. These foundations cover the current projects' common interface needs; they do not replace their rendering engines or business behavior.</p>
    <div className="aar-table-scroll"><table className="aar-table">
      <caption>Workspace project styling map</caption>
      <thead><tr><th>Project</th><th>Interface regions</th><th>Public classes</th></tr></thead>
      <tbody>{mappings.map(([project, regions, classes]) => <tr key={project}><th scope="row">{project}</th><td>{regions}</td><td><code>{classes}</code></td></tr>)}</tbody>
    </table></div>
    <div dangerouslySetInnerHTML={{ __html: workspaceHtml }} />
    <CodeBlock title="workspace.html" language="html" code={workspaceHtml} />
    <p className="aar-hint">The studio layout uses its container width: three regions above 72rem, inspector below between 48–72rem, and all regions stacked below 48rem. Native disclosure keeps tools reachable. Resizing, persistence, mobile sheets, focus restoration, and task state need application code or future headless controllers.</p>
    <CodeBlock title="Import and custom dimensions" language="css" code={'@import "@techaaroorian-ui/aar-loom/index.css";\n\n/* Optional application inputs; the framework owns the layout rules. */\n.my-workspace {\n  --aar-navigation-width: 14rem;\n  --aar-inspector-width: 18rem;\n  --aar-scroll-max-height: 28rem;\n}'} />
    <p>Repeatable Sections and Asset Gallery behavior are planned separately. Their current visual building blocks are fields, grids, panels, file rows, buttons, and state feedback. No validation or upload library is required by Aar Loom.</p>
  </section>;
}
