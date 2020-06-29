import { enumType, objectType } from '@nexus/schema'

// import { EVENT_ENUMS } from '../constants'

export const EventType = enumType({
  name: 'EventType',
  members: [
    'Cycling',
    'Karonkka',
    'Meeting',
    'Orienteering',
    'Other',
    'Running',
    'Skiing',
    'Spinning',
    'Swimming',
    'TrackRunning',
    'Triathlon',
    'Ultras',
  ],
  description: 'Event Types',
})

export const Event = objectType({
  name: 'Event',
  definition(t) {
    t.string('id')
    t.string('title')
    t.string('subtitle', { nullable: true })
    t.boolean('race')
    t.field('type', {
      type: EventType,
    })
    t.date('date')
    t.boolean('exactTime', { nullable: true })
    t.string('description', { nullable: true })
    t.date('createdAt')
    t.date('updatedAt')

    // t.list.field('participants', {
    //   type: 'SimpleUser',
    // })
    // t.field('creator', {
    //   type: 'SimpleUser',
    // })
  },
})
