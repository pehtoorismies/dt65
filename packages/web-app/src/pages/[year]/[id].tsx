import { parseISO } from 'date-fns'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import { SerializedEvent } from '../../common/event'
import { EventCard } from '../../events/event-card'
import { getStore } from '../../services/dynamo-util'

interface Props {
  serializedEvent: SerializedEvent
}

const EventPage = ({ serializedEvent }: Props) => {
  const event = {
    ...serializedEvent,
    date: parseISO(serializedEvent.date),
    createdAt: parseISO(serializedEvent.createdAt),
  }

  return <EventCard event={event} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id, year } = context.params
  const store = await getStore()
  const event = await store.getEvent(Number(year), String(id))

  return {
    props: {
      serializedEvent: event,
    },
  }
}

export default EventPage
