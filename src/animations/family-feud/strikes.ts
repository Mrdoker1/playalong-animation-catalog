import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { injectStyle } from '../../lib/injectStyle';

const CSS = `
.preview-ff-strikes {
  display: flex; gap: 32px; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.8);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 28px 56px;
}
.preview-ff-strike {
  width: 56px; height: 56px;
  display: flex; align-items: center; justify-content: center;
  border: 3px solid #ef4444;
  border-radius: 8px;
  color: #ef4444; font-size: 36px; font-weight: 700;
  font-family: Arial, Helvetica, sans-serif;
  opacity: 0.2;
  transform: scale(0.9);
}
.preview-ff-strike.is-used { opacity: 1; transform: scale(1); }

@keyframes ff-strike-pop {
  0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
  60%  { transform: scale(1.3) rotate(8deg);  opacity: 1; }
  100% { transform: scale(1) rotate(0);       opacity: 1; }
}
`;

let dots: HTMLElement[] = [];
let strikeIdx = 0;

function frameStrike(slot: HTMLElement, scale: number, rotate: number, opacity: number) {
  slot.innerHTML = `
    <div style="
      width:44px;height:44px;
      display:flex;align-items:center;justify-content:center;
      border:2px solid #ef4444;border-radius:6px;
      color:#ef4444;font-size:26px;font-weight:700;
      font-family:Arial,Helvetica,sans-serif;
      transform:scale(${scale}) rotate(${rotate}deg);
      opacity:${opacity};
    ">✕</div>
  `;
}

export const Strikes: AnimationModule = {
  id: 'ff-strikes',
  title: 'Strikes',
  game: 'Family Feud',
  description:
    'On a wrong answer, the next strike X icon pops in with a rotation and scale overshoot. Back-ease curve gives the X a satisfying "punch" landing.',
  defaults: { duration: 550, easingId: 'back-out' },
  frames: [
    { label: 'Start',     sublabel: 'idle · faint X · opacity .2',  render: (s) => frameStrike(s, 0.9, 0, 0.2) },
    { label: 'Overshoot', sublabel: '60% · scale 1.3 · rotate +8°', render: (s) => frameStrike(s, 1.3,  8,   1) },
    { label: 'Settled',   sublabel: '100% · scale 1 · rotate 0',    render: (s) => frameStrike(s, 1,    0,   1) },
  ],

  render(stage) {
    injectStyle('css-ff-strikes', CSS);
    stage.innerHTML = `
      <div class="preview-ff-strikes">
        <span class="preview-ff-strike">✕</span>
        <span class="preview-ff-strike">✕</span>
        <span class="preview-ff-strike">✕</span>
      </div>
    `;
    dots = Array.from(stage.querySelectorAll<HTMLElement>('.preview-ff-strike'));
    strikeIdx = 0;
    return () => { stage.innerHTML = ''; dots = []; };
  },

  play({ duration, easing }) {
    if (dots.length === 0) return;
    if (strikeIdx >= dots.length) {
      dots.forEach((d) => d.classList.remove('is-used'));
      strikeIdx = 0;
      void dots[0].offsetWidth;
    }
    const target = dots[strikeIdx];
    target.classList.add('is-used');
    target.style.animation = 'none';
    void target.offsetWidth;
    target.style.animation = `ff-strike-pop ${duration}ms ${bezierToCss(easing.bezier)}`;
    strikeIdx++;
  },

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const seconds = (duration / 1000).toFixed(2);
    return {
      web: `/* FamilyFeudOverlay.css */
@keyframes ff-strike-pop {
  0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
  60%  { transform: scale(1.3) rotate(8deg);  opacity: 1; }
  100% { transform: scale(1) rotate(0);       opacity: 1; }
}

.ff-strike-dot--used img {
  animation: ff-strike-pop ${duration}ms ${bezierToCss(easing.bezier)};
}`,
      android: `// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.ui.graphics.graphicsLayer

@Composable
fun StrikeIcon(used: Boolean) {
    val scale by animateFloatAsState(
        targetValue = if (used) 1f else 0f,
        animationSpec = keyframes {
            durationMillis = ${duration}
            0f  at 0
            1.3f at (${duration} * 0.60).toInt()
            1f  at ${duration}
        }
    )
    val rotation by animateFloatAsState(
        targetValue = if (used) 0f else -30f,
        animationSpec = keyframes {
            durationMillis = ${duration}
            -30f at 0
            8f   at (${duration} * 0.60).toInt()
            0f   at ${duration}
        }
    )
    val alpha by animateFloatAsState(
        targetValue = if (used) 1f else 0f,
        animationSpec = tween(${Math.round(duration * 0.6)})
    )
    Icon(
        painter = painterResource(R.drawable.ic_strike),
        contentDescription = null,
        modifier = Modifier.graphicsLayer {
            scaleX = scale; scaleY = scale
            rotationZ = rotation
            this.alpha = alpha
        }
    )
}`,
      ios: `// SwiftUI — tvOS
import SwiftUI

struct StrikeIcon: View {
    var used: Bool
    var body: some View {
        Image(systemName: "xmark")
            .scaleEffect(used ? 1.0 : 0.0)
            .rotationEffect(.degrees(used ? 0 : -30))
            .opacity(used ? 1.0 : 0.0)
            // Single back-ease approximates the 3-step keyframe; for an
            // exact match, chain two .withAnimation blocks (0→60% overshoot
            // and 60%→100% settle).
            .animation(
                .timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${seconds}),
                value: used
            )
    }
}`,
      roku: `<!-- Roku SceneGraph — components/StrikeIcon.xml -->
<component name="StrikeIcon" extends="Group">
  <interface>
    <field id="used" type="boolean" alwaysNotify="true" onChange="onUsedChange" />
  </interface>

  <children>
    <Poster id="icon" />
    <Animation id="pop" duration="${seconds}" easeFunction="outBack" repeat="false">
      <Vector2DFieldInterpolator
        fieldToInterp="icon.scale"
        keyValue="[ [0,0], [1.3,1.3], [1,1] ]"
        key="[ 0, 0.60, 1.0 ]" />
      <FloatFieldInterpolator
        fieldToInterp="icon.rotation"
        keyValue="[ -0.5236, 0.1396, 0 ]"
        key="[ 0, 0.60, 1.0 ]" />
      <FloatFieldInterpolator
        fieldToInterp="icon.opacity"
        keyValue="[ 0, 1, 1 ]"
        key="[ 0, 0.60, 1.0 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onUsedChange()
      if m.top.used then m.top.findNode("pop").control = "start"
    end sub
  </script>
</component>`,
    };
  },

  pmTicket() {
    return `Title: Family Feud — Strike X icon pop-in animation

Trigger: player's submitted guess does not match any unrevealed answer (incorrect attempt).

Visual behavior:
  · The next available strike slot's X icon pops in from nothing.
  · Scale ramps 0 → 1.3 (overshoot) → 1, with rotation −30° → +8° → 0° playing in parallel.
  · The icon stays visible for the rest of the round once popped.

Timings:
  · 550 ms, easing cubic-bezier(0.34, 1.56, 0.64, 1).

Acceptance criteria:
  · Only the newly-added strike icon animates; previously-used strikes stay still.
  · After 3 strikes the round ends — no further pop animations until next round.
  · On platforms without simultaneous transform interpolation, prioritize the scale overshoot over the rotation.`;
  },
};
