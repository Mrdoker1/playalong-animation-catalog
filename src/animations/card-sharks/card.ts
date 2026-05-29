import type { AnimationModule, PlatformSnippets } from '../../types';
import { injectStyle } from '../../lib/injectStyle';

const CSS = `
.preview-cs-card-stage {
  width: 334px; height: 398px;
  background: rgba(0,0,0,0.8);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  perspective: 1200px;
  overflow: visible;
}
.preview-cs-card {
  width: 220px; height: 320px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  border: 4px solid #fff;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  font-family: Georgia, serif;
  box-shadow: 0 24px 60px rgba(0,0,0,0.55);
  transform-origin: center center;
}
.preview-cs-card.is-flying {
  animation: cs-card-fly-in cubic-bezier(0.18, 0.89, 0.32, 1.18) both;
}
.preview-cs-card__rank { font-size: 96px; font-weight: 700; color: #b91c1c; line-height: 1; }
.preview-cs-card__suit { font-size: 72px; color: #b91c1c; line-height: 1; margin-top: 4px; }

@keyframes cs-card-fly-in {
  0%   { transform: translate(-380px, -160px) rotate(-26deg) scale(0.42); opacity: 0; }
  55%  {                                                                  opacity: 1; }
  78%  { transform: translate(0, 8px)         rotate(3deg)   scale(1.04); }
  100% { transform: translate(0, 0)           rotate(0deg)   scale(1);    opacity: 1; }
}
`;

const FACES = ['♥ 7', '♦ Q', '♠ 3', '♣ A', '♥ J'];
let card: HTMLElement | null = null;
let cardIdx = 0;

function frameCard(slot: HTMLElement, tx: number, ty: number, rot: number, scale: number, opacity: number) {
  slot.innerHTML = `
    <div style="
      width:50px;height:72px;border-radius:6px;border:2px solid #fff;
      background:linear-gradient(135deg,#f5f5f5 0%,#e0e0e0 100%);
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      font-family:Georgia,serif;color:#b91c1c;font-weight:700;
      transform:translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale});
      opacity:${opacity};
      box-shadow:0 8px 18px rgba(0,0,0,0.45);
    ">
      <div style="font-size:24px;line-height:1;">Q</div>
      <div style="font-size:18px;line-height:1;margin-top:2px;">♦</div>
    </div>
  `;
}

