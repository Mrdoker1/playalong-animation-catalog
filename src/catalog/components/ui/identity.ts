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

injectStyle('css-c-identity', `
/* Menu Item */
.c-mi { width: 178px; height: 64px; box-sizing: border-box; display: flex; align-items: center;
  gap: 8px; padding: 12px 32px; border-radius: 80px; border: 1px solid transparent;
  ${T('body-l')}; color: var(--tv-base-light); }
.c-mi > svg { flex: none; opacity: .85; }
.c-mi.is-selected > svg, .c-mi.is-focus > svg { opacity: 1; }
.c-mi.is-focus { border-radius: 12px; background: var(--gradient-tv-button-primary);
  border-color: var(--tv-button-primary-solid); }


/* Game Type Tag */
.c-gtt { height: 42px; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 16px; border-radius: 8px; background: var(--tv-button-secondary);
  border: 1px solid var(--tv-border-white-20); ${T('label-m')}; color: var(--tv-base-light);
  white-space: nowrap; }
.c-gtt--prime { background: var(--tv-game-ui-yellow); border-color: transparent;
  color: var(--tv-base-dark); }
.c-gtt > svg { flex: none; }

/* Avatar Picture — 140 round. Both states take a 4px white-at-20% edge that
   sits OUTSIDE the box, so content-box rather than border-box. Guest fills the
   circle with the same 20% white and lays a black silhouette over it; logged in
   carries the picture. */
.c-av { width: 140px; height: 140px; border-radius: 50%; box-sizing: content-box;
  position: relative; display: grid; place-items: center; overflow: visible;
  border: 4px solid var(--tv-border-white-20); }
.c-av--guest { background: var(--tv-border-white-20); }
.c-av--photo { background: var(--tv-base-dark) center/cover no-repeat; }
.c-av__mask { width: 140px; height: 140px; border-radius: 50%; overflow: hidden;
  display: grid; place-items: end center; }
.c-av__sil { width: 111px; height: 111px; display: block; color: #000; }
.c-av__photo { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }
.c-av__edit { position: absolute; right: -8px; bottom: -4px; width: 48px; height: 48px;
  border-radius: 12px; box-sizing: border-box; display: grid; place-items: center;
  background: var(--tv-base-neutral); border: 1px solid var(--tv-border-white-20);
  color: var(--tv-base-light); }

/* User Avatar — the picture, then the name over two metadata rows */
.c-ua { width: 518px; display: flex; align-items: center; gap: 32px; }
.c-ua__name { ${T('heading-l')}; color: var(--tv-base-light); margin: 0 0 16px; }
.c-ua__row { display: flex; align-items: center; gap: 8px; height: 32px;
  ${T('body-l')}; color: var(--tv-text-primary); white-space: nowrap; }
.c-ua__row + .c-ua__row { margin-top: 16px; }
.c-ua__row > svg { flex: none; }

/* AVATAR Label pill.
   The 4px edge is OUTSIDE in Figma, so it adds to the box rather than eating
   into it: content-box, not border-box. With border-box the pill came out 8px
   narrower and 8px shorter and the text looked cramped. */
.c-alabel { box-sizing: content-box; display: inline-flex; align-items: center;
  justify-content: center; padding: 4px 10px; border-radius: 50px;
  border: 4px solid #1E1E1E; background: var(--gradient-tv-placeholder-light);
  ${T('label-m')}; color: #000; }

/* Unlocked counter */
.c-unlocked { display: flex; align-items: center; gap: 16px; height: 70px; }
.c-unlocked__badge { width: 44px; height: 44px; flex: none; display: block;
  object-fit: contain; }
.c-unlocked__n { ${T('display-m')}; color: var(--tv-base-light); }
.c-unlocked__cap { ${T('label-m')}; color: var(--tv-text-primary); }

/* Selection Radio Button */
.c-radio { width: 64px; height: 64px; display: grid; place-items: center; }
.c-radio__ring { width: 55px; height: 55px; border-radius: 50%; box-sizing: border-box;
  border: 4px solid var(--tv-border-white-20); }
.c-radio__on { width: 64px; height: 64px; border-radius: 50%;
  background: var(--tv-button-primary-solid); display: grid; place-items: center; }
.c-radio__tick { width: 22px; height: 12px; border-left: 4px solid var(--tv-base-light);
  border-bottom: 4px solid var(--tv-base-light); transform: rotate(-45deg) translate(2px, -3px); }

/* Input messages */
.c-msg { display: inline-flex; align-items: center; gap: 12px; height: 32px;
  ${T('body-m')}; color: var(--tv-base-light); }
.c-msg > svg { flex: none; }
.c-msg--alert > svg { color: var(--tv-game-ui-red-1); }
.c-msg--warn  > svg { color: var(--tv-game-ui-yellow); }
.c-msg--info  > svg { color: var(--tv-base-light); }

/* Strike Box — a rounded square whose 4px edge sits OUTSIDE the 36, with a
   round-capped X inside it. */
.c-strike { width: 36px; height: 36px; border-radius: 10px; box-sizing: content-box;
  border: 4px solid var(--tv-game-ui-red-1); display: grid; place-items: center; }
.c-strike--spent { opacity: .35; }
.c-strike svg { display: block; color: var(--tv-game-ui-red-1); }

/* Attempt */
.c-attempt { width: 168px; height: 71px; box-sizing: border-box; display: flex; align-items: center;
  padding: 24px 0; ${T('game-s')}; }
.c-attempt--right { color: var(--tv-text-success); }
.c-attempt--wrong { color: var(--tv-game-ui-red-2); text-decoration: line-through; }

/* Reward Type Icon */
.c-rti { width: 144px; height: 144px; position: relative; display: grid; place-items: center; }
.c-rti__ring { width: 130px; height: 130px; border-radius: 50%; box-sizing: border-box;
  border: 6px solid transparent;
  background: linear-gradient(var(--tv-base-dark), var(--tv-base-dark)) padding-box,
              var(--gradient-tv-placeholder-grey) border-box;
  display: grid; place-items: center; }
.c-rti__q { font-family: var(--type-display-m-family); font-size: 48px; line-height: 1;
  font-weight: 700; background: var(--gradient-tv-placeholder-light);
  -webkit-background-clip: text; background-clip: text; color: transparent; }
.c-rti__pill { position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%); }

/* Player Thumbnail */
.c-pthumb { width: 360px; height: 203px; border-radius: 8px; box-sizing: border-box;
  border: 6px solid var(--tv-base-light);
  background: linear-gradient(135deg, #243457, #0b1020); }
`);

