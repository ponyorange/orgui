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
    <Button style={{ marginLeft: "10px" }}>默认的</Button>
    <Button style={{ marginLeft: "10px" }} btnType="primary">
      重要的
    </Button>
    <Button style={{ marginLeft: "10px" }} btnType="danger">
      危险的
    </Button>
    <Button style={{ marginLeft: "10px" }} size="large">
      大的
    </Button>
    <Button style={{ marginLeft: "10px" }} size="small">
      小的
    </Button>
    <Button style={{ marginLeft: "10px" }} disabled>
      禁止的
    </Button>
    <Button
      style={{ marginLeft: "10px" }}
      btnType="link"
      href="https://www.baidu.com"
    >
      a标签
    </Button>
    <Button
      style={{ marginLeft: "10px" }}
      btnType="link"
      href="https://www.baidu.com"
      disabled
    >
      a标签禁止的
    </Button>
  </div>
);

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "介绍";

const SizeTemplate: ComponentStory<typeof Button> = (args) => (
  <>
    <Button style={{ marginLeft: "10px" }} size="small">
      small
    </Button>
    <Button style={{ marginLeft: "10px" }} size="normal">
      normal
    </Button>
    <Button style={{ marginLeft: "10px" }} size="large">
      large
    </Button>
  </>
);

export const Size = SizeTemplate.bind({});
Size.storyName = "不同大小的Button";

const TypeTemplate: ComponentStory<typeof Button> = (args) => (
  <>
    <Button style={{ marginLeft: "10px" }} btnType="default">
      default
    </Button>
    <Button
      style={{ marginLeft: "10px" }}
      btnType="link"
      href="https://www.baidu.com"
    >
      a标签
    </Button>
    <Button style={{ marginLeft: "10px" }} btnType="primary">
      primary
    </Button>
    <Button style={{ marginLeft: "10px" }} btnType="danger">
      danger
    </Button>
  </>
);

export const Type = TypeTemplate.bind({});
Type.storyName = "不同类型的Button";
