import Color from 'color'
import { colors } from './colors'

const primaryButton = {
  py: 3,
  backgroundColor: 'pink',
  color: 'white',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  '&[disabled]': {
    backgroundColor: 'lightPink',
    cursor: 'not-allowed',
  },
  '&[disabled]:hover': {
    backgroundColor: 'lightPink',
    cursor: 'not-allowed',
  },
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'darkPink',
  },
}

export const buttons = {
  empty: {
    color: 'pink',
    backgroundColor: 'transparent',
    p: 1,
  },
  outline: {
    backgroundColor: 'transparent',
    boxShadow: 'inset 0 0 0 2px',
    color: 'blue',

    '&:hover': {
      color: Color(colors.blue)
        .lighten(0.5)
        .string(),
    },
  },
  outlinePrimary: {
    ...primaryButton,
    backgroundColor: 'transparent',
    boxShadow: 'inset 0 0 0 2px',
    color: 'pink',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: Color(colors.pink)
        .lighten(0.8)
        .string(),
    },
  },
  primary: primaryButton,
  greyed: {
    backgroundColor: 'lightergray',
  },
  mini: {
    ...primaryButton,
    backgroundColor: 'transparent',

    color: 'pink',
    py: 1,
    fontSize: '12px',
  },
  secondary: {
    ...primaryButton,
    backgroundColor: 'blue',
    width: 'auto',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: Color(colors.blue)
        .darken(0.1)
        .string(),
    },
    '&[disabled]': {
      cursor: 'not-allowed',
      backgroundColor: 'lightergray',
    },
    '&[disabled]:hover': {
      cursor: 'not-allowed',
      backgroundColor: 'lightergray',
    },
  },
  warn: {
    ...primaryButton,
    backgroundColor: 'red',
    boxShadow: 'inset 0 0 0 2px',
    color: 'white',

    '&:hover': {
      backgroundColor: 'lightRed',
      cursor: 'not-allowed',
    },
    '&[disabled]': {
      backgroundColor: 'lightRed',
      cursor: 'not-allowed',
    },
    '&[disabled]:hover': {
      backgroundColor: 'lightRed',
      cursor: 'not-allowed',
    },
  },
}
