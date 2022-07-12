import React, { useRef, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TagView, { tagType } from "./tagView";
import Button from "../Button/button";

export default {
  title: "OrangeUI/TagView",
  component: TagView,
  argTypes: {},
} as ComponentMeta<typeof TagView>;

const IntroTemplate: ComponentStory<typeof TagView> = () => {
  const tags: tagType[] = [
    {
      id: "1",
      title: "100",
      isActive: true,
    },
    {
      id: "2",
      title: "200",
      isActive: false,
    },
    {
      id: "3",
      title: "300",
      isActive: false,
    },
  ];
  const [tagsState, setTagsState] = useState(tags);
  const [pageState, setPageState] = useState("page100");
  const onTagDeleteClick = (idx: number, id: string) => {
    setTagsState((prevState) => {
      if (prevState.length > 1 && prevState[idx].isActive) {
        if (idx + 1 < prevState.length) {
          prevState[idx + 1].isActive = true;
          setPageState("page" + prevState[idx + 1].title);
        } else {
          prevState[idx - 1].isActive = true;
          setPageState("page" + prevState[idx - 1].title);
        }
      }
      return prevState.filter((item) => item.id !== id);
    });
  };

  const tagIdx = useRef(4);
  const addTag = () => {
    const tag = {
      id: tagIdx.current + 1 + "",
      title: tagIdx.current * 100 + "",
      isActive: true,
    };
    tagsState.forEach((item) => (item.isActive = false));
    tagIdx.current += 1;
    setTagsState([...tagsState, tag]);
    setPageState("page" + tag.title);
  };

  const onTagClick = (idx: number, id: string) => {
    tagsState.forEach((item) => (item.isActive = false));
    tagsState[idx].isActive = true;
    setPageState("page" + tagsState[idx].title);
    setTagsState([...tagsState]);
  };
  const pageStyle = {
    height: "100px",
    padding: "20px",
  };
  return (
    <div>
      <TagView
        tags={tagsState}
        onTagDeleteClick={onTagDeleteClick}
        onTagClick={onTagClick}
      />
      <div>
        {tagsState.length > 0 && <div style={pageStyle}>{pageState}</div>}
        <div>
          <Button onClick={addTag}>加一个tag</Button>
        </div>
      </div>
    </div>
  );
};

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "介绍";
