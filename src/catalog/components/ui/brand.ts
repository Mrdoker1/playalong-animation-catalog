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

.c-gpanel { box-sizing: border-box; border-radius: 24px; padding: 40px;
  background: var(--tv-transparent-dark-80); border: 1px solid var(--tv-border-white-20);
  color: var(--tv-base-light); }
.c-gpanel__label { font-family: var(--type-game-s-family); font-weight: var(--type-game-s-weight);
  font-size: var(--type-game-s-size); }
.c-gpanel__slot { border-radius: 8px; background: var(--tv-transparent-white-6); }
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
        <span class="c-trophies__h">Your trophies will appear here</span>
        <span class="c-trophies__p">Earn trophies by playing games and completing challenges.</span>
      </div>`) },
  ],
  notes: [
    '<strong>This is where the word <em>challenges</em> comes from.</strong> The second line reads <em>"Earn trophies by playing games and completing challenges."</em> — the only place in the whole product that word appears. Nothing defines a challenge; the nearest real thing is a Mission, which is post-MVP. <strong>Build nothing from that sentence.</strong>',
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
  description: '768 × 317 — how many answers are found, then the one being given, over a blue glow.',
  tokens: {
    colour: ['TV/Transparent/Dark 80', 'TV/Border/White 20', 'TV/Base/Light', 'TV/Game UI/Yellow', 'TV/Button/Primary Solid'],
    type: ['Game/S', 'Game/M'],
  },
  wide: true,
  variants: [
    { label: 'Default', el: () => answerBox('Answer...', 'ph') },
    { label: 'Typed', el: () => answerBox('ABC') },
    { label: 'Two Lines', el: () => answerBox('ABCDEFGHIGKLMNOPQRST', 'two') },
  ],
  notes: [
    '<strong>The count is two sizes and two colours in one line</strong>: <em>FOUND</em> at 32 in white, <em>2/5</em> at 40 in <code>Game UI/Yellow</code>, sharing a baseline.',
    'The answer is <strong>64px, dropping to 48 when it does not fit on one line</strong> — which is what the <code>Two Lines</code> variant is. A size change, drawn as a separate variant rather than as text that wraps.',
    'The placeholder reads <code>Answer...</code> in three full stops rather than an ellipsis, dimmed. The same three-dot habit as the loading sentence.',
    'The blue rule under the answer is a raster glow in the file, bound to no token. Rebuilt in CSS from <code>Primary Solid</code> so it recolours; the file\'s is a picture.',
  ],
};

/** Two found, then the misses. The file draws ten rows and repeats "drink". */
const ATTEMPTS: [string, boolean][] = [
  ['sleep', true], ['tv', true], ['run', false], ['walk', false], ['drink', false],
  ['drink', false], ['drink', false], ['drink', false], ['drink', false], ['drink', false],
];

export const AttemptsBox: ComponentModule = {
  id: 'c-attempts-box', title: 'Attempts Box', group: 'Game', figma: '2565:2667',
  description: '248 × 819 — every answer the player has tried, the matches green and the misses dark red.',
  tokens: {
    colour: ['TV/Transparent/Dark 80', 'TV/Border/White 20', 'TV/Base/Light', 'TV/Game UI/Green 1', 'TV/Game UI/Red 2'],
    type: ['Game/S'],
  },
  variants: [
    { label: 'Two found, eight missed', el: () => h(`<div class="c-attempts">
        <span class="c-game-upper" style="font-family:var(--type-game-s-family);font-weight:var(--type-game-s-weight);font-size:var(--type-game-s-size)">attemps</span>
        <div style="display:flex;flex-direction:column">${
          ATTEMPTS.map(([w, hit]) =>
            `<span class="c-attempts__row c-attempts__row--${hit ? 'hit' : 'miss'}">${w}</span>`).join('')}</div>
      </div>`) },
  ],
  notes: [
    '<strong>The heading is spelled <code>attemps</code></strong> — the <em>t</em> is missing. <strong>A file defect</strong>, and it is the component\'s title on screen.',
    '<strong>Every string here is lower case in the file and renders in capitals</strong>, because the nodes carry <code>textCase: UPPER</code>. So the game layer does transform case — through the node, not through the text style. Anything generating from the styles alone gets this wrong.',
    'A match is <code>Game UI/Green 1</code>; a miss is <code>Game UI/Red 2</code>, the darker of the two reds. The list is ten rows deep and the file repeats <em>drink</em> six times to fill it.',
  ],
};

/** FOUND n/m over the answer, with the glow under it. */
const answerBox = (value: string, kind?: 'ph' | 'two') =>
  h(`<div class="c-abox">
      <span class="c-abox__found">Found <b>2/5</b></span>
      <span class="c-abox__value${kind === 'two' ? ' c-abox__value--two' : ''}${kind === 'ph' ? ' c-abox__value--ph' : ''}">${value}</span>
      <span class="c-abox__rule"></span>
    </div>`);

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
.c-opt__text, .c-opt__n, .c-opt__score { text-transform: uppercase; }
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

.c-rwpop { width: 1100px; box-sizing: border-box; padding: 40px;
  display: flex; flex-direction: column; align-items: center; gap: 64px;
  color: var(--tv-base-light); }
.c-rwpop__h { font-family: var(--type-display-l-family);
  font-weight: var(--type-display-l-weight); font-size: var(--type-display-l-size); }
.c-rwpop__art { width: 281px; height: 281px; object-fit: contain; }
.c-rwpop { align-items: stretch; }
.c-rwpop__h { align-self: flex-start; }
.c-rwpop__art, .c-rwpop__name, .c-rwpop .c-btn { align-self: center; }
.c-rwpop__name { display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--type-heading-l-family); font-weight: var(--type-heading-l-weight);
  font-size: 36px; }
.c-trophies__h { font-family: var(--type-heading-l-family);
  font-weight: var(--type-heading-l-weight); font-size: 36px; }
.c-trophies__p { font-family: var(--type-body-l-family); font-size: 24px;
  color: var(--tv-text-primary); }

/* The game layer sets textCase UPPER on its nodes, so a lower-case string in
   Figma renders in capitals. That is why the heading reads ATTEMPS. */
.c-game-upper { text-transform: uppercase; }
.c-attempts { width: 248px; height: 819px; box-sizing: border-box; border-radius: 24px;
  padding: 40px; background: var(--tv-transparent-dark-80);
  border: 1px solid var(--tv-border-white-20);
  display: flex; flex-direction: column; gap: 24px; }
.c-attempts__row { height: 47px; display: flex; align-items: center;
  font-family: var(--type-game-s-family); font-weight: var(--type-game-s-weight);
  font-size: var(--type-game-s-size); text-transform: uppercase;
  border-bottom: 1px solid var(--tv-transparent-white-10); }
.c-attempts__row--hit  { color: var(--tv-game-ui-green-1); }
.c-attempts__row--miss { color: var(--tv-game-ui-red-2); }

.c-abox { width: 768px; height: 317px; box-sizing: border-box; border-radius: 24px;
  padding: 40px; background: var(--tv-transparent-dark-80);
  border: 1px solid var(--tv-border-white-20);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 33px; color: var(--tv-base-light); }
.c-abox__found { display: flex; align-items: baseline; gap: 8px; text-transform: uppercase;
  font-family: var(--type-game-s-family); font-weight: var(--type-game-s-weight);
  font-size: 32px; }
.c-abox__found b { font-size: 40px; color: var(--tv-game-ui-yellow); font-weight: inherit; }
.c-abox__value { font-family: var(--type-game-m-family); font-weight: var(--type-game-m-weight);
  font-size: 64px; line-height: 1.1; text-align: center; }
.c-abox__value--two { font-size: 48px; }
.c-abox__value--ph { color: var(--tv-text-muted); }
/* The blue rule under the answer is an image in the file; drawn as the glow it is. */
.c-abox__rule { width: 624px; height: 2px; border-radius: 2px;
  background: linear-gradient(90deg, transparent, var(--tv-button-primary-solid), transparent);
  box-shadow: 0 0 24px 6px rgb(0 144 255 / .45); }

.c-gkb { box-sizing: border-box; border-radius: 24px; padding: 40px;
  background: var(--tv-transparent-dark-80); border: 1px solid var(--tv-border-white-20);
  position: relative; color: var(--tv-base-light); }
.c-gkb__k { position: absolute; box-sizing: border-box; border-radius: 8px;
  background: var(--tv-base-neutral); display: grid; place-items: center;
  font-family: var(--type-heading-s-family); font-size: 24px; }
.c-gkb__k--on { background: var(--tv-base-light); color: var(--tv-base-dark); }
.c-gkb__a { position: absolute; height: 72px; box-sizing: border-box; border-radius: 12px;
  display: grid; place-items: center; font-family: var(--type-body-l-family); font-size: 24px; }
.c-gkb__a--skip { background: var(--tv-button-secondary);
  border: 1px solid var(--tv-border-white-20); }
.c-gkb__a--go { background: var(--gradient-tv-button-primary);
  border: 1px solid var(--tv-button-primary-solid); }
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
    'Every label is <strong>lower case in the file and renders in capitals</strong> — <code>textCase: UPPER</code> on the node, not in the text style. The same trick the Attempts Box uses.',
    'Green is <code>TV/Status/Success</code> with a <code>Game UI/Green 1</code> edge, blue is <code>TV/Status/Wait</code> with a <code>Primary Solid</code> edge. So found and not-yet-found are the same two gradients the rest of the game layer uses for success and waiting.',
  ],
};

export const CardSharksQuestion: ComponentModule = {
  id: 'c-card-sharks-question', title: 'Card Sharks Question', group: 'Game', figma: '3752:30765',
  description: '418 × 398 — the timer panel stacked on the Higher/Lower panel, which is how the question is actually posed.',
  tokens: { colour: ['TV/Transparent/Dark 80', 'TV/Border/White 20', 'TV/Base/Neutral'], type: [] },
  variants: [
    { label: 'Default', el: () => h(`<div style="display:flex;flex-direction:column;gap:16px;width:418px">
        <div class="c-gpanel" style="height:86px;padding:24px 40px"></div>
        <div class="c-hlpanel">
          <div class="c-hlpanel__btn"><span class="c-dkey c-dkey--up">${icon('Play', 44)}</span><span>Higher</span></div>
          <div class="c-hlpanel__btn"><span class="c-dkey c-dkey--down">${icon('Play', 44)}</span><span>lower</span></div>
        </div></div>`) },
  ],
  notes: [
    'It is <strong>an assembly, not a new drawing</strong>: a <code>Score Box</code> in its Timer variant over the <code>Higher/Lower</code> panel, on a 16 gap. Both are already in this catalog on their own.',
    'The second variant, <code>with Card</code>, adds the playing card. Not drawn here — the card art is a separate asset this rebuild does not have.',
  ],
};

/**
 * The six in-game layouts, keyed off the measured positions rather than a grid:
 * the file does not align them to one another, and the gaps differ per layout.
 */
type GKey = [x: number, y: number, w: number, h: number, label: string, on?: 1];
const GKB: Record<string, { w: number; h: number; keys: GKey[]; acts: GKey[] }> = {
  'Default': { w: 848, h: 384, keys: [
    ...[...'QWERTYUIOP'].map((c, i) => [68 + i * 72, 40, 64, 64, c] as GKey),
    ...[...'ASDFGHJKLZ'].map((c, i) => [68 + i * 72, 112, 64, 64, c] as GKey),
    ...[...'XCVBNM'].map((c, i) => [104 + i * 72, 184, 64, 64, c] as GKey),
  ], acts: [[74, 272, 278, 72, 'Skip'], [496, 272, 278, 72, 'Submit Answer', 1]] },

  'Letters with Digit': { w: 1010, h: 384, keys: [
    ...[...'QWERTYUIOP'].map((c, i) => [40 + i * 72, 40, 64, 64, c] as GKey),
    ...[...'123'].map((c, i) => [763 + i * 71, 40, 64, 64, c] as GKey),
    ...[...'ASDFGHJKLZ'].map((c, i) => [41 + i * 72, 112, 64, 64, c] as GKey),
    ...[...'456'].map((c, i) => [762 + i * 72, 112, 64, 64, c] as GKey),
    ...[...'XCVBNM'].map((c, i) => [76 + i * 72, 184, 64, 64, c] as GKey),
    ...[...'978'].map((c, i) => [762 + i * 72, 184, 64, 64, c] as GKey),
  ], acts: [[155, 272, 278, 72, 'Skip'], [577, 272, 278, 72, 'Submit Answer', 1]] },

  'Numeric': { w: 700, h: 312, keys: [
    ...[...'12345'].map((c, i) => [92 + i * 105, 40, 97, 64, c] as GKey),
    ...[...'67890'].map((c, i) => [40 + i * 105, 112, 97, 64, c] as GKey),
  ], acts: [[40, 200, 298, 72, 'Skip Question'], [362, 200, 298, 72, 'Submit Answer', 1]] },

  'Multiselect': { w: 700, h: 240, keys: [
    ['A', 0], ['B', 1], ['C', 2], ['D', 3],
  ].map(([c, i]) => [40 + (i as number) * 157, 40, 149, 64, c as string, (i === 2 ? 1 : undefined)] as GKey),
    acts: [[40, 128, 298, 72, 'Skip'], [362, 128, 298, 72, 'Submit Answer']] },

  'Coordinate Input': { w: 700, h: 312, keys: [
    ...[...'ABCD'].map((c, i) => [40 + i * 157, 40, 149, 64, c] as GKey),
    ...[...'1234'].map((c, i) => [40 + i * 157, 112, 149, 64, c] as GKey),
  ], acts: [[40, 200, 298, 72, 'Skip Question'], [362, 200, 298, 72, 'Submit Answer', 1]] },

  'Voice': { w: 780, h: 384, keys: [],
    acts: [[40, 272, 278, 72, 'Skip'], [462, 272, 278, 72, 'Submit Answer']] },
};

const gameKeyboard = (type: keyof typeof GKB) => {
  const L = GKB[type];
  const key = ([x, y, w, ht, label, on]: GKey, cls: string) =>
    `<span class="${cls}${on ? (cls === 'c-gkb__a' ? ' c-gkb__a--go' : ' c-gkb__k--on') : (cls === 'c-gkb__a' ? ' c-gkb__a--skip' : '')}"
       style="left:${x}px;top:${y}px;width:${w}px;height:${ht}px">${label}</span>`;
  return h(`<div class="c-gkb" style="width:${L.w}px;height:${L.h}px">
      ${L.keys.map((k) => key(k, 'c-gkb__k')).join('')}
      ${L.acts.map((k) => key(k, 'c-gkb__a')).join('')}
      ${type === 'Voice'
        ? `<div class="c-kb__mic" style="position:absolute;left:309px;top:40px">
             <span class="c-kb__halo"><span><span>${icon('Mic', 44)}</span></span></span>
             <span class="c-kb__lt"><b>Listening...</b><i>Speak now</i></span></div>`
        : ''}
    </div>`);
};

export const GameKeyboard: ComponentModule = {
  id: 'c-game-keyboard', title: 'Keyboard (game)', group: 'Game', figma: '2565:2733',
  description: 'The in-game input panel, in six shapes — one per way a game can ask for an answer. Every layout ends in Skip and Submit Answer.',
  tokens: {
    colour: ['TV/Transparent/Dark 80', 'TV/Border/White 20', 'TV/Base/Neutral', 'TV/Base/Light', 'TV/Button/Secondary', 'TV/Button/Primary'],
    type: ['Heading/S', 'Body/L'],
  },
  wide: true,
  variants: (['Default', 'Letters with Digit', 'Numeric', 'Multiselect', 'Coordinate Input', 'Voice'] as const)
    .map((t) => ({ label: t, el: () => gameKeyboard(t) })),
  notes: [
    '<strong>It is a different keyboard from <code>Email Keyboard</code> entirely</strong> — a dark panel at <code>Transparent/Dark 80</code> radius 24 with 64 × 64 keys at radius 8, against the <code>Base/Neutral</code> slab with 95 × 90 square keys. Two components called keyboard, sharing nothing.',
    'Its letters are <strong>QWERTY</strong> while the Email Keyboard is <strong>alphabetical</strong>. Same product, two orders.',
    '<strong>The rows do not align to one grid.</strong> <code>Default</code> starts its top row at x = 68 and <code>Letters with Digit</code> at 40; the second row of the latter starts at 41, one pixel off its own first row. Measured positions, kept as they are.',
    'Its six kinds nearly match the six <code>Game Type Tags</code> — but the keyboard has <em>Coordinate Input</em> and <em>Multiselect</em> and no up/down or time-limited. Two lists of six that do not match.',
    '<code>Submit Answer</code> is the primary gradient on four layouts and a plain white button on <code>Multiselect</code> and <code>Voice</code>. <strong>Worth reconciling.</strong>',
  ],
};

export const RewardUnlockedContainer: ComponentModule = {
  id: 'c-reward-unlocked', title: 'Container — Reward unlocked', group: 'Identity', figma: '11643:39611',
  description: '1100 × 684 — the popup that celebrates a claimed reward: the heading, the art, and the button that dismisses it.',
  tokens: { colour: ['TV/Base/Light', 'TV/Button/Primary', 'TV/Button/Primary Solid'], type: ['Display/L'] },
  wide: true,
  variants: [
    { label: 'Reward unlocked!', el: () => h(`<div class="c-rwpop">
        <span class="c-rwpop__h">Reward unlocked!</span>
        <img class="c-rwpop__art" src="assets/components/frame-gold.png" alt="" width="281" height="281">
        <span class="c-rwpop__name">
          <img src="assets/components/star-gold.png" alt="" width="44" height="44">
          Gold Wings
          <img src="assets/components/star-gold.png" alt="" width="44" height="44"></span>
        <span class="c-btn c-btn--primary is-focus" style="width:240px">Awesome!</span></div>`) },
  ],
  notes: [
    '<strong><code>Container</code> is not a name.</strong> It is the popup that celebrates a claimed reward — the moment the whole Spotlight loop is built around — and it is called the same thing as every anonymous wrapper frame in the file. <strong>Worth renaming.</strong>',
    'The button says <strong><em>Awesome!</em></strong>, not <em>Claim</em>. Worth noting against the glossary, which has the player <em>claim</em> an unlocked reward in a deliberate action — the word the product uses for the act is not the word on the button that performs it.',
    'The heading is <strong>left-aligned at 40/40</strong> while everything under it is centred. The art is the Gold Wings frame at 281, and the reward\'s name sits between two gold stars.',
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
