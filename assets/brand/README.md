# TechAaroorian UI wordmarks and secondary symbols

Wordmarks are the primary identity. Use consistent sans-serif typography with a 600-weight first word and a 400-weight companion. Long HTML wordmarks can wrap. Use theme-aware forest/lavender ink in interfaces, with a paper backing and subtle border. Color SVG artwork includes a light paper plaque and thin edge so it reads against light or dark backgrounds; monochrome wordmarks use black ink on white with a gray boundary.

Masters are in `wordmarks/` (primary text identities) and `marks/` (secondary symbols). Every identity has transparent color and monochrome SVG files. Docs copies are under `apps/docs/public/brand/`. Compact symbols remain useful for favicons and small spaces. Existing raster explorations and the older weave lockup are historical assets.

SVG wordmarks retain editable text using Segoe UI/Inter/system-ui/sans-serif fallbacks; appearance depends on the installed fonts. They are not outlined print masters. Preserve the horizontal viewBox; symbol viewBoxes remain 64×64. For interface wordmarks, use the public aar-brand-wordmark class and its small/large sizes.


Editable vector masters are in `marks/`, with identical docs copies in `apps/docs/public/brand/marks/`. Each identity has transparent color and `-mono.svg` versions. Existing PNGs are earlier raster explorations; `aar-loom.svg` remains the horizontal weave wordmark.

The 11 identities cover TechAaroorian UI, Aar Loom, Contextual Empty, Ordered Collection, File Intake, Dialog, Collection Picker, Pan & Zoom, Share State, and planned Repeatable Sections and Asset Gallery. Planned marks do not imply released packages.

The family uses a 64×64 viewBox, 4-unit strokes (6-unit woven ribbons for Aar Loom), forest #326954 and lavender #6b468f. Geometry is authored as editable SVG, with rounded paper corners, stronger silhouettes, and generous negative space. The collection mark refines the existing T/U concept; Aar Loom preserves the weave motif. Other marks express their package responsibility.

Use color masters on light paper. Monochrome SVGs use currentColor; CSS masks allow external silhouettes to inherit interface ink in dark/custom themes. Minimum recommended size is 24px and clear space is roughly one quarter of the mark width. Keep aspect ratio and avoid gradients, shadows, or ambient motion. Label standalone identities; use empty alt text next to the package name.

The docs Brand page previews and downloads the marks. These are package identifiers; Lucide remains the recommended action-icon library. Headless packages do not gain asset, CSS, or icon-library runtime dependencies.
