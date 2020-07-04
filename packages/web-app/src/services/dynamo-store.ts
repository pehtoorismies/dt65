import * as AWS from 'aws-sdk'
import { format, getYear } from 'date-fns'
import { Event, EventType, SerializedEvent } from '../common/event'
import { UserInfo } from '../users/user-info'
import { Store, EventId } from './store'
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
  monthDayId,
  date,
  participants,
  ...rest
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any): SerializedEvent => {
  console.log('p', participants)

  return {
    id: monthDayId,
    eventType: EventType.MEETING,
    date,
    createdAt,
    participants: participants.values,
    ...rest,
  }
}

const toEvents = ({
  Items,
}: AWS.DynamoDB.DocumentClient.QueryOutput): SerializedEvent[] => {
  return Items.map(a => parseEvent(a))
}

const parseUser = (user: any) => {
  return user
}

const toUsers = ({
  Items,
}: AWS.DynamoDB.DocumentClient.ScanOutput): UserInfo[] => {
  return Items.map(u => parseUser(u))
}

export class DynamoStore implements Store {
  constructor(private documentClient: AWS.DynamoDB.DocumentClient) {}

  async createEvent(event: Event): Promise<Event> {
    const { id, date, createdAt, participants, ...rest } = event
    const { partitionKey, sortKey } = createPrimaryKey(date, id)

    const participantsSet = this.documentClient.createSet(participants)

    const parameters: AWS.DynamoDB.DocumentClient.PutItemInput = {
      Item: {
        yearId: partitionKey,
        monthDayId: sortKey,
        createdAt: createdAt.toISOString(),
        date: date.toISOString(),
        participants: participantsSet,
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
      KeyConditionExpression: 'yearId = :yearId AND monthDayId >= :fromDate',
      ExpressionAttributeValues: {
        ':yearId': getYear(fromDate),
        ':fromDate': getSortKeyDate(fromDate),
      },
    }

    const events = await this.documentClient.query(parameters).promise()
    return toEvents(events)
  }

  async getEvent({ yearId, monthDayId }: EventId): Promise<SerializedEvent> {
    const parameters: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: Table.EVENTS,
      Key: {
        yearId,
        monthDayId,
      },
    }

    const event = await this.documentClient.get(parameters).promise()
    return parseEvent(event.Item)
  }

  // deleteEvent: (id: ID) => Promise<Event>
  // updateEvent: (event: Event) => Promise<Event>

  async getUsers(): Promise<UserInfo[]> {
    const parameters: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: Table.USERS,
    }

    const users = await this.documentClient.scan(parameters).promise()
    return toUsers(users)
  }

  async createUser(user: UserInfo): Promise<UserInfo> {
    const parameters: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: Table.USERS,
      Item: {
        ...user,
      },
      ReturnValues: 'NONE',
    }

    try {
      await this.documentClient.put(parameters).promise()
      return user
    } catch (error) {
      console.error(error)
    }
  }

  async addParticipant(
    { yearId, monthDayId }: EventId,
    nickname: string
  ): Promise<boolean> {
    const parameters: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: Table.EVENTS,
      Key: {
        yearId,
        monthDayId,
      },
      UpdateExpression: 'ADD participants :nickname',
      ExpressionAttributeValues: {
        ':nickname': this.documentClient.createSet([nickname]),
      },

      ReturnValues: 'ALL_NEW',
    }

    const response = await this.documentClient.update(parameters).promise()
    return true
  }
}
