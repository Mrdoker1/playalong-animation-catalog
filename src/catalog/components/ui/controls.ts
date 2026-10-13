import { injectStyle } from '../../../lib/injectStyle';
import type { ComponentModule } from '../types';
import { icon, ICONS, ICON_NAMES } from '../icons';

/** Shared helper: build an element from an HTML string. */
const h = (html: string): HTMLElement => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild as HTMLElement;
};

const T = (n: string) =>
  `font-family:var(--type-${n}-family);font-weight:var(--type-${n}-weight);font-size:var(--type-${n}-size);line-height:var(--type-${n}-line);letter-spacing:var(--type-${n}-tracking);text-transform:var(--type-${n}-case)`;

/* ------------------------------------------------------------------ Button */

injectStyle('css-c-button', `
.c-btn {
  width: 240px; height: 72px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  padding: 20px 32px; box-sizing: border-box; border: 1px solid transparent;
  ${T('body-l')}; color: var(--tv-base-light); white-space: nowrap;
}
.c-btn > svg { flex: none; }
.c-btn--primary   { background: var(--tv-base-light); color: var(--tv-base-dark); }
.c-btn--secondary { background: var(--tv-button-secondary); border-color: var(--tv-border-white-20); }
.c-btn--ghost     { background: none; }
.c-btn--outline   { background: none; border-color: var(--tv-base-light); }
.c-btn.is-focus   { background: var(--gradient-tv-button-primary); border-color: var(--tv-button-primary-solid); color: var(--tv-base-light); }
.c-btn.is-disabled { opacity: .4; }
`);

const button = (type: string, state?: 'focus' | 'disabled', text = 'Play Now', ico = 'Play') =>
  h(`<div class="c-btn c-btn--${type}${state ? ` is-${state}` : ''}">
       ${icon(ico)}<span>${text}</span>
     </div>`);

export const Button: ComponentModule = {
  id: 'c-button', title: 'Button', group: 'Controls', figma: '276:2415',
  description: '240 × 72, radius 12. Four types and three states; the icon and the label are each optional.',
  tokens: {
    colour: ['TV/Base/Dark', 'TV/Base/Light', 'TV/Border/White 20', 'TV/Button/Primary', 'TV/Button/Primary Solid', 'TV/Button/Secondary'],
    type: ['Body/L'],
  },
  variants: [
    { label: 'Primary · Default', el: () => button('primary') },
    { label: 'Primary · Focus', el: () => button('primary', 'focus') },
    { label: 'Primary · Disabled', el: () => button('primary', 'disabled') },
    { label: 'Secondary · Default', el: () => button('secondary', undefined, 'Episodes', 'List') },
    { label: 'Secondary · Focus', el: () => button('secondary', 'focus', 'Episodes', 'List') },
    { label: 'Ghost · Default', el: () => button('ghost', undefined, 'Home', 'Home') },
    { label: 'Ghost · Focus', el: () => button('ghost', 'focus', 'Home', 'Home') },
    { label: 'Outline · Default', el: () => button('outline', undefined, 'Log Out', 'Logout') },
    { label: 'Outline · Focus', el: () => button('outline', 'focus', 'Log Out', 'Logout') },
  ],
  notes: [
    'Every <strong>Focus</strong> variant is the same in the file whatever the type: the <code>TV/Button/Primary</code> gradient with a 1px <code>Primary Solid</code> edge. Type only decides how it rests.',
    'Six variants in Figma carry padding <code>20px 335px</code> on a 240-wide box, which cannot be right — a leftover from a wider frame. The <code>20px 32px</code> from the Focus and Secondary variants is used here. <strong>Worth fixing in the file.</strong>',
    'The <strong>Disabled</strong> variants read identical to Default in the file — same fills, same border, same text colour. The 40% dim here is this rebuild\'s guess, not a measurement. <strong>Needs a decision.</strong>',
    'The icons are the real set, exported from the <code>Icon</code> component.',
  ],
};

/* --------------------------------------------------------------------- Tag */

