import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import HighLightSpan from "./highLightSpan";

export default {
  title: "OrangeUI/HighLightSpan",
  component: HighLightSpan,
} as ComponentMeta<typeof HighLightSpan>;

const IntroTemplate: ComponentStory<typeof HighLightSpan> = () => (
  <>
    <div>需要高亮的文字：th、un</div>
    <div style={{ marginTop: "10px" }}>
      <HighLightSpan highLigh={["th", "un"]} style={{ fontSize: "22px" }}>
        I love three things in this world. Sun, moon and you. Sun for morning,
        moon for night , and you forever.
      </HighLightSpan>
    </div>
  </>
);

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "默认的HighLightSpan";

const SizeTemplate: ComponentStory<typeof HighLightSpan> = (args) => (
  <>
    <div>需要高亮的文字：th、un、oo</div>
    <div style={{ marginTop: "10px" }}>
      <HighLightSpan
        highLigh={["th", "un", "oo"]}
        multi={false}
        style={{ fontSize: "22px" }}
      >
        I love three things in this world. Sun, moon and you. Sun for morning,
        moon for night , and you forever.
      </HighLightSpan>
    </div>
  </>
);

export const Size = SizeTemplate.bind({});
Size.storyName = "单匹配的HighLighSpan";

const TypeTemplate: ComponentStory<typeof HighLightSpan> = (args) => (
  <>
    <div>需要高亮的文字：th</div>
    <div style={{ marginTop: "10px" }}>
      <HighLightSpan
        highLigh="th"
        style={{ fontSize: "23px", color: "#666", fontWeight: "bold" }}
        highLighStyle={{
          color: "#DC143C",
        }}
      >
        I love three things in this world. Sun, moon and you. Sun for morning,
        moon for night , and you forever.
      </HighLightSpan>
    </div>
  </>
);

export const Type = TypeTemplate.bind({});
Type.storyName = "自定义样式的";
