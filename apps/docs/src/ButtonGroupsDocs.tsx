import { useState } from "react";
import {
  Minus,
  Plus,
  RotateCcw,
  Copy,
  Scissors,
  Clipboard,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import CodeBlock from "./CodeBlock";

const horizontalExample = `<div class="aar-button-group" data-size="sm" role="group" aria-label="Canvas zoom">
  <button class="aar-icon-button" type="button" aria-label="Zoom out">−</button>
  <output class="aar-button-group-value" aria-label="Current zoom">100%</output>
  <button class="aar-icon-button" type="button" aria-label="Zoom in">+</button>
  <button class="aar-button" type="button">Reset</button>
</div>`;

const editorExample = `<div class="aar-toolbar-group">
  <div class="aar-button-group" data-size="sm" role="group" aria-label="Text formatting">
    <button class="aar-icon-button" type="button" aria-label="Bold"><Bold /></button>
    <button class="aar-icon-button" type="button" aria-label="Italic"><Italic /></button>
    <button class="aar-icon-button" type="button" aria-label="Underline"><Underline /></button>
  </div>
  <div class="aar-button-group" data-size="sm" role="group" aria-label="Text alignment">
    <button class="aar-icon-button" type="button" aria-label="Align left"><AlignLeft /></button>
    <button class="aar-icon-button" type="button" aria-label="Align center"><AlignCenter /></button>
    <button class="aar-icon-button" type="button" aria-label="Align right"><AlignRight /></button>
  </div>
</div>`;

export default function ButtonGroupsDocs() {
  const [zoom, setZoom] = useState(100);
  const [size, setSize] = useState<"xs" | "sm" | "md">("sm");
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [formats, setFormats] = useState<Set<string>>(new Set(["bold"]));

  const toggleFormat = (key: string) => {
    const next = new Set(formats);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    setFormats(next);
  };

  return (
    <section
      className="aar-panel aar-stack aar-gap-6"
      aria-labelledby="button-groups-title"
    >
      <div className="aar-cluster aar-justify-space-between aar-items-flex-start aar-flex-wrap-wrap aar-gap-4">
        <div>
          <p className="aar-eyebrow">02 / Core Component · Command Grouping</p>
          <h2 id="button-groups-title" className="aar-heading">
            Joined Button Groups
          </h2>
          <p className="aar-hint aar-max-w-prose">
            Seamless command clusters connected with shared hairline borders and
            zero drop shadows. Use button groups when multiple triggers operate
            on a shared numerical value or related editing command family.
          </p>
        </div>

        {/* Size switcher */}
        <div className="aar-segmented" data-variant="flat" role="tablist">
          {(["xs", "sm", "md"] as const).map((s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={size === s}
              onClick={() => setSize(s)}
            >
              Size: {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Live Interactive Specimen */}
      <div className="aar-stack aar-gap-4 aar-p-4 aar-bg-surface-subtle aar-radius-radius-md aar-border-1px-solid-border">
        <div>
          <p className="aar-eyebrow aar-mb-2">1. Numeric Value Stepper &amp; Reset</p>
          <div className="aar-toolbar-group aar-flex-wrap-wrap aar-gap-3">
            <div
              className="aar-button-group"
              data-size={size}
              role="group"
              aria-label="Canvas zoom controls"
            >
              <button
                className="aar-icon-button"
                type="button"
                aria-label="Decrease zoom"
                disabled={zoom <= 50}
                onClick={() => setZoom((v) => Math.max(50, v - 10))}
              >
                <Minus size={size === "xs" ? 12 : size === "sm" ? 14 : 16} />
              </button>
              <output
                className="aar-button-group-value aar-font-mono"
                aria-label="Current zoom value"
              >
                {zoom}%
              </output>
              <button
                className="aar-icon-button"
                type="button"
                aria-label="Increase zoom"
                disabled={zoom >= 200}
                onClick={() => setZoom((v) => Math.min(200, v + 10))}
              >
                <Plus size={size === "xs" ? 12 : size === "sm" ? 14 : 16} />
              </button>
              <button
                className="aar-button"
                type="button"
                onClick={() => setZoom(100)}
              >
                <RotateCcw
                  size={size === "xs" ? 12 : size === "sm" ? 14 : 16}
                />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        <div>
          <p className="aar-eyebrow aar-mb-2">2. Rich Text &amp; Inspector Toolbar Groups</p>
          <div className="aar-toolbar-group aar-flex-wrap-wrap aar-gap-3">
            {/* Format group */}
            <div
              className="aar-button-group"
              data-size={size}
              role="group"
              aria-label="Text formatting"
            >
              <button
                type="button"
                className="aar-icon-button"
                aria-label="Toggle Bold"
                data-selected={formats.has("bold")}
                onClick={() => toggleFormat("bold")}
              >
                <Bold size={size === "xs" ? 12 : size === "sm" ? 14 : 16} />
              </button>
              <button
                type="button"
                className="aar-icon-button"
                aria-label="Toggle Italic"
                data-selected={formats.has("italic")}
                onClick={() => toggleFormat("italic")}
              >
                <Italic size={size === "xs" ? 12 : size === "sm" ? 14 : 16} />
              </button>
              <button
                type="button"
                className="aar-icon-button"
                aria-label="Toggle Underline"
                data-selected={formats.has("underline")}
                onClick={() => toggleFormat("underline")}
              >
                <Underline size={size === "xs" ? 12 : size === "sm" ? 14 : 16} />
              </button>
            </div>

            {/* Alignment group */}
            <div
              className="aar-button-group"
              data-size={size}
              role="group"
              aria-label="Text alignment"
            >
              <button
                type="button"
                className="aar-icon-button"
                aria-label="Align Left"
                data-selected={align === "left"}
                onClick={() => setAlign("left")}
              >
                <AlignLeft size={size === "xs" ? 12 : size === "sm" ? 14 : 16} />
              </button>
              <button
                type="button"
                className="aar-icon-button"
                aria-label="Align Center"
                data-selected={align === "center"}
                onClick={() => setAlign("center")}
              >
                <AlignCenter size={size === "xs" ? 12 : size === "sm" ? 14 : 16} />
              </button>
              <button
                type="button"
                className="aar-icon-button"
                aria-label="Align Right"
                data-selected={align === "right"}
                onClick={() => setAlign("right")}
              >
                <AlignRight size={size === "xs" ? 12 : size === "sm" ? 14 : 16} />
              </button>
            </div>

            {/* Clipboard group */}
            <div
              className="aar-button-group"
              data-size={size}
              role="group"
              aria-label="Clipboard actions"
            >
              <button
                type="button"
                className="aar-button"
                aria-label="Copy selection"
              >
                <Copy size={size === "xs" ? 12 : size === "sm" ? 14 : 16} />
                <span>Copy</span>
              </button>
              <button
                type="button"
                className="aar-button"
                aria-label="Cut selection"
              >
                <Scissors size={size === "xs" ? 12 : size === "sm" ? 14 : 16} />
                <span>Cut</span>
              </button>
              <button
                type="button"
                className="aar-button"
                aria-label="Paste from clipboard"
              >
                <Clipboard size={size === "xs" ? 12 : size === "sm" ? 14 : 16} />
                <span>Paste</span>
              </button>
            </div>
          </div>
        </div>

        <div>
          <p className="aar-eyebrow aar-mb-2">3. Vertical Command Stack</p>
          <div
            className="aar-button-group"
            data-size={size}
            data-orientation="vertical"
            role="group"
            aria-label="Vertical editor controls"
          >
            <button className="aar-button" type="button">
              Bring to Front
            </button>
            <button className="aar-button" type="button">
              Send Backward
            </button>
            <button className="aar-button" type="button" disabled>
              Lock Layer (Protected)
            </button>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="aar-stack aar-gap-4">
        <div>
          <p className="aar-eyebrow aar-mb-2">HTML Stepper Group</p>
          <CodeBlock
            title="button-group-stepper.html"
            language="html"
            code={horizontalExample}
          />
        </div>
        <div>
          <p className="aar-eyebrow aar-mb-2">Toolbar Groups &amp; Alignment</p>
          <CodeBlock
            title="toolbar-groups.html"
            language="html"
            code={editorExample}
          />
        </div>
      </div>

      {/* Accessibility & Design Details */}
      <div className="aar-grid-guide-2 aar-gap-4">
        <div className="aar-panel aar-p-4" data-variant="flat">
          <h4 className="aar-heading aar-text-1rem aar-mb-2">
            Shared Seams &amp; Radii
          </h4>
          <p className="aar-hint">
            Direct children within <code>.aar-button-group</code> have their
            adjacent border radii removed so the collection forms a solid,
            unified instrument. Negative inline margins prevent doubled borders,
            ensuring a crisp 1px hairline divider.
          </p>
        </div>
        <div className="aar-panel aar-p-4" data-variant="flat">
          <h4 className="aar-heading aar-text-1rem aar-mb-2">
            Keyboard Navigation &amp; ARIA
          </h4>
          <p className="aar-hint">
            Include <code>role=&quot;group&quot;</code> and an informative{" "}
            <code>aria-label</code> on the container. Native buttons retain
            standard Tab traversal and Enter/Space actuation. Disabled buttons
            retain accessible focus boundaries.
          </p>
        </div>
      </div>
    </section>
  );
}
