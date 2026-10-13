// Build tv-game-poc into public/demos/tv-game-poc/ so it runs from this catalog.
//
//   npm run demo:tv-game-poc            # expects ../tv-game-poc
//   POC=/path/to/tv-game-poc npm run demo:tv-game-poc
//
// Things that have to be fixed for it to work anywhere but its own Vercel
// deployment, none of them optional:
//
// 1. Its build assumes it is served from the domain root, so every asset path is
//    absolute. Rebuilt here with --base so they resolve under the sub-path.
//    --base only reaches assets Vite itself imports; the app also writes public
//    paths as plain strings ("/logo/…", "/Content/…"), which are prefixed after
//    the build — see PUBLIC_DIRS.
//
// 2. Its video arrives through Vercel REWRITES declared in vercel.json, which
//    proxy CloudFront. GitHub Pages cannot rewrite, so the six stream prefixes
//    are pointed straight at CloudFront. That works because CloudFront already
//    answers cross-origin: `access-control-allow-origin: *`, checked 2026-10-13.
//    Three of the six are RENAMED on CloudFront, which is why this is a table
//    and not a prefix rule — /fastmoney/ is /fast-money/ there.
//
// 3. Its PasswordGate (a demo-access screen for the Vercel build) is replaced with a
//    pass-through at build time; the catalog is the gate here.
//
// 4. TV and web are split. The TV app shows a 2 s splash (the Welcome artwork
//    with a loader, no TV-simulation panel) and goes on to the catalogue — no
//    Sign In — and the web screens (Sign In,
//    Reset Password) are served by the same build under ?view=web, so the
//    catalog can show them as a demo of their own.
//
// 5. The Welcome screen's settings (video volume, SFX volume, round lead-in) move
//    under the frame in the catalog. They live in localStorage under the POC's own
//    keys; the catalog writes them and the POC is given a `storage` listener so a
//    change applies live, without reloading the demo.
//
// 6. Its menu is the superseded mechanic. Its own CSS says so: "Width animation
//    pushes content right (in flow)." PTV-858 replaced that -- the rail stays 160
//    open or shut and the labels appear over a dimming ramp, so the content never
//    shifts. src/shared/menu-ptv858.css carries that rule for BOTH the catalog's
//    Menu component and this demo, and is linked into the built index.html here.
//    One runtime component cannot span the iframe; the numbers can.
//
// Nothing in tv-game-poc is modified: it is built from its own source into ours.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, rmSync, mkdtempSync, readdirSync, mkdirSync, copyFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const here = fileURLToPath(new URL('../', import.meta.url));
const POC = process.env.POC ?? fileURLToPath(new URL('../../tv-game-poc/', import.meta.url));
const OUT = `${here}public/demos/tv-game-poc`;
const BASE = '/playalong-animation-catalog/demos/tv-game-poc/';
// "Loader Big" from Figma (OTT TV Design, node 557:3037), copied into the build.
const LOADER_SRC = `${here}assets/tv-game-poc/loader-big.png`;
const LOADER_PATH = 'catalog/loader-big.png';

if (!existsSync(POC)) {
  console.error(`tv-game-poc not found at ${POC}`);
  console.error('Clone it beside this repository, or pass POC=/path/to/tv-game-poc.');
  process.exit(1);
}

