import type { FC } from 'react';
import type { Career as CareerType } from '../../types/content';
import { Career } from './Career';

interface Props {
  careers: CareerType[];
}

export const Careers: FC<Props> = ({ careers }) => {
  return (
    <div className="flex max-w-lg flex-col gap-8">
      {careers.map((career) => (
        <Career
          key={`${career.companyName}-${career.joinedAt}`}
          career={career}
        />
      ))}
    </div>
  );
};
