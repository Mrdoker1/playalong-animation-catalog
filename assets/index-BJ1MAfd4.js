(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();const P=[{id:"linear",label:"Linear",bezier:[0,0,1,1],description:"Constant speed, no acceleration."},{id:"ease",label:"Ease (browser default)",bezier:[.25,.1,.25,1],description:"Generic browser default."},{id:"ease-out",label:"Ease Out",bezier:[0,0,.2,1],description:"Fast start, soft landing — good for entrances."},{id:"ease-in",label:"Ease In",bezier:[.4,0,1,1],description:"Slow start, fast end — good for exits."},{id:"ease-in-out",label:"Ease In Out",bezier:[.4,0,.2,1],description:"Symmetric — good for ambient loops."},{id:"back-out",label:"Back Out (overshoot)",bezier:[.34,1.56,.64,1],description:"Overshoots past the end then settles — bouncy reveals."},{id:"material",label:"Material Standard",bezier:[.4,0,.2,1],description:'Material Design "standard" curve.'},{id:"glide",label:"Glide (Stack It)",bezier:[.3,.9,.3,1],description:"Quick launch, long soft settle — Stack It chip and block moves."}];function m(e){return`cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`}function u(e,t){if(document.getElementById(e))return;const i=document.createElement("style");i.id=e,i.textContent=t,document.head.appendChild(i)}const Le=450,fe=350,_t=`
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
`;let x=null,T=null,A=null;function ue(e,t){e.innerHTML=`
    <div class="frame-ff-row" style="
      transform: rotateX(${t.rotateX}deg) scale(${t.scale});
      ${t.state==="hidden"?"background:linear-gradient(180deg,#1d4ed8 0%,#0a1f5a 100%); border:1.5px solid rgba(56,138,255,0.5);":"background:linear-gradient(180deg,#008e11 0%,#053800 100%); border:1.5px solid rgba(0,255,85,0.55);"}
    ">
      <span style="font-size:18px;font-weight:600;">1</span>
      <span style="width:1px;align-self:stretch;background:rgba(255,255,255,0.2);"></span>
      <span style="flex:1;font-size:13px;font-weight:600;letter-spacing:0.3px;opacity:${t.textOpacity};">FAST FOOD</span>
      <span style="font-size:18px;font-weight:600;opacity:${t.textOpacity};">28</span>
    </div>
  `}const me=`
.frame-ff-row {
  display:flex;align-items:center;gap:10px;
  width:100%;height:40px;padding:0 12px;
  border-radius:6px;color:#fff;
  font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
  transform-origin:center center;
}
`,Ft={id:"ff-answer-board",title:"Answer Board",game:"Family Feud",description:'When the player guesses correctly, the matching row flips open on the X-axis, swapping its blue "hidden" skin for the green "revealed" skin. Back-ease curve overshoots past the end then settles. The answer text fades up from beneath after the row lands.',defaults:{duration:700,easingId:"back-out"},frames:[{label:"Hidden",sublabel:"idle · blue · slot number only",render:e=>{u("css-ff-frame-row",me),ue(e,{state:"hidden",rotateX:0,scale:1,textOpacity:0})}},{label:"Start",sublabel:"0% · rotateX 90° · scale .85",render:e=>{e.innerHTML='<div class="frame-ghost">edge · row on its side</div>'}},{label:"Overshoot",sublabel:"60% · rotateX −15° · scale 1.04",render:e=>{u("css-ff-frame-row",me),ue(e,{state:"revealed",rotateX:-15,scale:1.04,textOpacity:0})}},{label:"Counter",sublabel:"85% · rotateX 6° · scale .99",render:e=>{u("css-ff-frame-row",me),ue(e,{state:"revealed",rotateX:6,scale:.99,textOpacity:.6})}},{label:"Settled",sublabel:"100% · rotateX 0 · scale 1",render:e=>{u("css-ff-frame-row",me),ue(e,{state:"revealed",rotateX:0,scale:1,textOpacity:1})}}],render(e){return u("css-ff-answer-board",_t),e.innerHTML=`
      <div class="preview-ff-board">
        <div class="preview-ff-row">
          <span class="preview-ff-row__num">1</span>
          <span class="preview-ff-row__divider"></span>
          <span class="preview-ff-row__name">FAST FOOD</span>
          <span class="preview-ff-row__pts">28</span>
        </div>
      </div>
    `,x=e.querySelector(".preview-ff-row"),T=e.querySelector(".preview-ff-row__name"),A=e.querySelector(".preview-ff-row__pts"),()=>{e.innerHTML="",x=null,T=null,A=null}},play({duration:e,easing:t}){if(!x||!T||!A)return;x.classList.remove("is-revealed"),x.style.animation="none",T.style.animation="none",A.style.animation="none",T.style.opacity="0",A.style.opacity="0",x.offsetWidth,x.classList.add("is-revealed"),x.style.animation=`ff-row-flip ${e}ms ${m(t.bezier)}`;const i=Math.round(fe/700*e),a=`ff-text-fade-up ${Le}ms ease-out ${i}ms both`;T.style.animation=a,A.style.animation=a,setTimeout(()=>{!x||!T||!A||(x.style.animation="none",T.style.animation="none",A.style.animation="none",T.style.opacity="0",A.style.opacity="0",x.classList.remove("is-revealed"))},e+1200)},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* Drop into FamilyFeudBoard.css */
@keyframes ff-row-flip {
  0%   { transform: rotateX(90deg) scale(0.85); }
  60%  { transform: rotateX(-15deg) scale(1.04); }
  85%  { transform: rotateX(6deg) scale(0.99); }
  100% { transform: rotateX(0) scale(1); }
}

.ff-board { perspective: 1000px; }

.ff-board__row--revealed {
  animation: ff-row-flip ${e}ms ${m(t.bezier)};
  transform-origin: center center;
}

@keyframes ff-text-fade-up {
  0%   { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}

.ff-board__row--revealed .ff-board__name,
.ff-board__row--revealed .ff-board__points {
  animation: ff-text-fade-up ${Le}ms ease-out ${fe}ms both;
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.runtime.*
import androidx.compose.ui.graphics.graphicsLayer

val easing = CubicBezierEasing(${i.toFixed(2)}f, ${a.toFixed(2)}f, ${r.toFixed(2)}f, ${n.toFixed(2)}f)

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

// Text fade-up — separate animation, delayed ${fe} ms.
val textAlpha by animateFloatAsState(
    targetValue = if (revealed) 1f else 0f,
    animationSpec = tween(${Le}, delayMillis = ${fe})
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
                .timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o}),
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

    <Animation id="flip" duration="${o}" easeFunction="outBack" repeat="false">
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
<!-- Note: Roku's outBack easeFunction approximates cubic-bezier(${i},${a},${r},${n}). -->`}},pmTicket(){return`Title: Family Feud — Answer Board row reveal animation

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
  · On platforms without true 3D rotation, fall back to a scaleY 0 → 1 reveal — the overshoot must remain visible.`}},Tt=`
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
`;let be=null,U=0;const tt=[{text:"pizza",kind:"incorrect"},{text:"burger",kind:"correct"},{text:"tacos",kind:"incorrect"}];function it(e,t,i,a,r,n){e.innerHTML=`
    <div style="
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      font-size:18px;font-weight:600;
      color:${a};
      opacity:${i};
      transform:translateY(${t}px);
      text-decoration:line-through;
    ">${n}</div>
  `}const At={id:"ff-attempts",title:"Attempts",game:"Family Feud",description:"When the player submits a guess, a new row slides into the Attempts column from above. Correct rows render in green, incorrect rows render in red with a strike-through.",defaults:{duration:400,easingId:"ease-out"},frames:[{label:"Start",sublabel:"0% · translateY −18 · opacity 0",render:e=>{e.innerHTML='<div class="frame-ghost">hidden</div>'}},{label:"Mid",sublabel:"50% · translateY −9 · opacity .5",render:e=>it(e,-9,.5,"#c33",!0,"pizza")},{label:"Settled",sublabel:"100% · translateY 0 · opacity 1",render:e=>it(e,0,1,"#c33",!0,"pizza")}],render(e){return u("css-ff-attempts",Tt),e.innerHTML=`
      <div class="preview-ff-attempts">
        <div class="preview-ff-attempts__title">Attempts</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
      </div>
    `,be=e.querySelector(".preview-ff-attempts"),U=0,()=>{e.innerHTML="",be=null}},play({duration:e,easing:t}){if(!be)return;const i=tt[U%tt.length],a=be.querySelectorAll(".preview-ff-attempts__row"),r=a[U%a.length];U++,r.textContent=i.text,r.classList.remove("preview-ff-attempts__row--empty","preview-ff-attempts__row--correct","preview-ff-attempts__row--incorrect"),r.classList.add(`preview-ff-attempts__row--${i.kind}`),r.style.animation="none",r.offsetWidth,r.style.animation=`ff-attempt-slide-in ${e}ms ${m(t.bezier)}`,U%a.length===0&&setTimeout(()=>{a.forEach((n,o)=>{o!==(U-1)%a.length&&(n.textContent="_",n.className="preview-ff-attempts__row preview-ff-attempts__row--empty")})},e+800)},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
@keyframes ff-attempt-slide-in {
  0%   { transform: translateY(-18px); opacity: 0; }
  100% { transform: translateY(0);     opacity: 1; }
}

.ff-attempts__row--correct,
.ff-attempts__row--incorrect {
  animation: ff-attempt-slide-in ${e}ms ${m(t.bezier)};
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.*
import androidx.compose.animation.core.*

val easing = CubicBezierEasing(${i.toFixed(2)}f, ${a.toFixed(2)}f, ${r.toFixed(2)}f, ${n.toFixed(2)}f)

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
                withAnimation(.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o})) {
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
    <Animation id="slideIn" duration="${o}" easeFunction="outQuad" repeat="false">
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
  · After 3 strikes the panel locks; no further entries play.`}},It=`
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
`;let B=[],ae=0;function Re(e,t,i,a){e.innerHTML=`
    <div style="
      width:44px;height:44px;
      display:flex;align-items:center;justify-content:center;
      border:2px solid #ef4444;border-radius:6px;
      color:#ef4444;font-size:26px;font-weight:700;
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      transform:scale(${t}) rotate(${i}deg);
      opacity:${a};
    ">✕</div>
  `}const zt={id:"ff-strikes",title:"Strikes",game:"Family Feud",description:'On a wrong answer, the next strike X icon pops in with a rotation and scale overshoot. Back-ease curve gives the X a satisfying "punch" landing.',defaults:{duration:550,easingId:"back-out"},frames:[{label:"Start",sublabel:"idle · faint X · opacity .2",render:e=>Re(e,.9,0,.2)},{label:"Overshoot",sublabel:"60% · scale 1.3 · rotate +8°",render:e=>Re(e,1.3,8,1)},{label:"Settled",sublabel:"100% · scale 1 · rotate 0",render:e=>Re(e,1,0,1)}],render(e){return u("css-ff-strikes",It),e.innerHTML=`
      <div class="preview-ff-strikes">
        <span class="preview-ff-strike">✕</span>
        <span class="preview-ff-strike">✕</span>
        <span class="preview-ff-strike">✕</span>
      </div>
    `,B=Array.from(e.querySelectorAll(".preview-ff-strike")),ae=0,()=>{e.innerHTML="",B=[]}},play({duration:e,easing:t}){if(B.length===0)return;ae>=B.length&&(B.forEach(a=>a.classList.remove("is-used")),ae=0,B[0].offsetWidth);const i=B[ae];i.classList.add("is-used"),i.style.animation="none",i.offsetWidth,i.style.animation=`ff-strike-pop ${e}ms ${m(t.bezier)}`,ae++},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
@keyframes ff-strike-pop {
  0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
  60%  { transform: scale(1.3) rotate(8deg);  opacity: 1; }
  100% { transform: scale(1) rotate(0);       opacity: 1; }
}

.ff-strike-dot--used img {
  animation: ff-strike-pop ${e}ms ${m(t.bezier)};
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
                .timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o}),
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
    <Animation id="pop" duration="${o}" easeFunction="outBack" repeat="false">
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
  · On platforms without simultaneous transform interpolation, prioritize the scale overshoot over the rotation.`}},Lt=`
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
`;let H=null;function Oe(e,t,i,a,r){e.innerHTML=`
    <div style="
      position:relative;
      width:100%;height:42px;border-radius:6px;
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      color:#fff;font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;font-size:13px;font-weight:600;
      transform:translateY(${t}px) scale(${i});
      opacity:${a};
    ">
      <span style="display:inline-flex;align-items:center;justify-content:center;height:100%;padding:0 24px;background:linear-gradient(90deg,rgba(0,47,255,0) 0%,#002fff 50%,rgba(0,47,255,0) 100%);">Round Complete!</span>
      ${r!==null?`<div style="position:absolute;top:0;bottom:0;width:45%;left:${r}%;background:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(170,210,255,0.55) 50%,rgba(255,255,255,0) 100%);"></div>`:""}
    </div>
  `}const Rt={id:"ff-feedback",title:"Feedback",game:"Family Feud",description:'When the round wraps up, a Round-Complete banner drops in from above with a back-ease overshoot. A soft light band sweeps left-to-right across the banner once, signalling "phase complete, moving on". A slow brightness pulse keeps the band alive afterwards.',defaults:{duration:620,easingId:"ease-out"},frames:[{label:"Start",sublabel:"drop · translateY −40 · scale .94",render:e=>{e.innerHTML='<div class="frame-ghost">hidden</div>'}},{label:"Settled",sublabel:"drop done · translateY 0 · scale 1",render:e=>Oe(e,0,1,1,null)},{label:"Sweep",sublabel:"light band mid-traversal",render:e=>Oe(e,0,1,1,30)},{label:"Idle",sublabel:"brightness pulse loop",render:e=>Oe(e,0,1,1,null)}],render(e){return u("css-ff-feedback",Lt),e.innerHTML=`
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
    `,H=e.querySelector(".preview-ff-banner"),()=>{e.innerHTML="",H=null}},play({duration:e,easing:t}){if(!H)return;H.style.animation="none",H.offsetWidth,H.style.animation=`ff-banner-in ${e}ms ${m(t.bezier)} backwards`;const i=H.querySelector(".preview-ff-banner__sweep");if(i){const a=i.cloneNode(!0);i.replaceWith(a)}},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
@keyframes ff-banner-in {
  from { opacity: 0; transform: translateY(-40px) scale(0.94); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.ff-banner {
  animation: ff-banner-in ${e}ms ${m(t.bezier)} backwards;
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
    val easing = CubicBezierEasing(${i.toFixed(2)}f, ${a.toFixed(2)}f, ${r.toFixed(2)}f, ${n.toFixed(2)}f)
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
            .animation(.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o}), value: visible)
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
    <Animation id="dropIn" duration="${o}" easeFunction="outBack" repeat="false">
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
  · Keyboard / interactive elements behind the banner dim and become non-interactive.`}},Ot=`
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
`;let I=null,he=86;function Ee(e,t,i,a){e.innerHTML=`
    <div style="
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      font-size:32px;font-weight:800;color:${i};
      transform:scale(${t});transform-origin:center;
    ">${a}</div>
  `}const Et={id:"common-score",title:"Score",game:"Common",description:"When the player earns points, the Score value briefly scales up and flashes green before settling back to its resting gold colour. Used by both Family Feud and Card Sharks game timers.",defaults:{duration:600,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · scale 1 · #CAA512",render:e=>Ee(e,1,"#caa512","86")},{label:"Peak",sublabel:"35% · scale 1.45 · #6DD97A",render:e=>Ee(e,1.45,"#6dd97a","102")},{label:"Settled",sublabel:"100% · scale 1 · #CAA512",render:e=>Ee(e,1,"#caa512","102")}],render(e){return u("css-common-score",Ot),he=86,e.innerHTML=`
      <div class="preview-score">
        <div class="preview-score__label">Score</div>
        <div class="preview-score__value">${he}</div>
      </div>
    `,I=e.querySelector(".preview-score__value"),()=>{e.innerHTML="",I=null}},play({duration:e,easing:t}){I&&(he+=Math.floor(Math.random()*25)+5,I.textContent=String(he),I.classList.remove("is-bumping"),I.style.animation="none",I.offsetWidth,I.style.animation=`game-timer-box-score-bump ${e}ms ${m(t.bezier)}`)},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* GameTimerBox.css — shared between Family Feud, Card Sharks, Fast Money */
@keyframes game-timer-box-score-bump {
  0%   { transform: scale(1);    color: #caa512; }
  35%  { transform: scale(1.45); color: #6dd97a; }
  100% { transform: scale(1);    color: #caa512; }
}

.game-timer-box__value--score-bump {
  display: inline-block;
  transform-origin: center;
  animation: game-timer-box-score-bump ${e}ms ${m(t.bezier)};
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
                withAnimation(.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o})) {
                    scale = 1.0  // ramps via spring-like back-ease
                }
                // Pulse via keyframe: scale 1 → 1.45 → 1
                let half = ${o} / 2.85
                withAnimation(.easeOut(duration: half)) {
                    scale = 1.45; color = Color(red: 0.43, green: 0.85, blue: 0.48)
                }
                DispatchQueue.main.asyncAfter(deadline: .now() + half) {
                    withAnimation(.easeIn(duration: ${o} - half)) {
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
    <Animation id="bump" duration="${o}" easeFunction="outBack" repeat="false">
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
  · Used identically in Family Feud, Card Sharks, and Fast Money game-timer boxes.`}},Mt=`
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
`;let k=null,W=null,$=null,z;function ge(e,t){if(t.timeUp){e.innerHTML=`
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
  `}const Vt={id:"cs-timer",title:"Timer",game:"Card Sharks",description:'Countdown bar that depletes linearly from full to empty over the question window. The blue gradient switches to red once the remaining time crosses a "critical" threshold (last 25%).',defaults:{duration:6e3,easingId:"linear"},slowFactor:2,frames:[{label:"Start",sublabel:"0% · 6s · blue full",render:e=>ge(e,{label:"6s",fill:100,critical:!1})},{label:"Mid",sublabel:"50% · 3s · blue half",render:e=>ge(e,{label:"3s",fill:50,critical:!1})},{label:"Critical",sublabel:"85% · 1s · red 15%",render:e=>ge(e,{label:"1s",fill:15,critical:!0})},{label:"Time’s Up",sublabel:"100% · bar removed · label centred",render:e=>ge(e,{label:"",fill:0,critical:!1,timeUp:!0})}],render(e){return u("css-cs-timer",Mt),e.innerHTML=`
      <div class="preview-cs-timer">
        <div class="preview-cs-timer__row">
          <span class="preview-cs-timer__value">6s</span>
          <div class="preview-cs-timer__bar">
            <div class="preview-cs-timer__bar-fill"></div>
          </div>
        </div>
      </div>
    `,k=e.querySelector(".preview-cs-timer__bar-fill"),W=e.querySelector(".preview-cs-timer__bar"),$=e.querySelector(".preview-cs-timer__value"),()=>{e.innerHTML="",k=null,W=null,$=null,z!==void 0&&clearInterval(z)}},play({duration:e}){if(!k||!$||!W)return;z!==void 0&&clearInterval(z),k.classList.remove("is-critical"),W.classList.remove("is-hidden"),$.classList.remove("is-time-up"),k.style.animation="none",k.offsetWidth,k.style.animationDuration=`${e}ms`,k.style.animation=`cs-timer-deplete ${e}ms linear forwards`;const t=Math.ceil(e/1e3);$.textContent=`${t}s`;const i=performance.now();z=window.setInterval(()=>{const a=Math.max(0,e-(performance.now()-i));if(a<=0){$&&($.textContent="Time's Up!",$.classList.add("is-time-up")),W&&W.classList.add("is-hidden"),z!==void 0&&(clearInterval(z),z=void 0);return}$&&($.textContent=`${Math.ceil(a/1e3)}s`),k&&a<e*.25&&k.classList.add("is-critical")},100)},snippets({duration:e}){const t=(e/1e3).toFixed(2);return{web:`/* GameTimerBox.css */
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
  · No bounce/easing at end — it's a literal countdown.`}},Bt=`
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
`;let oe=null,ne=null,se=null,Me=0;const rt=[{higher:"locked",lower:"idle",resolved:!1},{higher:"correct",lower:"idle",resolved:!0},{higher:"idle",lower:"locked",resolved:!1},{higher:"idle",lower:"wrong",resolved:!0}];function at(e,t,i){if(!e)return;e.className=`preview-hl-btn preview-hl-btn--${t==="up"?"higher":"lower"} preview-hl-btn--${i}`;const a=e.querySelector(".preview-hl-btn__label");a&&(i==="correct"?a.textContent="Correct!":i==="wrong"?a.textContent="Incorrect!":a.textContent=t==="up"?"Higher":"Lower")}function ot(e,t,i){return`
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
      ${ot(t.label,t.state,t.dim)}
      ${ot(i.label,i.state,i.dim)}
    </div>
  `}const Ht={id:"cs-controller",title:"Controller with Feedback",game:"Card Sharks",description:'Higher / Lower picker buttons. The player locks one option (blue gradient), then on reveal the correct option turns green ("Correct!") and the wrong pick turns red ("Incorrect!"). The unpicked option dims to 35 % once the round resolves.',defaults:{duration:200,easingId:"ease"},frames:[{label:"Idle",sublabel:"no pick yet · both neutral",render:e=>we(e,{state:"idle",label:"Higher",dim:!1},{state:"idle",label:"Lower",dim:!1})},{label:"Locked",sublabel:"player picked Higher · blue",render:e=>we(e,{state:"locked",label:"Higher",dim:!1},{state:"idle",label:"Lower",dim:!1})},{label:"Correct",sublabel:"reveal · pick was right",render:e=>we(e,{state:"correct",label:"Correct!",dim:!1},{state:"idle",label:"Lower",dim:!0})},{label:"Wrong",sublabel:"reveal · pick was wrong",render:e=>we(e,{state:"idle",label:"Higher",dim:!0},{state:"wrong",label:"Incorrect!",dim:!1})}],render(e){return u("css-cs-controller",Bt),Me=0,e.innerHTML=`
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
    `,oe=e.querySelector(".preview-hl"),[ne,se]=Array.from(e.querySelectorAll(".preview-hl-btn")),()=>{e.innerHTML="",oe=ne=se=null}},play({duration:e}){if(!oe)return;const t=rt[Me%rt.length];Me++,oe.style.setProperty("--hl-duration",`${e}ms`),oe.classList.toggle("is-resolved",t.resolved),ne&&(ne.style.transition=`background ${e}ms ease, border-color ${e}ms ease, opacity ${e}ms ease`),se&&(se.style.transition=`background ${e}ms ease, border-color ${e}ms ease, opacity ${e}ms ease`),at(ne,"up",t.higher),at(se,"down",t.lower)},snippets({duration:e}){const t=(e/1e3).toFixed(2);return{web:`/* HigherLowerButtons.css */
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
  · The same component is reused in Match Game match-up rounds with different labels — visuals and timings must match exactly.`}},Nt=`
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
`;let L=null;function nt(e,t,i,a,r){e.innerHTML=`
    <div style="
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      border-radius:6px;padding:8px 10px;
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;color:#fff;font-size:11px;line-height:1.4;
      transform:translate(${t}px, ${i}px) scale(${a});
      opacity:${r};
      max-width:140px;
    ">Use ▲ / ▼ to make your selections.</div>
  `}const Dt={id:"cs-info-note",title:"Info Note",game:"Card Sharks",description:"Persistent D-pad helper that lives in the bottom-left of the player screen. Black-glass card with two-line text and inline white key-cap glyphs for ↑ / ↓ that mirror the Higher/Lower buttons. Slides up-and-right into place on mount and then stays static.",defaults:{duration:420,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · translate −30,−16 · scale .96",render:e=>{e.innerHTML='<div class="frame-ghost">hidden · off-position</div>'}},{label:"Mid",sublabel:"50% · translate −15,−8 · scale .98",render:e=>nt(e,-15,-8,.98,.5)},{label:"Settled",sublabel:"100% · translate 0,0 · scale 1",render:e=>nt(e,0,0,1,1)}],render(e){return u("css-cs-info-note",Nt),e.innerHTML=`
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
    `,L=e.querySelector(".preview-hl-note"),()=>{e.innerHTML="",L=null}},play({duration:e,easing:t}){L&&(L.classList.remove("is-shown"),L.style.animation="none",L.style.opacity="0",L.offsetWidth,L.style.animation=`cs-stage-in ${e}ms ${m(t.bezier)} forwards`)},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* HigherLowerNote.css + CardSharksOverlay.css */
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
  animation: cs-stage-in ${e}ms ${m(t.bezier)} backwards;
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.*
import androidx.compose.animation.core.*

@Composable
fun HigherLowerNote(visible: Boolean) {
    val easing = CubicBezierEasing(${i.toFixed(2)}f, ${a.toFixed(2)}f, ${r.toFixed(2)}f, ${n.toFixed(2)}f)
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
            .timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o}),
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
    <Animation id="slideIn" duration="${o}" easeFunction="outBack" repeat="false">
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
  · When dismissed, just remove from the tree — do not play an exit animation.`}},qt=`
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
`,ye=["♥ 7","♦ Q","♠ 3","♣ A","♥ J"];let S=null,ve=0;function Ve(e,t,i,a,r,n){e.innerHTML=`
    <div style="
      width:50px;height:72px;border-radius:6px;border:2px solid #fff;
      background:linear-gradient(135deg,#f5f5f5 0%,#e0e0e0 100%);
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      font-family:Georgia,serif;color:#b91c1c;font-weight:700;
      transform:translate(${t}px, ${i}px) rotate(${a}deg) scale(${r});
      opacity:${n};
      box-shadow:0 8px 18px rgba(0,0,0,0.45);
    ">
      <div style="font-size:24px;line-height:1;">Q</div>
      <div style="font-size:18px;line-height:1;margin-top:2px;">♦</div>
    </div>
  `}const jt={id:"cs-card",title:"Card component",game:"Card Sharks",description:"When a new question shows up, the next playing card flies in from off-screen top-left, rotating into place with a slight overshoot. The card lands flat and stays put until the next question.",defaults:{duration:620,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · translate −60,−30 · rot −26° · scale .42",render:e=>{e.innerHTML='<div class="frame-ghost">hidden · off-screen</div>'}},{label:"Mid",sublabel:"55% · in motion · opacity reaches 1",render:e=>Ve(e,-25,-10,-12,.7,1)},{label:"Overshoot",sublabel:"78% · translate 0,+8 · rot +3° · scale 1.04",render:e=>Ve(e,0,8,3,1.04,1)},{label:"Settled",sublabel:"100% · translate 0,0 · rot 0 · scale 1",render:e=>Ve(e,0,0,0,1,1)}],render(e){return u("css-cs-card",qt),ve=0,e.innerHTML=`
      <div class="preview-cs-card-stage">
        <div class="preview-cs-card">
          <div class="preview-cs-card__rank">${ye[0][2]}</div>
          <div class="preview-cs-card__suit">${ye[0][0]}</div>
        </div>
      </div>
    `,S=e.querySelector(".preview-cs-card"),()=>{e.innerHTML="",S=null}},play({duration:e}){if(!S)return;ve=(ve+1)%ye.length;const t=ye[ve],i=S.querySelector(".preview-cs-card__rank"),a=S.querySelector(".preview-cs-card__suit");i&&(i.textContent=t[2]),a&&(a.textContent=t[0]),S.classList.remove("is-flying"),S.style.animation="none",S.offsetWidth,S.classList.add("is-flying"),S.style.animation=`cs-card-fly-in ${e}ms cubic-bezier(0.18, 0.89, 0.32, 1.18) both`},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* CardSharksOverlay.css */
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
        withAnimation(.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o} * 0.78)) {
            stage = 1
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + ${o} * 0.78) {
            withAnimation(.easeOut(duration: ${o} * 0.22)) { stage = 2 }
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
    <Animation id="fly" duration="${o}" easeFunction="outBack" repeat="false">
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
  · No idle motion after the animation completes.`}};function wt(e){switch(e.id){case"linear":return{name:"linear",note:""};case"ease":return{name:"inOutQuad",note:"Closest match to CSS ease."};case"ease-out":return{name:"outQuad",note:"Closest match to CSS ease-out."};case"ease-in":return{name:"inQuad",note:"Closest match to CSS ease-in."};case"ease-in-out":return{name:"inOutQuad",note:""};case"back-out":return{name:"outBack",note:"Built-in overshoot curve."};case"material":return{name:"inOutQuad",note:"Material standard ≈ inOutQuad."};case"glide":return{name:"outCubic",note:"Glide (0.3, 0.9, 0.3, 1) ≈ outCubic."};default:return{name:"inOutQuad",note:"Custom cubic-bezier — use FloatFieldInterpolator with hand-tuned key points if precision matters."}}}const d={ink:"#0c1240",gold:"#d9a80b",goldHi:"#ffc928",lav:"#7b7fd6",win:"#7bff3c",miss:"#ff2a2a",mine:"#0090ff",chipBg:"linear-gradient(180deg,#f6f9ff 0%,#e2eafb 55%,#b7cbef 100%)",font:"'Rubik', 'Helvetica Neue', Arial, sans-serif"},ie=`
.preview-si-board {
  position: relative;
  background: radial-gradient(120% 140% at 50% 0%, #1b2a7a 0%, #0a1033 60%, #060b24 100%);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  overflow: hidden;
  font-family: ${d.font};
}
.preview-si-chip {
  position: absolute;
  box-sizing: border-box;
  display: flex; align-items: center; justify-content: center;
  border-radius: 999px;
  background: ${d.chipBg};
  border: 2px solid #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.4);
  color: ${d.ink};
  font-weight: 600; font-size: 13px; letter-spacing: .02em; text-transform: uppercase;
  white-space: nowrap;
}
.preview-si-chip.is-focus {
  border: 3px solid ${d.gold};
  box-shadow: 0 0 12px rgba(255,200,0,0.4), 0 3px 6px rgba(0,0,0,0.4);
  z-index: 4;
}
.preview-si-ghost {
  position: absolute;
  box-sizing: border-box;
  border-radius: 999px;
  border: 2px dashed rgba(163,168,204,0.6);
}
`;function M(e,t){const i=t.focus?`3px solid ${d.gold}`:"2px solid #fff",a=t.focus?"0 0 10px rgba(255,200,0,0.45),":"";e.innerHTML=`
    <div style="
      width:130px;height:30px;box-sizing:border-box;
      display:flex;align-items:center;justify-content:center;
      border-radius:999px;background:${d.chipBg};border:${i};
      box-shadow:${a}0 2px 4px rgba(0,0,0,0.4);
      color:${d.ink};font-family:${d.font};font-weight:600;
      font-size:${t.fontSize??10}px;letter-spacing:.02em;text-transform:uppercase;
      transform:scale(${t.scale??1});
      ${t.extra??""}
    ">${t.text}</div>
  `}const Gt=`
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
`,yt=[20,78,136,194],st={left:24,top:104,width:160,height:40},Pt={left:300,top:yt[0],width:196,height:44};let h=null,le=null,je=[];function lt(){je.forEach(clearTimeout),je=[]}function Be(e,t){Object.assign(e.style,{left:`${t.left}px`,top:`${t.top}px`,width:`${t.width}px`,height:`${t.height}px`})}const Ut={id:"si-chip-place",title:"Answer → Slot",game:"Stack It",description:"Pressing OK on an answer chip glides it from the answer tray into the first free slot of the stack. The chip morphs to the slot size on the way, keeps the gold ring while the player chooses a slot, and a dashed ghost marks the spot it left. When five answers are placed, the sixth fills the last slot automatically after 450 ms.",defaults:{duration:450,easingId:"glide"},frames:[{label:"Picked",sublabel:"0% · in tray · gold ring",render:e=>M(e,{text:"Guitar",focus:!0})},{label:"Gliding",sublabel:"~40% · ~85% of the way (glide)",render:e=>M(e,{text:"Guitar",focus:!0,extra:"width:150px;transform:translateX(10px)"})},{label:"In slot",sublabel:"100% · slot size · font 13 → 14px",render:e=>M(e,{text:"Guitar",focus:!0,fontSize:11,extra:"width:160px"})},{label:"Locked",sublabel:"OK · ring → white · 200 ms",render:e=>M(e,{text:"Guitar",fontSize:11,extra:"width:160px"})}],render(e){return u("css-si-base",ie),u("css-si-chip-place",Gt),e.innerHTML=`
      <div class="preview-si-board preview-si-place">
        ${yt.map(t=>`<div class="preview-si-place__slot" style="top:${t}px"></div>`).join("")}
        <div class="preview-si-ghost"></div>
        <div class="preview-si-chip is-focus">Guitar</div>
      </div>
    `,h=e.querySelector(".preview-si-chip"),le=e.querySelector(".preview-si-ghost"),h&&Be(h,st),()=>{lt(),e.innerHTML="",h=null,le=null}},play({duration:e,easing:t}){if(!h||!le)return;lt();const i=m(t.bezier);h.style.transition="none",h.classList.add("is-focus"),h.classList.remove("is-in-slot"),le.style.opacity="0",Be(h,st),h.offsetWidth,h.style.transition=`left ${e}ms ${i}, top ${e}ms ${i}, width ${e}ms ease, height ${e}ms ease, font-size 200ms, border-color 200ms, box-shadow 200ms`,Be(h,Pt),h.classList.add("is-in-slot"),le.style.opacity="1",je.push(window.setTimeout(()=>h==null?void 0:h.classList.remove("is-focus"),e+500))},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2),s=m(t.bezier),p=wt(t);return{web:`/* StackItOverlay.css
   Chips are absolutely positioned; JS writes left/top/width/height in % of
   the 16:9 stage (tray cell or slot rect). The transition does the glide. */
.si-chip {
  position: absolute;
  border-radius: 999px;
  background: linear-gradient(180deg, #f6f9ff 0%, #e2eafb 55%, #b7cbef 100%);
  border: .2cqw solid #fff;
  font-size: 1.2cqw;
  transition:
    left   ${e}ms ${s},
    top    ${e}ms ${s},
    width  ${e}ms ease,
    height ${e}ms ease,
    transform .2s, border-color .2s, box-shadow .2s, font-size .2s;
}
.si-chip--in-slot { font-size: 1.3cqw; }
.si-chip--moving  { border: .32cqw solid ${d.gold}; box-shadow: 0 0 1.2cqw #ffc80066, 0 .25cqw .5cqw #0006; z-index: 4; }

/* Dashed outline left behind in the tray */
.si-ghost { border: .18cqw dashed #a3a8cc99; border-radius: 999px; transition: opacity .2s; }

@media (prefers-reduced-motion: reduce) { .si-chip { transition: none; } }`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.ui.unit.*

@Composable
fun StackChip(text: String, target: DpRect, moving: Boolean) {
    val glide = CubicBezierEasing(${i}f, ${a}f, ${r}f, ${n}f)
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
            .animation(.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o}), value: frame)
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
    <Animation id="glide" duration="${o}" easeFunction="${p.name}" repeat="false">
      <Vector2DFieldInterpolator id="move" fieldToInterp="m.top.translation" key="[ 0, 1 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    ' ${p.note||"Easing matches the catalog preset."}
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
  · Reduced-motion setting: chips jump instantly.`}},Wt=`
.preview-si-focus { width: 520px; height: 296px; }
.preview-si-focus .preview-si-chip { left: 150px; width: 220px; height: 42px; }
.preview-si-focus .preview-si-chip.is-big { transform: scale(1.09); font-size: 17px; z-index: 5; }
.preview-si-arrows {
  position: absolute; left: 384px; width: 20px; height: 38px;
  display: flex; flex-direction: column; justify-content: space-between; align-items: center;
}
.preview-si-arrows[hidden] { display: none; }
.preview-si-arrows i { width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; }
.preview-si-arrows i.up { border-bottom: 11px solid ${d.goldHi}; }
.preview-si-arrows i.dn { border-top: 11px solid ${d.goldHi}; }
.preview-si-arrows i.up.off { border-bottom-color: ${d.lav}; }
.preview-si-arrows i.dn.off { border-top-color: ${d.lav}; }
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
`,ce=[18,70,122,174],ct=["Guitar","Piano/Keyboard","Violin/Fiddle","Trumpet"],He=450,Yt=300,Xt="cubic-bezier(0.3, 0.9, 0.3, 1)";let v=[],y=null,Fe=null,Ge=[];function dt(){Ge.forEach(clearTimeout),Ge=[]}function xe(e,t){Fe&&(Fe.innerHTML=`<span>${e}</span><span class="preview-si-key">▲</span><span class="preview-si-key">▼</span><span>${t}</span><span class="preview-si-key">Ok</span>`)}const Kt={id:"si-focus",title:"Focus & Pick Up",game:"Stack It",description:'Remote focus on a chip. In the tray, focus is a gold ring with a soft glow. Once the stack is full, the focused block also grows to 109 % so it reads as "selectable". Pressing OK picks the block up: it shrinks back to 100 %, keeps the ring, and ▲ ▼ arrows appear next to it and travel with it. OK again drops the block: the arrows disappear and it grows back to the focused size.',defaults:{duration:200,easingId:"ease"},frames:[{label:"Idle",sublabel:"white 2px border",render:e=>M(e,{text:"Harp"})},{label:"Focus",sublabel:"tray · gold ring + glow",render:e=>M(e,{text:"Harp",focus:!0})},{label:"Focus (stack)",sublabel:"scale 1.09 · font 13 → 17px",render:e=>M(e,{text:"Harp",focus:!0,scale:1.09,fontSize:12})},{label:"Picked up",sublabel:"scale 1 · ring stays · ▲▼ shown",render:e=>M(e,{text:"Harp ▴▾",focus:!0})}],render(e){return u("css-si-base",ie),u("css-si-focus",Wt),e.innerHTML=`
      <div class="preview-si-board preview-si-focus">
        ${ct.map((t,i)=>`<div class="preview-si-chip" style="top:${ce[i]}px">${t}</div>`).join("")}
        <div class="preview-si-arrows" hidden><i class="up"></i><i class="dn"></i></div>
        <div class="preview-si-hint"></div>
      </div>
    `,v=Array.from(e.querySelectorAll(".preview-si-chip")),y=e.querySelector(".preview-si-arrows"),Fe=e.querySelector(".preview-si-hint"),v[0].classList.add("is-focus","is-big"),xe("Choose a block","OK pick it up"),()=>{dt(),e.innerHTML="",v=[],y=null,Fe=null}},play({duration:e,easing:t}){if(!v.length||!y)return;dt();const i=m(t.bezier),a=ct.map((f,w)=>w);let r=1;const n=()=>{a.forEach((f,w)=>{v[f].style.top=`${ce[w]}px`}),y&&(y.style.top=`${ce[r]+2}px`,y.children[0].classList.toggle("off",r<=0),y.children[1].classList.toggle("off",r>=ce.length-1))};v.forEach(f=>{f.style.transition="none",f.classList.remove("is-focus","is-big")}),y.style.transition="none",v[0].classList.add("is-focus","is-big"),y.hidden=!0,n(),xe("Choose a block","OK pick it up"),v[0].offsetWidth,v.forEach(f=>{f.style.transition=[...["transform","border-color","box-shadow","font-size"].map(w=>`${w} ${e}ms ${i}`),`top ${He}ms ${Xt}`].join(", ")}),y.style.transition=`top ${Yt}ms ease`;let o=150;const s=(f,w)=>{o+=f,Ge.push(window.setTimeout(w,o))};s(0,()=>{v[0].classList.remove("is-focus","is-big"),v[1].classList.add("is-focus","is-big")}),s(e+700,()=>{v[a[r]].classList.remove("is-big"),n(),y&&(y.hidden=!1),xe("Move","OK drop")});const p=()=>{r>=ce.length-1||([a[r],a[r+1]]=[a[r+1],a[r]],r+=1,n())};s(900,p),s(He+350,p),s(He+600,()=>{y&&(y.hidden=!0),v[a[r]].classList.add("is-big"),xe("Choose a block","OK pick it up")})},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2),s=m(t.bezier);return{web:`/* StackItOverlay.css */
.si-chip {
  border: .2cqw solid #fff;
  transition: transform ${e}ms ${s}, border-color ${e}ms ${s},
              box-shadow ${e}ms ${s}, font-size ${e}ms ${s};
}

/* Remote focus (tray) and picked-up block (stack) share the gold ring */
.si-chip--focus,
.si-chip--moving {
  border: .32cqw solid ${d.gold};
  box-shadow: 0 0 1.2cqw #ffc80066, 0 .25cqw .5cqw #0006;
  z-index: 4;
}

/* Focus while the stack is full ("Choose a block") */
.si-chip--big { transform: scale(1.09); font-size: 1.55cqw; z-index: 5; }

/* ▲ ▼ next to the picked-up block; lavender when that direction is blocked */
.si-arrows      { transition: top .3s; }
.si-arrows .up  { border-bottom: 1.1cqw solid ${d.goldHi}; }
.si-arrows .dn  { border-top:    1.1cqw solid ${d.goldHi}; }
.si-arrows .up.off { border-bottom-color: ${d.lav}; }
.si-arrows .dn.off { border-top-color:    ${d.lav}; }`,android:`// Jetpack Compose — Android TV
@Composable
fun StackBlock(text: String, focused: Boolean, stackFull: Boolean, pickedUp: Boolean) {
    val easing = CubicBezierEasing(${i}f, ${a}f, ${r}f, ${n}f)
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
            .animation(.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o}), value: focused)
            .animation(.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o}), value: pickedUp)
    }
}`,roku:`<!-- Roku SceneGraph — components/StackBlock.xml -->
<component name="StackBlock" extends="Group">
  <interface>
    <field id="state" type="string" onChange="onStateChange" /> <!-- idle | focus | big | picked -->
  </interface>
  <children>
    <Poster id="ring" uri="pkg:/images/chip_ring_gold.png" opacity="0" />
    <Poster id="bg"   uri="pkg:/images/chip_9patch.png" />
    <Animation id="anim" duration="${o}" easeFunction="inOutQuad">
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
  · Back while a block is picked up restores the stack order from before the pick-up.`}},Qt=`
