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
export const ALLOWED_REL_TYPES = new Set([
  "INFLUENCED",
  "CREATED_BY",
  "PART_OF",
  "WORKED_AT",
  "WROTE",
  "INTRODUCED",
  "DEVELOPED",
  "PARTICIPATED_IN",
  "RELATED_TO",
]);
