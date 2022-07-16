import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Carousel from "./carousel";

export default {
  title: "OrangeUI/Carousel",
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const contentStyle: React.CSSProperties = {
  height: "200px",
  color: "#fff",
  lineHeight: "200px",
  textAlign: "center",
  background: "linear-gradient(to right, #FFD700,#FFA500)",
  fontSize: "40px",
  fontWeight: "bold",
};

const IntroTemplate: ComponentStory<typeof Carousel> = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <div style={{ height: "200px" }}>
      <Carousel afterChange={onChange} autoplay>
        <div>
          <div style={contentStyle}>1</div>
        </div>
        <div>
          <div style={contentStyle}>2</div>
        </div>
        <div>
          <div style={contentStyle}>3</div>
        </div>
        <div>
          <div style={contentStyle}>4</div>
        </div>
      </Carousel>
    </div>
  );
};

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "基本的轮播";

const SizeTemplate: ComponentStory<typeof Carousel> = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <div style={{ height: "200px" }}>
      <Carousel afterChange={onChange} effect="space" autoplay>
        <div>
          <div style={contentStyle}>1</div>
        </div>
        <div>
          <div style={contentStyle}>2</div>
        </div>
        <div>
          <div style={contentStyle}>3</div>
        </div>
        <div>
          <div style={contentStyle}>4</div>
        </div>
      </Carousel>
    </div>
  );
};

export const Size = SizeTemplate.bind({});
Size.storyName = "空间感轮播";

const TypeTemplate: ComponentStory<typeof Carousel> = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <div style={{ height: "200px" }}>
      <Carousel afterChange={onChange} autoplay effect="fade">
        <div>
          <div style={contentStyle}>1</div>
        </div>
        <div>
          <div style={contentStyle}>2</div>
        </div>
        <div>
          <div style={contentStyle}>3</div>
        </div>
        <div>
          <div style={contentStyle}>4</div>
        </div>
      </Carousel>
    </div>
  );
};

export const Type = TypeTemplate.bind({});
Type.storyName = "渐变轮播";
