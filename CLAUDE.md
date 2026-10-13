# PlayAlong TV Catalog — working context

Everything useful to know before changing this repository: how it is put
together, the decisions behind it, and the traps already stepped in. The
[README](README.md) is the short tour; this is the long one.

> **This repository is public** and so is the site. Whatever lands here is on the
> open internet — see [external/README.md](external/README.md). No credentials,
> client material or private notes.

- Live: <https://mrdoker1.github.io/playalong-animation-catalog/>
- Repo: `github.com/Mrdoker1/playalong-animation-catalog`, branch `main`
- Owner: Viachaslau Kulbitski. Conversations with the owner are in Russian;
  code, comments and docs are in English.

---

## What it is

One browser page for the PlayAlong TV product: **design foundations** (colour,
type — rendered from the real token file), **playable demos** (in iframes), and
the **motion system** — every overlay animation with a live preview, adjustable
duration/easing, a storyboard of frames, drop-in code for four TV platforms and a
ticket-ready description.

## Stack and running it

- Vanilla TypeScript + Vite 5. **No framework**, on purpose — each entry is a
  plain object, easy to copy, hard to break.
- `npm run dev` → <http://localhost:5757/playalong-animation-catalog/>
  (regenerates tokens first).
- `npm run build` → tokens + `tsc` + `vite build`. Type errors fail the build;
  this is the minimum check after any change.
- Vite `base` is `/playalong-animation-catalog/` (override with `BASE=`). Every
  URL lives under it, locally too.
- Routing is the **hash** (`#si-focus`, `#foundation-type`), so any page survives
  a refresh. If a refresh gives *"Error response · 404 · File not found"*, that is
  Python's `http.server`, which knows nothing about the base path — use
  `npm run dev` or `npm run preview`.

## Layout

```text
src/
  main.ts                 shell: sidebar + <main>, hash routing
  catalog/
    types.ts              CatalogEntry (the common shape), DemoModule, DemoSetting
    registry.ts           ENTRIES = foundations + demos + animations; SECTION_ORDER
    foundations.ts        Colour / Typography pages, rendered from the token JSON
    demos.ts              demo entries (iframes)
    DemoCard.ts           demo page: frame, actions, Restart / Open full screen, screen diagram,
                          settings, controls, notes
    FlowMap.ts            the "Screens" diagram every demo carries (SVG, clickable)
    flows/auth.ts         the Auth demo — rebuilt screens, not an iframe
  components/
    Sidebar.ts            collapsible groups + filter
    AnimationCard.ts      animation page: stage, frames, controls, snippets, ticket
  animations/<game>/*.ts  one AnimationModule per file; registered in animations/index.ts
  lib/                    easings, snippet helpers, injectStyle, clipboard
  tokens/tokens.css       GENERATED from external/ — never hand-edit
  types.ts                AnimationModule contract
external/playalong-hub/   COPIES of hub files (tokens). Never edited here
scripts/                  tokens-to-css, sync-external, build-demo-tv-game-poc
assets/tv-game-poc/       our own assets injected into the PoC build (Figma loader)
public/demos/             self-contained demo builds served as-is
```

## Adding things

**A new kind of entry** (screen, component, spec): adapt it to `CatalogEntry` in
`catalog/types.ts` and add it to `registry.ts`. Nothing else has to change —
demos were added this way.

**A new section** (e.g. a new game): add the name to `SECTION_ORDER` in
`registry.ts`, and if it holds animations, to the `game` union in `src/types.ts`.

### Animations

A module in `src/animations/<game>/<name>.ts` exporting an `AnimationModule`
(`src/types.ts`), registered in `src/animations/index.ts` under its game comment.

Conventions every existing module follows — keep them:

- **ids** are prefixed by game: `ff-` Family Feud, `cs-` Card Sharks, `si-` Stack
  It, `wl-` Win/Lose. The id is also the URL hash.
- **Preview CSS** goes through `injectStyle('css-<id>', CSS)` with classes
  prefixed `preview-<game>-…` so modules can't collide. Shared pieces per game go
  in a `shared.ts` (see `stack-it/shared.ts`).
- **`play()` must be replayable**: set `transition/animation: none`, put the
  start state back, force a reflow (`void el.offsetWidth`), then apply the
  motion. Keep every `setTimeout` in a `timers` array and clear it in `play()` and
  in the cleanup returned by `render()`.
- **`duration` and `easing` come from the controls.** Fixed parts of a sequence
  (delays, secondary motions) are named constants, and either scale with
  `duration` or are documented as fixed.
