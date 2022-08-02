import React, { FC } from "react";
import { ThemeProps } from "../Icon/icon";
import classNames from "classnames";

type progressType = "line" | "circle" | "ring";

export interface ProgressProps {
  /** 当前进度 */
  percent: number;
  /** 进度条类型，条型、圆形、环形 */
  type?: progressType;
  /** 进度条高度 */
  strokeHeight?: number;
  /** 圆形环形进度条大小 */
  circleSize?: number;
  /** 是否显示百分比 */
  showText?: boolean;
  /** 百分比文字颜色 */
  showTextColor?: string;
  /** 进度条颜色，支持单色、多色渐变 */
  color?: string[];
  /** 是否开启闪条动画（仅限line） */
  active?: boolean;
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
    type,
    circleSize,
    active,
  } = props;
  let showTextColorStyle = {};
  if (showTextColor) {
    showTextColorStyle = { color: showTextColor };
  }

  const getBackground = () => {
    if (color) {
      if (color.length === 1) {
        return color[0];
      } else if (color.length === 2) {
        return `linear-gradient(to right, ${color[0]}, ${color[1]})`;
      } else if (color.length === 3) {
        return `linear-gradient(to right, ${color[0]}, ${color[1]}, ${color[2]})`;
      } else {
        return `linear-gradient(to right, ${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
      }
    } else {
      return "orange";
    }
  };

  const getStrokeColor = () => {
    if (color) {
      const res = [];
      for (let i = 0; i < color.length; i++) {
        let offset = (100 / (color.length - 1)) * i + "%";
        res.push(
          <stop offset={offset} stopColor={color[i]} key={`color-${i}`}></stop>
        );
      }
      return res;
    } else {
      return [<stop offset="0%" stopColor="orange"></stop>];
    }
  };

  let progressColorStyle: { background?: string; width?: string } = {};
  if (color && color.length > 0) {
    progressColorStyle = {
      background: getBackground(),
      width: `${percent}%`,
    };
  } else {
    progressColorStyle = {
      width: `${percent}%`,
    };
  }
  if (type === "circle") {
    let rightdeg = 0;
    let leftdeg = 0;
    if (percent <= 50) {
      rightdeg = (180 / 50) * percent;
      leftdeg = 0;
    } else {
      rightdeg = 180;
      leftdeg = (180 / 50) * (percent - 50);
    }
    const circleWidth = circleSize || 110;
    return (
      <div
        className="orange-progress-circle"
        style={{
          background: getBackground(),
          width: `${circleWidth}px`,
          height: `${circleWidth}px`,
        }}
      >
        <div
          className="circle-bar-left"
          style={{
            transform: `rotate(${leftdeg}deg)`,
            clip: `rect(0, ${circleWidth / 2}px, auto, 0)`,
          }}
        />
        <div
          className="circle-bar-base"
          style={{
            background: getBackground(),
            clip: `rect(0, auto, auto, ${circleWidth / 2}px)`,
          }}
        />
        {percent <= 50 && (
          <div
            className="circle-bar-right"
            style={{
              transform: `rotate(${rightdeg}deg)`,
              clip: `rect(0, auto, auto, ${circleWidth / 2}px)`,
            }}
          />
        )}
        {showText && (
          <div className="mask">
            <span className="percent" style={showTextColorStyle}>
              {percent}%
            </span>
          </div>
        )}
      </div>
    );
  } else if (type === "ring") {
    const ringWidth = circleSize || 110;
    const defaultStroke = (1069 / 440) * ringWidth;
    const percentStroke = defaultStroke * (100 - percent) * 0.01;
    return (
      <div className="orange-progress-ring">
        <svg
          width={ringWidth}
          height={ringWidth}
          viewBox={`0 0 ${ringWidth} ${ringWidth}`}
        >
          <defs>
            <linearGradient x1="1" y1="0" x2="0" y2="0" id="gradient">
              {getStrokeColor()}
            </linearGradient>
          </defs>
          <circle
            cx={ringWidth * 0.5}
            cy={ringWidth * 0.5}
            r={ringWidth * 0.3864}
            className="circle-track"
            style={{
              strokeDasharray: `${defaultStroke}px`,
              strokeWidth: `${strokeHeight}px`,
            }}
          ></circle>
          <circle
            cx={ringWidth * 0.5}
            cy={ringWidth * 0.5}
            r={ringWidth * 0.3864}
            transform={`rotate(-90 ${ringWidth * 0.5} ${ringWidth * 0.5})`}
            className="circle-bar"
            id="orange-ring-bar"
            style={{
              strokeDasharray: `${defaultStroke}px`,
              strokeDashoffset: `${percentStroke}px`,
              strokeWidth: `${strokeHeight}px`,
            }}
          ></circle>
          {showText && (
            <text
              style={showTextColorStyle}
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {percent}%
            </text>
          )}
        </svg>
      </div>
    );
  } else {
    const innerBarClasses = classNames(
      `orange-progress-bar-inner color-${theme}`,
      {
        "orange-progress-bar-inner-active": active,
      }
    );
    return (
      <div className="orange-progress-bar" style={styles}>
        <div
          className="orange-progress-bar-outer"
          style={{ height: `${strokeHeight}px` }}
        >
          <div className={innerBarClasses} style={progressColorStyle}>
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
  }
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
  type: "line",
  circleSize: 200,
};
export default Progress;
