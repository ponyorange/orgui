import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

export type ButtonSize = "large" | "small" | "normal";
export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonPros {
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  /**设置 Button 的类型 */
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonPros & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonPros & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>; //Partial属性可选
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 使用：
 *
 * ~~~js
 * import { Button } from 'orgui'
 * ~~~
 *
 * ### 示例：
 */
export const Button: React.FC<ButtonProps> = (props) => {
  //提取属性
  const { className, disabled, size, btnType, children, href, ...restProps } =
    props;
  //写样式,每个类型设置不同class,btn,btn-lg,btn-primary,btn是基本样式
  const classes = classNames("btn", className, {
    [`btn-${size}`]: size,
    [`btn-${btnType}`]: btnType,
    disabled: btnType === "link" && disabled,
  });

  //如果type是link且有href属性返回a标签，否则返回button
  if (btnType === "link" && href) {
    return (
      <a href={href} {...restProps} className={classes}>
        {children}
      </a>
    );
  } else {
    return (
      <button {...restProps} className={classes} disabled={disabled}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
  size: "normal",
};

export default Button;
