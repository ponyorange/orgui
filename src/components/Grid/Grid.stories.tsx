import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Divider from "../Divider/divider";

import Row from "./row";
import Col from "./col";
import "../../stories/scss/grid.scss";

export default {
  title: "OrangeUI/Grid",
  component: Row,
  subcomponents: { Col },
} as ComponentMeta<typeof Row>;

const IntroTemplate: ComponentStory<typeof Row> = () => (
  <div className="baseGridCss">
    <Row>
      <Col span={24}>col</Col>
    </Row>
    <Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
    <Row>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row>
  </div>
);

export const Introduction = IntroTemplate.bind({});
Introduction.storyName = "基本的Grid";

const SizeTemplate: ComponentStory<typeof Row> = (args) => {
  const style: React.CSSProperties = {
    background: "#faad3e",
    padding: "8px 0",
  };
  return (
    <>
      <Divider orientation="left">Horizontal</Divider>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
      <Divider orientation="left">Responsive</Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
      <Divider orientation="left">Vertical</Divider>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
    </>
  );
};

export const Size = SizeTemplate.bind({});
Size.storyName = "带间距的Grid";

const TypeTemplate: ComponentStory<typeof Row> = (args) => (
  <div>
    <Row>
      <Col xs={2} sm={4} md={6} lg={8} xl={10} className="mycol">
        Col
      </Col>
      <Col xs={20} sm={16} md={12} lg={8} xl={4} className="mycol">
        Col
      </Col>
      <Col xs={2} sm={4} md={6} lg={8} xl={10} className="mycol">
        Col
      </Col>
    </Row>
  </div>
);

export const Type = TypeTemplate.bind({});
Type.storyName = "响应式的Grid";
