import BrandWordmark from "./BrandWordmark";
import CodeBlock from "./CodeBlock";

const identities = [
  ["techaaroorian-ui", "TechAaroorian UI", "The parent collection: modular T/U monogram", "Collection"],
  ["aar-loom", "Aar Loom", "Interwoven threads: shared design foundations", "CSS"],
  ["contextual-empty", "Contextual Empty", "An open space with a recovery cue", "Package"],
  ["ordered-collection", "Ordered Collection", "A sequence of cards and a movement cue", "Package"],
  ["file-intake", "File Intake", "A document entering a receiving tray", "Package"],
  ["dialog", "Dialog", "A foreground window and its context", "Package"],
  ["collection-picker", "Collection Picker", "A collection with one checked choice", "Package"],
  ["pan-zoom", "Pan & Zoom", "Viewport corners and a magnifying lens", "Package"],
  ["share-state", "Share State", "A state document moving outward", "Package"],
  ["repeatable-sections", "Repeatable Sections", "Repeated field groups with an add cue", "Planned"],
  ["asset-gallery", "Asset Gallery", "Overlapping asset sheets", "Planned"],
];

export default function BrandGuide() {
  return <section className="aar-container aar-content aar-stack aar-gap-6">
    <div className="aar-stack aar-gap-3">
      <p className="aar-eyebrow">TechAaroorian UI identity family</p>
      <h1 className="aar-title">Package identities</h1>
      <p>Wordmarks are the primary identity: consistent typography, forest and lavender text, a paper backing, and a subtle boundary. Interface wordmarks adapt their ink and paper to the theme. Color SVGs include a light paper backing so they remain readable on light or dark backgrounds. Compact symbols are secondary identifiers for favicons and small spaces.</p>
      <p className="aar-hint">These are package identifiers. Continue using Lucide for everyday interface actions. Planned identities do not indicate published packages.</p>
    </div>
    <div className="aar-grid" data-min="18">
      {identities.map(([slug, label, meaning, status]) => <article key={slug} className="aar-panel aar-stack aar-gap-4">
        <h2 className="aar-heading"><BrandWordmark label={label} /></h2>
        <div className="aar-cluster aar-items-center aar-gap-4">
          <span className="aar-brand-swatch"><img className="aar-brand-symbol" src={`${import.meta.env.BASE_URL}brand/marks/${slug}.svg`} alt={`${label} color mark`} /></span>
          <span className="aar-badge">{status}</span>
        </div>
        <p className="aar-hint">Secondary symbol: {meaning.toLowerCase()}.</p>
        <div className="aar-cluster aar-gap-2">
          <a className="aar-button" aria-label={`Download ${label} wordmark SVG`} href={`${import.meta.env.BASE_URL}brand/wordmarks/${slug}.svg`} download>Wordmark SVG</a>
          <a className="aar-button" aria-label={`Download ${label} monochrome wordmark SVG`} href={`${import.meta.env.BASE_URL}brand/wordmarks/${slug}-mono.svg`} download>Mono wordmark</a>
          <a className="aar-button" aria-label={`Download ${label} color SVG`} href={`${import.meta.env.BASE_URL}brand/marks/${slug}.svg`} download>Color SVG</a>
          <a className="aar-button" aria-label={`Download ${label} monochrome SVG`} href={`${import.meta.env.BASE_URL}brand/marks/${slug}-mono.svg`} download>Mono SVG</a>
        </div>
      </article>)}
    </div>
    <section className="aar-panel aar-stack aar-gap-3">
      <h2 className="aar-heading">Usage</h2>
      <p>Use the wordmark wherever the full name fits. Let long names wrap in HTML instead of shrinking them. Use compact symbols for favicons, navigation rails, or small spaces. Preserve each SVG viewBox and aspect ratio; symbols use 64×64 while wordmarks use measured horizontal bounds. Keep clear space around the identity and avoid gradients, shadows, or animation.</p>
      <p className="aar-hint">SVG wordmarks contain editable text with system-font fallbacks. Their exact appearance depends on installed fonts; use outlined text for a future print-ready master. The HTML identity uses Aar Loom's font token and adapts to the user's theme.</p>
      <p>Use empty alt text when the adjacent package name already identifies an image. Standalone meaningful images need a descriptive name. Package logos must not be the only indication of a state or action.</p>
      <CodeBlock title="Text identity with ordinary HTML" language="html" code={'<span class="aar-brand-wordmark">\n  <strong>Aar</strong> <span>Loom</span>\n</span>\n\n<!-- Compact secondary identity next to a readable name. -->\n<img src="/brand/marks/contextual-empty.svg" width="32" height="32" alt="" />\n<span>Contextual Empty</span>'} />
      <p className="aar-hint">SVG files are standalone identity assets, not runtime dependencies of the headless packages. Source masters live in assets/brand/marks; the docs copies are available through the download links above.</p>
    </section>
  </section>;
}
