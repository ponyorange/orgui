import React, { CSSProperties, useRef, useState } from "react";
import Input from "../Input/input";
import Transition from "../Transition/transition";
import classNames from "classnames";
import { OptionProps } from "./option";
import useClickOutside from "../../hooks/useClickOutside";
import Icon from "../Icon/icon";

interface SelectProps {
  /** 指定默认选中的条目 可以是是字符串或者字符串数组 */
  defaultValue?: string | string[];
  /** 选择框默认文字 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否多选 */
  multiple?: boolean;
  /** select input 的 name 属性 */
  name?: string;
  /** 选中值发生变化时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
  /** 下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void;
  /** 扩展的class */
  className?: string;
  /** 扩展的style */
  style?: CSSProperties;
  children?: React.ReactNode;
}

/**
 * 下拉选择器。 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器。
 * 支持单选、多选和禁用
 * ### 使用：
 *
 * ~~~js
 * import { Select, Option } from 'orgui'
 * ~~~
 *
 * ### 示例：默认的Select
 */

export const Select: React.FC<SelectProps> = (props) => {
  const {
    placeholder,
    children,
    disabled,
    className,
    style,
    onChange,
    onVisibleChange,
    name,
    multiple,
    defaultValue,
  } = props;

  const selectRef = useRef<HTMLDivElement>(null);
  // const inputRef = useRef<HTMLInputElement>(null);

  const [selectVisible, setSelectVisible] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [selectValues, setSelectValues] = useState<string[]>([]);

  //处理默认值
  if (defaultValue) {
    if (typeof defaultValue === "string") {
      const val = defaultValue as string;
      setSelectValue(val);
    } else {
      const val = defaultValue as string[];
      setSelectValues(val);
    }
  }

  const selectClasses = classNames("orange-select", className, {
    "menu-is-open": selectVisible,
    "is-disabled": disabled,
  });

  const handleVisibleChange = (visible: boolean) => {
    if (visible === selectVisible) return;
    setSelectVisible(visible);
    // if (inputRef.current) {
    //   if (visible) inputRef.current.focus();
    //   else inputRef.current.blur();
    // }
    if (onVisibleChange) {
      onVisibleChange(visible);
    }
  };

  useClickOutside(selectRef, () => {
    handleVisibleChange(false);
  });

  const selectInputOnClick = () => {
    if (disabled) return;
    handleVisibleChange(!selectVisible);
  };

  const handleSelVal = (selVal: string, selVals: string[]) => {
    setSelectValues(selVals);
    if (multiple) {
      setSelectValue(" ");
    } else {
      setSelectValue(selVal);
    }
    if (onChange) {
      onChange(selVal, selVals);
    }
  };
  const renderOptions = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<OptionProps>;

      let isSel = false;
      if (multiple && selectValues.includes(childElement.props.value)) {
        isSel = true;
      }
      const optionClasses = classNames("orange-select-item", {
        "is-disabled": childElement.props.disabled,
        "is-selected": isSel,
      });
      return React.cloneElement(childElement, {
        key: index + "",
        className: optionClasses,
        onClick: () => {
          let selVal = childElement.props.value;
          let selVals: string[] = [selVal];
          if (multiple) {
            if (isSel) {
              selVals = selectValues.filter((item) => item !== selVal);
            } else {
              selVals = [...selectValues, selVal];
            }
          } else {
            handleVisibleChange(false);
          }
          handleSelVal(selVal, selVals);
        },
      });
    });
  };

  const handleDeleteSelValClick = (val: string) => {
    const selVals = selectValues.filter((item) => item !== val);
    handleSelVal(val, selVals);
  };

  const renderMutipleSelectedOptions = () => {
    if (multiple) {
      return (
        <div className="orange-selected-tags">
          {selectValues.map((val, idx) => {
            return (
              <span key={idx} className="orange-tag">
                {val}
                <Icon
                  icon="xmark"
                  theme="primary"
                  size="sm"
                  style={{ marginLeft: "4px" }}
                  onClick={() => handleDeleteSelValClick(val)}
                />
              </span>
            );
          })}
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <div className={selectClasses} style={style} ref={selectRef}>
      <div className="orange-select-input" onClick={selectInputOnClick}>
        <Input
          placeholder={placeholder}
          icon="angle-down"
          readOnly
          disabled={false}
          className="input"
          value={selectValue}
          name={name}
          // ref={inputRef}
        />
      </div>

      <Transition in={selectVisible} timeout={300} animation="zoom-in-top">
        <ul className="orange-select-dropdown zoom-in-top-enter-done">
          {renderOptions()}
        </ul>
      </Transition>
      {renderMutipleSelectedOptions()}
    </div>
  );
};

Select.defaultProps = {
  placeholder: "请选择",
  name: "orange-select",
};
export default Select;
