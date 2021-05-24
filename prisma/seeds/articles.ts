import faker from "faker";
import { PrismaClient } from "@prisma/client";
import { User } from "./users";

export const createArticlesWithUser = async (
  prisma: PrismaClient,
  user: User
) => {
  const promises = [...Array(11)].map(() => {
    return prisma.article.create({
      data: {
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
      },
    });
  });

  return Promise.all(promises);
};
