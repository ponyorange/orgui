import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Upload from "./upload";
import Icon from "../Icon/icon";
import Button from "../Button/button";

export default {
  title: "OrangeUI/Upload",
  component: Upload,
} as ComponentMeta<typeof Upload>;

const IntroTemplate: ComponentStory<typeof Upload> = (args) => (
  <div>
    <Upload {...args} action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
      <Button size="large" btnType="primary">
        <Icon icon="file-arrow-up" /> 点击上传{" "}
      </Button>
    </Upload>
  </div>
);

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "普通的上传";

const SizeTemplate: ComponentStory<typeof Upload> = (args) => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert("file too big");
      return false;
    }
    return true;
  };
  return (
    <Upload
      {...args}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={checkFileSize}
    >
      <Button size="large" btnType="primary">
        <Icon icon="upload" /> 不能传大于50Kb！{" "}
      </Button>
    </Upload>
  );
};

export const Size = SizeTemplate.bind({});
Size.storyName = "上传前检查文件大小";

const TypeTemplate: ComponentStory<typeof Upload> = (args) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    name="fileName"
    multiple
    drag
  >
    <Icon icon="file-arrow-up" size="5x" theme="primary" />
    <br />
    <p style={{ marginTop: "6px" }}>点击或者拖动到此区域进行上传</p>
  </Upload>
);

export const Type = TypeTemplate.bind({});
Type.storyName = "拖拽文件上传";
