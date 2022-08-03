//规则校验库
//https://github.com/yiminghe/async-validator
//https://blog.csdn.net/dreamingbaobei3/article/details/122727229
import React, { useEffect, useRef, useState } from "react";
import { FormItemProps } from "./formItem";
import Schema, { RuleItem, ValidateError } from "async-validator";

interface FormProps {
  /** 表单名称，会作为表单字段 id 前缀使用 */
  name?: string;
  /** 表单默认值，只有初始化以及重置时生效 */
  initialValues?: Record<string, any>;
  /** 提交表单且数据验证成功后回调事件 */
  onFinish?: (values: Record<string, any>) => void;
  /** 提交表单且数据验证失败后回调事件 */
  onFinishFailed?: (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => void;
  children?: React.ReactNode;
}
/**
 * 用于收集和校验表单数据，支持设置表单收集和校验的时机，并根据校验结果作出提示
 *
 * 校验规则请参考async validator，https://github.com/yiminghe/async-validator
 *
 * ### 使用：
 *
 * ~~~js
 * import { Form, FormItem } from 'orgui'
 * ~~~
 *
 * ### 示例：
 */
export const Form: React.FC<FormProps> = (props) => {
  const { name, children, onFinish, onFinishFailed, initialValues } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const resultData = useRef<Record<string, any>>({});
  const resultDescriptor = useRef<Record<string, any>>({});

  const [isCheckBalueState, setIsCheckBalueState] = useState(0);

  useEffect(() => {
    resultData.current = {};
    return () => {};
  }, [initialValues]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.onsubmit = (e) => {
        //点击submit按钮让item检查值
        setIsCheckBalueState(Date.now);
        //检查值
        const descriptor = new Schema(resultDescriptor.current);
        descriptor.validate(resultData.current).then(
          () => {
            if (onFinish) {
              onFinish(resultData.current);
            }
          },
          ({ errors }) => {
            if (onFinishFailed) {
              onFinishFailed(resultData.current, errors);
            }
          }
        );
        return false;
      };
    }
  }, [onFinish, onFinishFailed]);

  const hangdleValuesChange = (key: string, value: string) => {
    resultData.current[key] = value;
  };
  const initDataAndDescriptor = (key: string, rules?: RuleItem[]) => {
    resultDescriptor.current[key] = rules;
    if (resultData.current && key) {
      //组件刷新的时候恢复上一次的值
    } else if (initialValues && key) {
      resultData.current[key] = initialValues[key];
    } else {
      resultData.current[key] = "";
    }
  };
  const renderChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, (child) => {
      const childEle = child as React.FunctionComponentElement<FormItemProps>;
      if (typeof childEle.type === "function") {
        if (childEle.type.displayName === "OrangeFormItem") {
          let defaultVal: string | undefined = undefined;
          if (initialValues) {
            defaultVal = initialValues[childEle.props.name];
          }
          //初始化数据
          initDataAndDescriptor(childEle.props.name, childEle.props.rules);

          return React.cloneElement(childEle, {
            onValueChange: hangdleValuesChange,
            defaultValue: defaultVal,
            isCheckoutOnShow: isCheckBalueState,
            initialValues: initialValues,
          });
        } else {
          if (childEle.props && childEle.props.children) {
            return React.cloneElement(childEle, {
              children: renderChildren(childEle.props.children),
            });
          } else {
            return child;
          }
        }
      } else {
        if (childEle.props && childEle.props.children) {
          return React.cloneElement(childEle, {
            children: renderChildren(childEle.props.children),
          });
        } else {
          return child;
        }
      }
    });
  };

  return (
    <form name={name} className="orange-form" ref={formRef} action="./">
      {renderChildren(children)}
    </form>
  );
};

Form.defaultProps = {
  name: "orange_form",
};
export default Form;