const pill = (text: string) => `<span class="c-alabel">${text}</span>`;

export const MenuItem: ComponentModule = {
  id: 'c-menu-item', title: 'Menu Item', group: 'Navigation', figma: '772:6953',
  description: '178 × 64 with a 40 icon. Rests fully rounded at radius 80; focus squares it to 12 and takes the primary gradient.',
  tokens: { colour: ['TV/Base/Light', 'TV/Button/Primary', 'TV/Button/Primary Solid'], type: ['Body/L'] },
  variants: [
    { label: 'Default', el: () => h(`<div class="c-mi">${icon('Home', 40)}<span>Home</span></div>`) },
    { label: 'Selected', el: () => h(`<div class="c-mi is-selected">${icon('Home', 40)}<span>Home</span></div>`) },
    { label: 'Focus', el: () => h(`<div class="c-mi is-focus">${icon('Home', 40)}<span>Home</span></div>`) },
  ],
};

const GAME_TYPES: { v: string; ico: string; tx: string; w: number; prime?: boolean }[] = [
  { v: 'Multiple',   ico: 'Check',   tx: 'Multiple Choice (A-D)', w: 273 },
  { v: 'Numeric',    ico: 'Pad',     tx: 'numeric input',         w: 205 },
  { v: 'Free Text',  ico: 'Text',    tx: 'Free Text Entry',       w: 222 },
  { v: 'UpDown',     ico: 'Up/Down', tx: 'up/down select',        w: 224 },
  { v: 'Voice',      ico: 'Mic',     tx: 'voice input',           w: 177 },
  { v: 'Time',       ico: 'Timer',   tx: 'time-limited',          w: 187 },
  { v: 'Prime Time', ico: 'Crown',   tx: 'PRIME TIME',            w: 167, prime: true },
];

