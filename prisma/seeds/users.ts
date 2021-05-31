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
    name: "John Smith",
    email: "johnsmith@example.com",
    createdAt: new Date("2021/1/1 09:00"),
    updatedAt: new Date("2021/1/1 09:00"),
  },
  {
    name: "Alice Douglas",
    email: "alicedouglas@example.com",
    createdAt: new Date("2021/1/2 09:00"),
    updatedAt: new Date("2021/1/2 09:00"),
  },
  {
    name: "Bob Gerrard",
    email: "bobgerrard@example.com",
    createdAt: new Date("2020/12/31 09:00"),
    updatedAt: new Date("2020/12/31 09:00"),
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

  const createdUsers = await Promise.all(promises);

  const johnsmith = await prisma.user.findUnique({
    where: { email: "johnsmith@example.com" },
  });
  const alicedouglas = await prisma.user.findUnique({
    where: { email: "alicedouglas@example.com" },
  });

  let updatePromises = [];
  updatePromises.push(
    prisma.user.update({
      where: { email: "johnsmith@example.com" },
      data: { Following: { connect: { email: alicedouglas.email } } },
    })
  );
  updatePromises.push(
    prisma.user.update({
      where: { email: "alicedouglas@example.com" },
      data: { Following: { connect: { id: johnsmith.id } } },
    })
  );

  await Promise.all(updatePromises);

  return Promise.resolve(createdUsers);
};
