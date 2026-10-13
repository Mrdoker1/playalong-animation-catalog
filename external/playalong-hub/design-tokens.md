# Design tokens

> **Status:** current — the Figma file was read and reorganised on 2026-10-12. **Owner:** Viachaslau Kulbitski (design).
>
> One source of truth for colour, typography, spacing, focus and the TV
> constraints, across every client.
>
> **Deliberately thin, and dated.** A post-MVP restyle will replace most of the
> values below, and that is why this file records what is *already on screen in
> the MVP* rather than a design system. Nothing has been extrapolated. The
> questions that need a designer's decision rather than a measurement are still
> open, at the bottom, and they are the part that outlives the restyle.
>
> Filling it now rather than after the restyle is a deliberate trade:
> [PTV-858](../specs/PTV-858-menu-no-content-shift/spec.md) is writing `#0090FF`, a 6px focus outline, a 160-wide rail
> and a 792-wide dimming ramp into the Roku build this week, and QA checks that build
> against Figma. Those numbers currently live in three places with nothing
> reconciling them.

## The machine-readable copy

[`design-tokens.json`](design-tokens.json) — the values, exported from Figma on
2026-10-12. **131 tokens: 55 primitives, 43 semantic, 16 gradients, 17 type
styles.** 104 alias references, all resolving.

**It is PlayAlong's own format, not DTCG** (design, 2026-10-12). It is
*DTCG-shaped* — `$type` / `$value`, `{dot.path}` aliases — because that shape is
familiar and most tooling can be pointed at it. It is deliberately not
conformant, and the format is specified below so nobody has to guess.

The 43 semantic are 40 colours plus the three focus tokens below — the first
non-colour semantic tokens, and the reason the exporter now understands a
semantic value that is a number rather than a colour alias.

This file is the prose — what a token is for, why it exists, what was decided
and when. The JSON is the values, and it is what a generator or a client reads.

**The JSON is generated; this file is written.** Do not hand-edit the JSON —
change the variable or the style in Figma and re-export. The export is the
`/design-tokens` skill plus [`scripts/tokens.py`](../scripts/tokens.py), split
that way because reading Figma needs the MCP connector and everything after the
read does not. The same two steps answer the other question — *is the JSON still
true?* — in `check` mode, which prints what diverged and exits non-zero rather
than overwriting anything.

**A drift report says the two disagree, not which is right.** Figma is the
source for a *value*; whether that value should have changed is a design
decision and it is mine.

## The format

Design's deliverable is this file and the JSON — [ADR
0008](decisions/0008-design-hands-over-tokens-and-rules.md). The JSON is no use
without its rules, so here they are.

**Four top-level groups**, and the layering is the point:

| Group | What it holds |
| --- | --- |
| `primitives` | Raw values. Colours, font families, weights, sizes, line heights. Nothing in here says what it is *for* |
| `semantic` | Roles. Almost all are `{primitives...}` aliases; a few hold a value directly |
| `gradient` | Gradients, which cannot be Figma variables and so have no primitive behind them |
| `typography` | Composite type styles |

**Every token is `{"$type": ..., "$value": ...}`,** optionally with
`"$description"`. An alias is a string `"{group.path.to.token}"`; dots separate
path segments, and a segment may contain spaces (`{primitives.color.Red.600 50%}`).

**The value shapes, exactly:**

| `$type` | `$value` |
| --- | --- |
| `color` | Hex string, `#RRGGBB` or `#RRGGBBAA`. Alpha is in the hex, never a separate field |
| `dimension` | String with a `px` suffix — `"96px"`. **Not** an object |
| `fontFamily` | String — `"Rubik"` |
| `fontWeight` | String as Figma names it — `"SemiBold"`, `"ExtraBold"`. **Not** lowercase-hyphenated |
| `gradient` | `{"type": "linear" \| "angular", "stops": [{"color": hex, "position": 0…1}]}`. **An object, not an array** — the array alone has nowhere to put the gradient's kind |
| `typography` | `{fontFamily, fontWeight, fontSize, lineHeight, letterSpacing, textCase}` |

**Inside `typography`:**

- `fontFamily`, `fontWeight`, `fontSize`, `lineHeight` are aliases when a
  primitive carries that value, and literals when none does.
- **`lineHeight` is in pixels**, like `fontSize`. Not a multiplier: both TV
  clients work in pixels, so a ratio would make every consumer multiply and
  round.
