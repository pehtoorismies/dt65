import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs'
import React from 'react'
import { HeadCountButton } from './head-count-button'
import { HeaderImage } from './header-image'

export default {
  title: 'Events',
  decorators: [withKnobs, withA11y],
}

export const headCountButton = () => {
  return (
    <HeadCountButton
      count={number('count', 14)}
      onClick={action('click')}
      isParticipant={boolean('isParticipant', false)}
      loading={boolean('loading', false)}
    />
  )
}

export const imageBox = () => {
  return (
    <HeaderImage
      title={text('title', 'Title')}
      creator={text('creator', 'Creator')}
      onClick={action('onClick')}
    />
  )
}