injectStyle('css-c-tag', `
.c-tag { display: inline-flex; align-items: center; gap: 6px; border-radius: 4px;
  padding: 4px 8px; box-sizing: border-box; ${T('label-s')};
  color: var(--tv-base-light); background: var(--tv-base-dark); }
.c-tag > svg { flex: none; }
.c-tag--new   { background: var(--tv-tags-primary); }
.c-tag--prime { background: var(--tv-game-ui-yellow); color: var(--tv-base-dark); }
.c-tag--info  { background: none; border: 2px solid var(--tv-game-ui-green-1);
  color: var(--tv-game-ui-green-1); padding: 8px 16px; ${T('body-m')}; }
`);

export const Tag: ComponentModule = {
  id: 'c-tag', title: 'Tag', group: 'Content', figma: '1021:8565',
  description: 'Label laid over an asset. Six types; most are 24 high with 4px corners and Label/S.',
  tokens: {
    colour: ['TV/Base/Dark', 'TV/Base/Light', 'TV/Game UI/Green 1', 'TV/Game UI/Yellow', 'TV/Tags/Primary'],
    type: ['Body/M', 'Label/S'],
  },
  variants: [
    { label: 'Interactive', el: () => h(`<span class="c-tag">${icon('Gamepad', 16)}Interactive</span>`) },
    { label: 'New', el: () => h(`<span class="c-tag c-tag--new">NEW</span>`) },
    { label: 'Played', el: () => h(`<span class="c-tag">${icon('Check', 16)}PLAYED</span>`) },
    { label: 'Prime Time', el: () => h(`<span class="c-tag c-tag--prime">${icon('Crown', 16)}PRIME TIME</span>`) },
    { label: 'Info', el: () => h(`<span class="c-tag c-tag--info">Guest</span>`) },
  ],
  notes: [
    '<strong>Game Type</strong> is the sixth type and is not here: in the file it is an empty wrapper around the separate <code>Game Type Tag</code> component, so it has no appearance of its own.',
    '<code>Interactive</code> uses a Material icon ligature in the file (<code>gamepad</code>, 16px) rather than the icon component; the set\'s own <code>Gamepad</code> is used here.',
  ],
};

/* ------------------------------------------------------------------ Toggle */

injectStyle('css-c-toggle', `
.c-toggle { width: 280px; height: 72px; border-radius: 12px; box-sizing: border-box;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 19px 16px; background: var(--tv-button-secondary);
  border: 1px solid var(--tv-border-white-20); ${T('body-l')}; color: var(--tv-base-light);
  white-space: nowrap; cursor: default; }
.c-toggle.is-focus { border: var(--tv-focus-ring-width) solid var(--tv-focus-ring-color); }
.c-toggle__track { width: 70px; height: 35px; border-radius: 8px; flex: none; box-sizing: border-box;
  border: 2px solid var(--tv-base-light); display: flex; align-items: center; padding: 2px; }
.c-toggle__knob { width: 36px; height: 100%; border-radius: 5px; background: var(--tv-base-light);
  transition: transform .18s cubic-bezier(.3,.9,.3,1); transform: translateX(0); }
.c-toggle--on .c-toggle__knob { transform: translateX(26px); }
.c-toggle--live { cursor: pointer; }
/* Off is dimmed, not just moved: the track and knob drop back so the state
   reads at three metres without having to find the knob. */
.c-toggle--off .c-toggle__track { opacity: .5; }
.c-toggle__track { transition: opacity .18s ease; }
`);

const toggle = (on: boolean, focus = false) =>
  h(`<div class="c-toggle c-toggle--${on ? 'on' : 'off'}${focus ? ' is-focus' : ''}">
       <span>PlayAlong ${on ? 'ON' : 'OFF'}</span>
       <span class="c-toggle__track"><span class="c-toggle__knob"></span></span>
     </div>`);

