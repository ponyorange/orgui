import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Alert from "./alert";
import Button from "../Button/button";

export default {
  title: "OrangeUI/Alert",
  component: Alert,
  argTypes: {},
} as ComponentMeta<typeof Alert>;

const IntroTemplate: ComponentStory<typeof Alert> = () => {
  const [alertShow, setAlertShow] = useState(true);
  const alertCloseClick = () => {
    setAlertShow(!alertShow);
  };

  return (
    <>
      {alertShow && <Alert title="我是一个提示" onClose={alertCloseClick} />}
      <Button
        className="myBtn"
        onClick={() => setAlertShow(true)}
        style={{ marginTop: "20px" }}
      >
        显示 Alert
      </Button>
    </>
  );
};

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "介绍";

const SizeTemplate: ComponentStory<typeof Alert> = (args) => (
  <>
    <Alert title="我是一个普通提示" />
    <Alert title="我是一个成功提示" type="success" />
    <Alert title="我是一个警告提示" type="warning" closeable={false} />
    <Alert title="我是一个错误提示" type="danger" />
  </>
);

export const Size = SizeTemplate.bind({});
Size.storyName = "不同样式的Alert";

const TypeTemplate: ComponentStory<typeof Alert> = (args) => (
  <>
    <Alert
      title="我是一个提示的标题"
      description="我是这个提示的描述，我有很多很多行。"
    />
  </>
);

export const Type = TypeTemplate.bind({});
Type.storyName = "带描述的Alert";
