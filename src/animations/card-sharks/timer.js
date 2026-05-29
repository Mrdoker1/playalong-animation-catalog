import { injectStyle } from '../../lib/injectStyle';
const CSS = `
.preview-cs-timer {
  width: 418px;
  height: 86px;
  background: rgba(0,0,0,0.8);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 20px 28px;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  display: flex; flex-direction: column; gap: 8px; justify-content: center;
}
.preview-cs-timer__row {
  display: flex; align-items: center; gap: 16px; height: 32px;
}
.preview-cs-timer__value {
  font-size: 28px; font-weight: 800; color: #caa512;
  min-width: 64px; text-align: left; text-transform: uppercase;
}
.preview-cs-timer__value.is-time-up {
  flex: 1; text-align: center; letter-spacing: 1px; min-width: 0;
  white-space: nowrap;
}
.preview-cs-timer__bar {
  flex: 1; height: 14px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden;
}
.preview-cs-timer__bar.is-hidden { display: none; }
.preview-cs-timer__bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #0090ff 0%, #0022ab 100%);
  border-radius: 10px;
  animation: cs-timer-deplete linear forwards;
}
.preview-cs-timer__bar-fill.is-critical {
  background: linear-gradient(90deg, #ef4444 0%, #f87171 100%);
}
@keyframes cs-timer-deplete {
  from { width: 100%; }
  to   { width: 0%; }
}
`;
let bar = null;
let barTrack = null;
let value = null;
let tickInterval;
function frameTimer(slot, opts) {
    if (opts.timeUp) {
        slot.innerHTML = `
      <div style="
        width:100%;height:40px;
        background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
        border-radius:6px;display:flex;align-items:center;justify-content:center;
        color:#caa512;font-family:Arial,Helvetica,sans-serif;
        font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;
      ">Time's Up!</div>
    `;
        return;
    }
    const grad = opts.critical
        ? 'linear-gradient(90deg,#ef4444 0%,#f87171 100%)'
        : 'linear-gradient(90deg,#0090ff 0%,#0022ab 100%)';
    slot.innerHTML = `
    <div style="
      width:100%;height:40px;
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      border-radius:6px;
      padding:6px 8px;box-sizing:border-box;
      display:flex;align-items:center;gap:8px;
    ">
      <span style="color:#caa512;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:800;min-width:24px;">${opts.label}</span>
      <div style="flex:1;height:8px;background:rgba(255,255,255,0.1);border-radius:5px;overflow:hidden;">
        <div style="height:100%;width:${opts.fill}%;background:${grad};border-radius:5px;"></div>
      </div>
    </div>
  `;
}
export const Timer = {
    id: 'cs-timer',
    title: 'Timer',
    game: 'Card Sharks',
    description: 'Countdown bar that depletes linearly from full to empty over the question window. The blue gradient switches to red once the remaining time crosses a "critical" threshold (last 25%).',
    defaults: { duration: 6000, easingId: 'linear' },
    slowFactor: 2,
    frames: [
        { label: 'Start', sublabel: '0% · 6s · blue full', render: (s) => frameTimer(s, { label: '6s', fill: 100, critical: false }) },
        { label: 'Mid', sublabel: '50% · 3s · blue half', render: (s) => frameTimer(s, { label: '3s', fill: 50, critical: false }) },
        { label: 'Critical', sublabel: '85% · 1s · red 15%', render: (s) => frameTimer(s, { label: '1s', fill: 15, critical: true }) },
        { label: 'Time’s Up', sublabel: '100% · bar removed · label centred', render: (s) => frameTimer(s, { label: '', fill: 0, critical: false, timeUp: true }) },
    ],
    render(stage) {
        injectStyle('css-cs-timer', CSS);
        stage.innerHTML = `
      <div class="preview-cs-timer">
        <div class="preview-cs-timer__row">
          <span class="preview-cs-timer__value">6s</span>
          <div class="preview-cs-timer__bar">
            <div class="preview-cs-timer__bar-fill"></div>
          </div>
        </div>
      </div>
    `;
        bar = stage.querySelector('.preview-cs-timer__bar-fill');
        barTrack = stage.querySelector('.preview-cs-timer__bar');
        value = stage.querySelector('.preview-cs-timer__value');
        return () => {
            stage.innerHTML = '';
            bar = null;
            barTrack = null;
            value = null;
            if (tickInterval !== undefined)
                clearInterval(tickInterval);
        };
    },
    play({ duration }) {
        if (!bar || !value || !barTrack)
            return;
        if (tickInterval !== undefined)
            clearInterval(tickInterval);
        bar.classList.remove('is-critical');
        barTrack.classList.remove('is-hidden');
        value.classList.remove('is-time-up');
        bar.style.animation = 'none';
        void bar.offsetWidth;
        bar.style.animationDuration = `${duration}ms`;
        bar.style.animation = `cs-timer-deplete ${duration}ms linear forwards`;
        const totalSec = Math.ceil(duration / 1000);
        value.textContent = `${totalSec}s`;
        const start = performance.now();
        tickInterval = window.setInterval(() => {
            const remaining = Math.max(0, duration - (performance.now() - start));
            if (remaining <= 0) {
                if (value) {
                    value.textContent = "Time's Up!";
                    value.classList.add('is-time-up');
                }
                if (barTrack)
                    barTrack.classList.add('is-hidden');
                if (tickInterval !== undefined) {
                    clearInterval(tickInterval);
                    tickInterval = undefined;
                }
                return;
            }
            if (value)
                value.textContent = `${Math.ceil(remaining / 1000)}s`;
            if (bar && remaining < duration * 0.25)
                bar.classList.add('is-critical');
        }, 100);
    },
    snippets({ duration }) {
        const seconds = (duration / 1000).toFixed(2);
        return {
            web: `/* GameTimerBox.css */
@keyframes game-timer-box-deplete {
  from { width: 100%; }
  to   { width: 0%; }
}

.game-timer-box__bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #0090ff 0%, #0022ab 100%);
  animation: game-timer-box-deplete ${duration}ms linear forwards;
}

.game-timer-box__bar-fill--critical {
  background: linear-gradient(90deg, #ef4444 0%, #f87171 100%);
}

/* When the timer hits zero, the bar is removed from the DOM and the
   numeric value is replaced with the "Time's Up!" label — which then
   spans the full row width. */
.game-timer-box__value--time-up {
  flex: 1 1 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* React: use a resetKey prop (e.g. questionNumber) to force the fill node
   to remount when the timer needs to restart. */`,
            android: `// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.animation.animateColorAsState

@Composable
fun TimerBar(durationMs: Int = ${duration}, onElapsed: () -> Unit) {
    var progress by remember { mutableStateOf(1f) }
    val color by animateColorAsState(
        if (progress < 0.25f) Color(0xFFEF4444) else Color(0xFF0090FF),
        label = "timerColor"
    )

    LaunchedEffect(Unit) {
        val anim = Animatable(1f)
        anim.animateTo(
            targetValue = 0f,
            animationSpec = tween(durationMs, easing = LinearEasing)
        )
        progress = anim.value
        onElapsed()
    }

    Box(
        Modifier.fillMaxWidth(progress).height(14.dp).background(color, RoundedCornerShape(10.dp))
    )
}`,
            ios: `// SwiftUI — tvOS
import SwiftUI

struct TimerBar: View {
    let duration: Double = ${seconds}
    @State private var width: CGFloat = 1.0

    var critical: Bool { width < 0.25 }
    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Rectangle().fill(.white.opacity(0.1))
                Rectangle()
                    .fill(critical ? .red : .blue)
                    .frame(width: geo.size.width * width)
            }
        }
        .frame(height: 14)
        .clipShape(RoundedRectangle(cornerRadius: 10))
        .onAppear {
            withAnimation(.linear(duration: duration)) { width = 0 }
        }
    }
}`,
            roku: `<!-- Roku SceneGraph — components/TimerBar.xml -->
<component name="TimerBar" extends="Group">
  <interface>
    <field id="durationSeconds" type="float" value="${seconds}" />
    <field id="running" type="boolean" alwaysNotify="true" onChange="onRunningChange" />
  </interface>

  <children>
    <Rectangle id="track" color="0xFFFFFF1A" />
    <Rectangle id="fill"  color="0x0090FFFF" />
    <Animation id="deplete" easeFunction="linear" repeat="false">
      <FloatFieldInterpolator
        fieldToInterp="fill.scale"
        keyValue="[ [1,1], [0,1] ]"
        key="[ 0, 1 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onRunningChange()
      anim = m.top.findNode("deplete")
      anim.duration = m.top.durationSeconds
      if m.top.running then
        anim.control = "start"
      else
        anim.control = "stop"
      end if
    end sub
  </script>
</component>`,
        };
    },
    pmTicket() {
        return `Title: Card Sharks — Question timer countdown animation

Trigger: a new question is presented to the player.

Visual behavior:
  · A horizontal progress bar fills the timer card; it depletes from full width to 0 over the question's time window (default 6 s).
  · The remaining-seconds label updates every tick.
  · When the remaining time drops below 25 % of the total, the bar's blue gradient swaps to a red gradient (signals urgency).
  · When the timer reaches 0, the bar is removed and the numeric value is replaced with the centered "Time's Up!" label spanning the full row width.

Timings:
  · Bar deplete — 6000 ms by default (configurable per round), LINEAR easing.
  · Critical threshold — < 25 % of total remaining (instantly applies red palette).
  · Time's Up swap — instant transition when remaining hits 0.

Acceptance criteria:
  · The animation restarts cleanly on each new question (state fully resets).
  · If the player answers before time runs out, the animation pauses immediately and "Time's Up!" is never shown.
  · No bounce/easing at end — it's a literal countdown.`;
    },
};
