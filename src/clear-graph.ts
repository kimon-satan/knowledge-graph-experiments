import { driver } from "./driver";

const session = driver.session();
try {
  await session.run("MATCH (n) DETACH DELETE n");
  console.log("Graph cleared.");
} finally {
  await session.close();
  await driver.close();
}
