import { useRouter } from 'next/dist/client/router'
import React, { PropsWithChildren } from 'react'
import { Box, Flex } from 'rebass/styled-components'
import { Footer } from './footer'
import { Toolbar } from './toolbar'

interface Props {
  title?: string
}

export const PageContainer = ({
  children,
  title,
}: PropsWithChildren<Props>) => {
  const router = useRouter()
  const footerProps = {
    onHomeClick: () => router.push('/'),
    onProfileClick: () => router.push('/profile'),
    onAddEventClick: () => console.log('/users'),
    onUserListClick: () => router.push('/users'),
  }

  return (
    <Flex width="100%" justifyContent="center" px="1rem">
      <Box mt="4rem" mb="4rem" width="100%" maxWidth={['100%', '70rem']}>
        <Toolbar pageTitle={title} />
        {children}
        <Footer {...footerProps} />
      </Box>
    </Flex>
  )
}
