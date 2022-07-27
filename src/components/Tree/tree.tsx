import React, { useRef, useState } from "react";
import Icon from "../Icon";
import Checkbox from "../Checkbox";
import Transition from "../Transition/transition";
import classNames from "classnames";

export type DataNode = {
  checkable?: boolean;
  disableCheckbox?: boolean;
  title: React.ReactNode;
  key: string;
  children?: DataNode[];
  disabled?: boolean;
  /** 是否展开 */
  isOpen?: boolean;
};
export interface TreeProps {
  /** 节点前添加 Checkbox 复选框 */
  checkable?: boolean;
  /** 默认展开指定的树节点 */
  defaultExpandedKeys?: string[];
  /** 默认选中的树节点 */
  defaultSelectedKeys?: string[];
  /** 默认选中复选框的树节点 */
  defaultCheckedKeys?: string[];
  /** 点击复选框触发 */
  onSelect?: (
    selectedKeys: string,
    e: {
      selected: boolean;
      selectedNodes: DataNode;
      node: React.ReactNode;
      event: React.MouseEvent;
    }
  ) => void;
  /** 点击树节点触发 */
  onCheck?: (
    checkedKeys: string,
    e: {
      checked: boolean;
      checkedNodes: DataNode;
      node: React.ReactNode;
      event: React.MouseEvent;
      halfCheckedKeys: string[];
    }
  ) => void;
  /** treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一） */
  treeData: DataNode[];
}
/**
 * 多层次的结构列表。
 *
 * 文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用 树控件 可以完整展现其中的层级关系，并具有展开收起选择等交互功能。
 *
 * ### 使用：
 *
 * ~~~js
 * import { Tree } from 'orgui'
 * ~~~
 *
 * ### 示例：
 */
export const Tree: React.FC<TreeProps> = (props) => {
  const { treeData, checkable } = props;

  const [treeDataStare, setTreeDataStare] = useState(treeData);
  const treeDataMap: Record<string, any> = useRef({});

  const subTreeTringleClick = (e: React.MouseEvent) => {
    const clickKey = e.currentTarget.getAttribute("data-key") as string;
    treeDataMap.current[clickKey].isOpen =
      !treeDataMap.current[clickKey].isOpen;
    setTreeDataStare([...treeDataStare]);
  };
  const treeTitleClick = (e: React.MouseEvent) => {
    const clickKey = e.currentTarget.getAttribute("data-key");
    const clickTitle = e.currentTarget.getAttribute("data-title");
    console.log(clickKey);
    alert(clickTitle);
  };
  const renderTree = (td: DataNode[]): React.ReactNode => {
    return td.map((item, index) => {
      treeDataMap.current[item.key] = item;
      if (item.children) {
        if (item.isOpen === undefined) {
          item.isOpen = true;
        }
        const angleClasses = classNames("orange-tree-list-subtree-angle", {
          "orange-tree-list-subtree-angle-close": !item.isOpen,
        });
        return (
          <div
            key={item.key}
            className="orange-tree-treeNode orange-tree-list-subtree"
          >
            <div>
              <span
                className={angleClasses}
                data-key={item.key}
                onClick={subTreeTringleClick}
              >
                <Icon icon="caret-down" />
              </span>
              {/* 节点复选框 */}
              {checkable && (
                <span
                  className="orange-tree-list-subtree-item"
                  data-title={item.title}
                  data-key={item.key}
                >
                  <Checkbox />
                </span>
              )}
              <span
                className="orange-tree-list-subtree-item"
                data-title={item.title}
                data-key={item.key}
                onClick={treeTitleClick}
              >
                {item.title}
              </span>
            </div>
            <Transition in={item.isOpen} timeout={150} animation="zoom-in-top">
              <div>{renderTree(item.children)}</div>
            </Transition>
          </div>
        );
      } else {
        return (
          <div
            key={item.key}
            className="orange-tree-treeNode orange-tree-list-item"
          >
            {/* 节点复选框 */}
            {checkable && (
              <span>
                <Checkbox />
              </span>
            )}
            <span
              data-title={item.title}
              data-key={item.key}
              onClick={treeTitleClick}
              className="orange-tree-list-item-title"
            >
              {item.title}
            </span>
          </div>
        );
      }
    });
  };

  return (
    <div className="orange-tree-list" style={{ position: "relative" }}>
      <div className="orange-tree-list-holder">
        <div>
          <div className="orange-tree-list-holder-inner">
            {renderTree(treeDataStare)}
          </div>
        </div>
      </div>
    </div>
  );
};

Tree.defaultProps = {
  checkable: false,
};
export default Tree;
