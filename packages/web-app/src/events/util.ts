import { format, getDay } from 'date-fns'

const weekdaysShort = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La']

export const toFinnishDate = (date: Date) => {
  const finnishDayOfWeek = weekdaysShort[getDay(date)]
  const dateString = format(date, 'dd.MM.yyyy')
  return `${dateString} (${finnishDayOfWeek})`
}
