export interface Timestamps {
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
  TRACK_RUNNING = 'trackRunning',
  TRAIL_RUNNING = 'trailRunning',
  TRIATHLON = 'triathlon',
  ULTRAS = 'ultras',
}

export interface Event extends Timestamps {
  id: string
  title: string
  subtitle?: string
  race: boolean
  description?: string
  eventType: EventType
  date: Date
  exactTime?: boolean
}
