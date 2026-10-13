import type { CSSProperties } from "react";

export default function BrandMark({ name, label }: { name: string; label?: string }) {
  return <span className="aar-package-symbol" role={label ? "img" : undefined}
    aria-label={label} aria-hidden={label ? undefined : true}
    style={{ "--aar-symbol": `url("${import.meta.env.BASE_URL}brand/marks/${name}-mono.svg")` } as CSSProperties} />;
}