export const GameTypeTag: ComponentModule = {
  id: 'c-game-type-tag', title: 'Game Type Tag', group: 'Content', figma: '5022:9521',
  description: 'How a show says what kind of answering it wants. 42 high, radius 8, a 24 icon and Label/M. Six sit on the secondary surface; Prime Time is the odd one out.',
  tokens: {
    colour: ['TV/Base/Dark', 'TV/Base/Light', 'TV/Border/White 20', 'TV/Button/Secondary', 'TV/Game UI/Yellow'],
    type: ['Label/M'],
  },
  variants: GAME_TYPES.map((g) => ({
    label: `${g.v} — ${g.w}`,
    el: () => h(`<span class="c-gtt${g.prime ? ' c-gtt--prime' : ''}">${icon(g.ico, 24)}${g.tx}</span>`),
  })),
  notes: [
    '<code>1020:8114</code> is the same component: the base <code>Game Type Tag</code> that <code>5022:9521</code> varies. One drawing, two nodes.',
    '<strong>Prime Time is not like the other six.</strong> It fills with <code>TV/Game UI/Yellow</code> and prints in <code>TV/Base/Dark</code> — the only one that inverts — and it is the only one whose label is set in capitals.',
    'The copy is inconsistent in the file and is reproduced as found: <em>Multiple Choice (A-D)</em> and <em>Free Text Entry</em> are capitalised, <em>numeric input</em>, <em>voice input</em>, <em>time-limited</em> and <em>up/down select</em> are not.',
    'Every variant\'s text layer is still named <code>Multiple Choice (A-D)</code> in Figma, whatever it says — they were duplicated and retyped.',
  ],
};

const SILHOUETTE = `M0.013317 108.755C0.017507 109.054 0.0805988 109.349 0.198989 109.624C0.31738 109.899 0.48875 110.148 0.703313 110.356C0.917875 110.565 1.17143 110.729 1.44949 110.84C1.72755 110.95 2.02468 111.005 2.32389 111.001H108.672C108.971 111.005 109.269 110.951 109.547 110.841C109.825 110.73 110.079 110.566 110.294 110.357C110.509 110.149 110.681 109.9 110.799 109.625C110.918 109.35 110.981 109.054 110.985 108.755V106.073C111.038 105.264 111.146 101.233 108.488 96.7722C106.811 93.9592 104.378 91.5318 101.255 89.5513C97.4782 87.156 92.673 85.4238 86.86 84.381C83.909 83.967 80.9819 83.3976 78.0909 82.6751C70.4026 80.7121 69.7308 78.9741 69.725 78.9565C69.6796 78.7852 69.6149 78.6196 69.5322 78.4629C69.4679 78.1416 69.3131 76.9206 69.611 73.6519C70.3647 65.3472 74.8193 60.4398 78.3977 56.4963C79.5252 55.2549 80.5914 54.0777 81.4122 52.9268C84.9555 47.9609 85.2827 42.3086 85.2973 41.9581C85.3106 41.337 85.2248 40.7178 85.0431 40.1237C84.6926 39.0429 84.0412 38.371 83.5621 37.8744C83.4489 37.7606 83.3388 37.6438 83.232 37.5239C83.197 37.483 83.1035 37.372 83.1882 36.8141C83.4747 35.0168 83.6726 33.2064 83.7812 31.3896C83.9448 28.4627 84.0704 24.0869 83.3138 19.8251C83.2031 19.011 83.0352 18.2057 82.8114 17.4152C82.0169 14.4805 80.7316 11.9781 78.9556 9.90799C78.6489 9.57207 71.2059 1.72896 49.5987 0.122365C46.6104 -0.0996375 43.6572 0.0201277 40.7478 0.169103C39.8874 0.188424 39.0311 0.294113 38.1919 0.484579C35.9602 1.06003 35.3643 2.47384 35.2094 3.26545C34.9495 4.57994 35.4052 5.59647 35.706 6.27416C35.7498 6.37056 35.8053 6.49033 35.709 6.8058C35.2094 7.58281 34.4178 8.28387 33.6145 8.94696C33.3808 9.14267 27.9652 13.8164 27.6672 19.9185C26.8639 24.5601 26.9223 31.7898 27.8717 36.7878C27.9301 37.0653 28.009 37.4743 27.8775 37.7518C26.8551 38.666 25.6984 39.703 25.7013 42.0691C25.713 42.3086 26.0431 47.958 29.5864 52.9268C30.4043 54.0777 31.4705 55.252 32.5951 56.4934L32.6009 56.4963C36.1792 60.4398 40.6339 65.3472 41.3875 73.6489C41.6826 76.9206 41.5277 78.1386 41.4664 78.4629C41.3826 78.6195 41.317 78.7851 41.2707 78.9565C41.2678 78.9741 40.5988 80.7063 32.9456 82.6663C28.5289 83.7968 24.1824 84.3752 24.0509 84.3898C18.4015 85.345 13.6256 87.0363 9.85445 89.4169C6.74349 91.3828 4.30439 93.819 2.61016 96.6525C-0.100605 101.18 -0.0275794 105.305 0.0103947 106.058L0.013317 108.755Z`;

