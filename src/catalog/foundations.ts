import type { CatalogEntry } from './types';
import tokens from '../../external/playalong-hub/design-tokens.json';

/**
 * Foundations render the token file itself. Not a copy of it, not a hand-kept
 * table beside it — the same JSON the CSS is generated from. If a swatch here
 * is wrong, the export is wrong, and that is exactly what this page is for.
 */

type Token = { $type?: string; $value: unknown; $description?: string };
type Group = Record<string, unknown>;

function* walk(node: unknown, path: string[] = []): Generator<[string[], Token]> {
  if (!node || typeof node !== 'object') return;
  if ('$value' in (node as Group)) { yield [path, node as Token]; return; }
  for (const [k, v] of Object.entries(node as Group)) {
    if (!k.startsWith('$')) yield* walk(v, [...path, k]);
  }
}

function deref(value: unknown, depth = 0): string {
  if (typeof value !== 'string' || !value.startsWith('{') || depth > 10) return String(value);
  let cur: unknown = tokens;
  for (const seg of value.slice(1, -1).split('.')) cur = (cur as Group)?.[seg];
  return deref((cur as Token)?.$value, depth + 1);
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function page(title: string, note: string, body: string): HTMLElement {
  const root = document.createElement('section');
  root.className = 'card';
  root.innerHTML = `
    <header class="card__head"><div>
      <h1 class="card__title">${title}</h1>
      <p class="card__desc">Rendered from <code>external/playalong-hub/design-tokens.json</code> — the same file the CSS variables are generated from.</p>
    </div></header>
    <p class="foundation__note">${note}</p>
    ${body}`;
  return root;
}

function colourPage(): HTMLElement {
  const section = (label: string, group: unknown, showAlias: boolean) => {
    const chips = [...walk(group)]
      .filter(([, t]) => t.$type === 'color')
      .map(([path, t]) => {
        const value = deref(t.$value);
        const alias = showAlias && typeof t.$value === 'string' && t.$value.startsWith('{')
          ? `<div class="swatch__alias">→ ${esc(t.$value.slice(1, -1).split('.').slice(-2).join('/'))}</div>` : '';
        return `<div class="swatch">
          <div class="swatch__chip" style="background:${value}"></div>
          <div class="swatch__meta">
            <div class="swatch__name">${esc(path.join('/'))}</div>
            <div class="swatch__value">${esc(value)}</div>${alias}
          </div></div>`;
      }).join('');
    return chips ? `<h2 class="foundation__group-title">${label}</h2><div class="swatches">${chips}</div>` : '';
  };

  const grads = [...walk((tokens as Group).gradient)].map(([path, t]) => {
    const v = t.$value as { type: string; stops: { color: string; position: number }[] };
    const stops = v.stops.map((s) => `${s.color} ${Math.round(s.position * 100)}%`).join(', ');
    const css = v.type === 'angular' ? `conic-gradient(from 0deg, ${stops})` : `linear-gradient(180deg, ${stops})`;
    return `<div class="swatch">
      <div class="swatch__chip" style="background:${css}"></div>
      <div class="swatch__meta"><div class="swatch__name">${esc(path.join('/'))}</div>
      <div class="swatch__value">${v.stops.length} stops · ${v.type}</div></div></div>`;
  }).join('');

  return page('Colour',
    'Semantic names are what to use. A primitive is the raw value behind one — if you are reaching for <code>Grey/200</code> rather than <code>TV/Text/Primary</code>, the semantic layer is missing a name.',
    section('Semantic', (tokens as Group).semantic, true) +
    (grads ? `<h2 class="foundation__group-title">Gradients</h2><div class="swatches">${grads}</div>` : '') +
    section('Primitives', (tokens as Group).primitives, false));
}

function typePage(): HTMLElement {
  const rows = [...walk((tokens as Group).typography)].map(([path, t]) => {
    const v = t.$value as Record<string, any>;
    const family = deref(v.fontFamily), size = deref(v.fontSize), line = deref(v.lineHeight);
    const weightName = String(deref(v.fontWeight));
    const WEIGHT: Record<string, number> = { thin:100, extralight:200, light:300, regular:400, normal:400, medium:500, semibold:600, bold:700, extrabold:800, black:900 };
    const weight = WEIGHT[weightName.toLowerCase().replace(/[^a-z]/g, '')] ?? 400;
    const ls = v.letterSpacing as { unit: string; value: number };
    const tracking = ls.unit === 'percent' ? `${ls.value / 100}em` : `${ls.value}px`;
    const style = `font-family:'${family}';font-weight:${weight};font-size:${size};line-height:${line};letter-spacing:${tracking};text-transform:${v.textCase === 'UPPER' ? 'uppercase' : 'none'}`;
    return `<div class="specimen">
      <div class="specimen__meta">
        <div class="specimen__name">${esc(path.join('/'))}</div>
        ${esc(family)} ${esc(weightName)}<br>${esc(size)} / ${esc(line)} · ${esc(tracking)}
        ${t.$description ? `<br><span style="color:var(--text-muted)">measured</span>` : ''}
      </div>
      <div class="specimen__sample" style="${style}">Play along. Out loud.</div>
    </div>`;
  }).join('');

  return page('Typography',
    'Two families, and the split is the game layer: Rubik is the product, the game screens are Roboto Condensed. Sizes below 24 are supporting text on small elements — nothing load-bearing may live in them.',
    `<div class="specimens">${rows}</div>`);
}

const mount = (host: HTMLElement, el: HTMLElement) => {
  host.innerHTML = '';
  host.appendChild(el);
  return () => { /* static page, nothing to tear down */ };
};

export const FOUNDATIONS: CatalogEntry[] = [
  { id: 'foundation-colour', title: 'Colour', kind: 'component', section: 'Foundations',
    badge: { text: 'Tokens', tone: 'ready' }, open: (h) => mount(h, colourPage()) },
  { id: 'foundation-type', title: 'Typography', kind: 'component', section: 'Foundations',
    badge: { text: 'Tokens', tone: 'ready' }, open: (h) => mount(h, typePage()) },
];
