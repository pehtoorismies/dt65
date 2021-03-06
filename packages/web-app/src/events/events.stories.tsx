import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import {
  boolean,
  number,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs'
import faker from 'faker'
import { fromPairs, map, pipe, times } from 'ramda'
import React from 'react'
import { Event, EventType } from '../common/event'
import { UserInfo } from '../users/user-info'
import { EventCard } from './event-card'
import { EventList } from './events-list'
import { HeadCountButton } from './head-count-button'
import { HeaderImage } from './header-image'
import { EVENT_TYPE_MAP } from './map-event-type-to-image'
import { Pills } from './pills'

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

const getParticipants = (howMany = 10) => {
  return times(() => {
    return faker.internet.userName()
  }, howMany)
}

const participants = getParticipants()

const getMe = (participants: string[]): UserInfo => {
  const hasMe = boolean('me', true)
  if (hasMe) {
    const me: UserInfo = {
      nickname: participants[faker.random.number(participants.length)],
      sub: faker.random.uuid(),
      email: faker.internet.email(),
      name: 'Koira',
    }
    return me
  }
}

export const pills = () => {
  return <Pills participants={participants} me={getMe(participants)} />
}

const getEvent = (participants: Participant[]): Event => {
  return {
    eventType: select('eventType', options, EventType.CYCLING),
    id: faker.random.uuid(),
    subtitle: text('subtitle', 'Subtitle'),
    title: text('title', 'Title'),
    creator: text('creator', 'Creator'),
    onClick: action('onClick'),
    race: boolean('race', false),
    participants,
    date: faker.date.future(),
    address: faker.address.city(),
    exactTime: boolean('exactTime', false),
    description:
      '<h1>moi</h1><p>asasda</p><p>asasda</p><p>asasda</p><p>asasda</p>',
  }
}

export const eventCard = () => {
  return (
    <EventCard
      event={getEvent(participants)}
      me={getMe(participants)}
      isExpanded={boolean('isExpanded', true)}
      participantEvents={{
        addParticipantToEvent: action('JOIN'),
        removeParticipantFromEvent: action('UNJOIN'),
      }}
    />
  )
}

export const eventList = () => {
  const participants = getParticipants()
  const randomEvent = () => {
    return getEvent(participants)
  }

  const events = times(randomEvent, 10)

  return <EventList events={events} onCardClick={action('cardClicked')} />
}
