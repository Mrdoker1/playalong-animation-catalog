import type { AnimationModule, PlatformSnippets } from '../../types';
import { injectStyle } from '../../lib/injectStyle';

const CSS = `
.preview-hl {
  display: flex; flex-direction: column; gap: 16px;
  padding: 32px;
  background: rgba(0,0,0,0.8);
  border: 1.5px solid rgba(255,255,255,0.18);
  border-radius: 14px;
  width: 418px; box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
.preview-hl-btn {
  position: relative;
  width: 100%; height: 100px;
  display: flex; align-items: center; justify-content: center; gap: 20px;
  padding: 20px 24px;
  background: #202228;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  box-sizing: border-box;
  color: #fff;
  transition: background 200ms ease, border-color 200ms ease, opacity 200ms ease;
}
.preview-hl-btn--locked  { background: linear-gradient(90deg, #0090ff 0%, #0022ab 100%); border-color: rgba(255,255,255,0.4); }
.preview-hl-btn--correct { background: linear-gradient(180deg, #008e11 0%, #053800 100%); border-color: rgba(255,255,255,0.4); }
.preview-hl-btn--wrong   { background: linear-gradient(180deg, #8e0000 0%, #380000 100%); border-color: rgba(255,255,255,0.4); }
.preview-hl.is-resolved .preview-hl-btn--idle { opacity: 0.35; }

.preview-hl-key {
  flex-shrink: 0;
  width: 56px; height: 56px;
  background: #fff;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: inset 0 -5px 0 0 rgba(0,0,0,0.25);
}
.preview-hl-key__arrow {
  width: 0; height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-bottom: 18px solid #1a1d24;
}
.preview-hl-key--down { transform: rotate(180deg); }

.preview-hl-btn__label {
  font-size: 32px; font-weight: 800; text-transform: uppercase;
  letter-spacing: 1px; white-space: nowrap;
}
`;

type State = 'idle' | 'locked' | 'correct' | 'wrong';
let container: HTMLElement | null = null;
let higherBtn: HTMLElement | null = null;
let lowerBtn: HTMLElement | null = null;
let cycle = 0;

const cycles: Array<{ higher: State; lower: State; resolved: boolean }> = [
  { higher: 'locked',  lower: 'idle',    resolved: false }, // player picks Higher
  { higher: 'correct', lower: 'idle',    resolved: true  }, // reveal — correct
  { higher: 'idle',    lower: 'locked',  resolved: false }, // next round, player picks Lower
  { higher: 'idle',    lower: 'wrong',   resolved: true  }, // reveal — wrong
];

function apply(btn: HTMLElement | null, side: 'up' | 'down', state: State) {
  if (!btn) return;
  btn.className = `preview-hl-btn preview-hl-btn--${side === 'up' ? 'higher' : 'lower'} preview-hl-btn--${state}`;
  const label = btn.querySelector<HTMLElement>('.preview-hl-btn__label');
  if (label) {
    if (state === 'correct') label.textContent = 'Correct!';
    else if (state === 'wrong') label.textContent = 'Incorrect!';
    else label.textContent = side === 'up' ? 'Higher' : 'Lower';
  }
}

function frameBtn(label: string, state: 'idle' | 'locked' | 'correct' | 'wrong', dim: boolean): string {
  const grads: Record<string, string> = {
    idle:    '#202228',
    locked:  'linear-gradient(90deg,#0090ff 0%,#0022ab 100%)',
    correct: 'linear-gradient(180deg,#008e11 0%,#053800 100%)',
    wrong:   'linear-gradient(180deg,#8e0000 0%,#380000 100%)',
  };
  return `
    <div style="
      width:100%;height:30px;
      background:${grads[state]};
      border:1px solid rgba(255,255,255,${state === 'idle' ? 0.18 : 0.4});
      border-radius:5px;
      display:flex;align-items:center;justify-content:center;
      color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;
      text-transform:uppercase;letter-spacing:0.5px;
      opacity:${dim ? 0.35 : 1};
    ">${label}</div>
  `;
}

