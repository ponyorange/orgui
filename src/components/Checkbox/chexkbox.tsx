import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";

interface CheckbocProps {
  children?: React.ReactNode;
  /* 指定初始是否选中 */
  defaultChecked?: boolean;
  /* 指定当前是否选中 */
  checked?: boolean;
  /* 自动获取焦点 */
  autoFocus?: boolean;
  /* 是否为半选中 */
  indeterminate?: boolean;
  /* 是否禁用 */
  disabled?: boolean;
  /* value改变时回调函数 */
  onchange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * 多选框
 * ### 使用：
 *
 * ~~~js
 * import { Checkbox } from 'orgui'
 * ~~~
 *
 * ### 示例：
 */
export const Checkbox: React.FC<CheckbocProps> = (props) => {
  const {
    children,
    checked,
    onchange,
    autoFocus,
    defaultChecked,
    indeterminate,
    disabled,
    ...restProps
  } = props;
  const [check, setCheck] = useState(!!defaultChecked);
  const inputRef = useRef<HTMLInputElement>(null);

  const checkbocWarpperClasses = classNames("orange-checkbox-wrapper", {
    "orange-checkbox-wrapper-disabled": disabled,
  });
  const checkboxClasses = classNames("orange-checkbox", {
    "orange-checkbox-indeterminate": indeterminate,
    "orange-checkbox-checked": check,
  });

  const inputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(!check);
    if (Object.keys(restProps).includes("onChange")) {
      Object(restProps).onChange(e);
    }
    if (onchange) {
      onchange(e);
    }
  };

  useEffect(() => {
    if (autoFocus && inputRef) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setCheck(!!checked);
  }, [checked]);

  useEffect(() => {
    setCheck(!!defaultChecked);
  }, []);

  return (
    <label className={checkbocWarpperClasses}>
      <span className={checkboxClasses}>
        <input
          type="checkbox"
          className="orange-checkbox-input"
          onChange={inputValueChange}
          ref={inputRef}
        />
        <span className="orange-checkbox-inner"> </span>
      </span>
      {children && <span>{children}</span>}
    </label>
  );
};

Checkbox.defaultProps = {
  checked: false,
  autoFocus: false,
  defaultChecked: false,
};
export default Checkbox;