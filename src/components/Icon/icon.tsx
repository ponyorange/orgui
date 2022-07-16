import React from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
/**
 * icon文档地址
 * https://fontawesome.com/icons/xmark?s=solid
 */

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IconProps extends FontAwesomeIconProps {
  /** 支持框架主题 根据主题显示不同的颜色 */
  theme?: ThemeProps;
  className?: string;
}

/**
 * 提供了一套常用的图标集合 基于 react-fontawesome。

 支持 react-fontawesome的所有属性 可以在这里查询 https://github.com/FortAwesome/react-fontawesome#basic

 支持 fontawesome 所有 free-solid-icons，可以在这里查看所有图标 https://fontawesome.com/icons?d=gallery&s=solid&m=free
 * ### 使用：
 *
 * ~~~js
 * import { Icon } from 'orgui'
 * ~~~
 *
 * ### 示例：
 */

export const Icon: React.FC<IconProps> = (props) => {
  // icon-primary
  const { className, theme, ...restProps } = props;
  const classes = classNames("orange-icon", className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