function frameController(slot: HTMLElement, higher: { state: 'idle' | 'locked' | 'correct' | 'wrong'; label: string; dim: boolean }, lower: { state: 'idle' | 'locked' | 'correct' | 'wrong'; label: string; dim: boolean }) {
  slot.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:6px;width:100%;
                background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.15);
                border-radius:6px;padding:8px;box-sizing:border-box;">
      ${frameBtn(higher.label, higher.state, higher.dim)}
      ${frameBtn(lower.label, lower.state, lower.dim)}
    </div>
  `;
}

export const Controller: AnimationModule = {
  id: 'cs-controller',
  title: 'Controller with Feedback',
  game: 'Card Sharks',
  description:
    'Higher / Lower picker buttons. The player locks one option (blue gradient), then on reveal the correct option turns green ("Correct!") and the wrong pick turns red ("Incorrect!"). The unpicked option dims to 35 % once the round resolves.',
  defaults: { duration: 200, easingId: 'ease' },
  frames: [
    {
      label: 'Idle',    sublabel: 'no pick yet · both neutral',
      render: (s) => frameController(s, { state: 'idle', label: 'Higher', dim: false }, { state: 'idle', label: 'Lower', dim: false }),
    },
    {
      label: 'Locked',  sublabel: 'player picked Higher · blue',
      render: (s) => frameController(s, { state: 'locked', label: 'Higher', dim: false }, { state: 'idle', label: 'Lower', dim: false }),
    },
    {
      label: 'Correct', sublabel: 'reveal · pick was right',
      render: (s) => frameController(s, { state: 'correct', label: 'Correct!', dim: false }, { state: 'idle', label: 'Lower', dim: true }),
    },
    {
      label: 'Wrong',   sublabel: 'reveal · pick was wrong',
      render: (s) => frameController(s, { state: 'idle', label: 'Higher', dim: true }, { state: 'wrong', label: 'Incorrect!', dim: false }),
    },
  ],

  render(stage) {
    injectStyle('css-cs-controller', CSS);
    cycle = 0;
    stage.innerHTML = `
      <div class="preview-hl">
        <button class="preview-hl-btn preview-hl-btn--higher preview-hl-btn--idle">
          <span class="preview-hl-key"><span class="preview-hl-key__arrow"></span></span>
          <span class="preview-hl-btn__label">Higher</span>
        </button>
        <button class="preview-hl-btn preview-hl-btn--lower preview-hl-btn--idle">
          <span class="preview-hl-key preview-hl-key--down"><span class="preview-hl-key__arrow"></span></span>
          <span class="preview-hl-btn__label">Lower</span>
        </button>
      </div>
    `;
    container = stage.querySelector('.preview-hl');
    [higherBtn, lowerBtn] = Array.from(stage.querySelectorAll<HTMLElement>('.preview-hl-btn'));
    return () => { stage.innerHTML = ''; container = higherBtn = lowerBtn = null; };
  },

  play({ duration }) {
    if (!container) return;
    const step = cycles[cycle % cycles.length];
    cycle++;
    container.style.setProperty('--hl-duration', `${duration}ms`);
    container.classList.toggle('is-resolved', step.resolved);
    // Apply transition duration dynamically.
    if (higherBtn) higherBtn.style.transition = `background ${duration}ms ease, border-color ${duration}ms ease, opacity ${duration}ms ease`;
    if (lowerBtn) lowerBtn.style.transition = `background ${duration}ms ease, border-color ${duration}ms ease, opacity ${duration}ms ease`;
    apply(higherBtn, 'up', step.higher);
    apply(lowerBtn, 'down', step.lower);
  },

  snippets({ duration }): PlatformSnippets {
    const seconds = (duration / 1000).toFixed(2);
    return {
      web: `/* HigherLowerButtons.css */
.hl-btn {
  background: #202228;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition:
    background ${duration}ms ease,
    border-color ${duration}ms ease,
    opacity ${duration}ms ease;
}

