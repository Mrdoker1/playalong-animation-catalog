import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { injectStyle } from '../../lib/injectStyle';
import { SI, SI_BASE_CSS } from './shared';

const CSS = `
.preview-si-results { width: 600px; height: 330px; }
.preview-si-results__screen { position: absolute; inset: 0; opacity: 0; }
.preview-si-results__head {
  position: absolute; top: 12px; width: 180px; text-align: center;
  font-weight: 700; font-size: 14px; color: #c3e1ff; text-shadow: 0 2px 4px #070d3a;
}
.preview-si-results__cell {
  position: absolute; width: 180px; height: 32px; box-sizing: border-box;
  display: flex; align-items: center; justify-content: center;
  border-radius: 999px;
  font-weight: 600; font-size: 11px; letter-spacing: .02em; text-transform: uppercase; color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.45);
}
.preview-si-results__cell.su,
.preview-si-results__cell.key { background: rgba(30,44,140,0.75); }
.preview-si-results__cell.su { border: 3px solid transparent; }
.preview-si-results__cell.su.match { border-color: ${SI.win}; box-shadow: 0 0 10px #7bff3c88, inset 0 0 6px #7bff3c55; }
.preview-si-results__cell.su.miss  { border-color: ${SI.miss}; box-shadow: 0 0 10px #ff2a2a88, inset 0 0 6px #ff2a2a55; }
.preview-si-results__cell.mine { background: ${SI.mine}; border: 4px solid #fff; }
.preview-si-results__cell.mine.hide  { opacity: 0; transform: translateX(20px); }
.preview-si-results__cell.mine.match { border-color: ${SI.win}; box-shadow: 0 0 10px #7bff3c66; }
.preview-si-results__cell.mine.miss  { border-color: ${SI.miss}; box-shadow: 0 0 10px #ff2a2a66; }
.preview-si-results__count {
  position: absolute; left: 50%; top: 298px; transform: translateX(-50%);
  font-weight: 700; font-size: 15px; letter-spacing: .02em; text-transform: uppercase; color: #fff;
  white-space: nowrap; opacity: 0;
}
.preview-si-results__count b { color: #f2c230; }
`;

const KEY  = ['Guitar', 'Piano/Keyboard', 'Violin/Fiddle', 'Trumpet', 'Harp', 'Bagpipes'];
const SU   = ['Piano/Keyboard', 'Guitar', 'Violin/Fiddle', 'Trumpet', 'Bagpipes', 'Harp'];
const MINE = ['Guitar', 'Piano/Keyboard', 'Trumpet', 'Violin/Fiddle', 'Harp', 'Bagpipes'];
const COLS = { su: 16, key: 210, mine: 404 };
const rowTop = (r: number) => 44 + r * 41;

// Base timings from the prototype (ms). Everything scales with Duration / 350.
const T = { screenFade: 500, suStart: 500, mineStart: 700, stagger: 350, step: 350, countFade: 400 };

let screen: HTMLElement | null = null;
let suEls: HTMLElement[] = [];
let mineEls: HTMLElement[] = [];
let count: HTMLElement | null = null;
let timers: number[] = [];

function clearTimers() { timers.forEach(clearTimeout); timers = []; }

function frameRows(slot: HTMLElement, opts: { screen: number; su: number; mine: number; count: boolean }) {
  const pill = (bg: string, border: string, text: string, extra = '') => `
    <div style="height:12px;border-radius:999px;background:${bg};border:${border};box-sizing:border-box;
      font:600 6px ${SI.font};color:#fff;display:flex;align-items:center;justify-content:center;text-transform:uppercase;${extra}">${text}</div>`;
  const rows = [0, 1, 2].map((r) => {
    const suBorder = r < opts.su ? `1.5px solid ${SU[r] === KEY[r] ? SI.win : SI.miss}` : '1.5px solid transparent';
    const shown = r < opts.mine;
    const mineBorder = shown ? `1.5px solid ${MINE[r] === KEY[r] ? SI.win : SI.miss}` : '1.5px solid #fff';
    return `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;">
      ${pill('rgba(30,44,140,0.75)', suBorder, SU[r])}
      ${pill('rgba(30,44,140,0.75)', '1.5px solid transparent', KEY[r])}
      ${pill(SI.mine, mineBorder, MINE[r], shown ? '' : 'opacity:0;transform:translateX(6px);')}
    </div>`;
  }).join('');
  slot.innerHTML = `
    <div style="width:170px;display:flex;flex-direction:column;gap:3px;opacity:${opts.screen};">
      ${rows}
      <div style="font:700 7px ${SI.font};color:#fff;text-align:center;text-transform:uppercase;opacity:${opts.count ? 1 : 0};">
        <b style="color:#f2c230">4 of 6</b> in the right spot</div>
    </div>`;
}

