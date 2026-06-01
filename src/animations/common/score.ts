import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { injectStyle } from '../../lib/injectStyle';

const CSS = `
.preview-score {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  background: rgba(0,0,0,0.8);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 24px 40px;
  font-family: 'Rubik', 'Helvetica Neue', Arial, sans-serif;
}
.preview-score__label {
  font-size: 22px; font-weight: 600; color: #fff;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.preview-score__value {
  font-size: 48px; font-weight: 800; color: #caa512;
  display: inline-block;
  transform-origin: center;
}
.preview-score__value.is-bumping {
  animation: game-timer-box-score-bump 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes game-timer-box-score-bump {
  0%   { transform: scale(1);    color: #caa512; }
  35%  { transform: scale(1.45); color: #6dd97a; }
  100% { transform: scale(1);    color: #caa512; }
}
`;

let valueEl: HTMLElement | null = null;
let currentScore = 86;

function frameScore(slot: HTMLElement, scale: number, color: string, value: string) {
  slot.innerHTML = `
    <div style="
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      font-size:32px;font-weight:800;color:${color};
      transform:scale(${scale});transform-origin:center;
    ">${value}</div>
  `;
}

export const Score: AnimationModule = {
  id: 'common-score',
  title: 'Score',
  game: 'Common',
  description:
    'When the player earns points, the Score value briefly scales up and flashes green before settling back to its resting gold colour. Used by both Family Feud and Card Sharks game timers.',
  defaults: { duration: 600, easingId: 'back-out' },
  frames: [
    { label: 'Start',   sublabel: '0% · scale 1 · #CAA512',    render: (s) => frameScore(s, 1,    '#caa512', '86') },
    { label: 'Peak',    sublabel: '35% · scale 1.45 · #6DD97A', render: (s) => frameScore(s, 1.45, '#6dd97a', '102') },
    { label: 'Settled', sublabel: '100% · scale 1 · #CAA512',   render: (s) => frameScore(s, 1,    '#caa512', '102') },
  ],

  render(stage) {
    injectStyle('css-common-score', CSS);
    currentScore = 86;
    stage.innerHTML = `
      <div class="preview-score">
        <div class="preview-score__label">Score</div>
        <div class="preview-score__value">${currentScore}</div>
      </div>
    `;
    valueEl = stage.querySelector('.preview-score__value');
    return () => { stage.innerHTML = ''; valueEl = null; };
  },

  play({ duration, easing }) {
    if (!valueEl) return;
    currentScore += Math.floor(Math.random() * 25) + 5;
    valueEl.textContent = String(currentScore);
    valueEl.classList.remove('is-bumping');
    valueEl.style.animation = 'none';
    void valueEl.offsetWidth;
    valueEl.style.animation = `game-timer-box-score-bump ${duration}ms ${bezierToCss(easing.bezier)}`;
  },

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const seconds = (duration / 1000).toFixed(2);
    return {
      web: `/* GameTimerBox.css — shared between Family Feud, Card Sharks, Fast Money */
@keyframes game-timer-box-score-bump {
  0%   { transform: scale(1);    color: #caa512; }
  35%  { transform: scale(1.45); color: #6dd97a; }
  100% { transform: scale(1);    color: #caa512; }
}

.game-timer-box__value--score-bump {
  display: inline-block;
  transform-origin: center;
  animation: game-timer-box-score-bump ${duration}ms ${bezierToCss(easing.bezier)};
}

/* Trigger by toggling the modifier class on every score change.
   In React, key={score} on the value span forces remount → re-animation. */`,
      android: `// Jetpack Compose — Android TV
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.*

@Composable
fun ScoreValue(score: Int) {
    val anim = remember { Animatable(1f) }
    val color = remember { Animatable(Color(0xFFCAA512)) }

    LaunchedEffect(score) {
        launch {
            anim.animateTo(
                targetValue = 1f,
                animationSpec = keyframes {
                    durationMillis = ${duration}
                    1f    at 0
                    1.45f at (${duration} * 0.35).toInt()
                    1f    at ${duration}
                }
            )
        }
        launch {
            color.animateTo(Color(0xFF6DD97A), tween(${Math.round(duration * 0.35)}))
            color.animateTo(Color(0xFFCAA512), tween(${Math.round(duration * 0.65)}))
        }
    }

    Text(
        text = score.toString(),
        color = color.value,
        modifier = Modifier.graphicsLayer { scaleX = anim.value; scaleY = anim.value }
    )
}`,
      ios: `// SwiftUI — tvOS
import SwiftUI

struct ScoreValue: View {
    let score: Int
    @State private var scale: CGFloat = 1.0
    @State private var color: Color = Color(red: 0.79, green: 0.65, blue: 0.07)

    var body: some View {
        Text("\\(score)")
            .scaleEffect(scale)
            .foregroundColor(color)
            .onChange(of: score) { _ in
                withAnimation(.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${seconds})) {
                    scale = 1.0  // ramps via spring-like back-ease
                }
                // Pulse via keyframe: scale 1 → 1.45 → 1
                let half = ${seconds} / 2.85
                withAnimation(.easeOut(duration: half)) {
                    scale = 1.45; color = Color(red: 0.43, green: 0.85, blue: 0.48)
                }
                DispatchQueue.main.asyncAfter(deadline: .now() + half) {
                    withAnimation(.easeIn(duration: ${seconds} - half)) {
                        scale = 1.0
                        color = Color(red: 0.79, green: 0.65, blue: 0.07)
                    }
                }
            }
    }
}`,
      roku: `<!-- Roku SceneGraph — components/ScoreValue.xml -->
<component name="ScoreValue" extends="Group">
  <interface>
    <field id="score" type="integer" alwaysNotify="true" onChange="onScoreChange" />
  </interface>

  <children>
    <Label id="label" font="font:LargeBoldSystemFont" color="0xCAA512FF" />
    <Animation id="bump" duration="${seconds}" easeFunction="outBack" repeat="false">
      <Vector2DFieldInterpolator
        fieldToInterp="label.scale"
        keyValue="[ [1,1], [1.45,1.45], [1,1] ]"
        key="[ 0, 0.35, 1.0 ]" />
      <ColorFieldInterpolator
        fieldToInterp="label.color"
        keyValue="[ 0xCAA512FF, 0x6DD97AFF, 0xCAA512FF ]"
        key="[ 0, 0.35, 1.0 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onScoreChange()
      m.top.findNode("label").text = m.top.score.toStr()
      m.top.findNode("bump").control = "start"
    end sub
  </script>
</component>`,
    };
  },

  pmTicket() {
    return `Title: Common — Score increase feedback animation

Trigger: the player's total score increases (correct answer, round completion bonus).

Visual behavior:
  · The Score numeric value briefly scales up to 1.45 and flashes from gold (#CAA512) to green (#6DD97A).
  · It then settles back to scale 1.0 and gold colour.
  · The display text updates to the new score at the start of the animation.

Timings:
  · 600 ms total, easing cubic-bezier(0.34, 1.56, 0.64, 1).
  · Peak (scale + green) at 35 % of the duration; resolves over the remaining 65 %.

Acceptance criteria:
  · Animation re-fires on every distinct score change (skip if score is unchanged).
  · Used identically in Family Feud, Card Sharks, and Fast Money game-timer boxes.`;
  },
};
