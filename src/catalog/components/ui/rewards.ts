/**
 * Rewards and progression: the reward tile, the avatar tile, and the three
 * pieces of a reward track.
 *
 * Read node by node on 2026-10-13. The badge art is the file's own sprite
 * sheet; where a particular piece of art is not in hand the note says so.
 *
 * Vocabulary is the hub glossary's: a reward is unlocked, then claimed, and a
 * reward a guest has earned but cannot use yet is pending. `Pending` is a state
 * of something already won, never a preview of something not yet reached.
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

/** The file's six badge arts on one 384 x 256 sheet, 128 to a cell. */
const BADGES = 'assets/components/badges.png';
const badge = (col: number, row: number, size: number) =>
  `<span class="c-badge" style="width:${size}px;height:${size}px;background-image:url(${BADGES});` +
  `background-size:${size * 3}px ${size * 2}px;background-position:-${col * size}px -${row * size}px"></span>`;

injectStyle('css-c-reward', `
.c-badge { display: block; background-repeat: no-repeat; }

.c-reward { width: 532px; height: 338px; box-sizing: border-box; border-radius: 24px;
  position: relative; display: flex; flex-direction: column; align-items: center;
  box-shadow: inset 0 0 0 1px var(--tv-border-white-20); }
.c-reward.is-focus { box-shadow: inset 0 0 0 4px var(--tv-button-primary-solid); }
.c-reward__art { height: 260px; display: grid; place-items: center; }
.c-reward__name { ${T('heading-m')}; color: var(--tv-base-light); text-align: center; }
.c-reward__logo { position: absolute; left: 0; top: 0; width: 124px; height: 124px;
  display: grid; place-items: center; }
.c-reward__logo img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; }
.c-reward.is-pending .c-reward__art { opacity: .3; }
.c-reward__gate { position: absolute; right: 24px; top: 24px; height: 42px; padding: 0 16px;
  display: inline-flex; align-items: center; border-radius: 4px;
  background: var(--tv-button-secondary); border: 1px solid var(--tv-border-white-20);
  ${T('label-s')}; text-transform: none; }

.c-avtile { border-radius: 50%; box-sizing: border-box; display: grid; place-items: center;
  overflow: hidden; background: var(--tv-border-white-20); }
.c-avtile img { width: 100%; height: 100%; object-fit: cover; }
.c-avtile--m { width: 200px; height: 200px; box-shadow: 0 0 0 1px var(--tv-button-secondary); }
.c-avtile--l { width: 300px; height: 300px; box-shadow: 0 0 0 9px var(--tv-border-white-20); }
.c-avtile.is-focus { box-shadow: 0 0 0 8px var(--tv-button-primary-solid); }
.c-avtile.is-selected { box-shadow: 0 0 0 8px var(--tv-button-primary-solid); }
.c-avtile-wrap { position: relative; display: inline-block; }
.c-avtile-wrap__tick { position: absolute; right: 2px; top: 2px; width: 54px; height: 54px;
  border-radius: 50%; background: var(--tv-base-light); display: grid; place-items: center;
  color: var(--tv-button-primary-solid); }
.c-avtile__silhouette { width: 80%; height: 80%; align-self: end; display: grid;
  place-items: end center; color: var(--tv-base-dark); overflow: hidden; }
.c-avtile__silhouette > svg { width: 100%; height: 100%; }

.c-track { width: 477px; height: 152px; position: relative; }
.c-track__rail { position: absolute; top: 74px; height: 8px; border-radius: 20px;
  background: var(--tv-progress-track); }
.c-track__fill { position: absolute; top: 74px; left: 0; height: 8px; border-radius: 20px;
  background: var(--tv-game-ui-yellow); }
.c-track__stop { position: absolute; top: 34px; display: flex; flex-direction: column;
  align-items: center; gap: 8px; }
.c-track__stop b { ${T('heading-s')}; font-weight: inherit; color: var(--tv-text-primary); }
.c-track__stop i { width: 24px; height: 24px; border-radius: 50%; background: var(--tv-base-light); }
.c-track__stop.is-reached i { background: var(--tv-game-ui-yellow); }
.c-track__medal { position: absolute; top: 0; width: 152px; height: 152px; border-radius: 50%;
  box-sizing: border-box; background: var(--tv-base-neutral);
  border: 4px solid var(--tv-progress-track); display: grid; place-items: center; }
.c-track__medal.is-reached { border-color: var(--tv-game-ui-yellow); }
`);

/* ------------------------------------------------------------------ Reward */

