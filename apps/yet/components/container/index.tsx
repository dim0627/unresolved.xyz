import type { FC, PropsWithChildren } from 'react';

export const Container: FC<PropsWithChildren<{}>> = (props) => {
  return <div className="mx-auto max-w-4xl px-6">{props.children}</div>;
};
