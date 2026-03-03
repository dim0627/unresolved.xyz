import type { FC } from 'react';
import type { Career as CareerType } from '../../types/content';

interface CareerProps {
  career: CareerType;
}

export const Career: FC<CareerProps> = ({ career }) => {
  const Icon = career.icon;

  return (
    <div className="flex gap-4">
      <div className="pt-1">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-xl font-medium">{career.companyName}</h3>
        <p className="mt-1 text-sm opacity-60">
          {[
            career.joinedAt.slice(0, 7),
            career.leavedAt ? career.leavedAt.slice(0, 7) : 'Present',
          ].join(' - ')}
        </p>
        <ul className="mt-2 flex list-none flex-wrap gap-2">
          {career.roles.map((role) => (
            <li
              key={role}
              className="inline-block rounded bg-base/5 px-3 py-1 text-xs leading-tight"
            >
              {role}
            </li>
          ))}
        </ul>
        {career.stacks.length > 0 && (
          <ul className="mt-2 flex list-none flex-wrap gap-2">
            {career.stacks.map((stack) => (
              <li
                key={stack}
                className="inline-block rounded-full border border-base/10 px-3 py-1 text-xs"
              >
                {stack}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
