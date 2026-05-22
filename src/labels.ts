export const NODE_LABELS = [
  "Concept",
  "Person",
  "Organisation",
  "Work",
  "Event",
] as const;

export type NodeLabel = (typeof NODE_LABELS)[number];
