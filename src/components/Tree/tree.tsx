import React, { useEffect, useRef, useState } from "react";
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
  /** 是否是叶子 */
  isLeaf?: boolean;
  /** 正在加载异步数据 */
  isLoading?: boolean;
};
export interface TreeProps {
  /** treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一） */
  treeData: DataNode[];
  /** 节点前添加 Checkbox 复选框 */
  checkable?: boolean;
  /** 自动展开父节点 */
  autoExpandParent?: boolean;
  /** 默认展开指定的树节点 */
  defaultExpandedKeys?: string[];
  /** 默认选中的树节点 */
  defaultSelectedKeys?: string[];
  /** 默认选中复选框的树节点 */
  defaultCheckedKeys?: string[];
  /** （受控）展开指定的树节点 */
  expandedKeys?: string[];
  /** （受控）选中复选框的树节点 */
  checkedKeys?: string[];
  /** （受控）设置选中的树节点 */
  selectedKeys?: string[];
  /** 点击树节点触发 */
  onSelect?: (
    selectedKeys: string[],
    e?: {
      selected?: boolean;
      selectedNodes?: DataNode;
      node?: React.ReactNode;
      event?: React.MouseEvent;
    }
  ) => void;
  /** 点击复选框触发 */
  onCheck?: (
    checkedKeys: string[],
    e?: {
      checked?: boolean;
      checkedNodes?: DataNode;
      node?: React.ReactNode;
      event?: React.MouseEvent;
      halfCheckedKeys?: string[];
    }
  ) => void;
  /** 节点展开/关闭时触发 */
  onExpand?: (expandedKeysValue: string[]) => void;
  /** 异步加载数据 */
  loadData?: (node: DataNode) => Promise<any>;
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
  const {
    treeData,
    checkable,
    loadData,
    defaultCheckedKeys,
    defaultExpandedKeys,
    expandedKeys,
    onExpand,
    checkedKeys,
    onCheck,
    defaultSelectedKeys,
    selectedKeys,
    onSelect,
  } = props;
  //树数据
  const [treeDataState, setTreeDataState] = useState(treeData);
  //treeData变时重新渲染
  useEffect(() => {
    setTreeDataState(treeData);
  }, [treeData]);
  //建立映射关系以便快速找到对应节点
  const treeDataMap: Record<string, any> = useRef({});

  //select数据
  const [selectedKeysState, setSelectedKeysState] = useState<string[]>(
    defaultSelectedKeys ? defaultSelectedKeys : []
  );
  useEffect(() => {
    if (selectedKeys) {
      setSelectedKeysState(selectedKeys);
    }
  }, [selectedKeys]);

  //check数据
  const [checkedKeysState, setCheckedKeysState] = useState<string[]>(
    defaultCheckedKeys ? defaultCheckedKeys : []
  );
  useEffect(() => {
    if (checkedKeys) {
      setCheckedKeysState(checkedKeys);
    }
  }, [checkedKeys]);

  //open数据
  const [expandedKeysState, setExpandedKeysState] = useState<string[]>(
    defaultExpandedKeys ? defaultExpandedKeys : []
  );
  useEffect(() => {
    if (expandedKeys) {
      setExpandedKeysState(expandedKeys);
    }
  }, [expandedKeys]);

  /** 三角形按钮点击 */
  const subTreeTringleClick = (e: React.MouseEvent) => {
    const clickKey = e.currentTarget.getAttribute("data-key") as string;
    if (onExpand) {
      if (expandedKeysState.includes(clickKey)) {
        onExpand(expandedKeysState.filter((item) => item !== clickKey));
      } else {
        onExpand([clickKey, ...expandedKeysState]);
      }
    }
    if (!expandedKeys) {
      //非受控
      if (expandedKeysState.includes(clickKey)) {
        setExpandedKeysState(
          expandedKeysState.filter((item) => item !== clickKey)
        );
      } else {
        setExpandedKeysState([clickKey, ...expandedKeysState]);
      }
    }

    if (loadData) {
      //异步加载数据处理
      if (treeDataMap.current[clickKey].item.isLoading === undefined) {
        setTreeDataState((pre) => {
          treeDataMap.current[clickKey].item.isLoading = true;
          return [...pre];
        });
      }
      loadData(treeDataMap.current[clickKey].item).finally(() => {
        setTimeout(() => {
          //增加一个宏任务,外面先改变数据，这里再改变loading状态
          //利用settimeout使用这个setTreeDataState始终比外面的晚执行
          treeDataMap.current[clickKey].item.isLoading = false;
          setTreeDataState((pre) => {
            return [...pre];
          });
        }, 0);
      });
    }
  };

