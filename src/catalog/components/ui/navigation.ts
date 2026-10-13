/**
 * Navigation: the two menus, the dimming overlay the expanded one really is,
 * the tab strip and the game-type tag row.
 *
 * Read node by node on 2026-10-13. The menu geometry corroborates
 * `specs/PTV-858-menu-no-content-shift/ui-spec.md` in the hub exactly — the
 * 250 x 64 focus ring at x = 47, the 160 rail, the 96 top padding.
 */
import '../../../shared/menu-ptv858.css';   // the single source of the PTV-858 numbers
import { injectStyle } from '../../../lib/injectStyle';
import type { ComponentModule } from '../types';
import { icon } from '../icons';

const h = (html: string): HTMLElement => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild as HTMLElement;
};

const T = (n: string) =>
  `font-family:var(--type-${n}-family);font-weight:var(--type-${n}-weight);font-size:var(--type-${n}-size);line-height:var(--type-${n}-line);letter-spacing:var(--type-${n}-tracking);text-transform:var(--type-${n}-case)`;

/* ------------------------------------------------------------------- menus */

injectStyle('css-c-menu', `
.c-menu { height: 1080px; box-sizing: border-box; padding: 96px 0; position: relative;
  display: flex; flex-direction: column; color: var(--tv-base-light); }
.c-menu--collapsed { width: var(--menu-rail); }
.c-menu--expanded  { width: 340px; }
.c-menu__logo { align-self: flex-start; margin-left: 56px; display: flex; }
.c-menu--expanded .c-menu__logo { margin-left: 58px; }
.c-menu__group { padding: 0 32px; display: flex; flex-direction: column; gap: 24px;
  margin-top: 100px; }
.c-menu__foot { padding: 0 32px; margin-top: auto; }
/* 96 x 64 collapsed, 276 x 64 expanded -- both measured. Padding alone gave
   32 + 40 + 32 = 104, which pushed the icon 4px right of the rail's centre
   while every other icon in the stack sat on it. */
.c-menu__item { height: 64px; box-sizing: border-box; border-radius: 80px; opacity: .5;
  display: flex; align-items: center; gap: 8px;
  font-family: var(--type-body-l-family); font-size: 24px; white-space: nowrap; }
.c-menu--collapsed .c-menu__item { width: 96px; padding: 12px 0; justify-content: center; }
.c-menu--expanded .c-menu__item { width: 276px; padding: 12px 32px; }
.c-menu__item > svg { flex: none; }
/* Selected is WHITE, not a blue pill (design, 2026-10-13). The item carries no
   fill at all: being current means being at full strength while everything
   else sits at 50%. The blue is now only the focus ring, which is the thing
   the D-pad moves. */
.c-menu__item.is-selected { opacity: 1; }

.c-overlay { width: var(--menu-ramp-w); height: 1080px; position: relative; overflow: hidden; }
/* The real Home screen the menu sits on — captured from the TV Game PoC at
   1920 x 1080 with its own rail hidden, so only this rail is drawn. Without real
   content the ramp is invisible on a dark card, and dimming is its whole job. */
.c-overlay__behind { position: absolute; inset: 0;
  background: var(--tv-base-dark) url('assets/components/home-screen.jpg') left top / 1920px 1080px no-repeat; }
.c-overlay__ramp { position: absolute; inset: 0; background: var(--menu-ramp); }
.c-overlay .c-menu { position: absolute; left: 0; top: 0; }
.c-overlay__label { position: absolute; left: var(--menu-label-x); font-family: var(--type-body-l-family);
  font-size: 24px; color: var(--tv-base-light); opacity: .5; }
.c-overlay__label.is-on { opacity: 1; }
.c-overlay__ring { position: absolute; left: var(--menu-ring-x); top: 246px;
  width: var(--menu-ring-w); height: var(--menu-ring-h);
  border-radius: var(--menu-ring-radius);
  box-shadow: inset 0 0 0 var(--menu-ring-weight) var(--menu-ring-color); }
/* Collapsed until it has focus. The ramp and the labels fade in; the rail does
   not move, which is the whole point of PTV-858. */
.c-overlay--live { outline: none; cursor: pointer; }
.c-overlay--live .c-overlay__ramp { opacity: 0; transition: opacity 220ms ease; }
.c-overlay--live.is-open .c-overlay__ramp { opacity: 1; }
/* A label slides the last few pixels in rather than appearing, so the eye can
   see WHERE it came from -- out of the rail, not from a widening of it. */
.c-overlay--live .c-overlay__label {
  opacity: 0; transform: translateX(-12px);
  transition: opacity 180ms ease, transform 180ms ease; }
.c-overlay--live.is-open .c-overlay__label { opacity: .5; transform: none; }
.c-overlay--live.is-open .c-overlay__label.is-on { opacity: 1; }
.c-overlay--live .c-overlay__ring { opacity: 0;
  transition: opacity 180ms ease, top 160ms cubic-bezier(.2,.7,.3,1); }
.c-overlay--live.is-open .c-overlay__ring { opacity: 1; }
.c-overlay--live:focus-visible { box-shadow: inset 0 0 0 2px var(--accent); }
`);

