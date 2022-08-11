import React from "react";
import { render, screen } from "@testing-library/react";
import Alert, { AlertProps } from "./alert";

jest.mock("../Icon/icon", () => {
  return () => {
    return <i className="fa" />;
  };
});

const propsShowTitle: AlertProps = {
  title: "show alert",
};
const propsShowDes: AlertProps = {
  title: "show alert",
  description: "show des",
};
const propsDisabled: AlertProps = {
  title: "show alert",
  closeable: false,
};
describe("testing Alert Component", () => {
  it("should show title and can close", function () {
    render(<Alert {...propsShowTitle} />);
    const alert = screen.getByText("show alert");
    expect(alert).toBeInTheDocument();
    const cloesBtn = screen.queryByTestId("close-icon");
    expect(cloesBtn).toBeInTheDocument();
  });
  it("should hide title and des", function () {
    render(<Alert {...propsShowDes} />);
    const alert = screen.getByText("show des");
    expect(alert).toBeInTheDocument();
  });
  it("should can not close alert", function () {
    render(<Alert {...propsDisabled} />);
    const alert = screen.getByText("show alert");
    expect(alert).toBeInTheDocument();
    // 没有关闭按钮
    const cloesBtn = screen.queryByTestId("close-icon");
    expect(cloesBtn).toBeNull();
  });
});