.preview-si-reorder { width: 520px; height: 236px; }
.preview-si-reorder .preview-si-chip { left: 150px; width: 220px; height: 42px; }
.preview-si-reorder .preview-si-arrows {
  position: absolute; left: 384px; width: 20px; height: 38px;
  display: flex; flex-direction: column; justify-content: space-between; align-items: center;
}
.preview-si-reorder .preview-si-arrows i { width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; }
.preview-si-reorder .preview-si-arrows i.up { border-bottom: 11px solid ${d.goldHi}; }
.preview-si-reorder .preview-si-arrows i.dn { border-top: 11px solid ${d.goldHi}; }
.preview-si-reorder .preview-si-arrows i.up.off { border-bottom-color: ${d.lav}; }
.preview-si-reorder .preview-si-arrows i.dn.off { border-top-color: ${d.lav}; }
`,Ce=[20,72,124,176],Ne=["Harp","Guitar","Trumpet","Bagpipes"],pt=300/450;let j=[],_=null,V=[],F=0,Pe=[];function ft(){Pe.forEach(clearTimeout),Pe=[]}function Ue(){V.forEach((e,t)=>{j[e].style.top=`${Ce[t]}px`}),j.forEach((e,t)=>e.classList.toggle("is-focus",t===V[F])),_&&(_.style.top=`${Ce[F]+2}px`,_.children[0].classList.toggle("off",F<=0),_.children[1].classList.toggle("off",F>=Ce.length-1))}function Jt(e){const t=F+e;t<0||t>=Ce.length||([V[F],V[t]]=[V[t],V[F]],F=t,Ue())}function De(e,t,i){const a=(r,n,o)=>`
    <div style="
      position:absolute;left:10px;top:${n}px;width:120px;height:24px;box-sizing:border-box;
      display:flex;align-items:center;justify-content:center;border-radius:999px;
      background:${d.chipBg};border:${o?`2.5px solid ${d.gold}`:"1.5px solid #fff"};
      box-shadow:${o?"0 0 8px rgba(255,200,0,0.45),":""}0 2px 4px rgba(0,0,0,0.4);
      color:${d.ink};font-family:${d.font};font-weight:600;font-size:9px;text-transform:uppercase;
      z-index:${o?2:1};
    ">${r}</div>`;e.innerHTML=`
    <div style="position:relative;width:160px;height:58px;">
      ${a("Guitar",t[1],!1)}
      ${a("Harp",t[0],!0)}
      <div style="position:absolute;left:138px;top:${i}px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:7px solid ${d.goldHi};"></div>
      <div style="position:absolute;left:138px;top:${i+15}px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:7px solid ${d.goldHi};"></div>
    </div>`}const Zt={id:"si-reorder",title:"Block Swap",game:"Stack It",description:"While the timer runs, the player can pick up a block and move it with ▲ ▼. Each press swaps the block with its neighbour: both blocks glide past each other at the same time, and the ▲ ▼ arrows follow a bit faster. An arrow turns lavender at the top or bottom of the stack.",defaults:{duration:450,easingId:"glide"},frames:[{label:"Picked up",sublabel:"slot 1 · gold ring · ▲▼",render:e=>De(e,[4,32],6)},{label:"Crossing",sublabel:"~40% · blocks pass each other",render:e=>De(e,[26,10],26)},{label:"Swapped",sublabel:"100% · slot 2 · arrows land at 67%",render:e=>De(e,[32,4],34)}],render(e){return u("css-si-base",ie),u("css-si-reorder",Qt),e.innerHTML=`
      <div class="preview-si-board preview-si-reorder">
        ${Ne.map(t=>`<div class="preview-si-chip">${t}</div>`).join("")}
        <div class="preview-si-arrows"><i class="up"></i><i class="dn"></i></div>
      </div>
    `,j=Array.from(e.querySelectorAll(".preview-si-chip")),_=e.querySelector(".preview-si-arrows"),V=Ne.map((t,i)=>i),F=0,Ue(),()=>{ft(),e.innerHTML="",j=[],_=null}},play({duration:e,easing:t}){if(!j.length||!_)return;ft();const i=m(t.bezier);j.forEach(r=>{r.style.transition="none"}),_.style.transition="none",V=Ne.map((r,n)=>n),F=0,Ue(),_.offsetWidth,j.forEach(r=>{r.style.transition=`top ${e}ms ${i}, border-color 200ms, box-shadow 200ms`}),_.style.transition=`top ${Math.round(e*pt)}ms ease`;const a=e+350;[1,1,-1].forEach((r,n)=>{Pe.push(window.setTimeout(()=>Jt(r),150+n*a))})},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2),s=Math.round(e*pt),p=m(t.bezier),f=wt(t);return{web:`/* StackItOverlay.css
   Swap = exchange the two blocks' slot indices and re-write their "top".
   Both blocks transition at once, so they glide past each other. */
