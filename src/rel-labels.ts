export const REL_TYPES = [
  "AFFECTS",
  "CREATED_BY",
  "PART_OF",
  "RESULTS_IN",
  "FACILITATES",
  "PROCESSED_BY",
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
export const EXTRACTABLE_REL_TYPES = REL_TYPES.filter(
  (t) => t !== "EXTRACTED_FROM",
);
