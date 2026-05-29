import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { injectStyle } from '../../lib/injectStyle';

const CSS = `
.preview-hl-note {
  display: flex; flex-direction: column; gap: 8px;
  padding: 32px 36px;
  background: rgba(0, 0, 0, 0.8);
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.4;
  color: #fff;
  max-width: 740px;
  opacity: 0;
}
.preview-hl-note.is-shown {
  animation: cs-stage-in 420ms cubic-bezier(0.18, 0.89, 0.32, 1.15) forwards;
}
.preview-hl-note__line {
  display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
}
.preview-hl-note__key {
  flex-shrink: 0;
  width: 52px; height: 52px;
  background: #fff;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: inset 0 -5px 0 0 rgba(0,0,0,0.25);
}
.preview-hl-note__key--down { transform: rotate(180deg); }
.preview-hl-note__arrow {
  width: 0; height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 16px solid #1a1d24;
}

@keyframes cs-stage-in {
  0%   { opacity: 0; transform: translate(-30px, -16px) scale(0.96); }
  100% { opacity: 1; transform: translate(0, 0) scale(1); }
}
`;

let note: HTMLElement | null = null;

function frameNote(slot: HTMLElement, tx: number, ty: number, scale: number, opacity: number) {
  slot.innerHTML = `
    <div style="
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      border-radius:6px;padding:8px 10px;
      font-family:Arial,Helvetica,sans-serif;color:#fff;font-size:11px;line-height:1.4;
      transform:translate(${tx}px, ${ty}px) scale(${scale});
      opacity:${opacity};
      max-width:140px;
    ">Use ▲ / ▼ to make your selections.</div>
  `;
}

