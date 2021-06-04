import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, User } from "@prisma/client";
import { getSession } from "next-auth/client";
import { parseQuery } from "../../../utils/query_parser";

const baseParams: Prisma.UserFindManyArgs = {
  select: {
    id: true,
    name: true,
  },
  orderBy: {
    name: Prisma.SortOrder.asc,
  },
};

const getAuthors = async (page?: number, keywords?: string[], user?: User) => {
  let params = { ...baseParams };

  if (page) {
    const skip = (page - 1) * 10;
    params = { ...params, take: 10, skip };
  }

  if (keywords) {
    if (keywords.length >= 2) {
      const conditions = keywords.map((k) => ({
        name: { contains: k },
      }));
      params = { ...params, where: { AND: conditions } };
    } else {
      if (keywords[0]) {
        params = { ...params, where: { name: { contains: keywords[0] } } };
      }
    }
  }

  if (user) {
    params = {
      ...params,
      where: { ...params.where, Followers: { some: { email: user.email } } },
    };
  }

  return prisma.user.findMany(params);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const method = req.method;

  if (method === "GET") {
    const { page, keywords, onlyFollowing } = parseQuery(req.query);

    let user;
    if (session && onlyFollowing) {
      user = session.user;
    }

    const authors = await getAuthors(page, keywords, user);

    res.status(200).json(authors);
  }
};
