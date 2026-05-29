import type { AnimationModule, PlatformSnippets } from '../../types';
import { bezierToCss } from '../../lib/easings';
import { injectStyle } from '../../lib/injectStyle';

const CSS = `
.preview-ff-feedback-wrap { width: 800px; }
.preview-ff-banner {
  position: relative;
  height: 110px;
  border-radius: 12px;
  background: rgba(0,0,0,0.85);
  border: 1.5px solid rgba(255,255,255,0.12);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
}
.preview-ff-banner__corner {
  position: absolute; top: 50%; transform: translateY(-50%);
  display: flex; gap: 8px; align-items: center;
  color: #fff; font-weight: 600; text-transform: uppercase;
}
.preview-ff-banner__corner--left { left: 28px; }
.preview-ff-banner__corner--right { right: 28px; }
.preview-ff-banner__label { font-size: 18px; }
.preview-ff-banner__value { font-size: 26px; font-weight: 800; color: #ffd426; }
.preview-ff-banner__center {
  height: 110px;
  flex: 0 0 380px;
  display: flex; align-items: center; justify-content: center;
  font-size: 32px; font-weight: 500; color: #fff;
  background: linear-gradient(90deg, rgba(0,47,255,0) 0%, #002fff 50%, rgba(0,47,255,0) 100%);
  animation: ff-banner-pulse 2.6s ease-in-out infinite;
}
@keyframes ff-banner-in {
  from { opacity: 0; transform: translateY(-40px) scale(0.94); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes ff-banner-pulse {
  0%, 100% { filter: brightness(1); }
  50%      { filter: brightness(1.3); }
}
.preview-ff-banner__sweep { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.preview-ff-banner__sweep::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 45%;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(170,210,255,0.55) 50%, rgba(255,255,255,0) 100%);
  animation: ff-banner-sweep 1100ms cubic-bezier(0.4, 0, 0.2, 1) 300ms both;
}
@keyframes ff-banner-sweep {
  from { left: -45%; }
  to   { left: 100%; }
}
`;

let banner: HTMLElement | null = null;

function frameBanner(slot: HTMLElement, translateY: number, scale: number, opacity: number, sweepPos: number | null) {
  slot.innerHTML = `
    <div style="
      position:relative;
      width:100%;height:42px;border-radius:6px;
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;
      transform:translateY(${translateY}px) scale(${scale});
      opacity:${opacity};
    ">
      <span style="background:linear-gradient(90deg,rgba(0,47,255,0) 0%,#002fff 50%,rgba(0,47,255,0) 100%);padding:4px 24px;">Round Complete!</span>
      ${sweepPos !== null ? `<div style="position:absolute;top:0;bottom:0;width:45%;left:${sweepPos}%;background:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(170,210,255,0.55) 50%,rgba(255,255,255,0) 100%);"></div>` : ''}
    </div>
  `;
}