// Wrap tv-game-poc's own config with one extra plugin that swaps PasswordGate for
// a pass-through. Vite bundles the wrapper together with the config it imports.
const wrapperDir = mkdtempSync(join(tmpdir(), 'tv-game-poc-'));
const wrapper = join(wrapperDir, 'vite.config.mjs');
const component = (name) => JSON.stringify(join(POC, 'src/components', `${name}.tsx`));
writeFileSync(wrapper, `
import poc from ${JSON.stringify(join(POC, 'vite.config.ts'))};

// Every patch must find its target; a silent miss would ship the unpatched app.
function patch(code, from, to, what) {
  if (!code.includes(from)) throw new Error('tv-game-poc patch target not found: ' + what);
  return code.split(from).join(to);
}

// Web: Sign In <-> Reset Password only. Plain createElement so no JSX pass is needed.
const WEB_APP = \`
import { createElement as h, useState } from 'react';
import { SignInScreen } from ${component('SignInScreen')};
import { ResetPasswordScreen } from ${component('ResetPasswordScreen')};
export default function WebApp() {
  const [screen, setScreen] = useState('signin');
  const stay = () => {};
  return screen === 'signin'
    ? h(SignInScreen, { onSignIn: stay, onJoin: stay, onBack: stay, onForgotPassword: () => setScreen('reset') })
    : h(ResetPasswordScreen, { onBack: () => setScreen('signin') });
}
\`;

// TV: the Welcome screen becomes a 2 s splash — its artwork (the logo is baked
// into it) plus a loader — then on to the catalogue.
const SPLASH = \`
import { createElement as h, useEffect } from 'react';
import ${component('WelcomeScreen').slice(0, -5)}.css";
const style = document.createElement('style');
style.textContent = '.catalog-splash__loader{position:absolute;right:6.5%;bottom:10%;display:block;'
  + 'animation:catalog-splash-spin 1s linear infinite}'
  + '@keyframes catalog-splash-spin{to{transform:rotate(360deg)}}';
document.head.appendChild(style);
export function WelcomeScreen({ onStartDemo }) {
  useEffect(() => {
    const t = setTimeout(onStartDemo, 2000);
    return () => clearTimeout(t);
  }, []);
  return h('div', { className: 'welcome-screen' },
    h('div', { className: 'welcome-background' }),
    h('img', { className: 'catalog-splash__loader', src: '${BASE}${LOADER_PATH}', width: 100.75, height: 100.75, alt: 'Loading' }));
}
\`;

const catalogPatches = {
  name: 'catalog:tv-game-poc-patches',
  enforce: 'pre',
  resolveId(id) {
    if (id === 'virtual:catalog-web-app') return '\\0catalog-web-app';
    if (id === 'virtual:catalog-splash') return '\\0catalog-splash';
  },
  load(id) {
    if (id === '\\0catalog-web-app') return WEB_APP;
    if (id === '\\0catalog-splash') return SPLASH;
    if (id.split('?')[0].endsWith('/components/PasswordGate.tsx')) {
      return 'export const PasswordGate = ({ children }) => children;';
    }
  },
  transform(code, id) {
    const file = id.split('?')[0];
    if (file.endsWith('/src/App.tsx')) {
      code = patch(code, "import { WelcomeScreen } from './components/WelcomeScreen';", "import { WelcomeScreen } from 'virtual:catalog-splash';", 'App WelcomeScreen import');
      code = patch(code, "onStartDemo={() => setCurrentScreen('signin')}", "onStartDemo={() => setCurrentScreen('home')}", 'App splash → home');
      return patch(code, "onBack={() => setCurrentScreen('welcome')}", "onBack={() => {}}", 'App back to welcome');
    }
    if (file.endsWith('/src/contexts/AudioSettingsContext.tsx')) {
      return patch(code, '  return (\\n    <AudioSettingsContext.Provider', \`  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY_VIDEO) _setVideo(loadLs(LS_KEY_VIDEO, DEFAULT_VIDEO_VOLUME));
      if (e.key === LS_KEY_SFX) _setSfx(loadLs(LS_KEY_SFX, DEFAULT_SFX_VOLUME));
      if (e.key === LS_KEY_LEAD_IN) _setLeadIn(loadLsInt(LS_KEY_LEAD_IN, DEFAULT_ROUND_LEAD_IN, ROUND_LEAD_IN_MAX));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <AudioSettingsContext.Provider\`, 'AudioSettings storage listener');
    }
    if (file.endsWith('/src/main.tsx')) {
      code = patch(code, "import App from './App.tsx'", "import App from './App.tsx'\\nimport WebApp from 'virtual:catalog-web-app'", 'main App import');
      return patch(code, '<App />', "{new URLSearchParams(location.search).get('view') === 'web' ? <WebApp /> : <App />}", 'main <App />');
    }
  },
};
export default { ...poc, plugins: [catalogPatches, ...(poc.plugins ?? [])] };
`);

