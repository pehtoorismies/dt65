import { EventId } from '../services/store'

export interface ParticipantEvents {
  addParticipantToEvent: (eventId: EventId) => void
  removeParticipantFromEvent: (eventId: EventId) => void
}
