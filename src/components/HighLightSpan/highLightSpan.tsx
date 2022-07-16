import React, { Fragment } from "react";

interface HighLightSpanProps {
  /** 需要高亮的文字 */
  highLigh?: string | string[];
  /** 原文本 */
  children?: string;
  /** 是否匹配多个高亮，默认所有匹配到的都会高亮 */
  multi?: boolean;
  /** 高亮的style */
  highLighStyle?: React.CSSProperties;
  /** 默认的style */
  style?: React.CSSProperties;
  /** 高亮的样式 */
  highLighClassName?: string;
  /** 默认的样式 */
  className?: string;
}
/**
 * 用于给文本添加高亮文字，常见于搜索场景。支持多个高亮词的匹配，支持全匹配和单匹配。
 * ### 使用：
 *
 * ~~~js
 * import { HighLightSpan } from 'orgui'
 * ~~~
 *
 * ### 示例：
 */
export const HighLightSpan: React.FC<HighLightSpanProps> = (props) => {
  const {
    multi,
    style,
    highLighStyle,
    highLigh,
    children,
    className,
    highLighClassName,
  } = props;

  const getResultByHighLigh = (
    rawtext: string,
    highLigh: string
  ): React.ReactNode => {
    //分割
    const splitTexts = rawtext.split(highLigh);
    if (splitTexts.length === 1) {
      //没匹配到
      return rawtext;
    } else {
      //匹配到了
      const highLighClass = highLighClassName
        ? "orange-highligh-text " + highLighClassName
        : "orange-highligh-text";
      return splitTexts.map((text, index) => {
        if (index === 0) {
          return <Fragment key={index}>{text}</Fragment>;
        } else {
          if (multi) {
            return (
              <Fragment key={index}>
                <span
                  style={highLighStyle}
                  className={highLighClass}
                  key={index}
                >
                  {highLigh}
                </span>
                {text}
              </Fragment>
            );
          } else {
            if (index === 1) {
              return (
                <Fragment key={index}>
                  <span style={highLighStyle} className={highLighClass}>
                    {highLigh}
                  </span>
                  {text}
                </Fragment>
              );
            } else {
              return <Fragment key={index}>{highLigh + text}</Fragment>;
            }
          }
        }
      });
    }
  };

  const getResultByHighLighs = (
    rawtext: string,
    highLighs: string[]
  ): React.ReactNode => {
    if (highLighs.length === 0) {
      return rawtext;
    }
    // console.log("highLighs===", highLighs);
    const highLigh = highLighs.shift() as string;

    //分割
    const splitTexts = rawtext.split(highLigh);
    if (splitTexts.length === 1) {
      //没匹配到,去下一个匹配
      return getResultByHighLighs(rawtext, [...highLighs]);
    } else {
      //匹配到了
      const highLighClass = highLighClassName
        ? "orange-highligh-text " + highLighClassName
        : "orange-highligh-text";
      if (multi) {
        return splitTexts.map((text, index) => {
          if (index === 0) {
            return <Fragment key={index}>{text}</Fragment>;
          } else {
            return (
              <Fragment key={index}>
                <span
                  style={highLighStyle}
                  className={highLighClass}
                  key={index}
                >
                  {highLigh}
                </span>
                {getResultByHighLighs(text, [...highLighs])}
              </Fragment>
            );
          }
        });
      } else {
        //将字符串分半
        const hidx = rawtext.indexOf(highLigh);
        const preText = rawtext.substring(0, hidx);
        const lastText = rawtext.substring(
          hidx + highLigh.length,
          rawtext.length
        );
        return [
          <Fragment key="p0">{preText}</Fragment>,
          <span style={highLighStyle} className={highLighClass} key="p1">
            {highLigh}
          </span>,
          getResultByHighLighs(lastText, [...highLighs]),
        ];
      }
    }
  };

  const renderChildren = (): React.ReactNode => {
    if (typeof children === "string") {
      if (typeof highLigh === "string") {
        return getResultByHighLigh(children, highLigh);
      } else if (Array.isArray(highLigh)) {
        return getResultByHighLighs(children, [...highLigh]);
      } else {
        return children;
      }
    } else {
      console.warn("HighLightSpan Component Children's type must be string");
      return children;
    }
  };

  return (
    <span style={style} className={className}>
      {renderChildren()}
    </span>
  );
};

HighLightSpan.defaultProps = {
  multi: true,
};
export default HighLightSpan;
