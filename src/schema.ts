import { driver } from "./driver";

// Every label the extractor is allowed to use — also imported by the extraction prompt.
export const NODE_LABELS = [
  "Concept",
  "Person",
  "Organisation",
  "Work",
  "Event",
] as const;
export type NodeLabel = (typeof NODE_LABELS)[number];

async function createConstraints() {
  const session = driver.session();
  try {
    for (const label of NODE_LABELS) {
      await session.run(`
        CREATE CONSTRAINT IF NOT EXISTS FOR (n:${label})
        REQUIRE n.id IS UNIQUE
      `);
      console.log(`Constraint ensured: ${label}.id`);
    }
  } finally {
    await session.close();
    await driver.close();
  }
}

await createConstraints();