const avatarPicture = (kind: 'photo' | 'guest', edit = false) => h(
  `<div class="c-av c-av--${kind}">
     <span class="c-av__mask">${kind === 'guest'
       ? `<svg class="c-av__sil" viewBox="0 0 111 111" fill="none" aria-hidden="true"><path d="${SILHOUETTE}" fill="currentColor"/></svg>`
       : `<img class="c-av__photo" src="${import.meta.env.BASE_URL}assets/components/avatar-sample.png" alt="" />`}</span>
     ${edit ? `<span class="c-av__edit">${icon('Edit', 32)}</span>` : ''}
   </div>`);

export const AvatarPicture: ComponentModule = {
  id: 'c-avatar-picture', title: 'Avatar Picture', group: 'Identity', figma: '8717:11254',
  description: '140 round. Guest is the circle at 20% white with a black 111 silhouette sitting on its foot; logged in carries the picture. The 4px edge is OUTSIDE the box in both. The edit button is a real Secondary Button — 48, radius 12, with the Edit icon.',
  tokens: { colour: ['TV/Base/Light', 'TV/Base/Neutral', 'TV/Border/White 20', 'TV/Button/Secondary'], type: [] },
  variants: [
    { label: 'Guest', el: () => avatarPicture('guest') },
    { label: 'Guest · edit', el: () => avatarPicture('guest', true) },
    { label: 'Logged in', el: () => avatarPicture('photo') },
    { label: 'Logged in · edit', el: () => avatarPicture('photo', true) },
  ],
  notes: [
    'The guest silhouette is a <strong>2311-character path</strong> exported from the file, not an icon stood in for it — head and shoulders, flush to the bottom of the circle.',
    'The picture is the file\'s own image fill, downloaded rather than approximated with a gradient.',
    'The 4px edge is <code>strokeAlign: OUTSIDE</code>, so it adds to the 140 rather than eating into it: 148 on screen.',
    'The edit button overhangs the circle, which is why the preview slot does not clip.',
  ],
};

