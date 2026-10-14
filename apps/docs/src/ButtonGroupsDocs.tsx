import { useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import CodeBlock from "./CodeBlock";

const example = `<div class="aar-button-group" data-size="sm" role="group" aria-label="Canvas zoom">
  <button class="aar-icon-button" type="button" aria-label="Zoom out">−</button>
  <output class="aar-button-group-value" aria-label="Current zoom">100%</output>
  <button class="aar-icon-button" type="button" aria-label="Zoom in">+</button>
  <button class="aar-button" type="button">Reset</button>
</div>`;

export default function ButtonGroupsDocs() {
  const [zoom, setZoom] = useState(100);
  return <section className="aar-panel aar-stack" data-gap="4" aria-labelledby="button-groups-title">
    <h3 id="button-groups-title" className="aar-heading">Joined button groups</h3>
    <p>Join commands that operate on one value. Shared seams establish their relationship without an extra panel. Toolbar groups separate command families; segmented controls choose a mode.</p>
    <div className="aar-toolbar-group">
      <div className="aar-button-group" data-size="sm" role="group" aria-label="Demo canvas zoom">
        <button className="aar-icon-button" type="button" aria-label="Decrease demo zoom" disabled={zoom <= 50} onClick={() => setZoom(value => value - 10)}><Minus size={16}/></button>
        <output className="aar-button-group-value" aria-label="Demo zoom value">{zoom}%</output>
        <button className="aar-icon-button" type="button" aria-label="Increase demo zoom" disabled={zoom >= 150} onClick={() => setZoom(value => value + 10)}><Plus size={16}/></button>
        <button className="aar-button" type="button" onClick={() => setZoom(100)}><RotateCcw size={16}/>Reset</button>
      </div>
      <div className="aar-button-group" data-size="sm" data-orientation="vertical" role="group" aria-label="Vertical actions">
        <button className="aar-button" type="button">Copy</button><button className="aar-button" type="button" disabled>Paste</button>
      </div>
    </div>
    <CodeBlock title="button-group.html" language="html" code={example}/>
    <p className="aar-hint">Use direct children, short labels and an accessible group name. Native buttons retain ordinary Tab order; role="group" does not create arrow-key navigation. Applications bind values and commands. Put groups in a wrapping aar-toolbar-group when space is limited. Coarse pointers retain 44px targets.</p>
  </section>;
}
