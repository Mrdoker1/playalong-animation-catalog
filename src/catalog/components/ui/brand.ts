/**
 * The brand marks, the celebration, and the surfaces that are a whole screen
 * rather than a control.
 *
 * Read node by node on 2026-10-13.
 */
import { injectStyle } from '../../../lib/injectStyle';
import type { ComponentModule } from '../types';
import { icon } from '../icons';

const h = (html: string): HTMLElement => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild as HTMLElement;
};

injectStyle('css-c-brand', `
.c-logo img { display: block; }
.c-logo__tag { margin-top: 26px; font-family: var(--type-heading-m-family);
  font-size: 32px; color: var(--tv-base-light); }

.c-trophies { width: 1664px; height: 473px; box-sizing: border-box; border-radius: 24px;
  border: 1px solid var(--tv-border-white-20); padding: 32px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 24px; color: var(--tv-base-light); }
.c-trophies__slot { width: 1072px; height: 75px; border-radius: 8px;
  background: var(--tv-transparent-white-6); }

.c-confetti { width: 600px; height: 300px; position: relative; overflow: hidden;
  border-radius: 12px; background: var(--tv-base-dark); }
.c-confetti i { position: absolute; display: block; border-radius: 2px;
  animation: c-confetti-fall 2.4s linear infinite; }
@keyframes c-confetti-fall {
  0%   { transform: translateY(-40px) rotate(0deg); opacity: 0; }
  10%  { opacity: 1; }
  100% { transform: translateY(340px) rotate(540deg); opacity: 1; }
}

.c-inputfield { width: 280px; height: 44px; box-sizing: border-box; border-radius: 8px;
  display: flex; align-items: center; padding: 10px 16px;
  background: var(--web-transparent-white-6);
  font-family: var(--type-body-m-family); font-size: 16px; line-height: 24px; color: #c9cdd2; }
.c-inputfield--error { background: var(--web-transparent-red-6);
  box-shadow: inset 0 0 0 1px rgb(255 0 0 / .5); }
.c-inputfield--disabled { background: rgb(255 255 255 / .16);
  box-shadow: inset 0 0 0 1px #6e7277; color: #6e7277; }

.c-panel { box-sizing: border-box; border-radius: 24px; padding: 40px;
  background: var(--tv-transparent-dark-80); border: 1px solid var(--tv-border-white-20);
  color: var(--tv-base-light); }
.c-panel__label { font-family: var(--type-game-s-family); font-weight: var(--type-game-s-weight);
  font-size: var(--type-game-s-size); }
.c-panel__slot { border-radius: 8px; background: var(--tv-transparent-white-6); }
`);

/* ------------------------------------------------------------------- Logo */

export const Logo: ComponentModule = {
  id: 'c-logo', title: 'Logo', group: 'Content', figma: '933:7815',
  description: '572 × 128 — the wordmark, nine vectors all bound to TV/Base/Light.',
  tokens: { colour: ['TV/Base/Light'], type: [] },
  wide: true,
  variants: [
    { label: 'Logo', el: () => h(`<div class="c-logo"><img src="assets/flows/logo.svg" alt="PlayAlong" style="width:572px;height:128px"></div>`) },
  ],
  notes: [
    'Every one of the nine vectors binds <code>TV/Base/Light</code>, so the mark recolours from one token. That is unusual in this file and worth keeping.',
    'The <code>Subtract</code> vector in the middle is the <strong>A</strong>, and it is also the standalone mark the collapsed menu uses.',
  ],
};

export const LogoWithText: ComponentModule = {
  id: 'c-logo-text', title: 'Logo with Text', group: 'Content', figma: '933:7743',
  description: '572 × 180 — the wordmark over the tagline, on a 26 gap.',
  tokens: { colour: ['TV/Base/Light'], type: [] },
  wide: true,
  variants: [
    { label: 'With tagline', el: () => h(`<div class="c-logo">
        <img src="assets/flows/logo.svg" alt="PlayAlong" style="width:572px;height:128px">
        <div class="c-logo__tag">Your Interactive Streaming Experience</div></div>`) },
  ],
  notes: [
    'The tagline is <strong>31.91px</strong> and binds no text style — a scaled leftover rather than a size anyone chose. The nearest real style is <code>Rubik Regular 32 (H4)</code>. <strong>Worth snapping.</strong>',
    '<em>Your Interactive Streaming Experience</em> is the only tagline anywhere in the file. It is not in the product brief, so whether it is approved copy is unknown. <strong>Needs the PO.</strong>',
  ],
};

