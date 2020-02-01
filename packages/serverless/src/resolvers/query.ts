export const typeDefs = `
  type Query {
    hello(name: String): String
  }
`;

export const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'world'}`,
  },
};
