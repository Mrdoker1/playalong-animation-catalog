import type { ComponentModule } from './types';

const FILE = 'Gd6wyiODkYk46DjaeyqU9o';

export function createComponentCard(c: ComponentModule): HTMLElement {
  const root = document.createElement('section');
  root.className = 'card';

  // A colour chip links into the Colour page at that token; a type chip into
  // Typography. Reading "which token is this" and then hunting for it by eye was
  // the slow half of using this page.
  const chips = (list: string[], kind: 'colour' | 'type') =>
    list.length
      ? list.map((t) => {
          const page = kind === 'colour' ? 'foundation-colour' : 'foundation-type';
          return `<a class="token-chip token-chip--${kind}" href="#${page}~${t}">${t}</a>`;
        }).join('')
      : '<span class="token-chip token-chip--none">none</span>';

  root.innerHTML = `
    <header class="card__head">
      <div>
        <h1 class="card__title">${c.title}</h1>
        <p class="card__desc">${c.description}</p>
      </div>
      <a class="btn" target="_blank" rel="noopener"
         href="https://www.figma.com/design/${FILE}/OTT-TV-Design?node-id=${c.figma.replace(':', '-')}">Open in Figma</a>
    </header>

    <div class="variants variants--${c.ground ?? 'dark'}${c.wide ? ' variants--wide' : ''}" data-role="variants"></div>

    <div class="comp__meta">
      <div class="comp__block">
        <h2>Colour tokens</h2>
        <div class="token-chips">${chips(c.tokens.colour, 'colour')}</div>
      </div>
      <div class="comp__block">
        <h2>Type tokens</h2>
        <div class="token-chips">${chips(c.tokens.type, 'type')}</div>
      </div>
    </div>

    ${c.notes?.length ? `<div class="comp__block comp__block--notes">
      <h2>Known differences</h2>
      <ul class="demo__notes">${c.notes.map((n) => `<li>${n}</li>`).join('')}</ul>
    </div>` : ''}
  `;

  const host = root.querySelector<HTMLElement>('[data-role=variants]')!;
  for (const v of c.variants) {
    const cell = document.createElement('div');
    cell.className = 'variant';
    const slot = document.createElement('div');
    slot.className = 'variant__slot';
    slot.appendChild(v.el());
    const label = document.createElement('div');
    label.className = 'variant__label';
    label.textContent = v.label;
    cell.append(slot, label);
    host.appendChild(cell);
  }
  return root;
}