.si-chip {
  position: absolute;
  transition: top ${e}ms ${p}, left ${e}ms ${p},
              border-color .2s, box-shadow .2s;
}
.si-chip--moving { z-index: 4; } /* picked-up block passes over its neighbour */

.si-arrows { position: absolute; transition: top ${s}ms ease; }

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
    val glide = CubicBezierEasing(${i}f, ${a}f, ${r}f, ${n}f)
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
        val arrowY by animateDpAsState(slotTops[picked], tween(${s}), label = "arrows")
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
                .animation(.easeInOut(duration: ${(s/1e3).toFixed(2)}), value: picked)
        }
        .animation(.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o}), value: order)
    }
}`,roku:`' Roku SceneGraph — StackColumn.brs
' One Animation with two interpolators: picked block and its neighbour swap Y.
sub moveBlock(dir as integer)
  toSlot = m.sel + dir
  if toSlot < 0 or toSlot > 5 then return
  a = m.blocks[m.sel] : b = m.blocks[toSlot]
  m.blocks[m.sel] = b : m.blocks[toSlot] = a

  anim = createObject("roSGNode", "Animation")
  anim.duration = ${o}
  anim.easeFunction = "${f.name}"   ' ${f.note||"matches catalog preset"}
  anim.appendChild(slideTo(a, m.slotY[toSlot]))
  anim.appendChild(slideTo(b, m.slotY[m.sel]))
  m.top.appendChild(anim)
  anim.control = "start"

  m.sel = toSlot
  m.arrowAnim.duration = ${(s/1e3).toFixed(2)}
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
  · When the timer hits 0:00 during a move, the current order is what gets scored.`}},ei=`
