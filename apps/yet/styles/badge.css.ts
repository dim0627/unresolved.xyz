import { style } from '@vanilla-extract/css';

export const badges = style({
  display: 'flex',
  gap: '.5rem',
  listStyle: 'none',
  flexWrap: 'wrap',
});

export const badge = style({
  display: 'inline-block',
  padding: '.125rem .5rem',
  lineHeight: '1.25',
  fontSize: '.7rem',
  background: 'rgba(51, 51, 51, .05)',
  borderRadius: '3px',
});
