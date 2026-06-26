import { REL_TYPE_DEFS, type RelDef } from "./rel-labels.js";

export function buildRelPromptSection(): string {
  const extractable = (REL_TYPE_DEFS as readonly RelDef[]).filter(
    (d) => !d.structural,
  );

  const byCategory = new Map<string, RelDef[]>();
  for (const d of extractable) {
    const group = byCategory.get(d.category) ?? [];
    group.push(d);
    byCategory.set(d.category, group);
  }

  const categoryBlocks = [...byCategory.entries()].map(([cat, defs]) => {
    const lines = [`${cat}:`];
    for (const d of defs) {
      const flags: string[] = [];
      if (d.symmetric) flags.push("symmetric");
      if (d.hardRange)
        flags.push(`target must be ${d.range!.join(" or ")}`);
      else if (d.range)
        flags.push(`target is typically ${d.range.join(" or ")}`);
      if (d.domain)
        flags.push(`source must be ${d.domain.join(" or ")}`);
      const flagStr = flags.length ? `  [${flags.join("; ")}]` : "";
      lines.push(`  ${d.name} — ${d.description}${flagStr}`);
    }
    return lines.join("\n");
  });

  const distinctions = [
    "AFFECTS vs DETERMINES: AFFECTS is an ongoing probabilistic influence; DETERMINES is constitutive — B's value or existence depends directly on A.",
    "RESULTS_IN vs AFFECTS: RESULTS_IN is a discrete causal outcome; AFFECTS is a sustained influence without a single end-state.",
    "FACILITATES vs USED_FOR: FACILITATES is an enabling factor (not necessarily intentional); USED_FOR is purposive use of A as a tool to achieve B.",
    "SIMILAR_TO vs ANALOGOUS_TO: SIMILAR_TO is loose resemblance; ANALOGOUS_TO is structural equivalence — the internal relationships map onto each other.",
    "TYPE_OF vs EXAMPLE_OF: TYPE_OF is subclass ('a mammal is a type of animal'); EXAMPLE_OF is instance ('a dog is an example of a mammal').",
    "CREATED_BY vs PROPOSED: CREATED_BY = made or built; PROPOSED = formally put forward as a theory or idea.",
    "HAS_PROPERTY vs MEASURE_OF: HAS_PROPERTY links anything to a qualitative Property; MEASURE_OF links a Measure node to the Property it quantifies.",
  ];

  return [
    "== RELATIONSHIP TYPES ==",
    "",
    categoryBlocks.join("\n\n"),
    "",
    "== WHEN TWO RELATIONSHIP TYPES BOTH FIT ==",
    "",
    distinctions.join("\n"),
  ].join("\n");
}
