import { Story, Meta } from "@storybook/react";
import { UserCard, UserCardProps } from "./UserCard";

export default {
  title: "Component/UserCard",
} as Meta;

const Templeate: Story<UserCardProps> = (args) => <UserCard {...args} />;

export const UserCardDefault = Templeate.bind({});
UserCardDefault.args = {
  name: "John Smith",
  id: 1,
};
