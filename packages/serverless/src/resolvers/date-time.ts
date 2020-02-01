import { GraphQLDateTime } from 'graphql-iso-date';

export const typeDefs = `
  scalar DateTime
`;

export const resolvers = {
  DateTime: GraphQLDateTime,
};
