import { driver } from "./driver";
import { NODE_LABELS } from "./node-labels";

export { NODE_LABELS } from "./node-labels";
export type { NodeLabel } from "./node-labels";

export async function createConstraints() {
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
  }
}