  /** 节点标题点击 */
  const treeTitleClick = (e: React.MouseEvent) => {
    const clickKey: string = e.currentTarget.getAttribute("data-key") || "";
    let selected = true;
    let newSKs = [...selectedKeysState];
    if (newSKs.includes(clickKey)) {
      selected = false;
      newSKs = newSKs.filter((key) => key !== clickKey);
    } else {
      newSKs.push(clickKey);
    }

    if (onSelect) {
      onSelect(newSKs, {
        selected,
        selectedNodes: treeDataMap.current[clickKey].item,
        event: e,
        node: treeDataMap.current[clickKey].item.title,
      });
    }
  };

  /** 深度处理父节点 */
  const deepDealWithCheck = (newCks: string[], treeData: DataNode) => {
    if (treeData.disabled || treeData.disableCheckbox) return;
    //判断处理父节点的半选中状态
    // let subtreeIndeterminate = false;
    let subtreeCheckedCount = 0;
    let checkItemCount = 0;
    const queue = [treeData.children];
    while (queue.length > 0) {
      const child = queue.shift();
      child?.forEach((c) => {
        if (c.children) queue.push(c.children);
        if (!c.disableCheckbox && !c.disabled) {
          checkItemCount += 1;
          if (newCks.includes(c.key)) {
            subtreeCheckedCount += 1;
          }
        }
      });
    }
    // if (subtreeCheckedCount > 0) {
    //   //说明有孩子被选中，要半选中
    //   subtreeIndeterminate = true;
    // }
    if (subtreeCheckedCount >= checkItemCount) {
      //说明全部孩子被选中，添加自己到checkstate
      if (!newCks.includes(treeData.key)) {
        newCks.push(treeData.key);
      }
    } else {
      if (newCks.includes(treeData.key)) {
        newCks.splice(newCks.indexOf(treeData.key), 1);
      }
    }
  };
  const dealWithParentCkeck = (newCks: string[], key: string) => {
    let cur = treeDataMap.current[key];
    while (cur.parent) {
      deepDealWithCheck(newCks, cur.parent);
      cur = treeDataMap.current[cur.parent.key];
    }
    if (onCheck) {
      onCheck(newCks);
    }
    if (!checkedKeys) {
      //非受控
      setCheckedKeysState(newCks);
    }
  };

