import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Tabs from "./tabs";
import TabItem from "./tabItem";
import Icon from "../Icon/icon";

export default {
  title: "OrangeUI/Tabs",
  component: Tabs,
  subcomponents: { TabItem },
} as ComponentMeta<typeof Tabs>;

const IntroTemplate: ComponentStory<typeof Tabs> = () => (
  <div style={{ height: "100px" }}>
    <Tabs onSelect={function noRefCheck() {}} defaultIndex={0}>
      <TabItem label="选项卡一">
        <div>
          <div>
            <h1>我是一个标题</h1>
          </div>
          this is content one
        </div>
      </TabItem>
      <TabItem label="选项卡二">this is content two</TabItem>
      <TabItem label="选项卡三">this is content three</TabItem>
    </Tabs>
  </div>
);

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "介绍";

const SizeTemplate: ComponentStory<typeof Tabs> = (args) => (
  <>
    <Tabs onSelect={function noRefCheck() {}} defaultIndex={1} type="card">
      <TabItem label="选项卡一">this is content one</TabItem>
      <TabItem label="选项卡二">this is content two</TabItem>
      <TabItem label="选项卡三">this is content three</TabItem>
    </Tabs>
  </>
);

export const Size = SizeTemplate.bind({});
Size.storyName = "选项卡样式的Tabs";

const TypeTemplate: ComponentStory<typeof Tabs> = (args) => (
  <>
    <Tabs onSelect={function noRefCheck() {}} defaultIndex={2}>
      <TabItem label="选项卡一">this is content one</TabItem>
      <TabItem label="选项卡二">this is content two</TabItem>
      <TabItem
        label={
          <>
            <Icon icon="check-circle" />
            自定义图标
          </>
        }
      >
        this is content three
      </TabItem>
    </Tabs>
  </>
);

export const Type = TypeTemplate.bind({});
Type.storyName = "自定义选项卡样式";
