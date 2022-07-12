import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Image from "./image";

export default {
  title: "OrangeUI/Image",
  component: Image,
  argTypes: {},
} as ComponentMeta<typeof Image>;

const IntroTemplate: ComponentStory<typeof Image> = (args) => {
  return (
    <div>
      <Image {...args} />
    </div>
  );
};

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "介绍";
Introduction.args = {
  src: "https://pic1.zhimg.com/80/v2-235ab378ef0c0bd388ab7c92f3127240_1440w.jpg",
  mode: "cover",
  size: "normal",
};
