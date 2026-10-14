import { injectStyle } from '../lib/injectStyle';
import type { CatalogEntry } from './types';
import { FOUNDATIONS } from './foundations';
import { COMPONENT_ENTRIES } from './components';
import { ANIMATIONS } from '../animations';
import { DEMOS } from './demos';
import { FLOWS } from './flows/auth';

/**
 * The page the catalog opens on when nothing is deep-linked.
 *
 * It exists because the root URL used to land on the colour swatches, which
 * tells a first-time reader nothing about what this is or what the other three
 * sections hold. Everything here is one or two sentences; the detail lives on
 * the pages it points at.
 *
 * The counts are read from the registries rather than typed, so a section that
 * grows cannot leave a stale number here. It imports the source arrays rather
 * than `registry.ts`, which imports this file -- going through the registry
 * would be a cycle.
 */

injectStyle('css-home', `
.home__lead { margin: 0 0 28px; max-width: 72ch; color: var(--text-dim); }
.home__lead strong { color: var(--text); }
.home__grid { display: grid; gap: 16px; margin-bottom: 36px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.home__tile { display: block; padding: 18px 20px; border-radius: var(--radius);
  border: 1px solid var(--border); background: var(--panel); color: inherit;
  text-decoration: none; transition: border-color .15s, transform .15s; }
.home__tile:hover { border-color: var(--accent); transform: translateY(-1px); }
.home__tile-head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 6px; }
.home__tile-name { font-size: 15px; font-weight: 600; }
.home__tile-count { font-family: var(--mono); font-size: 11px; color: var(--text-dim); }
.home__tile-note { margin: 0; font-size: 13px; line-height: 1.5; color: var(--text-dim); }
.home__h2 { font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
  color: var(--text-dim); margin: 0 0 12px; }
.home__list { margin: 0 0 32px; padding-left: 18px; max-width: 76ch; }
.home__list li { margin-bottom: 10px; line-height: 1.6; color: var(--text-dim); }
.home__list strong { color: var(--text); }
.home__list code { font-family: var(--mono); font-size: 12px; }
`);

type Tile = { id: string; name: string; count: number; note: string };

function homePage(): HTMLElement {
  const tiles: Tile[] = [
    {
      id: FOUNDATIONS[0].id,
      name: 'Foundations',
      count: FOUNDATIONS.length,
      note: 'Colour, typography and geometry, rendered from the token file itself — not from a table kept beside it. A swatch that is wrong here means the export is wrong.',
    },
    {
      id: COMPONENT_ENTRIES[0].id,
      name: 'Components',
      count: COMPONENT_ENTRIES.length,
      note: 'Every component rebuilt from the Figma file, with the tokens it binds, the frames it appears on, and where the rebuild and the file disagree.',
    },
    {
      id: ANIMATIONS[0].id,
      name: 'Animations',
      count: ANIMATIONS.length,
      note: 'The motion, playable and scrubbable: timings, easing and what triggers each one. Most of it was measured from the proof of concept rather than specified.',
    },
    {
      id: DEMOS[0].id,
      name: 'Demos',
      count: DEMOS.length + FLOWS.length,
      note: 'Whole flows you can drive with the keyboard — the Stack It game loop, the TV proof of concept, and the sign-in / sign-up screens.',
    },
  ];

  const root = document.createElement('section');
  root.className = 'card';
  root.innerHTML = `
    <header class="card__head"><div>
      <h1 class="card__title">PlayAlong TV — UI catalog</h1>
      <p class="card__desc">The design side of PlayAlong in one place: the components, the tokens they are built from, and the motion between them.</p>
    </div></header>

    <p class="home__lead">Everything here is <strong>rebuilt from the Figma file</strong> and
      kept beside the token export, so it can be looked at, measured and argued with without
      opening Figma. It is a <strong>reference and a demo surface, not client code</strong> —
      the apps are built separately, and nothing in this repository ships to a television.</p>

    <div class="home__grid">
      ${tiles.map((t) => `
        <a class="home__tile" href="#${t.id}">
          <span class="home__tile-head">
            <span class="home__tile-name">${t.name}</span>
            <span class="home__tile-count">${t.count}</span>
          </span>
          <p class="home__tile-note">${t.note}</p>
        </a>`).join('')}
    </div>

    <h2 class="home__h2">How to read it</h2>
    <ul class="home__list">
      <li><strong>Known differences</strong> is the part worth reading. Every component page ends
        with what the rebuild and the Figma file do not agree on, and what is a defect in the file
        rather than in the rebuild — a misspelled variant, a stroke nothing binds, a radius that is
        one component's alone.</li>
      <li><strong>Where it is used</strong> is measured, not guessed: every instance in the file was
        resolved to the frame it sits on. A component used on no frame says so.</li>
      <li><strong>The tokens are generated.</strong> <code>design-tokens.json</code> comes from the
        <code>playalong-hub</code> repository and is turned into CSS variables by
        <code>npm run external:sync</code>. Nothing here hand-copies a colour, and a drift check
        catches it when Figma and the file disagree.</li>
      <li><strong>A number next to a component is its real size in Figma</strong>, and anything wider
        than the column is scaled with the factor written beside it — so a shrunken thing is never
        read as its own size.</li>
      <li><strong>Two links into Figma</strong> on every component. <em>Library</em> opens it on the
        <code>▣ Library</code> sheet, grouped with its neighbours, which is where the team reads it;
        <em>Component</em> opens the definition on <code>❖ Components</code>, which is where it is
        edited. A <em>Library ↗</em> means the sheet shows it only inside another component, and the
        hover says which. Three components are on no sheet at all and carry one link.</li>
    </ul>

    <h2 class="home__h2">What is not here</h2>
    <ul class="home__list">
      <li>Requirements and acceptance criteria — those live in <code>playalong-hub</code>, next to the
        specs they belong to. Per-screen geometry (<code>ui-spec.md</code>) is meant to join this
        catalog later.</li>
      <li>Anything about one platform's implementation. Roku, React Native and the web client each
        keep their own.</li>
    </ul>`;
  return root;
}

export const HOME: CatalogEntry[] = [
  {
    id: 'home',
    title: 'Start here',
    kind: 'component',
    section: 'Overview',
    open: (host) => {
      host.innerHTML = '';
      host.appendChild(homePage());
      return () => {};
    },
  },
];
