import React from 'react'
import { Flex } from 'rebass'
import { AddIcon, HomeIcon, ProfileIcon, UsersIcon } from './icons'

interface Props {
  onHomeClick: () => void
  onProfileClick: () => void
  onAddEventClick: () => void
  onUserListClick: () => void
}

export const Footer = ({
  onHomeClick,
  onProfileClick,
  onAddEventClick,
  onUserListClick,
}: Props) => {
  return (
    <Flex
      bg="white"
      width="100%"
      justifyContent="center"
      p="0.5rem"
      sx={{
        position: 'fixed',
        left: 0,
        zIndex: 10,
        bottom: 0,
        borderTop: '1px solid lightgrey',
      }}
    >
      <Flex
        width="100%"
        maxWidth={['40rem', '70rem']}
        justifyContent="space-between"
        alignItems="center"
        px="1rem"
      >
        <HomeIcon onClick={onHomeClick} />
        <AddIcon onClick={onAddEventClick} />
        <UsersIcon onClick={onUserListClick} />
        <ProfileIcon onClick={onProfileClick} />
      </Flex>
    </Flex>
  )
}
