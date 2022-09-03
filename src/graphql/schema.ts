import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
// import { printSchema } from 'graphql';

const gqlFilesPath = join(__dirname, './typedefs');

const typesArray = loadFilesSync(`${gqlFilesPath}/**/*.graphql`) as string[];

const typeDefs = mergeTypeDefs([...typesArray, ...scalarTypeDefs]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// log to test schema
// console.log(printSchema(schema));

export default schema;
