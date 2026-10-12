import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { BookOpen, Layers, Palette } from "lucide-react";
import "@techaaroorian-ui/aar-loom/index.css";

const tabs = ["Overview", "Activity", "Settings"];

export default function NavigationExample() {
  const id = useId();
  const [active, setActive] = useState(0);
  const [created, setCreated] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  // Manual activation: arrows move focus; Enter/Space activate the button.
  function moveFocus(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    buttons.current[next]?.focus();
  }
  return (
    <section className="aar-root aar-paper" aria-label="Navigation example">
      <header className="aar-app-header">
        <a className="aar-brand" href="#/">Paper Studio</a>
        <div className="aar-app-header-actions">
          <a className="aar-button" data-variant="quiet" href="#/guides/philosophy">Design guide</a>
          <button className="aar-button" data-variant="primary" type="button" onClick={() => setCreated(created + 1)}>New project</button>
        </div>
      </header>
      <div className="aar-app-shell">
        <details className="aar-nav-disclosure" open>
          <summary>Workspace navigation</summary>
          <nav className="aar-sidenav" aria-label="Example documentation">
            <div>
              <p className="aar-sidenav-label">Build</p>
              <ul className="aar-sidenav-group">
                <li><a className="aar-sidenav-link" href="#/aar-loom" aria-current="page"><Palette size={18} aria-hidden="true" />Aar Loom</a></li>
                <li><a className="aar-sidenav-link" href="#/headless"><Layers size={18} aria-hidden="true" />Headless packages</a></li>
              </ul>
            </div>
            <div>
              <p className="aar-sidenav-label">Learn</p>
              <ul className="aar-sidenav-group">
                <li><a className="aar-sidenav-link" href="#/guides/philosophy"><BookOpen size={18} aria-hidden="true" />Design philosophy</a></li>
              </ul>
            </div>
          </nav>
        </details>
        <div className="aar-stack aar-gap-4">
          <nav className="aar-breadcrumb" aria-label="Example breadcrumb">
            <ol className="aar-breadcrumb-list">
              <li className="aar-breadcrumb-item"><a className="aar-breadcrumb-link" href="#/">Home</a><span className="aar-breadcrumb-separator" aria-hidden="true">/</span></li>
              <li className="aar-breadcrumb-item" aria-current="page">Paper Studio</li>
            </ol>
          </nav>
          <h3 className="aar-heading">Project workspace</h3>
          <div className="aar-tabs" data-variant="paper" role="tablist" aria-label="Project views">
            {tabs.map((tab, index) => (
              <button key={tab} ref={(element) => { buttons.current[index] = element; }}
                className="aar-tab" type="button" role="tab" id={`${id}-tab-${index}`}
                aria-controls={`${id}-panel-${index}`} aria-selected={active === index}
                tabIndex={active === index ? 0 : -1} onKeyDown={(event) => moveFocus(event, index)}
                onClick={() => setActive(index)}>{tab}</button>
            ))}
          </div>
          {tabs.map((tab, index) => (
            <section key={tab} className="aar-tabpanel aar-paper aar-panel aar-stack aar-gap-3" data-paper="sage"
              role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`}
              tabIndex={0} hidden={active !== index}>
              <h4 className="aar-heading">{tab}</h4>
              {index === 0 && <p>Group commands in the header, routes in the side navigation, and related views in tabs.</p>}
              {index === 1 && <p>{created ? `${created} project${created === 1 ? "" : "s"} created in this local demo.` : "No project activity yet. Use New project to add an entry."}</p>}
              {index === 2 && <label className="aar-field">Workspace name<input className="aar-input" defaultValue="Paper Studio" /></label>}
            </section>
          ))}
          <p className="aar-hint" role="status">{created ? `${created} project${created === 1 ? "" : "s"} created locally.` : "Local demo. Navigation links open the corresponding documentation page."}</p>
        </div>
      </div>
    </section>
  );
}
