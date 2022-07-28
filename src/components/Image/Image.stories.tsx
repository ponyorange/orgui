import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Image from "./image";

export default {
  title: "OrangeUI/Image",
  component: Image,
  argTypes: {},
} as ComponentMeta<typeof Image>;

const IntroTemplate: ComponentStory<typeof Image> = (args) => {
  const imgContainerStyle = {
    width: "300px",
    height: "300px",
  };
  return (
    <div style={imgContainerStyle}>
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

const LazyTemplate: ComponentStory<typeof Image> = (args) => {
  const imgContainerStyle = {
    width: "100%",
    height: "300px",
  };
  return (
    <div style={imgContainerStyle}>
      <h4 style={{ marginBottom: "30px" }}>
        这个图片是懒加载的，图片在可视区域才开始发送网络请求加载图片
      </h4>
      <Image {...args} />
    </div>
  );
};

export const Lazy = LazyTemplate.bind({});
Lazy.storyName = "图片懒加载";
Lazy.args = {
  src: "https://pic1.zhimg.com/80/v2-235ab378ef0c0bd388ab7c92f3127240_1440w.jpg",
  mode: "cover",
  size: "normal",
  isLazy: true,
};
