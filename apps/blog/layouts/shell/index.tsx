import { FC, PropsWithChildren } from "react";
import { Header, Footer } from "@components";

export const Shell: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="py-8 bg-gradient-to-b from-rose-500 to-blue-500">
        {children}
      </div>
      <Footer />
    </>
  );
};
