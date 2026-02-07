import type { FC, PropsWithChildren } from 'react';

export const Container: FC<PropsWithChildren<{}>> = (props) => {
  return <div className="mx-auto max-w-[60rem] px-6">{props.children}</div>;
};
