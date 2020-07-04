type Timestamps = {
  createdAt: Date
  updatedAt?: Date
}

export enum EventType {
  CYCLING = 'cycling',
  KARONKKA = 'karonkka',
  MEETING = 'meeting',
  NORDIC_WALKING = 'nordic-walking',
  ORIENTEERING = 'orienteering',
  OTHER = 'other',
  RUNNING = 'running',
  SKIING = 'skiing',
  SPINNING = 'spinning',
  SWIMMING = 'swimming',
  TRACK_RUNNING = 'track-running',
  TRAIL_RUNNING = 'trail-running',
  TRIATHLON = 'triathlon',
  ULTRAS = 'ultras',
}

export type Event = Timestamps & {
  id: string
  title: string
  address?: string
  subtitle?: string
  race: boolean
  description?: string
  eventType: EventType
  date: Date
  exactTime?: boolean
  creator: string
  participants: string[]
}

export type SerializedEvent = Event & {
  createdAt: string
  updatedAt?: string
  date: string
}
