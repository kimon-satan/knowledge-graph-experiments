import { extractGraph } from "../extract";
import { loadGraph } from "../load";
import { driver } from "../driver";

const text = `Alan Turing was a mathematician who developed the Turing machine.
He worked at Bletchley Park during World War II and influenced computer science greatly.
His paper "Computing Machinery and Intelligence" introduced the Turing Test.`;

const result = await extractGraph(text);
console.log("Extracted:");
console.log(JSON.stringify(result, null, 2));

await loadGraph(result);
console.log("\nLoaded into Neo4j.");

await driver.close();
