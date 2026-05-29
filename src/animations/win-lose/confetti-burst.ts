import type { AnimationModule, PlatformSnippets } from '../../types';
import { injectStyle } from '../../lib/injectStyle';

const PARTICLE_COUNT = 40;
const TRAJECTORY_COUNT = 12;
const PALETTE = [
  '#facc15', '#22c55e', '#3b82f6', '#ec4899',
  '#f97316', '#a855f7', '#06b6d4', '#fb7185',
];

const CSS = `
.preview-confetti-stage {
  position: relative;
  width: 100%; height: 260px;
  background: linear-gradient(135deg, #1a1f2e 0%, #06080d 100%);
  border-radius: 12px;
  overflow: hidden;
}
.preview-confetti-stage__label {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
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
.preview-confetti__p {
  position: absolute;
  border-radius: 2px;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.18, 0.55, 0.34, 1);
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  will-change: transform, opacity;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}

/* 12 baked trajectories — scaled down to ~30 % of the original 1920×1080
   values so the burst fits the preview area. */
@keyframes pc-traj-0  { 0%{transform:translate(0,0)            rotate(0deg);   opacity:0;} 10%{opacity:1;} 100%{transform:translate(-84px, -306px)  rotate(720deg);   opacity:0;} }
@keyframes pc-traj-1  { 0%{transform:translate(0,0)            rotate(45deg);  opacity:0;} 10%{opacity:1;} 100%{transform:translate(78px,  -324px)  rotate(880deg);   opacity:0;} }
@keyframes pc-traj-2  { 0%{transform:translate(0,0)            rotate(0deg);   opacity:0;} 12%{opacity:1;} 100%{transform:translate(-48px, -234px)  rotate(-720deg);  opacity:0;} }
@keyframes pc-traj-3  { 0%{transform:translate(0,0)            rotate(20deg);  opacity:0;} 10%{opacity:1;} 100%{transform:translate(126px, -288px)  rotate(1080deg);  opacity:0;} }
@keyframes pc-traj-4  { 0%{transform:translate(0,0)            rotate(-30deg); opacity:0;} 12%{opacity:1;} 100%{transform:translate(-132px,-282px)  rotate(-1080deg); opacity:0;} }
@keyframes pc-traj-5  { 0%{transform:translate(0,0)            rotate(0deg);   opacity:0;} 10%{opacity:1;} 100%{transform:translate(24px,  -330px)  rotate(540deg);   opacity:0;} }
@keyframes pc-traj-6  { 0%{transform:translate(0,0)            rotate(10deg);  opacity:0;} 10%{opacity:1;} 100%{transform:translate(-27px, -342px)  rotate(900deg);   opacity:0;} }
@keyframes pc-traj-7  { 0%{transform:translate(0,0)            rotate(-15deg); opacity:0;} 12%{opacity:1;} 100%{transform:translate(108px, -210px)  rotate(-540deg);  opacity:0;} }
@keyframes pc-traj-8  { 0%{transform:translate(0,0)            rotate(0deg);   opacity:0;} 10%{opacity:1;} 100%{transform:translate(-168px,-192px)  rotate(720deg);   opacity:0;} }
@keyframes pc-traj-9  { 0%{transform:translate(0,0)            rotate(25deg);  opacity:0;} 10%{opacity:1;} 100%{transform:translate(168px, -246px)  rotate(-820deg);  opacity:0;} }
@keyframes pc-traj-10 { 0%{transform:translate(0,0)            rotate(-10deg); opacity:0;} 10%{opacity:1;} 100%{transform:translate(-108px,-168px)  rotate(540deg);   opacity:0;} }
@keyframes pc-traj-11 { 0%{transform:translate(0,0)            rotate(0deg);   opacity:0;} 12%{opacity:1;} 100%{transform:translate(54px,  -354px)  rotate(960deg);   opacity:0;} }
`;

type Particle = {
  left: number; bottom: number; delay: number; duration: number;
  trajectory: number; size: number; color: string; shape: 'square' | 'rect' | 'streamer';
};

function seedParticles(): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    out.push({
      left: Math.random() * 100,
      bottom: 2 + Math.random() * 14,
      delay: Math.random() * 350,
      duration: 1400 + Math.random() * 900,
      trajectory: i % TRAJECTORY_COUNT,
      size: 5 + Math.random() * 4,
      color: PALETTE[i % PALETTE.length],
      shape: i % 3 === 0 ? 'streamer' : (i % 2 === 0 ? 'rect' : 'square'),
    });
  }
  return out;
}

