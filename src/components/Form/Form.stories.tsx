import React, { ChangeEvent, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Form, FormItem } from "./index";
import Checkbox from "../Checkbox/chexkbox";
import Input from "../Input/input";
import { Option, Select } from "../Select";
import Button from "../Button/button";
import { ValidateError } from "async-validator";
import FormItem2 from "./formITem2";

export default {
  title: "OrangeUI/Form",
  component: Form,
  subcomponents: { FormItem: FormItem2 },
} as ComponentMeta<typeof Form>;

const IntroTemplate: ComponentStory<typeof Form> = () => {
  const onFormFinish = (data: Record<string, any>) => {
    console.log(data);
    alert("数据校验成功并返回了");
  };
  const onFormFinishError = (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => {
    console.log(values, errors);
    alert("数据校验失败了");
  };
  return (
    <div style={{ width: "80%", marginLeft: "5%" }}>
      <Form
        onFinish={onFormFinish}
        onFinishFailed={onFormFinishError}
        // initialValues={{ username: "orange", agreement: false }}
      >
        <FormItem
          label="用户名"
          name="username"
          rules={[{ type: "string", required: true, min: 3 }]}
        >
          <Input />
        </FormItem>
        <FormItem
          label="密码"
          name="password"
          rules={[{ type: "string", required: true, min: 3, max: 8 }]}
        >
          <Input type="password" />
        </FormItem>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button type="submit" btnType="primary">
            登录
          </Button>
        </div>
      </Form>
    </div>
  );
};

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "基本的登录表单";

const SizeTemplate: ComponentStory<typeof Form> = (args) => {
  const onFormFinish = (data: Record<string, any>) => {
    console.log(data);
  };
  const onFormFinishError = (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => {
    console.log(values, errors);
  };
  return (
    <div style={{ width: "80%", marginLeft: "5%" }}>
      <Form
        onFinish={onFormFinish}
        onFinishFailed={onFormFinishError}
        initialValues={{ username: "orange", agreement: false }}
      >
        <FormItem
          label="邮件"
          name="email"
          rules={[{ type: "email", required: true }]}
        >
          <Input />
        </FormItem>
        <FormItem
          label="密码"
          name="password"
          rules={[{ type: "string", required: true, min: 3, max: 8 }]}
        >
          <Input type="password" />
        </FormItem>
        <FormItem
          label="性别"
          name="gender"
          rules={[{ type: "string", required: true }]}
          getValueFromEvent={(e) => e}
          valuePropName="defaultValue"
        >
          <Select placeholder="请选择性别">
            <Option value="男" />
            <Option value="女" />
          </Select>
        </FormItem>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FormItem
            name="agreement"
            rules={[{ type: "enum", enum: [true], message: "请同意协议" }]}
            getValueFromEvent={(e) => e}
            valuePropName="checked"
          >
            <Checkbox>
              <span
                className="agree-text"
                style={{ display: "flex", width: "200px" }}
              >
                注册即代表你同意
                <a href="http://www.baidu.com" style={{ marginLeft: "4px" }}>
                  用户协议
                </a>
              </span>
            </Checkbox>
          </FormItem>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button type="submit" btnType="default">
            注册
          </Button>
        </div>
      </Form>
    </div>
  );
};

export const Size = SizeTemplate.bind({});
Size.storyName = "基本的注册表单，支持多种FormItem";

const TypeTemplate: ComponentStory<typeof Form> = (args) => {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [confirmRules, setConfirmRules] = useState<Record<string, any>[]>([
    { required: true, type: "enum", enum: [""], message: "两次密码必须相同" },
  ]);
  const [initialValues, setInitialValues] = useState({
    username: "orange",
    agreement: false,
  });
  const resetAll = () => {
    setInitialValues({ username: "orange", agreement: false });
  };
  return (
    <Form
      initialValues={initialValues}
      onFinish={(data: Record<string, any>) => {
        setIsSubmitting(false);
        setIsValid(true);
        console.log(data);
        alert("数据校验成功");
      }}
      onFinishFailed={(
        values: Record<string, any>,
        errors: Record<string, ValidateError[]>
      ) => {
        console.log(values);
        setIsSubmitting(false);
        setIsValid(false);
        alert("数据校验失败");
      }}
    >
      <>
        <FormItem
          label="邮箱"
          name="username"
          rules={[
            { type: "email", required: true, message: "请输入正确的邮箱" },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          label="密码"
          name="password"
          rules={[
            {
              type: "string",
              required: true,
              min: 3,
              max: 8,
              message: "密码不符合规则",
            },
          ]}
        >
          <Input
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setConfirmRules([
                {
                  type: "enum",
                  enum: [e.target.value],
                  message: "两次密码必须相同",
                  required: true,
                },
              ]);
            }}
          />
        </FormItem>
        <FormItem label="重复密码" name="confirmPwd" rules={confirmRules}>
          <Input type="password" />
        </FormItem>
        <div
          className="agreement-section"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <FormItem
            name="agreement"
            valuePropName="checked"
            getValueFromEvent={(e) => e}
            rules={[{ type: "enum", enum: [true], message: "请同意协议" }]}
          >
            <Checkbox>
              <span
                className="agree-text"
                style={{ display: "flex", width: "200px" }}
              >
                注册即代表你同意
                <a href="http://www.baidu.com" style={{ marginLeft: "4px" }}>
                  用户协议
                </a>
              </span>
            </Checkbox>
          </FormItem>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            btnType="primary"
            onClick={() => {
              setIsSubmitting(true);
            }}
          >
            登陆 {isSubmitting ? "点击验证" : "验证完毕"}{" "}
            {isValid ? "通过😄" : "没通过😢"}{" "}
          </Button>
          <Button type="button" onClick={resetAll}>
            重置
          </Button>
        </div>
      </>
    </Form>
  );
};

export const Type = TypeTemplate.bind({});
Type.storyName = "自定义规则";
