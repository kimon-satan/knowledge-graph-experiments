# Plan: Proposed Schema — Node Labels

Status: **active design** — this is the foundational work agreed to come before all other tasks. Node-label half drafted here; relationship half tracked in [relationship-schema.md](./relationship-schema.md). See also [node-duplication-label-instability.md](./node-duplication-label-instability.md) for the evidence that motivates it.

## Goal

Make `labels.ts` carry enough structured metadata that:

- the extractor system prompt is **generated** from it (not hand-written), and
- load-time validation and the entity-resolution merge pass can **reference** it.

For node labels specifically, each label needs a **description**, a **specificity score**, and the set needs **clash-resolution rules** (the System↔Topic instability is the dominant cause of duplicate nodes).

## Design principle: stay subject-general

The original four labels (Topic, Person, System, Property) were unintentionally fitted to the algorithms/data-structures sample. The first real target is likely a first-year economics text, but the source is uncertain and the pipeline must serve many subjects. The label set below is deliberately **domain-general** (checked against economics, biology, history, physics) rather than fitted to any one subject.

## Two structures

**1. Per-label definition** — what each label is, with positive/negative cues and a specificity score:

```ts
type LabelDef = {
  name: string;          // "System"
  specificity: number;   // higher = narrower/stronger claim; used as the clash backstop
  description: string;   // one-line definition, goes straight into the prompt
  cues: string[];        // "choose this when…" positive signals
  notThis: string[];     // disambiguators that push to another label
  examples: string[];    // concrete instances (few-shot grounding)
  structural?: boolean;  // true = code-created, never extracted (Paragraph)
};
```

**2. Pairwise clash rules** — one entry per confusable pair, with a discriminating test and an optional explicit override:

```ts
type ClashRule = {
  between: [string, string];  // the two labels that get confused
  test: string;               // the question that decides
  prefer?: string;            // explicit override; if omitted, higher specificity wins
};
```

A clash is inherently _between_ two labels, so it lives in its own list rather than being duplicated across label definitions.

## Clash-resolution order (hybrid)

The specificity score makes resolution principled and transitively consistent, while pairwise rules handle the exceptions. When a concept could take more than one label, resolve in this order:

