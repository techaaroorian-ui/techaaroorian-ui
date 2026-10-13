import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, ".cache", "packed-consumer");
const consumer = join(output, "consumer");
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error("Run this check using npm run test:packed.");
await mkdir(join(consumer, "node_modules", "@techaaroorian-ui"), { recursive: true });
await writeFile(join(consumer, "package.json"), JSON.stringify({ private: true, type: "module" }));

const manifests = [];
function targets(value) {
  return typeof value === "string" ? [value] : Object.values(value).flatMap(targets);
}
for (const directory of await readdir(join(root, "packages"))) {
  const folder = join(root, "packages", directory);
  const pkg = JSON.parse(await readFile(join(folder, "package.json"), "utf8"));
  if (pkg.private) continue;
  const outputJson = execFileSync(process.execPath, [npmCli, "pack", "--ignore-scripts", "--json", "--pack-destination", output, "--cache", join(root, ".cache", "npm")], { cwd: folder, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  const result = JSON.parse(outputJson);
  const packed = Array.isArray(result) ? result[0] : Object.values(result)[0];
  const destination = join(consumer, "node_modules", ...pkg.name.split("/"));
  await mkdir(destination, { recursive: true });
  execFileSync("tar", ["-xzf", join(output, packed.filename), "-C", destination, "--strip-components=1"]);
  for (const target of targets(pkg.exports)) await readFile(join(destination, target));
  for (const required of ["README.md", "LICENSE", "CHANGELOG.md"]) await readFile(join(destination, required));
  assert.equal(pkg.publishConfig?.access, "public", `${pkg.name} must explicitly publish publicly`);
  assert.equal(pkg.repository?.directory, `packages/${directory}`);
  manifests.push({ name: pkg.name, exports: pkg.exports });
  console.log(`${pkg.name}@${pkg.version}: packaged files and exports verified`);
}

// React peers resolve from this repository's installed development environment.
// This validates the tarball payload, not a fresh network installation.
const checks = `import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const manifests = ${JSON.stringify(manifests)};
for (const pkg of manifests) {
  if (pkg.name.endsWith("/aar-loom")) {
    for (const subpath of Object.keys(pkg.exports)) {
      assert.ok(require.resolve(pkg.name + (subpath === "." ? "" : subpath.slice(1))));
    }
  } else {
    await import(pkg.name);
    if (pkg.exports["./react"]) await import(pkg.name + "/react");
    if (pkg.exports["."]?.require) require(pkg.name);
  }
}
console.log("Packed consumer imports passed for all public entry points.");`;
await writeFile(join(consumer, "check.mjs"), checks);
console.log(execFileSync(process.execPath, ["check.mjs"], { cwd: consumer, encoding: "utf8" }).trim());
