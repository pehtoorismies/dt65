import { DynamoDB } from 'aws-sdk'
import faker from 'faker'
import { times } from 'ramda'
import { v4 as uuidv4 } from 'uuid'
import { Event, EventType } from '../common/event'
import { DynamoStore } from './dynamo-store'
import { Table } from './table'

const createEventsTable = async (dynamodb: AWS.DynamoDB) => {
  const input: DynamoDB.Types.CreateTableInput = {
    TableName: Table.EVENTS,
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'date',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'date',
        KeyType: 'RANGE',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  }
  try {
    const result = await dynamodb.createTable(input).promise()
    return result
  } catch (error) {
    console.error(error.type)
    console.error(error)
  }
}

const createRandomEvent = (): Event => {
  const rand = Math.floor(Math.random() * Object.keys(EventType).length)

  return {
    id: uuidv4().toString(),
    description: faker.lorem.sentences(),
    title: faker.commerce.product(),
    subtitle: faker.commerce.product(),
    date: faker.date.future(),
    createdAt: faker.date.past(),
    race: faker.random.boolean(),
    eventType: EventType[Object.keys(EventType)[rand]],
  }
}

const initData = async (store: DynamoStore, count = 10) => {
  const events = times(createRandomEvent, count)

  for (const event of events) {
    await store.createEvent(event)
  }
}

export const initDB = async (dynamoDB: AWS.DynamoDB, store: DynamoStore) => {
  const result = await createEventsTable(dynamoDB)
  if (result != undefined) {
    initData(store)
  }
}
