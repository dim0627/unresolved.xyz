import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

interface ContainerProps {
  fullWidth?: boolean;
}

export const Container: FC<PropsWithChildren<ContainerProps>> = (props) => {
  return (
    <div
      className={classNames('mx-auto px-4', { 'max-w-2xl': !props.fullWidth })}
    >
      {props.children}
    </div>
  );
};
