/**
 * The catalog started as one kind of thing — an animation. It is becoming a
 * library of several: demos you can play, screens, components, and the specs
 * behind them.
 *
 * Rather than widen `AnimationModule`, which 18 working modules implement, a
 * `CatalogEntry` is the common shape the shell needs and each kind adapts to
 * it. Nothing existing had to change for demos to appear.
 */
export type CatalogKind = 'animation' | 'demo' | 'screen' | 'component' | 'spec';

export type CatalogEntry = {
  id: string;
  title: string;
  kind: CatalogKind;
  /** Sidebar group. */
  section: string;
  /** Small pill on the sidebar row. */
  badge?: { text: string; tone?: 'ready' | 'tbd' | 'demo' };
  /** Paint into `host`; return a cleanup that runs before the next entry opens. */
  open: (host: HTMLElement) => () => void;
};

/**
 * A demo is a self-contained build dropped into `public/demos/`. It runs in an
 * iframe on purpose: its own CSS and fonts cannot leak into the catalog, and
 * the catalog's cannot leak into it — which is the whole point of looking at it
 * next to the tokens rather than inside them.
 */
export type DemoModule = {
  id: string;
  title: string;
  section: string;
  /** Path under `public/`, e.g. `demos/stack-it.html`. */
  src: string;
  description: string;
  /** What to look at, what is placeholder, what is known-wrong. */
  notes?: string[];
  /** Keyboard / remote mapping, shown beside the frame. */
  controls?: { keys: string; does: string }[];
};
