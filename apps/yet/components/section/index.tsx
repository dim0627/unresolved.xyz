import { Container } from 'components/container';
import type { FC, PropsWithChildren, ReactNode } from 'react';

interface SectionProps {
  title?: ReactNode;
}

export const Section: FC<PropsWithChildren<SectionProps>> = (props) => {
  return (
    <section className="py-16">
      <Container>
        {props.title && (
          <h2 className="text-[4rem] mb-6">{props.title}</h2>
        )}
        {props.children}
      </Container>
    </section>
  );
};
