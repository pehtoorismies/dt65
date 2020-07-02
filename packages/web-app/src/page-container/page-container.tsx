import { useRouter } from 'next/dist/client/router'
import React, { PropsWithChildren } from 'react'
import { Box, Flex } from 'rebass/styled-components'
import { Footer } from './footer'
import { Toolbar } from './toolbar'

export const PageContainer = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter()
  const footerProps = {
    onHomeClick: () => router.push('/'),
    onProfileClick: () => console.log('hjel'),
    onAddEventClick: () => console.log('hjel'),
    onUserListClick: () => console.log('hjel'),
  }

  return (
    <Flex width="100%" justifyContent="center">
      <Box mt="4rem" mb="4rem" width="100%" maxWidth="68rem">
        <Toolbar pageTitle="Koria" />
        {children}
        <Footer {...footerProps} />
      </Box>
    </Flex>
  )
}