rmSync(OUT, { recursive: true, force: true });
console.log('building tv-game-poc…');
try {
  execFileSync('npx', ['vite', 'build', '--config', wrapper, `--base=${BASE}`, '--outDir', OUT, '--emptyOutDir'],
    { cwd: POC, stdio: 'inherit' });
} finally {
  rmSync(wrapperDir, { recursive: true, force: true });
}

mkdirSync(join(OUT, 'catalog'), { recursive: true });
copyFileSync(LOADER_SRC, join(OUT, LOADER_PATH));

// PTV-858: the menu must not push the content. See note 6 at the top.
//
// The filename carries a CONTENT HASH, like every asset Vite emits. Under a
// fixed name a deploy serves whatever the browser and the CDN still hold, and
// a fixed bug then looks unfixed -- which cost a round of chasing a stale file.
{
  const src = readFileSync(join(here, 'src/shared/menu-ptv858.css'), 'utf8');
  const hash = createHash('sha256').update(src).digest('hex').slice(0, 8);
  const MENU_CSS = `catalog/menu-ptv858.${hash}.css`;
  for (const old of globSync(`${OUT}/catalog/menu-ptv858.*.css`)) rmSync(old);
  writeFileSync(join(OUT, MENU_CSS), src);
  const indexPath = join(OUT, 'index.html');
  const html = readFileSync(indexPath, 'utf8');
  // Last in <head> so it wins over the PoC's own SideMenu.css, and so a missing
  // </head> fails the build rather than shipping the old mechanic silently.
  writeFileSync(indexPath, patch(html, '</head>',
    `  <link rel="stylesheet" href="${BASE}${MENU_CSS}">\n  </head>`, 'index.html </head> for the menu rule'));
  console.log(`menu rule linked as ${MENU_CSS}`);
}

const gateLeft = globSync(`${OUT}/assets/*.js`).some((f) => readFileSync(f, 'utf8').includes('app_unlocked'));
if (gateLeft) {
  console.error('PasswordGate is still in the bundle — the stub plugin did not apply.');
  process.exit(1);
}

const CF = 'https://ddwxlnqf7gz6.cloudfront.net';
const MAP = {
  '/stream1/': `${CF}/stream1/`,
  '/stream2/': `${CF}/stream2/`,
  '/cardsharks/': `${CF}/cardsharks/`,
  '/fastmoney/': `${CF}/fast-money/`,
  '/matchgameep2/': `${CF}/match-game-andy/`,  // before /matchgame/, which is its prefix
  '/matchgame/': `${CF}/match-game/`,
};

// Folders of tv-game-poc's public/ — referenced from code as root-absolute strings.
const PUBLIC_DIRS = readdirSync(join(POC, 'public'), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
const OPENERS = ['"', "'", '`', '('];

let rewritten = 0;
for (const f of globSync(`${OUT}/{assets/*.js,assets/*.css,*.html}`)) {
  const before = readFileSync(f, 'utf8');
  let after = before;
  for (const [from, to] of Object.entries(MAP)) {
    for (const q of ['"', "'", '`']) after = after.split(q + from).join(q + to);
  }
  for (const dir of PUBLIC_DIRS) {
    for (const q of OPENERS) after = after.split(`${q}/${dir}/`).join(`${q}${BASE}${dir}/`);
  }
  if (after !== before) { writeFileSync(f, after); rewritten++; }
}

const unprefixed = globSync(`${OUT}/{assets/*.js,assets/*.css,*.html}`).flatMap((f) =>
  PUBLIC_DIRS.flatMap((dir) => readFileSync(f, 'utf8').match(new RegExp(`["'\`(]/${dir}/`, 'g')) ?? []));
if (unprefixed.length) {
  console.error(`public paths still root-absolute: ${[...new Set(unprefixed)].join(', ')}`);
  process.exit(1);
}

const leftovers = globSync(`${OUT}/assets/*.js`)
  .flatMap((f) => readFileSync(f, 'utf8').match(/["'`]\/(stream1|stream2|cardsharks|fastmoney|matchgame|matchgameep2)\//g) ?? []);
if (leftovers.length) {
  console.error(`still pointing at Vercel-only paths: ${[...new Set(leftovers)].join(', ')}`);
  process.exit(1);
}
console.log(`stream paths repointed at CloudFront and public paths prefixed with ${BASE} in ${rewritten} file(s).`);
