# Plan: Relationship Schema (direction + domain/range)

Status: **parked** — explored against the live graph, agreed this is the foundational topic. Not yet implemented. Companion to [node-duplication-label-instability.md](./node-duplication-label-instability.md) and [description-enrichment-pass.md](./description-enrichment-pass.md).

## Core idea

"More structured data around relationships" decomposes into **three** distinct pieces of schema metadata, each catching a different error class observed in the live graph:

| Metadata | Example | Error class it catches |
|---|---|---|
| **Direction semantics** | "A `TYPE_OF` B ⇒ A is a kind of B" | reversed edges (`Data Structure → Array`, `Searching → Binary search`, `Dijkstra → Graph`) |
| **Domain/range (label signature)** | "`HAS_PROPERTY`: `* → Property`" | range violations (`HAS_PROPERTY` pointing at a non-Property; `CONTAINS` chaos) |
| **Node-label definitions** (separate doc) | "System vs Topic decision rule" | the duplication forks — _and underpins the other two_ |

These are not interchangeable. Critical example: the reversed `TYPE_OF` edges have **both ends sharing a label** (`System → System`, `Topic → Topic`), so a domain/range constraint cannot catch them — only defined direction semantics can. Conversely, the `HAS_PROPERTY` strays share the same direction but a wrong target label, so only a range constraint catches them.

## Dependency order (why node types come first)

The relationship signatures in the live data are **contaminated by label instability**: `HAS_PROPERTY` sources appear as both `System` and `Topic` only because "binary search" et al. flip labels between calls. A tight signature like "`System HAS_PROPERTY Property`" is impossible while the subject's label is a coin-flip. Therefore:

```
1. define node labels crisply  →  2. define rel direction + domain/range  →  3. generate the prompt from it (and optionally enforce at load)
```

## Evidence: how consistent are signatures today?

From the live graph (domain edges only, `EXTRACTED_FROM` excluded):

- `CREATED_BY` → **3/3** `System → Person` (already clean).
- `HAS_PROPERTY` → **24/26** target a `Property` node; the 2 exceptions are real errors a range constraint would flag.
- `CONTAINS` → 4 edges, **4 different** label-pairs (no implicit signature at all).
- `PART_OF`, `RESULTS_IN`, `SIMILAR_TO` → 4 distinct signatures each.

## Working node-label definitions (assumed here; finalise in the node-types work)

- **Person** — a real individual.
- **System** — a concrete thing/structure/mechanism/method/algorithm; something you can instantiate or run (Array, heap, Dijkstra's Algorithm, binary search).
- **Topic** — an area of study, subject, or process (Searching, Sorting, Algorithms, Data Structures).
- **Property** — a quality or characteristic (logarithmic time, stability, in-place).

> Note: `System` and `Topic` are the unstable pair. Signatures below list both where either is plausible; if those labels are later merged, the signatures tighten automatically.

## First-draft signature table (15 extractable types)

`Concept` below = `System | Topic` (the entity-like labels), used where the distinction is currently unreliable.

| Type | Direction: A → B means… | from (domain) | to (range) |
|---|---|---|---|
| `TYPE_OF` | A is a kind/subtype of B (specific → general) | Concept | Concept |
| `EXAMPLE_OF` | A is a concrete instance of category B | Concept | Concept |
| `PART_OF` | A is a component of the larger whole B (part → whole) | Concept \| Property | Concept |
| `COMPOSED_OF` | A is built from constituent parts B (whole → part) | System | System \| Property |
| `CONTAINS` | A holds B as an element/member | System | System \| Property |
| `HAS_PROPERTY` | A is characterised by quality B | Concept | **Property** |
| `WITHOUT_PROPERTY` | A lacks quality B | Concept | **Property** |
| `CREATED_BY` | A was created by person B | Concept | **Person** |
| `PROCESSED_BY` | data/structure A is operated on by mechanism B | Concept | System |
| `FACILITATES` | A makes B easier or possible (enabler → beneficiary) | Concept | Concept |
| `RESULTS_IN` | A (a process) produces/yields B | Concept | Concept \| Property |
| `RESULT_OF` | A is produced by process B | Concept \| Property | Concept |
| `AFFECTS` | A influences B's behaviour or outcome | Concept | Concept \| Property |
| `AFFECTED_BY` | A's behaviour/outcome depends on B | Concept \| Property | Concept |
| `SIMILAR_TO` | A resembles B (same domain) — **symmetric** | Concept | Concept |
| `ANALOGOUS_TO` | A is structurally analogous to B (different domain) — **symmetric** | Concept | Concept |

(`EXTRACTED_FROM` is structural and excluded.)

## Schema-design issues this table surfaces (decide before implementing)

1. **Redundant inverse pairs.** `AFFECTS`/`AFFECTED_BY` and `RESULTS_IN`/`RESULT_OF` are exact inverses. Offering both doubles the model's choices and is the direct cause of the `FACILITATES` self-contradiction we saw (`PQ → Dijkstra` ✓ vs `Dijkstra → HBPQ` ✗). **Recommendation: collapse each inverse pair to one canonical direction.**
2. **Part/whole overlap.** `PART_OF`, `COMPOSED_OF`, and `CONTAINS` are three near-synonyms for the same containment idea pointing in overlapping directions. Consolidation candidate — likely keep `PART_OF` (part → whole) as the canonical one.
3. **Symmetric types need special handling.** `SIMILAR_TO` and `ANALOGOUS_TO` have no meaningful direction, so direction-validation must skip them (or canonicalise endpoint order, e.g. alphabetical, to avoid duplicate A→B / B→A edges).
4. **Domain/range can only be as tight as the labels.** Every `Concept` in the table is a place where a crisp System/Topic boundary would let the signature tighten.

## Proposed shape in `labels.ts`

Turn the flat `REL_TYPES` string list into metadata-carrying entries (single source of truth, per existing architecture):

```ts
HAS_PROPERTY: {
  direction: "A HAS_PROPERTY B ⇒ A is characterised by quality B",
  from: ["System", "Topic"],
  to:   ["Property"],
},
```

Then:

- **Generate** the extractor system prompt from this (the model is told each type's direction meaning and legal endpoint labels), replacing the current bare `REL_TYPES.join(", ")`.
- **Validate** at load in `createNodesAndRelations` against domain/range — a hard backstop for range violations (drop or quarantine illegal edges). Direction errors with matching labels can't be auto-repaired, so the prompt is the only lever there.

## Open / next

- Finalise node-label definitions first (gating dependency).
- Decide the consolidation questions (inverse pairs; part/whole trio) — they shrink the vocabulary the model has to reason about.
- Decide enforcement strictness: prompt-only (soft) vs prompt + load-time validation (hard backstop for range).
