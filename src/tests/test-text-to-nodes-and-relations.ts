import { textToNodesAndRelations } from "../text-to-nodes-and-relations";

const text = `Alan Turing was a mathematician who developed the Turing machine.
He worked at Bletchley Park during World War II and influenced computer science greatly.
His paper "Computing Machinery and Intelligence" introduced the Turing Test.`;

const result = await textToNodesAndRelations(text);
console.log(JSON.stringify(result, null, 2));
