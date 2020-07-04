import { parseISO } from 'date-fns'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import { Flex } from 'rebass/styled-components'
import { SerializedEvent } from '../../common/event'
import { EventCard } from '../../events/event-card'
import { getStore } from '../../services/dynamo-util'
import { EventId } from '../../services/store'

interface Props {
  serializedEvent: SerializedEvent
}

const EventPage = ({ serializedEvent }: Props) => {
  const event = {
    ...serializedEvent,
    date: parseISO(serializedEvent.date),
    createdAt: parseISO(serializedEvent.createdAt),
  }

  const participantEvents = {
    addParticipantToEvent: (eventId: EventId) => console.log('Add'),
    removeParticipantFromEvent: (eventId: EventId) => console.log('Remove'),
  }

  return (
    <Flex justifyContent="center">
      <EventCard
        event={event}
        isExpanded
        participantEvents={participantEvents}
      />
    </Flex>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id, year } = context.params
  const store = await getStore()
  const event = await store.getEvent({
    yearId: Number(year),
    monthDayId: String(id),
  })

  return {
    props: {
      serializedEvent: event,
      title: event.title,
    },
  }
}

export default EventPage
