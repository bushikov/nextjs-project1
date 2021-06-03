import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma, User } from "@prisma/client";
import { getSession } from "next-auth/client";
import { parseQuery } from "../../../utils/query_parser";

const prisma = new PrismaClient();

const baseParams: Prisma.ArticleFindManyArgs = {
  select: {
    id: true,
    title: true,
    body: true,
    createdAt: true,
    updatedAt: true,
    User: {
      select: {
        name: true,
      },
    },
  },
  orderBy: {
    updatedAt: Prisma.SortOrder.desc,
  },
};

const getArticles = async (
  page?: number,
  keywords?: string[],
  users?: User[]
) => {
  let params = { ...baseParams };

  if (page) {
    const skip = (page - 1) * 10;
    params = { ...params, take: 10, skip };
  }

  if (keywords) {
    if (keywords.length >= 2) {
      const conditions = keywords.map((k) => ({
        title: { contains: k },
      }));
      params = { ...params, where: { AND: conditions } };
    } else {
      params = { ...params, where: { title: { contains: keywords[0] } } };
    }
  }

  if (users) {
    params = {
      ...params,
      where: { ...params.where, userId: { in: users.map((u) => u.id) } },
    };
  }

  return prisma.article.findMany(params);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const method = req.method;

  if (method === "GET") {
    const { page, keywords, onlyFollowing } = parseQuery(req.query);

    let users;
    if (session && onlyFollowing) {
      const { email } = session.user;
      users = await prisma.user
        .findUnique({
          where: { email },
          select: { Following: true },
        })
        .Following();
    }

    const articles = await getArticles(page, keywords, users);
    res.status(200).json(articles);
  }
};
