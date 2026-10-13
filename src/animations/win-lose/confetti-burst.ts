import type { AnimationModule, PlatformSnippets } from '../../types';
import { injectStyle } from '../../lib/injectStyle';

const PARTICLE_COUNT = 40;
const PALETTE = [
  '#facc15', '#22c55e', '#3b82f6', '#ec4899',
  '#f97316', '#a855f7', '#06b6d4', '#fb7185',
];

/** Preview stage height (px) — particles fall past this before they're done. */
const STAGE_H = 260;
/**
 * Gravity in px/ms² at the default 1800 ms. Picked so an average shot
 * (rise ~170 px) spends ~0.8 s going up and ~1 s coming down.
 */
const BASE_G = 0.0005;
const BASE_DURATION = 1800;

/* Exact quadratic curves: a body under constant gravity decelerates like
   ease-out-quad on the way up and accelerates like ease-in-quad on the way down. */
const EASE_UP = 'cubic-bezier(0.33, 0.67, 0.67, 1)';
const EASE_DOWN = 'cubic-bezier(0.33, 0, 0.67, 0.33)';
const EASE_DRIFT = 'cubic-bezier(0.2, 0.6, 0.4, 1)';

const CSS = `
.preview-confetti-stage {
  position: relative;
  width: 100%; height: ${STAGE_H}px;
  background: linear-gradient(135deg, #1a1f2e 0%, #06080d 100%);
  border-radius: 12px;
  overflow: hidden;
}
.preview-confetti-stage__label {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Rubik', 'Helvetica Neue', Arial, sans-serif;
  color: rgba(255,255,255,0.5);
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.preview-confetti {
  position: absolute; inset: 0;
  pointer-events: none;
  overflow: hidden;
}

/* Three nested layers so each axis gets its own curve:
   outer = horizontal drift, middle = rise + gravity fall, inner = tumble. */
.preview-confetti__p {
  position: absolute;
  animation: pc-drift calc(var(--tu) + var(--td)) ${EASE_DRIFT} var(--delay) both;
}
.preview-confetti__y {
  display: block;
  animation:
    pc-rise var(--tu) ${EASE_UP}   var(--delay) both,
    pc-fall var(--td) ${EASE_DOWN} calc(var(--delay) + var(--tu)) forwards;
}
.preview-confetti__s {
  display: block;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  animation:
    pc-pop 120ms linear var(--delay) both,
    pc-spin var(--spin) linear var(--delay) infinite;
}
@keyframes pc-drift { from { transform: translateX(0); }          to { transform: translateX(var(--dx)); } }
@keyframes pc-rise  { from { transform: translateY(0); }          to { transform: translateY(var(--peak)); } }
@keyframes pc-fall  { from { transform: translateY(var(--peak)); } to { transform: translateY(var(--drop)); } }
@keyframes pc-pop   { from { opacity: 0; } to { opacity: 1; } }
@keyframes pc-spin  {
  from { transform: rotate(var(--r0)) rotateX(0deg); }
  to   { transform: rotate(calc(var(--r0) + 360deg * var(--dir))) rotateX(360deg); }
}
`;

type Particle = {
  left: number; bottom: number; delay: number;
  dx: number; peak: number; drop: number; tu: number; td: number;
  spin: number; dir: 1 | -1; r0: number;
  w: number; h: number; color: string;
};

function seedParticles(timeScale: number): Particle[] {
  // Same arc shapes at any speed: scaling time by k means gravity scales by 1/k².
  const g = BASE_G / (timeScale * timeScale);
  const out: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const left = 4 + Math.random() * 92;
    const bottom = 2 + Math.random() * 12;
    const spawnY = (bottom / 100) * STAGE_H;            // px above the floor
    const rise = 110 + Math.random() * 120;             // apex height above spawn
    const peak = -Math.min(rise, STAGE_H - spawnY - 12);
    const drop = spawnY + 24;                           // fall until just past the bottom edge
    const tu = Math.sqrt((2 * -peak) / g);
    const td = Math.sqrt((2 * (-peak + drop)) / g);
    // Push outward from the centre, plus a little randomness.
    const dx = (left - 50) * 1.4 + (Math.random() - 0.5) * 90;
    const size = 5 + Math.random() * 4;
    const shape = i % 3 === 0 ? 'streamer' : (i % 2 === 0 ? 'rect' : 'square');
    out.push({
      left, bottom,
      delay: Math.random() * 300 * timeScale,
      dx, peak, drop, tu, td,
      spin: (500 + Math.random() * 700) * timeScale,
      dir: Math.random() < 0.5 ? 1 : -1,
      r0: Math.round(Math.random() * 360),
      w: size,
      h: shape === 'rect' ? size * 1.6 : shape === 'streamer' ? size * 2.4 : size,
      color: PALETTE[i % PALETTE.length],
    });
  }
  return out;
}

