import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';

const gqlFilesPath = './typedefs';
const gqlFiles = readdirSync(join(__dirname, gqlFilesPath));

let typeDefs = /* GraphQL */ '';

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, gqlFilesPath, file), {
    encoding: 'utf-8',
  });
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
