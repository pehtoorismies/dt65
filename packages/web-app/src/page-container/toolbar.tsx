import React from 'react'
import { Flex, Text } from 'rebass/styled-components'
import { HomeIcon } from './icons'

interface Props {
  pageTitle?: string
  onBack?: () => void
  backDisabled?: boolean
}

export const Toolbar = (props: Props) => {
  const { pageTitle, onBack, backDisabled } = props

  const backButton = backDisabled ? (
    undefined
  ) : (
    <Flex sx={{ borderRadius: '50%' }} bg="darkWhite" p={1}>
      <HomeIcon onClick={onBack} />
    </Flex>
  )

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
          {backButton}
          <Text variant="toolbarTitle">Downtown65.events</Text>
        </Flex>
        <Text variant="toolbarAddress" textAlign="right" mr="0.5rem">
          {pageTitle}
        </Text>
      </Flex>
    </Flex>
  )
}
