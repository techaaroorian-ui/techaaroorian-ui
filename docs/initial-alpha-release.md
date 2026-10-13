# Initial public alpha release

The private root workspace is not published. Release these eight packages independently under `@techaaroorian-ui` with the `alpha` dist-tag:

| Package | Prepared version |
| --- | --- |
| aar-loom | 0.2.0-alpha.3 |
| contextual-empty | 0.1.1-alpha.1 |
| ordered-collection | 0.2.0-alpha.1 |
| file-intake | 0.2.0-alpha.2 |
| dialog | 0.2.0-alpha.1 |
| collection-picker | 0.2.0-alpha.1 |
| pan-zoom | 0.1.0-alpha.1 |
| share-state | 0.1.0-alpha.1 |

These are prepared manifest versions, not a claim that they exist in npm. Keep the `latest` tag separate. Repeatable Sections and Asset Gallery are planned and are not part of this release.

## Before publishing

1. Review and merge the version/changelog/lockfile preparation into `main`.
2. Run `npm ci`, `npm run release:ready`, and `npm run release:check` on that exact commit. Run the docs browser checks when reviewing UI changes.
3. Authenticate using `npm login` and confirm `npm whoami`. Verify that the account can publish to the `@techaaroorian-ui` scope. Do not commit credentials or paste tokens into documentation.
4. For local publication, deliberately run `npm run release`. Alternatively run the manual GitHub release workflow on `main`: first with dry_run enabled, then with dry_run disabled after reviewing its results. The current workflow uses the repository's `NPM_TOKEN` secret; secret presence and privileges must be configured by an authorized account owner.

Publishing consumes npm versions permanently. If a prepared version already exists, inspect its contents rather than trying to overwrite it. Changesets skips versions already published, but the release must still be reviewed.

## After publishing

Verify each exact version and `alpha` tag in registry metadata, then install the released packages in a fresh consumer outside the monorepo. Test CSS imports, headless roots, optional React adapter imports, and Contextual Empty's stylesheet. For React examples install React/React DOM as appropriate. Check that no dependency uses workspace-only source paths.

Adopt exact alpha versions in one consumer project before expanding the package family. Package logos are standalone documentation assets; they are not icon or CSS runtime dependencies of the headless engines.