type RewardType = 'frame' | 'avatar' | 'pending' | 'title';

const reward = (type: RewardType, focus = false, name = 'Gold Wings') => {
  // Frame and Pending both show the Gold Wings frame; Title shows a badge.
  const art =
    type === 'title' ? badge(2, 0, 200)
    : `<img src="assets/components/frame-gold.png" alt="" width="200" height="200">`;
  return h(`<div class="c-reward${focus ? ' is-focus' : ''}${type === 'pending' ? ' is-pending' : ''}">
      <div class="c-reward__art">${art}</div>
      <span class="c-reward__name">${
        type === 'title' ? 'First Step' : type === 'avatar' ? 'Stack Stage 1' : name}</span>
      <span class="c-reward__logo"><img src="assets/components/show-thumb.jpg" alt=""></span>
      ${type === 'pending' ? '<span class="c-reward__gate">Sign IN</span>' : ''}
    </div>`);
};

export const Reward: ComponentModule = {
  id: 'c-reward', title: 'Reward', group: 'Identity', figma: '13301:20807',
  description: '532 × 338, radius 24 — the art, the reward\'s name under it, and the show it came from in the corner. Ten variants.',
  tokens: {
    colour: ['TV/Border/White 20', 'TV/Button/Primary Solid', 'TV/Base/Light'],
    type: ['Heading/M'],
  },
  wide: true,
  variants: [
    { label: 'Frame · Default', el: () => reward('frame') },
    { label: 'Frame · Focus', el: () => reward('frame', true) },
    { label: 'Title · Default', el: () => reward('title') },
    { label: 'Pending · Default', el: () => reward('pending') },
  ],
  notes: [
    '<strong>The <code>Type</code> axis mixes two different things.</strong> <code>Frame</code>, <code>Avatar</code> and <code>Title</code> are reward <em>categories</em>; <code>Pending</code> is a <em>state</em> a reward of any category can be in. So a pending frame and a pending title cannot both be expressed. <strong>Pending belongs on the State axis.</strong>',
    '<strong>There is no <code>Badge</code> type</strong>, although the hub glossary names four categories — title, badge, avatar, frame. One of the four has no variant here.',
    '<code>Pending</code> dims the art to 30% and adds a tag top right. That matches the product rule: a gated reward a guest has <em>earned</em> is shown and marked, not hidden, because it is the stated incentive to register. It is not a preview of a reward nobody has reached — that one is simply absent.',
    'Each tile carries the <strong>show it was earned on</strong> in a 124 corner badge, which is the Trophy Cabinet rule that a reward keeps its origin visible.',
    'The three types show three different things: <code>Frame</code> and <code>Pending</code> the Gold Wings frame, <code>Title</code> a badge, <code>Avatar</code> a reward called <em>Stack Stage 1</em>. The <code>Pending</code> tile adds a <strong>Sign IN</strong> tag — the register-to-use gate, stated on the tile itself.',
  ],
};

/* ------------------------------------------------------------- Avatar Tile */

export const AvatarTile: ComponentModule = {
  id: 'c-avatar-tile', title: 'Avatar Tile', group: 'Identity', figma: '10331:31709',
  description: 'The circular tile a visitor picks an avatar from. 200 at size M, 300 at L, in a picture and a placeholder flavour.',
  tokens: {
    colour: ['TV/Border/White 20', 'TV/Button/Secondary', 'TV/Button/Primary Solid', 'TV/Base/Light', 'TV/Base/Dark'],
    type: [],
  },
  variants: [
    { label: 'Image · M · Default', el: () => h(`<span class="c-avtile c-avtile--m"><img src="assets/components/avatar-sample.png" alt=""></span>`) },
    { label: 'Image · M · Focus', el: () => h(`<span class="c-avtile c-avtile--m is-focus"><img src="assets/components/avatar-sample.png" alt=""></span>`) },
    { label: 'Image · M · Selected', el: () => h(`<span class="c-avtile-wrap">
        <span class="c-avtile c-avtile--m is-selected"><img src="assets/components/avatar-sample.png" alt=""></span>
        <span class="c-avtile-wrap__tick">${icon('Check Filled', 44)}</span></span>`) },
    { label: 'Default · L', el: () => h(`<span class="c-avtile c-avtile--l"><span class="c-avtile__silhouette">${icon('Account', 238)}</span></span>`) },
  ],
  notes: [
    '<strong>Selected is marked twice</strong>: the ring turns <code>Primary Solid</code> AND a 54 white disc with a blue tick lands on the top-right corner. Focus is only the ring, so focused and selected are told apart by the badge rather than by the ring.',
    '<strong>The two sizes carry different rings</strong>: M rests on a 1px <code>Button/Secondary</code> edge, L on a 9px <code>Border/White 20</code> one. Not one ring scaled — two decisions.',
    'Focus is an <strong>8px</strong> <code>Primary Solid</code> ring, where the product\'s focus-ring token is 6. <strong>A third focus width in the file</strong>, after the 6 on cards and the 4 on inputs.',
    'Size L exists only in <code>Default</code> — there is no focused or selected 300 tile, so the large one cannot be picked. It is the display size.',
    'This is the <strong>picked</strong> avatar — a choice, not a reward. The earned kind is post-MVP and is a set of its own; see the hub glossary, which splits the word deliberately.',
  ],
};

