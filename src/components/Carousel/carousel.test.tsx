import React from "react";
import Carousel from "./carousel";
import { render, screen, waitFor } from "@testing-library/react";
jest.mock("../Icon/icon", () => {
  return () => {
    return <i className="fa" />;
  };
});

describe("testing Carousel component", () => {
  it("should autoplay", async function () {
    render(
      <Carousel autoplay duration={800}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
    );
    const ele1 = screen.queryAllByTestId("caritem")[1];
    const ele2 = screen.queryAllByTestId("caritem")[2];
    await waitFor(() => {
      expect(ele1).toHaveClass("orange-carousel-slide-active");
    });
    expect(ele2).toHaveClass("orange-carousel-slide-right");
    // expect(ele).toBeInTheDocument();
  });
});
