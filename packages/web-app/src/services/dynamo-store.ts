import * as AWS from 'aws-sdk'
import { format, getYear } from 'date-fns'
import { Event, EventType, SerializedEvent } from '../common/event'
import { Store } from './store'
import { Table } from './table'

const getSortKeyDate = (date: Date) => format(date, 'MM_dd')

const createPrimaryKey = (date: Date, id: string) => {
  return {
    partitionKey: getYear(date),
    sortKey: `${format(date, 'MM_dd')}_${id}`,
  }
}

const parseEvent = ({
  eventType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  yearId,
  createdAt,
  monthDateId,
  date,
  ...rest
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any): SerializedEvent => {
  return {
    id: monthDateId,
    eventType: EventType.MEETING,
    date,
    createdAt,
    ...rest,
  }
}

const toEvents = ({
  Items,
}: AWS.DynamoDB.DocumentClient.QueryOutput): SerializedEvent[] => {
  return Items.map(a => parseEvent(a))
}

export class DynamoStore implements Store {
  constructor(private documentClient: AWS.DynamoDB.DocumentClient) {}

  async createEvent(event: Event): Promise<Event> {
    const { id, date, createdAt, ...rest } = event
    const { partitionKey, sortKey } = createPrimaryKey(date, id)
    console.log('sortKey', sortKey)

    const parameters: AWS.DynamoDB.DocumentClient.PutItemInput = {
      Item: {
        yearId: partitionKey,
        monthDateId: sortKey,
        createdAt: createdAt.toISOString(),
        date: date.toISOString(),
        ...rest,
      },
      ReturnValues: 'NONE',
      TableName: Table.EVENTS,
    }
    try {
      await this.documentClient.put(parameters).promise()
      return event
    } catch (error) {
      console.error(error)
    }
  }

  async getEvents(fromDate: Date): Promise<SerializedEvent[]> {
    const parameters: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: Table.EVENTS,
      KeyConditionExpression: 'yearId = :yearId AND monthDateId >= :fromDate',
      ExpressionAttributeValues: {
        ':yearId': getYear(fromDate),
        ':fromDate': getSortKeyDate(fromDate),
      },
    }

    const events = await this.documentClient.query(parameters).promise()
    return toEvents(events)
  }

  async getEvent(
    yearId: number,
    monthDateId: string
  ): Promise<SerializedEvent> {
    const parameters: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: Table.EVENTS,
      Key: {
        yearId,
        monthDateId,
      },
    }

    const event = await this.documentClient.get(parameters).promise()
    return parseEvent(event)
  }

  // deleteEvent: (id: ID) => Promise<Event>
  // updateEvent: (event: Event) => Promise<Event>
}
