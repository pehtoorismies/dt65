import styled, { css } from 'styled-components'
import { Home } from '@styled-icons/boxicons-solid/Home'
import { PlusSquare } from '@styled-icons/boxicons-solid/PlusSquare'
import { User } from '@styled-icons/boxicons-solid/User'
import { Users } from '@styled-icons/icomoon/Users'

const common = css`
  color: black;
  width: 2.6rem;
  height: 2.6rem;
  cursor: pointer;
`

export const HomeIcon = styled(Home)`
  ${common};
`

export const ProfileIcon = styled(User)`
  ${common};
`

export const AddIcon = styled(PlusSquare)`
  ${common};
`

export const UsersIcon = styled(Users)`
  ${common};
`
