import { formatError } from 'apollo-errors';
import { GraphQLServer } from 'graphql-yoga';
import { connect, connection, model } from 'mongoose';

import { createSchema } from './createSchema';
import { config } from './config';
import { EventSchema } from './db-schema';
import {
  accessToken,
  addUserNickname,
  permissions,
  requestScopes,
} from './middleware';

const { mongoUrl } = config;

const serverOptions = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  getEndpoint: true, // enable for liveness/readiness probes
  formatError,
};

const mongoOptions = {
  useNewUrlParser: true,
  autoIndex: false,
  reconnectInterval: 500,
  reconnectTries: Number.MAX_VALUE,
  bufferMaxEntries: 10,
  useFindAndModify: false,
};

const startServer = () => {
  const schema = createSchema(false);

  const server = new GraphQLServer({
    schema,
    context: req => ({
      ...req,
      mongoose: {
        EventModel: model('Event', EventSchema),
        connection,
      },
    }),
    middlewares: [accessToken, requestScopes, addUserNickname, permissions],
  });

  server.start(serverOptions, ({ port }) =>
    console.log(`🚀🚀🚀🚀🚀🚀🚀 Server started on port ${port} 🚀🚀🚀🚀🚀🚀🚀`)
  );
};

// Mongo events

connection.on('connecting', () => {
  console.log('connecting to mongo');
});
connection.on('disconnected', () => {
  console.log('-> lost connection');
});

connection.on('reconnect', () => {
  console.log('-> reconnected');
});

connection.on('connected', () => {
  console.log('-> connected');
});

connect(mongoUrl, mongoOptions).then(
  () => {
    console.log('Ready');
  },
  err => {
    console.error(err);
  }
);

startServer();
