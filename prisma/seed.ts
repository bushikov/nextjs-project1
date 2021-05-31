import { PrismaClient } from "@prisma/client";

import { createUsers } from "./seeds/users";
import { createArticles, createRandomArticles } from "./seeds/articles";

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await createUsers(prisma);

    let promises = [];
    const johnsmith = users.find((u) => u.email === "johnsmith@example.com");
    promises.push(createArticles(prisma, johnsmith));
    const alicedouglas = users.find(
      (u) => u.email === "alicedouglas@example.com"
    );
    promises.push(createRandomArticles(prisma, alicedouglas, 5));
    const bobgerrard = users.find((u) => u.email === "bobgerrard@example.com");
    promises.push(createRandomArticles(prisma, bobgerrard, 3));

    await Promise.all(promises);

    console.log("** SUCCESS **");
    console.log(`${users.length} users created`);
  } catch (e) {
    console.log("** FAILURE **");
    console.error(e);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("** FINISHED **");
    await prisma.$disconnect();
  });