export const Subtract: ComponentModule = {
  id: 'c-subtract', title: 'Subtract', group: 'Content', figma: '933:7845',
  description: '119 × 123 — the A of the wordmark, used alone as the app mark.',
  tokens: { colour: ['TV/Base/Light'], type: [] },
  variants: [
    { label: 'Mark', el: () => h(`<div class="c-logo"><img src="assets/flows/mark.svg" alt="PlayAlong" style="width:119px;height:123px"></div>`) },
  ],
  notes: [
    '<strong><code>Subtract</code> is a boolean operation, not a name.</strong> It is what Figma calls the shape when you subtract one path from another, and it was never renamed. This is the app mark — the thing on the splash screen and in the collapsed rail — and it is findable only by knowing that. <strong>Worth renaming.</strong>',
  ],
};

/* --------------------------------------------------------------- Confetti */

/** The six colours the file's confetti is drawn in. None binds a token. */
const CONFETTI = ['#ffc700', '#018d10', '#018efd', '#f74f9e', '#ff5257', '#fc76ff'];

export const Confetti: ComponentModule = {
  id: 'c-confetti', title: 'Confetti', group: 'Feedback', figma: '11643:38235',
  description: 'The celebration behind a claimed reward — four steps of about 150 scattered pieces in six colours.',
  tokens: { colour: [], type: [] },
  variants: [
    { label: '▶ Falling', el: () => {
      const el = h(`<div class="c-confetti"></div>`);
      for (let i = 0; i < 90; i++) {
        const c = CONFETTI[i % CONFETTI.length];
        const w = 8 + (i % 3) * 4;
        const p = document.createElement('i');
        // A deterministic scatter: a stride of 37 lands on a visible diagonal,
        // so stir the index before using it.
        const r = (i * 2654435761) % 4096;
        p.style.cssText = `left:${r % 600}px;top:-20px;width:${w}px;height:${w + 4}px;` +
          `background:${c};animation-delay:${-(r % 240) / 100}s;` +
          `animation-duration:${2 + (r % 13) / 10}s`;
        el.appendChild(p);
      }
      return el;
    } },
    { label: 'The six colours', el: () => {
      const el = h(`<div style="display:flex;gap:12px"></div>`);
      for (const c of CONFETTI) {
        const s = document.createElement('span');
        s.style.cssText = `width:64px;height:64px;border-radius:8px;background:${c}`;
        s.title = c;
        el.appendChild(s);
      }
      return el;
    } },
  ],
  notes: [
    '<strong>All six colours are hardcoded and none is in the token file</strong> — <code>#FFC700</code>, <code>#018D10</code>, <code>#018EFD</code>, <code>#F74F9E</code>, <code>#FF5257</code>, <code>#FC76FF</code>. The product palette has one green (<code>Game UI/Green 1</code> <code>#00C441</code>) and one blue (<code>Blue/500</code> <code>#0090FF</code>), and neither of these matches. <strong>Six untokenised colours in the most visible moment the product has.</strong>',
    'The file animates it as <strong>four discrete steps</strong>, each a separate variant with about 150 vectors at hand-placed positions. That is a flipbook, not a motion spec: no duration, no easing, no direction.',
    'The fall here is generated, not the file\'s scatter — 90 pieces on a loop, which is what the four steps are reaching for. <strong>The colours are measured; the positions are not.</strong> This is the one component where the catalog\'s point is the animation rather than the still.',
  ],
};

/* ------------------------------------------------- Trophies thumbnail ---- */

