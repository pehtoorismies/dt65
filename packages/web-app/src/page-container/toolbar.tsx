import React from 'react'
import { Flex, Text } from 'rebass/styled-components'
import { HomeIcon } from './icons'

interface Props {
  pageTitle?: string
  onGoHome?: () => void
  backDisabled?: boolean
}

export const Toolbar = ({ pageTitle, onGoHome }: Props) => {
  return (
    <Flex
      bg="white"
      width="100%"
      justifyContent="center"
      sx={{
        position: 'fixed',
        left: 0,
        zIndex: 10,
        top: 0,
        borderBottom: '1px solid lightgrey',
      }}
    >
      <Flex
        width="100%"
        maxWidth={['40rem', '70rem']}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex alignItems="center">
          <Flex sx={{ borderRadius: '50%' }} bg="darkWhite" p={1}>
            <HomeIcon onClick={onGoHome} />
          </Flex>
          <Text
            onClick={onGoHome}
            variant="toolbarTitle"
            sx={{ userSelect: 'none', cursor: 'pointer' }}
          >
            Downtown65.events
          </Text>
        </Flex>
        <Text variant="toolbarAddress" textAlign="right" mr="0.5rem">
          {pageTitle}
        </Text>
      </Flex>
    </Flex>
  )
}
