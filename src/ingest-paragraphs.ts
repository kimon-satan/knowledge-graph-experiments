import { createConstraints } from "./create-constraints";
import { textToNodesAndRelations } from "./text-to-nodes-and-relations";
import { createNodesAndRelations } from "./create-nodes-and-relations";

export type Paragraph = {
  id: string;
  text: string;
};

export async function ingestParagraphs(paragraphs: Paragraph[]): Promise<void> {
  await createConstraints();

  for (const paragraph of paragraphs) {
    console.log(`Processing paragraph ${paragraph.id}...`);
    const result = await textToNodesAndRelations(paragraph.text);
    await createNodesAndRelations(result, paragraph);
    console.log(`  → ${result.entities.length} entities, ${result.relationships.length} relationships`);
  }

  console.log(`\nDone. Processed ${paragraphs.length} paragraph(s).`);
}
