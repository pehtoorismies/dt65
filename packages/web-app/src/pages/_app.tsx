import { AppProps } from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { PageContainer } from '../page-container/page-container'
import { GlobalStyles, theme } from '../styles/styles'

const MySharity = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <PageContainer title={pageProps.title}>
          <Component {...pageProps} />
        </PageContainer>
      </ThemeProvider>
    </>
  )
}

export default MySharity
