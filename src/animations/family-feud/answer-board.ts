import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { injectStyle } from '../../lib/injectStyle';

const TEXT_FADE_DURATION = 450;
const TEXT_FADE_DELAY = 350;

const CSS = `
.preview-ff-board { display: flex; flex-direction: column; gap: 12px; width: 540px; perspective: 1000px; }
.preview-ff-row {
  display: flex; align-items: center; gap: 20px;
  height: 72px; padding: 0 28px; border-radius: 10px;
  transform-origin: center center;
  color: #fff; font-family: Arial, Helvetica, sans-serif; font-weight: 500; font-size: 26px;
  background: linear-gradient(180deg, #1d4ed8 0%, #0a1f5a 100%);
  border: 2px solid rgba(56, 138, 255, 0.5);
}
.preview-ff-row.is-revealed {
  background: linear-gradient(180deg, #008e11 0%, #053800 100%);
  border-color: rgba(0, 255, 85, 0.55);
}
.preview-ff-row__num { width: 28px; text-align: center; font-size: 32px; }
.preview-ff-row__divider { width: 1px; align-self: stretch; background: rgba(255,255,255,0.15); }
.preview-ff-row__name { flex: 1; white-space: nowrap; letter-spacing: 0.5px; opacity: 0; }
.preview-ff-row__pts { font-size: 32px; white-space: nowrap; opacity: 0; }

@keyframes ff-row-flip {
  0%   { transform: rotateX(90deg) scale(0.85); }
  60%  { transform: rotateX(-15deg) scale(1.04); }
  85%  { transform: rotateX(6deg) scale(0.99); }
  100% { transform: rotateX(0) scale(1); }
}
@keyframes ff-text-fade-up {
  0%   { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

let row: HTMLElement | null = null;
let nameEl: HTMLElement | null = null;
let pointsEl: HTMLElement | null = null;

function renderFrameRow(slot: HTMLElement, opts: {
  state: 'hidden' | 'revealed';
  rotateX: number;
  scale: number;
  textOpacity: number;
}) {
  slot.innerHTML = `
    <div class="frame-ff-row" style="
      transform: rotateX(${opts.rotateX}deg) scale(${opts.scale});
      ${opts.state === 'hidden'
        ? 'background:linear-gradient(180deg,#1d4ed8 0%,#0a1f5a 100%); border:1.5px solid rgba(56,138,255,0.5);'
        : 'background:linear-gradient(180deg,#008e11 0%,#053800 100%); border:1.5px solid rgba(0,255,85,0.55);'}
    ">
      <span style="font-size:18px;font-weight:600;">1</span>
      <span style="width:1px;align-self:stretch;background:rgba(255,255,255,0.2);"></span>
      <span style="flex:1;font-size:13px;font-weight:600;letter-spacing:0.3px;opacity:${opts.textOpacity};">FAST FOOD</span>
      <span style="font-size:18px;font-weight:600;opacity:${opts.textOpacity};">28</span>
    </div>
  `;
}

const FRAME_ROW_CSS = `
.frame-ff-row {
  display:flex;align-items:center;gap:10px;
  width:100%;height:40px;padding:0 12px;
  border-radius:6px;color:#fff;
  font-family:Arial,Helvetica,sans-serif;
  transform-origin:center center;
}
`;

export const AnswerBoard: AnimationModule = {
  id: 'ff-answer-board',
  title: 'Answer Board',
  game: 'Family Feud',
  description:
    'When the player guesses correctly, the matching row flips open on the X-axis, swapping its blue "hidden" skin for the green "revealed" skin. Back-ease curve overshoots past the end then settles. The answer text fades up from beneath after the row lands.',
  defaults: { duration: 700, easingId: 'back-out' },
  frames: [
    {
      label: 'Start',
      sublabel: '0% · rotateX 90° · scale .85',
      render: (slot) => {
        injectStyle('css-ff-frame-row', FRAME_ROW_CSS);
        renderFrameRow(slot, { state: 'hidden', rotateX: 90, scale: 0.85, textOpacity: 0 });
      },
    },
    {
      label: 'Overshoot',
      sublabel: '60% · rotateX −15° · scale 1.04',
      render: (slot) => {
        injectStyle('css-ff-frame-row', FRAME_ROW_CSS);
        renderFrameRow(slot, { state: 'revealed', rotateX: -15, scale: 1.04, textOpacity: 0 });
      },
    },
    {
      label: 'Counter',
      sublabel: '85% · rotateX 6° · scale .99',
      render: (slot) => {
        injectStyle('css-ff-frame-row', FRAME_ROW_CSS);
        renderFrameRow(slot, { state: 'revealed', rotateX: 6, scale: 0.99, textOpacity: 0.6 });
      },
    },
    {
      label: 'Settled',
      sublabel: '100% · rotateX 0 · scale 1',
      render: (slot) => {
        injectStyle('css-ff-frame-row', FRAME_ROW_CSS);
        renderFrameRow(slot, { state: 'revealed', rotateX: 0, scale: 1, textOpacity: 1 });
      },
    },
  ],

  render(stage) {
    injectStyle('css-ff-answer-board', CSS);
    stage.innerHTML = `
      <div class="preview-ff-board">
        <div class="preview-ff-row">
          <span class="preview-ff-row__num">1</span>
          <span class="preview-ff-row__divider"></span>
          <span class="preview-ff-row__name">FAST FOOD</span>
          <span class="preview-ff-row__pts">28</span>
        </div>
      </div>
    `;
    row = stage.querySelector('.preview-ff-row');
    nameEl = stage.querySelector('.preview-ff-row__name');
    pointsEl = stage.querySelector('.preview-ff-row__pts');
    return () => { stage.innerHTML = ''; row = null; nameEl = null; pointsEl = null; };
  },

  play({ duration, easing }) {
    if (!row || !nameEl || !pointsEl) return;
    row.classList.remove('is-revealed');
    row.style.animation = 'none';
    nameEl.style.animation = 'none';
    pointsEl.style.animation = 'none';
    nameEl.style.opacity = '0';
    pointsEl.style.opacity = '0';
    void row.offsetWidth;
    row.classList.add('is-revealed');
    row.style.animation = `ff-row-flip ${duration}ms ${bezierToCss(easing.bezier)}`;
    const scaledDelay = Math.round((TEXT_FADE_DELAY / 700) * duration);
    const fadeRule = `ff-text-fade-up ${TEXT_FADE_DURATION}ms ease-out ${scaledDelay}ms both`;
    nameEl.style.animation = fadeRule;
    pointsEl.style.animation = fadeRule;
  },

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const seconds = (duration / 1000).toFixed(2);
    return {
      web: `/* Drop into FamilyFeudBoard.css */
