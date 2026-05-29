import { readFileSync } from "node:fs";
import { extractGraph } from "../extract-graph";

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: test-extract <path-to-file>");
  process.exit(1);
}

const text = readFileSync(filePath, "utf8");
const result = await extractGraph(text);
console.log(JSON.stringify(result, null, 2));
