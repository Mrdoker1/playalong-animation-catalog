import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { injectStyle } from '../../lib/injectStyle';
import { SI_BASE_CSS, SI } from './shared';

const CSS = `
.preview-si-clock { width: 320px; height: 150px; display: flex; align-items: center; justify-content: center; }
.preview-si-clock__value {
  font-weight: 600; font-size: 64px; line-height: 1; color: #fff;
  font-variant-numeric: tabular-nums;
  transition: color 200ms;
}
.preview-si-clock__value.is-low { color: #ffd5d5; }
@keyframes si-clock-pulse { 50% { transform: scale(1.08); } }
`;

const START = 13;
const LOW = 10;

let value: HTMLElement | null = null;
let tickId: number | undefined;

function fmt(s: number) { return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }

function stop() {
  if (tickId !== undefined) { clearInterval(tickId); tickId = undefined; }
}

function frameClock(slot: HTMLElement, text: string, low: boolean, scale: number) {
  slot.innerHTML = `
    <div style="
      font-family:${SI.font};font-weight:600;font-size:32px;line-height:1;
      color:${low ? '#ffd5d5' : '#fff'};font-variant-numeric:tabular-nums;
      transform:scale(${scale});
    ">${text}</div>
  `;
}

export const ClockPulse: AnimationModule = {
  id: 'si-clock-pulse',
  title: 'Timer Low Pulse',
  game: 'Stack It',
  description:
    'The round clock at the top of the screen counts down from 1:00. In the last 10 seconds the digits turn pale red and breathe: they scale up to 108 % and back once per second. At 0:00 the pulse stops and the results screen opens.',
  defaults: { duration: 1000, easingId: 'ease-in-out' },
  slowFactor: 2,
  frames: [
    { label: 'Normal', sublabel: '> 0:10 · white · no motion',   render: (s) => frameClock(s, '0:24', false, 1) },
    { label: 'Low',    sublabel: '≤ 0:10 · #FFD5D5 · scale 1',   render: (s) => frameClock(s, '0:09', true, 1) },
    { label: 'Peak',   sublabel: '50% of cycle · scale 1.08',    render: (s) => frameClock(s, '0:09', true, 1.08) },
    { label: 'Time up', sublabel: '0:00 · pulse stops',          render: (s) => frameClock(s, '0:00', false, 1) },
  ],

  render(stage) {
    injectStyle('css-si-base', SI_BASE_CSS);
    injectStyle('css-si-clock', CSS);
    stage.innerHTML = `
      <div class="preview-si-board preview-si-clock">
        <div class="preview-si-clock__value">${fmt(START)}</div>
      </div>
    `;
    value = stage.querySelector('.preview-si-clock__value');
    return () => { stop(); stage.innerHTML = ''; value = null; };
  },

  play({ duration, easing }) {
    if (!value) return;
    stop();
    const ez = bezierToCss(easing.bezier);
    let left = START;
    const paint = () => {
      if (!value) return;
      value.textContent = fmt(left);
      const low = left <= LOW && left > 0;
      if (low !== value.classList.contains('is-low')) {
        value.classList.toggle('is-low', low);
        value.style.animation = low ? `si-clock-pulse ${duration}ms ${ez} infinite` : 'none';
      }
    };
    value.classList.remove('is-low');
    value.style.animation = 'none';
    paint();
    // The countdown always ticks in real seconds; Duration only sets the pulse period.
    tickId = window.setInterval(() => {
      left -= 1;
      paint();
      if (left <= 0) stop();
    }, 1000);
  },

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const seconds = (duration / 1000).toFixed(2);
    const half = (duration / 2000).toFixed(2);
    const ez = bezierToCss(easing.bezier);
    return {
      web: `/* StackItOverlay.css */
.si-clock {
  position: absolute; left: 50.45%; top: 7.4%;
  transform: translate(-50%, -50%);
  font-weight: 600; font-size: 4cqw; color: #fff;
  font-variant-numeric: tabular-nums;
}
/* Added while 0 < secondsLeft <= 10 */
.si-clock--low {
  color: #ffd5d5;
  animation: si-clock-pulse ${duration}ms ${ez} infinite;
}
/* Keep the centering translate inside the keyframe */
@keyframes si-clock-pulse {
  50% { transform: translate(-50%, -50%) scale(1.08); }
}
@media (prefers-reduced-motion: reduce) { .si-clock--low { animation: none; } }`,
      android: `// Jetpack Compose — Android TV
@Composable
fun RoundClock(secondsLeft: Int) {
    val low = secondsLeft in 1..10
    val pulse by rememberInfiniteTransition(label = "pulse").animateFloat(
        initialValue = 1f, targetValue = 1.08f,
        animationSpec = infiniteRepeatable(
            tween(${Math.round(duration / 2)}, easing = CubicBezierEasing(${b1}f, ${b2}f, ${b3}f, ${b4}f)),
            RepeatMode.Reverse
        ), label = "scale"
    )
    val scale = if (low) pulse else 1f
    Text(
        "%d:%02d".format(secondsLeft / 60, secondsLeft % 60),
        color = if (low) Color(0xFFFFD5D5) else Color.White,
        fontWeight = FontWeight.SemiBold,
        modifier = Modifier.graphicsLayer { scaleX = scale; scaleY = scale }
    )
}`,
      ios: `// SwiftUI — tvOS
struct RoundClock: View {
    let secondsLeft: Int
    @State private var pulse = false
    var low: Bool { (1...10).contains(secondsLeft) }

    var body: some View {
        Text(String(format: "%d:%02d", secondsLeft / 60, secondsLeft % 60))
            .font(.custom("Rubik-SemiBold", size: 64)).monospacedDigit()
            .foregroundColor(low ? Color(red: 1, green: 0.84, blue: 0.84) : .white)
            .scaleEffect(low && pulse ? 1.08 : 1)
            .animation(low ? .timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${half}).repeatForever(autoreverses: true)
                           : .default, value: pulse)
            .onChange(of: low) { pulse = $0 }
    }
}`,
      roku: `<!-- Roku SceneGraph — components/RoundClock.xml -->
<component name="RoundClock" extends="Group">
  <interface>
    <field id="secondsLeft" type="integer" onChange="onTick" />
  </interface>
  <children>
    <Label id="value" font="font:LargeBoldSystemFont" horizAlign="center" />
    <Animation id="pulse" duration="${seconds}" repeat="true" easeFunction="inOutQuad">
      <Vector2DFieldInterpolator fieldToInterp="value.scale"
        key="[0, 0.5, 1]" keyValue="[[1,1], [1.08,1.08], [1,1]]" />
    </Animation>
  </children>
  <script type="text/brightscript">
    sub onTick()
      s = m.top.secondsLeft
      lbl = m.top.findNode("value")
      lbl.text = (s \\ 60).toStr() + ":" + Right("0" + (s MOD 60).toStr(), 2)
      low = s > 0 and s <= 10
      pulse = m.top.findNode("pulse")
      if low then
        lbl.color = "0xFFD5D5FF"
        if pulse.state <> "running" then pulse.control = "start"
      else
        lbl.color = "0xFFFFFFFF"
        pulse.control = "stop"
        lbl.scale = [1, 1]
      end if
    end sub
  </script>
</component>`,
    };
  },

  pmTicket() {
    return `Title: Stack It — Round clock "last 10 seconds" pulse

Trigger: round timer (60 s per round) reaches 0:10.

Visual behavior:
  · Clock digits change from white to pale red (#FFD5D5).
  · Digits pulse continuously: scale 1 → 1.08 → 1, one cycle per second, anchored at the clock centre.
  · At 0:00 the pulse stops, digits return to white, and the results screen fades in.

Timings:
  · Pulse cycle: 1000 ms, ease-in-out, infinite (peak at 50%).
  · Countdown updates every second (tabular digits — no width jitter).

Acceptance criteria:
  · Pulse starts exactly at 0:10 and runs through 0:01.
  · Pressing "End timer" / time-out stops the pulse immediately.
  · Reduced-motion setting: colour change only, no scaling.`;
  },
};