export const InfoNote: AnimationModule = {
  id: 'cs-info-note',
  title: 'Info Note',
  game: 'Card Sharks',
  description:
    'Persistent D-pad helper that lives in the bottom-left of the player screen. Black-glass card with two-line text and inline white key-cap glyphs for ↑ / ↓ that mirror the Higher/Lower buttons. Slides up-and-right into place on mount and then stays static.',
  defaults: { duration: 420, easingId: 'back-out' },
  frames: [
    { label: 'Start',   sublabel: '0% · translate −30,−16 · scale .96', render: (s) => frameNote(s, -30, -16, 0.96, 0) },
    { label: 'Mid',     sublabel: '50% · translate −15,−8 · scale .98', render: (s) => frameNote(s, -15, -8,  0.98, 0.5) },
    { label: 'Settled', sublabel: '100% · translate 0,0 · scale 1',     render: (s) => frameNote(s, 0,   0,   1,    1) },
  ],

  render(stage) {
    injectStyle('css-cs-info-note', CSS);
    stage.innerHTML = `
      <div class="preview-hl-note">
        <div class="preview-hl-note__line">
          <span>Use the</span>
          <span class="preview-hl-note__key"><span class="preview-hl-note__arrow"></span></span>
          <span>(Up) and</span>
          <span class="preview-hl-note__key preview-hl-note__key--down"><span class="preview-hl-note__arrow"></span></span>
          <span>(Down) buttons on</span>
        </div>
        <div class="preview-hl-note__line">
          <span>your TV remote to make your selections.</span>
        </div>
      </div>
    `;
    note = stage.querySelector('.preview-hl-note');
    return () => { stage.innerHTML = ''; note = null; };
  },

  play({ duration, easing }) {
    if (!note) return;
    note.classList.remove('is-shown');
    note.style.animation = 'none';
    note.style.opacity = '0';
    void note.offsetWidth;
    note.style.animation = `cs-stage-in ${duration}ms ${bezierToCss(easing.bezier)} forwards`;
  },

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const seconds = (duration / 1000).toFixed(2);
    return {
      web: `/* HigherLowerNote.css + CardSharksOverlay.css */
.hl-note {
  display: flex; flex-direction: column; gap: 8px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.8);
  border: var(--ui-border);
  border-radius: var(--ui-radius);
  font-family: var(--font-body);
  font-size: 36px;
  font-weight: 500;
  line-height: 38px;
  color: #ffffff;
}

.hl-note__line {
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
}

/* Inline key cap — same look as the main Higher/Lower buttons. */
.hl-note__key {
  width: 64px; height: 64px;
  background: #ffffff;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: inset 0 -6px 0 0 rgba(0, 0, 0, 0.25);
}
.hl-note__key--down { transform: rotate(180deg); }

/* Slide-in entry (mount only, no exit animation). */
@keyframes cs-stage-in {
  0%   { opacity: 0; transform: translate(-30px, -16px) scale(0.96); }
  100% { opacity: 1; transform: translate(0, 0) scale(1); }
}

.hl-note {
  animation: cs-stage-in ${duration}ms ${bezierToCss(easing.bezier)} backwards;
}`,
      android: `// Jetpack Compose — Android TV
import androidx.compose.animation.*
import androidx.compose.animation.core.*

@Composable
fun HigherLowerNote(visible: Boolean) {
    val easing = CubicBezierEasing(${b1.toFixed(2)}f, ${b2.toFixed(2)}f, ${b3.toFixed(2)}f, ${b4.toFixed(2)}f)
    AnimatedVisibility(
        visible = visible,
        enter = (
            slideIn(initialOffset = { IntOffset(-30, -16) }, animationSpec = tween(${duration}, easing = easing))
            + scaleIn(initialScale = 0.96f, animationSpec = tween(${duration}, easing = easing))
            + fadeIn(animationSpec = tween(${duration}, easing = easing))
        )
    ) {
        Column(
            modifier = Modifier
                .background(Color(0xCC000000), RoundedCornerShape(16.dp))
                .padding(40.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                Text("Use the")
                KeyCap(direction = Direction.Up)
                Text("(Up) and")
                KeyCap(direction = Direction.Down)
                Text("(Down) buttons on")
            }
            Text("your TV remote to make your selections.")
        }
    }
}`,
      ios: `// SwiftUI — tvOS
import SwiftUI

struct HigherLowerNote: View {
    var visible: Bool
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(spacing: 16) {
                Text("Use the")
                KeyCap(direction: .up)
                Text("(Up) and")
                KeyCap(direction: .down)
                Text("(Down) buttons on")
            }
            Text("your TV remote to make your selections.")
        }
        .font(.system(size: 36, weight: .medium))
        .foregroundColor(.white)
        .padding(40)
        .background(Color.black.opacity(0.8))
        .cornerRadius(16)
        .offset(x: visible ? 0 : -30, y: visible ? 0 : -16)
        .scaleEffect(visible ? 1.0 : 0.96)
        .opacity(visible ? 1.0 : 0.0)
        .animation(
            .timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${seconds}),
            value: visible
        )
    }
}`,
      roku: `<!-- Roku SceneGraph — components/HigherLowerNote.xml -->
<component name="HigherLowerNote" extends="Group">
  <interface>
    <field id="visible" type="boolean" alwaysNotify="true" onChange="onVisibleChange" />
  </interface>

  <children>
    <Group id="note">
      <Rectangle id="bg" color="0x000000CC" />
      <!-- text labels + key caps composed inside -->
    </Group>
    <Animation id="slideIn" duration="${seconds}" easeFunction="outBack" repeat="false">
      <Vector2DFieldInterpolator
        fieldToInterp="note.translation"
        keyValue="[ [-30,-16], [0,0] ]"
        key="[ 0, 1 ]" />
      <Vector2DFieldInterpolator
        fieldToInterp="note.scale"
        keyValue="[ [0.96,0.96], [1,1] ]"
        key="[ 0, 1 ]" />
      <FloatFieldInterpolator
        fieldToInterp="note.opacity"
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
    return `Title: Card Sharks — D-pad helper note (HigherLowerNote) entry animation

Component: a small instructional card pinned to the bottom-left of the player screen telling the player which remote buttons map to Higher / Lower.

Content:
  "Use the [▲ key] (Up) and [▼ key] (Down) buttons on your TV remote to make your selections."

  The two inline glyphs are the SAME 64×64 white key caps used by the Higher/Lower buttons — the visual link between note and live UI is intentional.

Visual behavior on mount:
  · Slides into position from −30 px left and −16 px above its resting spot.
  · Scales from 0.96 → 1.0 simultaneously, and fades in.
  · The motion uses a back-ease overshoot so the note "lands".
  · After landing, the note is static — no looping motion, no exit animation.

Timings:
  · 420 ms, easing cubic-bezier(0.18, 0.89, 0.32, 1.15).

Acceptance criteria:
  · Animation only plays on mount; toggling content inside the note must not re-trigger it.
  · The note persists across both the answering and result phases of Card Sharks.
  · When dismissed, just remove from the tree — do not play an exit animation.`;
  },
};