/** The one you can click. The knob slides; the label follows the state. */
const liveToggle = (): HTMLElement => {
  const el = toggle(false);
  el.classList.add('c-toggle--live');
  el.setAttribute('role', 'switch');
  el.setAttribute('aria-checked', 'false');
  el.tabIndex = 0;
  const flip = () => {
    const on = el.classList.toggle('c-toggle--on');
    el.classList.toggle('c-toggle--off', !on);
    el.setAttribute('aria-checked', String(on));
    el.querySelector('span')!.textContent = `PlayAlong ${on ? 'ON' : 'OFF'}`;
  };
  el.addEventListener('click', flip);
  el.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') { e.preventDefault(); flip(); }
  });
  return el;
};

export const Toggle: ComponentModule = {
  id: 'c-toggle', title: 'Toggle', group: 'Controls', figma: '701:11494',
  description: '280 × 72. Label on the left, a 70 × 35 track on the right whose 40-wide knob sits at one end.',
  tokens: {
    colour: ['TV/Base/Light', 'TV/Border/White 20', 'TV/Button/Primary Solid', 'TV/Button/Secondary'],
    type: ['Body/L'],
  },
  variants: [
    { label: 'Off', el: () => toggle(false) },
    { label: 'On', el: () => toggle(true) },
    { label: 'Focus', el: () => toggle(true, true) },
    { label: '▶ Live — click or press Enter', el: liveToggle },
  ],
  notes: [
    'Focus is a <strong>6px</strong> <code>Primary Solid</code> edge here, which is the focus-ring token — so the border grows 5px inward and the content shifts. In the file it is drawn the same way.',
  ],
};

/* --------------------------------------------------------------- Tabs Item */

injectStyle('css-c-tabsitem', `
.c-tab { height: 56px; box-sizing: border-box; display: inline-flex; align-items: center;
  justify-content: center; padding: 12px 24px; border-radius: 12px;
  border: 1px solid transparent; font-family: var(--type-heading-m-family);
  font-size: 24px; line-height: 32px; color: var(--tv-text-primary); }
.c-tab.is-selected { border-radius: 8px; background: var(--tv-button-secondary);
  border-color: var(--tv-border-white-20); color: var(--tv-base-light); }
.c-tab.is-focus { border-radius: 8px; background: var(--gradient-tv-button-primary);
  border-color: var(--tv-button-primary-solid); color: var(--tv-base-light); }
`);

export const TabsItem: ComponentModule = {
  id: 'c-tabs-item', title: 'Tabs Item', group: 'Navigation', figma: '1209:8405',
  description: 'One tab, 56 high. Rests at radius 12 and no surface; selected and focused both drop to radius 8 and take a fill.',
  tokens: {
    colour: ['TV/Base/Light', 'TV/Border/White 20', 'TV/Button/Primary', 'TV/Button/Primary Solid', 'TV/Button/Secondary', 'TV/Text/Primary'],
    type: [],
  },
  variants: [
    { label: 'Default', el: () => h(`<span class="c-tab">Season 3</span>`) },
    { label: 'Selected', el: () => h(`<span class="c-tab is-selected">Season 4</span>`) },
    { label: 'Focus', el: () => h(`<span class="c-tab is-focus">Season 4</span>`) },
    { label: '▶ Live — click a season', el: () => {
      const row = h(`<div style="display:flex;gap:8px">
        <span class="c-tab is-selected">Season 4</span>
        <span class="c-tab">Season 3</span>
        <span class="c-tab">Season 2</span></div>`);
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
    'The label is <strong>not bound to a text style</strong> in the file — it is a loose Rubik 24/32. Every other control here binds one.',
    'Default rests at radius 12 while Selected and Focus are radius 8, so the corner moves when you select. Probably unintended.',
  ],
};

/* ---------------------------------------------------------------- Checkbox */

injectStyle('css-c-checkbox', `
.c-check { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 50%; }
.c-check.is-focusring { background: var(--web-transparent-white-25); }
.c-check__box { width: 24px; height: 24px; border-radius: 4px; box-sizing: border-box;
  border: 2px solid var(--tv-base-light); display: grid; place-items: center; }
.c-check.is-selected .c-check__box { background: var(--tv-button-primary-solid);
  border-color: var(--tv-button-primary-solid); }
.c-check__tick { width: 14px; height: 8px; border-left: 2.5px solid var(--tv-base-light);
  border-bottom: 2.5px solid var(--tv-base-light); transform: rotate(-45deg) translate(1px, -2px); }
`);

const check = (selected: boolean, focus: boolean) =>
  h(`<span class="c-check${focus ? ' is-focusring' : ''}${selected ? ' is-selected' : ''}">
       <span class="c-check__box">${selected ? '<span class="c-check__tick"></span>' : ''}</span>
     </span>`);

const liveCheck = (): HTMLElement => {
  const el = check(false, false);
  el.style.cursor = 'pointer';
  el.tabIndex = 0;
  el.setAttribute('role', 'checkbox');
  const flip = () => {
    const on = el.classList.toggle('is-selected');
    el.setAttribute('aria-checked', String(on));
    el.querySelector('.c-check__box')!.innerHTML = on ? '<span class="c-check__tick"></span>' : '';
  };
  el.addEventListener('click', flip);
  el.addEventListener('focus', () => el.classList.add('is-focusring'));
  el.addEventListener('blur', () => el.classList.remove('is-focusring'));
  el.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') { e.preventDefault(); flip(); }
  });
  return el;
};

