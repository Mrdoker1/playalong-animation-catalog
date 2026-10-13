(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();const Y=[{id:"linear",label:"Linear",bezier:[0,0,1,1],description:"Constant speed, no acceleration."},{id:"ease",label:"Ease (browser default)",bezier:[.25,.1,.25,1],description:"Generic browser default."},{id:"ease-out",label:"Ease Out",bezier:[0,0,.2,1],description:"Fast start, soft landing — good for entrances."},{id:"ease-in",label:"Ease In",bezier:[.4,0,1,1],description:"Slow start, fast end — good for exits."},{id:"ease-in-out",label:"Ease In Out",bezier:[.4,0,.2,1],description:"Symmetric — good for ambient loops."},{id:"back-out",label:"Back Out (overshoot)",bezier:[.34,1.56,.64,1],description:"Overshoots past the end then settles — bouncy reveals."},{id:"material",label:"Material Standard",bezier:[.4,0,.2,1],description:'Material Design "standard" curve.'},{id:"glide",label:"Glide (Stack It)",bezier:[.3,.9,.3,1],description:"Quick launch, long soft settle — Stack It chip and block moves."}];function b(e){return`cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`}function m(e,t){if(document.getElementById(e))return;const i=document.createElement("style");i.id=e,i.textContent=t,document.head.appendChild(i)}const Me=450,be=350,Rt=`
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
`;let $=null,I=null,z=null;function he(e,t){e.innerHTML=`
    <div class="frame-ff-row" style="
      transform: rotateX(${t.rotateX}deg) scale(${t.scale});
      ${t.state==="hidden"?"background:linear-gradient(180deg,#1d4ed8 0%,#0a1f5a 100%); border:1.5px solid rgba(56,138,255,0.5);":"background:linear-gradient(180deg,#008e11 0%,#053800 100%); border:1.5px solid rgba(0,255,85,0.55);"}
    ">
      <span style="font-size:18px;font-weight:600;">1</span>
      <span style="width:1px;align-self:stretch;background:rgba(255,255,255,0.2);"></span>
      <span style="flex:1;font-size:13px;font-weight:600;letter-spacing:0.3px;opacity:${t.textOpacity};">FAST FOOD</span>
      <span style="font-size:18px;font-weight:600;opacity:${t.textOpacity};">28</span>
    </div>
  `}const ge=`
.frame-ff-row {
  display:flex;align-items:center;gap:10px;
  width:100%;height:40px;padding:0 12px;
  border-radius:6px;color:#fff;
  font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
  transform-origin:center center;
}
`,Ot={id:"ff-answer-board",title:"Answer Board",game:"Family Feud",description:'When the player guesses correctly, the matching row flips open on the X-axis, swapping its blue "hidden" skin for the green "revealed" skin. Back-ease curve overshoots past the end then settles. The answer text fades up from beneath after the row lands.',defaults:{duration:700,easingId:"back-out"},frames:[{label:"Hidden",sublabel:"idle · blue · slot number only",render:e=>{m("css-ff-frame-row",ge),he(e,{state:"hidden",rotateX:0,scale:1,textOpacity:0})}},{label:"Start",sublabel:"0% · rotateX 90° · scale .85",render:e=>{e.innerHTML='<div class="frame-ghost">edge · row on its side</div>'}},{label:"Overshoot",sublabel:"60% · rotateX −15° · scale 1.04",render:e=>{m("css-ff-frame-row",ge),he(e,{state:"revealed",rotateX:-15,scale:1.04,textOpacity:0})}},{label:"Counter",sublabel:"85% · rotateX 6° · scale .99",render:e=>{m("css-ff-frame-row",ge),he(e,{state:"revealed",rotateX:6,scale:.99,textOpacity:.6})}},{label:"Settled",sublabel:"100% · rotateX 0 · scale 1",render:e=>{m("css-ff-frame-row",ge),he(e,{state:"revealed",rotateX:0,scale:1,textOpacity:1})}}],render(e){return m("css-ff-answer-board",Rt),e.innerHTML=`
      <div class="preview-ff-board">
        <div class="preview-ff-row">
          <span class="preview-ff-row__num">1</span>
          <span class="preview-ff-row__divider"></span>
          <span class="preview-ff-row__name">FAST FOOD</span>
          <span class="preview-ff-row__pts">28</span>
        </div>
      </div>
    `,$=e.querySelector(".preview-ff-row"),I=e.querySelector(".preview-ff-row__name"),z=e.querySelector(".preview-ff-row__pts"),()=>{e.innerHTML="",$=null,I=null,z=null}},play({duration:e,easing:t}){if(!$||!I||!z)return;$.classList.remove("is-revealed"),$.style.animation="none",I.style.animation="none",z.style.animation="none",I.style.opacity="0",z.style.opacity="0",$.offsetWidth,$.classList.add("is-revealed"),$.style.animation=`ff-row-flip ${e}ms ${b(t.bezier)}`;const i=Math.round(be/700*e),a=`ff-text-fade-up ${Me}ms ease-out ${i}ms both`;I.style.animation=a,z.style.animation=a,setTimeout(()=>{!$||!I||!z||($.style.animation="none",I.style.animation="none",z.style.animation="none",I.style.opacity="0",z.style.opacity="0",$.classList.remove("is-revealed"))},e+1200)},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* Drop into FamilyFeudBoard.css */
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
  animation: ff-text-fade-up ${Me}ms ease-out ${be}ms both;
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

// Text fade-up — separate animation, delayed ${be} ms.
val textAlpha by animateFloatAsState(
    targetValue = if (revealed) 1f else 0f,
    animationSpec = tween(${Me}, delayMillis = ${be})
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
  · On platforms without true 3D rotation, fall back to a scaleY 0 → 1 reveal — the overshoot must remain visible.`}},Et=`
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
`;let we=null,j=0;const rt=[{text:"pizza",kind:"incorrect"},{text:"burger",kind:"correct"},{text:"tacos",kind:"incorrect"}];function at(e,t,i,a,r,n){e.innerHTML=`
    <div style="
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      font-size:18px;font-weight:600;
      color:${a};
      opacity:${i};
      transform:translateY(${t}px);
      text-decoration:line-through;
    ">${n}</div>
  `}const Mt={id:"ff-attempts",title:"Attempts",game:"Family Feud",description:"When the player submits a guess, a new row slides into the Attempts column from above. Correct rows render in green, incorrect rows render in red with a strike-through.",defaults:{duration:400,easingId:"ease-out"},frames:[{label:"Start",sublabel:"0% · translateY −18 · opacity 0",render:e=>{e.innerHTML='<div class="frame-ghost">hidden</div>'}},{label:"Mid",sublabel:"50% · translateY −9 · opacity .5",render:e=>at(e,-9,.5,"#c33",!0,"pizza")},{label:"Settled",sublabel:"100% · translateY 0 · opacity 1",render:e=>at(e,0,1,"#c33",!0,"pizza")}],render(e){return m("css-ff-attempts",Et),e.innerHTML=`
      <div class="preview-ff-attempts">
        <div class="preview-ff-attempts__title">Attempts</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
      </div>
    `,we=e.querySelector(".preview-ff-attempts"),j=0,()=>{e.innerHTML="",we=null}},play({duration:e,easing:t}){if(!we)return;const i=rt[j%rt.length],a=we.querySelectorAll(".preview-ff-attempts__row"),r=a[j%a.length];j++,r.textContent=i.text,r.classList.remove("preview-ff-attempts__row--empty","preview-ff-attempts__row--correct","preview-ff-attempts__row--incorrect"),r.classList.add(`preview-ff-attempts__row--${i.kind}`),r.style.animation="none",r.offsetWidth,r.style.animation=`ff-attempt-slide-in ${e}ms ${b(t.bezier)}`,j%a.length===0&&setTimeout(()=>{a.forEach((n,o)=>{o!==(j-1)%a.length&&(n.textContent="_",n.className="preview-ff-attempts__row preview-ff-attempts__row--empty")})},e+800)},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
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
  · After 3 strikes the panel locks; no further entries play.`}},Vt=`
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
`;let D=[],se=0;function Ve(e,t,i,a){e.innerHTML=`
    <div style="
      width:44px;height:44px;
      display:flex;align-items:center;justify-content:center;
      border:2px solid #ef4444;border-radius:6px;
      color:#ef4444;font-size:26px;font-weight:700;
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      transform:scale(${t}) rotate(${i}deg);
      opacity:${a};
    ">✕</div>
  `}const Bt={id:"ff-strikes",title:"Strikes",game:"Family Feud",description:'On a wrong answer, the next strike X icon pops in with a rotation and scale overshoot. Back-ease curve gives the X a satisfying "punch" landing.',defaults:{duration:550,easingId:"back-out"},frames:[{label:"Start",sublabel:"idle · faint X · opacity .2",render:e=>Ve(e,.9,0,.2)},{label:"Overshoot",sublabel:"60% · scale 1.3 · rotate +8°",render:e=>Ve(e,1.3,8,1)},{label:"Settled",sublabel:"100% · scale 1 · rotate 0",render:e=>Ve(e,1,0,1)}],render(e){return m("css-ff-strikes",Vt),e.innerHTML=`
      <div class="preview-ff-strikes">
        <span class="preview-ff-strike">✕</span>
        <span class="preview-ff-strike">✕</span>
        <span class="preview-ff-strike">✕</span>
      </div>
    `,D=Array.from(e.querySelectorAll(".preview-ff-strike")),se=0,()=>{e.innerHTML="",D=[]}},play({duration:e,easing:t}){if(D.length===0)return;se>=D.length&&(D.forEach(a=>a.classList.remove("is-used")),se=0,D[0].offsetWidth);const i=D[se];i.classList.add("is-used"),i.style.animation="none",i.offsetWidth,i.style.animation=`ff-strike-pop ${e}ms ${b(t.bezier)}`,se++},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
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
`;let q=null;function Be(e,t,i,a,r){e.innerHTML=`
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
  `}const Nt={id:"ff-feedback",title:"Feedback",game:"Family Feud",description:'When the round wraps up, a Round-Complete banner drops in from above with a back-ease overshoot. A soft light band sweeps left-to-right across the banner once, signalling "phase complete, moving on". A slow brightness pulse keeps the band alive afterwards.',defaults:{duration:620,easingId:"ease-out"},frames:[{label:"Start",sublabel:"drop · translateY −40 · scale .94",render:e=>{e.innerHTML='<div class="frame-ghost">hidden</div>'}},{label:"Settled",sublabel:"drop done · translateY 0 · scale 1",render:e=>Be(e,0,1,1,null)},{label:"Sweep",sublabel:"light band mid-traversal",render:e=>Be(e,0,1,1,30)},{label:"Idle",sublabel:"brightness pulse loop",render:e=>Be(e,0,1,1,null)}],render(e){return m("css-ff-feedback",Ht),e.innerHTML=`
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
    `,q=e.querySelector(".preview-ff-banner"),()=>{e.innerHTML="",q=null}},play({duration:e,easing:t}){if(!q)return;q.style.animation="none",q.offsetWidth,q.style.animation=`ff-banner-in ${e}ms ${b(t.bezier)} backwards`;const i=q.querySelector(".preview-ff-banner__sweep");if(i){const a=i.cloneNode(!0);i.replaceWith(a)}},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
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
`;let L=null,ve=86;function He(e,t,i,a){e.innerHTML=`
    <div style="
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      font-size:32px;font-weight:800;color:${i};
      transform:scale(${t});transform-origin:center;
    ">${a}</div>
  `}const qt={id:"common-score",title:"Score",game:"Common",description:"When the player earns points, the Score value briefly scales up and flashes green before settling back to its resting gold colour. Used by both Family Feud and Card Sharks game timers.",defaults:{duration:600,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · scale 1 · #CAA512",render:e=>He(e,1,"#caa512","86")},{label:"Peak",sublabel:"35% · scale 1.45 · #6DD97A",render:e=>He(e,1.45,"#6dd97a","102")},{label:"Settled",sublabel:"100% · scale 1 · #CAA512",render:e=>He(e,1,"#caa512","102")}],render(e){return m("css-common-score",Dt),ve=86,e.innerHTML=`
      <div class="preview-score">
        <div class="preview-score__label">Score</div>
        <div class="preview-score__value">${ve}</div>
      </div>
    `,L=e.querySelector(".preview-score__value"),()=>{e.innerHTML="",L=null}},play({duration:e,easing:t}){L&&(ve+=Math.floor(Math.random()*25)+5,L.textContent=String(ve),L.classList.remove("is-bumping"),L.style.animation="none",L.offsetWidth,L.style.animation=`game-timer-box-score-bump ${e}ms ${b(t.bezier)}`)},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* GameTimerBox.css — shared between Family Feud, Card Sharks, Fast Money */
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
  · Used identically in Family Feud, Card Sharks, and Fast Money game-timer boxes.`}},Gt=`
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
`;let S=null,X=null,C=null,R;function ye(e,t){if(t.timeUp){e.innerHTML=`
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
  `}const Pt={id:"cs-timer",title:"Timer",game:"Card Sharks",description:'Countdown bar that depletes linearly from full to empty over the question window. The blue gradient switches to red once the remaining time crosses a "critical" threshold (last 25%).',defaults:{duration:6e3,easingId:"linear"},slowFactor:2,frames:[{label:"Start",sublabel:"0% · 6s · blue full",render:e=>ye(e,{label:"6s",fill:100,critical:!1})},{label:"Mid",sublabel:"50% · 3s · blue half",render:e=>ye(e,{label:"3s",fill:50,critical:!1})},{label:"Critical",sublabel:"85% · 1s · red 15%",render:e=>ye(e,{label:"1s",fill:15,critical:!0})},{label:"Time’s Up",sublabel:"100% · bar removed · label centred",render:e=>ye(e,{label:"",fill:0,critical:!1,timeUp:!0})}],render(e){return m("css-cs-timer",Gt),e.innerHTML=`
      <div class="preview-cs-timer">
        <div class="preview-cs-timer__row">
          <span class="preview-cs-timer__value">6s</span>
          <div class="preview-cs-timer__bar">
            <div class="preview-cs-timer__bar-fill"></div>
          </div>
        </div>
      </div>
    `,S=e.querySelector(".preview-cs-timer__bar-fill"),X=e.querySelector(".preview-cs-timer__bar"),C=e.querySelector(".preview-cs-timer__value"),()=>{e.innerHTML="",S=null,X=null,C=null,R!==void 0&&clearInterval(R)}},play({duration:e}){if(!S||!C||!X)return;R!==void 0&&clearInterval(R),S.classList.remove("is-critical"),X.classList.remove("is-hidden"),C.classList.remove("is-time-up"),S.style.animation="none",S.offsetWidth,S.style.animationDuration=`${e}ms`,S.style.animation=`cs-timer-deplete ${e}ms linear forwards`;const t=Math.ceil(e/1e3);C.textContent=`${t}s`;const i=performance.now();R=window.setInterval(()=>{const a=Math.max(0,e-(performance.now()-i));if(a<=0){C&&(C.textContent="Time's Up!",C.classList.add("is-time-up")),X&&X.classList.add("is-hidden"),R!==void 0&&(clearInterval(R),R=void 0);return}C&&(C.textContent=`${Math.ceil(a/1e3)}s`),S&&a<e*.25&&S.classList.add("is-critical")},100)},snippets({duration:e}){const t=(e/1e3).toFixed(2);return{web:`/* GameTimerBox.css */
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
  · No bounce/easing at end — it's a literal countdown.`}},Ut=`
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
`;let le=null,ce=null,de=null,Ne=0;const ot=[{higher:"locked",lower:"idle",resolved:!1},{higher:"correct",lower:"idle",resolved:!0},{higher:"idle",lower:"locked",resolved:!1},{higher:"idle",lower:"wrong",resolved:!0}];function nt(e,t,i){if(!e)return;e.className=`preview-hl-btn preview-hl-btn--${t==="up"?"higher":"lower"} preview-hl-btn--${i}`;const a=e.querySelector(".preview-hl-btn__label");a&&(i==="correct"?a.textContent="Correct!":i==="wrong"?a.textContent="Incorrect!":a.textContent=t==="up"?"Higher":"Lower")}function st(e,t,i){return`
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
  `}function xe(e,t,i){e.innerHTML=`
    <div style="display:flex;flex-direction:column;gap:6px;width:100%;
                background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.15);
                border-radius:6px;padding:8px;box-sizing:border-box;">
      ${st(t.label,t.state,t.dim)}
      ${st(i.label,i.state,i.dim)}
    </div>
  `}const Wt={id:"cs-controller",title:"Controller with Feedback",game:"Card Sharks",description:'Higher / Lower picker buttons. The player locks one option (blue gradient), then on reveal the correct option turns green ("Correct!") and the wrong pick turns red ("Incorrect!"). The unpicked option dims to 35 % once the round resolves.',defaults:{duration:200,easingId:"ease"},frames:[{label:"Idle",sublabel:"no pick yet · both neutral",render:e=>xe(e,{state:"idle",label:"Higher",dim:!1},{state:"idle",label:"Lower",dim:!1})},{label:"Locked",sublabel:"player picked Higher · blue",render:e=>xe(e,{state:"locked",label:"Higher",dim:!1},{state:"idle",label:"Lower",dim:!1})},{label:"Correct",sublabel:"reveal · pick was right",render:e=>xe(e,{state:"correct",label:"Correct!",dim:!1},{state:"idle",label:"Lower",dim:!0})},{label:"Wrong",sublabel:"reveal · pick was wrong",render:e=>xe(e,{state:"idle",label:"Higher",dim:!0},{state:"wrong",label:"Incorrect!",dim:!1})}],render(e){return m("css-cs-controller",Ut),Ne=0,e.innerHTML=`
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
    `,le=e.querySelector(".preview-hl"),[ce,de]=Array.from(e.querySelectorAll(".preview-hl-btn")),()=>{e.innerHTML="",le=ce=de=null}},play({duration:e}){if(!le)return;const t=ot[Ne%ot.length];Ne++,le.style.setProperty("--hl-duration",`${e}ms`),le.classList.toggle("is-resolved",t.resolved),ce&&(ce.style.transition=`background ${e}ms ease, border-color ${e}ms ease, opacity ${e}ms ease`),de&&(de.style.transition=`background ${e}ms ease, border-color ${e}ms ease, opacity ${e}ms ease`),nt(ce,"up",t.higher),nt(de,"down",t.lower)},snippets({duration:e}){const t=(e/1e3).toFixed(2);return{web:`/* HigherLowerButtons.css */
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
  · The same component is reused in Match Game match-up rounds with different labels — visuals and timings must match exactly.`}},Yt=`
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
`;let O=null;function lt(e,t,i,a,r){e.innerHTML=`
    <div style="
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      border-radius:6px;padding:8px 10px;
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;color:#fff;font-size:11px;line-height:1.4;
      transform:translate(${t}px, ${i}px) scale(${a});
      opacity:${r};
      max-width:140px;
    ">Use ▲ / ▼ to make your selections.</div>
  `}const jt={id:"cs-info-note",title:"Info Note",game:"Card Sharks",description:"Persistent D-pad helper that lives in the bottom-left of the player screen. Black-glass card with two-line text and inline white key-cap glyphs for ↑ / ↓ that mirror the Higher/Lower buttons. Slides up-and-right into place on mount and then stays static.",defaults:{duration:420,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · translate −30,−16 · scale .96",render:e=>{e.innerHTML='<div class="frame-ghost">hidden · off-position</div>'}},{label:"Mid",sublabel:"50% · translate −15,−8 · scale .98",render:e=>lt(e,-15,-8,.98,.5)},{label:"Settled",sublabel:"100% · translate 0,0 · scale 1",render:e=>lt(e,0,0,1,1)}],render(e){return m("css-cs-info-note",Yt),e.innerHTML=`
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
    `,O=e.querySelector(".preview-hl-note"),()=>{e.innerHTML="",O=null}},play({duration:e,easing:t}){O&&(O.classList.remove("is-shown"),O.style.animation="none",O.style.opacity="0",O.offsetWidth,O.style.animation=`cs-stage-in ${e}ms ${b(t.bezier)} forwards`)},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* HigherLowerNote.css + CardSharksOverlay.css */
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
`,ke=["♥ 7","♦ Q","♠ 3","♣ A","♥ J"];let _=null,$e=0;function De(e,t,i,a,r,n){e.innerHTML=`
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
  `}const Kt={id:"cs-card",title:"Card component",game:"Card Sharks",description:"When a new question shows up, the next playing card flies in from off-screen top-left, rotating into place with a slight overshoot. The card lands flat and stays put until the next question.",defaults:{duration:620,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · translate −60,−30 · rot −26° · scale .42",render:e=>{e.innerHTML='<div class="frame-ghost">hidden · off-screen</div>'}},{label:"Mid",sublabel:"55% · in motion · opacity reaches 1",render:e=>De(e,-25,-10,-12,.7,1)},{label:"Overshoot",sublabel:"78% · translate 0,+8 · rot +3° · scale 1.04",render:e=>De(e,0,8,3,1.04,1)},{label:"Settled",sublabel:"100% · translate 0,0 · rot 0 · scale 1",render:e=>De(e,0,0,0,1,1)}],render(e){return m("css-cs-card",Xt),$e=0,e.innerHTML=`
      <div class="preview-cs-card-stage">
        <div class="preview-cs-card">
          <div class="preview-cs-card__rank">${ke[0][2]}</div>
          <div class="preview-cs-card__suit">${ke[0][0]}</div>
        </div>
      </div>
    `,_=e.querySelector(".preview-cs-card"),()=>{e.innerHTML="",_=null}},play({duration:e}){if(!_)return;$e=($e+1)%ke.length;const t=ke[$e],i=_.querySelector(".preview-cs-card__rank"),a=_.querySelector(".preview-cs-card__suit");i&&(i.textContent=t[2]),a&&(a.textContent=t[0]),_.classList.remove("is-flying"),_.style.animation="none",_.offsetWidth,_.classList.add("is-flying"),_.style.animation=`cs-card-fly-in ${e}ms cubic-bezier(0.18, 0.89, 0.32, 1.18) both`},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2);return{web:`/* CardSharksOverlay.css */
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
  · No idle motion after the animation completes.`}};function xt(e){switch(e.id){case"linear":return{name:"linear",note:""};case"ease":return{name:"inOutQuad",note:"Closest match to CSS ease."};case"ease-out":return{name:"outQuad",note:"Closest match to CSS ease-out."};case"ease-in":return{name:"inQuad",note:"Closest match to CSS ease-in."};case"ease-in-out":return{name:"inOutQuad",note:""};case"back-out":return{name:"outBack",note:"Built-in overshoot curve."};case"material":return{name:"inOutQuad",note:"Material standard ≈ inOutQuad."};case"glide":return{name:"outCubic",note:"Glide (0.3, 0.9, 0.3, 1) ≈ outCubic."};default:return{name:"inOutQuad",note:"Custom cubic-bezier — use FloatFieldInterpolator with hand-tuned key points if precision matters."}}}const f={ink:"#0c1240",gold:"#d9a80b",goldHi:"#ffc928",lav:"#7b7fd6",win:"#7bff3c",miss:"#ff2a2a",mine:"#0090ff",chipBg:"linear-gradient(180deg,#f6f9ff 0%,#e2eafb 55%,#b7cbef 100%)",font:"'Rubik', 'Helvetica Neue', Arial, sans-serif"},ae=`
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
`;function B(e,t){const i=t.focus?`3px solid ${f.gold}`:"2px solid #fff",a=t.focus?"0 0 10px rgba(255,200,0,0.45),":"";e.innerHTML=`
    <div style="
      width:130px;height:30px;box-sizing:border-box;
      display:flex;align-items:center;justify-content:center;
      border-radius:999px;background:${f.chipBg};border:${i};
      box-shadow:${a}0 2px 4px rgba(0,0,0,0.4);
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
`,kt=[20,78,136,194],ct={left:24,top:104,width:160,height:40},Jt={left:300,top:kt[0],width:196,height:44};let w=null,pe=null,Ye=[];function dt(){Ye.forEach(clearTimeout),Ye=[]}function qe(e,t){Object.assign(e.style,{left:`${t.left}px`,top:`${t.top}px`,width:`${t.width}px`,height:`${t.height}px`})}const Zt={id:"si-chip-place",title:"Answer → Slot",game:"Stack It",description:"Pressing OK on an answer chip glides it from the answer tray into the first free slot of the stack. The chip morphs to the slot size on the way, keeps the gold ring while the player chooses a slot, and a dashed ghost marks the spot it left. When five answers are placed, the sixth fills the last slot automatically after 450 ms.",defaults:{duration:450,easingId:"glide"},frames:[{label:"Picked",sublabel:"0% · in tray · gold ring",render:e=>B(e,{text:"Guitar",focus:!0})},{label:"Gliding",sublabel:"~40% · ~85% of the way (glide)",render:e=>B(e,{text:"Guitar",focus:!0,extra:"width:150px;transform:translateX(10px)"})},{label:"In slot",sublabel:"100% · slot size · font 13 → 14px",render:e=>B(e,{text:"Guitar",focus:!0,fontSize:11,extra:"width:160px"})},{label:"Locked",sublabel:"OK · ring → white · 200 ms",render:e=>B(e,{text:"Guitar",fontSize:11,extra:"width:160px"})}],render(e){return m("css-si-base",ae),m("css-si-chip-place",Qt),e.innerHTML=`
      <div class="preview-si-board preview-si-place">
        ${kt.map(t=>`<div class="preview-si-place__slot" style="top:${t}px"></div>`).join("")}
        <div class="preview-si-ghost"></div>
        <div class="preview-si-chip is-focus">Guitar</div>
      </div>
    `,w=e.querySelector(".preview-si-chip"),pe=e.querySelector(".preview-si-ghost"),w&&qe(w,ct),()=>{dt(),e.innerHTML="",w=null,pe=null}},play({duration:e,easing:t}){if(!w||!pe)return;dt();const i=b(t.bezier);w.style.transition="none",w.classList.add("is-focus"),w.classList.remove("is-in-slot"),pe.style.opacity="0",qe(w,ct),w.offsetWidth,w.style.transition=`left ${e}ms ${i}, top ${e}ms ${i}, width ${e}ms ease, height ${e}ms ease, font-size 200ms, border-color 200ms, box-shadow 200ms`,qe(w,Jt),w.classList.add("is-in-slot"),pe.style.opacity="1",Ye.push(window.setTimeout(()=>w==null?void 0:w.classList.remove("is-focus"),e+500))},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2),s=b(t.bezier),c=xt(t);return{web:`/* StackItOverlay.css
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
.si-chip--moving  { border: .32cqw solid ${f.gold}; box-shadow: 0 0 1.2cqw #ffc80066, 0 .25cqw .5cqw #0006; z-index: 4; }

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
    <Animation id="glide" duration="${o}" easeFunction="${c.name}" repeat="false">
      <Vector2DFieldInterpolator id="move" fieldToInterp="m.top.translation" key="[ 0, 1 ]" />
    </Animation>
  </children>

  <script type="text/brightscript">
    ' ${c.note||"Easing matches the catalog preset."}
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
`,fe=[18,70,122,174],pt=["Guitar","Piano/Keyboard","Violin/Fiddle","Trumpet"],Ge=450,ti=300,ii="cubic-bezier(0.3, 0.9, 0.3, 1)";let x=[],y=null,ze=null,je=[];function ft(){je.forEach(clearTimeout),je=[]}function Se(e,t){ze&&(ze.innerHTML=`<span>${e}</span><span class="preview-si-key">▲</span><span class="preview-si-key">▼</span><span>${t}</span><span class="preview-si-key">Ok</span>`)}const ri={id:"si-focus",title:"Focus & Pick Up",game:"Stack It",description:'Remote focus on a chip. In the tray, focus is a gold ring with a soft glow. Once the stack is full, the focused block also grows to 109 % so it reads as "selectable". Pressing OK picks the block up: it shrinks back to 100 %, keeps the ring, and ▲ ▼ arrows appear next to it and travel with it. OK again drops the block: the arrows disappear and it grows back to the focused size.',defaults:{duration:200,easingId:"ease"},frames:[{label:"Idle",sublabel:"white 2px border",render:e=>B(e,{text:"Harp"})},{label:"Focus",sublabel:"tray · gold ring + glow",render:e=>B(e,{text:"Harp",focus:!0})},{label:"Focus (stack)",sublabel:"scale 1.09 · font 13 → 17px",render:e=>B(e,{text:"Harp",focus:!0,scale:1.09,fontSize:12})},{label:"Picked up",sublabel:"scale 1 · ring stays · ▲▼ shown",render:e=>B(e,{text:"Harp ▴▾",focus:!0})}],render(e){return m("css-si-base",ae),m("css-si-focus",ei),e.innerHTML=`
      <div class="preview-si-board preview-si-focus">
        ${pt.map((t,i)=>`<div class="preview-si-chip" style="top:${fe[i]}px">${t}</div>`).join("")}
        <div class="preview-si-arrows" hidden><i class="up"></i><i class="dn"></i></div>
        <div class="preview-si-hint"></div>
      </div>
    `,x=Array.from(e.querySelectorAll(".preview-si-chip")),y=e.querySelector(".preview-si-arrows"),ze=e.querySelector(".preview-si-hint"),x[0].classList.add("is-focus","is-big"),Se("Choose a block","OK pick it up"),()=>{ft(),e.innerHTML="",x=[],y=null,ze=null}},play({duration:e,easing:t}){if(!x.length||!y)return;ft();const i=b(t.bezier),a=pt.map((l,u)=>u);let r=1;const n=()=>{a.forEach((l,u)=>{x[l].style.top=`${fe[u]}px`}),y&&(y.style.top=`${fe[r]+2}px`,y.children[0].classList.toggle("off",r<=0),y.children[1].classList.toggle("off",r>=fe.length-1))};x.forEach(l=>{l.style.transition="none",l.classList.remove("is-focus","is-big")}),y.style.transition="none",x[0].classList.add("is-focus","is-big"),y.hidden=!0,n(),Se("Choose a block","OK pick it up"),x[0].offsetWidth,x.forEach(l=>{l.style.transition=[...["transform","border-color","box-shadow","font-size"].map(u=>`${u} ${e}ms ${i}`),`top ${Ge}ms ${ii}`].join(", ")}),y.style.transition=`top ${ti}ms ease`;let o=150;const s=(l,u)=>{o+=l,je.push(window.setTimeout(u,o))};s(0,()=>{x[0].classList.remove("is-focus","is-big"),x[1].classList.add("is-focus","is-big")}),s(e+700,()=>{x[a[r]].classList.remove("is-big"),n(),y&&(y.hidden=!1),Se("Move","OK drop")});const c=()=>{r>=fe.length-1||([a[r],a[r+1]]=[a[r+1],a[r]],r+=1,n())};s(900,c),s(Ge+350,c),s(Ge+600,()=>{y&&(y.hidden=!0),x[a[r]].classList.add("is-big"),Se("Choose a block","OK pick it up")})},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2),s=b(t.bezier);return{web:`/* StackItOverlay.css */
.si-chip {
  border: .2cqw solid #fff;
  transition: transform ${e}ms ${s}, border-color ${e}ms ${s},
              box-shadow ${e}ms ${s}, font-size ${e}ms ${s};
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
`,Ae=[20,72,124,176],Pe=["Harp","Guitar","Trumpet","Bagpipes"],ut=300/450;let W=[],T=null,H=[],A=0,Xe=[];function mt(){Xe.forEach(clearTimeout),Xe=[]}function Ke(){H.forEach((e,t)=>{W[e].style.top=`${Ae[t]}px`}),W.forEach((e,t)=>e.classList.toggle("is-focus",t===H[A])),T&&(T.style.top=`${Ae[A]+2}px`,T.children[0].classList.toggle("off",A<=0),T.children[1].classList.toggle("off",A>=Ae.length-1))}function oi(e){const t=A+e;t<0||t>=Ae.length||([H[A],H[t]]=[H[t],H[A]],A=t,Ke())}function Ue(e,t,i){const a=(r,n,o)=>`
    <div style="
      position:absolute;left:10px;top:${n}px;width:120px;height:24px;box-sizing:border-box;
      display:flex;align-items:center;justify-content:center;border-radius:999px;
      background:${f.chipBg};border:${o?`2.5px solid ${f.gold}`:"1.5px solid #fff"};
      box-shadow:${o?"0 0 8px rgba(255,200,0,0.45),":""}0 2px 4px rgba(0,0,0,0.4);
      color:${f.ink};font-family:${f.font};font-weight:600;font-size:9px;text-transform:uppercase;
      z-index:${o?2:1};
    ">${r}</div>`;e.innerHTML=`
    <div style="position:relative;width:160px;height:58px;">
      ${a("Guitar",t[1],!1)}
      ${a("Harp",t[0],!0)}
      <div style="position:absolute;left:138px;top:${i}px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:7px solid ${f.goldHi};"></div>
      <div style="position:absolute;left:138px;top:${i+15}px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:7px solid ${f.goldHi};"></div>
    </div>`}const ni={id:"si-reorder",title:"Block Swap",game:"Stack It",description:"While the timer runs, the player can pick up a block and move it with ▲ ▼. Each press swaps the block with its neighbour: both blocks glide past each other at the same time, and the ▲ ▼ arrows follow a bit faster. An arrow turns lavender at the top or bottom of the stack.",defaults:{duration:450,easingId:"glide"},frames:[{label:"Picked up",sublabel:"slot 1 · gold ring · ▲▼",render:e=>Ue(e,[4,32],6)},{label:"Crossing",sublabel:"~40% · blocks pass each other",render:e=>Ue(e,[26,10],26)},{label:"Swapped",sublabel:"100% · slot 2 · arrows land at 67%",render:e=>Ue(e,[32,4],34)}],render(e){return m("css-si-base",ae),m("css-si-reorder",ai),e.innerHTML=`
      <div class="preview-si-board preview-si-reorder">
        ${Pe.map(t=>`<div class="preview-si-chip">${t}</div>`).join("")}
        <div class="preview-si-arrows"><i class="up"></i><i class="dn"></i></div>
      </div>
    `,W=Array.from(e.querySelectorAll(".preview-si-chip")),T=e.querySelector(".preview-si-arrows"),H=Pe.map((t,i)=>i),A=0,Ke(),()=>{mt(),e.innerHTML="",W=[],T=null}},play({duration:e,easing:t}){if(!W.length||!T)return;mt();const i=b(t.bezier);W.forEach(r=>{r.style.transition="none"}),T.style.transition="none",H=Pe.map((r,n)=>n),A=0,Ke(),T.offsetWidth,W.forEach(r=>{r.style.transition=`top ${e}ms ${i}, border-color 200ms, box-shadow 200ms`}),T.style.transition=`top ${Math.round(e*ut)}ms ease`;const a=e+350;[1,1,-1].forEach((r,n)=>{Xe.push(window.setTimeout(()=>oi(r),150+n*a))})},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2),s=Math.round(e*ut),c=b(t.bezier),l=xt(t);return{web:`/* StackItOverlay.css
   Swap = exchange the two blocks' slot indices and re-write their "top".
   Both blocks transition at once, so they glide past each other. */
.si-chip {
  position: absolute;
  transition: top ${e}ms ${c}, left ${e}ms ${c},
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
  anim.easeFunction = "${l.name}"   ' ${l.note||"matches catalog preset"}
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
  · When the timer hits 0:00 during a move, the current order is what gets scored.`}},si=`
.preview-si-clock { width: 320px; height: 150px; display: flex; align-items: center; justify-content: center; }
.preview-si-clock__value {
  font-weight: 600; font-size: 64px; line-height: 1; color: #fff;
  font-variant-numeric: tabular-nums;
  transition: color 200ms;
}
.preview-si-clock__value.is-low { color: #ffd5d5; }
@keyframes si-clock-pulse { 50% { transform: scale(1.08); } }
`,bt=13,li=10;let F=null,Ie;function ht(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function We(){Ie!==void 0&&(clearInterval(Ie),Ie=void 0)}function Ce(e,t,i,a){e.innerHTML=`
    <div style="
      font-family:${f.font};font-weight:600;font-size:32px;line-height:1;
      color:${i?"#ffd5d5":"#fff"};font-variant-numeric:tabular-nums;
      transform:scale(${a});
    ">${t}</div>
  `}const ci={id:"si-clock-pulse",title:"Timer Low Pulse",game:"Stack It",description:"The round clock at the top of the screen counts down from 1:00. In the last 10 seconds the digits turn pale red and breathe: they scale up to 108 % and back once per second. At 0:00 the pulse stops and the results screen opens.",defaults:{duration:1e3,easingId:"ease-in-out"},slowFactor:2,frames:[{label:"Normal",sublabel:"> 0:10 · white · no motion",render:e=>Ce(e,"0:24",!1,1)},{label:"Low",sublabel:"≤ 0:10 · #FFD5D5 · scale 1",render:e=>Ce(e,"0:09",!0,1)},{label:"Peak",sublabel:"50% of cycle · scale 1.08",render:e=>Ce(e,"0:09",!0,1.08)},{label:"Time up",sublabel:"0:00 · pulse stops",render:e=>Ce(e,"0:00",!1,1)}],render(e){return m("css-si-base",ae),m("css-si-clock",si),e.innerHTML=`
      <div class="preview-si-board preview-si-clock">
        <div class="preview-si-clock__value">${ht(bt)}</div>
      </div>
    `,F=e.querySelector(".preview-si-clock__value"),()=>{We(),e.innerHTML="",F=null}},play({duration:e,easing:t}){if(!F)return;We();const i=b(t.bezier);let a=bt;const r=()=>{if(!F)return;F.textContent=ht(a);const n=a<=li&&a>0;n!==F.classList.contains("is-low")&&(F.classList.toggle("is-low",n),F.style.animation=n?`si-clock-pulse ${e}ms ${i} infinite`:"none")};F.classList.remove("is-low"),F.style.animation="none",r(),Ie=window.setInterval(()=>{a-=1,r(),a<=0&&We()},1e3)},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2),s=(e/2e3).toFixed(2),c=b(t.bezier);return{web:`/* StackItOverlay.css */
.si-clock {
  position: absolute; left: 50.45%; top: 7.4%;
  transform: translate(-50%, -50%);
  font-weight: 600; font-size: 4cqw; color: #fff;
  font-variant-numeric: tabular-nums;
}
/* Added while 0 < secondsLeft <= 10 */
.si-clock--low {
  color: #ffd5d5;
  animation: si-clock-pulse ${e}ms ${c} infinite;
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
  · Reduced-motion setting: colour change only, no scaling.`}},di=`
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
.preview-si-results__cell.su.match { border-color: ${f.win}; box-shadow: 0 0 10px #7bff3c88, inset 0 0 6px #7bff3c55; }
.preview-si-results__cell.su.miss  { border-color: ${f.miss}; box-shadow: 0 0 10px #ff2a2a88, inset 0 0 6px #ff2a2a55; }
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
`,re=["Guitar","Piano/Keyboard","Violin/Fiddle","Trumpet","Harp","Bagpipes"],Le=["Piano/Keyboard","Guitar","Violin/Fiddle","Trumpet","Bagpipes","Harp"],Re=["Guitar","Piano/Keyboard","Trumpet","Violin/Fiddle","Harp","Bagpipes"],K={su:16,key:210,mine:404},pi=e=>44+e*41,d={screenFade:500,suStart:500,mineStart:700,stagger:350,step:350,countFade:400};let E=null,Q=[],J=[],M=null,me=[];function gt(){me.forEach(clearTimeout),me=[]}function _e(e,t){const i=(r,n,o,s="")=>`
    <div style="height:12px;border-radius:999px;background:${r};border:${n};box-sizing:border-box;
      font:600 6px ${f.font};color:#fff;display:flex;align-items:center;justify-content:center;text-transform:uppercase;${s}">${o}</div>`,a=[0,1,2].map(r=>{const n=r<t.su?`1.5px solid ${Le[r]===re[r]?f.win:f.miss}`:"1.5px solid transparent",o=r<t.mine,s=o?`1.5px solid ${Re[r]===re[r]?f.win:f.miss}`:"1.5px solid #fff";return`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;">
      ${i("rgba(30,44,140,0.75)",n,Le[r])}
      ${i("rgba(30,44,140,0.75)","1.5px solid transparent",re[r])}
      ${i(f.mine,s,Re[r],o?"":"opacity:0;transform:translateX(6px);")}
    </div>`}).join("");e.innerHTML=`
    <div style="width:170px;display:flex;flex-direction:column;gap:3px;opacity:${t.screen};">
      ${a}
      <div style="font:700 7px ${f.font};color:#fff;text-align:center;text-transform:uppercase;opacity:${t.count?1:0};">
        <b style="color:#f2c230">4 of 6</b> in the right spot</div>
    </div>`}const fi={id:"si-results-reveal",title:"Results Reveal",game:"Stack It",description:'At 0:00 the results screen fades in with three columns: Su’s stack, the correct stack and the player’s stack. Row by row, top to bottom, Su’s answers get a green (right slot) or red (wrong slot) ring, and the player’s blocks slide in from the right with their own green/red ring. The "N of 6 in the right spot" line fades in last.',defaults:{duration:350,easingId:"ease"},slowFactor:3,frames:[{label:"Fade in",sublabel:"0–500 ms · screen opacity 0 → 1",render:e=>_e(e,{screen:.5,su:0,mine:0,count:!1})},{label:"Row 1",sublabel:"500 ms Su ring · 700 ms yours slides",render:e=>_e(e,{screen:1,su:1,mine:1,count:!1})},{label:"Cascade",sublabel:"+350 ms per row",render:e=>_e(e,{screen:1,su:3,mine:2,count:!1})},{label:"Count",sublabel:"2800 ms · score line fades in",render:e=>_e(e,{screen:1,su:3,mine:3,count:!0})}],render(e){m("css-si-base",ae),m("css-si-results",di);const t=(i,a,r)=>r.map((n,o)=>`<div class="preview-si-results__cell ${i}" style="left:${a}px;top:${pi(o)}px">${n}</div>`).join("");return e.innerHTML=`
      <div class="preview-si-board preview-si-results">
        <div class="preview-si-results__screen">
          <div class="preview-si-results__head" style="left:${K.su}px">SU’S STACK</div>
          <div class="preview-si-results__head" style="left:${K.key}px">CORRECT STACK</div>
          <div class="preview-si-results__head" style="left:${K.mine}px">YOUR STACK</div>
          ${t("su",K.su,Le)}
          ${t("key",K.key,re)}
          ${t("mine hide",K.mine,Re)}
          <div class="preview-si-results__count"><b>4 of 6</b> in the right spot</div>
        </div>
      </div>
    `,E=e.querySelector(".preview-si-results__screen"),Q=Array.from(e.querySelectorAll(".preview-si-results__cell.su")),J=Array.from(e.querySelectorAll(".preview-si-results__cell.mine")),M=e.querySelector(".preview-si-results__count"),()=>{gt(),e.innerHTML="",E=null,Q=[],J=[],M=null}},play({duration:e,easing:t}){if(!E||!M)return;gt();const i=b(t.bezier),a=e/d.step,r=o=>Math.round(o*a);[E,M,...Q,...J].forEach(o=>{o.style.transition="none"}),E.style.opacity="0",M.style.opacity="0",Q.forEach(o=>o.classList.remove("match","miss")),J.forEach(o=>{o.classList.remove("match","miss"),o.classList.add("hide")}),E.offsetWidth,E.style.transition=`opacity ${r(d.screenFade)}ms ${i}`,M.style.transition=`opacity ${r(d.countFade)}ms ${i}`,Q.forEach(o=>{o.style.transition=`border-color ${e}ms ${i}, box-shadow ${e}ms ${i}`}),J.forEach(o=>{o.style.transition=["opacity","transform","border-color","box-shadow"].map(s=>`${s} ${e}ms ${i}`).join(", ")}),E.style.opacity="1",Q.forEach((o,s)=>me.push(window.setTimeout(()=>{o.classList.add(Le[s]===re[s]?"match":"miss")},r(d.suStart+s*d.stagger)))),J.forEach((o,s)=>me.push(window.setTimeout(()=>{o.classList.remove("hide"),o.classList.add(Re[s]===re[s]?"match":"miss")},r(d.mineStart+s*d.stagger)))),me.push(window.setTimeout(()=>{M&&(M.style.opacity="1")},r(d.mineStart+6*d.stagger)))},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=b(t.bezier),s=e/d.step,c=u=>Math.round(u*s),l=u=>(c(u)/1e3).toFixed(2);return{web:`/* StackItResults.css */
.si-screen        { opacity: 0; transition: opacity ${c(d.screenFade)}ms ${o}; pointer-events: none; }
.si-screen--show  { opacity: 1; pointer-events: auto; }

.si-su            { border: .5cqw solid transparent; border-radius: 999px;
                    transition: border-color ${e}ms ${o}, box-shadow ${e}ms ${o}; }
.si-su--match     { border-color: ${f.win};  box-shadow: 0 0 1cqw #7bff3c88, inset 0 0 .6cqw #7bff3c55; }
.si-su--miss      { border-color: ${f.miss}; box-shadow: 0 0 1cqw #ff2a2a88, inset 0 0 .6cqw #ff2a2a55; }

.si-mine          { background: ${f.mine}; border: .63cqw solid #fff; border-radius: 999px;
                    transition: opacity ${e}ms ${o}, transform ${e}ms ${o}, border-color ${e}ms ${o}; }
.si-mine--hide    { opacity: 0; transform: translateX(2cqw); }
.si-mine--match   { border-color: ${f.win};  box-shadow: 0 0 1cqw #7bff3c66; }
.si-mine--miss    { border-color: ${f.miss}; box-shadow: 0 0 1cqw #ff2a2a66; }

.si-count         { opacity: 0; transition: opacity ${c(d.countFade)}ms ${o}; }
.si-count--on     { opacity: 1; }

// StackItResults.ts — staggered reveal
screen.classList.add('si-screen--show');
for (let r = 0; r < 6; r++) {
  later(() => su[r].classList.add(suStack[r] === key[r] ? 'si-su--match' : 'si-su--miss'), ${c(d.suStart)} + r * ${c(d.stagger)});
  later(() => {
    mine[r].classList.remove('si-mine--hide');
    if (yours[r]) mine[r].classList.add(yours[r] === key[r] ? 'si-mine--match' : 'si-mine--miss');
  }, ${c(d.mineStart)} + r * ${c(d.stagger)});
}
later(() => count.classList.add('si-count--on'), ${c(d.mineStart+6*d.stagger)});
later(showRoundComplete, ${c(d.mineStart+6*d.stagger)} + 3000);`,android:`// Jetpack Compose — Android TV
@Composable
fun ResultsReveal(su: List<String>, key: List<String>, yours: List<String?>, onDone: () -> Unit) {
    val ez = CubicBezierEasing(${i}f, ${a}f, ${r}f, ${n}f)
    var step by remember { mutableIntStateOf(-1) }   // ms elapsed bucket
    LaunchedEffect(Unit) {
        val start = withFrameMillis { it }
        while (true) {
            step = (withFrameMillis { it } - start).toInt()
            if (step > ${c(d.mineStart+6*d.stagger)} + 3000) { onDone(); break }
        }
    }
    val screenAlpha by animateFloatAsState(if (step >= 0) 1f else 0f, tween(${c(d.screenFade)}, easing = ez), label = "screen")
    Box(Modifier.alpha(screenAlpha)) {
        repeat(6) { r ->
            val suOn = step >= ${c(d.suStart)} + r * ${c(d.stagger)}
            val mineOn = step >= ${c(d.mineStart)} + r * ${c(d.stagger)}
            val suRing by animateColorAsState(
                when { !suOn -> Color.Transparent; su[r] == key[r] -> Color(0xFF7BFF3C); else -> Color(0xFFFF2A2A) },
                tween(${e}, easing = ez), label = "su$r")
            val mineAlpha by animateFloatAsState(if (mineOn) 1f else 0f, tween(${e}, easing = ez), label = "ma$r")
            val mineDx by animateDpAsState(if (mineOn) 0.dp else 24.dp, tween(${e}, easing = ez), label = "mx$r")
            ResultRow(r, suRing, mineAlpha, mineDx, su[r], key[r], yours[r])
        }
        val countOn = step >= ${c(d.mineStart+6*d.stagger)}
        val countAlpha by animateFloatAsState(if (countOn) 1f else 0f, tween(${c(d.countFade)}), label = "count")
        CountLine(Modifier.alpha(countAlpha))
    }
}`,ios:`// SwiftUI — tvOS
struct ResultsReveal: View {
    let su: [String], key: [String], yours: [String?]
    @State private var shown = false
    @State private var suRows = 0
    @State private var mineRows = 0
    @State private var countOn = false
    private let curve = Animation.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${l(d.step)})

    var body: some View {
        ResultsGrid(su: su, key: key, yours: yours, suRows: suRows, mineRows: mineRows, countOn: countOn)
            .opacity(shown ? 1 : 0)
            .task {
                withAnimation(.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${l(d.screenFade)})) { shown = true }
                for r in 0..<6 {
                    after(${l(d.suStart)} + Double(r) * ${l(d.stagger)}) { withAnimation(curve) { suRows = r + 1 } }
                    after(${l(d.mineStart)} + Double(r) * ${l(d.stagger)}) { withAnimation(curve) { mineRows = r + 1 } }
                }
                after(${l(d.mineStart+6*d.stagger)}) { withAnimation(.easeInOut(duration: ${l(d.countFade)})) { countOn = true } }
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
  m.top.findNode("screenFade").control = "start"     ' opacity 0 → 1, ${l(d.screenFade)} s
  for r = 0 to 5
    su = m.suRows[r]
    su.findNode("ring").blendColor = iifColor(m.su[r] = m.key[r])
    suAnim = fadeAnim(su.findNode("ring"), ${l(d.step)})
    suAnim.delay = ${l(d.suStart)} + r * ${l(d.stagger)}
    suAnim.control = "start"

    mine = m.mineRows[r]
    mine.findNode("ring").blendColor = iifColor(m.yours[r] = m.key[r])
    mineAnim = slideFadeAnim(mine, 24, ${l(d.step)})   ' translation x +24 → 0, opacity 0 → 1
    mineAnim.delay = ${l(d.mineStart)} + r * ${l(d.stagger)}
    mineAnim.control = "start"
  end for
  countAnim = fadeAnim(m.top.findNode("count"), ${l(d.countFade)})
  countAnim.delay = ${l(d.mineStart+6*d.stagger)}
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
  · Reduced-motion setting: all rows appear at once with their rings.`}},Je="linear-gradient(90deg,#030308 0%,#030308 26%,#121a78 40%,#2a33dc 50%,#121a78 60%,#030308 74%,#030308 100%)",Ze="linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(170,210,255,0.55) 50%,rgba(255,255,255,0) 100%)",G=500,v=200,U=300,V=1100,Z=2600,ui=`
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
  background: ${Je};
  opacity: 0;
}
.preview-si-round__side { font-weight: 600; font-size: 14px; letter-spacing: .03em; text-transform: uppercase; }
.preview-si-round__side b { color: #f2c230; font-size: 19px; margin-left: 5px; }
.preview-si-round__side.r { text-align: right; }
.preview-si-round__mid { font-weight: 500; font-size: 24px; }
.preview-si-round__sweep { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.preview-si-round__sweep::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: -45%; width: 45%;
  background: ${Ze};
}
.preview-si-round__sweep.is-on::after {
  animation: si-round-sweep ${V}ms cubic-bezier(0.4, 0, 0.2, 1) var(--sweep-delay, ${U}ms) both;
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
`;let P=null,ee=null,te=null;function ue(e,t){const{mid:i="Round Complete!",round:a="1/3",score:r=4}=t;e.innerHTML=`
    <div style="
      position:relative;overflow:hidden;
      width:170px;height:30px;border-radius:4px;box-sizing:border-box;padding:0 6px;
      display:grid;grid-template-columns:1fr auto 1fr;align-items:center;
      font-family:'Roboto Condensed','Arial Narrow',sans-serif;color:#fff;
      background:${Je};
      transform:translateY(${t.y}px) scale(${t.scale});opacity:${t.opacity};
    ">
      <span style="font-size:7px;font-weight:600;text-transform:uppercase;">Round <b style="color:#f2c230">${a}</b></span>
      <span style="font-size:10px;font-weight:500;">${i}</span>
      <span style="font-size:7px;font-weight:600;text-transform:uppercase;text-align:right;">Score <b style="color:#f2c230">${r}</b></span>
      ${t.sweep!==null?`<div style="position:absolute;top:0;bottom:0;width:45%;left:${t.sweep}%;background:${Ze};"></div>`:""}
    </div>`}const mi={id:"si-round-complete",title:"Round Complete",game:"Stack It",description:'Three seconds after the results count appears, the Round Complete background fades over the results and the score bar drops in from above with a soft overshoot — the same banner motion as Family Feud. A light band sweeps across the bar once, then the bar keeps a slow brightness pulse. After the final round the centre reads "Game Complete!". The next round starts automatically after 6 s; OK skips ahead.',defaults:{duration:620,easingId:"ease-out"},frames:[{label:"Start",sublabel:"bg fade 500 ms · bar hidden",render:e=>ue(e,{y:-14,scale:.94,opacity:.15,sweep:null})},{label:"Drop-in",sublabel:"+200 ms · translateY −40 → 0 · .94 → 1",render:e=>ue(e,{y:-6,scale:.97,opacity:.6,sweep:null})},{label:"Sweep",sublabel:"+300 ms · light band 1100 ms",render:e=>ue(e,{y:0,scale:1,opacity:1,sweep:30})},{label:"Idle",sublabel:"brightness pulse 2.6 s loop",render:e=>ue(e,{y:0,scale:1,opacity:1,sweep:null})},{label:"Final",sublabel:"round 3 · no auto-advance",render:e=>ue(e,{y:0,scale:1,opacity:1,sweep:null,mid:"Game Complete!",round:"3/3",score:39})}],render(e){return m("css-si-base",ae),m("css-si-round",ui),e.innerHTML=`
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
    `,P=e.querySelector(".preview-si-round__screen"),ee=e.querySelector(".preview-si-round__bar"),te=e.querySelector(".preview-si-round__sweep"),()=>{e.innerHTML="",P=null,ee=null,te=null}},play({duration:e,easing:t}){if(!P||!ee||!te)return;const i=b(t.bezier);P.style.transition="none",P.style.opacity="0",ee.style.animation="none",te.classList.remove("is-on"),ee.offsetWidth,P.style.transition=`opacity ${G}ms ease`,P.style.opacity="1",ee.style.animation=`si-round-in ${e}ms ${i} ${v}ms both, si-round-pulse ${Z}ms ease-in-out ${v+e+V}ms infinite`,te.style.setProperty("--sweep-delay",`${v+U}ms`),te.classList.add("is-on")},snippets({duration:e,easing:t}){const[i,a,r,n]=t.bezier,o=(e/1e3).toFixed(2),s=b(t.bezier),c=v+e+V;return{web:`/* StackItOverlay.css — Round Complete screen (banner motion shared with Family Feud) */
.si-screen {
  position: absolute; inset: 0; z-index: 10;
  opacity: 0; pointer-events: none;
  transition: opacity ${G}ms;
}
.si-screen--show { opacity: 1; pointer-events: auto; }

.si-round-bar {
  position: absolute; left: 4.76%; width: 90%; top: 44%; height: 11.2%;
  border-radius: .9cqw; padding: 0 2.4cqw; overflow: hidden;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  font-family: "Roboto Condensed", "Arial Narrow", sans-serif; color: #fff;
  background: ${Je};
}
.si-screen--show .si-round-bar {
  animation:
    si-round-in    ${e}ms ${s} ${v}ms both,
    si-round-pulse ${Z}ms ease-in-out ${c}ms infinite;
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
  background: ${Ze};
}
.si-screen--show .si-round-bar::after {
  animation: si-round-sweep ${V}ms cubic-bezier(0.4, 0, 0.2, 1) ${v+U}ms both;
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
    AnimatedVisibility(visible, enter = fadeIn(tween(${G})), exit = fadeOut(tween(${G}))) {
        Box(Modifier.fillMaxSize().paint(painterResource(R.drawable.si_round_bg), contentScale = ContentScale.FillBounds)) {
            val shown = remember { MutableTransitionState(false) }.apply { targetState = true }
            AnimatedVisibility(
                visibleState = shown,
                enter = slideInVertically(tween(${e}, ${v}, easing)) { -40 } +
                        scaleIn(tween(${e}, ${v}, easing), initialScale = 0.94f) +
                        fadeIn(tween(${e}, ${v}, easing))
            ) {
                // Sweep: gradient strip x −45% → 100%, ${V} ms, delay ${v+U} ms.
                // Pulse: brightness 1 → 1.3 → 1, ${Z} ms loop, starts at ${c} ms.
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
        .transition(.opacity.animation(.easeInOut(duration: ${(G/1e3).toFixed(2)})))
        .onAppear {
            withAnimation(.timingCurve(${i}, ${a}, ${r}, ${n}, duration: ${o}).delay(${(v/1e3).toFixed(2)})) { barIn = true }
            withAnimation(.timingCurve(0.4, 0, 0.2, 1, duration: ${(V/1e3).toFixed(2)}).delay(${((v+U)/1e3).toFixed(2)})) { sweep = 1 }
            withAnimation(.easeInOut(duration: ${(Z/2e3).toFixed(2)}).repeatForever(autoreverses: true).delay(${(c/1e3).toFixed(2)})) { pulse = 1.3 }
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
    <Animation id="fade" duration="${(G/1e3).toFixed(2)}" easeFunction="inOutQuad">
      <FloatFieldInterpolator fieldToInterp="bg.opacity" key="[0, 1]" keyValue="[0, 1]" />
    </Animation>
    <Animation id="dropIn" duration="${o}" delay="${(v/1e3).toFixed(2)}" easeFunction="outBack">
      <Vector2DFieldInterpolator fieldToInterp="bar.translation" key="[0, 1]" keyValue="[[91, 435], [91, 475]]" />
      <Vector2DFieldInterpolator fieldToInterp="bar.scale" key="[0, 1]" keyValue="[[0.94, 0.94], [1, 1]]" />
      <FloatFieldInterpolator   fieldToInterp="bar.opacity" key="[0, 1]" keyValue="[0, 1]" />
    </Animation>
    <Animation id="sweep" duration="${(V/1e3).toFixed(2)}" delay="${((v+U)/1e3).toFixed(2)}" easeFunction="inOutQuad">
      <Vector2DFieldInterpolator fieldToInterp="sweepStrip.translation" key="[0, 1]" keyValue="[[-780, 0], [1730, 0]]" />
    </Animation>
    <Animation id="pulse" duration="${(Z/1e3).toFixed(1)}" delay="${(c/1e3).toFixed(2)}" easeFunction="inOutQuad" repeat="true">
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
  · Background fade: ${G} ms.
  · Bar drop-in: 620 ms, ease-out, starts ${v} ms after the fade begins.
  · Sweep: ${V} ms, cubic-bezier(0.4, 0, 0.2, 1), ${U} ms after the drop-in starts.
  · Pulse: ${Z/1e3} s ease-in-out loop (brightness 1 → 1.3 → 1), after the sweep.
  · Auto-advance: 6000 ms after the screen appears.

Acceptance criteria:
  · Score shown is the running total including the round just finished.
  · Sweep plays exactly once per screen; pulse loops.
  · Pressing OK during the entrance advances right away — no double transitions.
  · Reduced-motion setting: plain fade, no drop / sweep / pulse.`}},bi=`
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
`;let ie=null;const hi={id:"wl-wrong-flash",title:"Wrong Flash",game:"Win/Lose",description:"Full-screen red flash that briefly washes over the player view when the user picks the wrong answer. Single one-shot opacity ramp from 1 → 0, no movement.",defaults:{duration:600,easingId:"ease-out"},render(e){return m("css-wl-wrong-flash",bi),e.innerHTML=`
      <div class="preview-cs-flash-stage">
        <div class="preview-cs-flash-stage__label">player view (mocked)</div>
        <div class="preview-cs-flash"></div>
      </div>
    `,ie=e.querySelector(".preview-cs-flash"),()=>{e.innerHTML="",ie=null}},play({duration:e,easing:t}){ie&&(ie.style.animation="none",ie.offsetWidth,ie.style.animation=`cs-flash ${e}ms ${b(t.bezier)} forwards`)},frames:[{label:"Idle",sublabel:"no overlay",render:e=>{e.innerHTML=`
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
  · Tonally subdued — strong enough to register peripherally, not aggressive.`}},gi=40,wt=["#facc15","#22c55e","#3b82f6","#ec4899","#f97316","#a855f7","#06b6d4","#fb7185"],Oe=260,$t=5e-4,vt=1800,St="cubic-bezier(0.33, 0.67, 0.67, 1)",Ct="cubic-bezier(0.33, 0, 0.67, 0.33)",_t="cubic-bezier(0.2, 0.6, 0.4, 1)",wi=`
.preview-confetti-stage {
  position: relative;
  width: 100%; height: ${Oe}px;
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
  animation: pc-drift calc(var(--tu) + var(--td)) ${_t} var(--delay) both;
}
.preview-confetti__y {
  display: block;
  animation:
    pc-rise var(--tu) ${St}   var(--delay) both,
    pc-fall var(--td) ${Ct} calc(var(--delay) + var(--tu)) forwards;
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
`;function vi(e){const t=$t/(e*e),i=[];for(let a=0;a<gi;a++){const r=4+Math.random()*92,n=2+Math.random()*12,o=n/100*Oe,s=110+Math.random()*120,c=-Math.min(s,Oe-o-12),l=o+24,u=Math.sqrt(2*-c/t),N=Math.sqrt(2*(-c+l)/t),k=(r-50)*1.4+(Math.random()-.5)*90,g=5+Math.random()*4,oe=a%3===0?"streamer":a%2===0?"rect":"square";i.push({left:r,bottom:n,delay:Math.random()*300*e,dx:k,peak:c,drop:l,tu:u,td:N,spin:(500+Math.random()*700)*e,dir:Math.random()<.5?1:-1,r0:Math.round(Math.random()*360),w:g,h:oe==="rect"?g*1.6:oe==="streamer"?g*2.4:g,color:wt[a%wt.length]})}return i}let Fe=null;function yi(e,t){e.innerHTML=vi(t).map(i=>`
    <span class="preview-confetti__p" style="
      left:${i.left}%; bottom:${i.bottom}%;
      --dx:${i.dx.toFixed(1)}px; --peak:${i.peak.toFixed(1)}px; --drop:${i.drop.toFixed(1)}px;
      --tu:${Math.round(i.tu)}ms; --td:${Math.round(i.td)}ms; --delay:${Math.round(i.delay)}ms;
      --spin:${Math.round(i.spin)}ms; --dir:${i.dir}; --r0:${i.r0}deg;
    "><span class="preview-confetti__y"><span class="preview-confetti__s" style="
      width:${i.w.toFixed(1)}px; height:${i.h.toFixed(1)}px; background:${i.color};
    "></span></span></span>`).join("")}function Te(e,t){e.innerHTML=`
    <div style="position:relative;width:100%;height:64px;background:linear-gradient(135deg,#1a1f2e 0%,#06080d 100%);border-radius:6px;overflow:hidden;">
      ${t.map(i=>`<span style="position:absolute;left:${i.l}%;bottom:${i.b}%;width:6px;height:10px;background:${i.c};border-radius:1px;transform:rotate(${i.r}deg);"></span>`).join("")}
    </div>
  `}const xi={id:"wl-confetti-burst",title:"Confetti Burst",game:"Win/Lose",description:"Celebratory confetti fired from the bottom of the screen on a correct answer. Each piece is tossed up, slows to a stop at its apex, then falls back down under gravity and leaves through the bottom edge while tumbling. Higher tosses hang in the air longer — rise and fall times follow t = √(2h / g).",defaults:{duration:1800,easingId:"ease-out"},slowFactor:2,render(e){return m("css-wl-confetti",wi),e.innerHTML=`
      <div class="preview-confetti-stage">
        <div class="preview-confetti-stage__label">player view (mocked)</div>
        <div class="preview-confetti"></div>
      </div>
    `,Fe=e.querySelector(".preview-confetti"),()=>{e.innerHTML="",Fe=null}},play({duration:e}){Fe&&yi(Fe,e/vt)},frames:[{label:"Spawn",sublabel:"0 ms · bottom edge · opacity 0 → 1",render:e=>Te(e,[{l:18,b:6,c:"#facc15",r:10},{l:34,b:10,c:"#22c55e",r:-20},{l:50,b:4,c:"#3b82f6",r:40},{l:66,b:8,c:"#ec4899",r:-60},{l:82,b:5,c:"#f97316",r:15}])},{label:"Rise",sublabel:"ease-out-quad · slowing down",render:e=>Te(e,[{l:14,b:48,c:"#facc15",r:90},{l:31,b:58,c:"#22c55e",r:-30},{l:50,b:40,c:"#3b82f6",r:180},{l:69,b:62,c:"#ec4899",r:-120},{l:86,b:44,c:"#f97316",r:60},{l:40,b:30,c:"#a855f7",r:-90}])},{label:"Apex",sublabel:"~45% · vertical speed 0",render:e=>Te(e,[{l:10,b:78,c:"#facc15",r:200},{l:28,b:86,c:"#22c55e",r:-150},{l:48,b:70,c:"#3b82f6",r:300},{l:72,b:88,c:"#ec4899",r:-260},{l:90,b:74,c:"#f97316",r:160},{l:38,b:64,c:"#a855f7",r:-210}])},{label:"Fall",sublabel:"ease-in-quad · gravity · exits bottom",render:e=>Te(e,[{l:6,b:34,c:"#facc15",r:320},{l:24,b:18,c:"#22c55e",r:-280},{l:46,b:4,c:"#3b82f6",r:420},{l:76,b:26,c:"#ec4899",r:-380},{l:94,b:10,c:"#f97316",r:300},{l:36,b:42,c:"#a855f7",r:-330}])}],snippets({duration:e}){const t=e/vt,i=$t*1080/Oe/(t*t),a=Math.round(i*1e6);return{web:`/* ConfettiBurst.css
   Three nested spans so each axis has its own curve:
     .cf       — horizontal drift (ease-out, air drag)
     .cf__y    — rise (ease-out-quad) then gravity fall (ease-in-quad)
     .cf__spin — the visible piece, tumbling
   Per-particle values come from JS as CSS custom properties. */
.confetti-burst { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 60; }

.cf {
  position: absolute;
  animation: cf-drift calc(var(--tu) + var(--td)) ${_t} var(--delay) both;
}
.cf__y {
  display: block;
  animation:
    cf-rise var(--tu) ${St}   var(--delay) both,
    cf-fall var(--td) ${Ct} calc(var(--delay) + var(--tu)) forwards;
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
const G = ${i.toFixed(5)};                      // px/ms² (~${a} px/s²)
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
  · No layout reflow; the layer does not block input.`}},Qe=[Ot,Mt,Bt,Nt,qt,Pt,Wt,jt,Kt,Zt,ri,ni,ci,fi,mi,hi,xi],Ft="sidebar:collapsed";function ki(){try{return new Set(JSON.parse(localStorage.getItem(Ft)??"[]"))}catch{return new Set}}function $i(e){try{localStorage.setItem(Ft,JSON.stringify([...e]))}catch{}}function Si(e){const t=document.createElement("aside");t.className="sidebar",t.innerHTML=`
    <div class="sidebar__brand">
      <p class="sidebar__title">PlayAlong TV</p>
      <p class="sidebar__subtitle">Animation Catalog</p>
    </div>
  `;const i=ki(),a=[];function r(s,c,l,u){c.classList.toggle("is-collapsed",u),l.setAttribute("aria-expanded",String(!u)),u?i.add(s):i.delete(s),$i(i)}const n=["Family Feud","Card Sharks","Stack It","Common","Win/Lose"];for(const s of n){const c=Qe.filter(k=>k.game===s);if(c.length===0)continue;const l=document.createElement("div");l.className="sidebar__group",l.innerHTML=`
      <button type="button" class="sidebar__group-title" aria-expanded="true">
        <span class="sidebar__chevron" aria-hidden="true"></span>
        <span class="sidebar__group-name">${s}</span>
        <span class="sidebar__group-count">${c.length}</span>
      </button>
      <div class="sidebar__group-body"><div class="sidebar__group-items"></div></div>
    `;const u=l.querySelector(".sidebar__group-title"),N=l.querySelector(".sidebar__group-items");u.addEventListener("click",()=>{r(s,l,u,!l.classList.contains("is-collapsed"))}),i.has(s)&&(l.classList.add("is-collapsed"),u.setAttribute("aria-expanded","false")),a.push({game:s,el:l,toggle:u});for(const k of c){const g=document.createElement("div");g.className="sidebar__item",g.dataset.id=k.id,g.innerHTML=`
        <span>${k.title}</span>
        ${k.tbd?'<span class="sidebar__badge is-tbd">TBD</span>':'<span class="sidebar__badge">Ready</span>'}
      `,g.addEventListener("click",()=>e(k.id)),N.appendChild(g)}t.appendChild(l)}function o(s){t.querySelectorAll(".sidebar__item").forEach(u=>{u.classList.toggle("is-active",u.dataset.id===s)});const c=t.querySelector(".sidebar__item.is-active"),l=a.find(u=>u.el.contains(c));l&&l.el.classList.contains("is-collapsed")&&r(l.game,l.el,l.toggle,!1)}return{root:t,setActive:o}}async function yt(e,t,i){try{await navigator.clipboard.writeText(e)}catch{const a=document.createElement("textarea");a.value=e,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a)}t.classList.add("btn--copied"),t.textContent="Copied!",setTimeout(()=>{t.classList.remove("btn--copied"),t.textContent=i},1400)}const Ci=[{id:"web",label:"Web · CSS (LG, Samsung)"},{id:"android",label:"Android TV · Compose"},{id:"ios",label:"iOS / tvOS · SwiftUI"},{id:"roku",label:"Roku · SceneGraph"}];function _i(e){const t=Y.find(p=>p.id===e.defaults.easingId)??Y[0],i={duration:e.defaults.duration,easing:t};let a="web";const r=document.createElement("div");r.innerHTML=`
    <header class="page-header">
      <div class="page-header__eyebrow">${e.game}</div>
      <h1 class="page-header__title">${e.title}</h1>
      <p class="page-header__desc">${e.description}</p>
    </header>

    <div class="anim-card">
      <div class="anim-stage" data-role="stage"></div>

      ${e.frames&&e.frames.length>0?`
        <div class="frames-grid" data-role="frames">
          ${e.frames.map((p,h)=>`
            <div class="frame">
              <div class="frame__slot" data-frame-idx="${h}"></div>
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
                ${Y.map(p=>`<option value="${p.id}" ${p.id===i.easing.id?"selected":""}>${p.label}</option>`).join("")}
              </select>
            </div>

            <div class="control">
              <div class="control__label">Custom cubic-bezier</div>
              <div class="bezier-inputs">
                ${i.easing.bezier.map((p,h)=>`<input type="number" step="0.01" value="${p}" data-role="bezier-${h}" />`).join("")}
              </div>
              <div class="control__hint" data-role="easing-desc">${i.easing.description}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="tabs-row">
        <div class="tabs" role="tablist">
          ${Ci.map(p=>`
            <button type="button" class="tab ${p.id===a?"is-active":""}" role="tab" data-platform="${p.id}">${p.label}</button>
          `).join("")}
        </div>
        <button class="btn btn--small" data-role="copy-snippet">Copy code</button>
      </div>

      <div class="code-block" data-role="snippet-output"></div>
    </div>
  `;const n=r.querySelector("[data-role=stage]"),o=r.querySelector("[data-role=play]"),s=r.querySelector("[data-role=slow]"),c=r.querySelector("[data-role=reset]"),l=r.querySelector("[data-role=copy-snippet]"),u=r.querySelector("[data-role=copy-pm]"),N=r.querySelector("[data-role=duration]"),k=r.querySelector("[data-role=duration-value]"),g=r.querySelector("[data-role=easing-preset]"),oe=r.querySelector("[data-role=easing-desc]"),Ee=[0,1,2,3].map(p=>r.querySelector(`[data-role=bezier-${p}]`)),Tt=r.querySelector("[data-role=snippet-output]"),At=r.querySelector("[data-role=pm-output]"),et=Array.from(r.querySelectorAll(".tab")),It=e.render(n);function zt(){i.easing.bezier.forEach((p,h)=>{Ee[h].value=String(p)})}function ne(){const p=e.snippets(i);Tt.textContent=p[a],At.textContent=e.pmTicket(),et.forEach(h=>{h.classList.toggle("is-active",h.dataset.platform===a)})}function tt(p){i.easing={...p},oe.textContent=p.description,zt(),ne(),e.tbd||e.play(i)}function Lt(){const p=Ee.map(h=>Number(h.value));if(!p.some(h=>Number.isNaN(h))){if(i.easing={id:"custom",label:`Custom (${p.join(", ")})`,bezier:p,description:`cubic-bezier(${p.join(", ")})`},!g.querySelector('option[value="custom"]')){const h=document.createElement("option");h.value="custom",h.textContent="Custom…",g.appendChild(h)}g.value="custom",oe.textContent=`cubic-bezier(${p.join(", ")}) — ${b(p)}`,ne(),e.tbd||e.play(i)}}return e.frames&&e.frames.length>0&&e.frames.forEach((p,h)=>{const it=r.querySelector(`[data-frame-idx="${h}"]`);it&&p.render(it)}),o.addEventListener("click",()=>{e.tbd||e.play(i)}),s.addEventListener("click",()=>{if(e.tbd)return;const p=e.slowFactor??4,h={...i,duration:i.duration*p};e.play(h)}),c.addEventListener("click",()=>{const p=Y.find(h=>h.id===e.defaults.easingId)??Y[0];i.duration=e.defaults.duration,N.value=String(i.duration),k.textContent=`${i.duration} ms`,g.value=p.id,tt(p)}),N.addEventListener("input",()=>{i.duration=Number(N.value),k.textContent=`${i.duration} ms`,ne(),e.tbd||e.play(i)}),g.addEventListener("change",()=>{const p=Y.find(h=>h.id===g.value);p&&tt(p)}),Ee.forEach(p=>p.addEventListener("change",Lt)),et.forEach(p=>{p.addEventListener("click",()=>{a=p.dataset.platform,ne()})}),l.addEventListener("click",()=>{const p=e.snippets(i)[a];yt(p,l,"Copy current snippet")}),u.addEventListener("click",()=>{yt(e.pmTicket(),u,"Copy description")}),ne(),e.tbd||requestAnimationFrame(()=>e.play(i)),r.__destroy=()=>{It()},r}function Fi(){const e=document.getElementById("app");if(!e)return;e.className="app",e.innerHTML="";const t=document.createElement("main");t.className="main";let i=null;function a(o){const s=Qe.find(c=>c.id===o);s&&(i!=null&&i.__destroy&&i.__destroy(),t.innerHTML="",i=_i(s),t.appendChild(i),r.setActive(o),location.hash=o)}const r=Si(a);e.appendChild(r.root),e.appendChild(t);const n=location.hash.replace(/^#/,"")||Qe[0].id;a(n),window.addEventListener("hashchange",()=>{const o=location.hash.replace(/^#/,"");o&&a(o)})}Fi();
