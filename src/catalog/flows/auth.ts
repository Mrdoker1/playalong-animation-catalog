import { injectStyle } from '../../lib/injectStyle';
import type { CatalogEntry } from '../types';
import { icon } from '../components/icons';
import { button, input, keyboard, type InputState } from '../components/ui/controls';

/**
 * The auth flow, rebuilt from the TV screens node by node.
 *
 * Fourteen frames on page `0:1`, read on 2026-10-13. Every string below is the
 * file's own; every x and y is measured. Where the file is empty or carries a
 * placeholder, so does this — see NOTES at the bottom of the card.
 *
 * **Absolutely positioned, deliberately.** A column layout would be shorter, and
 * it would quietly normalise away the fact that the same Sign In column sits at
 * y = 142 on Login- 6, y = 100 on Login- 7 and y = 110 on Login- 12. That drift
 * is a real finding about the file, so the rebuild keeps it visible instead of
 * averaging it away.
 *
 * Driven by a remote: arrows move focus, Enter activates, Esc goes back. The
 * screen's own focus state — the `State=Focus` variant in Figma — is where focus
 * starts; every other state (typed, alert, disabled) stays as drawn.
 */

const T = (n: string) =>
  `font-family:var(--type-${n}-family);font-weight:var(--type-${n}-weight);font-size:var(--type-${n}-size);line-height:var(--type-${n}-line);letter-spacing:var(--type-${n}-tracking);text-transform:var(--type-${n}-case)`;

injectStyle('css-flow-auth', `
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
.flow__d-xl { ${T('display-xl')}; margin: -10.5px 0 0; }   /* 96/88, glyphs 67 */
.flow__d-l  { ${T('display-l')};  margin: -21.5px 0 0; }   /* 64/88, glyphs 45 */
.flow__h-l  { ${T('heading-l')};  margin: -1px 0 0; white-space: pre-line; }
.flow__h-m  { ${T('heading-m')};  margin: -1px 0 0; color: var(--tv-base-light); }
.flow__b-l  { ${T('body-l')};     margin: -11px 0 0; color: var(--tv-base-light); }

.flow__tabs { display: flex; gap: 24px; }
.flow__tabs .c-tab { width: 343px; }
.flow__btn .c-btn { width: 100%; }
.flow__chk { display: flex; align-items: center; gap: 12px; height: 40px; ${T('body-l')}; }

.flow__qr { width: 320px; height: 320px; border-radius: 12px; overflow: hidden;
  background: var(--tv-base-light); }
.flow__qr img { width: 100%; height: 100%; display: block; }

.flow__bar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.flow__step { font-family: var(--mono); font-size: 11px; padding: 4px 10px;
  border-radius: var(--radius-sm); border: 1px solid var(--border); color: var(--text-dim);
  background: var(--bg-card); cursor: pointer; }
.flow__step.is-here { border-color: var(--accent); color: var(--text); }
.flow__hint { font-family: var(--mono); font-size: 11px; color: var(--text-muted); margin: 0; }
.flow__notes { margin: 0; padding-left: 18px; display: grid; gap: 6px;
  font-size: 13px; line-height: 1.5; color: var(--text-dim); }
.flow__notes code { font-family: var(--mono); font-size: .92em; }
`);

/* ------------------------------------------------------------------ the model */

type El =
  | { t: 'logo'; x: number; y: number }
  | { t: 'text'; x: number; y: number; w: number; cls: string; s: string }
  | { t: 'input'; x: number; y: number; state: InputState; s: string; msg?: string; go?: string }
  | { t: 'btn'; x: number; y: number; w: number; look: string; dis?: boolean; s: string; go?: string }
  | { t: 'tabs'; x: number; y: number; sel: 0 | 1; go: [string, string] }
  | { t: 'chk'; x: number; y: number; s: string }
  | { t: 'kb'; x: number; y: number; go: string }
  | { t: 'qr'; x: number; y: number }
  | { t: 'icon'; x: number; y: number; size: number; name: string };

type Screen = {
  id: string;
  /** What the frame is called in Figma, and its node id. */
  frame: string;
  node: string;
  /** Short label for the step bar. */
  title: string;
  els: El[];
  /** Index into `els` of the element Figma draws focused. */
  focus?: number;
  back?: string;
};