export const UserAvatar: ComponentModule = {
  id: 'c-user-avatar', title: 'User Avatar', group: 'Identity', figma: '8408:16678',
  description: '518 × 140: an Avatar Picture, then the name in Heading/L over two metadata rows — member since, and the email address — each a 32 icon and Body/L, 8 apart.',
  tokens: { colour: ['TV/Base/Light', 'TV/Base/Neutral', 'TV/Border/White 20', 'TV/Text/Primary'], type: ['Body/L', 'Heading/L'] },
  variants: [
    { label: 'Guest', el: () => h(
      `<div class="c-ua">${avatarPicture('guest', true).outerHTML}
        <div><p class="c-ua__name">New User</p>
          <div class="c-ua__row">${icon('Info', 32)}Member since May 12, 2026</div>
          <div class="c-ua__row">${icon('Email', 32)}example@gmail.com</div></div></div>`) },
    { label: 'With a picture', el: () => h(
      `<div class="c-ua">${avatarPicture('photo', true).outerHTML}
        <div><p class="c-ua__name">Viachaslau</p>
          <div class="c-ua__row">${icon('Info', 32)}Member since May 12, 2026</div>
          <div class="c-ua__row">${icon('Email', 32)}example@gmail.com</div></div></div>`) },
  ],
  notes: [
    'The avatar is an <strong>instance of Avatar Picture</strong>, and the edit button inside it an instance of <code>Button [Secondary]</code> — this composes two other components rather than redrawing them.',
    'The two rows were built here as "Guest" and "0 trophies". That was invented: the file says <em>Member since</em> with the Info icon, and the email address with the Email icon.',
  ],
};

export const AvatarLabel: ComponentModule = {
  id: 'c-avatar-label', title: 'AVATAR Label', group: 'Identity', figma: '13502:18861',
  description: '89 × 28 for the word AVATAR, fully rounded, in Label/M on a white-to-grey vertical ramp. The 4px dark edge sits OUTSIDE the box, so the pill measures 97 × 36 on screen.',
  tokens: { colour: ['TV/Placeholder/Light'], type: ['Label/M'] },
  variants: [
    { label: 'AVATAR — 89 × 28', el: () => h(pill('AVATAR')) },
    { label: 'FRAME', el: () => h(pill('FRAME')) },
    { label: 'BADGE', el: () => h(pill('BADGE')) },
    { label: 'TITLE', el: () => h(pill('TITLE')) },
  ],
  notes: [
    'The edge is <code>#1E1E1E</code> — a raw value, not a token. Nothing in the palette carries it.',
    'The ramp is vertical: white at the top, <code>#999999</code> at the foot. In Figma that is a gradient transform rather than an angle, which is why it reads as horizontal if you only look at the stops.',
  ],
};

export const UnlockedCounter: ComponentModule = {
  id: 'c-unlocked-counter', title: 'Unlocked counter', group: 'Identity', figma: '13550:42728',
  description: '170 × 70. The gold star at 44, then the count in Display/M over UNLOCKED in Label/M, 16 apart.',
  tokens: { colour: ['TV/Base/Light', 'TV/Text/Primary'], type: ['Display/M', 'Label/M'] },
  notes: [
    'The badge is the file\'s own star image, downloaded rather than approximated — it was a grey rounded square here until 2026-10-13.',
  ],
  variants: [
    { label: '7 of 24', el: () => h(
      `<div class="c-unlocked"><img class="c-unlocked__badge" src="${import.meta.env.BASE_URL}assets/components/star.png" alt="" />
        <div><div class="c-unlocked__n">7/24</div><div class="c-unlocked__cap">Unlocked</div></div></div>`) },
  ],
};

export const SelectionRadio: ComponentModule = {
  id: 'c-selection-radio', title: 'Selection Radio Button', group: 'Controls', figma: '13305:21383',
  description: '64 frame. Unselected is a 55 ring with a 4px 20%-white edge; selected fills with Primary Solid and a tick.',
  tokens: { colour: ['TV/Base/Light', 'TV/Border/White 20', 'TV/Button/Primary Solid'], type: [] },
  variants: [
    { label: 'False', el: () => h(`<span class="c-radio"><span class="c-radio__ring"></span></span>`) },
    { label: 'True', el: () => h(`<span class="c-radio"><span class="c-radio__on"><span class="c-radio__tick"></span></span></span>`) },
    { label: '▶ Live — pick one', el: () => {
      const row = h('<div style="display:flex;gap:16px"></div>');
      const make = (on: boolean) => {
        const el = h(on
          ? `<span class="c-radio"><span class="c-radio__on"><span class="c-radio__tick"></span></span></span>`
          : `<span class="c-radio"><span class="c-radio__ring"></span></span>`);
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
          row.querySelectorAll<HTMLElement>('.c-radio').forEach((o) => {
            o.innerHTML = '<span class="c-radio__ring"></span>';
          });
          el.innerHTML = '<span class="c-radio__on"><span class="c-radio__tick"></span></span>';
        });
        return el;
      };
      row.append(make(true), make(false), make(false));
      return row;
    } },
  ],
};

