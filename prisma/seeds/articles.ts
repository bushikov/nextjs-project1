import faker from "faker";
import { PrismaClient } from "@prisma/client";
import { User } from "./users";

const articles = [
  {
    title: "こころ",
    body: "　私わたくしはその人を常に先生と呼んでいた。だからここでもただ先生と書くだけで本名は打ち明けない。これは世間を憚はばかる遠慮というよりも、その方が私にとって自然だからである。私はその人の記憶を呼び起すごとに、すぐ「先生」といいたくなる。筆を執とっても心持は同じ事である。よそよそしい頭文字かしらもじなどはとても使う気にならない。",
    createdAt: new Date("1914/8/11 09:00:00"),
    updatedAt: new Date("1914/8/11 09:00:00"),
  },
  {
    title: "蜘蛛の糸",
    body: "　ある日の事でございます。御釈迦様おしゃかさまは極楽の蓮池はすいけのふちを、独りでぶらぶら御歩きになっていらっしゃいました。池の中に咲いている蓮はすの花は、みんな玉のようにまっ白で、そのまん中にある金色きんいろの蕊ずいからは、何とも云えない好よい匂においが、絶間たえまなくあたりへ溢あふれて居ります。極楽は丁度朝なのでございましょう。",
    createdAt: new Date("2030/7/1 09:00:00"),
    updatedAt: new Date("2030/7/1 09:00:00"),
  },
  {
    title: "雲の糸",
    body: "　ある日の事でございます。御釈迦様おしゃかさまは極楽の蓮池はすいけのふちを、独りでぶらぶら御歩きになっていらっしゃいました。池の中に咲いている蓮はすの花は、みんな玉のようにまっ白で、そのまん中にある金色きんいろの蕊ずいからは、何とも云えない好よい匂においが、絶間たえまなくあたりへ溢あふれて居ります。極楽は丁度朝なのでございましょう。",
    createdAt: new Date("2030/7/2 09:00:00"),
    updatedAt: new Date("2030/7/2 09:00:00"),
  },
];

export const createArticlesWithUser = async (
  prisma: PrismaClient,
  user: User
) => {
  let promises = articles.map((a) => {
    return prisma.article.create({
      data: {
        title: a.title,
        body: a.body,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
        userId: user.id,
      },
    });
  });

  promises = promises.concat(
    ...[...Array(9)].map(() => {
      return prisma.article.create({
        data: {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraph(),
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: user.id,
        },
      });
    })
  );

  return Promise.all(promises);
};
