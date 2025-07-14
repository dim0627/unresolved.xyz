import { Container } from 'components/container';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { containerStyle, titleStyle } from './index.css';

interface SectionProps {
  title?: ReactNode;
}

export const Section: FC<PropsWithChildren<SectionProps>> = (props) => {
  return (
    <section className={containerStyle}>
      <Container>
        {props.title && <h2 className={titleStyle}>{props.title}</h2>}
        {props.children}
      </Container>
    </section>
  );
};
