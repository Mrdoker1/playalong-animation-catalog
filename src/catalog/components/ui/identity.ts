import { injectStyle } from '../../../lib/injectStyle';
import type { ComponentModule } from '../types';

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
.c-mi__icon { width: 40px; height: 40px; flex: none; border-radius: 10px;
  background: var(--tv-base-light); opacity: .85; }
.c-mi.is-focus { border-radius: 12px; background: var(--gradient-tv-button-primary);
  border-color: var(--tv-button-primary-solid); }
.c-mi.is-selected .c-mi__icon { opacity: 1; }

/* Game Type Tag */
.c-gtt { height: 42px; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 16px; border-radius: 8px; background: var(--tv-button-secondary);
  border: 1px solid var(--tv-border-white-20); ${T('label-m')}; color: var(--tv-base-light); }
.c-gtt__icon { width: 24px; height: 24px; flex: none; border-radius: 5px; background: currentColor; }

/* Avatar Picture */
.c-av { width: 140px; height: 140px; border-radius: 50%; box-sizing: border-box; position: relative;
  border: 4px solid var(--tv-button-secondary); display: grid; place-items: center; overflow: visible; }
.c-av--guest { background: var(--tv-border-white-20); border-color: var(--tv-border-white-20); }
.c-av__img { width: 100%; height: 100%; border-radius: 50%;
  background: linear-gradient(160deg, #3a4a6b, #16203a); }
.c-av__silhouette { width: 111px; height: 111px; border-radius: 50%; background: #000; opacity: .55;
  clip-path: circle(50%); }
.c-av__edit { position: absolute; right: -4px; bottom: -4px; width: 48px; height: 48px;
  border-radius: 12px; background: var(--tv-base-neutral);
  border: 1px solid var(--tv-border-white-20); display: grid; place-items: center; }
.c-av__edit::after { content: ''; width: 18px; height: 18px; border-radius: 3px;
  background: var(--tv-base-light); opacity: .85; }

/* User Avatar */
.c-ua { width: 518px; display: flex; align-items: center; gap: 32px; }
.c-ua__name { ${T('heading-l')}; color: var(--tv-base-light); margin: 0 0 16px; }
.c-ua__row { display: flex; align-items: center; gap: 8px; height: 32px;
  ${T('body-l')}; color: var(--tv-text-primary); }
.c-ua__dot { width: 24px; height: 24px; border-radius: 6px; background: var(--tv-text-primary); opacity: .5; }

/* AVATAR Label pill */
.c-alabel { height: 28px; box-sizing: border-box; display: inline-flex; align-items: center;
  padding: 4px 10px; border-radius: 50px; border: 4px solid #1E1E1E;
  background: var(--gradient-tv-game-ui-gold); ${T('label-m')}; color: #000; }

/* Unlocked counter */
.c-unlocked { display: flex; align-items: center; gap: 16px; height: 70px; }
.c-unlocked__badge { width: 44px; height: 44px; flex: none; border-radius: 8px;
  background: var(--gradient-tv-game-ui-gold); }
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
.c-msg__icon { width: 32px; height: 32px; flex: none; border-radius: 50%; }
.c-msg--alert .c-msg__icon { background: var(--tv-game-ui-red-1); }
.c-msg--warn  .c-msg__icon { background: var(--tv-game-ui-yellow); }
.c-msg--info  .c-msg__icon { background: var(--tv-base-light); opacity: .8; }

/* Strike Box */
.c-strike { width: 36px; height: 36px; border-radius: 10px; box-sizing: border-box; position: relative; }
.c-strike::before, .c-strike::after { content: ''; position: absolute; inset: 9px auto auto 4px;
  width: 28px; height: 4px; border-radius: 2px; background: var(--tv-game-ui-red-1); top: 16px; }
.c-strike::before { transform: rotate(45deg); }
.c-strike::after  { transform: rotate(-45deg); }

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
              var(--gradient-tv-game-ui-gold) border-box;
  display: grid; place-items: center; }
.c-rti__q { font-family: var(--type-display-m-family); font-size: 48px; line-height: 1;
  font-weight: 700; background: var(--gradient-tv-game-ui-gold);
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
    { label: 'Default', el: () => h(`<div class="c-mi"><span class="c-mi__icon"></span><span>Home</span></div>`) },
    { label: 'Selected', el: () => h(`<div class="c-mi is-selected"><span class="c-mi__icon"></span><span>Home</span></div>`) },
    { label: 'Focus', el: () => h(`<div class="c-mi is-focus"><span class="c-mi__icon"></span><span>Home</span></div>`) },
  ],
};

export const GameTypeTag: ComponentModule = {
  id: 'c-game-type-tag', title: 'Game Type Tag', group: 'Content', figma: '1020:8114',
  description: '42 high, radius 8, on the secondary surface with a 20% white edge. Icon 24, label in Label/M.',
  tokens: { colour: ['TV/Base/Light', 'TV/Border/White 20', 'TV/Button/Secondary'], type: ['Label/M'] },
  variants: [
    { label: 'Multiple Choice', el: () => h(`<span class="c-gtt"><span class="c-gtt__icon"></span>Multiple Choice (A-D)</span>`) },
    { label: 'Voice', el: () => h(`<span class="c-gtt"><span class="c-gtt__icon"></span>Voice</span>`) },
    { label: 'Free Text', el: () => h(`<span class="c-gtt"><span class="c-gtt__icon"></span>Free Text</span>`) },
  ],
};

export const AvatarPicture: ComponentModule = {
  id: 'c-avatar-picture', title: 'Avatar Picture', group: 'Identity', figma: '8717:11254',
  description: '140 round with a 4px edge, and an optional 48 edit button. The part inside User Avatar, not placed on its own.',
  tokens: { colour: ['TV/Base/Light', 'TV/Base/Neutral', 'TV/Border/White 20', 'TV/Button/Secondary'], type: [] },
  variants: [
    { label: 'Logged in', el: () => h(`<div class="c-av"><div class="c-av__img"></div></div>`) },
    { label: 'Logged in · edit', el: () => h(`<div class="c-av"><div class="c-av__img"></div><span class="c-av__edit"></span></div>`) },
    { label: 'Guest', el: () => h(`<div class="c-av c-av--guest"><div class="c-av__silhouette"></div></div>`) },
  ],
};

export const UserAvatar: ComponentModule = {
  id: 'c-user-avatar', title: 'User Avatar', group: 'Identity', figma: '8408:16678',
  description: '518 × 140: the avatar, then the name in Heading/L over two metadata rows, 32 apart.',
  tokens: { colour: ['TV/Base/Light', 'TV/Base/Neutral', 'TV/Border/White 20', 'TV/Text/Primary'], type: ['Body/L', 'Heading/L'] },
  variants: [
    { label: 'New user', el: () => h(
      `<div class="c-ua"><div class="c-av c-av--guest"><div class="c-av__silhouette"></div></div>
        <div><p class="c-ua__name">New User</p>
          <div class="c-ua__row"><span class="c-ua__dot"></span>Guest</div>
          <div class="c-ua__row"><span class="c-ua__dot"></span>0 trophies</div></div></div>`) },
  ],
};

export const AvatarLabel: ComponentModule = {
  id: 'c-avatar-label', title: 'AVATAR Label', group: 'Identity', figma: '13502:18861',
  description: 'A 28-high gold pill with a 4px dark edge, fully rounded. Sits at the foot of a Reward Type Icon.',
  tokens: { colour: [], type: ['Label/M'] },
  variants: [
    { label: 'AVATAR', el: () => h(pill('AVATAR')) },
    { label: 'FRAME', el: () => h(pill('FRAME')) },
    { label: 'TITLE', el: () => h(pill('TITLE')) },
  ],
};

export const UnlockedCounter: ComponentModule = {
  id: 'c-unlocked-counter', title: 'Unlocked counter', group: 'Identity', figma: '13550:42728',
  description: '170 × 70. A 44 badge, then the count in Display/M over the caption in Label/M.',
  tokens: { colour: ['TV/Base/Light', 'TV/Text/Primary'], type: ['Display/M', 'Label/M'] },
  variants: [
    { label: '7 of 24', el: () => h(
      `<div class="c-unlocked"><span class="c-unlocked__badge"></span>
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
  ],
};

export const InputMessages: ComponentModule = {
  id: 'c-input-messages', title: 'Input messages', group: 'Feedback', figma: '7909:8736',
  description: 'The line under a field: a 32 icon and Body/M, 12 apart. The three types differ only by the icon.',
  tokens: { colour: ['TV/Base/Light', 'TV/Game UI/Red 1', 'TV/Game UI/Yellow'], type: ['Body/M'] },
  variants: [
    { label: 'Alert', el: () => h(`<span class="c-msg c-msg--alert"><span class="c-msg__icon"></span>Message text</span>`) },
    { label: 'Warn', el: () => h(`<span class="c-msg c-msg--warn"><span class="c-msg__icon"></span>Message text</span>`) },
    { label: 'Info', el: () => h(`<span class="c-msg c-msg--info"><span class="c-msg__icon"></span>Message text</span>`) },
  ],
};

export const StrikeBox: ComponentModule = {
  id: 'c-strike-box', title: 'Strike Box', group: 'Game', figma: '4689:5985',
  description: 'A 36 × 36 cross in Game UI/Red 1. Family Feud — one per wrong answer.',
  tokens: { colour: ['TV/Game UI/Red 1'], type: [] },
  variants: [{ label: 'Strike', el: () => h(`<span class="c-strike"></span>`) }],
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
  description: '144 frame: a 130 ring with a 6px gold edge, a gold glyph, and the category pill across its foot.',
  tokens: { colour: [], type: ['Label/M'] },
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
