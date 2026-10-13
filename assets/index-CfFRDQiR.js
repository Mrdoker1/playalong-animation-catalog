(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=i(a);fetch(a.href,r)}})();const j=[{id:"linear",label:"Linear",bezier:[0,0,1,1],description:"Constant speed, no acceleration."},{id:"ease",label:"Ease (browser default)",bezier:[.25,.1,.25,1],description:"Generic browser default."},{id:"ease-out",label:"Ease Out",bezier:[0,0,.2,1],description:"Fast start, soft landing — good for entrances."},{id:"ease-in",label:"Ease In",bezier:[.4,0,1,1],description:"Slow start, fast end — good for exits."},{id:"ease-in-out",label:"Ease In Out",bezier:[.4,0,.2,1],description:"Symmetric — good for ambient loops."},{id:"back-out",label:"Back Out (overshoot)",bezier:[.34,1.56,.64,1],description:"Overshoots past the end then settles — bouncy reveals."},{id:"material",label:"Material Standard",bezier:[.4,0,.2,1],description:'Material Design "standard" curve.'},{id:"glide",label:"Glide (Stack It)",bezier:[.3,.9,.3,1],description:"Quick launch, long soft settle — Stack It chip and block moves."}];function b(e){return`cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`}function h(e,t){if(document.getElementById(e))return;const i=document.createElement("style");i.id=e,i.textContent=t,document.head.appendChild(i)}const Be=450,me=350,Lt=`
.preview-ff-board { display: flex; flex-direction: column; gap: 12px; width: 540px; perspective: 1000px; }
.preview-ff-row {
  display: flex; align-items: center; gap: 20px;
  height: 72px; padding: 0 28px; border-radius: 10px;
  transform-origin: center center;
  color: #fff; font-family: 'Rubik', 'Helvetica Neue', Arial, sans-serif; font-weight: 500; font-size: 26px;
  background: linear-gradient(180deg, #1d4ed8 0%, #0a1f5a 100%);
  border: 2px solid rgba(56, 138, 255, 0.5);
}
.preview-ff-row.is-revealed {
  background: linear-gradient(180deg, #008e11 0%, #053800 100%);
  border-color: rgba(0, 255, 85, 0.55);
}
.preview-ff-row__num { width: 28px; text-align: center; font-size: 32px; }
.preview-ff-row__divider { width: 1px; align-self: stretch; background: rgba(255,255,255,0.15); }
.preview-ff-row__name { flex: 1; white-space: nowrap; letter-spacing: 0.5px; opacity: 0; }
.preview-ff-row__pts { font-size: 32px; white-space: nowrap; opacity: 0; }

@keyframes ff-row-flip {
  0%   { transform: rotateX(90deg) scale(0.85); }
  60%  { transform: rotateX(-15deg) scale(1.04); }
  85%  { transform: rotateX(6deg) scale(0.99); }
  100% { transform: rotateX(0) scale(1); }
}
@keyframes ff-text-fade-up {
  0%   { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;let S=null,z=null,R=null;function he(e,t){e.innerHTML=`
    <div class="frame-ff-row" style="
      transform: rotateX(${t.rotateX}deg) scale(${t.scale});
      ${t.state==="hidden"?"background:linear-gradient(180deg,#1d4ed8 0%,#0a1f5a 100%); border:1.5px solid rgba(56,138,255,0.5);":"background:linear-gradient(180deg,#008e11 0%,#053800 100%); border:1.5px solid rgba(0,255,85,0.55);"}
    ">
      <span style="font-size:18px;font-weight:600;">1</span>
      <span style="width:1px;align-self:stretch;background:rgba(255,255,255,0.2);"></span>
      <span style="flex:1;font-size:13px;font-weight:600;letter-spacing:0.3px;opacity:${t.textOpacity};">FAST FOOD</span>
      <span style="font-size:18px;font-weight:600;opacity:${t.textOpacity};">28</span>
    </div>
  `}const be=`
.frame-ff-row {
  display:flex;align-items:center;gap:10px;
  width:100%;height:40px;padding:0 12px;
  border-radius:6px;color:#fff;
  font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
  transform-origin:center center;
}
`,Et={id:"ff-answer-board",title:"Answer Board",game:"Family Feud",description:'When the player guesses correctly, the matching row flips open on the X-axis, swapping its blue "hidden" skin for the green "revealed" skin. Back-ease curve overshoots past the end then settles. The answer text fades up from beneath after the row lands.',defaults:{duration:700,easingId:"back-out"},frames:[{label:"Hidden",sublabel:"idle · blue · slot number only",render:e=>{h("css-ff-frame-row",be),he(e,{state:"hidden",rotateX:0,scale:1,textOpacity:0})}},{label:"Start",sublabel:"0% · rotateX 90° · scale .85",render:e=>{e.innerHTML='<div class="frame-ghost">edge · row on its side</div>'}},{label:"Overshoot",sublabel:"60% · rotateX −15° · scale 1.04",render:e=>{h("css-ff-frame-row",be),he(e,{state:"revealed",rotateX:-15,scale:1.04,textOpacity:0})}},{label:"Counter",sublabel:"85% · rotateX 6° · scale .99",render:e=>{h("css-ff-frame-row",be),he(e,{state:"revealed",rotateX:6,scale:.99,textOpacity:.6})}},{label:"Settled",sublabel:"100% · rotateX 0 · scale 1",render:e=>{h("css-ff-frame-row",be),he(e,{state:"revealed",rotateX:0,scale:1,textOpacity:1})}}],render(e){return h("css-ff-answer-board",Lt),e.innerHTML=`
      <div class="preview-ff-board">
        <div class="preview-ff-row">
          <span class="preview-ff-row__num">1</span>
          <span class="preview-ff-row__divider"></span>
          <span class="preview-ff-row__name">FAST FOOD</span>
          <span class="preview-ff-row__pts">28</span>
        </div>
      </div>
    `,S=e.querySelector(".preview-ff-row"),z=e.querySelector(".preview-ff-row__name"),R=e.querySelector(".preview-ff-row__pts"),()=>{e.innerHTML="",S=null,z=null,R=null}},play({duration:e,easing:t}){if(!S||!z||!R)return;S.classList.remove("is-revealed"),S.style.animation="none",z.style.animation="none",R.style.animation="none",z.style.opacity="0",R.style.opacity="0",S.offsetWidth,S.classList.add("is-revealed"),S.style.animation=`ff-row-flip ${e}ms ${b(t.bezier)}`;const i=Math.round(me/700*e),o=`ff-text-fade-up ${Be}ms ease-out ${i}ms both`;z.style.animation=o,R.style.animation=o,setTimeout(()=>{!S||!z||!R||(S.style.animation="none",z.style.animation="none",R.style.animation="none",z.style.opacity="0",R.style.opacity="0",S.classList.remove("is-revealed"))},e+1200)},snippets({duration:e,easing:t}){const[i,o,a,r]=t.bezier,n=(e/1e3).toFixed(2);return{web:`/* Drop into FamilyFeudBoard.css */
@keyframes ff-row-flip {
  0%   { transform: rotateX(90deg) scale(0.85); }
  60%  { transform: rotateX(-15deg) scale(1.04); }
  85%  { transform: rotateX(6deg) scale(0.99); }
  100% { transform: rotateX(0) scale(1); }
}

.ff-board { perspective: 1000px; }

.ff-board__row--revealed {
  animation: ff-row-flip ${e}ms ${b(t.bezier)};
  transform-origin: center center;
}

