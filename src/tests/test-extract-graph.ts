import { extractGraph } from "../extract-graph";

const text = `Alan Turing was a mathematician who developed the Turing machine.
He worked at Bletchley Park during World War II and influenced computer science greatly.
His paper "Computing Machinery and Intelligence" introduced the Turing Test.`;

const result = await extractGraph(text);
console.log(JSON.stringify(result, null, 2));
