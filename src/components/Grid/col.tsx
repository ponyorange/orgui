import React, { CSSProperties } from "react";
import classNames from "classnames";

export interface ColProps {
  /** flex 布局属性 */
  flex?: number | string;
  /** 栅格左侧的间隔格数，间隔内不可以有栅格 */
  offset?: number;
  /** 栅格顺序 */
  order?: number;
  /** 栅格向左移动格数 */
  pull?: number;
  /** 栅格向右移动格数 */
  push?: number;
  /** 栅格占位格数，为 0 时相当于 display: none */
  span?: number;
  /** 屏幕 < 576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xs?: number;
  /** 屏幕 ≥ 576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  sm?: number;
  /** 屏幕 ≥ 768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  md?: number;
  /** 屏幕 ≥ 992px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  lg?: number;
  /** 屏幕 ≥ 1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xl?: number;
  /** 屏幕 ≥ 1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xxl?: number;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Col: React.FC<ColProps> = (props) => {
  const { children, span, className, style, xs, sm, md, lg, xl, xxl } = props;
  let fixSpan: number = -1;
  if (!span) {
    fixSpan = 0;
  } else {
    fixSpan = span;
  }

  const classes = classNames("orange-col", className, {
    [`orange-col-${fixSpan}`]: fixSpan >= 0,
    [`orange-col-xs-${xs}`]: xs,
    [`orange-col-sm-${sm}`]: sm,
    [`orange-col-md-${md}`]: md,
    [`orange-col-lg-${lg}`]: lg,
    [`orange-col-xl-${xl}`]: xl,
    [`orange-col-xxl-${xxl}`]: xxl,
  });
  return (
    <div style={style} className={classes}>
      {children}
    </div>
  );
};

export default Col;
