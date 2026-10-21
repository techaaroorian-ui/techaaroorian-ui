import { useState } from "react";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MoreHorizontal,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import CodeBlock from "./CodeBlock";

interface TableRowData {
  id: string;
  name: string;
  role: string;
  type: string;
  status: "active" | "draft" | "review";
  records: number;
  size: string;
  updated: string;
}

const sampleData: TableRowData[] = [
  {
    id: "ds-01",
    name: "Aar Loom Core Tokens",
    role: "Global Design System",
    type: "CSS Library",
    status: "active",
    records: 142,
    size: "24.8 KB",
    updated: "Just now",
  },
  {
    id: "ds-02",
    name: "Yuwbrndr Artboards",
    role: "Vector Studio Engine",
    type: "Studio Component",
    status: "active",
    records: 64,
    size: "18.2 KB",
    updated: "2 hrs ago",
  },
  {
    id: "ds-03",
    name: "Arcane Atelier Palette",
    role: "Color Transmutation",
    type: "Theme Token",
    status: "review",
    records: 38,
    size: "9.4 KB",
    updated: "Yesterday",
  },
  {
    id: "ds-04",
    name: "Pan-Zoom State Matrix",
    role: "Infinite Canvas Driver",
    type: "State Machine",
    status: "draft",
    records: 12,
    size: "5.1 KB",
    updated: "3 days ago",
  },
  {
    id: "ds-05",
    name: "File Intake Pipeline",
    role: "Drag & Drop Ingestion",
    type: "Headless Utility",
    status: "active",
    records: 96,
    size: "32.0 KB",
    updated: "4 days ago",
  },
];

const basicTableCode = `<div class="aar-table-container" data-variant="flat">
  <table class="aar-table" data-hover="true" data-striped="true" data-size="sm">
    <thead>
      <tr>
        <th>Artifact</th>
        <th>Type</th>
        <th>Status</th>
        <th class="aar-num">Records</th>
        <th class="aar-num">Size</th>
      </tr>
    </thead>
    <tbody>
      <tr aria-selected="false">
        <td>Aar Loom Tokens</td>
        <td>Design System</td>
        <td><span class="aar-badge" data-tone="success">Active</span></td>
        <td class="aar-num">142</td>
        <td class="aar-num">24.8 KB</td>
      </tr>
    </tbody>
  </table>
</div>`;