let burstContainer: HTMLElement | null = null;

function renderBurst(container: HTMLElement, timeScale: number) {
  container.innerHTML = seedParticles(timeScale).map((p) => `
    <span class="preview-confetti__p" style="
      left:${p.left}%; bottom:${p.bottom}%;
      --dx:${p.dx.toFixed(1)}px; --peak:${p.peak.toFixed(1)}px; --drop:${p.drop.toFixed(1)}px;
      --tu:${Math.round(p.tu)}ms; --td:${Math.round(p.td)}ms; --delay:${Math.round(p.delay)}ms;
      --spin:${Math.round(p.spin)}ms; --dir:${p.dir}; --r0:${p.r0}deg;
    "><span class="preview-confetti__y"><span class="preview-confetti__s" style="
      width:${p.w.toFixed(1)}px; height:${p.h.toFixed(1)}px; background:${p.color};
    "></span></span></span>`).join('');
}

/** Static frame: particles placed along their arcs at a given phase. */
function frameScatter(slot: HTMLElement, pts: { l: number; b: number; c: string; r: number }[]) {
  slot.innerHTML = `
    <div style="position:relative;width:100%;height:64px;background:linear-gradient(135deg,#1a1f2e 0%,#06080d 100%);border-radius:6px;overflow:hidden;">
      ${pts.map((p) => `<span style="position:absolute;left:${p.l}%;bottom:${p.b}%;width:6px;height:10px;background:${p.c};border-radius:1px;transform:rotate(${p.r}deg);"></span>`).join('')}
    </div>
  `;
}

