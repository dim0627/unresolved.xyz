import { Footer, Header } from '@components';
import type { FC, PropsWithChildren } from 'react';

export const Shell: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="my-6">{children}</div>
      <Footer />
    </>
  );
};
