import { Story, Meta } from "@storybook/react";
import { CheckBox, CheckBoxProps } from "./CheckBox";

export default {
  title: "Component/CheckBox",
} as Meta;

const Templeate: Story<CheckBoxProps> = (args) => <CheckBox {...args} />;

export const CheckBoxDefault = Templeate.bind({});
CheckBoxDefault.args = {
  label: "Hello",
  onChange: (on) => console.log(on),
};