/* Player picked this option, waiting for reveal */
.hl-btn--state-locked {
  background: linear-gradient(90deg, #0090ff 0%, #0022ab 100%);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Reveal: this option was right (or the player's right pick) */
.hl-btn--state-correct {
  background: linear-gradient(180deg, #008e11 0%, #053800 100%);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Reveal: this was the player's wrong pick */
.hl-btn--state-wrong {
  background: linear-gradient(180deg, #8e0000 0%, #380000 100%);
  border-color: rgba(255, 255, 255, 0.4);
}

/* When the round has resolved, the un-picked idle option dims */
.hl-buttons--has-result .hl-btn--state-idle {
  opacity: 0.35;
}

/* Note: the label text itself swaps to "Correct!" / "Incorrect!" in JSX
   when the state resolves — no animation, just a string replacement. */`,
      android: `// Jetpack Compose — Android TV
import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.runtime.*

enum class PickState { Idle, Locked, Correct, Wrong }

@Composable
fun HigherLowerButton(side: Side, state: PickState, resolved: Boolean) {
    val background by animateColorAsState(
        targetValue = when (state) {
            PickState.Idle    -> Color(0xFF202228)
            PickState.Locked  -> Color(0xFF0090FF)
            PickState.Correct -> Color(0xFF008E11)
            PickState.Wrong   -> Color(0xFF8E0000)
        },
        animationSpec = tween(${duration}, easing = LinearEasing),
        label = "bg"
    )
    val alpha by animateFloatAsState(
        targetValue = if (resolved && state == PickState.Idle) 0.35f else 1f,
        animationSpec = tween(${duration}, easing = LinearEasing),
        label = "alpha"
    )

    val label = when (state) {
        PickState.Correct -> "Correct!"
        PickState.Wrong   -> "Incorrect!"
        else              -> if (side == Side.Up) "Higher" else "Lower"
    }

    Row(
        modifier = Modifier.fillMaxWidth().height(100.dp)
            .background(background, RoundedCornerShape(12.dp))
            .alpha(alpha),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.Center
    ) {
        KeyCap(direction = side)
        Spacer(Modifier.width(20.dp))
        Text(label, fontSize = 32.sp, fontWeight = FontWeight.ExtraBold)
    }
}`,
      ios: `// SwiftUI — tvOS
import SwiftUI

enum PickState { case idle, locked, correct, wrong }

struct HigherLowerButton: View {
    let side: Side
    let state: PickState
    let resolved: Bool

    var background: Color {
        switch state {
        case .idle:    return Color(red: 0.13, green: 0.13, blue: 0.16)
        case .locked:  return Color(red: 0.00, green: 0.56, blue: 1.00)
        case .correct: return Color(red: 0.00, green: 0.56, blue: 0.07)
        case .wrong:   return Color(red: 0.56, green: 0.00, blue: 0.00)
        }
    }

    var label: String {
        switch state {
        case .correct: return "Correct!"
        case .wrong:   return "Incorrect!"
        default:       return side == .up ? "Higher" : "Lower"
        }
    }

    var body: some View {
        HStack(spacing: 20) {
            KeyCap(direction: side)
            Text(label)
                .font(.system(size: 32, weight: .heavy))
        }
        .frame(maxWidth: .infinity, minHeight: 100)
        .background(background)
        .cornerRadius(12)
        .opacity(resolved && state == .idle ? 0.35 : 1.0)
        .animation(.easeInOut(duration: ${seconds}), value: state)
        .animation(.easeInOut(duration: ${seconds}), value: resolved)
    }
}`,
      roku: `<!-- Roku SceneGraph — components/HigherLowerButton.xml -->
<component name="HigherLowerButton" extends="Group">
  <interface>
    <field id="side"     type="string"  value="up" />               <!-- "up" or "down" -->
    <field id="state"    type="string"  alwaysNotify="true" onChange="onStateChange" /> <!-- idle | locked | correct | wrong -->
    <field id="resolved" type="boolean" alwaysNotify="true" onChange="onStateChange" />
  </interface>

  <children>
    <Rectangle id="bg" color="0x202228FF" />
    <Group id="keyCap" />
    <Label id="label" font="font:ExtraLargeBoldSystemFont" />

    <!-- Color/opacity animations crossfade between states. -->
    <Animation id="toBg" duration="${seconds}" easeFunction="inOutQuad" repeat="false">
      <ColorFieldInterpolator id="bgInterp" fieldToInterp="bg.color" />
    </Animation>
    <Animation id="toAlpha" duration="${seconds}" easeFunction="inOutQuad" repeat="false">
      <FloatFieldInterpolator id="alphaInterp" fieldToInterp="bg.opacity" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onStateChange()
      colors = { idle: "0x202228FF", locked: "0x0090FFFF", correct: "0x008E11FF", wrong: "0x8E0000FF" }
      target = colors[m.top.state]
      if target = invalid then return

      bgInterp = m.top.findNode("bgInterp")
      bgInterp.keyValue = [ m.top.findNode("bg").color, target ]
      bgInterp.key = [ 0, 1 ]
      m.top.findNode("toBg").control = "start"

      alphaInterp = m.top.findNode("alphaInterp")
      newAlpha = 1.0
      if m.top.resolved and m.top.state = "idle" then newAlpha = 0.35
      alphaInterp.keyValue = [ m.top.findNode("bg").opacity, newAlpha ]
      alphaInterp.key = [ 0, 1 ]
      m.top.findNode("toAlpha").control = "start"

      label = m.top.findNode("label")
      if m.top.state = "correct" then
        label.text = "Correct!"
      else if m.top.state = "wrong" then
        label.text = "Incorrect!"
      else if m.top.side = "up" then
        label.text = "Higher"
      else
        label.text = "Lower"
      end if
    end sub
  </script>
</component>`,
    };
  },

  pmTicket() {
    return `Title: Card Sharks / Match Game — Higher/Lower picker with feedback states

Component: HigherLowerButtons — a black-glass card containing two stacked option buttons. Each button has a white key-cap icon (↑ / ↓) + a large uppercase label ("Higher" / "Lower" by default; Match Game match-up rounds override the labels per question).

States (per button):
  · idle    — neutral dark surface (#202228), thin white border, full opacity.
  · locked  — player picked this option; horizontal blue gradient (#0090FF → #0022AB).
  · correct — reveal — this option was right (or the player's right pick); vertical green gradient (#008E11 → #053800); label swaps to "Correct!".
  · wrong   — reveal — this was the player's wrong pick; vertical red gradient (#8E0000 → #380000); label swaps to "Incorrect!".

Behavior:
  · Transitions between states crossfade background + border colour over 200 ms (ease).
  · Once any button resolves to correct/wrong/locked, the OTHER button (still idle) fades to opacity 0.35 — keeps the resolved pick dominant.
  · Idle button never animates on its own — no pulse, no glow, no breathing.

Acceptance criteria:
  · Label text changes are instant; only the colour + opacity crossfade.
  · A button cannot be focused/highlighted independently — D-pad navigation just moves the focus visual outside the button.
  · The same component is reused in Match Game match-up rounds with different labels — visuals and timings must match exactly.`;
  },
};
