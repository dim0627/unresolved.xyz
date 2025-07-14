import type { FC, PropsWithChildren } from 'react';
import { cotnainerStyle } from './index.css';

export const Container: FC<PropsWithChildren<{}>> = (props) => {
  return <div className={cotnainerStyle}>{props.children}</div>;
};
