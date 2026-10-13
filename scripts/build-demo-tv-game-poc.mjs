// Build tv-game-poc into public/demos/tv-game-poc/ so it runs from this catalog.
//
//   npm run demo:tv-game-poc            # expects ../tv-game-poc
//   POC=/path/to/tv-game-poc npm run demo:tv-game-poc
//
// Two things have to be fixed for it to work anywhere but its own Vercel
// deployment, and neither is optional:
//
// 1. Its build assumes it is served from the domain root, so every asset path is
//    absolute. Rebuilt here with --base so they resolve under the sub-path.
//
// 2. Its video arrives through Vercel REWRITES declared in vercel.json, which
//    proxy CloudFront. GitHub Pages cannot rewrite, so the six stream prefixes
//    are pointed straight at CloudFront. That works because CloudFront already
//    answers cross-origin: `access-control-allow-origin: *`, checked 2026-10-13.
//    Three of the six are RENAMED on CloudFront, which is why this is a table
//    and not a prefix rule — /fastmoney/ is /fast-money/ there.
//
// Nothing in tv-game-poc is modified: it is built from its own source into ours.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { globSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('../', import.meta.url));
const POC = process.env.POC ?? fileURLToPath(new URL('../../tv-game-poc/', import.meta.url));
const OUT = `${here}public/demos/tv-game-poc`;
const BASE = '/playalong-animation-catalog/demos/tv-game-poc/';

if (!existsSync(POC)) {
  console.error(`tv-game-poc not found at ${POC}`);
  console.error('Clone it beside this repository, or pass POC=/path/to/tv-game-poc.');
  process.exit(1);
}

rmSync(OUT, { recursive: true, force: true });
console.log('building tv-game-poc…');
execFileSync('npx', ['vite', 'build', `--base=${BASE}`, '--outDir', OUT, '--emptyOutDir'],
  { cwd: POC, stdio: 'inherit' });

const CF = 'https://ddwxlnqf7gz6.cloudfront.net';
const MAP = {
  '/stream1/': `${CF}/stream1/`,
  '/stream2/': `${CF}/stream2/`,
  '/cardsharks/': `${CF}/cardsharks/`,
  '/fastmoney/': `${CF}/fast-money/`,
  '/matchgameep2/': `${CF}/match-game-andy/`,  // before /matchgame/, which is its prefix
  '/matchgame/': `${CF}/match-game/`,
};

let rewritten = 0;
for (const f of globSync(`${OUT}/{assets/*.js,*.html}`)) {
  const before = readFileSync(f, 'utf8');
  let after = before;
  for (const [from, to] of Object.entries(MAP)) {
    for (const q of ['"', "'", '`']) after = after.split(q + from).join(q + to);
  }
  if (after !== before) { writeFileSync(f, after); rewritten++; }
}

const leftovers = globSync(`${OUT}/assets/*.js`)
  .flatMap((f) => readFileSync(f, 'utf8').match(/["'`]\/(stream1|stream2|cardsharks|fastmoney|matchgame|matchgameep2)\//g) ?? []);
if (leftovers.length) {
  console.error(`still pointing at Vercel-only paths: ${[...new Set(leftovers)].join(', ')}`);
  process.exit(1);
}
console.log(`stream paths repointed at CloudFront in ${rewritten} file(s); none left proxied.`);
