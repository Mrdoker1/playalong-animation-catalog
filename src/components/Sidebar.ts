import type { AnimationModule } from '../types';
import { ANIMATIONS } from '../animations';

export function createSidebar(onSelect: (id: string) => void) {
  const root = document.createElement('aside');
  root.className = 'sidebar';

  root.innerHTML = `
    <div class="sidebar__brand">
      <p class="sidebar__title">PlayAlong TV</p>
      <p class="sidebar__subtitle">Animation Catalog</p>
    </div>
  `;

  const games: AnimationModule['game'][] = ['Family Feud', 'Card Sharks', 'Common', 'Win/Lose'];
  for (const game of games) {
    const items = ANIMATIONS.filter((a) => a.game === game);
    if (items.length === 0) continue;

    const group = document.createElement('div');
    group.className = 'sidebar__group';
    group.innerHTML = `<div class="sidebar__group-title">${game}</div>`;

    for (const a of items) {
      const item = document.createElement('div');
      item.className = 'sidebar__item';
      item.dataset.id = a.id;
      item.innerHTML = `
        <span>${a.title}</span>
        ${a.tbd ? '<span class="sidebar__badge is-tbd">TBD</span>' : '<span class="sidebar__badge">Ready</span>'}
      `;
      item.addEventListener('click', () => onSelect(a.id));
      group.appendChild(item);
    }
    root.appendChild(group);
  }

  function setActive(id: string) {
    root.querySelectorAll('.sidebar__item').forEach((el) => {
      el.classList.toggle('is-active', (el as HTMLElement).dataset.id === id);
    });
  }

  return { root, setActive };
}
