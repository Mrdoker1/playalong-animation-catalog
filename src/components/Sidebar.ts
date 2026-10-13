import { SECTIONS } from '../catalog/registry';

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
      <p class="sidebar__subtitle">Catalog</p>
    </div>
    <input class="sidebar__search" type="search" placeholder="Filter…" aria-label="Filter the catalog" />
  `;

  const collapsed = loadCollapsed();
  const groups: { name: string; el: HTMLElement; toggle: HTMLButtonElement }[] = [];

  function setCollapsed(name: string, el: HTMLElement, toggle: HTMLButtonElement, value: boolean) {
    el.classList.toggle('is-collapsed', value);
    toggle.setAttribute('aria-expanded', String(!value));
    if (value) collapsed.add(name); else collapsed.delete(name);
    saveCollapsed(collapsed);
  }

  for (const section of SECTIONS) {
    const group = document.createElement('div');
    group.className = 'sidebar__group';
    group.innerHTML = `
      <button type="button" class="sidebar__group-title" aria-expanded="true">
        <span class="sidebar__chevron" aria-hidden="true"></span>
        <span class="sidebar__group-name">${section.name}</span>
        <span class="sidebar__group-count">${section.items.length}</span>
      </button>
      <div class="sidebar__group-body"><div class="sidebar__group-items"></div></div>
    `;
    const toggle = group.querySelector<HTMLButtonElement>('.sidebar__group-title')!;
    const list = group.querySelector<HTMLElement>('.sidebar__group-items')!;
    toggle.addEventListener('click', () => {
      setCollapsed(section.name, group, toggle, !group.classList.contains('is-collapsed'));
    });
    if (collapsed.has(section.name)) {
      group.classList.add('is-collapsed');
      toggle.setAttribute('aria-expanded', 'false');
    }
    groups.push({ name: section.name, el: group, toggle });

    for (const entry of section.items) {
      const item = document.createElement('div');
      item.className = 'sidebar__item';
      item.dataset.id = entry.id;
      // The badge is a sub-group -- Controls, Family Feud -- so it has to be
      // searchable, or filtering for a game finds nothing once the games stop
      // being sections of their own.
      item.dataset.search = `${entry.title} ${entry.section} ${entry.badge?.text ?? ''} ${entry.badge?.title ?? ''}`.toLowerCase();
      const badge = entry.badge;
      item.innerHTML = `
        <span class="sidebar__item-name">${entry.title}</span>
        ${badge ? `<span class="sidebar__badge is-${badge.tone ?? 'ready'}"${badge.title ? ` title="${badge.title}"` : ''}>${badge.text}</span>` : ''}
      `;
      item.addEventListener('click', () => onSelect(entry.id));
      list.appendChild(item);
    }
    root.appendChild(group);
  }

  // Filter: hide rows that do not match, and any group left with nothing.
  const search = root.querySelector<HTMLInputElement>('.sidebar__search')!;
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    for (const g of groups) {
      let shown = 0;
      g.el.querySelectorAll<HTMLElement>('.sidebar__item').forEach((el) => {
        const hit = !q || (el.dataset.search ?? '').includes(q);
        el.hidden = !hit;
        if (hit) shown++;
      });
      g.el.hidden = shown === 0;
      if (q && shown > 0 && g.el.classList.contains('is-collapsed')) {
        setCollapsed(g.name, g.el, g.toggle, false);
      }
    }
  });

  function setActive(id: string) {
    root.querySelectorAll('.sidebar__item').forEach((el) => {
      el.classList.toggle('is-active', (el as HTMLElement).dataset.id === id);
    });
    const active = root.querySelector<HTMLElement>('.sidebar__item.is-active');
    const g = groups.find((x) => x.el.contains(active));
    if (g && g.el.classList.contains('is-collapsed')) setCollapsed(g.name, g.el, g.toggle, false);
  }

  return { root, setActive };
}
