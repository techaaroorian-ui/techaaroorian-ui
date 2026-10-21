import { useState } from "react";
import { ChevronDown, Download, Image, Sparkles, Copy, Trash2 } from "lucide-react";
import CodeBlock from "./CodeBlock";

const menuExample = `<details class="aar-menu">
  <summary class="aar-button" data-variant="flat" data-size="sm">
    <span>Export Asset</span>
    <svg class="aar-dropdown-arrow" ...></svg>
  </summary>
  <div class="aar-menu-dropdown" data-align="end">
    <button class="aar-menu-item" type="button" data-selected="true">
      <span class="aar-cluster aar-gap-2">
        <svg ...></svg>
        <span>High Resolution PNG</span>
      </span>
      <span class="aar-badge" data-variant="flat">4K</span>
    </button>
    <button class="aar-menu-item" type="button">
      <span class="aar-cluster aar-gap-2">
        <svg ...></svg>
        <span>Standard Web Graphic</span>
      </span>
      <span class="aar-badge" data-variant="flat">1080p</span>
    </button>
    <hr class="aar-menu-divider" />
    <button class="aar-menu-item" type="button">
      <span>Copy Raw SVG</span>
    </button>
  </div>
</details>`;

export default function MenuDocs() {
  const [selectedFormat, setSelectedFormat] = useState("png-4k");
  const [align, setAlign] = useState<"start" | "end">("start");

  return (
    <section className="aar-panel aar-stack" data-gap="4" aria-labelledby="menu-component-title">
      <div className="aar-cluster aar-justify-space-between aar-items-center">
        <div>
          <h3 id="menu-component-title" className="aar-heading">Menus &amp; Dropdowns</h3>
          <p className="aar-hint">
            Universal pure-HTML/CSS popover menus built on accessible <code>&lt;details class=&quot;aar-menu&quot;&gt;</code>. Flat surface elevation with subtle background colors and hard-to-notice hairline borders in both light and dark themes—zero drop shadows.
          </p>
        </div>
        <div className="aar-segmented" data-variant="flat" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={align === "start"}
            onClick={() => setAlign("start")}
          >
            Align Start
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={align === "end"}
            onClick={() => setAlign("end")}
          >
            Align End
          </button>
        </div>
      </div>

      {/* Live Interactive Specimen */}
      <div className="aar-panel aar-p-4">
        <details className="aar-menu" open>
          <summary className="aar-button" data-variant="flat" data-size="sm">
            <Download size={14} />
            <span>Export Options</span>
            <ChevronDown size={14} className="aar-dropdown-arrow" />
          </summary>
          <div className="aar-menu-dropdown" data-align={align}>
            <button
              className="aar-menu-item"
              type="button"
              data-selected={selectedFormat === "png-4k"}
              onClick={() => setSelectedFormat("png-4k")}
            >
              <span className="aar-cluster aar-gap-2 aar-items-center">
                <Image size={14} />
                <span>Ultra-HD PNG</span>
              </span>
              <span className="aar-badge" data-variant="flat">4K · 3840px</span>
            </button>
            <button
              className="aar-menu-item"
              type="button"
              data-selected={selectedFormat === "png-1080"}
              onClick={() => setSelectedFormat("png-1080")}
            >
              <span className="aar-cluster aar-gap-2 aar-items-center">
                <Image size={14} />
                <span>Social Card PNG</span>
              </span>
              <span className="aar-badge" data-variant="flat">1080p</span>
            </button>
            <button
              className="aar-menu-item"
              type="button"
              data-selected={selectedFormat === "ai"}
              onClick={() => setSelectedFormat("ai")}
            >
              <span className="aar-cluster aar-gap-2 aar-items-center">
                <Sparkles size={14} />
                <span>Generative Vector</span>
              </span>
              <span className="aar-badge" data-variant="flat">SVG</span>
            </button>
            <hr className="aar-menu-divider" />
            <button className="aar-menu-item" type="button">
              <span className="aar-cluster aar-gap-2 aar-items-center">
                <Copy size={14} />
                <span>Copy Image to Clipboard</span>
              </span>
            </button>
            <button className="aar-menu-item" type="button" disabled>
              <span className="aar-cluster aar-gap-2 aar-items-center">
                <Trash2 size={14} />
                <span>Archive Preset (Read-only)</span>
              </span>
            </button>
          </div>
        </details>
      </div>

      <CodeBlock title="menu.html" language="html" code={menuExample} />
      <p className="aar-hint">
        Use <code>data-align=&quot;end&quot;</code> when menus appear near the right edge of a viewport or header. Active items use <code>data-selected=&quot;true&quot;</code> with primary semantic tinting, while disabled options retain full accessibility.
      </p>
    </section>
  );
}
