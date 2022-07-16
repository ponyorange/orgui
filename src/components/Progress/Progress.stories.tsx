import React, { useEffect, useState } from "react";
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
  const [persent, setPersent] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      if (persent < 91) {
        setPersent(persent + 1);
      } else {
        setPersent(10);
      }
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [persent]);
  return (
    <div style={progressDivStyle}>
      <Progress percent={persent} color={["#FFD700", "#FFA500"]} />
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
Size.storyName = "多色渐变的的Progress";

const TypeTemplate: ComponentStory<typeof Progress> = (args) => {
  return (
    <div style={progressDivStyle}>
      <Progress percent={90} showText={false} color={["#a8ff78", "#78ffd6"]} />
    </div>
  );
};

export const Type = TypeTemplate.bind({});
Type.storyName = "不显示进度的Progress";
