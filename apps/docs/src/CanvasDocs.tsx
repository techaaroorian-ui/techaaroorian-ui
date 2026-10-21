import { useState } from "react";
import type { CSSProperties } from "react";
import { Minus, Plus, RotateCcw, Sparkles, Layout } from "lucide-react";
import CodeBlock from "./CodeBlock";

const canvasExample = `<div class="aar-canvas-viewport">
  <!-- Floating Canvas Ribbon -->
  <header class="aar-canvas-ribbon">
    <div class="aar-cluster aar-gap-2 aar-items-center">
      <span class="aar-badge" data-variant="flat">16:9</span>
      <span>1920 × 1080</span>
    </div>
    <div class="aar-button-group" data-size="sm">
      <button class="aar-icon-button" type="button" aria-label="Zoom out">−</button>
      <output class="aar-button-group-value">100%</output>
      <button class="aar-icon-button" type="button" aria-label="Zoom in">+</button>
    </div>
  </header>

  <!-- Scaled Canvas Frame -->
  <div class="aar-canvas-frame" style="--aar-canvas-ratio: 16/9; --aar-canvas-frame-width: 640px;">
    <div class="aar-canvas-preview" style="--aar-canvas-zoom: 1;">
      <!-- Artwork / Custom Graphic / Slide -->
    </div>
  </div>
</div>`;

const altarExample = `<!-- Canvas Altar with Corner Brackets -->
<div class="aar-altar" data-corner-brackets="true">
  <div class="aar-altar-canvas">
    <!-- Clean artwork stage framed by etched corner brackets -->
  </div>
</div>`;

const emptyExample = `<div class="aar-canvas-empty">
  <div class="aar-canvas-empty-icon">
    <svg ...></svg>
  </div>
  <div class="aar-canvas-empty-text">
    <h3>No Active Canvas Selected</h3>
    <p>Choose an artboard template or create a custom canvas to begin authoring.</p>
  </div>
  <div class="aar-canvas-empty-actions">
    <button class="aar-button" data-variant="primary" data-size="sm">
      Create Blank Artboard
    </button>
  </div>
</div>`;

