import React from 'react'
import { Flex, Text } from 'rebass'
import styled from '@emotion/styled'
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack'
import { colors } from '../styles/styles'

interface Props {
  pageTitle?: string
  onBack?: () => void
  backDisabled?: boolean
}

const BackIcon = styled(ArrowBack)`
  color: ${colors.pink};
  height: 25px;
`

export const Toolbar = (props: Props) => {
  const { pageTitle, onBack, backDisabled } = props

  const backButton = backDisabled ? (
    undefined
  ) : (
    <Flex sx={{ borderRadius: '50%' }} bg="darkWhite" p={1}>
      <BackIcon onClick={onBack} />
    </Flex>
  )

  return (
    <Flex
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
        maxWidth="68rem"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex alignItems="center">
          {backButton}
          <Text ml={3} fontWeight="bold">
            Downtown65.events
          </Text>
        </Flex>

        <Text
          textAlign="right"
          color="grey"
          fontFamily="monospace"
          fontSize={1}
        >
          /{pageTitle}
        </Text>
      </Flex>
    </Flex>
  )
}
