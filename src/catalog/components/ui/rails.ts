/**
 * The browse surfaces: the two rail cards, the search list item, and the two
 * sections that hold a rail.
 *
 * Read node by node on 2026-10-13. The thumbnail is the file's own source
 * image, so a card is a card rather than a grey box.
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

const THUMB = 'assets/components/show-thumb.jpg';
const TITLE = 'Family Feud';
const SUB = 'S2 E4 • Human Weed Whacker • 45m';

injectStyle('css-c-rail', `
.c-card { display: flex; flex-direction: column; gap: 16px; }
.c-card__art { position: relative; border-radius: 12px; overflow: hidden;
  background: var(--tv-base-neutral); box-shadow: 0 0 0 1px var(--tv-border-white-20); }
.c-card__art img { width: 100%; height: 100%; object-fit: cover; display: block; }
.c-card.is-focus .c-card__art { box-shadow: 0 0 0 6px var(--tv-focus-ring-color); }
.c-card.is-prime .c-card__art { box-shadow: 0 0 0 1px var(--tv-game-ui-yellow); }
.c-card.is-skeleton .c-card__art { background: var(--tv-button-secondary); }
.c-card__title { ${T('heading-s')}; font-size: 24px; line-height: 28px; color: var(--tv-base-light); }
.c-card__sub { font-family: var(--type-body-m-family); font-size: 20px; line-height: 24px;
  color: var(--tv-text-primary); }
.c-card__meta { display: flex; flex-direction: column; gap: 4px; }
/* The counter that replaced the progress bar on Seen (Figma 629:4401, read
   2026-10-14). It is a Tag at a LARGER padding than the others -- 16/8 against
   NEW's 8/4, so 40 tall against 24 -- and it carries no icon.
   It sits in the SAME corner as NEW and PLAYED, bottom right, because the three
   are one slot that changes with the card's state: NEW -> 3/5 -> PLAYED.
   Re-read from 629:4401 on 2026-10-14: the tag is at x 321 y 172, 66 x 40, so
   13 from the right and 13 from the bottom; Seen carries no NEW pill, and the
   ProgressBar slot underneath is still there but hidden. */
.c-pill--count { right: 13px; bottom: 13px; left: auto; top: auto;
  height: 40px; padding: 8px 16px; border-radius: 4px;
  background: var(--tv-base-dark); color: var(--tv-base-light);
  font-family: var(--type-body-m-family); font-weight: var(--type-body-m-weight);
  font-size: var(--type-body-m-size); line-height: var(--type-body-m-line);
  letter-spacing: normal; text-transform: none; }
.c-card__ghost { height: 24px; border-radius: 4px; background: var(--tv-button-secondary); }
/* The placeholder tile is not a missing image: it is the brand mark on the
   neutral ground, which is what the file draws while the still loads. */
.c-card__ph { position: absolute; inset: 0; display: grid; place-items: center;
  background: var(--tv-base-neutral); }

.c-pill { position: absolute; display: inline-flex; align-items: center; gap: 6px;
  height: 24px; box-sizing: border-box; padding: 4px 8px; border-radius: 4px;
  ${T('label-s')}; white-space: nowrap; }
.c-pill--new   { background: var(--tv-tags-primary); color: var(--tv-base-light);
  right: 13px; bottom: 13px; }
.c-pill--prime { background: var(--tv-game-ui-yellow); color: var(--tv-base-dark);
  left: 13px; top: 13px; }
.c-pill--played { background: var(--tv-base-dark); color: var(--tv-base-light);
  right: 13px; bottom: 13px; }
.c-pill--inter { background: var(--tv-base-dark); color: var(--tv-base-light);
  left: 13px; top: 13px; }
.c-pill > svg { flex: none; }

.c-sli { width: 812px; box-sizing: border-box; display: flex; gap: 20px; padding: 20px;
  border-radius: 12px; }
.c-sli.is-focus { background: var(--tv-button-secondary);
  box-shadow: 0 0 0 6px var(--tv-focus-ring-color); }
.c-sli__art { width: 169px; height: 92px; position: relative; flex: none;
  border-radius: 4px; overflow: hidden; }
