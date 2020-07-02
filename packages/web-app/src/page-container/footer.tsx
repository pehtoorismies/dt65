import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Home } from '@styled-icons/boxicons-solid/Home'
import { PlusSquare } from '@styled-icons/boxicons-solid/PlusSquare'
import { User } from '@styled-icons/boxicons-solid/User'
import { Users } from '@styled-icons/icomoon/Users'
import React from 'react'
import { Flex } from 'rebass'

const dimensions = {
  width: 26,
  height: 26,
}

interface Props {
  onHomeClick: () => void
  onProfileClick: () => void
  onAddEventClick: () => void
  onUserListClick: () => void
}

const common = css`
  color: black;
`

const HomeIcon = styled(Home)`
  ${common};
`

const ProfileIcon = styled(User)`
  ${common};
`

const AddIcon = styled(PlusSquare)`
  ${common};
`

const UsersIcon = styled(Users)`
  ${common};
`

export const Footer = ({
  onHomeClick,
  onProfileClick,
  onAddEventClick,
  onUserListClick,
}: Props) => {
  return (
    <Flex
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
        maxWidth="68rem"
        justifyContent="space-between"
        alignItems="center"
      >
        <HomeIcon {...dimensions} onClick={onHomeClick} />
        <AddIcon {...dimensions} onClick={onAddEventClick} />
        <UsersIcon {...dimensions} onClick={onUserListClick} />
        <ProfileIcon {...dimensions} onClick={onProfileClick} />
      </Flex>
    </Flex>
  )
}
