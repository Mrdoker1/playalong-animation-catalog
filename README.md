# PlayAlong TV — Animation Catalog

Interactive sandbox for the motion system used in PlayAlong TV game overlays
(Family Feud, Card Sharks, and friends). Each animation gets its own page with
a live preview, sliders for duration and easing, and one-click copy of either
the CSS implementation or Figma Smart-Animate parameters.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:4100>.

## Adding a new animation

1. Create a new module under `src/animations/<game>/<name>.ts` exporting an
   `AnimationModule` (see `src/types.ts`).
2. Add any preview-only CSS as a sibling `.css` file and import it from the
   module.
3. Register the module in `src/animations/index.ts`.

The catalog is intentionally vanilla TS — no framework — so each animation is
a plain object with three methods: `render`, `play`, `cssSnippet` /
`figmaSnippet`. Easy to copy, hard to break.

## What's in here

- **Family Feud / Row Reveal Flip** — fully implemented (extracted from
  `tv-game-poc/src/components/FamilyFeudOverlay.css`).
- Eight more animations registered as **TBD** placeholders — fill them in by
  following the same pattern.

## Sources

All ground-truth values come from
[`tv-game-poc`](../tv-game-poc) `FamilyFeudOverlay.css`,
`FamilyFeudBoard.css`, `CardSharks*.css`, etc.
