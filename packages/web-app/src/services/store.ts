import { Event } from './event'

export interface Store {
  createEvent: (event: Event) => Promise<Event>
  // getEvent: (id: ID) => Promise<Event>
  // deleteEvent: (id: ID) => Promise<Event>
  // updateEvent: (event: Event) => Promise<Event>
}