- `letterSpacing` is `{"unit": "percent" | "pixels", "value": n}`. Figma uses
  both units and the distinction is not recoverable once flattened.
- `textCase` is `"ORIGINAL"` or `"UPPER"`. A style that is always set in caps is
  a typographic decision, and dropping it would lose it.

**Why not DTCG.** Checked against the 2025.10 Format Module on 2026-10-12, six
differences remain after the one real bug was fixed: dimensions as strings,
`letterSpacing` as an object, `textCase` at all, the gradient shape, and
font-weight casing. **Three of those are things this product actually needs** —
percent letter-spacing, caps as data, and a gradient kind — and the spec is
itself a draft that says of itself "do not attempt to implement this version".
Chasing it across six platforms would cost more than it returns, and the result
would still not be a thing any client reads directly.

> **One real bug was found and fixed by that check, which is why it was worth
> running.** `lineHeight` briefly held a multiplier, because DTCG reads it that
> way and the file claimed to be DTCG. It is pixels again now that the claim is
> gone. Had the claim stayed, a conforming tool would have read `Display/XL` as
> 96 × 88.

`Web/Label/Primary` is the one style whose line height is `AUTO` in Figma, so it
carries no number at all. **It is measured rather than guessed** — Rubik Bold 14
renders at 17px — and the token says so in its own description. The export
measures any `AUTO` style, and the build refuses to run on a line height that is
not a number rather than inventing one.

Nothing runs the check on a schedule yet. Run it when Figma has been edited,
and before trusting these numbers in a review.

```
primitives → semantic → used by a style or a text style in Figma → used by a node
```

Three layers, and the point of the middle one is that `TV/Base/Light`,
`Web/Base/Light` and `Web/Text/Primary` all resolve to the single primitive
`White/Base`. Before 2026-10-12 they were three unrelated copies of white.

**Gradients are in the JSON but cannot be Figma variables** — a colour variable
holds one solid colour. Sixteen of the 128 are therefore styles in Figma and
plain token objects in the JSON. Any estimate of "convert the tokens to
variables" has to exclude them.

## Why this file exists, specifically here

**Today there are two independent token sources for one product, and nothing
reconciles them:**

| Client | Where its tokens live |
| --- | --- |
| `multiplatform-rn-app` | `src/core/theme/` — the `AppTheme` contract, TV-optimised defaults |
| `roku-app` | `resources/config/appConfig.json` — fonts and colours, keyed by `app_api_environment` |

Nobody owns the question of whether the same button looks the same on Apple TV
and on Roku. That question is what this file answers, and it is why the file is in
the hub rather than in either client.

## Provenance

Read from the Figma file `OTT-TV Design` (`Gd6wyiODkYk46DjaeyqU9o`) on
**2026-09-18** and re-read in full on **2026-10-12** through the Figma MCP.

> **They used to be styles and nothing else, and that is why the variables now
> exist.** On 2026-10-07 Dmytro Dutko pointed out that this file was calling
> them variables when the Figma file held exactly one — a boolean prototyping
> flag — and every value the product used was a *style*. That mattered, because
> a style cannot do what a variable does: no modes, no aliasing, no
> primitive-to-semantic layer, and no export. The correction was the reason to
> build the layer rather than keep describing one that was not there.
>
> **Built on 2026-10-12.** The styles stayed — a style is still what a node
> binds to — but every solid one is now bound to a variable behind it, and the
> values live in the variables.

**Inventory, 2026-10-12**, after the work below:

| | Count |
| --- | --- |
| Variables | **98** — `Primitives` 55, `Semantic` 43, one mode each (`Value`). Every one carries a description and a `codeSyntax` (WEB) name |
| Paint styles | **56** — 40 solid, **all 40 bound to a `Semantic` variable**, plus 16 gradients. `TV/` 45, `Web/` 11 |
| Text styles | **17** — every one bound to the typography primitives |
| Effect styles | **2** — `Keyboard`, `Shadow 1`; neither is tokenised, both are described |

