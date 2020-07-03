import { parseISO } from 'date-fns'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { SerializedEvent } from '../common/event'
import { EventList } from '../events/events-list'
import { getStore } from '../services/dynamo-util'

interface Props {
  serializedEvents: SerializedEvent[]
}

const Home = ({ serializedEvents }: Props) => {
  const router = useRouter()
  const events = serializedEvents.map(event => {
    return {
      ...event,
      date: parseISO(event.date),
      createdAt: parseISO(event.createdAt),
    }
  })

  const onCardClick = (year: number, monthDayId: string) => {
    router.push(`/[year]/[id]`, `/${year}/${monthDayId}`)
  }

  return <EventList events={events} onCardClick={onCardClick} />
}

export async function getServerSideProps() {
  const store = await getStore()
  const events = await store.getEvents(new Date())

  return {
    props: {
      title: 'Home',
      serializedEvents: events,
    },
  }
}

export default Home
