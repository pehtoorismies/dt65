import { getYear } from 'date-fns'
import React from 'react'
import styled from 'styled-components'
import { Event } from '../common/event'
import { EventCard } from './event-card'

interface Props {
  events: Event[]
  onCardClick: (year: number, eventId: string) => void
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(34rem, 1fr));
  grid-gap: 2rem;
  width: 100%;
  justify-items: center;
  align-items: top;
`

export const EventList = ({ events, onCardClick }: Props) => {
  const allEvents = events.map(event => {
    const year = getYear(event.date)

    return (
      <EventCard
        key={event.id}
        event={event}
        onCardClick={() => onCardClick(year, event.id)}
      />
    )
  })
  return <Grid>{allEvents}</Grid>
}
