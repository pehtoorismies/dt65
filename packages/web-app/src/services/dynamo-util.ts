import AWS, { DynamoDB } from 'aws-sdk'
import faker from 'faker'
import { times } from 'ramda'
import { v4 as uuidv4 } from 'uuid'
import { Event, EventType } from '../common/event'
import { DynamoStore } from './dynamo-store'
import { Table } from './table'
import { Store } from './store'

const createEventsTable = async (dynamodb: AWS.DynamoDB) => {
  const input: DynamoDB.Types.CreateTableInput = {
    TableName: Table.EVENTS,
    AttributeDefinitions: [
      {
        AttributeName: 'yearId',
        AttributeType: 'N',
      },
      {
        AttributeName: 'monthDateId',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'yearId',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'monthDateId',
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
    if (error.code === 'ResourceInUseException') {
      console.log('INFO: Table already exists')
    } else {
      console.error(error)
    }
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
    participants: [{ id: '123', nickname: 'koira' }],
    creator: faker.internet.userName(),
  }
}

const initData = async (store: DynamoStore, count = 10) => {
  const events = times(createRandomEvent, count)
  // TODO: make async
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

export const getStore = async (): Promise<Store> => {
  if (process.env.NODE_ENV === 'development') {
    const config = {
      endpoint: 'http://localhost:8000',
      region: 'eu-west-1',
    }
    AWS.config.update(config)

    const dynamoDB = new DynamoDB({
      apiVersion: 'latest',
      endpoint: 'http://localhost:8000',
    })
    const store = new DynamoStore(
      new DynamoDB.DocumentClient({ service: dynamoDB })
    )
    await initDB(dynamoDB, store)

    return store
  } else {
    throw new Error('No production defined')
  }
}