.preview-si-clock { width: 320px; height: 150px; display: flex; align-items: center; justify-content: center; }
.preview-si-clock__value {
  font-weight: 600; font-size: 64px; line-height: 1; color: #fff;
  font-variant-numeric: tabular-nums;
  transition: color 200ms;
}
.preview-si-clock__value.is-low { color: #ffd5d5; }
@keyframes si-clock-pulse { 50% { transform: scale(1.08); } }
`,ut=13,ti=10;let C=null,_e;function mt(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function qe(){_e!==void 0&&(clearInterval(_e),_e=void 0)}function ke(e,t,i,a){e.innerHTML=`
    <div style="
      font-family:${d.font};font-weight:600;font-size:32px;line-height:1;
      color:${i?"#ffd5d5":"#fff"};font-variant-numeric:tabular-nums;
      transform:scale(${a});
    ">${t}</div>
  `}const ii={id:"si-clock-pulse",title:"Timer Low Pulse",game:"Stack It",description:"The round clock at the top of the screen counts down from 1:00. In the last 10 seconds the digits turn pale red and breathe: they scale up to 108 % and back once per second. At 0:00 the pulse stops and the results screen opens.",defaults:{duration:1e3,easingId:"ease-in-out"},slowFactor:2,frames:[{label:"Normal",sublabel:"> 0:10 · white · no motion",render:e=>ke(e,"0:24",!1,1)},{label:"Low",sublabel:"≤ 0:10 · #FFD5D5 · scale 1",render:e=>ke(e,"0:09",!0,1)},{label:"Peak",sublabel:"50% of cycle · scale 1.08",render:e=>ke(e,"0:09",!0,1.08)},{label:"Time up",sublabel:"0:00 · pulse stops",render:e=>ke(e,"0:00",!1,1)}],render(e){return u("css-si-base",ie),u("css-si-clock",ei),e.innerHTML=`
      <div class="preview-si-board preview-si-clock">
        <div class="preview-si-clock__value">${mt(ut)}</div>
      </div>
    `,C=e.querySelector(".preview-si-clock__value"),()=>{qe(),e.innerHTML="",C=null}},play({duration:e,easing:t}){if(!C)return;qe();const i=m(t.bezier);let a=ut;const r=()=>{if(!C)return;C.textContent=mt(a);const n=a<=ti&&a>0;n!==C.classList.contains("is-low")&&(C.classList.toggle("is-low",n),C.style.animation=n?`si-clock-pulse ${e}ms ${i} infinite`:"none")};C.classList.remove("is-low"),C.style.animation="none",r(),_e=window.setInterval(()=>{a-=1,r(),a<=0&&qe()},1e3)},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2),s=(e/2e3).toFixed(2),p=m(t.bezier);return{web:`/* StackItOverlay.css */
.si-clock {
  position: absolute; left: 50.45%; top: 7.4%;
  transform: translate(-50%, -50%);
  font-weight: 600; font-size: 4cqw; color: #fff;
  font-variant-numeric: tabular-nums;
}
/* Added while 0 < secondsLeft <= 10 */
.si-clock--low {
  color: #ffd5d5;
  animation: si-clock-pulse ${e}ms ${p} infinite;
}
/* Keep the centering translate inside the keyframe */
@keyframes si-clock-pulse {
  50% { transform: translate(-50%, -50%) scale(1.08); }
}
@media (prefers-reduced-motion: reduce) { .si-clock--low { animation: none; } }`,android:`// Jetpack Compose — Android TV
@Composable
fun RoundClock(secondsLeft: Int) {
    val low = secondsLeft in 1..10
    val pulse by rememberInfiniteTransition(label = "pulse").animateFloat(
        initialValue = 1f, targetValue = 1.08f,
        animationSpec = infiniteRepeatable(
            tween(${Math.round(e/2)}, easing = CubicBezierEasing(${i}f, ${a}f, ${r}f, ${n}f)),
            RepeatMode.Reverse
        ), label = "scale"
    )
    val scale = if (low) pulse else 1f
    Text(
        "%d:%02d".format(secondsLeft / 60, secondsLeft % 60),
        color = if (low) Color(0xFFFFD5D5) else Color.White,
        fontWeight = FontWeight.SemiBold,
        modifier = Modifier.graphicsLayer { scaleX = scale; scaleY = scale }
    )
}`,ios:`// SwiftUI — tvOS
struct RoundClock: View {
    let secondsLeft: Int
    @State private var pulse = false
    var low: Bool { (1...10).contains(secondsLeft) }

    var body: some View {
        Text(String(format: "%d:%02d", secondsLeft / 60, secondsLeft % 60))
            .font(.custom("Rubik-SemiBold", size: 64)).monospacedDigit()
            .foregroundColor(low ? Color(red: 1, green: 0.84, blue: 0.84) : .white)
            .scaleEffect(low && pulse ? 1.08 : 1)
            .animation(low ? .timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${s}).repeatForever(autoreverses: true)
                           : .default, value: pulse)
            .onChange(of: low) { pulse = $0 }
    }
}`,roku:`<!-- Roku SceneGraph — components/RoundClock.xml -->
<component name="RoundClock" extends="Group">
  <interface>
    <field id="secondsLeft" type="integer" onChange="onTick" />
  </interface>
  <children>
    <Label id="value" font="font:LargeBoldSystemFont" horizAlign="center" />
    <Animation id="pulse" duration="${o}" repeat="true" easeFunction="inOutQuad">
      <Vector2DFieldInterpolator fieldToInterp="value.scale"
        key="[0, 0.5, 1]" keyValue="[[1,1], [1.08,1.08], [1,1]]" />
    </Animation>
  </children>
  <script type="text/brightscript">
    sub onTick()
      s = m.top.secondsLeft
      lbl = m.top.findNode("value")
      lbl.text = (s \\ 60).toStr() + ":" + Right("0" + (s MOD 60).toStr(), 2)
      low = s > 0 and s <= 10
      pulse = m.top.findNode("pulse")
      if low then
        lbl.color = "0xFFD5D5FF"
        if pulse.state <> "running" then pulse.control = "start"
      else
        lbl.color = "0xFFFFFFFF"
        pulse.control = "stop"
        lbl.scale = [1, 1]
      end if
    end sub
  <\/script>