/** Shared copy, so a typo cannot make two screens disagree where the file does not. */
const SIGNIN_SUB = 'Access your profiles, groups, and leaderboard progress. Pick up where you left off.';
const SIGNUP_SUB = 'Sign up on this device or use the link playalong.net/{code}';
const SIGNUP_FOOT = 'Terms & Privacy Policy are available at playalong.net/{code}';
const RESET_SUB = 'Provide your account email address and we’ll send you an email with a link to reset your password.';

/** The Sign In head: logo, title, subhead and the QR/Email tabs. They slide together. */
const signInHead = (top: number, tabSel: 0 | 1, tabGo: [string, string]): El[] => [
  { t: 'logo', x: 140, y: top },
  { t: 'text', x: 140, y: top + 89, w: 710, cls: 'flow__d-xl', s: 'Sign In' },
  { t: 'text', x: 140, y: top + 200, w: 710, cls: 'flow__h-m', s: SIGNIN_SUB },
  { t: 'tabs', x: 140, y: top + 316, sel: tabSel, go: tabGo },
];

const SCREENS: Screen[] = [
  {
    id: 'entry', title: 'Entry', frame: 'Login -1', node: '7144:6579', focus: 3,
    els: [
      { t: 'logo', x: 140, y: 170 },
      { t: 'text', x: 140, y: 259, w: 710, cls: 'flow__d-xl', s: 'Play the shows you love.' },
      { t: 'text', x: 140, y: 458, w: 710, cls: 'flow__h-m', s: 'Sign in or play as a guest.' },
      { t: 'btn', x: 140, y: 558, w: 710, look: 'primary', s: 'Sign In', go: 'signin' },
      { t: 'btn', x: 140, y: 650, w: 710, look: 'secondary', s: 'Sign Up', go: 'signup' },
      { t: 'btn', x: 140, y: 742, w: 710, look: 'outline', s: 'Continue as Guest', go: 'done' },
      { t: 'text', x: 140, y: 854, w: 710, cls: 'flow__b-l',
        s: 'Create an account to save progress. Visit playalong.net/activate on your device.' },
    ],
  },

  {
    id: 'signin', title: 'Sign In', frame: 'Login- 6', node: '7252:8011', focus: 4, back: 'entry',
    els: [
      ...signInHead(142, 1, ['qr', 'signin']),
      { t: 'input', x: 140, y: 578, state: 'focus', s: 'Email Address', go: 'signin-keyboard' },
      { t: 'input', x: 140, y: 674, state: 'default', s: 'Password', go: 'signin-keyboard' },
      { t: 'btn', x: 140, y: 770, w: 710, look: 'primary', dis: true, s: 'Continue' },
      { t: 'btn', x: 140, y: 866, w: 710, look: 'ghost', s: 'Forgot Password?', go: 'reset' },
    ],
  },

  {
    id: 'signin-keyboard', title: 'Sign In · keyboard', frame: 'Login- 8 — React Native',
    node: '7252:8259', focus: 8, back: 'signin',
    els: [
      ...signInHead(142, 1, ['qr', 'signin']),
      { t: 'input', x: 140, y: 578, state: 'typing', s: 'abc' },
      { t: 'input', x: 140, y: 674, state: 'default', s: 'Password' },
      { t: 'btn', x: 140, y: 770, w: 710, look: 'primary', dis: true, s: 'Continue' },
      { t: 'btn', x: 140, y: 866, w: 710, look: 'ghost', s: 'Forgot Password?', go: 'reset' },
      { t: 'kb', x: 1198, y: 173, go: 'signin-typed' },
    ],
  },

  {
    id: 'signin-typed', title: 'Sign In · filled', frame: 'Login- Processing - 1',
    node: '7585:7594', focus: 6, back: 'signin',
    els: [
      ...signInHead(142, 1, ['qr', 'signin']),
      { t: 'input', x: 140, y: 578, state: 'typed', s: 'alexunder@gmail.com' },
      { t: 'input', x: 140, y: 674, state: 'typed', s: '************' },
      { t: 'btn', x: 140, y: 770, w: 710, look: 'primary', s: 'Continue', go: 'done' },
      { t: 'btn', x: 140, y: 866, w: 710, look: 'ghost', s: 'Forgot Password?', go: 'reset' },
    ],
  },

  {
    id: 'signin-error', title: 'Sign In · alert', frame: 'Login- 7', node: '7252:8139',
    focus: 4, back: 'signin',
    els: [
      ...signInHead(100, 1, ['qr', 'signin']),
      { t: 'input', x: 140, y: 536, state: 'alert-focus', s: 'Email Address', msg: 'Message text' },
      { t: 'input', x: 140, y: 674, state: 'alert', s: 'Password', msg: 'Message text' },
      { t: 'btn', x: 140, y: 812, w: 710, look: 'primary', dis: true, s: 'Continue' },
      { t: 'btn', x: 140, y: 908, w: 710, look: 'ghost', s: 'Forgot Password?', go: 'reset' },
    ],
  },

  {
    id: 'signin-show', title: 'Sign In · show password', frame: 'Login- 12', node: '10432:14776',
    focus: 6, back: 'signin',
    els: [
      ...signInHead(110, 1, ['qr', 'signin']),
      { t: 'input', x: 140, y: 546, state: 'default', s: 'Email Address' },
      { t: 'input', x: 140, y: 642, state: 'typed', s: '******' },
      { t: 'chk', x: 140, y: 738, s: 'Show Password' },
      { t: 'btn', x: 140, y: 802, w: 710, look: 'primary', dis: true, s: 'Continue' },
      { t: 'btn', x: 140, y: 898, w: 710, look: 'ghost', s: 'Forgot Password?', go: 'reset' },
    ],
  },

  {
    id: 'qr', title: 'Sign In · QR', frame: 'Sign Up - 14', node: '7252:9291',
    focus: 3, back: 'signin',
    els: [
      { t: 'logo', x: 140, y: 144 },
      { t: 'text', x: 140, y: 233, w: 710, cls: 'flow__d-xl', s: 'Sign In' },
      { t: 'text', x: 140, y: 344, w: 710, cls: 'flow__h-m',
        s: 'Scan the QR code (with your mobile device) or use web-address below to manually authenticate with your TV device' },
      { t: 'tabs', x: 140, y: 496, sel: 0, go: ['qr', 'signin'] },
      { t: 'qr', x: 140, y: 616 },
      { t: 'text', x: 652, y: 669, w: 532, cls: 'flow__h-l',
        s: 'Visit\nplayalong.net/authenticate\nand enter the code below' },
      { t: 'text', x: 540, y: 767, w: 32, cls: 'flow__b-l', s: 'OR' },
      { t: 'text', x: 652, y: 815, w: 511, cls: 'flow__d-xl', s: '698102' },
    ],
  },

  {
    id: 'reset', title: 'Reset', frame: 'Reset Pass - 1', node: '7252:8596', focus: 3, back: 'signin',
    els: [
      { t: 'logo', x: 140, y: 226 },
      { t: 'text', x: 140, y: 315, w: 899, cls: 'flow__d-xl', s: 'Reset your password' },
      { t: 'text', x: 140, y: 514, w: 710, cls: 'flow__h-m', s: RESET_SUB },
      { t: 'input', x: 140, y: 686, state: 'focus', s: 'Email Address', go: 'reset-keyboard' },
      { t: 'btn', x: 140, y: 782, w: 710, look: 'primary', dis: true, s: 'Reset password' },
    ],
  },

  {
    id: 'reset-keyboard', title: 'Reset · keyboard', frame: 'Reset Pass - 3', node: '9038:11487',
    focus: 4, back: 'reset',
    els: [
      { t: 'logo', x: 140, y: 226 },
      { t: 'text', x: 140, y: 315, w: 899, cls: 'flow__d-xl', s: 'Reset your password' },
      { t: 'text', x: 140, y: 514, w: 710, cls: 'flow__h-m', s: RESET_SUB },
      { t: 'input', x: 140, y: 686, state: 'typing', s: 'abc' },
      { t: 'btn', x: 140, y: 782, w: 710, look: 'primary', s: 'Reset password', go: 'reset-typed' },
      { t: 'kb', x: 1198, y: 173, go: 'reset-typed' },
    ],
  },

  {
    id: 'reset-typed', title: 'Reset · filled', frame: 'Reset Pass - 4', node: '9613:12767',
    focus: 4, back: 'reset',
    els: [
      { t: 'logo', x: 140, y: 226 },
      { t: 'text', x: 140, y: 315, w: 899, cls: 'flow__d-xl', s: 'Reset your password' },
      { t: 'text', x: 140, y: 514, w: 710, cls: 'flow__h-m', s: RESET_SUB },
      { t: 'input', x: 140, y: 686, state: 'typed', s: 'abc' },
      // The label really is missing on this frame — see NOTES.
      { t: 'btn', x: 140, y: 782, w: 710, look: 'primary', s: '', go: 'reset-sent' },
    ],
  },

  {
    id: 'reset-sent', title: 'Link sent', frame: 'Reset Pass - 2', node: '7252:8781',
    focus: 4, back: 'signin',
    els: [
      { t: 'logo', x: 140, y: 292 },
      { t: 'icon', x: 140, y: 400, size: 64, name: 'Check Filled' },
      { t: 'text', x: 228, y: 410, w: 546, cls: 'flow__d-l', s: 'Link has been sent!' },
      { t: 'text', x: 140, y: 508, w: 710, cls: 'flow__h-m',
        s: 'An email containing a link to reset your password will be sent to the address on record. If you do not receive one shortly, please try again.' },
      { t: 'btn', x: 140, y: 716, w: 710, look: 'primary', s: 'Back to Sign In', go: 'signin' },
    ],
  },

  {
    id: 'signup', title: 'Sign Up', frame: 'Sign Up - 11 (with links)', node: '7252:8930',
    focus: 3, back: 'entry',
    els: [
      { t: 'logo', x: 140, y: 212 },
      { t: 'text', x: 140, y: 300, w: 710, cls: 'flow__d-xl', s: 'Sign Up' },
      { t: 'text', x: 140, y: 411, w: 710, cls: 'flow__h-m', s: SIGNUP_SUB },
      { t: 'input', x: 140, y: 547, state: 'focus', s: 'Email Address', go: 'signup-keyboard' },
      { t: 'input', x: 140, y: 643, state: 'default', s: 'Password', go: 'signup-keyboard' },
      { t: 'btn', x: 140, y: 739, w: 710, look: 'primary', dis: true, s: 'Continue' },
      { t: 'text', x: 140, y: 851, w: 710, cls: 'flow__b-l', s: SIGNUP_FOOT },
    ],
  },

  {
    id: 'signup-keyboard', title: 'Sign Up · keyboard', frame: 'Sign Up - 15 — React Native',
    node: '7524:22828', focus: 6, back: 'signup',
    els: [
      { t: 'logo', x: 140, y: 212 },
      { t: 'text', x: 140, y: 300, w: 710, cls: 'flow__d-xl', s: 'Sign Up' },
      { t: 'text', x: 140, y: 411, w: 710, cls: 'flow__h-m', s: SIGNUP_SUB },
      { t: 'input', x: 140, y: 547, state: 'typing', s: 'abc' },
      { t: 'input', x: 140, y: 643, state: 'default', s: 'Password' },
      { t: 'btn', x: 140, y: 739, w: 710, look: 'primary', dis: true, s: 'Continue' },
      { t: 'text', x: 140, y: 851, w: 710, cls: 'flow__b-l', s: SIGNUP_FOOT },
      { t: 'kb', x: 1198, y: 173, go: 'signup-typed' },
    ],
  },

  {
    id: 'signup-error', title: 'Sign Up · alert', frame: 'Sign Up - 12', node: '7252:9045',
    focus: 3, back: 'signup',
    els: [
      { t: 'logo', x: 140, y: 162 },
      { t: 'text', x: 140, y: 250, w: 710, cls: 'flow__d-xl', s: 'Sign Up' },
      { t: 'text', x: 140, y: 361, w: 710, cls: 'flow__h-m', s: SIGNUP_SUB },
      { t: 'input', x: 140, y: 497, state: 'alert-focus', s: 'Email Address',
        msg: 'This e-mail address is already in use' },
      { t: 'input', x: 140, y: 635, state: 'alert', s: 'Password',
        msg: 'Password must be at least 8 characters long and contain at least 1 lower case letter, 1 upper case letter and 1 digit' },
      { t: 'btn', x: 140, y: 789, w: 710, look: 'primary', dis: true, s: 'Continue' },
      { t: 'text', x: 140, y: 901, w: 710, cls: 'flow__b-l', s: SIGNUP_FOOT },
    ],
  },

  {
    id: 'signup-typed', title: 'Sign Up · filled', frame: 'Sign Up - Processing - 1',
    node: '7585:7679', focus: 5, back: 'signup',
    els: [
      { t: 'logo', x: 140, y: 212 },
      { t: 'text', x: 140, y: 300, w: 710, cls: 'flow__d-xl', s: 'Sign Up' },
      { t: 'text', x: 140, y: 411, w: 710, cls: 'flow__h-m', s: SIGNUP_SUB },
      { t: 'input', x: 140, y: 547, state: 'typed', s: 'alexunder@gmail.com' },
      { t: 'input', x: 140, y: 643, state: 'typed', s: '************' },
      { t: 'btn', x: 140, y: 739, w: 710, look: 'primary', s: 'Continue', go: 'done' },
      { t: 'text', x: 140, y: 851, w: 710, cls: 'flow__b-l', s: SIGNUP_FOOT },
    ],
  },

  {
    id: 'done', title: 'Let’s Play!', frame: 'Sign Up - 13', node: '7252:9177',
    focus: 4, back: 'entry',
    els: [
      { t: 'logo', x: 140, y: 328 },
      { t: 'icon', x: 140, y: 436, size: 64, name: 'Check Filled' },
      { t: 'text', x: 228, y: 446, w: 287, cls: 'flow__d-l', s: 'Let\'s Play!' },
      { t: 'text', x: 140, y: 544, w: 710, cls: 'flow__h-m',
        s: 'You\'re all set!  Track your progress, earn badges, join challenges.  Let\'s go!' },
      { t: 'btn', x: 140, y: 680, w: 710, look: 'primary', s: 'PlayAlong!', go: 'entry' },
    ],
  },
];