> **`Primitives` is hidden from publishing; `Semantic` is not** (design,
> 2026-10-12). Anyone consuming this as a library picks from `TV/Text/Primary`
> and never sees `Grey/200`. Published side by side, the primitives win on being
> shorter and higher in the picker, and the semantic layer stops meaning
> anything within a week.
>
> **The prototyping flag is gone.** `Show selected state`, and the collection
> `Variable collection` that held only it, were deleted on 2026-10-12 after a
> sweep of all eight product pages found zero uses — no binding, no prototype
> reaction. Its job belongs to the `isSelected` variant on the
> `Selection Radio Button` component set, which is where selection state for one
> component belongs. A boolean variable earns its place when state must outlive a
> screen transition or be shared across components; this one did neither. Trash
> and Dima's Trash were not swept.

**Scope: the TV clients only** — RN and Roku (design, 2026-09-18). The web has
its own set and is kept separately. Two of the nodes read in September turned out
to be web, both named `Input`, and their tokens were taken back out rather than
left in as TV values.

Every value here was read from the file. None was inferred from a screenshot,
copied out of either client, or filled in to complete a pattern. Where a value
came from somewhere other than Figma, the row says so.
## Constraints that are not negotiable on TV

Verified from the RN repository's own documentation, and they apply to every
client:

- Font sizes **≥ 24sp**, touch/focus targets **≥ 44px** — the ten-foot rule.
- **Focus is the primary interaction model**, not pointer or touch. Every visual
  state has to work when the only feedback is a focus ring moving under a D-pad.
- **Voice-first parity** (product brief §5): every interactive flow must be
  completable by voice and by remote alone. No flow may require text entry on a
  D-pad. This is a design constraint before it is an engineering one.
- **Tizen has no voice support** — a known gap, so the remote-only path is not a
  fallback, it is a supported path.

> **The ≥ 24 floor is for text meant to be read from the sofa, and the three
> styles below it are a deliberate exception** (design, 2026-10-07). `Rubik
> Regular 20`, `Rubik Medium 18 CAPS` and `Rubik Regular 14` carry supporting
> text on small elements — pills, tags, metadata — where the text is **not
> meant to be legible at distance**. Normal sizes are used everywhere else.
>
> **The consequence, which is the testable half:** nothing load-bearing may live
> in those three styles. If a piece of information exists only at 20, 18 or 14,
> that is a defect, whatever the size looks like in Figma — because the rule
> above says that text is not expected to be read. *(Drawn from the rule rather
> than stated with it — correct it if it goes further than intended.)*

## Colour

**Fifty paint styles, in two platform sets: `TV/` (39) and `Web/` (11).**
Read 2026-10-12, after a day of work in the file described at the end of this
section.

### TV

| Group | Styles |
| --- | --- |
| `TV/Base/` | `Dark` `#040810` · `Black` `#000000` · `Neutral` `#202228` · `Light` `#FFFFFF` |
| `TV/Text/` | `Primary` `#D1D5DB` · `Muted` `#94A3B8` · `Success` `#008E11` · `Gain` `#8CFF4F` |
| `TV/Button/` | `Primary` grad `#0090FF → #0022AB` · `Primary Solid` `#0090FF` · `Secondary` `#FFFFFF` @10% |
| `TV/Border/` | `White 20` `#FFFFFF` @20% |
| `TV/Tags/` | `Primary` `#000CB8` · `Secondary` `#57053C` |
| `TV/Progress/` | `Track` `#5C5E65` |
| `TV/Game UI/` | `Yellow` `#CAA512` · `Green 1` `#00C441` · `Red 1` `#FF0000` · `Red 2` `#8E0000` · `Sand` `#D9A671` · `Gold` (8-stop metal ramp) |
| `TV/Status/` | seven gradients — `Wait` `#0056C6 → #001462` · `Success` `#008E11 → #053800` · `Failure` `#8E0000 → #380000` · `Purple` `#422DFF → #ACACAC` · `Round Complete` · `You Win!` · `You Lose!` (the last three are glows: one colour at 0 → 100 → 0% alpha) |
| `TV/Transparent/` | `Dark 20 25 40 50 70 80 90` (`#000000`) · `White 6 10 25` (`#FFFFFF`) · `Red 50` `#AA2626` |

**What each of the less obvious ones is for**, established by looking at what it
colours rather than by guessing:

- `TV/Base/Black` is **not** `TV/Base/Dark`. True black is the splash and sign-in
  ground; on OLED it hides the seam between the panel at rest and the first frame.
- `TV/Text/Muted` — the de-emphasised menu labels. Named `Muted` because
  `Secondary` and `Disabled` already belong to remote web-library styles, and a
  local namesake would repeat the collision described below.
