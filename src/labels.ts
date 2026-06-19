export type LabelDef = {
  readonly name: string;
  readonly specificity: number;
  readonly description: string;
  readonly cues: readonly string[];
  readonly notThis: readonly string[];
  readonly examples: readonly string[];
  readonly structural?: boolean;
};

export type ClashRule = {
  between: [string, string];
  test: string;
  prefer?: string;
};

export const NODE_LABEL_DEFS = [
  {
    name: "Person",
    specificity: 7,
    description: "A named individual.",
    cues: ["a specific, named human being"],
    notThis: [
      "if it's a role or collective rather than a named individual → Agent",
    ],
    examples: ["Edsger Dijkstra", "John Maynard Keynes", "Charles Darwin"],
  },
  {
    name: "Agent",
    specificity: 6,
    description:
      "An actor, role, or body that acts or makes decisions — not a named individual.",
    cues: [
      "a decision-maker or actor described generically",
      "a role or institution rather than a person",
    ],
    notThis: [
      "if it's a specific named person → Person",
      "if it's a structure/mechanism rather than an actor → System",
    ],
    examples: ["the firm", "the consumer", "the government", "a predator"],
  },
  {
    name: "Measure",
    specificity: 5,
    description: "A quantifiable variable, quantity, or indicator.",
    cues: [
      "a value that can be measured or tracked",
      "answers 'how much / how many'",
    ],
    notThis: ["if it's a qualitative characteristic, not a number → Property"],
    examples: ["GDP", "inflation rate", "velocity", "temperature"],
  },
  {
    name: "Property",
    specificity: 4,
    description: "A qualitative characteristic that something can have.",
    cues: [
      "describes how or how well something behaves",
      "reads as an adjective or attribute",
    ],
    notThis: [
      "if it's a number you track over time → Measure",
      "if it's the thing itself rather than a quality of it → System or Concept",
    ],
    examples: [
      "logarithmic time",
      "stability",
      "in-place",
      "scarce",
      "elastic",
    ],
  },
  {
    name: "System",
    specificity: 3,
    description:
      "An organised structure, mechanism, or method — concrete or abstract — that operates by rules.",
    cues: [
      "has parts or a procedure that work together",
      "can be built, run, or set in motion",
    ],
    notThis: [
      "if it's a purely abstract idea or ideology → Concept",
      "if it's a field of study rather than a working thing → Topic",
    ],
    examples: [
      "Array",
      "heap",
      "Dijkstra's Algorithm",
      "a market",
      "the circulatory system",
    ],
  },
  {
    name: "Concept",
    specificity: 2,
    description: "An abstract idea, theory, principle, or model.",
    cues: [
      "an idea you reason about rather than build",
      "a theory, principle, or '-ism'",
    ],
    notThis: [
      "if it's a working mechanism with parts → System",
      "if it's a field of study → Topic",
    ],
    examples: [
      "democracy",
      "opportunity cost",
      "evolution",
      "equilibrium",
      "justice",
    ],
  },
  {
    name: "Topic",
    specificity: 1,
    description: "An area of study, subject, or field.",
    cues: [
      "names a discipline or area you learn about",
      "answers 'what is this about?'",
    ],
    notThis: [
      "if you could build, run, or instantiate it → System",
      "if it's a specific idea rather than a whole field → Concept",
    ],
    examples: ["Searching", "macroeconomics", "thermodynamics"],
  },
  {
    name: "Paragraph",
    specificity: 0,
    description:
      "Structural node holding a source paragraph's text. Created by code, never extracted.",
    cues: [],
    notThis: [],
    examples: [],
    structural: true,
  },
] as const satisfies readonly LabelDef[];

export const LABEL_CLASH_RULES: ClashRule[] = [
  {
    between: ["System", "Topic"],
    test: "Could you instantiate, run, or hold an instance of it? If yes → System. If it's only an area you study → Topic.",
    // higher specificity (System 3 > Topic 1) wins by default; no override needed
  },
  {
    between: ["Concept", "System"],
    test: "Is it an abstract idea/ideology (Concept) or a working mechanism with parts and rules (System)?",
    prefer: "Concept", // OVERRIDE: '-isms' like capitalism lean Concept even though System outranks it
  },
  {
    between: ["Concept", "Topic"],
    test: "Is it a single idea/principle (Concept) or a whole field of study (Topic)?",
    // higher specificity (Concept 2 > Topic 1) wins by default
  },
  {
    between: ["Measure", "Property"],
    test: "Is it a number you can track over time (Measure) or a qualitative characteristic (Property)? e.g. 'elasticity of 1.2' → Measure; 'elastic' → Property.",
    // higher specificity (Measure 5 > Property 4) wins by default
  },
  {
    between: ["Agent", "Person"],
    test: "Is it a specific named individual (Person) or a generic role/body (Agent)? e.g. 'Keynes' → Person; 'the consumer' → Agent.",
    // higher specificity (Person 7 > Agent 6) wins by default
  },
  {
    between: ["Property", "Topic"],
    test: "Is it a quality something has (Property), or a subject in its own right (Topic)?",
    // higher specificity (Property 4 > Topic 1) wins by default
  },
  {
    between: ["System", "Property"],
    test: "Is it a thing/mechanism (System) or a characteristic of a thing (Property)?",
    // higher specificity (Property 4 > System 3) wins by default — e.g. 'sorted data'
  },
];

// --- Derived exports (backward-compatible — all existing consumers unchanged) ---

export type NodeLabel = (typeof NODE_LABEL_DEFS)[number]["name"];

export const NODE_LABELS = NODE_LABEL_DEFS.map((d) => d.name);

export const ALLOWED_LABELS = new Set<string>(NODE_LABELS);

// Structural labels (Paragraph) are excluded — created by code, never by the LLM.
// Cast to LabelDef to access the optional `structural` field: `as const` narrows each element
// to its own literal type, so the union type doesn't carry the optional property uniformly.
export const EXTRACTABLE_LABELS = (NODE_LABEL_DEFS as readonly LabelDef[])
  .filter((d) => !d.structural)
  .map((d) => d.name);

// --- Relationship types (unchanged this pass) ---

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
export const EXTRACTABLE_REL_TYPES = REL_TYPES.filter(
  (t) => t !== "EXTRACTED_FROM",
);
