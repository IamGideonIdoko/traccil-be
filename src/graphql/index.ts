import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import schema from './schema';
import context from './context';
import { createServer } from 'http';
import depthLimit from 'graphql-depth-limit';

const getApolloServer = (httpServer: ReturnType<typeof createServer>) => {
  const apolloServer = new ApolloServer({
    schema,
    context,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    validationRules: [depthLimit(5)],
  });
  return apolloServer;
};

export default getApolloServer;
