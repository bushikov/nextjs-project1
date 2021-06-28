import { Story, Meta } from "@storybook/react";
import { ArticleForm, ArticleFormProps } from "./ArticleForm";

export default {
  title: "Component/ArticleForm",
} as Meta;

const Templeate: Story<ArticleFormProps> = (args) => <ArticleForm {...args} />;

export const ArticleFormDefault = Templeate.bind({});
ArticleFormDefault.args = {
  onSubmit: (data) => alert(JSON.stringify(data)),
};
