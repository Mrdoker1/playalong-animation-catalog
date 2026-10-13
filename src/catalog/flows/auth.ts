import { injectStyle } from '../../lib/injectStyle';
import type { CatalogEntry } from '../types';
import { icon } from '../components/icons';

/**
 * The auth flow, assembled from the TV screens rather than drawn fresh.
 *
 * The shape comes from the file's own map (node 7135:6513):
 *   Auth / Entry ├─ Welcome ├─ Sign In Flow ├─ Forgot Password ├─ Guest Mode └─ Profile Select
 *
 * Layout is the one every one of those screens uses: a 710-wide column at
 * x = 140, controls 710 x 72 on a 96 pitch, headline in Display/XL, subhead in
 * Heading/M, footnote in Body/L.
 *
 * It is driven by a REMOTE: up and down move focus, OK activates, Back goes
 * where the screen says. That is the point of assembling it — a flow of
 * screenshots cannot tell you whether the focus order makes sense.
 */

const T = (n: string) =>
  `font-family:var(--type-${n}-family);font-weight:var(--type-${n}-weight);font-size:var(--type-${n}-size);line-height:var(--type-${n}-line);letter-spacing:var(--type-${n}-tracking);text-transform:var(--type-${n}-case)`;

injectStyle('css-flow-auth', `
.flow { display: flex; flex-direction: column; gap: 14px; }
.flow__stage {
  width: 1920px; height: 1080px; transform-origin: left top;
  background: var(--tv-base-dark); border-radius: 12px; overflow: hidden;
  position: relative; color: var(--tv-base-light);
}
.flow__frame { position: relative; overflow: hidden; border: 1px solid var(--border);
  border-radius: 12px; background: var(--tv-base-dark); }
.flow__art { position: absolute; inset: 0 0 0 50%;
  background: var(--gradient-tv-background-stacked); opacity: .18; }
.flow__col { position: absolute; left: 140px; top: 0; width: 710px; }
.flow__logo { margin-top: 170px; display: flex; align-items: center; gap: 12px;
  ${T('heading-l')}; }
.flow__h1 { ${T('display-xl')}; margin: 46px 0 0; }
.flow__sub { ${T('heading-m')}; color: var(--tv-text-primary); margin: 28px 0 0; }
.flow__stack { margin-top: 64px; display: flex; flex-direction: column; gap: 24px; }
.flow__note { ${T('body-l')}; color: var(--tv-text-primary); margin: 42px 0 0; }

.flow__ctl { width: 710px; height: 72px; box-sizing: border-box; border-radius: 12px;
  display: flex; align-items: center; gap: 16px; padding: 20px 32px;
  ${T('body-l')}; border: 1px solid transparent; }
.flow__ctl--primary   { background: var(--tv-base-light); color: var(--tv-base-dark); justify-content: center; }
.flow__ctl--secondary { background: var(--tv-button-secondary); border-color: var(--tv-border-white-20); justify-content: center; }
.flow__ctl--outline   { border-color: var(--tv-base-light); justify-content: center; }
.flow__ctl--input     { background: var(--tv-transparent-dark-25); border-color: var(--tv-border-white-20); }
.flow__ctl.is-focus   { background: var(--gradient-tv-button-primary);
  border-color: var(--tv-button-primary-solid); color: var(--tv-base-light); }
.flow__ctl.is-disabled { opacity: .4; }
.flow__ctl__ph { color: var(--tv-text-primary); }
.flow__ctl__val { color: var(--tv-base-light); }

.flow__msg { display: flex; align-items: center; gap: 12px; margin-top: -8px;
  ${T('body-m')}; color: var(--tv-base-light); }
.flow__msg > svg { color: var(--tv-game-ui-red-1); flex: none; }

.flow__spin { width: 96px; height: 96px; border-radius: 50%; margin-top: 64px;
  border: 8px solid var(--tv-button-secondary); border-top-color: var(--tv-button-primary-solid);
  animation: flow-spin 900ms linear infinite; }
@keyframes flow-spin { to { transform: rotate(360deg); } }

.flow__bar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.flow__step { font-family: var(--mono); font-size: 11px; padding: 4px 10px;
  border-radius: var(--radius-sm); border: 1px solid var(--border); color: var(--text-dim);
  background: var(--bg-card); cursor: pointer; }
.flow__step.is-here { border-color: var(--accent); color: var(--text); }
.flow__hint { font-family: var(--mono); font-size: 11px; color: var(--text-muted); }
`);

type Ctl =
  | { kind: 'button'; look: 'primary' | 'secondary' | 'outline'; label: string; go?: string; disabled?: boolean }
  | { kind: 'input'; label: string; value?: string; secret?: boolean }
  | { kind: 'message'; text: string };