export const Card: AnimationModule = {
  id: 'cs-card',
  title: 'Card component',
  game: 'Card Sharks',
  description:
    'When a new question shows up, the next playing card flies in from off-screen top-left, rotating into place with a slight overshoot. The card lands flat and stays put until the next question.',
  defaults: { duration: 620, easingId: 'back-out' },
  frames: [
    { label: 'Start',     sublabel: '0% · translate −60,−30 · rot −26° · scale .42',  render: (s) => frameCard(s, -60, -30, -26, 0.42, 0) },
    { label: 'Mid',       sublabel: '55% · in motion · opacity reaches 1',             render: (s) => frameCard(s, -25, -10, -12, 0.7,  1) },
    { label: 'Overshoot', sublabel: '78% · translate 0,+8 · rot +3° · scale 1.04',     render: (s) => frameCard(s, 0,   8,   3,   1.04, 1) },
    { label: 'Settled',   sublabel: '100% · translate 0,0 · rot 0 · scale 1',          render: (s) => frameCard(s, 0,   0,   0,   1,    1) },
  ],

  render(stage) {
    injectStyle('css-cs-card', CSS);
    cardIdx = 0;
    stage.innerHTML = `
      <div class="preview-cs-card-stage">
        <div class="preview-cs-card">
          <div class="preview-cs-card__rank">${FACES[0][2]}</div>
          <div class="preview-cs-card__suit">${FACES[0][0]}</div>
        </div>
      </div>
    `;
    card = stage.querySelector('.preview-cs-card');
    return () => { stage.innerHTML = ''; card = null; };
  },

  play({ duration }) {
    if (!card) return;
    cardIdx = (cardIdx + 1) % FACES.length;
    const face = FACES[cardIdx];
    const rank = card.querySelector<HTMLElement>('.preview-cs-card__rank');
    const suit = card.querySelector<HTMLElement>('.preview-cs-card__suit');
    if (rank) rank.textContent = face[2];
    if (suit) suit.textContent = face[0];
    card.classList.remove('is-flying');
    card.style.animation = 'none';
    void card.offsetWidth;
    card.classList.add('is-flying');
    card.style.animation = `cs-card-fly-in ${duration}ms cubic-bezier(0.18, 0.89, 0.32, 1.18) both`;
  },

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const seconds = (duration / 1000).toFixed(2);
    return {
      web: `/* CardSharksOverlay.css */
@keyframes cs-card-fly-in {
  0%   { transform: translate(-380px, -160px) rotate(-26deg) scale(0.42); opacity: 0; }
  55%  {                                                                   opacity: 1; }
  78%  { transform: translate(0, 8px)          rotate(3deg)   scale(1.04); }
  100% { transform: translate(0, 0)            rotate(0deg)   scale(1);    opacity: 1; }
}

.cs-stage__card-box {
  /* key={questionNumber} on the parent forces remount → fly-in replays
     on each new question. */
  animation: cs-card-fly-in ${duration}ms cubic-bezier(0.18, 0.89, 0.32, 1.18) both;
}`,
      android: `// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.ui.graphics.graphicsLayer

@Composable
fun CardFlyIn(questionNumber: Int) {
    val tx = remember { Animatable(-380f) }
    val ty = remember { Animatable(-160f) }
    val rot = remember { Animatable(-26f) }
    val scale = remember { Animatable(0.42f) }
    val alpha = remember { Animatable(0f) }

    LaunchedEffect(questionNumber) {
        // Reset
        tx.snapTo(-380f); ty.snapTo(-160f)
        rot.snapTo(-26f); scale.snapTo(0.42f); alpha.snapTo(0f)

        // Multi-stage flight matching the CSS 4-step keyframe.
        launch { alpha.animateTo(1f, tween((${duration} * 0.55).toInt(), easing = LinearOutSlowInEasing)) }
        launch {
            tx.animateTo(0f,    tween((${duration} * 0.78).toInt(), easing = LinearOutSlowInEasing))
            // overshoot to y=8, rot=3, scale=1.04, then settle
            launch { ty.animateTo(8f,  tween((${duration} * 0.78).toInt())) }
            launch { rot.animateTo(3f, tween((${duration} * 0.78).toInt())) }
            launch { scale.animateTo(1.04f, tween((${duration} * 0.78).toInt())) }
        }
        delay((${duration} * 0.78).toLong())
        launch { ty.animateTo(0f,  tween((${duration} * 0.22).toInt())) }
        launch { rot.animateTo(0f, tween((${duration} * 0.22).toInt())) }
        launch { scale.animateTo(1f, tween((${duration} * 0.22).toInt())) }
    }

    Box(
        Modifier.graphicsLayer {
            translationX = tx.value; translationY = ty.value
            rotationZ = rot.value
            scaleX = scale.value; scaleY = scale.value
            this.alpha = alpha.value
        }
    ) { /* card face */ }
}`,
      ios: `// SwiftUI — tvOS
import SwiftUI

struct CardFlyIn: View {
    let questionNumber: Int
    @State private var stage = 0  // 0 = start, 1 = overshoot, 2 = settled

    var body: some View {
        Card()
            .offset(x: offsetX, y: offsetY)
            .rotationEffect(.degrees(rotation))
            .scaleEffect(scale)
            .opacity(opacity)
            .onChange(of: questionNumber) { _ in restart() }
            .onAppear { restart() }
    }

    var offsetX: CGFloat { switch stage { case 0: -380; default: 0 } }
    var offsetY: CGFloat { switch stage { case 0: -160; case 1: 8;   default: 0 } }
    var rotation: Double { switch stage { case 0: -26;  case 1: 3;   default: 0 } }
    var scale: CGFloat { switch stage { case 0: 0.42;   case 1: 1.04; default: 1 } }
    var opacity: Double { stage == 0 ? 0 : 1 }

    func restart() {
        stage = 0
        withAnimation(.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${seconds} * 0.78)) {
            stage = 1
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + ${seconds} * 0.78) {
            withAnimation(.easeOut(duration: ${seconds} * 0.22)) { stage = 2 }
        }
    }
}`,
      roku: `<!-- Roku SceneGraph — components/CardFlyIn.xml -->
<component name="CardFlyIn" extends="Group">
  <interface>
    <field id="questionNumber" type="integer" alwaysNotify="true" onChange="onQuestionChange" />
  </interface>

  <children>
    <Group id="card">
      <!-- card face -->
    </Group>
    <Animation id="fly" duration="${seconds}" easeFunction="outBack" repeat="false">
      <Vector2DFieldInterpolator
        fieldToInterp="card.translation"
        keyValue="[ [-380,-160], [0,8], [0,0] ]"
        key="[ 0, 0.78, 1.0 ]" />
      <FloatFieldInterpolator
        fieldToInterp="card.rotation"
        keyValue="[ -0.4538, 0.0524, 0 ]"
        key="[ 0, 0.78, 1.0 ]" />
      <Vector2DFieldInterpolator
        fieldToInterp="card.scale"
        keyValue="[ [0.42,0.42], [1.04,1.04], [1,1] ]"
        key="[ 0, 0.78, 1.0 ]" />
      <FloatFieldInterpolator
        fieldToInterp="card.opacity"
        keyValue="[ 0, 1, 1 ]"
        key="[ 0, 0.55, 1.0 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onQuestionChange()
      m.top.findNode("fly").control = "start"
    end sub
  </script>
</component>`,
    };
  },

  pmTicket() {
    return `Title: Card Sharks — Card component fly-in animation

Trigger: a new question is shown to the player (questionNumber prop changes).

Visual behavior:
  · The playing card enters from off-screen top-left (translate −380, −160).
  · It rotates −26° → +3° → 0° and scales 0.42 → 1.04 → 1.0 while moving into place.
  · It fades in from opacity 0 → 1 during the first 55 % of the animation.
  · At 78 % it overshoots its resting position (rotation +3°, scale 1.04, y +8) and then settles to the final pose.

Timings:
  · 620 ms total, easing cubic-bezier(0.18, 0.89, 0.32, 1.18).
  · Fade-in completes at 55 %; pose settles at 100 %.

Acceptance criteria:
  · Re-fires cleanly when questionNumber changes — no stale frames from the previous card.
  · The card box itself never animates separately; this is purely the card-face element flying into it.
  · No idle motion after the animation completes.`;
  },
};
