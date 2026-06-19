import {
  LABEL_CLASH_RULES,
  NODE_LABEL_DEFS,
  type LabelDef,
  type NodeLabel,
} from "./labels.js";

export function resolveLabelClash(a: NodeLabel, b: NodeLabel): NodeLabel {
  // 1. Check for an explicit pairwise override.
  for (const rule of LABEL_CLASH_RULES) {
    const [x, y] = rule.between;
    if ((a === x && b === y) || (a === y && b === x)) {
      if (rule.prefer) return rule.prefer as NodeLabel;
      break;
    }
  }

  // 2. Fall back to higher specificity.
  const specA = NODE_LABEL_DEFS.find((d) => d.name === a)?.specificity ?? 0;
  const specB = NODE_LABEL_DEFS.find((d) => d.name === b)?.specificity ?? 0;
  return specA >= specB ? a : b;
}

export function buildLabelPromptSection(): string {
  const extractable = (NODE_LABEL_DEFS as readonly LabelDef[]).filter(
    (d) => !d.structural,
  );

  const specificityOrder = extractable
    .slice()
    .sort((a, b) => b.specificity - a.specificity)
    .map((d) => d.name)
    .join(" > ");

  const labelBlocks = extractable.map((d) => {
    const lines = [`${d.name} — ${d.description}`];
    if (d.cues.length) lines.push(`  Use when: ${d.cues.join("; ")}`);
    if (d.notThis.length) lines.push(`  Not this: ${d.notThis.join("; ")}`);
    if (d.examples.length) lines.push(`  Examples: ${d.examples.join(", ")}`);
    return lines.join("\n");
  });

  const clashBlocks = LABEL_CLASH_RULES.map((r) => {
    const line = `${r.between[0]} vs ${r.between[1]}: ${r.test}`;
    return r.prefer
      ? `${line} (when still uncertain: prefer ${r.prefer})`
      : line;
  });

  return [
    "== ENTITY LABELS ==",
    "",
    `Choose the MOST SPECIFIC label that applies. Specificity order: ${specificityOrder}`,
    "When two labels both fit, the more specific one wins — unless a clash rule below says otherwise.",
    "",
    labelBlocks.join("\n\n"),
    "",
    "== WHEN TWO LABELS BOTH FIT — apply the matching test ==",
    "",
    clashBlocks.join("\n"),
  ].join("\n");
}