1. **`notThis`** — read-time hint while the model reads a single definition (avoids most clashes up front).
2. **Pairwise `test`** — the specific discriminating question for that pair.
3. **Specificity backstop** — if no rule fires, the **higher-specificity** label wins. This is consistent by construction (a single ordering can't contradict itself) and auto-resolves 3-way clashes like `Big-O notation` = System/Topic/Property.
4. **Explicit `prefer` override** — for the few pairs where raw specificity gives the wrong answer (e.g. `-isms` should be Concept even though System outranks it).

### Why specificity works

A broad label is almost always trivially also-true, so it is uninformative; the more specific applicable label is almost always the intended one. The score also does a second job: the **entity-resolution merge pass** (topic 1) collapses a duplicated concept to its **highest-specificity** label rather than picking by edge count (e.g. "heap" as System+Topic → System). One number, two jobs.

### Known failure mode

Specificity ≠ correctness for every pair. `capitalism` should lean `Concept` over `System` even though System outranks Concept — handled by an explicit `prefer` override, not by the score. This is exactly why the order above keeps pairwise rules primary and specificity as the backstop.

## Draft content (general 7-label set + structural Paragraph)

Specificity: higher = narrower/stronger claim.

| Label | specificity | Definition | Cross-domain examples |
|---|---|---|---|
| **Person** | 7 | a named individual | Keynes, Darwin, Napoleon |
| **Agent** | 6 | an actor/role/body that acts or decides (not a named individual) | the firm, a predator, the state, the consumer |
| **Measure** | 5 | a quantifiable variable or quantity | GDP, velocity, temperature, inflation rate |
| **Property** | 4 | a qualitative characteristic | elastic, stable, scarce, contiguous |
| **System** | 3 | an organised structure/mechanism, concrete or abstract, that operates by rules | market, algorithm, circulatory system, ecosystem |
| **Concept** | 2 | an abstract idea, theory, principle, or model | democracy, opportunity cost, evolution, justice |
| **Topic** | 1 | an area of study or field | macroeconomics, thermodynamics, sorting |

This reproduces all three earlier `prefer` decisions from the ordering `Property (4) > System (3) > Topic (1)`, so nothing previously settled breaks.

```ts
const NODE_LABEL_DEFS: LabelDef[] = [
  {
    name: "Person",
    specificity: 7,
    description: "A named individual.",
    cues: ["a specific, named human being"],
    notThis: ["if it's a role or collective rather than a named individual → Agent"],
    examples: ["Edsger Dijkstra", "John Maynard Keynes", "Charles Darwin"],
  },
  {
    name: "Agent",
    specificity: 6,
    description: "An actor, role, or body that acts or makes decisions — not a named individual.",
    cues: ["a decision-maker or actor described generically", "a role or institution rather than a person"],
    notThis: ["if it's a specific named person → Person",
              "if it's a structure/mechanism rather than an actor → System"],
    examples: ["the firm", "the consumer", "the government", "a predator"],
  },
  {
    name: "Measure",
    specificity: 5,
    description: "A quantifiable variable, quantity, or indicator.",
    cues: ["a value that can be measured or tracked", "answers 'how much / how many'"],
    notThis: ["if it's a qualitative characteristic, not a number → Property"],
    examples: ["GDP", "inflation rate", "velocity", "temperature"],
  },
  {
    name: "Property",
    specificity: 4,
    description: "A qualitative characteristic that something can have.",
    cues: ["describes how or how well something behaves", "reads as an adjective or attribute"],
    notThis: ["if it's a number you track over time → Measure",
              "if it's the thing itself rather than a quality of it → System or Concept"],
    examples: ["logarithmic time", "stability", "in-place", "scarce", "elastic"],
  },
  {
    name: "System",
    specificity: 3,
    description: "An organised structure, mechanism, or method — concrete or abstract — that operates by rules.",
    cues: ["has parts or a procedure that work together", "can be built, run, or set in motion"],
    notThis: ["if it's a purely abstract idea or ideology → Concept",
              "if it's a field of study rather than a working thing → Topic"],
    examples: ["Array", "heap", "Dijkstra's Algorithm", "a market", "the circulatory system"],
  },
  {
    name: "Concept",
    specificity: 2,
    description: "An abstract idea, theory, principle, or model.",
    cues: ["an idea you reason about rather than build", "a theory, principle, or '-ism'"],
    notThis: ["if it's a working mechanism with parts → System",
              "if it's a field of study → Topic"],
    examples: ["democracy", "opportunity cost", "evolution", "equilibrium", "justice"],
  },
  {
    name: "Topic",
    specificity: 1,
    description: "An area of study, subject, or field.",
    cues: ["names a discipline or area you learn about", "answers 'what is this about?'"],
    notThis: ["if you could build, run, or instantiate it → System",
              "if it's a specific idea rather than a whole field → Concept"],
    examples: ["Searching", "macroeconomics", "thermodynamics"],
  },
  {
    name: "Paragraph",
    specificity: 0,
    description: "Structural node holding a source paragraph's text. Created by code, never extracted.",
    cues: [], notThis: [], examples: [],
    structural: true,
  },
];

const LABEL_CLASH_RULES: ClashRule[] = [
  {
    between: ["System", "Topic"],
    test: "Could you instantiate, run, or hold an instance of it? If yes → System. If it's only an area you study → Topic.",
    // higher specificity (System) wins by default; no override needed
  },
  {
    between: ["Concept", "System"],
    test: "Is it an abstract idea/ideology (Concept) or a working mechanism with parts and rules (System)?",
    prefer: "Concept", // OVERRIDE: '-isms' like capitalism lean Concept even though System outranks it
  },
  {
    between: ["Concept", "Topic"],
    test: "Is it a single idea/principle (Concept) or a whole field of study (Topic)?",
    // higher specificity (Concept) wins by default
  },
  {
    between: ["Measure", "Property"],
    test: "Is it a number you can track over time (Measure) or a qualitative characteristic (Property)? e.g. 'elasticity of 1.2' → Measure; 'elastic' → Property.",
    // higher specificity (Measure) wins by default
  },
  {
    between: ["Agent", "Person"],
    test: "Is it a specific named individual (Person) or a generic role/body (Agent)? e.g. 'Keynes' → Person; 'the consumer' → Agent.",
    // higher specificity (Person) wins by default
  },
  {
    between: ["Property", "Topic"],
    test: "Is it a quality something has (Property), or a subject in its own right (Topic)?",
    // higher specificity (Property) wins by default
  },
  {
    between: ["System", "Property"],
    test: "Is it a thing/mechanism (System) or a characteristic of a thing (Property)?",
    // higher specificity (Property) wins by default — e.g. 'sorted data'
  },
];
```

## Deriving the existing exports (nothing downstream breaks)

```ts
export const NODE_LABELS    = NODE_LABEL_DEFS.map(d => d.name);
export const EXTRACTABLE_LABELS = NODE_LABEL_DEFS.filter(d => !d.structural).map(d => d.name);
export const ALLOWED_LABELS = new Set(NODE_LABELS);
export type NodeLabel = (typeof NODE_LABELS)[number]; // needs `as const` handling
```

## Design decisions (settled)

1. **Clash rules are a pairwise list** (`between` + `test` + optional `prefer`), backed by a **specificity score** as the default tie-breaker. Pairwise tests stay primary; specificity is the consistent, transitive backstop; `prefer` is an explicit override for the few pairs the score gets wrong.
2. **Specificity ordering** `Person > Agent > Measure > Property > System > Concept > Topic` reproduces every earlier `prefer` decision and resolves 3-way clashes by construction.
3. **System wins System/Topic ties** — falls out of the specificity order (System 3 > Topic 1).
4. **Keep both `notThis` and `ClashRule`.** `notThis` lets the model decide up front, so the clash rule stays a rarely-hit fallback. The minor redundancy is deliberate; do not collapse them.
5. **7 extractable labels for now** — domain-general, not fitted to econ or CS.

## Open / next

- **Event / Process is the leading 8th label** (French Revolution, photosynthesis, a recession, "sorting" as an activity) — a real gap for history/science-heavy texts and arguably more general than `Measure`. Lean: hold at 7 for now, add `Event` the moment a process-heavy source appears (or swap it for `Measure` if the first source skews historical).
- **Validate against a real chapter** before locking — derive from corpus, not imagination. A chapter of the actual target text dropped into `input/` would confirm whether `Agent` and `Measure` earn their place.
- Apply the same metadata treatment to relationship types (direction + domain/range) per [relationship-schema.md](./relationship-schema.md); the node-label definitions here are the gating dependency for tightening those signatures.
- Then: generate the system prompt from this structure; add load-time validation referencing it.
