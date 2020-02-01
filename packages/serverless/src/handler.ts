import { DynamoDB, Endpoint } from 'aws-sdk';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLServerLambda } from 'graphql-yoga';
import { mergeAll } from 'ramda';
import { DynamoDBAdapter } from './dynamo-adapter';
import {
  resolvers as dateTimeResolvers,
  typeDefs as DateTime,
} from './resolvers/date-time';
import {
  resolvers as eventResolvers,
  typeDefs as Event,
} from './resolvers/event';

console.log('ONLINE', process.env.IS_OFFLINE);

const IS_OFFLINE = process.env.IS_OFFLINE;
// const CONFIG_EVENTS_TABLE = process.env.CONFIG_EVENTS_TABLE;
const CONFIG_DYNAMODB_ENDPOINT = process.env.CONFIG_DYNAMODB_ENDPOINT;

const Query = `
  type Query {
    _empty: String
  }
`;
const Mutation = `
  type Mutation {
    _empty: String
  }
`;

const initDynamo = (isLocal: boolean) => {
  console.log('IS LOCAL', isLocal);
  if (isLocal) {
    return new DynamoDBAdapter(
      new DynamoDB({
        apiVersion: '2012-08-10',
        region: 'eu-central-1',
        endpoint: 'http://localhost:8000',
        credentials: {
          accessKeyId: 'none',
          secretAccessKey: 'none',
        },
      })
    );
  }

  return new DynamoDBAdapter(
    new DynamoDB({
      apiVersion: '2012-08-10',
      region: 'eu-central-1',
    })
  );
};

const dynamoDBAdapter: DynamoDBAdapter = initDynamo(true);

const lambda = new GraphQLServerLambda({
  context: request => ({
    ...request,
    dynamoDBAdapter,
  }),
  schema: makeExecutableSchema({
    typeDefs: [Query, Mutation, Event, DateTime],
    resolvers: mergeAll([eventResolvers, dateTimeResolvers]),
  }),
});

export const server = lambda.graphqlHandler;
export const playground = lambda.playgroundHandler;
