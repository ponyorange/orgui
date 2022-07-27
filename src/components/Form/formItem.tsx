import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Schema, { RuleItem } from "async-validator";
import classNames from "classnames";

export interface FormItemProps {
  /** 字段名 */
  name: string;
  /** label 标签的文本 */
  label?: string;
  /** 子节点的值的属性，如 checkbox 的是 'checked' */
  valuePropName?: string;
  /** 设置收集字段值变更的时机 */
  trigger?: string;
  /** 设置如何将 event 的值转换成字段值 */
  getValueFromEvent?: (event: any) => any;
  /** 校验规则，设置字段的校验逻辑。请看 async validator 了解更多规则 */
  rules?: RuleItem[];
  /** 设置字段校验的时机 */
  validateTrigger?: string;
  /** 页面显示就检查值,0为不校验，大于0校验 */
  isCheckoutOnShow?: number;
  onValueChange?: (key: string, value: string) => void;
  defaultValue?: string;
  /** 用作比对的表单默认值，请在Form组件传此参数。 */
  initialValues?: Record<string, any>;
  children?: React.ReactNode;
}

export const FormItem: React.FC<FormItemProps> = (props) => {
  const {
    children,
    label,
    name,
    getValueFromEvent,
    valuePropName,
    onValueChange,
    rules,
    defaultValue,
    validateTrigger,
    isCheckoutOnShow,
    trigger,
    initialValues,
  } = props;
  const [valueIsOk, setValueIsOk] = useState(false);

  //input value 相关
  const [inputValue, setInputVale] = useState(defaultValue);

  const requiredClasses = classNames({
    "orange-form-item-required": rules && rules[0]?.required,
  });

  const valRef = useRef<string>("");

  const [controllerItemClass, setControllerItemClass] = useState(
    "orange-form-item-control"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const checkValue = useCallback(
    (val?: string): void => {
      if (rules) {
        const descriptor = new Schema({ [name]: rules });
        descriptor.validate({ [name]: val }).then(
          (res) => {
            setControllerItemClass("orange-form-item-control");
            setValueIsOk(true);
          },
          ({ errors, fields }) => {
            setControllerItemClass(
              "orange-form-item-control orange-form-item-has-error"
            );
            setValueIsOk(false);
            setErrorMessage(errors[0].message);
          }
        );
      }
    },
    [name, rules]
  );

  useEffect(() => {
    setInputVale(defaultValue);
    if (defaultValue) valRef.current = defaultValue;
  }, [defaultValue, initialValues]);

  useEffect(() => {
    if (isCheckoutOnShow) {
      checkValue(valRef.current);
    }
  }, [checkValue, isCheckoutOnShow]);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = "";
    if (getValueFromEvent) {
      val = getValueFromEvent(e);
    } else {
      if (valuePropName) {
        val = e.target.getAttribute(valuePropName) as string;
      } else {
        val = e.target.value;
      }
    }
    // checkValue(val);
    valRef.current = val;
    if (onValueChange) {
      onValueChange(name, val);
    }
  };
  const handleViladateChange = (e: ChangeEvent<HTMLInputElement>) => {
    // valRef.current = getValueFromEvent ? getValueFromEvent(e) : e.target.value;
    checkValue(valRef.current);
  };

  const renderChildren = () => {
    const childElement = children as React.FunctionComponentElement<
      InputHTMLAttributes<HTMLElement>
    >;
    //保存原来绑定的事件，即外面自己绑定的
    const preTriggerEventStr = trigger ? trigger : "";
    const preValidateTriggerEventStr = validateTrigger ? validateTrigger : "";
    // Object(childElement.props)[preTriggerEventStr]
    let childrenEvents: Record<string, any> = {};
    let onChangeEvent: {} = {
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setInputVale(getValueFromEvent ? getValueFromEvent(e) : e.target.value);
      },
    };
    if (validateTrigger && trigger && validateTrigger === trigger) {
      if (trigger === "onChange") {
        onChangeEvent = {};
      }
      //同一个事件
      childrenEvents[trigger] = (e: ChangeEvent<HTMLInputElement>) => {
        setInputVale(getValueFromEvent ? getValueFromEvent(e) : e.target.value);
        handleValueChange(e);
        handleViladateChange(e);
        if (
          typeof Object(childElement.props)[preTriggerEventStr] === "function"
        )
          Object(childElement.props)[preTriggerEventStr](e);
      };
    } else if (validateTrigger && trigger) {
      if (trigger === "onChange" || validateTrigger === "onChange") {
        onChangeEvent = {};
      }
      //不同事件
      //校验值的时机
      childrenEvents[validateTrigger] = (e: ChangeEvent<HTMLInputElement>) => {
        if (validateTrigger === "onChange")
          setInputVale(
            getValueFromEvent ? getValueFromEvent(e) : e.target.value
          );
        if (
          Object(childElement.props)[preValidateTriggerEventStr] === "function"
        )
          Object(childElement.props)[preValidateTriggerEventStr](e);
        handleViladateChange(e);
      };
      //改变值的时机
      childrenEvents[trigger] = (e: ChangeEvent<HTMLInputElement>) => {
        if (trigger === "onChange")
          setInputVale(
            getValueFromEvent ? getValueFromEvent(e) : e.target.value
          );
        if (
          typeof Object(childElement.props)[preTriggerEventStr] === "function"
        )
          Object(childElement.props)[preTriggerEventStr](e);
        handleValueChange(e);
      };
    }
    return React.cloneElement(childElement, {
      // defaultValue: defaultValue,
      ...childrenEvents,
      ...onChangeEvent,
      // checked: true,
      value: inputValue,
    });
  };

  return (
    <div className="orange-form-row">
      <div className="orange-form-item-label">
        <label className={requiredClasses}>{label}</label>
      </div>
      <div className="orange-form-item">
        <div className={controllerItemClass}>{renderChildren()}</div>
        {!valueIsOk && (
          <div className="orange-form-item-explain">
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

FormItem.defaultProps = {
  valuePropName: "value",
  trigger: "onChange",
  getValueFromEvent: (e) => e.target.value,
  validateTrigger: "onBlur",
  isCheckoutOnShow: 0,
};
FormItem.displayName = "OrangeFormItem";
export default FormItem;
