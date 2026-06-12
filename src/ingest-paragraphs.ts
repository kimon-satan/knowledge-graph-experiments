import { createConstraints } from "./create-constraints";
import { extractGraph } from "./extract-graph";
import { loadGraph } from "./load-graph";

export type Paragraph = {
  id: string;
  text: string;
};

export async function ingestParagraphs(paragraphs: Paragraph[]): Promise<void> {
  await createConstraints();

  for (const paragraph of paragraphs) {
    console.log(`Processing paragraph ${paragraph.id}...`);
    const result = await extractGraph(paragraph.text);
    await loadGraph(result, paragraph);
    console.log(`  → ${result.entities.length} entities, ${result.relationships.length} relationships`);
  }

  console.log(`\nDone. Processed ${paragraphs.length} paragraph(s).`);
}
