import React from "react";
import { config } from "react-transition-group";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AutoComplete, AutoCompleteProps } from "./autoComplete";

config.disabled = true;

const testArray = [
  { value: "axy", number: 11 },
  { value: "ack", number: 1 },
  { value: "qq", number: 4 },
  { value: "pp", number: 15 },
];
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

describe("test AutoComplete component", () => {
  it("test basic AutoComplete behavior", async () => {
    render(<AutoComplete {...testProps} />);
    const inputNode = screen.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
    // input change
    userEvent.type(inputNode, "a");
    await waitFor(() => {
      const resEle = screen.queryAllByText("a")[0];
      expect(resEle).toBeInTheDocument();
    });
    // should have two suggestion items
    expect(screen.queryAllByText("a").length).toEqual(2);
    //click the first item
    userEvent.click(screen.getByText("xy"));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "axy",
      number: 11,
    });
    expect(screen.queryByText("xy")).not.toBeInTheDocument();
    //fill the input
    expect(inputNode.value).toBe("axy");
  });
  it("should provide keyboard support", async () => {
    render(<AutoComplete {...testProps} />);
    const inputNode = screen.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
    // input change
    userEvent.type(inputNode, "a");
    await waitFor(() => {
      const resEle = screen.queryAllByText("a")[0];
      expect(resEle).toBeInTheDocument();
    });
    const firstResult = screen.queryAllByTestId("item")[0];
    const secondResult = screen.queryAllByTestId("item")[1];

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass("is-active");
    //arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(secondResult).toHaveClass("is-active");
    //arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstResult).toHaveClass("is-active");
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "axy",
      number: 11,
    });
    expect(screen.queryByText("axy")).not.toBeInTheDocument();
  });
  it("click outside should hide the dropdown", async () => {
    render(<AutoComplete {...testProps} />);
    const inputNode = screen.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
    // input change
    userEvent.type(inputNode, "a");
    await waitFor(() => {
      const resEle = screen.queryAllByText("a")[0];
      expect(resEle).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(screen.queryByText("axy")).not.toBeInTheDocument();
  });
});
