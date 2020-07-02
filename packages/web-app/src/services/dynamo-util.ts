import AWS, { DynamoDB } from 'aws-sdk'
import { createRandomEvents, createRandomUsers } from '../util/random'
import { DynamoStore } from './dynamo-store'
import { createEventsTable, createUsersTable } from './dynamo-tables'
import { Store } from './store'

const initEvents = async (store: DynamoStore) => {
  const events = createRandomEvents(15)
  events.forEach(async event => {
    await store.createEvent(event)
  })
}

const initUsers = async (store: DynamoStore) => {
  const users = createRandomUsers(60)

  users.forEach(async user => {
    await store.createUser(user)
  })
}

export const initDB = async (dynamoDB: AWS.DynamoDB, store: DynamoStore) => {
  const events = await createEventsTable(dynamoDB)

  if (events != undefined) {
    await initEvents(store)
  }
  const users = await createUsersTable(dynamoDB)
  if (users != undefined) {
    await initUsers(store)
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