const NOTES = [
  'Every string, every x and every y is read out of the file on 2026-10-13. Nothing here is written to fill a gap — where the file is empty, so is this.',
  'The alert copy on <strong>Login- 7</strong> is the literal placeholder <code>Message text</code>, twice. The file never writes the real sign-in errors; only <strong>Sign Up - 12</strong> carries sentences. <strong>Needs the copy.</strong>',
  'The button on <strong>Reset Pass - 4</strong> has <strong>no label at all</strong> — its text node is gone, while the same button reads <code>Reset password</code> on frames 1 and 3. Drawn empty here. <strong>A file defect.</strong>',
  'The Sign In column sits at a different height on every frame that uses it: y = 142 on Login- 6 and on the processing frame, 110 on Login- 12, 100 on Login- 7. The tabs, inputs and buttons all move with it. <strong>Probably unintended.</strong>',
  'Only <strong>Sign Up - 14</strong> draws the QR tab, and it is a Sign Up frame titled <em>Sign In</em>. The Email tab is selected on every other frame, so this rebuild wires the two tabs together — which the file does not.',
  'The background is the <code>Splash Screen</code> component exported flat, because it is a collage of more than twenty posters under four gradients. A picture here; a component in a client.',
  'The keyboard’s two icon keys are blank 44 × 44 frames in the file. <code>Delete</code> and <code>Mic</code> are read from their positions, not measured.',
  'There is a second, narrower auth flow for web and mobile — <code>Digit Code</code>, <code>Mobile Login</code>, <code>Sign Up 16–20</code>. A separate set of frames, not in here.',
];

