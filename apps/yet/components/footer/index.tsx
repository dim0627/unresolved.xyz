import { Container } from "components/container";
import { FC } from "react";
import { containerStyle } from "./index.css";

export const Footer: FC = () => {
  return (
    <footer className={containerStyle}>
      <Container>
        <p>© dtsuji@dim0627</p>
      </Container>
    </footer>
  );
};
