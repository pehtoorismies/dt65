import * as AWS from 'aws-sdk';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLServerLambda } from 'graphql-yoga';
import { mergeAll } from 'ramda';
import {
  resolvers as dateTimeResolvers,
  typeDefs as DateTime,
} from './resolvers/date-time';
import {
  resolvers as eventResolvers,
  typeDefs as Event,
} from './resolvers/event';
import {
  resolvers as queryResolvers,
  typeDefs as Query,
} from './resolvers/query';

const IS_OFFLINE = process.env.IS_OFFLINE;
// const CONFIG_EVENTS_TABLE = process.env.CONFIG_EVENTS_TABLE;
const CONFIG_DYNAMODB_ENDPOINT = process.env.CONFIG_DYNAMODB_ENDPOINT;

const initDynamo = (isLocal: boolean) => {
  if (isLocal) {
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: CONFIG_DYNAMODB_ENDPOINT,
    });
  }
  return new AWS.DynamoDB.DocumentClient();
};

const dynamoDB = initDynamo(IS_OFFLINE == 'true');

const lambda = new GraphQLServerLambda({
  context: request => ({
    ...request,
    dynamoDB,
  }),
  schema: makeExecutableSchema({
    typeDefs: [Query, Event, DateTime],
    resolvers: mergeAll([queryResolvers, eventResolvers, dateTimeResolvers]),
  }),
});

export const server = lambda.graphqlHandler;
export const playground = lambda.playgroundHandler;
