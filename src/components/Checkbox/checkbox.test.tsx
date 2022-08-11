import React from "react";
import Checkbox, { CheckbocProps } from "./chexkbox";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const controlledProp: CheckbocProps = {};
const uncontrolledProp: CheckbocProps = {
  checked: false,
};

describe("testing Checkbox component", () => {
  it("should show normal", function () {
    render(<Checkbox>checkbox</Checkbox>);
    const ele = screen.getByText("checkbox");
    expect(ele).toBeInTheDocument();
  });
  it("should controlled", function () {
    render(<Checkbox {...controlledProp}>checkbox</Checkbox>);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).not.toHaveClass("orange-checkbox-checked");
    userEvent.click(checkbox);
    expect(checkbox).toHaveClass("orange-checkbox-checked");
  });
  it("should uncontrolled", function () {
    render(<Checkbox {...uncontrolledProp}>checkbox</Checkbox>);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).not.toHaveClass("orange-checkbox-checked");
    userEvent.click(checkbox);
    expect(checkbox).not.toHaveClass("orange-checkbox-checked");
  });
});
