import { Story, Meta } from "@storybook/react";
import { SearchBox, SearchBoxProps } from "./SearchBox";

export default {
  title: "SearchBox",
} as Meta;

const Templeate: Story<SearchBoxProps> = (args) => <SearchBox {...args} />;

export const SearchBoxDefault = Templeate.bind({});
SearchBoxDefault.args = {
  placeholder: "John Smith",
  onClick: (value) => {
    console.log(value);
  },
};