export const Checkbox: ComponentModule = {
  id: 'c-checkbox', title: 'Checkbox', group: 'Controls', figma: '10432:15304',
  description: '24 × 24 box in a 32 frame. Focus is a 44 circle behind it — which is exactly the ten-foot focus-target floor.',
  tokens: { colour: ['TV/Base/Light', 'TV/Button/Primary Solid', 'Web/Transparent/White 25'], type: [] },
  variants: [
    { label: 'Default', el: () => check(false, false) },
    { label: 'Selected', el: () => check(true, false) },
    { label: 'Focus', el: () => check(false, true) },
    { label: 'Focus Selected', el: () => check(true, true) },
    { label: '▶ Live — click or tab to it', el: liveCheck },
  ],
  notes: [
    'The focus halo binds <code>Web/Transparent/White 25</code> — a <strong>web</strong> token on a TV control. Either the control is web, or the binding is wrong.',
    'Its border is <code>2.4px</code> in the file, a scaling leftover; drawn at 2 here.',
  ],
};

/* -------------------------------------------------------------------- Dots */

injectStyle('css-c-dots', `
.c-dots { display: inline-flex; align-items: center; gap: 22px; height: 24px; }
.c-dots__d { border-radius: 50%; background: var(--tv-base-light); }
.c-dots__d--on  { width: 24px; height: 24px; }
.c-dots__d--off { width: 14px; height: 14px; opacity: .4; }
`);

export const Dots: ComponentModule = {
  id: 'c-dots', title: 'Dots', group: 'Navigation', figma: '596:2669',
  description: 'Rail pagination, 96 × 24. The current page is a 24 dot, the rest are 14, spaced 22 apart.',
  tokens: { colour: ['TV/Base/Light'], type: [] },
  variants: [
    { label: 'Three pages, first active', el: () => h(
      `<span class="c-dots"><span class="c-dots__d c-dots__d--on"></span>
        <span class="c-dots__d c-dots__d--off"></span>
        <span class="c-dots__d c-dots__d--off"></span></span>`) },
  ],
  notes: [
    'All three dots are <code>TV/Base/Light</code> in the file with no opacity recorded on the inactive ones; the 40% here is a rebuild choice so the active dot reads. <strong>Needs confirming.</strong>',
  ],
};


/* ------------------------------------------------------------------- Icons */

