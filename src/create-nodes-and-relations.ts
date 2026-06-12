import { driver } from "./driver";
import { ALLOWED_LABELS, ALLOWED_REL_TYPES } from "./labels";
import type { ExtractionResult } from "./text-to-nodes-and-relations";
import type { Paragraph } from "./ingest-paragraphs";

export async function createNodesAndRelations(result: ExtractionResult, paragraph?: Paragraph): Promise<void> {
  const session = driver.session();
  try {
    if (paragraph) {
      await session.run(
        `MERGE (p:Paragraph {id: $id})
         ON CREATE SET p.text = $text`,
        { id: paragraph.id, text: paragraph.text },
      );
      console.log(`  MERGED paragraph [${paragraph.id}]`);
    }

    for (const entity of result.entities) {
      if (!ALLOWED_LABELS.has(entity.label)) {
        console.warn(`Skipping entity with unknown label: ${entity.label}`);
        continue;
      }
      // MERGE matches on the unique id. ON CREATE SET only fires for new nodes,
      // so re-running the same data won't overwrite manual edits to existing nodes.
      const entityResult = await session.run(
        `MERGE (n:${entity.label} {id: $id})
         ON CREATE SET n.name = $name, n.description = $description`,
        { id: entity.id, name: entity.name, description: entity.description },
      );
      const wasCreated = entityResult.summary.counters.updates().nodesCreated > 0;
      console.log(`  ${wasCreated ? "CREATED" : "matched"} [${entity.label}] ${entity.name}`);

      if (paragraph) {
        await session.run(
          `MATCH (p:Paragraph {id: $pid}), (n:${entity.label} {id: $id})
           MERGE (p)-[:HAS_ENTITY]->(n)`,
          { pid: paragraph.id, id: entity.id },
        );
      }
    }

    for (const rel of result.relationships) {
      const type = rel.type.toUpperCase();
      if (!ALLOWED_REL_TYPES.has(type)) {
        console.warn(`Skipping relationship with unknown type: ${rel.type}`);
        continue;
      }
      // The type is validated above before being interpolated — this is not a
      // SQL-injection-style risk because the value never reaches a string parser;
      // Neo4j compiles the query with the type baked in as a structural token.
      await session.run(
        `MATCH (a {id: $fromId}), (b {id: $toId})
         MERGE (a)-[:${type}]->(b)`,
        { fromId: rel.fromId, toId: rel.toId },
      );
    }
  } finally {
    await session.close();
  }
}
