import { RightArrow } from '@styled-icons/boxicons-solid/RightArrow'
import { StyledIcon } from '@styled-icons/styled-icon'
import React from 'react'
import { Button, Flex, Text } from 'rebass/styled-components'
import styled from 'styled-components'

interface Props {
  title: string
  onClick: () => void
  icon: StyledIcon
}

const Arrow = styled(RightArrow)`
  color: white;
  height: 1.5rem;
  width: 1.5rem;
`

export const ArrowButton = ({ title, onClick, icon }: Props) => {
  const Icn = styled(icon)`
    color: white;
    height: 1.8rem;
    width: 1.8rem;
    margin-right: 0.6rem;
  `

  return (
    <Button my={1} onClick={onClick} variant="secondary" width="100%">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Icn />
          <Text>{title}</Text>
        </Flex>
        <Arrow />
      </Flex>
    </Button>
  )
}
