# PlayAlong TV — Catalog

One place to look at the product: **the design foundations, playable demos, and
the motion system**, side by side and in a browser.

```bash
npm install
npm run dev
```

Before changing anything, read [CLAUDE.md](CLAUDE.md) — the working context:
conventions, product decisions, how the demos are built, and known traps.

## What is in it

| Section | What it holds |
| --- | --- |
| **Foundations** | Colour and typography, rendered **from the token file itself** — not a hand-kept copy beside it |
| **Demos** | Self-contained builds you can actually play, in an iframe |
| **Family Feud · Card Sharks · Stack It · Common · Win/Lose** | The motion system: a live preview per animation, duration and easing you can drag, and drop-in code for web, Android, iOS and Roku |

Screens, components and specs are the next sections. `CatalogEntry` in
[`src/catalog/types.ts`](src/catalog/types.ts) is the shape they plug into, and
nothing existing has to change for a new kind to appear — demos were added that
way.

## The tokens are real, and that is the point

Colour and type come from `design-tokens.json`, generated out of Figma by the
hub's own exporter. Here they travel:

```
Figma  →  playalong-hub/docs/design-tokens.json  →  external/  →  src/tokens/tokens.css
```

**Only the first arrow is a decision.** The rest are copies. If a value here
disagrees with Figma, Figma is right and this is stale — run `npm run external:sync`.

Preview stages use the product's real ground (`--tv-base-dark`, `#040810`)
rather than something close to it, because an animation judged against the wrong
background is judged wrong. The catalog's own chrome keeps a separate palette on
purpose: you should be able to tell where the tool ends and the product begins.

## `external/` holds copies, never sources

This builds to a static site with no access to the private hub, so the files it
needs are copied in and marked as copies. See
[`external/README.md`](external/README.md) — including the warning about what
may and may not be copied, because **this repository is public**.

## Adding things

**An animation** — a module under `src/animations/<game>/<name>.ts` exporting an
`AnimationModule`, registered in `src/animations/index.ts`.

**A demo** — drop a self-contained build into `public/demos/` and add an entry to
`src/catalog/demos.ts`. It runs in an iframe so its CSS and fonts cannot leak
into the catalog, or the catalog's into it.

## Scripts

| | |
| --- | --- |
| `npm run dev` | Regenerate tokens, then serve |
| `npm run build` | Regenerate tokens, type-check, build |
| `npm run external:sync` | Re-copy from the hub and regenerate `tokens.css` |
| `npm run deploy` | Publish `dist/` to GitHub Pages |
