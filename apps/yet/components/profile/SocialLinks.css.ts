import { pressable } from '@styles/button.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  listStyle: 'none',
  gap: '1rem',
  '@media': {
    'screen and (max-width: 750px)': {
      justifyContent: 'center',
    },
  },
});

export const item = style([
  pressable,
  {
    padding: '1rem',
  },
]);