</component>`}},pmTicket(){return`Title: Stack It — Round clock "last 10 seconds" pulse

Trigger: round timer (60 s per round) reaches 0:10.

Visual behavior:
  · Clock digits change from white to pale red (#FFD5D5).
  · Digits pulse continuously: scale 1 → 1.08 → 1, one cycle per second, anchored at the clock centre.
  · At 0:00 the pulse stops, digits return to white, and the results screen fades in.

Timings:
  · Pulse cycle: 1000 ms, ease-in-out, infinite (peak at 50%).
  · Countdown updates every second (tabular digits — no width jitter).

Acceptance criteria:
  · Pulse starts exactly at 0:10 and runs through 0:01.
  · Pressing "End timer" / time-out stops the pulse immediately.
  · Reduced-motion setting: colour change only, no scaling.`}},ri=`
.preview-si-results { width: 600px; height: 330px; }
.preview-si-results__screen { position: absolute; inset: 0; opacity: 0; }
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
.preview-si-results__cell.su { border: 3px solid transparent; }
.preview-si-results__cell.su.match { border-color: ${d.win}; box-shadow: 0 0 10px #7bff3c88, inset 0 0 6px #7bff3c55; }
.preview-si-results__cell.su.miss  { border-color: ${d.miss}; box-shadow: 0 0 10px #ff2a2a88, inset 0 0 6px #ff2a2a55; }
.preview-si-results__cell.mine { background: ${d.mine}; border: 4px solid #fff; }
.preview-si-results__cell.mine.hide  { opacity: 0; transform: translateX(20px); }
.preview-si-results__cell.mine.match { border-color: ${d.win}; box-shadow: 0 0 10px #7bff3c66; }
.preview-si-results__cell.mine.miss  { border-color: ${d.miss}; box-shadow: 0 0 10px #ff2a2a66; }
.preview-si-results__count {
  position: absolute; left: 50%; top: 298px; transform: translateX(-50%);
  font-weight: 700; font-size: 15px; letter-spacing: .02em; text-transform: uppercase; color: #fff;
  white-space: nowrap; opacity: 0;
}
.preview-si-results__count b { color: #f2c230; }
`,te=["Guitar","Piano/Keyboard","Violin/Fiddle","Trumpet","Harp","Bagpipes"],Te=["Piano/Keyboard","Guitar","Violin/Fiddle","Trumpet","Bagpipes","Harp"],Ae=["Guitar","Piano/Keyboard","Trumpet","Violin/Fiddle","Harp","Bagpipes"],Y={su:16,key:210,mine:404},ai=e=>44+e*41,l={screenFade:500,suStart:500,mineStart:700,stagger:350,step:350,countFade:400};let R=null,X=[],K=[],O=null,pe=[];function bt(){pe.forEach(clearTimeout),pe=[]}function $e(e,t){const i=(r,n,o,s="")=>`
    <div style="height:12px;border-radius:999px;background:${r};border:${n};box-sizing:border-box;
      font:600 6px ${d.font};color:#fff;display:flex;align-items:center;justify-content:center;text-transform:uppercase;${s}">${o}</div>`,a=[0,1,2].map(r=>{const n=r<t.su?`1.5px solid ${Te[r]===te[r]?d.win:d.miss}`:"1.5px solid transparent",o=r<t.mine,s=o?`1.5px solid ${Ae[r]===te[r]?d.win:d.miss}`:"1.5px solid #fff";return`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;">
      ${i("rgba(30,44,140,0.75)",n,Te[r])}
      ${i("rgba(30,44,140,0.75)","1.5px solid transparent",te[r])}
      ${i(d.mine,s,Ae[r],o?"":"opacity:0;transform:translateX(6px);")}
    </div>`}).join("");e.innerHTML=`
    <div style="width:170px;display:flex;flex-direction:column;gap:3px;opacity:${t.screen};">
      ${a}
      <div style="font:700 7px ${d.font};color:#fff;text-align:center;text-transform:uppercase;opacity:${t.count?1:0};">
        <b style="color:#f2c230">4 of 6</b> in the right spot</div>
    </div>`}const oi={id:"si-results-reveal",title:"Results Reveal",game:"Stack It",description:'At 0:00 the results screen fades in with three columns: Su’s stack, the correct stack and the player’s stack. Row by row, top to bottom, Su’s answers get a green (right slot) or red (wrong slot) ring, and the player’s blocks slide in from the right with their own green/red ring. The "N of 6 in the right spot" line fades in last.',defaults:{duration:350,easingId:"ease"},slowFactor:3,frames:[{label:"Fade in",sublabel:"0–500 ms · screen opacity 0 → 1",render:e=>$e(e,{screen:.5,su:0,mine:0,count:!1})},{label:"Row 1",sublabel:"500 ms Su ring · 700 ms yours slides",render:e=>$e(e,{screen:1,su:1,mine:1,count:!1})},{label:"Cascade",sublabel:"+350 ms per row",render:e=>$e(e,{screen:1,su:3,mine:2,count:!1})},{label:"Count",sublabel:"2800 ms · score line fades in",render:e=>$e(e,{screen:1,su:3,mine:3,count:!0})}],render(e){u("css-si-base",ie),u("css-si-results",ri);const t=(i,a,r)=>r.map((n,o)=>`<div class="preview-si-results__cell ${i}" style="left:${a}px;top:${ai(o)}px">${n}</div>`).join("");return e.innerHTML=`
      <div class="preview-si-board preview-si-results">
        <div class="preview-si-results__screen">
          <div class="preview-si-results__head" style="left:${Y.su}px">SU’S STACK</div>
          <div class="preview-si-results__head" style="left:${Y.key}px">CORRECT STACK</div>
          <div class="preview-si-results__head" style="left:${Y.mine}px">YOUR STACK</div>
          ${t("su",Y.su,Te)}
          ${t("key",Y.key,te)}
          ${t("mine hide",Y.mine,Ae)}
          <div class="preview-si-results__count"><b>4 of 6</b> in the right spot</div>
        </div>
      </div>
    `,R=e.querySelector(".preview-si-results__screen"),X=Array.from(e.querySelectorAll(".preview-si-results__cell.su")),K=Array.from(e.querySelectorAll(".preview-si-results__cell.mine")),O=e.querySelector(".preview-si-results__count"),()=>{bt(),e.innerHTML="",R=null,X=[],K=[],O=null}},play({duration:e,easing:t}){if(!R||!O)return;bt();const i=m(t.bezier),a=e/l.step,r=o=>Math.round(o*a);[R,O,...X,...K].forEach(o=>{o.style.transition="none"}),R.style.opacity="0",O.style.opacity="0",X.forEach(o=>o.classList.remove("match","miss")),K.forEach(o=>{o.classList.remove("match","miss"),o.classList.add("hide")}),R.offsetWidth,R.style.transition=`opacity ${r(l.screenFade)}ms ${i}`,O.style.transition=`opacity ${r(l.countFade)}ms ${i}`,X.forEach(o=>{o.style.transition=`border-color ${e}ms ${i}, box-shadow ${e}ms ${i}`}),K.forEach(o=>{o.style.transition=["opacity","transform","border-color","box-shadow"].map(s=>`${s} ${e}ms ${i}`).join(", ")}),R.style.opacity="1",X.forEach((o,s)=>pe.push(window.setTimeout(()=>{o.classList.add(Te[s]===te[s]?"match":"miss")},r(l.suStart+s*l.stagger)))),K.forEach((o,s)=>pe.push(window.setTimeout(()=>{o.classList.remove("hide"),o.classList.add(Ae[s]===te[s]?"match":"miss")},r(l.mineStart+s*l.stagger)))),pe.push(window.setTimeout(()=>{O&&(O.style.opacity="1")},r(l.mineStart+6*l.stagger)))},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=m(t.bezier),s=e/l.step,p=w=>Math.round(w*s),f=w=>(p(w)/1e3).toFixed(2);return{web:`/* StackItResults.css */
.si-screen        { opacity: 0; transition: opacity ${p(l.screenFade)}ms ${o}; pointer-events: none; }
.si-screen--show  { opacity: 1; pointer-events: auto; }

.si-su            { border: .5cqw solid transparent; border-radius: 999px;
                    transition: border-color ${e}ms ${o}, box-shadow ${e}ms ${o}; }
.si-su--match     { border-color: ${d.win};  box-shadow: 0 0 1cqw #7bff3c88, inset 0 0 .6cqw #7bff3c55; }
.si-su--miss      { border-color: ${d.miss}; box-shadow: 0 0 1cqw #ff2a2a88, inset 0 0 .6cqw #ff2a2a55; }

.si-mine          { background: ${d.mine}; border: .63cqw solid #fff; border-radius: 999px;
                    transition: opacity ${e}ms ${o}, transform ${e}ms ${o}, border-color ${e}ms ${o}; }
.si-mine--hide    { opacity: 0; transform: translateX(2cqw); }
.si-mine--match   { border-color: ${d.win};  box-shadow: 0 0 1cqw #7bff3c66; }
.si-mine--miss    { border-color: ${d.miss}; box-shadow: 0 0 1cqw #ff2a2a66; }

.si-count         { opacity: 0; transition: opacity ${p(l.countFade)}ms ${o}; }
.si-count--on     { opacity: 1; }

// StackItResults.ts — staggered reveal
screen.classList.add('si-screen--show');
for (let r = 0; r < 6; r++) {
  later(() => su[r].classList.add(suStack[r] === key[r] ? 'si-su--match' : 'si-su--miss'), ${p(l.suStart)} + r * ${p(l.stagger)});
  later(() => {
    mine[r].classList.remove('si-mine--hide');
    if (yours[r]) mine[r].classList.add(yours[r] === key[r] ? 'si-mine--match' : 'si-mine--miss');
  }, ${p(l.mineStart)} + r * ${p(l.stagger)});
}
later(() => count.classList.add('si-count--on'), ${p(l.mineStart+6*l.stagger)});
later(showRoundComplete, ${p(l.mineStart+6*l.stagger)} + 3000);`,android:`// Jetpack Compose — Android TV
@Composable
fun ResultsReveal(su: List<String>, key: List<String>, yours: List<String?>, onDone: () -> Unit) {
    val ez = CubicBezierEasing(${i}f, ${a}f, ${r}f, ${n}f)
    var step by remember { mutableIntStateOf(-1) }   // ms elapsed bucket
    LaunchedEffect(Unit) {
        val start = withFrameMillis { it }
        while (true) {
            step = (withFrameMillis { it } - start).toInt()
            if (step > ${p(l.mineStart+6*l.stagger)} + 3000) { onDone(); break }
        }
    }
    val screenAlpha by animateFloatAsState(if (step >= 0) 1f else 0f, tween(${p(l.screenFade)}, easing = ez), label = "screen")
    Box(Modifier.alpha(screenAlpha)) {
        repeat(6) { r ->
            val suOn = step >= ${p(l.suStart)} + r * ${p(l.stagger)}
            val mineOn = step >= ${p(l.mineStart)} + r * ${p(l.stagger)}
            val suRing by animateColorAsState(
                when { !suOn -> Color.Transparent; su[r] == key[r] -> Color(0xFF7BFF3C); else -> Color(0xFFFF2A2A) },
                tween(${e}, easing = ez), label = "su$r")
            val mineAlpha by animateFloatAsState(if (mineOn) 1f else 0f, tween(${e}, easing = ez), label = "ma$r")
            val mineDx by animateDpAsState(if (mineOn) 0.dp else 24.dp, tween(${e}, easing = ez), label = "mx$r")
            ResultRow(r, suRing, mineAlpha, mineDx, su[r], key[r], yours[r])
        }
        val countOn = step >= ${p(l.mineStart+6*l.stagger)}
        val countAlpha by animateFloatAsState(if (countOn) 1f else 0f, tween(${p(l.countFade)}), label = "count")
        CountLine(Modifier.alpha(countAlpha))
    }
}`,ios:`// SwiftUI — tvOS
struct ResultsReveal: View {
    let su: [String], key: [String], yours: [String?]
    @State private var shown = false
    @State private var suRows = 0
    @State private var mineRows = 0
    @State private var countOn = false
    private let curve = Animation.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${f(l.step)})

    var body: some View {
        ResultsGrid(su: su, key: key, yours: yours, suRows: suRows, mineRows: mineRows, countOn: countOn)
            .opacity(shown ? 1 : 0)
            .task {
                withAnimation(.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${f(l.screenFade)})) { shown = true }
                for r in 0..<6 {
                    after(${f(l.suStart)} + Double(r) * ${f(l.stagger)}) { withAnimation(curve) { suRows = r + 1 } }
                    after(${f(l.mineStart)} + Double(r) * ${f(l.stagger)}) { withAnimation(curve) { mineRows = r + 1 } }
                }
                after(${f(l.mineStart+6*l.stagger)}) { withAnimation(.easeInOut(duration: ${f(l.countFade)})) { countOn = true } }
            }
    }
    private func after(_ s: Double, _ f: @escaping () -> Void) {
        DispatchQueue.main.asyncAfter(deadline: .now() + s, execute: f)
    }
}
// In ResultsGrid: mine row r → .opacity(r < mineRows ? 1 : 0).offset(x: r < mineRows ? 0 : 24)
//                 su row r   → ring colour green/red when r < suRows, clear otherwise.`,roku:`' Roku SceneGraph — StackItResults.brs
' Build one Animation per row; set its delay so rows cascade.
sub revealResults()
  m.top.findNode("screenFade").control = "start"     ' opacity 0 → 1, ${f(l.screenFade)} s
  for r = 0 to 5
    su = m.suRows[r]
    su.findNode("ring").blendColor = iifColor(m.su[r] = m.key[r])
    suAnim = fadeAnim(su.findNode("ring"), ${f(l.step)})
    suAnim.delay = ${f(l.suStart)} + r * ${f(l.stagger)}
    suAnim.control = "start"

    mine = m.mineRows[r]
    mine.findNode("ring").blendColor = iifColor(m.yours[r] = m.key[r])
    mineAnim = slideFadeAnim(mine, 24, ${f(l.step)})   ' translation x +24 → 0, opacity 0 → 1
    mineAnim.delay = ${f(l.mineStart)} + r * ${f(l.stagger)}
    mineAnim.control = "start"
  end for
  countAnim = fadeAnim(m.top.findNode("count"), ${f(l.countFade)})
  countAnim.delay = ${f(l.mineStart+6*l.stagger)}
  countAnim.control = "start"
end sub

function iifColor(ok as boolean) as string
  if ok then return "0x7BFF3CFF"
  return "0xFF2A2AFF"
end function`}},pmTicket(){return`Title: Stack It — Results screen staggered reveal

Trigger: round timer reaches 0:00 (or the host presses "End timer").

Visual behavior:
  · The results screen cross-fades over the game screen.
  · Three columns: SU’S STACK (left), CORRECT STACK (centre, static), YOUR STACK (right).
  · Row by row, top to bottom: Su’s answer gets a green ring (#7BFF3C, right slot) or red ring (#FF2A2A, wrong slot).
  · 200 ms after Su’s ring, the player’s block in the same row slides in from the right (+2 cqw → 0) while fading in, with its own green/red ring. Empty slots show "—" without a ring.
  · After the last row, "N of 6 in the right spot" fades in at the bottom (N in yellow #F2C230).
  · 3 s later the Round Complete screen appears automatically; OK skips ahead.

Timings:
  · Screen fade: 500 ms. Rings and block slide-in: 350 ms each.
  · Su row r: 500 + 350·r ms. Your row r: 700 + 350·r ms.
  · Count line: at 2800 ms, 400 ms fade. Auto-advance: 5800 ms.

Acceptance criteria:
  · Scoring is final before the reveal starts — animation is presentational only.
  · OK during the reveal jumps straight to Round Complete (no half-revealed state lingers).
  · Reduced-motion setting: all rows appear at once with their rings.`}},Ye="linear-gradient(90deg,#030308 0%,#030308 26%,#121a78 40%,#2a33dc 50%,#121a78 60%,#030308 74%,#030308 100%)",Xe="linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(170,210,255,0.55) 50%,rgba(255,255,255,0) 100%)",N=500,g=200,q=300,E=1100,Q=2600,ni=`
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
  background: ${Ye};
  opacity: 0;
}
.preview-si-round__side { font-weight: 600; font-size: 14px; letter-spacing: .03em; text-transform: uppercase; }
.preview-si-round__side b { color: #f2c230; font-size: 19px; margin-left: 5px; }
.preview-si-round__side.r { text-align: right; }
.preview-si-round__mid { font-weight: 500; font-size: 24px; }
.preview-si-round__sweep { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.preview-si-round__sweep::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: -45%; width: 45%;
  background: ${Xe};
}
.preview-si-round__sweep.is-on::after {
  animation: si-round-sweep ${E}ms cubic-bezier(0.4, 0, 0.2, 1) var(--sweep-delay, ${q}ms) both;
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
`;let D=null,J=null,Z=null;function de(e,t){const{mid:i="Round Complete!",round:a="1/3",score:r=4}=t;e.innerHTML=`
    <div style="
      position:relative;overflow:hidden;
      width:170px;height:30px;border-radius:4px;box-sizing:border-box;padding:0 6px;
      display:grid;grid-template-columns:1fr auto 1fr;align-items:center;
      font-family:'Roboto Condensed','Arial Narrow',sans-serif;color:#fff;
      background:${Ye};
      transform:translateY(${t.y}px) scale(${t.scale});opacity:${t.opacity};
    ">
      <span style="font-size:7px;font-weight:600;text-transform:uppercase;">Round <b style="color:#f2c230">${a}</b></span>
      <span style="font-size:10px;font-weight:500;">${i}</span>
      <span style="font-size:7px;font-weight:600;text-transform:uppercase;text-align:right;">Score <b style="color:#f2c230">${r}</b></span>
      ${t.sweep!==null?`<div style="position:absolute;top:0;bottom:0;width:45%;left:${t.sweep}%;background:${Xe};"></div>`:""}
    </div>`}const si={id:"si-round-complete",title:"Round Complete",game:"Stack It",description:'Three seconds after the results count appears, the Round Complete background fades over the results and the score bar drops in from above with a soft overshoot — the same banner motion as Family Feud. A light band sweeps across the bar once, then the bar keeps a slow brightness pulse. After the final round the centre reads "Game Complete!". The next round starts automatically after 6 s; OK skips ahead.',defaults:{duration:620,easingId:"ease-out"},frames:[{label:"Start",sublabel:"bg fade 500 ms · bar hidden",render:e=>de(e,{y:-14,scale:.94,opacity:.15,sweep:null})},{label:"Drop-in",sublabel:"+200 ms · translateY −40 → 0 · .94 → 1",render:e=>de(e,{y:-6,scale:.97,opacity:.6,sweep:null})},{label:"Sweep",sublabel:"+300 ms · light band 1100 ms",render:e=>de(e,{y:0,scale:1,opacity:1,sweep:30})},{label:"Idle",sublabel:"brightness pulse 2.6 s loop",render:e=>de(e,{y:0,scale:1,opacity:1,sweep:null})},{label:"Final",sublabel:"round 3 · no auto-advance",render:e=>de(e,{y:0,scale:1,opacity:1,sweep:null,mid:"Game Complete!",round:"3/3",score:39})}],render(e){return u("css-si-base",ie),u("css-si-round",ni),e.innerHTML=`
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
    `,D=e.querySelector(".preview-si-round__screen"),J=e.querySelector(".preview-si-round__bar"),Z=e.querySelector(".preview-si-round__sweep"),()=>{e.innerHTML="",D=null,J=null,Z=null}},play({duration:e,easing:t}){if(!D||!J||!Z)return;const i=m(t.bezier);D.style.transition="none",D.style.opacity="0",J.style.animation="none",Z.classList.remove("is-on"),J.offsetWidth,D.style.transition=`opacity ${N}ms ease`,D.style.opacity="1",J.style.animation=`si-round-in ${e}ms ${i} ${g}ms both, si-round-pulse ${Q}ms ease-in-out ${g+e+E}ms infinite`,Z.style.setProperty("--sweep-delay",`${g+q}ms`),Z.classList.add("is-on")},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2),s=m(t.bezier),p=g+e+E;return{web:`/* StackItOverlay.css — Round Complete screen (banner motion shared with Family Feud) */
.si-screen {
  position: absolute; inset: 0; z-index: 10;
  opacity: 0; pointer-events: none;
  transition: opacity ${N}ms;
}
.si-screen--show { opacity: 1; pointer-events: auto; }

.si-round-bar {
  position: absolute; left: 4.76%; width: 90%; top: 44%; height: 11.2%;
  border-radius: .9cqw; padding: 0 2.4cqw; overflow: hidden;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  font-family: "Roboto Condensed", "Arial Narrow", sans-serif; color: #fff;
  background: ${Ye};
}
.si-screen--show .si-round-bar {
  animation:
    si-round-in    ${e}ms ${s} ${g}ms both,
    si-round-pulse ${Q}ms ease-in-out ${p}ms infinite;
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
  background: ${Xe};
}
.si-screen--show .si-round-bar::after {
  animation: si-round-sweep ${E}ms cubic-bezier(0.4, 0, 0.2, 1) ${g+q}ms both;
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
    val easing = CubicBezierEasing(${i}f, ${a}f, ${r}f, ${n}f)
    AnimatedVisibility(visible, enter = fadeIn(tween(${N})), exit = fadeOut(tween(${N}))) {
        Box(Modifier.fillMaxSize().paint(painterResource(R.drawable.si_round_bg), contentScale = ContentScale.FillBounds)) {
            val shown = remember { MutableTransitionState(false) }.apply { targetState = true }
            AnimatedVisibility(
                visibleState = shown,
                enter = slideInVertically(tween(${e}, ${g}, easing)) { -40 } +
                        scaleIn(tween(${e}, ${g}, easing), initialScale = 0.94f) +
                        fadeIn(tween(${e}, ${g}, easing))
            ) {
                // Sweep: gradient strip x −45% → 100%, ${E} ms, delay ${g+q} ms.
                // Pulse: brightness 1 → 1.3 → 1, ${Q} ms loop, starts at ${p} ms.
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
        .transition(.opacity.animation(.easeInOut(duration: ${(N/1e3).toFixed(2)})))
        .onAppear {
            withAnimation(.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o}).delay(${(g/1e3).toFixed(2)})) { barIn = true }
            withAnimation(.timingCurve(0.4, 0, 0.2, 1, duration: ${(E/1e3).toFixed(2)}).delay(${((g+q)/1e3).toFixed(2)})) { sweep = 1 }
            withAnimation(.easeInOut(duration: ${(Q/2e3).toFixed(2)}).repeatForever(autoreverses: true).delay(${(p/1e3).toFixed(2)})) { pulse = 1.3 }
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
    <Animation id="fade" duration="${(N/1e3).toFixed(2)}" easeFunction="inOutQuad">
      <FloatFieldInterpolator fieldToInterp="bg.opacity" key="[0, 1]" keyValue="[0, 1]" />
    </Animation>
    <Animation id="dropIn" duration="${o}" delay="${(g/1e3).toFixed(2)}" easeFunction="outBack">
      <Vector2DFieldInterpolator fieldToInterp="bar.translation" key="[0, 1]" keyValue="[[91, 435], [91, 475]]" />
      <Vector2DFieldInterpolator fieldToInterp="bar.scale" key="[0, 1]" keyValue="[[0.94, 0.94], [1, 1]]" />
      <FloatFieldInterpolator   fieldToInterp="bar.opacity" key="[0, 1]" keyValue="[0, 1]" />
    </Animation>
    <Animation id="sweep" duration="${(E/1e3).toFixed(2)}" delay="${((g+q)/1e3).toFixed(2)}" easeFunction="inOutQuad">
      <Vector2DFieldInterpolator fieldToInterp="sweepStrip.translation" key="[0, 1]" keyValue="[[-780, 0], [1730, 0]]" />
    </Animation>
    <Animation id="pulse" duration="${(Q/1e3).toFixed(1)}" delay="${(p/1e3).toFixed(2)}" easeFunction="inOutQuad" repeat="true">
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
  · Background fade: ${N} ms.
  · Bar drop-in: 620 ms, ease-out, starts ${g} ms after the fade begins.
  · Sweep: ${E} ms, cubic-bezier(0.4, 0, 0.2, 1), ${q} ms after the drop-in starts.
  · Pulse: ${Q/1e3} s ease-in-out loop (brightness 1 → 1.3 → 1), after the sweep.
  · Auto-advance: 6000 ms after the screen appears.

Acceptance criteria:
  · Score shown is the running total including the round just finished.
  · Sweep plays exactly once per screen; pulse loops.
  · Pressing OK during the entrance advances right away — no double transitions.
  · Reduced-motion setting: plain fade, no drop / sweep / pulse.`}},li=`
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
`;let ee=null;const ci={id:"wl-wrong-flash",title:"Wrong Flash",game:"Win/Lose",description:"Full-screen red flash that briefly washes over the player view when the user picks the wrong answer. Single one-shot opacity ramp from 1 → 0, no movement.",defaults:{duration:600,easingId:"ease-out"},render(e){return u("css-wl-wrong-flash",li),e.innerHTML=`
      <div class="preview-cs-flash-stage">
        <div class="preview-cs-flash-stage__label">player view (mocked)</div>
        <div class="preview-cs-flash"></div>
      </div>
    `,ee=e.querySelector(".preview-cs-flash"),()=>{e.innerHTML="",ee=null}},play({duration:e,easing:t}){ee&&(ee.style.animation="none",ee.offsetWidth,ee.style.animation=`cs-flash ${e}ms ${m(t.bezier)} forwards`)},frames:[{label:"Idle",sublabel:"no overlay",render:e=>{e.innerHTML=`
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
        `}},{label:"Settled",sublabel:"100% · opacity 0",render:e=>{e.innerHTML='<div class="frame-ghost">overlay invisible</div>'}}],snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* CardSharksOverlay.css */
@keyframes cs-flash {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}

.cs-overlay__flash {
  position: absolute;
  inset: 0;
  background: rgba(220, 30, 30, 0.4);
  animation: cs-flash ${e}ms ${m(t.bezier)} forwards;
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
        anim.animateTo(0f, tween(${e}, easing = CubicBezierEasing(${i.toFixed(2)}f, ${a.toFixed(2)}f, ${r.toFixed(2)}f, ${n.toFixed(2)}f)))
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
                withAnimation(.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o})) {
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
    <Animation id="flashAnim" duration="${o}" easeFunction="outQuad" repeat="false">
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
  · Tonally subdued — strong enough to register peripherally, not aggressive.`}},vt=40,di=12,ht=["#facc15","#22c55e","#3b82f6","#ec4899","#f97316","#a855f7","#06b6d4","#fb7185"],pi=`
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
`;function fi(){const e=[];for(let t=0;t<vt;t++)e.push({left:Math.random()*100,bottom:2+Math.random()*14,delay:Math.random()*350,duration:1400+Math.random()*900,trajectory:t%di,size:5+Math.random()*4,color:ht[t%ht.length],shape:t%3===0?"streamer":t%2===0?"rect":"square"});return e}let Se=null;function ui(e,t){const a=fi().map(r=>{const n=r.shape==="rect"?r.size*1.6:r.shape==="streamer"?r.size*2.4:r.size;return`<span class="preview-confetti__p" style="
      left:${r.left}%;
      bottom:${r.bottom}%;
      width:${r.size}px;
      height:${n}px;
      background:${r.color};
      animation-name:pc-traj-${r.trajectory};
      animation-delay:${r.delay}ms;
      animation-duration:${r.duration*t}ms;
    "></span>`}).join("");e.innerHTML=a}const mi={id:"wl-confetti-burst",title:"Confetti Burst",game:"Win/Lose",description:"Celebratory confetti fired from the bottom of the screen on a correct answer. ~90 particles in 8 colours (3 shapes) follow 12 baked trajectories that rocket up and out. Each particle has a random delay (0–350 ms) and duration (1400–2300 ms).",defaults:{duration:1800,easingId:"ease-out"},slowFactor:2,render(e){return u("css-wl-confetti",pi),e.innerHTML=`
      <div class="preview-confetti-stage">
        <div class="preview-confetti-stage__label">player view (mocked)</div>
        <div class="preview-confetti"></div>
      </div>
    `,Se=e.querySelector(".preview-confetti"),()=>{e.innerHTML="",Se=null}},play({duration:e}){if(!Se)return;const t=e/1800;ui(Se,t)},frames:[{label:"Idle",sublabel:"no confetti",render:e=>{e.innerHTML='<div class="frame-ghost">no confetti</div>'}},{label:"Spawn",sublabel:"0–10% · particles at bottom · opacity 0 → 1",render:e=>{e.innerHTML=`
          <div style="position:relative;width:100%;height:64px;background:linear-gradient(135deg,#1a1f2e 0%,#06080d 100%);border-radius:6px;overflow:hidden;">
            ${[{l:20,c:"#facc15"},{l:35,c:"#22c55e"},{l:50,c:"#3b82f6"},{l:65,c:"#ec4899"},{l:80,c:"#f97316"}].map(t=>`<span style="position:absolute;left:${t.l}%;bottom:6px;width:7px;height:7px;background:${t.c};border-radius:1px;opacity:0.6;"></span>`).join("")}
          </div>
        `}},{label:"Burst",sublabel:"50% · particles spread up & out",render:e=>{e.innerHTML=`
          <div style="position:relative;width:100%;height:64px;background:linear-gradient(135deg,#1a1f2e 0%,#06080d 100%);border-radius:6px;overflow:hidden;">
            ${[{l:14,b:38,c:"#facc15",r:90},{l:28,b:52,c:"#22c55e",r:-30},{l:44,b:60,c:"#3b82f6",r:180},{l:56,b:48,c:"#ec4899",r:-120},{l:70,b:56,c:"#f97316",r:60},{l:82,b:30,c:"#a855f7",r:-90},{l:36,b:22,c:"#06b6d4",r:45},{l:64,b:18,c:"#fb7185",r:-200}].map(t=>`<span style="position:absolute;left:${t.l}%;bottom:${t.b}%;width:7px;height:11px;background:${t.c};border-radius:1px;transform:rotate(${t.r}deg);opacity:1;"></span>`).join("")}
          </div>
        `}},{label:"Fade",sublabel:"100% · off-frame · opacity 0",render:e=>{e.innerHTML='<div class="frame-ghost">off-screen · opacity 0</div>'}}],snippets({duration:e}){return{web:`/* ConfettiBurst.css — 12 baked trajectories (excerpt). */
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

/* JSX seeds ${vt} particles (real component uses 90) with
   random delay / duration / colour / shape / trajectory:
     - left          : 0–100%
     - bottom        : 2–16%        (slight vertical spread at spawn)
     - delay         : 0–350 ms
     - duration      : ${e}–${Math.round(e*1.65)} ms
     - trajectory    : i % 12
     - palette       : 8 colours
     - shape         : square | rect (1:1.6) | streamer (1:2.4)

Mount the whole burst with a key (e.g. questionNumber) so it
remounts and replays on each correct answer. */`,android:`// Jetpack Compose — Android TV
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
                durationMs  = Random.nextInt(${e}, ${Math.round(e*1.65)}),
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
)`,ios:`// SwiftUI — tvOS
import SwiftUI

struct ConfettiBurst: View {
    let trigger: Int
    var body: some View {
        Canvas { context, size in
            // 90 particles, 12 baked trajectories, ${e}–${Math.round(e*1.65)} ms each.
            // Use TimelineView(.animation) + per-particle Animatable to drive
            // translate + rotate; final opacity 0 so particles fade out off-screen.
        }
        .allowsHitTesting(false)
        .id(trigger)
    }
}`,roku:`<!-- Roku SceneGraph — components/ConfettiBurst.xml -->
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
  <\/script>
</component>`}},pmTicket(){return`Title: Correct-answer confetti burst

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
  · Confetti does not block input.`}},We=[Ft,At,zt,Rt,Et,Vt,Ht,Dt,jt,Ut,Kt,Zt,ii,oi,si,ci,mi];function bi(e){const t=document.createElement("aside");t.className="sidebar",t.innerHTML=`
    <div class="sidebar__brand">
      <p class="sidebar__title">PlayAlong TV</p>
      <p class="sidebar__subtitle">Animation Catalog</p>
    </div>
  `;const i=["Family Feud","Card Sharks","Stack It","Common","Win/Lose"];for(const r of i){const n=We.filter(s=>s.game===r);if(n.length===0)continue;const o=document.createElement("div");o.className="sidebar__group",o.innerHTML=`<div class="sidebar__group-title">${r}</div>`;for(const s of n){const p=document.createElement("div");p.className="sidebar__item",p.dataset.id=s.id,p.innerHTML=`
        <span>${s.title}</span>
        ${s.tbd?'<span class="sidebar__badge is-tbd">TBD</span>':'<span class="sidebar__badge">Ready</span>'}
      `,p.addEventListener("click",()=>e(s.id)),o.appendChild(p)}t.appendChild(o)}function a(r){t.querySelectorAll(".sidebar__item").forEach(n=>{n.classList.toggle("is-active",n.dataset.id===r)})}return{root:t,setActive:a}}async function gt(e,t,i){try{await navigator.clipboard.writeText(e)}catch{const a=document.createElement("textarea");a.value=e,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a)}t.classList.add("btn--copied"),t.textContent="Copied!",setTimeout(()=>{t.classList.remove("btn--copied"),t.textContent=i},1400)}const hi=[{id:"web",label:"Web · CSS (LG, Samsung)"},{id:"android",label:"Android TV · Compose"},{id:"ios",label:"iOS / tvOS · SwiftUI"},{id:"roku",label:"Roku · SceneGraph"}];function gi(e){const t=P.find(c=>c.id===e.defaults.easingId)??P[0],i={duration:e.defaults.duration,easing:t};let a="web";const r=document.createElement("div");r.innerHTML=`
    <header class="page-header">
      <div class="page-header__eyebrow">${e.game}</div>
      <h1 class="page-header__title">${e.title}</h1>
      <p class="page-header__desc">${e.description}</p>
    </header>

    <div class="anim-card">
      <div class="anim-stage" data-role="stage"></div>

      ${e.frames&&e.frames.length>0?`
        <div class="frames-grid" data-role="frames">
          ${e.frames.map((c,b)=>`
            <div class="frame">
              <div class="frame__slot" data-frame-idx="${b}"></div>
              <div class="frame__label">${c.label}</div>
              ${c.sublabel?`<div class="frame__sublabel">${c.sublabel}</div>`:""}
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
          <h3 class="section__title">Description</h3>
          <div class="pm-block-wrap">
            <div class="pm-block" data-role="pm-output"></div>
            <button class="btn btn--small pm-block__copy" data-role="copy-pm">Copy</button>
          </div>
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
                ${P.map(c=>`<option value="${c.id}" ${c.id===i.easing.id?"selected":""}>${c.label}</option>`).join("")}
              </select>
            </div>

            <div class="control">
              <div class="control__label">Custom cubic-bezier</div>
              <div class="bezier-inputs">
                ${i.easing.bezier.map((c,b)=>`<input type="number" step="0.01" value="${c}" data-role="bezier-${b}" />`).join("")}
              </div>
              <div class="control__hint" data-role="easing-desc">${i.easing.description}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="tabs-row">
        <div class="tabs" role="tablist">
          ${hi.map(c=>`
            <button type="button" class="tab ${c.id===a?"is-active":""}" role="tab" data-platform="${c.id}">${c.label}</button>
          `).join("")}
        </div>
        <button class="btn btn--small" data-role="copy-snippet">Copy code</button>
      </div>

      <div class="code-block" data-role="snippet-output"></div>
    </div>
  `;const n=r.querySelector("[data-role=stage]"),o=r.querySelector("[data-role=play]"),s=r.querySelector("[data-role=slow]"),p=r.querySelector("[data-role=reset]"),f=r.querySelector("[data-role=copy-snippet]"),w=r.querySelector("[data-role=copy-pm]"),Ie=r.querySelector("[data-role=duration]"),Ke=r.querySelector("[data-role=duration-value]"),G=r.querySelector("[data-role=easing-preset]"),Qe=r.querySelector("[data-role=easing-desc]"),ze=[0,1,2,3].map(c=>r.querySelector(`[data-role=bezier-${c}]`)),xt=r.querySelector("[data-role=snippet-output]"),kt=r.querySelector("[data-role=pm-output]"),Je=Array.from(r.querySelectorAll(".tab")),$t=e.render(n);function St(){i.easing.bezier.forEach((c,b)=>{ze[b].value=String(c)})}function re(){const c=e.snippets(i);xt.textContent=c[a],kt.textContent=e.pmTicket(),Je.forEach(b=>{b.classList.toggle("is-active",b.dataset.platform===a)})}function Ze(c){i.easing={...c},Qe.textContent=c.description,St(),re(),e.tbd||e.play(i)}function Ct(){const c=ze.map(b=>Number(b.value));if(!c.some(b=>Number.isNaN(b))){if(i.easing={id:"custom",label:`Custom (${c.join(", ")})`,bezier:c,description:`cubic-bezier(${c.join(", ")})`},!G.querySelector('option[value="custom"]')){const b=document.createElement("option");b.value="custom",b.textContent="Custom…",G.appendChild(b)}G.value="custom",Qe.textContent=`cubic-bezier(${c.join(", ")}) — ${m(c)}`,re(),e.tbd||e.play(i)}}return e.frames&&e.frames.length>0&&e.frames.forEach((c,b)=>{const et=r.querySelector(`[data-frame-idx="${b}"]`);et&&c.render(et)}),o.addEventListener("click",()=>{e.tbd||e.play(i)}),s.addEventListener("click",()=>{if(e.tbd)return;const c=e.slowFactor??4,b={...i,duration:i.duration*c};e.play(b)}),p.addEventListener("click",()=>{const c=P.find(b=>b.id===e.defaults.easingId)??P[0];i.duration=e.defaults.duration,Ie.value=String(i.duration),Ke.textContent=`${i.duration} ms`,G.value=c.id,Ze(c)}),Ie.addEventListener("input",()=>{i.duration=Number(Ie.value),Ke.textContent=`${i.duration} ms`,re(),e.tbd||e.play(i)}),G.addEventListener("change",()=>{const c=P.find(b=>b.id===G.value);c&&Ze(c)}),ze.forEach(c=>c.addEventListener("change",Ct)),Je.forEach(c=>{c.addEventListener("click",()=>{a=c.dataset.platform,re()})}),f.addEventListener("click",()=>{const c=e.snippets(i)[a];gt(c,f,"Copy current snippet")}),w.addEventListener("click",()=>{gt(e.pmTicket(),w,"Copy description")}),re(),e.tbd||requestAnimationFrame(()=>e.play(i)),r.__destroy=()=>{$t()},r}function wi(){const e=document.getElementById("app");if(!e)return;e.className="app",e.innerHTML="";const t=document.createElement("main");t.className="main";let i=null;function a(o){const s=We.find(p=>p.id===o);s&&(i!=null&&i.__destroy&&i.__destroy(),t.innerHTML="",i=gi(s),t.appendChild(i),r.setActive(o),location.hash=o)}const r=bi(a);e.appendChild(r.root),e.appendChild(t);const n=location.hash.replace(/^#/,"")||We[0].id;a(n),window.addEventListener("hashchange",()=>{const o=location.hash.replace(/^#/,"");o&&a(o)})}wi();
