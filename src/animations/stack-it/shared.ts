/**
 * Shared look for Stack It previews. Values come from the Stack It overlay
 * prototype (answer chips, slot ghosts, gold focus ring, results palette).
 */

export const SI = {
  ink:    '#0c1240',
  gold:   '#d9a80b',
  goldHi: '#ffc928',
  lav:    '#7b7fd6',
  win:    '#7bff3c',
  miss:   '#ff2a2a',
  mine:   '#0090ff',
  chipBg: 'linear-gradient(180deg,#f6f9ff 0%,#e2eafb 55%,#b7cbef 100%)',
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
.preview-si-chip {
  position: absolute;
  box-sizing: border-box;
  display: flex; align-items: center; justify-content: center;
  border-radius: 999px;
  background: ${SI.chipBg};
  border: 2px solid #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.4);
  color: ${SI.ink};
  font-weight: 600; font-size: 13px; letter-spacing: .02em; text-transform: uppercase;
  white-space: nowrap;
}
.preview-si-chip.is-focus {
  border: 3px solid ${SI.gold};
  box-shadow: 0 0 12px rgba(255,200,0,0.4), 0 3px 6px rgba(0,0,0,0.4);
  z-index: 4;
}
.preview-si-ghost {
  position: absolute;
  box-sizing: border-box;
  border-radius: 999px;
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
  const border = opts.focus ? `3px solid ${SI.gold}` : '2px solid #fff';
  const glow = opts.focus ? '0 0 10px rgba(255,200,0,0.45),' : '';
  slot.innerHTML = `
    <div style="
      width:130px;height:30px;box-sizing:border-box;
      display:flex;align-items:center;justify-content:center;
      border-radius:999px;background:${SI.chipBg};border:${border};
      box-shadow:${glow}0 2px 4px rgba(0,0,0,0.4);
      color:${SI.ink};font-family:${SI.font};font-weight:600;
      font-size:${opts.fontSize ?? 10}px;letter-spacing:.02em;text-transform:uppercase;
      transform:scale(${opts.scale ?? 1});
      ${opts.extra ?? ''}
    ">${opts.text}</div>
  `;
}
