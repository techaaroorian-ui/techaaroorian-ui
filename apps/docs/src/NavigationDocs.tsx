import NavigationExample from "./NavigationExample";
import source from "./NavigationExample.tsx?raw";
import CodeBlock from "./CodeBlock";

export default function NavigationDocs() {
  return (
    <section className="aar-guide-section aar-stack aar-gap-6">
      <div className="aar-stack aar-gap-3">
        <h2 className="aar-heading">Tabs, Side Navigation &amp; Headers</h2>
        <p>Headers hold identity and task commands. Side navigation changes location. Tabs switch related views within the same location. Breadcrumbs show ancestry. Each has its own purpose and semantic markup.</p>
        <p className="aar-hint">The shell stacks below 54rem. Navigation remains reachable and can be collapsed with native details. Tab arrows move focus; Enter or Space selects a view. Paper tabs use fill and a text underline rather than a thick selection rail.</p>
      </div>
      <NavigationExample />
      <div className="aar-table-scroll">
        <table className="aar-table">
          <caption>Public navigation classes</caption>
          <thead><tr><th>Pattern</th><th>Classes</th><th>Responsibility</th></tr></thead>
          <tbody>
            <tr><td>Header</td><td><code>aar-app-header</code>, <code>aar-app-header-actions</code></td><td>Wrapping identity and commands; sticky behavior is an application decision.</td></tr>
            <tr><td>App shell</td><td><code>aar-app-shell</code></td><td>Side region and content, stacked in narrow space.</td></tr>
            <tr><td>Side navigation</td><td><code>aar-sidenav</code>, <code>aar-sidenav-group</code>, <code>aar-sidenav-label</code>, <code>aar-sidenav-link</code></td><td>Route links with <code>aria-current="page"</code>; no focus or routing engine.</td></tr>
            <tr><td>Disclosure</td><td><code>aar-nav-disclosure</code></td><td>Native details/summary, no script required.</td></tr>
            <tr><td>Tabs</td><td><code>aar-tabs</code>, <code>aar-tab</code>, <code>aar-tabpanel</code></td><td>Default underline, pills, or paper styling. Application code owns selection, focus and panel visibility.</td></tr>
            <tr><td>Breadcrumbs</td><td><code>aar-breadcrumb</code>, <code>aar-breadcrumb-list</code>, <code>aar-breadcrumb-item</code>, <code>aar-breadcrumb-link</code></td><td>Ordered route ancestry with a named nav and current page.</td></tr>
          </tbody>
        </table>
      </div>
      <CodeBlock title="NavigationExample.tsx" language="tsx" code={source} />
      <CodeBlock title="Plain HTML header and side navigation" language="html" code={'<div class="aar-root">\n  <header class="aar-app-header">\n    <a class="aar-brand" href="/">Paper Studio</a>\n    <nav class="aar-app-header-actions" aria-label="Account">\n      <a class="aar-button" href="/account">Account</a>\n    </nav>\n  </header>\n  <div class="aar-app-shell">\n    <details class="aar-nav-disclosure" open>\n      <summary>Workspace navigation</summary>\n      <nav class="aar-sidenav" aria-label="Workspace">\n        <ul class="aar-sidenav-group">\n          <li><a class="aar-sidenav-link" href="/projects" aria-current="page">Projects</a></li>\n          <li><a class="aar-sidenav-link" href="/settings">Settings</a></li>\n        </ul>\n      </nav>\n    </details>\n    <main class="aar-panel aar-paper" data-paper="sage">\n      <h1 class="aar-title">Projects</h1>\n      <p>Your project content goes here.</p>\n    </main>\n  </div>\n</div>'} />
    </section>
  );
}
