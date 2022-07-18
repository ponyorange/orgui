import React, { CSSProperties } from "react";
import classNames from "classnames";

type OrientationType = "left" | "right" | "center";
type DividerType = "horizontal" | "vertical";

interface DividerProps {
  /** 嵌套的标题 */
  children?: React.ReactNode;
  /** 分割线样式类 */
  className?: string;
  /** 是否虚线 */
  dashed?: boolean;
  /** 分割线标题的位置 */
  orientation?: OrientationType;
  /** 标题和最近 left/right 边框之间的距离，去除了分割线,同时 orientation 必须为 left 或 right */
  orientationMargin?: number;
  /** 分割线样式对象	 */
  style?: CSSProperties;
  /** 文字是否显示为普通正文样式 */
  plain?: boolean;
  /** 水平还是垂直类型 */
  type?: DividerType;
}

/**
 * 区隔内容的分割线。
 * ### 使用：
 *
 * ~~~js
 * import { Divider } from 'orgui'
 * ~~~
 *
 * ### 示例(默认)：
 */

export const Divider: React.FC<DividerProps> = (props) => {
  const {
    children,
    type,
    orientation,
    dashed,
    plain,
    className,
    orientationMargin,
    style,
  } = props;
  const classes = classNames("orange-divider", className, {
    [`orange-divider-${type}`]: !!type,
    "orange-divider-with-text": !!children,
    [`orange-divider-with-text-${orientation}`]: !!orientation,
    "orange-divider-dashed": dashed,
    "orange-divider-plain": plain,
  });

  return (
    <div className={classes} role="separator" style={style}>
      {type === "horizontal" && (
        <span className="orange-divider-inner-text">{children}</span>
      )}
    </div>
  );
};

Divider.defaultProps = {
  type: "horizontal",
};
export default Divider;
