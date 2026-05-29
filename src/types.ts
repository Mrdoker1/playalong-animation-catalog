import type { EasingPreset } from './lib/easings';

export type AnimationParams = {
  duration: number;
  easing: EasingPreset;
};

export type PlatformId = 'web' | 'android' | 'ios' | 'roku';

export type PlatformSnippets = Record<PlatformId, string>;

export type AnimationFrame = {
  /** Short heading like "Start", "Overshoot", "Settled". */
  label: string;
  /** Optional second line, typically "60% · rotateX -15° · scale 1.04". */
  sublabel?: string;
  /** Paints the frozen state of this frame into the provided slot. */
  render: (slot: HTMLElement) => void;
};

export type AnimationModule = {
  id: string;
  title: string;
  game: 'Family Feud' | 'Card Sharks' | 'Common';
  description: string;
  /**
   * Defaults restored when the user hits "Reset" or first opens the animation.
   */
  defaults: { duration: number; easingId: string };
  /**
   * Multiplier applied to `duration` when the user presses "Slow". Defaults to 4×.
   */
  slowFactor?: number;
  /**
   * Optional keyframe breakdown rendered under the main preview. Each frame
   * shows a frozen state from the animation timeline, useful for design
   * review and storyboarding.
   */
  frames?: AnimationFrame[];
  /**
   * Render the preview inside `stage`. Should set up any DOM/CSS needed. Will be
   * called once when the animation is selected. The optional cleanup callback
   * runs before switching to another animation.
   */
  render: (stage: HTMLElement) => () => void;
  /**
   * Trigger the animation. Called on Play / Replay / parameter change.
   */
  play: (params: AnimationParams) => void;
  /**
   * Implementation snippets for every supported runtime. Each snippet should
   * be drop-in ready, mentioning external file structure only as comments.
   */
  snippets: (params: AnimationParams) => PlatformSnippets;
  /**
   * Short, ticket-ready description that a PM can paste into Jira / Linear.
   * Must include: trigger, visual change, key timings, acceptance criteria.
   */
  pmTicket: () => string;
  /**
   * If `true`, the animation card shows a placeholder instead of stage.
   */
  tbd?: boolean;
};
