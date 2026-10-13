import type { AnimationModule } from '../types';
import { ANIMATIONS } from '../animations';

const COLLAPSED_KEY = 'sidebar:collapsed';

function loadCollapsed(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(COLLAPSED_KEY) ?? '[]'));
  } catch {
    return new Set();
  }
}

function saveCollapsed(collapsed: Set<string>) {
  try {
    localStorage.setItem(COLLAPSED_KEY, JSON.stringify([...collapsed]));
  } catch {
    // Storage unavailable (private mode etc.) — collapse state just won't persist.
  }
}

export function createSidebar(onSelect: (id: string) => void) {
  const root = document.createElement('aside');
  root.className = 'sidebar';

  root.innerHTML = `
    <div class="sidebar__brand">
      <p class="sidebar__title">PlayAlong TV</p>
      <p class="sidebar__subtitle">Animation Catalog</p>
    </div>
  `;

  const collapsed = loadCollapsed();
  const groups: { game: string; el: HTMLElement; toggle: HTMLButtonElement }[] = [];

  function setCollapsed(game: string, el: HTMLElement, toggle: HTMLButtonElement, value: boolean) {
    el.classList.toggle('is-collapsed', value);
    toggle.setAttribute('aria-expanded', String(!value));
    if (value) collapsed.add(game); else collapsed.delete(game);
    saveCollapsed(collapsed);
  }

  const games: AnimationModule['game'][] = ['Family Feud', 'Card Sharks', 'Stack It', 'Common', 'Win/Lose'];
  for (const game of games) {
    const items = ANIMATIONS.filter((a) => a.game === game);
    if (items.length === 0) continue;

    const group = document.createElement('div');
    group.className = 'sidebar__group';
    group.innerHTML = `
      <button type="button" class="sidebar__group-title" aria-expanded="true">
        <span class="sidebar__chevron" aria-hidden="true"></span>
        <span class="sidebar__group-name">${game}</span>
        <span class="sidebar__group-count">${items.length}</span>
      </button>
      <div class="sidebar__group-body"><div class="sidebar__group-items"></div></div>
    `;
    const toggle = group.querySelector<HTMLButtonElement>('.sidebar__group-title')!;
    const list = group.querySelector<HTMLElement>('.sidebar__group-items')!;
    toggle.addEventListener('click', () => {
      setCollapsed(game, group, toggle, !group.classList.contains('is-collapsed'));
    });
    if (collapsed.has(game)) {
      group.classList.add('is-collapsed');
      toggle.setAttribute('aria-expanded', 'false');
    }
    groups.push({ game, el: group, toggle });

    for (const a of items) {
      const item = document.createElement('div');
      item.className = 'sidebar__item';
      item.dataset.id = a.id;
      item.innerHTML = `
        <span>${a.title}</span>
        ${a.tbd ? '<span class="sidebar__badge is-tbd">TBD</span>' : '<span class="sidebar__badge">Ready</span>'}
      `;
      item.addEventListener('click', () => onSelect(a.id));
      list.appendChild(item);
    }
    root.appendChild(group);
  }

  function setActive(id: string) {
    root.querySelectorAll('.sidebar__item').forEach((el) => {
      el.classList.toggle('is-active', (el as HTMLElement).dataset.id === id);
    });
    // Never hide the animation that's open: expand its group.
    const active = root.querySelector<HTMLElement>('.sidebar__item.is-active');
    const g = groups.find((x) => x.el.contains(active));
    if (g && g.el.classList.contains('is-collapsed')) setCollapsed(g.game, g.el, g.toggle, false);
  }

  return { root, setActive };
}
