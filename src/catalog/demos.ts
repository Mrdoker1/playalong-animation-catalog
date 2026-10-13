import type { DemoModule } from './types';

export const DEMOS: DemoModule[] = [
  {
    id: 'demo-stack-it',
    title: 'Stack It — full overlay',
    section: 'Demos',
    src: 'demos/stack-it.html',
    description:
      'The whole game loop, playable: answer selection, the timed stacking phase, results and Round Complete. Self-contained build, no backend.',
    flow: {
      nodes: [
        { id: 'pick', label: 'Choose an answer', sub: '◀ ▶ ▲ ▼', col: 0, row: 0 },
        { id: 'place', label: 'Place in a slot', sub: '▲ ▼ free slots', col: 1, row: 0 },
        { id: 'full', label: 'Stack full', sub: 'choose a block', col: 2, row: 0 },
        { id: 'move', label: 'Block picked up', sub: '▲ ▼ move', col: 3, row: 0 },
        { id: 'results', label: 'Results', sub: 'Your stack revealed', col: 2, row: 1 },
        { id: 'round', label: 'Round Complete', sub: 'rounds 1–2', col: 3, row: 1 },
        { id: 'game', label: 'Game Complete', sub: 'after round 3', col: 4, row: 1 },
      ],
      edges: [
        { from: 'pick', to: 'place', label: 'OK' },
        { from: 'place', to: 'pick', label: 'OK lock · Back' },
        { from: 'place', to: 'full', label: '6th auto' },
        { from: 'full', to: 'move', label: 'OK' },
        { from: 'move', to: 'full', label: 'OK drop · Back' },
        { from: 'full', to: 'results', label: '0:00' },
        { from: 'results', to: 'round', label: '3 s · OK' },
        { from: 'round', to: 'pick', label: '6 s · OK — next round' },
        { from: 'round', to: 'game', label: 'round 3' },
        { from: 'game', to: 'pick', label: 'OK — new game' },
      ],
    },
    controls: [
      { keys: '← → ↑ ↓', does: 'Choose an answer' },
      { keys: 'OK / Enter', does: 'Move it to the first free slot from the top' },
      { keys: '↑ ↓ then OK', does: 'Move it between free slots, then lock it' },
      { keys: 'Back / Esc', does: 'Return it to the list' },
      { keys: '↑ ↓ + OK', does: 'Until the timer runs out: choose a block, OK picks it up, ↑ ↓ moves it, OK drops it' },
      { keys: 'OK', does: 'On results / Round Complete: skip ahead' },
    ],
    // The demo's window exposes window.stackIt for these.
    actions: [
      { label: 'End timer', run: (win) => (win as Window & { stackIt?: { endTimer(): void } }).stackIt?.endTimer() },
    ],
    notes: [
      'After the fifth answer the sixth fills the last slot on its own.',
      'Scoring is 1 point per correct slot in round 1, 2 in round 2, 5 in the final — 10 / 20 / 50 for all six. The running score is on Round Complete.',
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
    // Each game is a lane: its stages left to right, in the order the episode
    // plays them. Stages are driven by the video's timeline, so a box jumps by
    // reopening the episode and seeking to where that stage starts.
    flow: {
      nodes: [
        { id: 'splash', label: 'Splash', sub: '2 s · loader', col: 0, row: 0 },
        { id: 'home', label: 'Home', sub: 'hero + rails', col: 0, row: 1 },
        { id: 'menu', label: 'Menu', sub: 'rail · ramp · ring', col: 0, row: 2 },
        { id: 'pages', label: 'Search · Profile · Legal', sub: 'menu pages', col: 0, row: 3 },

        { id: 'ff', label: 'Family Feud', sub: 'episode', col: 1, row: 0 },
        { id: 'ff-round', label: 'Panel round', sub: '×4 · board + keyboard', col: 2, row: 0 },
        { id: 'ff-complete', label: 'Round complete', sub: 'Continue · Skip', col: 3, row: 0 },
        { id: 'ff-fm', label: 'Fast Money', sub: '2 parts · 40 s a question', col: 4, row: 0 },
        { id: 'ff-end', label: 'Match results', col: 5, row: 0 },

        { id: 'fm', label: 'Fast Money', sub: 'episode', col: 1, row: 1 },
        { id: 'fm-p1', label: 'Part 1', sub: '5 questions', col: 2, row: 1 },
        { id: 'fm-p2', label: 'Part 2', sub: 'target 200', col: 3, row: 1 },
        { id: 'fm-end', label: 'Match results', sub: 'win · lose', col: 4, row: 1 },

        { id: 'cs', label: 'Card Sharks', sub: 'episode', col: 1, row: 2 },
        { id: 'cs-answer', label: 'Higher or lower?', sub: '▲ Higher · ▼ Lower', col: 2, row: 2 },
        { id: 'cs-locked', label: 'Locked', sub: 'once only', col: 3, row: 2, state: true },
        { id: 'cs-result', label: 'Result', sub: '3 s', col: 4, row: 2 },
        { id: 'cs-end', label: 'End', sub: 'Replay · Back', col: 5, row: 2 },

        { id: 'mg', label: 'Match Game', sub: 'episode', col: 1, row: 3 },
        { id: 'mg-panel', label: 'Panel answer', sub: 'keyboard · timer', col: 2, row: 3 },
        { id: 'mg-reveal', label: 'Panel reveal', sub: 'OK to continue', col: 3, row: 3 },
        { id: 'mg-matchup', label: 'Match-up', sub: '▲ ▼ pick one', col: 4, row: 3 },
        { id: 'mg-end', label: 'End', sub: 'Replay · Back', col: 5, row: 3 },

        { id: 'mg2', label: 'Match Game', sub: 'Executive Edition', col: 1, row: 4 },
        { id: 'mg2-matchup', label: 'Match-up', sub: '15 · 5 s to lock', col: 2, row: 4 },
        { id: 'mg2-end', label: 'End', sub: 'Replay · Back', col: 3, row: 4 },

        { id: 'pc', label: 'The 1% Club', sub: 'episode', col: 1, row: 5 },
        { id: 'pc-press', label: 'Press OK', sub: 'question open', col: 2, row: 5 },
        { id: 'pc-answer', label: 'Answer', sub: 'keyboard · choices', col: 3, row: 5 },
        { id: 'pc-locked', label: 'Locked', sub: "or Time's up", col: 4, row: 5 },
        { id: 'pc-result', label: 'Result', sub: 'correct · incorrect', col: 5, row: 5 },
      ],
      edges: [
        { from: 'splash', to: 'home', label: '2 s' },
        { from: 'home', to: 'menu', label: '◀' },
        { from: 'menu', to: 'pages', label: 'OK' },
        { from: 'home', to: 'ff', label: 'OK' },
        { from: 'home', to: 'fm' },
        { from: 'home', to: 'cs' },
        { from: 'home', to: 'mg' },
        { from: 'home', to: 'mg2' },
        { from: 'home', to: 'pc' },

        { from: 'ff', to: 'ff-round', label: '1:19' },
        { from: 'ff-round', to: 'ff-complete', label: 'all · ✕✕✕' },
        { from: 'ff-complete', to: 'ff-fm', label: 'after 4' },
        { from: 'ff-fm', to: 'ff-end', label: 'win · lose' },

        { from: 'fm', to: 'fm-p1', label: '0:35' },
        { from: 'fm-p1', to: 'fm-p2', label: 'Continue' },
        { from: 'fm-p2', to: 'fm-end', label: 'total' },

        { from: 'cs', to: 'cs-answer', label: '3:08' },
        { from: 'cs-answer', to: 'cs-locked', label: '▲ / ▼', dashed: true },
        { from: 'cs-locked', to: 'cs-result', label: 'time up' },
        { from: 'cs-result', to: 'cs-end', label: '×23' },

        { from: 'mg', to: 'mg-panel', label: '2:48' },
        { from: 'mg-panel', to: 'mg-reveal', label: 'Submit' },
        { from: 'mg-reveal', to: 'mg-matchup', label: 'OK' },
        { from: 'mg-matchup', to: 'mg-end', label: '×10' },

        { from: 'mg2', to: 'mg2-matchup', label: '0:25' },
        { from: 'mg2-matchup', to: 'mg2-end', label: '×15' },

        { from: 'pc', to: 'pc-press', label: '4:07' },
        { from: 'pc-press', to: 'pc-answer', label: 'OK' },
        { from: 'pc-answer', to: 'pc-locked', label: 'Submit' },
        { from: 'pc-locked', to: 'pc-result', label: 'reveal' },
      ],
    },
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
      'Its menu was the <strong>superseded mechanic</strong> — its own CSS said so: <em>"Width animation pushes content right (in flow)."</em> PTV-858 replaced that, so the PoC\'s SideMenu is <strong>replaced at build time by the catalog\'s Menu</strong>: same markup, Figma geometry, icons and motion, driven by the PoC\'s own keys. The rail stays 160 open or shut, the content never shifts, white is the selected page only and focus is the ring. <code>src/shared/menu-ptv858.css</code> holds the numbers both read.',
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
    flow: {
      nodes: [
        { id: 'signin', label: 'Sign In', sub: 'email + password', col: 0, row: 0 },
        { id: 'reset', label: 'Reset Password', sub: 'email', col: 1, row: 0 },
      ],
      edges: [
        { from: 'signin', to: 'reset', label: 'Forgot Password?' },
        { from: 'reset', to: 'signin', label: 'Back' },
      ],
    },
    notes: [
      'Same build as the TV Game PoC, opened with <code>?view=web</code>, which renders only the web screens.',
      'There is no backend: Sign In accepts any non-empty pair and stays on the page. Forgot Password opens Reset Password; Back returns.',
    ],
  },
];
