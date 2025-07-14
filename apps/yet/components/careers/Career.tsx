import type { CareerItemFragment } from '@graphql/graphql';
import type { FC } from 'react';
import {
  containerStyle,
  dateStyle,
  emojiStyle,
  headerStyle,
  roleItemStyle,
  rolesStyle,
  stackItemStyle,
  stacksStyle,
  titleStyle,
} from './Career.css';

interface CareerProps {
  career: CareerItemFragment;
}

export const Career: FC<CareerProps> = ({ career }) => {
  return (
    <div>
      <div className={dateStyle}>{career.joinedAt}</div>
      <div className={containerStyle}>
        <div className={headerStyle}>
          <span className={emojiStyle}>{career.emoji}</span>
          <div>
            <ul className={rolesStyle}>
              {career.roles.map((role) => (
                <li key={role} className={roleItemStyle}>
                  {role}
                </li>
              ))}
            </ul>
            <h3 className={titleStyle}>{career.companyName}</h3>
          </div>
        </div>
        <ul className={stacksStyle}>
          {career.stacks.map((stack) => (
            <li key={stack} className={stackItemStyle}>
              {stack}
            </li>
          ))}
        </ul>
      </div>
      <div className={dateStyle}>{career.leavedAt || 'Now'}</div>
    </div>
  );
};
