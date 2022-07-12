import React from "react";
interface OptionProps {
  index?: string;
  value: string;
  label?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}
export const Option: React.FC<OptionProps> = (props) => {
  return <div>Option</div>;
};

export default Option;