@keyframes ff-text-fade-up {
  0%   { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}

.ff-board__row--revealed .ff-board__name,
.ff-board__row--revealed .ff-board__points {
  animation: ff-text-fade-up ${Be}ms ease-out ${me}ms both;
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.runtime.*
import androidx.compose.ui.graphics.graphicsLayer

val easing = CubicBezierEasing(${i.toFixed(2)}f, ${o.toFixed(2)}f, ${a.toFixed(2)}f, ${r.toFixed(2)}f)

@Composable
fun AnswerRow(revealed: Boolean, modifier: Modifier = Modifier) {
    // Multi-step keyframe matching CSS @keyframes ff-row-flip.
    val rotationX by animateFloatAsState(
        targetValue = if (revealed) 0f else 90f,
        animationSpec = keyframes {
            durationMillis = ${e}
            90f at 0
            -15f at (${e} * 0.60).toInt()
            6f at (${e} * 0.85).toInt()
            0f at ${e}
        }
    )
    val scale by animateFloatAsState(
        targetValue = if (revealed) 1f else 0.85f,
        animationSpec = keyframes {
            durationMillis = ${e}
            0.85f at 0
            1.04f at (${e} * 0.60).toInt()
            0.99f at (${e} * 0.85).toInt()
            1.00f at ${e}
        }
    )
    Row(
        modifier = modifier.graphicsLayer {
            this.rotationX = rotationX
            scaleX = scale; scaleY = scale
            cameraDistance = 12 * density
        }
    ) { /* slot number / name / points */ }
}

// Text fade-up — separate animation, delayed ${me} ms.
val textAlpha by animateFloatAsState(
    targetValue = if (revealed) 1f else 0f,
    animationSpec = tween(${Be}, delayMillis = ${me})
)`,ios:`// SwiftUI — tvOS
import SwiftUI

struct AnswerRow: View {
    var revealed: Bool
    var body: some View {
        HStack { /* slot number / divider / name / points */ }
            .rotation3DEffect(
                .degrees(revealed ? 0 : 90),
                axis: (x: 1, y: 0, z: 0),
                perspective: 0.8
            )
            .scaleEffect(revealed ? 1.0 : 0.85)
            // Single back-ease — for the precise 4-step keyframe used on web,
            // chain three .withAnimation blocks (0→60%, 60%→85%, 85%→100%)
            // or use the new iOS 17 Animation.timeline API.
            .animation(
                .timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${n}),
                value: revealed
            )

        // Text fade-up — chained, delayed by 0.35 s.
        Text(answer.name)
            .opacity(revealed ? 1 : 0)
            .offset(y: revealed ? 0 : 8)
            .animation(.easeOut(duration: 0.45).delay(0.35), value: revealed)
    }
}`,roku:`<!-- Roku SceneGraph — components/AnswerRow.xml -->
<component name="AnswerRow" extends="Group">
  <interface>
    <field id="revealed" type="boolean" onChange="onRevealedChange" />
  </interface>

  <children>
    <Rectangle id="bg" />
    <!-- slot number / name / points labels -->

    <Animation id="flip" duration="${n}" easeFunction="outBack" repeat="false">
      <Vector2DFieldInterpolator
        fieldToInterp="bg.scale"
        keyValue="[ [0.85,0.85], [1.04,1.04], [0.99,0.99], [1,1] ]"
        key="[ 0, 0.60, 0.85, 1.0 ]" />
      <FloatFieldInterpolator
        fieldToInterp="bg.rotation"
        keyValue="[ 1.5708, -0.2618, 0.1047, 0 ]"
        key="[ 0, 0.60, 0.85, 1.0 ]" />
    </Animation>

    <Animation id="textFade" duration="0.45" delay="0.35" easeFunction="outQuad">
      <FloatFieldInterpolator fieldToInterp="nameLabel.opacity" keyValue="[ 0, 1 ]" key="[ 0, 1 ]" />
      <Vector2DFieldInterpolator fieldToInterp="nameLabel.translation" keyValue="[ [0,8], [0,0] ]" key="[ 0, 1 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onRevealedChange()
      if m.top.revealed then
        m.top.findNode("flip").control = "start"
        m.top.findNode("textFade").control = "start"
      end if
    end sub
  <\/script>
</component>
<!-- Note: Roku's outBack easeFunction approximates cubic-bezier(${i},${o},${a},${r}). -->`}},pmTicket(){return`Title: Family Feud — Answer Board row reveal animation

Trigger: player submits a guess that matches an unrevealed survey answer.

Visual behavior:
  · The matching row flips open on its horizontal axis (3D rotateX, perspective 1000 px), swapping the blue "hidden" skin (slot number only) for the green "revealed" skin (answer text + points).
  · The flip uses a back-ease overshoot — it rotates past the end position then settles.
  · Answer text and point value fade up from beneath, starting 350 ms after the flip begins.

Timings:
  · Row flip — 700 ms, easing cubic-bezier(0.34, 1.56, 0.64, 1).
  · Text fade-up — 450 ms, ease-out, delay 350 ms.

Acceptance criteria:
  · Only the matching row animates; other hidden rows stay still.
  · Once revealed, the row is permanent for the rest of the round (no idle loop).
  · On platforms without true 3D rotation, fall back to a scaleY 0 → 1 reveal — the overshoot must remain visible.`}},Bt=`
.preview-ff-attempts {
  background: rgba(0,0,0,0.8);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 24px 32px;
  width: 260px;
  display: flex; flex-direction: column;
  font-family: 'Rubik', 'Helvetica Neue', Arial, sans-serif;
}
.preview-ff-attempts__title {
  font-size: 18px; font-weight: 600; text-transform: uppercase;
  color: #fff; text-align: center; margin: 0 0 16px;
  letter-spacing: 0.5px;
}
.preview-ff-attempts__row {
  height: 56px; display: flex; align-items: center; justify-content: center;
  font-size: 24px; font-weight: 600; text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.15);
}
.preview-ff-attempts__row:last-child { border-bottom: none; }
.preview-ff-attempts__row--correct { color: #00d122; }
.preview-ff-attempts__row--incorrect { color: #c33; text-decoration: line-through; }
.preview-ff-attempts__row--empty { color: transparent; border-bottom: none; }

@keyframes ff-attempt-slide-in {
  0%   { transform: translateY(-18px); opacity: 0; }
  100% { transform: translateY(0);     opacity: 1; }
}
`;let ge=null,Y=0;const tt=[{text:"pizza",kind:"incorrect"},{text:"burger",kind:"correct"},{text:"tacos",kind:"incorrect"}];function it(e,t,i,o,a,r){e.innerHTML=`
    <div style="
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      font-size:18px;font-weight:600;
      color:${o};
      opacity:${i};
      transform:translateY(${t}px);
      text-decoration:line-through;
    ">${r}</div>
  `}const Ot={id:"ff-attempts",title:"Attempts",game:"Family Feud",description:"When the player submits a guess, a new row slides into the Attempts column from above. Correct rows render in green, incorrect rows render in red with a strike-through.",defaults:{duration:400,easingId:"ease-out"},frames:[{label:"Start",sublabel:"0% · translateY −18 · opacity 0",render:e=>{e.innerHTML='<div class="frame-ghost">hidden</div>'}},{label:"Mid",sublabel:"50% · translateY −9 · opacity .5",render:e=>it(e,-9,.5,"#c33",!0,"pizza")},{label:"Settled",sublabel:"100% · translateY 0 · opacity 1",render:e=>it(e,0,1,"#c33",!0,"pizza")}],render(e){return h("css-ff-attempts",Bt),e.innerHTML=`
      <div class="preview-ff-attempts">
        <div class="preview-ff-attempts__title">Attempts</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
      </div>
    `,ge=e.querySelector(".preview-ff-attempts"),Y=0,()=>{e.innerHTML="",ge=null}},play({duration:e,easing:t}){if(!ge)return;const i=tt[Y%tt.length],o=ge.querySelectorAll(".preview-ff-attempts__row"),a=o[Y%o.length];Y++,a.textContent=i.text,a.classList.remove("preview-ff-attempts__row--empty","preview-ff-attempts__row--correct","preview-ff-attempts__row--incorrect"),a.classList.add(`preview-ff-attempts__row--${i.kind}`),a.style.animation="none",a.offsetWidth,a.style.animation=`ff-attempt-slide-in ${e}ms ${b(t.bezier)}`,Y%o.length===0&&setTimeout(()=>{o.forEach((r,n)=>{n!==(Y-1)%o.length&&(r.textContent="_",r.className="preview-ff-attempts__row preview-ff-attempts__row--empty")})},e+800)},snippets({duration:e,easing:t}){const[i,o,a,r]=t.bezier,n=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
@keyframes ff-attempt-slide-in {
  0%   { transform: translateY(-18px); opacity: 0; }
  100% { transform: translateY(0);     opacity: 1; }
}

.ff-attempts__row--correct,
.ff-attempts__row--incorrect {
  animation: ff-attempt-slide-in ${e}ms ${b(t.bezier)};
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.*
import androidx.compose.animation.core.*

val easing = CubicBezierEasing(${i.toFixed(2)}f, ${o.toFixed(2)}f, ${a.toFixed(2)}f, ${r.toFixed(2)}f)

@Composable
fun AttemptRow(attempt: Attempt) {
    AnimatedVisibility(
        visible = true,
        enter = slideInVertically(
            initialOffsetY = { -18 },
            animationSpec = tween(${e}, easing = easing)
        ) + fadeIn(animationSpec = tween(${e}, easing = easing))
    ) {
        Text(
            text = attempt.text,
            color = if (attempt.correct) Color(0xFF00D122) else Color(0xFFCC3333),
            textDecoration = if (!attempt.correct) TextDecoration.LineThrough else null
        )
    }
}`,ios:`// SwiftUI — tvOS
import SwiftUI

struct AttemptRow: View {
    let attempt: Attempt
    @State private var appeared = false
    var body: some View {
        Text(attempt.text)
            .foregroundColor(attempt.correct ? .green : .red)
            .strikethrough(!attempt.correct, color: .red)
            .offset(y: appeared ? 0 : -18)
            .opacity(appeared ? 1 : 0)
            .onAppear {
                withAnimation(.timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${n})) {
                    appeared = true
                }
            }
    }
}`,roku:`<!-- Roku SceneGraph — components/AttemptRow.xml -->
<component name="AttemptRow" extends="Group">
  <interface>
    <field id="visible" type="boolean" alwaysNotify="true" onChange="onVisibleChange" />
  </interface>

  <children>
    <Label id="label" />
    <Animation id="slideIn" duration="${n}" easeFunction="outQuad" repeat="false">
      <Vector2DFieldInterpolator
        fieldToInterp="label.translation"
        keyValue="[ [0,-18], [0,0] ]"
        key="[ 0, 1 ]" />
      <FloatFieldInterpolator
        fieldToInterp="label.opacity"
        keyValue="[ 0, 1 ]"
        key="[ 0, 1 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onVisibleChange()
      if m.top.visible then m.top.findNode("slideIn").control = "start"
    end sub
  <\/script>
</component>`}},pmTicket(){return`Title: Family Feud — Attempts column row entry animation

Trigger: player submits a guess (correct or incorrect).

Visual behavior:
  · A new row is added to the Attempts column showing the player's input.
  · The row slides down 18 px into place and fades in simultaneously.
  · Correct attempts render in green, incorrect attempts in red with a strike-through.

Timings:
  · 400 ms, ease-out (cubic-bezier(0, 0, 0.2, 1)).

Acceptance criteria:
  · Each new attempt instance plays this animation once on mount.
  · Existing attempts stay still — only the new row animates.
  · After 3 strikes the panel locks; no further entries play.`}},Mt=`
.preview-ff-strikes {
  display: flex; gap: 32px; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.8);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 28px 56px;
}
.preview-ff-strike {
  width: 56px; height: 56px;
  display: flex; align-items: center; justify-content: center;
  border: 3px solid #ef4444;
  border-radius: 8px;
  color: #ef4444; font-size: 36px; font-weight: 700;
  font-family: 'Rubik', 'Helvetica Neue', Arial, sans-serif;
  opacity: 0.2;
  transform: scale(0.9);
}
.preview-ff-strike.is-used { opacity: 1; transform: scale(1); }

@keyframes ff-strike-pop {
  0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
  60%  { transform: scale(1.3) rotate(8deg);  opacity: 1; }
  100% { transform: scale(1) rotate(0);       opacity: 1; }
}
`;let D=[],re=0;function Oe(e,t,i,o){e.innerHTML=`
    <div style="
      width:44px;height:44px;
      display:flex;align-items:center;justify-content:center;
      border:2px solid #ef4444;border-radius:6px;
      color:#ef4444;font-size:26px;font-weight:700;
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      transform:scale(${t}) rotate(${i}deg);
      opacity:${o};
    ">✕</div>
  `}const Vt={id:"ff-strikes",title:"Strikes",game:"Family Feud",description:'On a wrong answer, the next strike X icon pops in with a rotation and scale overshoot. Back-ease curve gives the X a satisfying "punch" landing.',defaults:{duration:550,easingId:"back-out"},frames:[{label:"Start",sublabel:"idle · faint X · opacity .2",render:e=>Oe(e,.9,0,.2)},{label:"Overshoot",sublabel:"60% · scale 1.3 · rotate +8°",render:e=>Oe(e,1.3,8,1)},{label:"Settled",sublabel:"100% · scale 1 · rotate 0",render:e=>Oe(e,1,0,1)}],render(e){return h("css-ff-strikes",Mt),e.innerHTML=`
      <div class="preview-ff-strikes">
        <span class="preview-ff-strike">✕</span>
        <span class="preview-ff-strike">✕</span>
        <span class="preview-ff-strike">✕</span>
      </div>
    `,D=Array.from(e.querySelectorAll(".preview-ff-strike")),re=0,()=>{e.innerHTML="",D=[]}},play({duration:e,easing:t}){if(D.length===0)return;re>=D.length&&(D.forEach(o=>o.classList.remove("is-used")),re=0,D[0].offsetWidth);const i=D[re];i.classList.add("is-used"),i.style.animation="none",i.offsetWidth,i.style.animation=`ff-strike-pop ${e}ms ${b(t.bezier)}`,re++},snippets({duration:e,easing:t}){const[i,o,a,r]=t.bezier,n=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
@keyframes ff-strike-pop {
  0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
  60%  { transform: scale(1.3) rotate(8deg);  opacity: 1; }
  100% { transform: scale(1) rotate(0);       opacity: 1; }
}

.ff-strike-dot--used img {
  animation: ff-strike-pop ${e}ms ${b(t.bezier)};
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.ui.graphics.graphicsLayer

@Composable
fun StrikeIcon(used: Boolean) {
    val scale by animateFloatAsState(
        targetValue = if (used) 1f else 0f,
        animationSpec = keyframes {
            durationMillis = ${e}
            0f  at 0
            1.3f at (${e} * 0.60).toInt()
            1f  at ${e}
        }
    )
    val rotation by animateFloatAsState(
        targetValue = if (used) 0f else -30f,
        animationSpec = keyframes {
            durationMillis = ${e}
            -30f at 0
            8f   at (${e} * 0.60).toInt()
            0f   at ${e}
        }
    )
    val alpha by animateFloatAsState(
        targetValue = if (used) 1f else 0f,
        animationSpec = tween(${Math.round(e*.6)})
    )
    Icon(
        painter = painterResource(R.drawable.ic_strike),
        contentDescription = null,
        modifier = Modifier.graphicsLayer {
            scaleX = scale; scaleY = scale
            rotationZ = rotation
            this.alpha = alpha
        }
    )
}`,ios:`// SwiftUI — tvOS
import SwiftUI

struct StrikeIcon: View {
    var used: Bool
    var body: some View {
        Image(systemName: "xmark")
            .scaleEffect(used ? 1.0 : 0.0)
            .rotationEffect(.degrees(used ? 0 : -30))
            .opacity(used ? 1.0 : 0.0)
            // Single back-ease approximates the 3-step keyframe; for an
            // exact match, chain two .withAnimation blocks (0→60% overshoot
            // and 60%→100% settle).
            .animation(
                .timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${n}),
                value: used
            )
    }
}`,roku:`<!-- Roku SceneGraph — components/StrikeIcon.xml -->
<component name="StrikeIcon" extends="Group">
  <interface>
    <field id="used" type="boolean" alwaysNotify="true" onChange="onUsedChange" />
  </interface>

  <children>
    <Poster id="icon" />
    <Animation id="pop" duration="${n}" easeFunction="outBack" repeat="false">
      <Vector2DFieldInterpolator
        fieldToInterp="icon.scale"
        keyValue="[ [0,0], [1.3,1.3], [1,1] ]"
        key="[ 0, 0.60, 1.0 ]" />
      <FloatFieldInterpolator
        fieldToInterp="icon.rotation"
        keyValue="[ -0.5236, 0.1396, 0 ]"
        key="[ 0, 0.60, 1.0 ]" />
      <FloatFieldInterpolator
        fieldToInterp="icon.opacity"
        keyValue="[ 0, 1, 1 ]"
        key="[ 0, 0.60, 1.0 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onUsedChange()
      if m.top.used then m.top.findNode("pop").control = "start"
    end sub
  <\/script>
</component>`}},pmTicket(){return`Title: Family Feud — Strike X icon pop-in animation

Trigger: player's submitted guess does not match any unrevealed answer (incorrect attempt).

Visual behavior:
  · The next available strike slot's X icon pops in from nothing.
  · Scale ramps 0 → 1.3 (overshoot) → 1, with rotation −30° → +8° → 0° playing in parallel.
  · The icon stays visible for the rest of the round once popped.

Timings:
  · 550 ms, easing cubic-bezier(0.34, 1.56, 0.64, 1).

Acceptance criteria:
  · Only the newly-added strike icon animates; previously-used strikes stay still.
  · After 3 strikes the round ends — no further pop animations until next round.
  · On platforms without simultaneous transform interpolation, prioritize the scale overshoot over the rotation.`}},Ht=`
.preview-ff-feedback-wrap { width: 800px; }
.preview-ff-banner {
  position: relative;
  height: 110px;
  border-radius: 12px;
  background: rgba(0,0,0,0.85);
  border: 1.5px solid rgba(255,255,255,0.12);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  font-family: 'Rubik', 'Helvetica Neue', Arial, sans-serif;
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
`;let G=null;function Me(e,t,i,o,a){e.innerHTML=`
    <div style="
      position:relative;
      width:100%;height:42px;border-radius:6px;
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      color:#fff;font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;font-size:13px;font-weight:600;
      transform:translateY(${t}px) scale(${i});
      opacity:${o};
    ">
      <span style="display:inline-flex;align-items:center;justify-content:center;height:100%;padding:0 24px;background:linear-gradient(90deg,rgba(0,47,255,0) 0%,#002fff 50%,rgba(0,47,255,0) 100%);">Round Complete!</span>
      ${a!==null?`<div style="position:absolute;top:0;bottom:0;width:45%;left:${a}%;background:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(170,210,255,0.55) 50%,rgba(255,255,255,0) 100%);"></div>`:""}
    </div>
  `}const Nt={id:"ff-feedback",title:"Feedback",game:"Family Feud",description:'When the round wraps up, a Round-Complete banner drops in from above with a back-ease overshoot. A soft light band sweeps left-to-right across the banner once, signalling "phase complete, moving on". A slow brightness pulse keeps the band alive afterwards.',defaults:{duration:620,easingId:"ease-out"},frames:[{label:"Start",sublabel:"drop · translateY −40 · scale .94",render:e=>{e.innerHTML='<div class="frame-ghost">hidden</div>'}},{label:"Settled",sublabel:"drop done · translateY 0 · scale 1",render:e=>Me(e,0,1,1,null)},{label:"Sweep",sublabel:"light band mid-traversal",render:e=>Me(e,0,1,1,30)},{label:"Idle",sublabel:"brightness pulse loop",render:e=>Me(e,0,1,1,null)}],render(e){return h("css-ff-feedback",Ht),e.innerHTML=`
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
    `,G=e.querySelector(".preview-ff-banner"),()=>{e.innerHTML="",G=null}},play({duration:e,easing:t}){if(!G)return;G.style.animation="none",G.offsetWidth,G.style.animation=`ff-banner-in ${e}ms ${b(t.bezier)} backwards`;const i=G.querySelector(".preview-ff-banner__sweep");if(i){const o=i.cloneNode(!0);i.replaceWith(o)}},snippets({duration:e,easing:t}){const[i,o,a,r]=t.bezier,n=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
@keyframes ff-banner-in {
  from { opacity: 0; transform: translateY(-40px) scale(0.94); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.ff-banner {
  animation: ff-banner-in ${e}ms ${b(t.bezier)} backwards;
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
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.*
import androidx.compose.animation.core.*

@Composable
fun RoundCompleteBanner(visible: Boolean) {
    val easing = CubicBezierEasing(${i.toFixed(2)}f, ${o.toFixed(2)}f, ${a.toFixed(2)}f, ${r.toFixed(2)}f)
    AnimatedVisibility(
        visible = visible,
        enter = slideInVertically(
            initialOffsetY = { -40 },
            animationSpec = tween(${e}, easing = easing)
        ) + scaleIn(initialScale = 0.94f, animationSpec = tween(${e}, easing = easing))
          + fadeIn(animationSpec = tween(${e}, easing = easing))
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
}`,ios:`// SwiftUI — tvOS
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
            .animation(.timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${n}), value: visible)
            .overlay(SweepStrip(offset: sweepOffset))
            .brightness(pulse - 1.0)
            .onChange(of: visible) { v in
                if v {
                    withAnimation(.easeInOut(duration: 1.1).delay(0.3)) { sweepOffset = 1.0 }
                    withAnimation(.easeInOut(duration: 1.3).repeatForever(autoreverses: true)) { pulse = 1.3 }
                }
            }
    }
}`,roku:`<!-- Roku SceneGraph — components/RoundCompleteBanner.xml -->
<component name="RoundCompleteBanner" extends="Group">
  <interface>
    <field id="visible" type="boolean" alwaysNotify="true" onChange="onVisibleChange" />
  </interface>

  <children>
    <Rectangle id="banner" />
    <Animation id="dropIn" duration="${n}" easeFunction="outBack" repeat="false">
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
  <\/script>
</component>`}},pmTicket(){return`Title: Family Feud — Round-complete banner feedback animation

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
  · Keyboard / interactive elements behind the banner dim and become non-interactive.`}},Dt=`
.preview-score {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  background: rgba(0,0,0,0.8);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 24px 40px;
  font-family: 'Rubik', 'Helvetica Neue', Arial, sans-serif;
}
.preview-score__label {
  font-size: 22px; font-weight: 600; color: #fff;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.preview-score__value {
  font-size: 48px; font-weight: 800; color: #caa512;
  display: inline-block;
  transform-origin: center;
}
.preview-score__value.is-bumping {
  animation: game-timer-box-score-bump 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes game-timer-box-score-bump {
  0%   { transform: scale(1);    color: #caa512; }
  35%  { transform: scale(1.45); color: #6dd97a; }
  100% { transform: scale(1);    color: #caa512; }
}
`;let L=null,ve=86;function Ve(e,t,i,o){e.innerHTML=`
    <div style="
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      font-size:32px;font-weight:800;color:${i};
      transform:scale(${t});transform-origin:center;
    ">${o}</div>
  `}const Gt={id:"common-score",title:"Score",game:"Common",description:"When the player earns points, the Score value briefly scales up and flashes green before settling back to its resting gold colour. Used by both Family Feud and Card Sharks game timers.",defaults:{duration:600,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · scale 1 · #CAA512",render:e=>Ve(e,1,"#caa512","86")},{label:"Peak",sublabel:"35% · scale 1.45 · #6DD97A",render:e=>Ve(e,1.45,"#6dd97a","102")},{label:"Settled",sublabel:"100% · scale 1 · #CAA512",render:e=>Ve(e,1,"#caa512","102")}],render(e){return h("css-common-score",Dt),ve=86,e.innerHTML=`
      <div class="preview-score">
        <div class="preview-score__label">Score</div>
        <div class="preview-score__value">${ve}</div>
      </div>
    `,L=e.querySelector(".preview-score__value"),()=>{e.innerHTML="",L=null}},play({duration:e,easing:t}){L&&(ve+=Math.floor(Math.random()*25)+5,L.textContent=String(ve),L.classList.remove("is-bumping"),L.style.animation="none",L.offsetWidth,L.style.animation=`game-timer-box-score-bump ${e}ms ${b(t.bezier)}`)},snippets({duration:e,easing:t}){const[i,o,a,r]=t.bezier,n=(e/1e3).toFixed(2);return{web:`/* GameTimerBox.css — shared between Family Feud, Card Sharks, Fast Money */
@keyframes game-timer-box-score-bump {
  0%   { transform: scale(1);    color: #caa512; }
  35%  { transform: scale(1.45); color: #6dd97a; }
  100% { transform: scale(1);    color: #caa512; }
}

.game-timer-box__value--score-bump {
  display: inline-block;
  transform-origin: center;
  animation: game-timer-box-score-bump ${e}ms ${b(t.bezier)};
}

/* Trigger by toggling the modifier class on every score change.
   In React, key={score} on the value span forces remount → re-animation. */`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.*

@Composable
fun ScoreValue(score: Int) {
    val anim = remember { Animatable(1f) }
    val color = remember { Animatable(Color(0xFFCAA512)) }

    LaunchedEffect(score) {
        launch {
            anim.animateTo(
                targetValue = 1f,
                animationSpec = keyframes {
                    durationMillis = ${e}
                    1f    at 0
                    1.45f at (${e} * 0.35).toInt()
                    1f    at ${e}
                }
            )
        }
        launch {
            color.animateTo(Color(0xFF6DD97A), tween(${Math.round(e*.35)}))
            color.animateTo(Color(0xFFCAA512), tween(${Math.round(e*.65)}))
        }
    }

    Text(
        text = score.toString(),
        color = color.value,
        modifier = Modifier.graphicsLayer { scaleX = anim.value; scaleY = anim.value }
    )
}`,ios:`// SwiftUI — tvOS
import SwiftUI

struct ScoreValue: View {
    let score: Int
    @State private var scale: CGFloat = 1.0
    @State private var color: Color = Color(red: 0.79, green: 0.65, blue: 0.07)

    var body: some View {
        Text("\\(score)")
            .scaleEffect(scale)
            .foregroundColor(color)
            .onChange(of: score) { _ in
                withAnimation(.timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${n})) {
                    scale = 1.0  // ramps via spring-like back-ease
                }
                // Pulse via keyframe: scale 1 → 1.45 → 1
                let half = ${n} / 2.85
                withAnimation(.easeOut(duration: half)) {
                    scale = 1.45; color = Color(red: 0.43, green: 0.85, blue: 0.48)
                }
                DispatchQueue.main.asyncAfter(deadline: .now() + half) {
                    withAnimation(.easeIn(duration: ${n} - half)) {
                        scale = 1.0
                        color = Color(red: 0.79, green: 0.65, blue: 0.07)
                    }
                }
            }
    }
}`,roku:`<!-- Roku SceneGraph — components/ScoreValue.xml -->
<component name="ScoreValue" extends="Group">
  <interface>
    <field id="score" type="integer" alwaysNotify="true" onChange="onScoreChange" />
  </interface>

  <children>
    <Label id="label" font="font:LargeBoldSystemFont" color="0xCAA512FF" />
    <Animation id="bump" duration="${n}" easeFunction="outBack" repeat="false">
      <Vector2DFieldInterpolator
        fieldToInterp="label.scale"
        keyValue="[ [1,1], [1.45,1.45], [1,1] ]"
        key="[ 0, 0.35, 1.0 ]" />
      <ColorFieldInterpolator
        fieldToInterp="label.color"
        keyValue="[ 0xCAA512FF, 0x6DD97AFF, 0xCAA512FF ]"
        key="[ 0, 0.35, 1.0 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onScoreChange()
      m.top.findNode("label").text = m.top.score.toStr()
      m.top.findNode("bump").control = "start"
    end sub
  <\/script>
</component>`}},pmTicket(){return`Title: Common — Score increase feedback animation

Trigger: the player's total score increases (correct answer, round completion bonus).

Visual behavior:
  · The Score numeric value briefly scales up to 1.45 and flashes from gold (#CAA512) to green (#6DD97A).
  · It then settles back to scale 1.0 and gold colour.
  · The display text updates to the new score at the start of the animation.

Timings:
  · 600 ms total, easing cubic-bezier(0.34, 1.56, 0.64, 1).
  · Peak (scale + green) at 35 % of the duration; resolves over the remaining 65 %.

Acceptance criteria:
  · Animation re-fires on every distinct score change (skip if score is unchanged).
  · Used identically in Family Feud, Card Sharks, and Fast Money game-timer boxes.`}},Pt=`
.preview-cs-timer {
  width: 418px;
  height: 86px;
  background: rgba(0,0,0,0.8);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 20px 28px;
  box-sizing: border-box;
  font-family: 'Rubik', 'Helvetica Neue', Arial, sans-serif;
  display: flex; flex-direction: column; gap: 8px; justify-content: center;
}
.preview-cs-timer__row {
  display: flex; align-items: center; gap: 16px; height: 32px;
}
.preview-cs-timer__value {
  font-size: 28px; font-weight: 800; color: #caa512;
  min-width: 64px; text-align: left; text-transform: uppercase;
}
.preview-cs-timer__value.is-time-up {
  flex: 1; text-align: center; letter-spacing: 1px; min-width: 0;
  white-space: nowrap;
}
.preview-cs-timer__bar {
  flex: 1; height: 14px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden;
}
.preview-cs-timer__bar.is-hidden { display: none; }
.preview-cs-timer__bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #0090ff 0%, #0022ab 100%);
  border-radius: 10px;
  animation: cs-timer-deplete linear forwards;
}
.preview-cs-timer__bar-fill.is-critical {
  background: linear-gradient(90deg, #ef4444 0%, #f87171 100%);
}
@keyframes cs-timer-deplete {
  from { width: 100%; }
  to   { width: 0%; }
}
`;let _=null,X=null,F=null,E;function ye(e,t){if(t.timeUp){e.innerHTML=`
      <div style="
        width:100%;height:40px;
        background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
        border-radius:6px;display:flex;align-items:center;justify-content:center;
        color:#caa512;font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
        font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;
      ">Time's Up!</div>
    `;return}const i=t.critical?"linear-gradient(90deg,#ef4444 0%,#f87171 100%)":"linear-gradient(90deg,#0090ff 0%,#0022ab 100%)";e.innerHTML=`
    <div style="
      width:100%;height:40px;
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      border-radius:6px;
      padding:6px 8px;box-sizing:border-box;
      display:flex;align-items:center;gap:8px;
    ">
      <span style="color:#caa512;font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;font-size:12px;font-weight:800;min-width:24px;">${t.label}</span>
      <div style="flex:1;height:8px;background:rgba(255,255,255,0.1);border-radius:5px;overflow:hidden;">
        <div style="height:100%;width:${t.fill}%;background:${i};border-radius:5px;"></div>
      </div>
    </div>
  `}const qt={id:"cs-timer",title:"Timer",game:"Card Sharks",description:'Countdown bar that depletes linearly from full to empty over the question window. The blue gradient switches to red once the remaining time crosses a "critical" threshold (last 25%).',defaults:{duration:6e3,easingId:"linear"},slowFactor:2,frames:[{label:"Start",sublabel:"0% · 6s · blue full",render:e=>ye(e,{label:"6s",fill:100,critical:!1})},{label:"Mid",sublabel:"50% · 3s · blue half",render:e=>ye(e,{label:"3s",fill:50,critical:!1})},{label:"Critical",sublabel:"85% · 1s · red 15%",render:e=>ye(e,{label:"1s",fill:15,critical:!0})},{label:"Time’s Up",sublabel:"100% · bar removed · label centred",render:e=>ye(e,{label:"",fill:0,critical:!1,timeUp:!0})}],render(e){return h("css-cs-timer",Pt),e.innerHTML=`
      <div class="preview-cs-timer">
        <div class="preview-cs-timer__row">
          <span class="preview-cs-timer__value">6s</span>
          <div class="preview-cs-timer__bar">
            <div class="preview-cs-timer__bar-fill"></div>
          </div>
        </div>
      </div>
    `,_=e.querySelector(".preview-cs-timer__bar-fill"),X=e.querySelector(".preview-cs-timer__bar"),F=e.querySelector(".preview-cs-timer__value"),()=>{e.innerHTML="",_=null,X=null,F=null,E!==void 0&&clearInterval(E)}},play({duration:e}){if(!_||!F||!X)return;E!==void 0&&clearInterval(E),_.classList.remove("is-critical"),X.classList.remove("is-hidden"),F.classList.remove("is-time-up"),_.style.animation="none",_.offsetWidth,_.style.animationDuration=`${e}ms`,_.style.animation=`cs-timer-deplete ${e}ms linear forwards`;const t=Math.ceil(e/1e3);F.textContent=`${t}s`;const i=performance.now();E=window.setInterval(()=>{const o=Math.max(0,e-(performance.now()-i));if(o<=0){F&&(F.textContent="Time's Up!",F.classList.add("is-time-up")),X&&X.classList.add("is-hidden"),E!==void 0&&(clearInterval(E),E=void 0);return}F&&(F.textContent=`${Math.ceil(o/1e3)}s`),_&&o<e*.25&&_.classList.add("is-critical")},100)},snippets({duration:e}){const t=(e/1e3).toFixed(2);return{web:`/* GameTimerBox.css */
@keyframes game-timer-box-deplete {
  from { width: 100%; }
  to   { width: 0%; }
}

.game-timer-box__bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #0090ff 0%, #0022ab 100%);
  animation: game-timer-box-deplete ${e}ms linear forwards;
}

.game-timer-box__bar-fill--critical {
  background: linear-gradient(90deg, #ef4444 0%, #f87171 100%);
}

/* When the timer hits zero, the bar is removed from the DOM and the
   numeric value is replaced with the "Time's Up!" label — which then
   spans the full row width. */
.game-timer-box__value--time-up {
  flex: 1 1 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* React: use a resetKey prop (e.g. questionNumber) to force the fill node
   to remount when the timer needs to restart. */`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.animation.animateColorAsState

@Composable
fun TimerBar(durationMs: Int = ${e}, onElapsed: () -> Unit) {
    var progress by remember { mutableStateOf(1f) }
    val color by animateColorAsState(
        if (progress < 0.25f) Color(0xFFEF4444) else Color(0xFF0090FF),
        label = "timerColor"
    )

    LaunchedEffect(Unit) {
        val anim = Animatable(1f)
        anim.animateTo(
            targetValue = 0f,
            animationSpec = tween(durationMs, easing = LinearEasing)
        )
        progress = anim.value
        onElapsed()
    }

    Box(
        Modifier.fillMaxWidth(progress).height(14.dp).background(color, RoundedCornerShape(10.dp))
    )
}`,ios:`// SwiftUI — tvOS
import SwiftUI

struct TimerBar: View {
    let duration: Double = ${t}
    @State private var width: CGFloat = 1.0

    var critical: Bool { width < 0.25 }
    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Rectangle().fill(.white.opacity(0.1))
                Rectangle()
                    .fill(critical ? .red : .blue)
                    .frame(width: geo.size.width * width)
            }
        }
        .frame(height: 14)
        .clipShape(RoundedRectangle(cornerRadius: 10))
        .onAppear {
            withAnimation(.linear(duration: duration)) { width = 0 }
        }
    }
}`,roku:`<!-- Roku SceneGraph — components/TimerBar.xml -->
<component name="TimerBar" extends="Group">
  <interface>
    <field id="durationSeconds" type="float" value="${t}" />
    <field id="running" type="boolean" alwaysNotify="true" onChange="onRunningChange" />
  </interface>

  <children>
    <Rectangle id="track" color="0xFFFFFF1A" />
    <Rectangle id="fill"  color="0x0090FFFF" />
    <Animation id="deplete" easeFunction="linear" repeat="false">
      <FloatFieldInterpolator
        fieldToInterp="fill.scale"
        keyValue="[ [1,1], [0,1] ]"
        key="[ 0, 1 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    sub onRunningChange()
      anim = m.top.findNode("deplete")
      anim.duration = m.top.durationSeconds
      if m.top.running then
        anim.control = "start"
      else
        anim.control = "stop"
      end if
    end sub
  <\/script>
</component>`}},pmTicket(){return`Title: Card Sharks — Question timer countdown animation

Trigger: a new question is presented to the player.

Visual behavior:
  · A horizontal progress bar fills the timer card; it depletes from full width to 0 over the question's time window (default 6 s).
  · The remaining-seconds label updates every tick.
  · When the remaining time drops below 25 % of the total, the bar's blue gradient swaps to a red gradient (signals urgency).
  · When the timer reaches 0, the bar is removed and the numeric value is replaced with the centered "Time's Up!" label spanning the full row width.

Timings:
  · Bar deplete — 6000 ms by default (configurable per round), LINEAR easing.
  · Critical threshold — < 25 % of total remaining (instantly applies red palette).
  · Time's Up swap — instant transition when remaining hits 0.

Acceptance criteria:
  · The animation restarts cleanly on each new question (state fully resets).
  · If the player answers before time runs out, the animation pauses immediately and "Time's Up!" is never shown.
  · No bounce/easing at end — it's a literal countdown.`}},Wt=`
.preview-hl {
  display: flex; flex-direction: column; gap: 16px;
  padding: 32px;
  background: rgba(0,0,0,0.8);
  border: 1.5px solid rgba(255,255,255,0.18);
  border-radius: 14px;
  width: 418px; box-sizing: border-box;
  font-family: 'Rubik', 'Helvetica Neue', Arial, sans-serif;
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
`;let ne=null,se=null,le=null,He=0;const ot=[{higher:"locked",lower:"idle",resolved:!1},{higher:"correct",lower:"idle",resolved:!0},{higher:"idle",lower:"locked",resolved:!1},{higher:"idle",lower:"wrong",resolved:!0}];function at(e,t,i){if(!e)return;e.className=`preview-hl-btn preview-hl-btn--${t==="up"?"higher":"lower"} preview-hl-btn--${i}`;const o=e.querySelector(".preview-hl-btn__label");o&&(i==="correct"?o.textContent="Correct!":i==="wrong"?o.textContent="Incorrect!":o.textContent=t==="up"?"Higher":"Lower")}function rt(e,t,i){return`
    <div style="
      width:100%;height:30px;
      background:${{idle:"#202228",locked:"linear-gradient(90deg,#0090ff 0%,#0022ab 100%)",correct:"linear-gradient(180deg,#008e11 0%,#053800 100%)",wrong:"linear-gradient(180deg,#8e0000 0%,#380000 100%)"}[t]};
      border:1px solid rgba(255,255,255,${t==="idle"?.18:.4});
      border-radius:5px;
      display:flex;align-items:center;justify-content:center;
      color:#fff;font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;font-size:11px;font-weight:800;
      text-transform:uppercase;letter-spacing:0.5px;
      opacity:${i?.35:1};
    ">${e}</div>
  `}function we(e,t,i){e.innerHTML=`
    <div style="display:flex;flex-direction:column;gap:6px;width:100%;
                background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.15);
                border-radius:6px;padding:8px;box-sizing:border-box;">
      ${rt(t.label,t.state,t.dim)}
      ${rt(i.label,i.state,i.dim)}
    </div>
  `}const Ut={id:"cs-controller",title:"Controller with Feedback",game:"Card Sharks",description:'Higher / Lower picker buttons. The player locks one option (blue gradient), then on reveal the correct option turns green ("Correct!") and the wrong pick turns red ("Incorrect!"). The unpicked option dims to 35 % once the round resolves.',defaults:{duration:200,easingId:"ease"},frames:[{label:"Idle",sublabel:"no pick yet · both neutral",render:e=>we(e,{state:"idle",label:"Higher",dim:!1},{state:"idle",label:"Lower",dim:!1})},{label:"Locked",sublabel:"player picked Higher · blue",render:e=>we(e,{state:"locked",label:"Higher",dim:!1},{state:"idle",label:"Lower",dim:!1})},{label:"Correct",sublabel:"reveal · pick was right",render:e=>we(e,{state:"correct",label:"Correct!",dim:!1},{state:"idle",label:"Lower",dim:!0})},{label:"Wrong",sublabel:"reveal · pick was wrong",render:e=>we(e,{state:"idle",label:"Higher",dim:!0},{state:"wrong",label:"Incorrect!",dim:!1})}],render(e){return h("css-cs-controller",Wt),He=0,e.innerHTML=`
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
    `,ne=e.querySelector(".preview-hl"),[se,le]=Array.from(e.querySelectorAll(".preview-hl-btn")),()=>{e.innerHTML="",ne=se=le=null}},play({duration:e}){if(!ne)return;const t=ot[He%ot.length];He++,ne.style.setProperty("--hl-duration",`${e}ms`),ne.classList.toggle("is-resolved",t.resolved),se&&(se.style.transition=`background ${e}ms ease, border-color ${e}ms ease, opacity ${e}ms ease`),le&&(le.style.transition=`background ${e}ms ease, border-color ${e}ms ease, opacity ${e}ms ease`),at(se,"up",t.higher),at(le,"down",t.lower)},snippets({duration:e}){const t=(e/1e3).toFixed(2);return{web:`/* HigherLowerButtons.css */
.hl-btn {
  background: #202228;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition:
    background ${e}ms ease,
    border-color ${e}ms ease,
    opacity ${e}ms ease;
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
   when the state resolves — no animation, just a string replacement. */`,android:`// Jetpack Compose — Android TV
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
        animationSpec = tween(${e}, easing = LinearEasing),
        label = "bg"
    )
    val alpha by animateFloatAsState(
        targetValue = if (resolved && state == PickState.Idle) 0.35f else 1f,
        animationSpec = tween(${e}, easing = LinearEasing),
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
}`,ios:`// SwiftUI — tvOS
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
        .animation(.easeInOut(duration: ${t}), value: state)
        .animation(.easeInOut(duration: ${t}), value: resolved)
    }
}`,roku:`<!-- Roku SceneGraph — components/HigherLowerButton.xml -->
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
    <Animation id="toBg" duration="${t}" easeFunction="inOutQuad" repeat="false">
      <ColorFieldInterpolator id="bgInterp" fieldToInterp="bg.color" />
    </Animation>
    <Animation id="toAlpha" duration="${t}" easeFunction="inOutQuad" repeat="false">
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
  <\/script>
