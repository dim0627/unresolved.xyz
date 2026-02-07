import type { CareerItemFragment } from '@graphql/graphql';
import type { FC } from 'react';

interface CareerProps {
  career: CareerItemFragment;
}

export const Career: FC<CareerProps> = ({ career }) => {
  return (
    <div>
      <div className="relative text-base before:absolute before:top-1 before:bottom-0 before:-left-[1.75rem] before:box-border before:h-4 before:w-4 before:rounded-[10px] before:border-2 before:border-base before:bg-brand before:content-['']">
        {career.joinedAt}
      </div>
      <div className="m-2 rounded-3xl border-2 border-base px-6 py-4 shadow-bordered">
        <div className="flex items-end">
          <span className="mr-4 text-2xl leading-8">{career.emoji}</span>
          <div>
            <ul className="flex list-none flex-wrap gap-2">
              {career.roles.map((role) => (
                <li
                  key={role}
                  className="inline-block rounded-[3px] bg-base/5 px-2 py-0.5 text-[.7rem] leading-tight"
                >
                  {role}
                </li>
              ))}
            </ul>
            <h3 className="mt-2">{career.companyName}</h3>
          </div>
        </div>
        <ul className="mt-2 flex list-none flex-wrap gap-2">
          {career.stacks.map((stack) => (
            <li
              key={stack}
              className="inline-block rounded-full border border-base/10 px-3 py-1 text-[.7rem]"
            >
              {stack}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative text-base before:absolute before:top-1 before:bottom-0 before:-left-[1.75rem] before:box-border before:h-4 before:w-4 before:rounded-[10px] before:border-2 before:border-base before:bg-brand before:content-['']">
        {career.leavedAt || 'Now'}
      </div>
    </div>
  );
};
