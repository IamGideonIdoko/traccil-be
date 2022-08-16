import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
// import { printSchema } from 'graphql';

const gqlFilesPath = join(__dirname, './typedefs');

const typeDefs = /* GraphQL */ loadSchemaSync(`${gqlFilesPath}/**/*.graphql`, {
  loaders: [new GraphQLFileLoader()],
});

// log schema to test
// console.log(printSchema(typeDefs));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
