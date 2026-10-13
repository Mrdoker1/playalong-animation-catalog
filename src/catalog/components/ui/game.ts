import { injectStyle } from '../../../lib/injectStyle';
import type { ComponentModule } from '../types';

const h = (html: string): HTMLElement => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild as HTMLElement;
};
const T = (n: string) =>
  `font-family:var(--type-${n}-family);font-weight:var(--type-${n}-weight);font-size:var(--type-${n}-size);line-height:var(--type-${n}-line);letter-spacing:var(--type-${n}-tracking);text-transform:var(--type-${n}-case)`;

injectStyle('css-c-game', `
/* A game panel: the dark-80 slab every readout sits on */
.c-panel { box-sizing: border-box; border-radius: 24px; background: var(--tv-transparent-dark-80);
  border: 1px solid var(--tv-border-white-20); display: flex; align-items: center; }

/* Box Content — the readout inside a Score or Status box */
.c-boxc { display: flex; align-items: center; gap: 16px; height: 38px; }
.c-boxc__n { ${T('game-m')}; color: var(--tv-game-ui-yellow); white-space: nowrap; }
.c-boxc__word { ${T('game-s')}; color: var(--tv-base-light); white-space: nowrap; }
/* The question counter binds no text style in Figma: raw 32 and 40, Roboto
   Condensed like the rest of the game layer. Reproduced rather than snapped to
   Game/S and Game/M, which are 32/38 and 40/38 — close but not the same. */
.c-boxc__q { font-family: var(--type-game-s-family); font-weight: var(--type-game-s-weight);
  font-size: 32px; line-height: 38px; text-transform: uppercase; color: var(--tv-base-light);
  white-space: nowrap; }
.c-boxc__of { font-family: var(--type-game-m-family); font-weight: var(--type-game-m-weight);
  font-size: 40px; line-height: 38px; text-transform: uppercase;
  color: var(--tv-game-ui-yellow); white-space: nowrap; }
.c-boxc__bar { height: 16px; border-radius: 12px; background: var(--tv-button-secondary);
  overflow: hidden; display: block; flex: none; }
/* display:block matters: the fill is a span, and height:100% does nothing on an
   inline box — which is why the bar looked empty. */
.c-boxc__fill { display: block; height: 100%; background: var(--gradient-tv-button-primary); }
.c-boxc__fill--out { background: var(--gradient-tv-status-failure); }

/* Score Box */
.c-scorebox { width: 364px; height: 86px; padding: 24px 40px; justify-content: center; }
.c-strikes { display: flex; gap: 24px; }

/* Status Box */
.c-statusbox { width: 1704px; height: 122px; padding: 0 40px; gap: 32px;
  justify-content: space-between; }
.c-statusbox__side { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
.c-statusbox__banner { flex: 1; height: 122px; display: grid; place-items: center;
  ${T('game-l')}; color: var(--tv-base-light); }
.c-statusbox__banner--complete { background: var(--gradient-tv-status-round-complete); }
.c-statusbox__banner--win  { background: var(--gradient-tv-status-you-win); }
.c-statusbox__banner--lose { background: var(--gradient-tv-status-you-lose); }

/* Keys — the remote keys drawn on screen. The skirt that makes them read as
   keycaps is an INNER shadow with no blur, offset 0 -6: a hard 6px band of
   #00000040 along the bottom inside edge. */
.c-key { width: 64px; height: 64px; flex: none; border-radius: 8px;
  background: var(--tv-base-light); box-shadow: inset 0 -6px 0 #00000040;
  display: grid; place-items: center; ${T('heading-l')}; color: var(--tv-base-black); }
.c-key__tri { width: 25px; height: 30px; display: block; color: var(--tv-base-dark);
  margin-bottom: 4px; }

/* Higher / Lower Button */
.c-hl { width: 338px; height: 100px; box-sizing: border-box; border-radius: 12px;
  display: flex; align-items: center; gap: 24px; padding: 20px 32px;
  background: var(--tv-base-neutral); border: 1px solid var(--tv-border-white-20);
  ${T('game-m')}; color: var(--tv-base-light); }
.c-hl--focus     { background: var(--gradient-tv-button-primary); }
.c-hl--correct   { background: var(--gradient-tv-status-success); }
.c-hl--incorrect { background: var(--gradient-tv-status-failure); }

/* Card Box */
.c-cardbox { width: 310px; height: 398px; padding: 40px; justify-content: center; }
.c-cardbox__card { width: 230px; height: 318px; border-radius: 12px; background: var(--tv-base-light);
  border: 1px solid #000; position: relative; }
.c-cardbox__pip { position: absolute; left: 14px; top: 10px; ${T('display-m')};
  color: #000; line-height: 1; }
.c-cardbox__pip--b { left: auto; top: auto; right: 14px; bottom: 10px; transform: rotate(180deg); }

/* Answer Option */
.c-ao { width: 552px; height: 76px; box-sizing: border-box; border-radius: 12px;
  display: flex; align-items: center; gap: 24px; padding: 0 32px;
  border: 2px solid var(--tv-border-white-20); background: var(--tv-button-secondary);
  ${T('game-s')}; color: var(--tv-base-light); }
.c-ao--green { background: var(--gradient-tv-status-success); border-color: var(--tv-game-ui-green-1); }
.c-ao--blue  { background: var(--gradient-tv-status-wait);    border-color: var(--tv-button-primary-solid); }
.c-ao--red   { background: var(--gradient-tv-status-failure); border-color: var(--tv-game-ui-red-2); }
.c-ao__n, .c-ao__score { ${T('game-m')}; }
.c-ao__rule { width: 2px; align-self: stretch; background: var(--tv-button-secondary); }
.c-ao__text { flex: 1; }

/* Video Player Buttons — the glyph is a filled white disc with the shape
   knocked out of it, not a bare triangle on the ground. */
.c-vpb { display: flex; align-items: center; gap: 16px; padding: 4px 0; }
.c-vpb__glyph { width: 88px; height: 88px; flex: none; border-radius: 50%;
  background: var(--tv-base-light); display: grid; place-items: center; }
.c-vpb__play { width: 0; height: 0; margin-left: 6px;
  border-left: 30px solid var(--tv-base-dark);
  border-top: 18px solid transparent; border-bottom: 18px solid transparent; }
.c-vpb__pause { display: flex; gap: 9px; }
.c-vpb__pause span { width: 11px; height: 36px; border-radius: 3px;
  background: var(--tv-base-dark); }
`);

