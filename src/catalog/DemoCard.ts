import type { DemoModule, DemoSetting } from './types';

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

  const readSetting = (st: DemoSetting): number => {
    try {
      const n = parseFloat(localStorage.getItem(st.key) ?? '');
      return Number.isFinite(n) ? Math.min(st.max, Math.max(st.min, n)) : st.fallback;
    } catch {
      return st.fallback;
    }
  };
  const settings = (demo.settings ?? [])
    .map((st, i) => {
      const v = readSetting(st);
      return `<label class="demo__setting">
        <span class="demo__setting-label">${st.label}</span>
        <input type="range" min="${st.min}" max="${st.max}" step="${st.step}" value="${v}" data-setting="${i}" />
        <span class="demo__setting-value" data-setting-value="${i}">${st.format(v)}</span>
      </label>`;
    })
    .join('');

  root.innerHTML = `
    <header class="card__head">
      <div>
        <h1 class="card__title">${demo.title}</h1>
        <p class="card__desc">${demo.description}</p>
      </div>
      <div class="demo__actions">
        ${url ? (demo.actions ?? []).map((a, i) => `<button type="button" class="btn" data-action="${i}">${a.label}</button>`).join('') : ''}
        ${url ? '<button type="button" class="btn" data-act="reload">Restart</button>' : ''}
        ${url ? `<a class="btn" href="${url}" target="_blank" rel="noopener">Open full screen</a>` : ''}
      </div>
    </header>

    ${stage}

    <div class="demo__side">
      ${settings ? `<div class="demo__block"><h2>Settings</h2><div class="demo__settings">${settings}</div></div>` : ''}
      ${controls ? `<div class="demo__block"><h2>Controls</h2><table class="demo__keys">${controls}</table></div>` : ''}
      ${notes ? `<div class="demo__block"><h2>Read this first</h2><ul class="demo__notes">${notes}</ul></div>` : ''}
    </div>
  `;

  root.querySelectorAll<HTMLInputElement>('[data-setting]').forEach((input) => {
    const st = demo.settings![Number(input.dataset.setting)];
    const out = root.querySelector<HTMLElement>(`[data-setting-value="${input.dataset.setting}"]`)!;
    input.addEventListener('input', () => {
      const v = Number(input.value);
      out.textContent = st.format(v);
      try { localStorage.setItem(st.key, String(v)); } catch { /* storage blocked — demo keeps its own value */ }
    });
  });

  const frame = root.querySelector<HTMLIFrameElement>('.demo__frame');
  if (!frame) return root;
  root.querySelectorAll<HTMLButtonElement>('[data-action]').forEach((btn) => {
    const action = demo.actions![Number(btn.dataset.action)];
    btn.addEventListener('click', () => {
      if (frame.contentWindow) action.run(frame.contentWindow);
      frame.focus(); // keep the keyboard driving the demo, not the button
    });
  });
  root.querySelector<HTMLButtonElement>('[data-act="reload"]')
    ?.addEventListener('click', () => { frame.src = frame.src; });

  // The iframe keeps running — and keeps making noise — unless it is detached.
  root.__destroy = () => { frame.src = 'about:blank'; };
  return root;
}