export const TrophiesThumbnail: ComponentModule = {
  id: 'c-trophies-thumb', title: 'Trophies thumbnail', group: 'Identity', figma: '13550:43488',
  description: '1664 × 473 — the Trophy Cabinet\'s empty state: an outlined prize over two empty slots.',
  tokens: { colour: ['TV/Border/White 20', 'TV/Base/Light'], type: [] },
  wide: true,
  variants: [
    { label: 'Empty', el: () => h(`<div class="c-trophies">
        ${icon('Prize Outline', 64)}
        <span class="c-trophies__slot"></span></div>`) },
  ],
  notes: [
    '<strong>Its text frames are empty in the file.</strong> The 1072 × 75 block under the icon holds no characters, so the empty-state copy is not here — which matters, because the copy that <em>is</em> quoted elsewhere, <em>"Earn trophies by playing games and completing challenges"</em>, is the only place the word <strong>challenges</strong> appears in the whole product. Nothing defines a challenge; the nearest real thing is a Mission, which is post-MVP. <strong>Build nothing from that sentence.</strong>',
    '1664 is the content inner width — the content block less its 96 right margin. So this fills the column exactly.',
  ],
};

/* -------------------------------------------------------- Input Field (Web) */

export const InputFieldWeb: ComponentModule = {
  id: 'c-input-field-web', title: 'Input Field (Web)', group: 'Controls', figma: '9849:13692',
  description: '280 × 44 — the web field itself, in five states. The sibling of Input (Web), which adds the message row.',
  tokens: {
    colour: ['Web/Transparent/White 6', 'Web/Transparent/Red 6'],
    type: [],
  },
  variants: [
    { label: 'Default', el: () => h(`<div class="c-inputfield">Your email address</div>`) },
    { label: 'Error', el: () => h(`<div class="c-inputfield c-inputfield--error">Your email address</div>`) },
    { label: 'Disabled', el: () => h(`<div class="c-inputfield c-inputfield--disabled">Your email address</div>`) },
  ],
  notes: [
    '<strong>Three of its colours come from a remote library</strong> this file cannot change: <code>Text/Secondary</code> for the placeholder, and <code>Overlay/Pressed 16%</code> and <code>Text/Disabled</code> for the disabled state. Who owns that library is unknown. <strong>Needs an owner.</strong>',
    'The error outline is a <strong>raw <code>#FF0000</code> at 50%</strong>, bound to nothing — while its fill correctly binds <code>Web/Transparent/Red 6</code>. One of the two was tokenised and the other was not.',
    '<code>Placeholder</code> and <code>Default</code> are the same drawing, as on the rail card. Not shown separately.',
  ],
};

/* ---------------------------------------------- Answer Box / Attempts Box */

export const AnswerBox: ComponentModule = {
  id: 'c-answer-box', title: 'Answer Box', group: 'Game', figma: '2565:2734',
  description: '768 × 317 — the question over the field the player answers it in, on the dark game panel.',
  tokens: { colour: ['TV/Transparent/Dark 80', 'TV/Border/White 20', 'TV/Base/Light'], type: [] },
  wide: true,
  variants: [
    { label: 'Default', el: () => h(`<div class="c-panel" style="width:768px;height:317px;display:flex;flex-direction:column;gap:33px;justify-content:center">
        <span class="c-panel__slot" style="height:38px"></span>
        <span class="c-panel__slot" style="height:100px"></span></div>`) },
  ],
  notes: [
    '<strong>Its three variants are identical except for a 6px shift of one image.</strong> <code>Default</code>, <code>Typed</code> and <code>Two Lines</code> have the same frames at the same sizes; only <code>image 171</code> moves from x = 6 to x = 0 and y = 189 to 196. Whatever distinguishes them is not drawn. <strong>Needs the real states.</strong>',
    'The question row and the answer row are <strong>empty instance slots</strong> in the file, so there is no copy to show. Drawn as the slots they are rather than filled with invented text.',
    'The panel is <code>Transparent/Dark 80</code> — the game layer\'s standard surface, shared with Higher/Lower, the Note and Attempts Box.',
  ],
};

