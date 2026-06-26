# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm lint                        # ESLint
pnpm format                      # Prettier

pnpm test:extract                # Run text-to-nodes-and-relations test (hits OpenAI)
pnpm test:load                   # Run load-graph test (hits Neo4j)
pnpm test:ingest                 # Run ingest-paragraph test (hits both)

pnpm kg-cli <file> --steps <step>  # Run the pipeline (see CLI below)
pnpm clear-graph                 # Delete all nodes and relationships from Neo4j
```

All scripts that touch OpenAI or Neo4j require `.env` — `dotenv-cli` loads it automatically via the `dotenv` prefix.

## Environment

Copy `.env.example` to `.env` and fill in:

- `NEO4J_URI` — Bolt URI, e.g. `bolt://localhost:7687`
- `NEO4J_USERNAME` / `NEO4J_PASSWORD` — Neo4j credentials
- `OPENAI_API_KEY` — for the extraction step

## Architecture

This project builds a knowledge graph from educational text by:
1. **Extracting** entities and relationships from prose via GPT-4o (structured output)
2. **Loading** them into a local Neo4j instance using `MERGE` (idempotent)

### Pipeline

```
text → textToNodesAndRelations() → ExtractionResult → createNodesAndRelations() → Neo4j
```

`ingestParagraphs()` is a convenience wrapper that runs `createConstraints` + the loop of `textToNodesAndRelations` + `createNodesAndRelations` over a `Paragraph[]` array.

### CLI (`src/cli/kg-cli.ts`)

Takes a text file and a `--steps` flag:
- `extract` (default) — prints extracted JSON
- `extract+ingest` — prints entity/relationship counts
- `extract+ingest+load` — full pipeline including Neo4j write

### Schema

Node labels and relationship types are the single source of truth in `src/labels.ts`. Both `textToNodesAndRelations` (via the LLM system prompt and JSON schema) and `createNodesAndRelations` (via allowlist validation) derive from this file. Adding a new label or relationship type requires updating only `labels.ts`.

Two labels/types are **structural** — created deterministically by code, never by the LLM:
- `Paragraph` nodes are `MERGE`d once per source paragraph (or file, in the CLI), storing the full source `text`.
- `EXTRACTED_FROM` relationships link each entity back to the `Paragraph` it was extracted from. Each edge carries a `sourceText` string-array property recording the verbatim source sentence(s) the entity was extracted from (returned per-entity by the LLM during extraction).

`EXTRACTABLE_LABELS` and `EXTRACTABLE_REL_TYPES` (also in `labels.ts`) exclude these structural types and are what the extractor's system prompt and JSON schema expose to the model.

Entity IDs are re-derived deterministically from `label + name` after the LLM responds (`normaliseId` in `text-to-nodes-and-relations.ts`), so model-hallucinated IDs are discarded. Known limitation: the same real-world entity named differently across calls (e.g. "Turing" vs "Alan Turing") will become two separate nodes.

`createNodesAndRelations` uses `MERGE` with `ON CREATE SET`, meaning re-running the same data won't overwrite existing nodes — safe to re-ingest.

### Prompt authoring rule

Examples inside the LLM system prompt (`src/text-to-nodes-and-relations.ts`) must be domain-neutral — they must not reference any of the source texts being ingested (algorithms, economics, research methods, etc.). Use abstract placeholders or clearly unrelated everyday domains (weather, cooking, geography) so the model cannot overfit its extraction behaviour to the example domain.

### Input format for `ingestParagraphs`

Validated against `schema/paragraphs.schema.json`: an object with a `paragraphs` array, each item having `id` (string) and `text` (string). Sample inputs live in `input/`.
