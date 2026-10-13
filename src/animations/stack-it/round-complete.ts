import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { injectStyle } from '../../lib/injectStyle';
import { SI_BASE_CSS } from './shared';

const BAR_GRADIENT =
  'linear-gradient(90deg,#030308 0%,#030308 26%,#121a78 40%,#2a33dc 50%,#121a78 60%,#030308 74%,#030308 100%)';
const SWEEP_GRADIENT =
  'linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(170,210,255,0.55) 50%,rgba(255,255,255,0) 100%)';

// Fixed parts of the sequence (same as Family Feud / Feedback); Duration drives the drop-in.
const SCREEN_FADE = 500;
const BAR_DELAY = 200;
const SWEEP_DELAY = 300;   // after the drop-in starts
const SWEEP_MS = 1100;
const PULSE_MS = 2600;

const CSS = `
.preview-si-round { width: 600px; height: 280px; }
.preview-si-round__under {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.35); font-size: 13px; letter-spacing: .06em; text-transform: uppercase;
}
.preview-si-round__screen {
  position: absolute; inset: 0; opacity: 0;
  background: radial-gradient(90% 120% at 50% 50%, #26329a 0%, #0b1150 55%, #050824 100%);
}
.preview-si-round__bar {
  position: absolute; left: 4.76%; width: 90%; top: 40%; height: 56px;
  border-radius: 8px; box-sizing: border-box; padding: 0 22px; overflow: hidden;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  font-family: 'Roboto Condensed', 'Arial Narrow', sans-serif; color: #fff;
  background: ${BAR_GRADIENT};
  opacity: 0;
}
.preview-si-round__side { font-weight: 600; font-size: 14px; letter-spacing: .03em; text-transform: uppercase; }
.preview-si-round__side b { color: #f2c230; font-size: 19px; margin-left: 5px; }
.preview-si-round__side.r { text-align: right; }
.preview-si-round__mid { font-weight: 500; font-size: 24px; }
.preview-si-round__sweep { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.preview-si-round__sweep::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: -45%; width: 45%;
  background: ${SWEEP_GRADIENT};
}
.preview-si-round__sweep.is-on::after {
  animation: si-round-sweep ${SWEEP_MS}ms cubic-bezier(0.4, 0, 0.2, 1) var(--sweep-delay, ${SWEEP_DELAY}ms) both;
}
@keyframes si-round-in {
  from { opacity: 0; transform: translateY(-40px) scale(0.94); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes si-round-sweep {
  from { left: -45%; }
  to   { left: 100%; }
}
@keyframes si-round-pulse {
  0%, 100% { filter: brightness(1); }
  50%      { filter: brightness(1.3); }
}
`;

let screen: HTMLElement | null = null;
let bar: HTMLElement | null = null;
let sweep: HTMLElement | null = null;

function frameBar(slot: HTMLElement, opts: { y: number; scale: number; opacity: number; sweep: number | null; mid?: string; round?: string; score?: number }) {
  const { mid = 'Round Complete!', round = '1/3', score = 4 } = opts;
  slot.innerHTML = `
    <div style="
      position:relative;overflow:hidden;
      width:170px;height:30px;border-radius:4px;box-sizing:border-box;padding:0 6px;
      display:grid;grid-template-columns:1fr auto 1fr;align-items:center;
      font-family:'Roboto Condensed','Arial Narrow',sans-serif;color:#fff;
      background:${BAR_GRADIENT};
      transform:translateY(${opts.y}px) scale(${opts.scale});opacity:${opts.opacity};
    ">
      <span style="font-size:7px;font-weight:600;text-transform:uppercase;">Round <b style="color:#f2c230">${round}</b></span>
      <span style="font-size:10px;font-weight:500;">${mid}</span>
      <span style="font-size:7px;font-weight:600;text-transform:uppercase;text-align:right;">Score <b style="color:#f2c230">${score}</b></span>
      ${opts.sweep !== null ? `<div style="position:absolute;top:0;bottom:0;width:45%;left:${opts.sweep}%;background:${SWEEP_GRADIENT};"></div>` : ''}
    </div>`;
}