let burstContainer: HTMLElement | null = null;

function renderBurst(container: HTMLElement, durationScale: number) {
  const particles = seedParticles();
  const html = particles.map((p) => {
    const h = p.shape === 'rect' ? p.size * 1.6 : p.shape === 'streamer' ? p.size * 2.4 : p.size;
    return `<span class="preview-confetti__p" style="
      left:${p.left}%;
      bottom:${p.bottom}%;
      width:${p.size}px;
      height:${h}px;
      background:${p.color};
      animation-name:pc-traj-${p.trajectory};
      animation-delay:${p.delay}ms;
      animation-duration:${p.duration * durationScale}ms;
    "></span>`;
  }).join('');
  container.innerHTML = html;
}

export const ConfettiBurstAnim: AnimationModule = {
  id: 'wl-confetti-burst',
  title: 'Confetti Burst',
  game: 'Win/Lose',
  description:
    'Celebratory confetti fired from the bottom of the screen on a correct answer. ~90 particles in 8 colours (3 shapes) follow 12 baked trajectories that rocket up and out. Each particle has a random delay (0–350 ms) and duration (1400–2300 ms).',
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
    // duration here is the *baseline* particle duration; the catalog stores
    // 1800 ms, default; multiply by per-particle factor (1.0–1.65).
    const scale = duration / 1800;
    renderBurst(burstContainer, scale);
  },

  frames: [
    {
      label: 'Idle',
      sublabel: 'no confetti',
      render: (s) => { s.innerHTML = '<div class="frame-ghost">no confetti</div>'; },
    },
    {
      label: 'Spawn',
      sublabel: '0–10% · particles at bottom · opacity 0 → 1',
      render: (s) => {
        s.innerHTML = `
          <div style="position:relative;width:100%;height:64px;background:linear-gradient(135deg,#1a1f2e 0%,#06080d 100%);border-radius:6px;overflow:hidden;">
            ${[
              { l: 20, c: '#facc15' },
              { l: 35, c: '#22c55e' },
              { l: 50, c: '#3b82f6' },
              { l: 65, c: '#ec4899' },
              { l: 80, c: '#f97316' },
            ].map((p) => `<span style="position:absolute;left:${p.l}%;bottom:6px;width:7px;height:7px;background:${p.c};border-radius:1px;opacity:0.6;"></span>`).join('')}
          </div>
        `;
      },
    },
    {
      label: 'Burst',
      sublabel: '50% · particles spread up & out',
      render: (s) => {
        s.innerHTML = `
          <div style="position:relative;width:100%;height:64px;background:linear-gradient(135deg,#1a1f2e 0%,#06080d 100%);border-radius:6px;overflow:hidden;">
            ${[
              { l: 14, b: 38, c: '#facc15', r: 90 },
              { l: 28, b: 52, c: '#22c55e', r: -30 },
              { l: 44, b: 60, c: '#3b82f6', r: 180 },
              { l: 56, b: 48, c: '#ec4899', r: -120 },
              { l: 70, b: 56, c: '#f97316', r: 60 },
              { l: 82, b: 30, c: '#a855f7', r: -90 },
              { l: 36, b: 22, c: '#06b6d4', r: 45 },
              { l: 64, b: 18, c: '#fb7185', r: -200 },
            ].map((p) => `<span style="position:absolute;left:${p.l}%;bottom:${p.b}%;width:7px;height:11px;background:${p.c};border-radius:1px;transform:rotate(${p.r}deg);opacity:1;"></span>`).join('')}
          </div>
        `;
      },
    },
    {
      label: 'Fade',
      sublabel: '100% · off-frame · opacity 0',
      render: (s) => { s.innerHTML = '<div class="frame-ghost">off-screen · opacity 0</div>'; },
    },
  ],

  snippets({ duration }): PlatformSnippets {
    return {
      web: `/* ConfettiBurst.css — 12 baked trajectories (excerpt). */
.confetti-burst {
  position: absolute; inset: 0;
  overflow: hidden; pointer-events: none;
  z-index: 60;
}
.confetti-burst__particle {
  position: absolute;
  border-radius: 2px;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.18, 0.55, 0.34, 1);
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  will-change: transform, opacity;
}

@keyframes cf-traj-0 {
  0%   { transform: translate(0, 0)            rotate(0deg);    opacity: 0; }
  10%  {                                                         opacity: 1; }
  100% { transform: translate(-280px, -1020px) rotate(720deg);   opacity: 0; }
}
/* … cf-traj-1 … cf-traj-11 — see ConfettiBurst.css for the full set. */

/* JSX seeds ${PARTICLE_COUNT} particles (real component uses 90) with
   random delay / duration / colour / shape / trajectory:
     - left          : 0–100%
     - bottom        : 2–16%        (slight vertical spread at spawn)
     - delay         : 0–350 ms
     - duration      : ${duration}–${Math.round(duration * 1.65)} ms
     - trajectory    : i % 12
     - palette       : 8 colours
     - shape         : square | rect (1:1.6) | streamer (1:2.4)

Mount the whole burst with a key (e.g. questionNumber) so it
remounts and replays on each correct answer. */`,
      android: `// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import kotlin.math.cos
import kotlin.math.sin
import kotlin.random.Random

@Composable
fun ConfettiBurst(trigger: Int) {
    val palette = listOf(
        Color(0xFFFACC15), Color(0xFF22C55E), Color(0xFF3B82F6), Color(0xFFEC4899),
        Color(0xFFF97316), Color(0xFFA855F7), Color(0xFF06B6D4), Color(0xFFFB7185),
    )
    val particles = remember(trigger) {
        List(90) {
            // Pre-baked X/Y endpoints for each of 12 trajectories.
            ConfettiParticle(
                colour      = palette[it % palette.size],
                trajectory  = it % 12,
                startLeftPct = Random.nextFloat(),
                delayMs     = Random.nextInt(0, 350),
                durationMs  = Random.nextInt(${duration}, ${Math.round(duration * 1.65)}),
                sizePx      = 7 + Random.nextInt(8),
            )
        }
    }
    Canvas(Modifier.fillMaxSize()) {
        particles.forEach { p ->
            // Drive each particle with an Animatable started in LaunchedEffect
            // (see ConfettiParticle render impl).
        }
    }
}

data class ConfettiParticle(
    val colour: Color,
    val trajectory: Int,
    val startLeftPct: Float,
    val delayMs: Int,
    val durationMs: Int,
    val sizePx: Int,
)`,
      ios: `// SwiftUI — tvOS
import SwiftUI

struct ConfettiBurst: View {
    let trigger: Int
    var body: some View {
        Canvas { context, size in
            // 90 particles, 12 baked trajectories, ${duration}–${Math.round(duration * 1.65)} ms each.
            // Use TimelineView(.animation) + per-particle Animatable to drive
            // translate + rotate; final opacity 0 so particles fade out off-screen.
        }
        .allowsHitTesting(false)
        .id(trigger)
    }
}`,
      roku: `<!-- Roku SceneGraph — components/ConfettiBurst.xml -->
<component name="ConfettiBurst" extends="Group">
  <interface>
    <field id="trigger" type="integer" alwaysNotify="true" onChange="onTriggerChange" />
  </interface>

  <children>
    <!-- 12 reusable Animation nodes per trajectory; pool of 90 Poster
         particles, each picks a trajectory and a delay at runtime. -->
  </children>

  <script type="text/brightscript">
    sub onTriggerChange()
      ' Re-seed positions / colours / delays for every particle, then
      ' kick off each particle's Animation node with its randomised
      ' duration (1.4–2.3 s).
    end sub
  </script>
</component>`,
    };
  },

  pmTicket() {
    return `Title: Correct-answer confetti burst

Trigger: the player picks the correct answer in any game.

Visual behavior:
  · A burst of ~90 particles is fired from random columns near the bottom of the screen.
  · 8 colours, 3 shapes (square, rect 1:1.6, streamer 1:2.4), sizes 7–15 px.
  · Each particle follows one of 12 pre-baked trajectories (mostly up & outward, some lateral arcs).
  · Per-particle randomisation:
      · spawn delay 0–350 ms
      · duration 1.4–2.3 s
      · rotation 540°–1080° during flight
  · Particles fade out at the end of their trajectories (opacity 0).
  · The whole layer is non-interactive (pointer-events: none).

Easing:
  · cubic-bezier(0.18, 0.55, 0.34, 1) — slow-out so particles "soar" then drift.

Acceptance criteria:
  · Re-spawns on every correct answer (remount the layer by key).
  · No layout reflow — particles are absolutely positioned in an overlay.
  · Confetti does not block input.`;
  },
};
