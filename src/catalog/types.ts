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
  /**
   * Paint into `host`; return a cleanup that runs before the next entry opens.
   * `arg` is whatever followed `~` in the hash — used to deep-link a token.
   */
  open: (host: HTMLElement, arg?: string) => () => void;
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
  /**
   * Where the demo lives. Either a path under `public/` for a build that is
   * copied in, or an absolute URL for one that is hosted elsewhere.
   *
   * Not everything can be copied in. `tv-game-poc` is the worked example: its
   * build uses absolute paths, and its video comes through Vercel rewrites that
   * proxy CloudFront and add the CORS headers. A static copy on GitHub Pages
   * would lose both, so it is linked instead.
   */
  src?: string;
  href?: string;
  /** Why it is linked rather than copied, shown on the card. */
  hostedNote?: string;
  description: string;
  /** What to look at, what is placeholder, what is known-wrong. */
  notes?: string[];
  /** Keyboard / remote mapping, shown beside the frame. */
  controls?: { keys: string; does: string }[];
  /**
   * Settings the demo reads from localStorage, shown as sliders under the frame.
   * The frame is same-origin, so writing the key is enough; a demo that listens
   * for `storage` events picks the change up live.
   */
  settings?: DemoSetting[];
  /**
   * Buttons in the card header that drive the running demo, e.g. "End timer".
   * The frame is same-origin, so `run` gets its window and calls what the demo
   * exposes there.
   */
  actions?: { label: string; run: (win: Window) => void }[];
};

export type DemoSetting = {
  /** localStorage key the demo reads. */
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  /** Used when nothing is stored yet. */
  fallback: number;
  format: (value: number) => string;
};
