import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AutoComplete, { DataSourceType } from "./autoComplete";

export default {
  title: "OrangeUI/AutoComplete",
  component: AutoComplete,
} as ComponentMeta<typeof AutoComplete>;

const IntroTemplate: ComponentStory<typeof AutoComplete> = () => {
  const datas = [
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
    return datas
      .filter((name) => name.includes(query))
      .map((name) => ({ value: name }));
  };
  return (
    <div style={{ height: "100px" }}>
      <AutoComplete
        fetchSuggestions={handleFetch}
        placeholder="随便输入点字母试试"
      />
    </div>
  );
};

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "介绍";

const SizeTemplate: ComponentStory<typeof AutoComplete> = (args) => {
  type DataPlayerProps = { value: string; number: number };
  const datasWithNumber: DataPlayerProps[] = [
    { value: "bradley", number: 11 },
    { value: "pope", number: 1 },
    { value: "caruso", number: 4 },
    { value: "cook", number: 2 },
    { value: "cousins", number: 15 },
    { value: "james", number: 23 },
    { value: "AD", number: 3 },
    { value: "green", number: 14 },
    { value: "howard", number: 39 },
    { value: "kuzma", number: 0 },
  ];
  const handleFetch = (query: string) => {
    return datasWithNumber.filter((data) => data.value.includes(query));
  };
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<DataPlayerProps>;
    return (
      <>
        <span style={{ color: "orange" }}>data: {itemWithNumber.value}</span>
        <span>--number: {itemWithNumber.number}</span>
      </>
    );
  };
  return (
    <div style={{ height: "100px" }}>
      <AutoComplete
        fetchSuggestions={handleFetch}
        placeholder="随便输入点字母试试"
        renderOption={renderOption}
      />
    </div>
  );
};

export const Size = SizeTemplate.bind({});
Size.storyName = "自定义搜索结果模版";

const TypeTemplate: ComponentStory<typeof AutoComplete> = (args) => {
  type GithubUserProps = { value: string; url: string };
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <span style={{ color: "orange" }}>Name: {itemWithGithub.value}</span>
        <span>(url: {itemWithGithub.url})</span>
      </>
    );
  };
  return (
    <div style={{ height: "100px" }}>
      <AutoComplete
        fetchSuggestions={handleFetch}
        placeholder="搜索GitHub用户"
        renderOption={renderOption}
      />
    </div>
  );
};

export const Type = TypeTemplate.bind({});
Type.storyName = "支持异步搜索";
