import { describe, it, expect } from "vitest";
import {
  NODE_LABEL_DEFS,
  LABEL_CLASH_RULES,
  NODE_LABELS,
  EXTRACTABLE_LABELS,
  ALLOWED_LABELS,
  type LabelDef,
} from "./node-labels.js";

describe("NODE_LABEL_DEFS", () => {
  it("contains exactly the 7 extractable labels plus Paragraph", () => {
    const names = NODE_LABEL_DEFS.map((d) => d.name);
    expect(names).toContain("Paragraph");
    expect(names.filter((n) => n !== "Paragraph")).toHaveLength(7);
  });

  it("label names are unique", () => {
    const names = NODE_LABEL_DEFS.map((d) => d.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("specificity values are unique", () => {
    const specs = NODE_LABEL_DEFS.map((d) => d.specificity);
    expect(new Set(specs).size).toBe(specs.length);
  });

  it("specificity ordering matches Person>Agent>Measure>Property>System>Concept>Topic", () => {
    const order = [
      "Person",
      "Agent",
      "Measure",
      "Property",
      "System",
      "Concept",
      "Topic",
    ];
    const specs = order.map(
      (name) => NODE_LABEL_DEFS.find((d) => d.name === name)!.specificity,
    );
    for (let i = 0; i < specs.length - 1; i++) {
      expect(specs[i]).toBeGreaterThan(specs[i + 1]);
    }
  });

  it("Paragraph is marked structural", () => {
    const para = NODE_LABEL_DEFS.find((d) => d.name === "Paragraph");
    expect(para?.structural).toBe(true);
  });

  it("all extractable labels have non-empty descriptions", () => {
    for (const d of (NODE_LABEL_DEFS as readonly LabelDef[]).filter(
      (d) => !d.structural,
    )) {
      expect(d.description.length).toBeGreaterThan(0);
    }
  });
});

describe("Derived exports", () => {
  it("EXTRACTABLE_LABELS has the 7 expected labels and excludes Paragraph", () => {
    expect(EXTRACTABLE_LABELS).not.toContain("Paragraph");
    expect(EXTRACTABLE_LABELS).toHaveLength(7);
    for (const name of [
      "Person",
      "Agent",
      "Measure",
      "Property",
      "System",
      "Concept",
      "Topic",
    ]) {
      expect(EXTRACTABLE_LABELS).toContain(name);
    }
  });

  it("ALLOWED_LABELS is a superset of NODE_LABELS", () => {
    for (const name of NODE_LABELS) {
      expect(ALLOWED_LABELS.has(name)).toBe(true);
    }
  });

  it("ALLOWED_LABELS includes Paragraph", () => {
    expect(ALLOWED_LABELS.has("Paragraph")).toBe(true);
  });
});

describe("LABEL_CLASH_RULES referential integrity", () => {
  const allNames = new Set<string>(NODE_LABEL_DEFS.map((d) => d.name));

  it("every between[] entry references a real label", () => {
    for (const rule of LABEL_CLASH_RULES) {
      for (const name of rule.between) {
        expect(allNames.has(name), `Unknown label in clash rule: ${name}`).toBe(
          true,
        );
      }
    }
  });

  it("prefer (when set) is one of the two between labels", () => {
    for (const rule of LABEL_CLASH_RULES) {
      if (rule.prefer !== undefined) {
        expect(
          rule.between.includes(rule.prefer),
          `prefer "${rule.prefer}" is not in between [${rule.between.join(", ")}]`,
        ).toBe(true);
      }
    }
  });

  it("no duplicate pairs", () => {
    const keys = LABEL_CLASH_RULES.map((r) => [...r.between].sort().join("|"));
    expect(new Set(keys).size).toBe(keys.length);
  });
});
