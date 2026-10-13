import './tokens/tokens.css';
import './styles.css';
import { createSidebar } from './components/Sidebar';
import { ENTRIES } from './catalog/registry';

function init() {
  const app = document.getElementById('app');
  if (!app) return;

  app.className = 'app';
  app.innerHTML = '';

  const main = document.createElement('main');
  main.className = 'main';
  let cleanup: (() => void) | null = null;

  function open(id: string) {
    const entry = ENTRIES.find((e) => e.id === id);
    if (!entry) return;
    cleanup?.();
    cleanup = entry.open(main);
    sidebar.setActive(id);
    if (location.hash.replace(/^#/, '') !== id) location.hash = id;
  }

  const sidebar = createSidebar(open);
  app.appendChild(sidebar.root);
  app.appendChild(main);

  open(location.hash.replace(/^#/, '') || ENTRIES[0].id);

  window.addEventListener('hashchange', () => {
    const next = location.hash.replace(/^#/, '');
    if (next) open(next);
  });
}

init();