export default function TableDocs() {
  const [striped, setStriped] = useState(true);
  const [hover, setHover] = useState(true);
  const [bordered, setBordered] = useState(false);
  const [sticky, setSticky] = useState(true);
  const [variant, setVariant] = useState<"default" | "flat">("flat");
  const [size, setSize] = useState<"sm" | "md" | "lg">("sm");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(["ds-01", "ds-02"]),
  );

  const toggleSelectAll = () => {
    if (selectedIds.size === sampleData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sampleData.map((d) => d.id)));
    }
  };

  const toggleRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  return (
    <section
      className="aar-panel aar-stack aar-gap-6"
      aria-labelledby="tables-title"
    >
      <div className="aar-cluster aar-justify-space-between aar-items-flex-start aar-flex-wrap-wrap aar-gap-4">
        <div>
          <p className="aar-eyebrow">09 / Core Component · Data Presentation</p>
          <h2 id="tables-title" className="aar-heading">
            Tables &amp; Data Grids
          </h2>
          <p className="aar-hint aar-max-w-prose">
            High-density, semantic data grids built purely with standard HTML5{" "}
            <code>&lt;table&gt;</code> elements and responsive{" "}
            <code>.aar-table-container</code>. Zero drop shadows, hairline
            borders (<code>rgba(15, 23, 42, 0.08)</code> /{" "}
            <code>rgba(255, 255, 255, 0.08)</code>), with clear background
            stepping between surface, header, and active row states.
          </p>
        </div>

        {/* Live Config Controls */}
        <div className="aar-toolbar aar-gap-2">
          <div className="aar-segmented" data-variant="flat" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={variant === "flat"}
              onClick={() => setVariant("flat")}
            >
              Flat
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={variant === "default"}
              onClick={() => setVariant("default")}
            >
              Surface
            </button>
          </div>

          <div className="aar-segmented" data-variant="flat" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={size === "sm"}
              onClick={() => setSize("sm")}
            >
              Compact (sm)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={size === "md"}
              onClick={() => setSize("md")}
            >
              Comfortable (md)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={size === "lg"}
              onClick={() => setSize("lg")}
            >
              Spacious (lg)
            </button>
          </div>
        </div>
      </div>

      {/* Feature Toggles Bar */}
      <div className="aar-cluster aar-gap-4 aar-items-center aar-p-3 aar-bg-surface-subtle aar-radius-radius-sm aar-flex-wrap-wrap">
        <span className="aar-eyebrow aar-mr-2">Table Modifiers:</span>
        <label className="aar-cluster aar-gap-2 aar-items-center aar-text-0-875rem aar-cursor-pointer">
          <input
            type="checkbox"
            className="aar-checkbox"
            checked={striped}
            onChange={(e) => setStriped(e.target.checked)}
          />
          Striped Rows (<code>data-striped</code>)
        </label>
        <label className="aar-cluster aar-gap-2 aar-items-center aar-text-0-875rem aar-cursor-pointer">
          <input
            type="checkbox"
            className="aar-checkbox"
            checked={hover}
            onChange={(e) => setHover(e.target.checked)}
          />
          Hover Glow (<code>data-hover</code>)
        </label>
        <label className="aar-cluster aar-gap-2 aar-items-center aar-text-0-875rem aar-cursor-pointer">
          <input
            type="checkbox"
            className="aar-checkbox"
            checked={bordered}
            onChange={(e) => setBordered(e.target.checked)}
          />
          Bordered Cells (<code>data-bordered</code>)
        </label>
        <label className="aar-cluster aar-gap-2 aar-items-center aar-text-0-875rem aar-cursor-pointer">
          <input
            type="checkbox"
            className="aar-checkbox"
            checked={sticky}
            onChange={(e) => setSticky(e.target.checked)}
          />
          Sticky Header (<code>data-sticky</code>)
        </label>
      </div>

      {/* Live Interactive Specimen */}
      <div className="aar-stack aar-gap-3">
        <div className="aar-cluster aar-justify-space-between aar-items-center">
          <div className="aar-cluster aar-gap-2 aar-items-center">
            <span className="aar-badge" data-variant="flat">
              {selectedIds.size} of {sampleData.length} selected
            </span>
            {selectedIds.size > 0 && (
              <button
                type="button"
                className="aar-button"
                data-variant="quiet"
                data-size="xs"
                onClick={() => setSelectedIds(new Set())}
              >
                Clear selection
              </button>
            )}
          </div>
          <div className="aar-toolbar aar-gap-2">
            <button
              type="button"
              className="aar-button"
              data-variant="flat"
              data-size="xs"
            >
              <Filter size={12} /> Filter
            </button>
            <button
              type="button"
              className="aar-button"
              data-variant="flat"
              data-size="xs"
            >
              <ArrowUpDown size={12} /> Sort
            </button>
          </div>
        </div>

        <div
          className="aar-table-container aar-max-h-24rem"
          data-variant={variant}
        >
          <table
            className="aar-table"
            data-striped={striped ? "true" : undefined}
            data-hover={hover ? "true" : undefined}
            data-bordered={bordered ? "true" : undefined}
            data-sticky={sticky ? "true" : undefined}
            data-size={size}
          >
            <thead>
              <tr>
                <th className="aar-w-2-5rem aar-text-align-center">
                  <input
                    type="checkbox"
                    className="aar-checkbox"
                    aria-label="Select all rows"
                    checked={
                      selectedIds.size === sampleData.length &&
                      sampleData.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Artifact</th>
                <th>Classification</th>
                <th>Status</th>
                <th className="aar-num">Entries</th>
                <th className="aar-num">Bundle Size</th>
                <th>Updated</th>
                <th className="aar-w-3rem aar-text-align-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row) => {
                const isSelected = selectedIds.has(row.id);
                return (
                  <tr
                    key={row.id}
                    aria-selected={isSelected}
                    onClick={() => toggleRow(row.id)}
                    className="aar-cursor-pointer"
                  >
                    <td
                      className="aar-text-align-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        className="aar-checkbox"
                        aria-label={`Select ${row.name}`}
                        checked={isSelected}
                        onChange={() => toggleRow(row.id)}
                      />
                    </td>
                    <td>
                      <div className="aar-cluster aar-gap-2 aar-items-center">
                        <FileText
                          size={14}
                          className="aar-ink-primary aar-flex-shrink-0"
                        />
                        <div>
                          <strong className="aar-weight-600">{row.name}</strong>
                          <p className="aar-hint">{row.role}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="aar-badge" data-variant="flat">
                        {row.type}
                      </span>
                    </td>
                    <td>
                      {row.status === "active" && (
                        <span className="aar-badge" data-tone="success">
                          <CheckCircle2 size={12} /> Active
                        </span>
                      )}
                      {row.status === "review" && (
                        <span className="aar-badge" data-tone="warning">
                          <Clock size={12} /> In Review
                        </span>
                      )}
                      {row.status === "draft" && (
                        <span className="aar-badge">
                          <AlertTriangle size={12} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="aar-num aar-font-mono">{row.records}</td>
                    <td className="aar-num aar-font-mono">{row.size}</td>
                    <td className="aar-hint">{row.updated}</td>
                    <td
                      className="aar-text-align-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="aar-icon-button"
                        data-size="xs"
                        aria-label={`Actions for ${row.name}`}
                        title="Options"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Specimen */}
      <div className="aar-stack aar-gap-2">
        <p className="aar-eyebrow">Markup Specification</p>
        <CodeBlock
          title="data-table.html"
          language="html"
          code={basicTableCode}
        />
      </div>

      {/* Architectural Guidelines */}
      <div className="aar-grid-guide-2 aar-gap-4">
        <div className="aar-panel aar-p-4" data-variant="flat">
          <h4 className="aar-heading aar-text-1rem aar-mb-2">
            Numeric Alignment &amp; Font Mono
          </h4>
          <p className="aar-hint">
            Always add <code>.aar-num</code> or{" "}
            <code>data-align=&quot;end&quot;</code> to numeric cells. Aar Loom
            sets <code>font-variant-numeric: tabular-nums</code> and aligns text
            to the right so integers, currencies, and decimals scan vertically
            without perceptual wobble.
          </p>
        </div>
        <div className="aar-panel aar-p-4" data-variant="flat">
          <h4 className="aar-heading aar-text-1rem aar-mb-2">
            Selection &amp; Accessibility
          </h4>
          <p className="aar-hint">
            Use standard HTML <code>aria-selected=&quot;true&quot;</code> on the{" "}
            <code>&lt;tr&gt;</code> element to tint selected rows with the
            brand primary accent. Native checkboxes preserve full keyboard navigation
            and screen reader interoperability.
          </p>
        </div>
      </div>
    </section>
  );
}
