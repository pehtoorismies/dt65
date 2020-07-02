import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { createRandomUsers } from '../util/random'
import { UserList } from './user-list'

export default {
  title: 'Users',
  decorators: [withKnobs, withA11y],
}

export const userList = () => {
  return <UserList users={createRandomUsers(10)} />
}
