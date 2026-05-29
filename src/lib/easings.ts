export type EasingPreset = {
  id: string;
  label: string;
  bezier: [number, number, number, number];
  description: string;
};

export const EASING_PRESETS: EasingPreset[] = [
  { id: 'linear',       label: 'Linear',                       bezier: [0,    0,    1,    1],    description: 'Constant speed, no acceleration.' },
  { id: 'ease',         label: 'Ease (browser default)',       bezier: [0.25, 0.1,  0.25, 1],    description: 'Generic browser default.' },
  { id: 'ease-out',     label: 'Ease Out',                     bezier: [0,    0,    0.2,  1],    description: 'Fast start, soft landing — good for entrances.' },
  { id: 'ease-in',      label: 'Ease In',                      bezier: [0.4,  0,    1,    1],    description: 'Slow start, fast end — good for exits.' },
  { id: 'ease-in-out',  label: 'Ease In Out',                  bezier: [0.4,  0,    0.2,  1],    description: 'Symmetric — good for ambient loops.' },
  { id: 'back-out',     label: 'Back Out (overshoot)',         bezier: [0.34, 1.56, 0.64, 1],    description: 'Overshoots past the end then settles — bouncy reveals.' },
  { id: 'material',     label: 'Material Standard',            bezier: [0.4,  0,    0.2,  1],    description: 'Material Design "standard" curve.' },
];

export function bezierToCss(b: [number, number, number, number]): string {
  return `cubic-bezier(${b[0]}, ${b[1]}, ${b[2]}, ${b[3]})`;
}

export function bezierToFigma(b: [number, number, number, number]): string {
  // Figma's "Custom Bezier" input takes four numbers in the same order.
  return `${b[0]}, ${b[1]}, ${b[2]}, ${b[3]}`;
}
