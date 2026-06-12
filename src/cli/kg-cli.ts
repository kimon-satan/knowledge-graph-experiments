import { readFileSync } from "node:fs";
import { basename, extname } from "node:path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { textToNodesAndRelations } from "../text-to-nodes-and-relations";
import { createNodesAndRelations } from "../create-nodes-and-relations";
import { createConstraints } from "../create-constraints";
import { ingestParagraphs, type Paragraph } from "../ingest-paragraphs";
import { driver } from "../driver";

const argv = await yargs(hideBin(process.argv))
  .usage("Usage: $0 <file> [options]")
  .command("$0 <file>", "Process a knowledge graph from a text or JSON paragraphs file")
  .positional("file", {
    describe: "Path to the input file (.json paragraphs file or plain text)",
    type: "string",
    demandOption: true,
  })
  .option("steps", {
    alias: "s",
    choices: ["extract", "extract+ingest", "extract+ingest+load"] as const,
    default: "extract" as const,
    describe: "Pipeline steps to run",
  })
  .help()
  .parseAsync();

const raw = readFileSync(argv.file, "utf8");

// Detect paragraph JSON files: objects with a `paragraphs` array of { id, text }
function parseParagraphsFile(content: string): Paragraph[] | null {
  try {
    const parsed = JSON.parse(content) as unknown;
    if (
      parsed !== null &&
      typeof parsed === "object" &&
      "paragraphs" in parsed &&
      Array.isArray((parsed as Record<string, unknown>).paragraphs)
    ) {
      return (parsed as { paragraphs: Paragraph[] }).paragraphs;
    }
  } catch {
    // not JSON — fall through to plain-text path
  }
  return null;
}

const paragraphs = parseParagraphsFile(raw);

if (paragraphs) {
  // Multi-paragraph JSON file — one LLM call + one Paragraph node per paragraph
  if (argv.steps === "extract") {
    console.error("--steps extract is not supported for paragraph JSON files; use extract+ingest or extract+ingest+load");
    process.exit(1);
  }

  if (argv.steps === "extract+ingest+load") {
    await ingestParagraphs(paragraphs);
  } else {
    // extract+ingest: dry run — just print counts per paragraph
    for (const paragraph of paragraphs) {
      const result = await textToNodesAndRelations(paragraph.text);
      console.log(`[${paragraph.id}] ${result.entities.length} entities, ${result.relationships.length} relationships`);
    }
  }

  await driver.close();
  process.exit(0);
}

// Plain text file — single LLM call, single Paragraph node
const result = await textToNodesAndRelations(raw);

if (argv.steps === "extract") {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

if (argv.steps === "extract+ingest" || argv.steps === "extract+ingest+load") {
  console.log(`Extracted ${result.entities.length} entities, ${result.relationships.length} relationships`);
}

if (argv.steps === "extract+ingest+load") {
  const paragraphId = basename(argv.file, extname(argv.file));
  await createConstraints();
  await createNodesAndRelations(result, { id: paragraphId, text: raw });
  await driver.close();
  console.log("Loaded into Neo4j.");
}
