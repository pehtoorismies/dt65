import * as AWS from 'aws-sdk'

import { Event } from './event'
import { Store } from './store'
import { Table } from './table'

export class DynamoStore implements Store {
  constructor(private documentClient: AWS.DynamoDB.DocumentClient) {}

  async createEvent(event: Event): Promise<Event> {
    const { id, date, createdAt, ...rest } = event

    const parameters: AWS.DynamoDB.DocumentClient.PutItemInput = {
      Item: {
        id: String(id),
        date: date.toISOString(),
        createdAt: createdAt.toISOString(),
        ...rest,
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: Table.EVENTS,
    }
    try {
      await this.documentClient.put(parameters).promise()

      return event
    } catch (error) {
      console.error(error)
    }
  }
  // deleteEvent: (id: ID) => Promise<Event>
  // updateEvent: (event: Event) => Promise<Event>
}