@keyframes ff-row-flip {
  0%   { transform: rotateX(90deg) scale(0.85); }
  60%  { transform: rotateX(-15deg) scale(1.04); }
  85%  { transform: rotateX(6deg) scale(0.99); }
  100% { transform: rotateX(0) scale(1); }
}

.ff-board { perspective: 1000px; }

.ff-board__row--revealed {
  animation: ff-row-flip ${duration}ms ${bezierToCss(easing.bezier)};
  transform-origin: center center;
}

@keyframes ff-text-fade-up {
  0%   { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}

.ff-board__row--revealed .ff-board__name,
.ff-board__row--revealed .ff-board__points {
  animation: ff-text-fade-up ${TEXT_FADE_DURATION}ms ease-out ${TEXT_FADE_DELAY}ms both;
}`,
      android: `// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.runtime.*
import androidx.compose.ui.graphics.graphicsLayer

val easing = CubicBezierEasing(${b1.toFixed(2)}f, ${b2.toFixed(2)}f, ${b3.toFixed(2)}f, ${b4.toFixed(2)}f)

@Composable
fun AnswerRow(revealed: Boolean, modifier: Modifier = Modifier) {
    // Multi-step keyframe matching CSS @keyframes ff-row-flip.
    val rotationX by animateFloatAsState(
        targetValue = if (revealed) 0f else 90f,
        animationSpec = keyframes {
            durationMillis = ${duration}
            90f at 0
            -15f at (${duration} * 0.60).toInt()
            6f at (${duration} * 0.85).toInt()
            0f at ${duration}
        }
    )
    val scale by animateFloatAsState(
        targetValue = if (revealed) 1f else 0.85f,
        animationSpec = keyframes {
            durationMillis = ${duration}
            0.85f at 0
            1.04f at (${duration} * 0.60).toInt()
            0.99f at (${duration} * 0.85).toInt()
            1.00f at ${duration}
        }
    )
    Row(
        modifier = modifier.graphicsLayer {
            this.rotationX = rotationX
            scaleX = scale; scaleY = scale
            cameraDistance = 12 * density
        }
    ) { /* slot number / name / points */ }
}

// Text fade-up — separate animation, delayed ${TEXT_FADE_DELAY} ms.
val textAlpha by animateFloatAsState(
    targetValue = if (revealed) 1f else 0f,
    animationSpec = tween(${TEXT_FADE_DURATION}, delayMillis = ${TEXT_FADE_DELAY})
)`,
      ios: `// SwiftUI — tvOS
import SwiftUI

struct AnswerRow: View {
    var revealed: Bool
    var body: some View {
        HStack { /* slot number / divider / name / points */ }
            .rotation3DEffect(
                .degrees(revealed ? 0 : 90),
                axis: (x: 1, y: 0, z: 0),
                perspective: 0.8
            )
            .scaleEffect(revealed ? 1.0 : 0.85)
            // Single back-ease — for the precise 4-step keyframe used on web,
            // chain three .withAnimation blocks (0→60%, 60%→85%, 85%→100%)
            // or use the new iOS 17 Animation.timeline API.
            .animation(
                .timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${seconds}),
                value: revealed
            )

        // Text fade-up — chained, delayed by 0.35 s.
        Text(answer.name)
            .opacity(revealed ? 1 : 0)
            .offset(y: revealed ? 0 : 8)
            .animation(.easeOut(duration: 0.45).delay(0.35), value: revealed)
    }
}`,
      roku: `<!-- Roku SceneGraph — components/AnswerRow.xml -->
