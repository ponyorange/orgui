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

const circleprogressDivStyle = {
  width: "90%",
  marginLeft: "5%",
  height: "220px",
  marginTop: "20px",
};
const IntroTemplate: ComponentStory<typeof Progress> = () => {
  const [persent, setPersent] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      setPersent((pre) => {
        if (pre > 99) {
          return 0;
        } else {
          return pre + 1;
        }
      });
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div style={progressDivStyle}>
      <Progress percent={persent} color={["#FFD700", "#FFA500"]} />
    </div>
  );
};

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "默认的Progress";

const SizeTemplate: ComponentStory<typeof Progress> = (args) => {
  const [persent, setPersent] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      setPersent((pre) => {
        if (pre > 99) {
          return 0;
        } else {
          return pre + 1;
        }
      });
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div style={circleprogressDivStyle}>
      <Progress
        percent={persent}
        color={["#12c2e9", "#c471ed", "#f64f59"]}
        type="circle"
      />
    </div>
  );
};

export const Size = SizeTemplate.bind({});
Size.storyName = "圆形Progress";

const TypeTemplate: ComponentStory<typeof Progress> = (args) => {
  const [persent, setPersent] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      setPersent((pre) => {
        if (pre > 99) {
          return 0;
        } else {
          return pre + 1;
        }
      });
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div style={circleprogressDivStyle}>
      <Progress percent={persent} color={["#a8ff78", "#78ffd6"]} type="ring" />
    </div>
  );
};

export const Type = TypeTemplate.bind({});
Type.storyName = "环形Progress";