export const ConfettiBurstAnim: AnimationModule = {
  id: 'wl-confetti-burst',
  title: 'Confetti Burst',
  game: 'Win/Lose',
  usedIn: ['Card Sharks', 'Match Game'],
  description:
    'Celebratory confetti fired from the bottom of the screen on a correct answer. Each piece is tossed up, slows to a stop at its apex, then falls back down under gravity and leaves through the bottom edge while tumbling. Higher tosses hang in the air longer — rise and fall times follow t = √(2h / g).',
  defaults: { duration: 1800, easingId: 'ease-out' },
  slowFactor: 2,

  render(stage) {
    injectStyle('css-wl-confetti', CSS);
    stage.innerHTML = `
      <div class="preview-confetti-stage">
        <div class="preview-confetti-stage__label">player view (mocked)</div>
        <div class="preview-confetti"></div>
      </div>
    `;
    burstContainer = stage.querySelector('.preview-confetti');
    return () => { stage.innerHTML = ''; burstContainer = null; };
  },

  play({ duration }) {
    if (!burstContainer) return;
    // Duration ≈ flight time of an average piece; it scales the whole timeline.
    renderBurst(burstContainer, duration / BASE_DURATION);
  },

  frames: [
    {
      label: 'Spawn',
      sublabel: '0 ms · bottom edge · opacity 0 → 1',
      render: (s) => frameScatter(s, [
        { l: 18, b: 6, c: '#facc15', r: 10 }, { l: 34, b: 10, c: '#22c55e', r: -20 },
        { l: 50, b: 4, c: '#3b82f6', r: 40 }, { l: 66, b: 8, c: '#ec4899', r: -60 },
        { l: 82, b: 5, c: '#f97316', r: 15 },
      ]),
    },
    {
      label: 'Rise',
      sublabel: 'ease-out-quad · slowing down',
      render: (s) => frameScatter(s, [
        { l: 14, b: 48, c: '#facc15', r: 90 }, { l: 31, b: 58, c: '#22c55e', r: -30 },
        { l: 50, b: 40, c: '#3b82f6', r: 180 }, { l: 69, b: 62, c: '#ec4899', r: -120 },
        { l: 86, b: 44, c: '#f97316', r: 60 }, { l: 40, b: 30, c: '#a855f7', r: -90 },
      ]),
    },
    {
      label: 'Apex',
      sublabel: '~45% · vertical speed 0',
      render: (s) => frameScatter(s, [
        { l: 10, b: 78, c: '#facc15', r: 200 }, { l: 28, b: 86, c: '#22c55e', r: -150 },
        { l: 48, b: 70, c: '#3b82f6', r: 300 }, { l: 72, b: 88, c: '#ec4899', r: -260 },
        { l: 90, b: 74, c: '#f97316', r: 160 }, { l: 38, b: 64, c: '#a855f7', r: -210 },
      ]),
    },
    {
      label: 'Fall',
      sublabel: 'ease-in-quad · gravity · exits bottom',
      render: (s) => frameScatter(s, [
        { l: 6, b: 34, c: '#facc15', r: 320 }, { l: 24, b: 18, c: '#22c55e', r: -280 },
        { l: 46, b: 4, c: '#3b82f6', r: 420 }, { l: 76, b: 26, c: '#ec4899', r: -380 },
        { l: 94, b: 10, c: '#f97316', r: 300 }, { l: 36, b: 42, c: '#a855f7', r: -330 },
      ]),
    },
  ],

  snippets({ duration }): PlatformSnippets {
    const k = duration / BASE_DURATION;
    // Gravity scaled to a 1080p screen (preview is ~1/4 of that).
    const g1080 = (BASE_G * 1080 / STAGE_H) / (k * k);
    const gPerS = Math.round(g1080 * 1e6);           // px/s²
    return {
      web: `/* ConfettiBurst.css
   Three nested spans so each axis has its own curve:
     .cf       — horizontal drift (ease-out, air drag)
     .cf__y    — rise (ease-out-quad) then gravity fall (ease-in-quad)
     .cf__spin — the visible piece, tumbling
   Per-particle values come from JS as CSS custom properties. */
.confetti-burst { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 60; }

.cf {
  position: absolute;
  animation: cf-drift calc(var(--tu) + var(--td)) ${EASE_DRIFT} var(--delay) both;
}
.cf__y {
  display: block;
  animation:
    cf-rise var(--tu) ${EASE_UP}   var(--delay) both,
    cf-fall var(--td) ${EASE_DOWN} calc(var(--delay) + var(--tu)) forwards;
}
.cf__spin {
  display: block; border-radius: 2px;
  animation: cf-pop 120ms linear var(--delay) both,
             cf-spin var(--spin) linear var(--delay) infinite;
}
@keyframes cf-drift { from { transform: translateX(0); }          to { transform: translateX(var(--dx)); } }
@keyframes cf-rise  { from { transform: translateY(0); }          to { transform: translateY(var(--peak)); } }
@keyframes cf-fall  { from { transform: translateY(var(--peak)); } to { transform: translateY(var(--drop)); } }
@keyframes cf-pop   { from { opacity: 0; } to { opacity: 1; } }
@keyframes cf-spin  {
  from { transform: rotate(var(--r0)) rotateX(0deg); }
  to   { transform: rotate(calc(var(--r0) + 360deg * var(--dir))) rotateX(360deg); }
}

// ConfettiBurst.ts — seed one particle (1080p stage)
const G = ${g1080.toFixed(5)};                      // px/ms² (~${gPerS} px/s²)
const rise  = 450 + Math.random() * 450;           // apex height, px
const drop  = spawnY + 80;                          // fall past the bottom edge
const tu    = Math.sqrt(2 * rise / G);              // time to apex
const td    = Math.sqrt(2 * (rise + drop) / G);     // apex → off-screen
el.style.cssText += \`--peak:\${-rise}px; --drop:\${drop}px; --tu:\${tu}ms; --td:\${td}ms;
  --dx:\${(leftPct - 50) * 5 + (Math.random() - .5) * 300}px; --delay:\${Math.random() * ${Math.round(300 * k)}}ms;
  --spin:\${${Math.round(500 * k)} + Math.random() * ${Math.round(700 * k)}}ms; --dir:\${Math.random() < .5 ? 1 : -1}; --r0:\${Math.random() * 360}deg\`;

/* Remount the burst with a key (e.g. questionNumber) to replay it. */`,
      android: `// Jetpack Compose — Android TV
// Real ballistics per frame: y(t) = v0·t − g·t²/2, x drifts with air drag.
@Composable
fun ConfettiBurst(trigger: Int) {
    val palette = listOf(
        Color(0xFFFACC15), Color(0xFF22C55E), Color(0xFF3B82F6), Color(0xFFEC4899),
        Color(0xFFF97316), Color(0xFFA855F7), Color(0xFF06B6D4), Color(0xFFFB7185),
    )
    val g = ${gPerS}f                                    // px/s²
    val particles = remember(trigger) {
        List(90) {
            val rise = 450f + Random.nextFloat() * 450f    // apex height, px
            Confetto(
                color = palette[it % palette.size],
                x0 = Random.nextFloat(),                    // 0..1 of width
                v0 = sqrt(2f * g * rise),                   // launch speed for that apex
                vx = (Random.nextFloat() - 0.5f) * 600f,
                delay = Random.nextFloat() * ${(0.3 * k).toFixed(2)}f,
                spin = (Random.nextFloat() - 0.5f) * 1440f,
            )
        }
    }
    var t by remember(trigger) { mutableFloatStateOf(0f) }
    LaunchedEffect(trigger) {
        val start = withFrameNanos { it }
        while (true) withFrameNanos { t = (it - start) / 1e9f }
    }
    Canvas(Modifier.fillMaxSize()) {
        particles.forEach { p ->
            val s = (t - p.delay).coerceAtLeast(0f)
            val y = size.height - (p.v0 * s - g * s * s / 2f)       // up, then down
            if (y > size.height + 40f) return@forEach               // fallen off-screen
            val x = p.x0 * size.width + p.vx * (1f - exp(-1.5f * s)) / 1.5f  // drag
            rotate(p.spin * s, Offset(x, y)) {
                drawRect(p.color, Offset(x - 6f, y - 9f), Size(12f, 18f))
            }
        }
    }
}

data class Confetto(val color: Color, val x0: Float, val v0: Float, val vx: Float, val delay: Float, val spin: Float)`,
      ios: `// SwiftUI — tvOS
// Same ballistic model: y(t) = v0·t − g·t²/2, x with drag.
struct ConfettiBurst: View {
    let trigger: Int
    private let g: Double = ${gPerS}                       // pt/s²
    @State private var start = Date()
    @State private var pieces: [Confetto] = []

    var body: some View {
        TimelineView(.animation) { timeline in
            Canvas { ctx, size in
                let t = timeline.date.timeIntervalSince(start)
                for p in pieces {
                    let s = max(0, t - p.delay)
                    let y = size.height - (p.v0 * s - g * s * s / 2)
                    guard y < size.height + 40 else { continue }
                    let x = p.x0 * size.width + p.vx * (1 - exp(-1.5 * s)) / 1.5
                    var c = ctx
                    c.translateBy(x: x, y: y)
                    c.rotate(by: .degrees(p.spin * s))
                    c.fill(Path(CGRect(x: -6, y: -9, width: 12, height: 18)), with: .color(p.color))
                }
            }
        }
        .allowsHitTesting(false)
        .onChange(of: trigger) { _ in
            start = Date()
            pieces = (0..<90).map { _ in
                let rise = Double.random(in: 450...900)
                return Confetto(x0: .random(in: 0...1), v0: (2 * g * rise).squareRoot(),
                                vx: .random(in: -300...300), delay: .random(in: 0...${(0.3 * k).toFixed(2)}),
                                spin: .random(in: -720...720), color: palette.randomElement()!)
            }
        }
    }
}`,
      roku: `' Roku SceneGraph — ConfettiBurst.brs
' Bake each piece's parabola into a Vector2DFieldInterpolator (9 samples is plenty
' at TV distance) and run it with a LINEAR ease — the curve is in the key points.
sub fire()
  g = ${gPerS}                                   ' px/s²
  for each p in m.pool                           ' ~60 Poster nodes
    rise = 450 + Rnd(0) * 450
    v0 = Sqr(2 * g * rise)
    drop = 1080 - p.translation[1] + 80
    tu = v0 / g
    td = Sqr(2 * (rise + drop) / g)
    total = tu + td
    vx = (Rnd(0) - 0.5) * 600
    keys = [] : vals = []
    for i = 0 to 8
      s = total * i / 8
      keys.push(i / 8)
      vals.push([p.translation[0] + vx * s, p.translation[1] - (v0 * s - g * s * s / 2)])
    end for
    p.anim.duration = total
    p.anim.delay = Rnd(0) * ${(0.3 * k).toFixed(2)}
    p.move.key = keys : p.move.keyValue = vals
    p.spin.keyValue = [0, (Rnd(0) - 0.5) * 12.6]   ' radians
    p.anim.control = "start"
  end for
end sub`,
    };
  },

  pmTicket() {
    return `Title: Correct-answer confetti burst (toss up, fall with gravity)

Trigger: the player picks the correct answer in any game.

Visual behavior:
  · ~90 confetti pieces launch from random columns along the bottom edge of the screen.
  · Each piece is tossed upward, slows down, stops at its apex (different height per piece), then falls back down, accelerating, and leaves through the bottom edge.
  · Pieces drift outward from the centre while airborne and tumble (spin + flip) the whole time.
  · No fade-out in the air — pieces disappear by falling off-screen.
  · 8 colours, 3 shapes (square, rect 1:1.6, streamer 1:2.4), sizes 7–15 px.

Motion model:
  · Vertical: constant gravity. Rise = ease-out-quad, fall = ease-in-quad (exact parabola).
  · Rise / fall times from height: t = √(2h / g); higher tosses hang longer.
  · Horizontal: ease-out drift (air drag).
  · Per piece: launch delay 0–300 ms, apex 40–85 % of screen height.

Timings:
  · Average flight ≈ 1.8 s (≈ 0.8 s up, ≈ 1 s down); whole burst done in ~2.5 s.

Acceptance criteria:
  · No piece "fades out" mid-air — every piece visibly falls out of frame.
  · Re-spawns on every correct answer (remount the layer by key).
  · No layout reflow; the layer does not block input.`;
  },
};
