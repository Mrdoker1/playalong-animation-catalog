/**
 * Navigation: the two menus, the dimming overlay the expanded one really is,
 * the tab strip and the game-type tag row.
 *
 * Read node by node on 2026-10-13. The menu geometry corroborates
 * `specs/PTV-858-menu-no-content-shift/ui-spec.md` in the hub exactly — the
 * 250 x 64 focus ring at x = 47, the 160 rail, the 96 top padding.
 */
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
.c-menu--collapsed { width: 160px; }
.c-menu--expanded  { width: 340px; }
.c-menu__logo { align-self: flex-start; margin-left: 56px; display: flex; }
.c-menu--expanded .c-menu__logo { margin-left: 58px; }
.c-menu__group { padding: 0 32px; display: flex; flex-direction: column; gap: 24px;
  margin-top: 100px; }
.c-menu__foot { padding: 0 32px; margin-top: auto; }
.c-menu__item { height: 64px; box-sizing: border-box; border-radius: 80px; opacity: .5;
  display: flex; align-items: center; gap: 8px; padding: 12px 32px;
  font-family: var(--type-body-l-family); font-size: 24px; white-space: nowrap; }
.c-menu__item > svg { flex: none; }
.c-menu__item.is-selected { opacity: 1; border-radius: 12px;
  background: var(--gradient-tv-button-primary);
  box-shadow: inset 0 0 0 1px var(--tv-button-primary-solid); }

.c-overlay { width: 792px; height: 1080px; position: relative; overflow: hidden; }
/* A stand-in for the content the ramp dims. Without it the gradient is
   invisible on a dark card, and the component's whole job is the dimming. */
.c-overlay__behind { position: absolute; inset: 0; background:
  repeating-linear-gradient(90deg, var(--tv-base-neutral) 0 88px, var(--tv-transparent-white-10) 88px 176px); }
