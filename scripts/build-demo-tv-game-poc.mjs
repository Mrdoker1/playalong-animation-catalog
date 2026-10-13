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
//    shifts. Restyling the PoC's menu from outside with CSS produced a new
//    artefact every round, so its SideMenu is REPLACED at build time by the
//    catalog's Menu: same markup, Figma geometry, icons (src/catalog/components/
//    icons.ts) and motion, with the PoC's props and key handling. The numbers
//    both read live in src/shared/menu-ptv858.css. The rail-scroll maths in
//    GameSelectionScreen is patched to the 160 rail too.
//
// Nothing in tv-game-poc is modified: it is built from its own source into ours.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, rmSync, mkdtempSync, readdirSync, mkdirSync, copyFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('../', import.meta.url));
const POC = process.env.POC ?? fileURLToPath(new URL('../../tv-game-poc/', import.meta.url));
const OUT = `${here}public/demos/tv-game-poc`;
const BASE = '/playalong-animation-catalog/demos/tv-game-poc/';
// "Loader Big" from Figma (OTT TV Design, node 557:3037), copied into the build.
const LOADER_SRC = `${here}assets/tv-game-poc/loader-big.png`;
const LOADER_PATH = 'catalog/loader-big.png';
// The menu's PlayAlong mark -- the catalog's own export of Figma `Subtract` (933:7845).
const MARK_SRC = `${here}public/assets/flows/mark.svg`;
const MARK_PATH = 'catalog/mark.svg';

if (!existsSync(POC)) {
  console.error(`tv-game-poc not found at ${POC}`);
  console.error('Clone it beside this repository, or pass POC=/path/to/tv-game-poc.');
  process.exit(1);
}

// Wrap tv-game-poc's own config with one extra plugin that swaps PasswordGate for
// a pass-through. Vite bundles the wrapper together with the config it imports.
const wrapperDir = mkdtempSync(join(tmpdir(), 'tv-game-poc-'));
const wrapper = join(wrapperDir, 'vite.config.mjs');

// One icon from src/catalog/components/icons.ts (the Figma set), at 40px.
function iconSvg(name) {
  const src = readFileSync(join(here, 'src/catalog/components/icons.ts'), 'utf8');
  const m = src.match(new RegExp('"' + name + '": `([^`]*)`'));
  if (!m) throw new Error('icon not found in the catalog set: ' + name);
  return '<svg width="40" height="40" viewBox="0 0 32 32" fill="none" aria-hidden="true">' + m[1] + '</svg>';
}

