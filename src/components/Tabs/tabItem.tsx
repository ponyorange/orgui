import React, { JSXElementConstructor, ReactElement } from "react";

export interface TabItemProps {
  /** Tab选项上面的文字 */
  label: string | ReactElement<any, string | JSXElementConstructor<any>>;
  /** Tab选项是否被禁用 */
  disabled?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
}

export const TabItem: React.FC<TabItemProps> = (props) => {
  const { label } = props;
  return <li>{label}</li>;
};

TabItem.displayName = "TabItem";
export default TabItem;
