import { withA11y } from '@storybook/addon-a11y'
import { withKnobs, text } from '@storybook/addon-knobs'
import React from 'react'
import { Profile } from './profile'

export default {
  title: 'Profile',
  decorators: [withKnobs, withA11y],
}

export const userList = () => {
  return <Profile nickname={text('nickname', 'Koirahevonen')} />
}
