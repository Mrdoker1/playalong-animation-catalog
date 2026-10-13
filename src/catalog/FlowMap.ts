/**
 * A demo's screens as a diagram: boxes on a grid, arrows between them, the
 * key or event that moves you along written on the arrow.
 *
 * One SVG with a viewBox, so it scales to the card instead of scrolling. The
 * layout is placed by hand (col / row) — an automatic layout would be fine for
 * a graph and wrong for a flow, where left-to-right IS the order things happen.
 */
import { injectStyle } from '../lib/injectStyle';

export type FlowNode = {
  id: string;
  label: string;
  /** Second line, small — a frame name, a duration. */
  sub?: string;
  col: number;
  row: number;
  /** A state of another screen rather than a screen of its own: drawn dashed. */
  state?: boolean;
};

export type FlowEdge = {
  from: string;
  to: string;
  /** What moves you along: a key, an event, a timer. */
  label?: string;
  /** Not a step of the flow but a variant of it ("state of"): drawn dashed. */
  dashed?: boolean;
  /** Where along the arrow the label sits, 0..1 (default .5) -- moved off a crossing. */
  labelAt?: number;
};

export type FlowMapSpec = { nodes: FlowNode[]; edges: FlowEdge[] };

const COL = 262;     // column pitch
const ROW = 96;      // row pitch
const W = 196;       // box
const H = 50;
const PAD = 28;

