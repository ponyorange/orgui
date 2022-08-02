import React, { useState } from "react";
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
              title: <span style={{ color: "orange" }}>sss</span>,
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
      defaultExpandedKeys={["0-0", "0-0-0", "0-0-1"]}
      defaultSelectedKeys={["0-0-0", "0-0-1"]}
      defaultCheckedKeys={["0-0-0"]}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
      checkable
    />
  );
};

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "基本的Tree";

const SizeTemplate: ComponentStory<typeof Tree> = (args) => {
  const treeData: DataNode[] = [
    {
      title: "0-0",
      key: "0-0",
      children: [
        {
          title: "0-0-0",
          key: "0-0-0",
          children: [
            { title: "0-0-0-0", key: "0-0-0-0" },
            { title: "0-0-0-1", key: "0-0-0-1" },
            { title: "0-0-0-2", key: "0-0-0-2" },
          ],
        },
        {
          title: "0-0-1",
          key: "0-0-1",
          children: [
            { title: "0-0-1-0", key: "0-0-1-0" },
            { title: "0-0-1-1", key: "0-0-1-1" },
            { title: "0-0-1-2", key: "0-0-1-2" },
          ],
        },
        {
          title: "0-0-2",
          key: "0-0-2",
        },
      ],
    },
    {
      title: "0-1",
      key: "0-1",
      children: [
        { title: "0-1-0-0", key: "0-1-0-0" },
        { title: "0-1-0-1", key: "0-1-0-1" },
        { title: "0-1-0-2", key: "0-1-0-2" },
      ],
    },
    {
      title: "0-2",
      key: "0-2",
    },
  ];

  const [expandedKeys, setExpandedKeys] = useState<string[]>([
    "0-0",
    "0-1",
    "0-0-0",
    "0-0-1",
  ]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([
    "0-0-0-1",
    "0-0-1-1",
  ]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: string[]) => {
    console.log("onExpand", expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: string[]) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: string[], info: any) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Tree
      checkable
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData}
    />
  );
};

export const Size = SizeTemplate.bind({});
Size.storyName = "受控操作示例";

const TypeTemplate: ComponentStory<typeof Tree> = (args) => {
  const initTreeData: DataNode[] = [
    {
      title: "Expand to load",
      key: "0",
    },
    { title: "Expand to load", key: "1" },
    { title: "Tree Node", key: "2", isLeaf: true },
  ];

  // It's just a simple demo. You can use tree map to optimize update perf.
  const updateTreeData = (
    list: DataNode[],
    key: string,
    children: DataNode[]
  ): DataNode[] =>
    list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });

  const [treeData, setTreeData] = useState(initTreeData);

  const onLoadData = ({ key, children }: any) =>
    new Promise<void>((resolve) => {
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        setTreeData((origin) => {
          return updateTreeData(origin, key, [
            { title: "Child Node", key: `${key}-0` },
            { title: "Child Node", key: `${key}-1` },
          ]);
        });
        resolve();
      }, 1000);
    });

  return <Tree loadData={onLoadData} treeData={treeData} />;
};

export const Type = TypeTemplate.bind({});
Type.storyName = "异步数据加载";
