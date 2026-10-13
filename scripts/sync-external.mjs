// Refresh every copy under external/, then regenerate what derives from it.
//
//   npm run external:sync
//
// The hub is a private repository that is NOT a dependency of this build: it is
// expected to sit next to this one on a developer's machine. If it is missing,
// this says so and changes nothing, rather than silently leaving stale copies
// looking fresh.
import { existsSync, copyFileSync, writeFileSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const HUB = process.env.HUB ?? new URL('../../playalong-hub/', import.meta.url).pathname;

const FILES = [
  ['docs/design-tokens.json', 'external/playalong-hub/design-tokens.json'],
  ['docs/design-tokens.md',   'external/playalong-hub/design-tokens.md'],
];

if (!existsSync(HUB)) {
  console.error(`playalong-hub not found at ${HUB}`);
  console.error('Clone it beside this repository, or pass HUB=/path/to/playalong-hub.');
  console.error('Nothing was copied — the files under external/ are unchanged and still stale.');
  process.exit(1);
}

let sha = 'unknown';
try {
  sha = execFileSync('git', ['-C', HUB, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
} catch { /* not a git checkout; the date still tells you something */ }

for (const [from, to] of FILES) {
  const src = new URL(from, `file://${HUB.endsWith('/') ? HUB : HUB + '/'}`);
  if (!existsSync(src)) { console.error(`missing in hub: ${from}`); process.exit(1); }
  copyFileSync(src, new URL(`../${to}`, import.meta.url));
  console.log(`copied ${from}`);
}

// Keep the provenance table honest rather than hoping someone edits it.
const readme = new URL('../external/README.md', import.meta.url);
const today = new Date().toISOString().slice(0, 10);
writeFileSync(readme, readFileSync(readme, 'utf8')
  .replace(/commit `[0-9a-f]+`, \d{4}-\d{2}-\d{2}/g, `commit \`${sha}\`, ${today}`));

console.log(`external/ now matches playalong-hub ${sha} (${today})`);
