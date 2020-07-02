import { UserInjured } from '@styled-icons/fa-solid/UserInjured'
import React from 'react'
import { Box, Flex, Text } from 'rebass/styled-components'
import styled from 'styled-components'
import { Profile as ProfileIcon } from '@styled-icons/icomoon/Profile'
import { Subscriptions } from '@styled-icons/material/Subscriptions'
import { LogOut } from '@styled-icons/boxicons-regular/LogOut'
import { colors } from '../styles/styles'
import { ArrowButton } from './arrow-button'

interface Props {
  profileUrl?: string
  nickname: string
}

const UserImageIcon = styled(UserInjured)`
  color: grey;
  height: 30px;
  width: 30px;
  background: white;
  border-radius: 15px;
`

const PictureIcon = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 1px solid ${colors.pink};
`

export const Profile = (props: Props) => {
  const { profileUrl, nickname } = props

  return (
    <Box width="100%" sx={{ maxWidth: '500px' }}>
      <Flex
        width="100%"
        p={3}
        bg="lightestgray"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {profileUrl && <PictureIcon src={profileUrl} />}
        {!profileUrl && <UserImageIcon />}
        <Text
          fontWeight="bold"
          color="black"
          textAlign="center"
          lineHeight={1.5}
          p={1}
        >
          {nickname}
        </Text>
      </Flex>
      <Box width="100%">
        <ArrowButton title="Profiili" onClick={() => {}} icon={ProfileIcon} />
        <ArrowButton
          title="Sähköpostiasetukset"
          onClick={() => {}}
          icon={Subscriptions}
        />
        <ArrowButton title="Logout" onClick={() => {}} icon={LogOut} />
      </Box>
    </Box>
  )
}
