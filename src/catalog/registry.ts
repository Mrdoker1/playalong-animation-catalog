import type { CatalogEntry } from './types';
import { ANIMATIONS } from '../animations';
import { DEMOS } from './demos';
import { FOUNDATIONS } from './foundations';
import { COMPONENT_ENTRIES } from './components';
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

const fromAnimations: CatalogEntry[] = ANIMATIONS.map((a) => ({
  id: a.id,
  title: a.title,
  kind: 'animation',
  section: a.game,
  badge: a.tbd ? { text: 'TBD', tone: 'tbd' } : { text: 'Ready', tone: 'ready' },
  open: (host) => mount(host, createAnimationCard(a) as WithDestroy),
}));

export const ENTRIES: CatalogEntry[] = [...FOUNDATIONS, ...COMPONENT_ENTRIES, ...fromDemos, ...fromAnimations];

/** Sidebar order. A section with no entries is skipped by the sidebar. */
export const SECTION_ORDER = [
  'Foundations',
  'Components',
  'Demos',
  'Family Feud',
  'Card Sharks',
  'Stack It',
  'Common',
  'Win/Lose',
];

export const SECTIONS = SECTION_ORDER
  .map((name) => ({ name, items: ENTRIES.filter((e) => e.section === name) }))
  .filter((s) => s.items.length > 0);