- `TV/Text/Success` is state (an accepted answer, "Unlocked"); `TV/Text/Gain` is a
  number ("+34 this week"). Two greens, which is the limit design set.
- `TV/Game UI/Sand` — the A / B / C / D option letters. Named by colour because the
  whole `Game UI` group is.
- `TV/Progress/Track` — the unfilled rail of a progress bar; the filled part is
  `TV/Game UI/Yellow`.
- `TV/Transparent/Red 50` — the error tint behind a **TV** input field, 710 × 72.
  Its web twin is `Web/Transparent/Red 6`.

### Web

A separate set, so that a token export keyed on name cannot merge the two
platforms (design, 2026-10-12).

`Web/Base/Light · Black · Dark` · `Web/Border/White 20` ·
`Web/Button/Primary · Primary Solid` · `Web/Text/Primary` ·
`Web/Transparent/White 6 · White 25 · Red 6` · `Web/Status/Red` `#FF0000`

`Web/Status/Red` is the only one with no TV twin: the warning icon in
`Input messages` and the outline of a field in error on `Digit Code` and
`Mobile Login`. It used to be `Game UI/Red 1` — a game accent borrowed because it
was to hand. Named by colour rather than by role, like every other leaf in the
file: `Game UI/Red 1`, `Transparent/White 6`, `Border/White 20`. **No style is a
flat leaf; every one sits in a group.**

> **The collision this set exists to prevent was real and measured.** A remote
> `Text/Primary` at `#FFFFFF` sat on the web sign-in screens while the local
> `Text/Primary` at `#D1D5DB` sat on 605 TV nodes. Same name, same role, different
> value. Anything exporting by name alone would have merged them.

### Gradients cannot become variables

**A Figma colour variable holds one solid colour.** The nine `TV/Status/*` and
`TV/Button/Primary` and `TV/Game UI/Gold` gradients therefore cannot be converted;
they stay styles, or get rebuilt as stops bound to variables — a component change,
not a conversion. Any estimate of "move the tokens to variables" has to exclude
them.

### What was done on 2026-10-12

| | |
| --- | --- |
| Paint styles | 25 → **50** |
| Nodes rebound | **~1550** |
| Duplicate styles merged away | 3 |
| Pixels changed | five near-identical merges, listed below; everything else zero |

**Three pairs of `Status` styles were byte-identical** — `Wait`/`Wait v2`,
`Sucess`/`Sucess v2`, `Failure`/`Failure v2` — with the `v2` carrying almost all
the use. The 55 consumers of the originals were rebound, the originals deleted,
and the survivors renamed without the suffix. `Sucess` became `Success` in the
same pass, in style names, swatch captions and the section heading.

**The web set was split out** after design listed the 34 web roots: `Mobile Login`
×11, `Sign Up` ×7, `Digit Code` ×4, `Login` ×2, `Loading` ×2, `Splash Screen - 5`
and the error screens. 659 bindings inside them moved from TV styles to `Web/`
twins.

**Everything else was prefixed `TV/`** so the two sets are symmetric and a name
identifies its platform at the top level.

**The five merges that moved a colour**, none visible at a glance but none zero:
`#089900` → `#008E11` (7 nodes), `#070B13` → `#040810` (17), `#0C0C0C` → `#040810`
(12), `#00010A` → `#000000` (16), `#040810` @70% → `#000000` @70% (5).

> **Descriptions exist for the styles created or settled on 2026-10-12 and for
> almost none of the rest.** A style's name and value export; what it is *for* does
> not. Until the older styles carry descriptions, the JSON the team is planning
> will say that `Red 1` and `Red 2` exist and nothing about when to use which.

## Typography

**Two families, and the split is the game layer** — design, 2026-10-07. Rubik is
the product; **the game screens are Roboto Condensed and stay that way.** A
surface that is Figma-first craft (G2) may carry a typeface of its own, and this
one does.

### Rubik — everywhere except the game screens