- **`frames`** are a static storyboard (3–5) with a short label and a sublabel
  of exact values (`60% · scale 1.3 · rotate +8°`).
- **`snippets()`** returns web (CSS), Android (Compose), iOS (SwiftUI) and Roku
  (SceneGraph/BrightScript), with the live duration/easing interpolated. They
  are hand-written and are **not compiled** — keep them plausible and correct
  (BrightScript has no `iif`; Compose `remember*` calls not inside conditionals).
- **`pmTicket()`** is pasteable into Jira: `Title`, `Trigger`, `Visual behavior`,
  `Timings`, `Acceptance criteria`. Real numbers, no adjectives.
- Font is **Rubik** everywhere (Roboto Condensed for game bars); both are loaded
  in `styles.css`.
- Easing presets live in `lib/easings.ts`; `glide` `cubic-bezier(.3,.9,.3,1)` is
  the Stack It chip/block curve. A new preset also needs a Roku mapping in
  `rokuEaseFunction` (`lib/snippets.ts`).

### Demos

A self-contained build in `public/demos/` plus an entry in `catalog/demos.ts`.
It runs in an iframe so its CSS and fonts can't leak either way. Optional fields:
`controls` (key table), `notes` (HTML strings), `settings` (sliders — see below),
`actions` (header buttons that call into the running demo, e.g. Stack It's
*End timer* → `window.stackIt.endTimer()`), `flow` (the screen diagram, below).

**Every demo has a "Screens" diagram under the frame** (`FlowMap.ts`): screens as
boxes placed by hand on a col/row grid (left to right is the order things
happen), arrows labelled with the key or event that moves you on, dashed boxes
for states of a screen. Clicking a box opens that screen and the current one is
highlighted. For an iframe demo that works through **`window.catalogFlow =
{ go(id), current() }`**, which the demo must expose — Stack It has it in its
HTML, TV Game PoC and Web — Sign In get it from the build script. Keep labels
short: the gap between columns is ~66px.

All playable things live in **Demos** — Auth too (it used to be a separate
*Flows* section).

**The frame shows only the product; the card holds everything about it.** A demo
carries no instruction panels, remotes or settings screens of its own — those
live on the card (controls, notes, settings, actions), once. Stack It's remote
and rules panel and TV Game PoC's TV-simulation screen were both moved out for
this reason. The card's *Restart* reloads the frame, so demos need no restart
button either.

`settings` write a value to **localStorage under the demo's own key**; the frame
is same-origin, so a demo that listens for `storage` events applies it live.

## Product decisions (why things look the way they do)

### Stack It

Source: the "Stack It Overlay" prototype artifact
(`claude.ai/artifact/Mk6WaHtzX8PMaEywszQiYz`). Timings and colours were taken
from its CSS/JS, not invented. Also playable as `public/demos/stack-it.html`.