injectStyle('css-c-iconset', `
.c-iconset { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
  gap: 14px; width: 100%; }
.c-iconset__cell { position: relative; display: flex; flex-direction: column; align-items: center;
  gap: 8px; padding: 14px 6px; border-radius: 8px; border: 1px solid var(--tv-border-white-20);
  color: var(--tv-base-light); cursor: pointer; background: none;
  font: inherit; transition: border-color .12s ease, background .12s ease; }
.c-iconset__cell:hover { border-color: var(--tv-button-primary-solid);
  background: var(--tv-button-secondary); }
.c-iconset__cell:focus-visible { outline: var(--tv-focus-ring-width) solid var(--tv-focus-ring-color);
  outline-offset: 2px; }
.c-iconset__cell.is-copied { border-color: var(--tv-game-ui-green-1); }
.c-iconset__hint { position: absolute; inset: auto 0 3px; font-size: 8px; opacity: 0;
  color: var(--tv-text-primary); transition: opacity .12s ease; }
.c-iconset__cell:hover .c-iconset__hint { opacity: .7; }
.c-iconset__cell.is-copied .c-iconset__hint { opacity: 1; color: var(--tv-game-ui-green-1); }
.c-iconset__name { font-family: var(--mono, monospace); font-size: 10px;
  color: var(--tv-text-primary); text-align: center; word-break: break-word; }
`);

export const IconSet: ComponentModule = {
  id: 'c-icons', title: 'Icons', group: 'Content', figma: '629:1861',
  description: `The product icon set — ${ICON_NAMES.length} of the 55 in Figma, exported as SVG and drawn in currentColor, so an icon takes the colour of whatever it sits in.`,
  tokens: { colour: ['TV/Base/Light'], type: [] },
  wide: true,
  variants: [
    { label: `${ICON_NAMES.length} icons at 32 — click to download the .svg, shift-click to copy the markup`, el: () => {
      const grid = h('<div class="c-iconset"></div>');
      for (const name of ICON_NAMES) {
        const cell = h(
          `<button type="button" class="c-iconset__cell" title="Download ${name}.svg — hold shift to copy the markup instead">
             ${icon(name)}<span class="c-iconset__name">${name}</span>
             <span class="c-iconset__hint">download · shift to copy</span>
           </button>`) as HTMLButtonElement;
        cell.addEventListener('click', async (ev) => {
          // A standalone file: xmlns, a viewBox and currentColor rather than a
          // baked fill, so it drops into anything and takes the colour of
          // wherever it lands.
          const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" `
            + `viewBox="0 0 32 32" fill="none">${ICONS[name]}</svg>`;
          const hint = cell.querySelector('.c-iconset__hint')!;
          let said: string;

          if ((ev as MouseEvent).shiftKey) {
            // Shift copies the markup. Pasting SVG source as TEXT is what makes
            // Figma build vectors from it, so this is the route back into the
            // file -- not a worse version of the download.
            try { await navigator.clipboard.writeText(svg); said = 'copied'; }
            catch { said = 'copy failed'; }
          } else {
            // A real file. The clipboard cannot carry one: ClipboardItem only
            // accepts sanitised types and image/svg+xml is not among them, so a
            // download is the honest way to hand over a file.
            const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
            const a = document.createElement('a');
            a.href = url;
            a.download = `${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.svg`;
            a.click();
            URL.revokeObjectURL(url);
            said = 'downloaded';
          }

          // Only the hint changes -- the icon and its name stay put.
          cell.classList.add('is-copied');
          hint.textContent = said;
          setTimeout(() => {
            cell.classList.remove('is-copied');
            hint.textContent = 'download · shift to copy';
          }, 1400);
        });
        grid.appendChild(cell);
      }
      return grid;
    } },
  ],
  notes: [
    'Three of the 55 are not here. <code>Avatar with Frame</code> and <code>Stacked-Avatar-StackStage2</code> are bare rectangles in the file — placeholders rather than icons — and <code>Processing</code> is a conic gradient, which belongs in CSS rather than in a path. Left out rather than faked.',
    'Each is drawn in <code>currentColor</code>, so it takes the colour of whatever it sits in, and carries a <code>viewBox</code> rather than a fixed size.',
    'Click downloads a real <code>.svg</code>; <strong>shift-click copies the markup</strong>. A browser cannot put a file on the clipboard — <code>ClipboardItem</code> only accepts sanitised types and <code>image/svg+xml</code> is not one — and pasting the markup as text is what makes Figma rebuild it as vectors anyway.',
  ],
};
