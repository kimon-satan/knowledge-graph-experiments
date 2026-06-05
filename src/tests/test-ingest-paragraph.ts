import { ingestParagraphs } from "../ingest-paragraphs";
import { driver } from "../driver";

const text = `Alan Turing was a mathematician who developed the Turing machine.
He worked at Bletchley Park during World War II and influenced computer science greatly.
His paper "Computing Machinery and Intelligence" introduced the Turing Test.`;

const paragraphs: Array<{
  id: string;
  text: string;
}> = [{ id: "para-1", text }];

await ingestParagraphs(paragraphs);
await driver.close();
