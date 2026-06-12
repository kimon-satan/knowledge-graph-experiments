export const NODE_LABELS = [
  "Topic",
  "Person",
  "System",
  "Property",
  "Paragraph",
] as const;

export type NodeLabel = (typeof NODE_LABELS)[number];

export const ALLOWED_LABELS = new Set<string>(NODE_LABELS);

// Relationship types the extractor is expected to produce.
// Cypher cannot parameterise relationship types ([r:$type] is a parse error),
// so we build the type into the query string — but only after confirming it's
// on this allowlist, which prevents injection via a rogue model response.
export const REL_TYPES = [
  "AFFECTED_BY",
  "AFFECTS",
  "CREATED_BY",
  "PART_OF",
  "RESULT_OF",
  "RESULTS_IN",
  "FACILITATES",
  "PROCESSED_BY",
  "CONTAINS",
  "COMPOSED_OF",
  "HAS_PROPERTY",
  "WITHOUT_PROPERTY",
  "SIMILAR_TO",
  "TYPE_OF",
  "ANALOGOUS_TO",
  "EXAMPLE_OF",
  "EXTRACTED_FROM",
] as const;

export type RelType = (typeof REL_TYPES)[number];

export const ALLOWED_REL_TYPES = new Set<string>(REL_TYPES);

// Structural — created by code, never by the LLM:
//   Paragraph nodes are MERGEd per source paragraph; EXTRACTED_FROM links each
//   extracted entity back to its paragraph. Excluded from the extractor's vocabulary
//   so the model focuses only on real domain entities and relationships.
export const EXTRACTABLE_LABELS = NODE_LABELS.filter((l) => l !== "Paragraph");
export const EXTRACTABLE_REL_TYPES = REL_TYPES.filter(
  (t) => t !== "EXTRACTED_FROM",
);
