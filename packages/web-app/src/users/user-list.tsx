import React from 'react'
import { Box, Flex, Text } from 'rebass/styled-components'
import { UserInfo } from './user-info'
import { Row } from './user-row'

interface Props {
  users: UserInfo[]
}

export const UserList = ({ users }: Props) => {
  return (
    <Box width="100%" py="0.5rem">
      <Flex width="100%" px="1.3rem" bg="blue" color="white" py="1rem">
        <Text width="15rem">Käyttäjätunnus</Text>
        <Text>Nimi</Text>
      </Flex>
      <Flex width="100%" flexDirection="column">
        {users.map(({ nickname, name }: UserInfo, index: number) => {
          return (
            <Row
              hasWhiteBg={index % 2 === 0}
              key={nickname}
              leftColumnValue={nickname}
              rightColumnValue={name}
            />
          )
        })}
      </Flex>
    </Box>
  )
}
