import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Progress from "./progress";

export default {
  title: "OrangeUI/Progress",
  component: Progress,
} as ComponentMeta<typeof Progress>;
const progressDivStyle = {
  width: "90%",
  marginLeft: "5%",
  height: "60px",
  marginTop: "20px",
};
const IntroTemplate: ComponentStory<typeof Progress> = () => {
  return (
    <div style={progressDivStyle}>
      <Progress percent={90} />
    </div>
  );
};

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "默认的Progress";

const SizeTemplate: ComponentStory<typeof Progress> = (args) => {
  return (
    <div style={progressDivStyle}>
      <Progress percent={90} color={["#12c2e9", "#c471ed", "#f64f59"]} />
    </div>
  );
};

export const Size = SizeTemplate.bind({});
Size.storyName = "渐变的的Progress";

const TypeTemplate: ComponentStory<typeof Progress> = (args) => {
  return (
    <div style={progressDivStyle}>
      <Progress percent={90} showText={false} color={["#a8ff78", "#78ffd6"]} />
    </div>
  );
};

export const Type = TypeTemplate.bind({});
Type.storyName = "不显示进度的Progress";
