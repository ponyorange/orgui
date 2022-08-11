import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";

type AlertType = "success" | "default" | "warning" | "danger";

export interface AlertProps {
  /** 标题 */
  title: string;
  /** 描述 */
  description?: string;
  /** 类型 */
  type?: AlertType;
  /** 关闭Alert触发的事件 */
  onClose?: () => void;
  /** 是否可以关闭 */
  closeable?: boolean;
  className?: string;
}
/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 使用：
 *
 * ~~~js
 *
 * //在项目入口文件导入样式文件，比如src目录下的index.jsx或者app.jsx文件
 * import 'orgui/dist/index.css'
 *
 * //在需要使用组件的页面导入组件
 * import { Alert } from 'orgui'
 *
 * ~~~
 *
 * ### 示例：
 */
export const Alert: React.FC<AlertProps> = (props) => {
  const { title, closeable, type, onClose, className, description } = props;
  const classes = classNames("alert", className, { [`alert-${type}`]: type });
  const [classesState, setClassesState] = useState(classes);

  useEffect(() => {
    setClassesState(classNames(classesState, "alert-Show"));
  }, []);

  const closeIconClick = () => {
    onClose && setClassesState(classes);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 110);
  };
  return (
    <div className={classesState}>
      <span>
        <div className="title">{title}</div>
        {description && <div className="description">{description}</div>}
      </span>
      {closeable && (
        <span
          className="alert-closeIcon"
          onClick={closeIconClick}
          data-testid="close-icon"
        >
          <Icon icon="xmark" size="1x" className="icon" />
        </span>
      )}
    </div>
  );
};

Alert.defaultProps = {
  type: "default",
  closeable: true,
};

export default Alert;
