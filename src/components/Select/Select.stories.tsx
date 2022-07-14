import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Select, Option } from "./index";

export default {
  title: "OrangeUI/Select",
  component: Select,
  subcomponents: { Option },
} as ComponentMeta<typeof Select>;

const IntroTemplate: ComponentStory<typeof Select> = () => (
  <div style={{ height: "100px", width: "20rem" }}>
    <Select>
      <Option value="jack">Jack</Option>
      <Option value="jack2">Jack2</Option>
      <Option value="jack3">Jack3</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
  </div>
);

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "默认的Select";

const SizeTemplate: ComponentStory<typeof Select> = (args) => (
  <div style={{ height: "300px" }}>
    <Select multiple>
      <Option value="jack">Jack</Option>
      <Option value="jack2">Jack2</Option>
      <Option value="jack3">Jack3</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
  </div>
);

export const Size = SizeTemplate.bind({});
Size.storyName = "多选的Select";

const TypeTemplate: ComponentStory<typeof Select> = (args) => (
  <>
    <Select disabled>
      <Option value="jack">Jack</Option>
      <Option value="jack2">Jack2</Option>
      <Option value="jack3">Jack3</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
  </>
);

export const Type = TypeTemplate.bind({});
Type.storyName = "禁用的Select";