- **We animate only our overlay, not the show.** On the results screen, *Su's
  stack* and the *correct stack* are part of the show video — the show rings Su's
  answers green/red itself. **Results Reveal** animates only *Your stack*
  (row r lands at `700 + 350·r` ms, 200 ms after the show rings Su's row r) and
  the "N of 6" line.
- The **round timer belongs to the show** — there is deliberately no timer
  animation in this section (one was added and removed).
- **Focus & Pick Up**: ▲▼ arrows exist only while a block is picked up, and
  travel with it. Before pick-up there are none — matches the prototype.
- **Round Complete** reuses the Family Feud **Feedback** banner motion: drop-in
  (−40 px, scale .94 → 1), one light sweep, then a brightness pulse.

### Win/Lose — Confetti Burst

Ballistic, not "fly up and fade": three nested layers so each axis has its own
curve — horizontal drift (ease-out, drag), rise `ease-out-quad` then fall
`ease-in-quad` (an exact parabola), and a tumble. Rise/fall times come from
`t = √(2h/g)`, so higher tosses hang longer. Pieces leave through the bottom
edge; nothing fades mid-air.

## Design tokens

```text
Figma → playalong-hub/docs/design-tokens.json → external/ → src/tokens/tokens.css
```

Only the first arrow is a decision. If a value here disagrees with Figma, Figma
is right — `npm run external:sync` (needs `../playalong-hub`, a private GitLab
repo, beside this one). `tokens:build` runs on every dev/build.

Preview stages use the product's real ground (`--tv-base-dark`); the catalog's
chrome keeps its own palette so the tool and the product stay distinguishable.

Figma: **OTT TV Design** — file `Gd6wyiODkYk46DjaeyqU9o`.

## TV Game PoC demo — how it is built

`npm run demo:tv-game-poc` builds `../tv-game-poc` into
`public/demos/tv-game-poc/` via `scripts/build-demo-tv-game-poc.mjs`.
**tv-game-poc's own source is never modified** — every change is made at build
time by a wrapper Vite config the script writes to a temp dir:

| What | How |
| --- | --- |
| Sub-path | built with `--base`; plus **root-absolute strings in code** (`"/logo/…"`, `"/Content/…"`, `url(/…)`) are prefixed after the build for every folder in its `public/` — `--base` does not reach them |
| Video | Vercel rewrites don't exist on Pages, so six stream prefixes point straight at CloudFront. Three are **renamed** there (`/fastmoney/`→`/fast-money/`, `/matchgame/`→`/match-game/`, `/matchgameep2/`→`/match-game-andy/`), hence a table, not a prefix rule |
| PasswordGate | replaced by a pass-through |
| Welcome screen | replaced by a 2 s **splash** (its artwork, logo baked in, + Figma "Loader Big", node `557:3037`, from `assets/tv-game-poc/loader-big.png`), then straight to the catalogue. Back on the catalogue does nothing |
| Settings | the Welcome sliders (video volume `audio.videoVolume`, SFX `audio.sfxVolume`, lead-in `playback.roundLeadInSeconds`) are `settings` on the demo card; the PoC gets a `storage` listener so they apply live |
| Web vs TV | Sign In / Reset Password are **web, not TV**: served by the same build under `?view=web` as the separate demo *Web — Sign In* |
| Menu | the PoC's `SideMenu` is **replaced by the catalog's Menu** (PTV-858): rail 160 open or shut, labels over a 220ms ramp, one ring that slides, white = selected page only, focus = the ring. Same Figma geometry and icon set as the catalog component, the PoC's own props and keys. Restyling the PoC menu from outside with CSS was tried twice and broke something every round — don't go back to it |
| Rail scroll | `GameSelectionScreen` computed rail scroll as if the open menu were 340 wide, which made *Featured Games* jump; patched to 160 |
| Screen diagram | `App` and the web app expose `window.catalogFlow` so the card's diagram can switch screens |

Rules of that script:

- **Every patch must find its target or the build fails** (`patch()` throws;
  leftover gate / proxied paths / unprefixed paths are checked after). A silent
  miss would ship the unpatched app.
- The patch plugin must come **first** in `plugins`: `@vitejs/plugin-react`
  compiles TSX in the same `pre` stage, and after it the source text no longer
  matches.
- The wrapper config is a **template literal inside a template literal**.
  `${…}` is evaluated by the outer script (so outer constants like `BASE` work,
  wrapper-local ones don't); backticks and `\0` need escaping one level deeper.
  Put new constants at the top of the script, not inside the wrapper text.
- The build **empties the output folder first** — refreshing the demo during a
  rebuild gives a 404, and a failed build leaves it empty until the next good one.
- The PoC's Babel injects `core-js` imports into **every module it compiles**,
  and they only resolve inside the PoC's folder. So nothing from the catalog is
  *imported* into its build — the replacement menu is generated as a file and
  served via `load()` for `SideMenu.tsx`'s own id, with the icons and the
  `menu-ptv858.css` numbers **inlined** (a CSS import from outside the PoC is
  silently dropped).
- It costs ~49 MB of images, audio and episode content in the repo.

## Deploying

- `npm run deploy` → builds and pushes `dist/` to the `gh-pages` branch.
  Pages takes ~1 min; confirm by checking the bundle name in the live
  `index.html` matches the one just built.
- Commits go straight to `main` (owner's choice), conventional style
  (`feat(demos): …`) with a body listing what changed.
- GitLab has the equivalent (GitLab Pages: a `pages` CI job publishing `public/`);
  not set up.

## Traps already found

- **Inline styles with double quotes inside** `style="…"` cut the attribute
  short — that is why every typography specimen once looked the same. Use single
  quotes inside (`font-family:'Rubik'`).
- **`display: flex` beats the `hidden` attribute.** Add `[hidden]{display:none}`
  for any element that is toggled with `hidden`.
- **localStorage can throw** (private mode, blocked storage): wrap every read and
  write in `try/catch` and keep working without it (sidebar collapse state, demo
  settings).
- Headless verification that works here:
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new
  --window-size=1400,900 --virtual-time-budget=2000 --screenshot=out.png
  "http://localhost:5757/playalong-animation-catalog/#<id>"` — vary the budget to
  catch mid-animation states; `--dump-dom` to read classes.
