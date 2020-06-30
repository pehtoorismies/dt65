export interface Timestamps {
  createdAt: Date
  updatedAt?: Date
}

export enum EventType {
  CYCLING = 'Cycling',
  KARONKKA = 'Karonkka',
  MEETING = 'Meeting',
  ORIENTEERING = 'Orienteering',
  OTHER = 'Other',
  RUNNING = 'Running',
  SKIING = 'Skiing',
  SPINNING = 'Spinning',
  SWIMMING = 'Swimming',
  TRACKRUNNING = 'TrackRunning',
  TRIATHLON = 'Triathlon',
  ULTRAS = 'Ultras',
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
