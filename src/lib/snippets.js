import { bezierToCss } from './easings';
/* ---------- Web / CSS ----------------------------------------------------- */
export function webBlock(opts) {
    return `${opts.keyframesBody}

${opts.selector} {
  animation: ${opts.keyframesName} ${opts.duration}ms ${bezierToCss(opts.easing.bezier)};
}`;
}
/* ---------- Android / Jetpack Compose ------------------------------------- */
export function composeEasingLine(easing) {
    const [a, b, c, d] = easing.bezier;
    return `val easing = CubicBezierEasing(${a.toFixed(2)}f, ${b.toFixed(2)}f, ${c.toFixed(2)}f, ${d.toFixed(2)}f)`;
}
/* ---------- iOS / SwiftUI ------------------------------------------------- */
export function swiftUITimingCurve(easing, durationMs) {
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
export function rokuEaseFunction(easing) {
    const id = easing.id;
    switch (id) {
        case 'linear': return { name: 'linear', note: '' };
        case 'ease': return { name: 'inOutQuad', note: 'Closest match to CSS ease.' };
        case 'ease-out': return { name: 'outQuad', note: 'Closest match to CSS ease-out.' };
        case 'ease-in': return { name: 'inQuad', note: 'Closest match to CSS ease-in.' };
        case 'ease-in-out': return { name: 'inOutQuad', note: '' };
        case 'back-out': return { name: 'outBack', note: 'Built-in overshoot curve.' };
        case 'material': return { name: 'inOutQuad', note: 'Material standard ≈ inOutQuad.' };
        default: return { name: 'inOutQuad', note: 'Custom cubic-bezier — use FloatFieldInterpolator with hand-tuned key points if precision matters.' };
    }
}
