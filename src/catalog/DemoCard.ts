import type { DemoModule } from './types';

type WithDestroy = HTMLElement & { __destroy?: () => void };

export function createDemoCard(demo: DemoModule): WithDestroy {
  const root: WithDestroy = document.createElement('section');
  root.className = 'card demo';

  const notes = (demo.notes ?? [])
    .map((n) => `<li>${n}</li>`)
    .join('');
  const controls = (demo.controls ?? [])
    .map((c) => `<tr><td><kbd>${c.keys}</kbd></td><td>${c.does}</td></tr>`)
    .join('');

  root.innerHTML = `
    <header class="card__head">
      <div>
        <h1 class="card__title">${demo.title}</h1>
        <p class="card__desc">${demo.description}</p>
      </div>
      <div class="demo__actions">
        <button type="button" class="btn" data-act="reload">Restart</button>
        <a class="btn" href="${import.meta.env.BASE_URL}${demo.src}" target="_blank" rel="noopener">Open full screen</a>
      </div>
    </header>

    <div class="demo__stage">
      <iframe class="demo__frame" title="${demo.title}" src="${import.meta.env.BASE_URL}${demo.src}"
              allow="autoplay" loading="lazy"></iframe>
    </div>

    <div class="demo__side">
      ${controls ? `<div class="demo__block"><h2>Controls</h2><table class="demo__keys">${controls}</table></div>` : ''}
      ${notes ? `<div class="demo__block"><h2>Read this first</h2><ul class="demo__notes">${notes}</ul></div>` : ''}
    </div>
  `;

  const frame = root.querySelector<HTMLIFrameElement>('.demo__frame')!;
  root.querySelector<HTMLButtonElement>('[data-act="reload"]')!
    .addEventListener('click', () => { frame.src = frame.src; });

  // The iframe keeps running — and keeps making noise — unless it is detached.
  root.__destroy = () => { frame.src = 'about:blank'; };
  return root;
}
