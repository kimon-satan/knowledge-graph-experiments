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
  "HAS_ENTITY",
] as const;

export type RelType = (typeof REL_TYPES)[number];

export const ALLOWED_REL_TYPES = new Set<string>(REL_TYPES);
