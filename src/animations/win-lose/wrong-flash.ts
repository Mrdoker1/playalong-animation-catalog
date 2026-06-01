import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { injectStyle } from '../../lib/injectStyle';

const CSS = `
.preview-cs-flash-stage {
  position: relative;
  width: 100%; height: 220px;
  background: linear-gradient(135deg, #1a1f2e 0%, #06080d 100%);
  border-radius: 12px;
  overflow: hidden;
}
.preview-cs-flash-stage__label {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Rubik', 'Helvetica Neue', Arial, sans-serif;
  color: rgba(255,255,255,0.5);
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.preview-cs-flash {
  position: absolute; inset: 0;
  background: rgba(220, 30, 30, 0.4);
  opacity: 0;
  pointer-events: none;
}
@keyframes cs-flash {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}
`;

let flashLayer: HTMLElement | null = null;

export const WrongFlash: AnimationModule = {
  id: 'wl-wrong-flash',
  title: 'Wrong Flash',
  game: 'Win/Lose',
  description:
    'Full-screen red flash that briefly washes over the player view when the user picks the wrong answer. Single one-shot opacity ramp from 1 → 0, no movement.',
  defaults: { duration: 600, easingId: 'ease-out' },

  render(stage) {
    injectStyle('css-wl-wrong-flash', CSS);
    stage.innerHTML = `
      <div class="preview-cs-flash-stage">
        <div class="preview-cs-flash-stage__label">player view (mocked)</div>
        <div class="preview-cs-flash"></div>
      </div>
    `;
    flashLayer = stage.querySelector('.preview-cs-flash');
    return () => { stage.innerHTML = ''; flashLayer = null; };
  },

  play({ duration, easing }) {
    if (!flashLayer) return;
    flashLayer.style.animation = 'none';
    void flashLayer.offsetWidth;
    flashLayer.style.animation = `cs-flash ${duration}ms ${bezierToCss(easing.bezier)} forwards`;
  },

  frames: [
    {
      label: 'Idle',
      sublabel: 'no overlay',
      render: (s) => {
        s.innerHTML = `
          <div style="
            width:100%;height:64px;
            background:linear-gradient(135deg,#1a1f2e 0%,#06080d 100%);
            border-radius:6px;display:flex;align-items:center;justify-content:center;
            color:rgba(255,255,255,0.4);font-family:ui-monospace,Menlo,monospace;font-size:10px;
          ">no flash</div>
        `;
      },
    },
    {
      label: 'Peak',
      sublabel: '0% · opacity 1 · #DC1E1E66',
      render: (s) => {
        s.innerHTML = `
          <div style="
            width:100%;height:64px;
            background:rgba(220,30,30,0.4);
            border-radius:6px;
          "></div>
        `;
      },
    },
    {
      label: 'Mid',
      sublabel: '50% · opacity .5',
      render: (s) => {
        s.innerHTML = `
          <div style="
            width:100%;height:64px;
            background:rgba(220,30,30,0.2);
            border-radius:6px;
          "></div>
        `;
      },
    },
    {
      label: 'Settled',
      sublabel: '100% · opacity 0',
      render: (s) => { s.innerHTML = '<div class="frame-ghost">overlay invisible</div>'; },
    },
  ],

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const seconds = (duration / 1000).toFixed(2);
    return {
      web: `/* CardSharksOverlay.css */
@keyframes cs-flash {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}

.cs-overlay__flash {
  position: absolute;
  inset: 0;
  background: rgba(220, 30, 30, 0.4);
  animation: cs-flash ${duration}ms ${bezierToCss(easing.bezier)} forwards;
  z-index: 51;
  pointer-events: none;
}

/* Mount with a key={questionNumber} so React remounts the node every
   time a new wrong answer happens — animation replays on each mount. */`,
      android: `// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay

@Composable
fun WrongFlash(trigger: Int) {
    var alpha by remember { mutableStateOf(0f) }
    LaunchedEffect(trigger) {
        if (trigger == 0) return@LaunchedEffect
        alpha = 1f
        val anim = Animatable(1f)
        anim.animateTo(0f, tween(${duration}, easing = CubicBezierEasing(${b1.toFixed(2)}f, ${b2.toFixed(2)}f, ${b3.toFixed(2)}f, ${b4.toFixed(2)}f)))
        alpha = anim.value
    }
    Box(
        Modifier
            .fillMaxSize()
            .background(Color(0xFFDC1E1E).copy(alpha = 0.4f * alpha))
    )
}`,
      ios: `// SwiftUI — tvOS
import SwiftUI

struct WrongFlash: View {
    let trigger: Int
    @State private var alpha: Double = 0
    var body: some View {
        Color.red.opacity(0.4 * alpha)
            .ignoresSafeArea()
            .allowsHitTesting(false)
            .onChange(of: trigger) { _ in
                alpha = 1
                withAnimation(.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${seconds})) {
                    alpha = 0
                }
            }
    }
}`,
      roku: `<!-- Roku SceneGraph — components/WrongFlash.xml -->
<component name="WrongFlash" extends="Group">
  <interface>
    <field id="trigger" type="integer" alwaysNotify="true" onChange="onTriggerChange" />
  </interface>

  <children>
    <Rectangle id="flash" color="0xDC1E1E66" width="1920" height="1080" opacity="0" />
    <Animation id="flashAnim" duration="${seconds}" easeFunction="outQuad" repeat="false">
      <FloatFieldInterpolator
        fieldToInterp="flash.opacity"
        keyValue="[ 1, 0 ]"
        key="[ 0, 1 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onTriggerChange()
      m.top.findNode("flashAnim").control = "start"
    end sub
  </script>
</component>`,
    };
  },

  pmTicket() {
    return `Title: Wrong-answer red flash overlay

Trigger: the player submits an incorrect answer in any game (Card Sharks, Family Feud, Match Game).

Visual behavior:
  · A full-screen red layer (RGBA 220,30,30,0.4) fades in instantly and out over 600 ms.
  · The layer sits ABOVE the game UI but is non-interactive (pointer-events: none).
  · Plays exactly once per wrong answer.

Timings:
  · 600 ms total, ease-out (cubic-bezier(0, 0, 0.2, 1)).
  · No delay, no loop.

Acceptance criteria:
  · Animation replays on every distinct wrong answer (remount node by key).
  · The flash must not block touches / D-pad presses.
  · Tonally subdued — strong enough to register peripherally, not aggressive.`;
  },
};