/* ------------------------------------------------------------ Reward Track */

const trackStop = (x: number, label: string, reached: boolean) =>
  `<span class="c-track__stop${reached ? ' is-reached' : ''}" style="left:${x}px"><b>${label}</b><i></i></span>`;

export const RewardTrackFirst: ComponentModule = {
  id: 'c-reward-track-first', title: 'Reward Track First', group: 'Identity', figma: '11643:15569',
  description: '477 × 152 — the opening segment of a show\'s track: the 0 mark, the first medal, and the stops beyond it.',
  tokens: {
    colour: ['TV/Progress/Track', 'TV/Base/Light', 'TV/Base/Neutral', 'TV/Text/Primary'],
    type: ['Heading/S'],
  },
  wide: true,
  variants: [
    { label: 'First', el: () => h(`<div class="c-track">
        <span class="c-track__rail" style="left:0;width:477px"></span>
        ${trackStop(-7, '0', false)}${trackStop(269, '7', false)}${trackStop(353, '14', false)}${trackStop(437, '100', false)}
        <span class="c-track__medal" style="left:63px">${badge(0, 0, 129)}</span>
      </div>`) },
  ],
  notes: [
    'Nothing is reached in this segment: the rail is all <code>Progress/Track</code> and every stop dot is white. The <code>Middle</code> and <code>Last</code> segments carry the yellow fill.',
    'The stop values on this segment are <strong>0, 7, 14 and 100</strong> — the same 7-and-14 pacing PTV-520 gives as <em>an example of one track</em>. Thresholds are configured per show, so these are illustrative, not the product\'s numbers.',
  ],
};

export const RewardTrack: ComponentModule = {
  id: 'c-reward-track', title: 'Reward Track', group: 'Identity', figma: '12458:37894',
  description: '477 × 152 in two flavours — a middle segment and the last one. The yellow fill is how far the player has come.',
  tokens: {
    colour: ['TV/Progress/Track', 'TV/Game UI/Yellow', 'TV/Base/Light', 'TV/Base/Neutral', 'TV/Text/Primary'],
    type: ['Heading/S'],
  },
  wide: true,
  variants: [
    { label: 'Middle', el: () => h(`<div class="c-track">
        <span class="c-track__rail" style="left:58px;width:407px"></span>
        <span class="c-track__fill" style="width:64px"></span>
        ${trackStop(46, '7', true)}${trackStop(329, '14', false)}${trackStop(434, '100', false)}
        <span class="c-track__medal" style="left:123px">${badge(0, 0, 129)}</span>
      </div>`) },
    { label: 'Last', el: () => h(`<div class="c-track">
        <span class="c-track__rail" style="left:58px;width:419px"></span>
        <span class="c-track__fill" style="width:258px"></span>
        ${trackStop(244, '98', true)}
        <span class="c-track__medal is-reached" style="left:325px">${badge(0, 0, 129)}</span>
      </div>`) },
  ],
  notes: [
    'Every medal on a track is the <strong>same locked "?" badge</strong> — the file does not show which reward a milestone holds until it is reached. Both segments draw it, reached or not.',
    'A stop turns from <code>Base/Light</code> to <code>Game UI/Yellow</code> once it is reached, and on <code>Last</code> the medal\'s ring turns yellow too. <strong>On <code>Middle</code> it does not</strong>, although its stop is reached — so a reached medal is marked on one segment and not the other. <strong>Worth checking.</strong>',
    'The yellow fill starts at x = 0 on both, running under the preceding segment rather than from this one\'s rail, which begins at 58. The segments are meant to be butted together.',
    '<code>Last</code> carries one stop where <code>Middle</code> carries three, and its value jumps from 14 to <strong>98</strong>. Example numbers rather than a designed curve.',
  ],
};
