import { type FragmentType, graphql, useFragment } from '@graphql';
import type { FC } from 'react';
import { Career } from './Career';

const CareerFragment = graphql(/* GraphQL */ `
  fragment CareerItem on Career {
    id
    emoji
    companyName
    stacks
    roles
    joinedAt
    leavedAt
  }
`);

interface Props {
  careers: FragmentType<typeof CareerFragment>[];
}

export const Careers: FC<Props> = (props) => {
  const careers = useFragment(CareerFragment, props.careers);

  return (
    <div className="relative flex max-w-[32rem] flex-col gap-8 py-6 pl-6 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1 before:rounded-[10px] before:border-2 before:border-base/10 before:content-['']">
      {careers.map((career) => (
        <Career key={career.id} career={career} />
      ))}
    </div>
  );
};