/* ----------------------------------------------------------------- rendering */

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Which elements a remote can land on, in the order the D-pad walks them. */
const focusable = (s: Screen) =>
  s.els.map((e, i) => ((e.t === 'btn' && !e.dis) || e.t === 'input' || e.t === 'tabs' || e.t === 'kb' ? i : -1))
    .filter((i) => i >= 0);

/** Focus composes onto the content state rather than replacing it. */
const focusState = (s: InputState): InputState =>
  s === 'alert' || s === 'alert-focus' ? 'alert-focus' : s === 'typing' ? 'typing' : 'focus';
const restState = (s: InputState): InputState =>
  s === 'alert' || s === 'alert-focus' ? 'alert' : s === 'focus' ? 'default' : s;

function elNode(e: El, focused: boolean): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'flow__el';
  wrap.style.left = `${e.x}px`;
  wrap.style.top = `${e.y}px`;

  switch (e.t) {
    case 'logo':
      wrap.classList.add('flow__logo');
      wrap.innerHTML = `<img src="assets/flows/logo.svg" alt="PlayAlong">`;
      break;
    case 'text':
      wrap.style.width = `${e.w}px`;
      wrap.innerHTML = `<p class="${e.cls}">${esc(e.s)}</p>`;
      break;
    case 'icon':
      wrap.innerHTML = icon(e.name, e.size);
      break;
    case 'input':
      // `null` icon: the component has a leading icon at 50%, and every auth
      // screen turns it off.
      wrap.appendChild(input(focused ? focusState(e.state) : restState(e.state), esc(e.s), e.msg, null));
      break;
    case 'btn':
      wrap.classList.add('flow__btn');
      wrap.style.width = `${e.w}px`;
      wrap.appendChild(button(e.look, e.dis ? 'disabled' : focused ? 'focus' : undefined, esc(e.s), null));
      break;
    case 'tabs':
      wrap.classList.add('flow__tabs');
      wrap.innerHTML = ['QR Code', 'Email'].map((label, i) => {
        const on = i === e.sel;
        return `<span class="c-tab${focused && on ? ' is-focus' : on ? ' is-selected' : ''}">${label}</span>`;
      }).join('');
      break;
    case 'chk':
      wrap.classList.add('flow__chk');
      // The real control, not a tick glyph: Figma draws `Checkbox Message` here,
      // focused and unselected — the password below it is still masked.
      wrap.innerHTML = `<span class="c-check is-focusring"><span class="c-check__box"></span></span><span>${esc(e.s)}</span>`;
      break;
    case 'kb':
      wrap.appendChild(keyboard('letters', 'a'));
      break;
    case 'qr':
      wrap.classList.add('flow__qr');
      wrap.innerHTML = `<img src="assets/flows/qr.png" alt="QR code">`;
      break;
  }
  return wrap;
}