export const RoundComplete: AnimationModule = {
  id: 'si-round-complete',
  title: 'Round Complete',
  game: 'Stack It',
  description:
    'Three seconds after the results count appears, the Round Complete background fades over the results and the score bar drops in from above with a soft overshoot — the same banner motion as Family Feud. A light band sweeps across the bar once, then the bar keeps a slow brightness pulse. After the final round the centre reads "Game Complete!". The next round starts automatically after 6 s; OK skips ahead.',
  defaults: { duration: 620, easingId: 'ease-out' },
  frames: [
    { label: 'Start',   sublabel: 'bg fade 500 ms · bar hidden',          render: (s) => frameBar(s, { y: -14, scale: 0.94, opacity: 0.15, sweep: null }) },
    { label: 'Drop-in', sublabel: '+200 ms · translateY −40 → 0 · .94 → 1', render: (s) => frameBar(s, { y: -6, scale: 0.97, opacity: 0.6, sweep: null }) },
    { label: 'Sweep',   sublabel: '+300 ms · light band 1100 ms',          render: (s) => frameBar(s, { y: 0, scale: 1, opacity: 1, sweep: 30 }) },
    { label: 'Idle',    sublabel: 'brightness pulse 2.6 s loop',          render: (s) => frameBar(s, { y: 0, scale: 1, opacity: 1, sweep: null }) },
    { label: 'Final',   sublabel: 'round 3 · no auto-advance',            render: (s) => frameBar(s, { y: 0, scale: 1, opacity: 1, sweep: null, mid: 'Game Complete!', round: '3/3', score: 39 }) },
  ],

  render(stage) {
    injectStyle('css-si-base', SI_BASE_CSS);
    injectStyle('css-si-round', CSS);
    stage.innerHTML = `
      <div class="preview-si-board preview-si-round">
        <div class="preview-si-round__under">results screen (mocked)</div>
        <div class="preview-si-round__screen">
          <div class="preview-si-round__bar">
            <div class="preview-si-round__side">Round<b>1/3</b></div>
            <div class="preview-si-round__mid">Round Complete!</div>
            <div class="preview-si-round__side r">Score<b>4</b></div>
            <div class="preview-si-round__sweep"></div>
          </div>
        </div>
      </div>
    `;
    screen = stage.querySelector('.preview-si-round__screen');
    bar = stage.querySelector('.preview-si-round__bar');
    sweep = stage.querySelector('.preview-si-round__sweep');
    return () => { stage.innerHTML = ''; screen = null; bar = null; sweep = null; };
  },

  play({ duration, easing }) {
    if (!screen || !bar || !sweep) return;
    const ez = bezierToCss(easing.bezier);
    screen.style.transition = 'none';
    screen.style.opacity = '0';
    bar.style.animation = 'none';
    sweep.classList.remove('is-on');
    void bar.offsetWidth;

    screen.style.transition = `opacity ${SCREEN_FADE}ms ease`;
    screen.style.opacity = '1';
    bar.style.animation =
      `si-round-in ${duration}ms ${ez} ${BAR_DELAY}ms both, ` +
      `si-round-pulse ${PULSE_MS}ms ease-in-out ${BAR_DELAY + duration + SWEEP_MS}ms infinite`;
    sweep.style.setProperty('--sweep-delay', `${BAR_DELAY + SWEEP_DELAY}ms`);
    sweep.classList.add('is-on');
  },

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const seconds = (duration / 1000).toFixed(2);
    const ez = bezierToCss(easing.bezier);
    const pulseDelay = BAR_DELAY + duration + SWEEP_MS;
    return {
      web: `/* StackItOverlay.css — Round Complete screen (banner motion shared with Family Feud) */
.si-screen {
  position: absolute; inset: 0; z-index: 10;
  opacity: 0; pointer-events: none;
  transition: opacity ${SCREEN_FADE}ms;
}
.si-screen--show { opacity: 1; pointer-events: auto; }

.si-round-bar {
  position: absolute; left: 4.76%; width: 90%; top: 44%; height: 11.2%;
  border-radius: .9cqw; padding: 0 2.4cqw; overflow: hidden;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  font-family: "Roboto Condensed", "Arial Narrow", sans-serif; color: #fff;
  background: ${BAR_GRADIENT};
}
.si-screen--show .si-round-bar {
  animation:
    si-round-in    ${duration}ms ${ez} ${BAR_DELAY}ms both,
    si-round-pulse ${PULSE_MS}ms ease-in-out ${pulseDelay}ms infinite;
}
@keyframes si-round-in {
  from { opacity: 0; transform: translateY(-40px) scale(0.94); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes si-round-pulse {
  0%, 100% { filter: brightness(1); }
  50%      { filter: brightness(1.3); }
}

/* One-shot light band across the bar */
.si-round-bar::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: -45%; width: 45%;
  background: ${SWEEP_GRADIENT};
}
.si-screen--show .si-round-bar::after {
  animation: si-round-sweep ${SWEEP_MS}ms cubic-bezier(0.4, 0, 0.2, 1) ${BAR_DELAY + SWEEP_DELAY}ms both;
}
@keyframes si-round-sweep { from { left: -45%; } to { left: 100%; } }

@media (prefers-reduced-motion: reduce) {
  .si-screen--show .si-round-bar, .si-screen--show .si-round-bar::after { animation: none; }
}

// StackIt.ts
roundScreen.classList.add('si-screen--show');
if (!isLastRound) later(nextRound, 6000);`,
      android: `// Jetpack Compose — Android TV
@Composable
fun RoundCompleteScreen(visible: Boolean, round: Int, total: Int, score: Int, onNextRound: () -> Unit) {
    val easing = CubicBezierEasing(${b1}f, ${b2}f, ${b3}f, ${b4}f)
    AnimatedVisibility(visible, enter = fadeIn(tween(${SCREEN_FADE})), exit = fadeOut(tween(${SCREEN_FADE}))) {
        Box(Modifier.fillMaxSize().paint(painterResource(R.drawable.si_round_bg), contentScale = ContentScale.FillBounds)) {
            val shown = remember { MutableTransitionState(false) }.apply { targetState = true }
            AnimatedVisibility(
                visibleState = shown,
                enter = slideInVertically(tween(${duration}, ${BAR_DELAY}, easing)) { -40 } +
                        scaleIn(tween(${duration}, ${BAR_DELAY}, easing), initialScale = 0.94f) +
                        fadeIn(tween(${duration}, ${BAR_DELAY}, easing))
            ) {
                // Sweep: gradient strip x −45% → 100%, ${SWEEP_MS} ms, delay ${BAR_DELAY + SWEEP_DELAY} ms.
                // Pulse: brightness 1 → 1.3 → 1, ${PULSE_MS} ms loop, starts at ${pulseDelay} ms.
                RoundBar(
                    left = "ROUND $round/$total",
                    mid = if (round == total) "Game Complete!" else "Round Complete!",
                    right = "SCORE $score"
                )
            }
        }
    }
    if (visible && round < total) LaunchedEffect(round) { delay(6000); onNextRound() }
}`,
      ios: `// SwiftUI — tvOS
struct RoundCompleteScreen: View {
    let round: Int, total: Int, score: Int
    @State private var barIn = false
    @State private var sweep: CGFloat = -0.45
    @State private var pulse = 1.0

    var body: some View {
        ZStack {
            Image("si_round_bg").resizable()
            RoundBar(left: "ROUND \\(round)/\\(total)",
                     mid: round == total ? "Game Complete!" : "Round Complete!",
                     right: "SCORE \\(score)")
                .overlay(SweepStrip(offset: sweep).clipped())
                .brightness(pulse - 1)
                .offset(y: barIn ? 0 : -40)
                .scaleEffect(barIn ? 1 : 0.94)
                .opacity(barIn ? 1 : 0)
        }
        .transition(.opacity.animation(.easeInOut(duration: ${(SCREEN_FADE / 1000).toFixed(2)})))
        .onAppear {
            withAnimation(.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${seconds}).delay(${(BAR_DELAY / 1000).toFixed(2)})) { barIn = true }
            withAnimation(.timingCurve(0.4, 0, 0.2, 1, duration: ${(SWEEP_MS / 1000).toFixed(2)}).delay(${((BAR_DELAY + SWEEP_DELAY) / 1000).toFixed(2)})) { sweep = 1 }
            withAnimation(.easeInOut(duration: ${(PULSE_MS / 2000).toFixed(2)}).repeatForever(autoreverses: true).delay(${(pulseDelay / 1000).toFixed(2)})) { pulse = 1.3 }
        }
    }
}`,
      roku: `<!-- Roku SceneGraph — components/RoundComplete.xml -->
<component name="RoundComplete" extends="Group">
  <interface>
    <field id="show" type="boolean" onChange="onShow" />
  </interface>
  <children>
    <Poster id="bg" uri="pkg:/images/si_round_bg.jpg" width="1920" height="1080" />
    <Group id="bar" translation="[91, 475]" opacity="0">
      <Poster uri="pkg:/images/si_round_bar.png" />
      <Poster id="sweepStrip" uri="pkg:/images/sweep_band.png" translation="[-780, 0]" />
    </Group>
    <Animation id="fade" duration="${(SCREEN_FADE / 1000).toFixed(2)}" easeFunction="inOutQuad">
      <FloatFieldInterpolator fieldToInterp="bg.opacity" key="[0, 1]" keyValue="[0, 1]" />
    </Animation>
    <Animation id="dropIn" duration="${seconds}" delay="${(BAR_DELAY / 1000).toFixed(2)}" easeFunction="outBack">
      <Vector2DFieldInterpolator fieldToInterp="bar.translation" key="[0, 1]" keyValue="[[91, 435], [91, 475]]" />
      <Vector2DFieldInterpolator fieldToInterp="bar.scale" key="[0, 1]" keyValue="[[0.94, 0.94], [1, 1]]" />
      <FloatFieldInterpolator   fieldToInterp="bar.opacity" key="[0, 1]" keyValue="[0, 1]" />
    </Animation>
    <Animation id="sweep" duration="${(SWEEP_MS / 1000).toFixed(2)}" delay="${((BAR_DELAY + SWEEP_DELAY) / 1000).toFixed(2)}" easeFunction="inOutQuad">
      <Vector2DFieldInterpolator fieldToInterp="sweepStrip.translation" key="[0, 1]" keyValue="[[-780, 0], [1730, 0]]" />
    </Animation>
    <Animation id="pulse" duration="${(PULSE_MS / 1000).toFixed(1)}" delay="${(pulseDelay / 1000).toFixed(2)}" easeFunction="inOutQuad" repeat="true">
      <FloatFieldInterpolator fieldToInterp="bar.opacity" key="[0, 0.5, 1]" keyValue="[1.0, 0.85, 1.0]" />
    </Animation>
    <Timer id="advance" duration="6" repeat="false" />
  </children>
  <script type="text/brightscript">
    sub onShow()
      if not m.top.show then return
      for each id in ["fade", "dropIn", "sweep", "pulse"]
        m.top.findNode(id).control = "start"
      end for
      if not m.global.isLastRound then m.top.findNode("advance").control = "start"
    end sub
  </script>
</component>`,
    };
  },

  pmTicket() {
    return `Title: Stack It — Round Complete / Game Complete screen

Trigger: 3 s after the results count line appears, or OK on the results screen.

Visual behavior:
  · The Round Complete background cross-fades over the results screen.
  · The score bar drops in from above (translateY −40 → 0, scale 0.94 → 1, opacity 0 → 1) — same banner motion as Family Feud "Round Complete".
  · Shortly after it lands, a soft light band sweeps left-to-right across the bar once.
  · Then the bar keeps a slow brightness pulse until the screen is left.
  · Bar content: "ROUND 1/3" left, "Round Complete!" centre, "SCORE N" right (numbers in yellow #F2C230). After round 3 the centre reads "Game Complete!" and there is no auto-advance; OK restarts the game.
  · Rounds 1–2: the next round starts automatically after 6 s; OK skips immediately.

Timings:
  · Background fade: ${SCREEN_FADE} ms.
  · Bar drop-in: 620 ms, ease-out, starts ${BAR_DELAY} ms after the fade begins.
  · Sweep: ${SWEEP_MS} ms, cubic-bezier(0.4, 0, 0.2, 1), ${SWEEP_DELAY} ms after the drop-in starts.
  · Pulse: ${PULSE_MS / 1000} s ease-in-out loop (brightness 1 → 1.3 → 1), after the sweep.
  · Auto-advance: 6000 ms after the screen appears.

Acceptance criteria:
  · Score shown is the running total including the round just finished.
  · Sweep plays exactly once per screen; pulse loops.
  · Pressing OK during the entrance advances right away — no double transitions.
  · Reduced-motion setting: plain fade, no drop / sweep / pulse.`;
  },
};