export const AttemptsBox: ComponentModule = {
  id: 'c-attempts-box', title: 'Attempts Box', group: 'Game', figma: '2565:2667',
  description: '248 × 819 — the tall column of the player\'s tries, beside the answer options.',
  tokens: { colour: ['TV/Transparent/Dark 80', 'TV/Border/White 20', 'TV/Base/Light'], type: ['Game/S'] },
  wide: true,
  variants: [
    { label: 'Default', el: () => h(`<div class="c-panel" style="width:248px;height:819px;display:flex;flex-direction:column;gap:24px">
        <span class="c-panel__label">attemps</span>
        <span class="c-panel__slot" style="flex:1"></span></div>`) },
  ],
  notes: [
    '<strong>The heading is spelled <code>attemps</code></strong> — the <em>t</em> is missing. It is the only visible word in the component. <strong>A file defect.</strong>',
    'It is also lower case, bound to <code>Game/S</code> (Roboto Condensed Semibold 32), which has no case transform. Whether the game layer is lower case by design is not written down anywhere.',
    'The list below the heading is an empty 168 × 660 frame — the attempts themselves are the <code>Attempt</code> component, which the catalog has separately.',
  ],
};

/* ------------------------------------------------- List of answer Options */

injectStyle('css-c-last', `
.c-opts { width: 656px; box-sizing: border-box; border-radius: 24px; padding: 40px;
  background: var(--tv-transparent-dark-80); border: 1px solid var(--tv-border-white-20);
  display: flex; flex-direction: column; gap: 16px; }
.c-opt { height: 76px; box-sizing: border-box; border-radius: 12px; padding: 0 32px;
  display: flex; align-items: center; gap: 24px; color: var(--tv-base-light);
  font-family: var(--type-game-m-family); font-weight: var(--type-game-m-weight);
  font-size: var(--type-game-m-size); }
.c-opt--green { background: var(--gradient-tv-status-success); border: 2px solid var(--tv-game-ui-green-1); }
.c-opt--blue  { background: var(--gradient-tv-status-wait); border: 2px solid var(--tv-button-primary-solid); }
.c-opt__n { width: 24px; text-align: center; }
.c-opt__rule { width: 2px; align-self: stretch; background: var(--tv-button-secondary); }
.c-opt__text { flex: 1; font-family: var(--type-game-s-family);
  font-weight: var(--type-game-s-weight); font-size: var(--type-game-s-size); }
.c-opt.is-hidden .c-opt__text, .c-opt.is-hidden .c-opt__score { opacity: 0; }

.c-loader { width: 100px; height: 100px; border-radius: 50%; box-sizing: border-box;
  border: 8px solid var(--tv-button-secondary);
  border-top-color: var(--tv-button-primary-solid);
  animation: c-loader-spin 900ms linear infinite; }
@keyframes c-loader-spin { to { transform: rotate(360deg); } }
.c-loading { display: flex; flex-direction: column; align-items: center; gap: 32px;
  color: var(--tv-base-light); font-family: var(--type-heading-l-family);
  font-weight: var(--type-heading-l-weight); font-size: var(--type-heading-l-size); }

.c-unlocked { width: 1100px; box-sizing: border-box; padding: 40px;
  display: flex; flex-direction: column; align-items: center; gap: 64px;
  color: var(--tv-base-light); }
.c-unlocked__h { font-family: var(--type-display-l-family);
  font-weight: var(--type-display-l-weight); font-size: var(--type-display-l-size); }
.c-unlocked__art { width: 281px; height: 281px; }
`);

const OPTS: [string, string][] = [
  ['Sleeping', '24'], ['TV/SVU Rerun', '24'],
  ['Sex/chase 21 Yr-olds', '24'], ['Boozing/Rum & Ensure', '24'],
];

