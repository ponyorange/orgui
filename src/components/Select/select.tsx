import React, { CSSProperties } from "react";

interface SelectProps {
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  name?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
  onVisibleChange?: (visible: boolean) => void;
}

export const Select: React.FC<SelectProps> = (props) => {
  return <div>Select</div>;
};

export default Select;
