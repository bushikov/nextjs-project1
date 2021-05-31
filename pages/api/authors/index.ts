import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const baseParams: Prisma.UserFindManyArgs = {
  select: {
    id: true,
    name: true,
  },
  orderBy: {
    name: Prisma.SortOrder.asc,
  },
};

const getAuthors = async (page?: number, keyword?: string | string[]) => {
  let params = { ...baseParams };
  if (page) {
    const skip = (page - 1) * 10;
    params = { ...params, take: 10, skip };
  }
  if (!keyword || keyword !== "") {
    if (keyword instanceof Array) {
      const conditions = keyword.map((k) => {
        return {
          name: {
            contains: k,
          },
        };
      });
      params = { ...params, where: { AND: conditions } };
    } else {
      params = { ...params, where: { name: { contains: keyword } } };
    }
  }

  return prisma.user.findMany(params);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  if (method === "GET") {
    const { page, keyword } = req.query;
    let pageInt = 0;
    if (!!page && !(page instanceof Array) && !isNaN(parseInt(page))) {
      pageInt = parseInt(page);
    }

    const authors = await getAuthors(pageInt, keyword);
    res.status(200).json(authors);
  }
};