export const AnswerOptionsList: ComponentModule = {
  id: 'c-answer-options', title: 'List of answer Options', group: 'Game', figma: '2565:2663',
  description: '656 × 819 — the survey board: eight rows, the found ones green and the unfound ones blue with their text hidden.',
  tokens: {
    colour: ['TV/Transparent/Dark 80', 'TV/Border/White 20', 'TV/Status/Success', 'TV/Status/Wait', 'TV/Game UI/Green 1', 'TV/Button/Primary Solid', 'TV/Button/Secondary', 'TV/Base/Light'],
    type: ['Game/M', 'Game/S'],
  },
  wide: true,
  variants: [
    { label: 'Four found, four hidden', el: () => {
      const rows = OPTS.map(([t, s], i) =>
        `<div class="c-opt c-opt--green"><span class="c-opt__n">${i + 1}</span>
          <span class="c-opt__rule"></span><span class="c-opt__text">${t}</span>
          <span class="c-opt__score">${s}</span></div>`).join('') +
        [5, 6, 7, 8].map((n) =>
        `<div class="c-opt c-opt--blue is-hidden"><span class="c-opt__n">${n}</span>
          <span class="c-opt__rule"></span><span class="c-opt__text">Sleeping</span>
          <span class="c-opt__score">33</span></div>`).join('');
      return h(`<div class="c-opts">${rows}</div>`);
    } },
  ],
  notes: [
    '<strong>A hidden answer is still in the file, at opacity 0.</strong> Rows five to eight carry real text and a real score with their opacity set to zero, not blanked. Anything exporting this — or inspecting the DOM of a client built from it — reads the answers before the player finds them. <strong>Flag to engineering: the hidden rows must not ship their text.</strong>',
    'Seven of the eight rows are named <code>Answerr option</code>, with two r\'s; the fourth is <code>Answer Option</code>. Eight instances, two spellings, neither matching the component.',
    'Green is <code>TV/Status/Success</code> with a <code>Game UI/Green 1</code> edge, blue is <code>TV/Status/Wait</code> with a <code>Primary Solid</code> edge. So found and not-yet-found are the same two gradients the rest of the game layer uses for success and waiting.',
  ],
};

export const CardSharksQuestion: ComponentModule = {
  id: 'c-card-sharks-question', title: 'Card Sharks Question', group: 'Game', figma: '3752:30765',
  description: '418 × 398 — the timer panel stacked on the Higher/Lower panel, which is how the question is actually posed.',
  tokens: { colour: ['TV/Transparent/Dark 80', 'TV/Border/White 20', 'TV/Base/Neutral'], type: [] },
  variants: [
    { label: 'Default', el: () => h(`<div style="display:flex;flex-direction:column;gap:16px;width:418px">
        <div class="c-panel" style="height:86px;padding:24px 40px"></div>
        <div class="c-hl">
          <div class="c-hl__btn"><span class="c-dkey c-dkey--up">${icon('Play', 44)}</span><span>Higher</span></div>
          <div class="c-hl__btn"><span class="c-dkey c-dkey--down">${icon('Play', 44)}</span><span>lower</span></div>
        </div></div>`) },
  ],
  notes: [
    'It is <strong>an assembly, not a new drawing</strong>: a <code>Score Box</code> in its Timer variant over the <code>Higher/Lower</code> panel, on a 16 gap. Both are already in this catalog on their own.',
    'The second variant, <code>with Card</code>, adds the playing card. Not drawn here — the card art is a separate asset this rebuild does not have.',
  ],
};

