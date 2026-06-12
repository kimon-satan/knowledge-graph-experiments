import { textToNodesAndRelations } from "../text-to-nodes-and-relations";
import { createNodesAndRelations } from "../create-nodes-and-relations";
import { driver } from "../driver";
import { createConstraints } from "../create-constraints";

const text = `Alan Turing was a mathematician who developed the Turing machine.
He worked at Bletchley Park during World War II and influenced computer science greatly.
His paper "Computing Machinery and Intelligence" introduced the Turing Test.`;

const result = await textToNodesAndRelations(text);
console.log("Extracted:");
console.log(JSON.stringify(result, null, 2));

await createConstraints();

await createNodesAndRelations(result);
console.log("\nLoaded into Neo4j.");

await driver.close();
