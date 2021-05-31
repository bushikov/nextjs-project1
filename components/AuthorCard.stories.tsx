import { Story, Meta } from "@storybook/react";
import { AuthorCard, AuthorCardProps } from "./AuthorCard";

export default {
  title: "Component/AuthorCard",
} as Meta;

const Templeate: Story<AuthorCardProps> = (args) => <AuthorCard {...args} />;

export const AuthorCardDefault = Templeate.bind({});
AuthorCardDefault.args = {
  name: "John Smith",
};
