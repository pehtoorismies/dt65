import { pluck } from 'ramda';

import { EventType } from './types';

export const EVENT_TYPES: EventType[] = [
  {
    id: 'Cycling',
    title: 'Pyöräily',
  },
  { id: 'Karonkka', title: 'Karonkka' },
  { id: 'Meeting', title: 'Kokous' },
  { id: 'Orienteering', title: 'Suunnistus' },
  { id: 'Other', title: 'Muu' },
  { id: 'Running', title: 'Juoksu' },
  { id: 'Skiing', title: 'Hiihto' },
  { id: 'Spinning', title: 'Spinning' },
  { id: 'Swimming', title: 'Uinti' },
  { id: 'TrackRunning', title: 'Ratajuoksu' },
  { id: 'Triathlon', title: 'Triathlon' },
  { id: 'Ultras', title: 'Ultras' },
  { id: 'NordicWalking', title: 'Sauvakävely' },
  { id: 'TrailRunning', title: 'Polkujuoksu' },
];

export const EVENT_ENUMS = pluck('id')(EVENT_TYPES);
