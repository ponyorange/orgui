import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { WEBHeader } from "./Header";

export default {
  title: "Others/Header",
  component: WEBHeader,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof WEBHeader>;

const Template: ComponentStory<typeof WEBHeader> = (args) => (
  <div style={{ height: "150px" }}>
    <WEBHeader {...args} />
  </div>
);

export const LoggedIn = Template.bind({});
LoggedIn.storyName = "登录后示例";
LoggedIn.args = {
  user: {
    name: "Orange",
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.storyName = "登录前示例";
LoggedOut.args = {};