</component>`}},pmTicket(){return`Title: Card Sharks / Match Game — Higher/Lower picker with feedback states

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
  · The same component is reused in Match Game match-up rounds with different labels — visuals and timings must match exactly.`}},jt=`
.preview-hl-note {
  display: flex; flex-direction: column; gap: 8px;
  padding: 32px 36px;
  background: rgba(0, 0, 0, 0.8);
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  box-sizing: border-box;
  font-family: 'Rubik', 'Helvetica Neue', Arial, sans-serif;
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
`;let B=null;function nt(e,t,i,o,a){e.innerHTML=`
    <div style="
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      border-radius:6px;padding:8px 10px;
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;color:#fff;font-size:11px;line-height:1.4;
      transform:translate(${t}px, ${i}px) scale(${o});
      opacity:${a};
      max-width:140px;
    ">Use ▲ / ▼ to make your selections.</div>
  `}const Yt={id:"cs-info-note",title:"Info Note",game:"Card Sharks",description:"Persistent D-pad helper that lives in the bottom-left of the player screen. Black-glass card with two-line text and inline white key-cap glyphs for ↑ / ↓ that mirror the Higher/Lower buttons. Slides up-and-right into place on mount and then stays static.",defaults:{duration:420,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · translate −30,−16 · scale .96",render:e=>{e.innerHTML='<div class="frame-ghost">hidden · off-position</div>'}},{label:"Mid",sublabel:"50% · translate −15,−8 · scale .98",render:e=>nt(e,-15,-8,.98,.5)},{label:"Settled",sublabel:"100% · translate 0,0 · scale 1",render:e=>nt(e,0,0,1,1)}],render(e){return h("css-cs-info-note",jt),e.innerHTML=`
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
    `,B=e.querySelector(".preview-hl-note"),()=>{e.innerHTML="",B=null}},play({duration:e,easing:t}){B&&(B.classList.remove("is-shown"),B.style.animation="none",B.style.opacity="0",B.offsetWidth,B.style.animation=`cs-stage-in ${e}ms ${b(t.bezier)} forwards`)},snippets({duration:e,easing:t}){const[i,o,a,r]=t.bezier,n=(e/1e3).toFixed(2);return{web:`/* HigherLowerNote.css + CardSharksOverlay.css */
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
  animation: cs-stage-in ${e}ms ${b(t.bezier)} backwards;
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.*
import androidx.compose.animation.core.*

@Composable
fun HigherLowerNote(visible: Boolean) {
    val easing = CubicBezierEasing(${i.toFixed(2)}f, ${o.toFixed(2)}f, ${a.toFixed(2)}f, ${r.toFixed(2)}f)
    AnimatedVisibility(
        visible = visible,
        enter = (
            slideIn(initialOffset = { IntOffset(-30, -16) }, animationSpec = tween(${e}, easing = easing))
            + scaleIn(initialScale = 0.96f, animationSpec = tween(${e}, easing = easing))
            + fadeIn(animationSpec = tween(${e}, easing = easing))
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
}`,ios:`// SwiftUI — tvOS
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
            .timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${n}),
            value: visible
        )
    }
}`,roku:`<!-- Roku SceneGraph — components/HigherLowerNote.xml -->
<component name="HigherLowerNote" extends="Group">
  <interface>
    <field id="visible" type="boolean" alwaysNotify="true" onChange="onVisibleChange" />
  </interface>

  <children>
    <Group id="note">
      <Rectangle id="bg" color="0x000000CC" />
      <!-- text labels + key caps composed inside -->
    </Group>
    <Animation id="slideIn" duration="${n}" easeFunction="outBack" repeat="false">
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
  <\/script>
</component>`}},pmTicket(){return`Title: Card Sharks — D-pad helper note (HigherLowerNote) entry animation

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
  · When dismissed, just remove from the tree — do not play an exit animation.`}},Xt=`
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
`,xe=["♥ 7","♦ Q","♠ 3","♣ A","♥ J"];let C=null,$e=0;function Ne(e,t,i,o,a,r){e.innerHTML=`
    <div style="
      width:50px;height:72px;border-radius:6px;border:2px solid #fff;
      background:linear-gradient(135deg,#f5f5f5 0%,#e0e0e0 100%);
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      font-family:Georgia,serif;color:#b91c1c;font-weight:700;
      transform:translate(${t}px, ${i}px) rotate(${o}deg) scale(${a});
      opacity:${r};
      box-shadow:0 8px 18px rgba(0,0,0,0.45);
    ">
      <div style="font-size:24px;line-height:1;">Q</div>
      <div style="font-size:18px;line-height:1;margin-top:2px;">♦</div>
    </div>
  `}const Kt={id:"cs-card",title:"Card component",game:"Card Sharks",description:"When a new question shows up, the next playing card flies in from off-screen top-left, rotating into place with a slight overshoot. The card lands flat and stays put until the next question.",defaults:{duration:620,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · translate −60,−30 · rot −26° · scale .42",render:e=>{e.innerHTML='<div class="frame-ghost">hidden · off-screen</div>'}},{label:"Mid",sublabel:"55% · in motion · opacity reaches 1",render:e=>Ne(e,-25,-10,-12,.7,1)},{label:"Overshoot",sublabel:"78% · translate 0,+8 · rot +3° · scale 1.04",render:e=>Ne(e,0,8,3,1.04,1)},{label:"Settled",sublabel:"100% · translate 0,0 · rot 0 · scale 1",render:e=>Ne(e,0,0,0,1,1)}],render(e){return h("css-cs-card",Xt),$e=0,e.innerHTML=`
      <div class="preview-cs-card-stage">
        <div class="preview-cs-card">
          <div class="preview-cs-card__rank">${xe[0][2]}</div>
          <div class="preview-cs-card__suit">${xe[0][0]}</div>
        </div>
      </div>
    `,C=e.querySelector(".preview-cs-card"),()=>{e.innerHTML="",C=null}},play({duration:e}){if(!C)return;$e=($e+1)%xe.length;const t=xe[$e],i=C.querySelector(".preview-cs-card__rank"),o=C.querySelector(".preview-cs-card__suit");i&&(i.textContent=t[2]),o&&(o.textContent=t[0]),C.classList.remove("is-flying"),C.style.animation="none",C.offsetWidth,C.classList.add("is-flying"),C.style.animation=`cs-card-fly-in ${e}ms cubic-bezier(0.18, 0.89, 0.32, 1.18) both`},snippets({duration:e,easing:t}){const[i,o,a,r]=t.bezier,n=(e/1e3).toFixed(2);return{web:`/* CardSharksOverlay.css */
@keyframes cs-card-fly-in {
  0%   { transform: translate(-380px, -160px) rotate(-26deg) scale(0.42); opacity: 0; }
  55%  {                                                                   opacity: 1; }
  78%  { transform: translate(0, 8px)          rotate(3deg)   scale(1.04); }
  100% { transform: translate(0, 0)            rotate(0deg)   scale(1);    opacity: 1; }
}

.cs-stage__card-box {
  /* key={questionNumber} on the parent forces remount → fly-in replays
     on each new question. */
  animation: cs-card-fly-in ${e}ms cubic-bezier(0.18, 0.89, 0.32, 1.18) both;
}`,android:`// Jetpack Compose — Android TV
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
        launch { alpha.animateTo(1f, tween((${e} * 0.55).toInt(), easing = LinearOutSlowInEasing)) }
        launch {
            tx.animateTo(0f,    tween((${e} * 0.78).toInt(), easing = LinearOutSlowInEasing))
            // overshoot to y=8, rot=3, scale=1.04, then settle
            launch { ty.animateTo(8f,  tween((${e} * 0.78).toInt())) }
            launch { rot.animateTo(3f, tween((${e} * 0.78).toInt())) }
            launch { scale.animateTo(1.04f, tween((${e} * 0.78).toInt())) }
        }
        delay((${e} * 0.78).toLong())
        launch { ty.animateTo(0f,  tween((${e} * 0.22).toInt())) }
        launch { rot.animateTo(0f, tween((${e} * 0.22).toInt())) }
        launch { scale.animateTo(1f, tween((${e} * 0.22).toInt())) }
    }

    Box(
        Modifier.graphicsLayer {
            translationX = tx.value; translationY = ty.value
            rotationZ = rot.value
            scaleX = scale.value; scaleY = scale.value
            this.alpha = alpha.value
        }
    ) { /* card face */ }
}`,ios:`// SwiftUI — tvOS
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
        withAnimation(.timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${n} * 0.78)) {
            stage = 1
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + ${n} * 0.78) {
            withAnimation(.easeOut(duration: ${n} * 0.22)) { stage = 2 }
        }
    }
}`,roku:`<!-- Roku SceneGraph — components/CardFlyIn.xml -->
<component name="CardFlyIn" extends="Group">
  <interface>
    <field id="questionNumber" type="integer" alwaysNotify="true" onChange="onQuestionChange" />
  </interface>

  <children>
    <Group id="card">
      <!-- card face -->
    </Group>
    <Animation id="fly" duration="${n}" easeFunction="outBack" repeat="false">
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
  <\/script>
</component>`}},pmTicket(){return`Title: Card Sharks — Card component fly-in animation

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
  · No idle motion after the animation completes.`}};function vt(e){switch(e.id){case"linear":return{name:"linear",note:""};case"ease":return{name:"inOutQuad",note:"Closest match to CSS ease."};case"ease-out":return{name:"outQuad",note:"Closest match to CSS ease-out."};case"ease-in":return{name:"inQuad",note:"Closest match to CSS ease-in."};case"ease-in-out":return{name:"inOutQuad",note:""};case"back-out":return{name:"outBack",note:"Built-in overshoot curve."};case"material":return{name:"inOutQuad",note:"Material standard ≈ inOutQuad."};case"glide":return{name:"outCubic",note:"Glide (0.3, 0.9, 0.3, 1) ≈ outCubic."};default:return{name:"inOutQuad",note:"Custom cubic-bezier — use FloatFieldInterpolator with hand-tuned key points if precision matters."}}}const f={ink:"#0c1240",gold:"#d9a80b",goldHi:"#ffc928",lav:"#7b7fd6",win:"#7bff3c",miss:"#ff2a2a",mine:"#0090ff",chipBg:"linear-gradient(180deg,#f6f9ff 0%,#e2eafb 55%,#b7cbef 100%)",font:"'Rubik', 'Helvetica Neue', Arial, sans-serif"},ue=`
