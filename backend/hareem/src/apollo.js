/* eslint-disable no-param-reassign */
const { ApolloServer } = require('apollo-server-koa');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { resolvers: scalarResolvers, typeDefs: scalarTypeDefs } = require('graphql-scalars');
const { typeDefs, resolvers } = require('./graphql');
const { loaders } = require('./graphql');
const { errorHandlerMiddleware } = require('./middlewares');

const apollo = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [
      ...scalarTypeDefs,
      typeDefs,
    ],
    resolvers: [
      scalarResolvers,
      resolvers,
    ],
  }),
  csrfPrevention: true,
  cache: 'bounded',
  formatError: errorHandlerMiddleware(true),
  context: ({ ctx }) => ({ ctx, loaders }),
});

module.exports = apollo;
