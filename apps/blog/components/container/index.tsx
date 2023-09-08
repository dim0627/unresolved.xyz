import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

interface ContainerProps {
  fullWidth?: boolean;
}

export const Container: FC<PropsWithChildren<ContainerProps>> = (props) => {
  return (
    <div
      className={classNames("px-4 mx-auto", { "max-w-2xl": !props.fullWidth })}
    >
      {props.children}
    </div>
  );
};
