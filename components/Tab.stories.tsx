import { Story, Meta } from "@storybook/react";
import { Tab, TabProps } from "./Tab";

export default {
  title: "Component/Tab",
} as Meta;

const Template: Story<TabProps> = (args) => <Tab {...args} />;

export const TabDefault = Template.bind({});
TabDefault.args = {
  labels: ["タブ１", "タブ２"],
  onChange: (index) => {
    return;
  },
};
