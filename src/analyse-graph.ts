import { driver } from "./driver";

const session = driver.session();

try {
  const nodeCounts = await session.run(
    `MATCH (n)
     UNWIND labels(n) AS lbl
     RETURN lbl AS label, count(*) AS count
     ORDER BY count DESC`,
  );
  const relCounts = await session.run(
    `MATCH ()-[r]->()
     RETURN type(r) AS type, count(r) AS count
     ORDER BY count DESC`,
  );
  const domainRange = await session.run(
    `MATCH (a)-[r]->(b)
     RETURN type(r) AS type,
            labels(a)[0] AS fromLabel,
            labels(b)[0] AS toLabel,
            count(*) AS count
     ORDER BY type, count DESC`,
  );
  const samples = await session.run(
    `MATCH (a)-[r]->(b)
     WHERE type(r) <> 'EXTRACTED_FROM'
     WITH type(r) AS type, a.name AS from, b.name AS to, r.elaboration AS elab
     ORDER BY type, rand()
     WITH type, collect({from: from, to: to, elab: elab})[0..3] AS examples
     RETURN type, examples
     ORDER BY type`,
  );

  const totalNodes = nodeCounts.records.reduce(
    (s, r) => s + r.get("count").toNumber(),
    0,
  );
  const totalRels = relCounts.records.reduce(
    (s, r) => s + r.get("count").toNumber(),
    0,
  );

  const lines: string[] = [];

  lines.push(`# KG Snapshot — ${new Date().toISOString().slice(0, 16).replace("T", " ")}`);
  lines.push("");
  lines.push(`**Total nodes:** ${totalNodes}  `);
  lines.push(`**Total relationships:** ${totalRels}`);
  lines.push("");

  lines.push("## Nodes by label");
  lines.push("");
  lines.push("| Label | Count |");
  lines.push("|-------|------:|");
  for (const r of nodeCounts.records) {
    lines.push(`| ${r.get("label")} | ${r.get("count").toNumber()} |`);
  }
  lines.push("");

  lines.push("## Relationships by type");
  lines.push("");
  lines.push("| Type | Count |");
  lines.push("|------|------:|");
  for (const r of relCounts.records) {
    lines.push(`| ${r.get("type")} | ${r.get("count").toNumber()} |`);
  }
  lines.push("");

  lines.push("## Domain → range distribution");
  lines.push("");
  lines.push("| Type | From | To | Count |");
  lines.push("|------|------|----|------:|");
  for (const r of domainRange.records) {
    lines.push(
      `| ${r.get("type")} | ${r.get("fromLabel") ?? "?"} | ${r.get("toLabel") ?? "?"} | ${r.get("count").toNumber()} |`,
    );
  }
  lines.push("");

  lines.push("## Sample triples (up to 3 per type, excluding EXTRACTED_FROM)");
  lines.push("");
  for (const r of samples.records) {
    const type = r.get("type") as string;
    const examples = r.get("examples") as Array<{
      from: string;
      to: string;
      elab: string;
    }>;
    lines.push(`### ${type}`);
    lines.push("");
    for (const ex of examples) {
      lines.push(`- **${ex.from ?? "?"}** → **${ex.to ?? "?"}**`);
      if (ex.elab) lines.push(`  ${ex.elab}`);
    }
    lines.push("");
  }

  process.stdout.write(lines.join("\n") + "\n");
} finally {
  await session.close();
  await driver.close();
}