export const GameKeyboard: ComponentModule = {
  id: 'c-game-keyboard', title: 'Keyboard (game)', group: 'Game', figma: '2565:2733',
  description: 'The in-game input panel, in six shapes — one per way a game can ask for an answer.',
  tokens: { colour: ['TV/Transparent/Dark 80', 'TV/Border/White 20'], type: [] },
  wide: true,
  variants: ([
    ['Letters with Digit', 1010, 384], ['Default', 848, 384], ['Voice', 780, 384],
    ['Numeric', 700, 312], ['Coordinate Input', 700, 312], ['Multiselect', 700, 240],
  ] as [string, number, number][]).map(([label, w, ht]) => ({
    label, el: () => h(`<div class="c-panel" style="width:${w}px;height:${ht}px;display:flex;flex-direction:column;gap:24px">
      ${label === 'Voice'
        ? `<div class="c-kb__mic" style="margin:0 auto"><span class="c-kb__halo"><span><span>${icon('Mic', 44)}</span></span></span>
           <span class="c-kb__lt"><b>Listening...</b><i>Speak now</i></span></div>`
        : `<span class="c-panel__slot" style="flex:1"></span>`}
      <span class="c-panel__slot" style="height:72px"></span></div>`),
  })),
  notes: [
    '<strong>It is a different keyboard from <code>Email Keyboard</code> entirely</strong> — dark panel at <code>Transparent/Dark 80</code> rather than the <code>Base/Neutral</code> slab, radius 24 rather than 12, and six input kinds rather than six letter layouts. Two components called keyboard, sharing nothing.',
    'Its six types line up with the six tags in <code>Game Type Tags Row</code> — multiple choice, numeric, free text, up/down, voice, time-limited. <strong>Nearly:</strong> the keyboard has <em>Coordinate Input</em> and <em>Multiselect</em>, and no up/down or time-limited. Two lists of six that do not match.',
    'Every type\'s key area is an <strong>empty slot frame</strong> in the file, so there are no keys to draw. The panel sizes and the 72 action row are the real measurements; the inside is not drawn.',
    '<code>Voice</code> holds the <code>Mic</code> component, which the catalog has on its own.',
  ],
};

export const RewardUnlockedContainer: ComponentModule = {
  id: 'c-reward-unlocked', title: 'Container — Reward unlocked', group: 'Identity', figma: '11643:39611',
  description: '1100 × 684 — the popup that celebrates a claimed reward: the heading, the art, and the button that dismisses it.',
  tokens: { colour: ['TV/Base/Light', 'TV/Button/Primary', 'TV/Button/Primary Solid'], type: ['Display/L'] },
  wide: true,
  variants: [
    { label: 'Reward unlocked!', el: () => h(`<div class="c-unlocked">
        <span class="c-unlocked__h">Reward unlocked!</span>
        <span class="c-unlocked__art"><span class="c-badge" style="width:281px;height:281px;background-image:url(assets/components/badges.png);background-size:843px 562px;background-position:-562px -281px"></span></span>
        <span class="c-btn c-btn--primary is-focus" style="width:240px">Claim</span></div>`) },
  ],
  notes: [
    '<strong><code>Container</code> is not a name.</strong> It is the popup that celebrates a claimed reward — the moment the whole Spotlight loop is built around — and it is called the same thing as every anonymous wrapper frame in the file. <strong>Worth renaming.</strong>',
    'Its art slot and its button label are <strong>empty instances</strong>, so neither the reward shown nor the button\'s word is in the file. <em>Claim</em> here is this rebuild\'s, not a measurement — the glossary says a player <em>claims</em> an unlocked reward in a deliberate action, which is what this button must be.',
    'The <code>Confetti</code> component is the other half of this moment and is a separate node; nothing in the file joins them.',
  ],
};

export const LoadingState: ComponentModule = {
  id: 'c-loading', title: 'Loading state', group: 'Feedback', figma: '13523:20837',
  description: 'The spinner over "Loading your progress…", at full screen and as a 1665 × 323 band.',
  tokens: { colour: ['TV/Base/Light', 'TV/Button/Primary Solid', 'TV/Button/Secondary'], type: ['Heading/L'] },
  wide: true,
  variants: [
    { label: '▶ Band (1665 × 323)', el: () => h(`<div class="c-loading" style="height:323px;justify-content:center">
        <span class="c-loader"></span><span>Loading your progress...</span></div>`) },
  ],
  notes: [
    '<strong>The two are the same contents in two frames</strong> — <code>Loading state - 1</code> is 1920 × 1080 and <code>Loading state - 2</code> is 1665 × 323, and the spinner and the sentence are identical in both. One component with a size would do. The full-screen one is not drawn here; it is the band in a 1080-tall box.',
    'The spinner is an instance of <code>Loader Big</code>, which has a <code>Frame 3</code> variant and no motion defined. <strong>The rotation here is this rebuild\'s</strong> — the file carries no duration, easing or direction for it.',
    'The sentence ends in three dots typed as full stops rather than an ellipsis.',
  ],
};
