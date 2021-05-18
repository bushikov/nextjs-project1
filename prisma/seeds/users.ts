const users = [
  {
    name: "testuser",
    email: "testuser@example.com",
    createdAt: new Date("2021/1/1 09:00"),
    updatedAt: new Date("2021/1/1 09:00"),
  },
];

export function getUsers(prisma) {
  return users.map((user) => {
    return new Promise((resolve) => {
      resolve(
        prisma.user.upsert({
          where: { email: user.email },
          update: {},
          create: {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        })
      );
    });
  });
}