type Screen = {
  id: string;
  title: string;
  logo?: boolean;
  h1?: string;
  sub?: string;
  controls?: Ctl[];
  note?: string;
  spinner?: boolean;
  /** Where Back goes. */
  back?: string;
  /** Auto-advance after a moment, for the processing screens. */
  thenAfter?: { ms: number; go: string };
};

const SCREENS: Screen[] = [
  { id: 'entry', title: 'Entry', logo: true,
    h1: 'Play the shows you love.', sub: 'Sign in or play as a guest.',
    controls: [
      { kind: 'button', look: 'primary', label: 'Sign In', go: 'signin' },
      { kind: 'button', look: 'secondary', label: 'Sign Up', go: 'signup' },
      { kind: 'button', look: 'outline', label: 'Play as a guest', go: 'guest' },
    ],
    note: 'Create an account to save progress. Visit playalong.tv/start on your phone.' },

  { id: 'signin', title: 'Sign In', logo: true, back: 'entry',
    h1: 'Sign In', sub: 'Enter the address you signed up with.',
    controls: [
      { kind: 'input', label: 'Email Address', value: 'example@gmail.com' },
      { kind: 'input', label: 'Password', secret: true, value: '••••••••' },
      { kind: 'button', look: 'primary', label: 'Sign In', go: 'signin-processing' },
      { kind: 'button', look: 'outline', label: 'Forgot password?', go: 'reset' },
    ] },

  { id: 'signin-processing', title: 'Signing in', logo: true, spinner: true,
    h1: 'Signing you in…', back: 'signin', thenAfter: { ms: 1600, go: 'signin-error' } },

  { id: 'signin-error', title: 'Sign-in error', logo: true, back: 'signin',
    h1: 'Sign In', sub: 'Enter the address you signed up with.',
    controls: [
      { kind: 'input', label: 'Email Address', value: 'example@gmail.com' },
      { kind: 'message', text: 'That password does not match this address.' },
      { kind: 'input', label: 'Password', secret: true, value: '••••••' },
      { kind: 'button', look: 'primary', label: 'Try again', go: 'signin-processing' },
      { kind: 'button', look: 'outline', label: 'Forgot password?', go: 'reset' },
    ] },

  { id: 'reset', title: 'Reset password', logo: true, back: 'signin',
    h1: 'Reset Password', sub: 'We will send a link to your address.',
    controls: [
      { kind: 'input', label: 'Email Address', value: 'example@gmail.com' },
      { kind: 'button', look: 'primary', label: 'Send the link', go: 'reset-sent' },
    ] },

  { id: 'reset-sent', title: 'Link sent', logo: true, back: 'entry',
    h1: 'Check your email', sub: 'The link expires in 30 minutes.',
    controls: [{ kind: 'button', look: 'primary', label: 'Back to sign in', go: 'signin' }],
    note: 'Nothing arrived? Look in spam, or try again in a minute.' },

  { id: 'signup', title: 'Sign Up', logo: true, back: 'entry',
    h1: 'Sign Up', sub: 'Sign up on this device or use the link on your phone.',
    controls: [
      { kind: 'input', label: 'Email Address' },
      { kind: 'input', label: 'Password', secret: true },
      { kind: 'button', look: 'primary', label: 'Create account', go: 'signup-processing', disabled: true },
    ],
    note: 'Terms & Privacy Policy are available at playalong.tv/legal.' },

  { id: 'signup-processing', title: 'Creating', logo: true, spinner: true,
    h1: 'Creating your account…', back: 'signup', thenAfter: { ms: 1600, go: 'done' } },

  { id: 'guest', title: 'Guest', logo: true, back: 'entry',
    h1: 'Playing as a guest.', sub: 'Progress is kept on this device only.',
    controls: [
      { kind: 'button', look: 'primary', label: 'Start playing', go: 'done' },
      { kind: 'button', look: 'outline', label: 'Create an account instead', go: 'signup' },
    ] },

  { id: 'done', title: 'Done', logo: true, back: 'entry',
    h1: 'You are in.', sub: 'Everything you play from here is saved.',
    controls: [{ kind: 'button', look: 'primary', label: 'Start over', go: 'entry' }] },
];

const byId = (id: string) => SCREENS.find((s) => s.id === id)!;

