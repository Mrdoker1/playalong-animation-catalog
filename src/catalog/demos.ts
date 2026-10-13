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
  {
    id: 'demo-tv-game-poc',
    title: 'TV Game PoC — Family Feud, Card Sharks, Match Game',
    section: 'Demos',
    src: 'demos/tv-game-poc/index.html',
    description:
      'The original proof of concept: full episodes with video, the answer board, strikes and Fast Money. Most of the motion in this catalog was measured from here.',
    controls: [
      { keys: '↑ ↓ ← →', does: 'Navigate' },
      { keys: 'Enter', does: 'Select' },
      { keys: 'Backspace', does: 'Back' },
    ],
    // Same keys and ranges as the Welcome screen they were moved from.
    settings: [
      { key: 'audio.videoVolume', label: 'Video volume', min: 0, max: 1, step: 0.1, fallback: 1, format: (v) => `${Math.round(v * 100)}%` },
      { key: 'audio.sfxVolume', label: 'Sound effects', min: 0, max: 1, step: 0.1, fallback: 0.5, format: (v) => `${Math.round(v * 100)}%` },
      { key: 'playback.roundLeadInSeconds', label: 'Round lead-in', min: 0, max: 15, step: 1, fallback: 10, format: (v) => `${v}s` },
    ],
    notes: [
      'Built from <code>tv-game-poc</code> into this repository — <code>npm run demo:tv-game-poc</code>. Its own source is untouched.',
      'It was built for a domain root, so it is rebuilt here with a base path; without that every asset 404s under a sub-path.',
      'Video came through <strong>Vercel rewrites</strong> proxying CloudFront, which GitHub Pages cannot do. The six stream prefixes now point straight at CloudFront, which already answers cross-origin.',
      'Three of those six are renamed on CloudFront — <code>/fastmoney/</code> is <code>/fast-money/</code>, <code>/matchgame/</code> is <code>/match-game/</code>, <code>/matchgameep2/</code> is <code>/match-game-andy/</code>. A prefix rule would have 404d.',
      'It carries 49 MB of images, audio and episode content.',
      'Opens on a 2 s splash with a loader, then the catalogue. The TV-simulation panel is dropped; its settings are the sliders here — they apply live. Sign In is web, not TV, and is shown separately — see <strong>Web — Sign In</strong>.',
    ],
  },
  {
    id: 'demo-web-sign-in',
    title: 'Web — Sign In',
    section: 'Demos',
    src: 'demos/tv-game-poc/index.html?view=web',
    description:
      'The web side of PlayAlong: Sign In and Reset Password. Separate from the TV app — this is where profiles are managed and a TV gets linked.',
    notes: [
      'Same build as the TV Game PoC, opened with <code>?view=web</code>, which renders only the web screens.',
      'There is no backend: Sign In accepts any non-empty pair and stays on the page. Forgot Password opens Reset Password; Back returns.',
    ],
  },
];
