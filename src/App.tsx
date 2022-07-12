import React, { ChangeEvent, useRef, useState } from "react";
import "./styles/index.scss";
import "./App.css";
import { Menu, MenuItem, SubMenu } from "./components/Menu";
import Image from "./components/Image/image";
import Button from "./components/Button/button";
import TagView, { tagType } from "./components/TagView/tagView";
import { Tabs, TabItem } from "./components/Tabs";
import Icon from "./components/Icon/icon";
import Input from "./components/Input/input";
import { Select, Option } from "./components/Select";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
function App() {
  const tags: tagType[] = [];
  const [tagsState, setTagsState] = useState(tags);
  const onTagDeleteClick = (idx: number, id: string) => {
    setTagsState((prevState) => {
      if (prevState.length > 1 && prevState[idx].isActive) {
        if (idx + 1 < prevState.length) {
          prevState[idx + 1].isActive = true;
        } else {
          prevState[idx - 1].isActive = true;
        }
      }
      return prevState.filter((item) => item.id !== id);
    });
  };

  const tagIdx = useRef(0);
  const addTag = () => {
    const tag = {
      id: tagIdx.current + 1 + "",
      title: tagIdx.current * 100 + "",
      isActive: true,
    };
    tagsState.forEach((item) => (item.isActive = false));
    tagIdx.current += 1;
    setTagsState([...tagsState, tag]);
  };

  const onTagClick = (idx: number, id: string) => {
    tagsState.forEach((item) => (item.isActive = false));
    tagsState[idx].isActive = true;
    setTagsState([...tagsState]);
  };

  const [ival, setIval] = useState("");
  const ichange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setIval(e.currentTarget.value);
  };

  const handleSelectChange = (
    selectedValue: string,
    selectedValues: string[]
  ) => {
    console.log(selectedValue, selectedValues);
  };
  return (
    <div className="App">
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleSelectChange}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
      <Input value={ival} onChange={ichange} className="minput" />
      <Tabs
        onSelect={function noRefCheck() {}}
        defaultIndex={1}
        className="mytabs"
      >
        <TabItem label="选项卡一">
          <h1>我是一个标题</h1>this is content one
        </TabItem>
        <TabItem label="选项卡二">this is content two</TabItem>
        <TabItem
          label={
            <>
              <Icon icon="check-circle" />
              {"  "}自定义图标
            </>
          }
        >
          this is content three
        </TabItem>
      </Tabs>
      <Tabs onSelect={function noRefCheck() {}} defaultIndex={1} type="card">
        <TabItem label="选项卡一">this is content one</TabItem>
        <TabItem label="选项卡二">this is content two</TabItem>
        <TabItem
          label={
            <>
              <Icon icon="check-circle" />
              {"  "}自定义图标
            </>
          }
        >
          this is content three
        </TabItem>
      </Tabs>
      <TagView
        tags={tagsState}
        onTagDeleteClick={onTagDeleteClick}
        onTagClick={onTagClick}
      />
      <Button onClick={addTag}>添加一个tag</Button>
      <div>
        <Image
          src="https://pic1.zhimg.com/80/v2-235ab378ef0c0bd388ab7c92f3127240_1440w.jpg"
          mode="fit"
          needCache={false}
        />
        {/*<img*/}
        {/*  src="https://pic1.zhimg.com/80/v2-235ab378ef0c0bd388ab7c92f3127240_1440w.jpg"*/}
        {/*  alt="img"*/}
        {/*  onLoad={imgOnload}*/}
        {/*  onError={imgloadErr}*/}
        {/*/>*/}
      </div>
      <Button>默认的</Button>
      <Button btnType="primary">主要的</Button>
      <Button btnType="danger">危险的</Button>
      <Button size="large">大的</Button>
      <Button size="small">小的</Button>
      <Button disabled>禁止的</Button>
      <Button btnType="link" href="https://www.baidu.com">
        a标签
      </Button>
      <Button btnType="link" href="https://www.baidu.com" disabled>
        a标签禁止的
      </Button>
      <Button
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </Button>
      <Menu mode="vertical">
        <MenuItem>aaa</MenuItem>
        <MenuItem>bbb</MenuItem>
        <MenuItem>ccc</MenuItem>
        <SubMenu title="子菜单">
          <MenuItem>eee</MenuItem>
          <MenuItem>eee</MenuItem>
          <MenuItem>eee</MenuItem>
          <SubMenu title="子菜单">
            <MenuItem>eee</MenuItem>
            <MenuItem>eee</MenuItem>
            <MenuItem>eee</MenuItem>
            <SubMenu title="子菜单">
              <MenuItem>eee</MenuItem>
              <MenuItem>eee</MenuItem>
              <MenuItem>eee</MenuItem>
            </SubMenu>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default App;