function render(screen: Screen, focus: number): string {
  const ctls = (screen.controls ?? []).map((c, i) => {
    if (c.kind === 'message')
      return `<div class="flow__msg">${icon('Alert', 32)}${c.text}</div>`;
    const focused = i === focus;
    if (c.kind === 'input')
      return `<div class="flow__ctl flow__ctl--input${focused ? ' is-focus' : ''}">
        ${icon('Account', 32)}<span class="${c.value ? 'flow__ctl__val' : 'flow__ctl__ph'}">${c.value ?? c.label}</span></div>`;
    return `<div class="flow__ctl flow__ctl--${c.look}${focused ? ' is-focus' : ''}${c.disabled ? ' is-disabled' : ''}">${c.label}</div>`;
  }).join('');

  return `<div class="flow__art"></div><div class="flow__col">
    ${screen.logo ? `<div class="flow__logo">${icon('Play', 44)}PlayAlong</div>` : ''}
    ${screen.h1 ? `<h1 class="flow__h1">${screen.h1}</h1>` : ''}
    ${screen.sub ? `<p class="flow__sub">${screen.sub}</p>` : ''}
    ${screen.spinner ? '<div class="flow__spin"></div>' : ''}
    ${ctls ? `<div class="flow__stack">${ctls}</div>` : ''}
    ${screen.note ? `<p class="flow__note">${screen.note}</p>` : ''}
  </div>`;
}

function createAuthFlow(start?: string): HTMLElement & { __destroy?: () => void } {
  const root: HTMLElement & { __destroy?: () => void } = document.createElement('section');
  root.className = 'card';
  root.innerHTML = `
    <header class="card__head"><div>
      <h1 class="card__title">Auth — sign in, sign up, reset</h1>
      <p class="card__desc">The TV flow assembled from its screens and driven by a remote: <kbd>↑</kbd> <kbd>↓</kbd> move focus, <kbd>Enter</kbd> activates, <kbd>Esc</kbd> goes back. Built from the catalog's own tokens, not from screenshots.</p>
    </div></header>
    <div class="flow">
      <div class="flow__bar" data-role="bar"></div>
      <div class="flow__frame" data-role="frame"><div class="flow__stage" data-role="stage"></div></div>
      <p class="flow__hint">The file's own map: Auth / Entry ├─ Welcome ├─ Sign In Flow ├─ Forgot Password ├─ Guest Mode └─ Profile Select</p>
    </div>`;

  const frame = root.querySelector<HTMLElement>('[data-role=frame]')!;
  const stage = root.querySelector<HTMLElement>('[data-role=stage]')!;
  const bar = root.querySelector<HTMLElement>('[data-role=bar]')!;

  let current = start && SCREENS.some((s) => s.id === start) ? start : 'entry';
  let focus = 0;
  let timer: number | undefined;

  const focusable = (s: Screen) =>
    (s.controls ?? []).map((c, i) => (c.kind === 'message' ? -1 : i)).filter((i) => i >= 0);

  function draw() {
    const s = byId(current);
    stage.innerHTML = render(s, focus);
    bar.innerHTML = SCREENS.map((x) =>
      `<button type="button" class="flow__step${x.id === current ? ' is-here' : ''}" data-go="${x.id}">${x.title}</button>`).join('');
    bar.querySelectorAll<HTMLElement>('[data-go]').forEach((b) =>
      b.addEventListener('click', () => go(b.dataset.go!)));
    if (timer) { clearTimeout(timer); timer = undefined; }
    if (s.thenAfter) timer = window.setTimeout(() => go(s.thenAfter!.go), s.thenAfter.ms);
  }

  function go(id: string) {
    current = id;
    const list = focusable(byId(id));
    focus = list.length ? list[0] : -1;
    draw();
  }

  function move(step: number) {
    const list = focusable(byId(current));
    if (!list.length) return;
    const at = Math.max(0, list.indexOf(focus));
    focus = list[(at + step + list.length) % list.length];
    draw();
  }

  function activate() {
    const s = byId(current);
    const c = (s.controls ?? [])[focus];
    if (c && c.kind === 'button' && c.go && !c.disabled) go(c.go);
  }

  const onKey = (e: KeyboardEvent) => {
    if (!root.isConnected) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); activate(); }
    else if (e.key === 'Escape' || e.key === 'Backspace') {
      const b = byId(current).back; if (b) { e.preventDefault(); go(b); }
    }
  };
  window.addEventListener('keydown', onKey);

  // The stage is 1920 wide; scale it to whatever room the card has.
  const fit = () => {
    const room = frame.clientWidth || root.clientWidth;
    if (!room) return;
    const f = room / 1920;
    stage.style.transform = `scale(${f})`;
    frame.style.height = `${Math.round(1080 * f)}px`;
  };
  requestAnimationFrame(fit);
  window.addEventListener('resize', fit);

  draw();
  root.__destroy = () => {
    if (timer) clearTimeout(timer);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', fit);
  };
  return root;
}

export const FLOWS: CatalogEntry[] = [
  { id: 'flow-auth', title: 'Auth — sign in & sign up', kind: 'screen', section: 'Flows',
    badge: { text: 'Flow', tone: 'demo' },
    open: (host, arg) => {
      host.innerHTML = '';
      const el = createAuthFlow(arg);
      host.appendChild(el);
      return () => el.__destroy?.();
    } },
];
