import { Event, SerializedEvent } from '../common/event'

export interface Store {
  createEvent: (event: Event) => Promise<Event>
  getEvents: (fromDate: Date) => Promise<SerializedEvent[]>
  getEvent: (yearID: number, monthDateId: string) => Promise<SerializedEvent>
  // deleteEvent: (id: ID) => Promise<Event>
  // updateEvent: (event: Event) => Promise<Event>
}
