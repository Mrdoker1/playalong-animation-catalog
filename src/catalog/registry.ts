import type { CatalogEntry } from './types';
import { ANIMATIONS } from '../animations';
import { DEMOS } from './demos';
import { FOUNDATIONS } from './foundations';
import { COMPONENT_ENTRIES } from './components';
import { FLOWS } from './flows/auth';
import { HOME } from './home';
import { createAnimationCard } from '../components/AnimationCard';
import { createDemoCard } from './DemoCard';

type WithDestroy = HTMLElement & { __destroy?: () => void };

const mount = (host: HTMLElement, el: WithDestroy) => {
  host.innerHTML = '';
  host.appendChild(el);
  return () => el.__destroy?.();
};

const fromDemos: CatalogEntry[] = DEMOS.map((d) => ({
  id: d.id,
  title: d.title,
  kind: 'demo',
  section: d.section,
  badge: { text: 'Demo', tone: 'demo' },
  open: (host) => mount(host, createDemoCard(d)),
}));

/**
 * One section, not one per game. Five game groups sat at the same level as
 * Foundations and Components and made the sidebar read as if a show were a
 * peer of the whole component set. The game moves into the badge, which is
 * what Components already does with Controls / Navigation / Identity.
 *
 * Nothing is lost by dropping the Ready / TBD badge: no animation is TBD.
 */
const fromAnimations: CatalogEntry[] = ANIMATIONS.map((a) => ({
  id: a.id,
  title: a.title,
  kind: 'animation',
  section: 'Animations',
  // Shared by several games: say how many, and name them on hover.
  badge: a.usedIn && a.usedIn.length > 1
    ? { text: `${a.usedIn.length} games`, tone: a.tbd ? 'tbd' : 'ready', title: a.usedIn.join(' · ') }
    : { text: a.game, tone: a.tbd ? 'tbd' : 'ready' },
  open: (host) => mount(host, createAnimationCard(a) as WithDestroy),
}));

// HOME is first so the root URL, which has no hash, opens on it rather than
// on the colour swatches -- which told a first-time reader nothing.
export const ENTRIES: CatalogEntry[] = [...HOME, ...FOUNDATIONS, ...COMPONENT_ENTRIES, ...FLOWS, ...fromDemos, ...fromAnimations];

/** Sidebar order. A section with no entries is skipped by the sidebar. */
export const SECTION_ORDER = [
  'Overview',
  'Foundations',
  'Components',
  'Animations',
  'Demos',
];

export const SECTIONS = SECTION_ORDER
  .map((name) => ({ name, items: ENTRIES.filter((e) => e.section === name) }))
  .filter((s) => s.items.length > 0);
