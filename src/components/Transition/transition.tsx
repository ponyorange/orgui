import React from "react";
import { CSSTransition } from "react-transition-group";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";

interface TransitionProps {
  animation?: AnimationName;
  wrapper?: boolean;
  children: React.ReactNode;
  classNames?: string;
  unmountOnExit?: boolean;
  appear?: boolean;
  in: boolean;
  timeout: number;
}

const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, wrapper, ...restProps } = props;
  function end() {}
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
      addEndListener={end}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
