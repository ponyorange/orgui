import React, { LiHTMLAttributes } from "react";
import Icon from "../Icon/icon";
export interface OptionProps extends LiHTMLAttributes<HTMLElement> {
  /** 选项的值 */
  value: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 选项显示的值，若不设置则显示value */
  children?: React.ReactNode;
}
export const Option: React.FC<OptionProps> = (props) => {
  const { children, value, ...restProps } = props;

  return (
    <li {...restProps}>
      {children ? children : value}
      <Icon icon="xmark" size="sm" theme="primary" />
    </li>
  );
};

export default Option;
