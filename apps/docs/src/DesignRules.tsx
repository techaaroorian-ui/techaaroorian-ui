import rules from "../../../docs/design-rules.md?raw";

// The checked-in contract is the source for this documentation view.
// Its content is headings and paragraphs with inline emphasis/code only.
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) =>
    part.startsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> :
    part.startsWith("`") ? <code key={index}>{part.slice(1, -1)}</code> : part,
  );
}

export default function DesignRules() {
  const sections = rules.trim().split(/\r?\n\r?\n/);
  return (
    <section className="aar-section aar-prose aar-stack aar-gap-4" aria-label="Aar Loom design rules">
      {sections.map((block, index) => {
        if (block.startsWith("# ")) return <h2 className="aar-heading" key={index}>{block.slice(2)}</h2>;
        if (block.startsWith("## ")) return <h3 className="aar-heading aar-mt-6" key={index}>{block.slice(3)}</h3>;
        return <p key={index}>{inline(block.replace(/\r?\n/g, " "))}</p>;
      })}
    </section>
  );
}