.c-sli__art img { width: 100%; height: 100%; object-fit: cover; display: block; }
.c-sli__art .c-pill--prime { left: 8px; top: 8px; }
.c-sli__art .c-pill--new { left: 8px; top: 60px; right: auto; bottom: auto; }
.c-sli__body { display: flex; flex-direction: column; gap: 12px; padding-top: 13px; }
.c-sli__title { ${T('heading-l')}; color: var(--tv-base-light); }
.c-sli__sub { ${T('body-l')}; color: var(--tv-text-primary); }

.c-section { display: flex; flex-direction: column; gap: 24px; }
.c-section__head { font-family: var(--type-heading-l-family);
  font-weight: var(--type-heading-l-weight); font-size: 32px; color: var(--tv-base-light); }
.c-section__rail { display: flex; gap: 24px; }
`);

const PILL_NEW = `<span class="c-pill c-pill--new">NEW</span>`;
const PILL_PRIME = `<span class="c-pill c-pill--prime">${icon('Crown', 16)}PRIME TIME</span>`;
const PILL_PLAYED = `<span class="c-pill c-pill--played">${icon('Done', 16)}PLAYED</span>`;
const PILL_INTER = `<span class="c-pill c-pill--inter">${icon('Gamepad', 16)}Interactive</span>`;

type CardState = 'default' | 'focus' | 'prime' | 'prime-focus' | 'seen' | 'played'
  | 'placeholder' | 'skeleton';

const card = (w: number, artH: number, state: CardState, extraPill = '') => {
  const focus = state === 'focus' || state === 'prime-focus';
  const prime = state === 'prime' || state === 'prime-focus';
  const cls = ['c-card', focus && 'is-focus', prime && !focus && 'is-prime',
    state === 'skeleton' && 'is-skeleton'].filter(Boolean).join(' ');
  const el = h(`<div class="${cls}" style="width:${w}px">
      <div class="c-card__art" style="height:${artH}px">
        ${state === 'skeleton' ? ''
          : state === 'placeholder'
            ? `<span class="c-card__ph"><img src="assets/flows/mark.svg" alt="" width="48" height="50"></span>`
            : `<img src="${THUMB}" alt="">`}
        ${state === 'skeleton' ? '' : prime ? PILL_PRIME : ''}
        ${state === 'skeleton' ? '' : extraPill}
        ${state === 'skeleton' ? ''
          : state === 'seen' ? '<span class="c-pill c-pill--count">3/5</span>'
          : state === 'played' ? PILL_PLAYED : PILL_NEW}
      </div>
      <div class="c-card__meta">${
        state === 'skeleton'
          ? `<span class="c-card__ghost" style="width:${w}px"></span><span class="c-card__ghost" style="width:100px"></span>`
          : `<span class="c-card__title">${TITLE}</span><span class="c-card__sub">${SUB}</span>`
      }</div>
    </div>`);
  return el;
};

export const HorizontalRailCard: ComponentModule = {
  id: 'c-rail-h', title: 'Horizontal Rail Card', group: 'Content', figma: '629:4401',
  description: '400 × 297 — the card every rail on the homepage is built from. Eleven variants across six states and focus.',
  tokens: {
    colour: ['TV/Base/Neutral', 'TV/Border/White 20', 'TV/Button/Primary Solid', 'TV/Button/Secondary', 'TV/Game UI/Yellow', 'TV/Tags/Primary', 'TV/Base/Light', 'TV/Base/Dark', 'TV/Text/Primary'],
    type: ['Label/S'],
  },
  wide: true,
  variants: [
    { label: 'Default', el: () => card(400, 225, 'default') },
    { label: 'Focus', el: () => card(400, 225, 'focus') },
    { label: 'Prime Time', el: () => card(400, 225, 'prime') },
    { label: 'Prime Time · Focus', el: () => card(400, 225, 'prime-focus') },
    { label: 'Seen', el: () => card(400, 225, 'seen') },
    { label: 'Played', el: () => card(400, 225, 'played') },
    { label: 'Placeholder', el: () => card(400, 225, 'placeholder') },
    { label: 'Skeleton', el: () => card(400, 225, 'skeleton') },
  ],
  notes: [
    '<strong><code>Placeholder</code> has the same structure as <code>Default</code></strong> — same frames, same NEW tag, same copy — and differs only in which picture fills the still: the brand mark on the neutral ground instead of the show. It is what a card looks like before its art arrives, and it is <strong>not</strong> the <code>Skeleton</code>, which has no card at all, only grey bars.',
    '<strong>Prime Time is marked twice over</strong>: a yellow crown pill at 13/13 <em>and</em> the card\'s border changing from <code>Border/White 20</code> to <code>Game UI/Yellow</code>. Focus then replaces that border with the 6px blue ring, so <strong>a focused Prime Time card loses its yellow edge</strong> and only the pill is left.',
    '<strong><code>Seen</code> is a counter now, not a bar</strong> (Figma, 2026-10-14). It used to be an 8px progress bar across the bottom of the still; it is a <code>Base/Dark</code> tag reading <code>3/5</code>. Both focus states carry it.',
    '<strong>NEW, <code>3/5</code> and PLAYED are one slot, bottom right</strong> — 13 from the right, 13 from the bottom — and they replace one another as the card is played: <code>NEW → 3/5 → PLAYED</code>. A card never shows two of them, and <code>Seen</code> carries no NEW pill. <em>Figma 629:4401 agrees, re-read 2026-10-14; an earlier note here said it sat bottom left, which it does not.</em>',
    'The <code>ProgressBar</code> slot is <strong>still in the Figma component and still hidden</strong>. It is the bar the counter replaced, left in place rather than deleted — nothing draws it, here or there.',
    'That counter tag is <strong>40 high where every other pill is 24</strong> — padding 16/8 against NEW\'s 8/4 — and it carries <strong>no icon</strong>, although the proposal\'s mock showed one.',
    '<code>Played</code> is unchanged: it swaps the NEW pill for a dark PLAYED one with a tick.',
    'The title and the episode line <strong>bind no text style</strong> — loose 24 and 20. Only the pills bind one (<code>Label/S</code>).',
    'Focus is a <strong>6px</strong> ring where the idle border is 1px, both drawn OUTSIDE, so the card does not move when it takes focus.',
  ],
};

export const VerticalRailCard: ComponentModule = {
  id: 'c-rail-v', title: 'Vertical Rail Card', group: 'Content', figma: '629:5141',
  description: '300 × 472 — a portrait card with an Interactive pill the horizontal one does not carry.',
  tokens: {
    colour: ['TV/Base/Neutral', 'TV/Border/White 20', 'TV/Button/Primary Solid', 'TV/Button/Secondary', 'TV/Tags/Primary', 'TV/Base/Dark', 'TV/Base/Light', 'TV/Text/Primary'],
    type: ['Label/S'],
  },
  wide: true,
  variants: [
    { label: 'Default', el: () => card(300, 400, 'default', PILL_INTER) },
    { label: 'Focus', el: () => card(300, 400, 'focus', PILL_INTER) },
    { label: 'Placeholder', el: () => card(300, 400, 'placeholder', PILL_INTER) },
    { label: 'Skeleton', el: () => card(300, 400, 'skeleton') },
  ],
  notes: [
    'The <strong>Interactive</strong> pill is this card\'s own — the horizontal one never shows it, and it has <strong>no Prime Time or Played state at all</strong>: five variants against the horizontal card\'s eleven.',
    '<strong>Its icon is not an icon.</strong> It is a TEXT node whose characters are the word <code>gamepad</code> at 16px — a Material Symbols ligature, a third typeface that is in neither Rubik nor Roboto Condensed. If that font is missing it renders as the literal word. <strong>A file defect.</strong> Drawn here with the product <code>Gamepad</code> icon instead.',
    'The still here is the landscape source cropped to portrait, because the file\'s portrait art is a different asset this rebuild does not have. The geometry is the file\'s; the picture is a stand-in.',
  ],
};

export const SearchListItem: ComponentModule = {
  id: 'c-search-item', title: 'Search List Item', group: 'Content', figma: '8837:11368',
  description: '812 × 132 — one result in the search list: a still beside a Heading/L title and a Body/L episode line.',
  tokens: {
    colour: ['TV/Button/Secondary', 'TV/Button/Primary Solid', 'TV/Game UI/Yellow', 'TV/Tags/Primary', 'TV/Base/Light', 'TV/Base/Dark', 'TV/Text/Primary'],
    type: ['Heading/L', 'Body/L', 'Label/S'],
  },
  wide: true,
  variants: [
    { label: 'New · Default', el: () => h(`<div class="c-sli">
        <div class="c-sli__art"><img src="${THUMB}" alt="">${PILL_NEW}</div>
        <div class="c-sli__body"><span class="c-sli__title">${TITLE}</span>
          <span class="c-sli__sub">${SUB}</span></div></div>`) },
    { label: 'New & Prime Time · Focus', el: () => h(`<div class="c-sli is-focus">
        <div class="c-sli__art"><img src="${THUMB}" alt="">${PILL_PRIME}${PILL_NEW}</div>
        <div class="c-sli__body"><span class="c-sli__title">${TITLE}</span>
          <span class="c-sli__sub">${SUB}</span></div></div>`) },
  ],
  notes: [
    '<strong>Unlike the rail cards, this one does bind its text styles</strong> — <code>Heading/L</code> for the title, <code>Body/L</code> for the episode line. Same two pieces of copy, two different typographic treatments across the file.',
    'The row has <strong>no resting surface</strong>: it is transparent until focused, when it takes <code>Button/Secondary</code> and the 6px ring. So an unfocused list is a column of floating text.',
    'Both pills stack on the <strong>left</strong> of the still here, where on a rail card NEW sits bottom-right. The pill placement is per surface, not per tag.',
  ],
};

export const SearchListItemImage: ComponentModule = {
  id: 'c-search-item-image', title: 'Search List Item Image', group: 'Content', figma: '13914:21052',
  description: '169 × 92 — the still with its two pill slots, pulled out as a component of its own.',
  tokens: { colour: ['TV/Game UI/Yellow', 'TV/Tags/Primary'], type: ['Label/S'] },
  variants: [
    { label: 'Both pills', el: () => h(`<div class="c-sli__art"><img src="${THUMB}" alt="">${PILL_PRIME}${PILL_NEW}</div>`) },
  ],
  notes: [
    'It exists because the pills needed a frame to be positioned in. There is <strong>no equivalent component for the rail cards\' stills</strong>, which position their pills directly — so one surface factored this out and the other did not.',
  ],
};

/* ---------------------------------------------------------------- Sections */

const section = (title: string, cards: HTMLElement[]) => {
  const el = h(`<div class="c-section"><span class="c-section__head">${title}</span>
      <div class="c-section__rail"></div></div>`);
  const rail = el.querySelector('.c-section__rail')!;
  cards.forEach((c) => rail.appendChild(c));
  return el;
};

export const SectionTrending: ComponentModule = {
  id: 'c-section-trending', title: 'Section — Trending', group: 'Content', figma: '629:4537',
  description: '1756 × 365 — a heading over a row of horizontal rail cards. The homepage is a stack of these.',
  tokens: { colour: ['TV/Base/Light'], type: [] },
  wide: true,
  variants: [
    { label: 'Trending Interactive Shows', el: () => section('Trending Interactive Shows',
      [card(400, 225, 'focus'), card(400, 225, 'default'), card(400, 225, 'default'), card(400, 225, 'default')]) },
  ],
  notes: [
    'The section is <strong>1756 wide inside a 1760 content block</strong>, so the fourth card is cut by the screen edge — which is how a rail says there is more to the right. Nothing here scrolls; that is the client\'s.',
    'The heading is <strong>32px and binds no text style</strong> — between <code>Heading/L</code> (36) and <code>Heading/S</code> (24), matching neither.',
    'The file fills the rail with <strong>five different shows</strong> — Family Feud, Match Game, Plinko, Classic Concentration, Guess The Word — each with its own still. One card is repeated here; only the artwork differs.',
  ],
};

export const SectionWatchMore: ComponentModule = {
  id: 'c-section-watch-more', title: 'Section — Watch More', group: 'Content', figma: '629:5321',
  description: '1920 × 540 — the same shape as the trending section but with vertical cards, and it spans the whole screen rather than the content block.',
  tokens: { colour: ['TV/Base/Light'], type: ['Heading/L'] },
  wide: true,
  variants: [
    { label: 'Watch More', el: () => section('Watch More',
      [card(300, 400, 'focus', PILL_INTER), card(300, 400, 'default', PILL_INTER),
       card(300, 400, 'default', PILL_INTER), card(300, 400, 'default', PILL_INTER)]) },
  ],
  notes: [
    '<strong>1920 wide against the trending section\'s 1756.</strong> One section is sized to the content block and the other to the whole screen, so the two rails do not start at the same x. <strong>Worth checking</strong> — on screen that reads as a misaligned column.',
  ],
};
