import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import {
  boolean,
  number,
  text,
  withKnobs,
  select,
} from '@storybook/addon-knobs'
import { fromPairs, map, pipe } from 'ramda'
import React from 'react'
import { EventType } from '../common/event/event'
import { HeadCountButton } from './head-count-button'
import { HeaderImage } from './header-image'
import { EVENT_TYPE_MAP, EventTypeMap } from './map-event-type-to-image'

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

const toOptions = pipe(
  map(({ eventType, title }) => {
    return [title, eventType]
  }),
  fromPairs
)

const options = toOptions(EVENT_TYPE_MAP)

export const imageBox = () => {
  return (
    <HeaderImage
      title={text('title', 'Title')}
      creator={text('creator', 'Creator')}
      onClick={action('onClick')}
      isRace={boolean('isRace', false)}
      eventType={select('eventType', options, EventType.CYCLING)}
    />
  )
}
