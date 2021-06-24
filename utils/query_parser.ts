import { NextApiRequest } from "next";

type QueryParameter = string | string[] | null;

export const parseUsersQuery = ({
  page,
  keyword,
  onlyFollowing,
}: NextApiRequest["query"]) => ({
  page: parsePage(page),
  keywords: parseKeyword(keyword),
  onlyFollowing: parseOnlyFollowing(onlyFollowing),
});

export const parseArticlesQuery = ({
  page,
  keyword,
  // onlyFollowing,
  // onlyMe,
  conditions,
}: NextApiRequest["query"]) => ({
  page: parsePage(page),
  keywords: parseKeyword(keyword),
  // onlyFollowing: parseOnlyFollowing(onlyFollowing),
  // onlyMe: parseOnlyMe(onlyMe),
  isFollowing: parseConditions(conditions).isFollowing,
  isMine: parseConditions(conditions).isMine,
});

const parsePage = (page: QueryParameter): number => {
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

const parseKeyword = (keyword: QueryParameter): string[] => {
  if (!keyword) {
    return [""];
  }

  if (!(keyword instanceof Array)) {
    return [keyword];
  }

  return keyword;
};

const parseOnlyFollowing = (onlyFollowing: QueryParameter): boolean => {
  if (!onlyFollowing) {
    return false;
  }

  if (onlyFollowing instanceof Array) {
    return onlyFollowing[0].toLowerCase() === "true";
  }

  return onlyFollowing.toLowerCase() === "true";
};

const parseOnlyMe = (onlyMe: QueryParameter): boolean => {
  if (!onlyMe) {
    return false;
  }

  if (onlyMe instanceof Array) {
    return onlyMe[0].toLowerCase() === "true";
  }

  return onlyMe.toLowerCase() === "true";
};

const parseConditions = (
  conditions: QueryParameter
): { isFollowing: boolean; isMine: boolean } => {
  if (!conditions) {
    return {
      isFollowing: false,
      isMine: false,
    };
  }

  if (!(conditions instanceof Array)) {
    if (conditions.toLowerCase() === "following") {
      return {
        isFollowing: true,
        isMine: false,
      };
    }

    if (conditions.toLowerCase() === "mine") {
      return {
        isFollowing: false,
        isMine: true,
      };
    }
  }

  return conditions
    .map((c) => c.toLowerCase())
    .reduce(
      (acc, v) => {
        if (v === "following") {
          return {
            ...acc,
            isFollowing: true,
          };
        }
        if (v === "mine") {
          return {
            ...acc,
            isMine: true,
          };
        }
        return acc;
      },
      { isFollowing: false, isMine: false }
    );
};
