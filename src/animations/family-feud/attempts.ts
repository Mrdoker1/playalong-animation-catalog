import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { injectStyle } from '../../lib/injectStyle';

const CSS = `
.preview-ff-attempts {
  background: rgba(0,0,0,0.8);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 24px 32px;
  width: 260px;
  display: flex; flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
}
.preview-ff-attempts__title {
  font-size: 18px; font-weight: 600; text-transform: uppercase;
  color: #fff; text-align: center; margin: 0 0 16px;
  letter-spacing: 0.5px;
}
.preview-ff-attempts__row {
  height: 56px; display: flex; align-items: center; justify-content: center;
  font-size: 24px; font-weight: 600; text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.15);
}
.preview-ff-attempts__row:last-child { border-bottom: none; }
.preview-ff-attempts__row--correct { color: #00d122; }
.preview-ff-attempts__row--incorrect { color: #c33; text-decoration: line-through; }
.preview-ff-attempts__row--empty { color: transparent; border-bottom: none; }

@keyframes ff-attempt-slide-in {
  0%   { transform: translateY(-18px); opacity: 0; }
  100% { transform: translateY(0);     opacity: 1; }
}
`;

let container: HTMLElement | null = null;
let attemptIdx = 0;
const sequence = [
  { text: 'pizza', kind: 'incorrect' as const },
  { text: 'burger', kind: 'correct' as const },
  { text: 'tacos', kind: 'incorrect' as const },
];

function frameAttempt(slot: HTMLElement, translateY: number, opacity: number, color: string, strike: boolean, text: string) {
  slot.innerHTML = `
    <div style="
      font-family:Arial,Helvetica,sans-serif;
      font-size:18px;font-weight:600;
      color:${color};
      opacity:${opacity};
      transform:translateY(${translateY}px);
      ${strike ? 'text-decoration:line-through;' : ''}
    ">${text}</div>
  `;
}

export const Attempts: AnimationModule = {
  id: 'ff-attempts',
  title: 'Attempts',
  game: 'Family Feud',
  description:
    'When the player submits a guess, a new row slides into the Attempts column from above. Correct rows render in green, incorrect rows render in red with a strike-through.',
  defaults: { duration: 400, easingId: 'ease-out' },
  frames: [
    {
      label: 'Start',
      sublabel: '0% · translateY −18 · opacity 0',
      render: (s) => { s.innerHTML = '<div class="frame-ghost">hidden</div>'; },
    },
    {
      label: 'Mid',
      sublabel: '50% · translateY −9 · opacity .5',
      render: (s) => frameAttempt(s, -9, 0.5, '#c33', true, 'pizza'),
    },
    {
      label: 'Settled',
      sublabel: '100% · translateY 0 · opacity 1',
      render: (s) => frameAttempt(s, 0, 1, '#c33', true, 'pizza'),
    },
  ],

  render(stage) {
    injectStyle('css-ff-attempts', CSS);
    stage.innerHTML = `
      <div class="preview-ff-attempts">
        <div class="preview-ff-attempts__title">Attempts</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
      </div>
    `;
    container = stage.querySelector('.preview-ff-attempts');
    attemptIdx = 0;
    return () => { stage.innerHTML = ''; container = null; };
  },

  play({ duration, easing }) {
    if (!container) return;
    const attempt = sequence[attemptIdx % sequence.length];
    const rows = container.querySelectorAll<HTMLElement>('.preview-ff-attempts__row');
    const target = rows[attemptIdx % rows.length];
    attemptIdx++;
    target.textContent = attempt.text;
    target.classList.remove('preview-ff-attempts__row--empty', 'preview-ff-attempts__row--correct', 'preview-ff-attempts__row--incorrect');
    target.classList.add(`preview-ff-attempts__row--${attempt.kind}`);
    target.style.animation = 'none';
    void target.offsetWidth;
    target.style.animation = `ff-attempt-slide-in ${duration}ms ${bezierToCss(easing.bezier)}`;
    if (attemptIdx % rows.length === 0) {
      setTimeout(() => {
        rows.forEach((r, i) => {
          if (i !== (attemptIdx - 1) % rows.length) {
            r.textContent = '_';
            r.className = 'preview-ff-attempts__row preview-ff-attempts__row--empty';
          }
        });
      }, duration + 800);
    }
  },

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const seconds = (duration / 1000).toFixed(2);
    return {
      web: `/* FamilyFeudOverlay.css */
@keyframes ff-attempt-slide-in {
  0%   { transform: translateY(-18px); opacity: 0; }
  100% { transform: translateY(0);     opacity: 1; }
}

.ff-attempts__row--correct,
.ff-attempts__row--incorrect {
  animation: ff-attempt-slide-in ${duration}ms ${bezierToCss(easing.bezier)};
}`,
      android: `// Jetpack Compose — Android TV
import androidx.compose.animation.*
import androidx.compose.animation.core.*

val easing = CubicBezierEasing(${b1.toFixed(2)}f, ${b2.toFixed(2)}f, ${b3.toFixed(2)}f, ${b4.toFixed(2)}f)

@Composable
fun AttemptRow(attempt: Attempt) {
    AnimatedVisibility(
        visible = true,
        enter = slideInVertically(
            initialOffsetY = { -18 },
            animationSpec = tween(${duration}, easing = easing)
        ) + fadeIn(animationSpec = tween(${duration}, easing = easing))
    ) {
        Text(
            text = attempt.text,
            color = if (attempt.correct) Color(0xFF00D122) else Color(0xFFCC3333),
            textDecoration = if (!attempt.correct) TextDecoration.LineThrough else null
        )
    }
}`,
      ios: `// SwiftUI — tvOS
import SwiftUI

struct AttemptRow: View {
    let attempt: Attempt
    @State private var appeared = false
    var body: some View {
        Text(attempt.text)
            .foregroundColor(attempt.correct ? .green : .red)
            .strikethrough(!attempt.correct, color: .red)
            .offset(y: appeared ? 0 : -18)
            .opacity(appeared ? 1 : 0)
            .onAppear {
                withAnimation(.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${seconds})) {
                    appeared = true
                }
            }
    }
}`,
      roku: `<!-- Roku SceneGraph — components/AttemptRow.xml -->
<component name="AttemptRow" extends="Group">
  <interface>
    <field id="visible" type="boolean" alwaysNotify="true" onChange="onVisibleChange" />
  </interface>

  <children>
    <Label id="label" />
    <Animation id="slideIn" duration="${seconds}" easeFunction="outQuad" repeat="false">
      <Vector2DFieldInterpolator
        fieldToInterp="label.translation"
        keyValue="[ [0,-18], [0,0] ]"
        key="[ 0, 1 ]" />
      <FloatFieldInterpolator
        fieldToInterp="label.opacity"
        keyValue="[ 0, 1 ]"
        key="[ 0, 1 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onVisibleChange()
      if m.top.visible then m.top.findNode("slideIn").control = "start"
    end sub
  </script>
</component>`,
    };
  },

  pmTicket() {
    return `Title: Family Feud — Attempts column row entry animation

Trigger: player submits a guess (correct or incorrect).

Visual behavior:
  · A new row is added to the Attempts column showing the player's input.
  · The row slides down 18 px into place and fades in simultaneously.
  · Correct attempts render in green, incorrect attempts in red with a strike-through.

Timings:
  · 400 ms, ease-out (cubic-bezier(0, 0, 0.2, 1)).

Acceptance criteria:
  · Each new attempt instance plays this animation once on mount.
  · Existing attempts stay still — only the new row animates.
  · After 3 strikes the panel locks; no further entries play.`;
  },
};
