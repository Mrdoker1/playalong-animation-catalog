import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { rokuEaseFunction } from '../../lib/snippets';
import { injectStyle } from '../../lib/injectStyle';
import { SI, SI_BASE_CSS, frameChip } from './shared';

const CSS = `
.preview-si-place { width: 520px; height: 260px; }
.preview-si-place__slot {
  position: absolute; left: 300px; width: 196px; height: 44px;
  border-radius: 21px;
  background: rgba(10,16,60,0.55);
  border: 1.5px solid rgba(123,127,214,0.45);
  box-sizing: border-box;
}
.preview-si-place .preview-si-ghost { left: 24px; top: 104px; width: 160px; height: 40px; opacity: 0; transition: opacity 200ms; }
.preview-si-place .preview-si-chip.is-in-slot { font-size: 14px; }
`;

const SLOT_TOPS = [20, 78, 136, 194];
const HOME = { left: 24, top: 104, width: 160, height: 40 };
const SLOT = { left: 300, top: SLOT_TOPS[0], width: 196, height: 44 };

let chip: HTMLElement | null = null;
let ghost: HTMLElement | null = null;
let timers: number[] = [];

function clearTimers() { timers.forEach(clearTimeout); timers = []; }

function place(el: HTMLElement, p: { left: number; top: number; width: number; height: number }) {
  Object.assign(el.style, { left: `${p.left}px`, top: `${p.top}px`, width: `${p.width}px`, height: `${p.height}px` });
}

