import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { rokuEaseFunction } from '../../lib/snippets';
import { injectStyle } from '../../lib/injectStyle';
import { SI, SI_BASE_CSS } from './shared';

const CSS = `
.preview-si-reorder { width: 520px; height: 236px; }
.preview-si-reorder .preview-si-chip { left: 150px; width: 220px; height: 42px; }
.preview-si-reorder .preview-si-arrows {
  position: absolute; left: 384px; width: 20px; height: 38px;
  display: flex; flex-direction: column; justify-content: space-between; align-items: center;
}
.preview-si-reorder .preview-si-arrows i { width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; }
.preview-si-reorder .preview-si-arrows i.up { border-bottom: 11px solid ${SI.goldHi}; }
.preview-si-reorder .preview-si-arrows i.dn { border-top: 11px solid ${SI.goldHi}; }
.preview-si-reorder .preview-si-arrows i.up.off { border-bottom-color: ${SI.lav}; }
.preview-si-reorder .preview-si-arrows i.dn.off { border-top-color: ${SI.lav}; }
`;

const TOPS = [20, 72, 124, 176];
const LABELS = ['Harp', 'Guitar', 'Trumpet', 'Bagpipes'];
const ARROW_RATIO = 300 / 450;

let chips: HTMLElement[] = [];
let arrows: HTMLElement | null = null;
let order: number[] = [];   // order[slot] = chip index
let sel = 0;                // slot of the picked-up block
let timers: number[] = [];

function clearTimers() { timers.forEach(clearTimeout); timers = []; }

function layout() {
  order.forEach((chipIdx, slot) => { chips[chipIdx].style.top = `${TOPS[slot]}px`; });
  chips.forEach((c, i) => c.classList.toggle('is-focus', i === order[sel]));
  if (arrows) {
    arrows.style.top = `${TOPS[sel] + 2}px`;
    arrows.children[0].classList.toggle('off', sel <= 0);
    arrows.children[1].classList.toggle('off', sel >= TOPS.length - 1);
  }
}

function swap(dir: 1 | -1) {
  const to = sel + dir;
  if (to < 0 || to >= TOPS.length) return;
  [order[sel], order[to]] = [order[to], order[sel]];
  sel = to;
  layout();
}

function frameStack(slot: HTMLElement, tops: [number, number], arrowTop: number) {
  const chip = (text: string, top: number, focus: boolean) => `
    <div style="
      position:absolute;left:10px;top:${top}px;width:120px;height:24px;box-sizing:border-box;
      display:flex;align-items:center;justify-content:center;border-radius:11px;
      background:${SI.chipBg};border:${focus ? `2.5px solid ${SI.gold}` : '1.5px solid #fff'};
      box-shadow:${focus ? '0 0 8px rgba(255,200,0,0.45),' : ''}0 2px 4px rgba(0,0,0,0.4);
      color:${SI.ink};font-family:${SI.font};font-weight:600;font-size:9px;text-transform:uppercase;
      z-index:${focus ? 2 : 1};
    ">${text}</div>`;
  slot.innerHTML = `
    <div style="position:relative;width:160px;height:58px;">
      ${chip('Guitar', tops[1], false)}
      ${chip('Harp', tops[0], true)}
      <div style="position:absolute;left:138px;top:${arrowTop}px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:7px solid ${SI.goldHi};"></div>
      <div style="position:absolute;left:138px;top:${arrowTop + 15}px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:7px solid ${SI.goldHi};"></div>
    </div>`;
}

