import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Tree, { DataNode, TreeProps } from "./tree";

export default {
  title: "OrangeUI/Tree",
  component: Tree,
  argTypes: {},
} as ComponentMeta<typeof Tree>;

const IntroTemplate: ComponentStory<typeof Tree> = () => {
  const treeData: DataNode[] = [
    {
      title: "parent 1",
      key: "0-0",
      children: [
        {
          title: "parent 1-0",
          key: "0-0-0",
          disabled: true,
          children: [
            {
              title: "leaf",
              key: "0-0-0-0",
              disableCheckbox: true,
            },
            {
              title: "fruits",
              key: "0-0-0-1",
              children: [
                {
                  title: "apple",
                  key: "0-0-0-0-0",
                  disableCheckbox: true,
                },
                {
                  title: "orange",
                  key: "0-0-0-1-1",
                },
              ],
            },
          ],
        },
        {
          title: "parent 1-1",
          key: "0-0-1",
          children: [
            {
              title: <span style={{ color: "#1890ff" }}>sss</span>,
              key: "0-0-1-0",
            },
          ],
        },
      ],
    },
  ];
  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <Tree
      defaultExpandedKeys={["0-0-0", "0-0-1"]}
      defaultSelectedKeys={["0-0-0", "0-0-1"]}
      defaultCheckedKeys={["0-0-0", "0-0-1"]}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
    />
  );
};

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "基本的Tree";

const SizeTemplate: ComponentStory<typeof Tree> = (args) => <div>待实现</div>;

export const Size = SizeTemplate.bind({});
Size.storyName = "受控操作示例";

const TypeTemplate: ComponentStory<typeof Tree> = (args) => <div>待实现</div>;

export const Type = TypeTemplate.bind({});
Type.storyName = "异步数据加载";
