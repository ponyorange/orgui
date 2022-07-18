import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Divider from "./divider";

export default {
  title: "OrangeUI/Divider",
  component: Divider,
  argTypes: {},
} as ComponentMeta<typeof Divider>;

const IntroTemplate: ComponentStory<typeof Divider> = () => (
  <>
    <div style={{ height: "30px" }}>
      <Divider />
    </div>
    <div style={{ height: "30px" }}>
      <Divider dashed />
    </div>
  </>
);

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "基本的Divider";

const SizeTemplate: ComponentStory<typeof Divider> = (args) => (
  <>
    <div style={{ height: "30px" }}>
      <Divider>我是一个分割线</Divider>
    </div>
    <div style={{ height: "30px", marginTop: "30px" }}>
      <Divider dashed>我是一个虚线分割线</Divider>
    </div>
    <div style={{ height: "30px", marginTop: "30px" }}>
      <Divider plain>我是一个正文分割线</Divider>
    </div>
    <div style={{ height: "30px", marginTop: "30px" }}>
      <Divider orientation="left">我是一个左边分割线</Divider>
    </div>
    <div style={{ height: "30px", marginTop: "30px" }}>
      <Divider orientation="right">我是一个右边分割线</Divider>
    </div>
  </>
);

export const Size = SizeTemplate.bind({});
Size.storyName = "各种类型分割线";

const TypeTemplate: ComponentStory<typeof Divider> = (args) => (
  <>
    <div>
      <a href="https://www.baidu.com">baidu</a>
      <Divider type="vertical" />
      <a href="https://www.baidu.com">baidu</a>
      <Divider type="vertical" />
      <a href="https://www.baidu.com">baidu</a>
      <Divider type="vertical" />
      <a href="https://www.baidu.com">baidu</a>
    </div>
  </>
);

export const Type = TypeTemplate.bind({});
Type.storyName = "垂直分割线";
