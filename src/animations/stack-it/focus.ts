import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { injectStyle } from '../../lib/injectStyle';
import { SI, SI_BASE_CSS, frameChip } from './shared';

const CSS = `
.preview-si-focus { width: 520px; height: 296px; }
.preview-si-focus .preview-si-chip { left: 150px; width: 220px; height: 42px; }
.preview-si-focus .preview-si-chip.is-big { transform: scale(1.09); font-size: 17px; z-index: 5; }
.preview-si-arrows {
  position: absolute; left: 384px; width: 20px; height: 38px;
  display: flex; flex-direction: column; justify-content: space-between; align-items: center;
}
.preview-si-arrows[hidden] { display: none; }
.preview-si-arrows i { width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; }
.preview-si-arrows i.up { border-bottom: 11px solid ${SI.goldHi}; }
.preview-si-arrows i.dn { border-top: 11px solid ${SI.goldHi}; }
.preview-si-arrows i.up.off { border-bottom-color: ${SI.lav}; }
.preview-si-arrows i.dn.off { border-top-color: ${SI.lav}; }
.preview-si-hint {
  position: absolute; left: 50%; top: 236px; height: 44px; transform: translateX(-50%);
  display: flex; align-items: center; gap: 8px; padding: 0 16px;
  border-radius: 10px; background: rgba(7,7,26,0.9);
  color: #fff; font-weight: 500; font-size: 15px; white-space: nowrap;
}
.preview-si-key {
  display: inline-flex; align-items: center; justify-content: center;
  width: 26px; height: 26px; border-radius: 4px; background: #fff; color: #000;
  box-shadow: inset 0 -3px 0 #c9c9d4; font-weight: 600; font-size: 12px;
}
`;

const TOPS = [18, 70, 122, 174];
const LABELS = ['Guitar', 'Piano/Keyboard', 'Violin/Fiddle', 'Trumpet'];
// Block moves use the Block Swap motion, independent of this card's Duration.
const MOVE_MS = 450;
const ARROWS_MS = 300;
const GLIDE = 'cubic-bezier(0.3, 0.9, 0.3, 1)';

let chips: HTMLElement[] = [];
let arrows: HTMLElement | null = null;
let hint: HTMLElement | null = null;
let timers: number[] = [];

function clearTimers() { timers.forEach(clearTimeout); timers = []; }

function setHint(label: string, ok: string) {
  if (!hint) return;
  hint.innerHTML = `<span>${label}</span><span class="preview-si-key">▲</span><span class="preview-si-key">▼</span><span>${ok}</span><span class="preview-si-key">Ok</span>`;
}

