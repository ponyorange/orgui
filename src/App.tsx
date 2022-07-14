import React from "react";
import "./styles/index.scss";
import "./App.css";
import AutoComplete from "./components/AutoComplete/autoComplete";
import Input from "./components/Input/input";
import Progress from "./components/Progress/progress";
import Button from "./components/Button/button";
import Upload from "./components/Upload/upload";
import { Form, FormItem } from "./components/Form";
import { Select, Option } from "./components/Select";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { ValidateError } from "async-validator";
library.add(fas);
function App() {
  const lakers = [
    "bradley",
    "pope",
    "caruso",
    "cook",
    "cousins",
    "james",
    "AD",
    "green",
    "howard",
    "kuzma",
    "McGee",
    "rando",
    "sgnr",
    "rtpoqb",
    "sdfhaqwm",
  ];
  const handleFetch = (query: string) => {
    return lakers
      .filter((name) => name.includes(query))
      .map((name) => ({ value: name }));
  };
  const onFormFinish = (data: Record<string, any>) => {
    console.log("成功了");
    console.log(data);
  };
  const onFormFinishError = (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => {
    console.log("失败了");
    console.log(values, errors);
  };
  return (
    <div className="app">
      <Input />
      <AutoComplete
        fetchSuggestions={handleFetch}
        placeholder="随便输入点字母试试"
      />
      <Progress
        percent={99}
        color={["#12c2e9", "#c471ed", "#f64f59"]}
        showTextColor="#333"
      />
      <Upload action="123">
        <Button>点击上传</Button>
      </Upload>
      <div className="login">
        <Form
          onFinish={onFormFinish}
          onFinishFailed={onFormFinishError}
          initialValues={{ username: "orange", agreement: false }}
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
          <div
            className="agreement-section"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <FormItem
              name="agreement"
              rules={[{ type: "enum", enum: [true], message: "请同意协议" }]}
              getValueFromEvent={(e) => e.target.checked}
              valuePropName="checked"
            >
              <input type="checkbox" />
            </FormItem>
            <span className="agree-text">
              注册即代表你同意<a href="https://www.baidu.com">用户协议</a>
            </span>
          </div>
          <div className="orange-form-submit-area">
            <Button type="submit" btnType="primary">
              登录
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default App;
