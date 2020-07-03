import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { buttons } from './buttons'
import { cards } from './cards'
import { forms } from './forms'
import { fontSizes, fontFamily, text } from './text'
import { colors } from './colors'

const theme = {
  buttons,
  breakpoints: ['40rem', '52rem', '64rem'],
  cards,
  colors,
  fontSizes,
  fontFamily,
  forms,
  shadows: {
    large: '0 0 24px rgba(0, 0, 0, .125)',
    small: '0 0 4px rgba(0, 0, 0, .125)',
  },
  space: [
    0,
    '0.4rem',
    '0.8rem',
    '1.6rem',
    '3.2rem',
    '6.4rem',
    '12.8rem',
    '25.6rem',
  ],
  text,
}

export const GlobalStyles = createGlobalStyle`
  ${reset}
  
  html {
    font-size: 10px;
    height: 100%;
  }
  body {
    height: 100%;
  }
`
// font-family: 'Titillium Web', sans-serif;

export { theme, colors }
