import { style } from '@vanilla-extract/css';

export const tags = style({
  display: 'flex',
  gap: '.5rem',
  listStyle: 'none',
  flexWrap: 'wrap',
});

export const tag = style({
  display: 'inline-block',
  padding: '.25rem .75rem',
  fontSize: '.7rem',
  border: '1px solid rgba(51, 51, 51, .1)',
  borderRadius: '50px',
});
