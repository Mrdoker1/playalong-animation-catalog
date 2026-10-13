import type { DemoModule } from './types';

export const DEMOS: DemoModule[] = [
  {
    id: 'demo-stack-it',
    title: 'Stack It — full overlay',
    section: 'Demos',
    src: 'demos/stack-it.html',
    description:
      'The whole game loop, playable: answer selection, the timed stacking phase, results and Round Complete. Self-contained build, no backend.',
    controls: [
      { keys: '↑ ↓ ← →', does: 'Choose an answer; move a placed answer between free slots' },
      { keys: 'OK / Enter', does: 'Place into the first free slot from the top; in the timed phase, pick up and drop' },
      { keys: 'Back / Esc', does: 'Return an answer to the list' },
    ],
    notes: [
      'Scoring is 1 point per correct slot in round 1, 2 in round 2, 5 in the final — 10 / 20 / 50 for all six.',
      'After the fifth answer the sixth fills the last slot on its own.',
      "The contestant's stack is placeholder data.",
      'It already loads <strong>Rubik and Roboto Condensed</strong> — our two families, split the way we split them.',
      'Its colours are its own and do not match the palette yet: <code>#030308</code> where ours is <code>#040810</code>, <code>#FF2A2A</code> where ours is <code>#FF0000</code>. That gap is the point of having it here.',
    ],
  },
];
