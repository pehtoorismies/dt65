import React from 'react'
import { Flex, Text } from 'rebass/styled-components'
import { Participant } from '../common/participant'

interface Props {
  participants: Participant[]
  me?: Participant
}

export const Pills = ({ participants, me }: Props) => {
  const pills = participants.map(({ nickname, id }) => {
    return (
      <Text
        sx={{
          borderRadius: '0.4rem',
        }}
        bg={me?.id === id ? 'blue' : 'pink'}
        key={id}
        p="0.5rem"
        m="0.3rem"
        fontSize="1.4rem"
        color="white"
      >
        {nickname}
      </Text>
    )
  })

  return (
    <Flex flexWrap="wrap" py="1rem">
      {pills}
    </Flex>
  )
}
