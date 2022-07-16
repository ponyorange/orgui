import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";

type dotPositionType = "top" | "bottom" | "left" | "right";
type effectType = "scrollx" | "fade" | "space";

interface CarouselPros {
  /** 是否自动切换 */
  autoplay?: boolean;
  /** 自动轮播时间间隔 */
  duration?: number;
  /** 面板指示点位置，可选 top bottom left right */
  dotPosition?: dotPositionType;
  /** 是否显示面板指示点，如果为 object 则同时可以指定 dotsClass */
  dots?: boolean | { className?: string };
  /** 是否显示左右控制面板 */
  controllers?: boolean;
  /** 动画效果 */
  easing?: string;
  /** 动画效果函数 scrollx | fade */
  effect?: effectType;
  /** 切换面板的回调 */
  afterChange?: (current: number) => void;
  /** 切换面板的回调 */
  beforeChange?: (from: number, to: number) => void;
  children?: React.ReactNode;
}
/**
 * 走马灯、轮播图。支持多种轮播效果，请看案例.
 * ### 使用：
 *
 * ~~~js
 * import { Carousel } from 'orgui'
 * ~~~
 *
 * ### 示例：
 */
export const Carousel: React.FC<CarouselPros> = (props) => {
  const {
    children,
    easing,
    effect,
    autoplay,
    duration,
    dots,
    controllers,
    afterChange,
    beforeChange,
  } = props;
  const carouselClass = classNames("orange-carousel", {
    [`carousel-${effect}`]: !!effect,
  });
  const childrenEles = children as React.ReactNode[];
  const childrenElesLen = childrenEles.length;
  const currentIndex = useRef(0);
  let isShowController: boolean | undefined = controllers;
  let isAutoplay: boolean | undefined = autoplay;
  //初始化class
  const initOneClass = (): string[] => {
    return ["orange-carousel-slide orange-carousel-slide-active"];
  };
  const initTowClass = (): string[] => {
    return [
      "orange-carousel-slide orange-carousel-slide-active",
      "orange-carousel-slide orange-carousel-slide-right",
    ];
  };
  const initClass = (): string[] => {
    const res: string[] = [];
    for (let i = 0; i < childrenElesLen; i++) {
      if (i === 0) {
        res.push("orange-carousel-slide orange-carousel-slide-active");
      } else if (i === 1) {
        res.push("orange-carousel-slide orange-carousel-slide-right");
      } else if (i === childrenElesLen - 1) {
        res.push("orange-carousel-slide orange-carousel-slide-left");
      } else {
        res.push("orange-carousel-slide");
      }
    }
    return res;
  };
  const getInitClass = (): string[] => {
    if (!Array.isArray(childrenEles)) {
      isShowController = false;
      isAutoplay = false;
      return initOneClass();
    } else if (childrenElesLen === 2) {
      return initTowClass();
    } else {
      return initClass();
    }
  };
  const [childrenElesClass, setChildrenElesClass] = useState<string[]>(
    getInitClass()
  );
  //前后控制
  const next = useCallback(
    (targetIdx: number) => {
      const newClasses = new Array(childrenElesLen).fill(
        "orange-carousel-slide"
      );

      newClasses[targetIdx] =
        "orange-carousel-slide orange-carousel-slide-active";
      if (targetIdx === 0) {
        //第一张
        newClasses[1] = "orange-carousel-slide orange-carousel-slide-right";
        newClasses[childrenElesLen - 1] =
          "orange-carousel-slide orange-carousel-slide-left";
      } else if (targetIdx === childrenElesLen - 1) {
        //倒数第一张
        newClasses[0] = "orange-carousel-slide orange-carousel-slide-right";
        newClasses[targetIdx - 1] =
          "orange-carousel-slide orange-carousel-slide-left";
      } else {
        //其它情况
        newClasses[targetIdx + 1] =
          "orange-carousel-slide orange-carousel-slide-right";
        newClasses[targetIdx - 1] =
          "orange-carousel-slide orange-carousel-slide-left";
      }
      setChildrenElesClass(newClasses);
      if (afterChange) afterChange(targetIdx);
    },
    [afterChange, childrenElesLen]
  );

  const pre = useCallback(
    (targetIdx: number) => {
      const newClasses = new Array(childrenElesLen).fill(
        "orange-carousel-slide"
      );

      newClasses[targetIdx] =
        "orange-carousel-slide orange-carousel-slide-active";
      if (targetIdx === 0) {
        //第一张
        newClasses[1] = "orange-carousel-slide orange-carousel-slide-left";
        newClasses[childrenElesLen - 1] =
          "orange-carousel-slide orange-carousel-slide-right";
      } else if (targetIdx === childrenElesLen - 1) {
        //倒数第一张
        newClasses[0] = "orange-carousel-slide orange-carousel-slide-left";
        newClasses[targetIdx - 1] =
          "orange-carousel-slide orange-carousel-slide-right";
      } else {
        //其它情况
        newClasses[targetIdx + 1] =
          "orange-carousel-slide orange-carousel-slide-left";
        newClasses[targetIdx - 1] =
          "orange-carousel-slide orange-carousel-slide-right";
      }
      setChildrenElesClass(newClasses);
      if (afterChange) afterChange(targetIdx);
    },
    [afterChange, childrenElesLen]
  );
  //自动播放处理
  useEffect(() => {
    let timer: NodeJS.Timer | undefined = undefined;
    let preIdx = currentIndex.current;
    if (isAutoplay) {
      timer = setInterval(() => {
        if (currentIndex.current >= childrenElesLen - 1) {
          currentIndex.current = 0;
        } else {
          currentIndex.current += 1;
        }
        if (beforeChange) beforeChange(preIdx, currentIndex.current);
        next(currentIndex.current);
      }, duration);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [
    beforeChange,
    childrenEles,
    childrenElesClass,
    childrenElesLen,
    duration,
    isAutoplay,
    next,
  ]);
  //元素事件监听
  const leftControllerClick = () => {
    let preIdx = currentIndex.current;
    if (currentIndex.current < 1) {
      currentIndex.current = childrenElesLen - 1;
    } else {
      currentIndex.current -= 1;
    }
    if (beforeChange) beforeChange(preIdx, currentIndex.current);
    pre(currentIndex.current);
  };
  const rightControllerClick = () => {
    let preIdx = currentIndex.current;
    if (currentIndex.current >= childrenElesLen - 1) {
      currentIndex.current = 0;
    } else {
      currentIndex.current += 1;
    }
    if (beforeChange) beforeChange(preIdx, currentIndex.current);
    next(currentIndex.current);
  };

  const dotClick = (e: React.MouseEvent): void => {
    let preIdx = currentIndex.current;
    const clickIdx = Number(e.currentTarget.getAttribute("data-idx"));
    if (beforeChange) beforeChange(preIdx, clickIdx);
    if (clickIdx < currentIndex.current) {
      pre(clickIdx);
      currentIndex.current = clickIdx;
    } else if (clickIdx > currentIndex.current) {
      next(clickIdx);
      currentIndex.current = clickIdx;
    }
  };
  //渲染返回
  return (
    <div className={carouselClass}>
      <div>
        {Array.isArray(childrenEles) ? (
          childrenEles.map((ele, index) => {
            return (
              <div className={childrenElesClass[index]} key={index}>
                {ele}
              </div>
            );
          })
        ) : (
          <div className={childrenElesClass[0]} key={0}>
            {childrenEles}
          </div>
        )}
      </div>
      {/*  左右控制按钮*/}
      {isShowController && (
        <>
          <div
            className="carousel-left-controller"
            onClick={leftControllerClick}
          >
            <Icon icon="angle-left" size="lg" />
          </div>
          <div
            className="carousel-right-controller"
            onClick={rightControllerClick}
          >
            <Icon icon="angle-right" size="lg" />
          </div>
        </>
      )}
      {/* 点控制 */}
      <ul className="carousel-dots">
        {Array.isArray(childrenEles) ? (
          childrenEles.map((ele, index) => {
            let dotClass = "dot";
            if (index === currentIndex.current) {
              dotClass = "dot dot-active";
            }
            return (
              <li key={index}>
                <button
                  data-idx={index}
                  className={dotClass}
                  onClick={dotClick}
                >
                  {" "}
                </button>
              </li>
            );
          })
        ) : (
          <li key={0}>
            <button data-idx={0} className="dot dot-active" onClick={dotClick}>
              {" "}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

Carousel.defaultProps = {
  autoplay: false,
  dotPosition: "bottom",
  dots: true,
  easing: "linear",
  effect: "scrollx",
  duration: 2000,
  controllers: true,
};
export default Carousel;
