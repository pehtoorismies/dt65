import * as AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import { DynamoStore } from '../../services/dynamo-store'
import { initDB } from '../../services/dynamo-util'
import { EventType } from '../../common/event'

const init = async () => {
  if (process.env.NODE_ENV === 'development') {
    const config = {
      endpoint: 'http://localhost:8000',
      region: 'eu-west-1',
    }
    AWS.config.update(config)

    const dynamoDB = new AWS.DynamoDB({
      apiVersion: 'latest',
      endpoint: 'http://localhost:8000',
    })
    const store = new DynamoStore(
      new AWS.DynamoDB.DocumentClient({ service: dynamoDB })
    )
    await initDB(dynamoDB, store)

    return store
  } else {
    throw new Error('No production defined')
  }
}

export default async (req, res) => {
  const dynamoStore = await init()
  const result = await dynamoStore.createEvent({
    id: uuidv4(),
    title: 'test',
    date: new Date(2020, 12, 12),
    createdAt: new Date(),
    race: false,
    eventType: EventType.CYCLING,
  })

  return res.end(JSON.stringify(result))
}