/** Track and fill are both PIXEL widths in Figma, not a percentage. */
const bar = (track: number, fill: number, out = false) =>
  `<span class="c-boxc__bar" style="width:${track}px"><span class="c-boxc__fill${
    out ? ' c-boxc__fill--out' : ''}" style="width:${fill}px"></span></span>`;

export const BoxContent: ComponentModule = {
  id: 'c-box-content', title: 'Box Content', group: 'Game', figma: '3608:15061',
  description: 'The readout inside a Score or Status box: a timer with its bar, or the question counter. 38 high.',
  tokens: { colour: ['TV/Base/Light', 'TV/Button/Primary', 'TV/Button/Secondary', 'TV/Game UI/Yellow', 'TV/Status/Failure'], type: ['Game/M'] },
  notes: [
    'The <strong>Question Text</strong> readout binds no text style in Figma — it is a loose 32 and 40. Everything else in this component is on Game/M.',
  ],
  variants: [
    { label: 'Question Timer', el: () => h(`<div class="c-boxc"><span class="c-boxc__n">32s</span>${bar(205, 155)}</div>`) },
    { label: "Time's Up", el: () => h(`<div class="c-boxc"><span class="c-boxc__n">3s</span>${bar(225, 40, true)}</div>`) },
    { label: 'Question Text', el: () => h(`<div class="c-boxc"><span class="c-boxc__q">Question</span><span class="c-boxc__of">1/3</span></div>`) },
  ],
};

export const ScoreBox: ComponentModule = {
  id: 'c-score-box', title: 'Score Box', group: 'Game', figma: '2565:2735',
  description: '364 × 86 on the dark-80 slab, radius 24. Five readouts: the score, the timer with its bar, the time-up states, and three strikes.',
  tokens: { colour: ['TV/Base/Light', 'TV/Border/White 20', 'TV/Button/Primary', 'TV/Button/Secondary', 'TV/Game UI/Red 1', 'TV/Game UI/Yellow', 'TV/Status/Failure', 'TV/Transparent/Dark 80'], type: ['Game/M', 'Game/S'] },
  variants: [
    { label: 'Score', el: () => h(
      `<div class="c-panel c-scorebox"><div class="c-boxc">
        <span class="c-boxc__word">Score</span><span class="c-boxc__n">72</span></div></div>`) },
    { label: "Time's Up", el: () => h(
      `<div class="c-panel c-scorebox"><div class="c-boxc">
        <span class="c-boxc__word">Time\u2019s up!</span></div></div>`) },
    { label: 'Error Indicator', el: () => h(
      `<div class="c-panel c-scorebox"><div class="c-strikes">
        <span class="c-strike"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span><span class="c-strike"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span>
        <span class="c-strike c-strike--spent"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span></div></div>`) },
    { label: 'Timer — 155 of 205', el: () => h(
      `<div class="c-panel c-scorebox"><div class="c-boxc"><span class="c-boxc__n">32s</span>
        <span class="c-boxc__bar" style="width:205px"><span class="c-boxc__fill" style="width:155px"></span></span></div></div>`) },
    { label: "Timer · Time's Up — 40 of 225", el: () => h(
      `<div class="c-panel c-scorebox"><div class="c-boxc"><span class="c-boxc__n">3s</span>
        <span class="c-boxc__bar" style="width:225px"><span class="c-boxc__fill c-boxc__fill--out" style="width:40px"></span></span></div></div>`) },
  ],
  notes: [
    'The bar is a fixed <strong>pixel</strong> width in the file, and it differs between the two timer states — 205 with 155 filled, then 225 with 40. The track lengthens as the number shortens, so the readout keeps its overall width.',
    'The two timers use different fills: <code>TV/Button/Primary</code> while running, <code>TV/Status/Failure</code> when it is nearly out.',
  ],
};