| Style | Size / line height | Letter spacing |
| --- | --- | --- |
| `Rubik SemiBold 96 (H1)` | 96 / 88 | −4 |
| `Rubik Medium 64 (Popup Title)` | 64 / 88 | −4 |
| `Rubik Medium 48 (H2)` | 48 / 48 | 2 |
| `Rubik Medium 36 (H3)` | 36 / 38 | 0 |
| `Rubik Regular 32 (H4)` | 32 / 36 | 0 |
| `Rubik Medium 24 (H5)` | 24 / 28 | 0 |
| `Rubik Regular 24` | 24 / 39 | 0 |
| `Rubik Regular 20` | 20 / 24 | 0 |
| `Rubik Medium 18 CAPS` | 18 / 20 | 0 |
| `Rubik Regular 14` | 14 / 16 | 0.3 |

### A semantic scale already exists, drawn on the Library sheet

`Typography List/Common UI` and `Typography List/Game UI` on the `▣ Library`
page carry a mapping nobody has implemented. Each row is a frame holding three
things: a **semantic name**, what it is **for**, and a **specimen** whose layer
name is the exact font spec. Read structurally on 2026-10-12 — this is what the
file contains, not an inference from ordering.

| Semantic name | For | Specimen says | Matching text style |
| --- | --- | --- | --- |
| `Display/XL` | Hero / H1 | Rubik SemiBold 96 / 88 | `Rubik SemiBold 96 (H1)` |
| `Display/L` | Popup / Large title | Rubik Medium 64 / 88 | `Rubik Medium 64 (Popup Title)` |
| `Display/M` | H2 | Rubik Medium 48 / 48 | `Rubik Medium 48 (H2)` |
| `Heading/L` | H3 | Rubik Medium 36 / 38 | `Rubik Medium 36 (H3)` |
| `Heading/M` | H4 | Rubik Regular 32 / 36 | `Rubik Regular 32 (H4)` |
| `Heading/S` | H5 | Rubik Medium 24 / 28 | `Rubik Medium 24 (H5)` |
| `Body/L` | Body large | Rubik Regular 24 / 39 | `Rubik Regular 24` |
| `Body/M` | Body default | Rubik Regular 20 / 24 | `Rubik Regular 20` |
| `Label/M` | Label / Caption | **Rubik Regular 18 / 20** | **`Rubik Medium 18 CAPS`** |
| `Label/S` | Caption / Metadata | Rubik Regular 14 / 16 | `Rubik Regular 14` |
| `Game/L` | — | Roboto Condensed Medium 48/48 | `Roboto Condensed Medium 48` |
| `Game/M` | — | Roboto Condensed ExtraBold 40/38 | `Roboto Condensed ExtraBold 40` |
| `Game/S` | — | Roboto Condensed Semibold 32/38 | `Roboto Condensed Semibold 32` |

> **Thirteen semantic names against thirteen text styles, and twelve rows agree
> exactly** — family, weight, size and line height all match.
>
> **`Label/M` is the one that does not.** The specimen names `Rubik Regular 18 / 20`;
> the style is `Rubik Medium 18 CAPS`. Regular against Medium, and the sheet says
> nothing about the caps treatment. One of the two is stale and design decides
> which.

**Why this matters beyond tidiness.** The token work being planned needs a
semantic layer — names that say what a token is for rather than what it is made
of. For typography **that layer is already designed**; it simply lives as text on
a sheet instead of as style names. The styles are named by font and size
(`Rubik Medium 48 (H2)`), the sheet names them by role (`Display/M`).

There is no equivalent sheet for colour. The `Colors` section holds swatches and
hex captions and no semantic layer at all, so that one does have to be designed.

> **Adopting these names is not yet decided.** What is recorded here is that the
> sheet exists and what it says. Whether `Display/M` becomes the style's name is
> design's call.

### Roboto Condensed — the game layer

| Style | Size / line height |
| --- | --- |
| `Roboto Condensed Medium 48` | 48 / 48 |
| `Roboto Condensed ExtraBold 40` | 40 / 38 |
| `Roboto Condensed Semibold 32` | 32 / 38 |

Evidence this is a rule rather than drift, since the question was asked twice:
across the 66 nodes swept on 2026-09-18 and the October Match Game frames, this
family appears on game surfaces **and nowhere else** — including `Attempt`
(`4709:5407`, `Type=Right` / `Type=Wrong`). And **Rubik has neither an ExtraBold
nor a condensed cut at any size**, so the game layer uses weights the product
family cannot supply — which is the reason for the second family, not an argument
against it.

