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

  function open(route: string) {
    const [id, arg] = route.split('~');
    const entry = ENTRIES.find((e) => e.id === id);
    if (!entry) return;
    cleanup?.();
    cleanup = entry.open(main, arg);
    sidebar.setActive(id);
    if (location.hash.replace(/^#/, '') !== route) location.hash = route;
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
