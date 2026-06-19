# Plan: Node Duplication — Label Instability

Status: **parked** — explored against live graph, agreed direction not yet implemented. Captured alongside [description-enrichment-pass.md](./description-enrichment-pass.md).

## The reframe (important)

The duplication is **not** a naming problem. It was first assumed to come from plurals + capitalization divergence. Querying the live graph showed:

- **Same-label plural/case duplicates: zero.** `normaliseId` already does `label.toLowerCase() + slugify(name)`, and `slugify` lowercases and collapses non-alphanumerics. So "Sorted Data" and "Sorted data" under the _same_ label already MERGE into one node. (Pure plurals like "array"/"arrays" would still split, but there happen to be none in the current data.)
- **The real duplication is cross-label divergence — 12 clusters.** The same concept gets a _different label_ on different extraction calls. Because the ID is `label + name`, the label difference forks it into separate nodes.

Name normalization (lowercasing, plural-stripping) would fix **none** of the 12 — they all already share an identical normalized name and differ only by label.

## Evidence from the live graph

12 forked clusters. Almost all are **System ↔ Topic** confusion. The edges genuinely split across the forks (domain edges, excluding `EXTRACTED_FROM`):

| Concept | Fork (label → edges) |
|---|---|
| binary search | Topic→10, System→3 |
| heap | Topic→8, System→4 |
| binary search tree | System→5, Topic→5 |
| Big-O notation | System→2, Topic→2, Property→2 (3-way) |
| priority queue | System→4, Topic→1 |
| graph | System→3, Topic→1 |
| sorted data | System→3, Property→2 |
| asymptotic complexity | Property→3, Topic→1 |
| logarithmic behaviour | Property→3, Topic→1 |
| Heapsort | Topic→2, System→1 |
| unsorted data | System→1, Topic→1 |
| structured interview | Topic→1, System→0 |

Impact: a query like "what connects to binary search?" returns only whichever fork you land on and silently loses the rest. Likely the single biggest correctness problem in the graph.

## Root cause

Same pattern as the description problem: **the prompt never defines the labels.** It says only:

```
Allowed entity labels: Topic, Person, System, Property
```

No definitions, no decision rule, no tie-breaker. The model guesses whether (e.g.) "heap" is a structure (System) or a subject (Topic), and guesses differently across calls. The recurring System↔Topic forks show those two are the genuinely ambiguous pair.

## Strategies (A and B not mutually exclusive)

**A. Prevent at the source — make the label decision deterministic.**

- Define the labels in the prompt with a one-line decision rule and a tie-breaker (e.g. "a thing you can instantiate/run = System; an area of study = Topic; if both, prefer System").
- Or reduce the label set — if System vs Topic can't be made crisp, merging them removes the dominant fork source. Fewer labels = fewer fork opportunities.

**B. Resolve post-hoc — an entity-resolution pass.**

- After load, find same-normalized-name clusters, pick a canonical label, and merge the nodes (re-pointing edges). APOC `apoc.refactor.mergeNodes` does this in one call.
- Mirrors the description-enrichment pass: a graph-cleanup step that runs after full load and can re-run as the graph grows.
- Also catches what prevention can't: genuine name drift across calls ("Turing" vs "Alan Turing"), which will appear on other subjects.

**C. (named for completeness) Drop label from the ID** — make identity `slugify(name)` only. This was a deliberate choice (lets homonyms like the data-structure "graph" vs the chart "graph" coexist), but the data shows the model isn't _using_ labels to disambiguate homonyms — it's just inconsistent. Today the label-in-ID causes more harm than the homonym case it protects.

## Recommended direction

**A + B together.** A shrinks the problem at the source; B mops up what leaks through and handles name drift (which will definitely occur on other subjects). Pure naming standardization, alone, fixes none of the 12 observed cases.

## Open / next

- Decide whether System vs Topic can be given a crisp, content-agnostic boundary (the pipeline targets many subjects, not just algorithms) — or whether to merge them.
- Sketch the resolution-pass query (cluster by normalized name → choose canonical label → `apoc.refactor.mergeNodes`).
- Sequencing vs other passes: this pass should run before description enrichment, so descriptions are generated on merged (complete-neighborhood) nodes.
