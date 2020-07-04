import React from 'react'
import { Flex, Text } from 'rebass/styled-components'
import { colors } from '../styles/colors'
import { UserInfo } from '../users/user-info'

interface Props {
  participants: string[]
  me?: UserInfo
}

export const Pills = ({ participants, me }: Props) => {
  const pills = participants.map(value => {
    return (
      <Text
        sx={{
          fontFamily: 'main',
          borderRadius: '0.4rem',
        }}
        bg={me?.nickname === value ? 'blue' : 'pink'}
        key={value}
        p="0.5rem"
        m="0.3rem"
        fontSize={1}
        color="white"
      >
        {value}
      </Text>
    )
  })

  return (
    <Flex
      flexWrap="wrap"
      py="1rem"
      bg="pillsBg"
      justifyContent="space-evenly"
      sx={{
        borderRadius: '0.4rem',
        border: `1px solid ${colors.lightergray}`,
      }}
    >
      {pills}
    </Flex>
  )
}
