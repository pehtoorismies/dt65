import React from 'react'
import styled from 'styled-components'
import { Event } from '../common/event'
import { EventCard } from './event-card'

interface Props {
  events: Event[]
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(34rem, 1fr));
  grid-gap: 2rem;
  width: 100%;
  justify-items: center;
  align-items: top;
`

export const EventList = ({ events }: Props) => {
  const allEvents = events.map(event => {
    return <EventCard key={event.id} event={event} />
  })
  return <Grid>{allEvents}</Grid>
}