  /** 渲染树 */
  const renderTree = (td: DataNode[], parent?: DataNode): React.ReactNode => {
    return td.map((item, index) => {
      treeDataMap.current[item.key] = { item, parent };
      if (item.children || (loadData && !item.isLeaf)) {
        //处理节点开合状态，
        item.isOpen = expandedKeysState.includes(item.key);

        const subtreeItemClasses = classNames("orange-tree-list-subtree-item", {
          "orange-tree-list-subtree-item-disabled": !!item.disabled,
        });
        const angleClasses = classNames("orange-tree-list-subtree-angle", {
          "orange-tree-list-subtree-angle-close": !item.isOpen,
        });

        const checkboxChange = (checked: boolean) => {
          let newCKs: string[] = [];
          if (checked) {
            //添加所有儿子孙子
            newCKs = [item.key, ...checkedKeysState];
            //只添加所有的孙子
            // newCKs = [...checkedKeysState];
            const queue = [item.children];
            while (queue.length > 0) {
              const child = queue.shift();
              child?.forEach((c) => {
                if (c.children) queue.push(c.children);
                //加上了else 代表只添加所有孙子节点，不添加subtree节点
                if (
                  !newCKs.includes(c.key) &&
                  !c.disableCheckbox &&
                  !c.disabled
                ) {
                  newCKs.push(c.key);
                }
              });
            }
          } else {
            //移除所有儿子孙子
            newCKs = checkedKeysState.filter((fit) => fit !== item.key);
            const queue = [item.children];
            while (queue.length > 0) {
              const child = queue.shift();
              child?.forEach((c) => {
                if (c.children) queue.push(c.children);
                if (
                  newCKs.includes(c.key) &&
                  !c.disableCheckbox &&
                  !c.disabled
                ) {
                  newCKs.splice(newCKs.indexOf(c.key), 1);
                }
              });
            }
          }
          //处理父节点
          dealWithParentCkeck(newCKs, item.key);
        };
        //判断处理父节点的半选中状态
        let subtreeIndeterminate = false;
        let subtreeCheckedCount = 0;
        const queue = [item.children];
        while (queue.length > 0) {
          const child = queue.shift();
          child?.forEach((c) => {
            // checkItemCount += 1;
            if (c.children) queue.push(c.children);
            if (
              checkedKeysState.includes(c.key) &&
              !c.disabled &&
              !c.disableCheckbox
            ) {
              subtreeCheckedCount += 1;
            }
          });
        }
        if (subtreeCheckedCount > 0) {
          //说明有孩子被选中，要半选中
          subtreeIndeterminate = true;
        }

        return (
          <div
            key={item.key}
            className="orange-tree-treeNode orange-tree-list-subtree"
          >
            <div>
              {/* 左边图标 */}
              {item.isLoading ? ( //loading图标
                <span
                  data-key={item.key}
                  className="orange-tree-list-subtree-loading"
                >
                  <Icon icon="spinner" pulse size="xs" />
                </span>
              ) : (
                //三角形图标
                <span
                  className={angleClasses}
                  data-key={item.key}
                  onClick={subTreeTringleClick}
                >
                  <Icon icon="caret-down" />
                </span>
              )}
              {/* 节点复选框 */}
              {checkable && (
                <span
                  className="orange-tree-list-checkbox"
                  data-title={item.title}
                  data-key={item.key}
                >
                  <Checkbox
                    disabled={!!item.disableCheckbox || !!item.disabled}
                    onChange={checkboxChange}
                    checked={checkedKeysState.includes(item.key)}
                    indeterminate={subtreeIndeterminate}
                  />
                </span>
              )}
              <span
                className={subtreeItemClasses}
                data-title={item.title}
                data-key={item.key}
                onClick={treeTitleClick}
              >
                {item.title}
              </span>
            </div>
            {item.children && (
              <Transition
                in={item.isOpen}
                timeout={150}
                animation="zoom-in-top"
              >
                <div>{renderTree(item.children, item)}</div>
              </Transition>
            )}
          </div>
        );
      } else {
        const itemClasses = classNames(
          "orange-tree-treeNode",
          "orange-tree-list-item",
          {
            "orange-tree-treeNode-disabled": !!item.disabled,
          }
        );
        const checkboxChange = (checked: boolean) => {
          let newCks: string[] = [];
          if (!checkedKeysState.includes(item.key)) {
            newCks = [item.key, ...checkedKeysState];
          } else {
            newCks = checkedKeysState.filter((it) => it !== item.key);
          }

          dealWithParentCkeck(newCks, item.key);
        };
        return (
          <div key={item.key} className={itemClasses}>
            {/* 三角形占位符 */}
            <span
              className="orange-tree-list-subtree-angle"
              style={{ visibility: "hidden" }}
            >
              <Icon icon="caret-down" />
            </span>
            {/* 节点复选框 */}
            {checkable && (
              <span className="orange-tree-list-checkbox">
                <Checkbox
                  disabled={!!item.disableCheckbox || !!item.disabled}
                  onChange={checkboxChange}
                  checked={checkedKeysState.includes(item.key)}
                />
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
            {renderTree(treeDataState)}
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