/* ------------------------------------------------------------------- the card */

function createAuthFlow(start?: string): HTMLElement & { __destroy?: () => void } {
  const root: HTMLElement & { __destroy?: () => void } = document.createElement('section');
  root.className = 'card';
  root.innerHTML = `
    <header class="card__head"><div>
      <h1 class="card__title">Auth — sign in, sign up, reset</h1>
      <p class="card__desc">Fourteen frames rebuilt from the file and wired together:
        <kbd>↑</kbd> <kbd>↓</kbd> move focus, <kbd>Enter</kbd> activates, <kbd>Esc</kbd> goes back.
        Focus starts where Figma draws it; every other state is as drawn.</p>
    </div></header>
    <div class="flow">
      <div class="flow__bar" data-role="bar"></div>
      <div class="flow__frame" data-role="frame"><div class="flow__stage" data-role="stage"></div></div>
      <p class="flow__hint" data-role="where"></p>
      <ul class="flow__notes">${NOTES.map((n) => `<li>${n}</li>`).join('')}</ul>
    </div>`;

  const frame = root.querySelector<HTMLElement>('[data-role=frame]')!;
  const stage = root.querySelector<HTMLElement>('[data-role=stage]')!;
  const bar = root.querySelector<HTMLElement>('[data-role=bar]')!;
  const where = root.querySelector<HTMLElement>('[data-role=where]')!;

  const byId = (id: string) => SCREENS.find((s) => s.id === id) ?? SCREENS[0];
  let current = start && SCREENS.some((s) => s.id === start) ? start : 'entry';
  let focus = byId(current).focus ?? -1;

  function draw() {
    const s = byId(current);
    stage.innerHTML = '';
    s.els.forEach((e, i) => stage.appendChild(elNode(e, i === focus)));

    bar.innerHTML = SCREENS.map((x) =>
      `<button type="button" class="flow__step${x.id === current ? ' is-here' : ''}" data-go="${x.id}">${x.title}</button>`).join('');
    bar.querySelectorAll<HTMLElement>('[data-go]').forEach((b) =>
      b.addEventListener('click', () => go(b.dataset.go!)));

    where.textContent = `${s.frame} — ${s.node}`;
  }

  function go(id: string) {
    current = id;
    const s = byId(id);
    const list = focusable(s);
    focus = s.focus !== undefined && list.includes(s.focus) ? s.focus : (list[0] ?? -1);
    draw();
  }

  function move(step: number) {
    const list = focusable(byId(current));
    if (!list.length) return;
    const at = list.indexOf(focus);
    focus = list[(Math.max(0, at) + step + list.length) % list.length];
    draw();
  }

  function activate() {
    const e = byId(current).els[focus];
    if (!e) return;
    if (e.t === 'btn' && e.go && !e.dis) go(e.go);
    else if (e.t === 'input' && e.go) go(e.go);
    else if (e.t === 'kb') go(e.go);
    else if (e.t === 'tabs') go(e.go[e.sel === 0 ? 1 : 0]);
  }

  const onKey = (ev: KeyboardEvent) => {
    if (!root.isConnected) return;
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') { ev.preventDefault(); move(1); }
    else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') { ev.preventDefault(); move(-1); }
    else if (ev.key === 'Enter') { ev.preventDefault(); activate(); }
    else if (ev.key === 'Escape' || ev.key === 'Backspace') {
      const b = byId(current).back;
      if (b) { ev.preventDefault(); go(b); }
    }
  };
  window.addEventListener('keydown', onKey);

  // The stage is 1920 wide; scale it into whatever room the card has.
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