export const InputMessages: ComponentModule = {
  id: 'c-input-messages', title: 'Input messages', group: 'Feedback', figma: '7909:8736',
  description: 'The line under a field: a 32 icon and Body/M, 12 apart. The three types differ only by the icon.',
  tokens: { colour: ['TV/Base/Light', 'TV/Game UI/Red 1', 'TV/Game UI/Yellow'], type: ['Body/M'] },
  variants: [
    { label: 'Alert', el: () => h(`<span class="c-msg c-msg--alert">${icon('Alert')}Message text</span>`) },
    { label: 'Warn', el: () => h(`<span class="c-msg c-msg--warn">${icon('Alert')}Message text</span>`) },
    { label: 'Info', el: () => h(`<span class="c-msg c-msg--info">${icon('Info')}Message text</span>`) },
  ],
};

export const StrikeBox: ComponentModule = {
  id: 'c-strike-box', title: 'Strike Box', group: 'Game', figma: '4689:5985',
  description: 'A 36 × 36 rounded square outlined in Game UI/Red 1 with a round-capped X inside. Family Feud — one per wrong answer.',
  tokens: { colour: ['TV/Game UI/Red 1'], type: [] },
  variants: [{ label: 'Strike', el: () => h(`<span class="c-strike"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span>`) }],
  notes: [
    'The 4px edge is <code>strokeAlign: OUTSIDE</code>, so the marker measures 44 on screen rather than 36.',
    'The X has <strong>round caps</strong> and is 17.7 across, centred — not a pair of square bars.',
  ],
};

export const Attempt: ComponentModule = {
  id: 'c-attempt', title: 'Attempt', group: 'Game', figma: '4709:5407',
  description: 'One guess, 168 × 71, in Game/S. Right reads in Text/Success, wrong in Game UI/Red 2.',
  tokens: { colour: ['TV/Game UI/Red 2', 'TV/Text/Success'], type: ['Game/S'] },
  variants: [
    { label: 'Right', el: () => h(`<div class="c-attempt c-attempt--right">sleep</div>`) },
    { label: 'Wrong', el: () => h(`<div class="c-attempt c-attempt--wrong">run</div>`) },
  ],
};

export const RewardTypeIcon: ComponentModule = {
  id: 'c-reward-type-icon', title: 'Reward Type Icon', group: 'Identity', figma: '13312:22296',
  description: '144 frame: a 130 ring with a 6px silver edge, a silver glyph, and the category pill across its foot.',
  tokens: { colour: ['TV/Placeholder/Grey', 'TV/Placeholder/Light'], type: ['Label/M'] },
  variants: (['FRAME', 'AVATAR', 'BADGE', 'TITLE'] as const).map((t) => ({
    label: t[0] + t.slice(1).toLowerCase(),
    el: () => h(`<div class="c-rti"><div class="c-rti__ring"><span class="c-rti__q">?</span></div>
      <span class="c-rti__pill">${pill(t)}</span></div>`),
  })),
};

export const PlayerThumbnail: ComponentModule = {
  id: 'c-player-thumbnail', title: 'Player Thumbnail', group: 'Content', figma: '2878:15039',
  description: '360 × 203, radius 8, with a 6px light edge. The scrub preview on the player.',
  tokens: { colour: ['TV/Base/Light', 'TV/Transparent/Dark 40'], type: [] },
  variants: [{ label: 'Thumbnail', el: () => h(`<div class="c-pthumb"></div>`) }],
};
