# Plan: Description Enrichment Pass

Status: **parked** — agreed direction, not yet implemented. Captured so we can return to it after exploring relationship issues.

## Problem

Node `description` values are almost verbatim copies of the source sentence rather than self-contained, abstracted definitions. Examples from the current graph:

- `Array` → the entire source sentence ("The array, the most elementary structure, stores its elements in a contiguous block…").
- `time complexity` and `space complexity` → **identical** descriptions (a question, not a definition).
- `Structured Interview` → "Implied contrast to unstructured data structures like linked lists." — describes its _role in the text_, not what it _is_.

**Root cause:** the extraction prompt gives detailed guidance for `source_text` and `elaboration` but **zero guidance** for the `description` field (schema is just `{ type: "string" }`). The model defaults to restating the sentence in front of it.

**Key enabler:** provenance is already preserved separately — the verbatim quote lives on the `EXTRACTED_FROM` edge's `sourceText`. So `description` is free to be fully abstracted with no loss of traceability.

## Approach: a separate enrichment pass (not in-line in extraction)

```
extract → load (all paragraphs)  →  enrich-descriptions
                                     (read each node + its FULL neighborhood
                                      from Neo4j, generate, SET n.description)
```

Why a separate pass _after_ full load: a node's edges can come from multiple paragraphs (e.g. `Array`'s edges came from two different paragraphs). Only once everything is loaded does a node have its complete neighborhood. The edges + their elaborations are an already-distilled summary of what's salient about an entity — better raw material for a definition than any single source sentence.

Side benefit: enrichment reads live from the graph, so it can be **re-run any time the graph grows** and definitions sharpen as nodes gain edges.

## Prompt design

Built around **labeled input slots** so adding supplementary/reference texts later is just populating one more slot, not a rewrite.

### System prompt (draft)

```
You write concise, self-contained definitions for entities in an educational
knowledge graph. Each definition explains what the entity IS to a learner who
has not read the source material.

You will receive, for ONE entity:
- NAME and LABEL — the kind of thing it is
- SOURCE SENTENCES — verbatim text it was extracted from. Use these only to fix
  the intended SENSE; do not copy or paraphrase their wording.
- GRAPH CONTEXT — its relationships to other entities, each with an elaboration.
  These capture what is salient about the entity in this material.
- REFERENCE MATERIAL — authoritative passages. When present, prefer these over
  your own knowledge; if they conflict with the source, follow them and stay silent
  about the conflict in the definition.            ← future slot, inert until texts exist

Write the description so that:
- It defines what the entity is or means, standing on its own without the source.
- It does NOT quote/paraphrase the source and does NOT describe the entity's role
  in the text (no "an implied contrast to…", "mentioned as…").
- It is 1–2 sentences, neutral encyclopedic register, matching the material's level.
- Its framing fits the LABEL:
    • System   — a thing/structure/mechanism/method: what it is and what it does.
    • Property — a quality/characteristic: what having it means and implies.
    • Topic    — an area/process/activity: what it concerns.
    • Person   — who they are and why they're relevant.
- You may use background knowledge to generalise and clarify, but stay consistent
  with the source and graph context; introduce no facts that contradict them and
  invent no specifics (dates, numbers, names) they don't support.
- If the entity is ambiguous and context is thin, prefer a careful general
  definition over a confident wrong one.
```

### User message (assembled per node from the graph)

```
NAME: <name>
LABEL: <label>
SOURCE SENTENCES:
  - "<verbatim sourceText, one per line>"
GRAPH CONTEXT:
  - <name> <REL_TYPE> <neighbour> — "<elaboration>"
  - ... (all edges)
```

## Decisions made

1. **Graph context scope:** feed **all** relationship types (including looser ones like `SIMILAR_TO`, `ANALOGOUS_TO`) for now — not confident enough to exclude them yet. Revisit later.
2. **Overwrite vs. fill-only:** make this a **pipeline configuration option** (e.g. overwrite-all-on-each-run vs. only-fill-nodes-without-a-good-description).
3. **Granularity:** start with **one call per node** (context is assembled per-node anyway; ~90 calls for the current graph). Batch only if cost becomes a concern.

## Open / deferred

- Supplementary/reference texts: not available yet; design accommodates them via the REFERENCE MATERIAL slot when they exist.
- Separate observed bug (not part of this pass): the extraction prompt's "implied contrast" example ("structured interview") is **leaking into real data** in an algorithms graph. Track and fix independently.
