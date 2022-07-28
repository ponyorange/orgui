import React, {
  FC,
  ImgHTMLAttributes,
  useEffect,
  useState,
  memo,
  useRef,
} from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";

type ImageModeType = "fit" | "fill" | "cover";
type ImageSizeType = "normal" | "large" | "small";
type ImageStatus = "loading" | "sus" | "err";
interface BaseImageProps extends ImgHTMLAttributes<HTMLElement> {
  /**
   * 图片展示模式 fit：等比例缩放图片到容器 ｜ fill：等比例拉伸填充
   */
  mode?: ImageModeType;
  /**
   * 图片地址
   */
  src: string;
  /** 是否懒加载 */
  isLazy?: boolean;
  /**
   * 是否用浏览器到缓存图片
   */
  needCache?: boolean; //浏览器默认会缓存图片，设置不需要缓存则每次都会更新图片请求
  className?: string;
  /**
   * 图片大小
   */
  size?: ImageSizeType;
  alt?: string;
  /** 图片加载成功的回调函数 */
  onImgLoadSus?: () => void;
  /** 图片加载失败的回调函数 */
  onImgLoadErr?: () => void;
}
type ImageProps = BaseImageProps & ImgHTMLAttributes<HTMLElement>;

export const Image: FC<ImageProps> = (props) => {
  const {
    src,
    mode,
    needCache,
    alt,
    className,
    onImgLoadSus,
    onImgLoadErr,
    size,
    isLazy,
    ...restProps
  } = props;

  /** 判断图片是否已经加载了，如果是true，不能转为false，只能改变一次状态 */
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function isInViewPortOfOne(element: HTMLDivElement) {
      const rect = element.getBoundingClientRect();
      const yInView = rect.top < window.innerHeight && rect.bottom > 0;
      const xInView = rect.left < window.innerWidth && rect.right > 0;
      return yInView && xInView;
    }
    function handleScroller() {
      if (containerRef.current) {
        if (isInViewPortOfOne(containerRef.current) && !isImageLoaded) {
          setIsImageLoaded(true);
        }
      }
    }
    //处理懒加载
    if (isLazy) {
      handleScroller();
      window.addEventListener("scroll", handleScroller);
      return () => {
        window.removeEventListener("scroll", handleScroller);
      };
    } else {
      setIsImageLoaded(true);
    }
  }, [isLazy]);

  //如果不需要缓存，则更新src
  let imgSrc = src;
  if (!needCache) {
    imgSrc = src + "?t=" + Date.now();
  }
  const [imgStatus, setImgStatus] = useState<ImageStatus>("loading");
  useEffect(() => {
    setImgStatus("loading");
  }, [src]);
  const classes = classNames(
    "img",
    {
      [`img-${mode}`]: mode,
      "img-sus": imgStatus === "sus",
    },
    className
  );
  const contianerClasses = classNames("img-container", className, {
    [`img-${size}`]: !!size,
  });

  const imgLoadSus = () => {
    setImgStatus("sus");
    if (onImgLoadSus) {
      onImgLoadSus();
    }
  };
  const imgLoadErr = () => {
    setImgStatus("err");
    if (onImgLoadErr) {
      onImgLoadErr();
    }
  };
  const loadingIconStyle = {
    marginLeft: "6px",
  };
  return isImageLoaded ? (
    <div className={contianerClasses} ref={containerRef}>
      {imgStatus === "loading" && (
        <div className="img-loading">
          <div>
            <Icon icon="image" size="1x" theme="dark" />
            <Icon
              icon="spinner"
              size="1x"
              theme="dark"
              pulse
              style={loadingIconStyle}
            />
          </div>
        </div>
      )}
      {imgStatus !== "err" && (
        <img
          src={imgSrc}
          alt={alt}
          className={classes}
          onLoad={imgLoadSus}
          onError={imgLoadErr}
          {...restProps}
        />
      )}
      {imgStatus === "err" && (
        <div className="img-loaderr">
          <div>
            <Icon icon="skull" size="1x" theme="dark" />
            <span style={loadingIconStyle}>图片加载失败</span>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className={contianerClasses} ref={containerRef}>
      {" "}
    </div>
  );
};

Image.defaultProps = {
  mode: "fit",
  needCache: true,
  size: "normal",
  alt: "img",
  isLazy: false,
};

/**
 * 图片的最大痛点就是图片加载失败或者加载中时的显示缺陷，这个组件就是为了解决这个问题
 *
 * 同时加入了图片懒加载，图片去缓存等功能
 *
 * ### 使用：
 *
 * ~~~js
 * import { Image } from 'orgui'
 * ~~~
 * ### 示例
 *
 * 尝试修改src属性体验
 * ：
 */

export const MemoImage = memo(Image);

export default MemoImage;
