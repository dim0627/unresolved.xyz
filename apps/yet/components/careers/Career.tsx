import type { CareerItemFragment } from '@graphql/graphql';
import type { FC } from 'react';

interface CareerProps {
  career: CareerItemFragment;
}

export const Career: FC<CareerProps> = ({ career }) => {
  return (
    <div>
      <div className="relative text-base before:content-[''] before:absolute before:box-border before:w-4 before:h-4 before:top-1 before:bottom-0 before:-left-[1.75rem] before:border-2 before:border-base before:bg-brand before:rounded-[10px]">
        {career.joinedAt}
      </div>
      <div className="border-2 border-base rounded-3xl shadow-bordered m-2 px-6 py-4">
        <div className="flex items-end">
          <span className="text-2xl mr-4 leading-8">{career.emoji}</span>
          <div>
            <ul className="flex gap-2 list-none flex-wrap">
              {career.roles.map((role) => (
                <li
                  key={role}
                  className="inline-block py-0.5 px-2 leading-tight text-[.7rem] bg-base/5 rounded-[3px]"
                >
                  {role}
                </li>
              ))}
            </ul>
            <h3 className="mt-2">{career.companyName}</h3>
          </div>
        </div>
        <ul className="flex gap-2 list-none flex-wrap mt-2">
          {career.stacks.map((stack) => (
            <li
              key={stack}
              className="inline-block py-1 px-3 text-[.7rem] border border-base/10 rounded-full"
            >
              {stack}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative text-base before:content-[''] before:absolute before:box-border before:w-4 before:h-4 before:top-1 before:bottom-0 before:-left-[1.75rem] before:border-2 before:border-base before:bg-brand before:rounded-[10px]">
        {career.leavedAt || 'Now'}
      </div>
    </div>
  );
};
