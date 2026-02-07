import type { FC, PropsWithChildren } from 'react';

export const Container: FC<PropsWithChildren<{}>> = (props) => {
  return <div className="max-w-[60rem] mx-auto px-6">{props.children}</div>;
};
