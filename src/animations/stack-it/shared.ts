/**
 * Shared look for Stack It previews. Values come from the Stack It overlay
 * prototype (answer chips, slot ghosts, gold focus ring, results palette).
 */

export const SI = {
  ink:    '#0c1240',
  // Game UI/Yellow, the colour the Stacked - option focus stroke binds. It was
  // #d9a80b, a near miss nothing in the file uses.
  gold:   '#CAA512',
  goldHi: '#ffc928',
  lav:    '#7b7fd6',
  // TV/Text/Gain and TV/Game UI/Red 1 -- the two colours the Stacked - Answer
  // strokes actually bind. They were #7bff3c and #ff2a2a, neither of them in
  // the file.
  win:    '#8CFF4F',
  miss:   '#FF0000',
  mine:   '#0090ff',
  // TV/Background/Stacked: DARK at the top, light at the bottom. It ran the
  // other way here, three stops of its own.
  chipBg: 'linear-gradient(0deg,#EDF3FE 0%,#ACCAEB 100%)',
  font:   "'Rubik', 'Helvetica Neue', Arial, sans-serif",
};

export const SI_BASE_CSS = `
.preview-si-board {
  position: relative;
  background: radial-gradient(120% 140% at 50% 0%, #1b2a7a 0%, #0a1033 60%, #060b24 100%);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  overflow: hidden;
  font-family: ${SI.font};
}
/* Stacked - option, 14283:40589: radius 32 on a 1920 board, which is 1.67% of
   the width -- not a pill, which is what 999px made it. The preview boards are
   drawn at a fixed pixel width, so this is that fraction of it. */
.preview-si-chip {
  position: absolute;
  box-sizing: border-box;
  display: flex; align-items: center; justify-content: center;
  border-radius: 20px;
  background: ${SI.chipBg};
  /* Strokes are OUTSIDE in Stacked - option: white 4 at rest, yellow 8 on focus
     (here at the preview's scale, 2 and 4). Outer shadows, not borders, which
     would draw them inside the chip. */
  box-shadow: 0 0 0 2px #fff, 0 3px 6px rgba(0,0,0,0.4);
  color: ${SI.ink};
  font-weight: 600; font-size: 13px; letter-spacing: .02em; text-transform: uppercase;
  white-space: nowrap;
}
.preview-si-chip.is-focus {
  box-shadow: 0 0 0 4px ${SI.gold}, 0 0 10px 4px rgba(255,246,0,0.6), 0 3px 6px rgba(0,0,0,0.4);
  z-index: 4;
}
.preview-si-ghost {
  position: absolute;
  box-sizing: border-box;
  border-radius: 20px;
  border: 2px dashed rgba(163,168,204,0.6);
}
`;

/** Static chip used inside storyboard frame slots. */
export function frameChip(slot: HTMLElement, opts: {
  text: string;
  focus?: boolean;
  scale?: number;
  fontSize?: number;
  extra?: string;
}) {
  const ring = opts.focus ? `0 0 0 3px ${SI.gold},0 0 8px 3px rgba(255,246,0,0.55),` : '0 0 0 1.5px #fff,';
  slot.innerHTML = `
    <div style="
      width:130px;height:30px;box-sizing:border-box;
      display:flex;align-items:center;justify-content:center;
      border-radius:20px;background:${SI.chipBg};
      box-shadow:${ring}0 2px 4px rgba(0,0,0,0.4);
      color:${SI.ink};font-family:${SI.font};font-weight:600;
      font-size:${opts.fontSize ?? 10}px;letter-spacing:.02em;text-transform:uppercase;
      transform:scale(${opts.scale ?? 1});
      ${opts.extra ?? ''}
    ">${opts.text}</div>
  `;
}