// The catalog's Menu, as the PoC's SideMenu. Plain createElement, so it needs
// no JSX pass and can be written here as an ordinary string.
const SIDE_MENU_FILE = join(wrapperDir, 'SideMenu.js');
// The PTV-858 numbers are read from the catalog's file and inlined: a CSS import
// from outside the PoC's folder is silently dropped by its build.
const SIDE_MENU_CSS = [
  readFileSync(join(here, 'src/shared/menu-ptv858.css'), 'utf8'),
  '.cm{position:relative;flex-shrink:0;width:var(--menu-rail);height:1080px;z-index:20;color:#fff}',
  '.cm__ramp{position:absolute;left:0;top:0;width:var(--menu-ramp-w);height:1080px;background:var(--menu-ramp);',
  'opacity:0;transition:opacity 220ms ease;pointer-events:none}',
  '.cm.is-open .cm__ramp{opacity:1}',
  '.cm__logo{position:absolute;left:56px;top:96px;width:48px;height:50px;display:block}',
  '.cm__item{position:absolute;left:32px;width:96px;height:64px;display:flex;align-items:center;',
  'justify-content:center;opacity:.5;transition:opacity 180ms ease;color:#fff}',
  '.cm__item.is-selected{opacity:1}',
  '.cm__item svg{display:block}',
  '.cm__label{position:absolute;left:var(--menu-label-x);height:var(--menu-ring-h);display:flex;align-items:center;',
  "font-family:'Rubik',sans-serif;font-size:24px;font-weight:400;line-height:1;color:#fff;white-space:nowrap;",
  'opacity:0;transform:translateX(-12px);transition:opacity 180ms ease,transform 180ms ease;pointer-events:none}',
  '.cm.is-open .cm__label{opacity:.5;transform:none}',
  '.cm.is-open .cm__label.is-selected{opacity:1}',
  '.cm__ring{position:absolute;left:var(--menu-ring-x);width:var(--menu-ring-w);height:var(--menu-ring-h);',
  'border-radius:var(--menu-ring-radius);box-shadow:inset 0 0 0 var(--menu-ring-weight) var(--menu-ring-color);',
  'box-sizing:border-box;opacity:0;transition:opacity 180ms ease,top 160ms cubic-bezier(.2,.7,.3,1);pointer-events:none}',
  '.cm.is-open .cm__ring{opacity:1}',
].join('');
writeFileSync(SIDE_MENU_FILE, [
  "import { createElement as h, useState, useEffect } from 'react';",
  // The four icons are copied out of the catalog's set rather than imported:
  // the PoC's Babel injects core-js imports into every module it compiles, and
  // core-js does not resolve from the catalog's folder.
  `const ICON = ${JSON.stringify(Object.fromEntries(['Home', 'Search', 'Account', 'Shield'].map((n) => [n, iconSvg(n)])))};`,
  'const icon = (n) => ICON[n];',
  `const MARK = ${JSON.stringify(BASE + MARK_PATH)};`,
  `const CSS = ${JSON.stringify(SIDE_MENU_CSS)};`,
  "if (!document.getElementById('catalog-side-menu')) {",
  "  const st = document.createElement('style'); st.id = 'catalog-side-menu'; st.textContent = CSS;",
  '  document.head.appendChild(st);',
  '}',
  // The PoC's four pages, in its order; icons from the Figma set.
  "const ITEMS = [{ id: 'home', label: 'Home', ico: 'Home' }, { id: 'search', label: 'Search', ico: 'Search' },",
  "  { id: 'profile', label: 'Profile', ico: 'Account' }, { id: 'legal', label: 'Legal', ico: 'Shield' }];",
  // Figma: first item at y 246, 64 tall, 88 apart -- the catalog's yOf().
  'const Y = (i) => 246 + i * 88;',
  'export const SideMenu = ({ currentPage, onNavigate, isFocused, onExitMenu }) => {',
  '  const sel = Math.max(0, ITEMS.findIndex((it) => it.id === currentPage));',
  '  const [at, setAt] = useState(sel);',
  // Same keys as the PoC's own SideMenu.
  '  useEffect(() => {',
  '    if (!isFocused) return;',
  '    const onKey = (e) => {',
  "      if (e.key === 'ArrowUp') { e.preventDefault(); setAt((p) => Math.max(0, p - 1)); }",
  "      else if (e.key === 'ArrowDown') { e.preventDefault(); setAt((p) => Math.min(ITEMS.length - 1, p + 1)); }",
  "      else if (e.key === 'Enter') { e.preventDefault(); onNavigate(ITEMS[at].id); onExitMenu(); }",
  "      else if (e.key === 'ArrowRight' || e.key === 'Escape' || e.key === 'Backspace') { e.preventDefault(); onExitMenu(); }",
  '    };',
  "    window.addEventListener('keydown', onKey);",
  "    return () => window.removeEventListener('keydown', onKey);",
  '  }, [isFocused, at, onNavigate, onExitMenu]);',
  // White = the selected page only, icon and label together. Focus = the ring.
  "  return h('aside', { className: 'cm' + (isFocused ? ' is-open' : '') },",
  "    h('div', { className: 'cm__ramp' }),",
  "    h('img', { className: 'cm__logo', src: MARK, alt: 'PlayAlong' }),",
  "    ...ITEMS.map((it, i) => h('div', { key: it.id, className: 'cm__item' + (i === sel ? ' is-selected' : ''),",
  "      style: { top: Y(i) + 'px' }, dangerouslySetInnerHTML: { __html: icon(it.ico, 40) } })),",
  "    ...ITEMS.map((it, i) => h('span', { key: 'l-' + it.id, className: 'cm__label' + (i === sel ? ' is-selected' : ''),",
  "      style: { top: Y(i) + 'px' } }, it.label)),",
  "    h('span', { className: 'cm__ring', style: { top: Y(at) + 'px' } }));",
  '};',
].join('\n'));
const component = (name) => JSON.stringify(join(POC, 'src/components', `${name}.tsx`));
writeFileSync(wrapper, `
import poc from ${JSON.stringify(join(POC, 'vite.config.ts'))};
import { readFileSync } from 'node:fs';

// Every patch must find its target; a silent miss would ship the unpatched app.
function patch(code, from, to, what) {
  if (!code.includes(from)) throw new Error('tv-game-poc patch target not found: ' + what);
  return code.split(from).join(to);
}

// Web: Sign In <-> Reset Password only. Plain createElement so no JSX pass is needed.
const WEB_APP = \`
import { createElement as h, useState, useEffect } from 'react';
import { SignInScreen } from ${component('SignInScreen')};
import { ResetPasswordScreen } from ${component('ResetPasswordScreen')};
export default function WebApp() {
  const [screen, setScreen] = useState('signin');
  // The catalog's screen diagram drives this through window.catalogFlow.
  useEffect(() => {
    window.catalogFlow = { go: (id) => setScreen(id === 'reset' ? 'reset' : 'signin'), current: () => screen };
  }, [screen]);
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

const CATALOG_FLOW_TV = [
  '  useEffect(() => {',
  '    const TO: Record<string, Screen> = { splash: "welcome", home: "home", menu: "home", pages: "search",',
  '      ff: "family-feud-player", fm: "fast-money-player", cs: "card-sharks-player",',
  '      mg: "match-game-player", mg2: "match-game-ep2-player", pc: "player" };',
  '    const FROM: Record<string, string> = { welcome: "splash", search: "pages", profile: "pages", legal: "pages",',
  '      "family-feud-player": "ff", "fast-money-player": "fm", "card-sharks-player": "cs",',
  '      "match-game-player": "mg", "match-game-ep2-player": "mg2", player: "pc" };',
  '    (window as any).catalogFlow = {',
  '      go: (id: string) => {',
  '        setPendingScreen(null);',
  '        setCurrentScreen(TO[id] ?? "home");',
  '        // The menu is not a screen: open it on Home the way a remote does.',
  '        if (id === "menu") setTimeout(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" })), 350);',
  '        else if (id === "home" && document.querySelector(".cm.is-open")) window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));',
  '      },',
  '      current: () => {',
  '        const s = (window as any).__catalogScreen as string;',
  '        if (s === "home") return document.querySelector(".cm.is-open") ? "menu" : "home";',
  '        return FROM[s] ?? s;',
  '      },',
  '    };',
  '  }, []);',
  '  useEffect(() => { (window as any).__catalogScreen = currentScreen; }, [currentScreen]);',
].join('\\n');

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
    if (id.split('?')[0].endsWith('/components/SideMenu.tsx')) {
      return readFileSync(${JSON.stringify(SIDE_MENU_FILE)}, 'utf8');
    }
    if (id.split('?')[0].endsWith('/components/PasswordGate.tsx')) {
      return 'export const PasswordGate = ({ children }) => children;';
    }
  },
  transform(code, id) {
    const file = id.split('?')[0];
    if (file.endsWith('/src/App.tsx')) {
      code = patch(code, "import { WelcomeScreen } from './components/WelcomeScreen';", "import { WelcomeScreen } from 'virtual:catalog-splash';", 'App WelcomeScreen import');
      // The catalog's screen diagram drives the app through window.catalogFlow:
      // go(node) jumps to a screen, current() names the node that is up.
      code = patch(code, "  const [pendingScreen, setPendingScreen] = useState<Screen | null>(null);",
        "  const [pendingScreen, setPendingScreen] = useState<Screen | null>(null);\\n" + CATALOG_FLOW_TV, 'App catalogFlow');
      code = patch(code, "onStartDemo={() => setCurrentScreen('signin')}", "onStartDemo={() => setCurrentScreen('home')}", 'App splash → home');
      return patch(code, "onBack={() => setCurrentScreen('welcome')}", "onBack={() => {}}", 'App back to welcome');
    }
    if (file.endsWith('/src/components/GameSelectionScreen.tsx')) {
      // PTV-858: the rail stays 160 open or shut, so the rail-scroll maths must
      // not assume 340 when the menu has focus -- that is what made Featured
      // Games jump when the menu opened.
      return patch(code, 'const menuWidth = isMenuFocused ? 340 : 160;', 'const menuWidth = 160;', 'GameSelection menuWidth');
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

mkdirSync(join(OUT, 'catalog'), { recursive: true });
copyFileSync(MARK_SRC, join(OUT, MARK_PATH));

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
