(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function o(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=o(i);fetch(i.href,s)}})();const Te=[{id:"linear",label:"Linear",bezier:[0,0,1,1],description:"Constant speed, no acceleration."},{id:"ease",label:"Ease (browser default)",bezier:[.25,.1,.25,1],description:"Generic browser default."},{id:"ease-out",label:"Ease Out",bezier:[0,0,.2,1],description:"Fast start, soft landing — good for entrances."},{id:"ease-in",label:"Ease In",bezier:[.4,0,1,1],description:"Slow start, fast end — good for exits."},{id:"ease-in-out",label:"Ease In Out",bezier:[.4,0,.2,1],description:"Symmetric — good for ambient loops."},{id:"back-out",label:"Back Out (overshoot)",bezier:[.34,1.56,.64,1],description:"Overshoots past the end then settles — bouncy reveals."},{id:"material",label:"Material Standard",bezier:[.4,0,.2,1],description:'Material Design "standard" curve.'},{id:"glide",label:"Glide (Stack It)",bezier:[.3,.9,.3,1],description:"Quick launch, long soft settle — Stack It chip and block moves."}];function $(e){return`cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`}function b(e,t){if(document.getElementById(e))return;const o=document.createElement("style");o.id=e,o.textContent=t,document.head.appendChild(o)}const St=450,et=350,Zo=`
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
`;let O=null,J=null,ee=null;function tt(e,t){e.innerHTML=`
    <div class="frame-ff-row" style="
      transform: rotateX(${t.rotateX}deg) scale(${t.scale});
      ${t.state==="hidden"?"background:linear-gradient(180deg,#1d4ed8 0%,#0a1f5a 100%); border:1.5px solid rgba(56,138,255,0.5);":"background:linear-gradient(180deg,#008e11 0%,#053800 100%); border:1.5px solid rgba(0,255,85,0.55);"}
    ">
      <span style="font-size:18px;font-weight:600;">1</span>
      <span style="width:1px;align-self:stretch;background:rgba(255,255,255,0.2);"></span>
      <span style="flex:1;font-size:13px;font-weight:600;letter-spacing:0.3px;opacity:${t.textOpacity};">FAST FOOD</span>
      <span style="font-size:18px;font-weight:600;opacity:${t.textOpacity};">28</span>
    </div>
  `}const ot=`
.frame-ff-row {
  display:flex;align-items:center;gap:10px;
  width:100%;height:40px;padding:0 12px;
  border-radius:6px;color:#fff;
  font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
  transform-origin:center center;
}
`,jo={id:"ff-answer-board",title:"Answer Board",game:"Family Feud",description:'When the player guesses correctly, the matching row flips open on the X-axis, swapping its blue "hidden" skin for the green "revealed" skin. Back-ease curve overshoots past the end then settles. The answer text fades up from beneath after the row lands.',defaults:{duration:700,easingId:"back-out"},frames:[{label:"Hidden",sublabel:"idle · blue · slot number only",render:e=>{b("css-ff-frame-row",ot),tt(e,{state:"hidden",rotateX:0,scale:1,textOpacity:0})}},{label:"Start",sublabel:"0% · rotateX 90° · scale .85",render:e=>{e.innerHTML='<div class="frame-ghost">edge · row on its side</div>'}},{label:"Overshoot",sublabel:"60% · rotateX −15° · scale 1.04",render:e=>{b("css-ff-frame-row",ot),tt(e,{state:"revealed",rotateX:-15,scale:1.04,textOpacity:0})}},{label:"Counter",sublabel:"85% · rotateX 6° · scale .99",render:e=>{b("css-ff-frame-row",ot),tt(e,{state:"revealed",rotateX:6,scale:.99,textOpacity:.6})}},{label:"Settled",sublabel:"100% · rotateX 0 · scale 1",render:e=>{b("css-ff-frame-row",ot),tt(e,{state:"revealed",rotateX:0,scale:1,textOpacity:1})}}],render(e){return b("css-ff-answer-board",Zo),e.innerHTML=`
      <div class="preview-ff-board">
        <div class="preview-ff-row">
          <span class="preview-ff-row__num">1</span>
          <span class="preview-ff-row__divider"></span>
          <span class="preview-ff-row__name">FAST FOOD</span>
          <span class="preview-ff-row__pts">28</span>
        </div>
      </div>
    `,O=e.querySelector(".preview-ff-row"),J=e.querySelector(".preview-ff-row__name"),ee=e.querySelector(".preview-ff-row__pts"),()=>{e.innerHTML="",O=null,J=null,ee=null}},play({duration:e,easing:t}){if(!O||!J||!ee)return;O.classList.remove("is-revealed"),O.style.animation="none",J.style.animation="none",ee.style.animation="none",J.style.opacity="0",ee.style.opacity="0",O.offsetWidth,O.classList.add("is-revealed"),O.style.animation=`ff-row-flip ${e}ms ${$(t.bezier)}`;const o=Math.round(et/700*e),a=`ff-text-fade-up ${St}ms ease-out ${o}ms both`;J.style.animation=a,ee.style.animation=a,setTimeout(()=>{!O||!J||!ee||(O.style.animation="none",J.style.animation="none",ee.style.animation="none",J.style.opacity="0",ee.style.opacity="0",O.classList.remove("is-revealed"))},e+1200)},snippets({duration:e,easing:t}){const[o,a,i,s]=t.bezier,r=(e/1e3).toFixed(2);return{web:`/* Drop into FamilyFeudBoard.css */
@keyframes ff-row-flip {
  0%   { transform: rotateX(90deg) scale(0.85); }
  60%  { transform: rotateX(-15deg) scale(1.04); }
  85%  { transform: rotateX(6deg) scale(0.99); }
  100% { transform: rotateX(0) scale(1); }
}

.ff-board { perspective: 1000px; }

.ff-board__row--revealed {
  animation: ff-row-flip ${e}ms ${$(t.bezier)};
  transform-origin: center center;
}

@keyframes ff-text-fade-up {
  0%   { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}

.ff-board__row--revealed .ff-board__name,
.ff-board__row--revealed .ff-board__points {
  animation: ff-text-fade-up ${St}ms ease-out ${et}ms both;
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.runtime.*
import androidx.compose.ui.graphics.graphicsLayer

val easing = CubicBezierEasing(${o.toFixed(2)}f, ${a.toFixed(2)}f, ${i.toFixed(2)}f, ${s.toFixed(2)}f)

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

// Text fade-up — separate animation, delayed ${et} ms.
val textAlpha by animateFloatAsState(
    targetValue = if (revealed) 1f else 0f,
    animationSpec = tween(${St}, delayMillis = ${et})
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
                .timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${r}),
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

    <Animation id="flip" duration="${r}" easeFunction="outBack" repeat="false">
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
<!-- Note: Roku's outBack easeFunction approximates cubic-bezier(${o},${a},${i},${s}). -->`}},pmTicket(){return`Title: Family Feud — Answer Board row reveal animation

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
  · On platforms without true 3D rotation, fall back to a scaleY 0 → 1 reveal — the overshoot must remain visible.`}},Yo=`
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
`;let at=null,Se=0;const co=[{text:"pizza",kind:"incorrect"},{text:"burger",kind:"correct"},{text:"tacos",kind:"incorrect"}];function po(e,t,o,a,i,s){e.innerHTML=`
    <div style="
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      font-size:18px;font-weight:600;
      color:${a};
      opacity:${o};
      transform:translateY(${t}px);
      text-decoration:line-through;
    ">${s}</div>
  `}const Ko={id:"ff-attempts",title:"Attempts",game:"Family Feud",description:"When the player submits a guess, a new row slides into the Attempts column from above. Correct rows render in green, incorrect rows render in red with a strike-through.",defaults:{duration:400,easingId:"ease-out"},frames:[{label:"Start",sublabel:"0% · translateY −18 · opacity 0",render:e=>{e.innerHTML='<div class="frame-ghost">hidden</div>'}},{label:"Mid",sublabel:"50% · translateY −9 · opacity .5",render:e=>po(e,-9,.5,"#c33",!0,"pizza")},{label:"Settled",sublabel:"100% · translateY 0 · opacity 1",render:e=>po(e,0,1,"#c33",!0,"pizza")}],render(e){return b("css-ff-attempts",Yo),e.innerHTML=`
      <div class="preview-ff-attempts">
        <div class="preview-ff-attempts__title">Attempts</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
      </div>
    `,at=e.querySelector(".preview-ff-attempts"),Se=0,()=>{e.innerHTML="",at=null}},play({duration:e,easing:t}){if(!at)return;const o=co[Se%co.length],a=at.querySelectorAll(".preview-ff-attempts__row"),i=a[Se%a.length];Se++,i.textContent=o.text,i.classList.remove("preview-ff-attempts__row--empty","preview-ff-attempts__row--correct","preview-ff-attempts__row--incorrect"),i.classList.add(`preview-ff-attempts__row--${o.kind}`),i.style.animation="none",i.offsetWidth,i.style.animation=`ff-attempt-slide-in ${e}ms ${$(t.bezier)}`,Se%a.length===0&&setTimeout(()=>{a.forEach((s,r)=>{r!==(Se-1)%a.length&&(s.textContent="_",s.className="preview-ff-attempts__row preview-ff-attempts__row--empty")})},e+800)},snippets({duration:e,easing:t}){const[o,a,i,s]=t.bezier,r=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
@keyframes ff-attempt-slide-in {
  0%   { transform: translateY(-18px); opacity: 0; }
  100% { transform: translateY(0);     opacity: 1; }
}

.ff-attempts__row--correct,
.ff-attempts__row--incorrect {
  animation: ff-attempt-slide-in ${e}ms ${$(t.bezier)};
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.*
import androidx.compose.animation.core.*

val easing = CubicBezierEasing(${o.toFixed(2)}f, ${a.toFixed(2)}f, ${i.toFixed(2)}f, ${s.toFixed(2)}f)

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
                withAnimation(.timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${r})) {
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
    <Animation id="slideIn" duration="${r}" easeFunction="outQuad" repeat="false">
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
  · After 3 strikes the panel locks; no further entries play.`}},Xo=`
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
`;let be=[],ze=0;function Ft(e,t,o,a){e.innerHTML=`
    <div style="
      width:44px;height:44px;
      display:flex;align-items:center;justify-content:center;
      border:2px solid #ef4444;border-radius:6px;
      color:#ef4444;font-size:26px;font-weight:700;
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      transform:scale(${t}) rotate(${o}deg);
      opacity:${a};
    ">✕</div>
  `}const Qo={id:"ff-strikes",title:"Strikes",game:"Family Feud",description:'On a wrong answer, the next strike X icon pops in with a rotation and scale overshoot. Back-ease curve gives the X a satisfying "punch" landing.',defaults:{duration:550,easingId:"back-out"},frames:[{label:"Start",sublabel:"idle · faint X · opacity .2",render:e=>Ft(e,.9,0,.2)},{label:"Overshoot",sublabel:"60% · scale 1.3 · rotate +8°",render:e=>Ft(e,1.3,8,1)},{label:"Settled",sublabel:"100% · scale 1 · rotate 0",render:e=>Ft(e,1,0,1)}],render(e){return b("css-ff-strikes",Xo),e.innerHTML=`
      <div class="preview-ff-strikes">
        <span class="preview-ff-strike">✕</span>
        <span class="preview-ff-strike">✕</span>
        <span class="preview-ff-strike">✕</span>
      </div>
    `,be=Array.from(e.querySelectorAll(".preview-ff-strike")),ze=0,()=>{e.innerHTML="",be=[]}},play({duration:e,easing:t}){if(be.length===0)return;ze>=be.length&&(be.forEach(a=>a.classList.remove("is-used")),ze=0,be[0].offsetWidth);const o=be[ze];o.classList.add("is-used"),o.style.animation="none",o.offsetWidth,o.style.animation=`ff-strike-pop ${e}ms ${$(t.bezier)}`,ze++},snippets({duration:e,easing:t}){const[o,a,i,s]=t.bezier,r=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
@keyframes ff-strike-pop {
  0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
  60%  { transform: scale(1.3) rotate(8deg);  opacity: 1; }
  100% { transform: scale(1) rotate(0);       opacity: 1; }
}

.ff-strike-dot--used img {
  animation: ff-strike-pop ${e}ms ${$(t.bezier)};
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
                .timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${r}),
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
    <Animation id="pop" duration="${r}" easeFunction="outBack" repeat="false">
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
  · On platforms without simultaneous transform interpolation, prioritize the scale overshoot over the rotation.`}},Jo=`
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
`;let ve=null;function Lt(e,t,o,a,i){e.innerHTML=`
    <div style="
      position:relative;
      width:100%;height:42px;border-radius:6px;
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      color:#fff;font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;font-size:13px;font-weight:600;
      transform:translateY(${t}px) scale(${o});
      opacity:${a};
    ">
      <span style="display:inline-flex;align-items:center;justify-content:center;height:100%;padding:0 24px;background:linear-gradient(90deg,rgba(0,47,255,0) 0%,#002fff 50%,rgba(0,47,255,0) 100%);">Round Complete!</span>
      ${i!==null?`<div style="position:absolute;top:0;bottom:0;width:45%;left:${i}%;background:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(170,210,255,0.55) 50%,rgba(255,255,255,0) 100%);"></div>`:""}
    </div>
  `}const ea={id:"ff-feedback",title:"Feedback",game:"Family Feud",usedIn:["Family Feud","Stack It"],description:'When the round wraps up, a Round-Complete banner drops in from above with a back-ease overshoot. A soft light band sweeps left-to-right across the banner once, signalling "phase complete, moving on". A slow brightness pulse keeps the band alive afterwards.',defaults:{duration:620,easingId:"ease-out"},frames:[{label:"Start",sublabel:"drop · translateY −40 · scale .94",render:e=>{e.innerHTML='<div class="frame-ghost">hidden</div>'}},{label:"Settled",sublabel:"drop done · translateY 0 · scale 1",render:e=>Lt(e,0,1,1,null)},{label:"Sweep",sublabel:"light band mid-traversal",render:e=>Lt(e,0,1,1,30)},{label:"Idle",sublabel:"brightness pulse loop",render:e=>Lt(e,0,1,1,null)}],render(e){return b("css-ff-feedback",Jo),e.innerHTML=`
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
    `,ve=e.querySelector(".preview-ff-banner"),()=>{e.innerHTML="",ve=null}},play({duration:e,easing:t}){if(!ve)return;ve.style.animation="none",ve.offsetWidth,ve.style.animation=`ff-banner-in ${e}ms ${$(t.bezier)} backwards`;const o=ve.querySelector(".preview-ff-banner__sweep");if(o){const a=o.cloneNode(!0);o.replaceWith(a)}},snippets({duration:e,easing:t}){const[o,a,i,s]=t.bezier,r=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
@keyframes ff-banner-in {
  from { opacity: 0; transform: translateY(-40px) scale(0.94); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.ff-banner {
  animation: ff-banner-in ${e}ms ${$(t.bezier)} backwards;
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
    val easing = CubicBezierEasing(${o.toFixed(2)}f, ${a.toFixed(2)}f, ${i.toFixed(2)}f, ${s.toFixed(2)}f)
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
            .animation(.timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${r}), value: visible)
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
    <Animation id="dropIn" duration="${r}" easeFunction="outBack" repeat="false">
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
  · Keyboard / interactive elements behind the banner dim and become non-interactive.`}},ta=`
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
`;let re=null,it=86;function Vt(e,t,o,a){e.innerHTML=`
    <div style="
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      font-size:32px;font-weight:800;color:${o};
      transform:scale(${t});transform-origin:center;
    ">${a}</div>
  `}const oa={id:"common-score",title:"Score",game:"Common",usedIn:["Family Feud","Card Sharks","Match Game","The 1% Club"],description:"When the player earns points, the Score value briefly scales up and flashes green before settling back to its resting gold colour. Used by both Family Feud and Card Sharks game timers.",defaults:{duration:600,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · scale 1 · #CAA512",render:e=>Vt(e,1,"#caa512","86")},{label:"Peak",sublabel:"35% · scale 1.45 · #6DD97A",render:e=>Vt(e,1.45,"#6dd97a","102")},{label:"Settled",sublabel:"100% · scale 1 · #CAA512",render:e=>Vt(e,1,"#caa512","102")}],render(e){return b("css-common-score",ta),it=86,e.innerHTML=`
      <div class="preview-score">
        <div class="preview-score__label">Score</div>
        <div class="preview-score__value">${it}</div>
      </div>
    `,re=e.querySelector(".preview-score__value"),()=>{e.innerHTML="",re=null}},play({duration:e,easing:t}){re&&(it+=Math.floor(Math.random()*25)+5,re.textContent=String(it),re.classList.remove("is-bumping"),re.style.animation="none",re.offsetWidth,re.style.animation=`game-timer-box-score-bump ${e}ms ${$(t.bezier)}`)},snippets({duration:e,easing:t}){const[o,a,i,s]=t.bezier,r=(e/1e3).toFixed(2);return{web:`/* GameTimerBox.css — shared between Family Feud, Card Sharks, Fast Money */
@keyframes game-timer-box-score-bump {
  0%   { transform: scale(1);    color: #caa512; }
  35%  { transform: scale(1.45); color: #6dd97a; }
  100% { transform: scale(1);    color: #caa512; }
}

.game-timer-box__value--score-bump {
  display: inline-block;
  transform-origin: center;
  animation: game-timer-box-score-bump ${e}ms ${$(t.bezier)};
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
                withAnimation(.timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${r})) {
                    scale = 1.0  // ramps via spring-like back-ease
                }
                // Pulse via keyframe: scale 1 → 1.45 → 1
                let half = ${r} / 2.85
                withAnimation(.easeOut(duration: half)) {
                    scale = 1.45; color = Color(red: 0.43, green: 0.85, blue: 0.48)
                }
                DispatchQueue.main.asyncAfter(deadline: .now() + half) {
                    withAnimation(.easeIn(duration: ${r} - half)) {
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
    <Animation id="bump" duration="${r}" easeFunction="outBack" repeat="false">
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
  · Used identically in Family Feud, Card Sharks, and Fast Money game-timer boxes.`}},aa=`
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
`;let W=null,Fe=null,q=null,ne;function st(e,t){if(t.timeUp){e.innerHTML=`
      <div style="
        width:100%;height:40px;
        background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
        border-radius:6px;display:flex;align-items:center;justify-content:center;
        color:#caa512;font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
        font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;
      ">Time's Up!</div>
    `;return}const o=t.critical?"linear-gradient(90deg,#ef4444 0%,#f87171 100%)":"linear-gradient(90deg,#0090ff 0%,#0022ab 100%)";e.innerHTML=`
    <div style="
      width:100%;height:40px;
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      border-radius:6px;
      padding:6px 8px;box-sizing:border-box;
      display:flex;align-items:center;gap:8px;
    ">
      <span style="color:#caa512;font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;font-size:12px;font-weight:800;min-width:24px;">${t.label}</span>
      <div style="flex:1;height:8px;background:rgba(255,255,255,0.1);border-radius:5px;overflow:hidden;">
        <div style="height:100%;width:${t.fill}%;background:${o};border-radius:5px;"></div>
      </div>
    </div>
  `}const ia={id:"cs-timer",title:"Timer",game:"Card Sharks",usedIn:["Card Sharks","Match Game"],description:'Countdown bar that depletes linearly from full to empty over the question window. The blue gradient switches to red once the remaining time crosses a "critical" threshold (last 25%).',defaults:{duration:6e3,easingId:"linear"},slowFactor:2,frames:[{label:"Start",sublabel:"0% · 6s · blue full",render:e=>st(e,{label:"6s",fill:100,critical:!1})},{label:"Mid",sublabel:"50% · 3s · blue half",render:e=>st(e,{label:"3s",fill:50,critical:!1})},{label:"Critical",sublabel:"85% · 1s · red 15%",render:e=>st(e,{label:"1s",fill:15,critical:!0})},{label:"Time’s Up",sublabel:"100% · bar removed · label centred",render:e=>st(e,{label:"",fill:0,critical:!1,timeUp:!0})}],render(e){return b("css-cs-timer",aa),e.innerHTML=`
      <div class="preview-cs-timer">
        <div class="preview-cs-timer__row">
          <span class="preview-cs-timer__value">6s</span>
          <div class="preview-cs-timer__bar">
            <div class="preview-cs-timer__bar-fill"></div>
          </div>
        </div>
      </div>
    `,W=e.querySelector(".preview-cs-timer__bar-fill"),Fe=e.querySelector(".preview-cs-timer__bar"),q=e.querySelector(".preview-cs-timer__value"),()=>{e.innerHTML="",W=null,Fe=null,q=null,ne!==void 0&&clearInterval(ne)}},play({duration:e}){if(!W||!q||!Fe)return;ne!==void 0&&clearInterval(ne),W.classList.remove("is-critical"),Fe.classList.remove("is-hidden"),q.classList.remove("is-time-up"),W.style.animation="none",W.offsetWidth,W.style.animationDuration=`${e}ms`,W.style.animation=`cs-timer-deplete ${e}ms linear forwards`;const t=Math.ceil(e/1e3);q.textContent=`${t}s`;const o=performance.now();ne=window.setInterval(()=>{const a=Math.max(0,e-(performance.now()-o));if(a<=0){q&&(q.textContent="Time's Up!",q.classList.add("is-time-up")),Fe&&Fe.classList.add("is-hidden"),ne!==void 0&&(clearInterval(ne),ne=void 0);return}q&&(q.textContent=`${Math.ceil(a/1e3)}s`),W&&a<e*.25&&W.classList.add("is-critical")},100)},snippets({duration:e}){const t=(e/1e3).toFixed(2);return{web:`/* GameTimerBox.css */
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
  · No bounce/easing at end — it's a literal countdown.`}},sa=`
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
`;let Oe=null,De=null,Ge=null,At=0;const ho=[{higher:"locked",lower:"idle",resolved:!1},{higher:"correct",lower:"idle",resolved:!0},{higher:"idle",lower:"locked",resolved:!1},{higher:"idle",lower:"wrong",resolved:!0}];function uo(e,t,o){if(!e)return;e.className=`preview-hl-btn preview-hl-btn--${t==="up"?"higher":"lower"} preview-hl-btn--${o}`;const a=e.querySelector(".preview-hl-btn__label");a&&(o==="correct"?a.textContent="Correct!":o==="wrong"?a.textContent="Incorrect!":a.textContent=t==="up"?"Higher":"Lower")}function go(e,t,o){return`
    <div style="
      width:100%;height:30px;
      background:${{idle:"#202228",locked:"linear-gradient(90deg,#0090ff 0%,#0022ab 100%)",correct:"linear-gradient(180deg,#008e11 0%,#053800 100%)",wrong:"linear-gradient(180deg,#8e0000 0%,#380000 100%)"}[t]};
      border:1px solid rgba(255,255,255,${t==="idle"?.18:.4});
      border-radius:5px;
      display:flex;align-items:center;justify-content:center;
      color:#fff;font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;font-size:11px;font-weight:800;
      text-transform:uppercase;letter-spacing:0.5px;
      opacity:${o?.35:1};
    ">${e}</div>
  `}function rt(e,t,o){e.innerHTML=`
    <div style="display:flex;flex-direction:column;gap:6px;width:100%;
                background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.15);
                border-radius:6px;padding:8px;box-sizing:border-box;">
      ${go(t.label,t.state,t.dim)}
      ${go(o.label,o.state,o.dim)}
    </div>
  `}const ra={id:"cs-controller",title:"Controller with Feedback",game:"Card Sharks",usedIn:["Card Sharks","Match Game"],description:'Higher / Lower picker buttons. The player locks one option (blue gradient), then on reveal the correct option turns green ("Correct!") and the wrong pick turns red ("Incorrect!"). The unpicked option dims to 35 % once the round resolves.',defaults:{duration:200,easingId:"ease"},frames:[{label:"Idle",sublabel:"no pick yet · both neutral",render:e=>rt(e,{state:"idle",label:"Higher",dim:!1},{state:"idle",label:"Lower",dim:!1})},{label:"Locked",sublabel:"player picked Higher · blue",render:e=>rt(e,{state:"locked",label:"Higher",dim:!1},{state:"idle",label:"Lower",dim:!1})},{label:"Correct",sublabel:"reveal · pick was right",render:e=>rt(e,{state:"correct",label:"Correct!",dim:!1},{state:"idle",label:"Lower",dim:!0})},{label:"Wrong",sublabel:"reveal · pick was wrong",render:e=>rt(e,{state:"idle",label:"Higher",dim:!0},{state:"wrong",label:"Incorrect!",dim:!1})}],render(e){return b("css-cs-controller",sa),At=0,e.innerHTML=`
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
    `,Oe=e.querySelector(".preview-hl"),[De,Ge]=Array.from(e.querySelectorAll(".preview-hl-btn")),()=>{e.innerHTML="",Oe=De=Ge=null}},play({duration:e}){if(!Oe)return;const t=ho[At%ho.length];At++,Oe.style.setProperty("--hl-duration",`${e}ms`),Oe.classList.toggle("is-resolved",t.resolved),De&&(De.style.transition=`background ${e}ms ease, border-color ${e}ms ease, opacity ${e}ms ease`),Ge&&(Ge.style.transition=`background ${e}ms ease, border-color ${e}ms ease, opacity ${e}ms ease`),uo(De,"up",t.higher),uo(Ge,"down",t.lower)},snippets({duration:e}){const t=(e/1e3).toFixed(2);return{web:`/* HigherLowerButtons.css */
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
  · The same component is reused in Match Game match-up rounds with different labels — visuals and timings must match exactly.`}},na=`
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
`;let le=null;function mo(e,t,o,a,i){e.innerHTML=`
    <div style="
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      border-radius:6px;padding:8px 10px;
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;color:#fff;font-size:11px;line-height:1.4;
      transform:translate(${t}px, ${o}px) scale(${a});
      opacity:${i};
      max-width:140px;
    ">Use ▲ / ▼ to make your selections.</div>
  `}const la={id:"cs-info-note",title:"Info Note",game:"Card Sharks",description:"Persistent D-pad helper that lives in the bottom-left of the player screen. Black-glass card with two-line text and inline white key-cap glyphs for ↑ / ↓ that mirror the Higher/Lower buttons. Slides up-and-right into place on mount and then stays static.",defaults:{duration:420,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · translate −30,−16 · scale .96",render:e=>{e.innerHTML='<div class="frame-ghost">hidden · off-position</div>'}},{label:"Mid",sublabel:"50% · translate −15,−8 · scale .98",render:e=>mo(e,-15,-8,.98,.5)},{label:"Settled",sublabel:"100% · translate 0,0 · scale 1",render:e=>mo(e,0,0,1,1)}],render(e){return b("css-cs-info-note",na),e.innerHTML=`
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
    `,le=e.querySelector(".preview-hl-note"),()=>{e.innerHTML="",le=null}},play({duration:e,easing:t}){le&&(le.classList.remove("is-shown"),le.style.animation="none",le.style.opacity="0",le.offsetWidth,le.style.animation=`cs-stage-in ${e}ms ${$(t.bezier)} forwards`)},snippets({duration:e,easing:t}){const[o,a,i,s]=t.bezier,r=(e/1e3).toFixed(2);return{web:`/* HigherLowerNote.css + CardSharksOverlay.css */
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
  animation: cs-stage-in ${e}ms ${$(t.bezier)} backwards;
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.*
import androidx.compose.animation.core.*

@Composable
fun HigherLowerNote(visible: Boolean) {
    val easing = CubicBezierEasing(${o.toFixed(2)}f, ${a.toFixed(2)}f, ${i.toFixed(2)}f, ${s.toFixed(2)}f)
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
            .timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${r}),
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
    <Animation id="slideIn" duration="${r}" easeFunction="outBack" repeat="false">
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
  · When dismissed, just remove from the tree — do not play an exit animation.`}},ca=`
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
`,nt=["♥ 7","♦ Q","♠ 3","♣ A","♥ J"];let Z=null,lt=0;function It(e,t,o,a,i,s){e.innerHTML=`
    <div style="
      width:50px;height:72px;border-radius:6px;border:2px solid #fff;
      background:linear-gradient(135deg,#f5f5f5 0%,#e0e0e0 100%);
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      font-family:Georgia,serif;color:#b91c1c;font-weight:700;
      transform:translate(${t}px, ${o}px) rotate(${a}deg) scale(${i});
      opacity:${s};
      box-shadow:0 8px 18px rgba(0,0,0,0.45);
    ">
      <div style="font-size:24px;line-height:1;">Q</div>
      <div style="font-size:18px;line-height:1;margin-top:2px;">♦</div>
    </div>
  `}const da={id:"cs-card",title:"Card component",game:"Card Sharks",description:"When a new question shows up, the next playing card flies in from off-screen top-left, rotating into place with a slight overshoot. The card lands flat and stays put until the next question.",defaults:{duration:620,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · translate −60,−30 · rot −26° · scale .42",render:e=>{e.innerHTML='<div class="frame-ghost">hidden · off-screen</div>'}},{label:"Mid",sublabel:"55% · in motion · opacity reaches 1",render:e=>It(e,-25,-10,-12,.7,1)},{label:"Overshoot",sublabel:"78% · translate 0,+8 · rot +3° · scale 1.04",render:e=>It(e,0,8,3,1.04,1)},{label:"Settled",sublabel:"100% · translate 0,0 · rot 0 · scale 1",render:e=>It(e,0,0,0,1,1)}],render(e){return b("css-cs-card",ca),lt=0,e.innerHTML=`
      <div class="preview-cs-card-stage">
        <div class="preview-cs-card">
          <div class="preview-cs-card__rank">${nt[0][2]}</div>
          <div class="preview-cs-card__suit">${nt[0][0]}</div>
        </div>
      </div>
    `,Z=e.querySelector(".preview-cs-card"),()=>{e.innerHTML="",Z=null}},play({duration:e}){if(!Z)return;lt=(lt+1)%nt.length;const t=nt[lt],o=Z.querySelector(".preview-cs-card__rank"),a=Z.querySelector(".preview-cs-card__suit");o&&(o.textContent=t[2]),a&&(a.textContent=t[0]),Z.classList.remove("is-flying"),Z.style.animation="none",Z.offsetWidth,Z.classList.add("is-flying"),Z.style.animation=`cs-card-fly-in ${e}ms cubic-bezier(0.18, 0.89, 0.32, 1.18) both`},snippets({duration:e,easing:t}){const[o,a,i,s]=t.bezier,r=(e/1e3).toFixed(2);return{web:`/* CardSharksOverlay.css */
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
        withAnimation(.timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${r} * 0.78)) {
            stage = 1
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + ${r} * 0.78) {
            withAnimation(.easeOut(duration: ${r} * 0.22)) { stage = 2 }
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
    <Animation id="fly" duration="${r}" easeFunction="outBack" repeat="false">
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
  · No idle motion after the animation completes.`}};function Mo(e){switch(e.id){case"linear":return{name:"linear",note:""};case"ease":return{name:"inOutQuad",note:"Closest match to CSS ease."};case"ease-out":return{name:"outQuad",note:"Closest match to CSS ease-out."};case"ease-in":return{name:"inQuad",note:"Closest match to CSS ease-in."};case"ease-in-out":return{name:"inOutQuad",note:""};case"back-out":return{name:"outBack",note:"Built-in overshoot curve."};case"material":return{name:"inOutQuad",note:"Material standard ≈ inOutQuad."};case"glide":return{name:"outCubic",note:"Glide (0.3, 0.9, 0.3, 1) ≈ outCubic."};default:return{name:"inOutQuad",note:"Custom cubic-bezier — use FloatFieldInterpolator with hand-tuned key points if precision matters."}}}const v={ink:"#0c1240",gold:"#CAA512",goldHi:"#ffc928",lav:"#7b7fd6",win:"#8CFF4F",miss:"#FF0000",chipBg:"linear-gradient(0deg,#EDF3FE 0%,#ACCAEB 100%)",font:"'Rubik', 'Helvetica Neue', Arial, sans-serif"},Qe=`
.preview-si-board {
  position: relative;
  background: radial-gradient(120% 140% at 50% 0%, #1b2a7a 0%, #0a1033 60%, #060b24 100%);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  overflow: hidden;
  font-family: ${v.font};
}
/* Stacked - option, 14283:40589: radius 32 on a 1920 board, which is 1.67% of
   the width -- not a pill, which is what 999px made it. The preview boards are
   drawn at a fixed pixel width, so this is that fraction of it. */
.preview-si-chip {
  position: absolute;
  box-sizing: border-box;
  display: flex; align-items: center; justify-content: center;
  border-radius: 20px;
  background: ${v.chipBg};
  border: 2px solid #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.4);
  color: ${v.ink};
  font-weight: 600; font-size: 13px; letter-spacing: .02em; text-transform: uppercase;
  white-space: nowrap;
}
.preview-si-chip.is-focus {
  border: 3px solid ${v.gold};
  box-shadow: 0 0 12px rgba(255,200,0,0.4), 0 3px 6px rgba(0,0,0,0.4);
  z-index: 4;
}
.preview-si-ghost {
  position: absolute;
  box-sizing: border-box;
  border-radius: 20px;
  border: 2px dashed rgba(163,168,204,0.6);
}
`;function ue(e,t){const o=t.focus?`3px solid ${v.gold}`:"2px solid #fff",a=t.focus?"0 0 10px rgba(255,200,0,0.45),":"";e.innerHTML=`
    <div style="
      width:130px;height:30px;box-sizing:border-box;
      display:flex;align-items:center;justify-content:center;
      border-radius:20px;background:${v.chipBg};border:${o};
      box-shadow:${a}0 2px 4px rgba(0,0,0,0.4);
      color:${v.ink};font-family:${v.font};font-weight:600;
      font-size:${t.fontSize??10}px;letter-spacing:.02em;text-transform:uppercase;
      transform:scale(${t.scale??1});
      ${t.extra??""}
    ">${t.text}</div>
  `}const pa=`
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
`,Bo=[20,78,136,194],fo={left:24,top:104,width:160,height:40},ha={left:300,top:Bo[0],width:196,height:44};let V=null,Ne=null,Ut=[];function bo(){Ut.forEach(clearTimeout),Ut=[]}function Mt(e,t){Object.assign(e.style,{left:`${t.left}px`,top:`${t.top}px`,width:`${t.width}px`,height:`${t.height}px`})}const ua={id:"si-chip-place",title:"Answer → Slot",game:"Stack It",description:"Pressing OK on an answer chip glides it from the answer tray into the first free slot of the stack. The chip morphs to the slot size on the way, keeps the gold ring while the player chooses a slot, and a dashed ghost marks the spot it left. When five answers are placed, the sixth fills the last slot automatically after 450 ms.",defaults:{duration:450,easingId:"glide"},frames:[{label:"Picked",sublabel:"0% · in tray · gold ring",render:e=>ue(e,{text:"Guitar",focus:!0})},{label:"Gliding",sublabel:"~40% · ~85% of the way (glide)",render:e=>ue(e,{text:"Guitar",focus:!0,extra:"width:150px;transform:translateX(10px)"})},{label:"In slot",sublabel:"100% · slot size · font 13 → 14px",render:e=>ue(e,{text:"Guitar",focus:!0,fontSize:11,extra:"width:160px"})},{label:"Locked",sublabel:"OK · ring → white · 200 ms",render:e=>ue(e,{text:"Guitar",fontSize:11,extra:"width:160px"})}],render(e){return b("css-si-base",Qe),b("css-si-chip-place",pa),e.innerHTML=`
      <div class="preview-si-board preview-si-place">
        ${Bo.map(t=>`<div class="preview-si-place__slot" style="top:${t}px"></div>`).join("")}
        <div class="preview-si-ghost"></div>
        <div class="preview-si-chip is-focus">Guitar</div>
      </div>
    `,V=e.querySelector(".preview-si-chip"),Ne=e.querySelector(".preview-si-ghost"),V&&Mt(V,fo),()=>{bo(),e.innerHTML="",V=null,Ne=null}},play({duration:e,easing:t}){if(!V||!Ne)return;bo();const o=$(t.bezier);V.style.transition="none",V.classList.add("is-focus"),V.classList.remove("is-in-slot"),Ne.style.opacity="0",Mt(V,fo),V.offsetWidth,V.style.transition=`left ${e}ms ${o}, top ${e}ms ${o}, width ${e}ms ease, height ${e}ms ease, font-size 200ms, border-color 200ms, box-shadow 200ms`,Mt(V,ha),V.classList.add("is-in-slot"),Ne.style.opacity="1",Ut.push(window.setTimeout(()=>V==null?void 0:V.classList.remove("is-focus"),e+500))},snippets({duration:e,easing:t}){const[o,a,i,s]=t.bezier,r=(e/1e3).toFixed(2),l=$(t.bezier),n=Mo(t);return{web:`/* StackItOverlay.css
   Chips are absolutely positioned; JS writes left/top/width/height in % of
   the 16:9 stage (tray cell or slot rect). The transition does the glide. */
.si-chip {
  position: absolute;
  border-radius: 1.667cqw;
  background: linear-gradient(0deg, #EDF3FE 0%, #ACCAEB 100%);
  border: .21cqw solid #fff;
  font-size: 1.2cqw;
  transition:
    left   ${e}ms ${l},
    top    ${e}ms ${l},
    width  ${e}ms ease,
    height ${e}ms ease,
    transform .2s, border-color .2s, box-shadow .2s, font-size .2s;
}
.si-chip--in-slot { font-size: 1.3cqw; }
.si-chip--moving  { border: .42cqw solid ${v.gold}; box-shadow: 0 0 .94cqw #fff60099, 0 .25cqw .5cqw #0006; z-index: 4; }

/* Dashed outline left behind in the tray */
.si-ghost { border: .21cqw dashed #a3a8cc99; border-radius: 1.667cqw; transition: opacity .2s; }

@media (prefers-reduced-motion: reduce) { .si-chip { transition: none; } }`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.ui.unit.*

@Composable
fun StackChip(text: String, target: DpRect, moving: Boolean) {
    val glide = CubicBezierEasing(${o}f, ${a}f, ${i}f, ${s}f)
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
            .animation(.timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${r}), value: frame)
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
    <Animation id="glide" duration="${r}" easeFunction="${n.name}" repeat="false">
      <Vector2DFieldInterpolator id="move" fieldToInterp="m.top.translation" key="[ 0, 1 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    ' ${n.note||"Easing matches the catalog preset."}
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
  · Reduced-motion setting: chips jump instantly.`}},ga=`
.preview-si-focus { width: 520px; height: 296px; }
.preview-si-focus .preview-si-chip { left: 150px; width: 220px; height: 42px; }
.preview-si-focus .preview-si-chip.is-big { transform: scale(1.09); font-size: 17px; z-index: 5; }
.preview-si-arrows {
  position: absolute; left: 384px; width: 20px; height: 38px;
  display: flex; flex-direction: column; justify-content: space-between; align-items: center;
}
.preview-si-arrows[hidden] { display: none; }
.preview-si-arrows i { width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; }
.preview-si-arrows i.up { border-bottom: 11px solid ${v.goldHi}; }
.preview-si-arrows i.dn { border-top: 11px solid ${v.goldHi}; }
.preview-si-arrows i.up.off { border-bottom-color: ${v.lav}; }
.preview-si-arrows i.dn.off { border-top-color: ${v.lav}; }
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
`,Ue=[18,70,122,174],vo=["Guitar","Piano/Keyboard","Violin/Fiddle","Trumpet"],Bt=450,ma=300,fa="cubic-bezier(0.3, 0.9, 0.3, 1)";let R=[],E=null,kt=null,Wt=[];function yo(){Wt.forEach(clearTimeout),Wt=[]}function ct(e,t){kt&&(kt.innerHTML=`<span>${e}</span><span class="preview-si-key">▲</span><span class="preview-si-key">▼</span><span>${t}</span><span class="preview-si-key">Ok</span>`)}const ba={id:"si-focus",title:"Focus & Pick Up",game:"Stack It",description:'Remote focus on a chip. In the tray, focus is a gold ring with a soft glow. Once the stack is full, the focused block also grows to 109 % so it reads as "selectable". Pressing OK picks the block up: it shrinks back to 100 %, keeps the ring, and ▲ ▼ arrows appear next to it and travel with it. OK again drops the block: the arrows disappear and it grows back to the focused size.',defaults:{duration:200,easingId:"ease"},frames:[{label:"Idle",sublabel:"white 2px border",render:e=>ue(e,{text:"Harp"})},{label:"Focus",sublabel:"tray · gold ring + glow",render:e=>ue(e,{text:"Harp",focus:!0})},{label:"Focus (stack)",sublabel:"scale 1.09 · font 13 → 17px",render:e=>ue(e,{text:"Harp",focus:!0,scale:1.09,fontSize:12})},{label:"Picked up",sublabel:"scale 1 · ring stays · ▲▼ shown",render:e=>ue(e,{text:"Harp ▴▾",focus:!0})}],render(e){return b("css-si-base",Qe),b("css-si-focus",ga),e.innerHTML=`
      <div class="preview-si-board preview-si-focus">
        ${vo.map((t,o)=>`<div class="preview-si-chip" style="top:${Ue[o]}px">${t}</div>`).join("")}
        <div class="preview-si-arrows" hidden><i class="up"></i><i class="dn"></i></div>
        <div class="preview-si-hint"></div>
      </div>
    `,R=Array.from(e.querySelectorAll(".preview-si-chip")),E=e.querySelector(".preview-si-arrows"),kt=e.querySelector(".preview-si-hint"),R[0].classList.add("is-focus","is-big"),ct("Choose a block","OK pick it up"),()=>{yo(),e.innerHTML="",R=[],E=null,kt=null}},play({duration:e,easing:t}){if(!R.length||!E)return;yo();const o=$(t.bezier),a=vo.map((c,d)=>d);let i=1;const s=()=>{a.forEach((c,d)=>{R[c].style.top=`${Ue[d]}px`}),E&&(E.style.top=`${Ue[i]+2}px`,E.children[0].classList.toggle("off",i<=0),E.children[1].classList.toggle("off",i>=Ue.length-1))};R.forEach(c=>{c.style.transition="none",c.classList.remove("is-focus","is-big")}),E.style.transition="none",R[0].classList.add("is-focus","is-big"),E.hidden=!0,s(),ct("Choose a block","OK pick it up"),R[0].offsetWidth,R.forEach(c=>{c.style.transition=[...["transform","border-color","box-shadow","font-size"].map(d=>`${d} ${e}ms ${o}`),`top ${Bt}ms ${fa}`].join(", ")}),E.style.transition=`top ${ma}ms ease`;let r=150;const l=(c,d)=>{r+=c,Wt.push(window.setTimeout(d,r))};l(0,()=>{R[0].classList.remove("is-focus","is-big"),R[1].classList.add("is-focus","is-big")}),l(e+700,()=>{R[a[i]].classList.remove("is-big"),s(),E&&(E.hidden=!1),ct("Move","OK drop")});const n=()=>{i>=Ue.length-1||([a[i],a[i+1]]=[a[i+1],a[i]],i+=1,s())};l(900,n),l(Bt+350,n),l(Bt+600,()=>{E&&(E.hidden=!0),R[a[i]].classList.add("is-big"),ct("Choose a block","OK pick it up")})},snippets({duration:e,easing:t}){const[o,a,i,s]=t.bezier,r=(e/1e3).toFixed(2),l=$(t.bezier);return{web:`/* StackItOverlay.css */
.si-chip {
  border: .2cqw solid #fff;
  transition: transform ${e}ms ${l}, border-color ${e}ms ${l},
              box-shadow ${e}ms ${l}, font-size ${e}ms ${l};
}

/* Remote focus (tray) and picked-up block (stack) share the gold ring */
.si-chip--focus,
.si-chip--moving {
  border: .32cqw solid ${v.gold};
  box-shadow: 0 0 1.2cqw #ffc80066, 0 .25cqw .5cqw #0006;
  z-index: 4;
}

/* Focus while the stack is full ("Choose a block") */
.si-chip--big { transform: scale(1.09); font-size: 1.55cqw; z-index: 5; }

/* ▲ ▼ next to the picked-up block; lavender when that direction is blocked */
.si-arrows      { transition: top .3s; }
.si-arrows .up  { border-bottom: 1.1cqw solid ${v.goldHi}; }
.si-arrows .dn  { border-top:    1.1cqw solid ${v.goldHi}; }
.si-arrows .up.off { border-bottom-color: ${v.lav}; }
.si-arrows .dn.off { border-top-color:    ${v.lav}; }`,android:`// Jetpack Compose — Android TV
@Composable
fun StackBlock(text: String, focused: Boolean, stackFull: Boolean, pickedUp: Boolean) {
    val easing = CubicBezierEasing(${o}f, ${a}f, ${i}f, ${s}f)
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
            .animation(.timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${r}), value: focused)
            .animation(.timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${r}), value: pickedUp)
    }
}`,roku:`<!-- Roku SceneGraph — components/StackBlock.xml -->
<component name="StackBlock" extends="Group">
  <interface>
    <field id="state" type="string" onChange="onStateChange" /> <!-- idle | focus | big | picked -->
  </interface>
  <children>
    <Poster id="ring" uri="pkg:/images/chip_ring_gold.png" opacity="0" />
    <Poster id="bg"   uri="pkg:/images/chip_9patch.png" />
    <Animation id="anim" duration="${r}" easeFunction="inOutQuad">
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
  · Back while a block is picked up restores the stack order from before the pick-up.`}},va=`
.preview-si-reorder { width: 520px; height: 236px; }
.preview-si-reorder .preview-si-chip { left: 150px; width: 220px; height: 42px; }
.preview-si-reorder .preview-si-arrows {
  position: absolute; left: 384px; width: 20px; height: 38px;
  display: flex; flex-direction: column; justify-content: space-between; align-items: center;
}
.preview-si-reorder .preview-si-arrows i { width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; }
.preview-si-reorder .preview-si-arrows i.up { border-bottom: 11px solid ${v.goldHi}; }
.preview-si-reorder .preview-si-arrows i.dn { border-top: 11px solid ${v.goldHi}; }
.preview-si-reorder .preview-si-arrows i.up.off { border-bottom-color: ${v.lav}; }
.preview-si-reorder .preview-si-arrows i.dn.off { border-top-color: ${v.lav}; }
`,yt=[20,72,124,176],Et=["Harp","Guitar","Trumpet","Bagpipes"],wo=300/450;let _e=[],K=null,ge=[],X=0,qt=[];function xo(){qt.forEach(clearTimeout),qt=[]}function Zt(){ge.forEach((e,t)=>{_e[e].style.top=`${yt[t]}px`}),_e.forEach((e,t)=>e.classList.toggle("is-focus",t===ge[X])),K&&(K.style.top=`${yt[X]+2}px`,K.children[0].classList.toggle("off",X<=0),K.children[1].classList.toggle("off",X>=yt.length-1))}function ya(e){const t=X+e;t<0||t>=yt.length||([ge[X],ge[t]]=[ge[t],ge[X]],X=t,Zt())}function Rt(e,t,o){const a=(i,s,r)=>`
    <div style="
      position:absolute;left:10px;top:${s}px;width:120px;height:24px;box-sizing:border-box;
      display:flex;align-items:center;justify-content:center;border-radius:11px;
      background:${v.chipBg};border:${r?`2.5px solid ${v.gold}`:"1.5px solid #fff"};
      box-shadow:${r?"0 0 8px rgba(255,200,0,0.45),":""}0 2px 4px rgba(0,0,0,0.4);
      color:${v.ink};font-family:${v.font};font-weight:600;font-size:9px;text-transform:uppercase;
      z-index:${r?2:1};
    ">${i}</div>`;e.innerHTML=`
    <div style="position:relative;width:160px;height:58px;">
      ${a("Guitar",t[1],!1)}
      ${a("Harp",t[0],!0)}
      <div style="position:absolute;left:138px;top:${o}px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:7px solid ${v.goldHi};"></div>
      <div style="position:absolute;left:138px;top:${o+15}px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:7px solid ${v.goldHi};"></div>
    </div>`}const wa={id:"si-reorder",title:"Block Swap",game:"Stack It",description:"While the timer runs, the player can pick up a block and move it with ▲ ▼. Each press swaps the block with its neighbour: both blocks glide past each other at the same time, and the ▲ ▼ arrows follow a bit faster. An arrow turns lavender at the top or bottom of the stack.",defaults:{duration:450,easingId:"glide"},frames:[{label:"Picked up",sublabel:"slot 1 · gold ring · ▲▼",render:e=>Rt(e,[4,32],6)},{label:"Crossing",sublabel:"~40% · blocks pass each other",render:e=>Rt(e,[26,10],26)},{label:"Swapped",sublabel:"100% · slot 2 · arrows land at 67%",render:e=>Rt(e,[32,4],34)}],render(e){return b("css-si-base",Qe),b("css-si-reorder",va),e.innerHTML=`
      <div class="preview-si-board preview-si-reorder">
        ${Et.map(t=>`<div class="preview-si-chip">${t}</div>`).join("")}
        <div class="preview-si-arrows"><i class="up"></i><i class="dn"></i></div>
      </div>
    `,_e=Array.from(e.querySelectorAll(".preview-si-chip")),K=e.querySelector(".preview-si-arrows"),ge=Et.map((t,o)=>o),X=0,Zt(),()=>{xo(),e.innerHTML="",_e=[],K=null}},play({duration:e,easing:t}){if(!_e.length||!K)return;xo();const o=$(t.bezier);_e.forEach(i=>{i.style.transition="none"}),K.style.transition="none",ge=Et.map((i,s)=>s),X=0,Zt(),K.offsetWidth,_e.forEach(i=>{i.style.transition=`top ${e}ms ${o}, border-color 200ms, box-shadow 200ms`}),K.style.transition=`top ${Math.round(e*wo)}ms ease`;const a=e+350;[1,1,-1].forEach((i,s)=>{qt.push(window.setTimeout(()=>ya(i),150+s*a))})},snippets({duration:e,easing:t}){const[o,a,i,s]=t.bezier,r=(e/1e3).toFixed(2),l=Math.round(e*wo),n=$(t.bezier),c=Mo(t);return{web:`/* StackItOverlay.css
   Swap = exchange the two blocks' slot indices and re-write their "top".
   Both blocks transition at once, so they glide past each other. */
.si-chip {
  position: absolute;
  transition: top ${e}ms ${n}, left ${e}ms ${n},
              border-color .2s, box-shadow .2s;
}
.si-chip--moving { z-index: 4; } /* picked-up block passes over its neighbour */

.si-arrows { position: absolute; transition: top ${l}ms ease; }

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
    val glide = CubicBezierEasing(${o}f, ${a}f, ${i}f, ${s}f)
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
        val arrowY by animateDpAsState(slotTops[picked], tween(${l}), label = "arrows")
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
                .animation(.easeInOut(duration: ${(l/1e3).toFixed(2)}), value: picked)
        }
        .animation(.timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${r}), value: order)
    }
}`,roku:`' Roku SceneGraph — StackColumn.brs
' One Animation with two interpolators: picked block and its neighbour swap Y.
sub moveBlock(dir as integer)
  toSlot = m.sel + dir
  if toSlot < 0 or toSlot > 5 then return
  a = m.blocks[m.sel] : b = m.blocks[toSlot]
  m.blocks[m.sel] = b : m.blocks[toSlot] = a

  anim = createObject("roSGNode", "Animation")
  anim.duration = ${r}
  anim.easeFunction = "${c.name}"   ' ${c.note||"matches catalog preset"}
  anim.appendChild(slideTo(a, m.slotY[toSlot]))
  anim.appendChild(slideTo(b, m.slotY[m.sel]))
  m.top.appendChild(anim)
  anim.control = "start"

  m.sel = toSlot
  m.arrowAnim.duration = ${(l/1e3).toFixed(2)}
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
  · When the timer hits 0:00 during a move, the current order is what gets scored.`}},xa=`
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
  /* Stacked - Answer is radius 48 on a 116-tall cell -- 0.41 of its height, not
     a pill. These preview cells are 32 tall, so 13. */
  border-radius: 13px;
  font-weight: 600; font-size: 11px; letter-spacing: .02em; text-transform: uppercase; color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.45);
}
.preview-si-results__cell.su,
.preview-si-results__cell.key {
  border: 2px solid rgba(255,255,255,0.55);
  background: rgba(30,44,140,0.75);
}
/* The show's own blocks lighten row by row. Six steps, so the column reads as
   a ladder -- flat tiles were the other half of "doesn't look like it". */
.preview-si-results__cell[data-row="0"] { background: #16205e; }
.preview-si-results__cell[data-row="1"] { background: #1d348f; }
.preview-si-results__cell[data-row="2"] { background: #2a56c8; }
.preview-si-results__cell[data-row="3"] { background: #3a74e0; }
.preview-si-results__cell[data-row="4"] { background: #5b96ec; }
.preview-si-results__cell[data-row="5"] { background: #7fb4f3; }
.preview-si-results__cell.mine[data-row] { background: var(--gradient-tv-background-stacked); }
/* Su's rows are ringed too -- outline only, no fill, because the block itself
   is in the show video and we draw over it. Green on a match, red on a miss,
   the same rule our own column follows. */
.preview-si-results__cell.su.match { border-color: ${v.win}; box-shadow: 0 0 10px #8CFF4F66; }
.preview-si-results__cell.su.miss  { border-color: ${v.miss}; box-shadow: 0 0 10px #FF000066; }
/* Our blocks are TV/Background/Stacked -- a light gradient with DARK text --
   not a flat blue. Figma fills every Stacked - Answer with it. */
.preview-si-results__cell.mine {
  background: var(--gradient-tv-background-stacked);
  color: ${v.ink}; text-shadow: none; border: 4px solid #fff; }
.preview-si-results__cell.mine.hide  { opacity: 0; transform: translateX(-20px); }
.preview-si-results__cell.mine.match { border-color: ${v.win}; box-shadow: 0 0 10px #8CFF4F66; }
.preview-si-results__cell.mine.miss  { border-color: ${v.miss}; box-shadow: 0 0 10px #FF000066; }
.preview-si-results__count {
  position: absolute; left: 50%; top: 298px; transform: translateX(-50%);
  font-weight: 700; font-size: 15px; letter-spacing: .02em; text-transform: uppercase; color: #fff;
  white-space: nowrap; opacity: 0;
}
.preview-si-results__count b { color: #f2c230; }
`,Pe=["Bagpipes","Harp","Trumpet","Violin/Fiddle","Piano/Keyboard","Guitar"],oo=["Harp","Bagpipes","Trumpet","Violin/Fiddle","Guitar","Piano/Keyboard"],Ye=["Bagpipes","Piano/Keyboard","Harp","Guitar","Trumpet","Violin/Fiddle"],Eo=Ye.filter((e,t)=>e===Pe[t]).length,Le={mine:16,key:210,su:404},Ro=oo.map((e,t)=>e===Pe[t]),ka=e=>44+e*41,w={screenFade:500,mineStart:700,stagger:350,step:350,countFade:400};let ce=null,Ve=[],de=null,_t=[];function ko(){_t.forEach(clearTimeout),_t=[]}function dt(e,t){const o=(i,s,r,l="",n="#fff")=>`
    <div style="height:12px;border-radius:5px;background:${i};border:${s};box-sizing:border-box;
      font:600 6px ${v.font};color:${n};display:flex;align-items:center;justify-content:center;text-transform:uppercase;${l}">${r}</div>`,a=[0,1,2].map(i=>{const s=i<t.mine,r=s?`1.5px solid ${Ye[i]===Pe[i]?v.win:v.miss}`:"1.5px solid #fff",l=`1.5px solid ${Ro[i]?v.win:v.miss}`;return`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;">
      ${o(v.chipBg,r,Ye[i],s?"":"opacity:0;transform:translateX(-6px);",v.ink)}
      ${o("rgba(30,44,140,0.75)","1.5px solid transparent",Pe[i],"opacity:.45;")}
      ${o("rgba(30,44,140,0.75)",l,oo[i],"opacity:.45;")}
    </div>`}).join("");e.innerHTML=`
    <div style="width:170px;display:flex;flex-direction:column;gap:3px;opacity:${t.screen};">
      ${a}
      <div style="font:700 7px ${v.font};color:#fff;text-align:center;text-transform:uppercase;opacity:${t.count?1:0};">
        <b style="color:#f2c230">${Eo} of 6</b> in the right spot</div>
    </div>`}const _a={id:"si-results-reveal",title:"Results Reveal",game:"Stack It",description:'At 0:00 the results screen fades in. YOUR STACK is the LEFT column — it moved there from the right (Figma 14010:45827, read 2026-10-14). Row by row, top to bottom, the player’s blocks slide in from the left with a green (right slot) or red (wrong slot) ring. The correct stack and Su’s blocks come from the show video, but ALL SIX rings on Su’s column are ours — green on a match, red on a miss — drawn over it as an outline with no fill. The "N of 6 in the right spot" line fades in last.',defaults:{duration:350,easingId:"ease"},slowFactor:3,frames:[{label:"Fade in",sublabel:"0–500 ms · screen opacity 0 → 1",render:e=>dt(e,{screen:.5,mine:0,count:!1})},{label:"Row 1",sublabel:"700 ms · slide in + ring",render:e=>dt(e,{screen:1,mine:1,count:!1})},{label:"Cascade",sublabel:"+350 ms per row",render:e=>dt(e,{screen:1,mine:2,count:!1})},{label:"Count",sublabel:"2800 ms · score line fades in",render:e=>dt(e,{screen:1,mine:3,count:!0})}],render(e){b("css-si-base",Qe),b("css-si-results",xa);const t=(o,a,i,s)=>i.map((r,l)=>`<div class="preview-si-results__cell ${o}${s?s[l]?" match":" miss":""}" data-row="${l}" style="left:${a}px;top:${ka(l)}px">${r}</div>`).join("");return e.innerHTML=`
      <div class="preview-si-board preview-si-results">
        <div class="preview-si-results__screen">
          <div class="preview-si-results__show">
            <div class="preview-si-results__head" style="left:${Le.su}px">SU’S STACK</div>
            <div class="preview-si-results__head" style="left:${Le.key}px">CORRECT STACK</div>
            ${t("su",Le.su,oo,Ro)}
            ${t("key",Le.key,Pe)}
          </div>
          <div class="preview-si-results__head" style="left:${Le.mine}px">YOUR STACK</div>
          ${t("mine hide",Le.mine,Ye)}
          <div class="preview-si-results__count"><b>${Eo} of 6</b> in the right spot</div>
        </div>
      </div>
    `,ce=e.querySelector(".preview-si-results__screen"),Ve=Array.from(e.querySelectorAll(".preview-si-results__cell.mine")),de=e.querySelector(".preview-si-results__count"),()=>{ko(),e.innerHTML="",ce=null,Ve=[],de=null}},play({duration:e,easing:t}){if(!ce||!de)return;ko();const o=$(t.bezier),a=e/w.step,i=s=>Math.round(s*a);[ce,de,...Ve].forEach(s=>{s.style.transition="none"}),ce.style.opacity="0",de.style.opacity="0",Ve.forEach(s=>{s.classList.remove("match","miss"),s.classList.add("hide")}),ce.offsetWidth,ce.style.transition=`opacity ${i(w.screenFade)}ms ${o}`,de.style.transition=`opacity ${i(w.countFade)}ms ${o}`,Ve.forEach(s=>{s.style.transition=["opacity","transform","border-color","box-shadow"].map(r=>`${r} ${e}ms ${o}`).join(", ")}),ce.style.opacity="1",Ve.forEach((s,r)=>_t.push(window.setTimeout(()=>{s.classList.remove("hide"),s.classList.add(Ye[r]===Pe[r]?"match":"miss")},i(w.mineStart+r*w.stagger)))),_t.push(window.setTimeout(()=>{de&&(de.style.opacity="1")},i(w.mineStart+6*w.stagger)))},snippets({duration:e,easing:t}){const[o,a,i,s]=t.bezier,r=$(t.bezier),l=e/w.step,n=d=>Math.round(d*l),c=d=>(n(d)/1e3).toFixed(2);return{web:`/* StackItResults.css — YOUR STACK is ours and sits LEFT; Su's blocks come from
   the show video, but the green rings on her matching rows are ours. */
.si-screen        { opacity: 0; transition: opacity ${n(w.screenFade)}ms ${r}; pointer-events: none; }
.si-screen--show  { opacity: 1; pointer-events: auto; }

.si-mine          { background: ${v.chipBg}; color: ${v.ink}; text-shadow: none;
                    border: .63cqw solid #fff; border-radius: 2.5cqw;
                    transition: opacity ${e}ms ${r}, transform ${e}ms ${r},
                                border-color ${e}ms ${r}, box-shadow ${e}ms ${r}; }
.si-mine--hide    { opacity: 0; transform: translateX(-2cqw); }
.si-mine--match   { border-color: ${v.win};  box-shadow: 0 0 1cqw #8CFF4F66; }
.si-mine--miss    { border-color: ${v.miss}; box-shadow: 0 0 1cqw #FF000066; }

.si-su--match     { border: .63cqw solid ${v.win}; border-radius: 2.5cqw;
                    box-shadow: 0 0 1cqw #8CFF4F66; background: none; }

.si-count         { opacity: 0; transition: opacity ${n(w.countFade)}ms ${r}; }
.si-count--on     { opacity: 1; }

// StackItResults.ts — staggered reveal (synced to the show ringing Su's rows)
screen.classList.add('si-screen--show');
for (let r = 0; r < 6; r++) {
  later(() => {
    mine[r].classList.remove('si-mine--hide');
    if (yours[r]) mine[r].classList.add(yours[r] === key[r] ? 'si-mine--match' : 'si-mine--miss');
  }, ${n(w.mineStart)} + r * ${n(w.stagger)});
}
later(() => count.classList.add('si-count--on'), ${n(w.mineStart+6*w.stagger)});
later(showRoundComplete, ${n(w.mineStart+6*w.stagger)} + 3000);`,android:`// Jetpack Compose — Android TV
@Composable
fun YourStackReveal(key: List<String>, yours: List<String?>, onDone: () -> Unit) {
    val ez = CubicBezierEasing(${o}f, ${a}f, ${i}f, ${s}f)
    var elapsed by remember { mutableIntStateOf(-1) }
    LaunchedEffect(Unit) {
        val start = withFrameMillis { it }
        while (true) {
            elapsed = (withFrameMillis { it } - start).toInt()
            if (elapsed > ${n(w.mineStart+6*w.stagger)} + 3000) { onDone(); break }
        }
    }
    val screenAlpha by animateFloatAsState(if (elapsed >= 0) 1f else 0f, tween(${n(w.screenFade)}, easing = ez), label = "screen")
    Column(Modifier.alpha(screenAlpha)) {
        repeat(6) { r ->
            val on = elapsed >= ${n(w.mineStart)} + r * ${n(w.stagger)}
            val alpha by animateFloatAsState(if (on) 1f else 0f, tween(${e}, easing = ez), label = "a$r")
            val dx by animateDpAsState(if (on) 0.dp else (-24).dp, tween(${e}, easing = ez), label = "x$r")
            val ring by animateColorAsState(
                when { !on || yours[r] == null -> Color.White; yours[r] == key[r] -> Color(0xFF7BFF3C); else -> Color(0xFFFF2A2A) },
                tween(${e}, easing = ez), label = "r$r")
            YourBlock(yours[r] ?: "—", ring, Modifier.alpha(alpha).offset(x = dx))
        }
        val countAlpha by animateFloatAsState(
            if (elapsed >= ${n(w.mineStart+6*w.stagger)}) 1f else 0f, tween(${n(w.countFade)}), label = "count")
        CountLine(Modifier.alpha(countAlpha))
    }
}`,ios:`// SwiftUI — tvOS
struct YourStackReveal: View {
    let key: [String], yours: [String?]
    @State private var shown = false
    @State private var rows = 0
    @State private var countOn = false
    private let curve = Animation.timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${c(w.step)})

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
            withAnimation(.timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${c(w.screenFade)})) { shown = true }
            for r in 0..<6 {
                after(${c(w.mineStart)} + Double(r) * ${c(w.stagger)}) { withAnimation(curve) { rows = r + 1 } }
            }
            after(${c(w.mineStart+6*w.stagger)}) { withAnimation(.easeInOut(duration: ${c(w.countFade)})) { countOn = true } }
        }
    }
    private func after(_ s: Double, _ f: @escaping () -> Void) {
        DispatchQueue.main.asyncAfter(deadline: .now() + s, execute: f)
    }
}`,roku:`' Roku SceneGraph — StackItResults.brs
' Only YOUR STACK is animated; Su's column is in the show video.
sub revealResults()
  m.top.findNode("screenFade").control = "start"     ' opacity 0 → 1, ${c(w.screenFade)} s
  for r = 0 to 5
    mine = m.mineRows[r]
    if m.yours[r] <> invalid then mine.findNode("ring").blendColor = ringColor(m.yours[r] = m.key[r])
    anim = slideFadeAnim(mine, 24, ${c(w.step)})   ' translation x +24 → 0, opacity 0 → 1
    anim.delay = ${c(w.mineStart)} + r * ${c(w.stagger)}
    anim.control = "start"
  end for
  countAnim = fadeAnim(m.top.findNode("count"), ${c(w.countFade)})
  countAnim.delay = ${c(w.mineStart+6*w.stagger)}
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
  · Reduced-motion setting: all rows appear at once with their rings.`}},ao="linear-gradient(90deg,#030308 0%,#030308 26%,#121a78 40%,#2a33dc 50%,#121a78 60%,#030308 74%,#030308 100%)",io="linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(170,210,255,0.55) 50%,rgba(255,255,255,0) 100%)",ye=500,A=200,xe=300,he=1100,Ae=2600,Ca=`
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
  background: ${ao};
  opacity: 0;
}
.preview-si-round__side { font-weight: 600; font-size: 14px; letter-spacing: .03em; text-transform: uppercase; }
.preview-si-round__side b { color: #f2c230; font-size: 19px; margin-left: 5px; }
.preview-si-round__side.r { text-align: right; }
.preview-si-round__mid { font-weight: 500; font-size: 24px; }
.preview-si-round__sweep { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.preview-si-round__sweep::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: -45%; width: 45%;
  background: ${io};
}
.preview-si-round__sweep.is-on::after {
  animation: si-round-sweep ${he}ms cubic-bezier(0.4, 0, 0.2, 1) var(--sweep-delay, ${xe}ms) both;
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
`;let we=null,Ie=null,Me=null;function We(e,t){const{mid:o="Round Complete!",round:a="1/3",score:i=4}=t;e.innerHTML=`
    <div style="
      position:relative;overflow:hidden;
      width:170px;height:30px;border-radius:4px;box-sizing:border-box;padding:0 6px;
      display:grid;grid-template-columns:1fr auto 1fr;align-items:center;
      font-family:'Roboto Condensed','Arial Narrow',sans-serif;color:#fff;
      background:${ao};
      transform:translateY(${t.y}px) scale(${t.scale});opacity:${t.opacity};
    ">
      <span style="font-size:7px;font-weight:600;text-transform:uppercase;">Round <b style="color:#f2c230">${a}</b></span>
      <span style="font-size:10px;font-weight:500;">${o}</span>
      <span style="font-size:7px;font-weight:600;text-transform:uppercase;text-align:right;">Score <b style="color:#f2c230">${i}</b></span>
      ${t.sweep!==null?`<div style="position:absolute;top:0;bottom:0;width:45%;left:${t.sweep}%;background:${io};"></div>`:""}
    </div>`}const $a={id:"si-round-complete",title:"Round Complete",game:"Stack It",description:'Three seconds after the results count appears, the Round Complete background fades over the results and the score bar drops in from above with a soft overshoot — the same banner motion as Family Feud. A light band sweeps across the bar once, then the bar keeps a slow brightness pulse. After the final round the centre reads "Game Complete!". The next round starts automatically after 6 s; OK skips ahead.',defaults:{duration:620,easingId:"ease-out"},frames:[{label:"Start",sublabel:"bg fade 500 ms · bar hidden",render:e=>We(e,{y:-14,scale:.94,opacity:.15,sweep:null})},{label:"Drop-in",sublabel:"+200 ms · translateY −40 → 0 · .94 → 1",render:e=>We(e,{y:-6,scale:.97,opacity:.6,sweep:null})},{label:"Sweep",sublabel:"+300 ms · light band 1100 ms",render:e=>We(e,{y:0,scale:1,opacity:1,sweep:30})},{label:"Idle",sublabel:"brightness pulse 2.6 s loop",render:e=>We(e,{y:0,scale:1,opacity:1,sweep:null})},{label:"Final",sublabel:"round 3 · no auto-advance",render:e=>We(e,{y:0,scale:1,opacity:1,sweep:null,mid:"Game Complete!",round:"3/3",score:39})}],render(e){return b("css-si-base",Qe),b("css-si-round",Ca),e.innerHTML=`
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
    `,we=e.querySelector(".preview-si-round__screen"),Ie=e.querySelector(".preview-si-round__bar"),Me=e.querySelector(".preview-si-round__sweep"),()=>{e.innerHTML="",we=null,Ie=null,Me=null}},play({duration:e,easing:t}){if(!we||!Ie||!Me)return;const o=$(t.bezier);we.style.transition="none",we.style.opacity="0",Ie.style.animation="none",Me.classList.remove("is-on"),Ie.offsetWidth,we.style.transition=`opacity ${ye}ms ease`,we.style.opacity="1",Ie.style.animation=`si-round-in ${e}ms ${o} ${A}ms both, si-round-pulse ${Ae}ms ease-in-out ${A+e+he}ms infinite`,Me.style.setProperty("--sweep-delay",`${A+xe}ms`),Me.classList.add("is-on")},snippets({duration:e,easing:t}){const[o,a,i,s]=t.bezier,r=(e/1e3).toFixed(2),l=$(t.bezier),n=A+e+he;return{web:`/* StackItOverlay.css — Round Complete screen (banner motion shared with Family Feud) */
.si-screen {
  position: absolute; inset: 0; z-index: 10;
  opacity: 0; pointer-events: none;
  transition: opacity ${ye}ms;
}
.si-screen--show { opacity: 1; pointer-events: auto; }

.si-round-bar {
  position: absolute; left: 4.76%; width: 90%; top: 44%; height: 11.2%;
  border-radius: .9cqw; padding: 0 2.4cqw; overflow: hidden;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  font-family: "Roboto Condensed", "Arial Narrow", sans-serif; color: #fff;
  background: ${ao};
}
.si-screen--show .si-round-bar {
  animation:
    si-round-in    ${e}ms ${l} ${A}ms both,
    si-round-pulse ${Ae}ms ease-in-out ${n}ms infinite;
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
  background: ${io};
}
.si-screen--show .si-round-bar::after {
  animation: si-round-sweep ${he}ms cubic-bezier(0.4, 0, 0.2, 1) ${A+xe}ms both;
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
    val easing = CubicBezierEasing(${o}f, ${a}f, ${i}f, ${s}f)
    AnimatedVisibility(visible, enter = fadeIn(tween(${ye})), exit = fadeOut(tween(${ye}))) {
        Box(Modifier.fillMaxSize().paint(painterResource(R.drawable.si_round_bg), contentScale = ContentScale.FillBounds)) {
            val shown = remember { MutableTransitionState(false) }.apply { targetState = true }
            AnimatedVisibility(
                visibleState = shown,
                enter = slideInVertically(tween(${e}, ${A}, easing)) { -40 } +
                        scaleIn(tween(${e}, ${A}, easing), initialScale = 0.94f) +
                        fadeIn(tween(${e}, ${A}, easing))
            ) {
                // Sweep: gradient strip x −45% → 100%, ${he} ms, delay ${A+xe} ms.
                // Pulse: brightness 1 → 1.3 → 1, ${Ae} ms loop, starts at ${n} ms.
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
        .transition(.opacity.animation(.easeInOut(duration: ${(ye/1e3).toFixed(2)})))
        .onAppear {
            withAnimation(.timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${r}).delay(${(A/1e3).toFixed(2)})) { barIn = true }
            withAnimation(.timingCurve(0.4, 0, 0.2, 1, duration: ${(he/1e3).toFixed(2)}).delay(${((A+xe)/1e3).toFixed(2)})) { sweep = 1 }
            withAnimation(.easeInOut(duration: ${(Ae/2e3).toFixed(2)}).repeatForever(autoreverses: true).delay(${(n/1e3).toFixed(2)})) { pulse = 1.3 }
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
    <Animation id="fade" duration="${(ye/1e3).toFixed(2)}" easeFunction="inOutQuad">
      <FloatFieldInterpolator fieldToInterp="bg.opacity" key="[0, 1]" keyValue="[0, 1]" />
    </Animation>
    <Animation id="dropIn" duration="${r}" delay="${(A/1e3).toFixed(2)}" easeFunction="outBack">
      <Vector2DFieldInterpolator fieldToInterp="bar.translation" key="[0, 1]" keyValue="[[91, 435], [91, 475]]" />
      <Vector2DFieldInterpolator fieldToInterp="bar.scale" key="[0, 1]" keyValue="[[0.94, 0.94], [1, 1]]" />
      <FloatFieldInterpolator   fieldToInterp="bar.opacity" key="[0, 1]" keyValue="[0, 1]" />
    </Animation>
    <Animation id="sweep" duration="${(he/1e3).toFixed(2)}" delay="${((A+xe)/1e3).toFixed(2)}" easeFunction="inOutQuad">
      <Vector2DFieldInterpolator fieldToInterp="sweepStrip.translation" key="[0, 1]" keyValue="[[-780, 0], [1730, 0]]" />
    </Animation>
    <Animation id="pulse" duration="${(Ae/1e3).toFixed(1)}" delay="${(n/1e3).toFixed(2)}" easeFunction="inOutQuad" repeat="true">
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
  · Background fade: ${ye} ms.
  · Bar drop-in: 620 ms, ease-out, starts ${A} ms after the fade begins.
  · Sweep: ${he} ms, cubic-bezier(0.4, 0, 0.2, 1), ${xe} ms after the drop-in starts.
  · Pulse: ${Ae/1e3} s ease-in-out loop (brightness 1 → 1.3 → 1), after the sweep.
  · Auto-advance: 6000 ms after the screen appears.

Acceptance criteria:
  · Score shown is the running total including the round just finished.
  · Sweep plays exactly once per screen; pulse loops.
  · Pressing OK during the entrance advances right away — no double transitions.
  · Reduced-motion setting: plain fade, no drop / sweep / pulse.`}},Ta=`
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
`;let Be=null;const Sa={id:"wl-wrong-flash",title:"Wrong Flash",game:"Win/Lose",usedIn:["Card Sharks","Match Game"],description:"Full-screen red flash that briefly washes over the player view when the user picks the wrong answer. Single one-shot opacity ramp from 1 → 0, no movement.",defaults:{duration:600,easingId:"ease-out"},render(e){return b("css-wl-wrong-flash",Ta),e.innerHTML=`
      <div class="preview-cs-flash-stage">
        <div class="preview-cs-flash-stage__label">player view (mocked)</div>
        <div class="preview-cs-flash"></div>
      </div>
    `,Be=e.querySelector(".preview-cs-flash"),()=>{e.innerHTML="",Be=null}},play({duration:e,easing:t}){Be&&(Be.style.animation="none",Be.offsetWidth,Be.style.animation=`cs-flash ${e}ms ${$(t.bezier)} forwards`)},frames:[{label:"Idle",sublabel:"no overlay",render:e=>{e.innerHTML=`
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
        `}},{label:"Settled",sublabel:"100% · opacity 0",render:e=>{e.innerHTML='<div class="frame-ghost">overlay invisible</div>'}}],snippets({duration:e,easing:t}){const[o,a,i,s]=t.bezier,r=(e/1e3).toFixed(2);return{web:`/* CardSharksOverlay.css */
@keyframes cs-flash {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}

.cs-overlay__flash {
  position: absolute;
  inset: 0;
  background: rgba(220, 30, 30, 0.4);
  animation: cs-flash ${e}ms ${$(t.bezier)} forwards;
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
        anim.animateTo(0f, tween(${e}, easing = CubicBezierEasing(${o.toFixed(2)}f, ${a.toFixed(2)}f, ${i.toFixed(2)}f, ${s.toFixed(2)}f)))
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
                withAnimation(.timingCurve(${o}, ${a}, ${i}, ${s}, duration: ${r})) {
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
    <Animation id="flashAnim" duration="${r}" easeFunction="outQuad" repeat="false">
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
  · Tonally subdued — strong enough to register peripherally, not aggressive.`}},Fa=40,_o=["#facc15","#22c55e","#3b82f6","#ec4899","#f97316","#a855f7","#06b6d4","#fb7185"],Ct=260,Ho=5e-4,Co=1800,Po="cubic-bezier(0.33, 0.67, 0.67, 1)",zo="cubic-bezier(0.33, 0, 0.67, 0.33)",Oo="cubic-bezier(0.2, 0.6, 0.4, 1)",La=`
.preview-confetti-stage {
  position: relative;
  width: 100%; height: ${Ct}px;
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
  animation: pc-drift calc(var(--tu) + var(--td)) ${Oo} var(--delay) both;
}
.preview-confetti__y {
  display: block;
  animation:
    pc-rise var(--tu) ${Po}   var(--delay) both,
    pc-fall var(--td) ${zo} calc(var(--delay) + var(--tu)) forwards;
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
`;function Va(e){const t=Ho/(e*e),o=[];for(let a=0;a<Fa;a++){const i=4+Math.random()*92,s=2+Math.random()*12,r=s/100*Ct,l=110+Math.random()*120,n=-Math.min(l,Ct-r-12),c=r+24,d=Math.sqrt(2*-n/t),f=Math.sqrt(2*(-n+c)/t),p=(i-50)*1.4+(Math.random()-.5)*90,m=5+Math.random()*4,C=a%3===0?"streamer":a%2===0?"rect":"square";o.push({left:i,bottom:s,delay:Math.random()*300*e,dx:p,peak:n,drop:c,tu:d,td:f,spin:(500+Math.random()*700)*e,dir:Math.random()<.5?1:-1,r0:Math.round(Math.random()*360),w:m,h:C==="rect"?m*1.6:C==="streamer"?m*2.4:m,color:_o[a%_o.length]})}return o}let pt=null;function Aa(e,t){e.innerHTML=Va(t).map(o=>`
    <span class="preview-confetti__p" style="
      left:${o.left}%; bottom:${o.bottom}%;
      --dx:${o.dx.toFixed(1)}px; --peak:${o.peak.toFixed(1)}px; --drop:${o.drop.toFixed(1)}px;
      --tu:${Math.round(o.tu)}ms; --td:${Math.round(o.td)}ms; --delay:${Math.round(o.delay)}ms;
      --spin:${Math.round(o.spin)}ms; --dir:${o.dir}; --r0:${o.r0}deg;
    "><span class="preview-confetti__y"><span class="preview-confetti__s" style="
      width:${o.w.toFixed(1)}px; height:${o.h.toFixed(1)}px; background:${o.color};
    "></span></span></span>`).join("")}function ht(e,t){e.innerHTML=`
    <div style="position:relative;width:100%;height:64px;background:linear-gradient(135deg,#1a1f2e 0%,#06080d 100%);border-radius:6px;overflow:hidden;">
      ${t.map(o=>`<span style="position:absolute;left:${o.l}%;bottom:${o.b}%;width:6px;height:10px;background:${o.c};border-radius:1px;transform:rotate(${o.r}deg);"></span>`).join("")}
    </div>
  `}const Ia={id:"wl-confetti-burst",title:"Confetti Burst",game:"Win/Lose",usedIn:["Card Sharks","Match Game"],description:"Celebratory confetti fired from the bottom of the screen on a correct answer. Each piece is tossed up, slows to a stop at its apex, then falls back down under gravity and leaves through the bottom edge while tumbling. Higher tosses hang in the air longer — rise and fall times follow t = √(2h / g).",defaults:{duration:1800,easingId:"ease-out"},slowFactor:2,render(e){return b("css-wl-confetti",La),e.innerHTML=`
      <div class="preview-confetti-stage">
        <div class="preview-confetti-stage__label">player view (mocked)</div>
        <div class="preview-confetti"></div>
      </div>
    `,pt=e.querySelector(".preview-confetti"),()=>{e.innerHTML="",pt=null}},play({duration:e}){pt&&Aa(pt,e/Co)},frames:[{label:"Spawn",sublabel:"0 ms · bottom edge · opacity 0 → 1",render:e=>ht(e,[{l:18,b:6,c:"#facc15",r:10},{l:34,b:10,c:"#22c55e",r:-20},{l:50,b:4,c:"#3b82f6",r:40},{l:66,b:8,c:"#ec4899",r:-60},{l:82,b:5,c:"#f97316",r:15}])},{label:"Rise",sublabel:"ease-out-quad · slowing down",render:e=>ht(e,[{l:14,b:48,c:"#facc15",r:90},{l:31,b:58,c:"#22c55e",r:-30},{l:50,b:40,c:"#3b82f6",r:180},{l:69,b:62,c:"#ec4899",r:-120},{l:86,b:44,c:"#f97316",r:60},{l:40,b:30,c:"#a855f7",r:-90}])},{label:"Apex",sublabel:"~45% · vertical speed 0",render:e=>ht(e,[{l:10,b:78,c:"#facc15",r:200},{l:28,b:86,c:"#22c55e",r:-150},{l:48,b:70,c:"#3b82f6",r:300},{l:72,b:88,c:"#ec4899",r:-260},{l:90,b:74,c:"#f97316",r:160},{l:38,b:64,c:"#a855f7",r:-210}])},{label:"Fall",sublabel:"ease-in-quad · gravity · exits bottom",render:e=>ht(e,[{l:6,b:34,c:"#facc15",r:320},{l:24,b:18,c:"#22c55e",r:-280},{l:46,b:4,c:"#3b82f6",r:420},{l:76,b:26,c:"#ec4899",r:-380},{l:94,b:10,c:"#f97316",r:300},{l:36,b:42,c:"#a855f7",r:-330}])}],snippets({duration:e}){const t=e/Co,o=Ho*1080/Ct/(t*t),a=Math.round(o*1e6);return{web:`/* ConfettiBurst.css
   Three nested spans so each axis has its own curve:
     .cf       — horizontal drift (ease-out, air drag)
     .cf__y    — rise (ease-out-quad) then gravity fall (ease-in-quad)
     .cf__spin — the visible piece, tumbling
   Per-particle values come from JS as CSS custom properties. */
.confetti-burst { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 60; }

.cf {
  position: absolute;
  animation: cf-drift calc(var(--tu) + var(--td)) ${Oo} var(--delay) both;
}
.cf__y {
  display: block;
  animation:
    cf-rise var(--tu) ${Po}   var(--delay) both,
    cf-fall var(--td) ${zo} calc(var(--delay) + var(--tu)) forwards;
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
const G = ${o.toFixed(5)};                      // px/ms² (~${a} px/s²)
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
    val g = ${a}f                                    // px/s²
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
    private let g: Double = ${a}                       // pt/s²
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
  g = ${a}                                   ' px/s²
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
  · No layout reflow; the layer does not block input.`}},jt=[jo,Ko,Qo,ea,oa,ia,ra,la,da,ua,ba,wa,_a,$a,Sa,Ia],Yt=[{id:"demo-stack-it",title:"Stack It — full overlay",section:"Demos",src:"demos/stack-it.html",description:"The whole game loop, playable: answer selection, the timed stacking phase, results and Round Complete. Self-contained build, no backend.",flow:{nodes:[{id:"pick",label:"Choose an answer",sub:"◀ ▶ ▲ ▼",col:0,row:0},{id:"place",label:"Place in a slot",sub:"▲ ▼ free slots",col:1,row:0},{id:"full",label:"Stack full",sub:"choose a block",col:2,row:0},{id:"move",label:"Block picked up",sub:"▲ ▼ move",col:3,row:0},{id:"results",label:"Results",sub:"Your stack revealed",col:2,row:1},{id:"round",label:"Round Complete",sub:"rounds 1–2",col:3,row:1},{id:"game",label:"Game Complete",sub:"after round 3",col:4,row:1}],edges:[{from:"pick",to:"place",label:"OK"},{from:"place",to:"pick",label:"OK lock · Back"},{from:"place",to:"full",label:"6th auto"},{from:"full",to:"move",label:"OK"},{from:"move",to:"full",label:"OK drop · Back"},{from:"full",to:"results",label:"0:00"},{from:"results",to:"round",label:"3 s · OK"},{from:"round",to:"pick",label:"6 s · OK — next round"},{from:"round",to:"game",label:"round 3"},{from:"game",to:"pick",label:"OK — new game"}]},controls:[{keys:"← → ↑ ↓",does:"Choose an answer"},{keys:"OK / Enter",does:"Move it to the first free slot from the top"},{keys:"↑ ↓ then OK",does:"Move it between free slots, then lock it"},{keys:"Back / Esc",does:"Return it to the list"},{keys:"↑ ↓ + OK",does:"Until the timer runs out: choose a block, OK picks it up, ↑ ↓ moves it, OK drops it"},{keys:"OK",does:"On results / Round Complete: skip ahead"}],actions:[{label:"End timer",run:e=>{var t;return(t=e.stackIt)==null?void 0:t.endTimer()}}],notes:["After the fifth answer the sixth fills the last slot on its own.","Scoring is 1 point per correct slot in round 1, 2 in round 2, 5 in the final — 10 / 20 / 50 for all six. The running score is on Round Complete.","The contestant's stack is placeholder data.","It already loads <strong>Rubik and Roboto Condensed</strong> — our two families, split the way we split them.","Its colours are its own and do not match the palette yet: <code>#030308</code> where ours is <code>#040810</code>, <code>#FF2A2A</code> where ours is <code>#FF0000</code>. That gap is the point of having it here."]},{id:"demo-tv-game-poc",title:"TV Game PoC — Family Feud, Card Sharks, Match Game",section:"Demos",src:"demos/tv-game-poc/index.html",description:"The original proof of concept: full episodes with video, the answer board, strikes and Fast Money. Most of the motion in this catalog was measured from here.",flow:{nodes:[{id:"splash",label:"Splash",sub:"2 s · loader",col:0,row:0},{id:"home",label:"Home",sub:"hero + rails",col:0,row:1},{id:"menu",label:"Menu",sub:"rail · ramp · ring",col:0,row:2},{id:"pages",label:"Search · Profile · Legal",sub:"menu pages",col:0,row:3},{id:"ff",label:"Family Feud",sub:"episode",col:1,row:0},{id:"ff-round",label:"Panel round",sub:"×4 · board + keyboard",col:2,row:0},{id:"ff-complete",label:"Round complete",sub:"Continue · Skip",col:3,row:0},{id:"ff-fm",label:"Fast Money",sub:"2 parts · 40 s a question",col:4,row:0},{id:"ff-end",label:"Match results",col:5,row:0},{id:"fm",label:"Fast Money",sub:"episode",col:1,row:1},{id:"fm-p1",label:"Part 1",sub:"5 questions",col:2,row:1},{id:"fm-p2",label:"Part 2",sub:"target 200",col:3,row:1},{id:"fm-end",label:"Match results",sub:"win · lose",col:4,row:1},{id:"cs",label:"Card Sharks",sub:"episode",col:1,row:2},{id:"cs-answer",label:"Higher or lower?",sub:"▲ Higher · ▼ Lower",col:2,row:2},{id:"cs-locked",label:"Locked",sub:"once only",col:3,row:2,state:!0},{id:"cs-result",label:"Result",sub:"3 s",col:4,row:2},{id:"cs-end",label:"End",sub:"Replay · Back",col:5,row:2},{id:"mg",label:"Match Game",sub:"episode",col:1,row:3},{id:"mg-panel",label:"Panel answer",sub:"keyboard · timer",col:2,row:3},{id:"mg-reveal",label:"Panel reveal",sub:"OK to continue",col:3,row:3},{id:"mg-matchup",label:"Match-up",sub:"▲ ▼ pick one",col:4,row:3},{id:"mg-end",label:"End",sub:"Replay · Back",col:5,row:3},{id:"mg2",label:"Match Game",sub:"Executive Edition",col:1,row:4},{id:"mg2-matchup",label:"Match-up",sub:"15 · 5 s to lock",col:2,row:4},{id:"mg2-end",label:"End",sub:"Replay · Back",col:3,row:4},{id:"pc",label:"The 1% Club",sub:"episode",col:1,row:5},{id:"pc-press",label:"Press OK",sub:"question open",col:2,row:5},{id:"pc-answer",label:"Answer",sub:"keyboard · choices",col:3,row:5},{id:"pc-locked",label:"Locked",sub:"or Time's up",col:4,row:5},{id:"pc-result",label:"Result",sub:"correct · incorrect",col:5,row:5}],edges:[{from:"splash",to:"home",label:"2 s"},{from:"home",to:"menu",label:"◀"},{from:"menu",to:"pages",label:"OK"},{from:"home",to:"ff",label:"OK"},{from:"home",to:"fm"},{from:"home",to:"cs"},{from:"home",to:"mg"},{from:"home",to:"mg2"},{from:"home",to:"pc"},{from:"ff",to:"ff-round",label:"1:19"},{from:"ff-round",to:"ff-complete",label:"all · ✕✕✕"},{from:"ff-complete",to:"ff-fm",label:"after 4"},{from:"ff-fm",to:"ff-end",label:"win · lose"},{from:"fm",to:"fm-p1",label:"0:35"},{from:"fm-p1",to:"fm-p2",label:"Continue"},{from:"fm-p2",to:"fm-end",label:"total"},{from:"cs",to:"cs-answer",label:"3:08"},{from:"cs-answer",to:"cs-locked",label:"▲ / ▼",dashed:!0},{from:"cs-locked",to:"cs-result",label:"time up"},{from:"cs-result",to:"cs-end",label:"×23"},{from:"mg",to:"mg-panel",label:"2:48"},{from:"mg-panel",to:"mg-reveal",label:"Submit"},{from:"mg-reveal",to:"mg-matchup",label:"OK"},{from:"mg-matchup",to:"mg-end",label:"×10"},{from:"mg2",to:"mg2-matchup",label:"0:25"},{from:"mg2-matchup",to:"mg2-end",label:"×15"},{from:"pc",to:"pc-press",label:"4:07"},{from:"pc-press",to:"pc-answer",label:"OK"},{from:"pc-answer",to:"pc-locked",label:"Submit"},{from:"pc-locked",to:"pc-result",label:"reveal"}]},controls:[{keys:"↑ ↓ ← →",does:"Navigate"},{keys:"Enter",does:"Select"},{keys:"Backspace",does:"Back"}],settings:[{key:"audio.videoVolume",label:"Video volume",min:0,max:1,step:.1,fallback:1,format:e=>`${Math.round(e*100)}%`},{key:"audio.sfxVolume",label:"Sound effects",min:0,max:1,step:.1,fallback:.5,format:e=>`${Math.round(e*100)}%`},{key:"playback.roundLeadInSeconds",label:"Round lead-in",min:0,max:15,step:1,fallback:10,format:e=>`${e}s`}],notes:["Built from <code>tv-game-poc</code> into this repository — <code>npm run demo:tv-game-poc</code>. Its own source is untouched.","It was built for a domain root, so it is rebuilt here with a base path; without that every asset 404s under a sub-path.","Video came through <strong>Vercel rewrites</strong> proxying CloudFront, which GitHub Pages cannot do. The six stream prefixes now point straight at CloudFront, which already answers cross-origin.","Three of those six are renamed on CloudFront — <code>/fastmoney/</code> is <code>/fast-money/</code>, <code>/matchgame/</code> is <code>/match-game/</code>, <code>/matchgameep2/</code> is <code>/match-game-andy/</code>. A prefix rule would have 404d.",`Its menu was the <strong>superseded mechanic</strong> — its own CSS said so: <em>"Width animation pushes content right (in flow)."</em> PTV-858 replaced that, so the PoC's SideMenu is <strong>replaced at build time by the catalog's Menu</strong>: same markup, Figma geometry, icons and motion, driven by the PoC's own keys. The rail stays 160 open or shut, the content never shifts, white is the selected page only and focus is the ring. <code>src/shared/menu-ptv858.css</code> holds the numbers both read.`,"It carries 49 MB of images, audio and episode content.","Opens on a 2 s splash with a loader, then the catalogue. The TV-simulation panel is dropped; its settings are the sliders here — they apply live. Sign In is web, not TV, and is shown separately — see <strong>Web — Sign In</strong>."]},{id:"demo-web-sign-in",title:"Web — Sign In",section:"Demos",src:"demos/tv-game-poc/index.html?view=web",description:"The web side of PlayAlong: Sign In and Reset Password. Separate from the TV app — this is where profiles are managed and a TV gets linked.",flow:{nodes:[{id:"signin",label:"Sign In",sub:"email + password",col:0,row:0},{id:"reset",label:"Reset Password",sub:"email",col:1,row:0}],edges:[{from:"signin",to:"reset",label:"Forgot Password?"},{from:"reset",to:"signin",label:"Back"}]},notes:["Same build as the TV Game PoC, opened with <code>?view=web</code>, which renders only the web screens.","There is no backend: Sign In accepts any non-empty pair and stays on the page. Forgot Password opens Reset Password; Back returns."]}],Ma="PlayAlong design tokens, exported from the Figma file OTT-TV Design (Gd6wyiODkYk46DjaeyqU9o) on 2026-10-14. PlayAlong's own format -- DTCG-shaped ($type/$value and {dot.path} aliases) but deliberately NOT DTCG-conformant; the format is specified in docs/design-tokens.md. Owner: Viachaslau Kulbitski (design).",Ba={color:{Black:{"20%":{$type:"color",$value:"#00000033"},"25%":{$type:"color",$value:"#00000040"},"40%":{$type:"color",$value:"#00000066"},"50%":{$type:"color",$value:"#00000080"},"70%":{$type:"color",$value:"#000000B2"},"80%":{$type:"color",$value:"#000000CC"},"90%":{$type:"color",$value:"#000000E5"},Base:{$type:"color",$value:"#000000"}},Blue:{500:{$type:"color",$value:"#0090FF"},900:{$type:"color",$value:"#000CB8"}},Green:{300:{$type:"color",$value:"#8CFF4F"},500:{$type:"color",$value:"#00C441"},700:{$type:"color",$value:"#008E11"}},Grey:{200:{$type:"color",$value:"#D1D5DB"},400:{$type:"color",$value:"#94A3B8"},600:{$type:"color",$value:"#5C5E65"},800:{$type:"color",$value:"#202228"},900:{$type:"color",$value:"#040810"}},Plum:{900:{$type:"color",$value:"#57053C"}},Red:{500:{$type:"color",$value:"#FF0000"},700:{$type:"color",$value:"#8E0000"},"500 6%":{$type:"color",$value:"#FF00000F"},"600 50%":{$type:"color",$value:"#AA262680"}},Sand:{500:{$type:"color",$value:"#D9A671"}},White:{"10%":{$type:"color",$value:"#FFFFFF1A"},"20%":{$type:"color",$value:"#FFFFFF33"},"25%":{$type:"color",$value:"#FFFFFF40"},"6%":{$type:"color",$value:"#FFFFFF0F"},Base:{$type:"color",$value:"#FFFFFF"}},Yellow:{500:{$type:"color",$value:"#CAA512"}}},font:{family:{Game:{$type:"fontFamily",$value:"Roboto Condensed"},Product:{$type:"fontFamily",$value:"Rubik"}},lineHeight:{16:{$type:"dimension",$value:"16px"},20:{$type:"dimension",$value:"20px"},24:{$type:"dimension",$value:"24px"},28:{$type:"dimension",$value:"28px"},36:{$type:"dimension",$value:"36px"},38:{$type:"dimension",$value:"38px"},39:{$type:"dimension",$value:"39px"},48:{$type:"dimension",$value:"48px"},88:{$type:"dimension",$value:"88px"}},size:{14:{$type:"dimension",$value:"14px"},18:{$type:"dimension",$value:"18px"},20:{$type:"dimension",$value:"20px"},24:{$type:"dimension",$value:"24px"},32:{$type:"dimension",$value:"32px"},36:{$type:"dimension",$value:"36px"},40:{$type:"dimension",$value:"40px"},48:{$type:"dimension",$value:"48px"},64:{$type:"dimension",$value:"64px"},96:{$type:"dimension",$value:"96px"}},weight:{ExtraBold:{$type:"fontWeight",$value:"ExtraBold"},Medium:{$type:"fontWeight",$value:"Medium"},Regular:{$type:"fontWeight",$value:"Regular"},SemiBold:{$type:"fontWeight",$value:"SemiBold"}}}},Ea={TV:{Base:{Black:{$type:"color",$value:"{primitives.color.Black.Base}"},Dark:{$type:"color",$value:"{primitives.color.Grey.900}"},Light:{$type:"color",$value:"{primitives.color.White.Base}"},Neutral:{$type:"color",$value:"{primitives.color.Grey.800}"}},Border:{"White 20":{$type:"color",$value:"{primitives.color.White.20%}"}},Button:{"Primary Solid":{$type:"color",$value:"{primitives.color.Blue.500}"},Secondary:{$type:"color",$value:"{primitives.color.White.10%}"}},Focus:{"Ring Color":{$type:"color",$value:"{primitives.color.Blue.500}"},"Ring Radius":{$type:"dimension",$value:"{semantic.TV.Radius.M}"},"Ring Width":{$type:"dimension",$value:"6px"}},"Game UI":{"Green 1":{$type:"color",$value:"{primitives.color.Green.500}"},"Red 1":{$type:"color",$value:"{primitives.color.Red.500}"},"Red 2":{$type:"color",$value:"{primitives.color.Red.700}"},Sand:{$type:"color",$value:"{primitives.color.Sand.500}"},Yellow:{$type:"color",$value:"{primitives.color.Yellow.500}"}},Progress:{Track:{$type:"color",$value:"{primitives.color.Grey.600}"}},Radius:{Full:{$type:"dimension",$value:"9999px"},L:{$type:"dimension",$value:"24px"},M:{$type:"dimension",$value:"12px"},S:{$type:"dimension",$value:"8px"},XS:{$type:"dimension",$value:"4px"}},Surface:{"Game Panel":{$type:"color",$value:"{primitives.color.Black.80%}"},"Game Panel Border":{$type:"color",$value:"{primitives.color.White.20%}"},"Game Panel Padding":{$type:"dimension",$value:"40px"},"Game Panel Radius":{$type:"dimension",$value:"{semantic.TV.Radius.L}"}},Tags:{Primary:{$type:"color",$value:"{primitives.color.Blue.900}"},Secondary:{$type:"color",$value:"{primitives.color.Plum.900}"}},Text:{Gain:{$type:"color",$value:"{primitives.color.Green.300}"},Muted:{$type:"color",$value:"{primitives.color.Grey.400}"},Primary:{$type:"color",$value:"{primitives.color.Grey.200}"},Success:{$type:"color",$value:"{primitives.color.Green.700}"}},Transparent:{"Dark 20":{$type:"color",$value:"{primitives.color.Black.20%}"},"Dark 25":{$type:"color",$value:"{primitives.color.Black.25%}"},"Dark 40":{$type:"color",$value:"{primitives.color.Black.40%}"},"Dark 50":{$type:"color",$value:"{primitives.color.Black.50%}"},"Dark 70":{$type:"color",$value:"{primitives.color.Black.70%}"},"Dark 80":{$type:"color",$value:"{primitives.color.Black.80%}"},"Dark 90":{$type:"color",$value:"{primitives.color.Black.90%}"},"Red 50":{$type:"color",$value:"{primitives.color.Red.600 50%}"},"White 10":{$type:"color",$value:"{primitives.color.White.10%}"},"White 25":{$type:"color",$value:"{primitives.color.White.25%}"},"White 6":{$type:"color",$value:"{primitives.color.White.6%}"}}},Web:{Base:{Black:{$type:"color",$value:"{primitives.color.Black.Base}"},Dark:{$type:"color",$value:"{primitives.color.Grey.900}"},Light:{$type:"color",$value:"{primitives.color.White.Base}"}},Border:{"White 20":{$type:"color",$value:"{primitives.color.White.20%}"}},Button:{"Primary Solid":{$type:"color",$value:"{primitives.color.Blue.500}"}},Status:{Red:{$type:"color",$value:"{primitives.color.Red.500}"}},Text:{Primary:{$type:"color",$value:"{primitives.color.White.Base}"}},Transparent:{"Red 6":{$type:"color",$value:"{primitives.color.Red.500 6%}"},"White 25":{$type:"color",$value:"{primitives.color.White.25%}"},"White 6":{$type:"color",$value:"{primitives.color.White.6%}"}}}},Ra={TV:{Background:{Stacked:{$type:"gradient",$value:{type:"linear",stops:[{color:"#EDF3FE",position:0},{color:"#ACCAEB",position:1}],angle:0}}},Button:{Primary:{$type:"gradient",$value:{type:"linear",stops:[{color:"#0090FF",position:0},{color:"#0022AB",position:1}],angle:90}}},"Game UI":{Gold:{$type:"gradient",$value:{type:"linear",stops:[{color:"#F2D383",position:0},{color:"#49391E",position:.053},{color:"#BB7424",position:.174},{color:"#F4CB82",position:.36},{color:"#FCF9A6",position:.63},{color:"#BC9E53",position:.75},{color:"#806F1A",position:.889},{color:"#E6CD77",position:1}],angle:50}}},Loader:{Spin:{$type:"gradient",$value:{type:"angular",stops:[{color:"#FFFFFF",position:0},{color:"#FFFFFF",position:.176},{color:"#FFFFFF00",position:1}]}}},Placeholder:{Grey:{$type:"gradient",$value:{type:"linear",stops:[{color:"#FBFBFB",position:0},{color:"#666666",position:1}],angle:180}},Light:{$type:"gradient",$value:{type:"linear",stops:[{color:"#FFFFFF",position:0},{color:"#999999",position:1}],angle:180}}},Scrim:{Card:{$type:"gradient",$value:{type:"linear",stops:[{color:"#04081000",position:0},{color:"#040810",position:.808},{color:"#040810",position:1}],angle:180}},Menu:{$type:"gradient",$value:{type:"linear",stops:[{color:"#040810",position:0},{color:"#040810",position:.178},{color:"#04081000",position:.447},{color:"#04081000",position:1}],angle:90}}},Status:{Failure:{$type:"gradient",$value:{type:"linear",stops:[{color:"#8E0000",position:0},{color:"#380000",position:1}],angle:180}},Purple:{$type:"gradient",$value:{type:"linear",stops:[{color:"#422DFF",position:0},{color:"#ACACAC",position:1}],angle:180}},"Round Complete":{$type:"gradient",$value:{type:"linear",stops:[{color:"#002FFF00",position:0},{color:"#002FFF",position:.505},{color:"#002FFF00",position:1}],angle:90}},Success:{$type:"gradient",$value:{type:"linear",stops:[{color:"#008E11",position:0},{color:"#053800",position:1}],angle:180}},Wait:{$type:"gradient",$value:{type:"linear",stops:[{color:"#0056C6",position:0},{color:"#001462",position:1}],angle:180}},"You Lose!":{$type:"gradient",$value:{type:"linear",stops:[{color:"#8E000000",position:0},{color:"#8E0000",position:.505},{color:"#8E000000",position:1}],angle:90}},"You Win!":{$type:"gradient",$value:{type:"linear",stops:[{color:"#008E0E00",position:0},{color:"#008E0E",position:.505},{color:"#008E0E00",position:1}],angle:90}}}},Web:{Button:{Primary:{$type:"gradient",$value:{type:"linear",stops:[{color:"#0090FF",position:0},{color:"#0022AB",position:1}],angle:90}}}}},Ha={Body:{L:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Regular}",fontSize:"{primitives.font.size.24}",lineHeight:"{primitives.font.lineHeight.39}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}},"L Tight":{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Regular}",fontSize:"{primitives.font.size.24}",lineHeight:"{primitives.font.lineHeight.24}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}},M:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Regular}",fontSize:"{primitives.font.size.20}",lineHeight:"{primitives.font.lineHeight.24}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}}},Diagram:{Mono:{$type:"typography",$value:{fontFamily:"JetBrains Mono",fontWeight:"{primitives.font.weight.Regular}",fontSize:"{primitives.font.size.32}",lineHeight:"{primitives.font.lineHeight.36}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}}},Display:{L:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Medium}",fontSize:"{primitives.font.size.64}",lineHeight:"{primitives.font.lineHeight.88}",letterSpacing:{unit:"percent",value:-4},textCase:"ORIGINAL"}},"L Bold":{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"Bold",fontSize:"{primitives.font.size.64}",lineHeight:"56px",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}},M:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Medium}",fontSize:"{primitives.font.size.48}",lineHeight:"{primitives.font.lineHeight.48}",letterSpacing:{unit:"percent",value:2},textCase:"ORIGINAL"}},XL:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.SemiBold}",fontSize:"{primitives.font.size.96}",lineHeight:"{primitives.font.lineHeight.88}",letterSpacing:{unit:"percent",value:-4},textCase:"ORIGINAL"}}},Game:{L:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Game}",fontWeight:"{primitives.font.weight.Medium}",fontSize:"{primitives.font.size.48}",lineHeight:"{primitives.font.lineHeight.48}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}},M:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Game}",fontWeight:"{primitives.font.weight.ExtraBold}",fontSize:"{primitives.font.size.40}",lineHeight:"{primitives.font.lineHeight.38}",letterSpacing:{unit:"percent",value:0},textCase:"UPPER"}},S:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Game}",fontWeight:"{primitives.font.weight.SemiBold}",fontSize:"{primitives.font.size.32}",lineHeight:"{primitives.font.lineHeight.38}",letterSpacing:{unit:"percent",value:0},textCase:"UPPER"}}},Heading:{L:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Medium}",fontSize:"{primitives.font.size.36}",lineHeight:"{primitives.font.lineHeight.38}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}},M:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Regular}",fontSize:"{primitives.font.size.32}",lineHeight:"{primitives.font.lineHeight.36}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}},S:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Medium}",fontSize:"{primitives.font.size.24}",lineHeight:"{primitives.font.lineHeight.28}",letterSpacing:{unit:"percent",value:0},textCase:"ORIGINAL"}}},Label:{M:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Medium}",fontSize:"{primitives.font.size.18}",lineHeight:"{primitives.font.lineHeight.20}",letterSpacing:{unit:"pixels",value:0},textCase:"UPPER"}},S:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"{primitives.font.weight.Regular}",fontSize:"{primitives.font.size.14}",lineHeight:"{primitives.font.lineHeight.16}",letterSpacing:{unit:"pixels",value:.3},textCase:"UPPER"}}},Web:{Label:{Primary:{$type:"typography",$value:{fontFamily:"{primitives.font.family.Product}",fontWeight:"Bold",fontSize:"{primitives.font.size.14}",lineHeight:"17px",letterSpacing:{unit:"percent",value:0},textCase:"UPPER"},$description:"Line height is AUTO in Figma, so the style carries no number. This value is measured from rendered text, not read off the style and not guessed."}}}},He={$description:Ma,primitives:Ba,semantic:Ea,gradient:Ra,typography:Ha};function*Ke(e,t=[]){if(!(!e||typeof e!="object")){if("$value"in e){yield[t,e];return}for(const[o,a]of Object.entries(e))o.startsWith("$")||(yield*Ke(a,[...t,o]))}}function Ce(e,t=0){if(typeof e!="string"||!e.startsWith("{")||t>10)return String(e);let o=He;for(const a of e.slice(1,-1).split("."))o=o==null?void 0:o[a];return Ce(o==null?void 0:o.$value,t+1)}const L=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;");function so(e,t,o){const a=document.createElement("section");return a.className="card",a.innerHTML=`
    <header class="card__head"><div>
      <h1 class="card__title">${e}</h1>
      <p class="card__desc">Rendered from <code>external/playalong-hub/design-tokens.json</code> — the same file the CSS variables are generated from.</p>
    </div></header>
    <p class="foundation__note">${t}</p>
    ${o}`,a}function Pa(){const e=(o,a,i)=>{const s=[...Ke(a)].filter(([,r])=>r.$type==="color").map(([r,l])=>{const n=Ce(l.$value),c=i&&typeof l.$value=="string"&&l.$value.startsWith("{")?`<div class="swatch__alias">→ ${L(l.$value.slice(1,-1).split(".").slice(-2).join("/"))}</div>`:"";return`<div class="swatch" data-token="${L(r.join("/"))}">
          <div class="swatch__chip" style="background:${n}"></div>
          <div class="swatch__meta">
            <div class="swatch__name">${L(r.join("/"))}</div>
            <div class="swatch__value">${L(n)}</div>${c}
          </div></div>`}).join("");return s?`<h2 class="foundation__group-title">${o}</h2><div class="swatches">${s}</div>`:""},t=[...Ke(He.gradient)].map(([o,a])=>{const i=a.$value,s=c=>`${+(c*100).toFixed(1)}%`,r=i.stops.map(c=>`${c.color} ${s(c.position)}`).join(", "),l=i.type==="angular"?`conic-gradient(from 0deg, ${r})`:`linear-gradient(${i.angle??180}deg, ${r})`,n=i.stops.map(c=>`<li class="swatch__stop">
        <span class="swatch__stop-dot" style="--c:${c.color}"></span>
        <span class="swatch__stop-hex">${L(c.color)}</span>
        <span class="swatch__stop-pos">${s(c.position)}</span></li>`).join("");return`<div class="swatch" data-token="${L(o.join("/"))}">
      <div class="swatch__chip" style="background:${l}"></div>
      <div class="swatch__meta"><div class="swatch__name">${L(o.join("/"))}</div>
      <div class="swatch__value">${i.stops.length} stops · ${i.type}${i.type==="angular"?"":` · ${i.angle??180}°`}</div>
      <ol class="swatch__stops">${n}</ol></div></div>`}).join("");return so("Colour","Semantic names are what to use. A primitive is the raw value behind one — if you are reaching for <code>Grey/200</code> rather than <code>TV/Text/Primary</code>, the semantic layer is missing a name.",e("Semantic",He.semantic,!0)+(t?`<h2 class="foundation__group-title">Gradients</h2><div class="swatches">${t}</div>`:"")+e("Primitives",He.primitives,!1))}function za(){const e=[...Ke(He.typography)].map(([t,o])=>{const a=o.$value,i=Ce(a.fontFamily),s=Ce(a.fontSize),r=Ce(a.lineHeight),l=String(Ce(a.fontWeight)),c={thin:100,extralight:200,light:300,regular:400,normal:400,medium:500,semibold:600,bold:700,extrabold:800,black:900}[l.toLowerCase().replace(/[^a-z]/g,"")]??400,d=a.letterSpacing,f=d.unit==="percent"?`${d.value/100}em`:`${d.value}px`,p=`font-family:'${i}';font-weight:${c};font-size:${s};line-height:${r};letter-spacing:${f};text-transform:${a.textCase==="UPPER"?"uppercase":"none"}`;return`<div class="specimen" data-token="${L(t.join("/"))}">
      <div class="specimen__meta">
        <div class="specimen__name">${L(t.join("/"))}</div>
        ${L(i)} ${L(l)}<br>${L(s)} / ${L(r)} · ${L(f)}
        ${o.$description?'<br><span style="color:var(--text-muted)">measured</span>':""}
      </div>
      <div class="specimen__sample" style="${p}">Play along. Out loud.</div>
    </div>`}).join("");return so("Typography","Two families, and the split is the game layer: Rubik is the product, the game screens are Roboto Condensed. Sizes below 24 are supporting text on small elements — nothing load-bearing may live in them.",`<div class="specimens">${e}</div>`)}const Ht=(e,t,o)=>{if(e.innerHTML="",e.appendChild(t),o){const a=t.querySelector(`[data-token="${CSS.escape(o)}"]`);a&&(a.classList.add("is-hit"),a.scrollIntoView({block:"center",behavior:"smooth"}))}return()=>{}};function Oa(){const e=[...Ke(He.semantic)].filter(([,s])=>s.$type!=="color").map(([s,r])=>({name:s.join("/"),value:String(Ce(r.$value)),desc:r.$description})),t=(s,r)=>{const l=parseFloat(r);return/Radius\/Full/i.test(s)?`<span class="geom__box" style="border-radius:${r};width:140px"></span>`:/Radius/i.test(s)?`<span class="geom__box" style="border-radius:${r}"></span>`:/Width/i.test(s)?`<span class="geom__box" style="box-shadow:0 0 0 ${r} var(--tv-focus-ring-color);margin:${l}px"></span>`:/Padding/i.test(s)?`<span class="geom__box geom__box--pad" style="padding:${r}"><i></i></span>`:'<span class="geom__box"></span>'},o=e.map(s=>`
    <div class="geom" data-token="${L(s.name)}">
      <div class="geom__meta">
        <div class="geom__name">${L(s.name)}</div>
        <div class="geom__value">${L(s.value)}</div>
        ${s.desc?`<div class="geom__desc">${L(String(s.desc))}</div>`:""}
      </div>
      <div class="geom__demo">${t(s.name,s.value)}</div>
    </div>`).join("");return so("Geometry","Radius, focus and the one named surface. These are the tokens that are not a colour and not a type style — and the ones a client is most likely to hardcode, because a number looks like a detail.",`<div class="geoms">${o}</div>
    <h2 class="foundation__group-title">The radius scale</h2>
    <p class="foundation__note">Four numbers and Full, and they are not a guess:
      counted across the component library on 2026-10-14, <strong>8 carries 145
      nodes, 12 carries 139, 4 carries 74 and 24 carries 39</strong>, with Full
      already bound on 53. Everything else is one component's own number —
      the Toggle knob at 5, the Reward Track bar at 20, the Strike Box at 10,
      the Stacked answer at 48 — or an avatar circle that should be Full.
      <strong><code>Focus/Ring Radius</code> and <code>Game Panel Radius</code>
      are names on this scale now</strong>, not second copies of 12 and 24.</p>
    <h2 class="foundation__group-title">The game panel, assembled</h2>
    <p class="foundation__note">Four tokens, one surface — and the reason to name
      it: 28 nodes in Figma share exactly this and nothing could check that they
      did. <strong>The padding token is horizontal only</strong>; the vertical
      inset is 40, 24 and 0 on different panels, so it is not a token.</p>
    <div class="geom__panel">
      <div class="geom__panel-box">
        <span class="geom__panel-inner">Answer Box · Attempts Box · the survey board ·
          Higher/Lower · its Note · Card Sharks Question · the in-game Keyboard ·
          Score Box · Status Box · Notification Message</span>
      </div>
    </div>`)}const Kt=[{id:"foundation-colour",title:"Colour",kind:"component",section:"Foundations",badge:{text:"Tokens",tone:"ready"},open:(e,t)=>Ht(e,Pa(),t)},{id:"foundation-type",title:"Typography",kind:"component",section:"Foundations",badge:{text:"Tokens",tone:"ready"},open:(e,t)=>Ht(e,za(),t)},{id:"foundation-geometry",title:"Geometry",kind:"component",section:"Foundations",badge:{text:"Tokens",tone:"ready"},open:(e,t)=>Ht(e,Oa(),t)}],Da={"c-icons":{count:140,frames:["Homepage","Player","Match Game","Family Feud","Account","Leaderboard","Login","Sign Up"],note:"The most-used component in the file by a wide margin."},"c-button":{count:114,frames:["Homepage","Error - Too many attempts","Details","Account","Login","Sign Up","Leaderboard"]},"c-logo":{count:72,frames:["Menu Expanded First Item Focus","Legal","Splash Screen","Account","Login","Sign Up"]},"c-menu-item":{count:60,frames:["Overlay","Homepage","Keep Playing Rail","Loading Page Content","Legal","Account"]},"c-menu":{count:45,frames:["Overlay","Homepage - Played Rail Card","Homepage - Prime Time Card","Keep Playing Rail","Loading Page Content","Magic Remote Menu Item Focus","Legal","Account"],note:"The collapsed rail is on 45 frames; the expanded menu on 14; the Overlay node on 2."},"c-subtract":{count:46,frames:["Overlay","Homepage","Keep Playing Rail","Loading Page Content","Magic Remote Menu Item Focus"],note:"It travels with the collapsed rail — the mark at the top of it."},"c-rail-h":{count:22,frames:["Homepage - Played Rail Card","Homepage - Prime Time Card","Homepage - Prime Time on hero rail","Keep Playing Rail","Firts rail Item Focus","Mid rail Item Focus","Magic Remote Rail Item Focus"]},"c-section-trending":{count:17,frames:["Homepage - Played Rail Card","Homepage - Prime Time Card","Keep Playing Rail","Menu Expanded First Item Focus","Magic Remote Rail Item Focus"]},"c-game-type-tags-row":{count:22,frames:["Homepage - Played Rail Card","Homepage - Prime Time Card","Keep Playing Rail","Mid rail Item Focus","Details"]},"c-game-type-tag":{count:24,frames:["Homepage","Keep Playing Rail","Details","Magic Remote Rail Item Focus"]},"c-tag":{count:33,frames:["Homepage","Keep Playing Rail","Details","Leaderboard","Magic Remote Rail Item Focus"]},"c-dots":{count:14,frames:["Homepage","Keep Playing Rail","Menu Expanded First Item Focus"]},"c-search-item":{count:2,frames:["Frame 2608967","With Prime Time Card"],note:"Search is two frames, and neither is named for it."},"c-search-item-image":{count:2,frames:["Frame 2608967","With Prime Time Card"]},"c-tabs":{count:21,frames:["Details","Login- 6","Login- 12","Session expired","Sign Up - 14","IDEA"]},"c-tabs-item":{count:22,frames:["Details","Login- 6","Session expired","Sign Up - 14"]},"c-video-player-buttons":{count:7,frames:["Player - Default","Player - Rewind","Player - Pause","Player - Thumbnail","Player - Loading","Player - Toggle Focus"]},"c-toggle":{count:7,frames:["Player - Default","Player - Rewind","Player - Pause","Player - Thumbnail","Player - Loading","Player - Toggle Focus"],note:"Every use is in the player. It is the play-along switch, not a settings control."},"c-player-thumbnail":{count:2,frames:["Player - Rewind","Player - Thumbnail"]},"c-box-content":{count:58,frames:["The 1% Club","Match Game","Family Feud","Card Sharks"],note:"The game layer's workhorse — every show uses it."},"c-score-box":{count:37,frames:["Match Game","The 1% Club - Notification","Family Feud","Card Sharks"]},"c-game-keyboard":{count:23,frames:["The 1% Club - Enter Answer","The 1% Club - Typing","The 1% Club - Digit Input","The 1% Club - Letters with Digits","The 1% Club - Coordinate Input","The 1% Club - Multiselect","Match Game","Family Feud - Enter Answer"],note:"Its six kinds exist because The 1% Club asks six different ways."},"c-answer-box":{count:21,frames:["The 1% Club - Enter Answer","The 1% Club - Typing","The 1% Club - Submited","Match Game","Family Feud"]},"c-answer-option":{count:23,frames:["Match Game - 26","Match Game - Celebrity Panel","Family Feud - Enter Answer","Family Feud - Voice","Family Feud - Processing Answer"]},"c-status-box":{count:14,frames:["The 1% Club - Round Complete!","The 1% Club - You Right","The 1% Club - Incorrect!","Part 1 - Round Complete","Fast Money - You Win","Fast Money - You Lose","Family Feud - Round Complete"]},"c-answer-options":{count:17,frames:["Family Feud - Enter Answer","Family Feud - Voice","Family Feud - Processing Answer","Part 1 - Fast Money","Part 2 - Fast Money","Fast Money - You Win"],note:"Family Feud only. It is the survey board."},"c-attempts-box":{count:11,frames:["Family Feud - Enter Answer","Family Feud - Voice","Family Feud - Round Complete","Family Feud - Round Lost","Family Feud - Round Won"],note:"Family Feud only."},"c-attempt":{count:9,frames:["Family Feud - Enter Answer","Family Feud - Voice","Family Feud - Round Complete","Family Feud - Round Lost"]},"c-strike-box":{count:5,frames:["Family Feud - Enter Answer","Family Feud - Voice","Family Feud - Processing Answer","Family Feud - Keyboard Focus"],note:"Family Feud only — three strikes is that show's rule."},"c-higher-lower":{count:11,frames:["Card Sharks - 1"],note:"Card Sharks only, on all eleven of its frames."},"c-card-sharks-question":{count:11,frames:["Card Sharks - 1"],note:"Card Sharks only."},"c-card-box":{count:5,frames:["Card Sharks - 4","Card Sharks - 5","Card Sharks - 9","Card Sharks - 10","Card Sharks - 11"]},"c-hl-note":{count:3,frames:["Match Game - 3","Card Sharks - 1","Card Sharks - 4"],note:"Shown once per game, to teach the remote."},"c-higher-lower-button":{count:16,frames:["Match Game - 3","Match Game - 10","Card Sharks - 1","Card Sharks - 2"]},"c-keys":{count:18,frames:["Match Game - 3","Match Game - 10","Card Sharks - 1","Card Sharks - 7"]},"c-notification":{count:1,frames:["The 1% Club - Notification - 1"],note:"One frame in the whole file."},"c-stacked-answer":{count:2,frames:["Stacked - Final - 1","Stacked - Final - 2"]},"c-mic":{count:2,frames:["Family Feud - Voice - 1","Sign Up - 15 - React Native"],note:"Both halves of voice input: answering a question, and dictating an email address."},"c-avatar-tile":{count:9,frames:["Progression screen","Account - 13","Account - 14","Account - 18","Account - 19","Account - 20","Account - 21","Account - 22 - Avatar with Frame","Account - 23"],note:"The avatar picker lives in Account; the Progression screen shows the one that was picked."},"c-avatar-picture":{count:16,frames:["Account - 8","Account - 9","Account - 15","Leaderboard - 23","Leaderboard - 29"]},"c-user-avatar":{count:16,frames:["Account - 8","Account - 9","Account - 15","Leaderboard - 23","Leaderboard - 29"]},"c-reward":{count:7,frames:["Leaderboard - 40","Leaderboard - 41","Leaderboard - 42","Leaderboard - 43","Leaderboard - 44 - Avatars - Sign In","Leaderboard - 45 - Frames with Radio Button","Pending - Roku - 1"],note:"Every one of those frames is the Trophy Cabinet. They are named Leaderboard, which is a different, post-MVP feature."},"c-trophies-thumb":{count:3,frames:["Leaderboard - 43","Leaderboard - 44 - Avatars - Sign In","Leaderboard - 45 - Frames with Radio Button"]},"c-unlocked-counter":{count:8,frames:["Leaderboard - 40","Leaderboard - 41","Leaderboard - 42","Leaderboard - 43","Leaderboard - 44","Leaderboard - 45","Pending - Roku - 1"]},"c-selection-radio":{count:3,frames:["Leaderboard - 42","Leaderboard - 44 - Avatars - First Selected","Leaderboard - 45 - Frames with Radio Button"]},"c-reward-type-icon":{count:4,frames:["Progression screen","Progression screen / Last Reward - In Progress","Pending - Roku - 1","Leaderboard - 44 - Avatars - Sign In"]},"c-avatar-label":{count:4,frames:["Progression screen","Progression screen / Last Reward - In Progress","Pending - Roku - 1","Leaderboard - 44 - Avatars - Sign In"]},"c-reward-track":{count:3,frames:["Progression screen","Progression screen / Last Reward - In Progress","IDEA"]},"c-reward-track-first":{count:1,frames:["Progression screen"]},"c-loading":{count:1,frames:["My Progression - Unauthorised - 6"],note:"One frame, and it is the guest's progression screen."},"c-input":{count:24,frames:["Login- 6","Login- 12","Login- 7","Login- 8 - React Native","Login- 1 - Roku","Session expired - 1","Sign Up - 11 (with links)","Sign Up - 12","Sign Up - Roku - 1","Sign Up - Processing"],note:"TV only. The browser screens use Input (Web), which is a different control."},"c-keyboard":{count:9,frames:["Sign Up - 15 - React Native","Login- 8 - React Native","Reset Pass - 3","Account - 9","Frame 2608966","Frame 2608967"]},"c-checkbox-message":{count:2,frames:["Login- 12","Sign Up - Roku - 1 (without links)"],note:"Both uses are Show Password, and one of them is the Roku sign-up."},"c-checkbox":{count:2,frames:["Login- 12","Sign Up - Roku - 1 (without links)"],note:"Only ever inside Checkbox Message — it is never used on its own."},"c-input-messages":{count:6,frames:["Login- 7","Sign Up - 12","Login- 8 - React Native","Account - 15","Account - 16","Roku - Too many attempts"]},"c-input-web":{count:19,frames:["Login - 1","Login - 2","Sign In - Error - 1","Sign Up - 1","Sign Up - 17","Sign Up - 19","Sign Up - 20","Sign Up - Error - 1","Forgot password - Error - 1","Loading - 1"],note:"The browser flow, which is a separate set of frames from the TV one."},"c-input-field-web":{count:19,frames:["Login - 1","Login - 2","Sign Up - 1","Sign Up - 17","Forgot password - Error - 1"]},"c-reward-unlocked":{count:0,frames:[],note:"Not placed on any frame. The celebration the whole Spotlight loop builds to exists only as a component."},"c-confetti":{count:0,frames:[],note:"Not placed on any frame — the other half of a moment that has no screen."},"c-rail-v":{count:0,frames:[],note:"Not placed on any frame. Every rail in the file is horizontal."},"c-section-watch-more":{count:0,frames:[],note:"Not placed on any frame — it holds the vertical cards, which are also unused."},"c-logo-text":{count:0,frames:[],note:"Not placed on any frame. The plain Logo is on 72."},"c-score-row":{count:0,frames:[],note:"Not placed on any frame. Leaderboards are post-MVP, and this is ahead of them."}},Ga={"2565:2733":{node:"2878:15366",section:"Game UI"},"2565:2734":{node:"3192:14090",section:"Game UI"},"2565:2735":{node:"3192:14123",section:"Game UI"},"2565:2732":{node:"3192:14045",section:"Game UI"},"2565:2667":{node:"3192:14158",section:"Game UI"},"2565:2728":{node:"3192:14192",section:"Game UI"},"3750:15695":{node:"4411:15796",section:"Game UI"},"3608:15061":{node:"3192:14090",section:"Game UI",inside:"Answer Box"},"4689:5985":{node:"3192:14124",section:"Game UI",inside:"Score Box"},"4709:5407":{node:"3192:14158",section:"Game UI",inside:"Attempts Box"},"3750:15653":{node:"4411:15796",section:"Game UI",inside:"Higher/Lower Note"},"276:2415":{node:"1020:7865",section:"Inputs"},"701:11494":{node:"1209:8378",section:"Inputs"},"1209:8405":{node:"1209:8435",section:"Inputs"},"629:1861":{node:"1020:8001",section:"Icons & Tags"},"1021:8565":{node:"1021:8751",section:"Icons & Tags"},"772:6953":{node:"772:7076",section:"Menu",inside:"Collapsed Menu"},"933:7845":{node:"772:7076",section:"Menu",inside:"Collapsed Menu"},"933:7815":{node:"772:7041",section:"Menu",inside:"Expanded Menu"},"7605:8146":{node:"7605:25389",section:"React Native Keyboard"},"629:5141":{node:"1021:9121",section:"Asset Card"},"629:4401":{node:"1021:9207",section:"Asset Card"},"7233:9283":{node:"13976:19040",section:"Forms"},"7909:8736":{node:"13976:19203",section:"Forms"},"10432:15331":{node:"13976:19225",section:"Forms"},"10432:15304":{node:"13976:19248",section:"Forms"},"13305:21383":{node:"13976:19265",section:"Forms"},"867:1808":{node:"13976:19275",section:"Forms"},"596:2669":{node:"13976:19286",section:"Forms"},"10331:31709":{node:"13977:19040",section:"Identity"},"8717:11254":{node:"13977:19101",section:"Identity"},"8408:16678":{node:"13977:19123",section:"Identity"},"13312:22296":{node:"13977:19148",section:"Identity"},"13502:18861":{node:"13977:19161",section:"Identity"},"13301:20807":{node:"13977:19166",section:"Rewards"},"12458:37894":{node:"13977:19328",section:"Rewards"},"11643:15569":{node:"13977:19357",section:"Rewards"},"13550:43488":{node:"13977:19376",section:"Rewards"},"13550:42728":{node:"13977:19386",section:"Rewards"},"9849:13692":{node:"13977:19394",section:"Web"},"9849:13731":{node:"13977:19422",section:"Web"},"8837:11368":{node:"13978:19345",section:"Browse & Player"},"13914:21052":{node:"13978:19435",section:"Browse & Player"},"5022:9521":{node:"13978:19445",section:"Browse & Player"},"473:2980":{node:"13978:19496",section:"Browse & Player"},"5623:18110":{node:"13978:19543",section:"Browse & Player"},"2878:15039":{node:"13978:19574",section:"Browse & Player"},"629:4537":{node:"13978:19581",section:"Browse & Player"},"629:5321":{node:"13978:19632",section:"Browse & Player"},"933:7743":{node:"13978:19764",section:"Browse & Player"},"3752:15760":{node:"13978:19788",section:"Game UI — additions"},"3749:15334":{node:"13978:19807",section:"Game UI — additions"},"3752:30765":{node:"13978:19888",section:"Game UI — additions"},"3752:30723":{node:"13978:19955",section:"Game UI — additions"},"2565:2663":{node:"13978:19974",section:"Game UI — additions"},"6933:11901":{node:"13978:20018",section:"Game UI — additions"},"9437:15313":{node:"13978:20044",section:"Game UI — additions"},"2565:2660":{node:"13978:20056",section:"Game UI — additions"},"11643:38235":{node:"13978:20065",section:"Confetti — artwork, not tokenised"},"11643:39611":{node:"13978:20671",section:"Under review — components that may not be components"},"13523:20837":{node:"13978:20693",section:"Under review — components that may not be components"}},Na="Gd6wyiODkYk46DjaeyqU9o",$o=e=>`https://www.figma.com/design/${Na}/OTT-TV-Design?node-id=${e.replace(":","-")}`;function Ua(e){const t=Ga[e.figma];return`${t?`<a class="btn" target="_blank" rel="noopener" href="${$o(t.node)}"
         title="${t.section}${t.inside?` — inside ${t.inside}`:""}">Library${t.inside?" ↗":""}</a>`:""}<a class="btn" target="_blank" rel="noopener" href="${$o(e.figma)}">Component</a>`}function Wa(e){const t=Da[e.id];if(!t)return"";const o=t.count===0?"<strong>Used on no frame at all.</strong>":`Used on <strong>${t.count}</strong> frame${t.count===1?"":"s"}`,a=t.frames.length?`: ${t.frames.map(i=>`<code>${i}</code>`).join(", ")}${t.count>t.frames.length?" …":""}`:"";return`<div class="comp__block comp__block--usage">
      <h2>Where it is used</h2>
      <p class="comp__usage">${o}${a}${t.note?` — ${t.note}`:""}</p>
    </div>`}function qa(e){var r;const t=document.createElement("section");t.className="card";const o=(l,n)=>l.length?l.map(c=>`<a class="token-chip token-chip--${n}" href="#${n==="colour"?"foundation-colour":"foundation-type"}~${c}">${c}</a>`).join(""):'<span class="token-chip token-chip--none">none</span>';t.innerHTML=`
    <header class="card__head">
      <div>
        <h1 class="card__title">${e.title}</h1>
        <p class="card__desc">${e.description}</p>
      </div>
      <span class="card__links">${Ua(e)}</span>
    </header>

    <div class="variants variants--${e.ground??"dark"}${e.wide?" variants--wide":""}" data-role="variants"></div>

    <div class="comp__meta">
      <div class="comp__block">
        <h2>Colour tokens</h2>
        <div class="token-chips">${o(e.tokens.colour,"colour")}</div>
      </div>
      <div class="comp__block">
        <h2>Type tokens</h2>
        <div class="token-chips">${o(e.tokens.type,"type")}</div>
      </div>
    </div>

    ${Wa(e)}

    ${(r=e.notes)!=null&&r.length?`<div class="comp__block comp__block--notes">
      <h2>Known differences</h2>
      <ul class="demo__notes">${e.notes.map(l=>`<li>${l}</li>`).join("")}</ul>
    </div>`:""}
  `;const a=t.querySelector("[data-role=variants]");for(const l of e.variants){const n=document.createElement("div");n.className="variant";const c=document.createElement("div");c.className="variant__slot";const d=document.createElement("div");d.className="variant__scaler",d.appendChild(l.el()),c.appendChild(d);const f=document.createElement("div");f.className="variant__label",f.textContent=l.label,n.append(c,f),a.appendChild(n)}const i=()=>requestAnimationFrame(()=>Za(a));i(),document.fonts&&document.fonts.ready&&document.fonts.ready.then(i);for(const l of t.querySelectorAll("img"))l.complete||l.addEventListener("load",i,{once:!0});const s=()=>i();return window.addEventListener("resize",s),t.__destroy=()=>window.removeEventListener("resize",s),t}function Za(e){var s;const t=[...e.querySelectorAll(".variant__scaler")];if(!t.length)return;for(const r of t)r.style.transform="",r.style.width="",r.style.height="";const o=t.map(r=>r.firstElementChild),a=Math.max(...o.map(r=>r.offsetWidth||0)),i=e.clientWidth-56;a>0&&e.style.setProperty("--variant-basis",`${Math.min(a,i)}px`);for(let r=0;r<t.length;r++){const l=o[r],n=t[r].parentElement,c=l.offsetWidth,d=l.offsetHeight,f=getComputedStyle(n),p=parseFloat(f.paddingLeft)+parseFloat(f.paddingRight),m=parseFloat(f.paddingTop)+parseFloat(f.paddingBottom),C=n.clientWidth-p;if(!c||!d)continue;const u=C>0&&c>C?C/c:1;if(u<1){t[r].style.transform=`scale(${u})`,t[r].style.width=`${c}px`,t[r].style.height=`${d}px`,n.style.height=`${Math.ceil(d*u+m)}px`,n.style.overflow="hidden";const h=n.nextElementSibling;h&&((s=h.dataset).base??(s.base=h.textContent??""),h.textContent=`${h.dataset.base}  ·  ${c}×${d} at ${Math.round(u*100)}%`)}else{n.style.height="",n.style.overflow="";const h=n.nextElementSibling;h!=null&&h.dataset.base&&(h.textContent=h.dataset.base)}}}const ro={Run:'<path d="M16 2.66675C8.64002 2.66675 2.66669 8.64008 2.66669 16.0001C2.66669 23.3601 8.64002 29.3334 16 29.3334C23.36 29.3334 29.3334 23.3601 29.3334 16.0001C29.3334 8.64008 23.36 2.66675 16 2.66675ZM12.6667 19.5601V12.4401C12.6667 11.3867 13.84 10.7467 14.72 11.3201L20.2534 14.8801C21.0667 15.4001 21.0667 16.6001 20.2534 17.1201L14.72 20.6801C13.84 21.2534 12.6667 20.6134 12.6667 19.5601Z" fill="currentColor"/>',Play:'<path d="M8 6.78203V25.218C8 26.6238 9.54362 27.478 10.7324 26.7128L25.175 17.4948C26.275 16.8008 26.275 15.1992 25.175 14.4874L10.7324 5.28722C9.54362 4.52203 8 5.3762 8 6.78203Z" fill="currentColor"/>',Pause:'<path d="M10.6667 25.3332C12.1333 25.3332 13.3333 24.1332 13.3333 22.6665V9.33317C13.3333 7.8665 12.1333 6.6665 10.6667 6.6665C9.2 6.6665 8 7.8665 8 9.33317V22.6665C8 24.1332 9.2 25.3332 10.6667 25.3332ZM18.6667 9.33317V22.6665C18.6667 24.1332 19.8667 25.3332 21.3333 25.3332C22.8 25.3332 24 24.1332 24 22.6665V9.33317C24 7.8665 22.8 6.6665 21.3333 6.6665C19.8667 6.6665 18.6667 7.8665 18.6667 9.33317Z" fill="currentColor"/>',Restart:'<path d="M16 6.66671V4.28004C16 3.68004 15.28 3.38671 14.8666 3.81337L11.1333 7.53337C10.8666 7.80004 10.8666 8.21337 11.1333 8.48004L14.8533 12.2C15.28 12.6134 16 12.32 16 11.72V9.33337C20.4133 9.33337 24 12.92 24 17.3334C24 20.96 21.56 24.0267 18.2533 25C17.6933 25.16 17.3333 25.6934 17.3333 26.2667C17.3333 27.1334 18.16 27.8134 19 27.56C23.4266 26.2667 26.6666 22.1867 26.6666 17.3334C26.6666 11.44 21.8933 6.66671 16 6.66671Z" fill="currentColor"/><path d="M7.99998 17.3334C7.99998 15.5468 8.58665 13.8934 9.58665 12.5468C9.98665 12.0134 9.93331 11.2801 9.46665 10.8001C8.90665 10.2401 7.94665 10.2934 7.46665 10.9334C6.13331 12.7201 5.33331 14.9334 5.33331 17.3334C5.33331 22.1868 8.57331 26.2668 13 27.5601C13.84 27.8134 14.6666 27.1335 14.6666 26.2668C14.6666 25.6935 14.3066 25.1601 13.7466 25.0001C10.44 24.0268 7.99998 20.9601 7.99998 17.3334Z" fill="currentColor"/>',Retry:'<path d="M23.5333 8.46657C21.36 6.29324 18.28 5.03991 14.8933 5.38657C9.99999 5.87991 5.97332 9.85324 5.42665 14.7466C4.69332 21.2132 9.69332 26.6666 16 26.6666C20.2533 26.6666 23.9067 24.1732 25.6133 20.5866C26.04 19.6932 25.4 18.6666 24.4133 18.6666C23.92 18.6666 23.4533 18.9332 23.24 19.3732C21.7333 22.6132 18.12 24.6666 14.1733 23.7866C11.2133 23.1332 8.82665 20.7199 8.19999 17.7599C7.07999 12.5866 11.0133 7.99991 16 7.99991C18.2133 7.99991 20.1867 8.91991 21.6267 10.3732L19.6133 12.3866C18.7733 13.2266 19.36 14.6666 20.5467 14.6666H25.3333C26.0667 14.6666 26.6667 14.0666 26.6667 13.3332V8.54657C26.6667 7.35991 25.2267 6.75991 24.3867 7.59991L23.5333 8.46657Z" fill="currentColor"/>',List:'<path d="M5.33331 14C4.22665 14 3.33331 14.8933 3.33331 16C3.33331 17.1067 4.22665 18 5.33331 18C6.43998 18 7.33331 17.1067 7.33331 16C7.33331 14.8933 6.43998 14 5.33331 14ZM5.33331 6C4.22665 6 3.33331 6.89333 3.33331 8C3.33331 9.10667 4.22665 10 5.33331 10C6.43998 10 7.33331 9.10667 7.33331 8C7.33331 6.89333 6.43998 6 5.33331 6ZM5.33331 22C4.22665 22 3.33331 22.9067 3.33331 24C3.33331 25.0933 4.23998 26 5.33331 26C6.42665 26 7.33331 25.0933 7.33331 24C7.33331 22.9067 6.43998 22 5.33331 22ZM10.6666 25.3333H26.6666C27.4 25.3333 28 24.7333 28 24C28 23.2667 27.4 22.6667 26.6666 22.6667H10.6666C9.93331 22.6667 9.33331 23.2667 9.33331 24C9.33331 24.7333 9.93331 25.3333 10.6666 25.3333ZM10.6666 17.3333H26.6666C27.4 17.3333 28 16.7333 28 16C28 15.2667 27.4 14.6667 26.6666 14.6667H10.6666C9.93331 14.6667 9.33331 15.2667 9.33331 16C9.33331 16.7333 9.93331 17.3333 10.6666 17.3333ZM9.33331 8C9.33331 8.73333 9.93331 9.33333 10.6666 9.33333H26.6666C27.4 9.33333 28 8.73333 28 8C28 7.26667 27.4 6.66667 26.6666 6.66667H10.6666C9.93331 6.66667 9.33331 7.26667 9.33331 8Z" fill="currentColor"/>',Logout:'<path d="M6.66667 6.66667H14.6667C15.4 6.66667 16 6.06667 16 5.33333C16 4.6 15.4 4 14.6667 4H6.66667C5.2 4 4 5.2 4 6.66667V25.3333C4 26.8 5.2 28 6.66667 28H14.6667C15.4 28 16 27.4 16 26.6667C16 25.9333 15.4 25.3333 14.6667 25.3333H6.66667V6.66667Z" fill="currentColor"/><path d="M27.5333 15.5334L23.8133 11.8134C23.3867 11.3867 22.6667 11.68 22.6667 12.28V14.6667H13.3333C12.6 14.6667 12 15.2667 12 16C12 16.7334 12.6 17.3334 13.3333 17.3334H22.6667V19.72C22.6667 20.32 23.3867 20.6134 23.8 20.1867L27.52 16.4667C27.7867 16.2134 27.7867 15.7867 27.5333 15.5334Z" fill="currentColor"/>',Done:'<path d="M12 21.6L7.33333 16.9333C6.81333 16.4133 5.98666 16.4133 5.46666 16.9333C4.94666 17.4533 4.94666 18.28 5.46666 18.8L11.0533 24.3867C11.5733 24.9067 12.4133 24.9067 12.9333 24.3867L27.0667 10.2667C27.5867 9.74668 27.5867 8.92001 27.0667 8.40001C26.5467 7.88001 25.72 7.88001 25.2 8.40001L12 21.6Z" fill="currentColor"/>',Shield:'<path d="M14.9695 2.46946L6.06407 6.42602C5.14808 6.83313 4.55014 7.74912 4.55014 8.75416V14.7335C4.55014 21.7943 9.43542 28.3971 16 30C22.5646 28.3971 27.4499 21.7943 27.4499 14.7335V8.75416C27.4499 7.74912 26.8519 6.83313 25.936 6.42602L17.0305 2.46946C16.3817 2.17685 15.6184 2.17685 14.9695 2.46946ZM16 15.993H24.9055C24.2312 21.2345 20.7326 25.9035 16 27.3666V16.0057H7.09456V8.75416L16 4.7976V15.993Z" fill="currentColor"/>',Home:'<path d="M13.1738 25.6823V18.7774H18.8259V25.6823C18.8259 26.4418 19.4617 27.0632 20.2389 27.0632H24.478C25.2552 27.0632 25.891 26.4418 25.891 25.6823V16.0155H28.2932C28.9432 16.0155 29.2541 15.2283 28.7595 14.8141L16.9466 4.41538C16.4096 3.94585 15.59 3.94585 15.0531 4.41538L3.24014 14.8141C2.75971 15.2283 3.05645 16.0155 3.70644 16.0155H6.1086V25.6823C6.1086 26.4418 6.74446 27.0632 7.52163 27.0632H11.7607C12.5379 27.0632 13.1738 26.4418 13.1738 25.6823Z" fill="currentColor"/>',Search:'<path d="M28.6531 24.6098C29.0929 25.0976 29.0929 25.8293 28.6043 26.2683L27.2361 27.6341C26.7963 28.122 26.0634 28.122 25.5747 27.6341L20.7372 22.8049C20.4929 22.561 20.3952 22.2683 20.3952 21.9756V21.1463C18.6361 22.5122 16.4861 23.2927 14.1407 23.2927C8.52138 23.2927 3.97708 18.7561 3.97708 13.1463C3.97708 7.58537 8.52138 3 14.1407 3C19.7111 3 24.3043 7.58537 24.3043 13.1463C24.3043 15.5366 23.4736 17.6829 22.1543 19.3902H22.9361C23.2293 19.3902 23.5225 19.5366 23.7668 19.7317L28.6531 24.6098ZM14.1407 19.3902C17.5611 19.3902 20.3952 16.6098 20.3952 13.1463C20.3952 9.73171 17.5611 6.90244 14.1407 6.90244C10.6714 6.90244 7.88616 9.73171 7.88616 13.1463C7.88616 16.6098 10.6714 19.3902 14.1407 19.3902Z" fill="currentColor"/>',Text:'<path d="M3.33337 7.33325C3.33337 8.43992 4.22671 9.33325 5.33337 9.33325H10V23.3333C10 24.4399 10.8934 25.3333 12 25.3333C13.1067 25.3333 14 24.4399 14 23.3333V9.33325H18.6667C19.7734 9.33325 20.6667 8.43992 20.6667 7.33325C20.6667 6.22659 19.7734 5.33325 18.6667 5.33325H5.33337C4.22671 5.33325 3.33337 6.22659 3.33337 7.33325ZM26.6667 11.9999H18.6667C17.56 11.9999 16.6667 12.8933 16.6667 13.9999C16.6667 15.1066 17.56 15.9999 18.6667 15.9999H20.6667V23.3333C20.6667 24.4399 21.56 25.3333 22.6667 25.3333C23.7734 25.3333 24.6667 24.4399 24.6667 23.3333V15.9999H26.6667C27.7734 15.9999 28.6667 15.1066 28.6667 13.9999C28.6667 12.8933 27.7734 11.9999 26.6667 11.9999Z" fill="currentColor"/>',Pad:'<path d="M20 9.72008V4.00008C20 3.26675 19.4 2.66675 18.6666 2.66675H13.3333C12.6 2.66675 12 3.26675 12 4.00008V9.72008C12 9.89341 12.0666 10.0667 12.2 10.1867L15.5333 13.5201C15.8 13.7867 16.2133 13.7867 16.48 13.5201L19.8133 10.1867C19.9333 10.0667 20 9.90675 20 9.72008ZM9.71996 12.0001H3.99996C3.26663 12.0001 2.66663 12.6001 2.66663 13.3334V18.6667C2.66663 19.4001 3.26663 20.0001 3.99996 20.0001H9.71996C9.89329 20.0001 10.0666 19.9334 10.1866 19.8001L13.52 16.4667C13.7866 16.2001 13.7866 15.7867 13.52 15.5201L10.1866 12.1867C10.0666 12.0667 9.90663 12.0001 9.71996 12.0001ZM12 22.2801V28.0001C12 28.7334 12.6 29.3334 13.3333 29.3334H18.6666C19.4 29.3334 20 28.7334 20 28.0001V22.2801C20 22.1067 19.9333 21.9334 19.8 21.8134L16.4666 18.4801C16.2 18.2134 15.7866 18.2134 15.52 18.4801L12.1866 21.8134C12.0666 21.9334 12 22.0934 12 22.2801ZM21.8 12.2001L18.4666 15.5334C18.2 15.8001 18.2 16.2134 18.4666 16.4801L21.8 19.8134C21.92 19.9334 22.0933 20.0134 22.2666 20.0134H28C28.7333 20.0134 29.3333 19.4134 29.3333 18.6801V13.3467C29.3333 12.6134 28.7333 12.0134 28 12.0134H22.28C22.0933 12.0001 21.9333 12.0667 21.8 12.2001Z" fill="currentColor"/>',Check:'<path d="M16.0001 2.66675C8.64008 2.66675 2.66675 8.64008 2.66675 16.0001C2.66675 23.3601 8.64008 29.3334 16.0001 29.3334C23.3601 29.3334 29.3334 23.3601 29.3334 16.0001C29.3334 8.64008 23.3601 2.66675 16.0001 2.66675ZM16.0001 26.6667C10.1201 26.6667 5.33341 21.8801 5.33341 16.0001C5.33341 10.1201 10.1201 5.33341 16.0001 5.33341C21.8801 5.33341 26.6667 10.1201 26.6667 16.0001C26.6667 21.8801 21.8801 26.6667 16.0001 26.6667ZM21.1734 11.0534L13.3334 18.8934L10.8267 16.3867C10.3067 15.8667 9.46675 15.8667 8.94675 16.3867C8.42675 16.9067 8.42675 17.7467 8.94675 18.2667L12.4001 21.7201C12.9201 22.2401 13.7601 22.2401 14.2801 21.7201L23.0667 12.9334C23.5867 12.4134 23.5867 11.5734 23.0667 11.0534C22.5467 10.5334 21.6934 10.5334 21.1734 11.0534Z" fill="currentColor"/>',Clock:'<path d="M20.4 22.2667L22.2667 20.4001L17.3333 15.4667V9.33341H14.6667V16.5334L20.4 22.2667ZM16 29.3334C14.1556 29.3334 12.4222 28.9834 10.8 28.2834C9.17778 27.5834 7.76667 26.6334 6.56667 25.4334C5.36667 24.2334 4.41667 22.8223 3.71667 21.2001C3.01667 19.5779 2.66667 17.8445 2.66667 16.0001C2.66667 14.1556 3.01667 12.4223 3.71667 10.8001C4.41667 9.17786 5.36667 7.76675 6.56667 6.56675C7.76667 5.36675 9.17778 4.41675 10.8 3.71675C12.4222 3.01675 14.1556 2.66675 16 2.66675C17.8444 2.66675 19.5778 3.01675 21.2 3.71675C22.8222 4.41675 24.2333 5.36675 25.4333 6.56675C26.6333 7.76675 27.5833 9.17786 28.2833 10.8001C28.9833 12.4223 29.3333 14.1556 29.3333 16.0001C29.3333 17.8445 28.9833 19.5779 28.2833 21.2001C27.5833 22.8223 26.6333 24.2334 25.4333 25.4334C24.2333 26.6334 22.8222 27.5834 21.2 28.2834C19.5778 28.9834 17.8444 29.3334 16 29.3334ZM16 26.6667C18.9556 26.6667 21.4722 25.6279 23.55 23.5501C25.6278 21.4723 26.6667 18.9556 26.6667 16.0001C26.6667 13.0445 25.6278 10.5279 23.55 8.45008C21.4722 6.3723 18.9556 5.33341 16 5.33341C13.0444 5.33341 10.5278 6.3723 8.45 8.45008C6.37223 10.5279 5.33334 13.0445 5.33334 16.0001C5.33334 18.9556 6.37223 21.4723 8.45 23.5501C10.5278 25.6279 13.0444 26.6667 16 26.6667Z" fill="currentColor"/>',Trophy:'<path d="M25.3333 6.66667H22.6667V5.33333C22.6667 4.6 22.0667 4 21.3333 4H10.6667C9.93333 4 9.33333 4.6 9.33333 5.33333V6.66667H6.66667C5.2 6.66667 4 7.86667 4 9.33333V10.6667C4 14.0667 6.56 16.84 9.85333 17.2533C10.6933 19.2533 12.4933 20.76 14.6667 21.2V25.3333H10.6667C9.93333 25.3333 9.33333 25.9333 9.33333 26.6667C9.33333 27.4 9.93333 28 10.6667 28H21.3333C22.0667 28 22.6667 27.4 22.6667 26.6667C22.6667 25.9333 22.0667 25.3333 21.3333 25.3333H17.3333V21.2C19.5067 20.76 21.3067 19.2533 22.1467 17.2533C25.44 16.84 28 14.0667 28 10.6667V9.33333C28 7.86667 26.8 6.66667 25.3333 6.66667ZM6.66667 10.6667V9.33333H9.33333V14.4267C7.78667 13.8667 6.66667 12.4 6.66667 10.6667ZM25.3333 10.6667C25.3333 12.4 24.2133 13.8667 22.6667 14.4267V9.33333H25.3333V10.6667Z" fill="currentColor"/>',Mic:'<path d="M16 18.6667C18.2133 18.6667 20 16.8801 20 14.6667V6.66675C20 4.45341 18.2133 2.66675 16 2.66675C13.7867 2.66675 12 4.45341 12 6.66675V14.6667C12 16.8801 13.7867 18.6667 16 18.6667ZM23.88 14.6667C23.2267 14.6667 22.68 15.1467 22.5733 15.8001C22.0267 18.9334 19.2933 21.3334 16 21.3334C12.7067 21.3334 9.97334 18.9334 9.42667 15.8001C9.32 15.1467 8.77334 14.6667 8.12 14.6667C7.30667 14.6667 6.66667 15.3867 6.78667 16.1867C7.44 20.1867 10.64 23.3201 14.6667 23.8934V26.6667C14.6667 27.4001 15.2667 28.0001 16 28.0001C16.7333 28.0001 17.3333 27.4001 17.3333 26.6667V23.8934C21.36 23.3201 24.56 20.1867 25.2133 16.1867C25.3467 15.3867 24.6933 14.6667 23.88 14.6667Z" fill="currentColor"/>',"Up/Down":'<path d="M11.4374 2.94082L7.31426 7.06396C6.84136 7.52209 7.16648 8.32012 7.8315 8.32012H10.4768V17.2019C10.4768 18.0147 11.1418 18.6797 11.9547 18.6797C12.7675 18.6797 13.4325 18.0147 13.4325 17.2019V8.32012H16.0778C16.7428 8.32012 17.0679 7.52209 16.595 7.06396L12.4719 2.94082C12.1911 2.66003 11.7182 2.66003 11.4374 2.94082ZM22.2995 23.128V14.2462C22.2995 13.4334 21.6344 12.7684 20.8216 12.7684C20.0088 12.7684 19.3438 13.4334 19.3438 14.2462V23.128H16.6985C16.0335 23.128 15.7083 23.926 16.1812 24.3841L20.3044 28.4925C20.6 28.7733 21.0581 28.7733 21.3537 28.4925L25.4768 24.3841C25.9497 23.926 25.6098 23.128 24.9596 23.128H22.2995Z" fill="currentColor"/>',"Check Filled":'<path d="M16 2.6665C8.64002 2.6665 2.66669 8.63984 2.66669 15.9998C2.66669 23.3598 8.64002 29.3332 16 29.3332C23.36 29.3332 29.3334 23.3598 29.3334 15.9998C29.3334 8.63984 23.36 2.6665 16 2.6665ZM12.3867 21.7198L7.60002 16.9332C7.08002 16.4132 7.08002 15.5732 7.60002 15.0532C8.12002 14.5332 8.96002 14.5332 9.48002 15.0532L13.3334 18.8932L22.5067 9.71984C23.0267 9.19984 23.8667 9.19984 24.3867 9.71984C24.9067 10.2398 24.9067 11.0798 24.3867 11.5998L14.2667 21.7198C13.76 22.2398 12.9067 22.2398 12.3867 21.7198Z" fill="currentColor"/>',Account:'<path d="M16 2.66675C8.64 2.66675 2.66666 8.64008 2.66666 16.0001C2.66666 23.3601 8.64 29.3334 16 29.3334C23.36 29.3334 29.3333 23.3601 29.3333 16.0001C29.3333 8.64008 23.36 2.66675 16 2.66675ZM16 8.00008C18.5733 8.00008 20.6667 10.0934 20.6667 12.6667C20.6667 15.2401 18.5733 17.3334 16 17.3334C13.4267 17.3334 11.3333 15.2401 11.3333 12.6667C11.3333 10.0934 13.4267 8.00008 16 8.00008ZM16 26.6667C13.2933 26.6667 10.0933 25.5734 7.81333 22.8267C10.0667 21.0667 12.9067 20.0001 16 20.0001C19.0933 20.0001 21.9333 21.0667 24.1867 22.8267C21.9067 25.5734 18.7067 26.6667 16 26.6667Z" fill="currentColor"/>',Fire:'<path d="M22.7867 6.07994C21.8533 4.70661 20.7867 3.42661 19.5867 2.27995C19.12 1.82661 18.3333 2.25328 18.4667 2.89328C18.72 4.14661 18.9867 5.79994 18.9867 7.27994C18.9867 10.0266 17.1867 12.2533 14.44 12.2533C12.3867 12.2533 10.7067 11.0133 9.97334 9.23994C9.84 8.97328 9.78667 8.81328 9.70667 8.51994C9.56 7.95994 8.82667 7.78661 8.50667 8.27994C8.26667 8.63994 8.04 8.99994 7.82667 9.38661C6.24 12.1066 5.33334 15.2799 5.33334 18.6666C5.33334 24.5599 10.1067 29.3333 16 29.3333C21.8933 29.3333 26.6667 24.5599 26.6667 18.6666C26.6667 14.0133 25.2267 9.69328 22.7867 6.07994ZM15.6133 25.3333C13.24 25.3333 11.32 23.4666 11.32 21.1466C11.32 18.9866 12.72 17.4666 15.0667 16.9866C17.0267 16.5866 19.04 15.7466 20.44 14.4266C20.8133 14.0799 21.4267 14.2399 21.5333 14.7333C21.84 16.0933 22 17.5066 22 18.9333C22.0133 22.4666 19.1467 25.3333 15.6133 25.3333Z" fill="currentColor"/>',"Chevron Right":'<path d="M12.3867 8.94661C11.8667 9.46661 11.8667 10.3066 12.3867 10.8266L17.56 15.9999L12.3867 21.1733C11.8667 21.6933 11.8667 22.5333 12.3867 23.0533C12.9067 23.5733 13.7467 23.5733 14.2667 23.0533L20.3867 16.9333C20.9067 16.4133 20.9067 15.5733 20.3867 15.0533L14.2667 8.93328C13.76 8.42661 12.9067 8.42661 12.3867 8.94661Z" fill="currentColor"/>',Plus:'<path d="M24 17.3334H17.3333V24.0001C17.3333 24.7334 16.7333 25.3334 16 25.3334C15.2667 25.3334 14.6667 24.7334 14.6667 24.0001V17.3334H8.00001C7.26667 17.3334 6.66667 16.7334 6.66667 16.0001C6.66667 15.2667 7.26667 14.6667 8.00001 14.6667H14.6667V8.00008C14.6667 7.26675 15.2667 6.66675 16 6.66675C16.7333 6.66675 17.3333 7.26675 17.3333 8.00008V14.6667H24C24.7333 14.6667 25.3333 15.2667 25.3333 16.0001C25.3333 16.7334 24.7333 17.3334 24 17.3334Z" fill="currentColor"/>',Group:'<path d="M21.3333 14.6667C23.5467 14.6667 25.32 12.8801 25.32 10.6667C25.32 8.45341 23.5467 6.66675 21.3333 6.66675C19.12 6.66675 17.3333 8.45341 17.3333 10.6667C17.3333 12.8801 19.12 14.6667 21.3333 14.6667ZM10.6667 14.6667C12.88 14.6667 14.6533 12.8801 14.6533 10.6667C14.6533 8.45341 12.88 6.66675 10.6667 6.66675C8.45334 6.66675 6.66668 8.45341 6.66668 10.6667C6.66668 12.8801 8.45334 14.6667 10.6667 14.6667ZM10.6667 17.3334C7.56001 17.3334 1.33334 18.8934 1.33334 22.0001V24.0001C1.33334 24.7334 1.93334 25.3334 2.66668 25.3334H18.6667C19.4 25.3334 20 24.7334 20 24.0001V22.0001C20 18.8934 13.7733 17.3334 10.6667 17.3334ZM21.3333 17.3334C20.9467 17.3334 20.5067 17.3601 20.04 17.4001C20.0667 17.4134 20.08 17.4401 20.0933 17.4534C21.6133 18.5601 22.6667 20.0401 22.6667 22.0001V24.0001C22.6667 24.4667 22.5733 24.9201 22.4267 25.3334H29.3333C30.0667 25.3334 30.6667 24.7334 30.6667 24.0001V22.0001C30.6667 18.8934 24.44 17.3334 21.3333 17.3334Z" fill="currentColor"/>',Cross:'<path d="M24.4 7.61329C23.88 7.09329 23.04 7.09329 22.52 7.61329L16 14.12L9.47999 7.59996C8.95999 7.07996 8.11999 7.07996 7.59999 7.59996C7.07999 8.11996 7.07999 8.95996 7.59999 9.47996L14.12 16L7.59999 22.52C7.07999 23.04 7.07999 23.88 7.59999 24.4C8.11999 24.92 8.95999 24.92 9.47999 24.4L16 17.88L22.52 24.4C23.04 24.92 23.88 24.92 24.4 24.4C24.92 23.88 24.92 23.04 24.4 22.52L17.88 16L24.4 9.47996C24.9067 8.97329 24.9067 8.11996 24.4 7.61329Z" fill="currentColor"/>',Gamepad:'<path d="M28.7733 21.4534L27.32 11.2401C26.9467 8.61342 24.6933 6.66675 22.04 6.66675H9.96C7.30667 6.66675 5.05334 8.61342 4.68001 11.2401L3.22667 21.4534C2.93334 23.5067 4.52001 25.3334 6.58667 25.3334C7.49334 25.3334 8.34667 24.9734 8.98667 24.3334L12 21.3334H20L23 24.3334C23.64 24.9734 24.5067 25.3334 25.4 25.3334C27.48 25.3334 29.0667 23.5067 28.7733 21.4534ZM14.6667 14.6667H12V17.3334H10.6667V14.6667H8.00001V13.3334H10.6667V10.6667H12V13.3334H14.6667V14.6667ZM20 13.3334C19.2667 13.3334 18.6667 12.7334 18.6667 12.0001C18.6667 11.2667 19.2667 10.6667 20 10.6667C20.7333 10.6667 21.3333 11.2667 21.3333 12.0001C21.3333 12.7334 20.7333 13.3334 20 13.3334ZM22.6667 17.3334C21.9333 17.3334 21.3333 16.7334 21.3333 16.0001C21.3333 15.2667 21.9333 14.6667 22.6667 14.6667C23.4 14.6667 24 15.2667 24 16.0001C24 16.7334 23.4 17.3334 22.6667 17.3334Z" fill="currentColor"/>',Leaderboard:'<path d="M8.66666 28H3.99999C3.26666 28 2.66666 27.4 2.66666 26.6667V13.3333C2.66666 12.6 3.26666 12 3.99999 12H8.66666C9.39999 12 9.99999 12.6 9.99999 13.3333V26.6667C9.99999 27.4 9.39999 28 8.66666 28ZM18.3333 4H13.6667C12.9333 4 12.3333 4.6 12.3333 5.33333V26.6667C12.3333 27.4 12.9333 28 13.6667 28H18.3333C19.0667 28 19.6667 27.4 19.6667 26.6667V5.33333C19.6667 4.6 19.0667 4 18.3333 4ZM28 14.6667H23.3333C22.6 14.6667 22 15.2667 22 16V26.6667C22 27.4 22.6 28 23.3333 28H28C28.7333 28 29.3333 27.4 29.3333 26.6667V16C29.3333 15.2667 28.7333 14.6667 28 14.6667Z" fill="currentColor"/>',Info:'<path d="M14.6667 9.33341H17.3333V12.0001H14.6667V9.33341ZM16 22.6667C16.7333 22.6667 17.3333 22.0667 17.3333 21.3334V16.0001C17.3333 15.2667 16.7333 14.6667 16 14.6667C15.2667 14.6667 14.6667 15.2667 14.6667 16.0001V21.3334C14.6667 22.0667 15.2667 22.6667 16 22.6667ZM16 2.66675C8.63999 2.66675 2.66666 8.64008 2.66666 16.0001C2.66666 23.3601 8.63999 29.3334 16 29.3334C23.36 29.3334 29.3333 23.3601 29.3333 16.0001C29.3333 8.64008 23.36 2.66675 16 2.66675ZM16 26.6667C10.12 26.6667 5.33332 21.8801 5.33332 16.0001C5.33332 10.1201 10.12 5.33341 16 5.33341C21.88 5.33341 26.6667 10.1201 26.6667 16.0001C26.6667 21.8801 21.88 26.6667 16 26.6667Z" fill="currentColor"/>',Alert:'<path d="M16 9.33341C16.7334 9.33341 17.3334 9.93341 17.3334 10.6667V16.0001C17.3334 16.7334 16.7334 17.3334 16 17.3334C15.2667 17.3334 14.6667 16.7334 14.6667 16.0001V10.6667C14.6667 9.93341 15.2667 9.33341 16 9.33341ZM15.9867 2.66675C8.62669 2.66675 2.66669 8.64008 2.66669 16.0001C2.66669 23.3601 8.62669 29.3334 15.9867 29.3334C23.36 29.3334 29.3334 23.3601 29.3334 16.0001C29.3334 8.64008 23.36 2.66675 15.9867 2.66675ZM16 26.6667C10.1067 26.6667 5.33335 21.8934 5.33335 16.0001C5.33335 10.1067 10.1067 5.33341 16 5.33341C21.8934 5.33341 26.6667 10.1067 26.6667 16.0001C26.6667 21.8934 21.8934 26.6667 16 26.6667ZM17.3334 22.6667H14.6667V20.0001H17.3334V22.6667Z" fill="currentColor"/>',"Mic Off":'<path d="M20 14.1334V6.66675C20 4.45341 18.2133 2.66675 16 2.66675C13.9466 2.66675 12.28 4.21341 12.0533 6.20008L20 14.1334ZM24.1066 14.6667C23.56 14.6667 23.08 15.0667 23 15.6134C22.9333 16.0401 22.84 16.4667 22.7066 16.8534L24.4 18.5467C24.8 17.7467 25.0933 16.8801 25.24 15.9601C25.3333 15.2801 24.8 14.6667 24.1066 14.6667ZM4.94664 4.74675C4.42664 5.26675 4.42664 6.10675 4.94664 6.62675L12 13.6934V14.2667C12 15.8534 12.8 17.3601 14.1733 18.1467C15.1733 18.7201 16.0533 18.7334 16.8666 18.5601L19.08 20.7734C18.1333 21.2134 17.08 21.4667 16 21.4667C12.6133 21.4667 9.49331 19.1067 8.99997 15.6134C8.91997 15.0667 8.43997 14.6667 7.89331 14.6667C7.19997 14.6667 6.66664 15.2801 6.75997 15.9601C7.37331 19.9067 10.7066 23.0267 14.6666 23.6267V26.6667C14.6666 27.4001 15.2666 28.0001 16 28.0001C16.7333 28.0001 17.3333 27.4001 17.3333 26.6667V23.6267C18.5466 23.4534 19.6933 23.0267 20.7333 22.4267L25.3866 27.0801C25.9066 27.6001 26.7466 27.6001 27.2666 27.0801C27.7866 26.5601 27.7866 25.7201 27.2666 25.2001L6.82664 4.74675C6.30664 4.22675 5.46664 4.22675 4.94664 4.74675Z" fill="currentColor"/>',"Cloud Off":'<path d="M32 19.9999C32 16.4799 29.2667 13.6266 25.8 13.3866C24.8933 8.78659 20.8533 5.33325 16 5.33325C14.2267 5.33325 12.5733 5.81325 11.1333 6.62659L13.12 8.61325C14.0133 8.22659 14.9733 7.99992 16 7.99992C20.0533 7.99992 23.3333 11.2799 23.3333 15.3333V15.9999H25.3333C27.5467 15.9999 29.3333 17.7866 29.3333 19.9999C29.3333 21.3199 28.6933 22.4666 27.72 23.1999L29.6 25.0799C31.0533 23.8533 32 22.0533 32 19.9999ZM4.94667 6.07992C4.42667 6.59992 4.42667 7.43992 4.94667 7.95992L7.69333 10.7066H7.13333C2.76 11.1733 -0.546668 15.1599 0.0799986 19.7599C0.613332 23.7866 4.25333 26.6666 8.29333 26.6666H23.64L25.36 28.3866C25.88 28.9066 26.72 28.9066 27.24 28.3866C27.76 27.8666 27.76 27.0266 27.24 26.5066L6.82667 6.07992C6.30667 5.55992 5.46667 5.55992 4.94667 6.07992ZM8 23.9999C5.05333 23.9999 2.66667 21.6133 2.66667 18.6666C2.66667 15.7199 5.05333 13.3333 8 13.3333H10.3067L20.9733 23.9999H8Z" fill="currentColor"/>',Cloud:'<path d="M25.8 13.3866C24.8933 8.78659 20.8533 5.33325 16 5.33325C12.1467 5.33325 8.8 7.51992 7.13333 10.7199C3.12 11.1466 0 14.5466 0 18.6666C0 23.0799 3.58667 26.6666 8 26.6666H25.3333C29.0133 26.6666 32 23.6799 32 19.9999C32 16.4799 29.2667 13.6266 25.8 13.3866ZM25.3333 23.9999H8C5.05333 23.9999 2.66667 21.6133 2.66667 18.6666C2.66667 15.7199 5.05333 13.3333 8 13.3333H8.94667C9.82667 10.2533 12.64 7.99992 16 7.99992C20.0533 7.99992 23.3333 11.2799 23.3333 15.3333V15.9999H25.3333C27.5467 15.9999 29.3333 17.7866 29.3333 19.9999C29.3333 22.2133 27.5467 23.9999 25.3333 23.9999Z" fill="currentColor"/>',Global:'<path d="M16 2.66675C8.64002 2.66675 2.66669 8.64008 2.66669 16.0001C2.66669 23.3601 8.64002 29.3334 16 29.3334C23.36 29.3334 29.3334 23.3601 29.3334 16.0001C29.3334 8.64008 23.36 2.66675 16 2.66675ZM14.6667 26.5734C9.40002 25.9201 5.33335 21.4401 5.33335 16.0001C5.33335 15.1734 5.44002 14.3867 5.61335 13.6134L12 20.0001V21.3334C12 22.8001 13.2 24.0001 14.6667 24.0001V26.5734ZM23.8667 23.1867C23.52 22.1067 22.5334 21.3334 21.3334 21.3334H20V17.3334C20 16.6001 19.4 16.0001 18.6667 16.0001H10.6667V13.3334H13.3334C14.0667 13.3334 14.6667 12.7334 14.6667 12.0001V9.33341H17.3334C18.8 9.33341 20 8.13341 20 6.66675V6.12008C23.9067 7.70675 26.6667 11.5334 26.6667 16.0001C26.6667 18.7734 25.6 21.2934 23.8667 23.1867Z" fill="currentColor"/>',"Prize Outline":'<path d="M25.3333 6.66667H22.6667V4H9.33333V6.66667H6.66667C5.2 6.66667 4 7.86667 4 9.33333V10.6667C4 14.0667 6.56 16.84 9.85333 17.2533C10.6933 19.2533 12.4933 20.76 14.6667 21.2V25.3333H9.33333V28H22.6667V25.3333H17.3333V21.2C19.5067 20.76 21.3067 19.2533 22.1467 17.2533C25.44 16.84 28 14.0667 28 10.6667V9.33333C28 7.86667 26.8 6.66667 25.3333 6.66667ZM6.66667 10.6667V9.33333H9.33333V14.4267C7.78667 13.8667 6.66667 12.4 6.66667 10.6667ZM16 18.6667C13.8 18.6667 12 16.8667 12 14.6667V6.66667H20V14.6667C20 16.8667 18.2 18.6667 16 18.6667ZM25.3333 10.6667C25.3333 12.4 24.2133 13.8667 22.6667 14.4267V9.33333H25.3333V10.6667Z" fill="currentColor"/>',Calendar:'<path d="M25.2689 5.57259H24.1103V4.41398C24.1103 3.77675 23.5889 3.25537 22.9517 3.25537C22.3145 3.25537 21.7931 3.77675 21.7931 4.41398V5.57259H10.207V4.41398C10.207 3.77675 9.68562 3.25537 9.04838 3.25537C8.41114 3.25537 7.88977 3.77675 7.88977 4.41398V5.57259H6.73116C5.45669 5.57259 4.41394 6.61534 4.41394 7.88981V26.4276C4.41394 27.702 5.45669 28.7448 6.73116 28.7448H25.2689C26.5434 28.7448 27.5861 27.702 27.5861 26.4276V7.88981C27.5861 6.61534 26.5434 5.57259 25.2689 5.57259ZM24.1103 26.4276H7.88977C7.25253 26.4276 6.73116 25.9062 6.73116 25.269V11.3656H25.2689V25.269C25.2689 25.9062 24.7475 26.4276 24.1103 26.4276Z" fill="currentColor"/>',Avatar:'<path d="M16 0C7.168 0 0 7.168 0 16C0 24.832 7.168 32 16 32C24.832 32 32 24.832 32 16C32 7.168 24.832 0 16 0Z" fill="currentColor"/>',Email:'<path d="M16.96 2.70659C8.84005 2.13326 2.13338 8.83993 2.70672 16.9599C3.18672 24.0133 9.34672 29.3333 16.4134 29.3333H21.3334C22.0667 29.3333 22.6667 28.7333 22.6667 27.9999C22.6667 27.2666 22.0667 26.6666 21.3334 26.6666H16.44C11.4667 26.6666 6.90672 23.4399 5.66672 18.6266C3.68005 10.8933 10.88 3.67993 18.6134 5.67993C23.44 6.90659 26.6667 11.4666 26.6667 16.4399V17.9066C26.6667 18.9599 25.72 19.9999 24.6667 19.9999C23.6134 19.9999 22.6667 18.9599 22.6667 17.9066V16.2399C22.6667 12.8933 20.2934 9.87993 16.9867 9.41326C12.4534 8.75993 8.62672 12.6799 9.44005 17.2399C9.89338 19.7866 11.88 21.8933 14.4 22.4933C16.8534 23.0666 19.1867 22.2799 20.72 20.7199C21.9067 22.3466 24.2801 23.1999 26.4534 22.3333C28.24 21.6266 29.3334 19.7999 29.3334 17.8799V16.4266C29.3334 9.34659 24.0134 3.18659 16.96 2.70659ZM16 19.9999C13.7867 19.9999 12 18.2133 12 15.9999C12 13.7866 13.7867 11.9999 16 11.9999C18.2134 11.9999 20 13.7866 20 15.9999C20 18.2133 18.2134 19.9999 16 19.9999Z" fill="currentColor"/>',Edit:'<path d="M4 23.2799V27.3333C4 27.7066 4.29333 27.9999 4.66667 27.9999H8.72C8.89333 27.9999 9.06667 27.9333 9.18667 27.7999L23.7467 13.2532L18.7467 8.25325L4.2 22.7999C4.06667 22.9332 4 23.0932 4 23.2799ZM27.6133 9.38658C28.1333 8.86658 28.1333 8.02658 27.6133 7.50658L24.4933 4.38658C23.9733 3.86658 23.1333 3.86658 22.6133 4.38658L20.1733 6.82658L25.1733 11.8266L27.6133 9.38658Z" fill="currentColor"/>',Lock:'<path d="M8.00004 29.3333C7.26671 29.3333 6.63893 29.0721 6.11671 28.5499C5.59449 28.0277 5.33337 27.3999 5.33337 26.6666V13.3333C5.33337 12.5999 5.59449 11.9721 6.11671 11.4499C6.63893 10.9277 7.26671 10.6666 8.00004 10.6666H9.33337V7.99992C9.33337 6.15547 9.98337 4.58325 11.2834 3.28325C12.5834 1.98325 14.1556 1.33325 16 1.33325C17.8445 1.33325 19.4167 1.98325 20.7167 3.28325C22.0167 4.58325 22.6667 6.15547 22.6667 7.99992V10.6666H24C24.7334 10.6666 25.3612 10.9277 25.8834 11.4499C26.4056 11.9721 26.6667 12.5999 26.6667 13.3333V26.6666C26.6667 27.3999 26.4056 28.0277 25.8834 28.5499C25.3612 29.0721 24.7334 29.3333 24 29.3333H8.00004ZM8.00004 26.6666H24V13.3333H8.00004V26.6666ZM17.8834 21.8833C18.4056 21.361 18.6667 20.7333 18.6667 19.9999C18.6667 19.2666 18.4056 18.6388 17.8834 18.1166C17.3612 17.5944 16.7334 17.3333 16 17.3333C15.2667 17.3333 14.6389 17.5944 14.1167 18.1166C13.5945 18.6388 13.3334 19.2666 13.3334 19.9999C13.3334 20.7333 13.5945 21.361 14.1167 21.8833C14.6389 22.4055 15.2667 22.6666 16 22.6666C16.7334 22.6666 17.3612 22.4055 17.8834 21.8833ZM12 10.6666H20V7.99992C20 6.88881 19.6112 5.94436 18.8334 5.16659C18.0556 4.38881 17.1112 3.99992 16 3.99992C14.8889 3.99992 13.9445 4.38881 13.1667 5.16659C12.3889 5.94436 12 6.88881 12 7.99992V10.6666Z" fill="currentColor"/>',"Lock Filled":'<path d="M24 10.6666H22.6667V7.99992C22.6667 4.31992 19.68 1.33325 16 1.33325C12.32 1.33325 9.33337 4.31992 9.33337 7.99992V10.6666H8.00004C6.53337 10.6666 5.33337 11.8666 5.33337 13.3333V26.6666C5.33337 28.1333 6.53337 29.3333 8.00004 29.3333H24C25.4667 29.3333 26.6667 28.1333 26.6667 26.6666V13.3333C26.6667 11.8666 25.4667 10.6666 24 10.6666ZM16 22.6666C14.5334 22.6666 13.3334 21.4666 13.3334 19.9999C13.3334 18.5333 14.5334 17.3333 16 17.3333C17.4667 17.3333 18.6667 18.5333 18.6667 19.9999C18.6667 21.4666 17.4667 22.6666 16 22.6666ZM12 10.6666V7.99992C12 5.78659 13.7867 3.99992 16 3.99992C18.2134 3.99992 20 5.78659 20 7.99992V10.6666H12Z" fill="currentColor"/>',Timer:'<path d="M13.3333 3.99992H18.6667C19.4 3.99992 20 3.39992 20 2.66659C20 1.93325 19.4 1.33325 18.6667 1.33325H13.3333C12.6 1.33325 12 1.93325 12 2.66659C12 3.39992 12.6 3.99992 13.3333 3.99992Z" fill="currentColor"/><path d="M25.3733 9.85325L26.3733 8.85325C26.88 8.34659 26.8933 7.50659 26.3733 6.98659L26.36 6.97325C25.84 6.45325 25.0133 6.46659 24.4933 6.97325L23.4933 7.97325C21.4267 6.31992 18.8267 5.33325 16 5.33325C9.60001 5.33325 4.16001 10.6133 4.00001 17.0133C3.82668 23.7866 9.25335 29.3333 16 29.3333C22.64 29.3333 28 23.9599 28 17.3333C28 14.5066 27.0133 11.9066 25.3733 9.85325ZM17.3333 17.3333C17.3333 18.0666 16.7333 18.6666 16 18.6666C15.2667 18.6666 14.6667 18.0666 14.6667 17.3333V11.9999C14.6667 11.2666 15.2667 10.6666 16 10.6666C16.7333 10.6666 17.3333 11.2666 17.3333 11.9999V17.3333Z" fill="currentColor"/>',Help:'<path d="M16 2.66675C8.63996 2.66675 2.66663 8.64008 2.66663 16.0001C2.66663 23.3601 8.63996 29.3334 16 29.3334C23.36 29.3334 29.3333 23.3601 29.3333 16.0001C29.3333 8.64008 23.36 2.66675 16 2.66675ZM16 26.6667C10.12 26.6667 5.33329 21.8801 5.33329 16.0001C5.33329 10.1201 10.12 5.33341 16 5.33341C21.88 5.33341 26.6666 10.1201 26.6666 16.0001C26.6666 21.8801 21.88 26.6667 16 26.6667ZM14.6666 21.3334H17.3333V24.0001H14.6666V21.3334ZM16.8133 8.05341C14.0666 7.65341 11.64 9.34675 10.9066 11.7734C10.6666 12.5467 11.2533 13.3334 12.0666 13.3334H12.3333C12.88 13.3334 13.32 12.9467 13.5066 12.4401C13.9333 11.2534 15.2 10.4401 16.5733 10.7334C17.84 11.0001 18.7733 12.2401 18.6666 13.5334C18.5333 15.3201 16.5066 15.7067 15.4 17.3734C15.4 17.3867 15.3866 17.3867 15.3866 17.4001C15.3733 17.4267 15.36 17.4401 15.3466 17.4667C15.2266 17.6667 15.1066 17.8934 15.0133 18.1334C15 18.1734 14.9733 18.2001 14.96 18.2401C14.9466 18.2667 14.9466 18.2934 14.9333 18.3334C14.7733 18.7867 14.6666 19.3334 14.6666 20.0001H17.3333C17.3333 19.4401 17.48 18.9734 17.7066 18.5734C17.7333 18.5334 17.7466 18.4934 17.7733 18.4534C17.88 18.2667 18.0133 18.0934 18.1466 17.9334C18.16 17.9201 18.1733 17.8934 18.1866 17.8801C18.32 17.7201 18.4666 17.5734 18.6266 17.4267C19.9066 16.2134 21.64 15.2267 21.28 12.6801C20.96 10.3601 19.1333 8.40008 16.8133 8.05341Z" fill="currentColor"/>',Delete:'<path d="M9.33337 28C8.60004 28 7.97226 27.7389 7.45004 27.2167C6.92782 26.6944 6.66671 26.0667 6.66671 25.3333V8H5.33337V5.33333H12V4H20V5.33333H26.6667V8H25.3334V25.3333C25.3334 26.0667 25.0723 26.6944 24.55 27.2167C24.0278 27.7389 23.4 28 22.6667 28H9.33337ZM22.6667 8H9.33337V25.3333H22.6667V8ZM12 22.6667H14.6667V10.6667H12V22.6667ZM17.3334 22.6667H20V10.6667H17.3334V22.6667Z" fill="currentColor"/>',Keyboard:'<path d="M4.00004 26.6666C3.26671 26.6666 2.63893 26.4055 2.11671 25.8833C1.59449 25.361 1.33337 24.7333 1.33337 23.9999V7.99992C1.33337 7.26659 1.59449 6.63881 2.11671 6.11659C2.63893 5.59436 3.26671 5.33325 4.00004 5.33325H28C28.7334 5.33325 29.3612 5.59436 29.8834 6.11659C30.4056 6.63881 30.6667 7.26659 30.6667 7.99992V23.9999C30.6667 24.7333 30.4056 25.361 29.8834 25.8833C29.3612 26.4055 28.7334 26.6666 28 26.6666H4.00004ZM4.00004 23.9999H28V7.99992H4.00004V23.9999ZM10.6667 22.6666H21.3334V19.9999H10.6667V22.6666ZM6.66671 17.9999H9.33337V15.3333H6.66671V17.9999ZM12 17.9999H14.6667V15.3333H12V17.9999ZM17.3334 17.9999H20V15.3333H17.3334V17.9999ZM22.6667 17.9999H25.3334V15.3333H22.6667V17.9999ZM6.66671 13.3333H9.33337V10.6666H6.66671V13.3333ZM12 13.3333H14.6667V10.6666H12V13.3333ZM17.3334 13.3333H20V10.6666H17.3334V13.3333ZM22.6667 13.3333H25.3334V10.6666H22.6667V13.3333Z" fill="currentColor"/>',Identity:'<path d="M12.7 15.9667C11.7889 15.0556 11.3333 13.9556 11.3333 12.6667C11.3333 11.3778 11.7889 10.2778 12.7 9.36667C13.6111 8.45556 14.7111 8 16 8C17.2889 8 18.3889 8.45556 19.3 9.36667C20.2111 10.2778 20.6667 11.3778 20.6667 12.6667C20.6667 13.9556 20.2111 15.0556 19.3 15.9667C18.3889 16.8778 17.2889 17.3333 16 17.3333C14.7111 17.3333 13.6111 16.8778 12.7 15.9667ZM17.4167 14.0833C17.8056 13.6944 18 13.2222 18 12.6667C18 12.1111 17.8056 11.6389 17.4167 11.25C17.0278 10.8611 16.5556 10.6667 16 10.6667C15.4444 10.6667 14.9722 10.8611 14.5833 11.25C14.1944 11.6389 14 12.1111 14 12.6667C14 13.2222 14.1944 13.6944 14.5833 14.0833C14.9722 14.4722 15.4444 14.6667 16 14.6667C16.5556 14.6667 17.0278 14.4722 17.4167 14.0833ZM16 30L4 22.6667V9.33333L16 2L28 9.33333V22.6667L16 30ZM16 26.9L20.9 23.8667C20.1444 23.4667 19.35 23.1667 18.5167 22.9667C17.6833 22.7667 16.8444 22.6667 16 22.6667C15.1556 22.6667 14.3167 22.7667 13.4833 22.9667C12.65 23.1667 11.8556 23.4667 11.1 23.8667L16 26.9ZM8.53333 22.3C9.64444 21.5444 10.8333 20.9722 12.1 20.5833C13.3667 20.1944 14.6667 20 16 20C17.3333 20 18.6333 20.1944 19.9 20.5833C21.1667 20.9722 22.3556 21.5444 23.4667 22.3L25.3333 21.2V10.8333L16 5.13333L6.66667 10.8333V21.2L8.53333 22.3Z" fill="currentColor"/>',Invite:'<path d="M29.3333 11.9999V10.6666C29.3333 9.93325 28.7333 9.33325 28 9.33325C27.2667 9.33325 26.6667 9.93325 26.6667 10.6666V11.9999H25.3333C24.6 11.9999 24 12.5999 24 13.3333C24 14.0666 24.6 14.6666 25.3333 14.6666H26.6667V15.9999C26.6667 16.7333 27.2667 17.3333 28 17.3333C28.7333 17.3333 29.3333 16.7333 29.3333 15.9999V14.6666H30.6667C31.4 14.6666 32 14.0666 32 13.3333C32 12.5999 31.4 11.9999 30.6667 11.9999H29.3333Z" fill="currentColor"/><path d="M10.6667 15.9999C13.6133 15.9999 16 13.6133 16 10.6666C16 7.71992 13.6133 5.33325 10.6667 5.33325C7.72001 5.33325 5.33334 7.71992 5.33334 10.6666C5.33334 13.6133 7.72001 15.9999 10.6667 15.9999Z" fill="currentColor"/><path d="M10.6667 17.3333C7.10667 17.3333 0 19.1199 0 22.6666V26.6666H21.3333V22.6666C21.3333 19.1199 14.2267 17.3333 10.6667 17.3333Z" fill="currentColor"/>',Crown:'<path d="M6.66663 26.6667V24.0001H25.3333V26.6667H6.66663ZM6.66663 22.0001L4.96663 11.3001C4.92218 11.3001 4.87218 11.3056 4.81663 11.3167C4.76107 11.3279 4.71107 11.3334 4.66663 11.3334C4.11107 11.3334 3.63885 11.139 3.24996 10.7501C2.86107 10.3612 2.66663 9.88897 2.66663 9.33342C2.66663 8.77786 2.86107 8.30564 3.24996 7.91675C3.63885 7.52786 4.11107 7.33342 4.66663 7.33342C5.22218 7.33342 5.6944 7.52786 6.08329 7.91675C6.47218 8.30564 6.66663 8.77786 6.66663 9.33342C6.66663 9.48897 6.64996 9.63342 6.61663 9.76675C6.58329 9.90008 6.5444 10.0223 6.49996 10.1334L10.6666 12.0001L14.8333 6.30008C14.5888 6.1223 14.3888 5.88897 14.2333 5.60008C14.0777 5.31119 14 5.00008 14 4.66675C14 4.11119 14.1944 3.63897 14.5833 3.25008C14.9722 2.86119 15.4444 2.66675 16 2.66675C16.5555 2.66675 17.0277 2.86119 17.4166 3.25008C17.8055 3.63897 18 4.11119 18 4.66675C18 5.00008 17.9222 5.31119 17.7666 5.60008C17.6111 5.88897 17.4111 6.1223 17.1666 6.30008L21.3333 12.0001L25.5 10.1334C25.4555 10.0223 25.4166 9.90008 25.3833 9.76675C25.35 9.63342 25.3333 9.48897 25.3333 9.33342C25.3333 8.77786 25.5277 8.30564 25.9166 7.91675C26.3055 7.52786 26.7777 7.33342 27.3333 7.33342C27.8888 7.33342 28.3611 7.52786 28.75 7.91675C29.1388 8.30564 29.3333 8.77786 29.3333 9.33342C29.3333 9.88897 29.1388 10.3612 28.75 10.7501C28.3611 11.139 27.8888 11.3334 27.3333 11.3334C27.2888 11.3334 27.2388 11.3279 27.1833 11.3167C27.1277 11.3056 27.0777 11.3001 27.0333 11.3001L25.3333 22.0001H6.66663ZM8.93329 19.3334H23.0666L23.9333 13.7667L20.4333 15.3001L16 9.20008L11.5666 15.3001L8.06663 13.7667L8.93329 19.3334Z" fill="currentColor"/>',Target:'<path d="M16 29.3334C14.1556 29.3334 12.4222 28.9834 10.8 28.2834C9.1778 27.5834 7.76669 26.6334 6.56669 25.4334C5.36669 24.2334 4.41669 22.8223 3.71669 21.2001C3.01669 19.5779 2.66669 17.8445 2.66669 16.0001C2.66669 14.1556 3.01669 12.4223 3.71669 10.8001C4.41669 9.17786 5.36669 7.76675 6.56669 6.56675C7.76669 5.36675 9.1778 4.41675 10.8 3.71675C12.4222 3.01675 14.1556 2.66675 16 2.66675C17.2889 2.66675 18.5278 2.83897 19.7167 3.18341C20.9056 3.52786 22.0111 4.0223 23.0334 4.66675L21.0667 6.60008C20.3111 6.20008 19.5111 5.88897 18.6667 5.66675C17.8222 5.44453 16.9334 5.33341 16 5.33341C13.0222 5.33341 10.5 6.36675 8.43335 8.43341C6.36669 10.5001 5.33335 13.0223 5.33335 16.0001C5.33335 18.9779 6.36669 21.5001 8.43335 23.5667C10.5 25.6334 13.0222 26.6667 16 26.6667C18.9778 26.6667 21.5 25.6334 23.5667 23.5667C25.6334 21.5001 26.6667 18.9779 26.6667 16.0001C26.6667 15.4445 26.6222 14.9001 26.5334 14.3667C26.4445 13.8334 26.3222 13.3112 26.1667 12.8001L28.2667 10.7334C28.6222 11.5556 28.8889 12.4056 29.0667 13.2834C29.2445 14.1612 29.3334 15.0667 29.3334 16.0001C29.3334 17.8445 28.9834 19.5779 28.2834 21.2001C27.5834 22.8223 26.6334 24.2334 25.4334 25.4334C24.2334 26.6334 22.8222 27.5834 21.2 28.2834C19.5778 28.9834 17.8445 29.3334 16 29.3334ZM16 24.0001C13.7778 24.0001 11.8889 23.2223 10.3334 21.6667C8.7778 20.1112 8.00002 18.2223 8.00002 16.0001C8.00002 13.7779 8.7778 11.889 10.3334 10.3334C11.8889 8.77786 13.7778 8.00008 16 8.00008C16.5556 8.00008 17.0889 8.05008 17.6 8.15008C18.1111 8.25008 18.6 8.40008 19.0667 8.60008L16.9334 10.7334C16.7778 10.689 16.6278 10.6667 16.4834 10.6667H16C14.5334 10.6667 13.2778 11.189 12.2334 12.2334C11.1889 13.2779 10.6667 14.5334 10.6667 16.0001C10.6667 17.4667 11.1889 18.7223 12.2334 19.7667C13.2778 20.8112 14.5334 21.3334 16 21.3334C16.7111 21.3334 17.3945 21.1945 18.05 20.9167C18.7056 20.639 19.2889 20.2445 19.8 19.7334C20.0445 19.489 20.2611 19.2279 20.45 18.9501C20.6389 18.6723 20.8 18.3779 20.9334 18.0667L23.9334 15.0334C24.0889 16.2556 23.9667 17.4501 23.5667 18.6167C23.1667 19.7834 22.5334 20.8001 21.6667 21.6667C20.9556 22.3779 20.1111 22.9445 19.1334 23.3667C18.1556 23.789 17.1111 24.0001 16 24.0001ZM16 19.2001L12 15.2001L13.8667 13.3334L16 15.4667L27.4667 4.00008L29.3334 5.86675L16 19.2001Z" fill="currentColor"/>',"Motion Play":'<path d="M13.3334 21.3334L21.3334 16.0001L13.3334 10.6667V21.3334ZM10.8 28.2834C9.1778 27.5834 7.76669 26.6334 6.56669 25.4334C5.36669 24.2334 4.41669 22.8223 3.71669 21.2001C3.01669 19.5779 2.66669 17.8445 2.66669 16.0001C2.66669 15.0445 2.76669 14.1056 2.96669 13.1834C3.16669 12.2612 3.45558 11.3667 3.83335 10.5001L5.90002 12.5667C5.72224 13.1445 5.58335 13.7167 5.48335 14.2834C5.38335 14.8501 5.33335 15.4223 5.33335 16.0001C5.33335 18.9779 6.36669 21.5001 8.43335 23.5667C10.5 25.6334 13.0222 26.6667 16 26.6667C18.9778 26.6667 21.5 25.6334 23.5667 23.5667C25.6334 21.5001 26.6667 18.9779 26.6667 16.0001C26.6667 13.0223 25.6334 10.5001 23.5667 8.43341C21.5 6.36675 18.9778 5.33341 16 5.33341C15.4 5.33341 14.8167 5.38341 14.25 5.48341C13.6834 5.58341 13.1222 5.7223 12.5667 5.90008L10.5334 3.86675C11.4222 3.46675 12.3111 3.16675 13.2 2.96675C14.0889 2.76675 15.0222 2.66675 16 2.66675C17.8445 2.66675 19.5778 3.01675 21.2 3.71675C22.8222 4.41675 24.2334 5.36675 25.4334 6.56675C26.6334 7.76675 27.5834 9.17786 28.2834 10.8001C28.9834 12.4223 29.3334 14.1556 29.3334 16.0001C29.3334 17.8445 28.9834 19.5779 28.2834 21.2001C27.5834 22.8223 26.6334 24.2334 25.4334 25.4334C24.2334 26.6334 22.8222 27.5834 21.2 28.2834C19.5778 28.9834 17.8445 29.3334 16 29.3334C14.1556 29.3334 12.4222 28.9834 10.8 28.2834ZM5.91669 8.75008C5.5278 8.36119 5.33335 7.88897 5.33335 7.33341C5.33335 6.77786 5.5278 6.30564 5.91669 5.91675C6.30558 5.52786 6.7778 5.33341 7.33335 5.33341C7.88891 5.33341 8.36113 5.52786 8.75002 5.91675C9.13891 6.30564 9.33335 6.77786 9.33335 7.33341C9.33335 7.88897 9.13891 8.36119 8.75002 8.75008C8.36113 9.13897 7.88891 9.33341 7.33335 9.33341C6.7778 9.33341 6.30558 9.13897 5.91669 8.75008Z" fill="currentColor"/>',Focus:'<path d="M23.5667 8.43325C25.6334 10.4999 26.6667 13.0221 26.6667 15.9999C26.6667 18.9777 25.6334 21.4999 23.5667 23.5666C21.5 25.6333 18.9778 26.6666 16 26.6666C13.0223 26.6666 10.5 25.6333 8.43337 23.5666C6.36671 21.4999 5.33337 18.9777 5.33337 15.9999C5.33337 13.0221 6.36671 10.4999 8.43337 8.43325C10.5 6.36659 13.0223 5.33325 16 5.33325C18.9778 5.33325 21.5 6.36659 23.5667 8.43325ZM21.6667 21.6666C23.2223 20.111 24 18.2221 24 15.9999C24 13.7777 23.2223 11.8888 21.6667 10.3333C20.1112 8.7777 18.2223 7.99992 16 7.99992C13.7778 7.99992 11.8889 8.7777 10.3334 10.3333C8.77782 11.8888 8.00004 13.7777 8.00004 15.9999C8.00004 18.2221 8.77782 20.111 10.3334 21.6666C11.8889 23.2221 13.7778 23.9999 16 23.9999C18.2223 23.9999 20.1112 23.2221 21.6667 21.6666ZM18.8667 19.7499C19.7112 19.1388 20.3112 18.3333 20.6667 17.3333H11.3334C11.6889 18.3333 12.2889 19.1388 13.1334 19.7499C13.9778 20.361 14.9334 20.6666 16 20.6666C17.0667 20.6666 18.0223 20.361 18.8667 19.7499ZM11.7167 14.2833C11.9723 14.5388 12.2889 14.6666 12.6667 14.6666C13.0445 14.6666 13.3612 14.5388 13.6167 14.2833C13.8723 14.0277 14 13.711 14 13.3333C14 12.9555 13.8723 12.6388 13.6167 12.3833C13.3612 12.1277 13.0445 11.9999 12.6667 11.9999C12.2889 11.9999 11.9723 12.1277 11.7167 12.3833C11.4612 12.6388 11.3334 12.9555 11.3334 13.3333C11.3334 13.711 11.4612 14.0277 11.7167 14.2833ZM18.3834 14.2833C18.6389 14.5388 18.9556 14.6666 19.3334 14.6666C19.7112 14.6666 20.0278 14.5388 20.2834 14.2833C20.5389 14.0277 20.6667 13.711 20.6667 13.3333C20.6667 12.9555 20.5389 12.6388 20.2834 12.3833C20.0278 12.1277 19.7112 11.9999 19.3334 11.9999C18.9556 11.9999 18.6389 12.1277 18.3834 12.3833C18.1278 12.6388 18 12.9555 18 13.3333C18 13.711 18.1278 14.0277 18.3834 14.2833ZM1.33337 7.99992V3.99992C1.33337 3.26659 1.59449 2.63881 2.11671 2.11659C2.63893 1.59436 3.26671 1.33325 4.00004 1.33325H8.00004V3.99992H4.00004V7.99992H1.33337ZM8.00004 30.6666H4.00004C3.26671 30.6666 2.63893 30.4055 2.11671 29.8833C1.59449 29.361 1.33337 28.7333 1.33337 27.9999V23.9999H4.00004V27.9999H8.00004V30.6666ZM24 30.6666V27.9999H28V23.9999H30.6667V27.9999C30.6667 28.7333 30.4056 29.361 29.8834 29.8833C29.3612 30.4055 28.7334 30.6666 28 30.6666H24ZM28 7.99992V3.99992H24V1.33325H28C28.7334 1.33325 29.3612 1.59436 29.8834 2.11659C30.4056 2.63881 30.6667 3.26659 30.6667 3.99992V7.99992H28Z" fill="currentColor"/>',"Focus Question":'<path d="M6.66667 28C5.93333 28 5.30556 27.7389 4.78333 27.2167C4.26111 26.6944 4 26.0667 4 25.3333V20H6.66667V25.3333H12V28H6.66667ZM25.3333 28H20V25.3333H25.3333V20H28V25.3333C28 26.0667 27.7389 26.6944 27.2167 27.2167C26.6944 27.7389 26.0667 28 25.3333 28ZM4 6.66667C4 5.93333 4.26111 5.30556 4.78333 4.78333C5.30556 4.26111 5.93333 4 6.66667 4H12V6.66667H6.66667V12H4V6.66667ZM28 6.66667V12H25.3333V6.66667H20V4H25.3333C26.0667 4 26.6944 4.26111 27.2167 4.78333C27.7389 5.30556 28 5.93333 28 6.66667ZM17.1833 23.5167C17.5056 23.1944 17.6667 22.8 17.6667 22.3333C17.6667 21.8667 17.5056 21.4722 17.1833 21.15C16.8611 20.8278 16.4667 20.6667 16 20.6667C15.5333 20.6667 15.1389 20.8278 14.8167 21.15C14.4944 21.4722 14.3333 21.8667 14.3333 22.3333C14.3333 22.8 14.4944 23.1944 14.8167 23.5167C15.1389 23.8389 15.5333 24 16 24C16.4667 24 16.8611 23.8389 17.1833 23.5167ZM14.8 18.9H17.2333C17.2333 18.1444 17.3222 17.5667 17.5 17.1667C17.6778 16.7667 18.0667 16.2667 18.6667 15.6667C19.4444 14.8889 19.9611 14.2611 20.2167 13.7833C20.4722 13.3056 20.6 12.7333 20.6 12.0667C20.6 10.8667 20.1667 9.88889 19.3 9.13333C18.4333 8.37778 17.3333 8 16 8C14.8889 8 13.9333 8.28889 13.1333 8.86667C12.3333 9.44444 11.7556 10.2667 11.4 11.3333L13.6 12.2333C13.7556 11.6556 14.05 11.1833 14.4833 10.8167C14.9167 10.45 15.4222 10.2667 16 10.2667C16.6444 10.2667 17.1611 10.4389 17.55 10.7833C17.9389 11.1278 18.1333 11.5889 18.1333 12.1667C18.1333 12.6111 18.0278 13.0278 17.8167 13.4167C17.6056 13.8056 17.2444 14.2111 16.7333 14.6333C16 15.2778 15.4944 15.9 15.2167 16.5C14.9389 17.1 14.8 17.9 14.8 18.9Z" fill="currentColor"/>',Friends:'<path d="M5.33335 21.3333C6.80611 21.3333 8.00002 20.1394 8.00002 18.6667C8.00002 17.1939 6.80611 16 5.33335 16C3.86059 16 2.66669 17.1939 2.66669 18.6667C2.66669 20.1394 3.86059 21.3333 5.33335 21.3333Z" fill="currentColor"/><path d="M1.62667 23.4401C0.64 23.8667 0 24.8267 0 25.9067V28.0001H6V25.8534C6 24.7467 6.30667 23.7067 6.84 22.8001C6.34667 22.7201 5.85333 22.6667 5.33333 22.6667C4.01333 22.6667 2.76 22.9467 1.62667 23.4401Z" fill="currentColor"/><path d="M26.6667 21.3333C28.1394 21.3333 29.3333 20.1394 29.3333 18.6667C29.3333 17.1939 28.1394 16 26.6667 16C25.1939 16 24 17.1939 24 18.6667C24 20.1394 25.1939 21.3333 26.6667 21.3333Z" fill="currentColor"/><path d="M30.3733 23.4401C29.24 22.9467 27.9866 22.6667 26.6666 22.6667C26.1466 22.6667 25.6533 22.7201 25.16 22.8001C25.6933 23.7067 26 24.7467 26 25.8534V28.0001H32V25.9067C32 24.8267 31.36 23.8667 30.3733 23.4401Z" fill="currentColor"/><path d="M21.6533 22.2C20.0933 21.5067 18.1733 21 16 21C13.8267 21 11.9067 21.52 10.3467 22.2C8.90667 22.84 8 24.28 8 25.8533V28H24V25.8533C24 24.28 23.0933 22.84 21.6533 22.2ZM10.76 25.3333C10.88 25.0267 11.12 24.7733 11.4133 24.64C12.88 23.9867 14.4267 23.6667 15.9867 23.6667C17.56 23.6667 19.0933 24 20.56 24.64C20.8667 24.7733 21.0933 25.0267 21.2133 25.3333H10.76Z" fill="currentColor"/><path d="M12 16C12 18.2133 13.7867 20 16 20C18.2133 20 20 18.2133 20 16C20 13.7867 18.2133 12 16 12C13.7867 12 12 13.7867 12 16ZM17.3333 16C17.3333 16.7333 16.7333 17.3333 16 17.3333C15.2667 17.3333 14.6667 16.7333 14.6667 16C14.6667 15.2667 15.2667 14.6667 16 14.6667C16.7333 14.6667 17.3333 15.2667 17.3333 16Z" fill="currentColor"/><path d="M3.30667 14.4801C2.89333 13.4667 2.66667 12.4801 2.66667 11.4667C2.66667 8.02675 5.36 5.33341 8.8 5.33341C12.3733 5.33341 13.8933 7.65342 16 10.1201C18.0933 7.68008 19.6 5.33341 23.2 5.33341C26.64 5.33341 29.3333 8.02675 29.3333 11.4667C29.3333 12.4801 29.1067 13.4667 28.6933 14.4801C29.56 14.8934 30.2667 15.5734 30.7333 16.4001C31.5333 14.8001 32 13.1734 32 11.4667C32 6.53342 28.1333 2.66675 23.2 2.66675C20.4133 2.66675 17.7467 3.96008 16 6.01342C14.2533 3.96008 11.5867 2.66675 8.8 2.66675C3.86667 2.66675 0 6.53342 0 11.4667C0 13.1734 0.466667 14.8001 1.28 16.4001C1.74667 15.5734 2.45333 14.8934 3.30667 14.4801Z" fill="currentColor"/>'},Pt=Object.keys(ro);function x(e,t=32){const o=ro[e];return o?`<svg width="${t}" height="${t}" viewBox="0 0 32 32" fill="none" aria-hidden="true" style="flex:none">${o}</svg>`:`<span style="display:inline-block;width:${t}px;height:${t}px"></span>`}const F=e=>{const t=document.createElement("template");return t.innerHTML=e.trim(),t.content.firstElementChild},ie=e=>`font-family:var(--type-${e}-family);font-weight:var(--type-${e}-weight);font-size:var(--type-${e}-size);line-height:var(--type-${e}-line);letter-spacing:var(--type-${e}-tracking);text-transform:var(--type-${e}-case)`;b("css-c-button",`
.c-btn {
  width: 240px; height: 72px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  padding: 20px 32px; box-sizing: border-box; border: 1px solid transparent;
  ${ie("body-l")}; color: var(--tv-base-light); white-space: nowrap;
}
.c-btn > svg { flex: none; }
.c-btn--primary   { background: var(--tv-base-light); color: var(--tv-base-dark); }
.c-btn--secondary { background: var(--tv-button-secondary); border-color: var(--tv-border-white-20); }
.c-btn--ghost     { background: none; }
.c-btn--outline   { background: none; border-color: var(--tv-base-light); }
.c-btn.is-focus   { background: var(--gradient-tv-button-primary); border-color: var(--tv-button-primary-solid); color: var(--tv-base-light); }
.c-btn.is-disabled { opacity: .4; }
`);const Y=(e,t,o="Play Now",a="Play")=>F(`<div class="c-btn c-btn--${e}${t?` is-${t}`:""}">
       ${a?x(a):""}${o?`<span>${o}</span>`:""}
     </div>`),ja={id:"c-button",title:"Button",group:"Controls",figma:"276:2415",description:"240 × 72, radius 12. Four types and three states; the icon and the label are each optional.",tokens:{colour:["TV/Base/Dark","TV/Base/Light","TV/Border/White 20","TV/Button/Primary","TV/Button/Primary Solid","TV/Button/Secondary"],type:["Body/L"]},variants:[{label:"Primary · Default",el:()=>Y("primary")},{label:"Primary · Focus",el:()=>Y("primary","focus")},{label:"Primary · Disabled",el:()=>Y("primary","disabled")},{label:"Secondary · Default",el:()=>Y("secondary",void 0,"Episodes","List")},{label:"Secondary · Focus",el:()=>Y("secondary","focus","Episodes","List")},{label:"Ghost · Default",el:()=>Y("ghost",void 0,"Home","Home")},{label:"Ghost · Focus",el:()=>Y("ghost","focus","Home","Home")},{label:"Outline · Default",el:()=>Y("outline",void 0,"Log Out","Logout")},{label:"Outline · Focus",el:()=>Y("outline","focus","Log Out","Logout")}],notes:["Every <strong>Focus</strong> variant is the same in the file whatever the type: the <code>TV/Button/Primary</code> gradient with a 1px <code>Primary Solid</code> edge. Type only decides how it rests.","Six variants in Figma carry padding <code>20px 335px</code> on a 240-wide box, which cannot be right — a leftover from a wider frame. The <code>20px 32px</code> from the Focus and Secondary variants is used here. <strong>Worth fixing in the file.</strong>","The <strong>Disabled</strong> variants read identical to Default in the file — same fills, same border, same text colour. The 40% dim here is this rebuild's guess, not a measurement. <strong>Needs a decision.</strong>","The icons are the real set, exported from the <code>Icon</code> component."]};b("css-c-tag",`
.c-tag { display: inline-flex; align-items: center; gap: 6px; border-radius: 4px;
  padding: 4px 8px; box-sizing: border-box; ${ie("label-s")};
  color: var(--tv-base-light); background: var(--tv-base-dark); }
.c-tag > svg { flex: none; }
.c-tag--new   { background: var(--tv-tags-primary); }
.c-tag--prime { background: var(--tv-game-ui-yellow); color: var(--tv-base-dark); }
.c-tag--info  { background: none; border: 2px solid var(--tv-game-ui-green-1);
  color: var(--tv-game-ui-green-1); padding: 8px 16px; ${ie("body-m")}; }
`);const Ya={id:"c-tag",title:"Tag",group:"Content",figma:"1021:8565",description:"Label laid over an asset. Six types; most are 24 high with 4px corners and Label/S.",tokens:{colour:["TV/Base/Dark","TV/Base/Light","TV/Game UI/Green 1","TV/Game UI/Yellow","TV/Tags/Primary"],type:["Body/M","Label/S"]},variants:[{label:"Interactive",el:()=>F(`<span class="c-tag">${x("Gamepad",16)}Interactive</span>`)},{label:"New",el:()=>F('<span class="c-tag c-tag--new">NEW</span>')},{label:"Played",el:()=>F(`<span class="c-tag">${x("Check",16)}PLAYED</span>`)},{label:"Prime Time",el:()=>F(`<span class="c-tag c-tag--prime">${x("Crown",16)}PRIME TIME</span>`)},{label:"Info",el:()=>F('<span class="c-tag c-tag--info">Guest</span>')}],notes:["<code>12563:16830</code> is an <em>instance</em> of this, not a component of its own — it sits in the Game Type Tags Row. Nothing extra to draw.","<strong>Game Type</strong> is the sixth type and is not here: in the file it is an empty wrapper around the separate <code>Game Type Tag</code> component, so it has no appearance of its own.","<code>Interactive</code> uses a Material icon ligature in the file (<code>gamepad</code>, 16px) rather than the icon component; the set's own <code>Gamepad</code> is used here."]};b("css-c-toggle",`
.c-toggle { width: 280px; height: 72px; border-radius: 12px; box-sizing: border-box;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 19px 16px; background: var(--tv-button-secondary);
  /* The edge and the focus ring are inset shadows, not borders. In Figma a stroke
     takes no layout space, and the room left for the label is exactly what
     "PlayAlong OFF" needs: 280 - 16 - 16 - 70 - 16 = 162. A CSS border ate 1px a
     side (6 on focus), OFF no longer fit, and the switch jumped every toggle. */
  box-shadow: inset 0 0 0 1px var(--tv-border-white-20); ${ie("body-l")}; color: var(--tv-base-light);
  white-space: nowrap; cursor: default; }
/* And the label can never push the switch: it takes the room it is given. */
.c-toggle > span:first-child { flex: 1 1 auto; min-width: 0; }
.c-toggle.is-focus { box-shadow: inset 0 0 0 var(--tv-focus-ring-width) var(--tv-focus-ring-color); }
.c-toggle__track { width: 70px; height: 35px; border-radius: 8px; flex: none; box-sizing: border-box;
  border: 2px solid var(--tv-base-light); display: flex; align-items: center; padding: 2px; }
.c-toggle__knob { width: 36px; height: 100%; border-radius: 5px; background: var(--tv-base-light);
  transition: transform .18s cubic-bezier(.3,.9,.3,1); transform: translateX(0); }
.c-toggle--on .c-toggle__knob { transform: translateX(26px); }
.c-toggle--live { cursor: pointer; }
/* Off is dimmed, not just moved: the track and knob drop back so the state
   reads at three metres without having to find the knob. */
.c-toggle--off .c-toggle__track { opacity: .5; }
.c-toggle__track { transition: opacity .18s ease; }
`);const wt=(e,t=!1)=>F(`<div class="c-toggle c-toggle--${e?"on":"off"}${t?" is-focus":""}">
       <span>PlayAlong ${e?"ON":"OFF"}</span>
       <span class="c-toggle__track"><span class="c-toggle__knob"></span></span>
     </div>`),Ka=()=>{const e=wt(!1);e.classList.add("c-toggle--live"),e.setAttribute("role","switch"),e.setAttribute("aria-checked","false"),e.tabIndex=0;const t=()=>{const o=e.classList.toggle("c-toggle--on");e.classList.toggle("c-toggle--off",!o),e.setAttribute("aria-checked",String(o)),e.querySelector("span").textContent=`PlayAlong ${o?"ON":"OFF"}`};return e.addEventListener("click",t),e.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),t())}),e},Xa={id:"c-toggle",title:"Toggle",group:"Controls",figma:"701:11494",description:"280 × 72. Label on the left, a 70 × 35 track on the right whose 40-wide knob sits at one end.",tokens:{colour:["TV/Base/Light","TV/Border/White 20","TV/Button/Primary Solid","TV/Button/Secondary"],type:["Body/L"]},variants:[{label:"Off",el:()=>wt(!1)},{label:"On",el:()=>wt(!0)},{label:"Focus",el:()=>wt(!0,!0)},{label:"▶ Live — click or press Enter",el:Ka}],notes:["Focus is a <strong>6px</strong> <code>Primary Solid</code> edge here, which is the focus-ring token — so the border grows 5px inward and the content shifts. In the file it is drawn the same way."]};b("css-c-tabsitem",`
.c-tab { white-space: nowrap; height: 56px; box-sizing: border-box; display: inline-flex; align-items: center;
  justify-content: center; padding: 12px 24px; border-radius: 12px;
  border: 1px solid transparent; font-family: var(--type-heading-m-family);
  font-size: 24px; line-height: 32px; color: var(--tv-text-primary); }
.c-tab.is-selected { border-radius: 8px; background: var(--tv-button-secondary);
  border-color: var(--tv-border-white-20); color: var(--tv-base-light); }
.c-tab.is-focus { border-radius: 8px; background: var(--gradient-tv-button-primary);
  border-color: var(--tv-button-primary-solid); color: var(--tv-base-light); }
`);const Qa={id:"c-tabs-item",title:"Tabs Item",group:"Navigation",figma:"1209:8405",description:"One tab, 56 high. Rests at radius 12 and no surface; selected and focused both drop to radius 8 and take a fill.",tokens:{colour:["TV/Base/Light","TV/Border/White 20","TV/Button/Primary","TV/Button/Primary Solid","TV/Button/Secondary","TV/Text/Primary"],type:[]},variants:[{label:"Default",el:()=>F('<span class="c-tab">Season 3</span>')},{label:"Selected",el:()=>F('<span class="c-tab is-selected">Season 4</span>')},{label:"Focus",el:()=>F('<span class="c-tab is-focus">Season 4</span>')},{label:"▶ Live — click a season",el:()=>{const e=F(`<div style="display:flex;gap:8px">
        <span class="c-tab is-selected">Season 4</span>
        <span class="c-tab">Season 3</span>
        <span class="c-tab">Season 2</span></div>`);return e.querySelectorAll(".c-tab").forEach(t=>{t.style.cursor="pointer",t.addEventListener("click",()=>{e.querySelectorAll(".c-tab").forEach(o=>o.classList.remove("is-selected")),t.classList.add("is-selected")})}),e}}],notes:["The label is <strong>not bound to a text style</strong> in the file — it is a loose Rubik 24/32. Every other control here binds one.","Default rests at radius 12 while Selected and Focus are radius 8, so the corner moves when you select. Probably unintended."]};b("css-c-checkbox",`
.c-check { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 50%; }
.c-check.is-focusring { background: var(--web-transparent-white-25); }
.c-check__box { width: 24px; height: 24px; border-radius: 4px; box-sizing: border-box;
  border: 2px solid var(--tv-base-light); display: grid; place-items: center; }
.c-check.is-selected .c-check__box { background: var(--tv-button-primary-solid);
  border-color: var(--tv-button-primary-solid); }
.c-check__tick { width: 14px; height: 8px; border-left: 2.5px solid var(--tv-base-light);
  border-bottom: 2.5px solid var(--tv-base-light); transform: rotate(-45deg) translate(1px, -2px); }
`);const Ze=(e,t)=>F(`<span class="c-check${t?" is-focusring":""}${e?" is-selected":""}">
       <span class="c-check__box">${e?'<span class="c-check__tick"></span>':""}</span>
     </span>`),Ja=()=>{const e=Ze(!1,!1);e.style.cursor="pointer",e.tabIndex=0,e.setAttribute("role","checkbox");const t=()=>{const o=e.classList.toggle("is-selected");e.setAttribute("aria-checked",String(o)),e.querySelector(".c-check__box").innerHTML=o?'<span class="c-check__tick"></span>':""};return e.addEventListener("click",t),e.addEventListener("focus",()=>e.classList.add("is-focusring")),e.addEventListener("blur",()=>e.classList.remove("is-focusring")),e.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),t())}),e},ei={id:"c-checkbox",title:"Checkbox",group:"Controls",figma:"10432:15304",description:"24 × 24 box in a 32 frame. Focus is a 44 circle behind it — which is exactly the ten-foot focus-target floor.",tokens:{colour:["TV/Base/Light","TV/Button/Primary Solid","Web/Transparent/White 25"],type:[]},variants:[{label:"Default",el:()=>Ze(!1,!1)},{label:"Selected",el:()=>Ze(!0,!1)},{label:"Focus",el:()=>Ze(!1,!0)},{label:"Focus Selected",el:()=>Ze(!0,!0)},{label:"▶ Live — click or tab to it",el:Ja}],notes:["The focus halo binds <code>Web/Transparent/White 25</code> — a <strong>web</strong> token on a TV control. Either the control is web, or the binding is wrong.","Its border is <code>2.4px</code> in the file, a scaling leftover; drawn at 2 here."]};b("css-c-dots",`
.c-dots { display: inline-flex; align-items: center; gap: 22px; height: 24px; }
.c-dots__d { border-radius: 50%; background: var(--tv-base-light); }
.c-dots__d--on  { width: 24px; height: 24px; }
.c-dots__d--off { width: 14px; height: 14px; opacity: .4; }
`);const ti={id:"c-dots",title:"Dots",group:"Navigation",figma:"596:2669",description:"Rail pagination, 96 × 24. The current page is a 24 dot, the rest are 14, spaced 22 apart.",tokens:{colour:["TV/Base/Light"],type:[]},variants:[{label:"Three pages, first active",el:()=>F(`<span class="c-dots"><span class="c-dots__d c-dots__d--on"></span>
        <span class="c-dots__d c-dots__d--off"></span>
        <span class="c-dots__d c-dots__d--off"></span></span>`)}],notes:["All three dots are <code>TV/Base/Light</code> in the file with no opacity recorded on the inactive ones; the 40% here is a rebuild choice so the active dot reads. <strong>Needs confirming.</strong>"]};b("css-c-iconset",`
.c-iconset { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
  gap: 14px; width: 100%; }
.c-iconset__cell { position: relative; display: flex; flex-direction: column; align-items: center;
  gap: 8px; padding: 14px 6px; border-radius: 8px; border: 1px solid var(--tv-border-white-20);
  color: var(--tv-base-light); cursor: pointer; background: none;
  font: inherit; transition: border-color .12s ease, background .12s ease; }
.c-iconset__cell:hover { border-color: var(--tv-button-primary-solid);
  background: var(--tv-button-secondary); }
.c-iconset__cell:focus-visible { outline: var(--tv-focus-ring-width) solid var(--tv-focus-ring-color);
  outline-offset: 2px; }
.c-iconset__cell.is-copied { border-color: var(--tv-game-ui-green-1); }
.c-iconset__hint { position: absolute; inset: auto 0 3px; font-size: 8px; opacity: 0;
  color: var(--tv-text-primary); transition: opacity .12s ease; }
.c-iconset__cell:hover .c-iconset__hint { opacity: .7; }
.c-iconset__cell.is-copied .c-iconset__hint { opacity: 1; color: var(--tv-game-ui-green-1); }
.c-iconset__name { font-family: var(--mono, monospace); font-size: 10px;
  color: var(--tv-text-primary); text-align: center; word-break: break-word; }
`);const oi={id:"c-icons",title:"Icons",group:"Content",figma:"629:1861",description:`The product icon set — ${Pt.length} of the 55 in Figma, exported as SVG and drawn in currentColor, so an icon takes the colour of whatever it sits in.`,tokens:{colour:["TV/Base/Light"],type:[]},wide:!0,variants:[{label:`${Pt.length} icons at 32 — click to download the .svg, shift-click to copy the markup`,el:()=>{const e=F('<div class="c-iconset"></div>');for(const t of Pt){const o=F(`<button type="button" class="c-iconset__cell" title="Download ${t}.svg — hold shift to copy the markup instead">
             ${x(t)}<span class="c-iconset__name">${t}</span>
             <span class="c-iconset__hint">download · shift to copy</span>
           </button>`);o.addEventListener("click",async a=>{const i=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">${ro[t]}</svg>`,s=o.querySelector(".c-iconset__hint");let r;if(a.shiftKey)try{await navigator.clipboard.writeText(i),r="copied"}catch{r="copy failed"}else{const l=URL.createObjectURL(new Blob([i],{type:"image/svg+xml"})),n=document.createElement("a");n.href=l,n.download=`${t.replace(/[^a-z0-9]+/gi,"-").toLowerCase()}.svg`,n.click(),URL.revokeObjectURL(l),r="downloaded"}o.classList.add("is-copied"),s.textContent=r,setTimeout(()=>{o.classList.remove("is-copied"),s.textContent="download · shift to copy"},1400)}),e.appendChild(o)}return e}}],notes:["Three of the 55 are not here. <code>Avatar with Frame</code> and <code>Stacked-Avatar-StackStage2</code> are bare rectangles in the file — placeholders rather than icons — and <code>Processing</code> is a conic gradient, which belongs in CSS rather than in a path. Left out rather than faked.","Each is drawn in <code>currentColor</code>, so it takes the colour of whatever it sits in, and carries a <code>viewBox</code> rather than a fixed size.","Click downloads a real <code>.svg</code>; <strong>shift-click copies the markup</strong>. A browser cannot put a file on the clipboard — <code>ClipboardItem</code> only accepts sanitised types and <code>image/svg+xml</code> is not one — and pasting the markup as text is what makes Figma rebuild it as vectors anyway."]};b("css-c-input",`
.c-input { width: 710px; display: flex; flex-direction: column; gap: 10px; }
.c-input__box {
  height: 72px; box-sizing: border-box; border-radius: 12px;
  display: flex; align-items: center; gap: 10px; padding: 20px 32px;
  background: var(--tv-transparent-dark-25);
  /* Figma strokes OUTSIDE, so the box keeps its 72 whatever the ring weighs. */
  box-shadow: 0 0 0 2px var(--tv-border-white-20);
  ${ie("body-l")}; color: var(--tv-base-light);
}
.c-input__ico { opacity: .5; flex: none; display: flex; }
.c-input__ph  { opacity: .5; }
.c-input.is-focus  .c-input__box { box-shadow: 0 0 0 6px var(--tv-focus-ring-color); }
.c-input.is-typing .c-input__box { box-shadow: 0 0 0 2px var(--tv-text-primary); }
.c-input.is-alert  .c-input__box { background: var(--tv-transparent-red-50); box-shadow: none; }
.c-input.is-alert.is-focus .c-input__box { box-shadow: 0 0 0 6px var(--tv-focus-ring-color); }
.c-input.is-disabled .c-input__box { opacity: .5; }
.c-input__caret { display: inline-block; width: 2px; height: 31px; margin-left: 2px;
  background: var(--tv-base-light); animation: c-input-caret 1s step-end infinite; }
@keyframes c-input-caret { 50% { opacity: 0; } }
.c-input__msg { display: flex; align-items: center; gap: 12px; min-height: 32px;
  ${ie("body-m")}; color: var(--tv-base-light); }
.c-input__msg > svg { color: var(--tv-game-ui-red-1); flex: none; }
`);const ae=(e,t,o,a="Email")=>{const i=e==="alert"||e==="alert-focus",s=e==="focus"||e==="alert-focus"||e==="typing-focus",r=e==="typing"||e==="typing-focus",l=e==="typed"||r,n=["c-input",s&&"is-focus",r&&!s&&"is-typing",i&&"is-alert",e==="disabled"&&"is-disabled"].filter(Boolean).join(" ");return F(`<div class="${n}">
      <div class="c-input__box">
        ${a?`<span class="c-input__ico">${x(a)}</span>`:""}
        <span class="${l?"":"c-input__ph"}">${t}</span>${r?'<i class="c-input__caret"></i>':""}
      </div>
      ${o!==void 0?`<div class="c-input__msg">${x("Alert",32)}<span>${o}</span></div>`:""}
    </div>`)},ai={id:"c-input",title:"Input",group:"Controls",figma:"7233:9283",description:"710 × 72 — the TV text field, on every sign-in, sign-up and reset screen. Eight states, and three different rings between them.",tokens:{colour:["TV/Transparent/Dark 25","TV/Transparent/Red 50","TV/Border/White 20","TV/Text/Primary","TV/Button/Primary Solid","TV/Base/Light","TV/Game UI/Red 1"],type:["Body/L","Body/M"]},wide:!0,variants:[{label:"Default",el:()=>ae("default","Email Address")},{label:"Focus",el:()=>ae("focus","Email Address")},{label:"Typing",el:()=>ae("typing","abc")},{label:"Typing Focus",el:()=>ae("typing-focus","abc")},{label:"Typed",el:()=>ae("typed","abc")},{label:"Disabled",el:()=>ae("disabled","Email Address")},{label:"Alert",el:()=>ae("alert","Email Address","Message text")},{label:"Alert with Focus",el:()=>ae("alert-focus","Email Address","Message text")}],notes:["<strong>Three rings, not two.</strong> Idle is <code>Border/White 20</code> at 2, <strong>Typing is <code>Text/Primary</code> at 2</strong> — not blue — and focus is the focus-ring token at 6. So a field being typed into is not drawn as a focused one, which is why the set carries <code>Typing</code> and <code>Typing Focus</code> separately.","A <strong>placeholder is drawn at 50%</strong> and a typed value at full strength. Same node, same token, different opacity — so the two do read differently, and the caret is a 2 × 31 white rule.","<code>Disabled</code> dims the whole field to 50%, including its ring. It is the only state that does.","Every variant carries the <code>Input messages</code> row, so the component is <strong>114 high whether or not there is a message</strong> — the box is 72 and the row is 32 with a 10 gap. The auth screens hide the row, which is why a field there measures 72.","The leading icon is an instance at 50% opacity. <strong>The auth screens turn it off</strong>, so no shipped screen shows it; the component has it.","Both rings are drawn <code>OUTSIDE</code> in Figma, so the box stays 72 high whether the ring weighs 2 or 4. Rebuilt as a <code>box-shadow</code> for the same reason — a CSS border would eat the padding.","The alert fill <code>TV/Transparent/Red 50</code> replaces the ring rather than joining it: an alert that is not focused has <strong>no border at all</strong>.","The message copy is the literal string <code>Message text</code> in every variant — the file never writes a real one here. Only Sign Up — 12 carries real sentences."]};b("css-c-chkmsg",`
.c-chkmsg { display: inline-flex; align-items: center; gap: 12px; box-sizing: border-box;
  ${ie("label-m")}; color: var(--tv-base-light); text-transform: none; white-space: nowrap; }
.c-chkmsg.is-focus { padding: 4px; border-radius: 8px;
  box-shadow: 0 0 0 6px var(--tv-focus-ring-color); }
.c-chkmsg .c-check { width: 32px; height: 32px; }
`);const ut=(e,t,o="Show Password")=>F(`<span class="c-chkmsg${t?" is-focus":""}">
       <span class="c-check${e?" is-selected":""}"><span class="c-check__box">${e?'<span class="c-check__tick"></span>':""}</span></span>
       <span>${o}</span>
     </span>`),ii={id:"c-checkbox-message",title:"Checkbox Message",group:"Controls",figma:"10432:15331",description:"A checkbox and its label, 32 high with a 12 gap. Both uses in the file are Show Password, on the sign-in and the Roku sign-up.",tokens:{colour:["TV/Base/Light","TV/Button/Primary Solid"],type:["Label/M"]},variants:[{label:"Default",el:()=>ut(!1,!1)},{label:"Focus",el:()=>ut(!1,!0)},{label:"Selected",el:()=>ut(!0,!1)},{label:"Focus Selected",el:()=>ut(!0,!0)}],notes:["<strong>Focus is on the pair, not on the box.</strong> The whole row takes 4 of padding and the focus ring at radius 8, and the plain <code>Checkbox</code> component's own 44 focus halo is not used here. Two controls, two different focus treatments for the same box. <strong>Worth reconciling.</strong>","The unfocused variants are <strong>278 wide and the focused ones 206</strong>, for the same 154-wide label. The number is whatever the frame was last left at rather than a measurement — the control hugs its content.","The label binds <code>Label/M</code>, which is <code>Rubik Medium 18 CAPS</code> in the file — but it is drawn as <em>Show Password</em>, in sentence case. Either the style or the binding is wrong. <strong>Needs a decision.</strong> Drawn here without the caps transform, as the file renders it."]};b("css-c-kb",`
/* The keys have NO fill in the file -- the keyboard's own Base/Neutral shows
   through them -- and each carries a 2px Base/Dark stroke drawn OUTSIDE. Two
   neighbours sit 2 apart, so their two strokes land on exactly the SAME 2px and
   read as one dark line. A CSS border is inside the box, so border + gap drew
   two thin edges with a lighter strip between them; an outside box-shadow
   reproduces the overlap, and the gap becomes one dark field.
   The component does NOT clip (clipsContent: false), which is what lets the
   focus ring hang off the top-left corner -- so no overflow hidden here. */
.c-kb { width: 582px; box-sizing: border-box; border-radius: 12px;
  background: var(--tv-base-neutral); display: flex; flex-wrap: wrap; gap: 2px;
  align-content: flex-start; }
.c-kb__k { height: 90px; box-sizing: border-box; flex: none;
  box-shadow: 0 0 0 2px var(--tv-base-dark); display: grid; place-items: center;
  font-family: var(--type-heading-m-family); font-weight: var(--type-heading-m-weight);
  font-size: var(--type-heading-m-size); color: var(--tv-base-light); }
.c-kb__k--6 { width: 95px; }
.c-kb__k--5 { width: 114px; }
.c-kb__k--w { width: 192px; }
.c-kb__k--done { background: var(--tv-base-light); color: var(--tv-base-dark); }
/* The focus ring is 6px OUTSIDE and bound to TV/Focus/Ring Color, so it covers
   the neighbours' gap rather than shrinking its own key. A border would do
   neither. */
/* The four OUTER corners are radius 12, the keyboard's own: first key top-left,
   end of the first row top-right, Clear bottom-left, the last key bottom-right
   (Done, white). The focus ring is an outside box-shadow, so it follows its
   key's corner -- 12 inside, 18 at its outer edge, as the file's 6px ring is. */
.c-kb > .c-kb__k:first-child { border-top-left-radius: 12px; }
.c-kb--6 > .c-kb__k:nth-child(6), .c-kb--5 > .c-kb__k:nth-child(5) { border-top-right-radius: 12px; }
.c-kb > .c-kb__k:nth-last-child(3) { border-bottom-left-radius: 12px; }
.c-kb > .c-kb__k:last-child { border-bottom-right-radius: 12px; }
.c-kb__k.is-focus { position: relative; z-index: 1;
  box-shadow: 0 0 0 var(--tv-focus-ring-width) var(--tv-focus-ring-color); }
.c-kb__listen { width: 582px; height: 640px; display: grid; place-items: center; }
.c-kb__mic { display: flex; flex-direction: column; align-items: center; gap: 12px;
  padding: 4px 0; width: 163px; }
/* One colour at three strengths, which is what the file does: the same
   Primary Solid blue at 30%, 50% and 100%. They are SIBLINGS, not nested --
   nested opacity multiplies, and 30% x 50% x 100% is one flat disc. */
.c-kb__halo { position: relative; width: 124px; height: 124px; display: grid;
  place-items: center; }
.c-kb__halo::before, .c-kb__halo::after { content: ''; position: absolute;
  border-radius: 9999px; background: var(--tv-button-primary-solid);
  animation: c-kb-pulse 1.8s ease-in-out infinite; }
/* ::before is the 124 ring, ::after the 106 one. The INNER one leads and the
   outer follows a fifth of a cycle later, so the motion travels outward from
   the core. They used to be half a cycle apart, which is not a wave -- it is
   two circles in opposition, one growing while the other shrinks. */
.c-kb__halo::before { --halo-o: .3; width: 124px; height: 124px; opacity: .3;
  animation-delay: .2s; }
.c-kb__halo::after  { --halo-o: .5; width: 106px; height: 106px; opacity: .5;
  animation-delay: 0s; }
/* The core and the glyph do NOT move. Scaling the whole group reads as a button
   being pressed; only the two haloes breathe, which is what an open microphone
   looks like. Figma has no animation here -- the frame is one still -- so the
   timing is a decision, not a measurement. Rest is scale 1 at the file's own
   opacity, so the still is one frame of this. */
@keyframes c-kb-pulse {
  0%, 100% { transform: scale(1);    opacity: var(--halo-o); }
  50%      { transform: scale(1.12); opacity: calc(var(--halo-o) * .45); }
}
@media (prefers-reduced-motion: reduce) {
  .c-kb__halo::before, .c-kb__halo::after { animation: none; transform: none; }
}
/* The glyph is TV/Base/Light. It was inheriting the card's text colour, which
   is Text/Primary -- the grey-blue it rendered as. */
/* z-index is the whole reason the glyph looked pale. ::after is the LAST child
   of the halo, so with everything at z-index auto it painted OVER the core --
   a 50% blue veil across a white glyph, which is exactly the colour it came out
   as. The core has to sit above both rings. */
.c-kb__halo > span { position: relative; z-index: 1;
  width: 88px; height: 88px; border-radius: 9999px;
  box-sizing: border-box; display: grid; place-items: center;
  color: var(--tv-base-light);
  background: var(--tv-button-primary-solid); border: 2px solid var(--tv-button-primary-solid); }
.c-kb__halo > span > span { display: contents; }
.c-kb__lt { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.c-kb__lt b { ${ie("heading-m")}; font-weight: inherit; }
.c-kb__lt i { ${ie("body-m")}; font-style: normal; color: var(--tv-text-primary); }
`);const To=["abcdef","ghijkl","mnopqr","stuvwx","yz@.-_","!#$%&*"],si=["12345","67890","?()/\\","|:;+=",`,"'<>`,"[]{}^"],ri=["abcdef","ghijkl","mnopqr","stuvwx","yz0123","456789"],ke=(e="letters",t="a")=>{const o=(d,f,p="")=>`<div class="c-kb__k c-kb__k--${f}${p}${d===t?" is-focus":""}">${d}</div>`,a=(d,f="")=>o(d,"w",f),i=`<div class="c-kb__k c-kb__k--w">${x("Delete",44)}</div>`,s=`<div class="c-kb__k c-kb__k--w">${x("Mic",44)}</div>`;if(e==="listening")return F(`<div class="c-kb">
      <div class="c-kb__listen"><div class="c-kb__mic">
        <span class="c-kb__halo"><span><span>${x("Mic",56)}</span></span></span>
        <span class="c-kb__lt"><b>Listening...</b><i>Speak now</i></span>
      </div></div>
      ${a("Clear")}${s}${a("Done"," c-kb__k--done")}</div>`);const r=e==="caps"?To.map(d=>d.toUpperCase()):e==="search"?ri:e==="digit"||e==="mic"?si:To,l=e==="digit"||e==="mic"?"5":"6",n=r.map(d=>[...d].map(f=>o(f,l)).join("")).join(""),c=e==="search"?`${a("Clear")}${i}${s}`:e==="digit"?`${a("~")}${a("abc")}${s}${a("Clear")}${a(".com")}${a("Done"," c-kb__k--done")}`:e==="mic"?`${a("~")}${a("abc")}${s}${a("Clear")}${s}${a("Done"," c-kb__k--done")}`:`${i}${a(e==="caps"?"abc":"?123")}${s}${a("Clear")}${a(".com")}${a("Done"," c-kb__k--done")}`;return F(`<div class="c-kb c-kb--${l}">${n}${c}</div>`)},ni={id:"c-keyboard",title:"Email Keyboard",group:"Controls",figma:"7605:8146",description:"582 wide on TV/Base/Neutral, six states — the on-screen keyboard for entering an email address on a TV.",tokens:{colour:["TV/Base/Neutral","TV/Base/Dark","TV/Base/Light","TV/Text/Primary","TV/Button/Primary Solid"],type:["Heading/M","Body/M"]},wide:!0,variants:[{label:"Letters",el:()=>ke("letters","a")},{label:"Caps",el:()=>ke("caps","A")},{label:"Digit",el:()=>ke("digit","1")},{label:"With Mic",el:()=>ke("mic","1")},{label:"Search",el:()=>ke("search","a")},{label:"Listening",el:()=>ke("listening")}],notes:["<strong>The column count changes with the state</strong>, which nothing in the file names: Letters, Caps and Search are six columns of 95, Digit and With Mic five of 114. Same 582 frame either way.","<code>Search</code> is <strong>642 high rather than 734</strong> — it drops the <code>?123</code> row, and its tail is <code>Clear</code> plus two icons with no <code>.com</code> and no <code>Done</code>. A keyboard with no way to finish. <strong>Worth checking.</strong>","The <code>Done</code> key is the only filled one: <code>TV/Base/Light</code> with dark text.","The icon keys are blank 44 × 44 frames in the file — no icon, no name. <code>Delete</code> and <code>Mic</code> are this rebuild's reading of their positions, not a measurement. <strong>Needs the real icons in the file.</strong>","<strong>The keys have no fill.</strong> The keyboard's own <code>Base/Neutral</code> shows through them, and each key carries a 2px <code>Base/Dark</code> stroke drawn <code>OUTSIDE</code>. Neighbours sit 2 apart, so their two strokes land on <em>exactly the same 2px</em> and read as <strong>one dark line</strong> — not two edges with a lighter strip between, which is what a CSS border plus a gap produces and what this was. Rebuilt as an outside <code>box-shadow</code>, which overlaps the same way.","<strong>The outer corners are radius 12</strong> — top-left key, end of the first row, <code>Clear</code>, and the last key (<code>Done</code>, so the white key is rounded at its outer corner) — and the focus ring rounds with its key. <strong>Two file defects</strong>: in <code>Letters</code> and <code>Caps</code> the <code>a</code> key itself is square, only the ring over it is rounded; in <code>Digit</code> and <code>With Mic</code> the <code>4</code>, mid-row, carries a top-right 12 as if it were the corner. Drawn here by position, not copied.","The focus ring is <strong>6px <code>TV/Focus/Ring Color</code>, also <code>OUTSIDE</code></strong>, and it is a separate overlay frame sitting on the first key rather than a state of that key. <strong>The component does not clip</strong> (<code>clipsContent: false</code>), so on the corner key the ring hangs off the keyboard — reproduced here rather than tidied, because tidying it would mean the ring covers its own key instead of its neighbours.","<code>Listening</code> replaces the whole grid with the <code>Mic</code> component and keeps only the last row. Its haloes are the focus blue at 30% and 50% node opacity — one token, three strengths."]},li={id:"c-mic",title:"Mic",group:"Feedback",figma:"9437:15313",description:"163 × 208 — the open microphone. It serves both halves of voice input: answering a Family Feud question, and dictating an email address at sign-up.",tokens:{colour:["TV/Base/Light","TV/Text/Primary","TV/Button/Primary Solid"],type:["Heading/M","Body/M"]},variants:[{label:"Default",el:()=>F(`<div class="c-kb__mic">
        <span class="c-kb__halo"><span><span>${x("Mic",56)}</span></span></span>
        <span class="c-kb__lt"><b>Listening...</b><i>Speak now</i></span></div>`)}],notes:["<strong>Fully tokenised, and I said otherwise before.</strong> The halo, the ring and the core are <em>one</em> colour — <code>#0090FF</code> bound to <code>TV/Button/Primary Solid</code> — at node opacities 30%, 50% and 100%. An earlier note here claimed three hardcoded blues; that was a misreading, corrected 2026-10-13.","The centre is a <strong>56</strong> icon in an 88 circle at radius 9999 — a radius far larger than the shape, which is how the file writes a pill. It was drawn at 44 here, and in <code>Base/Light</code>: the glyph binds <code>TV/Base/Light</code> and is white, where this was letting it inherit <code>Text/Primary</code> and rendering grey-blue.","<strong>The pulse is ours, not the file's.</strong> Figma holds one still, so nothing here is measured from it: the two haloes scale between 1 and 1.12 over 1.8s and fade as they grow, <strong>the inner leading and the outer a fifth of a cycle behind</strong>, so the motion travels outward from the core. Never below 1, so the still the file holds is one frame of it, and <strong>the core and the glyph do not move</strong> — scaling the whole group reads as a button being pressed rather than a microphone that is open. It stops under <code>prefers-reduced-motion</code>.","Two things were wrong here first and are worth the warning. The rings were <strong>half a cycle apart</strong>, which is not a wave — it is one growing while the other shrinks. And the glyph rendered pale blue although it was set to <code>Base/Light</code>: <code>::after</code> is the halo's last child, so at <code>z-index: auto</code> it painted <em>over</em> the core, laying 50% blue across a white glyph. <strong>The core needs an explicit <code>z-index</code></strong> — a sibling pseudo-element is not behind its sibling just because it looks like a background."]};b("css-c-inputweb",`
.c-inputweb { width: 280px; display: flex; flex-direction: column; gap: 12px; }
.c-inputweb__box { height: 44px; box-sizing: border-box; border-radius: 8px;
  display: flex; align-items: center; padding: 10px 16px;
  background: var(--web-transparent-white-6);
  font-family: var(--type-body-m-family); font-size: 16px; line-height: 24px;
  color: #c9cdd2; }
.c-inputweb__msg { display: flex; gap: 12px; font-family: var(--type-body-m-family);
  font-size: 14px; line-height: 16px; color: var(--tv-base-light); }
.c-inputweb__msg > svg { color: var(--tv-game-ui-red-1); flex: none; }
`);const ci={id:"c-input-web",title:"Input (Web)",group:"Controls",figma:"9849:13731",description:"280 × 44 — the browser field with its message row. The web auth screens are a separate set of frames from the TV ones, and this is their control.",tokens:{colour:["Web/Transparent/White 6","TV/Game UI/Red 1","TV/Base/Light"],type:[]},variants:[{label:"Default",el:()=>F('<div class="c-inputweb"><div class="c-inputweb__box">Your email address</div></div>')},{label:"With a message",el:()=>F(`<div class="c-inputweb">
        <div class="c-inputweb__box">Your email address</div>
        <div class="c-inputweb__msg">${x("Alert",24)}<span>Invalid code. Please re-enter the 6-character code shown on your TV</span></div>
      </div>`)}],notes:["<strong>Not a size of the TV field — a different control.</strong> 44 against 72, radius 8 against 12, padding 10/16 against 20/32, 16px text against Body/L, and a different fill token. Nothing is shared but the idea.","<strong>Neither text binds a style.</strong> The placeholder is a loose 16/24 in <code>Text/Secondary</code>, a <em>remote library</em> colour; the message is a loose 14 in <code>Secondary (White)</code>, also remote. So two of this component's three colours are not in this file and cannot be changed from it. <strong>Needs an owner for that library.</strong>","The message is the only real error sentence anywhere in the input set: <em>Invalid code. Please re-enter the 6-character code shown on your TV</em>. Every TV variant says <code>Message text</code>."]},T=e=>{const t=document.createElement("template");return t.innerHTML=e.trim(),t.content.firstElementChild},te=e=>`font-family:var(--type-${e}-family);font-weight:var(--type-${e}-weight);font-size:var(--type-${e}-size);line-height:var(--type-${e}-line);letter-spacing:var(--type-${e}-tracking);text-transform:var(--type-${e}-case)`;b("css-c-identity",`
/* Menu Item */
.c-mi { width: 178px; height: 64px; box-sizing: border-box; display: flex; align-items: center;
  gap: 8px; padding: 12px 32px; border-radius: 80px; border: 1px solid transparent;
  ${te("body-l")}; color: var(--tv-base-light); }
.c-mi > svg { flex: none; opacity: .85; }
.c-mi.is-selected > svg, .c-mi.is-focus > svg { opacity: 1; }
.c-mi.is-focus { border-radius: 12px; background: var(--gradient-tv-button-primary);
  border-color: var(--tv-button-primary-solid); }


/* Game Type Tag */
.c-gtt { height: 42px; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 16px; border-radius: 8px; background: var(--tv-button-secondary);
  border: 1px solid var(--tv-border-white-20); ${te("label-m")}; color: var(--tv-base-light);
  white-space: nowrap; }
.c-gtt--prime { background: var(--tv-game-ui-yellow); border-color: transparent;
  color: var(--tv-base-dark); }
.c-gtt > svg { flex: none; }

/* Avatar Picture — 140 round. Both states take a 4px white-at-20% edge that
   sits OUTSIDE the box, so content-box rather than border-box. Guest fills the
   circle with the same 20% white and lays a black silhouette over it; logged in
   carries the picture. */
.c-av { width: 140px; height: 140px; border-radius: 50%; box-sizing: content-box;
  position: relative; display: grid; place-items: center; overflow: visible;
  border: 4px solid var(--tv-border-white-20); }
.c-av--guest { background: var(--tv-border-white-20); }
.c-av--photo { background: var(--tv-base-dark) center/cover no-repeat; }
.c-av__mask { width: 140px; height: 140px; border-radius: 50%; overflow: hidden;
  display: grid; place-items: end center; }
.c-av__sil { width: 111px; height: 111px; display: block; color: #000; }
.c-av__photo { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }
.c-av__edit { position: absolute; right: -8px; bottom: -4px; width: 48px; height: 48px;
  border-radius: 12px; box-sizing: border-box; display: grid; place-items: center;
  background: var(--tv-base-neutral); border: 1px solid var(--tv-border-white-20);
  color: var(--tv-base-light); }

/* User Avatar — the picture, then the name over two metadata rows */
.c-ua { width: 518px; display: flex; align-items: center; gap: 32px; }
.c-ua__name { ${te("heading-l")}; color: var(--tv-base-light); margin: 0 0 16px; }
.c-ua__row { display: flex; align-items: center; gap: 8px; height: 32px;
  ${te("body-l")}; color: var(--tv-text-primary); white-space: nowrap; }
.c-ua__row + .c-ua__row { margin-top: 16px; }
.c-ua__row > svg { flex: none; }

/* AVATAR Label pill.
   The 4px edge is OUTSIDE in Figma, so it adds to the box rather than eating
   into it: content-box, not border-box. With border-box the pill came out 8px
   narrower and 8px shorter and the text looked cramped. */
.c-alabel { box-sizing: content-box; display: inline-flex; align-items: center;
  justify-content: center; padding: 4px 10px; border-radius: 50px;
  border: 4px solid #1E1E1E; background: var(--gradient-tv-placeholder-light);
  ${te("label-m")}; color: #000; }

/* Unlocked counter */
.c-unlocked { display: flex; align-items: center; gap: 16px; height: 70px; }
.c-unlocked__badge { width: 44px; height: 44px; flex: none; display: block;
  object-fit: contain; }
.c-unlocked__n { ${te("display-m")}; color: var(--tv-base-light); }
.c-unlocked__cap { ${te("label-m")}; color: var(--tv-text-primary); }

/* Selection Radio Button */
.c-radio { width: 64px; height: 64px; display: grid; place-items: center; }
.c-radio__ring { width: 55px; height: 55px; border-radius: 50%; box-sizing: border-box;
  border: 4px solid var(--tv-border-white-20); }
.c-radio__on { width: 64px; height: 64px; border-radius: 50%;
  background: var(--tv-button-primary-solid); display: grid; place-items: center; }
.c-radio__tick { width: 22px; height: 12px; border-left: 4px solid var(--tv-base-light);
  border-bottom: 4px solid var(--tv-base-light); transform: rotate(-45deg) translate(2px, -3px); }

/* Input messages */
.c-msg { display: inline-flex; align-items: center; gap: 12px; height: 32px;
  ${te("body-m")}; color: var(--tv-base-light); }
.c-msg > svg { flex: none; }
.c-msg--alert > svg { color: var(--tv-game-ui-red-1); }
.c-msg--warn  > svg { color: var(--tv-game-ui-yellow); }
.c-msg--info  > svg { color: var(--tv-base-light); }

/* Strike Box — a rounded square whose 4px edge sits OUTSIDE the 36, with a
   round-capped X inside it. */
.c-strike { width: 36px; height: 36px; border-radius: 10px; box-sizing: content-box;
  border: 4px solid var(--tv-game-ui-red-1); display: grid; place-items: center; }
.c-strike--spent { opacity: .35; }
.c-strike svg { display: block; color: var(--tv-game-ui-red-1); }

/* Attempt */
.c-attempt { width: 168px; height: 71px; box-sizing: border-box; display: flex; align-items: center;
  padding: 24px 0; ${te("game-s")}; }
.c-attempt--right { color: var(--tv-text-success); }
.c-attempt--wrong { color: var(--tv-game-ui-red-2); text-decoration: line-through; }

/* Reward Type Icon */
.c-rti { width: 144px; height: 144px; position: relative; display: grid; place-items: center; }
.c-rti__ring { width: 130px; height: 130px; border-radius: 50%; box-sizing: border-box;
  border: 6px solid transparent;
  background: linear-gradient(var(--tv-base-dark), var(--tv-base-dark)) padding-box,
              var(--gradient-tv-placeholder-grey) border-box;
  display: grid; place-items: center; }
.c-rti__q { font-family: var(--type-display-m-family); font-size: 48px; line-height: 1;
  font-weight: 700; background: var(--gradient-tv-placeholder-light);
  -webkit-background-clip: text; background-clip: text; color: transparent; }
.c-rti__pill { position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%); }

/* Player Thumbnail */
.c-pthumb { width: 360px; height: 203px; border-radius: 8px; box-sizing: border-box;
  border: 6px solid var(--tv-base-light);
  background: linear-gradient(135deg, #243457, #0b1020); }
`);const je=e=>`<span class="c-alabel">${e}</span>`,di={id:"c-menu-item",title:"Menu Item",group:"Navigation",figma:"772:6953",description:"178 × 64 with a 40 icon. Rests fully rounded at radius 80; focus squares it to 12 and takes the primary gradient.",tokens:{colour:["TV/Base/Light","TV/Button/Primary","TV/Button/Primary Solid"],type:["Body/L"]},variants:[{label:"Default",el:()=>T(`<div class="c-mi">${x("Home",40)}<span>Home</span></div>`)},{label:"Selected",el:()=>T(`<div class="c-mi is-selected">${x("Home",40)}<span>Home</span></div>`)},{label:"Focus",el:()=>T(`<div class="c-mi is-focus">${x("Home",40)}<span>Home</span></div>`)}]},pi=[{v:"Multiple",ico:"Check",tx:"Multiple Choice (A-D)",w:273},{v:"Numeric",ico:"Pad",tx:"numeric input",w:205},{v:"Free Text",ico:"Text",tx:"Free Text Entry",w:222},{v:"UpDown",ico:"Up/Down",tx:"up/down select",w:224},{v:"Voice",ico:"Mic",tx:"voice input",w:177},{v:"Time",ico:"Timer",tx:"time-limited",w:187},{v:"Prime Time",ico:"Crown",tx:"PRIME TIME",w:167,prime:!0}],hi={id:"c-game-type-tag",title:"Game Type Tag",group:"Content",figma:"5022:9521",description:"How a show says what kind of answering it wants. 42 high, radius 8, a 24 icon and Label/M. Six sit on the secondary surface; Prime Time is the odd one out.",tokens:{colour:["TV/Base/Dark","TV/Base/Light","TV/Border/White 20","TV/Button/Secondary","TV/Game UI/Yellow"],type:["Label/M"]},variants:pi.map(e=>({label:`${e.v} — ${e.w}`,el:()=>T(`<span class="c-gtt${e.prime?" c-gtt--prime":""}">${x(e.ico,24)}${e.tx}</span>`)})),notes:["<code>1020:8114</code> is the same component: the base <code>Game Type Tag</code> that <code>5022:9521</code> varies. One drawing, two nodes.","<strong>Prime Time is not like the other six.</strong> It fills with <code>TV/Game UI/Yellow</code> and prints in <code>TV/Base/Dark</code> — the only one that inverts — and it is the only one whose label is set in capitals.","The copy is inconsistent in the file and is reproduced as found: <em>Multiple Choice (A-D)</em> and <em>Free Text Entry</em> are capitalised, <em>numeric input</em>, <em>voice input</em>, <em>time-limited</em> and <em>up/down select</em> are not.","Every variant's text layer is still named <code>Multiple Choice (A-D)</code> in Figma, whatever it says — they were duplicated and retyped."]},ui="M0.013317 108.755C0.017507 109.054 0.0805988 109.349 0.198989 109.624C0.31738 109.899 0.48875 110.148 0.703313 110.356C0.917875 110.565 1.17143 110.729 1.44949 110.84C1.72755 110.95 2.02468 111.005 2.32389 111.001H108.672C108.971 111.005 109.269 110.951 109.547 110.841C109.825 110.73 110.079 110.566 110.294 110.357C110.509 110.149 110.681 109.9 110.799 109.625C110.918 109.35 110.981 109.054 110.985 108.755V106.073C111.038 105.264 111.146 101.233 108.488 96.7722C106.811 93.9592 104.378 91.5318 101.255 89.5513C97.4782 87.156 92.673 85.4238 86.86 84.381C83.909 83.967 80.9819 83.3976 78.0909 82.6751C70.4026 80.7121 69.7308 78.9741 69.725 78.9565C69.6796 78.7852 69.6149 78.6196 69.5322 78.4629C69.4679 78.1416 69.3131 76.9206 69.611 73.6519C70.3647 65.3472 74.8193 60.4398 78.3977 56.4963C79.5252 55.2549 80.5914 54.0777 81.4122 52.9268C84.9555 47.9609 85.2827 42.3086 85.2973 41.9581C85.3106 41.337 85.2248 40.7178 85.0431 40.1237C84.6926 39.0429 84.0412 38.371 83.5621 37.8744C83.4489 37.7606 83.3388 37.6438 83.232 37.5239C83.197 37.483 83.1035 37.372 83.1882 36.8141C83.4747 35.0168 83.6726 33.2064 83.7812 31.3896C83.9448 28.4627 84.0704 24.0869 83.3138 19.8251C83.2031 19.011 83.0352 18.2057 82.8114 17.4152C82.0169 14.4805 80.7316 11.9781 78.9556 9.90799C78.6489 9.57207 71.2059 1.72896 49.5987 0.122365C46.6104 -0.0996375 43.6572 0.0201277 40.7478 0.169103C39.8874 0.188424 39.0311 0.294113 38.1919 0.484579C35.9602 1.06003 35.3643 2.47384 35.2094 3.26545C34.9495 4.57994 35.4052 5.59647 35.706 6.27416C35.7498 6.37056 35.8053 6.49033 35.709 6.8058C35.2094 7.58281 34.4178 8.28387 33.6145 8.94696C33.3808 9.14267 27.9652 13.8164 27.6672 19.9185C26.8639 24.5601 26.9223 31.7898 27.8717 36.7878C27.9301 37.0653 28.009 37.4743 27.8775 37.7518C26.8551 38.666 25.6984 39.703 25.7013 42.0691C25.713 42.3086 26.0431 47.958 29.5864 52.9268C30.4043 54.0777 31.4705 55.252 32.5951 56.4934L32.6009 56.4963C36.1792 60.4398 40.6339 65.3472 41.3875 73.6489C41.6826 76.9206 41.5277 78.1386 41.4664 78.4629C41.3826 78.6195 41.317 78.7851 41.2707 78.9565C41.2678 78.9741 40.5988 80.7063 32.9456 82.6663C28.5289 83.7968 24.1824 84.3752 24.0509 84.3898C18.4015 85.345 13.6256 87.0363 9.85445 89.4169C6.74349 91.3828 4.30439 93.819 2.61016 96.6525C-0.100605 101.18 -0.0275794 105.305 0.0103947 106.058L0.013317 108.755Z",Re=(e,t=!1)=>T(`<div class="c-av c-av--${e}">
     <span class="c-av__mask">${e==="guest"?`<svg class="c-av__sil" viewBox="0 0 111 111" fill="none" aria-hidden="true"><path d="${ui}" fill="currentColor"/></svg>`:'<img class="c-av__photo" src="/playalong-animation-catalog/assets/components/avatar-sample.png" alt="" />'}</span>
     ${t?`<span class="c-av__edit">${x("Edit",32)}</span>`:""}
   </div>`),gi={id:"c-avatar-picture",title:"Avatar Picture",group:"Identity",figma:"8717:11254",description:"140 round. Guest is the circle at 20% white with a black 111 silhouette sitting on its foot; logged in carries the picture. The 4px edge is OUTSIDE the box in both. The edit button is a real Secondary Button — 48, radius 12, with the Edit icon.",tokens:{colour:["TV/Base/Light","TV/Base/Neutral","TV/Border/White 20","TV/Button/Secondary"],type:[]},variants:[{label:"Guest",el:()=>Re("guest")},{label:"Guest · edit",el:()=>Re("guest",!0)},{label:"Logged in",el:()=>Re("photo")},{label:"Logged in · edit",el:()=>Re("photo",!0)}],notes:["The guest silhouette is a <strong>2311-character path</strong> exported from the file, not an icon stood in for it — head and shoulders, flush to the bottom of the circle.","The picture is the file's own image fill, downloaded rather than approximated with a gradient.","The 4px edge is <code>strokeAlign: OUTSIDE</code>, so it adds to the 140 rather than eating into it: 148 on screen.","The edit button overhangs the circle, which is why the preview slot does not clip."]},mi={id:"c-user-avatar",title:"User Avatar",group:"Identity",figma:"8408:16678",description:"518 × 140: an Avatar Picture, then the name in Heading/L over two metadata rows — member since, and the email address — each a 32 icon and Body/L, 8 apart.",tokens:{colour:["TV/Base/Light","TV/Base/Neutral","TV/Border/White 20","TV/Text/Primary"],type:["Body/L","Heading/L"]},variants:[{label:"Guest",el:()=>T(`<div class="c-ua">${Re("guest",!0).outerHTML}
        <div><p class="c-ua__name">New User</p>
          <div class="c-ua__row">${x("Info",32)}Member since May 12, 2026</div>
          <div class="c-ua__row">${x("Email",32)}example@gmail.com</div></div></div>`)},{label:"With a picture",el:()=>T(`<div class="c-ua">${Re("photo",!0).outerHTML}
        <div><p class="c-ua__name">Viachaslau</p>
          <div class="c-ua__row">${x("Info",32)}Member since May 12, 2026</div>
          <div class="c-ua__row">${x("Email",32)}example@gmail.com</div></div></div>`)}],notes:["The avatar is an <strong>instance of Avatar Picture</strong>, and the edit button inside it an instance of <code>Button [Secondary]</code> — this composes two other components rather than redrawing them.",'The two rows were built here as "Guest" and "0 trophies". That was invented: the file says <em>Member since</em> with the Info icon, and the email address with the Email icon.']},fi={id:"c-avatar-label",title:"AVATAR Label",group:"Identity",figma:"13502:18861",description:"89 × 28 for the word AVATAR, fully rounded, in Label/M on a white-to-grey vertical ramp. The 4px dark edge sits OUTSIDE the box, so the pill measures 97 × 36 on screen.",tokens:{colour:["TV/Placeholder/Light"],type:["Label/M"]},variants:[{label:"AVATAR — 89 × 28",el:()=>T(je("AVATAR"))},{label:"FRAME",el:()=>T(je("FRAME"))},{label:"BADGE",el:()=>T(je("BADGE"))},{label:"TITLE",el:()=>T(je("TITLE"))}],notes:["The edge is <code>#1E1E1E</code> — a raw value, not a token. Nothing in the palette carries it.","The ramp is vertical: white at the top, <code>#999999</code> at the foot. In Figma that is a gradient transform rather than an angle, which is why it reads as horizontal if you only look at the stops."]},bi={id:"c-unlocked-counter",title:"Unlocked counter",group:"Identity",figma:"13550:42728",description:"170 × 70. The gold star at 44, then the count in Display/M over UNLOCKED in Label/M, 16 apart.",tokens:{colour:["TV/Base/Light","TV/Text/Primary"],type:["Display/M","Label/M"]},notes:["The badge is the file's own star image, downloaded rather than approximated — it was a grey rounded square here until 2026-10-13."],variants:[{label:"7 of 24",el:()=>T(`<div class="c-unlocked"><img class="c-unlocked__badge" src="/playalong-animation-catalog/assets/components/star.png" alt="" />
        <div><div class="c-unlocked__n">7/24</div><div class="c-unlocked__cap">Unlocked</div></div></div>`)}]},vi={id:"c-selection-radio",title:"Selection Radio Button",group:"Controls",figma:"13305:21383",description:"64 frame. Unselected is a 55 ring with a 4px 20%-white edge; selected fills with Primary Solid and a tick.",tokens:{colour:["TV/Base/Light","TV/Border/White 20","TV/Button/Primary Solid"],type:[]},variants:[{label:"False",el:()=>T('<span class="c-radio"><span class="c-radio__ring"></span></span>')},{label:"True",el:()=>T('<span class="c-radio"><span class="c-radio__on"><span class="c-radio__tick"></span></span></span>')},{label:"▶ Live — pick one",el:()=>{const e=T('<div style="display:flex;gap:16px"></div>'),t=o=>{const a=T(o?'<span class="c-radio"><span class="c-radio__on"><span class="c-radio__tick"></span></span></span>':'<span class="c-radio"><span class="c-radio__ring"></span></span>');return a.style.cursor="pointer",a.addEventListener("click",()=>{e.querySelectorAll(".c-radio").forEach(i=>{i.innerHTML='<span class="c-radio__ring"></span>'}),a.innerHTML='<span class="c-radio__on"><span class="c-radio__tick"></span></span>'}),a};return e.append(t(!0),t(!1),t(!1)),e}}]},yi={id:"c-input-messages",title:"Input messages",group:"Feedback",figma:"7909:8736",description:"The line under a field: a 32 icon and Body/M, 12 apart. The three types differ only by the icon.",tokens:{colour:["TV/Base/Light","TV/Game UI/Red 1","TV/Game UI/Yellow"],type:["Body/M"]},variants:[{label:"Alert",el:()=>T(`<span class="c-msg c-msg--alert">${x("Alert")}Message text</span>`)},{label:"Warn",el:()=>T(`<span class="c-msg c-msg--warn">${x("Alert")}Message text</span>`)},{label:"Info",el:()=>T(`<span class="c-msg c-msg--info">${x("Info")}Message text</span>`)}]},wi={id:"c-strike-box",title:"Strike Box",group:"Game",figma:"4689:5985",description:"A 36 × 36 rounded square outlined in Game UI/Red 1 with a round-capped X inside. Family Feud — one per wrong answer.",tokens:{colour:["TV/Game UI/Red 1"],type:[]},variants:[{label:"Strike",el:()=>T('<span class="c-strike"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span>')}],notes:["The 4px edge is <code>strokeAlign: OUTSIDE</code>, so the marker measures 44 on screen rather than 36.","The X has <strong>round caps</strong> and is 17.7 across, centred — not a pair of square bars."]},xi={id:"c-attempt",title:"Attempt",group:"Game",figma:"4709:5407",description:"One guess, 168 × 71, in Game/S. Right reads in Text/Success, wrong in Game UI/Red 2.",tokens:{colour:["TV/Game UI/Red 2","TV/Text/Success"],type:["Game/S"]},variants:[{label:"Right",el:()=>T('<div class="c-attempt c-attempt--right">sleep</div>')},{label:"Wrong",el:()=>T('<div class="c-attempt c-attempt--wrong">run</div>')}]},ki={id:"c-reward-type-icon",title:"Reward Type Icon",group:"Identity",figma:"13312:22296",description:"144 frame: a 130 ring with a 6px silver edge, a silver glyph, and the category pill across its foot.",tokens:{colour:["TV/Placeholder/Grey","TV/Placeholder/Light"],type:["Label/M"]},variants:["FRAME","AVATAR","BADGE","TITLE"].map(e=>({label:e[0]+e.slice(1).toLowerCase(),el:()=>T(`<div class="c-rti"><div class="c-rti__ring"><span class="c-rti__q">?</span></div>
      <span class="c-rti__pill">${je(e)}</span></div>`)}))},_i={id:"c-player-thumbnail",title:"Player Thumbnail",group:"Content",figma:"2878:15039",description:"360 × 203, radius 8, with a 6px light edge. The scrub preview on the player.",tokens:{colour:["TV/Base/Light","TV/Transparent/Dark 40"],type:[]},variants:[{label:"Thumbnail",el:()=>T('<div class="c-pthumb"></div>')}]},G=e=>{const t=document.createElement("template");return t.innerHTML=e.trim(),t.content.firstElementChild},Ci=e=>`font-family:var(--type-${e}-family);font-weight:var(--type-${e}-weight);font-size:var(--type-${e}-size);line-height:var(--type-${e}-line);letter-spacing:var(--type-${e}-tracking);text-transform:var(--type-${e}-case)`;b("css-c-menu",`
.c-menu { height: 1080px; box-sizing: border-box; padding: 96px 0; position: relative;
  display: flex; flex-direction: column; color: var(--tv-base-light); }
.c-menu--collapsed { width: var(--menu-rail); }
.c-menu--expanded  { width: 340px; }
.c-menu__logo { align-self: flex-start; margin-left: 56px; display: flex; }
.c-menu--expanded .c-menu__logo { margin-left: 58px; }
.c-menu__group { padding: 0 32px; display: flex; flex-direction: column; gap: 24px;
  margin-top: 100px; }
.c-menu__foot { padding: 0 32px; margin-top: auto; }
/* 96 x 64 collapsed, 276 x 64 expanded -- both measured. Padding alone gave
   32 + 40 + 32 = 104, which pushed the icon 4px right of the rail's centre
   while every other icon in the stack sat on it. */
.c-menu__item { height: 64px; box-sizing: border-box; border-radius: 80px; opacity: .5;
  display: flex; align-items: center; gap: 8px;
  font-family: var(--type-body-l-family); font-size: 24px; white-space: nowrap; }
.c-menu--collapsed .c-menu__item { width: 96px; padding: 12px 0; justify-content: center; }
.c-menu--expanded .c-menu__item { width: 276px; padding: 12px 32px; }
.c-menu__item > svg { flex: none; }
/* Selected is WHITE, not a blue pill (design, 2026-10-13). The item carries no
   fill at all: being current means being at full strength while everything
   else sits at 50%. The blue is now only the focus ring, which is the thing
   the D-pad moves. */
.c-menu__item.is-selected { opacity: 1; }

.c-overlay { width: var(--menu-ramp-w); height: 1080px; position: relative; overflow: hidden; }
/* The real Home screen the menu sits on — captured from the TV Game PoC at
   1920 x 1080 with its own rail hidden, so only this rail is drawn. Without real
   content the ramp is invisible on a dark card, and dimming is its whole job. */
.c-overlay__behind { position: absolute; inset: 0;
  background: var(--tv-base-dark) url('assets/components/home-screen.jpg') left top / 1920px 1080px no-repeat; }
.c-overlay__ramp { position: absolute; inset: 0; background: var(--menu-ramp); }
.c-overlay .c-menu { position: absolute; left: 0; top: 0; }
.c-overlay__label { position: absolute; left: var(--menu-label-x); font-family: var(--type-body-l-family);
  font-size: 24px; color: var(--tv-base-light); opacity: .5; }
.c-overlay__label.is-on { opacity: 1; }
.c-overlay__ring { position: absolute; left: var(--menu-ring-x); top: 246px;
  width: var(--menu-ring-w); height: var(--menu-ring-h);
  border-radius: var(--menu-ring-radius);
  box-shadow: inset 0 0 0 var(--menu-ring-weight) var(--menu-ring-color); }
/* Collapsed until it has focus. The ramp and the labels fade in; the rail does
   not move, which is the whole point of PTV-858. */
.c-overlay--live { outline: none; cursor: pointer; }
.c-overlay--live .c-overlay__ramp { opacity: 0; transition: opacity 220ms ease; }
.c-overlay--live.is-open .c-overlay__ramp { opacity: 1; }
/* A label slides the last few pixels in rather than appearing, so the eye can
   see WHERE it came from -- out of the rail, not from a widening of it. */
.c-overlay--live .c-overlay__label { height: var(--menu-ring-h); display: flex; align-items: center;
  line-height: 1;
  opacity: 0; transform: translateX(-12px);
  transition: opacity 180ms ease, transform 180ms ease; }
.c-overlay--live.is-open .c-overlay__label { opacity: .5; transform: none; }
.c-overlay--live.is-open .c-overlay__label.is-on { opacity: 1; }
.c-overlay--live .c-overlay__ring { opacity: 0;
  transition: opacity 180ms ease, top 160ms cubic-bezier(.2,.7,.3,1); }
.c-overlay--live.is-open .c-overlay__ring { opacity: 1; }
.c-overlay--live:focus-visible { box-shadow: inset 0 0 0 2px var(--accent); }
`);const Do=[{ico:"Home",label:"Home"},{ico:"Search",label:"Search"},{ico:"Shield",label:"Legal"},{ico:"Leaderboard",label:"Progression"},{ico:"Trophy",label:"Trophies"}],Go={ico:"Account",label:"Sign In"},no=(e,t=0)=>{const o=(a,i)=>`<div class="c-menu__item${i===t?" is-selected":""}">${x(a.ico,40)}</div>`;return G(`<div class="c-menu c-menu--collapsed">
      <div class="c-menu__logo">${$i}</div>
      <div class="c-menu__group">${Do.map(o).join("")}</div>
      <div class="c-menu__foot">${o(Go,NaN)}</div>
    </div>`)},$i='<img src="assets/flows/mark.svg" alt="PlayAlong" style="width:48px;height:50px;display:block">',Ti={id:"c-menu",title:"Menu",group:"Navigation",figma:"11561:15402",description:"The rail at 160, the labels that appear beside it, and the ramp that dims the content. Three Figma nodes, one behaviour, on 45 frames.",tokens:{colour:["TV/Base/Dark","TV/Base/Light","TV/Button/Primary","TV/Button/Primary Solid","TV/Focus/Ring Color"],type:["Body/L"]},wide:!0,variants:[{label:"▶ Live — click the rail, then ↑ ↓, OK to select, Esc",el:Vi},{label:"Collapsed Menu — 772:7012 · no ramp, this node has none",el:()=>Si(no(!1,0))},{label:"Overlay — 11561:15402 · the ramp lives here",el:Li}],notes:["<strong><code>Expanded Menu</code> is 340 wide, not 792.</strong> The 792 belongs to <code>Overlay</code>, which is the <em>collapsed</em> rail with the six labels as loose text beside it over the dimming ramp — so anything reserving 792 for the menu has read the wrong node.","<strong>Only <code>Overlay</code> carries the ramp</strong>, which is why the collapsed variant above is drawn without one. They are shown on the home screen anyway, because a menu drawn on nothing tells you nothing.",'<strong>Both are used, and an earlier note here said otherwise.</strong> It claimed the expanded component "is not what the screen uses". Counted from the file: <code>Expanded Menu</code> is on <strong>14</strong> frames and <code>Overlay</code> on <strong>2</strong>. Two nodes describing one open menu, with the frames split between them. <strong>Worth reconciling in Figma.</strong>',"The rail is the <strong>same 160 wide open or shut</strong> — that is the whole of PTV-858, and why the content never shifts. The live variant is the only way to see it: watch the Home screen behind the ramp stay put.","The ramp is a horizontal gradient, not a flat panel: opaque <code>#040810</code>, <code>rgb(2,5,9)</code> at 80% at 43% of its width, fully transparent at the end. Measured on a device during PTV-858 — content keeps 39.9% of its luminance at x = 450 and 100% from x = 792.","The focus ring is a single 250 × 64 rectangle at x = 47, <strong>one size for every item</strong>, taken from the longest label (<code>Progression</code>, 134 wide). It does not hug its own text — a ring that resized per item would flicker as focus moved, and on a D-pad the moving ring is the only feedback there is.","In the drawn <code>Overlay</code> frame the <strong>ring is on Home but the full-strength label is Trophies</strong> — the labels carry their own opacity and two of them disagree about where focus is. <strong>A file defect</strong>, kept in the drawn variant and corrected in the live one, which has a single focus.","<strong>Selected is white, not a blue pill</strong> (design, 2026-10-13). White is the <strong>selected item only</strong> — the page you are on — <strong>icon and label together</strong>, open or shut; everything else sits at 50%. Focus is the blue ring and nothing else: the item under it stays at 50% until OK selects it. <strong>Figma has not caught up</strong> — its <code>Menu Item</code> component still fills <code>State=Focus</code> with the <code>Button/Primary</code> gradient, on 60 frames.","In the collapsed rail the Sign In item is <strong>104 wide where the other five are 96</strong>. An 8px difference on an item whose label is hidden.","The screen behind every variant is the real Home screen, captured from the TV Game PoC with its own rail hidden — it is context, not part of the component. On a dark card the ramp would otherwise show nothing at all."]};function Si(e){const t=G('<div class="c-overlay"><div class="c-overlay__behind"></div></div>');return t.appendChild(e),t}const Fi=[["Home",270],["Search",355],["Legal",446],["Progression",534],["Trophies",621],["Sign In",943]];function Li(){const e=G(`<div class="c-overlay"><div class="c-overlay__behind"></div>
      <div class="c-overlay__ramp"></div></div>`);e.appendChild(no(!1,NaN));for(const[o,a]of Fi){const i=G(`<span class="c-overlay__label${o==="Trophies"?" is-on":""}">${o}</span>`);i.style.top=`${a-7}px`,e.appendChild(i)}const t=G('<span class="c-overlay__ring"></span>');return t.style.top="246px",e.appendChild(t),e}function Vi(){const e=[...Do,Go],t=G(`<div class="c-overlay c-overlay--live" tabindex="0" role="navigation"
      aria-label="Menu"><div class="c-overlay__behind"></div>
      <div class="c-overlay__ramp"></div></div>`),o=no(!1,0);t.appendChild(o);const a=[...o.querySelectorAll(".c-menu__item")],i=p=>p===e.length-1?920:246+p*88,s=e.map((p,m)=>{const C=G(`<span class="c-overlay__label">${p.label}</span>`);return C.style.top=`${i(m)}px`,t.appendChild(C),C}),r=G('<span class="c-overlay__ring"></span>');t.appendChild(r);let l=!1,n=0,c=0;const d=()=>{t.classList.toggle("is-open",l),a.forEach((p,m)=>p.classList.toggle("is-selected",m===c)),s.forEach((p,m)=>p.classList.toggle("is-on",l&&m===c)),r.style.top=`${i(n)}px`},f=p=>{if(p.key==="Enter"&&l)c=n;else if(p.key==="ArrowRight"||p.key==="Enter")l=!0;else if(p.key==="Escape"||p.key==="ArrowLeft")l=!1;else if(p.key==="ArrowDown")l=!0,n=(n+1)%e.length;else if(p.key==="ArrowUp")l=!0,n=(n-1+e.length)%e.length;else return;p.preventDefault(),d()};return t.addEventListener("keydown",f),t.addEventListener("focus",()=>{l=!0,d()}),t.addEventListener("blur",()=>{l=!1,d()}),t.addEventListener("click",()=>t.focus()),d(),t}b("css-c-tabs",`
.c-tabs { display: inline-flex; gap: 24px; }
.c-tabs .c-tab { width: 151px; }
`);const Ai={id:"c-tabs",title:"Tabs",group:"Navigation",figma:"867:1808",description:"676 × 56 — four Tabs Items on a 24 gap. It switches seasons on Details and QR against Email on the auth screens.",tokens:{colour:["TV/Button/Secondary","TV/Border/White 20","TV/Base/Light","TV/Text/Primary"],type:[]},variants:[{label:"Season 4 selected",el:()=>G(`<div class="c-tabs">
        <span class="c-tab is-selected">Season 4</span><span class="c-tab">Season 3</span>
        <span class="c-tab">Season 2</span><span class="c-tab">Season 1</span></div>`)},{label:"▶ Live — click a season",el:()=>{const e=G(`<div class="c-tabs">
        <span class="c-tab is-selected">Season 4</span><span class="c-tab">Season 3</span>
        <span class="c-tab">Season 2</span><span class="c-tab">Season 1</span></div>`);return e.querySelectorAll(".c-tab").forEach(t=>{t.style.cursor="pointer",t.addEventListener("click",()=>{e.querySelectorAll(".c-tab").forEach(o=>o.classList.remove("is-selected")),t.classList.add("is-selected")})}),e}}],notes:["<strong>Every item is 151 wide</strong> although the labels differ — the same longest-label rule as the menu ring. The <code>Tabs Item</code> component on its own hugs its text; the strip overrides it.","The strip has no focus variant. Focus belongs to <code>Tabs Item</code>, which has one, so a focused strip has to come from the item."]};b("css-c-tagrow",`
.c-tagrow { display: flex; gap: 24px; flex-wrap: wrap; }
.c-gtag { height: 42px; box-sizing: border-box; border-radius: 8px;
  background: var(--tv-button-secondary); border: 1px solid var(--tv-border-white-20);
  display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px;
  ${Ci("label-m")}; text-transform: none; color: var(--tv-base-light); white-space: nowrap; }
.c-gtag > svg { flex: none; }
`);const Ii=[["Check","Multiple Choice (A-D)"],["Pad","numeric input"],["Text","Free Text Entry"],["Up/Down","up/down select"],["Mic","voice input"],["Timer","time-limited"]],Mi={id:"c-game-type-tags-row",title:"Game Type Tags Row",group:"Content",figma:"473:2980",description:"1408 × 42 — the six input-kind tags a game can carry, shown on rail cards and on Details.",tokens:{colour:["TV/Button/Secondary","TV/Border/White 20","TV/Base/Light"],type:["Label/M"]},wide:!0,variants:[{label:"All six",el:()=>G(`<div class="c-tagrow">${Ii.map(([e,t])=>`<span class="c-gtag">${x(e,24)}${t}</span>`).join("")}</div>`)}],notes:["<strong>The six labels disagree about case</strong>: <em>Multiple Choice (A-D)</em> and <em>Free Text Entry</em> are title case, <em>numeric input</em>, <em>up/down select</em>, <em>voice input</em> and <em>time-limited</em> are lower. All six bind <code>Label/M</code>, which is <code>Rubik Medium 18 CAPS</code> — so the style says caps and not one of them is in caps. <strong>Needs a decision.</strong> Drawn as the file renders them.","The first tag is an instance of <code>Content Tag Type</code>; the other five are <code>Game Type Tag - Variants</code>. <strong>Two different components in one row</strong>, drawing the same thing.","These name what the game asks the player to do — multiple choice, a number, free text, up/down, voice, a clock. They are not the content tags on a rail card."]},I=e=>{const t=document.createElement("template");return t.innerHTML=e.trim(),t.content.firstElementChild};b("css-c-brand",`
.c-logo img { display: block; }
.c-logo__tag { margin-top: 26px; font-family: var(--type-heading-m-family);
  font-size: 32px; color: var(--tv-base-light); }

.c-trophies { width: 1664px; height: 473px; box-sizing: border-box; border-radius: 24px;
  border: 1px solid var(--tv-border-white-20); padding: 32px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 24px; color: var(--tv-base-light); }
.c-trophies__slot { width: 1072px; height: 75px; border-radius: 8px;
  background: var(--tv-transparent-white-6); }

.c-confetti { width: 600px; height: 300px; position: relative; overflow: hidden;
  border-radius: 12px; background: var(--tv-base-dark); }
.c-confetti i { position: absolute; display: block; border-radius: 2px;
  animation: c-confetti-fall 2.4s linear infinite; }
@keyframes c-confetti-fall {
  0%   { transform: translateY(-40px) rotate(0deg); opacity: 0; }
  10%  { opacity: 1; }
  100% { transform: translateY(340px) rotate(540deg); opacity: 1; }
}

.c-inputfield { width: 280px; height: 44px; box-sizing: border-box; border-radius: 8px;
  display: flex; align-items: center; padding: 10px 16px;
  background: var(--web-transparent-white-6);
  font-family: var(--type-body-m-family); font-size: 16px; line-height: 24px; color: #c9cdd2; }
.c-inputfield--error { background: var(--web-transparent-red-6);
  box-shadow: inset 0 0 0 1px rgb(255 0 0 / .5); }
.c-inputfield--disabled { background: rgb(255 255 255 / .16);
  box-shadow: inset 0 0 0 1px #6e7277; color: #6e7277; }

.c-gpanel { box-sizing: border-box; border-radius: 24px; padding: 40px;
  background: var(--tv-transparent-dark-80); border: 1px solid var(--tv-border-white-20);
  color: var(--tv-base-light); }
.c-gpanel__label { font-family: var(--type-game-s-family); font-weight: var(--type-game-s-weight);
  font-size: var(--type-game-s-size); }
.c-gpanel__slot { border-radius: 8px; background: var(--tv-transparent-white-6); }
`);const Bi={id:"c-logo",title:"Logo",group:"Content",figma:"933:7815",description:"572 × 128 — the wordmark, nine vectors all bound to TV/Base/Light. It opens the splash, the menu and every auth screen.",tokens:{colour:["TV/Base/Light"],type:[]},wide:!0,variants:[{label:"Logo",el:()=>I('<div class="c-logo"><img src="assets/flows/logo.svg" alt="PlayAlong" style="width:572px;height:128px"></div>')}],notes:["Every one of the nine vectors binds <code>TV/Base/Light</code>, so the mark recolours from one token. That is unusual in this file and worth keeping.","The <code>Subtract</code> vector in the middle is the <strong>A</strong>, and it is also the standalone mark the collapsed menu uses."]},Ei={id:"c-logo-text",title:"Logo with Text",group:"Content",figma:"933:7743",description:"572 × 180 — the wordmark over the tagline, on a 26 gap.",tokens:{colour:["TV/Base/Light"],type:[]},wide:!0,variants:[{label:"With tagline",el:()=>I(`<div class="c-logo">
        <img src="assets/flows/logo.svg" alt="PlayAlong" style="width:572px;height:128px">
        <div class="c-logo__tag">Your Interactive Streaming Experience</div></div>`)}],notes:["The tagline is <strong>31.91px</strong> and binds no text style — a scaled leftover rather than a size anyone chose. The nearest real style is <code>Rubik Regular 32 (H4)</code>. <strong>Worth snapping.</strong>","<em>Your Interactive Streaming Experience</em> is the only tagline anywhere in the file. It is not in the product brief, so whether it is approved copy is unknown. <strong>Needs the PO.</strong>"]},Ri={id:"c-subtract",title:"Subtract",group:"Content",figma:"933:7845",description:"119 × 123 — the A of the wordmark, used alone as the app mark at the top of the collapsed rail.",tokens:{colour:["TV/Base/Light"],type:[]},variants:[{label:"Mark",el:()=>I('<div class="c-logo"><img src="assets/flows/mark.svg" alt="PlayAlong" style="width:119px;height:123px"></div>')}],notes:["<strong><code>Subtract</code> is a boolean operation, not a name.</strong> It is what Figma calls the shape when you subtract one path from another, and it was never renamed. This is the app mark — the thing on the splash screen and in the collapsed rail — and it is findable only by knowing that. <strong>Worth renaming.</strong>"]},zt=["#ffc700","#018d10","#018efd","#f74f9e","#ff5257","#fc76ff"],Hi={id:"c-confetti",title:"Confetti",group:"Feedback",figma:"11643:38235",description:"The celebration behind a claimed reward — four steps of about 150 scattered pieces in six colours.",tokens:{colour:[],type:[]},variants:[{label:"▶ Falling",el:()=>{const e=I('<div class="c-confetti"></div>');for(let t=0;t<90;t++){const o=zt[t%zt.length],a=8+t%3*4,i=document.createElement("i"),s=t*2654435761%4096;i.style.cssText=`left:${s%600}px;top:-20px;width:${a}px;height:${a+4}px;background:${o};animation-delay:${-(s%240)/100}s;animation-duration:${2+s%13/10}s`,e.appendChild(i)}return e}},{label:"The six colours",el:()=>{const e=I('<div style="display:flex;gap:12px"></div>');for(const t of zt){const o=document.createElement("span");o.style.cssText=`width:64px;height:64px;border-radius:8px;background:${t}`,o.title=t,e.appendChild(o)}return e}}],notes:["<strong>All six colours are hardcoded and none is in the token file</strong> — <code>#FFC700</code>, <code>#018D10</code>, <code>#018EFD</code>, <code>#F74F9E</code>, <code>#FF5257</code>, <code>#FC76FF</code>. The product palette has one green (<code>Game UI/Green 1</code> <code>#00C441</code>) and one blue (<code>Blue/500</code> <code>#0090FF</code>), and neither of these matches. <strong>Six untokenised colours in the most visible moment the product has.</strong>","The file animates it as <strong>four discrete steps</strong>, each a separate variant with about 150 vectors at hand-placed positions. That is a flipbook, not a motion spec: no duration, no easing, no direction.","The fall here is generated, not the file's scatter — 90 pieces on a loop, which is what the four steps are reaching for. <strong>The colours are measured; the positions are not.</strong> This is the one component where the catalog's point is the animation rather than the still."]},Pi={id:"c-trophies-thumb",title:"Trophies thumbnail",group:"Identity",figma:"13550:43488",description:"1664 × 473 — the Trophy Cabinet before anything is earned.",tokens:{colour:["TV/Border/White 20","TV/Base/Light"],type:[]},wide:!0,variants:[{label:"Empty",el:()=>I(`<div class="c-trophies">
        ${x("Prize Outline",64)}
        <span class="c-trophies__h">Your trophies will appear here</span>
        <span class="c-trophies__p">Earn trophies by playing games and completing challenges.</span>
      </div>`)}],notes:['<strong>This is where the word <em>challenges</em> comes from.</strong> The second line reads <em>"Earn trophies by playing games and completing challenges."</em> — the only place in the whole product that word appears. Nothing defines a challenge; the nearest real thing is a Mission, which is post-MVP. <strong>Build nothing from that sentence.</strong>',"1664 is the content inner width — the content block less its 96 right margin. So this fills the column exactly."]},zi={id:"c-input-field-web",title:"Input Field (Web)",group:"Controls",figma:"9849:13692",description:"280 × 44 — the browser field itself, in five states. The sibling of Input (Web), which adds the message row.",tokens:{colour:["Web/Transparent/White 6","Web/Transparent/Red 6"],type:[]},variants:[{label:"Default",el:()=>I('<div class="c-inputfield">Your email address</div>')},{label:"Error",el:()=>I('<div class="c-inputfield c-inputfield--error">Your email address</div>')},{label:"Disabled",el:()=>I('<div class="c-inputfield c-inputfield--disabled">Your email address</div>')}],notes:["<strong>Three of its colours come from a remote library</strong> this file cannot change: <code>Text/Secondary</code> for the placeholder, and <code>Overlay/Pressed 16%</code> and <code>Text/Disabled</code> for the disabled state. Who owns that library is unknown. <strong>Needs an owner.</strong>","The error outline is a <strong>raw <code>#FF0000</code> at 50%</strong>, bound to nothing — while its fill correctly binds <code>Web/Transparent/Red 6</code>. One of the two was tokenised and the other was not.","<code>Placeholder</code> and <code>Default</code> are the same drawing, as on the rail card. Not shown separately."]},Oi={id:"c-answer-box",title:"Answer Box",group:"Game",figma:"2565:2734",description:"768 × 317 — how many answers are found, then the one being given. The 1% Club, Match Game and Family Feud all post questions through it.",tokens:{colour:["TV/Transparent/Dark 80","TV/Border/White 20","TV/Base/Light","TV/Game UI/Yellow"],type:["Game/S","Game/M","Display/L","Display/M"]},wide:!0,variants:[{label:"Default",el:()=>Ot("Answer...","ph")},{label:"Typed",el:()=>Ot("ABC")},{label:"Two Lines",el:()=>Ot("ABCDEFGHIGKLMNOPQRST","two")}],notes:["<strong>The count is two sizes and two colours in one line</strong>: <em>FOUND</em> at 32 in white, <em>2/5</em> at 40 in <code>Game UI/Yellow</code>, sharing a baseline.","<strong>The answer is Rubik, not the game font</strong> — <code>Display/L</code> at 64, dropping to <code>Display/M</code> at 48 when it does not fit on one line, which is what the <code>Two Lines</code> variant is. A size change drawn as a separate variant rather than as text that wraps. It was built here in Roboto Condensed; re-read 2026-10-14, that was wrong, and it makes this the one game panel whose content is in the product typeface.","<code>Display/L</code> is 64<strong>/88</strong> but the node is 45 tall, so the style's leading is not what the frame lays out on. Rebuilt on the measured box, not the style — on the style the glow below sits 43px too low.","<strong><code>Two Lines</code> may render on one here.</strong> The text box is the file's 624 and the string is the file's, but Figma breaks it after <em>…OPQ</em> and a browser decides on its own metrics. The break is <strong>not</strong> forced, because forcing it would hide the real question — whether 20 characters at 48 fit — behind a hard-coded newline.","The placeholder reads <code>Answer...</code> in three full stops rather than an ellipsis, dimmed. The same three-dot habit as the loading sentence.","<strong>The rule under the answer is a picture</strong>: <code>image 171</code>, a 756 × 110 PNG absolutely positioned over the panel — an ellipse of light behind a hairline, widest at the centre. It was rebuilt here as a CSS gradient with a box-shadow, which did not read like the frame; the export is used now. It binds no token and cannot recolour.","<strong>The picture is not centred, and it is not centred differently in each variant</strong>: 756 wide in a 768 box, at x 0 on <code>Typed</code> and <code>Two Lines</code> and x 6 on <code>Default</code>. Drawn at x 0 here. <strong>A file slip</strong> — 6 on each side is what it looks like it wants.","A <code>BACKGROUND_BLUR: 20</code> sits on the frame holding the answer. Nothing is behind it inside the component, so it only does anything over the video — which is where this panel lives."]},Di=[["sleep",!0],["tv",!0],["run",!1],["walk",!1],["drink",!1],["drink",!1],["drink",!1],["drink",!1],["drink",!1],["drink",!1]],Gi={id:"c-attempts-box",title:"Attempts Box",group:"Game",figma:"2565:2667",description:"248 × 819 — every answer a Family Feud player has tried, the matches green and the misses dark red.",tokens:{colour:["TV/Transparent/Dark 80","TV/Border/White 20","TV/Base/Light","TV/Game UI/Green 1","TV/Game UI/Red 2"],type:["Game/S"]},variants:[{label:"Two found, eight missed",el:()=>I(`<div class="c-attempts"><div class="c-attempts__col">
        <span class="c-attempts__head">attemps</span>
        <div class="c-attempts__list">${Di.map(([e,t])=>`<span class="c-attempts__row c-attempts__row--${t?"hit":"miss"}">${e}</span>`).join('<span class="c-attempts__rule"></span>')}</div>
      </div></div>`)}],notes:["<strong>The heading is spelled <code>attemps</code></strong> — the <em>t</em> is missing. <strong>A file defect</strong>, and it is the component's title on screen.","<strong>Every string here is lower case in the file and renders in capitals</strong>, because the nodes carry <code>textCase: UPPER</code>. So the game layer does transform case — through the node, not through the text style. Anything generating from the styles alone gets this wrong.","A match is <code>Game UI/Green 1</code>; a miss is <code>Game UI/Red 2</code>, the darker of the two reds. The list is ten rows deep and the file repeats <em>drink</em> six times to fill it."]},Ot=(e,t)=>I(`<div class="c-abox">
      <span class="c-abox__found">Found <b>2/5</b></span>
      <span class="c-abox__value${t==="two"?" c-abox__value--two":""}${t==="ph"?" c-abox__value--ph":""}">${e}</span>
      <span class="c-abox__rule"></span>
    </div>`);b("css-c-last",`
.c-opts { width: 656px; box-sizing: border-box; border-radius: 24px; padding: 40px;
  background: var(--tv-transparent-dark-80); border: 1px solid var(--tv-border-white-20);
  display: flex; flex-direction: column; gap: 16px; }
.c-opt { height: 76px; box-sizing: border-box; border-radius: 12px; padding: 0 32px;
  display: flex; align-items: center; gap: 24px; color: var(--tv-base-light);
  font-family: var(--type-game-m-family); font-weight: var(--type-game-m-weight);
  font-size: var(--type-game-m-size); }
.c-opt--green { background: var(--gradient-tv-status-success); border: 2px solid var(--tv-game-ui-green-1); }
.c-opt--blue  { background: var(--gradient-tv-status-wait); border: 2px solid var(--tv-button-primary-solid); }
.c-opt__n { width: 24px; text-align: center; }
.c-opt__rule { width: 2px; align-self: stretch; background: var(--tv-button-secondary); }
.c-opt__text, .c-opt__n, .c-opt__score { text-transform: uppercase; }
.c-opt__text { flex: 1; font-family: var(--type-game-s-family);
  font-weight: var(--type-game-s-weight); font-size: var(--type-game-s-size); }
.c-opt.is-hidden .c-opt__text, .c-opt.is-hidden .c-opt__score { opacity: 0; }

/* Loader Big (Figma 557:3037, on Splash Screen - 2): a 100 ring 14 thick, filled
   with the TV/Loader/Spin ANGULAR gradient -- white held for the first 17.6% of
   the turn, then fading to nothing, with the hard cut at six o'clock. It was a
   bordered circle with one blue side here, which is a generic CSS spinner and
   not the product's. The conic gradient is the fill; the hole is a mask, because
   a border cannot carry a gradient. */
.c-loader { width: 100px; height: 100px; border-radius: 50%; box-sizing: border-box;
  background: conic-gradient(from 180deg,
    var(--tv-base-light) 0deg, var(--tv-base-light) 63.2deg, rgb(255 255 255 / 0) 360deg);
  -webkit-mask: radial-gradient(closest-side, #0000 calc(100% - 14px), #000 calc(100% - 14px));
          mask: radial-gradient(closest-side, #0000 calc(100% - 14px), #000 calc(100% - 14px));
  animation: c-loader-spin 900ms linear infinite; }
@keyframes c-loader-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .c-loader { animation: none; } }
.c-loading { display: flex; flex-direction: column; align-items: center; gap: 32px;
  color: var(--tv-base-light); font-family: var(--type-heading-l-family);
  font-weight: var(--type-heading-l-weight); font-size: var(--type-heading-l-size); }

.c-rwpop { width: 1100px; box-sizing: border-box; padding: 40px;
  display: flex; flex-direction: column; align-items: center; gap: 64px;
  color: var(--tv-base-light); }
.c-rwpop__h { font-family: var(--type-display-l-family);
  font-weight: var(--type-display-l-weight); font-size: var(--type-display-l-size); }
.c-rwpop__art { width: 281px; height: 281px; object-fit: contain; }
.c-rwpop { align-items: stretch; }
.c-rwpop__h { align-self: flex-start; }
.c-rwpop__art, .c-rwpop__name, .c-rwpop .c-btn { align-self: center; }
.c-rwpop__name { display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--type-heading-l-family); font-weight: var(--type-heading-l-weight);
  font-size: 36px; }
.c-trophies__h { font-family: var(--type-heading-l-family);
  font-weight: var(--type-heading-l-weight); font-size: 36px; }
.c-trophies__p { font-family: var(--type-body-l-family); font-size: 24px;
  color: var(--tv-text-primary); }

/* The game layer sets textCase UPPER on its nodes, so a lower-case string in
   Figma renders in capitals. That is why the heading reads ATTEMPS. */
.c-game-upper { text-transform: uppercase; }
.c-attempts { width: 248px; height: 819px; box-sizing: border-box; border-radius: 24px;
  padding: 40px; background: var(--tv-transparent-dark-80);
  border: 1px solid var(--tv-border-white-20); display: flex; justify-content: center; }
/* A 168-wide column, centred: the heading, then Attempt rows split by 168 lines. */
.c-attempts__col { width: 168px; display: flex; flex-direction: column; align-items: center; gap: 24px; }
.c-attempts__head, .c-attempts__row { font-family: var(--type-game-s-family);
  font-weight: var(--type-game-s-weight); font-size: var(--type-game-s-size);
  line-height: var(--type-game-s-line); text-transform: uppercase; text-align: center;
  /* The file trims text to the cap height, which is what makes a row 71 tall. */
  text-box: trim-both cap alphabetic; }
.c-attempts__head { color: var(--tv-base-light); width: 100%; }
.c-attempts__list { width: 100%; display: flex; flex-direction: column; align-items: center; }
.c-attempts__row { width: 168px; box-sizing: border-box; padding: 24px 0; }
/* Vector 7: a 168 line, Border/White 20 at 40% opacity. */
.c-attempts__rule { width: 168px; height: 1px; flex: none; background: var(--tv-border-white-20); opacity: .4; }
.c-attempts__row--hit  { color: var(--tv-game-ui-green-1); }
.c-attempts__row--miss { color: var(--tv-game-ui-red-2); }

.c-abox { position: relative; width: 768px; height: 317px; box-sizing: border-box;
  border-radius: 24px; padding: 40px; background: var(--tv-transparent-dark-80);
  border: 1px solid var(--tv-border-white-20);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 33px; color: var(--tv-base-light); }
.c-abox__found { display: flex; align-items: baseline; gap: 8px; text-transform: uppercase;
  font-family: var(--type-game-s-family); font-weight: var(--type-game-s-weight);
  font-size: 32px; height: 38px; }
.c-abox__found b { font-size: 40px; color: var(--tv-game-ui-yellow); font-weight: inherit; }
/* The answer is Rubik, not the game font. It binds Display/L -- 64/88 -- but the
   node is 45 tall, so the style's leading is not what the frame lays out on.
   Set to the measured box height instead, or the glow below lands 43px low. */
.c-abox__value { display: flex; align-items: center; justify-content: center;
  width: 688px; height: 100px; box-sizing: border-box; padding: 0 32px;
  font-family: var(--type-display-l-family); font-weight: var(--type-display-l-weight);
  font-size: 64px; line-height: 45px; text-align: center; }
.c-abox__value--two { font-size: 48px; line-height: 41px; }
.c-abox__value--ph { color: var(--tv-text-muted); }
/* The rule under the answer is a RASTER in the file -- image 171, a 756 x 110
   PNG absolutely positioned over the panel, not a line with a shadow. It was
   drawn here as a CSS gradient and did not read like the frame: the file's glow
   is an ellipse of light behind a hairline, widest at the centre. Exported from
   Figma at 2x and placed at the file's coordinates. */
.c-abox__rule { position: absolute; left: 0; top: 196px; width: 756px; height: 110px;
  background: url('assets/components/answer-glow.png') center/100% 100% no-repeat;
  pointer-events: none; }

.c-gkb { box-sizing: border-box; border-radius: 24px; padding: 40px;
  background: var(--tv-transparent-dark-80); border: 1px solid var(--tv-border-white-20);
  position: relative; color: var(--tv-base-light); }
.c-gkb__k { position: absolute; box-sizing: border-box; border-radius: 8px;
  background: var(--tv-base-neutral); display: grid; place-items: center;
  font-family: var(--type-heading-s-family); font-size: 24px; }
.c-gkb__k--on { background: var(--tv-base-light); color: var(--tv-base-dark); }
.c-gkb__a { position: absolute; height: 72px; box-sizing: border-box; border-radius: 12px;
  display: grid; place-items: center; font-family: var(--type-body-l-family); font-size: 24px; }
.c-gkb__a--skip { background: var(--tv-button-secondary);
  border: 1px solid var(--tv-border-white-20); }
.c-gkb__a--go { background: var(--gradient-tv-button-primary);
  border: 1px solid var(--tv-button-primary-solid); }
`);const Ni=[["Sleeping","24"],["TV/SVU Rerun","24"],["Sex/chase 21 Yr-olds","24"],["Boozing/Rum & Ensure","24"]],Ui={id:"c-answer-options",title:"List of answer Options",group:"Game",figma:"2565:2663",description:"656 × 819 — Family Feud's survey board: eight rows, the found ones green and the unfound ones blue with their text hidden.",tokens:{colour:["TV/Transparent/Dark 80","TV/Border/White 20","TV/Status/Success","TV/Status/Wait","TV/Game UI/Green 1","TV/Button/Primary Solid","TV/Button/Secondary","TV/Base/Light"],type:["Game/M","Game/S"]},wide:!0,variants:[{label:"Four found, four hidden",el:()=>{const e=Ni.map(([t,o],a)=>`<div class="c-opt c-opt--green"><span class="c-opt__n">${a+1}</span>
          <span class="c-opt__rule"></span><span class="c-opt__text">${t}</span>
          <span class="c-opt__score">${o}</span></div>`).join("")+[5,6,7,8].map(t=>`<div class="c-opt c-opt--blue is-hidden"><span class="c-opt__n">${t}</span>
          <span class="c-opt__rule"></span><span class="c-opt__text">Sleeping</span>
          <span class="c-opt__score">33</span></div>`).join("");return I(`<div class="c-opts">${e}</div>`)}}],notes:["<strong>A hidden answer is still in the file, at opacity 0.</strong> Rows five to eight carry real text and a real score with their opacity set to zero, not blanked. Anything exporting this — or inspecting the DOM of a client built from it — reads the answers before the player finds them. <strong>Flag to engineering: the hidden rows must not ship their text.</strong>","Seven of the eight rows are named <code>Answerr option</code>, with two r's; the fourth is <code>Answer Option</code>. Eight instances, two spellings, neither matching the component.","Every label is <strong>lower case in the file and renders in capitals</strong> — <code>textCase: UPPER</code> on the node, not in the text style. The same trick the Attempts Box uses.","Green is <code>TV/Status/Success</code> with a <code>Game UI/Green 1</code> edge, blue is <code>TV/Status/Wait</code> with a <code>Primary Solid</code> edge. So found and not-yet-found are the same two gradients the rest of the game layer uses for success and waiting."]},Wi={id:"c-card-sharks-question",title:"Card Sharks Question",group:"Game",figma:"3752:30765",description:"418 × 398 — the timer panel over the Higher/Lower panel. This is how every Card Sharks question is posed.",tokens:{colour:["TV/Transparent/Dark 80","TV/Border/White 20","TV/Base/Neutral"],type:[]},variants:[{label:"Default",el:()=>I(`<div style="display:flex;flex-direction:column;gap:16px;width:418px">
        <div class="c-gpanel" style="height:86px;padding:24px 40px"></div>
        <div class="c-hlpanel">
          <div class="c-hlpanel__btn"><span class="c-dkey c-dkey--up">${x("Play",44)}</span><span>Higher</span></div>
          <div class="c-hlpanel__btn"><span class="c-dkey c-dkey--down">${x("Play",44)}</span><span>lower</span></div>
        </div></div>`)}],notes:["It is <strong>an assembly, not a new drawing</strong>: a <code>Score Box</code> in its Timer variant over the <code>Higher/Lower</code> panel, on a 16 gap. Both are already in this catalog on their own.","The second variant, <code>with Card</code>, adds the playing card. Not drawn here — the card art is a separate asset this rebuild does not have."]},qi={Default:{w:848,h:384,keys:[...[..."QWERTYUIOP"].map((e,t)=>[68+t*72,40,64,64,e]),...[..."ASDFGHJKLZ"].map((e,t)=>[68+t*72,112,64,64,e]),...[..."XCVBNM"].map((e,t)=>[104+t*72,184,64,64,e])],acts:[[74,272,278,72,"Skip"],[496,272,278,72,"Submit Answer",1]]},"Letters with Digit":{w:1010,h:384,keys:[...[..."QWERTYUIOP"].map((e,t)=>[40+t*72,40,64,64,e]),...[..."123"].map((e,t)=>[763+t*71,40,64,64,e]),...[..."ASDFGHJKLZ"].map((e,t)=>[41+t*72,112,64,64,e]),...[..."456"].map((e,t)=>[762+t*72,112,64,64,e]),...[..."XCVBNM"].map((e,t)=>[76+t*72,184,64,64,e]),...[..."978"].map((e,t)=>[762+t*72,184,64,64,e])],acts:[[155,272,278,72,"Skip"],[577,272,278,72,"Submit Answer",1]]},Numeric:{w:700,h:312,keys:[...[..."12345"].map((e,t)=>[92+t*105,40,97,64,e]),...[..."67890"].map((e,t)=>[40+t*105,112,97,64,e])],acts:[[40,200,298,72,"Skip Question"],[362,200,298,72,"Submit Answer",1]]},Multiselect:{w:700,h:240,keys:[["A",0],["B",1],["C",2],["D",3]].map(([e,t])=>[40+t*157,40,149,64,e,t===2?1:void 0]),acts:[[40,128,298,72,"Skip"],[362,128,298,72,"Submit Answer"]]},"Coordinate Input":{w:700,h:312,keys:[...[..."ABCD"].map((e,t)=>[40+t*157,40,149,64,e]),...[..."1234"].map((e,t)=>[40+t*157,112,149,64,e])],acts:[[40,200,298,72,"Skip Question"],[362,200,298,72,"Submit Answer",1]]},Voice:{w:780,h:384,keys:[],acts:[[40,272,278,72,"Skip"],[462,272,278,72,"Submit Answer"]]}},Zi=e=>{const t=qi[e],o=([a,i,s,r,l,n],c)=>`<span class="${c}${n?c==="c-gkb__a"?" c-gkb__a--go":" c-gkb__k--on":c==="c-gkb__a"?" c-gkb__a--skip":""}"
       style="left:${a}px;top:${i}px;width:${s}px;height:${r}px">${l}</span>`;return I(`<div class="c-gkb" style="width:${t.w}px;height:${t.h}px">
      ${t.keys.map(a=>o(a,"c-gkb__k")).join("")}
      ${t.acts.map(a=>o(a,"c-gkb__a")).join("")}
      ${e==="Voice"?`<div class="c-kb__mic" style="position:absolute;left:309px;top:40px">
             <span class="c-kb__halo"><span><span>${x("Mic",44)}</span></span></span>
             <span class="c-kb__lt"><b>Listening...</b><i>Speak now</i></span></div>`:""}
    </div>`)},ji={id:"c-game-keyboard",title:"Keyboard (game)",group:"Game",figma:"2565:2733",description:"The in-game input panel in six shapes. Six, because The 1% Club asks for an answer six different ways; Match Game and Family Feud use two of them.",tokens:{colour:["TV/Transparent/Dark 80","TV/Border/White 20","TV/Base/Neutral","TV/Base/Light","TV/Button/Secondary","TV/Button/Primary"],type:["Heading/S","Body/L"]},wide:!0,variants:["Default","Letters with Digit","Numeric","Multiselect","Coordinate Input","Voice"].map(e=>({label:e,el:()=>Zi(e)})),notes:["<strong>It is a different keyboard from <code>Email Keyboard</code> entirely</strong> — a dark panel at <code>Transparent/Dark 80</code> radius 24 with 64 × 64 keys at radius 8, against the <code>Base/Neutral</code> slab with 95 × 90 square keys. Two components called keyboard, sharing nothing.","Its letters are <strong>QWERTY</strong> while the Email Keyboard is <strong>alphabetical</strong>. Same product, two orders.","<strong>The rows do not align to one grid.</strong> <code>Default</code> starts its top row at x = 68 and <code>Letters with Digit</code> at 40; the second row of the latter starts at 41, one pixel off its own first row. Measured positions, kept as they are.","Its six kinds nearly match the six <code>Game Type Tags</code> — but the keyboard has <em>Coordinate Input</em> and <em>Multiselect</em> and no up/down or time-limited. Two lists of six that do not match.","<code>Submit Answer</code> is the primary gradient on four layouts and a plain white button on <code>Multiselect</code> and <code>Voice</code>. <strong>Worth reconciling.</strong>"]},Yi={id:"c-loading",title:"Loading state",group:"Feedback",figma:"13523:20837",description:"The spinner over “Loading your progress…”, at full screen and as a 1665 × 323 band.",tokens:{colour:["TV/Base/Light","TV/Loader/Spin"],type:["Heading/L"]},wide:!0,variants:[{label:"▶ Band (1665 × 323)",el:()=>I(`<div class="c-loading" style="height:323px;justify-content:center">
        <span class="c-loader"></span><span>Loading your progress...</span></div>`)}],notes:["<strong>The two are the same contents in two frames</strong> — <code>Loading state - 1</code> is 1920 × 1080 and <code>Loading state - 2</code> is 1665 × 323, and the spinner and the sentence are identical in both. One component with a size would do. The full-screen one is not drawn here; it is the band in a 1080-tall box.","The spinner is an instance of <code>Loader Big</code> — <strong>the same one the splash screen uses</strong> — a 100 ring 14 thick filled with the <code>TV/Loader/Spin</code> angular gradient: white held for the first 17.6% of the turn, then fading to nothing, with the hard cut at six o'clock. It was drawn here as a bordered circle with one blue side, which is a generic CSS spinner and not this product's. The conic gradient is a fill and the hole is a mask, because a CSS border cannot carry a gradient.","<strong>The rotation is this rebuild's</strong> — <code>Loader Big</code> has a <code>Frame 3</code> variant and no motion at all, so the file carries no duration, easing or direction. 900ms linear, clockwise, and it stops under <code>prefers-reduced-motion</code>.","The sentence ends in three dots typed as full stops rather than an ellipsis."]},me=e=>{const t=document.createElement("template");return t.innerHTML=e.trim(),t.content.firstElementChild},Dt=e=>`font-family:var(--type-${e}-family);font-weight:var(--type-${e}-weight);font-size:var(--type-${e}-size);line-height:var(--type-${e}-line);letter-spacing:var(--type-${e}-tracking);text-transform:var(--type-${e}-case)`,Ki="assets/components/badges.png",Xt=(e,t,o)=>`<span class="c-badge" style="width:${o}px;height:${o}px;background-image:url(${Ki});background-size:${o*3}px ${o*2}px;background-position:-${e*o}px -${t*o}px"></span>`;b("css-c-reward",`
.c-badge { display: block; background-repeat: no-repeat; }

.c-reward { width: 532px; height: 338px; box-sizing: border-box; border-radius: 24px;
  position: relative; overflow: hidden; }
/* The edge is drawn ABOVE the art, as an overlay: in the file it is an inside
   stroke, so it neither moves the content nor gets covered by the glow. */
.c-reward::after { content: ''; position: absolute; inset: 0; border-radius: inherit;
  pointer-events: none; box-shadow: inset 0 0 0 1px var(--tv-border-white-20); }
.c-reward.is-focus::after, .c-reward.is-selected::after {
  box-shadow: inset 0 0 0 6px var(--tv-focus-ring-color); }
/* Every position below is measured from the tile's outer edge, as in the file. */
.c-reward__glow { position: absolute; left: 99px; top: -25px; width: 337.781px; height: 337.781px;
  object-fit: cover; display: block; }
.c-reward__glow--title { object-fit: contain; }
.c-reward__crop { position: absolute; width: 200px; height: 200px; overflow: hidden; }
.c-reward__crop img { position: absolute; max-width: none; display: block; }
.c-reward__crop--frame { left: 168px; top: 44px; }
.c-reward__crop--frame img { width: 223.98%; height: 155.9%; left: -60.44%; top: -16.75%; }
.c-reward__crop--avatar { left: 166px; top: 46px; }
.c-reward__crop--avatar.is-at-slot { left: 168px; top: 44px; }
.c-reward__crop--avatar img { width: 125.37%; height: 125.37%; left: -12.64%; top: -12.44%; }
.c-reward__pending { position: absolute; left: 168px; top: 44px; width: 200px; height: 200px;
  opacity: .3; overflow: hidden; }
.c-reward__pending > img { position: absolute; display: block; }
.c-reward__pending-label { position: absolute; left: 50%; top: 157.98px; transform: translateX(-50%);
  box-sizing: content-box; border: 8.324px solid #1e1e1e; border-radius: 69px; padding: 5.549px 13.874px;
  background: linear-gradient(180deg, #fff, #999); font-family: var(--type-label-m-family);
  font-weight: 500; font-size: 24.97px; line-height: 27.747px; text-transform: uppercase; color: #000;
  white-space: nowrap; }
.c-reward__name { position: absolute; left: 22px; right: 22px; top: 270px; text-align: center;
  ${Dt("heading-m")}; color: var(--tv-base-light); white-space: nowrap; overflow: hidden;
  text-overflow: ellipsis; }
.c-reward__logo { position: absolute; left: 12px; top: 12px; width: 100px; height: 100px;
  object-fit: contain; display: block; }
.c-reward__check { position: absolute; right: 30px; top: 30px; width: 64px; height: 64px; display: block; }
.c-reward__gate { position: absolute; right: 24px; top: 24px; height: 42px; box-sizing: border-box;
  display: inline-flex; align-items: center; gap: 8px; padding: 9px 17px; border-radius: 8px;
  background: var(--tv-button-secondary); border: 1px solid var(--tv-border-white-20);
  backdrop-filter: blur(6px); ${Dt("label-m")}; text-transform: uppercase; color: var(--tv-base-light);
  white-space: nowrap; }
.c-reward__gate img { width: 24px; height: 24px; display: block; }

/* Avatar Tile (10331:31709). Rings are INSIDE the box here, as in the file:
   200 / 300 including the border. Image M rests on 1px Button/Secondary; Focus
   and Selected-and-focus are 8px Primary Solid; plain Selected has NO ring —
   only the badge. Default L is the 20%-white disc with a 9px 20%-white edge and
   the file's own silhouette, flush to its foot. */
.c-avtile { position: relative; display: block; border-radius: 50%; box-sizing: border-box;
  overflow: hidden; }
.c-avtile > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  display: block; }
.c-avtile--m { width: 200px; height: 200px; border: 1px solid var(--tv-button-secondary); }
.c-avtile--l { width: 300px; height: 300px; }
.c-avtile--default { background: var(--tv-border-white-20); }
.c-avtile--default.c-avtile--l { border: 9px solid var(--tv-border-white-20); }
.c-avtile.is-focus { border: 8px solid var(--tv-button-primary-solid); }
.c-avtile.is-selected { border: 0; }
.c-avtile-wrap { position: relative; display: inline-block; }
/* The badge is the file's 54 icon: a blue disc whose white fill sits UNDER it
   and only shows through the tick — no white edge around it. */
.c-avtile-wrap__tick { position: absolute; right: 0; top: 0; width: 54px; height: 54px; display: block; }

.c-track { width: 477px; height: 152px; position: relative; }
.c-track__rail { position: absolute; top: 74px; height: 8px; border-radius: 20px;
  background: var(--tv-progress-track); }
.c-track__fill { position: absolute; top: 74px; left: 0; height: 8px; border-radius: 20px;
  background: var(--tv-game-ui-yellow); }
.c-track__stop { position: absolute; top: 34px; display: flex; flex-direction: column;
  align-items: center; gap: 8px; }
.c-track__stop b { ${Dt("heading-s")}; font-weight: inherit; color: var(--tv-text-primary); }
.c-track__stop i { width: 24px; height: 24px; border-radius: 50%; background: var(--tv-base-light); }
.c-track__stop.is-reached i { background: var(--tv-game-ui-yellow); }
.c-track__medal { position: absolute; top: 0; width: 152px; height: 152px; border-radius: 50%;
  box-sizing: border-box; background: var(--tv-base-neutral);
  border: 4px solid var(--tv-progress-track); display: grid; place-items: center; }
.c-track__medal.is-reached { border-color: var(--tv-game-ui-yellow); }
`);const oe="assets/components/reward/",j=(e,t)=>{const o=e==="title"?"First Step":e==="avatar"&&t!=="selected"?"Stack Stage 1":"Gold Wings",a=e==="frame"?`<img class="c-reward__glow" src="${oe}glow.png" alt="">
        <span class="c-reward__crop c-reward__crop--frame"><img src="${oe}frame.png" alt=""></span>`:e==="title"?`<img class="c-reward__glow c-reward__glow--title" src="${oe}title.png" alt="">`:e==="avatar"?`<span class="c-reward__crop c-reward__crop--avatar${t==="selected"?" is-at-slot":""}">
          <img src="${oe}avatar.png" alt=""></span>`:`<span class="c-reward__pending">
          <img src="${oe}pending-disc.svg" alt="" style="left:9.71px;top:18.74px;width:180.358px;height:180.358px">
          <img src="${oe}pending-q.svg" alt="" style="left:78.65px;top:66.83px;width:42.472px;height:66.278px">
          <span class="c-reward__pending-label">Avatar</span></span>`;return me(`<div class="c-reward${t==="focus"?" is-focus":""}${t==="selected"?" is-selected":""}">
      ${a}
      <span class="c-reward__name">${o}</span>
      <img class="c-reward__logo" src="${oe}${e==="pending"?"logo-pending.png":"logo-ff.png"}" alt="">
      ${t==="selected"?`<img class="c-reward__check" src="${oe}radio-on.svg" alt="" width="64" height="64">`:""}
      ${e==="pending"?`<span class="c-reward__gate"><img src="${oe}sign-in.svg" alt="">Sign in</span>`:""}
    </div>`)},Xi={id:"c-reward",title:"Reward",group:"Identity",figma:"13301:20807",description:"532 × 338 — one earned reward in the Trophy Cabinet: the art, its name, and the show it came from.",tokens:{colour:["TV/Border/White 20","TV/Button/Primary Solid","TV/Base/Light","TV/Button/Secondary"],type:["Heading/M","Label/M"]},wide:!0,variants:[{label:"Frame · Focus",el:()=>j("frame","focus")},{label:"Frame · Selected",el:()=>j("frame","selected")},{label:"Frame · Default",el:()=>j("frame","default")},{label:"Avatar · Default",el:()=>j("avatar","default")},{label:"Avatar · Selected",el:()=>j("avatar","selected")},{label:"Avatar · Focus",el:()=>j("avatar","focus")},{label:"Pending · Focus",el:()=>j("pending","focus")},{label:"Pending · Default",el:()=>j("pending","default")},{label:"Title · Selected",el:()=>j("title","selected")},{label:"Title · Default",el:()=>j("title","default")}],notes:["<strong>The <code>Type</code> axis mixes two different things.</strong> <code>Frame</code>, <code>Avatar</code> and <code>Title</code> are reward <em>categories</em>; <code>Pending</code> is a <em>state</em> a reward of any category can be in. So a pending frame and a pending title cannot both be expressed. <strong>Pending belongs on the State axis.</strong>","<strong>There is no <code>Badge</code> type</strong>, although the hub glossary names four categories — title, badge, avatar, frame. One of the four has no variant here.","<code>Pending</code> dims the art to 30% and adds a tag top right. That matches the product rule: a gated reward a guest has <em>earned</em> is shown and marked, not hidden, because it is the stated incentive to register. It is not a preview of a reward nobody has reached — that one is simply absent.","Each tile carries the <strong>show it was earned on</strong> in a 124 corner badge, which is the Trophy Cabinet rule that a reward keeps its origin visible.","Each type draws its own art: <code>Frame</code> the gold wings over a glow, <code>Avatar</code> the avatar itself, <code>Title</code> the <em>Perfect Player</em> plate, and <code>Pending</code> a dimmed <strong>?</strong> disc with the AVATAR label plus a <strong>Sign in</strong> tag — the register-to-use gate, stated on the tile itself.",'<strong>Selected is the 64 radio, top right — no different ring from Focus.</strong> Both are the 4px <code>Primary Solid</code> edge; the radio alone says "selected".',"<strong>A file defect:</strong> <code>Avatar · Selected</code> is named <em>Gold Wings</em> — the frame's name — where its siblings say <em>Stack Stage 1</em>. Kept as drawn.","All art here is exported from the file (glow, wings, avatar, Perfect Player plate, show logos, ? disc) — nothing redrawn."]},Qi={id:"c-avatar-tile",title:"Avatar Tile",group:"Identity",figma:"10331:31709",description:"The circular tile an avatar is picked from in Account, and shown in on Progression. 200 at size M, 300 at L.",tokens:{colour:["TV/Border/White 20","TV/Button/Secondary","TV/Button/Primary Solid","TV/Base/Light","TV/Base/Dark"],type:[]},variants:[{label:"Image · M · Default",el:()=>me('<span class="c-avtile c-avtile--m"><img src="assets/components/avatar-sample.png" alt=""></span>')},{label:"Image · M · Focus",el:()=>me('<span class="c-avtile c-avtile--m is-focus"><img src="assets/components/avatar-sample.png" alt=""></span>')},{label:"Image · M · Selected",el:()=>me(`<span class="c-avtile-wrap">
        <span class="c-avtile c-avtile--m is-selected"><img src="assets/components/avatar-sample.png" alt=""></span>
        <img class="c-avtile-wrap__tick" src="assets/components/check-image.svg" alt="" width="54" height="54"></span>`)},{label:"Default · L",el:()=>me('<span class="c-avtile c-avtile--l c-avtile--default"><img src="assets/components/silhouette-l.svg" alt="" width="300" height="300"></span>')}],notes:["<strong>Selected is the badge alone</strong> — a 54 blue check on the top-right, with no ring; the 8px <code>Primary Solid</code> ring belongs to focus. <em>Selected and focus</em> carries both. The badge's white is only inside the tick: there is no white edge around it.","<strong>The two sizes carry different rings</strong>: M rests on a 1px <code>Button/Secondary</code> edge, L on a 9px <code>Border/White 20</code> one. Not one ring scaled — two decisions.","Focus was an <strong>8px</strong> ring here, against 6 on cards and 4 on inputs. <strong>Unified to 6 on 2026-10-13</strong> (design) and bound to <code>TV/Focus/Ring Color</code>, so the whole product now focuses at one width.","Size L exists only in <code>Default</code> — there is no focused or selected 300 tile, so the large one cannot be picked. It is the display size.","This is the <strong>picked</strong> avatar — a choice, not a reward. The earned kind is post-MVP and is a set of its own; see the hub glossary, which splits the word deliberately."]},fe=(e,t,o)=>`<span class="c-track__stop${o?" is-reached":""}" style="left:${e}px"><b>${t}</b><i></i></span>`,Ji={id:"c-reward-track-first",title:"Reward Track First",group:"Identity",figma:"11643:15569",description:"477 × 152 — the opening segment of a show's track on the Progression screen: the 0 mark and the first medal.",tokens:{colour:["TV/Progress/Track","TV/Base/Light","TV/Base/Neutral","TV/Text/Primary"],type:["Heading/S"]},wide:!0,variants:[{label:"First",el:()=>me(`<div class="c-track">
        <span class="c-track__rail" style="left:0;width:477px"></span>
        ${fe(-7,"0",!1)}${fe(269,"7",!1)}${fe(353,"14",!1)}${fe(437,"100",!1)}
        <span class="c-track__medal" style="left:63px">${Xt(0,0,129)}</span>
      </div>`)}],notes:["Nothing is reached in this segment: the rail is all <code>Progress/Track</code> and every stop dot is white. The <code>Middle</code> and <code>Last</code> segments carry the yellow fill.","The stop values on this segment are <strong>0, 7, 14 and 100</strong> — the same 7-and-14 pacing PTV-520 gives as <em>an example of one track</em>. Thresholds are configured per show, so these are illustrative, not the product's numbers."]},es={id:"c-reward-track",title:"Reward Track",group:"Identity",figma:"12458:37894",description:"477 × 152 — a segment of one show's reward track on the Progression screen. The yellow fill is how far the player has come.",tokens:{colour:["TV/Progress/Track","TV/Game UI/Yellow","TV/Base/Light","TV/Base/Neutral","TV/Text/Primary"],type:["Heading/S"]},wide:!0,variants:[{label:"Middle",el:()=>me(`<div class="c-track">
        <span class="c-track__rail" style="left:58px;width:407px"></span>
        <span class="c-track__fill" style="width:64px"></span>
        ${fe(46,"7",!0)}${fe(329,"14",!1)}${fe(434,"100",!1)}
        <span class="c-track__medal" style="left:123px">${Xt(0,0,129)}</span>
      </div>`)},{label:"Last",el:()=>me(`<div class="c-track">
        <span class="c-track__rail" style="left:58px;width:419px"></span>
        <span class="c-track__fill" style="width:258px"></span>
        ${fe(244,"98",!0)}
        <span class="c-track__medal is-reached" style="left:325px">${Xt(0,0,129)}</span>
      </div>`)}],notes:['Every medal on a track is the <strong>same locked "?" badge</strong> — the file does not show which reward a milestone holds until it is reached. Both segments draw it, reached or not.',"A stop turns from <code>Base/Light</code> to <code>Game UI/Yellow</code> once it is reached, and on <code>Last</code> the medal's ring turns yellow too. <strong>On <code>Middle</code> it does not</strong>, although its stop is reached — so a reached medal is marked on one segment and not the other. <strong>Worth checking.</strong>","The yellow fill starts at x = 0 on both, running under the preceding segment rather than from this one's rail, which begins at 58. The segments are meant to be butted together.","<code>Last</code> carries one stop where <code>Middle</code> carries three, and its value jumps from 14 to <strong>98</strong>. Example numbers rather than a designed curve."]},Xe=e=>{const t=document.createElement("template");return t.innerHTML=e.trim(),t.content.firstElementChild},gt=e=>`font-family:var(--type-${e}-family);font-weight:var(--type-${e}-weight);font-size:var(--type-${e}-size);line-height:var(--type-${e}-line);letter-spacing:var(--type-${e}-tracking);text-transform:var(--type-${e}-case)`,$t="assets/components/show-thumb.jpg",Qt="Family Feud",Jt="S2 E4 • Human Weed Whacker • 45m";b("css-c-rail",`
.c-card { display: flex; flex-direction: column; gap: 16px; }
.c-card__art { position: relative; border-radius: 12px; overflow: hidden;
  background: var(--tv-base-neutral); box-shadow: 0 0 0 1px var(--tv-border-white-20); }
.c-card__art img { width: 100%; height: 100%; object-fit: cover; display: block; }
.c-card.is-focus .c-card__art { box-shadow: 0 0 0 6px var(--tv-focus-ring-color); }
.c-card.is-prime .c-card__art { box-shadow: 0 0 0 1px var(--tv-game-ui-yellow); }
.c-card.is-skeleton .c-card__art { background: var(--tv-button-secondary); }
.c-card__title { ${gt("heading-s")}; font-size: 24px; line-height: 28px; color: var(--tv-base-light); }
.c-card__sub { font-family: var(--type-body-m-family); font-size: 20px; line-height: 24px;
  color: var(--tv-text-primary); }
.c-card__meta { display: flex; flex-direction: column; gap: 4px; }
/* The counter that replaced the progress bar on Seen (Figma 629:4401, read
   2026-10-14). It is a Tag at a LARGER padding than the others -- 16/8 against
   NEW's 8/4, so 40 tall against 24 -- and it carries no icon.
   It sits in the SAME corner as NEW and PLAYED, bottom right, because the three
   are one slot that changes with the card's state: NEW -> 3/5 -> PLAYED.
   Re-read from 629:4401 on 2026-10-14: the tag is at x 321 y 172, 66 x 40, so
   13 from the right and 13 from the bottom; Seen carries no NEW pill, and the
   ProgressBar slot underneath is still there but hidden. */
.c-pill--count { right: 13px; bottom: 13px; left: auto; top: auto;
  height: 40px; padding: 8px 16px; border-radius: 4px;
  background: var(--tv-base-dark); color: var(--tv-base-light);
  font-family: var(--type-body-m-family); font-weight: var(--type-body-m-weight);
  font-size: var(--type-body-m-size); line-height: var(--type-body-m-line);
  letter-spacing: normal; text-transform: none; }
.c-card__ghost { height: 24px; border-radius: 4px; background: var(--tv-button-secondary); }
/* The placeholder tile is not a missing image: it is the brand mark on the
   neutral ground, which is what the file draws while the still loads. */
.c-card__ph { position: absolute; inset: 0; display: grid; place-items: center;
  background: var(--tv-base-neutral); }

.c-pill { position: absolute; display: inline-flex; align-items: center; gap: 6px;
  height: 24px; box-sizing: border-box; padding: 4px 8px; border-radius: 4px;
  ${gt("label-s")}; white-space: nowrap; }
.c-pill--new   { background: var(--tv-tags-primary); color: var(--tv-base-light);
  right: 13px; bottom: 13px; }
.c-pill--prime { background: var(--tv-game-ui-yellow); color: var(--tv-base-dark);
  left: 13px; top: 13px; }
.c-pill--played { background: var(--tv-base-dark); color: var(--tv-base-light);
  right: 13px; bottom: 13px; }
.c-pill--inter { background: var(--tv-base-dark); color: var(--tv-base-light);
  left: 13px; top: 13px; }
.c-pill > svg { flex: none; }

.c-sli { width: 812px; box-sizing: border-box; display: flex; gap: 20px; padding: 20px;
  border-radius: 12px; }
.c-sli.is-focus { background: var(--tv-button-secondary);
  box-shadow: 0 0 0 6px var(--tv-focus-ring-color); }
.c-sli__art { width: 169px; height: 92px; position: relative; flex: none;
  border-radius: 4px; overflow: hidden; }
.c-sli__art img { width: 100%; height: 100%; object-fit: cover; display: block; }
.c-sli__art .c-pill--prime { left: 8px; top: 8px; }
.c-sli__art .c-pill--new { left: 8px; top: 60px; right: auto; bottom: auto; }
.c-sli__body { display: flex; flex-direction: column; gap: 12px; padding-top: 13px; }
.c-sli__title { ${gt("heading-l")}; color: var(--tv-base-light); }
.c-sli__sub { ${gt("body-l")}; color: var(--tv-text-primary); }

.c-section { display: flex; flex-direction: column; gap: 24px; }
.c-section__head { font-family: var(--type-heading-l-family);
  font-weight: var(--type-heading-l-weight); font-size: 32px; color: var(--tv-base-light); }
.c-section__rail { display: flex; gap: 24px; }
`);const Tt='<span class="c-pill c-pill--new">NEW</span>',lo=`<span class="c-pill c-pill--prime">${x("Crown",16)}PRIME TIME</span>`,ts=`<span class="c-pill c-pill--played">${x("Done",16)}PLAYED</span>`,P=(e,t,o,a="")=>{const i=o==="focus"||o==="prime-focus",s=o==="prime"||o==="prime-focus",r=["c-card",i&&"is-focus",s&&!i&&"is-prime",o==="skeleton"&&"is-skeleton"].filter(Boolean).join(" ");return Xe(`<div class="${r}" style="width:${e}px">
      <div class="c-card__art" style="height:${t}px">
        ${o==="skeleton"?"":o==="placeholder"?'<span class="c-card__ph"><img src="assets/flows/mark.svg" alt="" width="48" height="50"></span>':`<img src="${$t}" alt="">`}
        ${o==="skeleton"?"":s?lo:""}
        ${o==="skeleton"?"":a}
        ${o==="skeleton"?"":o==="seen"?'<span class="c-pill c-pill--count">3/5</span>':o==="played"?ts:Tt}
      </div>
      <div class="c-card__meta">${o==="skeleton"?`<span class="c-card__ghost" style="width:${e}px"></span><span class="c-card__ghost" style="width:100px"></span>`:`<span class="c-card__title">${Qt}</span><span class="c-card__sub">${Jt}</span>`}</div>
    </div>`)},os={id:"c-rail-h",title:"Horizontal Rail Card",group:"Content",figma:"629:4401",description:"400 × 297 — the card every rail on the homepage is built from. Eleven variants across six states and focus.",tokens:{colour:["TV/Base/Neutral","TV/Border/White 20","TV/Button/Primary Solid","TV/Button/Secondary","TV/Game UI/Yellow","TV/Tags/Primary","TV/Base/Light","TV/Base/Dark","TV/Text/Primary"],type:["Label/S"]},wide:!0,variants:[{label:"Default",el:()=>P(400,225,"default")},{label:"Focus",el:()=>P(400,225,"focus")},{label:"Prime Time",el:()=>P(400,225,"prime")},{label:"Prime Time · Focus",el:()=>P(400,225,"prime-focus")},{label:"Seen",el:()=>P(400,225,"seen")},{label:"Played",el:()=>P(400,225,"played")},{label:"Placeholder",el:()=>P(400,225,"placeholder")},{label:"Skeleton",el:()=>P(400,225,"skeleton")}],notes:["<strong><code>Placeholder</code> has the same structure as <code>Default</code></strong> — same frames, same NEW tag, same copy — and differs only in which picture fills the still: the brand mark on the neutral ground instead of the show. It is what a card looks like before its art arrives, and it is <strong>not</strong> the <code>Skeleton</code>, which has no card at all, only grey bars.","<strong>Prime Time is marked twice over</strong>: a yellow crown pill at 13/13 <em>and</em> the card's border changing from <code>Border/White 20</code> to <code>Game UI/Yellow</code>. Focus then replaces that border with the 6px blue ring, so <strong>a focused Prime Time card loses its yellow edge</strong> and only the pill is left.","<strong><code>Seen</code> is a counter now, not a bar</strong> (Figma, 2026-10-14). It used to be an 8px progress bar across the bottom of the still; it is a <code>Base/Dark</code> tag reading <code>3/5</code>. Both focus states carry it.","<strong>NEW, <code>3/5</code> and PLAYED are one slot, bottom right</strong> — 13 from the right, 13 from the bottom — and they replace one another as the card is played: <code>NEW → 3/5 → PLAYED</code>. A card never shows two of them, and <code>Seen</code> carries no NEW pill. <em>Figma 629:4401 agrees, re-read 2026-10-14; an earlier note here said it sat bottom left, which it does not.</em>","The <code>ProgressBar</code> slot is <strong>still in the Figma component and still hidden</strong>. It is the bar the counter replaced, left in place rather than deleted — nothing draws it, here or there.","That counter tag is <strong>40 high where every other pill is 24</strong> — padding 16/8 against NEW's 8/4 — and it carries <strong>no icon</strong>, although the proposal's mock showed one.","<code>Played</code> is unchanged: it swaps the NEW pill for a dark PLAYED one with a tick.","The title and the episode line <strong>bind no text style</strong> — loose 24 and 20. Only the pills bind one (<code>Label/S</code>).","Focus is a <strong>6px</strong> ring where the idle border is 1px, both drawn OUTSIDE, so the card does not move when it takes focus."]},as={id:"c-search-item",title:"Search List Item",group:"Content",figma:"8837:11368",description:"812 × 132 — one result in the search list: a still beside a Heading/L title and a Body/L episode line.",tokens:{colour:["TV/Button/Secondary","TV/Button/Primary Solid","TV/Game UI/Yellow","TV/Tags/Primary","TV/Base/Light","TV/Base/Dark","TV/Text/Primary"],type:["Heading/L","Body/L","Label/S"]},wide:!0,variants:[{label:"New · Default",el:()=>Xe(`<div class="c-sli">
        <div class="c-sli__art"><img src="${$t}" alt="">${Tt}</div>
        <div class="c-sli__body"><span class="c-sli__title">${Qt}</span>
          <span class="c-sli__sub">${Jt}</span></div></div>`)},{label:"New & Prime Time · Focus",el:()=>Xe(`<div class="c-sli is-focus">
        <div class="c-sli__art"><img src="${$t}" alt="">${lo}${Tt}</div>
        <div class="c-sli__body"><span class="c-sli__title">${Qt}</span>
          <span class="c-sli__sub">${Jt}</span></div></div>`)}],notes:["<strong>Unlike the rail cards, this one does bind its text styles</strong> — <code>Heading/L</code> for the title, <code>Body/L</code> for the episode line. Same two pieces of copy, two different typographic treatments across the file.","The row has <strong>no resting surface</strong>: it is transparent until focused, when it takes <code>Button/Secondary</code> and the 6px ring. So an unfocused list is a column of floating text.","Both pills stack on the <strong>left</strong> of the still here, where on a rail card NEW sits bottom-right. The pill placement is per surface, not per tag."]},is={id:"c-search-item-image",title:"Search List Item Image",group:"Content",figma:"13914:21052",description:"169 × 92 — the still with its two pill slots, pulled out as a component of its own.",tokens:{colour:["TV/Game UI/Yellow","TV/Tags/Primary"],type:["Label/S"]},variants:[{label:"Both pills",el:()=>Xe(`<div class="c-sli__art"><img src="${$t}" alt="">${lo}${Tt}</div>`)}],notes:["It exists because the pills needed a frame to be positioned in. There is <strong>no equivalent component for the rail cards' stills</strong>, which position their pills directly — so one surface factored this out and the other did not."]},ss=(e,t)=>{const o=Xe(`<div class="c-section"><span class="c-section__head">${e}</span>
      <div class="c-section__rail"></div></div>`),a=o.querySelector(".c-section__rail");return t.forEach(i=>a.appendChild(i)),o},rs={id:"c-section-trending",title:"Section — Trending",group:"Content",figma:"629:4537",description:"1756 × 365 — a heading over a row of horizontal rail cards. The homepage is a stack of these.",tokens:{colour:["TV/Base/Light"],type:[]},wide:!0,variants:[{label:"Trending Interactive Shows",el:()=>ss("Trending Interactive Shows",[P(400,225,"focus"),P(400,225,"default"),P(400,225,"default"),P(400,225,"default")])}],notes:["The section is <strong>1756 wide inside a 1760 content block</strong>, so the fourth card is cut by the screen edge — which is how a rail says there is more to the right. Nothing here scrolls; that is the client's.","The heading is <strong>32px and binds no text style</strong> — between <code>Heading/L</code> (36) and <code>Heading/S</code> (24), matching neither.","The file fills the rail with <strong>five different shows</strong> — Family Feud, Match Game, Plinko, Classic Concentration, Guess The Word — each with its own still. One card is repeated here; only the artwork differs."]},_=e=>{const t=document.createElement("template");return t.innerHTML=e.trim(),t.content.firstElementChild},H=e=>`font-family:var(--type-${e}-family);font-weight:var(--type-${e}-weight);font-size:var(--type-${e}-size);line-height:var(--type-${e}-line);letter-spacing:var(--type-${e}-tracking);text-transform:var(--type-${e}-case)`;b("css-c-game",`
/* A game panel: the dark-80 slab every readout sits on */
.c-panel { box-sizing: border-box; border-radius: 24px; background: var(--tv-transparent-dark-80);
  border: 1px solid var(--tv-border-white-20); display: flex; align-items: center; }

/* Box Content — the readout inside a Score or Status box */
.c-boxc { display: flex; align-items: center; gap: 16px; height: 38px; }
.c-boxc__n { ${H("game-m")}; color: var(--tv-game-ui-yellow); white-space: nowrap; }
.c-boxc__word { ${H("game-s")}; color: var(--tv-base-light); white-space: nowrap; }
/* The question counter binds no text style in Figma: raw 32 and 40, Roboto
   Condensed like the rest of the game layer. Reproduced rather than snapped to
   Game/S and Game/M, which are 32/38 and 40/38 — close but not the same. */
.c-boxc__q { font-family: var(--type-game-s-family); font-weight: var(--type-game-s-weight);
  font-size: 32px; line-height: 38px; text-transform: uppercase; color: var(--tv-base-light);
  white-space: nowrap; }
.c-boxc__of { font-family: var(--type-game-m-family); font-weight: var(--type-game-m-weight);
  font-size: 40px; line-height: 38px; text-transform: uppercase;
  color: var(--tv-game-ui-yellow); white-space: nowrap; }
.c-boxc__bar { height: 16px; border-radius: 12px; background: var(--tv-button-secondary);
  overflow: hidden; display: block; flex: none; }
/* display:block matters: the fill is a span, and height:100% does nothing on an
   inline box — which is why the bar looked empty. */
.c-boxc__fill { display: block; height: 100%; background: var(--gradient-tv-button-primary); }
.c-boxc__fill--out { background: var(--gradient-tv-status-failure); }

/* Score Box */
.c-scorebox { width: 364px; height: 86px; padding: 24px 40px; justify-content: center; }
.c-strikes { display: flex; gap: 24px; }

/* Status Box */
.c-statusbox { width: 1704px; height: 122px; padding: 0 40px; gap: 32px;
  justify-content: space-between; }
.c-statusbox__side { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
.c-statusbox__banner { flex: 1; height: 122px; display: grid; place-items: center;
  ${H("game-l")}; color: var(--tv-base-light); }
.c-statusbox__banner--complete { background: var(--gradient-tv-status-round-complete); }
.c-statusbox__banner--win  { background: var(--gradient-tv-status-you-win); }
.c-statusbox__banner--lose { background: var(--gradient-tv-status-you-lose); }

/* Keys — the remote keys drawn on screen. The skirt that makes them read as
   keycaps is an INNER shadow with no blur, offset 0 -6: a hard 6px band of
   #00000040 along the bottom inside edge. */
.c-key { width: 64px; height: 64px; flex: none; border-radius: 8px;
  background: var(--tv-base-light); box-shadow: inset 0 -6px 0 #00000040;
  display: grid; place-items: center; ${H("heading-l")}; color: var(--tv-base-black); }
.c-key__tri { width: 25px; height: 30px; display: block; color: var(--tv-base-dark);
  margin-bottom: 4px; }

/* Higher / Lower Button */
.c-hl { width: 338px; height: 100px; box-sizing: border-box; border-radius: 12px;
  display: flex; align-items: center; gap: 24px; padding: 20px 32px;
  background: var(--tv-base-neutral); border: 1px solid var(--tv-border-white-20);
  ${H("game-m")}; color: var(--tv-base-light); }
.c-hl--focus     { background: var(--gradient-tv-button-primary); }
.c-hl--correct   { background: var(--gradient-tv-status-success); }
.c-hl--incorrect { background: var(--gradient-tv-status-failure); }

/* Card Box */
.c-cardbox { width: 310px; height: 398px; padding: 40px; justify-content: center; }
.c-cardbox__card { width: 230px; height: 318px; border-radius: 12px; background: var(--tv-base-light);
  border: 1px solid #000; position: relative; }
.c-cardbox__pip { position: absolute; left: 14px; top: 10px; ${H("display-m")};
  color: #000; line-height: 1; }
.c-cardbox__pip--b { left: auto; top: auto; right: 14px; bottom: 10px; transform: rotate(180deg); }

/* Answer Option */
.c-ao { width: 552px; height: 76px; box-sizing: border-box; border-radius: 12px;
  display: flex; align-items: center; gap: 24px; padding: 0 32px;
  border: 2px solid var(--tv-border-white-20); background: var(--tv-button-secondary);
  ${H("game-s")}; color: var(--tv-base-light); }
.c-ao--green { background: var(--gradient-tv-status-success); border-color: var(--tv-game-ui-green-1); }
.c-ao--blue  { background: var(--gradient-tv-status-wait);    border-color: var(--tv-button-primary-solid); }
.c-ao--red   { background: var(--gradient-tv-status-failure); border-color: var(--tv-game-ui-red-2); }
.c-ao__n, .c-ao__score { ${H("game-m")}; }
.c-ao__rule { width: 2px; align-self: stretch; background: var(--tv-button-secondary); }
.c-ao__text { flex: 1; }

/* Video Player Buttons — the glyph is a filled white disc with the shape
   knocked out of it, not a bare triangle on the ground. */
.c-vpb { display: flex; align-items: center; gap: 16px; padding: 4px 0; }
.c-vpb__glyph { width: 88px; height: 88px; flex: none; border-radius: 50%;
  background: var(--tv-base-light); display: grid; place-items: center; }
.c-vpb__play { width: 0; height: 0; margin-left: 6px;
  border-left: 30px solid var(--tv-base-dark);
  border-top: 18px solid transparent; border-bottom: 18px solid transparent; }
.c-vpb__pause { display: flex; gap: 9px; }
.c-vpb__pause span { width: 11px; height: 36px; border-radius: 3px;
  background: var(--tv-base-dark); }
`);const So=(e,t,o=!1)=>`<span class="c-boxc__bar" style="width:${e}px"><span class="c-boxc__fill${o?" c-boxc__fill--out":""}" style="width:${t}px"></span></span>`,ns={id:"c-box-content",title:"Box Content",group:"Game",figma:"3608:15061",description:"The readout inside a Score or Status box: a timer with its bar, or the question counter. 38 high.",tokens:{colour:["TV/Base/Light","TV/Button/Primary","TV/Button/Secondary","TV/Game UI/Yellow","TV/Status/Failure"],type:["Game/M"]},notes:["The <strong>Question Text</strong> readout binds no text style in Figma — it is a loose 32 and 40. Everything else in this component is on Game/M."],variants:[{label:"Question Timer",el:()=>_(`<div class="c-boxc"><span class="c-boxc__n">32s</span>${So(205,155)}</div>`)},{label:"Time's Up",el:()=>_(`<div class="c-boxc"><span class="c-boxc__n">3s</span>${So(225,40,!0)}</div>`)},{label:"Question Text",el:()=>_('<div class="c-boxc"><span class="c-boxc__q">Question</span><span class="c-boxc__of">1/3</span></div>')}]},ls={id:"c-score-box",title:"Score Box",group:"Game",figma:"2565:2735",description:"364 × 86 on the dark-80 slab, radius 24. Five readouts: the score, the timer with its bar, the time-up states, and three strikes.",tokens:{colour:["TV/Base/Light","TV/Border/White 20","TV/Button/Primary","TV/Button/Secondary","TV/Game UI/Red 1","TV/Game UI/Yellow","TV/Status/Failure","TV/Transparent/Dark 80"],type:["Game/M","Game/S"]},variants:[{label:"Score",el:()=>_(`<div class="c-panel c-scorebox"><div class="c-boxc">
        <span class="c-boxc__word">Score</span><span class="c-boxc__n">72</span></div></div>`)},{label:"Time's Up",el:()=>_(`<div class="c-panel c-scorebox"><div class="c-boxc">
        <span class="c-boxc__word">Time’s up!</span></div></div>`)},{label:"Error Indicator",el:()=>_(`<div class="c-panel c-scorebox"><div class="c-strikes">
        <span class="c-strike"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span><span class="c-strike"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span>
        <span class="c-strike c-strike--spent"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span></div></div>`)},{label:"Timer — 155 of 205",el:()=>_(`<div class="c-panel c-scorebox"><div class="c-boxc"><span class="c-boxc__n">32s</span>
        <span class="c-boxc__bar" style="width:205px"><span class="c-boxc__fill" style="width:155px"></span></span></div></div>`)},{label:"Timer · Time's Up — 40 of 225",el:()=>_(`<div class="c-panel c-scorebox"><div class="c-boxc"><span class="c-boxc__n">3s</span>
        <span class="c-boxc__bar" style="width:225px"><span class="c-boxc__fill c-boxc__fill--out" style="width:40px"></span></span></div></div>`)}],notes:["The bar is a fixed <strong>pixel</strong> width in the file, and it differs between the two timer states — 205 with 155 filled, then 225 with 40. The track lengthens as the number shortens, so the readout keeps its overall width.","The two timers use different fills: <code>TV/Button/Primary</code> while running, <code>TV/Status/Failure</code> when it is nearly out."]},cs=[{k:"complete",text:"Round Complete!",left:["Part 1 Score","110/200"],right:["continue to part 2 for more points"]},{k:"win",text:"You Win!",left:["Part 2 Score","110/200"],right:["Total","200/200"]},{k:"lose",text:"You Lose!",left:["Part 2 Score","110/200"],right:["Total","180/200"]}],ds=e=>/^\d+\s*\/\s*\d+$/.test(e.trim()),Fo=e=>e.map(t=>ds(t)?`<span class="c-boxc__n">${t}</span>`:`<span class="c-boxc__word">${t}</span>`).join(""),ps={id:"c-status-box",title:"Status Box",group:"Game",figma:"2565:2732",description:"1704 × 122 across the foot of the screen. The part score on the left, the outcome on a 707-wide gradient band in Game/L, and what it is worth on the right.",wide:!0,tokens:{colour:["TV/Base/Light","TV/Border/White 20","TV/Game UI/Yellow","TV/Status/Round Complete","TV/Status/You Lose!","TV/Status/You Win!","TV/Transparent/Dark 80"],type:["Game/L","Game/M","Game/S"]},variants:cs.map(e=>({label:e.text,el:()=>_(`<div class="c-panel c-statusbox">
      <span class="c-statusbox__side">${Fo(e.left)}</span>
      <span class="c-statusbox__banner c-statusbox__banner--${e.k}">${e.text}</span>
      <span class="c-statusbox__side">${Fo(e.right)}</span></div>`)})),notes:["The sides are not the same shape. <strong>Round Complete</strong> carries a sentence — <em>continue to part 2 for more points</em> — where the other two carry <em>Total</em> and a number.","The three bands are glows that fade to nothing at both ends, and they run <strong>left to right</strong>. Until the token file learned to carry a gradient's direction they were drawn top to bottom here, and the two that resolved to nothing came out black."]},hs={id:"c-keys",title:"Keys",group:"Game",figma:"3750:15653",description:"The remote keys drawn on screen: 64 × 64, radius 8, white, with a 6px shadow skirt along the bottom that makes them read as keycaps. Up, Down and Ok.",tokens:{colour:["TV/Base/Black","TV/Base/Dark","TV/Base/Light"],type:["Heading/L"]},notes:["The skirt is an <strong>inner shadow with zero blur</strong> — <code>inset 0 -6px 0 #00000040</code> — not a second rectangle and not a border. It was a flat white square here until 2026-10-13.","The arrows are filled triangles with rounded corners, drawn with a round line join rather than as a CSS border triangle, which cannot round."],variants:[{label:"Up",el:()=>_('<span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 4 L22 26 L3 26 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>')},{label:"Down",el:()=>_('<span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 26 L3 4 L22 4 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>')},{label:"Ok",el:()=>_('<span class="c-key">Ok</span>')}]},us={id:"c-higher-lower-button",title:"Higher/Lower Button",group:"Game",figma:"3749:15334",description:"338 × 100 with a Key on the left and the label in Game/M. The outcome states swap the fill for a Status gradient.",tokens:{colour:["TV/Base/Dark","TV/Base/Light","TV/Base/Neutral","TV/Border/White 20","TV/Button/Primary","TV/Status/Failure","TV/Status/Success"],type:["Game/M"]},variants:[{label:"Higher · Default",el:()=>_('<div class="c-hl"><span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 4 L22 26 L3 26 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>Higher</div>')},{label:"Higher · Focus",el:()=>_('<div class="c-hl c-hl--focus"><span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 4 L22 26 L3 26 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>Higher</div>')},{label:"Lower · Default",el:()=>_('<div class="c-hl"><span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 26 L3 4 L22 4 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>Lower</div>')},{label:"Correct",el:()=>_('<div class="c-hl c-hl--correct"><span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 4 L22 26 L3 26 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>Correct!</div>')},{label:"Incorrect",el:()=>_('<div class="c-hl c-hl--incorrect"><span class="c-key"><svg class="c-key__tri" viewBox="0 0 25 30" fill="none" aria-hidden="true"><path d="M12.5 26 L3 4 L22 4 Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg></span>Incorrect!</div>')}]},gs={id:"c-card-box",title:"Card Box",group:"Game",figma:"3752:30723",description:"310 × 398 slab holding a 230 × 318 playing card. Card Sharks.",tokens:{colour:["TV/Base/Light","TV/Border/White 20","TV/Transparent/Dark 80"],type:[]},variants:[{label:"Card",el:()=>_(`<div class="c-panel c-cardbox"><div class="c-cardbox__card">
        <span class="c-cardbox__pip">9♦</span><span class="c-cardbox__pip c-cardbox__pip--b">9♦</span>
      </div></div>`)}]},ms={id:"c-answer-option",title:"Answer Option",group:"Game",figma:"2565:2728",description:"552 × 76, radius 12, 2px edge. Rank, answer and score; the type decides the fill and the edge.",tokens:{colour:["TV/Base/Light","TV/Border/White 20","TV/Button/Primary Solid","TV/Button/Secondary","TV/Game UI/Green 1","TV/Game UI/Red 2","TV/Status/Failure","TV/Status/Success","TV/Status/Wait"],type:["Game/M","Game/S"]},variants:[{label:"Green · scored",el:()=>_('<div class="c-ao c-ao--green"><span class="c-ao__n">1</span><span class="c-ao__rule"></span><span class="c-ao__text">Sleeping</span><span class="c-ao__score">24</span></div>')},{label:"Blue · waiting",el:()=>_('<div class="c-ao c-ao--blue"><span class="c-ao__n">5</span><span class="c-ao__rule"></span><span class="c-ao__text">Sleeping</span><span class="c-ao__score">33</span></div>')},{label:"Red · no score",el:()=>_('<div class="c-ao c-ao--red"><span class="c-ao__n">5</span><span class="c-ao__rule"></span><span class="c-ao__text">Sleeping</span><span class="c-ao__score">0</span></div>')},{label:"White · unrevealed",el:()=>_('<div class="c-ao"><span class="c-ao__text">foams</span></div>')}]},fs={id:"c-video-player-buttons",title:"Video Player Buttons",group:"Content",figma:"5623:18110",description:"The question transport: two 240 secondary buttons either side of an 88 white disc carrying a dark play or pause glyph.",tokens:{colour:["TV/Base/Light","TV/Border/White 20","TV/Button/Secondary"],type:["Body/L"]},notes:["The buttons say <strong>Previous Question</strong> and <strong>Next Question</strong> — this moves through questions, not through video. They were labelled Rewind and Forward here, which was a guess from the component's name.","In Figma the glyph is a single vector for Play and a boolean Subtract for Pause; both are a white disc with the shape cut out of it."],variants:[{label:"Play",el:()=>_(`<div class="c-vpb"><span class="c-btn c-btn--secondary">Previous Question</span>
        <span class="c-vpb__glyph"><span class="c-vpb__play"></span></span>
        <span class="c-btn c-btn--secondary">Next Question</span></div>`)},{label:"Pause",el:()=>_(`<div class="c-vpb"><span class="c-btn c-btn--secondary">Previous Question</span>
        <span class="c-vpb__glyph"><span class="c-vpb__pause"><span></span><span></span></span></span>
        <span class="c-btn c-btn--secondary">Next Question</span></div>`)}]};b("css-c-game2",`
/* Re-read from 14010:45824 on 2026-10-14. The component is the LIGHT cell --
   the TV/Background/Stacked gradient style with the label in Base/Dark Rubik,
   not Primary Solid blue with white Roboto Condensed, which is what stood here
   before. The gradient runs DARK at the top to light at the bottom (0deg, not
   180): measured off the Figma render, #B9D2EF at the top edge against #E1ECFB
   at the bottom. The 12px stroke is INSIDE, so border-box is the right box. */
.c-stacked { width: 496px; height: 116px; box-sizing: border-box; border-radius: 48px;
  background: var(--gradient-tv-background-stacked);
  display: grid; place-items: center;
  font-family: var(--type-heading-s-family); font-weight: 600;
  font-size: 28px; line-height: 36px; color: var(--tv-base-dark); text-transform: uppercase; }
.c-stacked--default { border: 12px solid var(--tv-game-ui-red-1); }
.c-stacked--success { border: 12px solid var(--tv-text-gain); }
/* Su's column takes the same ring over the show video, with no fill of its own. */
.c-stacked--novideo { background: none; color: var(--tv-base-light);
  text-shadow: 0 2px 6px rgba(0,0,0,.6); }

/* Stacked - Option, 14283:40589. The answer chip on the play screen. Radius is
   32 in every state and it is NOT a pill: at 68 tall a pill would be 34, at 76
   it would be 38. Strokes are OUTSIDE, so they are box-shadows -- a border
   would eat the box. */
.c-sopt { width: 340px; height: 68px; box-sizing: border-box; border-radius: 32px;
  display: grid; place-items: center;
  background: var(--gradient-tv-background-stacked);
  box-shadow: 0 0 0 4px var(--tv-base-light), 0 0 40px rgba(0,0,0,.6);
  font-family: var(--type-heading-s-family); font-weight: 600; font-size: 24px;
  line-height: 36px; text-transform: uppercase; color: var(--tv-base-dark); }
.c-sopt--empty { background: none; box-shadow: none;
  border: 4px dashed var(--tv-border-white-20); }
.c-sopt--focus { width: 360px; height: 76px;
  box-shadow: 0 0 0 8px var(--tv-game-ui-yellow), 0 0 18px rgba(255,246,0,.6); }
/* The arrows sit beside the chip, not on it: 37 x 72 at 24 apiece, which leaves
   24 of air between them. */
.c-sopt-sel { display: flex; align-items: center; gap: 24px; }
.c-sopt-sel__arrows { width: 37px; height: 72px; display: flex; flex-direction: column;
  justify-content: space-between; }
.c-sopt-sel__arrows i { width: 0; height: 0; border-left: 18.5px solid transparent;
  border-right: 18.5px solid transparent; }
.c-sopt-sel__arrows i.up { border-bottom: 24px solid var(--tv-transparent-white-25); }
.c-sopt-sel__arrows i.down { border-top: 24px solid var(--tv-game-ui-yellow); }

.c-note { box-sizing: border-box; border-radius: 24px; padding: 40px;
  background: var(--tv-transparent-dark-80); border: 1px solid var(--tv-border-white-20);
  display: flex; flex-direction: column; gap: 8px; color: var(--tv-base-light); }
.c-note__line { display: flex; align-items: center; gap: 16px; white-space: nowrap;
  font-family: var(--type-heading-l-family); font-weight: var(--type-heading-l-weight);
  font-size: var(--type-heading-l-size); line-height: var(--type-heading-l-line); }
.c-dkey { width: 64px; height: 64px; border-radius: 8px; background: var(--tv-base-light);
  color: var(--tv-base-dark); display: grid; place-items: center; flex: none; }
.c-dkey--up > svg { transform: rotate(-90deg); }
.c-dkey--down > svg { transform: rotate(90deg); }

/* NOT .c-hl -- that name already belongs to the Higher/Lower BUTTON above. */
.c-hlpanel { width: 418px; box-sizing: border-box; border-radius: 24px; padding: 40px;
  background: var(--tv-transparent-dark-80); border: 1px solid var(--tv-border-white-20);
  display: flex; flex-direction: column; gap: 16px; }
.c-hlpanel__btn { text-transform: uppercase; height: 100px; box-sizing: border-box; border-radius: 12px;
  background: var(--tv-base-neutral); border: 1px solid var(--tv-border-white-20);
  display: flex; align-items: center; gap: 24px; padding: 20px 32px;
  font-family: var(--type-game-m-family); font-weight: var(--type-game-m-weight);
  font-size: var(--type-game-m-size); color: var(--tv-base-light); }

.c-scorerow { width: 1117px; box-sizing: border-box; height: 104px; display: flex;
  align-items: center; gap: 24px; padding: 20px 10px;
  border-bottom: 1px solid var(--tv-border-white-20); color: var(--tv-base-light); }
.c-scorerow__rank { width: 68px; ${H("heading-s")}; }
.c-scorerow__av { width: 64px; height: 64px; border-radius: 50%; flex: none; object-fit: cover;
  box-shadow: 0 0 0 1px var(--tv-border-white-20); }
.c-scorerow__name { width: 200px; ${H("heading-s")}; }
.c-scorerow__n { width: 120px; ${H("body-l")}; }
.c-scorerow__streak { display: flex; align-items: center; gap: 10px; ${H("body-l")}; }

.c-notif { width: 1728px; box-sizing: border-box; height: 120px; border-radius: 24px;
  background: var(--tv-transparent-dark-80); border: 1px solid var(--tv-border-white-20);
  display: flex; align-items: center; gap: 32px; padding: 24px 40px;
  color: var(--tv-base-light); }
.c-notif__text { flex: 1; ${H("heading-l")}; }
`);const bs={id:"c-stacked-answer",title:"Stacked — Answer",group:"Game",figma:"14010:45824",description:"496 × 116 — an answer block on the Stacked results board, on the light stack gradient with a 12px edge that carries the verdict.",tokens:{colour:["TV/Background/Stacked","TV/Game UI/Red 1","TV/Text/Gain","TV/Base/Dark","TV/Base/Light"],type:[]},wide:!0,variants:[{label:"Default",el:()=>_('<div class="c-stacked c-stacked--default">violin/fiddle</div>')},{label:"Success",el:()=>_('<div class="c-stacked c-stacked--success">violin/fiddle</div>')},{label:"Success · over video",el:()=>_('<div class="c-stacked c-stacked--success c-stacked--novideo">violin/fiddle</div>')}],notes:["<strong>The fill is the <code>TV/Background/Stacked</code> gradient style</strong> — <code>#ACCAEB</code> at the top to <code>#EDF3FE</code> at the bottom — and the label is <strong>Rubik SemiBold 28/36 in <code>Base/Dark</code></strong>. It was built here as Primary Solid blue with white Roboto Condensed; re-read on 2026-10-14, that was wrong. Both strokes bind styles too, so every colour on this component is a token.","<strong>Su's column uses the same component with its fill removed</strong>, so the show video reads through and only the ring is ours. On <code>Stacked - Final</code> six instances carry the gradient (YOUR STACK, 501 wide) and six carry no fill at all (SU'S STACK, 496). The third variant above is that second case.","<strong>The variant is decorative — every instance overrides the stroke by hand.</strong> On <code>Stacked - Final</code> four <code>Type=Sucess</code> instances carry the red stroke and one <code>Type=Defau;t</code> carries green. Nothing reads the variant, so the set does not control what it looks like. <strong>Needs fixing before a client builds from it.</strong>","<strong>Both variant names are misspelled in the file</strong>: <code>Type=Defau;t</code> — with a semicolon — and <code>Type=Sucess</code>. The same <em>Sucess</em> slip was fixed in the paint styles on 2026-10-12 and survives here. <strong>Worth fixing</strong>, and the line above is the reason it is safe to: nothing depends on the names.",'<strong>The "default" is red.</strong> A 12px <code>Game UI/Red 1</code> edge is a wrong answer, not a resting state — so this set has two verdicts and no neutral. Either the name is wrong or a third variant is missing. <strong>Needs a decision.</strong>',"The label binds <strong>no text style</strong>: a loose 28/36. Neither the Rubik scale nor the Game scale has a 28. It renders in capitals through <code>textCase: UPPER</code> on the node.","<strong>Radius 48 is this component's alone.</strong> The library radius scale is 4, 8, 12, 24 and Full; 48 appears on nothing else in the file, and at 116 tall it is not Full either (that would be 58). Left as a number."]},vs={id:"c-stacked-option",title:"Stacked — Option",group:"Game",figma:"14283:40589",description:"340 × 68 — the answer chip on the Stacked play screen, and the empty slot it drops into.",tokens:{colour:["TV/Background/Stacked","TV/Base/Light","TV/Border/White 20","TV/Game UI/Yellow","TV/Base/Dark"],type:[]},wide:!0,variants:[{label:"Default",el:()=>_('<div class="c-sopt">Piano/keyboard</div>')},{label:"Empty",el:()=>_('<div class="c-sopt c-sopt--empty"></div>')},{label:"Focus",el:()=>_('<div class="c-sopt c-sopt--focus">bagpipes</div>')},{label:"Focus while selecting",el:()=>_(`<div class="c-sopt-sel">
        <div class="c-sopt c-sopt--focus">bagpipes</div>
        <span class="c-sopt-sel__arrows"><i class="up"></i><i class="down"></i></span>
      </div>`)}],notes:["<strong>The radius is 32 in every state, and it is not a pill.</strong> At 68 tall a pill would be 34 and at 76 it would be 38, so the chip is a hair squarer than fully round — close enough to read as a pill and different enough to measure. It is the one radius in the file that is neither on the scale nor obviously its own number.","<strong><code>Focus</code> grows the chip</strong>, from 340 × 68 to 360 × 76, and doubles the stroke from 4 to 8. Both strokes are <code>OUTSIDE</code>, so the chip does not shrink its own content when it takes focus — but the 20 × 8 growth does move everything around it.","<strong><code>Empty</code> is a slot, not a disabled chip</strong>: no fill, and the white-20 stroke is <strong>dashed 8/8</strong>. It is the only dashed stroke in the component library.","Two glows, both <code>DROP_SHADOW</code> at offset 0: black at radius 40 on the resting chip, and <strong><code>#FFF600</code> at 60% and radius 18 on focus</strong> — a yellow that is not <code>Game UI/Yellow</code> (<code>#CAA512</code>, which the stroke uses) and binds no token.","<strong><code>Focus while selecting</code> is the focused chip plus the arrows</strong>, 37 × 72 at its right with 24 of gap: up at <code>White 20</code>, down at <code>Game UI/Yellow</code>. They say which way the remote will move the block, and they are the only thing that distinguishes the two focus states.","The label is <strong>Rubik SemiBold 24</strong> in <code>Base/Dark</code>, upper case through <code>textCase</code> on the node — the file stores it as <em>Piano/keyboard</em>. It binds no text style; the Rubik scale has no SemiBold 24."]},ys={id:"c-hl-note",title:"Higher/Lower Note",group:"Game",figma:"3750:15695",description:"872 × 190 — the instruction that teaches the remote, with the two D-pad keys drawn inline. Shown once per game.",tokens:{colour:["TV/Transparent/Dark 80","TV/Border/White 20","TV/Base/Light","TV/Base/Dark"],type:["Heading/L"]},wide:!0,variants:[{label:"Default",el:()=>_(`<div class="c-note" style="width:872px">
        <div class="c-note__line"><span>Use the</span>
          <span class="c-dkey c-dkey--up">${x("Play",44)}</span><span>(Up) and</span>
          <span class="c-dkey c-dkey--down">${x("Play",44)}</span><span>(Down) buttons on</span></div>
        <div class="c-note__line"><span>your TV remote to make your selections.</span></div>
      </div>`)}],notes:["<strong>The arrow keys are the <code>Play</code> icon rotated</strong> — there is no up or down glyph in the set, so a play triangle is turned 90°. It reads correctly and it means the icon set is missing two members.","The sentence is <strong>built from five separate text nodes</strong> with the keys between them, so it cannot wrap or be translated as one string. A client has to reassemble it.","This is the voice-first product's remote-only instruction, and <code>Heading/L</code> at 36 is well above the 24 floor — correctly, since it is meant to be read from the sofa."]},ws={id:"c-higher-lower",title:"Higher/Lower",group:"Game",figma:"3752:15760",description:"418 × 296 — the two Card Sharks choices stacked in a dark panel. Card Sharks only, on all eleven of its frames.",tokens:{colour:["TV/Transparent/Dark 80","TV/Border/White 20","TV/Base/Neutral","TV/Base/Light","TV/Base/Dark"],type:["Game/M"]},variants:[{label:"Default",el:()=>_(`<div class="c-hlpanel">
        <div class="c-hlpanel__btn"><span class="c-dkey c-dkey--up">${x("Play",44)}</span><span>Higher</span></div>
        <div class="c-hlpanel__btn"><span class="c-dkey c-dkey--down">${x("Play",44)}</span><span>lower</span></div>
      </div>`)}],notes:["<strong>The two strings disagree about case</strong> — <em>Higher</em> and <em>lower</em> — and it does not show, because both nodes carry <code>textCase: UPPER</code> and render HIGHER and LOWER. A latent defect: anything reading the characters rather than the render gets one of them wrong.","The set has <strong>one variant</strong>, <code>Type=Default</code>, so there is no focused state for the pair although the buttons inside have one. Focus on this panel is undefined.","This is the game layer, so it is Roboto Condensed rather than Rubik — the deliberate second family, not drift."]},xs={id:"c-score-row",title:"Score Table Row",group:"Game",figma:"6933:11901",description:"1117 × 104 — one player on a leaderboard: rank, avatar, name, tag, three numbers and a streak.",tokens:{colour:["TV/Border/White 20","TV/Base/Light","TV/Tags/Primary"],type:["Heading/S","Body/L","Label/S"]},wide:!0,variants:[{label:"Rank 1",el:()=>_(`<div class="c-scorerow">
        <span class="c-scorerow__rank">#1</span>
        <img class="c-scorerow__av" src="assets/components/avatar-sample.png" alt="">
        <span class="c-scorerow__name">QuizMaster99</span>
        <span class="c-pill c-pill--new" style="position:static">PRO</span>
        <span class="c-scorerow__n">25,521</span>
        <span class="c-scorerow__n">900</span>
        <span class="c-scorerow__n">28</span>
        <span class="c-scorerow__streak">${x("Fire",32)}31</span>
      </div>`)}],notes:["<strong>None of the four numbers is labelled.</strong> 25,521 / 900 / 28 / 31 sit in unnamed frames with no header anywhere in the component, so what they count is not in the file. The flame suggests the last is a streak. <strong>Needs the column headings.</strong>","Leaderboards are <strong>post-MVP</strong> per the product brief — competitive trivia is phase 2. This component exists ahead of the feature.","The row's only surface is a 1px <code>Border/White 20</code>; drawn here as a bottom rule, which is what a table row needs, though the file strokes the whole frame."]},ks={id:"c-notification",title:"Notification Message",group:"Feedback",figma:"2565:2660",description:"1728 × 120 — the prompt that asks whether the viewer wants to play this question. It appears on exactly one frame in the file.",tokens:{colour:["TV/Transparent/Dark 80","TV/Border/White 20","TV/Base/Light","TV/Button/Primary"],type:["Heading/L","Body/L"]},wide:!0,variants:[{label:"Default",el:()=>_(`<div class="c-notif">
        <span class="c-notif__text">Press OK if you want to answer the question</span>
        <span class="c-btn c-btn--primary is-focus" style="width:200px">OK</span>
      </div>`)}],notes:["<strong>Its button is drawn focused and there is no unfocused variant</strong>, so the prompt only exists in the state where the remote is already on it.","The button is 200 × 72 with <code>64px</code> side padding for a two-character label — the padding is from a wider button and was not reset. The same leftover the <code>Button</code> component has.","1728 wide is the content block (1760) less its 32 — so this sits inside the content, not across the screen."]},_s=[ja,ai,ci,zi,ni,Xa,ei,ii,vi,di,Ti,Qa,Ai,ti,gi,Qi,mi,fi,ki,bi,Xi,Ji,es,Pi,oi,Ya,hi,Mi,_i,fs,os,as,is,rs,Bi,Ei,Ri,yi,li,ks,Hi,Yi,ns,ls,ps,hs,us,ws,ys,gs,ms,Ui,Oi,Gi,ji,Wi,vs,bs,xi,wi,xs],eo=_s.map(e=>({id:e.id,title:e.title,kind:"component",section:"Components",badge:{text:e.group,tone:"ready"},open:t=>{t.innerHTML="";const o=qa(e);return t.appendChild(o),()=>{var a;return(a=o.__destroy)==null?void 0:a.call(o)}}})),Lo=262,Vo=96,pe=196,D=50,mt=28;b("css-flowmap",`
.flowmap { width: 100%; overflow-x: auto; }
.flowmap svg { display: block; width: 100%; height: auto; font-family: var(--font); }
.flowmap__edge { fill: none; stroke: var(--text-muted); stroke-width: 1.5; }
.flowmap__edge.is-dashed { stroke-dasharray: 5 5; opacity: .7; }
.flowmap__edge-label rect { fill: var(--bg); }
.flowmap__edge-label text { fill: var(--text-dim); font-size: 12px; }
.flowmap__node rect { fill: var(--bg-elevated); stroke: var(--border-strong); stroke-width: 1.5; rx: 10; }
.flowmap__node.is-state rect { stroke-dasharray: 5 4; fill: transparent; }
.flowmap__node text { fill: var(--text); font-size: 13px; font-weight: 600; }
.flowmap__node text.flowmap__sub { fill: var(--text-muted); font-size: 11px; font-weight: 400; }
.flowmap__node.is-here rect { stroke: var(--accent); stroke-width: 2.5; fill: var(--accent-soft); }
.flowmap--pick .flowmap__node { cursor: pointer; }
.flowmap--pick .flowmap__node:hover rect { stroke: var(--accent); }
.flowmap__node:focus-visible { outline: none; }
.flowmap__node:focus-visible rect { stroke: var(--accent); stroke-width: 2.5; }
`);const Gt=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;");function No(e,t={}){const o=new Map(e.nodes.map(u=>[u.id,u])),a=Math.max(...e.nodes.map(u=>u.col))+1,i=Math.max(...e.nodes.map(u=>u.row))+1,s=mt*2+(a-1)*Lo+pe,r=new Map,l=e.edges.map(u=>{const h=e.nodes.find(N=>N.id===u.from),y=e.nodes.find(N=>N.id===u.to);if(!h||!y||y.col>=h.col)return 0;const S=r.get(u.to)??0;return r.set(u.to,S+1),S}),n=mt*2+(i-1)*Vo+D+30+24*Math.max(0,...l),c=u=>mt+u.col*Lo,d=u=>mt+u.row*Vo,f=e.edges.map((u,h)=>{const y=o.get(u.from),S=o.get(u.to);if(!y||!S)throw new Error(`flow edge ${u.from} → ${u.to}: unknown node`);let N,$e,U;if(S.col>y.col){const M=c(y)+pe,B=d(y)+D/2,g=c(S),k=d(S)+D/2,z=(g-M)/2;N=`M${M},${B} C${M+z},${B} ${g-z},${k} ${g},${k}`;const Q=u.labelAt??.5,se=1-Q;$e=se**3*M+3*se*se*Q*(M+z)+3*se*Q*Q*(g-z)+Q**3*g,U=se**3*B+3*se*se*Q*B+3*se*Q*Q*k+Q**3*k}else if(S.col===y.col){const M=S.row>y.row,B=c(y)+pe/2,g=M?d(y)+D:d(y),k=M?d(S):d(S)+D;N=`M${B},${g} L${B},${k}`,$e=B,U=(g+k)/2}else{const M=c(y)+pe/2,B=d(y)+D,g=c(S)+pe/2,k=d(S)+D,z=Math.max(B,k)+34+24*l[h];N=`M${M},${B} C${M},${z} ${g},${z} ${g},${k}`,$e=(M+g)/2,U=z-8}const Je=u.label?`<g class="flowmap__edge-label" transform="translate(${$e},${U})">
           <rect x="${-(u.label.length*3.4+6)}" y="-9" width="${u.label.length*6.8+12}" height="18" rx="4"></rect>
           <text text-anchor="middle" dominant-baseline="central">${Gt(u.label)}</text></g>`:"";return{path:`<path class="flowmap__edge${u.dashed?" is-dashed":""}" d="${N}" marker-end="url(#fm-arrow)"></path>`,label:Je}}),p=e.nodes.map(u=>{const h=u.sub?D/2-7:D/2;return`<g class="flowmap__node${u.state?" is-state":""}" data-id="${u.id}"
        transform="translate(${c(u)},${d(u)})"${t.onPick?' tabindex="0" role="button"':""}>
      <rect width="${pe}" height="${D}"></rect>
      <text x="${pe/2}" y="${h}" text-anchor="middle" dominant-baseline="central">${Gt(u.label)}</text>
      ${u.sub?`<text class="flowmap__sub" x="${pe/2}" y="${D/2+11}" text-anchor="middle" dominant-baseline="central">${Gt(u.sub)}</text>`:""}
    </g>`}),m=document.createElement("div");m.className=`flowmap${t.onPick?" flowmap--pick":""}`,m.innerHTML=`<svg viewBox="0 0 ${s} ${n}" style="min-width:${Math.round(s*.66)}px;max-width:${s}px" role="img" aria-label="Screen flow">
    <defs><marker id="fm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--text-muted)"></path></marker></defs>
    ${f.map(u=>u.path).join("")}
    ${f.map(u=>u.label).join("")}
    ${p.join("")}
  </svg>`;const C=u=>{m.querySelectorAll(".flowmap__node").forEach(h=>h.classList.toggle("is-here",h.dataset.id===u))};return C(t.current),t.onPick&&m.querySelectorAll(".flowmap__node").forEach(u=>{const h=()=>t.onPick(u.dataset.id);u.addEventListener("click",h),u.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),y.stopPropagation(),h())})}),Object.assign(m,{setCurrent:C})}const Ee=e=>`font-family:var(--type-${e}-family);font-weight:var(--type-${e}-weight);font-size:var(--type-${e}-size);line-height:var(--type-${e}-line);letter-spacing:var(--type-${e}-tracking);text-transform:var(--type-${e}-case)`;b("css-flow-auth",`
.flow { display: flex; flex-direction: column; gap: 14px; }
.flow__frame { position: relative; overflow: hidden; border: 1px solid var(--border);
  border-radius: 12px; background: var(--tv-base-dark); }
.flow__stage {
  width: 1920px; height: 1080px; transform-origin: left top; position: absolute;
  background: var(--tv-base-dark) url('assets/flows/auth-bg.jpg') center / cover no-repeat;
  color: var(--tv-base-light);
}
.flow__el { position: absolute; }
.flow__logo { width: 200px; height: 45px; }
.flow__logo img { width: 100%; height: 100%; display: block; }

/* Figma positions a text node by the top of its GLYPH box; CSS positions it by
   the top of its LINE box, and the two differ by half the leading. Without the
   correction every heading sits lower than the file has it -- which is what put
   the tick on "Let's Play!" above its own words instead of beside them. The
   offset is (line-height - glyph height) / 2 and is constant per style, so it
   holds for a wrapped block as well as a single line. */
.flow__d-xl { ${Ee("display-xl")}; margin: -10.5px 0 0; }   /* 96/88, glyphs 67 */
.flow__d-l  { ${Ee("display-l")};  margin: -21.5px 0 0; }   /* 64/88, glyphs 45 */
.flow__h-l  { ${Ee("heading-l")};  margin: -1px 0 0; white-space: pre-line; }
.flow__h-m  { ${Ee("heading-m")};  margin: -1px 0 0; color: var(--tv-base-light); }
.flow__b-l  { ${Ee("body-l")};     margin: -11px 0 0; color: var(--tv-base-light); }

.flow__tabs { display: flex; gap: 24px; }
.flow__tabs .c-tab { width: 343px; }
.flow__btn .c-btn { width: 100%; }
.flow__chk { display: flex; align-items: center; gap: 12px; height: 40px; ${Ee("body-l")}; }

.flow__qr { width: 320px; height: 320px; border-radius: 12px; overflow: hidden;
  background: var(--tv-base-light); }
.flow__qr img { width: 100%; height: 100%; display: block; }

.flow__map { margin-top: 6px; }
.flow__hint { font-family: var(--mono); font-size: 11px; color: var(--text-muted); margin: 0; }
.flow__notes { margin: 0; padding-left: 18px; display: grid; gap: 6px;
  font-size: 13px; line-height: 1.5; color: var(--text-dim); }
.flow__notes code { font-family: var(--mono); font-size: .92em; }
`);const Cs="Access your profiles, groups, and leaderboard progress. Pick up where you left off.",ft="Sign up on this device or use the link playalong.net/{code}",bt="Terms & Privacy Policy are available at playalong.net/{code}",Nt="Provide your account email address and we’ll send you an email with a link to reset your password.",qe=(e,t,o)=>[{t:"logo",x:140,y:e},{t:"text",x:140,y:e+89,w:710,cls:"flow__d-xl",s:"Sign In"},{t:"text",x:140,y:e+200,w:710,cls:"flow__h-m",s:Cs},{t:"tabs",x:140,y:e+316,sel:t,go:o}],xt=[{id:"entry",title:"Entry",frame:"Login -1",node:"7144:6579",focus:3,els:[{t:"logo",x:140,y:170},{t:"text",x:140,y:259,w:710,cls:"flow__d-xl",s:"Play the shows you love."},{t:"text",x:140,y:458,w:710,cls:"flow__h-m",s:"Sign in or play as a guest."},{t:"btn",x:140,y:558,w:710,look:"primary",s:"Sign In",go:"signin"},{t:"btn",x:140,y:650,w:710,look:"secondary",s:"Sign Up",go:"signup"},{t:"btn",x:140,y:742,w:710,look:"outline",s:"Continue as Guest",go:"done"},{t:"text",x:140,y:854,w:710,cls:"flow__b-l",s:"Create an account to save progress. Visit playalong.net/activate on your device."}]},{id:"signin",title:"Sign In",frame:"Login- 6",node:"7252:8011",focus:4,back:"entry",els:[...qe(142,1,["qr","signin"]),{t:"input",x:140,y:578,state:"focus",s:"Email Address",go:"signin-keyboard"},{t:"input",x:140,y:674,state:"default",s:"Password",go:"signin-keyboard"},{t:"btn",x:140,y:770,w:710,look:"primary",dis:!0,s:"Continue"},{t:"btn",x:140,y:866,w:710,look:"ghost",s:"Forgot Password?",go:"reset"}]},{id:"signin-keyboard",title:"Sign In · keyboard",frame:"Login- 8 — React Native",node:"7252:8259",focus:8,back:"signin",els:[...qe(142,1,["qr","signin"]),{t:"input",x:140,y:578,state:"typing",s:"abc"},{t:"input",x:140,y:674,state:"default",s:"Password"},{t:"btn",x:140,y:770,w:710,look:"primary",dis:!0,s:"Continue"},{t:"btn",x:140,y:866,w:710,look:"ghost",s:"Forgot Password?",go:"reset"},{t:"kb",x:1198,y:173,go:"signin-typed"}]},{id:"signin-typed",title:"Sign In · filled",frame:"Login- Processing - 1",node:"7585:7594",focus:6,back:"signin",els:[...qe(142,1,["qr","signin"]),{t:"input",x:140,y:578,state:"typed",s:"alexunder@gmail.com"},{t:"input",x:140,y:674,state:"typed",s:"************"},{t:"btn",x:140,y:770,w:710,look:"primary",s:"Continue",go:"done"},{t:"btn",x:140,y:866,w:710,look:"ghost",s:"Forgot Password?",go:"reset"}]},{id:"signin-error",title:"Sign In · alert",frame:"Login- 7",node:"7252:8139",focus:4,back:"signin",els:[...qe(100,1,["qr","signin"]),{t:"input",x:140,y:536,state:"alert-focus",s:"Email Address",msg:"Message text"},{t:"input",x:140,y:674,state:"alert",s:"Password",msg:"Message text"},{t:"btn",x:140,y:812,w:710,look:"primary",dis:!0,s:"Continue"},{t:"btn",x:140,y:908,w:710,look:"ghost",s:"Forgot Password?",go:"reset"}]},{id:"signin-show",title:"Sign In · show password",frame:"Login- 12",node:"10432:14776",focus:6,back:"signin",els:[...qe(110,1,["qr","signin"]),{t:"input",x:140,y:546,state:"default",s:"Email Address"},{t:"input",x:140,y:642,state:"typed",s:"******"},{t:"chk",x:140,y:738,s:"Show Password"},{t:"btn",x:140,y:802,w:710,look:"primary",dis:!0,s:"Continue"},{t:"btn",x:140,y:898,w:710,look:"ghost",s:"Forgot Password?",go:"reset"}]},{id:"qr",title:"Sign In · QR",frame:"Sign Up - 14",node:"7252:9291",focus:3,back:"signin",els:[{t:"logo",x:140,y:144},{t:"text",x:140,y:233,w:710,cls:"flow__d-xl",s:"Sign In"},{t:"text",x:140,y:344,w:710,cls:"flow__h-m",s:"Scan the QR code (with your mobile device) or use web-address below to manually authenticate with your TV device"},{t:"tabs",x:140,y:496,sel:0,go:["qr","signin"]},{t:"qr",x:140,y:616},{t:"text",x:652,y:669,w:532,cls:"flow__h-l",s:`Visit
playalong.net/authenticate
and enter the code below`},{t:"text",x:540,y:767,w:32,cls:"flow__b-l",s:"OR"},{t:"text",x:652,y:815,w:511,cls:"flow__d-xl",s:"698102"}]},{id:"reset",title:"Reset",frame:"Reset Pass - 1",node:"7252:8596",focus:3,back:"signin",els:[{t:"logo",x:140,y:226},{t:"text",x:140,y:315,w:899,cls:"flow__d-xl",s:"Reset your password"},{t:"text",x:140,y:514,w:710,cls:"flow__h-m",s:Nt},{t:"input",x:140,y:686,state:"focus",s:"Email Address",go:"reset-keyboard"},{t:"btn",x:140,y:782,w:710,look:"primary",dis:!0,s:"Reset password"}]},{id:"reset-keyboard",title:"Reset · keyboard",frame:"Reset Pass - 3",node:"9038:11487",focus:4,back:"reset",els:[{t:"logo",x:140,y:226},{t:"text",x:140,y:315,w:899,cls:"flow__d-xl",s:"Reset your password"},{t:"text",x:140,y:514,w:710,cls:"flow__h-m",s:Nt},{t:"input",x:140,y:686,state:"typing",s:"abc"},{t:"btn",x:140,y:782,w:710,look:"primary",s:"Reset password",go:"reset-typed"},{t:"kb",x:1198,y:173,go:"reset-typed"}]},{id:"reset-typed",title:"Reset · filled",frame:"Reset Pass - 4",node:"9613:12767",focus:4,back:"reset",els:[{t:"logo",x:140,y:226},{t:"text",x:140,y:315,w:899,cls:"flow__d-xl",s:"Reset your password"},{t:"text",x:140,y:514,w:710,cls:"flow__h-m",s:Nt},{t:"input",x:140,y:686,state:"typed",s:"abc"},{t:"btn",x:140,y:782,w:710,look:"primary",s:"",go:"reset-sent"}]},{id:"reset-sent",title:"Link sent",frame:"Reset Pass - 2",node:"7252:8781",focus:4,back:"signin",els:[{t:"logo",x:140,y:292},{t:"icon",x:140,y:400,size:64,name:"Check Filled"},{t:"text",x:228,y:410,w:546,cls:"flow__d-l",s:"Link has been sent!"},{t:"text",x:140,y:508,w:710,cls:"flow__h-m",s:"An email containing a link to reset your password will be sent to the address on record. If you do not receive one shortly, please try again."},{t:"btn",x:140,y:716,w:710,look:"primary",s:"Back to Sign In",go:"signin"}]},{id:"signup",title:"Sign Up",frame:"Sign Up - 11 (with links)",node:"7252:8930",focus:3,back:"entry",els:[{t:"logo",x:140,y:212},{t:"text",x:140,y:300,w:710,cls:"flow__d-xl",s:"Sign Up"},{t:"text",x:140,y:411,w:710,cls:"flow__h-m",s:ft},{t:"input",x:140,y:547,state:"focus",s:"Email Address",go:"signup-keyboard"},{t:"input",x:140,y:643,state:"default",s:"Password",go:"signup-keyboard"},{t:"btn",x:140,y:739,w:710,look:"primary",dis:!0,s:"Continue"},{t:"text",x:140,y:851,w:710,cls:"flow__b-l",s:bt}]},{id:"signup-keyboard",title:"Sign Up · keyboard",frame:"Sign Up - 15 — React Native",node:"7524:22828",focus:6,back:"signup",els:[{t:"logo",x:140,y:212},{t:"text",x:140,y:300,w:710,cls:"flow__d-xl",s:"Sign Up"},{t:"text",x:140,y:411,w:710,cls:"flow__h-m",s:ft},{t:"input",x:140,y:547,state:"typing",s:"abc"},{t:"input",x:140,y:643,state:"default",s:"Password"},{t:"btn",x:140,y:739,w:710,look:"primary",dis:!0,s:"Continue"},{t:"text",x:140,y:851,w:710,cls:"flow__b-l",s:bt},{t:"kb",x:1198,y:173,go:"signup-typed"}]},{id:"signup-error",title:"Sign Up · alert",frame:"Sign Up - 12",node:"7252:9045",focus:3,back:"signup",els:[{t:"logo",x:140,y:162},{t:"text",x:140,y:250,w:710,cls:"flow__d-xl",s:"Sign Up"},{t:"text",x:140,y:361,w:710,cls:"flow__h-m",s:ft},{t:"input",x:140,y:497,state:"alert-focus",s:"Email Address",msg:"This e-mail address is already in use"},{t:"input",x:140,y:635,state:"alert",s:"Password",msg:"Password must be at least 8 characters long and contain at least 1 lower case letter, 1 upper case letter and 1 digit"},{t:"btn",x:140,y:789,w:710,look:"primary",dis:!0,s:"Continue"},{t:"text",x:140,y:901,w:710,cls:"flow__b-l",s:bt}]},{id:"signup-typed",title:"Sign Up · filled",frame:"Sign Up - Processing - 1",node:"7585:7679",focus:5,back:"signup",els:[{t:"logo",x:140,y:212},{t:"text",x:140,y:300,w:710,cls:"flow__d-xl",s:"Sign Up"},{t:"text",x:140,y:411,w:710,cls:"flow__h-m",s:ft},{t:"input",x:140,y:547,state:"typed",s:"alexunder@gmail.com"},{t:"input",x:140,y:643,state:"typed",s:"************"},{t:"btn",x:140,y:739,w:710,look:"primary",s:"Continue",go:"done"},{t:"text",x:140,y:851,w:710,cls:"flow__b-l",s:bt}]},{id:"done",title:"Let’s Play!",frame:"Sign Up - 13",node:"7252:9177",focus:4,back:"entry",els:[{t:"logo",x:140,y:328},{t:"icon",x:140,y:436,size:64,name:"Check Filled"},{t:"text",x:228,y:446,w:287,cls:"flow__d-l",s:"Let's Play!"},{t:"text",x:140,y:544,w:710,cls:"flow__h-m",s:"You're all set!  Track your progress, earn badges, join challenges.  Let's go!"},{t:"btn",x:140,y:680,w:710,look:"primary",s:"PlayAlong!",go:"entry"}]}],$s=["Every string, every x and every y is read out of the file on 2026-10-13. Nothing here is written to fill a gap — where the file is empty, so is this.","The alert copy on <strong>Login- 7</strong> is the literal placeholder <code>Message text</code>, twice. The file never writes the real sign-in errors; only <strong>Sign Up - 12</strong> carries sentences. <strong>Needs the copy.</strong>","The button on <strong>Reset Pass - 4</strong> has <strong>no label at all</strong> — its text node is gone, while the same button reads <code>Reset password</code> on frames 1 and 3. Drawn empty here. <strong>A file defect.</strong>","The Sign In column sits at a different height on every frame that uses it: y = 142 on Login- 6 and on the processing frame, 110 on Login- 12, 100 on Login- 7. The tabs, inputs and buttons all move with it. <strong>Probably unintended.</strong>","Only <strong>Sign Up - 14</strong> draws the QR tab, and it is a Sign Up frame titled <em>Sign In</em>. The Email tab is selected on every other frame, so this rebuild wires the two tabs together — which the file does not.","The background is the <code>Splash Screen</code> component exported flat, because it is a collage of more than twenty posters under four gradients. A picture here; a component in a client.","The keyboard’s two icon keys are blank 44 × 44 frames in the file. <code>Delete</code> and <code>Mic</code> are read from their positions, not measured.","There is a second, narrower auth flow for web and mobile — <code>Digit Code</code>, <code>Mobile Login</code>, <code>Sign Up 16–20</code>. A separate set of frames, not in here."],Ts={"signin-error":[1,0,!0],qr:[2,0],"signin-show":[0,1,!0],signin:[1,1],"signin-keyboard":[2,1],"signin-typed":[3,1],entry:[0,2],done:[4,2],reset:[2,3],"reset-keyboard":[3,3],"reset-typed":[4,3],"reset-sent":[5,3],signup:[1,4],"signup-keyboard":[2,4],"signup-typed":[3,4],"signup-error":[1,5,!0]},Ss={nodes:xt.map(e=>{const t=Ts[e.id];if(!t)throw new Error(`auth map: no place for ${e.id}`);return{id:e.id,label:e.title,sub:e.frame,col:t[0],row:t[1],state:t[2]}}),edges:[{from:"entry",to:"signin",label:"Sign In"},{from:"entry",to:"signup",label:"Sign Up"},{from:"entry",to:"done",label:"Guest",labelAt:.62},{from:"signin",to:"signin-error",dashed:!0},{from:"signin",to:"signin-show",dashed:!0},{from:"signin",to:"qr",label:"QR"},{from:"signin",to:"signin-keyboard",label:"OK"},{from:"signin-keyboard",to:"signin-typed",label:"type"},{from:"signin-typed",to:"done",label:"Continue"},{from:"signin",to:"reset",label:"Forgot?",labelAt:.22},{from:"reset",to:"reset-keyboard",label:"OK"},{from:"reset-keyboard",to:"reset-typed",label:"type"},{from:"reset-typed",to:"reset-sent",label:"Reset"},{from:"reset-sent",to:"signin",label:"Back to Sign In"},{from:"signup",to:"signup-keyboard",label:"OK"},{from:"signup-keyboard",to:"signup-typed",label:"type"},{from:"signup-typed",to:"done",label:"Continue"},{from:"signup",to:"signup-error",dashed:!0}]},vt=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;"),Ao=e=>e.els.map((t,o)=>t.t==="btn"&&!t.dis||t.t==="input"||t.t==="tabs"||t.t==="kb"?o:-1).filter(t=>t>=0),Fs=e=>e==="alert"||e==="alert-focus"?"alert-focus":e==="typing"?"typing":"focus",Ls=e=>e==="alert"||e==="alert-focus"?"alert":e==="focus"?"default":e;function Vs(e,t){const o=document.createElement("div");switch(o.className="flow__el",o.style.left=`${e.x}px`,o.style.top=`${e.y}px`,e.t){case"logo":o.classList.add("flow__logo"),o.innerHTML='<img src="assets/flows/logo.svg" alt="PlayAlong">';break;case"text":o.style.width=`${e.w}px`,o.innerHTML=`<p class="${e.cls}">${vt(e.s)}</p>`;break;case"icon":o.innerHTML=x(e.name,e.size);break;case"input":o.appendChild(ae(t?Fs(e.state):Ls(e.state),vt(e.s),e.msg,null));break;case"btn":o.classList.add("flow__btn"),o.style.width=`${e.w}px`,o.appendChild(Y(e.look,e.dis?"disabled":t?"focus":void 0,vt(e.s),null));break;case"tabs":o.classList.add("flow__tabs"),o.innerHTML=["QR Code","Email"].map((a,i)=>{const s=i===e.sel;return`<span class="c-tab${t&&s?" is-focus":s?" is-selected":""}">${a}</span>`}).join("");break;case"chk":o.classList.add("flow__chk"),o.innerHTML=`<span class="c-check is-focusring"><span class="c-check__box"></span></span><span>${vt(e.s)}</span>`;break;case"kb":o.appendChild(ke("letters","a"));break;case"qr":o.classList.add("flow__qr"),o.innerHTML='<img src="assets/flows/qr.png" alt="QR code">';break}return o}function As(e){const t=document.createElement("section");t.className="card",t.innerHTML=`
    <header class="card__head"><div>
      <h1 class="card__title">Auth — sign in, sign up, reset</h1>
      <p class="card__desc">Fourteen frames rebuilt from the file and wired together:
        <kbd>↑</kbd> <kbd>↓</kbd> move focus, <kbd>Enter</kbd> activates, <kbd>Esc</kbd> goes back.
        Focus starts where Figma draws it; every other state is as drawn.</p>
    </div></header>
    <div class="flow">
      <div class="flow__frame" data-role="frame"><div class="flow__stage" data-role="stage"></div></div>
      <p class="flow__hint" data-role="where"></p>
      <div class="flow__map"><h2 class="demo__flow-title">Screens</h2><div data-role="map"></div></div>
      <ul class="flow__notes">${$s.map(h=>`<li>${h}</li>`).join("")}</ul>
    </div>`;const o=t.querySelector("[data-role=frame]"),a=t.querySelector("[data-role=stage]"),i=t.querySelector("[data-role=map]"),s=t.querySelector("[data-role=where]"),r=h=>xt.find(y=>y.id===h)??xt[0];let l=e&&xt.some(h=>h.id===e)?e:"entry",n=r(l).focus??-1;const c=No(Ss,{current:l,onPick:h=>f(h)});i.appendChild(c);function d(){const h=r(l);a.innerHTML="",h.els.forEach((y,S)=>a.appendChild(Vs(y,S===n))),c.setCurrent(l),s.textContent=`${h.frame} — ${h.node}`}function f(h){l=h;const y=r(h),S=Ao(y);n=y.focus!==void 0&&S.includes(y.focus)?y.focus:S[0]??-1,d()}function p(h){const y=Ao(r(l));if(!y.length)return;const S=y.indexOf(n);n=y[(Math.max(0,S)+h+y.length)%y.length],d()}function m(){const h=r(l).els[n];h&&(h.t==="btn"&&h.go&&!h.dis||h.t==="input"&&h.go||h.t==="kb"?f(h.go):h.t==="tabs"&&f(h.go[h.sel===0?1:0]))}const C=h=>{if(t.isConnected){if(h.key==="ArrowDown"||h.key==="ArrowRight")h.preventDefault(),p(1);else if(h.key==="ArrowUp"||h.key==="ArrowLeft")h.preventDefault(),p(-1);else if(h.key==="Enter")h.preventDefault(),m();else if(h.key==="Escape"||h.key==="Backspace"){const y=r(l).back;y&&(h.preventDefault(),f(y))}}};window.addEventListener("keydown",C);const u=()=>{const h=o.clientWidth||t.clientWidth;if(!h)return;const y=h/1920;a.style.transform=`scale(${y})`,o.style.height=`${Math.round(1080*y)}px`};return requestAnimationFrame(u),window.addEventListener("resize",u),d(),t.__destroy=()=>{window.removeEventListener("keydown",C),window.removeEventListener("resize",u)},t}const Uo=[{id:"flow-auth",title:"Auth — sign in, sign up, reset",kind:"demo",section:"Demos",badge:{text:"Demo",tone:"demo"},open:(e,t)=>{e.innerHTML="";const o=As(t);return e.appendChild(o),()=>{var a;return(a=o.__destroy)==null?void 0:a.call(o)}}}];b("css-home",`
.home__lead { margin: 0 0 28px; max-width: 72ch; color: var(--text-dim); }
.home__lead strong { color: var(--text); }
.home__grid { display: grid; gap: 16px; margin-bottom: 36px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.home__tile { display: block; padding: 18px 20px; border-radius: var(--radius);
  border: 1px solid var(--border); background: var(--panel); color: inherit;
  text-decoration: none; transition: border-color .15s, transform .15s; }
.home__tile:hover { border-color: var(--accent); transform: translateY(-1px); }
.home__tile-head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 6px; }
.home__tile-name { font-size: 15px; font-weight: 600; }
.home__tile-count { font-family: var(--mono); font-size: 11px; color: var(--text-dim); }
.home__tile-note { margin: 0; font-size: 13px; line-height: 1.5; color: var(--text-dim); }
.home__h2 { font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
  color: var(--text-dim); margin: 0 0 12px; }
.home__list { margin: 0 0 32px; padding-left: 18px; max-width: 76ch; }
.home__list li { margin-bottom: 10px; line-height: 1.6; color: var(--text-dim); }
.home__list strong { color: var(--text); }
.home__list code { font-family: var(--mono); font-size: 12px; }
`);function Is(){const e=[{id:Kt[0].id,name:"Foundations",count:Kt.length,note:"Colour, typography and geometry, rendered from the token file itself — not from a table kept beside it. A swatch that is wrong here means the export is wrong."},{id:eo[0].id,name:"Components",count:eo.length,note:"Every component rebuilt from the Figma file, with the tokens it binds, the frames it appears on, and where the rebuild and the file disagree."},{id:jt[0].id,name:"Animations",count:jt.length,note:"The motion, playable and scrubbable: timings, easing and what triggers each one. Most of it was measured from the proof of concept rather than specified."},{id:Yt[0].id,name:"Demos",count:Yt.length+Uo.length,note:"Whole flows you can drive with the keyboard — the Stack It game loop, the TV proof of concept, and the sign-in / sign-up screens."}],t=document.createElement("section");return t.className="card",t.innerHTML=`
    <header class="card__head"><div>
      <h1 class="card__title">PlayAlong TV — UI catalog</h1>
      <p class="card__desc">The design side of PlayAlong in one place: the components, the tokens they are built from, and the motion between them.</p>
    </div></header>

    <p class="home__lead">Everything here is <strong>rebuilt from the Figma file</strong> and
      kept beside the token export, so it can be looked at, measured and argued with without
      opening Figma. It is a <strong>reference and a demo surface, not client code</strong> —
      the apps are built separately, and nothing in this repository ships to a television.</p>

    <div class="home__grid">
      ${e.map(o=>`
        <a class="home__tile" href="#${o.id}">
          <span class="home__tile-head">
            <span class="home__tile-name">${o.name}</span>
            <span class="home__tile-count">${o.count}</span>
          </span>
          <p class="home__tile-note">${o.note}</p>
        </a>`).join("")}
    </div>

    <h2 class="home__h2">How to read it</h2>
    <ul class="home__list">
      <li><strong>Known differences</strong> is the part worth reading. Every component page ends
        with what the rebuild and the Figma file do not agree on, and what is a defect in the file
        rather than in the rebuild — a misspelled variant, a stroke nothing binds, a radius that is
        one component's alone.</li>
      <li><strong>Where it is used</strong> is measured, not guessed: every instance in the file was
        resolved to the frame it sits on. A component used on no frame says so.</li>
      <li><strong>The tokens are generated.</strong> <code>design-tokens.json</code> comes from the
        <code>playalong-hub</code> repository and is turned into CSS variables by
        <code>npm run external:sync</code>. Nothing here hand-copies a colour, and a drift check
        catches it when Figma and the file disagree.</li>
      <li><strong>A number next to a component is its real size in Figma</strong>, and anything wider
        than the column is scaled with the factor written beside it — so a shrunken thing is never
        read as its own size.</li>
      <li><strong>Two links into Figma</strong> on every component. <em>Library</em> opens it on the
        <code>▣ Library</code> sheet, grouped with its neighbours, which is where the team reads it;
        <em>Component</em> opens the definition on <code>❖ Components</code>, which is where it is
        edited. A <em>Library ↗</em> means the sheet shows it only inside another component, and the
        hover says which. Three components are on no sheet at all and carry one link.</li>
    </ul>

    <h2 class="home__h2">What is not here</h2>
    <ul class="home__list">
      <li>Requirements and acceptance criteria — those live in <code>playalong-hub</code>, next to the
        specs they belong to. Per-screen geometry (<code>ui-spec.md</code>) is meant to join this
        catalog later.</li>
      <li>Anything about one platform's implementation. Roku, React Native and the web client each
        keep their own.</li>
    </ul>`,t}const Ms=[{id:"home",title:"Start here",kind:"component",section:"Overview",open:e=>(e.innerHTML="",e.appendChild(Is()),()=>{})}];async function Io(e,t,o){try{await navigator.clipboard.writeText(e)}catch{const a=document.createElement("textarea");a.value=e,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a)}t.classList.add("btn--copied"),t.textContent="Copied!",setTimeout(()=>{t.classList.remove("btn--copied"),t.textContent=o},1400)}const Bs=[{id:"web",label:"Web · CSS (LG, Samsung)"},{id:"android",label:"Android TV · Compose"},{id:"ios",label:"iOS / tvOS · SwiftUI"},{id:"roku",label:"Roku · SceneGraph"}];function Es(e){var B;const t=Te.find(g=>g.id===e.defaults.easingId)??Te[0],o={duration:e.defaults.duration,easing:t};let a="web";const i=document.createElement("div");i.innerHTML=`
    <header class="page-header">
      <div class="page-header__eyebrow">${((B=e.usedIn)==null?void 0:B.join(" · "))??e.game}</div>
      <h1 class="page-header__title">${e.title}</h1>
      <p class="page-header__desc">${e.description}</p>
    </header>

    <div class="anim-card">
      <div class="anim-stage" data-role="stage"></div>

      ${e.frames&&e.frames.length>0?`
        <div class="frames-grid" data-role="frames">
          ${e.frames.map((g,k)=>`
            <div class="frame">
              <div class="frame__slot" data-frame-idx="${k}"></div>
              <div class="frame__label">${g.label}</div>
              ${g.sublabel?`<div class="frame__sublabel">${g.sublabel}</div>`:""}
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
                <input type="range" min="100" max="2000" step="10" value="${o.duration}" data-role="duration" />
                <div class="control__value" data-role="duration-value">${o.duration} ms</div>
              </div>
            </div>

            <div class="control">
              <div class="control__label">Easing preset</div>
              <select data-role="easing-preset" style="width:100%">
                ${Te.map(g=>`<option value="${g.id}" ${g.id===o.easing.id?"selected":""}>${g.label}</option>`).join("")}
              </select>
            </div>

            <div class="control__hint" data-role="easing-desc">${o.easing.description}</div>

            <details class="disclosure disclosure--inline">
              <summary class="disclosure__head">Custom cubic-bezier</summary>
              <div class="bezier-inputs">
                ${o.easing.bezier.map((g,k)=>`<input type="number" step="0.01" value="${g}" data-role="bezier-${k}" />`).join("")}
              </div>
            </details>
          </div>
        </div>
      </div>

      <details class="disclosure disclosure--wide">
        <summary class="disclosure__head">Implementation code</summary>
      <div class="tabs-row">
        <div class="tabs" role="tablist">
          ${Bs.map(g=>`
            <button type="button" class="tab ${g.id===a?"is-active":""}" role="tab" data-platform="${g.id}">${g.label}</button>
          `).join("")}
        </div>
        <button class="btn btn--small" data-role="copy-snippet">Copy code</button>
      </div>

      <div class="code-block" data-role="snippet-output"></div>
      </details>
    </div>
  `;const s=i.querySelector("[data-role=stage]"),r=i.querySelector("[data-role=play]"),l=i.querySelector("[data-role=slow]"),n=i.querySelector("[data-role=reset]"),c=i.querySelector("[data-role=copy-snippet]"),d=i.querySelector("[data-role=copy-pm]"),f=i.querySelector("[data-role=duration]"),p=i.querySelector("[data-role=duration-value]"),m=i.querySelector("[data-role=easing-preset]"),C=i.querySelector("[data-role=easing-desc]"),u=[0,1,2,3].map(g=>i.querySelector(`[data-role=bezier-${g}]`)),h=i.querySelector("[data-role=snippet-output]"),y=i.querySelector("[data-role=pm-output]"),S=Array.from(i.querySelectorAll(".tab")),N=e.render(s);function $e(){o.easing.bezier.forEach((g,k)=>{u[k].value=String(g)})}function U(){const g=e.snippets(o);h.textContent=g[a],y.textContent=e.pmTicket(),S.forEach(k=>{k.classList.toggle("is-active",k.dataset.platform===a)})}function Je(g){o.easing={...g},C.textContent=g.description,$e(),U(),e.tbd||e.play(o)}function M(){const g=u.map(k=>Number(k.value));if(!g.some(k=>Number.isNaN(k))){if(o.easing={id:"custom",label:`Custom (${g.join(", ")})`,bezier:g,description:`cubic-bezier(${g.join(", ")})`},!m.querySelector('option[value="custom"]')){const k=document.createElement("option");k.value="custom",k.textContent="Custom…",m.appendChild(k)}m.value="custom",C.textContent=`cubic-bezier(${g.join(", ")}) — ${$(g)}`,U(),e.tbd||e.play(o)}}return e.frames&&e.frames.length>0&&e.frames.forEach((g,k)=>{const z=i.querySelector(`[data-frame-idx="${k}"]`);z&&g.render(z)}),r.addEventListener("click",()=>{e.tbd||e.play(o)}),l.addEventListener("click",()=>{if(e.tbd)return;const g=e.slowFactor??4,k={...o,duration:o.duration*g};e.play(k)}),n.addEventListener("click",()=>{const g=Te.find(k=>k.id===e.defaults.easingId)??Te[0];o.duration=e.defaults.duration,f.value=String(o.duration),p.textContent=`${o.duration} ms`,m.value=g.id,Je(g)}),f.addEventListener("input",()=>{o.duration=Number(f.value),p.textContent=`${o.duration} ms`,U(),e.tbd||e.play(o)}),m.addEventListener("change",()=>{const g=Te.find(k=>k.id===m.value);g&&Je(g)}),u.forEach(g=>g.addEventListener("change",M)),S.forEach(g=>{g.addEventListener("click",()=>{a=g.dataset.platform,U()})}),c.addEventListener("click",()=>{const g=e.snippets(o)[a];Io(g,c,"Copy current snippet")}),d.addEventListener("click",()=>{Io(e.pmTicket(),d,"Copy description")}),U(),e.tbd||requestAnimationFrame(()=>e.play(o)),i.__destroy=()=>{N()},i}function Rs(e){var f;const t=document.createElement("section");t.className="card demo";const o=e.href??(e.src?`/playalong-animation-catalog/${e.src}`:null),a=o?`<div class="demo__stage">
         <iframe class="demo__frame" title="${e.title}" src="${o}" allow="autoplay" loading="lazy"></iframe>
       </div>`:`<div class="demo__stage demo__stage--empty"><div>
         <p class="demo__empty-title">No address yet</p>
         <p class="demo__empty-body">${e.hostedNote??"This demo is hosted elsewhere and its URL has not been recorded."}</p>
       </div></div>`,i=(e.notes??[]).map(p=>`<li>${p}</li>`).join(""),s=(e.controls??[]).map(p=>`<tr><td><kbd>${p.keys}</kbd></td><td>${p.does}</td></tr>`).join(""),r=p=>{try{const m=parseFloat(localStorage.getItem(p.key)??"");return Number.isFinite(m)?Math.min(p.max,Math.max(p.min,m)):p.fallback}catch{return p.fallback}},l=(e.settings??[]).map((p,m)=>{const C=r(p);return`<label class="demo__setting">
        <span class="demo__setting-label">${p.label}</span>
        <input type="range" min="${p.min}" max="${p.max}" step="${p.step}" value="${C}" data-setting="${m}" />
        <span class="demo__setting-value" data-setting-value="${m}">${p.format(C)}</span>
      </label>`}).join("");t.innerHTML=`
    <header class="card__head">
      <div>
        <h1 class="card__title">${e.title}</h1>
        <p class="card__desc">${e.description}</p>
      </div>
      <div class="demo__actions">
        ${o?(e.actions??[]).map((p,m)=>`<button type="button" class="btn" data-action="${m}">${p.label}</button>`).join(""):""}
        ${o?'<button type="button" class="btn" data-act="reload">Restart</button>':""}
        ${o?`<a class="btn" href="${o}" target="_blank" rel="noopener">Open full screen</a>`:""}
      </div>
    </header>

    ${a}

    ${e.flow?'<div class="demo__flow"><h2 class="demo__flow-title">Screens</h2><div data-role="flow"></div></div>':""}

    <div class="demo__side">
      ${l?`<div class="demo__block"><h2>Settings</h2><div class="demo__settings">${l}</div></div>`:""}
      ${s?`<div class="demo__block"><h2>Controls</h2><table class="demo__keys">${s}</table></div>`:""}
      ${i?`<div class="demo__block"><h2>Read this first</h2><ul class="demo__notes">${i}</ul></div>`:""}
    </div>
  `,t.querySelectorAll("[data-setting]").forEach(p=>{const m=e.settings[Number(p.dataset.setting)],C=t.querySelector(`[data-setting-value="${p.dataset.setting}"]`);p.addEventListener("input",()=>{const u=Number(p.value);C.textContent=m.format(u);try{localStorage.setItem(m.key,String(u))}catch{}})});const n=t.querySelector(".demo__frame"),c=()=>{var p;return(p=n==null?void 0:n.contentWindow)==null?void 0:p.catalogFlow};let d;if(e.flow){const p=No(e.flow,{onPick:m=>{var C;(C=c())==null||C.go(m),n==null||n.focus()}});t.querySelector('[data-role="flow"]').appendChild(p),d=window.setInterval(()=>{var m;try{p.setCurrent((m=c())==null?void 0:m.current())}catch{}},250)}return n&&(t.querySelectorAll("[data-action]").forEach(p=>{const m=e.actions[Number(p.dataset.action)];p.addEventListener("click",()=>{n.contentWindow&&m.run(n.contentWindow),n.focus()})}),(f=t.querySelector('[data-act="reload"]'))==null||f.addEventListener("click",()=>{n.src=n.src}),t.__destroy=()=>{n.src="about:blank",window.clearInterval(d)}),t}const Wo=(e,t)=>(e.innerHTML="",e.appendChild(t),()=>{var o;return(o=t.__destroy)==null?void 0:o.call(t)}),Hs=Yt.map(e=>({id:e.id,title:e.title,kind:"demo",section:e.section,badge:{text:"Demo",tone:"demo"},open:t=>Wo(t,Rs(e))})),Ps=jt.map(e=>({id:e.id,title:e.title,kind:"animation",section:"Animations",badge:e.usedIn&&e.usedIn.length>1?{text:`${e.usedIn.length} games`,tone:e.tbd?"tbd":"ready",title:e.usedIn.join(" · ")}:{text:e.game,tone:e.tbd?"tbd":"ready"},open:t=>Wo(t,Es(e))})),to=[...Ms,...Kt,...eo,...Uo,...Hs,...Ps],zs=["Overview","Foundations","Components","Animations","Demos"],Os=zs.map(e=>({name:e,items:to.filter(t=>t.section===e)})).filter(e=>e.items.length>0),qo="sidebar:collapsed";function Ds(){try{return new Set(JSON.parse(localStorage.getItem(qo)??"[]"))}catch{return new Set}}function Gs(e){try{localStorage.setItem(qo,JSON.stringify([...e]))}catch{}}function Ns(e){var l,n;const t=document.createElement("aside");t.className="sidebar",t.innerHTML=`
    <div class="sidebar__brand">
      <p class="sidebar__title">PlayAlong TV</p>
      <p class="sidebar__subtitle">Catalog</p>
    </div>
    <input class="sidebar__search" type="search" placeholder="Filter…" aria-label="Filter the catalog" />
  `;const o=Ds(),a=[];function i(c,d,f,p){d.classList.toggle("is-collapsed",p),f.setAttribute("aria-expanded",String(!p)),p?o.add(c):o.delete(c),Gs(o)}for(const c of Os){const d=document.createElement("div");d.className="sidebar__group",d.innerHTML=`
      <button type="button" class="sidebar__group-title" aria-expanded="true">
        <span class="sidebar__chevron" aria-hidden="true"></span>
        <span class="sidebar__group-name">${c.name}</span>
        <span class="sidebar__group-count">${c.items.length}</span>
      </button>
      <div class="sidebar__group-body"><div class="sidebar__group-items"></div></div>
    `;const f=d.querySelector(".sidebar__group-title"),p=d.querySelector(".sidebar__group-items");f.addEventListener("click",()=>{i(c.name,d,f,!d.classList.contains("is-collapsed"))}),o.has(c.name)&&(d.classList.add("is-collapsed"),f.setAttribute("aria-expanded","false")),a.push({name:c.name,el:d,toggle:f});for(const m of c.items){const C=document.createElement("div");C.className="sidebar__item",C.dataset.id=m.id,C.dataset.search=`${m.title} ${m.section} ${((l=m.badge)==null?void 0:l.text)??""} ${((n=m.badge)==null?void 0:n.title)??""}`.toLowerCase();const u=m.badge;C.innerHTML=`
        <span class="sidebar__item-name">${m.title}</span>
        ${u?`<span class="sidebar__badge is-${u.tone??"ready"}"${u.title?` title="${u.title}"`:""}>${u.text}</span>`:""}
      `,C.addEventListener("click",()=>e(m.id)),p.appendChild(C)}t.appendChild(d)}const s=t.querySelector(".sidebar__search");s.addEventListener("input",()=>{const c=s.value.trim().toLowerCase();for(const d of a){let f=0;d.el.querySelectorAll(".sidebar__item").forEach(p=>{const m=!c||(p.dataset.search??"").includes(c);p.hidden=!m,m&&f++}),d.el.hidden=f===0,c&&f>0&&d.el.classList.contains("is-collapsed")&&i(d.name,d.el,d.toggle,!1)}});function r(c){t.querySelectorAll(".sidebar__item").forEach(p=>{p.classList.toggle("is-active",p.dataset.id===c)});const d=t.querySelector(".sidebar__item.is-active"),f=a.find(p=>p.el.contains(d));f&&f.el.classList.contains("is-collapsed")&&i(f.name,f.el,f.toggle,!1)}return{root:t,setActive:r}}function Us(){const e=document.getElementById("app");if(!e)return;e.className="app",e.innerHTML="";const t=document.createElement("main");t.className="main";let o=null;function a(s){const[r,l]=s.split("~"),n=to.find(c=>c.id===r);n&&(o==null||o(),o=n.open(t,l),i.setActive(r),location.hash.replace(/^#/,"")!==s&&(location.hash=s))}const i=Ns(a);e.appendChild(i.root),e.appendChild(t),a(location.hash.replace(/^#/,"")||to[0].id),window.addEventListener("hashchange",()=>{const s=location.hash.replace(/^#/,"");s&&a(s)})}Us();
