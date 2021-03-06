import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, User } from "@prisma/client";
import { getSession } from "next-auth/client";
import { parseArticlesQuery } from "../../../utils/query_parser";

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

  if (users && users.length) {
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
    const { page, keywords, isFollowing, isMine } = parseArticlesQuery({
      page: req.query.page,
      keyword: req.query.keyword,
      conditions: req.query["conditions[]"],
    });

    let users = [];
    if (session) {
      const { email } = session.user;
      if (isFollowing) {
        users.push(
          ...(await prisma.user
            .findUnique({
              where: { email },
              select: { Following: true },
            })
            .Following())
        );
      }

      if (isMine) {
        users.push(await prisma.user.findUnique({ where: { email } }));
      }
    }

    const articles = await getArticles(page, keywords, users);
    res.status(200).json(articles);
  } else if (method === "POST") {
    if (!session) {
      res.status(403).json({});
      return;
    }

    const { email } = session.user;
    const { title, content } = req.body;

    await prisma.article.create({
      data: {
        title,
        body: content,
        User: {
          connect: { email },
        },
      },
    });

    res.status(201).json({});
  }
};