.preview-si-board {
  position: relative;
  background: radial-gradient(120% 140% at 50% 0%, #1b2a7a 0%, #0a1033 60%, #060b24 100%);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  overflow: hidden;
  font-family: ${f.font};
}
.preview-si-chip {
  position: absolute;
  box-sizing: border-box;
  display: flex; align-items: center; justify-content: center;
  border-radius: 999px;
  background: ${f.chipBg};
  border: 2px solid #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.4);
  color: ${f.ink};
  font-weight: 600; font-size: 13px; letter-spacing: .02em; text-transform: uppercase;
  white-space: nowrap;
}
.preview-si-chip.is-focus {
  border: 3px solid ${f.gold};
  box-shadow: 0 0 12px rgba(255,200,0,0.4), 0 3px 6px rgba(0,0,0,0.4);
  z-index: 4;
}
.preview-si-ghost {
  position: absolute;
  box-sizing: border-box;
  border-radius: 999px;
  border: 2px dashed rgba(163,168,204,0.6);
}
`;function H(e,t){const i=t.focus?`3px solid ${f.gold}`:"2px solid #fff",o=t.focus?"0 0 10px rgba(255,200,0,0.45),":"";e.innerHTML=`
    <div style="
      width:130px;height:30px;box-sizing:border-box;
      display:flex;align-items:center;justify-content:center;
      border-radius:999px;background:${f.chipBg};border:${i};
      box-shadow:${o}0 2px 4px rgba(0,0,0,0.4);
      color:${f.ink};font-family:${f.font};font-weight:600;
      font-size:${t.fontSize??10}px;letter-spacing:.02em;text-transform:uppercase;
      transform:scale(${t.scale??1});
      ${t.extra??""}
    ">${t.text}</div>
  `}const Qt=`
.preview-si-place { width: 520px; height: 260px; }
.preview-si-place__slot {
  position: absolute; left: 300px; width: 196px; height: 44px;
  border-radius: 999px;
  background: rgba(10,16,60,0.55);
  border: 1.5px solid rgba(123,127,214,0.45);
  box-sizing: border-box;
}
.preview-si-place .preview-si-ghost { left: 24px; top: 104px; width: 160px; height: 40px; opacity: 0; transition: opacity 200ms; }
.preview-si-place .preview-si-chip.is-in-slot { font-size: 14px; }
`,yt=[20,78,136,194],st={left:24,top:104,width:160,height:40},Jt={left:300,top:yt[0],width:196,height:44};let w=null,ce=null,We=[];function lt(){We.forEach(clearTimeout),We=[]}function De(e,t){Object.assign(e.style,{left:`${t.left}px`,top:`${t.top}px`,width:`${t.width}px`,height:`${t.height}px`})}const Zt={id:"si-chip-place",title:"Answer → Slot",game:"Stack It",description:"Pressing OK on an answer chip glides it from the answer tray into the first free slot of the stack. The chip morphs to the slot size on the way, keeps the gold ring while the player chooses a slot, and a dashed ghost marks the spot it left. When five answers are placed, the sixth fills the last slot automatically after 450 ms.",defaults:{duration:450,easingId:"glide"},frames:[{label:"Picked",sublabel:"0% · in tray · gold ring",render:e=>H(e,{text:"Guitar",focus:!0})},{label:"Gliding",sublabel:"~40% · ~85% of the way (glide)",render:e=>H(e,{text:"Guitar",focus:!0,extra:"width:150px;transform:translateX(10px)"})},{label:"In slot",sublabel:"100% · slot size · font 13 → 14px",render:e=>H(e,{text:"Guitar",focus:!0,fontSize:11,extra:"width:160px"})},{label:"Locked",sublabel:"OK · ring → white · 200 ms",render:e=>H(e,{text:"Guitar",fontSize:11,extra:"width:160px"})}],render(e){return h("css-si-base",ue),h("css-si-chip-place",Qt),e.innerHTML=`
      <div class="preview-si-board preview-si-place">
        ${yt.map(t=>`<div class="preview-si-place__slot" style="top:${t}px"></div>`).join("")}
        <div class="preview-si-ghost"></div>
        <div class="preview-si-chip is-focus">Guitar</div>
      </div>
    `,w=e.querySelector(".preview-si-chip"),ce=e.querySelector(".preview-si-ghost"),w&&De(w,st),()=>{lt(),e.innerHTML="",w=null,ce=null}},play({duration:e,easing:t}){if(!w||!ce)return;lt();const i=b(t.bezier);w.style.transition="none",w.classList.add("is-focus"),w.classList.remove("is-in-slot"),ce.style.opacity="0",De(w,st),w.offsetWidth,w.style.transition=`left ${e}ms ${i}, top ${e}ms ${i}, width ${e}ms ease, height ${e}ms ease, font-size 200ms, border-color 200ms, box-shadow 200ms`,De(w,Jt),w.classList.add("is-in-slot"),ce.style.opacity="1",We.push(window.setTimeout(()=>w==null?void 0:w.classList.remove("is-focus"),e+500))},snippets({duration:e,easing:t}){const[i,o,a,r]=t.bezier,n=(e/1e3).toFixed(2),c=b(t.bezier),s=vt(t);return{web:`/* StackItOverlay.css
   Chips are absolutely positioned; JS writes left/top/width/height in % of
   the 16:9 stage (tray cell or slot rect). The transition does the glide. */
.si-chip {
  position: absolute;
  border-radius: 999px;
  background: linear-gradient(180deg, #f6f9ff 0%, #e2eafb 55%, #b7cbef 100%);
  border: .2cqw solid #fff;
  font-size: 1.2cqw;
  transition:
    left   ${e}ms ${c},
    top    ${e}ms ${c},
    width  ${e}ms ease,
    height ${e}ms ease,
    transform .2s, border-color .2s, box-shadow .2s, font-size .2s;
}
.si-chip--in-slot { font-size: 1.3cqw; }
.si-chip--moving  { border: .32cqw solid ${f.gold}; box-shadow: 0 0 1.2cqw #ffc80066, 0 .25cqw .5cqw #0006; z-index: 4; }

/* Dashed outline left behind in the tray */
.si-ghost { border: .18cqw dashed #a3a8cc99; border-radius: 999px; transition: opacity .2s; }

@media (prefers-reduced-motion: reduce) { .si-chip { transition: none; } }`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.ui.unit.*

@Composable
fun StackChip(text: String, target: DpRect, moving: Boolean) {
    val glide = CubicBezierEasing(${i}f, ${o}f, ${a}f, ${r}f)
    val pos by animateDpOffsetAsState(
        targetValue = DpOffset(target.left, target.top),
        animationSpec = tween(${e}, easing = glide), label = "chipPos"
    )
    val size by animateDpSizeAsState(
        targetValue = DpSize(target.width, target.height),
        animationSpec = tween(${e}, easing = FastOutSlowInEasing), label = "chipSize"
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
}`,ios:`// SwiftUI — tvOS
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
            .animation(.timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${n}), value: frame)
            .animation(.easeInOut(duration: 0.2), value: moving)
    }
}`,roku:`<!-- Roku SceneGraph — components/StackChip.xml -->
<component name="StackChip" extends="Group">
  <interface>
    <field id="target" type="vector2d" onChange="onTargetChange" />
  </interface>

  <children>
    <Poster id="bg" uri="pkg:/images/chip_9patch.png" />
    <Label  id="label" horizAlign="center" vertAlign="center" />
    <Animation id="glide" duration="${n}" easeFunction="${s.name}" repeat="false">
      <Vector2DFieldInterpolator id="move" fieldToInterp="m.top.translation" key="[ 0, 1 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    ' ${s.note||"Easing matches the catalog preset."}
    ' Width/height morph: resize bg + label in the same frame or swap to the slot-sized 9-patch at 50%.
    sub onTargetChange()
      move = m.top.findNode("move")
      move.keyValue = [ m.top.translation, m.top.target ]
      m.top.findNode("glide").control = "start"
    end sub
  <\/script>
</component>`}},pmTicket(){return`Title: Stack It — Answer chip glides into the stack

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
  · Reduced-motion setting: chips jump instantly.`}},ei=`
.preview-si-focus { width: 520px; height: 296px; }
.preview-si-focus .preview-si-chip { left: 150px; width: 220px; height: 42px; }
.preview-si-focus .preview-si-chip.is-big { transform: scale(1.09); font-size: 17px; z-index: 5; }
.preview-si-arrows {
  position: absolute; left: 384px; width: 20px; height: 38px;
  display: flex; flex-direction: column; justify-content: space-between; align-items: center;
}
.preview-si-arrows[hidden] { display: none; }
.preview-si-arrows i { width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; }
.preview-si-arrows i.up { border-bottom: 11px solid ${f.goldHi}; }
.preview-si-arrows i.dn { border-top: 11px solid ${f.goldHi}; }
.preview-si-arrows i.up.off { border-bottom-color: ${f.lav}; }
.preview-si-arrows i.dn.off { border-top-color: ${f.lav}; }
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
`,de=[18,70,122,174],ct=["Guitar","Piano/Keyboard","Violin/Fiddle","Trumpet"],Ge=450,ti=300,ii="cubic-bezier(0.3, 0.9, 0.3, 1)";let k=[],$=null,Te=null,Ue=[];function dt(){Ue.forEach(clearTimeout),Ue=[]}function ke(e,t){Te&&(Te.innerHTML=`<span>${e}</span><span class="preview-si-key">▲</span><span class="preview-si-key">▼</span><span>${t}</span><span class="preview-si-key">Ok</span>`)}const oi={id:"si-focus",title:"Focus & Pick Up",game:"Stack It",description:'Remote focus on a chip. In the tray, focus is a gold ring with a soft glow. Once the stack is full, the focused block also grows to 109 % so it reads as "selectable". Pressing OK picks the block up: it shrinks back to 100 %, keeps the ring, and ▲ ▼ arrows appear next to it and travel with it. OK again drops the block: the arrows disappear and it grows back to the focused size.',defaults:{duration:200,easingId:"ease"},frames:[{label:"Idle",sublabel:"white 2px border",render:e=>H(e,{text:"Harp"})},{label:"Focus",sublabel:"tray · gold ring + glow",render:e=>H(e,{text:"Harp",focus:!0})},{label:"Focus (stack)",sublabel:"scale 1.09 · font 13 → 17px",render:e=>H(e,{text:"Harp",focus:!0,scale:1.09,fontSize:12})},{label:"Picked up",sublabel:"scale 1 · ring stays · ▲▼ shown",render:e=>H(e,{text:"Harp ▴▾",focus:!0})}],render(e){return h("css-si-base",ue),h("css-si-focus",ei),e.innerHTML=`
      <div class="preview-si-board preview-si-focus">
        ${ct.map((t,i)=>`<div class="preview-si-chip" style="top:${de[i]}px">${t}</div>`).join("")}
        <div class="preview-si-arrows" hidden><i class="up"></i><i class="dn"></i></div>
        <div class="preview-si-hint"></div>
      </div>
    `,k=Array.from(e.querySelectorAll(".preview-si-chip")),$=e.querySelector(".preview-si-arrows"),Te=e.querySelector(".preview-si-hint"),k[0].classList.add("is-focus","is-big"),ke("Choose a block","OK pick it up"),()=>{dt(),e.innerHTML="",k=[],$=null,Te=null}},play({duration:e,easing:t}){if(!k.length||!$)return;dt();const i=b(t.bezier),o=ct.map((d,l)=>l);let a=1;const r=()=>{o.forEach((d,l)=>{k[d].style.top=`${de[l]}px`}),$&&($.style.top=`${de[a]+2}px`,$.children[0].classList.toggle("off",a<=0),$.children[1].classList.toggle("off",a>=de.length-1))};k.forEach(d=>{d.style.transition="none",d.classList.remove("is-focus","is-big")}),$.style.transition="none",k[0].classList.add("is-focus","is-big"),$.hidden=!0,r(),ke("Choose a block","OK pick it up"),k[0].offsetWidth,k.forEach(d=>{d.style.transition=[...["transform","border-color","box-shadow","font-size"].map(l=>`${l} ${e}ms ${i}`),`top ${Ge}ms ${ii}`].join(", ")}),$.style.transition=`top ${ti}ms ease`;let n=150;const c=(d,l)=>{n+=d,Ue.push(window.setTimeout(l,n))};c(0,()=>{k[0].classList.remove("is-focus","is-big"),k[1].classList.add("is-focus","is-big")}),c(e+700,()=>{k[o[a]].classList.remove("is-big"),r(),$&&($.hidden=!1),ke("Move","OK drop")});const s=()=>{a>=de.length-1||([o[a],o[a+1]]=[o[a+1],o[a]],a+=1,r())};c(900,s),c(Ge+350,s),c(Ge+600,()=>{$&&($.hidden=!0),k[o[a]].classList.add("is-big"),ke("Choose a block","OK pick it up")})},snippets({duration:e,easing:t}){const[i,o,a,r]=t.bezier,n=(e/1e3).toFixed(2),c=b(t.bezier);return{web:`/* StackItOverlay.css */
.si-chip {
  border: .2cqw solid #fff;
  transition: transform ${e}ms ${c}, border-color ${e}ms ${c},
              box-shadow ${e}ms ${c}, font-size ${e}ms ${c};
}

/* Remote focus (tray) and picked-up block (stack) share the gold ring */
.si-chip--focus,
.si-chip--moving {
  border: .32cqw solid ${f.gold};
  box-shadow: 0 0 1.2cqw #ffc80066, 0 .25cqw .5cqw #0006;
  z-index: 4;
}

/* Focus while the stack is full ("Choose a block") */
.si-chip--big { transform: scale(1.09); font-size: 1.55cqw; z-index: 5; }

/* ▲ ▼ next to the picked-up block; lavender when that direction is blocked */
.si-arrows      { transition: top .3s; }
.si-arrows .up  { border-bottom: 1.1cqw solid ${f.goldHi}; }
.si-arrows .dn  { border-top:    1.1cqw solid ${f.goldHi}; }
.si-arrows .up.off { border-bottom-color: ${f.lav}; }
.si-arrows .dn.off { border-top-color:    ${f.lav}; }`,android:`// Jetpack Compose — Android TV
@Composable
fun StackBlock(text: String, focused: Boolean, stackFull: Boolean, pickedUp: Boolean) {
    val easing = CubicBezierEasing(${i}f, ${o}f, ${a}f, ${r}f)
    val spec = tween<Float>(${e}, easing = easing)
    val ringOn = focused || pickedUp
    val scale by animateFloatAsState(if (focused && stackFull && !pickedUp) 1.09f else 1f, spec, label = "scale")
    val ring by animateColorAsState(if (ringOn) Color(0xFFD9A80B) else Color.White, tween(${e}), label = "ring")
    val glow by animateFloatAsState(if (ringOn) 1f else 0f, spec, label = "glow")

    Box(
        Modifier
            .graphicsLayer { scaleX = scale; scaleY = scale }
            .shadow((12 * glow).dp, CircleShape, ambientColor = Color(0x66FFC800), spotColor = Color(0x66FFC800))
            .border(if (ringOn) 3.dp else 2.dp, ring, CircleShape)
            .background(chipGradient, CircleShape)
    ) { /* label */ }
}`,ios:`// SwiftUI — tvOS
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
            .animation(.timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${n}), value: focused)
            .animation(.timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${n}), value: pickedUp)
    }
}`,roku:`<!-- Roku SceneGraph — components/StackBlock.xml -->
<component name="StackBlock" extends="Group">
  <interface>
    <field id="state" type="string" onChange="onStateChange" /> <!-- idle | focus | big | picked -->
  </interface>
  <children>
    <Poster id="ring" uri="pkg:/images/chip_ring_gold.png" opacity="0" />
    <Poster id="bg"   uri="pkg:/images/chip_9patch.png" />
    <Animation id="anim" duration="${n}" easeFunction="inOutQuad">
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
  <\/script>
</component>`}},pmTicket(){return`Title: Stack It — Focus ring and "pick up a block" state

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
  · Back while a block is picked up restores the stack order from before the pick-up.`}},ai=`
.preview-si-reorder { width: 520px; height: 236px; }
.preview-si-reorder .preview-si-chip { left: 150px; width: 220px; height: 42px; }
.preview-si-reorder .preview-si-arrows {
  position: absolute; left: 384px; width: 20px; height: 38px;
  display: flex; flex-direction: column; justify-content: space-between; align-items: center;
}
.preview-si-reorder .preview-si-arrows i { width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; }
.preview-si-reorder .preview-si-arrows i.up { border-bottom: 11px solid ${f.goldHi}; }
.preview-si-reorder .preview-si-arrows i.dn { border-top: 11px solid ${f.goldHi}; }
.preview-si-reorder .preview-si-arrows i.up.off { border-bottom-color: ${f.lav}; }
.preview-si-reorder .preview-si-arrows i.dn.off { border-top-color: ${f.lav}; }
`,Ce=[20,72,124,176],Pe=["Harp","Guitar","Trumpet","Bagpipes"],pt=300/450;let U=[],T=null,N=[],I=0,je=[];function ft(){je.forEach(clearTimeout),je=[]}function Ye(){N.forEach((e,t)=>{U[e].style.top=`${Ce[t]}px`}),U.forEach((e,t)=>e.classList.toggle("is-focus",t===N[I])),T&&(T.style.top=`${Ce[I]+2}px`,T.children[0].classList.toggle("off",I<=0),T.children[1].classList.toggle("off",I>=Ce.length-1))}function ri(e){const t=I+e;t<0||t>=Ce.length||([N[I],N[t]]=[N[t],N[I]],I=t,Ye())}function qe(e,t,i){const o=(a,r,n)=>`
    <div style="
      position:absolute;left:10px;top:${r}px;width:120px;height:24px;box-sizing:border-box;
      display:flex;align-items:center;justify-content:center;border-radius:999px;
      background:${f.chipBg};border:${n?`2.5px solid ${f.gold}`:"1.5px solid #fff"};
      box-shadow:${n?"0 0 8px rgba(255,200,0,0.45),":""}0 2px 4px rgba(0,0,0,0.4);
      color:${f.ink};font-family:${f.font};font-weight:600;font-size:9px;text-transform:uppercase;
      z-index:${n?2:1};
    ">${a}</div>`;e.innerHTML=`
    <div style="position:relative;width:160px;height:58px;">
      ${o("Guitar",t[1],!1)}
      ${o("Harp",t[0],!0)}
      <div style="position:absolute;left:138px;top:${i}px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:7px solid ${f.goldHi};"></div>
      <div style="position:absolute;left:138px;top:${i+15}px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:7px solid ${f.goldHi};"></div>
    </div>`}const ni={id:"si-reorder",title:"Block Swap",game:"Stack It",description:"While the timer runs, the player can pick up a block and move it with ▲ ▼. Each press swaps the block with its neighbour: both blocks glide past each other at the same time, and the ▲ ▼ arrows follow a bit faster. An arrow turns lavender at the top or bottom of the stack.",defaults:{duration:450,easingId:"glide"},frames:[{label:"Picked up",sublabel:"slot 1 · gold ring · ▲▼",render:e=>qe(e,[4,32],6)},{label:"Crossing",sublabel:"~40% · blocks pass each other",render:e=>qe(e,[26,10],26)},{label:"Swapped",sublabel:"100% · slot 2 · arrows land at 67%",render:e=>qe(e,[32,4],34)}],render(e){return h("css-si-base",ue),h("css-si-reorder",ai),e.innerHTML=`
      <div class="preview-si-board preview-si-reorder">
        ${Pe.map(t=>`<div class="preview-si-chip">${t}</div>`).join("")}
        <div class="preview-si-arrows"><i class="up"></i><i class="dn"></i></div>
      </div>
    `,U=Array.from(e.querySelectorAll(".preview-si-chip")),T=e.querySelector(".preview-si-arrows"),N=Pe.map((t,i)=>i),I=0,Ye(),()=>{ft(),e.innerHTML="",U=[],T=null}},play({duration:e,easing:t}){if(!U.length||!T)return;ft();const i=b(t.bezier);U.forEach(a=>{a.style.transition="none"}),T.style.transition="none",N=Pe.map((a,r)=>r),I=0,Ye(),T.offsetWidth,U.forEach(a=>{a.style.transition=`top ${e}ms ${i}, border-color 200ms, box-shadow 200ms`}),T.style.transition=`top ${Math.round(e*pt)}ms ease`;const o=e+350;[1,1,-1].forEach((a,r)=>{je.push(window.setTimeout(()=>ri(a),150+r*o))})},snippets({duration:e,easing:t}){const[i,o,a,r]=t.bezier,n=(e/1e3).toFixed(2),c=Math.round(e*pt),s=b(t.bezier),d=vt(t);return{web:`/* StackItOverlay.css
   Swap = exchange the two blocks' slot indices and re-write their "top".
   Both blocks transition at once, so they glide past each other. */
.si-chip {
  position: absolute;
  transition: top ${e}ms ${s}, left ${e}ms ${s},
              border-color .2s, box-shadow .2s;
}
.si-chip--moving { z-index: 4; } /* picked-up block passes over its neighbour */

.si-arrows { position: absolute; transition: top ${c}ms ease; }

// StackIt.ts
function moveBlock(dir: -1 | 1) {
  const to = sel + dir;
  if (to < 0 || to > 5) return;
  [slots[sel], slots[to]] = [slots[to], slots[sel]];
  sel = to;
  render(); // writes top = SLOT.tops[slotIndex] for every chip
}`,android:`// Jetpack Compose — Android TV
@Composable
fun StackColumn(order: List<String>, picked: Int, slotTops: List<Dp>) {
    val glide = CubicBezierEasing(${i}f, ${o}f, ${a}f, ${r}f)
    Box {
        order.forEachIndexed { slot, answer ->
            key(answer) {   // stable key → each block animates to its new slot
                val y by animateDpAsState(slotTops[slot], tween(${e}, easing = glide), label = "y")
                StackBlock(
                    answer, focused = false, stackFull = true, pickedUp = slot == picked,
                    modifier = Modifier.offset(y = y).zIndex(if (slot == picked) 1f else 0f)
                )
            }
        }
        val arrowY by animateDpAsState(slotTops[picked], tween(${c}), label = "arrows")
        MoveArrows(Modifier.offset(y = arrowY), upEnabled = picked > 0, downEnabled = picked < 5)
    }
}`,ios:`// SwiftUI — tvOS
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
                .animation(.easeInOut(duration: ${(c/1e3).toFixed(2)}), value: picked)
        }
        .animation(.timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${n}), value: order)
    }
}`,roku:`' Roku SceneGraph — StackColumn.brs
' One Animation with two interpolators: picked block and its neighbour swap Y.
sub moveBlock(dir as integer)
  toSlot = m.sel + dir
  if toSlot < 0 or toSlot > 5 then return
  a = m.blocks[m.sel] : b = m.blocks[toSlot]
  m.blocks[m.sel] = b : m.blocks[toSlot] = a

  anim = createObject("roSGNode", "Animation")
  anim.duration = ${n}
  anim.easeFunction = "${d.name}"   ' ${d.note||"matches catalog preset"}
  anim.appendChild(slideTo(a, m.slotY[toSlot]))
  anim.appendChild(slideTo(b, m.slotY[m.sel]))
  m.top.appendChild(anim)
  anim.control = "start"

  m.sel = toSlot
  m.arrowAnim.duration = ${(c/1e3).toFixed(2)}
  m.arrowMove.keyValue = [ m.arrows.translation, [m.arrows.translation[0], m.slotY[toSlot]] ]
  m.arrowAnim.control = "start"
end sub

function slideTo(node as object, y as float) as object
  interp = createObject("roSGNode", "Vector2DFieldInterpolator")
  interp.fieldToInterp = node.id + ".translation"
  interp.key = [0, 1]
  interp.keyValue = [ node.translation, [node.translation[0], y] ]
  return interp
end function`}},pmTicket(){return`Title: Stack It — Swap animation when moving a picked-up block

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
  · When the timer hits 0:00 during a move, the current order is what gets scored.`}},si=`
.preview-si-results { width: 600px; height: 330px; }
.preview-si-results__screen { position: absolute; inset: 0; opacity: 0; }
.preview-si-results__show { position: absolute; left: 0; top: 0; width: 396px; height: 290px; opacity: .55; }
.preview-si-results__head {
  position: absolute; top: 12px; width: 180px; text-align: center;
  font-weight: 700; font-size: 14px; color: #c3e1ff; text-shadow: 0 2px 4px #070d3a;
}
.preview-si-results__cell {
  position: absolute; width: 180px; height: 32px; box-sizing: border-box;
  display: flex; align-items: center; justify-content: center;
  border-radius: 999px;
  font-weight: 600; font-size: 11px; letter-spacing: .02em; text-transform: uppercase; color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.45);
}
.preview-si-results__cell.su,
.preview-si-results__cell.key { background: rgba(30,44,140,0.75); }
.preview-si-results__cell.mine { background: ${f.mine}; border: 4px solid #fff; }
.preview-si-results__cell.mine.hide  { opacity: 0; transform: translateX(20px); }
.preview-si-results__cell.mine.match { border-color: ${f.win}; box-shadow: 0 0 10px #7bff3c66; }
.preview-si-results__cell.mine.miss  { border-color: ${f.miss}; box-shadow: 0 0 10px #ff2a2a66; }
.preview-si-results__count {
  position: absolute; left: 50%; top: 298px; transform: translateX(-50%);
  font-weight: 700; font-size: 15px; letter-spacing: .02em; text-transform: uppercase; color: #fff;
  white-space: nowrap; opacity: 0;
}
.preview-si-results__count b { color: #f2c230; }
`,Ae=["Guitar","Piano/Keyboard","Violin/Fiddle","Trumpet","Harp","Bagpipes"],wt=["Piano/Keyboard","Guitar","Violin/Fiddle","Trumpet","Bagpipes","Harp"],Ie=["Guitar","Piano/Keyboard","Trumpet","Violin/Fiddle","Harp","Bagpipes"],K={su:16,key:210,mine:404},li=e=>44+e*41,u={screenFade:500,mineStart:700,stagger:350,step:350,countFade:400};let O=null,Q=[],M=null,ze=[];function ut(){ze.forEach(clearTimeout),ze=[]}function Se(e,t){const i=(a,r,n,c="")=>`
    <div style="height:12px;border-radius:999px;background:${a};border:${r};box-sizing:border-box;
      font:600 6px ${f.font};color:#fff;display:flex;align-items:center;justify-content:center;text-transform:uppercase;${c}">${n}</div>`,o=[0,1,2].map(a=>{const r=a<t.mine,n=r?`1.5px solid ${Ie[a]===Ae[a]?f.win:f.miss}`:"1.5px solid #fff";return`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;">
      ${i("rgba(30,44,140,0.75)","1.5px solid transparent",wt[a],"opacity:.45;")}
      ${i("rgba(30,44,140,0.75)","1.5px solid transparent",Ae[a],"opacity:.45;")}
      ${i(f.mine,n,Ie[a],r?"":"opacity:0;transform:translateX(6px);")}
    </div>`}).join("");e.innerHTML=`
    <div style="width:170px;display:flex;flex-direction:column;gap:3px;opacity:${t.screen};">
      ${o}
      <div style="font:700 7px ${f.font};color:#fff;text-align:center;text-transform:uppercase;opacity:${t.count?1:0};">
        <b style="color:#f2c230">4 of 6</b> in the right spot</div>
    </div>`}const ci={id:"si-results-reveal",title:"Results Reveal",game:"Stack It",description:'At 0:00 the results screen fades in. Su’s stack and the correct stack are part of the show video (the show rings Su’s answers green / red itself), so only YOUR STACK is ours: row by row, top to bottom, the player’s blocks slide in from the right with a green (right slot) or red (wrong slot) ring. The "N of 6 in the right spot" line fades in last.',defaults:{duration:350,easingId:"ease"},slowFactor:3,frames:[{label:"Fade in",sublabel:"0–500 ms · screen opacity 0 → 1",render:e=>Se(e,{screen:.5,mine:0,count:!1})},{label:"Row 1",sublabel:"700 ms · slide in + ring",render:e=>Se(e,{screen:1,mine:1,count:!1})},{label:"Cascade",sublabel:"+350 ms per row",render:e=>Se(e,{screen:1,mine:2,count:!1})},{label:"Count",sublabel:"2800 ms · score line fades in",render:e=>Se(e,{screen:1,mine:3,count:!0})}],render(e){h("css-si-base",ue),h("css-si-results",si);const t=(i,o,a)=>a.map((r,n)=>`<div class="preview-si-results__cell ${i}" style="left:${o}px;top:${li(n)}px">${r}</div>`).join("");return e.innerHTML=`
      <div class="preview-si-board preview-si-results">
        <div class="preview-si-results__screen">
          <div class="preview-si-results__show">
            <div class="preview-si-results__head" style="left:${K.su}px">SU’S STACK</div>
            <div class="preview-si-results__head" style="left:${K.key}px">CORRECT STACK</div>
            ${t("su",K.su,wt)}
            ${t("key",K.key,Ae)}
          </div>
          <div class="preview-si-results__head" style="left:${K.mine}px">YOUR STACK</div>
          ${t("mine hide",K.mine,Ie)}
          <div class="preview-si-results__count"><b>4 of 6</b> in the right spot</div>
        </div>
      </div>
    `,O=e.querySelector(".preview-si-results__screen"),Q=Array.from(e.querySelectorAll(".preview-si-results__cell.mine")),M=e.querySelector(".preview-si-results__count"),()=>{ut(),e.innerHTML="",O=null,Q=[],M=null}},play({duration:e,easing:t}){if(!O||!M)return;ut();const i=b(t.bezier),o=e/u.step,a=r=>Math.round(r*o);[O,M,...Q].forEach(r=>{r.style.transition="none"}),O.style.opacity="0",M.style.opacity="0",Q.forEach(r=>{r.classList.remove("match","miss"),r.classList.add("hide")}),O.offsetWidth,O.style.transition=`opacity ${a(u.screenFade)}ms ${i}`,M.style.transition=`opacity ${a(u.countFade)}ms ${i}`,Q.forEach(r=>{r.style.transition=["opacity","transform","border-color","box-shadow"].map(n=>`${n} ${e}ms ${i}`).join(", ")}),O.style.opacity="1",Q.forEach((r,n)=>ze.push(window.setTimeout(()=>{r.classList.remove("hide"),r.classList.add(Ie[n]===Ae[n]?"match":"miss")},a(u.mineStart+n*u.stagger)))),ze.push(window.setTimeout(()=>{M&&(M.style.opacity="1")},a(u.mineStart+6*u.stagger)))},snippets({duration:e,easing:t}){const[i,o,a,r]=t.bezier,n=b(t.bezier),c=e/u.step,s=l=>Math.round(l*c),d=l=>(s(l)/1e3).toFixed(2);return{web:`/* StackItResults.css — only YOUR STACK is ours; Su's column comes from the show video. */
.si-screen        { opacity: 0; transition: opacity ${s(u.screenFade)}ms ${n}; pointer-events: none; }
.si-screen--show  { opacity: 1; pointer-events: auto; }

.si-mine          { background: ${f.mine}; border: .63cqw solid #fff; border-radius: 999px;
                    transition: opacity ${e}ms ${n}, transform ${e}ms ${n},
                                border-color ${e}ms ${n}, box-shadow ${e}ms ${n}; }
.si-mine--hide    { opacity: 0; transform: translateX(2cqw); }
.si-mine--match   { border-color: ${f.win};  box-shadow: 0 0 1cqw #7bff3c66; }
.si-mine--miss    { border-color: ${f.miss}; box-shadow: 0 0 1cqw #ff2a2a66; }

.si-count         { opacity: 0; transition: opacity ${s(u.countFade)}ms ${n}; }
.si-count--on     { opacity: 1; }

// StackItResults.ts — staggered reveal (synced to the show ringing Su's rows)
screen.classList.add('si-screen--show');
for (let r = 0; r < 6; r++) {
  later(() => {
    mine[r].classList.remove('si-mine--hide');
    if (yours[r]) mine[r].classList.add(yours[r] === key[r] ? 'si-mine--match' : 'si-mine--miss');
  }, ${s(u.mineStart)} + r * ${s(u.stagger)});
}
later(() => count.classList.add('si-count--on'), ${s(u.mineStart+6*u.stagger)});
later(showRoundComplete, ${s(u.mineStart+6*u.stagger)} + 3000);`,android:`// Jetpack Compose — Android TV
@Composable
fun YourStackReveal(key: List<String>, yours: List<String?>, onDone: () -> Unit) {
    val ez = CubicBezierEasing(${i}f, ${o}f, ${a}f, ${r}f)
    var elapsed by remember { mutableIntStateOf(-1) }
    LaunchedEffect(Unit) {
        val start = withFrameMillis { it }
        while (true) {
            elapsed = (withFrameMillis { it } - start).toInt()
            if (elapsed > ${s(u.mineStart+6*u.stagger)} + 3000) { onDone(); break }
        }
    }
    val screenAlpha by animateFloatAsState(if (elapsed >= 0) 1f else 0f, tween(${s(u.screenFade)}, easing = ez), label = "screen")
    Column(Modifier.alpha(screenAlpha)) {
        repeat(6) { r ->
            val on = elapsed >= ${s(u.mineStart)} + r * ${s(u.stagger)}
            val alpha by animateFloatAsState(if (on) 1f else 0f, tween(${e}, easing = ez), label = "a$r")
            val dx by animateDpAsState(if (on) 0.dp else 24.dp, tween(${e}, easing = ez), label = "x$r")
            val ring by animateColorAsState(
                when { !on || yours[r] == null -> Color.White; yours[r] == key[r] -> Color(0xFF7BFF3C); else -> Color(0xFFFF2A2A) },
                tween(${e}, easing = ez), label = "r$r")
            YourBlock(yours[r] ?: "—", ring, Modifier.alpha(alpha).offset(x = dx))
        }
        val countAlpha by animateFloatAsState(
            if (elapsed >= ${s(u.mineStart+6*u.stagger)}) 1f else 0f, tween(${s(u.countFade)}), label = "count")
        CountLine(Modifier.alpha(countAlpha))
    }
}`,ios:`// SwiftUI — tvOS
struct YourStackReveal: View {
    let key: [String], yours: [String?]
    @State private var shown = false
    @State private var rows = 0
    @State private var countOn = false
    private let curve = Animation.timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${d(u.step)})

    var body: some View {
        VStack {
            ForEach(0..<6, id: \\.self) { r in
                YourBlock(text: yours[r] ?? "—",
                          ring: r < rows ? (yours[r] == key[r] ? .green : .red) : .white)
                    .opacity(r < rows ? 1 : 0)
                    .offset(x: r < rows ? 0 : 24)
            }
            CountLine().opacity(countOn ? 1 : 0)
        }
        .opacity(shown ? 1 : 0)
        .task {
            withAnimation(.timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${d(u.screenFade)})) { shown = true }
            for r in 0..<6 {
                after(${d(u.mineStart)} + Double(r) * ${d(u.stagger)}) { withAnimation(curve) { rows = r + 1 } }
            }
            after(${d(u.mineStart+6*u.stagger)}) { withAnimation(.easeInOut(duration: ${d(u.countFade)})) { countOn = true } }
        }
    }
    private func after(_ s: Double, _ f: @escaping () -> Void) {
        DispatchQueue.main.asyncAfter(deadline: .now() + s, execute: f)
    }
}`,roku:`' Roku SceneGraph — StackItResults.brs
' Only YOUR STACK is animated; Su's column is in the show video.
sub revealResults()
  m.top.findNode("screenFade").control = "start"     ' opacity 0 → 1, ${d(u.screenFade)} s
  for r = 0 to 5
    mine = m.mineRows[r]
    if m.yours[r] <> invalid then mine.findNode("ring").blendColor = ringColor(m.yours[r] = m.key[r])
    anim = slideFadeAnim(mine, 24, ${d(u.step)})   ' translation x +24 → 0, opacity 0 → 1
    anim.delay = ${d(u.mineStart)} + r * ${d(u.stagger)}
    anim.control = "start"
  end for
  countAnim = fadeAnim(m.top.findNode("count"), ${d(u.countFade)})
  countAnim.delay = ${d(u.mineStart+6*u.stagger)}
  countAnim.control = "start"
end sub

function ringColor(ok as boolean) as string
  if ok then return "0x7BFF3CFF"
  return "0xFF2A2AFF"
end function`}},pmTicket(){return`Title: Stack It — "Your stack" reveal on the results screen

Trigger: round timer reaches 0:00 (or the host presses "End timer").

Scope:
  · SU’S STACK and CORRECT STACK are part of the show video — the show rings Su’s answers green / red itself. We do not animate them.
  · We animate only the YOUR STACK column and the count line.

Visual behavior:
  · The results overlay fades in over the game screen.
  · Row by row, top to bottom, the player’s block slides in from the right (+2 cqw → 0) while fading in, with a green ring (#7BFF3C, right slot) or red ring (#FF2A2A, wrong slot). Empty slots show "—" with no ring.
  · Each row lands 200 ms after the show rings Su’s answer in the same row.
  · After the last row, "N of 6 in the right spot" fades in at the bottom (N in yellow #F2C230).
  · 3 s later the Round Complete screen appears automatically; OK skips ahead.

Timings:
  · Overlay fade: 500 ms. Block slide-in + ring: 350 ms each.
  · Your row r: 700 + 350·r ms after the results start.
  · Count line: at 2800 ms, 400 ms fade. Auto-advance: 5800 ms.

Acceptance criteria:
  · Our rows stay in sync with the show’s Su rings (start from the same 0:00 cue).
  · Scoring is final before the reveal starts — animation is presentational only.
  · OK during the reveal jumps straight to Round Complete.
  · Reduced-motion setting: all rows appear at once with their rings.`}},Ke="linear-gradient(90deg,#030308 0%,#030308 26%,#121a78 40%,#2a33dc 50%,#121a78 60%,#030308 74%,#030308 100%)",Qe="linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(170,210,255,0.55) 50%,rgba(255,255,255,0) 100%)",P=500,x=200,W=300,V=1100,J=2600,di=`
.preview-si-round { width: 600px; height: 280px; }
.preview-si-round__under {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.35); font-size: 13px; letter-spacing: .06em; text-transform: uppercase;
}
.preview-si-round__screen {
  position: absolute; inset: 0; opacity: 0;
  background: radial-gradient(90% 120% at 50% 50%, #26329a 0%, #0b1150 55%, #050824 100%);
}
.preview-si-round__bar {
  position: absolute; left: 4.76%; width: 90%; top: 40%; height: 56px;
  border-radius: 8px; box-sizing: border-box; padding: 0 22px; overflow: hidden;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  font-family: 'Roboto Condensed', 'Arial Narrow', sans-serif; color: #fff;
  background: ${Ke};
  opacity: 0;
}
.preview-si-round__side { font-weight: 600; font-size: 14px; letter-spacing: .03em; text-transform: uppercase; }
.preview-si-round__side b { color: #f2c230; font-size: 19px; margin-left: 5px; }
.preview-si-round__side.r { text-align: right; }
.preview-si-round__mid { font-weight: 500; font-size: 24px; }
.preview-si-round__sweep { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.preview-si-round__sweep::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: -45%; width: 45%;
  background: ${Qe};
}
.preview-si-round__sweep.is-on::after {
  animation: si-round-sweep ${V}ms cubic-bezier(0.4, 0, 0.2, 1) var(--sweep-delay, ${W}ms) both;
}
@keyframes si-round-in {
  from { opacity: 0; transform: translateY(-40px) scale(0.94); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes si-round-sweep {
  from { left: -45%; }
  to   { left: 100%; }
}
@keyframes si-round-pulse {
  0%, 100% { filter: brightness(1); }
  50%      { filter: brightness(1.3); }
}
`;let q=null,Z=null,ee=null;function pe(e,t){const{mid:i="Round Complete!",round:o="1/3",score:a=4}=t;e.innerHTML=`
    <div style="
      position:relative;overflow:hidden;
      width:170px;height:30px;border-radius:4px;box-sizing:border-box;padding:0 6px;
      display:grid;grid-template-columns:1fr auto 1fr;align-items:center;
      font-family:'Roboto Condensed','Arial Narrow',sans-serif;color:#fff;
      background:${Ke};
      transform:translateY(${t.y}px) scale(${t.scale});opacity:${t.opacity};
    ">
      <span style="font-size:7px;font-weight:600;text-transform:uppercase;">Round <b style="color:#f2c230">${o}</b></span>
      <span style="font-size:10px;font-weight:500;">${i}</span>
      <span style="font-size:7px;font-weight:600;text-transform:uppercase;text-align:right;">Score <b style="color:#f2c230">${a}</b></span>
      ${t.sweep!==null?`<div style="position:absolute;top:0;bottom:0;width:45%;left:${t.sweep}%;background:${Qe};"></div>`:""}
    </div>`}const pi={id:"si-round-complete",title:"Round Complete",game:"Stack It",description:'Three seconds after the results count appears, the Round Complete background fades over the results and the score bar drops in from above with a soft overshoot — the same banner motion as Family Feud. A light band sweeps across the bar once, then the bar keeps a slow brightness pulse. After the final round the centre reads "Game Complete!". The next round starts automatically after 6 s; OK skips ahead.',defaults:{duration:620,easingId:"ease-out"},frames:[{label:"Start",sublabel:"bg fade 500 ms · bar hidden",render:e=>pe(e,{y:-14,scale:.94,opacity:.15,sweep:null})},{label:"Drop-in",sublabel:"+200 ms · translateY −40 → 0 · .94 → 1",render:e=>pe(e,{y:-6,scale:.97,opacity:.6,sweep:null})},{label:"Sweep",sublabel:"+300 ms · light band 1100 ms",render:e=>pe(e,{y:0,scale:1,opacity:1,sweep:30})},{label:"Idle",sublabel:"brightness pulse 2.6 s loop",render:e=>pe(e,{y:0,scale:1,opacity:1,sweep:null})},{label:"Final",sublabel:"round 3 · no auto-advance",render:e=>pe(e,{y:0,scale:1,opacity:1,sweep:null,mid:"Game Complete!",round:"3/3",score:39})}],render(e){return h("css-si-base",ue),h("css-si-round",di),e.innerHTML=`
      <div class="preview-si-board preview-si-round">
        <div class="preview-si-round__under">results screen (mocked)</div>
        <div class="preview-si-round__screen">
          <div class="preview-si-round__bar">
            <div class="preview-si-round__side">Round<b>1/3</b></div>
            <div class="preview-si-round__mid">Round Complete!</div>
            <div class="preview-si-round__side r">Score<b>4</b></div>
            <div class="preview-si-round__sweep"></div>
          </div>
        </div>
      </div>
    `,q=e.querySelector(".preview-si-round__screen"),Z=e.querySelector(".preview-si-round__bar"),ee=e.querySelector(".preview-si-round__sweep"),()=>{e.innerHTML="",q=null,Z=null,ee=null}},play({duration:e,easing:t}){if(!q||!Z||!ee)return;const i=b(t.bezier);q.style.transition="none",q.style.opacity="0",Z.style.animation="none",ee.classList.remove("is-on"),Z.offsetWidth,q.style.transition=`opacity ${P}ms ease`,q.style.opacity="1",Z.style.animation=`si-round-in ${e}ms ${i} ${x}ms both, si-round-pulse ${J}ms ease-in-out ${x+e+V}ms infinite`,ee.style.setProperty("--sweep-delay",`${x+W}ms`),ee.classList.add("is-on")},snippets({duration:e,easing:t}){const[i,o,a,r]=t.bezier,n=(e/1e3).toFixed(2),c=b(t.bezier),s=x+e+V;return{web:`/* StackItOverlay.css — Round Complete screen (banner motion shared with Family Feud) */
.si-screen {
  position: absolute; inset: 0; z-index: 10;
  opacity: 0; pointer-events: none;
  transition: opacity ${P}ms;
}
.si-screen--show { opacity: 1; pointer-events: auto; }

.si-round-bar {
  position: absolute; left: 4.76%; width: 90%; top: 44%; height: 11.2%;
  border-radius: .9cqw; padding: 0 2.4cqw; overflow: hidden;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  font-family: "Roboto Condensed", "Arial Narrow", sans-serif; color: #fff;
  background: ${Ke};
}
.si-screen--show .si-round-bar {
  animation:
    si-round-in    ${e}ms ${c} ${x}ms both,
    si-round-pulse ${J}ms ease-in-out ${s}ms infinite;
}
@keyframes si-round-in {
  from { opacity: 0; transform: translateY(-40px) scale(0.94); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes si-round-pulse {
  0%, 100% { filter: brightness(1); }
  50%      { filter: brightness(1.3); }
}

/* One-shot light band across the bar */
.si-round-bar::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: -45%; width: 45%;
  background: ${Qe};
}
.si-screen--show .si-round-bar::after {
  animation: si-round-sweep ${V}ms cubic-bezier(0.4, 0, 0.2, 1) ${x+W}ms both;
}
@keyframes si-round-sweep { from { left: -45%; } to { left: 100%; } }

@media (prefers-reduced-motion: reduce) {
  .si-screen--show .si-round-bar, .si-screen--show .si-round-bar::after { animation: none; }
}

// StackIt.ts
roundScreen.classList.add('si-screen--show');
if (!isLastRound) later(nextRound, 6000);`,android:`// Jetpack Compose — Android TV
@Composable
fun RoundCompleteScreen(visible: Boolean, round: Int, total: Int, score: Int, onNextRound: () -> Unit) {
    val easing = CubicBezierEasing(${i}f, ${o}f, ${a}f, ${r}f)
    AnimatedVisibility(visible, enter = fadeIn(tween(${P})), exit = fadeOut(tween(${P}))) {
        Box(Modifier.fillMaxSize().paint(painterResource(R.drawable.si_round_bg), contentScale = ContentScale.FillBounds)) {
            val shown = remember { MutableTransitionState(false) }.apply { targetState = true }
            AnimatedVisibility(
                visibleState = shown,
                enter = slideInVertically(tween(${e}, ${x}, easing)) { -40 } +
                        scaleIn(tween(${e}, ${x}, easing), initialScale = 0.94f) +
                        fadeIn(tween(${e}, ${x}, easing))
            ) {
                // Sweep: gradient strip x −45% → 100%, ${V} ms, delay ${x+W} ms.
                // Pulse: brightness 1 → 1.3 → 1, ${J} ms loop, starts at ${s} ms.
                RoundBar(
                    left = "ROUND $round/$total",
                    mid = if (round == total) "Game Complete!" else "Round Complete!",
                    right = "SCORE $score"
                )
            }
        }
    }
    if (visible && round < total) LaunchedEffect(round) { delay(6000); onNextRound() }
}`,ios:`// SwiftUI — tvOS
struct RoundCompleteScreen: View {
    let round: Int, total: Int, score: Int
    @State private var barIn = false
    @State private var sweep: CGFloat = -0.45
    @State private var pulse = 1.0

    var body: some View {
        ZStack {
            Image("si_round_bg").resizable()
            RoundBar(left: "ROUND \\(round)/\\(total)",
                     mid: round == total ? "Game Complete!" : "Round Complete!",
                     right: "SCORE \\(score)")
                .overlay(SweepStrip(offset: sweep).clipped())
                .brightness(pulse - 1)
                .offset(y: barIn ? 0 : -40)
                .scaleEffect(barIn ? 1 : 0.94)
                .opacity(barIn ? 1 : 0)
        }
        .transition(.opacity.animation(.easeInOut(duration: ${(P/1e3).toFixed(2)})))
        .onAppear {
            withAnimation(.timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${n}).delay(${(x/1e3).toFixed(2)})) { barIn = true }
            withAnimation(.timingCurve(0.4, 0, 0.2, 1, duration: ${(V/1e3).toFixed(2)}).delay(${((x+W)/1e3).toFixed(2)})) { sweep = 1 }
            withAnimation(.easeInOut(duration: ${(J/2e3).toFixed(2)}).repeatForever(autoreverses: true).delay(${(s/1e3).toFixed(2)})) { pulse = 1.3 }
        }
    }
}`,roku:`<!-- Roku SceneGraph — components/RoundComplete.xml -->
<component name="RoundComplete" extends="Group">
  <interface>
    <field id="show" type="boolean" onChange="onShow" />
  </interface>
  <children>
    <Poster id="bg" uri="pkg:/images/si_round_bg.jpg" width="1920" height="1080" />
    <Group id="bar" translation="[91, 475]" opacity="0">
      <Poster uri="pkg:/images/si_round_bar.png" />
      <Poster id="sweepStrip" uri="pkg:/images/sweep_band.png" translation="[-780, 0]" />
    </Group>
    <Animation id="fade" duration="${(P/1e3).toFixed(2)}" easeFunction="inOutQuad">
      <FloatFieldInterpolator fieldToInterp="bg.opacity" key="[0, 1]" keyValue="[0, 1]" />
    </Animation>
    <Animation id="dropIn" duration="${n}" delay="${(x/1e3).toFixed(2)}" easeFunction="outBack">
      <Vector2DFieldInterpolator fieldToInterp="bar.translation" key="[0, 1]" keyValue="[[91, 435], [91, 475]]" />
      <Vector2DFieldInterpolator fieldToInterp="bar.scale" key="[0, 1]" keyValue="[[0.94, 0.94], [1, 1]]" />
      <FloatFieldInterpolator   fieldToInterp="bar.opacity" key="[0, 1]" keyValue="[0, 1]" />
    </Animation>
    <Animation id="sweep" duration="${(V/1e3).toFixed(2)}" delay="${((x+W)/1e3).toFixed(2)}" easeFunction="inOutQuad">
      <Vector2DFieldInterpolator fieldToInterp="sweepStrip.translation" key="[0, 1]" keyValue="[[-780, 0], [1730, 0]]" />
    </Animation>
    <Animation id="pulse" duration="${(J/1e3).toFixed(1)}" delay="${(s/1e3).toFixed(2)}" easeFunction="inOutQuad" repeat="true">
      <FloatFieldInterpolator fieldToInterp="bar.opacity" key="[0, 0.5, 1]" keyValue="[1.0, 0.85, 1.0]" />
    </Animation>
    <Timer id="advance" duration="6" repeat="false" />
  </children>
  <script type="text/brightscript">
    sub onShow()
      if not m.top.show then return
      for each id in ["fade", "dropIn", "sweep", "pulse"]
        m.top.findNode(id).control = "start"
      end for
      if not m.global.isLastRound then m.top.findNode("advance").control = "start"
    end sub
  <\/script>
</component>`}},pmTicket(){return`Title: Stack It — Round Complete / Game Complete screen

Trigger: 3 s after the results count line appears, or OK on the results screen.

Visual behavior:
  · The Round Complete background cross-fades over the results screen.
  · The score bar drops in from above (translateY −40 → 0, scale 0.94 → 1, opacity 0 → 1) — same banner motion as Family Feud "Round Complete".
  · Shortly after it lands, a soft light band sweeps left-to-right across the bar once.
  · Then the bar keeps a slow brightness pulse until the screen is left.
  · Bar content: "ROUND 1/3" left, "Round Complete!" centre, "SCORE N" right (numbers in yellow #F2C230). After round 3 the centre reads "Game Complete!" and there is no auto-advance; OK restarts the game.
  · Rounds 1–2: the next round starts automatically after 6 s; OK skips immediately.

Timings:
  · Background fade: ${P} ms.
  · Bar drop-in: 620 ms, ease-out, starts ${x} ms after the fade begins.
  · Sweep: ${V} ms, cubic-bezier(0.4, 0, 0.2, 1), ${W} ms after the drop-in starts.
  · Pulse: ${J/1e3} s ease-in-out loop (brightness 1 → 1.3 → 1), after the sweep.
  · Auto-advance: 6000 ms after the screen appears.

Acceptance criteria:
  · Score shown is the running total including the round just finished.
  · Sweep plays exactly once per screen; pulse loops.
  · Pressing OK during the entrance advances right away — no double transitions.
  · Reduced-motion setting: plain fade, no drop / sweep / pulse.`}},fi=`
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
`;let te=null;const ui={id:"wl-wrong-flash",title:"Wrong Flash",game:"Win/Lose",description:"Full-screen red flash that briefly washes over the player view when the user picks the wrong answer. Single one-shot opacity ramp from 1 → 0, no movement.",defaults:{duration:600,easingId:"ease-out"},render(e){return h("css-wl-wrong-flash",fi),e.innerHTML=`
      <div class="preview-cs-flash-stage">
        <div class="preview-cs-flash-stage__label">player view (mocked)</div>
        <div class="preview-cs-flash"></div>
      </div>
    `,te=e.querySelector(".preview-cs-flash"),()=>{e.innerHTML="",te=null}},play({duration:e,easing:t}){te&&(te.style.animation="none",te.offsetWidth,te.style.animation=`cs-flash ${e}ms ${b(t.bezier)} forwards`)},frames:[{label:"Idle",sublabel:"no overlay",render:e=>{e.innerHTML=`
          <div style="
            width:100%;height:64px;
            background:linear-gradient(135deg,#1a1f2e 0%,#06080d 100%);
            border-radius:6px;display:flex;align-items:center;justify-content:center;
            color:rgba(255,255,255,0.4);font-family:ui-monospace,Menlo,monospace;font-size:10px;
          ">no flash</div>
        `}},{label:"Peak",sublabel:"0% · opacity 1 · #DC1E1E66",render:e=>{e.innerHTML=`
          <div style="
            width:100%;height:64px;
            background:rgba(220,30,30,0.4);
            border-radius:6px;
          "></div>
        `}},{label:"Mid",sublabel:"50% · opacity .5",render:e=>{e.innerHTML=`
          <div style="
            width:100%;height:64px;
            background:rgba(220,30,30,0.2);
            border-radius:6px;
          "></div>
        `}},{label:"Settled",sublabel:"100% · opacity 0",render:e=>{e.innerHTML='<div class="frame-ghost">overlay invisible</div>'}}],snippets({duration:e,easing:t}){const[i,o,a,r]=t.bezier,n=(e/1e3).toFixed(2);return{web:`/* CardSharksOverlay.css */
@keyframes cs-flash {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}

.cs-overlay__flash {
  position: absolute;
  inset: 0;
  background: rgba(220, 30, 30, 0.4);
  animation: cs-flash ${e}ms ${b(t.bezier)} forwards;
  z-index: 51;
  pointer-events: none;
}

/* Mount with a key={questionNumber} so React remounts the node every
   time a new wrong answer happens — animation replays on each mount. */`,android:`// Jetpack Compose — Android TV
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
        anim.animateTo(0f, tween(${e}, easing = CubicBezierEasing(${i.toFixed(2)}f, ${o.toFixed(2)}f, ${a.toFixed(2)}f, ${r.toFixed(2)}f)))
        alpha = anim.value
    }
    Box(
        Modifier
            .fillMaxSize()
            .background(Color(0xFFDC1E1E).copy(alpha = 0.4f * alpha))
    )
}`,ios:`// SwiftUI — tvOS
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
                withAnimation(.timingCurve(${i}, ${o}, ${a}, ${r}, duration: ${n})) {
                    alpha = 0
                }
            }
    }
}`,roku:`<!-- Roku SceneGraph — components/WrongFlash.xml -->
<component name="WrongFlash" extends="Group">
  <interface>
    <field id="trigger" type="integer" alwaysNotify="true" onChange="onTriggerChange" />
  </interface>

  <children>
    <Rectangle id="flash" color="0xDC1E1E66" width="1920" height="1080" opacity="0" />
    <Animation id="flashAnim" duration="${n}" easeFunction="outQuad" repeat="false">
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
  <\/script>
</component>`}},pmTicket(){return`Title: Wrong-answer red flash overlay

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
  · Tonally subdued — strong enough to register peripherally, not aggressive.`}},mi=40,mt=["#facc15","#22c55e","#3b82f6","#ec4899","#f97316","#a855f7","#06b6d4","#fb7185"],Re=260,xt=5e-4,ht=1800,$t="cubic-bezier(0.33, 0.67, 0.67, 1)",kt="cubic-bezier(0.33, 0, 0.67, 0.33)",St="cubic-bezier(0.2, 0.6, 0.4, 1)",hi=`
.preview-confetti-stage {
  position: relative;
  width: 100%; height: ${Re}px;
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
  animation: pc-drift calc(var(--tu) + var(--td)) ${St} var(--delay) both;
}
.preview-confetti__y {
  display: block;
  animation:
    pc-rise var(--tu) ${$t}   var(--delay) both,
    pc-fall var(--td) ${kt} calc(var(--delay) + var(--tu)) forwards;
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
`;function bi(e){const t=xt/(e*e),i=[];for(let o=0;o<mi;o++){const a=4+Math.random()*92,r=2+Math.random()*12,n=r/100*Re,c=110+Math.random()*120,s=-Math.min(c,Re-n-12),d=n+24,l=Math.sqrt(2*-s/t),m=Math.sqrt(2*(-s+d)/t),v=(a-50)*1.4+(Math.random()-.5)*90,y=5+Math.random()*4,oe=o%3===0?"streamer":o%2===0?"rect":"square";i.push({left:a,bottom:r,delay:Math.random()*300*e,dx:v,peak:s,drop:d,tu:l,td:m,spin:(500+Math.random()*700)*e,dir:Math.random()<.5?1:-1,r0:Math.round(Math.random()*360),w:y,h:oe==="rect"?y*1.6:oe==="streamer"?y*2.4:y,color:mt[o%mt.length]})}return i}let _e=null;function gi(e,t){e.innerHTML=bi(t).map(i=>`
    <span class="preview-confetti__p" style="
      left:${i.left}%; bottom:${i.bottom}%;
      --dx:${i.dx.toFixed(1)}px; --peak:${i.peak.toFixed(1)}px; --drop:${i.drop.toFixed(1)}px;
      --tu:${Math.round(i.tu)}ms; --td:${Math.round(i.td)}ms; --delay:${Math.round(i.delay)}ms;
      --spin:${Math.round(i.spin)}ms; --dir:${i.dir}; --r0:${i.r0}deg;
    "><span class="preview-confetti__y"><span class="preview-confetti__s" style="
      width:${i.w.toFixed(1)}px; height:${i.h.toFixed(1)}px; background:${i.color};
    "></span></span></span>`).join("")}function Fe(e,t){e.innerHTML=`
    <div style="position:relative;width:100%;height:64px;background:linear-gradient(135deg,#1a1f2e 0%,#06080d 100%);border-radius:6px;overflow:hidden;">
      ${t.map(i=>`<span style="position:absolute;left:${i.l}%;bottom:${i.b}%;width:6px;height:10px;background:${i.c};border-radius:1px;transform:rotate(${i.r}deg);"></span>`).join("")}
    </div>
  `}const vi={id:"wl-confetti-burst",title:"Confetti Burst",game:"Win/Lose",description:"Celebratory confetti fired from the bottom of the screen on a correct answer. Each piece is tossed up, slows to a stop at its apex, then falls back down under gravity and leaves through the bottom edge while tumbling. Higher tosses hang in the air longer — rise and fall times follow t = √(2h / g).",defaults:{duration:1800,easingId:"ease-out"},slowFactor:2,render(e){return h("css-wl-confetti",hi),e.innerHTML=`
      <div class="preview-confetti-stage">
        <div class="preview-confetti-stage__label">player view (mocked)</div>
        <div class="preview-confetti"></div>
      </div>
    `,_e=e.querySelector(".preview-confetti"),()=>{e.innerHTML="",_e=null}},play({duration:e}){_e&&gi(_e,e/ht)},frames:[{label:"Spawn",sublabel:"0 ms · bottom edge · opacity 0 → 1",render:e=>Fe(e,[{l:18,b:6,c:"#facc15",r:10},{l:34,b:10,c:"#22c55e",r:-20},{l:50,b:4,c:"#3b82f6",r:40},{l:66,b:8,c:"#ec4899",r:-60},{l:82,b:5,c:"#f97316",r:15}])},{label:"Rise",sublabel:"ease-out-quad · slowing down",render:e=>Fe(e,[{l:14,b:48,c:"#facc15",r:90},{l:31,b:58,c:"#22c55e",r:-30},{l:50,b:40,c:"#3b82f6",r:180},{l:69,b:62,c:"#ec4899",r:-120},{l:86,b:44,c:"#f97316",r:60},{l:40,b:30,c:"#a855f7",r:-90}])},{label:"Apex",sublabel:"~45% · vertical speed 0",render:e=>Fe(e,[{l:10,b:78,c:"#facc15",r:200},{l:28,b:86,c:"#22c55e",r:-150},{l:48,b:70,c:"#3b82f6",r:300},{l:72,b:88,c:"#ec4899",r:-260},{l:90,b:74,c:"#f97316",r:160},{l:38,b:64,c:"#a855f7",r:-210}])},{label:"Fall",sublabel:"ease-in-quad · gravity · exits bottom",render:e=>Fe(e,[{l:6,b:34,c:"#facc15",r:320},{l:24,b:18,c:"#22c55e",r:-280},{l:46,b:4,c:"#3b82f6",r:420},{l:76,b:26,c:"#ec4899",r:-380},{l:94,b:10,c:"#f97316",r:300},{l:36,b:42,c:"#a855f7",r:-330}])}],snippets({duration:e}){const t=e/ht,i=xt*1080/Re/(t*t),o=Math.round(i*1e6);return{web:`/* ConfettiBurst.css
   Three nested spans so each axis has its own curve:
     .cf       — horizontal drift (ease-out, air drag)
     .cf__y    — rise (ease-out-quad) then gravity fall (ease-in-quad)
     .cf__spin — the visible piece, tumbling
   Per-particle values come from JS as CSS custom properties. */
.confetti-burst { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 60; }

.cf {
  position: absolute;
  animation: cf-drift calc(var(--tu) + var(--td)) ${St} var(--delay) both;
}
.cf__y {
  display: block;
  animation:
    cf-rise var(--tu) ${$t}   var(--delay) both,
    cf-fall var(--td) ${kt} calc(var(--delay) + var(--tu)) forwards;
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
const G = ${i.toFixed(5)};                      // px/ms² (~${o} px/s²)
const rise  = 450 + Math.random() * 450;           // apex height, px
const drop  = spawnY + 80;                          // fall past the bottom edge
const tu    = Math.sqrt(2 * rise / G);              // time to apex
const td    = Math.sqrt(2 * (rise + drop) / G);     // apex → off-screen
el.style.cssText += \`--peak:\${-rise}px; --drop:\${drop}px; --tu:\${tu}ms; --td:\${td}ms;
  --dx:\${(leftPct - 50) * 5 + (Math.random() - .5) * 300}px; --delay:\${Math.random() * ${Math.round(300*t)}}ms;
  --spin:\${${Math.round(500*t)} + Math.random() * ${Math.round(700*t)}}ms; --dir:\${Math.random() < .5 ? 1 : -1}; --r0:\${Math.random() * 360}deg\`;

/* Remount the burst with a key (e.g. questionNumber) to replay it. */`,android:`// Jetpack Compose — Android TV
// Real ballistics per frame: y(t) = v0·t − g·t²/2, x drifts with air drag.
@Composable
fun ConfettiBurst(trigger: Int) {
    val palette = listOf(
        Color(0xFFFACC15), Color(0xFF22C55E), Color(0xFF3B82F6), Color(0xFFEC4899),
        Color(0xFFF97316), Color(0xFFA855F7), Color(0xFF06B6D4), Color(0xFFFB7185),
    )
    val g = ${o}f                                    // px/s²
    val particles = remember(trigger) {
        List(90) {
            val rise = 450f + Random.nextFloat() * 450f    // apex height, px
            Confetto(
                color = palette[it % palette.size],
                x0 = Random.nextFloat(),                    // 0..1 of width
                v0 = sqrt(2f * g * rise),                   // launch speed for that apex
                vx = (Random.nextFloat() - 0.5f) * 600f,
                delay = Random.nextFloat() * ${(.3*t).toFixed(2)}f,
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

data class Confetto(val color: Color, val x0: Float, val v0: Float, val vx: Float, val delay: Float, val spin: Float)`,ios:`// SwiftUI — tvOS
// Same ballistic model: y(t) = v0·t − g·t²/2, x with drag.
struct ConfettiBurst: View {
    let trigger: Int
    private let g: Double = ${o}                       // pt/s²
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
                                vx: .random(in: -300...300), delay: .random(in: 0...${(.3*t).toFixed(2)}),
                                spin: .random(in: -720...720), color: palette.randomElement()!)
            }
        }
    }
}`,roku:`' Roku SceneGraph — ConfettiBurst.brs
' Bake each piece's parabola into a Vector2DFieldInterpolator (9 samples is plenty
' at TV distance) and run it with a LINEAR ease — the curve is in the key points.
sub fire()
  g = ${o}                                   ' px/s²
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
    p.anim.delay = Rnd(0) * ${(.3*t).toFixed(2)}
    p.move.key = keys : p.move.keyValue = vals
    p.spin.keyValue = [0, (Rnd(0) - 0.5) * 12.6]   ' radians
    p.anim.control = "start"
  end for
end sub`}},pmTicket(){return`Title: Correct-answer confetti burst (toss up, fall with gravity)

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
  · No layout reflow; the layer does not block input.`}},yi=[Et,Ot,Vt,Nt,Gt,qt,Ut,Yt,Kt,Zt,oi,ni,ci,pi,ui,vi],wi=[{id:"demo-stack-it",title:"Stack It — full overlay",section:"Demos",src:"demos/stack-it.html",description:"The whole game loop, playable: answer selection, the timed stacking phase, results and Round Complete. Self-contained build, no backend.",controls:[{keys:"← → ↑ ↓",does:"Choose an answer"},{keys:"OK / Enter",does:"Move it to the first free slot from the top"},{keys:"↑ ↓ then OK",does:"Move it between free slots, then lock it"},{keys:"Back / Esc",does:"Return it to the list"},{keys:"↑ ↓ + OK",does:"Until the timer runs out: choose a block, OK picks it up, ↑ ↓ moves it, OK drops it"},{keys:"OK",does:"On results / Round Complete: skip ahead"}],actions:[{label:"End timer",run:e=>{var t;return(t=e.stackIt)==null?void 0:t.endTimer()}}],notes:["After the fifth answer the sixth fills the last slot on its own.","Scoring is 1 point per correct slot in round 1, 2 in round 2, 5 in the final — 10 / 20 / 50 for all six. The running score is on Round Complete.","The contestant's stack is placeholder data.","It already loads <strong>Rubik and Roboto Condensed</strong> — our two families, split the way we split them.","Its colours are its own and do not match the palette yet: <code>#030308</code> where ours is <code>#040810</code>, <code>#FF2A2A</code> where ours is <code>#FF0000</code>. That gap is the point of having it here."]},{id:"demo-tv-game-poc",title:"TV Game PoC — Family Feud, Card Sharks, Match Game",section:"Demos",src:"demos/tv-game-poc/index.html",description:"The original proof of concept: full episodes with video, the answer board, strikes and Fast Money. Most of the motion in this catalog was measured from here.",controls:[{keys:"↑ ↓ ← →",does:"Navigate"},{keys:"Enter",does:"Select"},{keys:"Backspace",does:"Back"}],settings:[{key:"audio.videoVolume",label:"Video volume",min:0,max:1,step:.1,fallback:1,format:e=>`${Math.round(e*100)}%`},{key:"audio.sfxVolume",label:"Sound effects",min:0,max:1,step:.1,fallback:.5,format:e=>`${Math.round(e*100)}%`},{key:"playback.roundLeadInSeconds",label:"Round lead-in",min:0,max:15,step:1,fallback:10,format:e=>`${e}s`}],notes:["Built from <code>tv-game-poc</code> into this repository — <code>npm run demo:tv-game-poc</code>. Its own source is untouched.","It was built for a domain root, so it is rebuilt here with a base path; without that every asset 404s under a sub-path.","Video came through <strong>Vercel rewrites</strong> proxying CloudFront, which GitHub Pages cannot do. The six stream prefixes now point straight at CloudFront, which already answers cross-origin.","Three of those six are renamed on CloudFront — <code>/fastmoney/</code> is <code>/fast-money/</code>, <code>/matchgame/</code> is <code>/match-game/</code>, <code>/matchgameep2/</code> is <code>/match-game-andy/</code>. A prefix rule would have 404d.","It carries 49 MB of images, audio and episode content.","Opens on a 2 s splash with a loader, then the catalogue. The TV-simulation panel is dropped; its settings are the sliders here — they apply live. Sign In is web, not TV, and is shown separately — see <strong>Web — Sign In</strong>."]},{id:"demo-web-sign-in",title:"Web — Sign In",section:"Demos",src:"demos/tv-game-poc/index.html?view=web",description:"The web side of PlayAlong: Sign In and Reset Password. Separate from the TV app — this is where profiles are managed and a TV gets linked.",notes:["Same build as the TV Game PoC, opened with <code>?view=web</code>, which renders only the web screens.","There is no backend: Sign In accepts any non-empty pair and stays on the page. Forgot Password opens Reset Password; Back returns."]}],xi="PlayAlong design tokens, exported from the Figma file OTT-TV Design (Gd6wyiODkYk46DjaeyqU9o) on 2026-10-12. PlayAlong's own format -- DTCG-shaped ($type/$value and {dot.path} aliases) but deliberately NOT DTCG-conformant; the format is specified in docs/design-tokens.md. Owner: Viachaslau Kulbitski (design).",$i={color:{Black:{"20%":{$type:"color",$value:"#00000033"},"25%":{$type:"color",$value:"#00000040"},"40%":{$type:"color",$value:"#00000066"},"50%":{$type:"color",$value:"#00000080"},"70%":{$type:"color",$value:"#000000B2"},"80%":{$type:"color",$value:"#000000CC"},"90%":{$type:"color",$value:"#000000E5"},Base:{$type:"color",$value:"#000000"}},Blue:{500:{$type:"color",$value:"#0090FF"},900:{$type:"color",$value:"#000CB8"}},Green:{300:{$type:"color",$value:"#8CFF4F"},500:{$type:"color",$value:"#00C441"},700:{$type:"color",$value:"#008E11"}},Grey:{200:{$type:"color",$value:"#D1D5DB"},400:{$type:"color",$value:"#94A3B8"},600:{$type:"color",$value:"#5C5E65"},800:{$type:"color",$value:"#202228"},900:{$type:"color",$value:"#040810"}},Plum:{900:{$type:"color",$value:"#57053C"}},Red:{500:{$type:"color",$value:"#FF0000"},700:{$type:"color",$value:"#8E0000"},"500 6%":{$type:"color",$value:"#FF00000F"},"600 50%":{$type:"color",$value:"#AA262680"}},Sand:{500:{$type:"color",$value:"#D9A671"}},White:{"10%":{$type:"color",$value:"#FFFFFF1A"},"20%":{$type:"color",$value:"#FFFFFF33"},"25%":{$type:"color",$value:"#FFFFFF40"},"6%":{$type:"color",$value:"#FFFFFF0F"},Base:{$type:"color",$value:"#FFFFFF"}},Yellow:{500:{$type:"color",$value:"#CAA512"}}},font:{family:{Game:{$type:"fontFamily",$value:"Roboto Condensed"},Product:{$type:"fontFamily",$value:"Rubik"}},lineHeight:{16:{$type:"dimension",$value:"16px"},20:{$type:"dimension",$value:"20px"},24:{$type:"dimension",$value:"24px"},28:{$type:"dimension",$value:"28px"},36:{$type:"dimension",$value:"36px"},38:{$type:"dimension",$value:"38px"},39:{$type:"dimension",$value:"39px"},48:{$type:"dimension",$value:"48px"},88:{$type:"dimension",$value:"88px"}},size:{14:{$type:"dimension",$value:"14px"},18:{$type:"dimension",$value:"18px"},20:{$type:"dimension",$value:"20px"},24:{$type:"dimension",$value:"24px"},32:{$type:"dimension",$value:"32px"},36:{$type:"dimension",$value:"36px"},40:{$type:"dimension",$value:"40px"},48:{$type:"dimension",$value:"48px"},64:{$type:"dimension",$value:"64px"},96:{$type:"dimension",$value:"96px"}},weight:{ExtraBold:{$type:"fontWeight",$value:"ExtraBold"},Medium:{$type:"fontWeight",$value:"Medium"},Regular:{$type:"fontWeight",$value:"Regular"},SemiBold:{$type:"fontWeight",$value:"SemiBold"}}}},ki={TV:{Base:{Black:{$type:"color",$value:"{primitives.color.Black.Base}"},Dark:{$type:"color",$value:"{primitives.color.Grey.900}"},Light:{$type:"color",$value:"{primitives.color.White.Base}"},Neutral:{$type:"color",$value:"{primitives.color.Grey.800}"}},Border:{"White 20":{$type:"color",$value:"{primitives.color.White.20%}"}},Button:{"Primary Solid":{$type:"color",$value:"{primitives.color.Blue.500}"},Secondary:{$type:"color",$value:"{primitives.color.White.10%}"}},Focus:{"Ring Color":{$type:"color",$value:"{primitives.color.Blue.500}"},"Ring Radius":{$type:"dimension",$value:"12px"},"Ring Width":{$type:"dimension",$value:"6px"}},"Game UI":{"Green 1":{$type:"color",$value:"{primitives.color.Green.500}"},"Red 1":{$type:"color",$value:"{primitives.color.Red.500}"},"Red 2":{$type:"color",$value:"{primitives.color.Red.700}"},Sand:{$type:"color",$value:"{primitives.color.Sand.500}"},Yellow:{$type:"color",$value:"{primitives.color.Yellow.500}"}},Progress:{Track:{$type:"color",$value:"{primitives.color.Grey.600}"}},Tags:{Primary:{$type:"color",$value:"{primitives.color.Blue.900}"},Secondary:{$type:"color",$value:"{primitives.color.Plum.900}"}},Text:{Gain:{$type:"color",$value:"{primitives.color.Green.300}"},Muted:{$type:"color",$value:"{primitives.color.Grey.400}"},Primary:{$type:"color",$value:"{primitives.color.Grey.200}"},Success:{$type:"color",$value:"{primitives.color.Green.700}"}},Transparent:{"Dark 20":{$type:"color",$value:"{primitives.color.Black.20%}"},"Dark 25":{$type:"color",$value:"{primitives.color.Black.25%}"},"Dark 40":{$type:"color",$value:"{primitives.color.Black.40%}"},"Dark 50":{$type:"color",$value:"{primitives.color.Black.50%}"},"Dark 70":{$type:"color",$value:"{primitives.color.Black.70%}"},"Dark 80":{$type:"color",$value:"{primitives.color.Black.80%}"},"Dark 90":{$type:"color",$value:"{primitives.color.Black.90%}"},"Red 50":{$type:"color",$value:"{primitives.color.Red.600 50%}"},"White 10":{$type:"color",$value:"{primitives.color.White.10%}"},"White 25":{$type:"color",$value:"{primitives.color.White.25%}"},"White 6":{$type:"color",$value:"{primitives.color.White.6%}"}}},Web:{Base:{Black:{$type:"color",$value:"{primitives.color.Black.Base}"},Dark:{$type:"color",$value:"{primitives.color.Grey.900}"},Light:{$type:"color",$value:"{primitives.color.White.Base}"}},Border:{"White 20":{$type:"color",$value:"{primitives.color.White.20%}"}},Button:{"Primary Solid":{$type:"color",$value:"{primitives.color.Blue.500}"}},Status:{Red:{$type:"color",$value:"{primitives.color.Red.500}"}},Text:{Primary:{$type:"color",$value:"{primitives.color.White.Base}"}},Transparent:{"Red 6":{$type:"color",$value:"{primitives.color.Red.500 6%}"},"White 25":{$type:"color",$value:"{primitives.color.White.25%}"},"White 6":{$type:"color",$value:"{primitives.color.White.6%}"}}}},Si={TV:{Background:{Stacked:{$type:"gradient",$value:{type:"linear",stops:[{color:"#EDF3FE",position:0},{color:"#ACCAEB",position:1}]}}},Button:{Primary:{$type:"gradient",$value:{type:"linear",stops:[{color:"#0090FF",position:0},{color:"#0022AB",position:1}]}}},"Game UI":{Gold:{$type:"gradient",$value:{type:"linear",stops:[{color:"#F2D383",position:0},{color:"#49391E",position:.053},{color:"#BB7424",position:.174},{color:"#F4CB82",position:.36},{color:"#FCF9A6",position:.63},{color:"#BC9E53",position:.75},{color:"#806F1A",position:.889},{color:"#E6CD77",position:1}]}}},Loader:{Spin:{$type:"gradient",$value:{type:"angular",stops:[{color:"#FFFFFF",position:0},{color:"#FFFFFF",position:.176},{color:"#FFFFFF00",position:1}]}}},Placeholder:{Grey:{$type:"gradient",$value:{type:"linear",stops:[{color:"#FBFBFB",position:0},{color:"#666666",position:1}]}},Light:{$type:"gradient",$value:{type:"linear",stops:[{color:"#FFFFFF",position:0},{color:"#999999",position:1}]}}},Scrim:{Card:{$type:"gradient",$value:{type:"linear",stops:[{color:"#04081000",position:0},{color:"#040810",position:.808},{color:"#040810",position:1}]}},Menu:{$type:"gradient",$value:{type:"linear",stops:[{color:"#040810",position:0},{color:"#040810",position:.178},{color:"#04081000",position:.447},{color:"#04081000",position:1}]}}},Status:{Failure:{$type:"gradient",$value:{type:"linear",stops:[{color:"#8E0000",position:0},{color:"#380000",position:1}]}},Purple:{$type:"gradient",$value:{type:"linear",stops:[{color:"#422DFF",position:0},{color:"#ACACAC",position:1}]}},"Round Complete":{$type:"gradient",$value:{type:"linear",stops:[{color:"#002FFF00",position:0},{color:"#002FFF",position:.505},{color:"#002FFF00",position:1}]}},Success:{$type:"gradient",$value:{type:"linear",stops:[{color:"#008E11",position:0},{color:"#053800",position:1}]}},Wait:{$type:"gradient",$value:{type:"linear",stops:[{color:"#0056C6",position:0},{color:"#001462",position:1}]}},"You Lose!":{$type:"gradient",$value:{type:"linear",stops:[{color:"#8E000000",position:0},{color:"#8E0000",position:.505},{color:"#8E000000",position:1}]}},"You Win!":{$type:"gradient",$value:{type:"linear",stops:[{color:"#008E0E00",position:0},{color:"#008E0E",position:.505},{color:"#008E0E00",position:1}]}}}},Web:{Button:{Primary:{$type:"gradient",$value:{type:"linear",stops:[{color:"#0090FF",position:0},{color:"#0022AB",position:1}]}}}}},_i={Body:{L:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Regular}",fontSize:"{primitives.font.size.24}",lineHeight:"{primitives.font.lineHeight.39}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}},"L Tight":{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Regular}",fontSize:"{primitives.font.size.24}",lineHeight:"{primitives.font.lineHeight.24}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}},M:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Regular}",fontSize:"{primitives.font.size.20}",lineHeight:"{primitives.font.lineHeight.24}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}}},Diagram:{Mono:{$type:"typography",$value:{fontFamily:"JetBrains Mono",fontWeight:"{primitives.font.weight.Regular}",fontSize:"{primitives.font.size.32}",lineHeight:"{primitives.font.lineHeight.36}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}}},Display:{L:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Medium}",fontSize:"{primitives.font.size.64}",lineHeight:"{primitives.font.lineHeight.88}",letterSpacing:{unit:"percent",value:-4},textCase:"ORIGINAL"}},"L Bold":{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"Bold",fontSize:"{primitives.font.size.64}",lineHeight:"56px",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}},M:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Medium}",fontSize:"{primitives.font.size.48}",lineHeight:"{primitives.font.lineHeight.48}",letterSpacing:{unit:"percent",value:2},textCase:"ORIGINAL"}},XL:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.SemiBold}",fontSize:"{primitives.font.size.96}",lineHeight:"{primitives.font.lineHeight.88}",letterSpacing:{unit:"percent",value:-4},textCase:"ORIGINAL"}}},Game:{L:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Game}",fontWeight:"{primitives.font.weight.Medium}",fontSize:"{primitives.font.size.48}",lineHeight:"{primitives.font.lineHeight.48}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}},M:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Game}",fontWeight:"{primitives.font.weight.ExtraBold}",fontSize:"{primitives.font.size.40}",lineHeight:"{primitives.font.lineHeight.38}",letterSpacing:{unit:"percent",value:0},textCase:"UPPER"}},S:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Game}",fontWeight:"{primitives.font.weight.SemiBold}",fontSize:"{primitives.font.size.32}",lineHeight:"{primitives.font.lineHeight.38}",letterSpacing:{unit:"percent",value:0},textCase:"UPPER"}}},Heading:{L:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Medium}",fontSize:"{primitives.font.size.36}",lineHeight:"{primitives.font.lineHeight.38}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}},M:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Regular}",fontSize:"{primitives.font.size.32}",lineHeight:"{primitives.font.lineHeight.36}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}},S:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Medium}",fontSize:"{primitives.font.size.24}",lineHeight:"{primitives.font.lineHeight.28}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}}},Label:{M:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Medium}",fontSize:"{primitives.font.size.18}",lineHeight:"{primitives.font.lineHeight.20}",letterSpacing:{unit:"pixels",value:0},textCase:"UPPER"}},S:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Regular}",fontSize:"{primitives.font.size.14}",lineHeight:"{primitives.font.lineHeight.16}",letterSpacing:{unit:"pixels",value:.3},textCase:"UPPER"}}},Web:{Label:{Primary:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"Bold",fontSize:"{primitives.font.size.14}",lineHeight:"17px",letterSpacing:{unit:"percent",value:0},textCase:"UPPER"},$description:"Line height is AUTO in Figma, so the style carries no number. This value is measured from rendered text, not read off the style and not guessed."}}}},fe={$description:xi,primitives:$i,semantic:ki,gradient:Si,typography:_i};function*Le(e,t=[]){if(!(!e||typeof e!="object")){if("$value"in e){yield[t,e];return}for(const[i,o]of Object.entries(e))i.startsWith("$")||(yield*Le(o,[...t,i]))}}function ie(e,t=0){if(typeof e!="string"||!e.startsWith("{")||t>10)return String(e);let i=fe;for(const o of e.slice(1,-1).split("."))i=i==null?void 0:i[o];return ie(i==null?void 0:i.$value,t+1)}const A=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;");function _t(e,t,i){const o=document.createElement("section");return o.className="card",o.innerHTML=`
    <header class="card__head"><div>
      <h1 class="card__title">${e}</h1>
      <p class="card__desc">Rendered from <code>external/playalong-hub/design-tokens.json</code> — the same file the CSS variables are generated from.</p>
    </div></header>
    <p class="foundation__note">${t}</p>
    ${i}`,o}function Fi(){const e=(i,o,a)=>{const r=[...Le(o)].filter(([,n])=>n.$type==="color").map(([n,c])=>{const s=ie(c.$value),d=a&&typeof c.$value=="string"&&c.$value.startsWith("{")?`<div class="swatch__alias">→ ${A(c.$value.slice(1,-1).split(".").slice(-2).join("/"))}</div>`:"";return`<div class="swatch">
          <div class="swatch__chip" style="background:${s}"></div>
          <div class="swatch__meta">
            <div class="swatch__name">${A(n.join("/"))}</div>
            <div class="swatch__value">${A(s)}</div>${d}
          </div></div>`}).join("");return r?`<h2 class="foundation__group-title">${i}</h2><div class="swatches">${r}</div>`:""},t=[...Le(fe.gradient)].map(([i,o])=>{const a=o.$value,r=a.stops.map(c=>`${c.color} ${Math.round(c.position*100)}%`).join(", ");return`<div class="swatch">
      <div class="swatch__chip" style="background:${a.type==="angular"?`conic-gradient(from 0deg, ${r})`:`linear-gradient(180deg, ${r})`}"></div>
      <div class="swatch__meta"><div class="swatch__name">${A(i.join("/"))}</div>
      <div class="swatch__value">${a.stops.length} stops · ${a.type}</div></div></div>`}).join("");return _t("Colour","Semantic names are what to use. A primitive is the raw value behind one — if you are reaching for <code>Grey/200</code> rather than <code>TV/Text/Primary</code>, the semantic layer is missing a name.",e("Semantic",fe.semantic,!0)+(t?`<h2 class="foundation__group-title">Gradients</h2><div class="swatches">${t}</div>`:"")+e("Primitives",fe.primitives,!1))}function Ci(){const e=[...Le(fe.typography)].map(([t,i])=>{const o=i.$value,a=ie(o.fontFamily),r=ie(o.fontSize),n=ie(o.lineHeight),c=String(ie(o.fontWeight)),d={thin:100,extralight:200,light:300,regular:400,normal:400,medium:500,semibold:600,bold:700,extrabold:800,black:900}[c.toLowerCase().replace(/[^a-z]/g,"")]??400,l=o.letterSpacing,m=l.unit==="percent"?`${l.value/100}em`:`${l.value}px`,v=`font-family:'${a}';font-weight:${d};font-size:${r};line-height:${n};letter-spacing:${m};text-transform:${o.textCase==="UPPER"?"uppercase":"none"}`;return`<div class="specimen">
      <div class="specimen__meta">
        <div class="specimen__name">${A(t.join("/"))}</div>
        ${A(a)} ${A(c)}<br>${A(r)} / ${A(n)} · ${A(m)}
        ${i.$description?'<br><span style="color:var(--text-muted)">measured</span>':""}
      </div>
      <div class="specimen__sample" style="${v}">Play along. Out loud.</div>
    </div>`}).join("");return _t("Typography","Two families, and the split is the game layer: Rubik is the product, the game screens are Roboto Condensed. Sizes below 24 are supporting text on small elements — nothing load-bearing may live in them.",`<div class="specimens">${e}</div>`)}const bt=(e,t)=>(e.innerHTML="",e.appendChild(t),()=>{}),Ti=[{id:"foundation-colour",title:"Colour",kind:"component",section:"Foundations",badge:{text:"Tokens",tone:"ready"},open:e=>bt(e,Fi())},{id:"foundation-type",title:"Typography",kind:"component",section:"Foundations",badge:{text:"Tokens",tone:"ready"},open:e=>bt(e,Ci())}];async function gt(e,t,i){try{await navigator.clipboard.writeText(e)}catch{const o=document.createElement("textarea");o.value=e,o.style.position="fixed",o.style.opacity="0",document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o)}t.classList.add("btn--copied"),t.textContent="Copied!",setTimeout(()=>{t.classList.remove("btn--copied"),t.textContent=i},1400)}const Ai=[{id:"web",label:"Web · CSS (LG, Samsung)"},{id:"android",label:"Android TV · Compose"},{id:"ios",label:"iOS / tvOS · SwiftUI"},{id:"roku",label:"Roku · SceneGraph"}];function Ii(e){const t=j.find(p=>p.id===e.defaults.easingId)??j[0],i={duration:e.defaults.duration,easing:t};let o="web";const a=document.createElement("div");a.innerHTML=`
    <header class="page-header">
      <div class="page-header__eyebrow">${e.game}</div>
      <h1 class="page-header__title">${e.title}</h1>
      <p class="page-header__desc">${e.description}</p>
    </header>

    <div class="anim-card">
      <div class="anim-stage" data-role="stage"></div>

      ${e.frames&&e.frames.length>0?`
        <div class="frames-grid" data-role="frames">
          ${e.frames.map((p,g)=>`
            <div class="frame">
              <div class="frame__slot" data-frame-idx="${g}"></div>
              <div class="frame__label">${p.label}</div>
              ${p.sublabel?`<div class="frame__sublabel">${p.sublabel}</div>`:""}
            </div>
          `).join("")}
        </div>
      `:""}

      <div class="actions">
        <button class="btn btn--primary" data-role="play">▶ Replay</button>
        <button class="btn" data-role="slow">⏱ Slow</button>
        <button class="btn" data-role="reset">Reset to defaults</button>
      </div>

      <div class="info-grid">
        <div class="info-grid__col">
          <details class="disclosure">
            <summary class="disclosure__head">Ticket description</summary>
            <div class="pm-block-wrap">
              <div class="pm-block" data-role="pm-output"></div>
              <button class="btn btn--small pm-block__copy" data-role="copy-pm">Copy</button>
            </div>
          </details>
        </div>
        <div class="info-grid__col">
          <h3 class="section__title">Controls</h3>
          <div class="anim-controls">
            <div class="control">
              <div class="control__label">Duration</div>
              <div class="control__row">
                <input type="range" min="100" max="2000" step="10" value="${i.duration}" data-role="duration" />
                <div class="control__value" data-role="duration-value">${i.duration} ms</div>
              </div>
            </div>

            <div class="control">
              <div class="control__label">Easing preset</div>
              <select data-role="easing-preset" style="width:100%">
                ${j.map(p=>`<option value="${p.id}" ${p.id===i.easing.id?"selected":""}>${p.label}</option>`).join("")}
              </select>
            </div>

            <div class="control__hint" data-role="easing-desc">${i.easing.description}</div>

            <details class="disclosure disclosure--inline">
              <summary class="disclosure__head">Custom cubic-bezier</summary>
              <div class="bezier-inputs">
                ${i.easing.bezier.map((p,g)=>`<input type="number" step="0.01" value="${p}" data-role="bezier-${g}" />`).join("")}
              </div>
            </details>
          </div>
        </div>
      </div>

      <details class="disclosure disclosure--wide">
        <summary class="disclosure__head">Implementation code</summary>
      <div class="tabs-row">
        <div class="tabs" role="tablist">
          ${Ai.map(p=>`
            <button type="button" class="tab ${p.id===o?"is-active":""}" role="tab" data-platform="${p.id}">${p.label}</button>
          `).join("")}
        </div>
        <button class="btn btn--small" data-role="copy-snippet">Copy code</button>
      </div>

      <div class="code-block" data-role="snippet-output"></div>
      </details>
    </div>
  `;const r=a.querySelector("[data-role=stage]"),n=a.querySelector("[data-role=play]"),c=a.querySelector("[data-role=slow]"),s=a.querySelector("[data-role=reset]"),d=a.querySelector("[data-role=copy-snippet]"),l=a.querySelector("[data-role=copy-pm]"),m=a.querySelector("[data-role=duration]"),v=a.querySelector("[data-role=duration-value]"),y=a.querySelector("[data-role=easing-preset]"),oe=a.querySelector("[data-role=easing-desc]"),Ee=[0,1,2,3].map(p=>a.querySelector(`[data-role=bezier-${p}]`)),Tt=a.querySelector("[data-role=snippet-output]"),At=a.querySelector("[data-role=pm-output]"),Je=Array.from(a.querySelectorAll(".tab")),It=e.render(r);function zt(){i.easing.bezier.forEach((p,g)=>{Ee[g].value=String(p)})}function ae(){const p=e.snippets(i);Tt.textContent=p[o],At.textContent=e.pmTicket(),Je.forEach(g=>{g.classList.toggle("is-active",g.dataset.platform===o)})}function Ze(p){i.easing={...p},oe.textContent=p.description,zt(),ae(),e.tbd||e.play(i)}function Rt(){const p=Ee.map(g=>Number(g.value));if(!p.some(g=>Number.isNaN(g))){if(i.easing={id:"custom",label:`Custom (${p.join(", ")})`,bezier:p,description:`cubic-bezier(${p.join(", ")})`},!y.querySelector('option[value="custom"]')){const g=document.createElement("option");g.value="custom",g.textContent="Custom…",y.appendChild(g)}y.value="custom",oe.textContent=`cubic-bezier(${p.join(", ")}) — ${b(p)}`,ae(),e.tbd||e.play(i)}}return e.frames&&e.frames.length>0&&e.frames.forEach((p,g)=>{const et=a.querySelector(`[data-frame-idx="${g}"]`);et&&p.render(et)}),n.addEventListener("click",()=>{e.tbd||e.play(i)}),c.addEventListener("click",()=>{if(e.tbd)return;const p=e.slowFactor??4,g={...i,duration:i.duration*p};e.play(g)}),s.addEventListener("click",()=>{const p=j.find(g=>g.id===e.defaults.easingId)??j[0];i.duration=e.defaults.duration,m.value=String(i.duration),v.textContent=`${i.duration} ms`,y.value=p.id,Ze(p)}),m.addEventListener("input",()=>{i.duration=Number(m.value),v.textContent=`${i.duration} ms`,ae(),e.tbd||e.play(i)}),y.addEventListener("change",()=>{const p=j.find(g=>g.id===y.value);p&&Ze(p)}),Ee.forEach(p=>p.addEventListener("change",Rt)),Je.forEach(p=>{p.addEventListener("click",()=>{o=p.dataset.platform,ae()})}),d.addEventListener("click",()=>{const p=e.snippets(i)[o];gt(p,d,"Copy current snippet")}),l.addEventListener("click",()=>{gt(e.pmTicket(),l,"Copy description")}),ae(),e.tbd||requestAnimationFrame(()=>e.play(i)),a.__destroy=()=>{It()},a}function zi(e){var d;const t=document.createElement("section");t.className="card demo";const i=e.href??(e.src?`/playalong-animation-catalog/${e.src}`:null),o=i?`<div class="demo__stage">
         <iframe class="demo__frame" title="${e.title}" src="${i}" allow="autoplay" loading="lazy"></iframe>
       </div>`:`<div class="demo__stage demo__stage--empty"><div>
         <p class="demo__empty-title">No address yet</p>
         <p class="demo__empty-body">${e.hostedNote??"This demo is hosted elsewhere and its URL has not been recorded."}</p>
       </div></div>`,a=(e.notes??[]).map(l=>`<li>${l}</li>`).join(""),r=(e.controls??[]).map(l=>`<tr><td><kbd>${l.keys}</kbd></td><td>${l.does}</td></tr>`).join(""),n=l=>{try{const m=parseFloat(localStorage.getItem(l.key)??"");return Number.isFinite(m)?Math.min(l.max,Math.max(l.min,m)):l.fallback}catch{return l.fallback}},c=(e.settings??[]).map((l,m)=>{const v=n(l);return`<label class="demo__setting">
        <span class="demo__setting-label">${l.label}</span>
        <input type="range" min="${l.min}" max="${l.max}" step="${l.step}" value="${v}" data-setting="${m}" />
        <span class="demo__setting-value" data-setting-value="${m}">${l.format(v)}</span>
      </label>`}).join("");t.innerHTML=`
    <header class="card__head">
      <div>
        <h1 class="card__title">${e.title}</h1>
        <p class="card__desc">${e.description}</p>
      </div>
      <div class="demo__actions">
        ${i?(e.actions??[]).map((l,m)=>`<button type="button" class="btn" data-action="${m}">${l.label}</button>`).join(""):""}
        ${i?'<button type="button" class="btn" data-act="reload">Restart</button>':""}
        ${i?`<a class="btn" href="${i}" target="_blank" rel="noopener">Open full screen</a>`:""}
      </div>
    </header>

    ${o}

    <div class="demo__side">
      ${c?`<div class="demo__block"><h2>Settings</h2><div class="demo__settings">${c}</div></div>`:""}
      ${r?`<div class="demo__block"><h2>Controls</h2><table class="demo__keys">${r}</table></div>`:""}
      ${a?`<div class="demo__block"><h2>Read this first</h2><ul class="demo__notes">${a}</ul></div>`:""}
    </div>
  `,t.querySelectorAll("[data-setting]").forEach(l=>{const m=e.settings[Number(l.dataset.setting)],v=t.querySelector(`[data-setting-value="${l.dataset.setting}"]`);l.addEventListener("input",()=>{const y=Number(l.value);v.textContent=m.format(y);try{localStorage.setItem(m.key,String(y))}catch{}})});const s=t.querySelector(".demo__frame");return s&&(t.querySelectorAll("[data-action]").forEach(l=>{const m=e.actions[Number(l.dataset.action)];l.addEventListener("click",()=>{s.contentWindow&&m.run(s.contentWindow),s.focus()})}),(d=t.querySelector('[data-act="reload"]'))==null||d.addEventListener("click",()=>{s.src=s.src}),t.__destroy=()=>{s.src="about:blank"}),t}const Ft=(e,t)=>(e.innerHTML="",e.appendChild(t),()=>{var i;return(i=t.__destroy)==null?void 0:i.call(t)}),Ri=wi.map(e=>({id:e.id,title:e.title,kind:"demo",section:e.section,badge:{text:"Demo",tone:"demo"},open:t=>Ft(t,zi(e))})),Li=yi.map(e=>({id:e.id,title:e.title,kind:"animation",section:e.game,badge:e.tbd?{text:"TBD",tone:"tbd"}:{text:"Ready",tone:"ready"},open:t=>Ft(t,Ii(e))})),Xe=[...Ti,...Ri,...Li],Ei=["Foundations","Demos","Family Feud","Card Sharks","Stack It","Common","Win/Lose"],Bi=Ei.map(e=>({name:e,items:Xe.filter(t=>t.section===e)})).filter(e=>e.items.length>0),Ct="sidebar:collapsed";function Oi(){try{return new Set(JSON.parse(localStorage.getItem(Ct)??"[]"))}catch{return new Set}}function Mi(e){try{localStorage.setItem(Ct,JSON.stringify([...e]))}catch{}}function Vi(e){const t=document.createElement("aside");t.className="sidebar",t.innerHTML=`
    <div class="sidebar__brand">
      <p class="sidebar__title">PlayAlong TV</p>
      <p class="sidebar__subtitle">Catalog</p>
    </div>
    <input class="sidebar__search" type="search" placeholder="Filter…" aria-label="Filter the catalog" />
  `;const i=Oi(),o=[];function a(c,s,d,l){s.classList.toggle("is-collapsed",l),d.setAttribute("aria-expanded",String(!l)),l?i.add(c):i.delete(c),Mi(i)}for(const c of Bi){const s=document.createElement("div");s.className="sidebar__group",s.innerHTML=`
      <button type="button" class="sidebar__group-title" aria-expanded="true">
        <span class="sidebar__chevron" aria-hidden="true"></span>
        <span class="sidebar__group-name">${c.name}</span>
        <span class="sidebar__group-count">${c.items.length}</span>
      </button>
      <div class="sidebar__group-body"><div class="sidebar__group-items"></div></div>
    `;const d=s.querySelector(".sidebar__group-title"),l=s.querySelector(".sidebar__group-items");d.addEventListener("click",()=>{a(c.name,s,d,!s.classList.contains("is-collapsed"))}),i.has(c.name)&&(s.classList.add("is-collapsed"),d.setAttribute("aria-expanded","false")),o.push({name:c.name,el:s,toggle:d});for(const m of c.items){const v=document.createElement("div");v.className="sidebar__item",v.dataset.id=m.id,v.dataset.search=`${m.title} ${m.section}`.toLowerCase();const y=m.badge;v.innerHTML=`
        <span class="sidebar__item-name">${m.title}</span>
        ${y?`<span class="sidebar__badge is-${y.tone??"ready"}">${y.text}</span>`:""}
      `,v.addEventListener("click",()=>e(m.id)),l.appendChild(v)}t.appendChild(s)}const r=t.querySelector(".sidebar__search");r.addEventListener("input",()=>{const c=r.value.trim().toLowerCase();for(const s of o){let d=0;s.el.querySelectorAll(".sidebar__item").forEach(l=>{const m=!c||(l.dataset.search??"").includes(c);l.hidden=!m,m&&d++}),s.el.hidden=d===0,c&&d>0&&s.el.classList.contains("is-collapsed")&&a(s.name,s.el,s.toggle,!1)}});function n(c){t.querySelectorAll(".sidebar__item").forEach(l=>{l.classList.toggle("is-active",l.dataset.id===c)});const s=t.querySelector(".sidebar__item.is-active"),d=o.find(l=>l.el.contains(s));d&&d.el.classList.contains("is-collapsed")&&a(d.name,d.el,d.toggle,!1)}return{root:t,setActive:n}}function Hi(){const e=document.getElementById("app");if(!e)return;e.className="app",e.innerHTML="";const t=document.createElement("main");t.className="main";let i=null;function o(r){const n=Xe.find(c=>c.id===r);n&&(i==null||i(),i=n.open(t),a.setActive(r),location.hash.replace(/^#/,"")!==r&&(location.hash=r))}const a=Vi(o);e.appendChild(a.root),e.appendChild(t),o(location.hash.replace(/^#/,"")||Xe[0].id),window.addEventListener("hashchange",()=>{const r=location.hash.replace(/^#/,"");r&&o(r)})}Hi();
