import { badge, badges } from '@styles/badge.css';
import { borderedBox } from '@styles/layout.css';
import { tag, tags } from '@styles/tag.css';
import { variables } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const dateStyle = style({
  position: 'relative',
  fontSize: '1rem',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      boxSizing: 'border-box',
      width: '1rem',
      height: '1rem',
      top: '.25rem',
      bottom: 0,
      left: '-1.75rem',
      border: `2px solid ${variables.color.base}`,
      background: variables.color.brand,
      borderRadius: '10px',
    },
  },
});
export const containerStyle = style([
  borderedBox,
  {
    margin: '.5rem',
    padding: '1rem 1.5rem',
  },
]);
export const rolesStyle = badges;
export const roleItemStyle = badge;
export const headerStyle = style({
  display: 'flex',
  alignItems: 'end',
});

export const emojiStyle = style({
  fontSize: '1.5rem',
  marginRight: '1rem',
  lineHeight: '2rem',
});
export const titleStyle = style({
  marginTop: '.5rem',
});
export const stacksStyle = style([
  tags,
  {
    marginTop: '.5rem',
  },
]);
export const stackItemStyle = tag;
