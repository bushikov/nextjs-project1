import { PrismaClient } from "@prisma/client";

import { getUsers } from "./seeds/users";

const prisma = new PrismaClient();

async function main() {
  let promises = [];
  promises = promises.concat(getUsers(prisma));

  try {
    const data = await Promise.all(promises);
    console.log("** SUCCESS **");
    console.log(data);
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
