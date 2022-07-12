import React, { useState } from "react";
import { TabItemProps } from "./tabItem";
import classNames from "classnames";

type TabsType = "line" | "card";
interface TabsProps {
  /** 当前激活 tab 面板的 index，默认为0 */
  defaultIndex?: number;
  /** 点击 Tab 触发的回调函数 */
  onSelect?: (selectedIndex: number) => void;
  /** Tabs的样式，两种可选，默认为 line */
  type?: TabsType;
  /** 可以扩展的 className */
  className?: string;
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * 选项卡切换组件。 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 使用：
 *
 * ~~~js
 * import { Tabs, TabItem } from 'orangeui'
 * ~~~
 *
 * ### 示例：
 */
export const Tabs: React.FC<TabsProps> = (props) => {
  const { children, defaultIndex, onSelect, type, className } = props;
  const [activeIdx, setActiveIdx] = useState(defaultIndex);
  const tabsClasses = classNames("tabs", className);
  const sleectorClasses = classNames("tabs-sele", {
    [`tabs-sele-${type}`]: type,
  });
  const handleClick = (index: number) => {
    setActiveIdx(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const renderShowTag = () => {
    const defaulidx = activeIdx ? activeIdx : 0;
    if (defaulidx >= (children as any[]).length) {
      console.warn("defaultIndex greater than children's length");
    }
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<TabItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "TabItem") {
        // if (index === defaultIndex) {
        //   return childElement.props.children;
        // }
        return activeIdx === index && childElement.props.children;
      } else {
        console.error(
          "Warning: Tabs has a child which is not a TabItem component"
        );
      }
    });
  };

  const renderSeletor = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<TabItemProps>;
      const itemClasses = classNames("item", {
        "item-actice": activeIdx === index,
      });
      return (
        <li
          onClick={() => {
            handleClick(index);
          }}
          className={itemClasses}
        >
          {childElement.props.label}
        </li>
      );
    });
  };

  return (
    <div className={tabsClasses}>
      <ul className={sleectorClasses}>{renderSeletor()}</ul>
      <div className="tabs-show">{renderShowTag()}</div>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: 0,
  type: "line",
};
export default Tabs;
