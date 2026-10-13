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
| `playalong-hub/design-tokens.json` | `playalong-hub` `docs/design-tokens.json` | commit `df07093`, 2026-10-13 |
| `playalong-hub/design-tokens.md` | `playalong-hub` `docs/design-tokens.md` | commit `df07093`, 2026-10-13 |

`design-tokens.json` is itself generated — from Figma, by the hub's own
exporter. So a value here is three steps from where it was decided:

```
Figma  ->  playalong-hub/docs/design-tokens.json  ->  external/  ->  src/tokens/tokens.css
```

**Only the first arrow is a decision.** The other two are copies, and if a number
here disagrees with Figma, Figma is right and this is stale.

## ⚠ This repository is public

`github.com/Mrdoker1/playalong-animation-catalog` is **public**, and it is
published at <https://mrdoker1.github.io/playalong-animation-catalog/>. Anything
copied in here is on the open internet.

The hub is private and belongs to the client project. **Before copying anything
further from it — specs, meeting records, open questions, anything naming people
or unreleased formats — that is a disclosure decision, not a build decision.**
It needs the project's owner, not a developer in a hurry.
