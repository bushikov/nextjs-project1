import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

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

const getArticles = async (page?: number, keyword?: string | string[]) => {
  let params = { ...baseParams };
  if (page) {
    const skip = (page - 1) * 10;
    params = { ...params, take: 10, skip };
  }
  if (!keyword || keyword !== "") {
    if (keyword instanceof Array) {
      const conditions = keyword.map((k) => {
        return {
          title: {
            contains: k,
          },
        };
      });
      params = { ...params, where: { AND: conditions } };
    } else {
      params = { ...params, where: { title: { contains: keyword } } };
    }
  }

  return prisma.article.findMany(params);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  if (method === "GET") {
    const { page, keyword } = req.query;
    let pageInt = 0;
    if (!!page && !(page instanceof Array) && !isNaN(parseInt(page))) {
      pageInt = parseInt(page);
    }

    const articles = await getArticles(pageInt, keyword);
    res.status(200).json(articles);
  }
};
