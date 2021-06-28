import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const method = req.method;

  if (session) {
    const { email } = session.user;

    if (method === "GET") {
      const following = await prisma.user
        .findUnique({
          where: { email },
          select: { Following: true },
        })
        .Following();

      res.status(200).json({ following });
    } else if (method === "POST") {
      const { targetId } = req.body;

      await prisma.user.update({
        where: { email },
        data: {
          Following: {
            connect: [{ id: targetId }],
          },
        },
      });

      res.status(201).json({ message: "Followed" });
    } else if (method === "DELETE") {
      const { targetId } = req.body;
      await prisma.user.update({
        where: { email },
        data: {
          Following: {
            disconnect: [{ id: targetId }],
          },
        },
      });

      res.status(200).json({ message: "Unfollowed" });
    }
  } else {
    res.status(400).send("BAD REQUEST");
  }
};
