import type { NodeLabel } from "./node-labels.js";

export type RelDef = {
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly domain?: readonly NodeLabel[];
  readonly range?: readonly NodeLabel[];
  readonly hardRange?: true;
  readonly symmetric?: true;
  readonly structural?: true;
};

export const REL_TYPE_DEFS = [
  // --- Taxonomy ---
  {
    name: "TYPE_OF",
    category: "Taxonomy",
    description: "A is a kind or subclass of B",
  },
  {
    name: "EXAMPLE_OF",
    category: "Taxonomy",
    description: "A is a concrete instance or case of B",
  },
  // --- Composition ---
  {
    name: "PART_OF",
    category: "Composition",
    description: "A is a component, member, or phase of B",
  },
  // --- Causation ---
  {
    name: "AFFECTS",
    category: "Causation",
    description:
      "A (cause) has an ongoing influence on B (effect). Direction is always cause → effect: e.g. 'poor pivot choice AFFECTS Quicksort performance', not the reverse.",
  },
  {
    name: "RESULTS_IN",
    category: "Causation",
    description:
      "A (cause) produces B (outcome) as a direct or likely result. Direction is always cause → outcome.",
  },
  {
    name: "DETERMINES",
    category: "Causation",
    description:
      "A (cause) constitutively determines B (effect) — B cannot exist or take its value without A. Direction is always cause → effect.",
  },
  // --- Measurement ---
  {
    name: "HAS_PROPERTY",
    category: "Measurement",
    description: "A possesses quality or attribute B",
    range: ["Property"] satisfies NodeLabel[],
    hardRange: true,
  },
  {
    name: "WITHOUT_PROPERTY",
    category: "Measurement",
    description: "A notably lacks quality or attribute B",
    range: ["Property"] satisfies NodeLabel[],
    hardRange: true,
  },
  {
    name: "MEASURE_OF",
    category: "Measurement",
    description: "A quantifies or operationalises B",
    domain: ["Measure"] satisfies NodeLabel[],
    range: ["Property"] satisfies NodeLabel[],
    hardRange: true,
  },
  // --- Attribution ---
  {
    name: "CREATED_BY",
    category: "Attribution",
    description: "A was created, authored, or invented by B",
    range: ["Person", "Agent"] satisfies NodeLabel[],
    hardRange: true,
  },
  {
    name: "PROPOSED",
    category: "Attribution",
    description: "A was proposed, theorised, or formally put forward by B",
    range: ["Person", "Agent"] satisfies NodeLabel[],
    hardRange: true,
  },
  {
    name: "INFLUENCED_BY",
    category: "Attribution",
    description: "A was shaped or informed by B (intellectual or historical lineage)",
  },
  {
    name: "PROCESSED_BY",
    category: "Attribution",
    description: "A is processed, operated on, or transformed by B",
    range: ["Person", "Agent", "System"] satisfies NodeLabel[],
  },
  // --- Comparison ---
  {
    name: "SIMILAR_TO",
    category: "Comparison",
    description:
      "A resembles B in some respect — family resemblance, loose match (e.g. Rugby SIMILAR_TO American Football)",
    symmetric: true,
  },
  {
    name: "ANALOGOUS_TO",
    category: "Comparison",
    description:
      "A maps onto B structurally — exact correspondence, not just resemblance (e.g. Soccer ANALOGOUS_TO Football)",
    symmetric: true,
  },
  // --- Prerequisite ---
  {
    name: "PREREQUISITE_OF",
    category: "Prerequisite",
    description:
      "Understanding or achieving A is required before B can be understood or achieved",
  },
  // --- Purpose ---
  {
    name: "FACILITATES",
    category: "Purpose",
    description:
      "A enables or makes B more likely — an enabling factor, not necessarily intentional (e.g. structure FACILITATES flexibility)",
  },
  {
    name: "USED_FOR",
    category: "Purpose",
    description:
      "A is purposively used as an instrument to achieve B — intentional use (e.g. index USED_FOR lookup)",
  },
  // --- Structural (never exposed to the LLM) ---
  {
    name: "EXTRACTED_FROM",
    category: "Structural",
    description: "Entity A was extracted from source paragraph B",
    range: ["Paragraph"] satisfies NodeLabel[],
    hardRange: true,
    structural: true,
  },
] as const satisfies readonly RelDef[];

export type RelType = (typeof REL_TYPE_DEFS)[number]["name"];

export const REL_TYPES = REL_TYPE_DEFS.map((d) => d.name);

export const ALLOWED_REL_TYPES = new Set<string>(REL_TYPES);

export const EXTRACTABLE_REL_TYPES = (REL_TYPE_DEFS as readonly RelDef[])
  .filter((d) => !d.structural)
  .map((d) => d.name);
