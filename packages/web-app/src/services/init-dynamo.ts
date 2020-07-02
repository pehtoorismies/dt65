import * as AWS from 'aws-sdk'
import { DynamoStore } from './dynamo-store'
import { initDB } from './dynamo-util'

export const init = async () => {
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
