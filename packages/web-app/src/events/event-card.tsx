import React from 'react'
import { Card, Flex, Text } from 'rebass/styled-components'
// import styled, { keyframes } from 'styled-components'
// import { ImageBox } from './styles'

interface Props {
  title?: string
}

const borderStyle = '1px solid #e9e9e9'

export const EventCard = ({}: Props) => {
  return (
    <Flex
      m={1}
      bg="white"
      width="100%"
      sx={{
        maxWidth: 400,
        borderBottom: borderStyle,
        position: 'relative',
      }}
    >
      <Card width="100%" mx="auto" variant="shadow"></Card>
    </Flex>
  )
}
