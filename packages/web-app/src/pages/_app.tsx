import { AppProps } from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from '../styles/styles'

const MySharity = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MySharity