<component name="AnswerRow" extends="Group">
  <interface>
    <field id="revealed" type="boolean" onChange="onRevealedChange" />
  </interface>

  <children>
    <Rectangle id="bg" />
    <!-- slot number / name / points labels -->

    <Animation id="flip" duration="${seconds}" easeFunction="outBack" repeat="false">
      <Vector2DFieldInterpolator
        fieldToInterp="bg.scale"
        keyValue="[ [0.85,0.85], [1.04,1.04], [0.99,0.99], [1,1] ]"
        key="[ 0, 0.60, 0.85, 1.0 ]" />
      <FloatFieldInterpolator
        fieldToInterp="bg.rotation"
        keyValue="[ 1.5708, -0.2618, 0.1047, 0 ]"
        key="[ 0, 0.60, 0.85, 1.0 ]" />
    </Animation>

    <Animation id="textFade" duration="0.45" delay="0.35" easeFunction="outQuad">
      <FloatFieldInterpolator fieldToInterp="nameLabel.opacity" keyValue="[ 0, 1 ]" key="[ 0, 1 ]" />
      <Vector2DFieldInterpolator fieldToInterp="nameLabel.translation" keyValue="[ [0,8], [0,0] ]" key="[ 0, 1 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onRevealedChange()
      if m.top.revealed then
        m.top.findNode("flip").control = "start"
        m.top.findNode("textFade").control = "start"
      end if
    end sub
  </script>
</component>
<!-- Note: Roku's outBack easeFunction approximates cubic-bezier(${b1},${b2},${b3},${b4}). -->`,
    };
  },

  pmTicket() {
    return `Title: Family Feud — Answer Board row reveal animation

Trigger: player submits a guess that matches an unrevealed survey answer.

Visual behavior:
  · The matching row flips open on its horizontal axis (3D rotateX, perspective 1000 px), swapping the blue "hidden" skin (slot number only) for the green "revealed" skin (answer text + points).
  · The flip uses a back-ease overshoot — it rotates past the end position then settles.
  · Answer text and point value fade up from beneath, starting 350 ms after the flip begins.

Timings:
  · Row flip — 700 ms, easing cubic-bezier(0.34, 1.56, 0.64, 1).
  · Text fade-up — 450 ms, ease-out, delay 350 ms.

Acceptance criteria:
  · Only the matching row animates; other hidden rows stay still.
  · Once revealed, the row is permanent for the rest of the round (no idle loop).
  · On platforms without true 3D rotation, fall back to a scaleY 0 → 1 reveal — the overshoot must remain visible.`;
  },
};
