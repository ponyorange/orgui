import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Checkbox from "./chexkbox";

export default {
  title: "OrangeUI/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const IntroTemplate: ComponentStory<typeof Checkbox> = () => (
  <div>
    <Checkbox>Checkbox</Checkbox>
  </div>
);

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "基本的Checkbox";

const SizeTemplate: ComponentStory<typeof Checkbox> = (args) => (
  <div>
    <Checkbox defaultChecked disabled>
      Checkbox
    </Checkbox>
    <Checkbox disabled>Checkbox</Checkbox>
    <Checkbox indeterminate disabled>
      Checkbox
    </Checkbox>
  </div>
);

export const Size = SizeTemplate.bind({});
Size.storyName = "失效的Checkbox";

const TypeTemplate: ComponentStory<typeof Checkbox> = (args) => (
  <div>
    <Checkbox indeterminate>Checkbox</Checkbox>
  </div>
);

export const Type = TypeTemplate.bind({});
Type.storyName = "半选中的Checkbox";
