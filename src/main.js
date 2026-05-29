import './styles.css';
import { createSidebar } from './components/Sidebar';
import { createAnimationCard } from './components/AnimationCard';
import { ANIMATIONS } from './animations';
function init() {
    const app = document.getElementById('app');
    if (!app)
        return;
    app.className = 'app';
    app.innerHTML = '';
    const main = document.createElement('main');
    main.className = 'main';
    let currentCard = null;
    function open(id) {
        const anim = ANIMATIONS.find((a) => a.id === id);
        if (!anim)
            return;
        if (currentCard?.__destroy)
            currentCard.__destroy();
        main.innerHTML = '';
        currentCard = createAnimationCard(anim);
        main.appendChild(currentCard);
        sidebar.setActive(id);
        location.hash = id;
    }
    const sidebar = createSidebar(open);
    app.appendChild(sidebar.root);
    app.appendChild(main);
    // Open from hash or default to first animation.
    const initialId = location.hash.replace(/^#/, '') || ANIMATIONS[0].id;
    open(initialId);
    window.addEventListener('hashchange', () => {
        const next = location.hash.replace(/^#/, '');
        if (next)
            open(next);
    });
}
init();
