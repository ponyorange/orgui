import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Menu, MenuItem, SubMenu } from "./index";

export default {
  title: "OrangeUI/Menu",
  component: Menu,
  subcomponents: { SubMenu, MenuItem },
  argTypes: {},
} as ComponentMeta<typeof Menu>;

const IntroTemplate: ComponentStory<typeof Menu> = (args) => {
  return (
    <div>
      <Menu {...args}>
        <MenuItem>页面一</MenuItem>
        <MenuItem>页面二</MenuItem>
        <MenuItem disabled>disabled</MenuItem>
        <SubMenu title="子菜单">
          <MenuItem>子选项一</MenuItem>
          <MenuItem>子选项二</MenuItem>
          <MenuItem>子选项三</MenuItem>
          <SubMenu title="子菜单">
            <MenuItem>eee</MenuItem>
            <MenuItem>fff</MenuItem>
            <MenuItem>ggg</MenuItem>
            <SubMenu title="子菜单">
              <MenuItem>hhh</MenuItem>
              <MenuItem>iii</MenuItem>
              <MenuItem>jjj</MenuItem>
            </SubMenu>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
  );
};

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "默认的Menu";

const VerticalTemplate: ComponentStory<typeof Menu> = (args) => {
  return (
    <div>
      <Menu {...args}>
        <MenuItem>页面一</MenuItem>
        <MenuItem>页面二</MenuItem>
        <MenuItem>页面三</MenuItem>
        <SubMenu title="子菜单">
          <MenuItem>子选项一</MenuItem>
          <MenuItem>子选项二</MenuItem>
          <MenuItem>子选项三</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
};

export const Vertical = VerticalTemplate.bind({});
Vertical.storyName = "纵向的Menu";
Vertical.args = { mode: "vertical" };

const VerticalOpenTemplate: ComponentStory<typeof Menu> = (args) => {
  return (
    <div>
      <Menu {...args}>
        <MenuItem>页面一</MenuItem>
        <MenuItem>页面二</MenuItem>
        <MenuItem>页面三</MenuItem>
        <SubMenu title="子菜单">
          <MenuItem>子选项一</MenuItem>
          <MenuItem>子选项二</MenuItem>
          <MenuItem>子选项三</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
};

export const VerticalOpen = VerticalOpenTemplate.bind({});
VerticalOpen.storyName = "默认打开的纵向Menu";
VerticalOpen.args = { mode: "vertical", defaultOpenSubMenus: ["3"] };