.c-overlay__ramp { position: absolute; inset: 0;
  background: linear-gradient(90deg, #040810 0%, rgb(2 5 9 / .8) 43%, rgb(0 0 0 / 0) 100%); }
.c-overlay .c-menu { position: absolute; left: 0; top: 0; }
.c-overlay__label { position: absolute; left: 123px; font-family: var(--type-body-l-family);
  font-size: 24px; color: var(--tv-base-light); opacity: .5; }
.c-overlay__label.is-on { opacity: 1; }
.c-overlay__ring { position: absolute; left: 47px; top: 246px; width: 250px; height: 64px;
  border-radius: 12px; box-shadow: inset 0 0 0 6px var(--tv-focus-ring-color); }
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

export const CollapsedMenu: ComponentModule = {
  id: 'c-menu-collapsed', title: 'Collapsed Menu', group: 'Navigation', figma: '772:7012',
  description: '160 × 1080, 96 top and bottom. The mark, then five 96 × 64 items on a 24 gap, and Sign In at the foot.',
  tokens: {
    colour: ['TV/Base/Light', 'TV/Button/Primary', 'TV/Button/Primary Solid'],
    type: [],
  },
  wide: true,
  variants: [{ label: 'Home selected', el: () => menu(false, 0) }],
  notes: [
    '<strong>The unselected items sit at 50% opacity and radius 80; the selected one at full strength and radius 12.</strong> So selecting an item changes its corner from a pill to a rounded rectangle — the same unintended corner move the <code>Tabs Item</code> has.',
    'The rail is the <strong>same 160 wide in both states</strong>, which is the whole point of PTV-858 and why the content never shifts.',
    'The Sign In item is <strong>104 wide in the collapsed menu against 96 for the other five</strong>. An 8px difference on an item whose label is hidden. <strong>Probably a stray.</strong>',
    'The mark here is drawn from the <code>Subtract</code> vector rather than exported, because the exported file carries its own backdrop. The expanded menu uses the real wordmark SVG.',
  ],
};

export const ExpandedMenu: ComponentModule = {
  id: 'c-menu-expanded', title: 'Expanded Menu', group: 'Navigation', figma: '772:6986',
  description: '340 × 1080. The same five items at 276 wide, with their labels showing, and the full wordmark above them.',
  tokens: {
    colour: ['TV/Base/Light', 'TV/Button/Primary', 'TV/Button/Primary Solid'],
    type: ['Body/L'],
  },
  wide: true,
  variants: [{ label: 'Home selected', el: () => menu(true, 0) }],
  notes: [
    '<strong>340 wide, not 792.</strong> The 792 belongs to <code>Overlay</code>, which is this menu plus its dimming ramp — see the next component. A screen that reserves 792 for the menu has read the wrong node.',
    'The <code>Home</code> label is the one of the six that <strong>binds no text style</strong>; the other five bind <code>Body/L</code>. All six are 24px, so it looks right and exports differently.',
    'Each item is 276 wide whatever its label, so <code>Legal</code> carries as much box as <code>Progression</code>. That is the same "one size from the longest label" rule the focus ring follows.',
  ],
};

export const MenuOverlay: ComponentModule = {
  id: 'c-menu-overlay', title: 'Menu Overlay', group: 'Navigation', figma: '11561:15402',
  description: '792 × 1080 — the collapsed rail, the labels floating beside it, the focus ring, and the ramp that dims the content behind all of it.',
  tokens: {
    colour: ['TV/Base/Dark', 'TV/Base/Light', 'TV/Focus/Ring Color'],
    type: ['Body/L'],
  },
  wide: true,
  variants: [
    { label: 'Trophies focused', el: () => {
      const el = h(`<div class="c-overlay"><div class="c-overlay__behind"></div><div class="c-overlay__ramp"></div></div>`);
      el.appendChild(menu(false, NaN));
      const labels: [string, number][] = [
        ['Home', 270], ['Search', 355], ['Legal', 446],
        ['Progression', 534], ['Trophies', 621], ['Sign In', 943],
      ];
      for (const [t, y] of labels) {
        const s = h(`<span class="c-overlay__label${t === 'Trophies' ? ' is-on' : ''}">${t}</span>`);
        s.style.top = `${y - 7}px`;
        el.appendChild(s);
      }
      const ring = h(`<span class="c-overlay__ring"></span>`);
      ring.style.top = '246px';
      el.appendChild(ring);
      return el;
    } },
  ],
  notes: [
    '<strong>This is what the expanded menu actually is on screen</strong>: the <em>collapsed</em> rail, with the six labels as loose text beside it rather than inside the items, over a 792-wide ramp. The <code>Expanded Menu</code> component is not what the frame uses.',
    'The ramp is a horizontal gradient, not a flat panel: opaque <code>#040810</code>, <code>rgb(2,5,9)</code> at 80% at 43% of its width, fully transparent at the end. Measured on a device during PTV-858 — content keeps 39.9% of its luminance at x = 450 and 100% from x = 792.',
    'The focus ring is a single 250 × 64 rectangle at x = 47, <strong>one size for every item</strong>, taken from the longest label (<code>Progression</code>, 134 wide). It does not hug its own text — a ring that resized per item would flicker as focus moved, and on a D-pad the moving ring is the only feedback there is.',
    'The striped band behind the ramp is this rebuild\'s, not the file\'s — it stands in for the content the ramp dims, which on a dark card would otherwise show nothing at all.',
    'In this frame the <strong>ring is on Home but the full-strength label is Trophies</strong> — the labels carry their own opacity and two of them disagree about where focus is. <strong>A file defect.</strong> Drawn as the file has it.',
  ],
};

/* -------------------------------------------------------------------- Tabs */

injectStyle('css-c-tabs', `
.c-tabs { display: inline-flex; gap: 24px; }
.c-tabs .c-tab { width: 151px; }
`);

export const Tabs: ComponentModule = {
  id: 'c-tabs', title: 'Tabs', group: 'Navigation', figma: '867:1808',
  description: '676 × 56 — four Tabs Items of 151 on a 24 gap, the first selected.',
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
  description: '1408 × 42 — the six input-kind tags a game can carry, on a 24 gap.',
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
