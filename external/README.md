# `external/` — copies, not sources

**Nothing in this directory is edited here.** Every file is a copy of a file that
lives in another repository, taken at a moment in time. Change the original,
then re-run the sync.

```bash
npm run external:sync     # refresh every copy, then regenerate what derives from it
```

## Why copies rather than a reference

This catalog is built and published as a **static site** — GitHub Pages. At build
time there is no `playalong-hub` next to it and no credential to reach it: the
hub is a private GitLab repository. A relative path like `../playalong-hub` works
on one laptop and nowhere else, so a copy is the only honest option.

The cost is that a copy drifts. That is what the provenance line in each file is
for, and why the sync is one command.

## What is here

| File | Copied from | Taken at |
| --- | --- | --- |
| `playalong-hub/design-tokens.json` | `playalong-hub` `docs/design-tokens.json` | commit `ff40477`, 2026-10-13 |
| `playalong-hub/design-tokens.md` | `playalong-hub` `docs/design-tokens.md` | commit `ff40477`, 2026-10-13 |

`design-tokens.json` is itself generated — from Figma, by the hub's own
exporter. So a value here is three steps from where it was decided:

```
Figma  ->  playalong-hub/docs/design-tokens.json  ->  external/  ->  src/tokens/tokens.css
```

**Only the first arrow is a decision.** The other two are copies, and if a number
here disagrees with Figma, Figma is right and this is stale.

## This repository is public — decided, not overlooked

`github.com/Mrdoker1/playalong-animation-catalog` is **public** and published at
<https://mrdoker1.github.io/playalong-animation-catalog/>. Everything here is on
the open internet, and that is deliberate (Viachaslau Kulbitski, 2026-10-13):
the demos are demos rather than client code, showing them is useful — including
to potential investors — and the palette is not sensitive.

So this is not a warning against copying. It is a note that **what lands here
gets published**, so the thing to think about is the audience rather than the
build. Material of a different kind — meeting records, commercial notes,
anything from `private/` — is a separate decision and still belongs to the
project's owner.
