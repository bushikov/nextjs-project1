import { NextApiRequest } from "next";

export const parseQuery = ({
  page,
  keyword,
  onlyFollowing,
}: NextApiRequest["query"]) => ({
  page: parsePage(page),
  keywords: parseKeyword(keyword),
  onlyFollowing: parseOnlyFollowing(onlyFollowing),
});

const parsePage = (page: string | string[] | null): number => {
  if (!page) {
    return 0;
  }

  if (page instanceof Array) {
    if (isNaN(parseInt(page[0]))) {
      return parseInt(page[0]);
    }
    return 0;
  }

  if (isNaN(parseInt(page))) {
    return parseInt(page);
  }

  return 0;
};

const parseKeyword = (keyword: string | string[] | null): string[] => {
  if (!keyword) {
    return [""];
  }

  if (!(keyword instanceof Array)) {
    return [keyword];
  }

  return keyword;
};

const parseOnlyFollowing = (
  onlyFollowing: string | string[] | null
): boolean => {
  if (!onlyFollowing) {
    return false;
  }

  if (onlyFollowing instanceof Array) {
    return onlyFollowing[0].toLowerCase() === "true";
  }

  return onlyFollowing.toLowerCase() === "true";
};
