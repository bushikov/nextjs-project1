import { Story, Meta } from "@storybook/react";
import { ArticleCard, ArticleCardProps } from "./ArticleCard";

export default {
  title: "Component/ArticleCard",
} as Meta;

const Templeate: Story<ArticleCardProps> = (args) => <ArticleCard {...args} />;

export const ArticleCardDefault = Templeate.bind({});
ArticleCardDefault.args = {
  title: "銀河鉄道の夜",
  content:
    "「ではみなさんは、そういうふうに川だと言いわれたり、乳ちちの流ながれたあとだと言いわれたりしていた、このぼんやりと白いものがほんとうは何かご承知しょうちですか」先生は、黒板こくばんにつるした大きな黒い星座せいざの図の、上から下へ白くけぶった銀河帯ぎんがたいのようなところを指さしながら、みんなに問といをかけました。",
  author: "宮沢賢治",
  date: new Date("1969/7/20"),
  href: "#",
};

export const ArticleCardWithoutAuthor = Templeate.bind({});
ArticleCardWithoutAuthor.args = {
  title: "こころ",
  content:
    "　私わたくしはその人を常に先生と呼んでいた。だからここでもただ先生と書くだけで本名は打ち明けない。これは世間を憚はばかる遠慮というよりも、その方が私にとって自然だからである。私はその人の記憶を呼び起すごとに、すぐ「先生」といいたくなる。筆を執とっても心持は同じ事である。よそよそしい頭文字かしらもじなどはとても使う気にならない。",
  date: new Date("1914/8/11"),
  href: "#",
};

export const ArticleCardSimple = Templeate.bind({});
ArticleCardSimple.args = {
  title: "銀河鉄道の夜",
  href: "#",
};
