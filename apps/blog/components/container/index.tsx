import { FC, PropsWithChildren } from "react";

interface ContainerProps {}

export const Container: FC<PropsWithChildren<ContainerProps>> = (props) => {
  return <div className="max-w-2xl px-4 mx-auto">{props.children}</div>;
};
