export const typeDefs = `
  type Query {
    hello(name: String): String
    findEvent(id: String): Event
  }
`;

export const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'world'}`,
  },
};
