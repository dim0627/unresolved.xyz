import { FC, PropsWithChildren } from "react";
import { Header, Footer } from "@components";

export const Shell: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="my-6">{children}</div>
      <Footer />
    </>
  );
};
