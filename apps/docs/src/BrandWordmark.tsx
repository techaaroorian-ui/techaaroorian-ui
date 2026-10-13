export default function BrandWordmark({ label, size = "md" }: { label: string; size?: "sm" | "md" | "lg" }) {
  const [first, ...rest] = label.split(" ");
  return <span className="aar-brand-wordmark" data-size={size}>
    <strong>{first}</strong>{rest.length > 0 && <> <span>{rest.join(" ")}</span></>}
  </span>;
}
