import { Event, SerializedEvent } from '../common/event'
import { UserInfo } from '../users/user-info'

export interface EventId {
  yearId: number
  monthDayId: string
}

export interface Store {
  createEvent: (event: Event) => Promise<Event>
  getEvents: (fromDate: Date) => Promise<SerializedEvent[]>
  getEvent: (eventId: EventId) => Promise<SerializedEvent>
  // deleteEvent: (id: ID) => Promise<Event>
  // updateEvent: (event: Event) => Promise<Event>
  createUser: (user: UserInfo) => Promise<UserInfo>
  getUsers: () => Promise<UserInfo[]>
  addParticipant: (eventId: EventId, nickname: string) => Promise<boolean>
  // addRemoveUser: (nickname: string) => Promise<boolean>
}
