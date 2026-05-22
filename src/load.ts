import { driver } from "./driver";
import { NODE_LABELS } from "./labels";
import type { ExtractionResult } from "./extract";

// Relationship types the extractor is expected to produce.
// Cypher cannot parameterise relationship types ([r:$type] is a parse error),
// so we build the type into the query string — but only after confirming it's
// on this allowlist, which prevents injection via a rogue model response.
const ALLOWED_REL_TYPES = new Set([
  "INFLUENCED",
  "CREATED_BY",
  "PART_OF",
  "WORKED_AT",
  "WROTE",
  "INTRODUCED",
  "DEVELOPED",
  "PARTICIPATED_IN",
  "RELATED_TO",
]);

const ALLOWED_LABELS = new Set<string>(NODE_LABELS);

export async function loadGraph(result: ExtractionResult): Promise<void> {
  const session = driver.session();
  try {
    for (const entity of result.entities) {
      if (!ALLOWED_LABELS.has(entity.label)) {
        console.warn(`Skipping entity with unknown label: ${entity.label}`);
        continue;
      }
      // MERGE matches on the unique id. ON CREATE SET only fires for new nodes,
      // so re-running the same data won't overwrite manual edits to existing nodes.
      await session.run(
        `MERGE (n:${entity.label} {id: $id})
         ON CREATE SET n.name = $name, n.description = $description`,
        { id: entity.id, name: entity.name, description: entity.description },
      );
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
