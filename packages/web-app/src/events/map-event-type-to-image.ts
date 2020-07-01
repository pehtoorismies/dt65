import { EventType } from '../common/event'

export interface EventTypeMap {
  title: string
  eventType: EventType
}

const getImage = (eventType: EventType) => `events-${eventType}.jpg`

export const EVENT_TYPE_MAP: EventTypeMap[] = [
  {
    title: 'Pyöräily',
    eventType: EventType.CYCLING,
  },
  {
    title: 'Juoksu',
    eventType: EventType.RUNNING,
  },
  {
    title: 'Suunnistus',
    eventType: EventType.ORIENTEERING,
  },
  {
    title: 'Ratajuoksu',
    eventType: EventType.TRACK_RUNNING,
  },
  {
    title: 'Spinning',
    eventType: EventType.SPINNING,
  },
  {
    title: 'Triathlon',
    eventType: EventType.TRIATHLON,
  },
  {
    title: 'Uinti',
    eventType: EventType.SWIMMING,
  },
  {
    title: 'Ultras',
    eventType: EventType.ULTRAS,
  },
  {
    title: 'Muu',
    eventType: EventType.OTHER,
  },
  {
    title: 'Hiihto',
    eventType: EventType.SKIING,
  },
  {
    title: 'Karonkka',
    eventType: EventType.KARONKKA,
  },
  {
    title: 'Kokous',
    eventType: EventType.MEETING,
  },
  {
    title: 'Sauvakävely',
    eventType: EventType.NORDIC_WALKING,
  },
  {
    title: 'Polkujuoksu',
    eventType: EventType.TRAIL_RUNNING,
  },
]

export const mapEventTypeToImage = (eventType: EventType) => {
  const mapped = EVENT_TYPE_MAP.find(element => element.eventType === eventType)
  return getImage(mapped.eventType)
}

export const mapTitleToEventType = (title: string): EventType | undefined => {
  const value = EVENT_TYPE_MAP.find(element => element.title === title)
  if (value != undefined) {
    return value.eventType
  }
}