/** Home, Search, Legal, Progression, Trophies — then Sign In, pinned to the bottom. */
const MENU = [
  { ico: 'Home', label: 'Home' },
  { ico: 'Search', label: 'Search' },
  { ico: 'Shield', label: 'Legal' },
  { ico: 'Leaderboard', label: 'Progression' },
  { ico: 'Trophy', label: 'Trophies' },
] as const;
const MENU_FOOT = { ico: 'Account', label: 'Sign In' } as const;

const menu = (expanded: boolean, selected = 0) => {
  const item = (m: { ico: string; label: string }, i: number) =>
    `<div class="c-menu__item${i === selected ? ' is-selected' : ''}">${icon(m.ico, 40)}${
      expanded ? `<span>${m.label}</span>` : ''}</div>`;
  return h(`<div class="c-menu c-menu--${expanded ? 'expanded' : 'collapsed'}">
      <div class="c-menu__logo">${expanded ? LOGO_WORDMARK : LOGO_MARK}</div>
      <div class="c-menu__group">${MENU.map(item).join('')}</div>
      <div class="c-menu__foot">${item(MENU_FOOT, NaN)}</div>
    </div>`);
};

/** The real `Subtract` vector (933:7845), exported — not redrawn. */
const LOGO_MARK = `<img src="assets/flows/mark.svg" alt="PlayAlong" style="width:48px;height:50px;display:block">`;
/** The full wordmark, 224 x 50, as the expanded menu carries it. */
const LOGO_WORDMARK = `<img src="assets/flows/logo.svg" alt="PlayAlong" style="width:224px;height:50px;display:block">`;

/**
 * One component, not three. `Collapsed Menu`, `Expanded Menu` and `Overlay` are
 * three nodes in Figma describing one thing on screen, and the only way to see
 * whether the rule holds -- the rail never widens, the content never shifts --
 * is to drive it.
 */
export const Menu: ComponentModule = {
  id: 'c-menu', title: 'Menu', group: 'Navigation', figma: '11561:15402',
  description: 'The rail at 160, the labels that appear beside it, and the ramp that dims the content. Three Figma nodes, one behaviour, on 45 frames.',
  tokens: {
    colour: ['TV/Base/Dark', 'TV/Base/Light', 'TV/Button/Primary', 'TV/Button/Primary Solid', 'TV/Focus/Ring Color'],
    type: ['Body/L'],
  },
  wide: true,
  variants: [
    { label: '▶ Live — click the rail, then ↑ ↓ and Esc', el: liveMenu },
    { label: 'Collapsed Menu — 772:7012', el: () => onScreen(menu(false, 0)) },
    { label: 'Expanded Menu — 772:6986', el: () => onScreen(menu(true, 0)) },
    { label: 'Overlay — 11561:15402', el: drawnOverlay },
  ],
  notes: [
    '<strong><code>Expanded Menu</code> is 340 wide, not 792.</strong> The 792 belongs to <code>Overlay</code>, which is the <em>collapsed</em> rail with the six labels as loose text beside it over the dimming ramp. The expanded component is not what the screen uses, so anything reserving 792 for the menu has read the wrong node.',
    'The rail is the <strong>same 160 wide open or shut</strong> — that is the whole of PTV-858, and why the content never shifts. The live variant is the only way to see it: watch the Home screen behind the ramp stay put.',
    'The ramp is a horizontal gradient, not a flat panel: opaque <code>#040810</code>, <code>rgb(2,5,9)</code> at 80% at 43% of its width, fully transparent at the end. Measured on a device during PTV-858 — content keeps 39.9% of its luminance at x = 450 and 100% from x = 792.',
    'The focus ring is a single 250 × 64 rectangle at x = 47, <strong>one size for every item</strong>, taken from the longest label (<code>Progression</code>, 134 wide). It does not hug its own text — a ring that resized per item would flicker as focus moved, and on a D-pad the moving ring is the only feedback there is.',
    'In the drawn <code>Overlay</code> frame the <strong>ring is on Home but the full-strength label is Trophies</strong> — the labels carry their own opacity and two of them disagree about where focus is. <strong>A file defect</strong>, kept in the drawn variant and corrected in the live one, which has a single focus.',
    '<strong>Selected is white, not a blue pill</strong> (design, 2026-10-13). Being the current page means being at full strength while the rest sit at 50%; the blue is now only the focus ring. <strong>Figma has not caught up</strong> — its <code>Menu Item</code> component still fills <code>State=Focus</code> with the <code>Button/Primary</code> gradient, on 60 frames.',
    'In the collapsed rail the Sign In item is <strong>104 wide where the other five are 96</strong>. An 8px difference on an item whose label is hidden.',
    'The screen behind every variant is the real Home screen, captured from the TV Game PoC with its own rail hidden — it is context, not part of the component. On a dark card the ramp would otherwise show nothing at all.',
  ],
};

