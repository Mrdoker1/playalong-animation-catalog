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
  position: relative; overflow: hidden; }
/* The edge is drawn ABOVE the art, as an overlay: in the file it is an inside
   stroke, so it neither moves the content nor gets covered by the glow. */
.c-reward::after { content: ''; position: absolute; inset: 0; border-radius: inherit;
  pointer-events: none; box-shadow: inset 0 0 0 1px var(--tv-border-white-20); }
.c-reward.is-focus::after, .c-reward.is-selected::after {
  box-shadow: inset 0 0 0 4px var(--tv-button-primary-solid); }
/* Every position below is measured from the tile's outer edge, as in the file. */
.c-reward__glow { position: absolute; left: 99px; top: -25px; width: 337.781px; height: 337.781px;
  object-fit: cover; display: block; }
.c-reward__glow--title { object-fit: contain; }
.c-reward__crop { position: absolute; width: 200px; height: 200px; overflow: hidden; }
.c-reward__crop img { position: absolute; max-width: none; display: block; }
.c-reward__crop--frame { left: 168px; top: 44px; }
.c-reward__crop--frame img { width: 223.98%; height: 155.9%; left: -60.44%; top: -16.75%; }
.c-reward__crop--avatar { left: 166px; top: 46px; }
.c-reward__crop--avatar.is-at-slot { left: 168px; top: 44px; }
.c-reward__crop--avatar img { width: 125.37%; height: 125.37%; left: -12.64%; top: -12.44%; }
.c-reward__pending { position: absolute; left: 168px; top: 44px; width: 200px; height: 200px;
  opacity: .3; overflow: hidden; }
.c-reward__pending > img { position: absolute; display: block; }
.c-reward__pending-label { position: absolute; left: 50%; top: 157.98px; transform: translateX(-50%);
  box-sizing: content-box; border: 8.324px solid #1e1e1e; border-radius: 69px; padding: 5.549px 13.874px;
  background: linear-gradient(180deg, #fff, #999); font-family: var(--type-label-m-family);
  font-weight: 500; font-size: 24.97px; line-height: 27.747px; text-transform: uppercase; color: #000;
  white-space: nowrap; }
.c-reward__name { position: absolute; left: 22px; right: 22px; top: 270px; text-align: center;
  ${T('heading-m')}; color: var(--tv-base-light); white-space: nowrap; overflow: hidden;
  text-overflow: ellipsis; }
.c-reward__logo { position: absolute; left: 12px; top: 12px; width: 100px; height: 100px;
  object-fit: contain; display: block; }
.c-reward__check { position: absolute; right: 30px; top: 30px; width: 64px; height: 64px; display: block; }
.c-reward__gate { position: absolute; right: 24px; top: 24px; height: 42px; box-sizing: border-box;
  display: inline-flex; align-items: center; gap: 8px; padding: 9px 17px; border-radius: 8px;
  background: var(--tv-button-secondary); border: 1px solid var(--tv-border-white-20);
  backdrop-filter: blur(6px); ${T('label-m')}; text-transform: uppercase; color: var(--tv-base-light);
  white-space: nowrap; }
.c-reward__gate img { width: 24px; height: 24px; display: block; }

/* Avatar Tile (10331:31709). Rings are INSIDE the box here, as in the file:
   200 / 300 including the border. Image M rests on 1px Button/Secondary; Focus
   and Selected-and-focus are 8px Primary Solid; plain Selected has NO ring —
   only the badge. Default L is the 20%-white disc with a 9px 20%-white edge and
   the file's own silhouette, flush to its foot. */
.c-avtile { position: relative; display: block; border-radius: 50%; box-sizing: border-box;
  overflow: hidden; }
.c-avtile > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  display: block; }
.c-avtile--m { width: 200px; height: 200px; border: 1px solid var(--tv-button-secondary); }
.c-avtile--l { width: 300px; height: 300px; }
.c-avtile--default { background: var(--tv-border-white-20); }
.c-avtile--default.c-avtile--l { border: 9px solid var(--tv-border-white-20); }
.c-avtile.is-focus { border: 8px solid var(--tv-button-primary-solid); }
.c-avtile.is-selected { border: 0; }
.c-avtile-wrap { position: relative; display: inline-block; }
/* The badge is the file's 54 icon: a blue disc whose white fill sits UNDER it
   and only shows through the tick — no white edge around it. */
.c-avtile-wrap__tick { position: absolute; right: 0; top: 0; width: 54px; height: 54px; display: block; }

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
type RewardState = 'default' | 'focus' | 'selected';

const R = 'assets/components/reward/';

/** One Reward, laid out exactly as 13301:20807 draws each Type × State. */
const reward = (type: RewardType, state: RewardState) => {
  const name =
    type === 'title' ? 'First Step'
    : type === 'avatar' && state !== 'selected' ? 'Stack Stage 1'
    : 'Gold Wings'; // the file names its selected avatar "Gold Wings" too — see the notes
  const art =
    type === 'frame' ? `<img class="c-reward__glow" src="${R}glow.png" alt="">
        <span class="c-reward__crop c-reward__crop--frame"><img src="${R}frame.png" alt=""></span>`
    : type === 'title' ? `<img class="c-reward__glow c-reward__glow--title" src="${R}title.png" alt="">`
    : type === 'avatar' ? `<span class="c-reward__crop c-reward__crop--avatar${state === 'selected' ? ' is-at-slot' : ''}">
          <img src="${R}avatar.png" alt=""></span>`
    : `<span class="c-reward__pending">
          <img src="${R}pending-disc.svg" alt="" style="left:9.71px;top:18.74px;width:180.358px;height:180.358px">
          <img src="${R}pending-q.svg" alt="" style="left:78.65px;top:66.83px;width:42.472px;height:66.278px">
          <span class="c-reward__pending-label">Avatar</span></span>`;
  return h(`<div class="c-reward${state === 'focus' ? ' is-focus' : ''}${state === 'selected' ? ' is-selected' : ''}">
      ${art}
      <span class="c-reward__name">${name}</span>
      <img class="c-reward__logo" src="${R}${type === 'pending' ? 'logo-pending.png' : 'logo-ff.png'}" alt="">
      ${state === 'selected' ? `<img class="c-reward__check" src="${R}radio-on.svg" alt="" width="64" height="64">` : ''}
      ${type === 'pending' ? `<span class="c-reward__gate"><img src="${R}sign-in.svg" alt="">Sign in</span>` : ''}
    </div>`);
};

