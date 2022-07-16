import React, { FC } from "react";
import { ThemeProps } from "../Icon/icon";

// type colorType = [string, string, string] | [string, string] | [string];

export interface ProgressProps {
  /** 当前进度 */
  percent: number;
  /** 进度条高度 */
  strokeHeight?: number;
  /** 是否显示百分比 */
  showText?: boolean;
  showTextColor?: string;
  /** 进度条颜色，支持单色、多色渐变 */
  color?: string[];
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}
/**
 * 进度条，用户展示交互进度。支持单色、多色渐变
 *
 *  可以在这里挑选喜欢的渐变色：https://uigradients.com/#MegaTron
 *
 * ### 使用：
 *
 * ~~~js
 * import { Progress } from 'orgui'
 * ~~~
 *
 * ### 示例：
 */
export const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
    color,
    showTextColor,
  } = props;
  let showTextColorStyle = {};
  if (showTextColor) {
    showTextColorStyle = { color: showTextColor };
  }
  let progressColorStyle: { background?: string; width?: string } = {};
  if (color && color.length > 0) {
    if (color.length === 1) {
      progressColorStyle = {
        background: color[0],
        width: `${percent}%`,
      };
    } else if (color.length === 2) {
      progressColorStyle = {
        background: `linear-gradient(to right, ${color[0]}, ${color[1]})`,
        width: `${percent}%`,
      };
    } else if (color.length === 3) {
      progressColorStyle = {
        background: `linear-gradient(to right, ${color[0]}, ${color[1]}, ${color[2]})`,
        width: `${percent}%`,
      };
    } else {
      progressColorStyle = {
        background: `linear-gradient(to right, ${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
        width: `${percent}%`,
      };
    }
  } else {
    progressColorStyle = {
      width: `${percent}%`,
    };
  }

  return (
    <div className="orange-progress-bar" style={styles}>
      <div
        className="orange-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`orange-progress-bar-inner color-${theme}`}
          style={progressColorStyle}
        >
          {showText && (
            <span
              className="inner-text"
              style={showTextColorStyle}
            >{`${percent}%`}</span>
          )}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};
export default Progress;