/** A menu variant on the real Home screen, so it reads as the thing on the TV. */
function onScreen(menuEl: HTMLElement): HTMLElement {
  const el = h(`<div class="c-overlay"><div class="c-overlay__behind"></div></div>`);
  el.appendChild(menuEl);
  return el;
}

/** The six labels as the Overlay frame positions them, with its own focus bug. */
const OVERLAY_LABELS: [string, number][] = [
  ['Home', 270], ['Search', 355], ['Legal', 446],
  ['Progression', 534], ['Trophies', 621], ['Sign In', 943],
];

function drawnOverlay(): HTMLElement {
  const el = h(`<div class="c-overlay"><div class="c-overlay__behind"></div>
      <div class="c-overlay__ramp"></div></div>`);
  el.appendChild(menu(false, NaN));
  for (const [t, y] of OVERLAY_LABELS) {
    const sEl = h(`<span class="c-overlay__label${t === 'Trophies' ? ' is-on' : ''}">${t}</span>`);
    sEl.style.top = `${y - 7}px`;
    el.appendChild(sEl);
  }
  const ring = h(`<span class="c-overlay__ring"></span>`);
  ring.style.top = '246px';
  el.appendChild(ring);
  return el;
}

/**
 * Collapsed until it has focus; then the labels and the ramp come in.
 *
 * The DOM is built ONCE and only classes and the ring's offset change after
 * that. Rebuilding it per keystroke -- which this did at first -- means every
 * element is brand new, has no previous value to transition from, and nothing
 * animates however many transitions are declared.
 */
function liveMenu(): HTMLElement {
  const ITEMS = [...MENU, MENU_FOOT];
  const el = h(`<div class="c-overlay c-overlay--live" tabindex="0" role="navigation"
      aria-label="Menu"><div class="c-overlay__behind"></div>
      <div class="c-overlay__ramp"></div></div>`);
  const rail = menu(false, 0);
  el.appendChild(rail);
  const railItems = [...rail.querySelectorAll<HTMLElement>('.c-menu__item')];

  const yOf = (i: number) => (i === ITEMS.length - 1 ? 920 : 246 + i * 88);
  const labels = ITEMS.map((m, i) => {
    const lab = h(`<span class="c-overlay__label">${m.label}</span>`);
    lab.style.top = `${yOf(i) + 24 - 7}px`;
    el.appendChild(lab);
    return lab;
  });
  const ring = h(`<span class="c-overlay__ring"></span>`);
  el.appendChild(ring);

  let open = false;
  let at = 0;
  const draw = () => {
    el.classList.toggle('is-open', open);
    // White means SELECTED -- the page you are on -- open or shut. Focus is the
    // ring and nothing else, so passing over an item does not brighten it.
    railItems.forEach((it, i) => it.classList.toggle('is-selected', i === 0));
    labels.forEach((l, i) => l.classList.toggle('is-on', open && i === at));
    ring.style.top = `${yOf(at)}px`;
  };

  const key = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'Enter') open = true;
    else if (e.key === 'Escape' || e.key === 'ArrowLeft') open = false;
    else if (e.key === 'ArrowDown') { open = true; at = (at + 1) % ITEMS.length; }
    else if (e.key === 'ArrowUp') { open = true; at = (at - 1 + ITEMS.length) % ITEMS.length; }
    else return;
    e.preventDefault();
    draw();
  };
  el.addEventListener('keydown', key);
  el.addEventListener('focus', () => { open = true; draw(); });
  el.addEventListener('blur', () => { open = false; draw(); });
  el.addEventListener('click', () => el.focus());
  draw();
  return el;
}