export const Reward: ComponentModule = {
  id: 'c-reward', title: 'Reward', group: 'Identity', figma: '13301:20807',
  description: '532 × 338 — one earned reward in the Trophy Cabinet: the art, its name, and the show it came from.',
  tokens: {
    colour: ['TV/Border/White 20', 'TV/Button/Primary Solid', 'TV/Base/Light', 'TV/Button/Secondary'],
    type: ['Heading/M', 'Label/M'],
  },
  wide: true,
  variants: [
    { label: 'Frame · Focus', el: () => reward('frame', 'focus') },
    { label: 'Frame · Selected', el: () => reward('frame', 'selected') },
    { label: 'Frame · Default', el: () => reward('frame', 'default') },
    { label: 'Avatar · Default', el: () => reward('avatar', 'default') },
    { label: 'Avatar · Selected', el: () => reward('avatar', 'selected') },
    { label: 'Avatar · Focus', el: () => reward('avatar', 'focus') },
    { label: 'Pending · Focus', el: () => reward('pending', 'focus') },
    { label: 'Pending · Default', el: () => reward('pending', 'default') },
    { label: 'Title · Selected', el: () => reward('title', 'selected') },
    { label: 'Title · Default', el: () => reward('title', 'default') },
  ],
  notes: [
    '<strong>The <code>Type</code> axis mixes two different things.</strong> <code>Frame</code>, <code>Avatar</code> and <code>Title</code> are reward <em>categories</em>; <code>Pending</code> is a <em>state</em> a reward of any category can be in. So a pending frame and a pending title cannot both be expressed. <strong>Pending belongs on the State axis.</strong>',
    '<strong>There is no <code>Badge</code> type</strong>, although the hub glossary names four categories — title, badge, avatar, frame. One of the four has no variant here.',
    '<code>Pending</code> dims the art to 30% and adds a tag top right. That matches the product rule: a gated reward a guest has <em>earned</em> is shown and marked, not hidden, because it is the stated incentive to register. It is not a preview of a reward nobody has reached — that one is simply absent.',
    'Each tile carries the <strong>show it was earned on</strong> in a 124 corner badge, which is the Trophy Cabinet rule that a reward keeps its origin visible.',
    'Each type draws its own art: <code>Frame</code> the gold wings over a glow, <code>Avatar</code> the avatar itself, <code>Title</code> the <em>Perfect Player</em> plate, and <code>Pending</code> a dimmed <strong>?</strong> disc with the AVATAR label plus a <strong>Sign in</strong> tag — the register-to-use gate, stated on the tile itself.',
    '<strong>Selected is the 64 radio, top right — no different ring from Focus.</strong> Both are the 4px <code>Primary Solid</code> edge; the radio alone says "selected".',
    '<strong>A file defect:</strong> <code>Avatar · Selected</code> is named <em>Gold Wings</em> — the frame\'s name — where its siblings say <em>Stack Stage 1</em>. Kept as drawn.',
    'All art here is exported from the file (glow, wings, avatar, Perfect Player plate, show logos, ? disc) — nothing redrawn.',
  ],
};

/* ------------------------------------------------------------- Avatar Tile */

export const AvatarTile: ComponentModule = {
  id: 'c-avatar-tile', title: 'Avatar Tile', group: 'Identity', figma: '10331:31709',
  description: 'The circular tile an avatar is picked from in Account, and shown in on Progression. 200 at size M, 300 at L.',
  tokens: {
    colour: ['TV/Border/White 20', 'TV/Button/Secondary', 'TV/Button/Primary Solid', 'TV/Base/Light', 'TV/Base/Dark'],
    type: [],
  },
  variants: [
    { label: 'Image · M · Default', el: () => h(`<span class="c-avtile c-avtile--m"><img src="assets/components/avatar-sample.png" alt=""></span>`) },
    { label: 'Image · M · Focus', el: () => h(`<span class="c-avtile c-avtile--m is-focus"><img src="assets/components/avatar-sample.png" alt=""></span>`) },
    { label: 'Image · M · Selected', el: () => h(`<span class="c-avtile-wrap">
        <span class="c-avtile c-avtile--m is-selected"><img src="assets/components/avatar-sample.png" alt=""></span>
        <img class="c-avtile-wrap__tick" src="assets/components/check-image.svg" alt="" width="54" height="54"></span>`) },
    { label: 'Default · L', el: () => h(`<span class="c-avtile c-avtile--l c-avtile--default"><img src="assets/components/silhouette-l.svg" alt="" width="300" height="300"></span>`) },
  ],
  notes: [
    '<strong>Selected is the badge alone</strong> — a 54 blue check on the top-right, with no ring; the 8px <code>Primary Solid</code> ring belongs to focus. <em>Selected and focus</em> carries both. The badge\'s white is only inside the tick: there is no white edge around it.',
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
  description: '477 × 152 — the opening segment of a show\'s track on the Progression screen: the 0 mark and the first medal.',
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
  description: '477 × 152 — a segment of one show\'s reward track on the Progression screen. The yellow fill is how far the player has come.',
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
