import { Story, Meta } from "@storybook/react";
import { Header, HeaderProps } from "./Header";

export default {
  title: "Component/Header",
} as Meta;

const Templeate: Story<HeaderProps> = (args) => <Header {...args} />;

export const HeaderDefault = Templeate.bind({});
