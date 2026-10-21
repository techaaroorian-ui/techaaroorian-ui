# Develop Aar Loom with Yuwbrndr

Use the application to prove a design pattern, then move reusable CSS into Aar Loom. Yuwbrndr owns document state, uploads, preview and export behavior. Aar Loom owns shared controls, themes and adaptive composition.

## Local iteration

From Yuwbrndr:

```sh
npm run loom:local
npm run loom:status
npm run dev
```

The source defaults to the sibling `../techaaroorian-ui` checkout. To use another checkout, run `npm run loom:local -- <source-directory>`. This builds the public framework, packs its real npm payload, and installs that tarball in an isolated cache folder with `--no-save --package-lock=false`, then copies only its installed Aar Loom payload into Yuwbrndr. Tracked manifests are checked before and after installation. The preview selection and tarball metadata live in ignored `.cache` folders.

After editing Aar Loom, rerun `loom:local` and restart Vite. Code changes in Yuwbrndr use its normal hot reload. This is a packed-package loop, not a live symlink; it exercises exports and generated Tailwind v3 CSS as consumers receive them.

From the framework alone, `npm run dev:pack:loom` builds and packs Aar Loom without installing a consumer. No command in this local workflow publishes a package or writes credentials.

## Verify and release

While using the local pack, run Yuwbrndr's `npm run build`, `npm test` and visual checks. `npm run check:published-deps` deliberately fails while local preview mode is active. The deploy workflow also checks saved dependency specs and registry lockfile resolutions. `loom:check` requires the new public button-group export, so the old published alpha cannot silently build a UI with missing styles.

Release order:

1. Review the Aar Loom changes and changeset, version them and publish the next alpha through the normal release process.
2. In Yuwbrndr, pin that published version with `npm install --save-exact @techaaroorian-ui/aar-loom@<new-version>`.
3. Run `npm run loom:published`. This uses `npm ci` to restore the project lockfile's registry packages and clears the local marker only after success.
4. Run `npm run release:check` and visual/export checks on the published dependency before merging the Yuwbrndr branch.

Keep related framework and application PRs linked. Do not merge the application while its required framework API is unpublished. The local tarball may still report the existing manifest version: its SHA256 and local marker identify development content; the version is not a registry-release claim.

Running `npm ci` manually also resets installed packages, but use `loom:published` to clear the preview marker consistently. Repacking requires restarting any Vite server watching the package. Switching dependencies while a build is running is unsupported.

Stop the application Vite server before `loom:published` on Windows so native build binaries are not locked. The isolated local install does not re-resolve the application's unrelated dependencies. Packed filenames include a content hash, so changed CSS is not confused with a cached tarball carrying the same base version.
