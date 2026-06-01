(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const S=[{id:"linear",label:"Linear",bezier:[0,0,1,1],description:"Constant speed, no acceleration."},{id:"ease",label:"Ease (browser default)",bezier:[.25,.1,.25,1],description:"Generic browser default."},{id:"ease-out",label:"Ease Out",bezier:[0,0,.2,1],description:"Fast start, soft landing — good for entrances."},{id:"ease-in",label:"Ease In",bezier:[.4,0,1,1],description:"Slow start, fast end — good for exits."},{id:"ease-in-out",label:"Ease In Out",bezier:[.4,0,.2,1],description:"Symmetric — good for ambient loops."},{id:"back-out",label:"Back Out (overshoot)",bezier:[.34,1.56,.64,1],description:"Overshoots past the end then settles — bouncy reveals."},{id:"material",label:"Material Standard",bezier:[.4,0,.2,1],description:'Material Design "standard" curve.'}];function d(e){return`cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`}function c(e,t){if(document.getElementById(e))return;const a=document.createElement("style");a.id=e,a.textContent=t,document.head.appendChild(a)}const P=450,V=350,we=`
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
`;let f=null,g=null,y=null;function E(e,t){e.innerHTML=`
    <div class="frame-ff-row" style="
      transform: rotateX(${t.rotateX}deg) scale(${t.scale});
      ${t.state==="hidden"?"background:linear-gradient(180deg,#1d4ed8 0%,#0a1f5a 100%); border:1.5px solid rgba(56,138,255,0.5);":"background:linear-gradient(180deg,#008e11 0%,#053800 100%); border:1.5px solid rgba(0,255,85,0.55);"}
    ">
      <span style="font-size:18px;font-weight:600;">1</span>
      <span style="width:1px;align-self:stretch;background:rgba(255,255,255,0.2);"></span>
      <span style="flex:1;font-size:13px;font-weight:600;letter-spacing:0.3px;opacity:${t.textOpacity};">FAST FOOD</span>
      <span style="font-size:18px;font-weight:600;opacity:${t.textOpacity};">28</span>
    </div>
  `}const R=`
.frame-ff-row {
  display:flex;align-items:center;gap:10px;
  width:100%;height:40px;padding:0 12px;
  border-radius:6px;color:#fff;
  font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
  transform-origin:center center;
}
`,xe={id:"ff-answer-board",title:"Answer Board",game:"Family Feud",description:'When the player guesses correctly, the matching row flips open on the X-axis, swapping its blue "hidden" skin for the green "revealed" skin. Back-ease curve overshoots past the end then settles. The answer text fades up from beneath after the row lands.',defaults:{duration:700,easingId:"back-out"},frames:[{label:"Hidden",sublabel:"idle · blue · slot number only",render:e=>{c("css-ff-frame-row",R),E(e,{state:"hidden",rotateX:0,scale:1,textOpacity:0})}},{label:"Start",sublabel:"0% · rotateX 90° · scale .85",render:e=>{e.innerHTML='<div class="frame-ghost">edge · row on its side</div>'}},{label:"Overshoot",sublabel:"60% · rotateX −15° · scale 1.04",render:e=>{c("css-ff-frame-row",R),E(e,{state:"revealed",rotateX:-15,scale:1.04,textOpacity:0})}},{label:"Counter",sublabel:"85% · rotateX 6° · scale .99",render:e=>{c("css-ff-frame-row",R),E(e,{state:"revealed",rotateX:6,scale:.99,textOpacity:.6})}},{label:"Settled",sublabel:"100% · rotateX 0 · scale 1",render:e=>{c("css-ff-frame-row",R),E(e,{state:"revealed",rotateX:0,scale:1,textOpacity:1})}}],render(e){return c("css-ff-answer-board",we),e.innerHTML=`
      <div class="preview-ff-board">
        <div class="preview-ff-row">
          <span class="preview-ff-row__num">1</span>
          <span class="preview-ff-row__divider"></span>
          <span class="preview-ff-row__name">FAST FOOD</span>
          <span class="preview-ff-row__pts">28</span>
        </div>
      </div>
    `,f=e.querySelector(".preview-ff-row"),g=e.querySelector(".preview-ff-row__name"),y=e.querySelector(".preview-ff-row__pts"),()=>{e.innerHTML="",f=null,g=null,y=null}},play({duration:e,easing:t}){if(!f||!g||!y)return;f.classList.remove("is-revealed"),f.style.animation="none",g.style.animation="none",y.style.animation="none",g.style.opacity="0",y.style.opacity="0",f.offsetWidth,f.classList.add("is-revealed"),f.style.animation=`ff-row-flip ${e}ms ${d(t.bezier)}`;const a=Math.round(V/700*e),i=`ff-text-fade-up ${P}ms ease-out ${a}ms both`;g.style.animation=i,y.style.animation=i,setTimeout(()=>{!f||!g||!y||(f.style.animation="none",g.style.animation="none",y.style.animation="none",g.style.opacity="0",y.style.opacity="0",f.classList.remove("is-revealed"))},e+1200)},snippets({duration:e,easing:t}){const[a,i,r,o]=t.bezier,s=(e/1e3).toFixed(2);return{web:`/* Drop into FamilyFeudBoard.css */
@keyframes ff-row-flip {
  0%   { transform: rotateX(90deg) scale(0.85); }
  60%  { transform: rotateX(-15deg) scale(1.04); }
  85%  { transform: rotateX(6deg) scale(0.99); }
  100% { transform: rotateX(0) scale(1); }
}

.ff-board { perspective: 1000px; }

.ff-board__row--revealed {
  animation: ff-row-flip ${e}ms ${d(t.bezier)};
  transform-origin: center center;
}

@keyframes ff-text-fade-up {
  0%   { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}

.ff-board__row--revealed .ff-board__name,
.ff-board__row--revealed .ff-board__points {
  animation: ff-text-fade-up ${P}ms ease-out ${V}ms both;
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.core.*
import androidx.compose.runtime.*
import androidx.compose.ui.graphics.graphicsLayer

val easing = CubicBezierEasing(${a.toFixed(2)}f, ${i.toFixed(2)}f, ${r.toFixed(2)}f, ${o.toFixed(2)}f)

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

// Text fade-up — separate animation, delayed ${V} ms.
val textAlpha by animateFloatAsState(
    targetValue = if (revealed) 1f else 0f,
    animationSpec = tween(${P}, delayMillis = ${V})
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
                .timingCurve(${a}, ${i}, ${r}, ${o}, duration: ${s}),
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

    <Animation id="flip" duration="${s}" easeFunction="outBack" repeat="false">
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
<!-- Note: Roku's outBack easeFunction approximates cubic-bezier(${a},${i},${r},${o}). -->`}},pmTicket(){return`Title: Family Feud — Answer Board row reveal animation

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
  · On platforms without true 3D rotation, fall back to a scaleY 0 → 1 reveal — the overshoot must remain visible.`}},ke=`
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
`;let H=null,$=0;const ne=[{text:"pizza",kind:"incorrect"},{text:"burger",kind:"correct"},{text:"tacos",kind:"incorrect"}];function se(e,t,a,i,r,o){e.innerHTML=`
    <div style="
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      font-size:18px;font-weight:600;
      color:${i};
      opacity:${a};
      transform:translateY(${t}px);
      text-decoration:line-through;
    ">${o}</div>
  `}const _e={id:"ff-attempts",title:"Attempts",game:"Family Feud",description:"When the player submits a guess, a new row slides into the Attempts column from above. Correct rows render in green, incorrect rows render in red with a strike-through.",defaults:{duration:400,easingId:"ease-out"},frames:[{label:"Start",sublabel:"0% · translateY −18 · opacity 0",render:e=>{e.innerHTML='<div class="frame-ghost">hidden</div>'}},{label:"Mid",sublabel:"50% · translateY −9 · opacity .5",render:e=>se(e,-9,.5,"#c33",!0,"pizza")},{label:"Settled",sublabel:"100% · translateY 0 · opacity 1",render:e=>se(e,0,1,"#c33",!0,"pizza")}],render(e){return c("css-ff-attempts",ke),e.innerHTML=`
      <div class="preview-ff-attempts">
        <div class="preview-ff-attempts__title">Attempts</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
        <div class="preview-ff-attempts__row preview-ff-attempts__row--empty">_</div>
      </div>
    `,H=e.querySelector(".preview-ff-attempts"),$=0,()=>{e.innerHTML="",H=null}},play({duration:e,easing:t}){if(!H)return;const a=ne[$%ne.length],i=H.querySelectorAll(".preview-ff-attempts__row"),r=i[$%i.length];$++,r.textContent=a.text,r.classList.remove("preview-ff-attempts__row--empty","preview-ff-attempts__row--correct","preview-ff-attempts__row--incorrect"),r.classList.add(`preview-ff-attempts__row--${a.kind}`),r.style.animation="none",r.offsetWidth,r.style.animation=`ff-attempt-slide-in ${e}ms ${d(t.bezier)}`,$%i.length===0&&setTimeout(()=>{i.forEach((o,s)=>{s!==($-1)%i.length&&(o.textContent="_",o.className="preview-ff-attempts__row preview-ff-attempts__row--empty")})},e+800)},snippets({duration:e,easing:t}){const[a,i,r,o]=t.bezier,s=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
@keyframes ff-attempt-slide-in {
  0%   { transform: translateY(-18px); opacity: 0; }
  100% { transform: translateY(0);     opacity: 1; }
}

.ff-attempts__row--correct,
.ff-attempts__row--incorrect {
  animation: ff-attempt-slide-in ${e}ms ${d(t.bezier)};
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.*
import androidx.compose.animation.core.*

val easing = CubicBezierEasing(${a.toFixed(2)}f, ${i.toFixed(2)}f, ${r.toFixed(2)}f, ${o.toFixed(2)}f)

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
                withAnimation(.timingCurve(${a}, ${i}, ${r}, ${o}, duration: ${s})) {
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
    <Animation id="slideIn" duration="${s}" easeFunction="outQuad" repeat="false">
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
  · After 3 strikes the panel locks; no further entries play.`}},Ce=`
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
`;let k=[],I=0;function W(e,t,a,i){e.innerHTML=`
    <div style="
      width:44px;height:44px;
      display:flex;align-items:center;justify-content:center;
      border:2px solid #ef4444;border-radius:6px;
      color:#ef4444;font-size:26px;font-weight:700;
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      transform:scale(${t}) rotate(${a}deg);
      opacity:${i};
    ">✕</div>
  `}const Se={id:"ff-strikes",title:"Strikes",game:"Family Feud",description:'On a wrong answer, the next strike X icon pops in with a rotation and scale overshoot. Back-ease curve gives the X a satisfying "punch" landing.',defaults:{duration:550,easingId:"back-out"},frames:[{label:"Start",sublabel:"idle · faint X · opacity .2",render:e=>W(e,.9,0,.2)},{label:"Overshoot",sublabel:"60% · scale 1.3 · rotate +8°",render:e=>W(e,1.3,8,1)},{label:"Settled",sublabel:"100% · scale 1 · rotate 0",render:e=>W(e,1,0,1)}],render(e){return c("css-ff-strikes",Ce),e.innerHTML=`
      <div class="preview-ff-strikes">
        <span class="preview-ff-strike">✕</span>
        <span class="preview-ff-strike">✕</span>
        <span class="preview-ff-strike">✕</span>
      </div>
    `,k=Array.from(e.querySelectorAll(".preview-ff-strike")),I=0,()=>{e.innerHTML="",k=[]}},play({duration:e,easing:t}){if(k.length===0)return;I>=k.length&&(k.forEach(i=>i.classList.remove("is-used")),I=0,k[0].offsetWidth);const a=k[I];a.classList.add("is-used"),a.style.animation="none",a.offsetWidth,a.style.animation=`ff-strike-pop ${e}ms ${d(t.bezier)}`,I++},snippets({duration:e,easing:t}){const[a,i,r,o]=t.bezier,s=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
@keyframes ff-strike-pop {
  0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
  60%  { transform: scale(1.3) rotate(8deg);  opacity: 1; }
  100% { transform: scale(1) rotate(0);       opacity: 1; }
}

.ff-strike-dot--used img {
  animation: ff-strike-pop ${e}ms ${d(t.bezier)};
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
                .timingCurve(${a}, ${i}, ${r}, ${o}, duration: ${s}),
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
    <Animation id="pop" duration="${s}" easeFunction="outBack" repeat="false">
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
  · On platforms without simultaneous transform interpolation, prioritize the scale overshoot over the rotation.`}},$e=`
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
`;let _=null;function X(e,t,a,i,r){e.innerHTML=`
    <div style="
      position:relative;
      width:100%;height:42px;border-radius:6px;
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      color:#fff;font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;font-size:13px;font-weight:600;
      transform:translateY(${t}px) scale(${a});
      opacity:${i};
    ">
      <span style="display:inline-flex;align-items:center;justify-content:center;height:100%;padding:0 24px;background:linear-gradient(90deg,rgba(0,47,255,0) 0%,#002fff 50%,rgba(0,47,255,0) 100%);">Round Complete!</span>
      ${r!==null?`<div style="position:absolute;top:0;bottom:0;width:45%;left:${r}%;background:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(170,210,255,0.55) 50%,rgba(255,255,255,0) 100%);"></div>`:""}
    </div>
  `}const Fe={id:"ff-feedback",title:"Feedback",game:"Family Feud",description:'When the round wraps up, a Round-Complete banner drops in from above with a back-ease overshoot. A soft light band sweeps left-to-right across the banner once, signalling "phase complete, moving on". A slow brightness pulse keeps the band alive afterwards.',defaults:{duration:620,easingId:"ease-out"},frames:[{label:"Start",sublabel:"drop · translateY −40 · scale .94",render:e=>{e.innerHTML='<div class="frame-ghost">hidden</div>'}},{label:"Settled",sublabel:"drop done · translateY 0 · scale 1",render:e=>X(e,0,1,1,null)},{label:"Sweep",sublabel:"light band mid-traversal",render:e=>X(e,0,1,1,30)},{label:"Idle",sublabel:"brightness pulse loop",render:e=>X(e,0,1,1,null)}],render(e){return c("css-ff-feedback",$e),e.innerHTML=`
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
    `,_=e.querySelector(".preview-ff-banner"),()=>{e.innerHTML="",_=null}},play({duration:e,easing:t}){if(!_)return;_.style.animation="none",_.offsetWidth,_.style.animation=`ff-banner-in ${e}ms ${d(t.bezier)} backwards`;const a=_.querySelector(".preview-ff-banner__sweep");if(a){const i=a.cloneNode(!0);a.replaceWith(i)}},snippets({duration:e,easing:t}){const[a,i,r,o]=t.bezier,s=(e/1e3).toFixed(2);return{web:`/* FamilyFeudOverlay.css */
@keyframes ff-banner-in {
  from { opacity: 0; transform: translateY(-40px) scale(0.94); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.ff-banner {
  animation: ff-banner-in ${e}ms ${d(t.bezier)} backwards;
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
    val easing = CubicBezierEasing(${a.toFixed(2)}f, ${i.toFixed(2)}f, ${r.toFixed(2)}f, ${o.toFixed(2)}f)
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
            .animation(.timingCurve(${a}, ${i}, ${r}, ${o}, duration: ${s}), value: visible)
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
    <Animation id="dropIn" duration="${s}" easeFunction="outBack" repeat="false">
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
  · Keyboard / interactive elements behind the banner dim and become non-interactive.`}},Te=`
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
`;let v=null,N=86;function Y(e,t,a,i){e.innerHTML=`
    <div style="
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
      font-size:32px;font-weight:800;color:${a};
      transform:scale(${t});transform-origin:center;
    ">${i}</div>
  `}const Ae={id:"common-score",title:"Score",game:"Common",description:"When the player earns points, the Score value briefly scales up and flashes green before settling back to its resting gold colour. Used by both Family Feud and Card Sharks game timers.",defaults:{duration:600,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · scale 1 · #CAA512",render:e=>Y(e,1,"#caa512","86")},{label:"Peak",sublabel:"35% · scale 1.45 · #6DD97A",render:e=>Y(e,1.45,"#6dd97a","102")},{label:"Settled",sublabel:"100% · scale 1 · #CAA512",render:e=>Y(e,1,"#caa512","102")}],render(e){return c("css-common-score",Te),N=86,e.innerHTML=`
      <div class="preview-score">
        <div class="preview-score__label">Score</div>
        <div class="preview-score__value">${N}</div>
      </div>
    `,v=e.querySelector(".preview-score__value"),()=>{e.innerHTML="",v=null}},play({duration:e,easing:t}){v&&(N+=Math.floor(Math.random()*25)+5,v.textContent=String(N),v.classList.remove("is-bumping"),v.style.animation="none",v.offsetWidth,v.style.animation=`game-timer-box-score-bump ${e}ms ${d(t.bezier)}`)},snippets({duration:e,easing:t}){const[a,i,r,o]=t.bezier,s=(e/1e3).toFixed(2);return{web:`/* GameTimerBox.css — shared between Family Feud, Card Sharks, Fast Money */
@keyframes game-timer-box-score-bump {
  0%   { transform: scale(1);    color: #caa512; }
  35%  { transform: scale(1.45); color: #6dd97a; }
  100% { transform: scale(1);    color: #caa512; }
}

.game-timer-box__value--score-bump {
  display: inline-block;
  transform-origin: center;
  animation: game-timer-box-score-bump ${e}ms ${d(t.bezier)};
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
                withAnimation(.timingCurve(${a}, ${i}, ${r}, ${o}, duration: ${s})) {
                    scale = 1.0  // ramps via spring-like back-ease
                }
                // Pulse via keyframe: scale 1 → 1.45 → 1
                let half = ${s} / 2.85
                withAnimation(.easeOut(duration: half)) {
                    scale = 1.45; color = Color(red: 0.43, green: 0.85, blue: 0.48)
                }
                DispatchQueue.main.asyncAfter(deadline: .now() + half) {
                    withAnimation(.easeIn(duration: ${s} - half)) {
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
    <Animation id="bump" duration="${s}" easeFunction="outBack" repeat="false">
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
  · Used identically in Family Feud, Card Sharks, and Fast Money game-timer boxes.`}},Ie=`
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
`;let m=null,F=null,u=null,w;function B(e,t){if(t.timeUp){e.innerHTML=`
      <div style="
        width:100%;height:40px;
        background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
        border-radius:6px;display:flex;align-items:center;justify-content:center;
        color:#caa512;font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;
        font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;
      ">Time's Up!</div>
    `;return}const a=t.critical?"linear-gradient(90deg,#ef4444 0%,#f87171 100%)":"linear-gradient(90deg,#0090ff 0%,#0022ab 100%)";e.innerHTML=`
    <div style="
      width:100%;height:40px;
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      border-radius:6px;
      padding:6px 8px;box-sizing:border-box;
      display:flex;align-items:center;gap:8px;
    ">
      <span style="color:#caa512;font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;font-size:12px;font-weight:800;min-width:24px;">${t.label}</span>
      <div style="flex:1;height:8px;background:rgba(255,255,255,0.1);border-radius:5px;overflow:hidden;">
        <div style="height:100%;width:${t.fill}%;background:${a};border-radius:5px;"></div>
      </div>
    </div>
  `}const Le={id:"cs-timer",title:"Timer",game:"Card Sharks",description:'Countdown bar that depletes linearly from full to empty over the question window. The blue gradient switches to red once the remaining time crosses a "critical" threshold (last 25%).',defaults:{duration:6e3,easingId:"linear"},slowFactor:2,frames:[{label:"Start",sublabel:"0% · 6s · blue full",render:e=>B(e,{label:"6s",fill:100,critical:!1})},{label:"Mid",sublabel:"50% · 3s · blue half",render:e=>B(e,{label:"3s",fill:50,critical:!1})},{label:"Critical",sublabel:"85% · 1s · red 15%",render:e=>B(e,{label:"1s",fill:15,critical:!0})},{label:"Time’s Up",sublabel:"100% · bar removed · label centred",render:e=>B(e,{label:"",fill:0,critical:!1,timeUp:!0})}],render(e){return c("css-cs-timer",Ie),e.innerHTML=`
      <div class="preview-cs-timer">
        <div class="preview-cs-timer__row">
          <span class="preview-cs-timer__value">6s</span>
          <div class="preview-cs-timer__bar">
            <div class="preview-cs-timer__bar-fill"></div>
          </div>
        </div>
      </div>
    `,m=e.querySelector(".preview-cs-timer__bar-fill"),F=e.querySelector(".preview-cs-timer__bar"),u=e.querySelector(".preview-cs-timer__value"),()=>{e.innerHTML="",m=null,F=null,u=null,w!==void 0&&clearInterval(w)}},play({duration:e}){if(!m||!u||!F)return;w!==void 0&&clearInterval(w),m.classList.remove("is-critical"),F.classList.remove("is-hidden"),u.classList.remove("is-time-up"),m.style.animation="none",m.offsetWidth,m.style.animationDuration=`${e}ms`,m.style.animation=`cs-timer-deplete ${e}ms linear forwards`;const t=Math.ceil(e/1e3);u.textContent=`${t}s`;const a=performance.now();w=window.setInterval(()=>{const i=Math.max(0,e-(performance.now()-a));if(i<=0){u&&(u.textContent="Time's Up!",u.classList.add("is-time-up")),F&&F.classList.add("is-hidden"),w!==void 0&&(clearInterval(w),w=void 0);return}u&&(u.textContent=`${Math.ceil(i/1e3)}s`),m&&i<e*.25&&m.classList.add("is-critical")},100)},snippets({duration:e}){const t=(e/1e3).toFixed(2);return{web:`/* GameTimerBox.css */
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
  · No bounce/easing at end — it's a literal countdown.`}},ze=`
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
`;let L=null,z=null,M=null,J=0;const le=[{higher:"locked",lower:"idle",resolved:!1},{higher:"correct",lower:"idle",resolved:!0},{higher:"idle",lower:"locked",resolved:!1},{higher:"idle",lower:"wrong",resolved:!0}];function ce(e,t,a){if(!e)return;e.className=`preview-hl-btn preview-hl-btn--${t==="up"?"higher":"lower"} preview-hl-btn--${a}`;const i=e.querySelector(".preview-hl-btn__label");i&&(a==="correct"?i.textContent="Correct!":a==="wrong"?i.textContent="Incorrect!":i.textContent=t==="up"?"Higher":"Lower")}function de(e,t,a){return`
    <div style="
      width:100%;height:30px;
      background:${{idle:"#202228",locked:"linear-gradient(90deg,#0090ff 0%,#0022ab 100%)",correct:"linear-gradient(180deg,#008e11 0%,#053800 100%)",wrong:"linear-gradient(180deg,#8e0000 0%,#380000 100%)"}[t]};
      border:1px solid rgba(255,255,255,${t==="idle"?.18:.4});
      border-radius:5px;
      display:flex;align-items:center;justify-content:center;
      color:#fff;font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;font-size:11px;font-weight:800;
      text-transform:uppercase;letter-spacing:0.5px;
      opacity:${a?.35:1};
    ">${e}</div>
  `}function O(e,t,a){e.innerHTML=`
    <div style="display:flex;flex-direction:column;gap:6px;width:100%;
                background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.15);
                border-radius:6px;padding:8px;box-sizing:border-box;">
      ${de(t.label,t.state,t.dim)}
      ${de(a.label,a.state,a.dim)}
    </div>
  `}const Me={id:"cs-controller",title:"Controller with Feedback",game:"Card Sharks",description:'Higher / Lower picker buttons. The player locks one option (blue gradient), then on reveal the correct option turns green ("Correct!") and the wrong pick turns red ("Incorrect!"). The unpicked option dims to 35 % once the round resolves.',defaults:{duration:200,easingId:"ease"},frames:[{label:"Idle",sublabel:"no pick yet · both neutral",render:e=>O(e,{state:"idle",label:"Higher",dim:!1},{state:"idle",label:"Lower",dim:!1})},{label:"Locked",sublabel:"player picked Higher · blue",render:e=>O(e,{state:"locked",label:"Higher",dim:!1},{state:"idle",label:"Lower",dim:!1})},{label:"Correct",sublabel:"reveal · pick was right",render:e=>O(e,{state:"correct",label:"Correct!",dim:!1},{state:"idle",label:"Lower",dim:!0})},{label:"Wrong",sublabel:"reveal · pick was wrong",render:e=>O(e,{state:"idle",label:"Higher",dim:!0},{state:"wrong",label:"Incorrect!",dim:!1})}],render(e){return c("css-cs-controller",ze),J=0,e.innerHTML=`
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
    `,L=e.querySelector(".preview-hl"),[z,M]=Array.from(e.querySelectorAll(".preview-hl-btn")),()=>{e.innerHTML="",L=z=M=null}},play({duration:e}){if(!L)return;const t=le[J%le.length];J++,L.style.setProperty("--hl-duration",`${e}ms`),L.classList.toggle("is-resolved",t.resolved),z&&(z.style.transition=`background ${e}ms ease, border-color ${e}ms ease, opacity ${e}ms ease`),M&&(M.style.transition=`background ${e}ms ease, border-color ${e}ms ease, opacity ${e}ms ease`),ce(z,"up",t.higher),ce(M,"down",t.lower)},snippets({duration:e}){const t=(e/1e3).toFixed(2);return{web:`/* HigherLowerButtons.css */
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
  · The same component is reused in Match Game match-up rounds with different labels — visuals and timings must match exactly.`}},Ve=`
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
`;let x=null;function pe(e,t,a,i,r){e.innerHTML=`
    <div style="
      background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.15);
      border-radius:6px;padding:8px 10px;
      font-family:'Rubik', 'Helvetica Neue', Arial, sans-serif;color:#fff;font-size:11px;line-height:1.4;
      transform:translate(${t}px, ${a}px) scale(${i});
      opacity:${r};
      max-width:140px;
    ">Use ▲ / ▼ to make your selections.</div>
  `}const Ee={id:"cs-info-note",title:"Info Note",game:"Card Sharks",description:"Persistent D-pad helper that lives in the bottom-left of the player screen. Black-glass card with two-line text and inline white key-cap glyphs for ↑ / ↓ that mirror the Higher/Lower buttons. Slides up-and-right into place on mount and then stays static.",defaults:{duration:420,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · translate −30,−16 · scale .96",render:e=>{e.innerHTML='<div class="frame-ghost">hidden · off-position</div>'}},{label:"Mid",sublabel:"50% · translate −15,−8 · scale .98",render:e=>pe(e,-15,-8,.98,.5)},{label:"Settled",sublabel:"100% · translate 0,0 · scale 1",render:e=>pe(e,0,0,1,1)}],render(e){return c("css-cs-info-note",Ve),e.innerHTML=`
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
    `,x=e.querySelector(".preview-hl-note"),()=>{e.innerHTML="",x=null}},play({duration:e,easing:t}){x&&(x.classList.remove("is-shown"),x.style.animation="none",x.style.opacity="0",x.offsetWidth,x.style.animation=`cs-stage-in ${e}ms ${d(t.bezier)} forwards`)},snippets({duration:e,easing:t}){const[a,i,r,o]=t.bezier,s=(e/1e3).toFixed(2);return{web:`/* HigherLowerNote.css + CardSharksOverlay.css */
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
  animation: cs-stage-in ${e}ms ${d(t.bezier)} backwards;
}`,android:`// Jetpack Compose — Android TV
import androidx.compose.animation.*
import androidx.compose.animation.core.*

@Composable
fun HigherLowerNote(visible: Boolean) {
    val easing = CubicBezierEasing(${a.toFixed(2)}f, ${i.toFixed(2)}f, ${r.toFixed(2)}f, ${o.toFixed(2)}f)
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
            .timingCurve(${a}, ${i}, ${r}, ${o}, duration: ${s}),
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
    <Animation id="slideIn" duration="${s}" easeFunction="outBack" repeat="false">
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
  · When dismissed, just remove from the tree — do not play an exit animation.`}},Re=`
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
`,D=["♥ 7","♦ Q","♠ 3","♣ A","♥ J"];let b=null,j=0;function Q(e,t,a,i,r,o){e.innerHTML=`
    <div style="
      width:50px;height:72px;border-radius:6px;border:2px solid #fff;
      background:linear-gradient(135deg,#f5f5f5 0%,#e0e0e0 100%);
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      font-family:Georgia,serif;color:#b91c1c;font-weight:700;
      transform:translate(${t}px, ${a}px) rotate(${i}deg) scale(${r});
      opacity:${o};
      box-shadow:0 8px 18px rgba(0,0,0,0.45);
    ">
      <div style="font-size:24px;line-height:1;">Q</div>
      <div style="font-size:18px;line-height:1;margin-top:2px;">♦</div>
    </div>
  `}const He={id:"cs-card",title:"Card component",game:"Card Sharks",description:"When a new question shows up, the next playing card flies in from off-screen top-left, rotating into place with a slight overshoot. The card lands flat and stays put until the next question.",defaults:{duration:620,easingId:"back-out"},frames:[{label:"Start",sublabel:"0% · translate −60,−30 · rot −26° · scale .42",render:e=>{e.innerHTML='<div class="frame-ghost">hidden · off-screen</div>'}},{label:"Mid",sublabel:"55% · in motion · opacity reaches 1",render:e=>Q(e,-25,-10,-12,.7,1)},{label:"Overshoot",sublabel:"78% · translate 0,+8 · rot +3° · scale 1.04",render:e=>Q(e,0,8,3,1.04,1)},{label:"Settled",sublabel:"100% · translate 0,0 · rot 0 · scale 1",render:e=>Q(e,0,0,0,1,1)}],render(e){return c("css-cs-card",Re),j=0,e.innerHTML=`
      <div class="preview-cs-card-stage">
        <div class="preview-cs-card">
          <div class="preview-cs-card__rank">${D[0][2]}</div>
          <div class="preview-cs-card__suit">${D[0][0]}</div>
        </div>
      </div>
    `,b=e.querySelector(".preview-cs-card"),()=>{e.innerHTML="",b=null}},play({duration:e}){if(!b)return;j=(j+1)%D.length;const t=D[j],a=b.querySelector(".preview-cs-card__rank"),i=b.querySelector(".preview-cs-card__suit");a&&(a.textContent=t[2]),i&&(i.textContent=t[0]),b.classList.remove("is-flying"),b.style.animation="none",b.offsetWidth,b.classList.add("is-flying"),b.style.animation=`cs-card-fly-in ${e}ms cubic-bezier(0.18, 0.89, 0.32, 1.18) both`},snippets({duration:e,easing:t}){const[a,i,r,o]=t.bezier,s=(e/1e3).toFixed(2);return{web:`/* CardSharksOverlay.css */
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
        withAnimation(.timingCurve(${a}, ${i}, ${r}, ${o}, duration: ${s} * 0.78)) {
            stage = 1
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + ${s} * 0.78) {
            withAnimation(.easeOut(duration: ${s} * 0.22)) { stage = 2 }
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
    <Animation id="fly" duration="${s}" easeFunction="outBack" repeat="false">
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
  · No idle motion after the animation completes.`}},Ne=`
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
`;let T=null;const Be={id:"wl-wrong-flash",title:"Wrong Flash",game:"Win/Lose",description:"Full-screen red flash that briefly washes over the player view when the user picks the wrong answer. Single one-shot opacity ramp from 1 → 0, no movement.",defaults:{duration:600,easingId:"ease-out"},render(e){return c("css-wl-wrong-flash",Ne),e.innerHTML=`
      <div class="preview-cs-flash-stage">
        <div class="preview-cs-flash-stage__label">player view (mocked)</div>
        <div class="preview-cs-flash"></div>
      </div>
    `,T=e.querySelector(".preview-cs-flash"),()=>{e.innerHTML="",T=null}},play({duration:e,easing:t}){T&&(T.style.animation="none",T.offsetWidth,T.style.animation=`cs-flash ${e}ms ${d(t.bezier)} forwards`)},frames:[{label:"Idle",sublabel:"no overlay",render:e=>{e.innerHTML=`
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
        `}},{label:"Settled",sublabel:"100% · opacity 0",render:e=>{e.innerHTML='<div class="frame-ghost">overlay invisible</div>'}}],snippets({duration:e,easing:t}){const[a,i,r,o]=t.bezier,s=(e/1e3).toFixed(2);return{web:`/* CardSharksOverlay.css */
@keyframes cs-flash {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}

.cs-overlay__flash {
  position: absolute;
  inset: 0;
  background: rgba(220, 30, 30, 0.4);
  animation: cs-flash ${e}ms ${d(t.bezier)} forwards;
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
        anim.animateTo(0f, tween(${e}, easing = CubicBezierEasing(${a.toFixed(2)}f, ${i.toFixed(2)}f, ${r.toFixed(2)}f, ${o.toFixed(2)}f)))
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
                withAnimation(.timingCurve(${a}, ${i}, ${r}, ${o}, duration: ${s})) {
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
    <Animation id="flashAnim" duration="${s}" easeFunction="outQuad" repeat="false">
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
  · Tonally subdued — strong enough to register peripherally, not aggressive.`}},ue=40,Oe=12,fe=["#facc15","#22c55e","#3b82f6","#ec4899","#f97316","#a855f7","#06b6d4","#fb7185"],De=`
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
`;function je(){const e=[];for(let t=0;t<ue;t++)e.push({left:Math.random()*100,bottom:2+Math.random()*14,delay:Math.random()*350,duration:1400+Math.random()*900,trajectory:t%Oe,size:5+Math.random()*4,color:fe[t%fe.length],shape:t%3===0?"streamer":t%2===0?"rect":"square"});return e}let q=null;function qe(e,t){const i=je().map(r=>{const o=r.shape==="rect"?r.size*1.6:r.shape==="streamer"?r.size*2.4:r.size;return`<span class="preview-confetti__p" style="
      left:${r.left}%;
      bottom:${r.bottom}%;
      width:${r.size}px;
      height:${o}px;
      background:${r.color};
      animation-name:pc-traj-${r.trajectory};
      animation-delay:${r.delay}ms;
      animation-duration:${r.duration*t}ms;
    "></span>`}).join("");e.innerHTML=i}const Ue={id:"wl-confetti-burst",title:"Confetti Burst",game:"Win/Lose",description:"Celebratory confetti fired from the bottom of the screen on a correct answer. ~90 particles in 8 colours (3 shapes) follow 12 baked trajectories that rocket up and out. Each particle has a random delay (0–350 ms) and duration (1400–2300 ms).",defaults:{duration:1800,easingId:"ease-out"},slowFactor:2,render(e){return c("css-wl-confetti",De),e.innerHTML=`
      <div class="preview-confetti-stage">
        <div class="preview-confetti-stage__label">player view (mocked)</div>
        <div class="preview-confetti"></div>
      </div>
    `,q=e.querySelector(".preview-confetti"),()=>{e.innerHTML="",q=null}},play({duration:e}){if(!q)return;const t=e/1800;qe(q,t)},frames:[{label:"Idle",sublabel:"no confetti",render:e=>{e.innerHTML='<div class="frame-ghost">no confetti</div>'}},{label:"Spawn",sublabel:"0–10% · particles at bottom · opacity 0 → 1",render:e=>{e.innerHTML=`
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

/* JSX seeds ${ue} particles (real component uses 90) with
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
  · Confetti does not block input.`}},K=[xe,_e,Se,Fe,Ae,Le,Me,Ee,He,Be,Ue];function Ge(e){const t=document.createElement("aside");t.className="sidebar",t.innerHTML=`
    <div class="sidebar__brand">
      <p class="sidebar__title">PlayAlong TV</p>
      <p class="sidebar__subtitle">Animation Catalog</p>
    </div>
  `;const a=["Family Feud","Card Sharks","Common","Win/Lose"];for(const r of a){const o=K.filter(p=>p.game===r);if(o.length===0)continue;const s=document.createElement("div");s.className="sidebar__group",s.innerHTML=`<div class="sidebar__group-title">${r}</div>`;for(const p of o){const h=document.createElement("div");h.className="sidebar__item",h.dataset.id=p.id,h.innerHTML=`
        <span>${p.title}</span>
        ${p.tbd?'<span class="sidebar__badge is-tbd">TBD</span>':'<span class="sidebar__badge">Ready</span>'}
      `,h.addEventListener("click",()=>e(p.id)),s.appendChild(h)}t.appendChild(s)}function i(r){t.querySelectorAll(".sidebar__item").forEach(o=>{o.classList.toggle("is-active",o.dataset.id===r)})}return{root:t,setActive:i}}async function me(e,t,a){try{await navigator.clipboard.writeText(e)}catch{const i=document.createElement("textarea");i.value=e,i.style.position="fixed",i.style.opacity="0",document.body.appendChild(i),i.select(),document.execCommand("copy"),document.body.removeChild(i)}t.classList.add("btn--copied"),t.textContent="Copied!",setTimeout(()=>{t.classList.remove("btn--copied"),t.textContent=a},1400)}const Pe=[{id:"web",label:"Web · CSS (LG, Samsung)"},{id:"android",label:"Android TV · Compose"},{id:"ios",label:"iOS / tvOS · SwiftUI"},{id:"roku",label:"Roku · SceneGraph"}];function We(e){const t=S.find(n=>n.id===e.defaults.easingId)??S[0],a={duration:e.defaults.duration,easing:t};let i="web";const r=document.createElement("div");r.innerHTML=`
    <header class="page-header">
      <div class="page-header__eyebrow">${e.game}</div>
      <h1 class="page-header__title">${e.title}</h1>
      <p class="page-header__desc">${e.description}</p>
    </header>

    <div class="anim-card">
      <div class="anim-stage" data-role="stage"></div>

      ${e.frames&&e.frames.length>0?`
        <div class="frames-grid" data-role="frames">
          ${e.frames.map((n,l)=>`
            <div class="frame">
              <div class="frame__slot" data-frame-idx="${l}"></div>
              <div class="frame__label">${n.label}</div>
              ${n.sublabel?`<div class="frame__sublabel">${n.sublabel}</div>`:""}
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
                <input type="range" min="100" max="2000" step="10" value="${a.duration}" data-role="duration" />
                <div class="control__value" data-role="duration-value">${a.duration} ms</div>
              </div>
            </div>

            <div class="control">
              <div class="control__label">Easing preset</div>
              <select data-role="easing-preset" style="width:100%">
                ${S.map(n=>`<option value="${n.id}" ${n.id===a.easing.id?"selected":""}>${n.label}</option>`).join("")}
              </select>
            </div>

            <div class="control">
              <div class="control__label">Custom cubic-bezier</div>
              <div class="bezier-inputs">
                ${a.easing.bezier.map((n,l)=>`<input type="number" step="0.01" value="${n}" data-role="bezier-${l}" />`).join("")}
              </div>
              <div class="control__hint" data-role="easing-desc">${a.easing.description}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="tabs-row">
        <div class="tabs" role="tablist">
          ${Pe.map(n=>`
            <button type="button" class="tab ${n.id===i?"is-active":""}" role="tab" data-platform="${n.id}">${n.label}</button>
          `).join("")}
        </div>
        <button class="btn btn--small" data-role="copy-snippet">Copy code</button>
      </div>

      <div class="code-block" data-role="snippet-output"></div>
    </div>
  `;const o=r.querySelector("[data-role=stage]"),s=r.querySelector("[data-role=play]"),p=r.querySelector("[data-role=slow]"),h=r.querySelector("[data-role=reset]"),Z=r.querySelector("[data-role=copy-snippet]"),ee=r.querySelector("[data-role=copy-pm]"),U=r.querySelector("[data-role=duration]"),te=r.querySelector("[data-role=duration-value]"),C=r.querySelector("[data-role=easing-preset]"),ae=r.querySelector("[data-role=easing-desc]"),G=[0,1,2,3].map(n=>r.querySelector(`[data-role=bezier-${n}]`)),be=r.querySelector("[data-role=snippet-output]"),he=r.querySelector("[data-role=pm-output]"),re=Array.from(r.querySelectorAll(".tab")),ge=e.render(o);function ye(){a.easing.bezier.forEach((n,l)=>{G[l].value=String(n)})}function A(){const n=e.snippets(a);be.textContent=n[i],he.textContent=e.pmTicket(),re.forEach(l=>{l.classList.toggle("is-active",l.dataset.platform===i)})}function ie(n){a.easing={...n},ae.textContent=n.description,ye(),A(),e.tbd||e.play(a)}function ve(){const n=G.map(l=>Number(l.value));if(!n.some(l=>Number.isNaN(l))){if(a.easing={id:"custom",label:`Custom (${n.join(", ")})`,bezier:n,description:`cubic-bezier(${n.join(", ")})`},!C.querySelector('option[value="custom"]')){const l=document.createElement("option");l.value="custom",l.textContent="Custom…",C.appendChild(l)}C.value="custom",ae.textContent=`cubic-bezier(${n.join(", ")}) — ${d(n)}`,A(),e.tbd||e.play(a)}}return e.frames&&e.frames.length>0&&e.frames.forEach((n,l)=>{const oe=r.querySelector(`[data-frame-idx="${l}"]`);oe&&n.render(oe)}),s.addEventListener("click",()=>{e.tbd||e.play(a)}),p.addEventListener("click",()=>{if(e.tbd)return;const n=e.slowFactor??4,l={...a,duration:a.duration*n};e.play(l)}),h.addEventListener("click",()=>{const n=S.find(l=>l.id===e.defaults.easingId)??S[0];a.duration=e.defaults.duration,U.value=String(a.duration),te.textContent=`${a.duration} ms`,C.value=n.id,ie(n)}),U.addEventListener("input",()=>{a.duration=Number(U.value),te.textContent=`${a.duration} ms`,A(),e.tbd||e.play(a)}),C.addEventListener("change",()=>{const n=S.find(l=>l.id===C.value);n&&ie(n)}),G.forEach(n=>n.addEventListener("change",ve)),re.forEach(n=>{n.addEventListener("click",()=>{i=n.dataset.platform,A()})}),Z.addEventListener("click",()=>{const n=e.snippets(a)[i];me(n,Z,"Copy current snippet")}),ee.addEventListener("click",()=>{me(e.pmTicket(),ee,"Copy description")}),A(),e.tbd||requestAnimationFrame(()=>e.play(a)),r.__destroy=()=>{ge()},r}function Xe(){const e=document.getElementById("app");if(!e)return;e.className="app",e.innerHTML="";const t=document.createElement("main");t.className="main";let a=null;function i(s){const p=K.find(h=>h.id===s);p&&(a!=null&&a.__destroy&&a.__destroy(),t.innerHTML="",a=We(p),t.appendChild(a),r.setActive(s),location.hash=s)}const r=Ge(i);e.appendChild(r.root),e.appendChild(t);const o=location.hash.replace(/^#/,"")||K[0].id;i(o),window.addEventListener("hashchange",()=>{const s=location.hash.replace(/^#/,"");s&&i(s)})}Xe();
