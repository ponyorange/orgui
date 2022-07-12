import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Icon from "./icon";
import Button from "../Button/button";

export default {
  title: "OrangeUI/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const IntroTemplate: ComponentStory<typeof Icon> = (args) => {
  return (
    <>
      <Icon icon="check-circle" size="3x" />
      <Icon icon="check" size="3x" />
      <Icon icon="times" size="3x" />
      <Icon icon="heart" size="3x" />
      <Icon icon="trash" size="3x" />
      <Button size="normal" btnType="primary">
        <Icon icon="check" /> check{" "}
      </Button>
    </>
  );
};

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "默认图标";

const ThemeTemplate: ComponentStory<typeof Icon> = (args) => {
  return (
    <>
      <Icon icon="check-circle" size="3x" theme="primary" />
      <Icon icon="check" size="3x" theme="success" />
      <Icon icon="times" size="3x" theme="warning" />
      <Icon icon="heart" size="3x" theme="danger" />
      <Icon icon="trash" size="3x" theme="info" />
    </>
  );
};

export const Theme = ThemeTemplate.bind({});
Theme.storyName = "不同主题的Icon";

const OtherTemplate: ComponentStory<typeof Icon> = (args) => {
  return (
    <>
      <Icon icon="spinner" size="3x" theme="primary" spin />
      <Icon icon="spinner" size="3x" theme="success" pulse />
    </>
  );
};

export const Other = OtherTemplate.bind({});
Other.storyName = "更多行为的Icon";