export default function CanvasDocs() {
  const [zoom, setZoom] = useState(100);
  const [ratio, setRatio] = useState<"16/9" | "1/1" | "9/16">("16/9");
  const [viewMode, setViewMode] = useState<"frame" | "altar" | "empty">("frame");

  const frameWidth = ratio === "9/16" ? "12rem" : "22rem";
  const frameHeight = ratio === "16/9" ? "12.375rem" : ratio === "1/1" ? "22rem" : "21.33rem";
  const frameStyles = {
    "--aar-canvas-frame-width": frameWidth,
    "--aar-canvas-frame-height": frameHeight,
    "--aar-canvas-ratio": ratio,
  } as CSSProperties;

  const previewStyles = {
    "--aar-canvas-zoom": `${zoom / 100}`,
  } as CSSProperties;

  return (
    <section className="aar-panel aar-stack" data-gap="4" aria-labelledby="canvas-component-title">
      <div className="aar-cluster aar-justify-space-between aar-items-center">
        <div>
          <h3 id="canvas-component-title" className="aar-heading">Canvas &amp; Viewport</h3>
          <p className="aar-hint">
            Universal creative viewport primitives. Bounded aspect-ratio artboards, zoom/pan transforms, floating ribbons, and structured empty states for creative tools and workspaces.
          </p>
        </div>
        <div className="aar-cluster aar-gap-2">
          <div className="aar-segmented" data-variant="flat" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "frame"}
              onClick={() => setViewMode("frame")}
            >
              Live Artboard
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "altar"}
              onClick={() => setViewMode("altar")}
            >
              Corner Altar
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "empty"}
              onClick={() => setViewMode("empty")}
            >
              Empty State
            </button>
          </div>
        </div>
      </div>

      {/* Live Interactive Specimen */}
      <div className="aar-canvas-viewport aar-mt-2 aar-panel aar-p-4">
        {viewMode === "frame" && (
          <>
            {/* Ribbon Toolbar */}
            <header className="aar-canvas-ribbon aar-mb-4">
              <div className="aar-cluster aar-gap-2 aar-items-center">
                <div className="aar-segmented" data-variant="flat" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={ratio === "16/9"}
                    onClick={() => setRatio("16/9")}
                  >
                    16:9
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={ratio === "1/1"}
                    onClick={() => setRatio("1/1")}
                  >
                    1:1
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={ratio === "9/16"}
                    onClick={() => setRatio("9/16")}
                  >
                    9:16
                  </button>
                </div>
                <span className="aar-badge" data-variant="flat">
                  {ratio === "16/9" ? "1920 × 1080" : ratio === "1/1" ? "1080 × 1080" : "1080 × 1920"}
                </span>
              </div>

              <div className="aar-button-group" data-size="sm" role="group">
                <button
                  className="aar-icon-button"
                  type="button"
                  aria-label="Zoom out"
                  disabled={zoom <= 50}
                  onClick={() => setZoom((z) => Math.max(50, z - 10))}
                >
                  <Minus size={14} />
                </button>
                <output className="aar-button-group-value">{zoom}%</output>
                <button
                  className="aar-icon-button"
                  type="button"
                  aria-label="Zoom in"
                  disabled={zoom >= 150}
                  onClick={() => setZoom((z) => Math.min(150, z + 10))}
                >
                  <Plus size={14} />
                </button>
                <button
                  className="aar-icon-button"
                  type="button"
                  aria-label="Reset zoom"
                  onClick={() => setZoom(100)}
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </header>

            {/* Scaled Frame */}
            <div className="aar-canvas-frame aar-panel aar-p-0" style={frameStyles}>
              <div
                className="aar-canvas-preview aar-stack aar-items-center aar-justify-center aar-p-4"
                style={previewStyles}
              >
                <Sparkles size={28} />
                <strong>Universal Canvas Artboard</strong>
                <p className="aar-hint aar-m-0">
                  Isolated workspace frame ({ratio}) rendered at {zoom}%
                </p>
              </div>
            </div>
          </>
        )}

        {viewMode === "altar" && (
          <div
            className="aar-altar aar-min-h-240px aar-display-flex aar-items-center aar-justify-center aar-bg-surface-subtle aar-radius-radius-md"
            data-corner-brackets="true"
          >
            <div className="aar-text-align-center">
              <span className="aar-display-inline-flex aar-items-center aar-justify-center aar-m-0-auto-0-5rem aar-ink-primary">
                <Sparkles size={28} />
              </span>
              <h4 className="aar-m-0-25rem-0 aar-text-1-1rem">
                Framed Altar Viewport (.aar-altar)
              </h4>
              <p className="aar-hint aar-m-0">
                Framed with etched corner brackets (<code>data-corner-brackets=&quot;true&quot;</code>) and subtle hairline perimeter. Artwork rendered with zero chrome distortion.
              </p>
            </div>
          </div>
        )}

        {viewMode === "empty" && (
          <div className="aar-canvas-empty">
            <div className="aar-canvas-empty-icon">
              <Layout size={24} />
            </div>
            <div className="aar-canvas-empty-text">
              <h3>Empty Workspace Canvas</h3>
              <p>
                No active document or template loaded. The structured empty canvas state cleanly prompts users toward initiation actions without visual clutter.
              </p>
            </div>
            <div className="aar-canvas-empty-actions">
              <button
                type="button"
                className="aar-button"
                data-variant="primary"
                data-size="sm"
                onClick={() => setViewMode("frame")}
              >
                Create New Graphic
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="aar-stack aar-gap-4">
        {viewMode === "frame" && (
          <CodeBlock title="canvas-frame.html" language="html" code={canvasExample} />
        )}
        {viewMode === "altar" && (
          <CodeBlock title="canvas-altar.html" language="html" code={altarExample} />
        )}
        {viewMode === "empty" && (
          <CodeBlock title="canvas-empty.html" language="html" code={emptyExample} />
        )}
      </div>

      <p className="aar-hint">
        Canvas viewports enforce zero background bleed and container constraints. Floating ribbons allow zooming and aspect ratio switching without cluttering sidebars or application navigation.
      </p>
    </section>
  );
}