export const ResultsReveal: AnimationModule = {
  id: 'si-results-reveal',
  title: 'Results Reveal',
  game: 'Stack It',
  description:
    'At 0:00 the results screen fades in with three columns: Su’s stack, the correct stack and the player’s stack. Row by row, top to bottom, Su’s answers get a green (right slot) or red (wrong slot) ring, and the player’s blocks slide in from the right with their own green/red ring. The "N of 6 in the right spot" line fades in last.',
  defaults: { duration: 350, easingId: 'ease' },
  slowFactor: 3,
  frames: [
    { label: 'Fade in',   sublabel: '0–500 ms · screen opacity 0 → 1',      render: (s) => frameRows(s, { screen: 0.5, su: 0, mine: 0, count: false }) },
    { label: 'Row 1',     sublabel: '500 ms Su ring · 700 ms yours slides', render: (s) => frameRows(s, { screen: 1, su: 1, mine: 1, count: false }) },
    { label: 'Cascade',   sublabel: '+350 ms per row',                      render: (s) => frameRows(s, { screen: 1, su: 3, mine: 2, count: false }) },
    { label: 'Count',     sublabel: '2800 ms · score line fades in',        render: (s) => frameRows(s, { screen: 1, su: 3, mine: 3, count: true }) },
  ],

  render(stage) {
    injectStyle('css-si-base', SI_BASE_CSS);
    injectStyle('css-si-results', CSS);
    const cells = (cls: string, x: number, data: string[]) =>
      data.map((t, r) => `<div class="preview-si-results__cell ${cls}" style="left:${x}px;top:${rowTop(r)}px">${t}</div>`).join('');
    stage.innerHTML = `
      <div class="preview-si-board preview-si-results">
        <div class="preview-si-results__screen">
          <div class="preview-si-results__head" style="left:${COLS.su}px">SU’S STACK</div>
          <div class="preview-si-results__head" style="left:${COLS.key}px">CORRECT STACK</div>
          <div class="preview-si-results__head" style="left:${COLS.mine}px">YOUR STACK</div>
          ${cells('su', COLS.su, SU)}
          ${cells('key', COLS.key, KEY)}
          ${cells('mine hide', COLS.mine, MINE)}
          <div class="preview-si-results__count"><b>4 of 6</b> in the right spot</div>
        </div>
      </div>
    `;
    screen = stage.querySelector('.preview-si-results__screen');
    suEls = Array.from(stage.querySelectorAll<HTMLElement>('.preview-si-results__cell.su'));
    mineEls = Array.from(stage.querySelectorAll<HTMLElement>('.preview-si-results__cell.mine'));
    count = stage.querySelector('.preview-si-results__count');
    return () => { clearTimers(); stage.innerHTML = ''; screen = null; suEls = []; mineEls = []; count = null; };
  },

  play({ duration, easing }) {
    if (!screen || !count) return;
    clearTimers();
    const ez = bezierToCss(easing.bezier);
    const k = duration / T.step;
    const ms = (v: number) => Math.round(v * k);

    const all = [screen, count, ...suEls, ...mineEls];
    all.forEach((el) => { el.style.transition = 'none'; });
    screen.style.opacity = '0';
    count.style.opacity = '0';
    suEls.forEach((el) => el.classList.remove('match', 'miss'));
    mineEls.forEach((el) => { el.classList.remove('match', 'miss'); el.classList.add('hide'); });
    void screen.offsetWidth;

    screen.style.transition = `opacity ${ms(T.screenFade)}ms ${ez}`;
    count.style.transition = `opacity ${ms(T.countFade)}ms ${ez}`;
    suEls.forEach((el) => { el.style.transition = `border-color ${duration}ms ${ez}, box-shadow ${duration}ms ${ez}`; });
    mineEls.forEach((el) => {
      el.style.transition = ['opacity', 'transform', 'border-color', 'box-shadow'].map((p) => `${p} ${duration}ms ${ez}`).join(', ');
    });
    screen.style.opacity = '1';

    suEls.forEach((el, r) => timers.push(window.setTimeout(() => {
      el.classList.add(SU[r] === KEY[r] ? 'match' : 'miss');
    }, ms(T.suStart + r * T.stagger))));
    mineEls.forEach((el, r) => timers.push(window.setTimeout(() => {
      el.classList.remove('hide');
      el.classList.add(MINE[r] === KEY[r] ? 'match' : 'miss');
    }, ms(T.mineStart + r * T.stagger))));
    timers.push(window.setTimeout(() => { if (count) count.style.opacity = '1'; }, ms(T.mineStart + 6 * T.stagger)));
  },

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const ez = bezierToCss(easing.bezier);
    const k = duration / T.step;
    const ms = (v: number) => Math.round(v * k);
    const sec = (v: number) => (ms(v) / 1000).toFixed(2);
    return {
      web: `/* StackItResults.css */
.si-screen        { opacity: 0; transition: opacity ${ms(T.screenFade)}ms ${ez}; pointer-events: none; }
.si-screen--show  { opacity: 1; pointer-events: auto; }

.si-su            { border: .5cqw solid transparent; border-radius: 999px;
                    transition: border-color ${duration}ms ${ez}, box-shadow ${duration}ms ${ez}; }
.si-su--match     { border-color: ${SI.win};  box-shadow: 0 0 1cqw #7bff3c88, inset 0 0 .6cqw #7bff3c55; }
.si-su--miss      { border-color: ${SI.miss}; box-shadow: 0 0 1cqw #ff2a2a88, inset 0 0 .6cqw #ff2a2a55; }

.si-mine          { background: ${SI.mine}; border: .63cqw solid #fff; border-radius: 999px;
                    transition: opacity ${duration}ms ${ez}, transform ${duration}ms ${ez}, border-color ${duration}ms ${ez}; }
.si-mine--hide    { opacity: 0; transform: translateX(2cqw); }
.si-mine--match   { border-color: ${SI.win};  box-shadow: 0 0 1cqw #7bff3c66; }
.si-mine--miss    { border-color: ${SI.miss}; box-shadow: 0 0 1cqw #ff2a2a66; }

.si-count         { opacity: 0; transition: opacity ${ms(T.countFade)}ms ${ez}; }
.si-count--on     { opacity: 1; }

// StackItResults.ts — staggered reveal
screen.classList.add('si-screen--show');
for (let r = 0; r < 6; r++) {
  later(() => su[r].classList.add(suStack[r] === key[r] ? 'si-su--match' : 'si-su--miss'), ${ms(T.suStart)} + r * ${ms(T.stagger)});
  later(() => {
    mine[r].classList.remove('si-mine--hide');
    if (yours[r]) mine[r].classList.add(yours[r] === key[r] ? 'si-mine--match' : 'si-mine--miss');
  }, ${ms(T.mineStart)} + r * ${ms(T.stagger)});
}
later(() => count.classList.add('si-count--on'), ${ms(T.mineStart + 6 * T.stagger)});
later(showRoundComplete, ${ms(T.mineStart + 6 * T.stagger)} + 3000);`,
      android: `// Jetpack Compose — Android TV
@Composable
fun ResultsReveal(su: List<String>, key: List<String>, yours: List<String?>, onDone: () -> Unit) {
    val ez = CubicBezierEasing(${b1}f, ${b2}f, ${b3}f, ${b4}f)
    var step by remember { mutableIntStateOf(-1) }   // ms elapsed bucket
    LaunchedEffect(Unit) {
        val start = withFrameMillis { it }
        while (true) {
            step = (withFrameMillis { it } - start).toInt()
            if (step > ${ms(T.mineStart + 6 * T.stagger)} + 3000) { onDone(); break }
        }
    }
    val screenAlpha by animateFloatAsState(if (step >= 0) 1f else 0f, tween(${ms(T.screenFade)}, easing = ez), label = "screen")
    Box(Modifier.alpha(screenAlpha)) {
        repeat(6) { r ->
            val suOn = step >= ${ms(T.suStart)} + r * ${ms(T.stagger)}
            val mineOn = step >= ${ms(T.mineStart)} + r * ${ms(T.stagger)}
            val suRing by animateColorAsState(
                when { !suOn -> Color.Transparent; su[r] == key[r] -> Color(0xFF7BFF3C); else -> Color(0xFFFF2A2A) },
                tween(${duration}, easing = ez), label = "su$r")
            val mineAlpha by animateFloatAsState(if (mineOn) 1f else 0f, tween(${duration}, easing = ez), label = "ma$r")
            val mineDx by animateDpAsState(if (mineOn) 0.dp else 24.dp, tween(${duration}, easing = ez), label = "mx$r")
            ResultRow(r, suRing, mineAlpha, mineDx, su[r], key[r], yours[r])
        }
        val countOn = step >= ${ms(T.mineStart + 6 * T.stagger)}
        val countAlpha by animateFloatAsState(if (countOn) 1f else 0f, tween(${ms(T.countFade)}), label = "count")
        CountLine(Modifier.alpha(countAlpha))
    }
}`,
      ios: `// SwiftUI — tvOS
struct ResultsReveal: View {
    let su: [String], key: [String], yours: [String?]
    @State private var shown = false
    @State private var suRows = 0
    @State private var mineRows = 0
    @State private var countOn = false
    private let curve = Animation.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${sec(T.step)})

    var body: some View {
        ResultsGrid(su: su, key: key, yours: yours, suRows: suRows, mineRows: mineRows, countOn: countOn)
            .opacity(shown ? 1 : 0)
            .task {
                withAnimation(.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${sec(T.screenFade)})) { shown = true }
                for r in 0..<6 {
                    after(${sec(T.suStart)} + Double(r) * ${sec(T.stagger)}) { withAnimation(curve) { suRows = r + 1 } }
                    after(${sec(T.mineStart)} + Double(r) * ${sec(T.stagger)}) { withAnimation(curve) { mineRows = r + 1 } }
                }
                after(${sec(T.mineStart + 6 * T.stagger)}) { withAnimation(.easeInOut(duration: ${sec(T.countFade)})) { countOn = true } }
            }
    }
    private func after(_ s: Double, _ f: @escaping () -> Void) {
        DispatchQueue.main.asyncAfter(deadline: .now() + s, execute: f)
    }
}
// In ResultsGrid: mine row r → .opacity(r < mineRows ? 1 : 0).offset(x: r < mineRows ? 0 : 24)
//                 su row r   → ring colour green/red when r < suRows, clear otherwise.`,
      roku: `' Roku SceneGraph — StackItResults.brs
' Build one Animation per row; set its delay so rows cascade.
sub revealResults()
  m.top.findNode("screenFade").control = "start"     ' opacity 0 → 1, ${sec(T.screenFade)} s
  for r = 0 to 5
    su = m.suRows[r]
    su.findNode("ring").blendColor = iifColor(m.su[r] = m.key[r])
    suAnim = fadeAnim(su.findNode("ring"), ${sec(T.step)})
    suAnim.delay = ${sec(T.suStart)} + r * ${sec(T.stagger)}
    suAnim.control = "start"

    mine = m.mineRows[r]
    mine.findNode("ring").blendColor = iifColor(m.yours[r] = m.key[r])
    mineAnim = slideFadeAnim(mine, 24, ${sec(T.step)})   ' translation x +24 → 0, opacity 0 → 1
    mineAnim.delay = ${sec(T.mineStart)} + r * ${sec(T.stagger)}
    mineAnim.control = "start"
  end for
  countAnim = fadeAnim(m.top.findNode("count"), ${sec(T.countFade)})
  countAnim.delay = ${sec(T.mineStart + 6 * T.stagger)}
  countAnim.control = "start"
end sub

function iifColor(ok as boolean) as string
  if ok then return "0x7BFF3CFF"
  return "0xFF2A2AFF"
end function`,
    };
  },

  pmTicket() {
    return `Title: Stack It — Results screen staggered reveal

Trigger: round timer reaches 0:00 (or the host presses "End timer").

Visual behavior:
  · The results screen cross-fades over the game screen.
  · Three columns: SU’S STACK (left), CORRECT STACK (centre, static), YOUR STACK (right).
  · Row by row, top to bottom: Su’s answer gets a green ring (#7BFF3C, right slot) or red ring (#FF2A2A, wrong slot).
  · 200 ms after Su’s ring, the player’s block in the same row slides in from the right (+2 cqw → 0) while fading in, with its own green/red ring. Empty slots show "—" without a ring.
  · After the last row, "N of 6 in the right spot" fades in at the bottom (N in yellow #F2C230).
  · 3 s later the Round Complete screen appears automatically; OK skips ahead.

Timings:
  · Screen fade: 500 ms. Rings and block slide-in: 350 ms each.
  · Su row r: 500 + 350·r ms. Your row r: 700 + 350·r ms.
  · Count line: at 2800 ms, 400 ms fade. Auto-advance: 5800 ms.

Acceptance criteria:
  · Scoring is final before the reveal starts — animation is presentational only.
  · OK during the reveal jumps straight to Round Complete (no half-revealed state lingers).
  · Reduced-motion setting: all rows appear at once with their rings.`;
  },
};