> **A reversal, recorded rather than overwritten.** On 2026-10-07 this was first
> decided the other way — Rubik everywhere, Roboto Condensed a defect to be
> removed — and reversed the same day once the evidence above was assembled.
> Nothing was built on the first answer.
>
> **The three spellings are fixed.** In September the names read `Rubic`, `Rubik`
> and `Rebik` for one family; as of 2026-10-12 all thirteen text styles are spelled
> correctly. The table above is the current reading.

## Spacing and layout

Measured from the PTV-858 menu frames. This is the one surface whose geometry has
been read node by node, so it is the only one recorded in the table below.

**The rest of the scale was swept on 2026-10-12** — every node on `❖ Components`,
counting what each number is actually used for. None of it is tokenised yet; it
is recorded so the next person does not re-derive it, and so the decision is
about a measurement rather than a taste.

| Scale | Values that carry it | Uses |
| --- | --- | --- |
| Corner radius | 4 · 8 · 12 · 24 | 395 of ~500 |
| Stroke width | 1 · 2 · 4 · 6 | 486 |
| Icon size | 16 · 24 · 32 · 40 · 64 | 438 |

**A square of 44 appears 53 times**, which is exactly the ≥ 44px focus-target
floor stated above. The rule is being followed; it is simply not written down as
a value anywhere.

> **Spacing is the one that is NOT ready to be tokenised, and the reason matters.**
> `gap = 10` occurs 482 times and `padding 10/10/10/10` 221 times, which looks
> like a base unit and is not: **10 is Figma's default**, so those are mostly
> "auto-layout was switched on and nobody set the spacing". Under them the
> deliberate scale is 4 · 8 · 12 · 16 · 24 · 32. Tokenising 10 would canonise an
> accident, so the defaults get cleaned first.

> **Fractional geometry: what it turned out to be.** The sweep first read as
> "scaling damage" across a handful of values. Locating every one of them on
> 2026-10-12 showed something different and worth writing down, because the
> obvious fix is the wrong one.
>
> **Most of it is drawn artwork, and has no correct integer.** 715 of the 763
> fractional stroke weights and essentially all 1038 fractional sizes sit on
> `VECTOR` and `GROUP` nodes inside the icon set. A path's bounding box is
> whatever the path is. Rounding those resamples the glyphs.
>
> **The real defect underneath is that the icon set is drawn at three sizes.**
> Every variant is a 32 × 32 frame, but the art inside is 32 (`Retry`, `List`),
> 24 (`Restart`) or 16 (`Pause`). The fractional strokes are the arithmetic of
> that — a 1px stroke on 16-wide art in a 32 frame renders at 1.333. Rounding the
> symptom leaves the cause and changes what is drawn. Redrawing the icons at one
> size is the fix, and it is a piece of work, not a clean-up.
>
> **Rounded on 2026-10-12, outside the artwork:** `Strike Box` radius 9.818 → 10
> (it was 12 before a 44 → 36 scale, so snapping it onto the 4·8·12·24 scale would
> mean 8 or 12 — a design decision, not a rounding); two scaled `AVATAR Label`
> overrides inside `Reward / Pending`; and 41 stroke weights, of which **36 were
> inert** — the node carried no stroke, so the number was dead data. **Five changed
> anything visible:** `Avatar Tile L` 8.571 → 9, and in both `Reward / Pending`
> variants `Ellipse 746` 8.324 → 8 and `AVATAR Label` 5.549 → 6.
>
> **Rounding never went to zero.** `0.417` on three `Reward` rectangles and `0.025`
> on `Icon / Type=Clock` would have had their strokes deleted by honest rounding;
> they were clamped to 1 instead. The `Clock` one is a genuine defect still — a
> 0.025 stroke is invisible, and what it should be nobody has decided.
>
> Separately, 24 nodes sit at 1% opacity and 10 at 0% — invisible helpers that
> still export. Untouched: that is a hygiene question, not a measurement.

> **The PTV-858 menu geometry used to be here and has moved** (design,
> 2026-10-12). It is one screen's layout, not a cross-client value, and a
> palette is the wrong home for it — raised by Valeriya Shabanovich and Andrew
> Maximchenko on !72. **The split is by lifetime:** a value that recurs and
> outlives the feature is a token and stays here; a value that describes one
> screen belongs to that feature.
>
> It now lives in [`specs/PTV-858-menu-no-content-shift/ui-spec.md`](../specs/PTV-858-menu-no-content-shift/ui-spec.md),
> with the rail width, the content origin and the dimming ramp in that feature's
> [`spec.md`](../specs/PTV-858-menu-no-content-shift/spec.md) where they already
> were. Keeping a second copy here was already costing accuracy: this file said
> the dimming was "792 wide", which reads as a solid block, while it is a ramp.

