import type { DemoModule } from './types';

type WithDestroy = HTMLElement & { __destroy?: () => void };

export function createDemoCard(demo: DemoModule): WithDestroy {
  const root: WithDestroy = document.createElement('section');
  root.className = 'card demo';

  const url = demo.href ?? (demo.src ? `${import.meta.env.BASE_URL}${demo.src}` : null);

  // A demo with nowhere to point is shown as exactly that, rather than as a
  // broken frame or left out of the list entirely.
  const stage = !url
    ? `<div class="demo__stage demo__stage--empty"><div>
         <p class="demo__empty-title">No address yet</p>
         <p class="demo__empty-body">${demo.hostedNote ?? 'This demo is hosted elsewhere and its URL has not been recorded.'}</p>
       </div></div>`
    : `<div class="demo__stage">
         <iframe class="demo__frame" title="${demo.title}" src="${url}" allow="autoplay" loading="lazy"></iframe>
       </div>`;

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
        ${url ? '<button type="button" class="btn" data-act="reload">Restart</button>' : ''}
        ${url ? `<a class="btn" href="${url}" target="_blank" rel="noopener">Open full screen</a>` : ''}
      </div>
    </header>

    ${stage}

    <div class="demo__side">
      ${controls ? `<div class="demo__block"><h2>Controls</h2><table class="demo__keys">${controls}</table></div>` : ''}
      ${notes ? `<div class="demo__block"><h2>Read this first</h2><ul class="demo__notes">${notes}</ul></div>` : ''}
    </div>
  `;

  const frame = root.querySelector<HTMLIFrameElement>('.demo__frame');
  if (!frame) return root;
  root.querySelector<HTMLButtonElement>('[data-act="reload"]')
    ?.addEventListener('click', () => { frame.src = frame.src; });

  // The iframe keeps running — and keeps making noise — unless it is detached.
  root.__destroy = () => { frame.src = 'about:blank'; };
  return root;
}
