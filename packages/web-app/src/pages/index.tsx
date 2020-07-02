import { parseISO } from 'date-fns'
import React from 'react'
import { SerializedEvent } from '../common/event'
import { EventList } from '../events/events-list'
import { getStore } from '../services/dynamo-util'

interface Props {
  serializedEvents: SerializedEvent[]
}

const Home = ({ serializedEvents }: Props) => {
  const events = serializedEvents.map(event => {
    return {
      ...event,
      date: parseISO(event.date),
      createdAt: parseISO(event.createdAt),
    }
  })

  return <EventList events={events} />
}

export async function getServerSideProps() {
  const store = await getStore()
  const events = await store.getEvents(new Date())

  return {
    props: {
      serializedEvents: events,
    },
  }
}

export default Home
