import AWS, { DynamoDB } from 'aws-sdk'
import { Table } from './table'

const createTable = async (
  input: DynamoDB.Types.CreateTableInput,
  dynamodb: AWS.DynamoDB
) => {
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

export const createEventsTable = async (dynamodb: AWS.DynamoDB) => {
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
  return await createTable(input, dynamodb)
}

export const createUsersTable = async (dynamodb: AWS.DynamoDB) => {
  const input: DynamoDB.Types.CreateTableInput = {
    TableName: Table.USERS,
    AttributeDefinitions: [
      {
        AttributeName: 'nickname',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'nickname',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  }
  return await createTable(input, dynamodb)
}