export const ChipPlace: AnimationModule = {
  id: 'si-chip-place',
  title: 'Answer → Slot',
  game: 'Stack It',
  description:
    'Pressing OK on an answer chip glides it from the answer tray into the first free slot of the stack. The chip morphs to the slot size on the way, keeps the gold ring while the player chooses a slot, and a dashed ghost marks the spot it left. When five answers are placed, the sixth fills the last slot automatically after 450 ms.',
  defaults: { duration: 450, easingId: 'glide' },
  frames: [
    { label: 'Picked',  sublabel: '0% · in tray · gold ring',          render: (s) => frameChip(s, { text: 'Guitar', focus: true }) },
    { label: 'Gliding', sublabel: '~40% · ~85% of the way (glide)',    render: (s) => frameChip(s, { text: 'Guitar', focus: true, extra: 'width:150px;transform:translateX(10px)' }) },
    { label: 'In slot', sublabel: '100% · slot size · font 13 → 14px', render: (s) => frameChip(s, { text: 'Guitar', focus: true, fontSize: 11, extra: 'width:160px' }) },
    { label: 'Locked',  sublabel: 'OK · ring → white · 200 ms',        render: (s) => frameChip(s, { text: 'Guitar', fontSize: 11, extra: 'width:160px' }) },
  ],

  render(stage) {
    injectStyle('css-si-base', SI_BASE_CSS);
    injectStyle('css-si-chip-place', CSS);
    stage.innerHTML = `
      <div class="preview-si-board preview-si-place">
        ${SLOT_TOPS.map((t) => `<div class="preview-si-place__slot" style="top:${t}px"></div>`).join('')}
        <div class="preview-si-ghost"></div>
        <div class="preview-si-chip is-focus">Guitar</div>
      </div>
    `;
    chip = stage.querySelector('.preview-si-chip');
    ghost = stage.querySelector('.preview-si-ghost');
    if (chip) place(chip, HOME);
    return () => { clearTimers(); stage.innerHTML = ''; chip = null; ghost = null; };
  },

  play({ duration, easing }) {
    if (!chip || !ghost) return;
    clearTimers();
    const ez = bezierToCss(easing.bezier);
    chip.style.transition = 'none';
    chip.classList.add('is-focus');
    chip.classList.remove('is-in-slot');
    ghost.style.opacity = '0';
    place(chip, HOME);
    void chip.offsetWidth;

    chip.style.transition =
      `left ${duration}ms ${ez}, top ${duration}ms ${ez}, width ${duration}ms ease, height ${duration}ms ease, ` +
      `font-size 200ms, border-color 200ms, box-shadow 200ms`;
    place(chip, SLOT);
    chip.classList.add('is-in-slot');
    ghost.style.opacity = '1';

    // Player confirms the slot with OK → gold ring drops.
    timers.push(window.setTimeout(() => chip?.classList.remove('is-focus'), duration + 500));
  },

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const seconds = (duration / 1000).toFixed(2);
    const ez = bezierToCss(easing.bezier);
    const roku = rokuEaseFunction(easing);
    return {
      web: `/* StackItOverlay.css
   Chips are absolutely positioned; JS writes left/top/width/height in % of
   the 16:9 stage (tray cell or slot rect). The transition does the glide. */
.si-chip {
  position: absolute;
  border-radius: 1.667cqw;
  background: linear-gradient(0deg, #EDF3FE 0%, #ACCAEB 100%);
  /* Both strokes are OUTSIDE in Stacked - option: white 4 at rest, yellow 8 on
     focus. Outer shadows -- a border would draw them inside the chip. */
  box-shadow: 0 0 0 .21cqw #fff, 0 .25cqw .5cqw #0006;
  font-size: 1.2cqw;
  transition:
    left   ${duration}ms ${ez},
    top    ${duration}ms ${ez},
    width  ${duration}ms ease,
    height ${duration}ms ease,
    transform .2s, box-shadow .2s, font-size .2s;
}
.si-chip--in-slot { font-size: 1.3cqw; }
.si-chip--moving  { box-shadow: 0 0 0 .42cqw ${SI.gold}, 0 0 .94cqw .42cqw #fff60099, 0 .25cqw .5cqw #0006; z-index: 4; }

/* Dashed outline left behind in the tray */
.si-ghost { border: .21cqw dashed #a3a8cc99; border-radius: 1.667cqw; transition: opacity .2s; }

@media (prefers-reduced-motion: reduce) { .si-chip { transition: none; } }`,
      android: `// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.ui.unit.*

@Composable
fun StackChip(text: String, target: DpRect, moving: Boolean) {
    val glide = CubicBezierEasing(${b1}f, ${b2}f, ${b3}f, ${b4}f)
    val pos by animateDpOffsetAsState(
        targetValue = DpOffset(target.left, target.top),
        animationSpec = tween(${duration}, easing = glide), label = "chipPos"
    )
    val size by animateDpSizeAsState(
        targetValue = DpSize(target.width, target.height),
        animationSpec = tween(${duration}, easing = FastOutSlowInEasing), label = "chipSize"
    )
    val ring by animateColorAsState(
        if (moving) Color(0xFFD9A80B) else Color.White, tween(200), label = "ring"
    )
    Box(
        Modifier
            .offset { IntOffset(pos.x.roundToPx(), pos.y.roundToPx()) }
            .size(size)
            .border(if (moving) 3.dp else 2.dp, ring, CircleShape)
            .background(chipGradient, CircleShape),
        contentAlignment = Alignment.Center
    ) { Text(text.uppercase(), color = Color(0xFF0C1240), fontWeight = FontWeight.SemiBold) }
}`,
      ios: `// SwiftUI — tvOS
import SwiftUI

struct StackChip: View {
    let text: String
    let frame: CGRect      // tray cell or slot rect, in stage coordinates
    let moving: Bool

    var body: some View {
        Text(text.uppercased())
            .font(.custom("Rubik-SemiBold", size: 20))
            .foregroundColor(Color(red: 0.05, green: 0.07, blue: 0.25))
            .frame(width: frame.width, height: frame.height)
            .background(Capsule().fill(chipGradient))
            .overlay(Capsule().stroke(moving ? Color(red: 0.85, green: 0.66, blue: 0.04) : .white,
                                      lineWidth: moving ? 4 : 3))
            .position(x: frame.midX, y: frame.midY)
            .animation(.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${seconds}), value: frame)
            .animation(.easeInOut(duration: 0.2), value: moving)
    }
}`,
      roku: `<!-- Roku SceneGraph — components/StackChip.xml -->
<component name="StackChip" extends="Group">
  <interface>
    <field id="target" type="vector2d" onChange="onTargetChange" />
  </interface>

  <children>
    <Poster id="bg" uri="pkg:/images/chip_9patch.png" />
    <Label  id="label" horizAlign="center" vertAlign="center" />
    <Animation id="glide" duration="${seconds}" easeFunction="${roku.name}" repeat="false">
      <Vector2DFieldInterpolator id="move" fieldToInterp="m.top.translation" key="[ 0, 1 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    ' ${roku.note || 'Easing matches the catalog preset.'}
    ' Width/height morph: resize bg + label in the same frame or swap to the slot-sized 9-patch at 50%.
    sub onTargetChange()
      move = m.top.findNode("move")
      move.keyValue = [ m.top.translation, m.top.target ]
      m.top.findNode("glide").control = "start"
    end sub
  </script>
</component>`,
    };
  },

  pmTicket() {
    return `Title: Stack It — Answer chip glides into the stack

Trigger: player highlights an answer in the tray and presses OK (or the 6th answer auto-fills after the 5th is locked).

Visual behavior:
  · The chip glides from its tray cell to the first free slot from the top, resizing to the slot width/height on the way.
  · While the player picks a slot (▲ ▼), the chip keeps a gold ring (#D9A80B + soft glow); each ▲ ▼ glides it to the next free slot with the same motion.
  · A dashed outline stays in the tray where the chip used to be.
  · OK locks the chip: the gold ring fades back to white (200 ms). Back sends the chip to the tray with the same glide.
  · After the 5th chip is locked, the last remaining chip auto-glides into the last free slot after a 450 ms pause.

Timings:
  · Position: 450 ms, cubic-bezier(0.3, 0.9, 0.3, 1) ("glide").
  · Size: 450 ms, ease. Ring / glow / font-size: 200 ms.

Acceptance criteria:
  · Position and size animate together — no jump at the start or end.
  · Rapid ▲ ▼ presses retarget the glide from the chip's current spot (no snapping).
  · Reduced-motion setting: chips jump instantly.`;
  },
};
