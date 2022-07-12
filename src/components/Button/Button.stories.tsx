import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./button";

export default {
  title: "OrangeUI/Button",
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const IntroTemplate: ComponentStory<typeof Button> = () => (
  <div>
    <Button>默认的</Button>
    <Button btnType="primary">主要的</Button>
    <Button btnType="danger">危险的</Button>
    <Button size="large">大的</Button>
    <Button size="small">小的</Button>
    <Button disabled>禁止的</Button>
    <Button btnType="link" href="https://www.baidu.com">
      a标签
    </Button>
    <Button btnType="link" href="https://www.baidu.com" disabled>
      a标签禁止的
    </Button>
  </div>
);

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "介绍";

const SizeTemplate: ComponentStory<typeof Button> = (args) => (
  <>
    <Button size="small">small</Button>
    <Button size="normal">normal</Button>
    <Button size="large">large</Button>
  </>
);

export const Size = SizeTemplate.bind({});
Size.storyName = "不同大小的Button";

const TypeTemplate: ComponentStory<typeof Button> = (args) => (
  <>
    <Button btnType="default">default</Button>
    <Button btnType="link" href="https://www.baidu.com">
      a标签
    </Button>
    <Button btnType="primary">primary</Button>
    <Button btnType="danger">danger</Button>
  </>
);

export const Type = TypeTemplate.bind({});
Type.storyName = "不同类型的Button";