/* -------------------------------------------------------------------- Tabs */

injectStyle('css-c-tabs', `
.c-tabs { display: inline-flex; gap: 24px; }
.c-tabs .c-tab { width: 151px; }
`);

export const Tabs: ComponentModule = {
  id: 'c-tabs', title: 'Tabs', group: 'Navigation', figma: '867:1808',
  description: '676 × 56 — four Tabs Items on a 24 gap. It switches seasons on Details and QR against Email on the auth screens.',
  tokens: {
    colour: ['TV/Button/Secondary', 'TV/Border/White 20', 'TV/Base/Light', 'TV/Text/Primary'],
    type: [],
  },
  variants: [
    { label: 'Season 4 selected', el: () => h(`<div class="c-tabs">
        <span class="c-tab is-selected">Season 4</span><span class="c-tab">Season 3</span>
        <span class="c-tab">Season 2</span><span class="c-tab">Season 1</span></div>`) },
    { label: '▶ Live — click a season', el: () => {
      const row = h(`<div class="c-tabs">
        <span class="c-tab is-selected">Season 4</span><span class="c-tab">Season 3</span>
        <span class="c-tab">Season 2</span><span class="c-tab">Season 1</span></div>`);
      row.querySelectorAll<HTMLElement>('.c-tab').forEach((t) => {
        t.style.cursor = 'pointer';
        t.addEventListener('click', () => {
          row.querySelectorAll('.c-tab').forEach((o) => o.classList.remove('is-selected'));
          t.classList.add('is-selected');
        });
      });
      return row;
    } },
  ],
  notes: [
    '<strong>Every item is 151 wide</strong> although the labels differ — the same longest-label rule as the menu ring. The <code>Tabs Item</code> component on its own hugs its text; the strip overrides it.',
    'The strip has no focus variant. Focus belongs to <code>Tabs Item</code>, which has one, so a focused strip has to come from the item.',
  ],
};

/* --------------------------------------------------- Game Type Tags Row */

injectStyle('css-c-tagrow', `
.c-tagrow { display: flex; gap: 24px; flex-wrap: wrap; }
.c-gtag { height: 42px; box-sizing: border-box; border-radius: 8px;
  background: var(--tv-button-secondary); border: 1px solid var(--tv-border-white-20);
  display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px;
  ${T('label-m')}; text-transform: none; color: var(--tv-base-light); white-space: nowrap; }
.c-gtag > svg { flex: none; }
`);

/** The six input kinds a game can ask for, in the row's own order. */
const TAGS: [string, string][] = [
  ['Check', 'Multiple Choice (A-D)'],
  ['Pad', 'numeric input'],
  ['Text', 'Free Text Entry'],
  ['Up/Down', 'up/down select'],
  ['Mic', 'voice input'],
  ['Timer', 'time-limited'],
];

export const GameTypeTagsRow: ComponentModule = {
  id: 'c-game-type-tags-row', title: 'Game Type Tags Row', group: 'Content', figma: '473:2980',
  description: '1408 × 42 — the six input-kind tags a game can carry, shown on rail cards and on Details.',
  tokens: {
    colour: ['TV/Button/Secondary', 'TV/Border/White 20', 'TV/Base/Light'],
    type: ['Label/M'],
  },
  wide: true,
  variants: [
    { label: 'All six', el: () => h(`<div class="c-tagrow">${
      TAGS.map(([i, t]) => `<span class="c-gtag">${icon(i, 24)}${t}</span>`).join('')}</div>`) },
  ],
  notes: [
    '<strong>The six labels disagree about case</strong>: <em>Multiple Choice (A-D)</em> and <em>Free Text Entry</em> are title case, <em>numeric input</em>, <em>up/down select</em>, <em>voice input</em> and <em>time-limited</em> are lower. All six bind <code>Label/M</code>, which is <code>Rubik Medium 18 CAPS</code> — so the style says caps and not one of them is in caps. <strong>Needs a decision.</strong> Drawn as the file renders them.',
    'The first tag is an instance of <code>Content Tag Type</code>; the other five are <code>Game Type Tag - Variants</code>. <strong>Two different components in one row</strong>, drawing the same thing.',
    'These name what the game asks the player to do — multiple choice, a number, free text, up/down, voice, a clock. They are not the content tags on a rail card.',
  ],
};
