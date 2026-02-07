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
    <div className="flex relative flex-col gap-8 max-w-[32rem] py-6 pl-6 before:content-[''] before:absolute before:w-1 before:top-0 before:bottom-0 before:left-0 before:border-2 before:border-base/10 before:rounded-[10px]">
      {careers.map((career) => (
        <Career key={career.id} career={career} />
      ))}
    </div>
  );
};
