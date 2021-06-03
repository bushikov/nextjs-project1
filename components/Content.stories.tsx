import { Story, Meta } from "@storybook/react";
import { Content, ContentProps } from "./Content";

export default {
  title: "Component/Content",
} as Meta;

const Templeate: Story<ContentProps> = (args) => <Content {...args} />;

export const ContentDefault = Templeate.bind({});
ContentDefault.args = {
  title: "こころ",
  body: "　私わたくしはその人を常に先生と呼んでいた。だからここでもただ先生と書くだけで本名は打ち明けない。これは世間を憚はばかる遠慮というよりも、その方が私にとって自然だからである。私はその人の記憶を呼び起すごとに、すぐ「先生」といいたくなる。筆を執とっても心持は同じ事である。よそよそしい頭文字かしらもじなどはとても使う気にならない。",
  updatedAt: new Date("1914/8/11 09:00:00"),
};
