import { Story, Meta } from "@storybook/react";
import { ArticleCard, ArticleCardProps } from "./ArticleCard";

export default {
  title: "ArticleCard",
} as Meta;

const Templeate: Story<ArticleCardProps> = (args) => <ArticleCard {...args} />;

export const ArticleCardDefault = Templeate.bind({});
ArticleCardDefault.args = {
  title: "銀河鉄道の夜",
  content:
    "「ではみなさんは、そういうふうに川だと言いわれたり、乳ちちの流ながれたあとだと言いわれたりしていた、このぼんやりと白いものがほんとうは何かご承知しょうちですか」先生は、黒板こくばんにつるした大きな黒い星座せいざの図の、上から下へ白くけぶった銀河帯ぎんがたいのようなところを指さしながら、みんなに問といをかけました。",
  author: "宮沢賢治",
  date: new Date("1969/7/20"),
};
