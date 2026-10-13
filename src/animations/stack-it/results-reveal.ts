import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { injectStyle } from '../../lib/injectStyle';
import { SI, SI_BASE_CSS } from './shared';

const CSS = `
.preview-si-results { width: 600px; height: 330px; }
.preview-si-results__screen { position: absolute; inset: 0; opacity: 0; }
.preview-si-results__show { position: absolute; left: 0; top: 0; width: 396px; height: 290px; opacity: .55; }
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
// Row r of YOUR STACK lands 200 ms after the show rings Su's row r (500 + 350·r).
const T = { screenFade: 500, mineStart: 700, stagger: 350, step: 350, countFade: 400 };

let screen: HTMLElement | null = null;
let mineEls: HTMLElement[] = [];
let count: HTMLElement | null = null;
let timers: number[] = [];

function clearTimers() { timers.forEach(clearTimeout); timers = []; }

function frameRows(slot: HTMLElement, opts: { screen: number; mine: number; count: boolean }) {
  const pill = (bg: string, border: string, text: string, extra = '') => `
    <div style="height:12px;border-radius:999px;background:${bg};border:${border};box-sizing:border-box;
      font:600 6px ${SI.font};color:#fff;display:flex;align-items:center;justify-content:center;text-transform:uppercase;${extra}">${text}</div>`;
  const rows = [0, 1, 2].map((r) => {
    const shown = r < opts.mine;
    const mineBorder = shown ? `1.5px solid ${MINE[r] === KEY[r] ? SI.win : SI.miss}` : '1.5px solid #fff';
    return `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;">
      ${pill('rgba(30,44,140,0.75)', '1.5px solid transparent', SU[r], 'opacity:.45;')}
      ${pill('rgba(30,44,140,0.75)', '1.5px solid transparent', KEY[r], 'opacity:.45;')}
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
    'At 0:00 the results screen fades in. Su’s stack and the correct stack are part of the show video (the show rings Su’s answers green / red itself), so only YOUR STACK is ours: row by row, top to bottom, the player’s blocks slide in from the right with a green (right slot) or red (wrong slot) ring. The "N of 6 in the right spot" line fades in last.',
  defaults: { duration: 350, easingId: 'ease' },
  slowFactor: 3,
  frames: [
    { label: 'Fade in', sublabel: '0–500 ms · screen opacity 0 → 1',       render: (s) => frameRows(s, { screen: 0.5, mine: 0, count: false }) },
    { label: 'Row 1',   sublabel: '700 ms · slide in + ring',              render: (s) => frameRows(s, { screen: 1, mine: 1, count: false }) },
    { label: 'Cascade', sublabel: '+350 ms per row',                       render: (s) => frameRows(s, { screen: 1, mine: 2, count: false }) },
    { label: 'Count',   sublabel: '2800 ms · score line fades in',         render: (s) => frameRows(s, { screen: 1, mine: 3, count: true }) },
  ],

  render(stage) {
    injectStyle('css-si-base', SI_BASE_CSS);
    injectStyle('css-si-results', CSS);
    const cells = (cls: string, x: number, data: string[]) =>
      data.map((t, r) => `<div class="preview-si-results__cell ${cls}" style="left:${x}px;top:${rowTop(r)}px">${t}</div>`).join('');
    stage.innerHTML = `
      <div class="preview-si-board preview-si-results">
        <div class="preview-si-results__screen">
          <div class="preview-si-results__show">
            <div class="preview-si-results__head" style="left:${COLS.su}px">SU’S STACK</div>
            <div class="preview-si-results__head" style="left:${COLS.key}px">CORRECT STACK</div>
            ${cells('su', COLS.su, SU)}
            ${cells('key', COLS.key, KEY)}
          </div>
          <div class="preview-si-results__head" style="left:${COLS.mine}px">YOUR STACK</div>
          ${cells('mine hide', COLS.mine, MINE)}
          <div class="preview-si-results__count"><b>4 of 6</b> in the right spot</div>
        </div>
      </div>
    `;
    screen = stage.querySelector('.preview-si-results__screen');
    mineEls = Array.from(stage.querySelectorAll<HTMLElement>('.preview-si-results__cell.mine'));
    count = stage.querySelector('.preview-si-results__count');
    return () => { clearTimers(); stage.innerHTML = ''; screen = null; mineEls = []; count = null; };
  },

  play({ duration, easing }) {
    if (!screen || !count) return;
    clearTimers();
    const ez = bezierToCss(easing.bezier);
    const k = duration / T.step;
    const ms = (v: number) => Math.round(v * k);

    [screen, count, ...mineEls].forEach((el) => { el.style.transition = 'none'; });
    screen.style.opacity = '0';
    count.style.opacity = '0';
    mineEls.forEach((el) => { el.classList.remove('match', 'miss'); el.classList.add('hide'); });
    void screen.offsetWidth;

    screen.style.transition = `opacity ${ms(T.screenFade)}ms ${ez}`;
    count.style.transition = `opacity ${ms(T.countFade)}ms ${ez}`;
    mineEls.forEach((el) => {
      el.style.transition = ['opacity', 'transform', 'border-color', 'box-shadow'].map((p) => `${p} ${duration}ms ${ez}`).join(', ');
    });
    screen.style.opacity = '1';

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
      web: `/* StackItResults.css — only YOUR STACK is ours; Su's column comes from the show video. */
.si-screen        { opacity: 0; transition: opacity ${ms(T.screenFade)}ms ${ez}; pointer-events: none; }
.si-screen--show  { opacity: 1; pointer-events: auto; }

.si-mine          { background: ${SI.mine}; border: .63cqw solid #fff; border-radius: 999px;
                    transition: opacity ${duration}ms ${ez}, transform ${duration}ms ${ez},
                                border-color ${duration}ms ${ez}, box-shadow ${duration}ms ${ez}; }
.si-mine--hide    { opacity: 0; transform: translateX(2cqw); }
.si-mine--match   { border-color: ${SI.win};  box-shadow: 0 0 1cqw #7bff3c66; }
.si-mine--miss    { border-color: ${SI.miss}; box-shadow: 0 0 1cqw #ff2a2a66; }

.si-count         { opacity: 0; transition: opacity ${ms(T.countFade)}ms ${ez}; }
.si-count--on     { opacity: 1; }

// StackItResults.ts — staggered reveal (synced to the show ringing Su's rows)
screen.classList.add('si-screen--show');
for (let r = 0; r < 6; r++) {
  later(() => {
    mine[r].classList.remove('si-mine--hide');
    if (yours[r]) mine[r].classList.add(yours[r] === key[r] ? 'si-mine--match' : 'si-mine--miss');
  }, ${ms(T.mineStart)} + r * ${ms(T.stagger)});
}
later(() => count.classList.add('si-count--on'), ${ms(T.mineStart + 6 * T.stagger)});
later(showRoundComplete, ${ms(T.mineStart + 6 * T.stagger)} + 3000);`,
      android: `// Jetpack Compose — Android TV
@Composable
fun YourStackReveal(key: List<String>, yours: List<String?>, onDone: () -> Unit) {
    val ez = CubicBezierEasing(${b1}f, ${b2}f, ${b3}f, ${b4}f)
    var elapsed by remember { mutableIntStateOf(-1) }
    LaunchedEffect(Unit) {
        val start = withFrameMillis { it }
        while (true) {
            elapsed = (withFrameMillis { it } - start).toInt()
            if (elapsed > ${ms(T.mineStart + 6 * T.stagger)} + 3000) { onDone(); break }
        }
    }
    val screenAlpha by animateFloatAsState(if (elapsed >= 0) 1f else 0f, tween(${ms(T.screenFade)}, easing = ez), label = "screen")
    Column(Modifier.alpha(screenAlpha)) {
        repeat(6) { r ->
            val on = elapsed >= ${ms(T.mineStart)} + r * ${ms(T.stagger)}
            val alpha by animateFloatAsState(if (on) 1f else 0f, tween(${duration}, easing = ez), label = "a$r")
            val dx by animateDpAsState(if (on) 0.dp else 24.dp, tween(${duration}, easing = ez), label = "x$r")
            val ring by animateColorAsState(
                when { !on || yours[r] == null -> Color.White; yours[r] == key[r] -> Color(0xFF7BFF3C); else -> Color(0xFFFF2A2A) },
                tween(${duration}, easing = ez), label = "r$r")
            YourBlock(yours[r] ?: "—", ring, Modifier.alpha(alpha).offset(x = dx))
        }
        val countAlpha by animateFloatAsState(
            if (elapsed >= ${ms(T.mineStart + 6 * T.stagger)}) 1f else 0f, tween(${ms(T.countFade)}), label = "count")
        CountLine(Modifier.alpha(countAlpha))
    }
}`,
      ios: `// SwiftUI — tvOS
struct YourStackReveal: View {
    let key: [String], yours: [String?]
    @State private var shown = false
    @State private var rows = 0
    @State private var countOn = false
    private let curve = Animation.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${sec(T.step)})

    var body: some View {
        VStack {
            ForEach(0..<6, id: \\.self) { r in
                YourBlock(text: yours[r] ?? "—",
                          ring: r < rows ? (yours[r] == key[r] ? .green : .red) : .white)
                    .opacity(r < rows ? 1 : 0)
                    .offset(x: r < rows ? 0 : 24)
            }
            CountLine().opacity(countOn ? 1 : 0)
        }
        .opacity(shown ? 1 : 0)
        .task {
            withAnimation(.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${sec(T.screenFade)})) { shown = true }
            for r in 0..<6 {
                after(${sec(T.mineStart)} + Double(r) * ${sec(T.stagger)}) { withAnimation(curve) { rows = r + 1 } }
            }
            after(${sec(T.mineStart + 6 * T.stagger)}) { withAnimation(.easeInOut(duration: ${sec(T.countFade)})) { countOn = true } }
        }
    }
    private func after(_ s: Double, _ f: @escaping () -> Void) {
        DispatchQueue.main.asyncAfter(deadline: .now() + s, execute: f)
    }
}`,
      roku: `' Roku SceneGraph — StackItResults.brs
' Only YOUR STACK is animated; Su's column is in the show video.
sub revealResults()
  m.top.findNode("screenFade").control = "start"     ' opacity 0 → 1, ${sec(T.screenFade)} s
  for r = 0 to 5
    mine = m.mineRows[r]
    if m.yours[r] <> invalid then mine.findNode("ring").blendColor = ringColor(m.yours[r] = m.key[r])
    anim = slideFadeAnim(mine, 24, ${sec(T.step)})   ' translation x +24 → 0, opacity 0 → 1
    anim.delay = ${sec(T.mineStart)} + r * ${sec(T.stagger)}
    anim.control = "start"
  end for
  countAnim = fadeAnim(m.top.findNode("count"), ${sec(T.countFade)})
  countAnim.delay = ${sec(T.mineStart + 6 * T.stagger)}
  countAnim.control = "start"
end sub

function ringColor(ok as boolean) as string
  if ok then return "0x7BFF3CFF"
  return "0xFF2A2AFF"
end function`,
    };
  },

  pmTicket() {
    return `Title: Stack It — "Your stack" reveal on the results screen

Trigger: round timer reaches 0:00 (or the host presses "End timer").

Scope:
  · SU’S STACK and CORRECT STACK are part of the show video — the show rings Su’s answers green / red itself. We do not animate them.
  · We animate only the YOUR STACK column and the count line.

Visual behavior:
  · The results overlay fades in over the game screen.
  · Row by row, top to bottom, the player’s block slides in from the right (+2 cqw → 0) while fading in, with a green ring (#7BFF3C, right slot) or red ring (#FF2A2A, wrong slot). Empty slots show "—" with no ring.
  · Each row lands 200 ms after the show rings Su’s answer in the same row.
  · After the last row, "N of 6 in the right spot" fades in at the bottom (N in yellow #F2C230).
  · 3 s later the Round Complete screen appears automatically; OK skips ahead.

Timings:
  · Overlay fade: 500 ms. Block slide-in + ring: 350 ms each.
  · Your row r: 700 + 350·r ms after the results start.
  · Count line: at 2800 ms, 400 ms fade. Auto-advance: 5800 ms.

Acceptance criteria:
  · Our rows stay in sync with the show’s Su rings (start from the same 0:00 cue).
  · Scoring is final before the reveal starts — animation is presentational only.
  · OK during the reveal jumps straight to Round Complete.
  · Reduced-motion setting: all rows appear at once with their rings.`;
  },
};
