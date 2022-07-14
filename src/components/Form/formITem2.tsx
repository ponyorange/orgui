import React from "react";
import { RuleItem } from "async-validator";

//暂时用于解决文档bug

export interface BaseButtonPros {
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
export const FormItem2: React.FC<BaseButtonPros> = (props) => {
  return <div>123</div>;
};

export default FormItem2;

FormItem2.defaultProps = {
  valuePropName: "value",
  trigger: "onChange",
  getValueFromEvent: (e) => e.target.value,
  validateTrigger: "onBlur",
  isCheckoutOnShow: 0,
};

// FormItem2.displayName = "OrangeFormItem";