injectStyle('css-flowmap', `
.flowmap { width: 100%; overflow-x: auto; }
.flowmap svg { display: block; width: 100%; height: auto; font-family: var(--font); }
.flowmap__edge { fill: none; stroke: var(--text-muted); stroke-width: 1.5; }
.flowmap__edge.is-dashed { stroke-dasharray: 5 5; opacity: .7; }
.flowmap__edge-label rect { fill: var(--bg); }
.flowmap__edge-label text { fill: var(--text-dim); font-size: 12px; }
.flowmap__node rect { fill: var(--bg-elevated); stroke: var(--border-strong); stroke-width: 1.5; rx: 10; }
.flowmap__node.is-state rect { stroke-dasharray: 5 4; fill: transparent; }
.flowmap__node text { fill: var(--text); font-size: 13px; font-weight: 600; }
.flowmap__node text.flowmap__sub { fill: var(--text-muted); font-size: 11px; font-weight: 400; }
.flowmap__node.is-here rect { stroke: var(--accent); stroke-width: 2.5; fill: var(--accent-soft); }
.flowmap--pick .flowmap__node { cursor: pointer; }
.flowmap--pick .flowmap__node:hover rect { stroke: var(--accent); }
.flowmap__node:focus-visible { outline: none; }
.flowmap__node:focus-visible rect { stroke: var(--accent); stroke-width: 2.5; }
`);

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export function createFlowMap(spec: FlowMapSpec, opts: { current?: string; onPick?: (id: string) => void } = {}) {
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));
  const cols = Math.max(...spec.nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...spec.nodes.map((n) => n.row)) + 1;
  const vw = PAD * 2 + (cols - 1) * COL + W;
  // Arcs returning to the same box fan out, one step further down each, so two
  // of them never share a line or a label.
  const backs = new Map<string, number>();
  const bend = spec.edges.map((e) => {
    const a = spec.nodes.find((n) => n.id === e.from), b = spec.nodes.find((n) => n.id === e.to);
    if (!a || !b || b.col >= a.col) return 0;
    const k = backs.get(e.to) ?? 0;
    backs.set(e.to, k + 1);
    return k;
  });
  const vh = PAD * 2 + (rows - 1) * ROW + H + 30 + 24 * Math.max(0, ...bend);
  const x = (n: FlowNode) => PAD + n.col * COL;
  const y = (n: FlowNode) => PAD + n.row * ROW;

  const edges = spec.edges.map((e, ei) => {
    const a = byId.get(e.from), b = byId.get(e.to);
    if (!a || !b) throw new Error(`flow edge ${e.from} → ${e.to}: unknown node`);
    let d: string, lx: number, ly: number;
    if (b.col > a.col) {
      // Forward: right edge to left edge, horizontal tangents.
      const x1 = x(a) + W, y1 = y(a) + H / 2, x2 = x(b), y2 = y(b) + H / 2;
      const k = (x2 - x1) / 2;
      d = `M${x1},${y1} C${x1 + k},${y1} ${x2 - k},${y2} ${x2},${y2}`;
      // The label at t along the same cubic, so it stays on the line.
      const t = e.labelAt ?? 0.5, u = 1 - t;
      lx = u ** 3 * x1 + 3 * u * u * t * (x1 + k) + 3 * u * t * t * (x2 - k) + t ** 3 * x2;
      ly = u ** 3 * y1 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t ** 3 * y2;
    } else if (b.col === a.col) {
      // Same column: straight down or up between the boxes.
      const down = b.row > a.row;
      const x1 = x(a) + W / 2, y1 = down ? y(a) + H : y(a), y2 = down ? y(b) : y(b) + H;
      d = `M${x1},${y1} L${x1},${y2}`;
      lx = x1; ly = (y1 + y2) / 2;
    } else {
      // Back: under both boxes, an arc that reads as "returns to".
      const x1 = x(a) + W / 2, y1 = y(a) + H, x2 = x(b) + W / 2, y2 = y(b) + H;
      const dip = Math.max(y1, y2) + 34 + 24 * bend[ei];
      d = `M${x1},${y1} C${x1},${dip} ${x2},${dip} ${x2},${y2}`;
      lx = (x1 + x2) / 2; ly = dip - 8;
    }
    const label = e.label
      ? `<g class="flowmap__edge-label" transform="translate(${lx},${ly})">
           <rect x="${-(e.label.length * 3.4 + 6)}" y="-9" width="${e.label.length * 6.8 + 12}" height="18" rx="4"></rect>
           <text text-anchor="middle" dominant-baseline="central">${esc(e.label)}</text></g>`
      : '';
    return { path: `<path class="flowmap__edge${e.dashed ? ' is-dashed' : ''}" d="${d}" marker-end="url(#fm-arrow)"></path>`, label };
  });

  const nodes = spec.nodes.map((n) => {
    const cy = n.sub ? H / 2 - 7 : H / 2;
    return `<g class="flowmap__node${n.state ? ' is-state' : ''}" data-id="${n.id}"
        transform="translate(${x(n)},${y(n)})"${opts.onPick ? ' tabindex="0" role="button"' : ''}>
      <rect width="${W}" height="${H}"></rect>
      <text x="${W / 2}" y="${cy}" text-anchor="middle" dominant-baseline="central">${esc(n.label)}</text>
      ${n.sub ? `<text class="flowmap__sub" x="${W / 2}" y="${H / 2 + 11}" text-anchor="middle" dominant-baseline="central">${esc(n.sub)}</text>` : ''}
    </g>`;
  });

  const root = document.createElement('div');
  root.className = `flowmap${opts.onPick ? ' flowmap--pick' : ''}`;
  root.innerHTML = `<svg viewBox="0 0 ${vw} ${vh}" style="min-width:${Math.round(vw * 0.66)}px;max-width:${vw}px" role="img" aria-label="Screen flow">
    <defs><marker id="fm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--text-muted)"></path></marker></defs>
    ${edges.map((e) => e.path).join('')}
    ${edges.map((e) => e.label).join('')}
    ${nodes.join('')}
  </svg>`;

  const setCurrent = (id?: string) => {
    root.querySelectorAll<SVGGElement>('.flowmap__node').forEach((g) =>
      g.classList.toggle('is-here', g.dataset.id === id));
  };
  setCurrent(opts.current);

  if (opts.onPick) {
    root.querySelectorAll<SVGGElement>('.flowmap__node').forEach((g) => {
      const pick = () => opts.onPick!(g.dataset.id!);
      g.addEventListener('click', pick);
      g.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ev.stopPropagation(); pick(); }
      });
    });
  }

  return Object.assign(root, { setCurrent });
}