export const Feedback: AnimationModule = {
  id: 'ff-feedback',
  title: 'Feedback',
  game: 'Family Feud',
  description:
    'When the round wraps up, a Round-Complete banner drops in from above with a back-ease overshoot. A soft light band sweeps left-to-right across the banner once, signalling "phase complete, moving on". A slow brightness pulse keeps the band alive afterwards.',
  defaults: { duration: 620, easingId: 'back-out' },
  frames: [
    { label: 'Start',   sublabel: 'drop · translateY −40 · scale .94', render: (s) => frameBanner(s, -40, 0.94, 0,   null) },
    { label: 'Settled', sublabel: 'drop done · translateY 0 · scale 1', render: (s) => frameBanner(s, 0,   1,    1,   null) },
    { label: 'Sweep',   sublabel: 'light band mid-traversal',           render: (s) => frameBanner(s, 0,   1,    1,   30) },
    { label: 'Idle',    sublabel: 'brightness pulse loop',              render: (s) => frameBanner(s, 0,   1,    1,   null) },
  ],

  render(stage) {
    injectStyle('css-ff-feedback', CSS);
    stage.innerHTML = `
      <div class="preview-ff-feedback-wrap">
        <div class="preview-ff-banner">
          <div class="preview-ff-banner__corner preview-ff-banner__corner--left">
            <span class="preview-ff-banner__label">Strikes</span>
            <span class="preview-ff-banner__value">2/3</span>
          </div>
          <div class="preview-ff-banner__center">Round Complete!</div>
          <div class="preview-ff-banner__corner preview-ff-banner__corner--right">
            <span class="preview-ff-banner__label">Score</span>
            <span class="preview-ff-banner__value">86</span>
          </div>
          <div class="preview-ff-banner__sweep"></div>
        </div>
      </div>
    `;
    banner = stage.querySelector('.preview-ff-banner');
    return () => { stage.innerHTML = ''; banner = null; };
  },

  play({ duration, easing }) {
    if (!banner) return;
    banner.style.animation = 'none';
    void banner.offsetWidth;
    banner.style.animation = `ff-banner-in ${duration}ms ${bezierToCss(easing.bezier)} backwards`;
    const sweep = banner.querySelector<HTMLElement>('.preview-ff-banner__sweep');
    if (sweep) {
      const clone = sweep.cloneNode(true) as HTMLElement;
      sweep.replaceWith(clone);
    }
  },

  snippets({ duration, easing }): PlatformSnippets {
    const [b1, b2, b3, b4] = easing.bezier;
    const seconds = (duration / 1000).toFixed(2);
    return {
      web: `/* FamilyFeudOverlay.css */
@keyframes ff-banner-in {
  from { opacity: 0; transform: translateY(-40px) scale(0.94); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.ff-banner {
  animation: ff-banner-in ${duration}ms ${bezierToCss(easing.bezier)} backwards;
}

@keyframes ff-banner-sweep {
  from { left: -45%; }
  to   { left: 100%; }
}

.ff-banner__sweep::after {
  animation: ff-banner-sweep 1100ms cubic-bezier(0.4, 0, 0.2, 1) 300ms both;
}

@keyframes ff-banner-pulse {
  0%, 100% { filter: brightness(1); }
  50%      { filter: brightness(1.3); }
}

.ff-banner__center {
  animation: ff-banner-pulse 2.6s ease-in-out infinite;
}`,
      android: `// Jetpack Compose — Android TV
import androidx.compose.animation.*
import androidx.compose.animation.core.*

@Composable
fun RoundCompleteBanner(visible: Boolean) {
    val easing = CubicBezierEasing(${b1.toFixed(2)}f, ${b2.toFixed(2)}f, ${b3.toFixed(2)}f, ${b4.toFixed(2)}f)
    AnimatedVisibility(
        visible = visible,
        enter = slideInVertically(
            initialOffsetY = { -40 },
            animationSpec = tween(${duration}, easing = easing)
        ) + scaleIn(initialScale = 0.94f, animationSpec = tween(${duration}, easing = easing))
          + fadeIn(animationSpec = tween(${duration}, easing = easing))
    ) {
        Banner(/* ... */)
    }

    // Sweep: animate a translucent gradient strip from left −45% → right 100%.
    val sweep by animateFloatAsState(
        targetValue = if (visible) 1f else 0f,
        animationSpec = tween(1100, delayMillis = 300, easing = CubicBezierEasing(0.4f, 0f, 0.2f, 1f))
    )

    // Pulse: brightness loop, 2.6 s ease-in-out, infinite.
    val pulse by rememberInfiniteTransition(label = "pulse").animateFloat(
        initialValue = 1f, targetValue = 1.3f,
        animationSpec = infiniteRepeatable(
            animation = tween(1300, easing = EaseInOut),
            repeatMode = RepeatMode.Reverse
        ), label = "brightness"
    )
}`,
      ios: `// SwiftUI — tvOS
import SwiftUI

struct RoundCompleteBanner: View {
    var visible: Bool
    @State private var sweepOffset: CGFloat = -0.45
    @State private var pulse: Double = 1.0
    var body: some View {
        Banner()
            .offset(y: visible ? 0 : -40)
            .scaleEffect(visible ? 1.0 : 0.94)
            .opacity(visible ? 1.0 : 0.0)
            .animation(.timingCurve(${b1}, ${b2}, ${b3}, ${b4}, duration: ${seconds}), value: visible)
            .overlay(SweepStrip(offset: sweepOffset))
            .brightness(pulse - 1.0)
            .onChange(of: visible) { v in
                if v {
                    withAnimation(.easeInOut(duration: 1.1).delay(0.3)) { sweepOffset = 1.0 }
                    withAnimation(.easeInOut(duration: 1.3).repeatForever(autoreverses: true)) { pulse = 1.3 }
                }
            }
    }
}`,
      roku: `<!-- Roku SceneGraph — components/RoundCompleteBanner.xml -->
<component name="RoundCompleteBanner" extends="Group">
  <interface>
    <field id="visible" type="boolean" alwaysNotify="true" onChange="onVisibleChange" />
  </interface>

  <children>
    <Rectangle id="banner" />
    <Animation id="dropIn" duration="${seconds}" easeFunction="outBack" repeat="false">
      <Vector2DFieldInterpolator
        fieldToInterp="banner.translation"
        keyValue="[ [0,-40], [0,0] ]"
        key="[ 0, 1 ]" />
      <Vector2DFieldInterpolator
        fieldToInterp="banner.scale"
        keyValue="[ [0.94,0.94], [1,1] ]"
        key="[ 0, 1 ]" />
      <FloatFieldInterpolator
        fieldToInterp="banner.opacity"
        keyValue="[ 0, 1 ]"
        key="[ 0, 1 ]" />
    </Animation>

    <Animation id="sweep" duration="1.1" delay="0.3" easeFunction="inOutQuad" repeat="false">
      <Vector2DFieldInterpolator
        fieldToInterp="sweepStrip.translation"
        keyValue="[ [-0.45, 0], [1.0, 0] ]"
        key="[ 0, 1 ]" />
    </Animation>

    <Animation id="pulse" duration="1.3" easeFunction="inOutQuad" repeat="true">
      <FloatFieldInterpolator
        fieldToInterp="banner.opacity"
        keyValue="[ 1.0, 0.8, 1.0 ]"
        key="[ 0, 0.5, 1.0 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onVisibleChange()
      if m.top.visible then
        m.top.findNode("dropIn").control = "start"
        m.top.findNode("sweep").control  = "start"
        m.top.findNode("pulse").control  = "start"
      end if
    end sub
  </script>
</component>`,
    };
  },

  pmTicket() {
    return `Title: Family Feud — Round-complete banner feedback animation

Trigger: round ends — either the player fills the board with correct guesses OR uses all 3 strikes.

Visual behavior:
  · The question/header is replaced with a Round-Complete banner showing final score + strikes.
  · The banner drops in from above with a back-ease overshoot.
  · ~300 ms after the banner lands, a soft white light band sweeps left-to-right across it once.
  · After the sweep finishes, the banner enters a slow brightness pulse loop until the player taps Continue.

Timings:
  · Drop-in — 620 ms, easing cubic-bezier(0.34, 1.56, 0.64, 1).
  · Sweep — 1100 ms, easing cubic-bezier(0.4, 0, 0.2, 1), delay 300 ms.
  · Pulse — 2.6 s ease-in-out, infinite (brightness 1 → 1.3 → 1).

Acceptance criteria:
  · Banner replaces the question without layout jump.
  · Sweep plays exactly once; pulse continues indefinitely.
  · Keyboard / interactive elements behind the banner dim and become non-interactive.`;
  },
};
