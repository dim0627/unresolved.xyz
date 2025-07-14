import { style } from '@vanilla-extract/css';

export const containerStyle = style({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  gap: '2rem',
  maxWidth: '32rem',
  padding: '1.5rem 0 1.5rem 1.5rem',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      width: '.25rem',
      top: 0,
      bottom: 0,
      left: 0,
      border: '2px solid rgba(51, 51, 51, .1)',
      borderRadius: '10px',
    },
  },
});