const STATUS = [
  { k: 'complete', text: 'Round Complete!', left: ['Part 1 Score', '110/200'],
    right: ['continue to part 2 for more points'] },
  { k: 'win',  text: 'You Win!',  left: ['Part 2 Score', '110/200'], right: ['Total', '200/200'] },
  { k: 'lose', text: 'You Lose!', left: ['Part 2 Score', '110/200'], right: ['Total', '180/200'] },
];

// Only a score reads as a number. "continue to part 2 for more points" contains
// a digit and is not one — it is a sentence, and it is set like the labels.
const isScore = (t: string) => /^\d+\s*\/\s*\d+$/.test(t.trim());
const side = (parts: string[]) => parts.map((t) =>
  isScore(t) ? `<span class="c-boxc__n">${t}</span>`
             : `<span class="c-boxc__word">${t}</span>`).join('');

export const StatusBox: ComponentModule = {
  id: 'c-status-box', title: 'Status Box', group: 'Game', figma: '2565:2732',
  description: '1704 × 122 across the foot of the screen. The part score on the left, the outcome on a 707-wide gradient band in Game/L, and what it is worth on the right.',
  wide: true,
  tokens: { colour: ['TV/Base/Light', 'TV/Border/White 20', 'TV/Game UI/Yellow', 'TV/Status/Round Complete', 'TV/Status/You Lose!', 'TV/Status/You Win!', 'TV/Transparent/Dark 80'], type: ['Game/L', 'Game/M', 'Game/S'] },
  variants: STATUS.map((v) => ({
    label: v.text,
    el: () => h(`<div class="c-panel c-statusbox">
      <span class="c-statusbox__side">${side(v.left)}</span>
      <span class="c-statusbox__banner c-statusbox__banner--${v.k}">${v.text}</span>
      <span class="c-statusbox__side">${side(v.right)}</span></div>`),
  })),
  notes: [
    'The sides are not the same shape. <strong>Round Complete</strong> carries a sentence — <em>continue to part 2 for more points</em> — where the other two carry <em>Total</em> and a number.',
    'The three bands are glows that fade to nothing at both ends, and they run <strong>left to right</strong>. Until the token file learned to carry a gradient\'s direction they were drawn top to bottom here, and the two that resolved to nothing came out black.',
  ],
};

export const Keys: ComponentModule = {
  id: 'c-keys', title: 'Keys', group: 'Game', figma: '3750:15653',
  description: 'The remote keys drawn on screen: 64 × 64, radius 8, white, with a 6px shadow skirt along the bottom that makes them read as keycaps. Up, Down and Ok.',
  tokens: { colour: ['TV/Base/Black', 'TV/Base/Dark', 'TV/Base/Light'], type: ['Heading/L'] },
  notes: [
    'The skirt is an <strong>inner shadow with zero blur</strong> — <code>inset 0 -6px 0 #00000040</code> — not a second rectangle and not a border. It was a flat white square here until 2026-10-13.',
    'The arrows are filled triangles with rounded corners, drawn with a round line join rather than as a CSS border triangle, which cannot round.',
  ],
  variants: [
    { label: 'Up', el: () => h(`<span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 4 L22 26 L3 26 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>`) },
    { label: 'Down', el: () => h(`<span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 26 L3 4 L22 4 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>`) },
    { label: 'Ok', el: () => h(`<span class="c-key">Ok</span>`) },
  ],
};