## Focus

**These three are tokens as of 2026-10-12.** Until then the width and the radius
were prose on this page, read off the PTV-858 frames by the Roku engineer and
never re-measured — which meant nothing could check them. They are now variables,
so a drift check fails when Figma and the repository disagree.

| Token | Value | How it was established |
| --- | --- | --- |
| `TV/Focus/Ring Color` | `#0090FF` via `Blue/500` | measured — the Menu Item component binds it |
| `TV/Focus/Ring Width` | 6 | PTV-858, now corroborated by sweep: stroke 6 occurs 26 times across the components |
| `TV/Focus/Ring Radius` | 12 | PTV-858, now corroborated by sweep: radius 12 occurs 138 times |

> **`Ring Color` is a separate name from `Button/Primary Solid`, deliberately**
> (design, 2026-10-12). Both resolve to `Blue/500` and today they are the same
> colour. They are not the same decision: focus is the primary interaction model
> on TV, and recolouring the primary button must not move every focus ring in the
> product as a side effect. One extra variable buys the right to disagree later.

**A focus ring is one size for every item in its list, and that size comes from
the longest label** (design, 2026-09-18). It does not hug its own text — a ring
that resized per item would flicker as focus moved down the list, and on a D-pad
the moving ring is the only feedback there is.

That rule is a token-level decision and so it is here. **What size it produces on
a given screen is that screen's** — for the PTV-858 menu, 250 × 64, in
[its `ui-spec.md`](../specs/PTV-858-menu-no-content-shift/ui-spec.md).

Focus is the single most platform-divergent part of this file: the RN native TV
engine, DOM focus on webOS/Tizen and Roku's SceneGraph are three different
models. Nothing here says how focus should *move*, only what it looks like when
it lands.

## Effects

Both of the file's effect styles, as of 2026-10-12.

| Style | Value | In scope |
| --- | --- | --- |
| `Keyboard` | drop shadow, `#00000099`, offset 0 0, radius 40, spread 0 | yes |
| `Shadow 1` | drop shadow, `#00000040`, offset 0 4, radius 12, spread 0 | **no** — design, 2026-09-18 |

`Shadow 1` sits on the `Player Thumbnail` component (`2878:15039`) and is
deliberately not adopted. It is listed because it exists, so that the next sweep
does not find it and take the omission for an oversight. It was unnamed in
September and has since been given this name in Figma.

---

## Still open — and these are the part the restyle does not settle

Tracked in [`open-questions.md`](open-questions.md) as G2, G3 and G4, plus G6
below. They are decisions, not measurements, and none is answered by the values
above.

1. **Where the line falls between Figma-first and tokens-first** (G2). Game
   overlays and show visuals are craft; auth, account setup, profile and settings
   are standard UI an agent can generate from tokens. Only the designer can draw
   it, and an agent asked to generate a game overlay from tokens will produce
   something that gets rebuilt.
2. **What reconciles RN and Roku** (G3) — **open, and not design's to answer.**
   [ADR 0008](decisions/0008-design-hands-over-tokens-and-rules.md) draws the
   line: design hands over `design-tokens.json` and this file, guarantees they
   match Figma, and decides nothing about any client's build. Three measured
   constraints are left in [`open-questions.md`](open-questions.md) as evidence
   for whoever does decide.

   **Until it is answered, this file is a reference and not a source.** Nothing
   reads the JSON, no CI job checks it, and the clients keep their own copies.
   That is the honest status, and adding more tokens does not change it.
3. **What has been checked on a real TV** (G4). **Nothing here is recorded as
   verified on hardware except the PTV-858 dimming ramp.** TV panels are
   uncalibrated and viewed in varying light; a palette that passes on a laptop is
   not evidence. `Text/Primary` `#D1D5DB` on `Base/Dark` `#040810` computes at
   13.6 and passes AA and AAA, so the hardware question for it is gamma and
   banding rather than contrast.
4. **The 24sp floor versus three tokens that break it** — see the constraints
   section above.

> **Do not let an agent close any of these.** A generated answer reads correctly,
> nobody questions it, and a wrong colour is not a test failure.
