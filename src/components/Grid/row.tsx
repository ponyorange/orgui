import React, { useCallback, useEffect, useState } from "react";
import { ColProps } from "./col";
import classNames from "classnames";

type RowAlignType = "top" | "midddle" | "bottom";
type RowGuterType = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
};
type RowJustifyType =
  | "start"
  | "end"
  | "center"
  | "space-around"
  | "space-between"
  | "space-evenly";

interface RowProps {
  /** 垂直对齐方式 */
  align?: RowAlignType;
  /** 栅格间隔，可以写成像数值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距] */
  gutter?: number | [number, number] | RowGuterType;
  /** 水平排列方式 */
  justify?: RowJustifyType;
  /** 是否自动换行 */
  wrap?: boolean;
  /** 列col */
  children?: React.ReactElement<ColProps> | React.ReactElement<ColProps>[];
}

/**
 * 24 栅格系统。
 *
 * 在多数业务情况下，需要在设计区域内解决大量信息收纳的问题，因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24 等分的原则进行划分。

 划分之后的信息区块我们称之为『盒子』。建议横向排列的盒子数量最多四个，最少一个。『盒子』在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版规则，以保证视觉层面的舒适感。
 *
 * ### 使用：
 *
 * ~~~js
 * import { Row , Col } from 'orgui'
 * ~~~
 *
 * ### 示例：
 */

export const Row: React.FC<RowProps> = (props) => {
  const { children, gutter } = props;
  const classes = classNames("orange-row");
  const isObject = (obj: any) =>
    Object.prototype.toString.call(obj) === "[object Object]";
  //根据屏幕宽度获取当前的gutter值
  const getGutterByObject = (obj?: RowGuterType): number => {
    const w = window.document.documentElement.clientWidth;
    if (w < 576 && obj?.xs) {
      return obj.xs;
    } else if (w >= 567 && w < 768 && obj?.sm) {
      return obj.sm;
    } else if (w >= 768 && w < 992 && obj?.md) {
      return obj.md;
    } else if (w >= 992 && w < 1200 && obj?.lg) {
      return obj.lg;
    } else if (w >= 1200 && w < 1600 && obj?.xl) {
      return obj.xl;
    } else if (w > 1600 && obj?.xxl) {
      return obj.xxl;
    } else {
      //没匹配到默认返回 16
      return 16;
    }
  };

  let paddingTop = 0,
    paddingLeft = 0;
  if (Array.isArray(gutter)) {
    [paddingLeft, paddingTop] = gutter;
    paddingLeft = paddingLeft / 2;
    paddingTop = paddingTop / 2;
  } else if (isObject(gutter)) {
    paddingLeft = getGutterByObject(gutter as Object) / 2;
    paddingTop = 0;
  } else if (typeof gutter === "number") {
    paddingLeft = gutter / 2;
  }
  //监听屏幕变化并设置对应根padding
  const [paddingLeftState, setPaddingLeftState] = useState(paddingLeft);
  const [paddingTopState, setPaddingTopState] = useState(paddingTop);
  const windowResizeCallback = useCallback(() => {
    const newPadingLeft = getGutterByObject(gutter as Object) / 2;
    if (paddingLeft !== newPadingLeft) {
      setPaddingLeftState(newPadingLeft);
    }
  }, [gutter, paddingLeft]);
  useEffect(() => {
    if (isObject(gutter)) {
      window.addEventListener("resize", windowResizeCallback);
    }
    return () => {
      if (isObject(gutter)) {
        window.removeEventListener("resize", windowResizeCallback);
      }
    };
  }, [gutter, windowResizeCallback]);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      const childEle = child as React.FunctionComponentElement<ColProps>;
      return React.cloneElement(childEle, {
        style: { paddingLeft: paddingLeftState, paddingTop: paddingTopState },
      });
    });
  };
  return <div className={classes}>{renderChildren()}</div>;
};

export default Row;
