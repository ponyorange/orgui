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
  onChange?: (checked: boolean) => void;
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
    onChange,
    autoFocus,
    defaultChecked,
    indeterminate,
    disabled,
  } = props;
  const [check, setCheck] = useState(!!defaultChecked);
  const inputRef = useRef<HTMLInputElement>(null);

  const checkbocWarpperClasses = classNames("orange-checkbox-wrapper", {
    "orange-checkbox-wrapper-disabled": disabled,
  });
  const checkboxClasses = classNames("orange-checkbox", {
    "orange-checkbox-indeterminate": indeterminate && !check,
    "orange-checkbox-checked": check,
  });

  const inputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newChecked = !check;
    setCheck(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  useEffect(() => {
    if (autoFocus && inputRef) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setCheck(!!defaultChecked);
  }, []);

  useEffect(() => {
    setCheck(!!checked);
  }, [checked]);

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
