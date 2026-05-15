import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  process.env.NEO4J_URI!,
  neo4j.auth.basic(process.env.NEO4J_USERNAME!, process.env.NEO4J_PASSWORD!),
);

// Sanity check
await driver.verifyConnectivity();

const session = driver.session();

try {
  const result = await session.run("MATCH (n) RETURN count(n) AS count");
  console.log(result.records[0].get("count").toNumber());
} finally {
  await session.close();
}
