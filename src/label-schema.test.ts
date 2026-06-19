import { describe, it, expect } from "vitest";
import { resolveLabelClash, buildLabelPromptSection } from "./label-schema.js";
import {
  NODE_LABEL_DEFS,
  LABEL_CLASH_RULES,
  EXTRACTABLE_LABELS,
  type LabelDef,
} from "./labels.js";
import type { NodeLabel } from "./labels.js";

describe("resolveLabelClash — settled decisions", () => {
  it("System beats Topic (higher specificity, no override)", () => {
    expect(resolveLabelClash("System", "Topic")).toBe("System");
    expect(resolveLabelClash("Topic", "System")).toBe("System");
  });

  it("Property beats Topic (higher specificity, no override)", () => {
    expect(resolveLabelClash("Property", "Topic")).toBe("Property");
    expect(resolveLabelClash("Topic", "Property")).toBe("Property");
  });

  it("Property beats System (higher specificity, no override)", () => {
    expect(resolveLabelClash("System", "Property")).toBe("Property");
    expect(resolveLabelClash("Property", "System")).toBe("Property");
  });

  it("Concept beats System (explicit prefer override, not just specificity)", () => {
    // System(3) > Concept(2) by score, but the override says prefer Concept for '-isms'
    expect(resolveLabelClash("Concept", "System")).toBe("Concept");
    expect(resolveLabelClash("System", "Concept")).toBe("Concept");
  });

  it("Person beats Agent (higher specificity, no override)", () => {
    expect(resolveLabelClash("Person", "Agent")).toBe("Person");
    expect(resolveLabelClash("Agent", "Person")).toBe("Person");
  });

  it("Measure beats Property (higher specificity, no override)", () => {
    expect(resolveLabelClash("Measure", "Property")).toBe("Measure");
    expect(resolveLabelClash("Property", "Measure")).toBe("Measure");
  });

  it("Concept beats Topic (higher specificity, no override)", () => {
    expect(resolveLabelClash("Concept", "Topic")).toBe("Concept");
    expect(resolveLabelClash("Topic", "Concept")).toBe("Concept");
  });
});

describe("resolveLabelClash — specificity fallback", () => {
  it("returns higher-specificity label for pairs with no clash rule", () => {
    // Agent(6) vs Concept(2) — no rule, fallback to specificity
    expect(resolveLabelClash("Agent", "Concept")).toBe("Agent");
    expect(resolveLabelClash("Concept", "Agent")).toBe("Agent");

    // Measure(5) vs Topic(1) — no rule, fallback
    expect(resolveLabelClash("Measure", "Topic")).toBe("Measure");

    // Person(7) vs System(3) — no rule, fallback
    expect(resolveLabelClash("Person", "System")).toBe("Person");
  });

  it("is commutative — argument order does not change the result", () => {
    const labels: NodeLabel[] = [
      "Person",
      "Agent",
      "Measure",
      "Property",
      "System",
      "Concept",
      "Topic",
    ];
    for (let i = 0; i < labels.length; i++) {
      for (let j = i + 1; j < labels.length; j++) {
        expect(resolveLabelClash(labels[i], labels[j])).toBe(
          resolveLabelClash(labels[j], labels[i]),
        );
      }
    }
  });

  it("explicit prefer overrides specificity ordering", () => {
    // Confirm Concept(2) wins over System(3) due to prefer override
    const sysSpec = NODE_LABEL_DEFS.find(
      (d) => d.name === "System",
    )!.specificity;
    const conSpec = NODE_LABEL_DEFS.find(
      (d) => d.name === "Concept",
    )!.specificity;
    expect(sysSpec).toBeGreaterThan(conSpec); // confirm specificity would say System
    expect(resolveLabelClash("Concept", "System")).toBe("Concept"); // but prefer overrides
  });
});

describe("buildLabelPromptSection", () => {
  const section = buildLabelPromptSection();

  it("includes every extractable label name", () => {
    for (const name of EXTRACTABLE_LABELS) {
      expect(section).toContain(name);
    }
  });

  it("excludes Paragraph", () => {
    expect(section).not.toContain("Paragraph");
  });

  it("includes every label's description", () => {
    for (const d of (NODE_LABEL_DEFS as readonly LabelDef[]).filter(
      (d) => !d.structural,
    )) {
      expect(section).toContain(d.description);
    }
  });

  it("includes every clash rule test", () => {
    for (const rule of LABEL_CLASH_RULES) {
      expect(section).toContain(rule.test);
    }
  });

  it("mentions the specificity ordering header", () => {
    expect(section).toContain("MOST SPECIFIC");
  });

  it("mentions the clash section header", () => {
    expect(section).toContain("WHEN TWO LABELS BOTH FIT");
  });
});
