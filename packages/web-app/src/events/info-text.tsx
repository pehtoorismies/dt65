import React from 'react'
import { Flex, Text } from 'rebass/styled-components'

interface Props {
  title: string
  text?: string
}

export const InfoText = ({ title, text }: Props) => {
  return (
    <Flex>
      <Text variant="infoTextTitle" width="6rem" my="0.2rem">
        {title}:
      </Text>
      <Text variant="infoTextValue" ml={1} color={text ? 'black' : 'lightgrey'}>
        {text || 'ei määritelty'}
      </Text>
    </Flex>
  )
}
