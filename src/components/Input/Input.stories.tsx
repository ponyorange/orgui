import React, { RefAttributes, useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input from "./input";

export default {
  title: "OrangeUI/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const defaultStyle = {
  margin: "10px 30px",
  width: "80%",
};
const IntroTemplate: ComponentStory<typeof Input> = () => {
  const myInput = useRef<HTMLInputElement>(null);
  return <Input style={defaultStyle} placeholder="默认的Input" ref={myInput} />;
};

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "默认的Input";

const DisableTemplate: ComponentStory<typeof Input> = (args) => (
  <>
    <Input style={defaultStyle} disabled placeholder="禁用的 Input" />
  </>
);

export const Disable = DisableTemplate.bind({});
Disable.storyName = "被禁用的Input";

const TypeTemplate: ComponentStory<typeof Input> = (args) => (
  <>
    <Input style={defaultStyle} placeholder="带图标的 Input" icon="search" />
  </>
);

export const Type = TypeTemplate.bind({});
Type.storyName = "带图标的Input";

const SizeTemplate: ComponentStory<typeof Input> = (args) => (
  <>
    <Input style={defaultStyle} defaultValue="large size" size="large" />
    <Input style={defaultStyle} placeholder="small size" size="small" />
  </>
);

export const Size = SizeTemplate.bind({});
Size.storyName = "不同大小的Input";

const PandTemplate: ComponentStory<typeof Input> = (args) => (
  <>
    <Input
      style={defaultStyle}
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input style={defaultStyle} defaultValue="google" append=".com" />
  </>
);

export const Pand = PandTemplate.bind({});
Pand.storyName = "带前后缀的Input";
