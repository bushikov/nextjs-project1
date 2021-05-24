import { PrismaClient } from "@prisma/client";

export interface User {
  id?: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export const users: User[] = [
  {
    name: "testuser",
    email: "testuser@example.com",
    createdAt: new Date("2021/1/1 09:00"),
    updatedAt: new Date("2021/1/1 09:00"),
  },
];

export const createUsers = async (prisma: PrismaClient) => {
  const promises = users.map((user) => {
    return prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  });

  return Promise.all(promises);
};
