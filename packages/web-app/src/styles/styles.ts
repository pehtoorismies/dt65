import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const breakpoints = ['48rem', '73.6rem', '98rem', '128rem']

export const theme = {
  breakpoints,
}

export const GlobalStyles = createGlobalStyle`
  ${reset}
  
  html {
    font-size: 10px;
  }
  body {
    font-family: 'Montserrat', sans-serif;
    
  }
`
