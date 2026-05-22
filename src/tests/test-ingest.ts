import { readFileSync } from "node:fs";
import { ingestParagraphs } from "../ingest-paragraphs";
import { driver } from "../driver";

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: test-ingest <path-to-paragraphs.json>");
  process.exit(1);
}

const { paragraphs } = JSON.parse(readFileSync(filePath, "utf8")) as {
  paragraphs: Array<{ id: string; text: string }>;
};

await ingestParagraphs(paragraphs);
await driver.close();