export const HigherLowerButton: ComponentModule = {
  id: 'c-higher-lower-button', title: 'Higher/Lower Button', group: 'Game', figma: '3749:15334',
  description: '338 × 100 with a Key on the left and the label in Game/M. The outcome states swap the fill for a Status gradient.',
  tokens: { colour: ['TV/Base/Dark', 'TV/Base/Light', 'TV/Base/Neutral', 'TV/Border/White 20', 'TV/Button/Primary', 'TV/Status/Failure', 'TV/Status/Success'], type: ['Game/M'] },
  variants: [
    { label: 'Higher · Default', el: () => h(`<div class="c-hl"><span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 4 L22 26 L3 26 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>Higher</div>`) },
    { label: 'Higher · Focus', el: () => h(`<div class="c-hl c-hl--focus"><span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 4 L22 26 L3 26 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>Higher</div>`) },
    { label: 'Lower · Default', el: () => h(`<div class="c-hl"><span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 26 L3 4 L22 4 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>Lower</div>`) },
    { label: 'Correct', el: () => h(`<div class="c-hl c-hl--correct"><span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 4 L22 26 L3 26 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>Correct!</div>`) },
    { label: 'Incorrect', el: () => h(`<div class="c-hl c-hl--incorrect"><span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 26 L3 4 L22 4 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>Incorrect!</div>`) },
  ],
};

export const CardBox: ComponentModule = {
  id: 'c-card-box', title: 'Card Box', group: 'Game', figma: '3752:30723',
  description: '310 × 398 slab holding a 230 × 318 playing card. Card Sharks.',
  tokens: { colour: ['TV/Base/Light', 'TV/Border/White 20', 'TV/Transparent/Dark 80'], type: [] },
  variants: [
    { label: 'Card', el: () => h(
      `<div class="c-panel c-cardbox"><div class="c-cardbox__card">
        <span class="c-cardbox__pip">9♦</span><span class="c-cardbox__pip c-cardbox__pip--b">9♦</span>
      </div></div>`) },
  ],
};

export const AnswerOption: ComponentModule = {
  id: 'c-answer-option', title: 'Answer Option', group: 'Game', figma: '2565:2728',
  description: '552 × 76, radius 12, 2px edge. Rank, answer and score; the type decides the fill and the edge.',
  tokens: { colour: ['TV/Base/Light', 'TV/Border/White 20', 'TV/Button/Primary Solid', 'TV/Button/Secondary', 'TV/Game UI/Green 1', 'TV/Game UI/Red 2', 'TV/Status/Failure', 'TV/Status/Success', 'TV/Status/Wait'], type: ['Game/M', 'Game/S'] },
  variants: [
    { label: 'Green · scored', el: () => h(`<div class="c-ao c-ao--green"><span class="c-ao__n">1</span><span class="c-ao__rule"></span><span class="c-ao__text">Sleeping</span><span class="c-ao__score">24</span></div>`) },
    { label: 'Blue · waiting', el: () => h(`<div class="c-ao c-ao--blue"><span class="c-ao__n">5</span><span class="c-ao__rule"></span><span class="c-ao__text">Sleeping</span><span class="c-ao__score">33</span></div>`) },
    { label: 'Red · no score', el: () => h(`<div class="c-ao c-ao--red"><span class="c-ao__n">5</span><span class="c-ao__rule"></span><span class="c-ao__text">Sleeping</span><span class="c-ao__score">0</span></div>`) },
    { label: 'White · unrevealed', el: () => h(`<div class="c-ao"><span class="c-ao__text">foams</span></div>`) },
  ],
};

export const VideoPlayerButtons: ComponentModule = {
  id: 'c-video-player-buttons', title: 'Video Player Buttons', group: 'Content', figma: '5623:18110',
  description: 'The question transport: two 240 secondary buttons either side of an 88 white disc carrying a dark play or pause glyph.',
  tokens: { colour: ['TV/Base/Light', 'TV/Border/White 20', 'TV/Button/Secondary'], type: ['Body/L'] },
  notes: [
    'The buttons say <strong>Previous Question</strong> and <strong>Next Question</strong> — this moves through questions, not through video. They were labelled Rewind and Forward here, which was a guess from the component\'s name.',
    'In Figma the glyph is a single vector for Play and a boolean Subtract for Pause; both are a white disc with the shape cut out of it.',
  ],
  variants: [
    { label: 'Play', el: () => h(
      `<div class="c-vpb"><span class="c-btn c-btn--secondary">Previous Question</span>
        <span class="c-vpb__glyph"><span class="c-vpb__play"></span></span>
        <span class="c-btn c-btn--secondary">Next Question</span></div>`) },
    { label: 'Pause', el: () => h(
      `<div class="c-vpb"><span class="c-btn c-btn--secondary">Previous Question</span>
        <span class="c-vpb__glyph"><span class="c-vpb__pause"><span></span><span></span></span></span>
        <span class="c-btn c-btn--secondary">Next Question</span></div>`) },
  ],
};
