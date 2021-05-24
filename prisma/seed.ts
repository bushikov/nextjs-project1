import { PrismaClient } from "@prisma/client";

import { createUsers } from "./seeds/users";
import { createArticlesWithUser } from "./seeds/articles";

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await createUsers(prisma);

    const user = users.find((u) => u.email === "testuser@example.com");
    const articles = await createArticlesWithUser(prisma, user);

    console.log("** SUCCESS **");
    console.log(users);
    console.log(articles);
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
