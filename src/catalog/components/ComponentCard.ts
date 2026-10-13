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
    // The scaler is what gets transformed, so the component itself keeps its
    // real pixel sizes — which is the point of rebuilding it at all.
    const scaler = document.createElement('div');
    scaler.className = 'variant__scaler';
    scaler.appendChild(v.el());
    slot.appendChild(scaler);

    const label = document.createElement('div');
    label.className = 'variant__label';
    label.textContent = v.label;

    cell.append(slot, label);
    host.appendChild(cell);
  }

  // The card is still detached here, so every measurement would be zero. Fit
  // once the browser has laid it out, and again when the window changes.
  //
  // NOT a ResizeObserver on `host`: fit() changes sizes inside host, which
  // re-triggers the observer, which the browser then aborts as a loop -- and it
  // aborts it right after fit() has reset the transforms, so nothing is scaled.
  requestAnimationFrame(() => fit(host));
  const onResize = () => requestAnimationFrame(() => fit(host));
  window.addEventListener('resize', onResize);
  (root as HTMLElement & { __destroy?: () => void }).__destroy =
    () => window.removeEventListener('resize', onResize);
  return root;
}

/**
 * Some components are bigger than any sensible preview — Status Box is 1704
 * wide, Answer Option 552. Rather than clip them or rebuild them smaller, each
 * is scaled down to fit and the factor is written next to it, so nobody reads a
 * shrunken thing as its real size.
 */
function fit(host: HTMLElement) {
  // Widest variant decides the column, so a row of small ones does not get
  // stretched and a single wide one is not squeezed into a narrow column.
  const scalers = [...host.querySelectorAll<HTMLElement>('.variant__scaler')];
  if (!scalers.length) return;

  for (const s of scalers) { s.style.transform = ''; s.style.width = ''; s.style.height = ''; }

  const natural = scalers.map((s) => s.firstElementChild as HTMLElement);
  const widest = Math.max(...natural.map((n) => n.offsetWidth || 0));
  const room = host.clientWidth - 56;                       // the section's own padding
  if (widest > 0) {
    host.style.setProperty('--variant-basis', `${Math.min(widest, room)}px`);
  }

  for (let i = 0; i < scalers.length; i++) {
    const el = natural[i];
    const slot = scalers[i].parentElement as HTMLElement;
    const w = el.offsetWidth, h = el.offsetHeight;
    const available = slot.clientWidth;
    if (!w || !h) continue;
    const factor = available > 0 && w > available ? available / w : 1;
    if (factor < 1) {
      scalers[i].style.transform = `scale(${factor})`;
      // A transform does not change layout, so the slot has to be told.
      scalers[i].style.width = `${w}px`;
      scalers[i].style.height = `${h}px`;
      slot.style.height = `${Math.ceil(h * factor)}px`;
      const label = slot.nextElementSibling as HTMLElement | null;
      if (label) {
        label.dataset.base ??= label.textContent ?? '';
        label.textContent = `${label.dataset.base}  ·  ${w}×${h} at ${Math.round(factor * 100)}%`;
      }
    } else {
      slot.style.height = '';
      const label = slot.nextElementSibling as HTMLElement | null;
      if (label?.dataset.base) label.textContent = label.dataset.base;
    }
  }
}
