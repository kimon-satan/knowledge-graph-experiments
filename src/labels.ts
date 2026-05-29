export const NODE_LABELS = [
  "Concept",
  "Person",
  "Organisation",
  "Work",
  "Event",
] as const;

export type NodeLabel = (typeof NODE_LABELS)[number];

export const ALLOWED_LABELS = new Set<string>(NODE_LABELS);

// Relationship types the extractor is expected to produce.
// Cypher cannot parameterise relationship types ([r:$type] is a parse error),
// so we build the type into the query string — but only after confirming it's
// on this allowlist, which prevents injection via a rogue model response.
export const REL_TYPES = [
  "INFLUENCES",
  "AFFECTS",
  "CREATED_BY",
  "PART_OF",
  "WORKED_AT",
  "WROTE",
  "INTRODUCED",
  "DEVELOPED",
  "PARTICIPATED_IN",
  "RELATED_TO",
  "RESULT_OF",
  "ALLOWS",
  "RESULTS_IN",
  "ENABLES",
  "FACILITATES",
  "MENTIONED_IN",
  "USED_TERM",
  "PROCESSED_BY",
  "EMBODIED_BY",
  "CONTAINS",
  "COMPOSED_OF",
  "HAS_PROPERTY",
  "WITHOUT_PROPERTY",
  "SIMILAR_TO",
  "TYPE_OF",
  "ANALOGOUS_TO",
  "EXAMPLE_OF",
] as const;

export type RelType = (typeof REL_TYPES)[number];

export const ALLOWED_REL_TYPES = new Set<string>(REL_TYPES);