export const Reorder: AnimationModule = {
  id: 'si-reorder',
  title: 'Block Swap',
  game: 'Stack It',
  description:
    'While the timer runs, the player can pick up a block and move it with ▲ ▼. Each press swaps the block with its neighbour: both blocks glide past each other at the same time, and the ▲ ▼ arrows follow a bit faster. An arrow turns lavender at the top or bottom of the stack.',
  defaults: { duration: 450, easingId: 'glide' },
  frames: [
    { label: 'Picked up', sublabel: 'slot 1 · gold ring · ▲▼',            render: (s) => frameStack(s, [4, 32], 6) },
    { label: 'Crossing',  sublabel: '~40% · blocks pass each other',      render: (s) => frameStack(s, [26, 10], 26) },
    { label: 'Swapped',   sublabel: '100% · slot 2 · arrows land at 67%', render: (s) => frameStack(s, [32, 4], 34) },
  ],

  render(stage) {
    injectStyle('css-si-base', SI_BASE_CSS);
    injectStyle('css-si-reorder', CSS);
    stage.innerHTML = `
      <div class="preview-si-board preview-si-reorder">
        ${LABELS.map((l) => `<div class="preview-si-chip">${l}</div>`).join('')}
        <div class="preview-si-arrows"><i class="up"></i><i class="dn"></i></div>
      </div>
    `;
    chips = Array.from(stage.querySelectorAll<HTMLElement>('.preview-si-chip'));
    arrows = stage.querySelector('.preview-si-arrows');
    order = LABELS.map((_, i) => i);
    sel = 0;
    layout();
    return () => { clearTimers(); stage.innerHTML = ''; chips = []; arrows = null; };
  },

  play({ duration, easing }) {
    if (!chips.length || !arrows) return;
    clearTimers();
    const ez = bezierToCss(easing.bezier);
    chips.forEach((c) => { c.style.transition = 'none'; });
    arrows.style.transition = 'none';
    order = LABELS.map((_, i) => i);
    sel = 0;
    layout();
    void arrows.offsetWidth;

    chips.forEach((c) => { c.style.transition = `top ${duration}ms ${ez}, border-color 200ms, box-shadow 200ms`; });
    arrows.style.transition = `top ${Math.round(duration * ARROW_RATIO)}ms ease`;

    // ▼ ▼ ▲ — three presses, each after the previous move settles.
    const step = duration + 350;
    ([1, 1, -1] as const).forEach((dir, i) => {
      timers.push(window.setTimeout(() => swap(dir), 150 + i * step));
    });
  },

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const seconds = (duration / 1000).toFixed(2);
    const arrowMs = Math.round(duration * ARROW_RATIO);
    const ez = bezierToCss(easing.bezier);
    const roku = rokuEaseFunction(easing);
    return {
      web: `/* StackItOverlay.css
   Swap = exchange the two blocks' slot indices and re-write their "top".
   Both blocks transition at once, so they glide past each other. */
.si-chip {
  position: absolute;
  transition: top ${duration}ms ${ez}, left ${duration}ms ${ez},
              border-color .2s, box-shadow .2s;
}
.si-chip--moving { z-index: 4; } /* picked-up block passes over its neighbour */

.si-arrows { position: absolute; transition: top ${arrowMs}ms ease; }

// StackIt.ts
function moveBlock(dir: -1 | 1) {
  const to = sel + dir;
  if (to < 0 || to > 5) return;
  [slots[sel], slots[to]] = [slots[to], slots[sel]];
  sel = to;
  render(); // writes top = SLOT.tops[slotIndex] for every chip
}`,
      android: `// Jetpack Compose — Android TV
@Composable
fun StackColumn(order: List<String>, picked: Int, slotTops: List<Dp>) {
    val glide = CubicBezierEasing(${b1}f, ${b2}f, ${b3}f, ${b4}f)
    Box {
        order.forEachIndexed { slot, answer ->
            key(answer) {   // stable key → each block animates to its new slot
                val y by animateDpAsState(slotTops[slot], tween(${duration}, easing = glide), label = "y")
                StackBlock(
                    answer, focused = false, stackFull = true, pickedUp = slot == picked,
                    modifier = Modifier.offset(y = y).zIndex(if (slot == picked) 1f else 0f)
                )
            }
        }
        val arrowY by animateDpAsState(slotTops[picked], tween(${arrowMs}), label = "arrows")
        MoveArrows(Modifier.offset(y = arrowY), upEnabled = picked > 0, downEnabled = picked < 5)
    }
}`,
      ios: `// SwiftUI — tvOS
struct StackColumn: View {
    @Binding var order: [String]
    @Binding var picked: Int
    let slotTops: [CGFloat]

    var body: some View {
        ZStack(alignment: .topLeading) {
            ForEach(Array(order.enumerated()), id: \\.element) { slot, answer in
                StackBlock(text: answer, focused: false, stackFull: true, pickedUp: slot == picked)
                    .offset(y: slotTops[slot])
                    .zIndex(slot == picked ? 1 : 0)
            }
            MoveArrows(upEnabled: picked > 0, downEnabled: picked < 5)
                .offset(y: slotTops[picked])
                .animation(.easeInOut(duration: ${(arrowMs / 1000).toFixed(2)}), value: picked)
        }
        .animation(.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${seconds}), value: order)
    }
}`,
      roku: `' Roku SceneGraph — StackColumn.brs
' One Animation with two interpolators: picked block and its neighbour swap Y.
sub moveBlock(dir as integer)
  toSlot = m.sel + dir
  if toSlot < 0 or toSlot > 5 then return
  a = m.blocks[m.sel] : b = m.blocks[toSlot]
  m.blocks[m.sel] = b : m.blocks[toSlot] = a

  anim = createObject("roSGNode", "Animation")
  anim.duration = ${seconds}
  anim.easeFunction = "${roku.name}"   ' ${roku.note || 'matches catalog preset'}
  anim.appendChild(slideTo(a, m.slotY[toSlot]))
  anim.appendChild(slideTo(b, m.slotY[m.sel]))
  m.top.appendChild(anim)
  anim.control = "start"

  m.sel = toSlot
  m.arrowAnim.duration = ${(arrowMs / 1000).toFixed(2)}
  m.arrowMove.keyValue = [ m.arrows.translation, [m.arrows.translation[0], m.slotY[toSlot]] ]
  m.arrowAnim.control = "start"
end sub

function slideTo(node as object, y as float) as object
  interp = createObject("roSGNode", "Vector2DFieldInterpolator")
  interp.fieldToInterp = node.id + ".translation"
  interp.key = [0, 1]
  interp.keyValue = [ node.translation, [node.translation[0], y] ]
  return interp
end function`,
    };
  },

  pmTicket() {
    return `Title: Stack It — Swap animation when moving a picked-up block

Trigger: a block is picked up (OK on a full stack) and the player presses ▲ or ▼.

Visual behavior:
  · The picked-up block (gold ring) and its neighbour exchange slots; both glide at the same time and pass each other.
  · The picked-up block renders above the neighbour while they cross.
  · The ▲ ▼ arrows to the right follow the picked-up block to its new slot.
  · At the top slot ▲ turns lavender (#7B7FD6); at the bottom slot ▼ turns lavender. Pressing a lavender direction does nothing.
  · OK drops the block (ring returns to focus state); Back restores the order from before the pick-up, with the same glide.

Timings:
  · Blocks: 450 ms, cubic-bezier(0.3, 0.9, 0.3, 1) ("glide").
  · Arrows: 300 ms, ease.

Acceptance criteria:
  · Holding ▼ retargets smoothly — no block snaps to a slot mid-move.
  · Only the two swapped blocks move; the rest of the stack stays still.
  · When the timer hits 0:00 during a move, the current order is what gets scored.`;
  },
};