export const Focus: AnimationModule = {
  id: 'si-focus',
  title: 'Focus & Pick Up',
  game: 'Stack It',
  description:
    'Remote focus on a chip. In the tray, focus is a gold ring with a soft glow. Once the stack is full, the focused block also grows to 109 % so it reads as "selectable". Pressing OK picks the block up: it shrinks back to 100 %, keeps the ring, and ▲ ▼ arrows appear next to it and travel with it. OK again drops the block: the arrows disappear and it grows back to the focused size.',
  defaults: { duration: 200, easingId: 'ease' },
  frames: [
    { label: 'Idle',       sublabel: 'white 2px border',                      render: (s) => frameChip(s, { text: 'Harp' }) },
    { label: 'Focus',      sublabel: 'tray · gold ring + glow',               render: (s) => frameChip(s, { text: 'Harp', focus: true }) },
    { label: 'Focus (stack)', sublabel: 'scale 1.09 · font 13 → 17px',       render: (s) => frameChip(s, { text: 'Harp', focus: true, scale: 1.09, fontSize: 12 }) },
    { label: 'Picked up',  sublabel: 'scale 1 · ring stays · ▲▼ shown',      render: (s) => frameChip(s, { text: 'Harp ▴▾', focus: true }) },
  ],

  render(stage) {
    injectStyle('css-si-base', SI_BASE_CSS);
    injectStyle('css-si-focus', CSS);
    stage.innerHTML = `
      <div class="preview-si-board preview-si-focus">
        ${LABELS.map((l, i) => `<div class="preview-si-chip" style="top:${TOPS[i]}px">${l}</div>`).join('')}
        <div class="preview-si-arrows" hidden><i class="up"></i><i class="dn"></i></div>
        <div class="preview-si-hint"></div>
      </div>
    `;
    chips = Array.from(stage.querySelectorAll<HTMLElement>('.preview-si-chip'));
    arrows = stage.querySelector('.preview-si-arrows');
    hint = stage.querySelector('.preview-si-hint');
    chips[0].classList.add('is-focus', 'is-big');
    setHint('Choose a block', 'OK pick it up');
    return () => { clearTimers(); stage.innerHTML = ''; chips = []; arrows = null; hint = null; };
  },

  play({ duration, easing }) {
    if (!chips.length || !arrows) return;
    clearTimers();
    const ez = bezierToCss(easing.bezier);
    const order = LABELS.map((_, i) => i);   // order[slot] = chip index
    let sel = 1;                              // slot of the picked-up block
    const layout = () => {
      order.forEach((chipIdx, slot) => { chips[chipIdx].style.top = `${TOPS[slot]}px`; });
      if (arrows) {
        arrows.style.top = `${TOPS[sel] + 2}px`;
        arrows.children[0].classList.toggle('off', sel <= 0);
        arrows.children[1].classList.toggle('off', sel >= TOPS.length - 1);
      }
    };

    chips.forEach((c) => { c.style.transition = 'none'; c.classList.remove('is-focus', 'is-big'); });
    arrows.style.transition = 'none';
    chips[0].classList.add('is-focus', 'is-big');
    arrows.hidden = true;
    layout();
    setHint('Choose a block', 'OK pick it up');
    void chips[0].offsetWidth;
    chips.forEach((c) => {
      c.style.transition = [
        ...['transform', 'border-color', 'box-shadow', 'font-size'].map((p) => `${p} ${duration}ms ${ez}`),
        `top ${MOVE_MS}ms ${GLIDE}`,
      ].join(', ');
    });
    arrows.style.transition = `top ${ARROWS_MS}ms ease`;

    let t = 150;
    const at = (delay: number, fn: () => void) => { t += delay; timers.push(window.setTimeout(fn, t)); };

    // ▼ — focus moves to the next block.
    at(0, () => {
      chips[0].classList.remove('is-focus', 'is-big');
      chips[1].classList.add('is-focus', 'is-big');
    });

    // OK — pick the block up: scale back to 1, ring stays, arrows appear next to it.
    at(duration + 700, () => {
      chips[order[sel]].classList.remove('is-big');
      layout();
      if (arrows) arrows.hidden = false;
      setHint('Move', 'OK drop');
    });

    // ▼ ▼ — block and arrows travel together.
    const moveDown = () => {
      if (sel >= TOPS.length - 1) return;
      [order[sel], order[sel + 1]] = [order[sel + 1], order[sel]];
      sel += 1;
      layout();
    };
    at(900, moveDown);
    at(MOVE_MS + 350, moveDown);

    // OK — drop: arrows hide, block is focused (enlarged) again.
    at(MOVE_MS + 600, () => {
      if (arrows) arrows.hidden = true;
      chips[order[sel]].classList.add('is-big');
      setHint('Choose a block', 'OK pick it up');
    });
  },

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const seconds = (duration / 1000).toFixed(2);
    const ez = bezierToCss(easing.bezier);
    return {
      web: `/* StackItOverlay.css */
.si-chip {
  /* Strokes are OUTSIDE in Stacked - option: white 4, yellow 8 on focus. */
  box-shadow: 0 0 0 .21cqw #fff, 0 .25cqw .5cqw #0006;
  transition: transform ${duration}ms ${ez}, box-shadow ${duration}ms ${ez}, font-size ${duration}ms ${ez};
}

/* Remote focus (tray) and picked-up block (stack) share the gold ring */
.si-chip--focus,
.si-chip--moving {
  box-shadow: 0 0 0 .42cqw ${SI.gold}, 0 0 .94cqw .42cqw #fff60099, 0 .25cqw .5cqw #0006;
  z-index: 4;
}

/* Focus while the stack is full ("Choose a block") */
.si-chip--big { transform: scale(1.09); font-size: 1.55cqw; z-index: 5; }

/* ▲ ▼ next to the picked-up block; lavender when that direction is blocked */
.si-arrows      { transition: top .3s; }
.si-arrows .up  { border-bottom: 1.1cqw solid ${SI.goldHi}; }
.si-arrows .dn  { border-top:    1.1cqw solid ${SI.goldHi}; }
.si-arrows .up.off { border-bottom-color: ${SI.lav}; }
.si-arrows .dn.off { border-top-color:    ${SI.lav}; }`,
      android: `// Jetpack Compose — Android TV
@Composable
fun StackBlock(text: String, focused: Boolean, stackFull: Boolean, pickedUp: Boolean) {
    val easing = CubicBezierEasing(${b1}f, ${b2}f, ${b3}f, ${b4}f)
    val spec = tween<Float>(${duration}, easing = easing)
    val ringOn = focused || pickedUp
    val scale by animateFloatAsState(if (focused && stackFull && !pickedUp) 1.09f else 1f, spec, label = "scale")
    val ring by animateColorAsState(if (ringOn) Color(0xFFD9A80B) else Color.White, tween(${duration}), label = "ring")
    val glow by animateFloatAsState(if (ringOn) 1f else 0f, spec, label = "glow")

    Box(
        Modifier
            .graphicsLayer { scaleX = scale; scaleY = scale }
            .shadow((12 * glow).dp, CircleShape, ambientColor = Color(0x66FFC800), spotColor = Color(0x66FFC800))
            .border(if (ringOn) 3.dp else 2.dp, ring, CircleShape)
            .background(chipGradient, CircleShape)
    ) { /* label */ }
}`,
      ios: `// SwiftUI — tvOS
struct StackBlock: View {
    let text: String
    let focused: Bool, stackFull: Bool, pickedUp: Bool
    private let gold = Color(red: 0.85, green: 0.66, blue: 0.04)

    var body: some View {
        let ringOn = focused || pickedUp
        Text(text.uppercased())
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Capsule().fill(chipGradient))
            .overlay(Capsule().stroke(ringOn ? gold : .white, lineWidth: ringOn ? 4 : 3))
            .shadow(color: ringOn ? Color(red: 1, green: 0.78, blue: 0).opacity(0.4) : .clear, radius: 12)
            .scaleEffect(focused && stackFull && !pickedUp ? 1.09 : 1)
            .animation(.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${seconds}), value: focused)
            .animation(.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${seconds}), value: pickedUp)
    }
}`,
      roku: `<!-- Roku SceneGraph — components/StackBlock.xml -->
<component name="StackBlock" extends="Group">
  <interface>
    <field id="state" type="string" onChange="onStateChange" /> <!-- idle | focus | big | picked -->
  </interface>
  <children>
    <Poster id="ring" uri="pkg:/images/chip_ring_gold.png" opacity="0" />
    <Poster id="bg"   uri="pkg:/images/chip_9patch.png" />
    <Animation id="anim" duration="${seconds}" easeFunction="inOutQuad">
      <Vector2DFieldInterpolator id="sc" fieldToInterp="m.top.scale" key="[0, 1]" />
      <FloatFieldInterpolator   id="rg" fieldToInterp="ring.opacity" key="[0, 1]" />
    </Animation>
  </children>
  <script type="text/brightscript">
    sub onStateChange()
      s = m.top.state
      big = (s = "big")
      ringOn = (s <> "idle")
      ' Set m.top.scaleRotateCenter to the block centre once in init().
      target = [1.0, 1.0]
      if big then target = [1.09, 1.09]
      ringTo = 0.0
      if ringOn then ringTo = 1.0
      m.top.findNode("sc").keyValue = [ m.top.scale, target ]
      m.top.findNode("rg").keyValue = [ m.top.findNode("ring").opacity, ringTo ]
      m.top.findNode("anim").control = "start"
      m.top.findNode("arrows").visible = (s = "picked")
    end sub
  </script>
</component>`,
    };
  },

  pmTicket() {
    return `Title: Stack It — Focus ring and "pick up a block" state

Trigger: remote navigation (◀ ▶ ▲ ▼) over answer chips / stack blocks, and OK on a block once the stack is full.

Visual behavior:
  · Tray (picking answers): the focused chip gets a gold ring (#D9A80B, thicker border) plus a soft gold glow. No scale.
  · Full stack ("Choose a block ▲▼ / OK pick it up"): the focused block also scales to 1.09 and the font grows (1.2 → 1.55 cqw).
  · OK picks the block up: scale returns to 1.0, the gold ring stays, ▲ ▼ arrows appear to the right of the block. The hint switches to "Move ▲▼ / OK drop".
  · An arrow turns lavender (#7B7FD6) when the block can't move further in that direction.

Timings:
  · Ring, glow, scale, font-size: 200 ms, ease.
  · Arrows follow the block: 300 ms (top).

Acceptance criteria:
  · Only one element carries the gold ring at a time.
  · Scale grows from the block centre; neighbours don't shift.
  · Back while a block is picked up restores the stack order from before the pick-up.`;
  },
};
