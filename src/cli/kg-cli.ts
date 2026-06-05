import { readFileSync } from "node:fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { extractGraph } from "../extract-graph";
import { loadGraph } from "../load-graph";
import { createConstraints } from "../create-constraints";

const argv = await yargs(hideBin(process.argv))
  .usage("Usage: $0 <file> [options]")
  .command("$0 <file>", "Process a knowledge graph from a text file")
  .positional("file", {
    describe: "Path to the input text file",
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

const text = readFileSync(argv.file, "utf8");

const result = await extractGraph(text);

if (argv.steps === "extract") {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

if (argv.steps === "extract+ingest" || argv.steps === "extract+ingest+load") {
  console.log(`Extracted ${result.entities.length} entities, ${result.relationships.length} relationships`);
}

if (argv.steps === "extract+ingest+load") {
  await createConstraints();
  await loadGraph(result);
  console.log("Loaded into Neo4j.");
}
