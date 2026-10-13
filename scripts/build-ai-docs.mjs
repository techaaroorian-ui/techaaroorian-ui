import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const check = process.argv.includes('--check');
const publicDir = join(root, 'apps/docs/public');
const sourceBase = 'https://github.com/techaaroorian-ui/techaaroorian-ui/blob/main/';
const rawBase = 'https://raw.githubusercontent.com/techaaroorian-ui/techaaroorian-ui/main/';
async function emit(path, content) {
  if (check) {
    if ((await readFile(path, 'utf8')).replace(/\r\n/g, '\n') !== content) throw new Error(`Stale AI documentation: ${path}. Run npm run docs:ai.`);
  } else {
    await mkdir(join(path, '..'), { recursive: true });
    await writeFile(path, content);
  }
}
const guides = ['ai-integration', 'design-rules', 'adaptive-layout', 'styling-boundaries', 'icons', 'versioning'];
const sections = [];
const links = [];
for (const guide of guides) {
  const text = (await readFile(join(root, 'docs', `${guide}.md`), 'utf8')).replace(/\r\n/g, '\n');
  // Resolve source-relative links for copies served under ai/.
  const portable = text.replace(/\]\(\.\/([^\s)]+)\)/g, `](${sourceBase}docs/$1)`);
  await emit(join(publicDir, 'ai', `${guide}.md`), portable);
  sections.push(portable);
  links.push(`- [${text.split('\n')[0].replace(/^# /, '').trim()}](ai/${guide}.md)`);
}
const packageLinks = [];
for (const directory of (await readdir(join(root, 'packages'))).sort()) {
  const folder = join(root, 'packages', directory);
  const pkg = JSON.parse(await readFile(join(folder, 'package.json'), 'utf8'));
  if (pkg.private) continue;
  const ai = `# ${pkg.name}: agent integration\n\n${pkg.description}\n\nPrepared version: ${pkg.version}. Verify registry availability before installation; this manifest is not proof of publication.\n\nRead the included README.md for examples and limitations. Use only these public import paths:\n\n${Object.keys(pkg.exports).map(key => `- \`${pkg.name}${key === '.' ? '' : key.slice(1)}\``).join('\n')}\n\nRead package.json and bundled type declarations where supplied before implementing an API. Do not import workspace source files.\n\n[Shared package-selection and design guidance](${sourceBase}docs/ai-integration.md).\n[Package source and README](${sourceBase}packages/${directory}/README.md).\n`;
  await emit(join(folder, 'AI.md'), ai);
  const readme = (await readFile(join(folder, 'README.md'), 'utf8')).replace(/\r\n/g, '\n');
  const portable = readme.replace(/\]\(\.\/([^\s)]+)\)/g, `](${sourceBase}packages/${directory}/$1)`);
  await emit(join(publicDir, 'ai', `${directory}.md`), `${ai}\n${portable}`);
  sections.push(`${ai}\n${portable}`);
  packageLinks.push(`- [${pkg.name}](ai/${directory}.md): ${pkg.description} Prepared ${pkg.version}; check npm availability.`);
}
const header = '# TechAaroorian UI\n\n> Aar Loom is a CSS-only, flat paper design and adaptive layout language. Companion packages provide independently usable behavior with optional React adapters.\n\nAlpha APIs: verify publication and installed versions. The root workspace is private. Repeatable Sections and Asset Gallery are planned.\n\n';
const index = `${header}## Integration and design\n\n${links.join('\n')}\n\n## Packages and complete examples\n\n${packageLinks.join('\n')}\n\n## Sources\n\n- [Full text documentation](llms-full.txt)\n- [Repository](https://github.com/techaaroorian-ui/techaaroorian-ui)\n`;
await emit(join(publicDir, 'llms.txt'), index);
await emit(join(root, 'llms.txt'), index.replace(/\]\(ai\//g, `](${rawBase}apps/docs/public/ai/`).replace('](llms-full.txt)', `](${rawBase}apps/docs/public/llms-full.txt)`));
await emit(join(publicDir, 'llms-full.txt'), `${header}${sections.join('\n\n---\n\n')}\n`);
console.log(check ? 'AI documentation is current.' : 'Generated AI indexes, plain-text guides and eight package integration files.');
