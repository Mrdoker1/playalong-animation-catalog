/**
 * A component is rebuilt here in real DOM from the design tokens — not a picture
 * of one. That is deliberate: the point is to look at it AND to be able to hang
 * an animation on it later, which a screenshot cannot carry.
 *
 * Geometry, fills and type styles are read out of Figma node by node. Where the
 * file and the rebuild disagree, `notes` says so rather than the rebuild quietly
 * picking one.
 */
export type ComponentVariant = {
  label: string;
  /** Build a fresh element. Called once per render — never return a shared node. */
  el: () => HTMLElement;
};

export type ComponentModule = {
  /** `c-` prefix, and the URL hash. */
  id: string;
  title: string;
  /** Sidebar sub-grouping inside Components. */
  group: 'Controls' | 'Content' | 'Navigation' | 'Identity' | 'Game' | 'Feedback';
  /** Figma node id, for the deep link. */
  figma: string;
  description: string;
  /** Which tokens it binds, straight out of the Figma file. */
  tokens: { colour: string[]; type: string[] };
  variants: ComponentVariant[];
  /** Anything the rebuild could not settle, or the file got wrong. */
  notes?: string[];
  /** Variants are laid out on a dark product ground unless this says otherwise. */
  ground?: 'dark' | 'neutral';
  /** Full-bleed components (Status Box is 1704 wide) get a column each and scroll. */
  wide?: boolean;
};
