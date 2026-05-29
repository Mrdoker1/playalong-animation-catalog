/**
 * Generators for code snippets across runtimes. Animation modules can pull
 * these helpers in when their motion is simple enough to fit a single
 * transition; complex multi-step keyframes are still authored by hand.
 */
import type { EasingPreset } from './easings';
import { bezierToCss } from './easings';

/* ---------- Web / CSS ----------------------------------------------------- */

export function webBlock(opts: {
  selector: string;
  duration: number;
  easing: EasingPreset;
  keyframesName: string;
  keyframesBody: string;
}): string {
  return `${opts.keyframesBody}

${opts.selector} {
  animation: ${opts.keyframesName} ${opts.duration}ms ${bezierToCss(opts.easing.bezier)};
}`;
}

/* ---------- Android / Jetpack Compose ------------------------------------- */

export function composeEasingLine(easing: EasingPreset): string {
  const [a, b, c, d] = easing.bezier;
  return `val easing = CubicBezierEasing(${a.toFixed(2)}f, ${b.toFixed(2)}f, ${c.toFixed(2)}f, ${d.toFixed(2)}f)`;
}

/* ---------- iOS / SwiftUI ------------------------------------------------- */

export function swiftUITimingCurve(easing: EasingPreset, durationMs: number): string {
  const [a, b, c, d] = easing.bezier;
  const seconds = (durationMs / 1000).toFixed(2);
  return `.animation(.timingCurve(${a}, ${b}, ${c}, ${d}, duration: ${seconds}), value: state)`;
}

/* ---------- Roku / SceneGraph --------------------------------------------- */

/**
 * Roku's built-in `easeFunction` set is limited (linear, inSine, outSine,
 * inOutQuad, etc.). When the project uses a custom cubic-bezier we fall back
 * to a custom interpolator with explicit key-point pairs. This helper just
 * returns the closest stock function name + a note.
 */
export function rokuEaseFunction(easing: EasingPreset): { name: string; note: string } {
  const id = easing.id;
  switch (id) {
    case 'linear':       return { name: 'linear',        note: '' };
    case 'ease':         return { name: 'inOutQuad',     note: 'Closest match to CSS ease.' };
    case 'ease-out':     return { name: 'outQuad',       note: 'Closest match to CSS ease-out.' };
    case 'ease-in':      return { name: 'inQuad',        note: 'Closest match to CSS ease-in.' };
    case 'ease-in-out':  return { name: 'inOutQuad',     note: '' };
    case 'back-out':     return { name: 'outBack',       note: 'Built-in overshoot curve.' };
    case 'material':     return { name: 'inOutQuad',     note: 'Material standard ≈ inOutQuad.' };
    default:             return { name: 'inOutQuad',     note: 'Custom cubic-bezier — use FloatFieldInterpolator with hand-tuned key points if precision matters.' };
  }
}
